// Tells the app which services are connected.
// Voice ID needs no key: the speaker model runs on the phone and only needs Spitch for the confirmation recording.
const { hasDb, hasSms } = require('./_lib');
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    service: 'vosa',
    spitch: Boolean(process.env.SPITCH_API_KEY),
    voiceEn: Boolean(process.env.SPITCH_API_KEY && process.env.SPITCH_VOICE_EN),
    voicePcm: Boolean(process.env.SPITCH_API_KEY),
    db: hasDb(),
    sms: hasSms()
  });
};
