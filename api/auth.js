// Vosa accounts: sign up, sign in, change the secret phrase, sign-in status.
// POST JSON { action: 'signup' | 'login' | 'setphrase', ... }
//
// - One account per phone number.
// - The secret phrase is never stored as text: only a salted scrypt hash.
// - Sign-in is locked for 15 minutes after 5 wrong tries for that phone number.
// - The account's money, goals and helpers live in the same server copy Trusted Circle uses
//   (api/_account.js), keyed by the private ownerId the phone keeps.
const crypto = require('crypto');
const { readBody, hasDb, store, e164, rid, okToken } = require('./_lib');
const A = require('./_account');

const U = {
  user: (phone) => 'vosa:user:' + phone,
  owner: (ownerId) => 'vosa:owner:' + ownerId,
  tries: (phone) => 'vosa:tries:' + phone
};
const YEAR = 365 * 86400;
const MAX_TRIES = 5;
const LOCK_SECS = 15 * 60;

function fail(status, code, message) { const e = new Error(message || code); e.status = status; e.code = code; throw e; }

// Same normalising the app uses: lower case, no accents or punctuation, single spaces.
function normPhrase(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function hashPhrase(phrase, salt) {
  return crypto.scryptSync(normPhrase(phrase), salt, 32, { N: 16384, r: 8, p: 1 }).toString('hex');
}
function samePhrase(phrase, user) {
  const a = Buffer.from(hashPhrase(phrase, user.salt), 'hex');
  const b = Buffer.from(user.hash, 'hex');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
function goodPhone(raw) {
  const p = e164(raw);
  if (!/^\+234[789][01]\d{8}$/.test(p)) fail(400, 'bad_phone', 'Use a Nigerian mobile number, like 0803 123 4567.');
  return p;
}
function goodPhrase(raw) {
  const n = normPhrase(raw);
  const words = n.split(' ').filter(Boolean);
  if (words.length < 2 || n.replace(/\s/g, '').length < 6) fail(400, 'weak_phrase', 'Choose at least two words, like "green banana".');
  if (n.length > 60) fail(400, 'long_phrase', 'Keep the secret phrase short: two to four words.');
  if (n === 'blue mango') fail(400, 'demo_phrase', 'That is the demo phrase. Choose your own words.');
  return n;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'post_only' });
  if (!hasDb()) return res.status(503).json({ error: 'no_db', message: 'Accounts need the database. Add Upstash Redis in Vercel.' });
  try {
    const b = await readBody(req);
    switch (b.action) {
      case 'signup': return res.json(await signup(b));
      case 'login': return res.json(await login(b));
      case 'setphrase': return res.json(await setPhrase(b));
      default: return res.status(400).json({ error: 'unknown_action' });
    }
  } catch (e) {
    return res.status(e.status || 500).json({ error: e.code || 'server_error', message: String(e.message || e) });
  }
};

async function signup(b) {
  const phone = goodPhone(b.phone);
  goodPhrase(b.phrase);
  const name = String(b.name || '').trim().replace(/\s+/g, ' ').slice(0, 40);
  if (name.length < 2) fail(400, 'bad_name', 'Tell Vosa your name.');
  if (await store.get(U.user(phone))) fail(409, 'taken', 'This number already has a Vosa account. Sign in instead.');
  const ownerId = rid(24);
  const salt = rid(16);
  const user = { phone, ownerId, name, salt, hash: hashPhrase(b.phrase, salt), created: Date.now() };
  await store.set(U.user(phone), user, YEAR);
  await store.set(U.owner(ownerId), { phone }, YEAR);
  return { ok: true, ownerId, name, phone };
}

async function login(b) {
  const phone = goodPhone(b.phone);
  const tries = (await store.get(U.tries(phone))) || { n: 0 };
  if (tries.n >= MAX_TRIES) fail(429, 'locked', 'Too many wrong tries. Wait 15 minutes, then try again.');
  const user = await store.get(U.user(phone));
  if (!user || !samePhrase(b.phrase, user)) {
    await store.set(U.tries(phone), { n: tries.n + 1 }, LOCK_SECS);
    const left = MAX_TRIES - tries.n - 1;
    fail(401, 'wrong', left > 0 ? `That number and secret phrase don't match. ${left} ${left === 1 ? 'try' : 'tries'} left.` : 'Too many wrong tries. Wait 15 minutes, then try again.');
  }
  await store.del(U.tries(phone));
  const acct = await A.getAcct(user.ownerId);
  return { ok: true, ownerId: user.ownerId, name: user.name, phone, acct: acct || null };
}

async function setPhrase(b) {
  if (!okToken(b.ownerId)) fail(400, 'bad_owner');
  goodPhrase(b.phrase);
  const link = await store.get(U.owner(b.ownerId));
  if (!link) fail(404, 'no_account', 'This phone is not signed in to an account.');
  const user = await store.get(U.user(link.phone));
  if (!user || user.ownerId !== b.ownerId) fail(404, 'no_account');
  user.salt = rid(16);
  user.hash = hashPhrase(b.phrase, user.salt);
  await store.set(U.user(link.phone), user, YEAR);
  return { ok: true };
}

module.exports.normPhrase = normPhrase;
