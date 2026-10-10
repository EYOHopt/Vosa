// Speech -> text using Spitch (Yorùbá, English and other Nigerian languages).
// The browser posts the raw recording; the API key never leaves the server.
const SPITCH = process.env.SPITCH_BASE_URL || 'https://api.spitch.app';

async function readBody(req) {
  const chunks = [];
  for await (const c of req) chunks.push(typeof c === 'string' ? Buffer.from(c) : c);
  return Buffer.concat(chunks);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  const key = process.env.SPITCH_API_KEY;
  if (!key) return res.status(503).json({ error: 'SPITCH_API_KEY is not set on the server' });

  try {
    const audio = await readBody(req);
    if (!audio.length) return res.status(400).json({ error: 'No audio received' });
    if (audio.length > 8 * 1024 * 1024) return res.status(413).json({ error: 'Recording too long' });

    const url = new URL(req.url, 'http://localhost');
    const lang = ['yo', 'en', 'ha', 'ig'].includes(url.searchParams.get('lang')) ? url.searchParams.get('lang') : 'yo';
    const type = String(req.headers['content-type'] || 'audio/webm').split(';')[0];
    const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : type.includes('wav') ? 'wav' : type.includes('mpeg') ? 'mp3' : 'webm';

    const form = new FormData();
    form.append('content', new Blob([audio], { type }), 'speech.' + ext);
    form.append('language', lang);

    const r = await fetch(SPITCH + '/v1/transcriptions', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + key },
      body: form
    });
    const raw = await r.text();
    if (!r.ok) return res.status(502).json({ error: 'Speech service error', status: r.status, detail: raw.slice(0, 300) });
    const data = JSON.parse(raw);
    res.status(200).json({ text: (data.text || '').trim() });
  } catch (e) {
    res.status(500).json({ error: 'Transcription failed', detail: String(e && e.message || e) });
  }
};
