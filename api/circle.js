// Trusted Circle: invite helpers, ask them to approve big transfers, let them watch or pay within a limit.
// Owner calls are identified by the owner's private id; helper calls by the helper's private link token.
const { readBody, query, baseUrl, hasDb, store, sendSms, e164, okToken } = require('./_lib');
const A = require('./_account');

const ROLES = ['watcher', 'approver', 'spender'];
const month = () => new Date().toISOString().slice(0, 7);
const fmt = (n) => '₦' + Math.round(n).toLocaleString('en-NG');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!hasDb()) return res.status(503).json({ error: 'no_db', message: 'Trusted Circle needs the free Upstash database added in Vercel.' });
  const q = query(req);
  const b = await readBody(req);
  const action = q.action || b.action;
  try {
    switch (action) {
      case 'sync': return res.json(await sync(b));
      case 'invite': return res.json(await invite(b, req));
      case 'remove': return res.json(await removeHelper(b));
      case 'request': return res.json(await request(b, req));
      case 'cancel': return res.json(await cancel(b));
      case 'poll': return res.json(await poll(q.ownerId || b.ownerId));
      case 'ack': return res.json({ ok: true, left: (await A.ackEvents(b.ownerId, b.ids || [])).length });
      case 'helper': return res.json(await helperView(q.token || b.token));
      case 'accept': return res.json(await accept(b));
      case 'decide': return res.json(await decide(b));
      case 'spend': return res.json(await spend(b));
      default: return res.status(400).json({ error: 'unknown_action' });
    }
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.code || 'server_error', message: String(e.message || e) });
  }
};

function fail(status, code, message) { const e = new Error(message || code); e.status = status; e.code = code; throw e; }
function needOwner(o) { if (!okToken(o)) fail(400, 'bad_owner'); }

// ---------- owner side ----------
async function sync(b) {
  needOwner(b.ownerId);
  const events = await A.getEvents(b.ownerId);
  // Something happened away from the phone (a call, a helper paid): the app must apply it first.
  if (events.length) return { ok: false, events };
  const s = b.snap || {};
  const prev = (await A.getAcct(b.ownerId)) || {};
  const helpers = [];
  for (const h of (s.helpers || []).slice(0, 5)) {
    if (!okToken(h.token)) continue;
    const rec = await store.get(A.K.helper(h.token));
    if (rec && rec.ownerId === b.ownerId) helpers.push({ token: h.token, name: rec.name, role: rec.role, limit: rec.limit, status: rec.status });
  }
  const acct = {
    ownerId: b.ownerId, name: String(s.name || 'Vosa user').slice(0, 40), lang: ['en', 'pcm', 'yo'].includes(s.lang) ? s.lang : 'en',
    wallet: Math.max(0, Math.round(Number(s.wallet) || 0)), account: String(s.account || ''), myPhone: String(s.myPhone || ''), myNetwork: s.myNetwork || 'MTN',
    goals: (s.goals || []).slice(0, 20).map(g => ({ key: g.key, name: g.name || null, bal: Math.max(0, Math.round(g.bal || 0)), target: g.target || null, deadline: g.deadline || null })),
    contacts: (s.contacts || []).slice(0, 50).map(c => ({ name: c.name, aliases: (c.aliases || []).slice(0, 10), bank: c.bank, acct: c.acct })),
    activity: (s.activity || []).slice(0, 12),
    secretHash: s.secretHash || prev.secretHash || null, secretWords: s.secretWords || prev.secretWords || 0,
    approveOver: Math.max(1000, Number(s.approveOver) || 20000),
    helpers, rev: (prev.rev || 0) + 1, updatedAt: Date.now()
  };
  await A.saveAcct(b.ownerId, acct);
  return { ok: true, rev: acct.rev, helpers };
}

async function invite(b, req) {
  needOwner(b.ownerId);
  const h = b.helper || {};
  if (!okToken(h.token)) fail(400, 'bad_token');
  if (!ROLES.includes(h.role)) fail(400, 'bad_role');
  const rec = {
    ownerId: b.ownerId, ownerName: String(b.ownerName || 'Your family member').slice(0, 40), name: String(h.name || 'Helper').slice(0, 30),
    role: h.role, limit: h.role === 'spender' ? Math.max(1000, Math.min(200000, Number(h.limit) || 30000)) : null,
    phone: h.phone ? e164(h.phone) : null, status: 'invited', spent: { month: month(), amt: 0 }, created: Date.now(), lastView: 0
  };
  await store.set(A.K.helper(h.token), rec, 365 * A.DAY);
  const link = baseUrl(req) + '/?helper=' + h.token;
  const sms = rec.phone ? await sendSms(rec.phone, `${rec.ownerName} added you as a trusted helper on Vosa. Open this link to accept: ${link}`) : false;
  return { ok: true, link, sms };
}

async function removeHelper(b) {
  needOwner(b.ownerId);
  const rec = okToken(b.token) ? await store.get(A.K.helper(b.token)) : null;
  if (rec && rec.ownerId === b.ownerId) await store.del(A.K.helper(b.token));
  return { ok: true };
}

async function request(b, req) {
  needOwner(b.ownerId);
  const acct = await A.getAcct(b.ownerId);
  if (!acct) fail(409, 'not_synced', 'Account not synced yet');
  const out = await A.createRequest(b.ownerId, acct, Object.assign({}, b.req || {}, { origin: 'app' }), baseUrl(req));
  if (!out.ok) fail(409, out.error, 'No active approver');
  return out;
}

async function cancel(b) {
  needOwner(b.ownerId);
  const reqs = await A.getReqs(b.ownerId);
  if (reqs[b.reqId] && reqs[b.reqId].status === 'pending') { reqs[b.reqId].status = 'cancelled'; await A.saveReqs(b.ownerId, reqs); }
  return { ok: true };
}

async function poll(ownerId) {
  needOwner(ownerId);
  const [events, reqs, acct] = await Promise.all([A.getEvents(ownerId), A.getReqs(ownerId), A.getAcct(ownerId)]);
  const recent = Object.values(reqs).filter(r => Date.now() - r.created < 86400e3);
  const helpers = [];
  for (const h of (acct && acct.helpers) || []) {
    const rec = await store.get(A.K.helper(h.token));
    helpers.push({ token: h.token, status: rec ? rec.status : 'removed', lastView: rec ? rec.lastView : 0 });
  }
  return { ok: true, events, reqs: recent, helpers };
}

// ---------- helper side ----------
async function loadHelper(token) {
  if (!okToken(token)) fail(404, 'bad_link', 'This helper link is not valid.');
  const rec = await store.get(A.K.helper(token));
  if (!rec) fail(404, 'removed', 'This helper link is no longer active.');
  return rec;
}

async function helperView(token) {
  const rec = await loadHelper(token);
  const out = { ok: true, helper: { name: rec.name, role: rec.role, limit: rec.limit, status: rec.status, ownerName: rec.ownerName } };
  if (rec.status !== 'active') return out;
  const acct = (await A.getAcct(rec.ownerId)) || { wallet: 0, goals: [], activity: [], contacts: [] };
  if (rec.role === 'watcher' || rec.role === 'approver') {
    out.account = { wallet: acct.wallet, goals: acct.goals, activity: acct.activity.slice(0, 6), updatedAt: acct.updatedAt };
  }
  if (rec.role === 'approver') {
    const reqs = await A.getReqs(rec.ownerId);
    out.requests = Object.values(reqs).filter(r => r.approvers.includes(token) && (r.status === 'pending' || Date.now() - (r.decidedAt || 0) < 120e3))
      .sort((x, y) => y.created - x.created).slice(0, 3);
  }
  if (rec.role === 'spender') {
    const spent = rec.spent && rec.spent.month === month() ? rec.spent.amt : 0;
    out.spend = { limit: rec.limit, left: Math.max(0, rec.limit - spent), contacts: acct.contacts.map(c => ({ name: c.name, bank: c.bank, last4: String(c.acct).slice(-4) })) };
  }
  // Tell the owner someone looked (at most once every 10 minutes)
  if (Date.now() - (rec.lastView || 0) > 600e3) {
    rec.lastView = Date.now();
    await store.set(A.K.helper(token), rec, 365 * A.DAY);
    await A.pushEvent(rec.ownerId, { type: 'view', name: rec.name });
  }
  return out;
}

async function accept(b) {
  const rec = await loadHelper(b.token);
  if (rec.status !== 'active') {
    rec.status = 'active';
    await store.set(A.K.helper(b.token), rec, 365 * A.DAY);
    await A.pushEvent(rec.ownerId, { type: 'helper', token: b.token, name: rec.name, status: 'active' });
  }
  return { ok: true };
}

async function decide(b) {
  const rec = await loadHelper(b.token);
  if (rec.role !== 'approver' || rec.status !== 'active') fail(403, 'not_approver');
  const reqs = await A.getReqs(rec.ownerId);
  const r = reqs[b.reqId];
  if (!r || !r.approvers.includes(b.token)) fail(404, 'no_request');
  if (r.status !== 'pending') return { ok: true, status: r.status };
  r.status = b.decision === 'approve' ? 'approved' : 'declined';
  r.by = rec.name; r.decidedAt = Date.now();
  await A.saveReqs(rec.ownerId, reqs);
  await A.pushEvent(rec.ownerId, { type: 'decision', reqId: r.id, status: r.status, by: rec.name, origin: r.origin });
  return { ok: true, status: r.status };
}

async function spend(b) {
  const rec = await loadHelper(b.token);
  if (rec.role !== 'spender' || rec.status !== 'active') fail(403, 'not_spender', 'Only a helper with spending rights can pay.');
  const amount = Math.round(Number(b.amount) || 0);
  if (amount <= 0) fail(400, 'bad_amount', 'Enter an amount.');
  if (!rec.spent || rec.spent.month !== month()) rec.spent = { month: month(), amt: 0 };
  if (rec.spent.amt + amount > rec.limit) fail(409, 'over_limit', `That's over your monthly limit. You have ${fmt(rec.limit - rec.spent.amt)} left.`);
  const acct = await A.getAcct(rec.ownerId);
  if (!acct) fail(409, 'not_synced', 'Account not available.');
  let to = null;
  if (b.contact) { const c = acct.contacts.find(x => x.name === b.contact); if (c) to = { name: c.name, bank: c.bank, acct: c.acct }; }
  else if (b.to && /^\d{10}$/.test(String(b.to.acct || ''))) to = { name: String(b.to.name || b.to.acct).slice(0, 40), bank: String(b.to.bank || '').slice(0, 30), acct: String(b.to.acct) };
  if (!to) fail(400, 'bad_recipient', 'Pick who to pay.');
  const result = await A.applyTx(rec.ownerId, { type: 'send', amount, to, by: rec.name, via: 'helper', note: String(b.note || '').slice(0, 60) });
  if (!result.ok) fail(409, result.error, result.error === 'low_wallet' ? 'There isn’t enough money in the wallet.' : 'Payment failed.');
  rec.spent.amt += amount;
  await store.set(A.K.helper(b.token), rec, 365 * A.DAY);
  return { ok: true, left: rec.limit - rec.spent.amt, wallet: result.acct.wallet };
}
