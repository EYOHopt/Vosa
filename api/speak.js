// Text -> speech using Spitch, so Vosa can answer out loud in Yorùbá and Pidgin.
// POST or GET {text, lang, speed, voice} from the app. GET replies are cacheable, so a sentence said twice costs one Spitch call.
const { readBody, query, speech } = require('./_lib');

module.exports = async (req, res) => {
  if (!['POST', 'GET'].includes(req.method)) return res.status(405).json({ error: 'Use POST or GET' });
  if (!process.env.SPITCH_API_KEY) return res.status(503).json({ error: 'SPITCH_API_KEY is not set on the server' });
  try {
    const body = req.method === 'GET' ? query(req) : await readBody(req);
    const text = String(body.text || '').slice(0, 600);
    if (!text) return res.status(400).json({ error: 'No text' });
    const lang = ['yo', 'pcm', 'ha', 'ig'].includes(body.lang) ? body.lang : 'en';
    const out = await speech(text, lang, body.speed, body.voice);
    res.setHeader('Content-Type', out.type);
    res.setHeader('Cache-Control', req.method === 'GET' ? 'public, max-age=86400' : 'no-store');
    res.status(200).send(out.audio);
  } catch (e) {
    res.status(e.status ? 502 : 500).json({ error: 'Speech failed', detail: String(e && e.message || e) });
  }
};
