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
| `src/ui.js` | Screen, microphone, voice replies, confirmations and Voice ID |
| `public/models/voice-id.onnx` | Voice ID speaker model (WeSpeaker ResNet34, VoxCeleb) |
| `public/vendor/` | ONNX Runtime Web, which runs the Voice ID model on the phone (MIT licence) |
| `api/transcribe.js` | Sends a recording to Spitch and gets text back (Yorùbá speech to text) |
| `api/speak.js` | Sends text to Spitch and gets a Yorùbá voice reply back |
| `api/health.js` | Tells the app which services are connected |
| `api/circle.js` | Trusted Circle: helper invites, approvals, helper payments, syncing |
| `api/_lib.js`, `api/_account.js` | Shared server code (database, speech, SMS, account) |
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

### Voice ID (no extra setup)

Voice ID checks that it's really the account owner speaking before money is sent or withdrawn. It runs entirely on the phone:

- **Model:** WeSpeaker ResNet34, a speaker-recognition model trained on VoxCeleb (over 7,000 speakers). It's stored as `public/models/voice-id.onnx`, compressed to 6.7 MB with 8-bit weights, with no loss of accuracy in our tests.
- **Runtime:** ONNX Runtime Web 1.22 (WebAssembly), in `public/vendor/`.
- **No outside services:** no account, no key and no CDN. Everything is served from your own Vercel site. Voices never leave the phone. The confirmation recording goes to Spitch only to read the words, so `SPITCH_API_KEY` must be set.

Voice ID is **required** to send or withdraw money once Spitch is connected. If it isn't set up, Vosa stops and offers to set it up, then carries on with the transfer. You can also say "set up voice ID". For testing only, Settings → Require Voice ID can be turned off.

Steps:

1. On your phone: **Settings → Voice ID → Set up** (new users are offered this at the end of setup). The first time, the phone downloads about 18 MB, then keeps it.
2. Read the three sentences until the bar is full (about 15 seconds of speech). If it was too noisy or someone else was talking, Vosa asks you to redo it.

How a transfer or withdrawal is confirmed:
- **Secret phrase:** what you know.
- **Three random numbers, new every time:** stops someone playing back a recording of you.
- **Your voice:** stops someone else saying your phrase.

The voice match score is cosine similarity. Settings → Voice match sets the bar: Relaxed 40% / Normal 50% (default) / Strict 60%. In our tests with real recordings, played through Chrome's microphone into the app:

| Who spoke | Voice match | Result |
|---|---|---|
| The owner (3 tries, including one with background noise) | 64–76% | Money sent |
| 6 other people | 0–25% | Refused |

The receipt shows the score, for example "Phrase, numbers, voice (72%)". Phones and rooms differ, so try it yourself and with a friend before the pitch. There's a fingerprint (demo) backup for noisy places.

### Trusted Circle (helpers instead of sharing your PIN)

People who need help with money often hand their PIN to a relative or agent. With Trusted Circle they add up to 3 helpers instead, each with limited rights:

| Role | Can | Can never |
|---|---|---|
| **Approver** | Approve or decline big or unusual transfers; see balance and activity | Move money, change the secret phrase, Voice ID or helpers |
| **Watcher** | See balance and activity | Move or approve anything |
| **Spender** | Pay the owner's contacts, up to a monthly limit (₦10k / ₦30k / ₦50k) | See the balance, go over the limit |

A transfer waits for an approver when it is at or above the owner's limit (₦10k / ₦20k / ₦50k, default ₦20k), or ₦5,000+ to someone the owner has never paid. Saying "cancel" while waiting cancels it.

Voice: "Add Bisi as my helper", "Who are my helpers?", "Who has seen my account?", "Remove Bisi".

**Set up (2 minutes, free):** in Vercel, open the project → **Storage** (or **Marketplace**) → **Upstash** → **Redis** → create a free database and **connect it to this project**. Vercel adds the keys (`KV_REST_API_URL`, `KV_REST_API_TOKEN`) for you. Redeploy. In the app, Settings → Trusted Circle → Add a helper; send the link to the helper's phone; they tap Accept.

Without the database, Trusted Circle still works in **demo mode**: the helper's approval appears on the same phone.


### Optional settings

| Variable | What it does |
|---|---|
| `SPITCH_VOICE_YO` | Yorùbá voice. The default is `sade`; Spitch also lists `segun`, `femi` and `funmi`. |
| `SPITCH_VOICE_PCM` | Pidgin voice. The default is `ufoma`; Spitch also has `boma`, `tega` and `justice`. |
| `SPITCH_VOICE_EN` | Optional default English voice (`lucy`, `lina`, `john`, `jude`, `henry`, `kani`, `kingsley`, `remi`). People can also pick a voice in Settings → Vosa's voice → Which voice, and hear a sample. Spoken replies are cached on the phone, so a sentence said before costs no credit. |

### Voice Promise (your own voice protects your savings)

When you set a savings goal, Vosa offers to record a short promise in your own voice ("This is for Tolu's school fees. Don't let me touch it before January."). If you later try to take money out before the goal is reached, Vosa plays your promise back and asks: "Is this an emergency?"

- **No:** nothing moves. "Your money stays safe."
- **Yes, with a trusted helper:** you confirm as usual, then your approver must approve it. Their page tells them to call you first and ask what the emergency is.
- **Yes, with no helper:** Vosa holds the amount for 24 hours, then lets it through.

Say "record a promise for rent", "play my promise", or use the Voice Promise row on a goal's page. Recordings never leave the phone. It is the ajo witness, digitised: a soft commitment that still lets real emergencies through.

## How voice works

| Language | Hearing you | Talking back |
|---|---|---|
| English | The phone browser's speech recognition (best in Chrome) | The phone's built-in voice |
| Pidgin | The phone browser's speech recognition | Spitch Pidgin voice (Ufoma) when the key is set |
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
- "Send 5k to Tunde" → "blue mango" plus the numbers → "yes" (accepts the savings nudge)
- "I wan send money to GTB account" → Vosa asks for the account number → "0 1 2 3 4 5 6 7 8 9" → "5k" → phrase and numbers
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
- **Change the secret phrase** by saying, e.g., "change my secret phrase to red pepper". With Voice ID set up, only the owner's voice can move money.
- **Hands-free on a phone:** Chrome sometimes stops listening when the screen locks. Keep the screen on during the demo.
- It's a demo: the money is pretend, nothing connects to a bank, and data is saved only in the browser. Use "Reset demo" to start again.
