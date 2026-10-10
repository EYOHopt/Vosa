// Tells the app whether the Yorùbá speech service is connected.
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    service: 'vosa',
    spitch: Boolean(process.env.SPITCH_API_KEY),
    voiceEn: Boolean(process.env.SPITCH_API_KEY && process.env.SPITCH_VOICE_EN)
  });
};
