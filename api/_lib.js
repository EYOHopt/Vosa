// Shared helpers for the Vosa server functions (files starting with "_" are not public endpoints on Vercel).
const crypto = require('crypto');

const SPITCH = process.env.SPITCH_BASE_URL || 'https://api.spitch.app';

// ---------- request body ----------
async function readRaw(req) {
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
  return Buffer.concat(chunks);
}
// Works on Vercel (which pre-parses req.body) and on the local test server (which doesn't).
async function readBody(req) {
  if (req.method === 'GET') return {};
  if (req.body !== undefined && req.body !== null) {
    if (Buffer.isBuffer(req.body)) return parseText(req.body.toString('utf8'), req.headers['content-type']);
    if (typeof req.body === 'string') return parseText(req.body, req.headers['content-type']);
    if (typeof req.body === 'object') return req.body;
  }
  return parseText((await readRaw(req)).toString('utf8'), req.headers['content-type']);
}
function parseText(s, type) {
  if (!s) return {};
  if (/json/.test(type || '') || /^\s*[{[]/.test(s)) { try { return JSON.parse(s); } catch (e) { return {}; } }
  return Object.fromEntries(new URLSearchParams(s));
}
const query = (req) => Object.fromEntries(new URL(req.url, 'http://localhost').searchParams);
function baseUrl(req) {
  if (process.env.PUBLIC_BASE_URL) return process.env.PUBLIC_BASE_URL.replace(/\/$/, '');
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  return proto + '://' + (req.headers['x-forwarded-host'] || req.headers.host);
}

// ---------- database (Upstash Redis over HTTPS, set up from Vercel's Marketplace) ----------
const DB_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const DB_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const MEMORY = process.env.VOSA_MEMORY_DB === '1'; // local testing only: not shared between Vercel functions
const mem = global.__vosaMem || (global.__vosaMem = new Map());
const hasDb = () => !!(DB_URL && DB_TOKEN) || MEMORY;

async function redis(cmd) {
  const r = await fetch(DB_URL, { method: 'POST', headers: { Authorization: 'Bearer ' + DB_TOKEN, 'Content-Type': 'application/json' }, body: JSON.stringify(cmd) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error('Database error: ' + (j.error || r.status));
  return j.result;
}
const store = {
  async get(key) {
    if (!DB_URL && MEMORY) { const v = mem.get(key); if (!v) return null; if (v.exp && v.exp < Date.now()) { mem.delete(key); return null; } return JSON.parse(v.val); }
    const s = await redis(['GET', key]);
    return s ? JSON.parse(s) : null;
  },
  async set(key, val, ttlSec) {
    const s = JSON.stringify(val);
    if (!DB_URL && MEMORY) { mem.set(key, { val: s, exp: ttlSec ? Date.now() + ttlSec * 1000 : 0 }); return; }
    await redis(ttlSec ? ['SET', key, s, 'EX', String(ttlSec)] : ['SET', key, s]);
  },
  async del(key) {
    if (!DB_URL && MEMORY) { mem.delete(key); return; }
    await redis(['DEL', key]);
  }
};

// ---------- Spitch speech ----------
async function transcribe(audio, type, lang) {
  const key = process.env.SPITCH_API_KEY;
  if (!key) throw new Error('SPITCH_API_KEY is not set');
  const ext = /mp4|m4a/.test(type) ? 'm4a' : /ogg/.test(type) ? 'ogg' : /wav/.test(type) ? 'wav' : /mpeg|mp3/.test(type) ? 'mp3' : 'webm';
  const form = new FormData();
  form.append('content', new Blob([audio], { type }), 'speech.' + ext);
  form.append('language', lang);
  const r = await fetch(SPITCH + '/v1/transcriptions', { method: 'POST', headers: { Authorization: 'Bearer ' + key }, body: form });
  const raw = await r.text();
  if (!r.ok) { const e = new Error('Speech service error ' + r.status + ': ' + raw.slice(0, 200)); e.status = r.status; throw e; }
  return (JSON.parse(raw).text || '').trim();
}
function voiceFor(lang) {
  return lang === 'yo' ? (process.env.SPITCH_VOICE_YO || 'sade')
    : lang === 'pcm' ? (process.env.SPITCH_VOICE_PCM || 'ufoma')
    : (process.env.SPITCH_VOICE_EN || 'lucy');
}
async function speech(text, lang, speed) {
  const key = process.env.SPITCH_API_KEY;
  if (!key) throw new Error('SPITCH_API_KEY is not set');
  const call = (language) => fetch(SPITCH + '/v1/speech', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', Accept: 'audio/*' },
    body: JSON.stringify({ text, voice: voiceFor(lang), language, format: 'mp3', speed: Math.min(1.2, Math.max(0.7, Number(speed) || 1)) })
  });
  // Pidgin: try the Pidgin code first; if Spitch rejects it, the Pidgin voice reads it as English text.
  let r = await call(lang === 'yo' || lang === 'pcm' ? lang : 'en');
  if (!r.ok && lang === 'pcm') r = await call('en');
  if (!r.ok) { const e = new Error('Speech service error ' + r.status + ': ' + (await r.text()).slice(0, 200)); e.status = r.status; throw e; }
  return { audio: Buffer.from(await r.arrayBuffer()), type: r.headers.get('content-type') || 'audio/mpeg' };
}

// ---------- Africa's Talking SMS (optional) ----------
const AT_USER = process.env.AT_USERNAME;
const AT_KEY = process.env.AT_API_KEY;
const hasSms = () => !!(AT_USER && AT_KEY);
async function sendSms(to, message) {
  if (!hasSms() || !to) return false;
  const host = AT_USER === 'sandbox' ? 'https://api.sandbox.africastalking.com' : 'https://api.africastalking.com';
  const body = new URLSearchParams({ username: AT_USER, to: e164(to), message });
  if (process.env.AT_SMS_FROM) body.set('from', process.env.AT_SMS_FROM);
  try {
    const r = await fetch(host + '/version1/messaging', { method: 'POST', headers: { apiKey: AT_KEY, Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded' }, body });
    return r.ok;
  } catch (e) { return false; }
}

// ---------- small utilities ----------
// Nigerian numbers: 0803... / 234803... / +234803... -> +234803...
function e164(n) {
  let d = String(n || '').replace(/[^\d+]/g, '');
  if (d.startsWith('+')) return d;
  if (d.startsWith('234')) return '+' + d;
  if (d.startsWith('0') && d.length === 11) return '+234' + d.slice(1);
  return d ? '+' + d : '';
}
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const rid = (n) => crypto.randomBytes(n || 12).toString('hex');
const okToken = (t) => typeof t === 'string' && /^[a-f0-9]{16,64}$/.test(t);

module.exports = { readBody, query, baseUrl, hasDb, store, transcribe, speech, hasSms, sendSms, e164, sha, rid, okToken };
