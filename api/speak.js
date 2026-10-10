// Text -> speech using Spitch, so Vosa can answer out loud in Yorùbá.
const SPITCH = process.env.SPITCH_BASE_URL || 'https://api.spitch.app';

async function readJson(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
  const s = Buffer.concat(chunks).toString('utf8');
  return s ? JSON.parse(s) : {};
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  const key = process.env.SPITCH_API_KEY;
  if (!key) return res.status(503).json({ error: 'SPITCH_API_KEY is not set on the server' });

  try {
    const body = await readJson(req);
    const text = String(body.text || '').slice(0, 600);
    if (!text) return res.status(400).json({ error: 'No text' });
    const lang = ['yo', 'pcm'].includes(body.lang) ? body.lang : 'en';
    const voice = lang === 'yo' ? (process.env.SPITCH_VOICE_YO || 'sade')
      : lang === 'pcm' ? (process.env.SPITCH_VOICE_PCM || 'ufoma')
      : (process.env.SPITCH_VOICE_EN || 'lucy');
    const speed = Math.min(1.2, Math.max(0.7, Number(body.speed) || 1));
    const call = (language) => fetch(SPITCH + '/v1/speech', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', Accept: 'audio/*' },
      body: JSON.stringify({ text, voice, language, format: 'mp3', speed })
    });
    // Pidgin: try the Pidgin language code first; if Spitch rejects it, the Pidgin voice reads it as English text.
    let r = await call(lang);
    if (!r.ok && lang === 'pcm') r = await call('en');
    if (!r.ok) {
      const detail = (await r.text()).slice(0, 300);
      return res.status(502).json({ error: 'Speech service error', status: r.status, detail });
    }
    const audio = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', r.headers.get('content-type') || 'audio/mpeg');
    res.setHeader('Cache-Control', 'no-store');
    res.status(200).send(audio);
  } catch (e) {
    res.status(500).json({ error: 'Speech failed', detail: String(e && e.message || e) });
  }
};
