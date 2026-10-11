// The server copy of a Vosa account, used by Trusted Circle.
// The phone app stays the main copy: it uploads a snapshot after every change, and anything that
// happens away from the phone (a phone call, a helper paying) is applied here AND queued as an
// event, so the app applies the same change the next time it checks in.
const { store, rid, okToken, sendSms } = require('./_lib');

const K = {
  acct: (o) => 'vosa:acct:' + o,
  events: (o) => 'vosa:events:' + o,
  reqs: (o) => 'vosa:reqs:' + o,
  helper: (t) => 'vosa:helper:' + t,
  phone: (p) => 'vosa:phone:' + p,
  call: (s) => 'vosa:call:' + s
};
const DAY = 86400;
const KEEP = 90 * DAY;

const getAcct = (o) => store.get(K.acct(o));
const saveAcct = (o, a) => store.set(K.acct(o), a, KEEP);
const getEvents = async (o) => (await store.get(K.events(o))) || [];
async function pushEvent(o, ev) {
  const list = await getEvents(o);
  list.push(Object.assign({ id: rid(6), at: Date.now() }, ev));
  await store.set(K.events(o), list.slice(-50), KEEP);
}
async function ackEvents(o, ids) {
  const list = await getEvents(o);
  const left = list.filter(e => !ids.includes(e.id));
  await store.set(K.events(o), left, KEEP);
  return left;
}
const getReqs = async (o) => (await store.get(K.reqs(o))) || {};
const saveReqs = (o, r) => store.set(K.reqs(o), r, 7 * DAY);

function findGoal(a, ref) {
  if (!ref) return a.goals.find(g => g.key === 'flex') || a.goals[0];
  return a.goals.find(g => (ref.name ? g.name && g.name.toLowerCase() === String(ref.name).toLowerCase() : g.key === ref.key && !g.name)) || null;
}

// Apply a money movement to the server copy and queue it for the phone app.
// tx: { type: 'send'|'save'|'withdraw'|'airtime', amount, to?, goal?, net?, who?, by, via }
async function applyTx(ownerId, tx) {
  const a = await getAcct(ownerId);
  if (!a) return { ok: false, error: 'no_account' };
  const amt = Math.round(Number(tx.amount) || 0);
  if (amt <= 0) return { ok: false, error: 'bad_amount' };
  if (tx.type === 'send' || tx.type === 'airtime' || tx.type === 'save') {
    if (a.wallet < amt) return { ok: false, error: 'low_wallet', wallet: a.wallet };
  }
  let g = null;
  if (tx.type === 'save' || tx.type === 'withdraw') {
    g = findGoal(a, tx.goal);
    if (!g) return { ok: false, error: 'no_goal' };
    if (tx.type === 'withdraw' && g.bal < amt) return { ok: false, error: 'low_goal', bal: g.bal };
  }
  if (tx.type === 'send' || tx.type === 'airtime') a.wallet -= amt;
  if (tx.type === 'save') { a.wallet -= amt; g.bal += amt; }
  if (tx.type === 'withdraw') { g.bal -= amt; a.wallet += amt; }
  const ev = { type: 'tx', tx: Object.assign({}, tx, { amount: amt, goal: g ? { key: g.key, name: g.name } : tx.goal || null }) };
  a.activity = [{ kind: tx.type, amt, at: Date.now(), by: tx.by || null, via: tx.via || null, to: tx.to || null }].concat(a.activity || []).slice(0, 12);
  a.rev = (a.rev || 0) + 1;
  await saveAcct(ownerId, a);
  await pushEvent(ownerId, ev);
  return { ok: true, acct: a, goal: g };
}

// Who must approve this transfer? Approvers are asked when the amount is at or above the owner's
// limit, or when it's ₦5,000+ to someone the owner has never paid before.
function needsApproval(a, amount, to) {
  const approvers = (a.helpers || []).filter(h => h.status === 'active' && h.role === 'approver');
  if (!approvers.length) return [];
  const known = (a.contacts || []).some(c => c.acct === (to && to.acct));
  const big = amount >= (a.approveOver || 20000);
  const newBig = !known && amount >= 5000;
  return big || newBig ? approvers : [];
}

// Create an approval request and text the approvers (if SMS is set up).
// r: { id?, origin: 'app'|'call', amount, to, kind, newRecipient, tx? }
async function createRequest(ownerId, acct, r, base) {
  const approvers = [];
  for (const h of acct.helpers || []) {
    const rec = await store.get(K.helper(h.token));
    if (rec && rec.ownerId === ownerId && rec.status === 'active' && rec.role === 'approver') approvers.push({ token: h.token, name: rec.name, phone: rec.phone });
  }
  if (!approvers.length) return { ok: false, error: 'no_approver' };
  const id = okToken(r.id) ? r.id : rid(8);
  const reqs = await getReqs(ownerId);
  reqs[id] = {
    id, origin: r.origin === 'call' ? 'call' : 'app', amount: Math.round(Number(r.amount) || 0), to: r.to || null, kind: r.kind || 'send',
    newRecipient: !!r.newRecipient, approvers: approvers.map(a => a.token), status: 'pending', created: Date.now(), tx: r.tx || null
  };
  await saveReqs(ownerId, reqs);
  const naira = '₦' + reqs[id].amount.toLocaleString('en-NG');
  const toLine = r.to ? r.to.name + (r.to.bank ? ', ' + r.to.bank : '') : 'someone';
  for (const a of approvers) {
    if (a.phone) await sendSms(a.phone, `Vosa: ${acct.name} wants to send ${naira} to ${toLine}. Approve or decline: ${base}/?helper=${a.token}`);
  }
  return { ok: true, id, approvers: approvers.map(a => a.name) };
}

module.exports = { createRequest, K, DAY, getAcct, saveAcct, getEvents, pushEvent, ackEvents, getReqs, saveReqs, applyTx, needsApproval, findGoal };
