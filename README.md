# Vosa: if you can talk, you can save

Vosa is a voice-first money app with savings at its heart. Anyone can use it by speaking, including people who are blind, people who can't use their hands, and people who find text-heavy apps hard.

You can speak English, Nigerian Pidgin or Yorùbá to:

- **Save:** put money into goals, create goals with deadlines (it works out the weekly amount) and turn on auto-save for money you receive.
- **Spend:** send money to contacts or account numbers, buy airtime, and check your wallet and account number.
- **Learn:** ask simple questions such as "what is inflation?"

Every transfer ends with a savings nudge, and every incoming payment can be auto-saved. Withdrawals and transfers need a **spoken secret phrase** (the demo phrase is `blue mango`), so no hands are needed. The money in the demo is pretend.

**Hands-free mode:** say "turn on hands-free" or tap the button, and Vosa listens again after every reply, so nobody has to touch the screen. The space bar also starts listening, for keyboard and switch users.

## Look and feel

Light mode, white with a light-green signature and one deep green (#0C6B35) for buttons and the balance card. Plus Jakarta Sans for English and Pidgin; Noto Sans for Yorùbá so tone marks render correctly. The layout follows familiar Nigerian savings apps: greeting header, balance card with hide toggle, quick actions (Save, Send, Airtime, Withdraw), a "Talk to Vosa" card, savings list and recent activity. Confirmations, listening and errors open as bottom sheets.

## What's in this folder

| Path | What it is |
|---|---|
| `public/index.html` | The app (built from `src/`) |
| `src/logic.js` | Understands what people say: amounts, goals and dates in English, Pidgin and Yorùbá. All the replies are here too. |
| `src/ui.js` | Screen, microphone, voice replies and confirmations |
| `api/transcribe.js` | Sends a recording to Spitch and gets text back (Yorùbá speech to text) |
| `api/speak.js` | Sends text to Spitch and gets a Yorùbá voice reply back |
| `api/health.js` | Tells the app whether Spitch is connected |
| `server.js` | Runs the app on your own computer (`npm start`) |

## Put it online (about 30 minutes, free)

1. **Get a Spitch API key.** Sign up at https://spitch.app, open the developer dashboard and create an API key. Copy it somewhere safe and don't share it publicly.
2. **Put the code on GitHub.** Create a free account at https://github.com, then create a new repository called `vosa`. Click **"uploading an existing file"**, drag in everything in this folder (keep the `api`, `public`, `src` and `test` folders), and click **Commit changes**.
3. **Deploy on Vercel.** Sign in at https://vercel.com with your GitHub account. Click **Add New → Project**, pick the `vosa` repository and click **Deploy**. Leave all settings as they are.
4. **Add the key.** In Vercel, open the project, go to **Settings → Environment Variables** and add:
   - Name: `SPITCH_API_KEY`
   - Value: your Spitch key

   Then go to **Deployments**, open the menu (**⋯**) on the latest one and click **Redeploy**.
5. **Open your link** (something like `vosa-xyz.vercel.app`) in **Chrome** on your phone. Allow the microphone when asked.

At the bottom right of the app, you should see **"Yorùbá voice: Spitch"**. If you don't, the key isn't set yet.

### Optional settings

| Variable | What it does |
|---|---|
| `SPITCH_VOICE_YO` | Yorùbá voice. The default is `sade`; Spitch also lists `segun`, `femi` and `funmi`. |
| `SPITCH_VOICE_EN` | Set this (for example `lucy` or `john`) to use a Spitch voice for English and Pidgin replies instead of the phone's built-in voice. |

## How voice works

| Language | Hearing you | Talking back |
|---|---|---|
| English / Pidgin | The phone browser's speech recognition (best in Chrome) | The phone's built-in voice |
| Yorùbá | Spitch | Spitch (Yorùbá voice) |

Without a Spitch key, English and Pidgin voice still work, and Yorùbá works by typing or tapping the examples.

Vosa also switches language automatically: speak Yorùbá while it's set to English, and it switches to Yorùbá and replies in Yorùbá.

## Run it on your own computer

You need Node.js 18 or later.

```
npm start                                   # opens at http://localhost:3000
SPITCH_API_KEY=your_key npm start           # with Yorùbá speech
npm test                                    # checks the phrase understanding
```

## Things to say in the demo

- "Turn on hands-free" (after this, no more tapping)
- "Send 5k to Tunde" → "blue mango" → "yes" (accepts the savings nudge)
- "Save 10% of any money I receive", then tap **Simulate ₦50,000 coming in**
- "Buy 1,000 MTN airtime" → "yes"
- "What is my account number?"
- "Save 5,000 for rent" → "yes"
- "How much do I have?"
- "I want to save 200k for school fees by January" → "yes" (it works out the weekly amount)
- "Withdraw 3,000 from rent" → "blue mango" (the spoken secret phrase)
- "Fi ẹgbẹ̀rún márùn-ún pamọ́ fún owó ilé" → "Bẹ́ẹ̀ni"
- "Èló ló wà nínú àpò mi?"
- "Wetin be inflation?"
- "Remind me every Friday"

## Before the pitch, please check

- **Yorùbá wording:** a fluent Yorùbá speaker should read the replies in `src/logic.js` (the `yo:` lines) and `src/ui.js` (the `T` table) and fix anything that sounds unnatural. Then run `npm run build` (Vercel also rebuilds automatically).
- **Amounts in Yorùbá voice replies** are read from digits, e.g. "₦5,000" becomes "5,000 náírà". Check how the Spitch voice pronounces them.
- **Spitch costs:** check the free credits and pricing on your Spitch dashboard.
- **Change the secret phrase** by saying, e.g., "change my secret phrase to red pepper". In the pitch, explain that the real product would add voice recognition, so only the owner's voice can move money.
- **Hands-free on a phone:** Chrome sometimes stops listening when the screen locks. Keep the screen on during the demo.
- It's a demo: the money is pretend, nothing connects to a bank, and data is saved only in the browser. Use "Reset demo" to start again.
