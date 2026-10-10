(function () {
  'use strict';
  const L = window.VosaLogic;
  const $ = (id) => document.getElementById(id);

  // ---------- icons ----------
  const IC = {
    mic: '<rect x="9" y="2" width="6" height="12" rx="3" fill="currentColor"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    pot: '<rect x="4" y="7" width="16" height="14" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M9 13h6"/>',
    potplus: '<rect x="4" y="7" width="16" height="14" rx="3"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M12 11v6M9 14h6"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    sliders: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    wave: '<path d="M3 12h1M7 8v8M11 5v14M15 8v8M19 10v4"/>',
    speaker: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    in: '<path d="M17 7L7 17M7 9v8h8"/>',
    out: '<path d="M7 17L17 7M9 7h8v8"/>',
    phone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    send: '<path d="M4 12l16-8-6 16-3-7z"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="3" fill="currentColor" stroke="none"/>',
    micoff: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M3 3l18 18"/>',
    finger: '<path d="M12 11v4M8.5 8.5a5 5 0 0 1 8.5 3.5v2M7 12v1a5 5 0 0 0 1 3M12 4a8 8 0 0 1 8 8v1M4 12a8 8 0 0 1 3-6.2"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.6A17 17 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
    kbd: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5M8 7h7"/>',
    bag: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M12 9v6M9 12h6"/>',
    plane: '<path d="M10.5 13.5L3 11l1.5-1.5 8 1 4-4a2 2 0 0 1 3 3l-4 4 1 8L15 23l-2.5-7.5"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    gift: '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M12 8v13M3 12h18M12 8S10 3 7.5 4.5 9 8 12 8zM12 8s2-5 4.5-3.5S15 8 12 8z"/>',
    car: '<path d="M5 17h14v-5l-2-5H7l-2 5z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>'
  };
  function icon(name, size, sw) {
    const s = document.createElement('span');
    s.style.display = 'inline-grid';
    s.innerHTML = '<svg width="' + (size || 24) + '" height="' + (size || 24) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (sw || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + IC[name] + '</svg>';
    return s;
  }
  function h(tag, props) {
    const el = document.createElement(tag);
    if (props) for (const k in props) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (let i = 2; i < arguments.length; i++) {
      const kids = [].concat(arguments[i]);
      for (const c of kids) { if (c == null || c === false) continue; el.append(c.nodeType ? c : document.createTextNode(String(c))); }
    }
    return el;
  }

  // ---------- UI text (English, Pidgin, Yorùbá; Pidgin falls back to English) ----------
  const T = {
    greetM: { en: 'Good morning, Bisi.', pcm: 'Good morning o, Bisi!', yo: 'Ẹ kú àárọ̀, Bisi.' },
    greetA: { en: 'Good afternoon, Bisi.', pcm: 'How far, Bisi!', yo: 'Ẹ kú ọ̀sán, Bisi.' },
    greetE: { en: 'Good evening, Bisi.', pcm: 'Good evening o, Bisi!', yo: 'Ẹ kú alẹ́, Bisi.' },
    total: { en: 'Total saved', pcm: 'All your savings', yo: 'Àpapọ̀ owó tí o fi pamọ́' },
    wallet: { en: 'Wallet', yo: 'Àpò owó' },
    acct: { en: 'Account', yo: 'Àkáǹtì' },
    trySay: { en: 'Try saying', pcm: 'Try talk am', yo: 'Gbìyànjú kí o sọ pé' },
    pots: { en: 'Savings pots', yo: 'Àwọn àpò ìfowópamọ́' },
    seeAll: { en: 'See all {n}', yo: 'Wo gbogbo {n}' },
    sendMoney: { en: 'Send money', yo: 'Fi owó ránṣẹ́' },
    buyAirtime: { en: 'Buy airtime', yo: 'Ra káàdì ìpè' },
    noTarget: { en: 'No target · take out any time', pcm: 'No target · comot am anytime', yo: 'Kò sí àfojúsùn · o lè yọ ọ́ nígbàkúgbà' },
    of: { en: 'of', yo: 'nínú' },
    by: { en: 'by', pcm: 'before', yo: 'títí' },
    onTrack: { en: 'On track · {w} a week', pcm: 'On track · {w} every week', yo: 'Ó ń lọ dáadáa · {w} lọ́sẹ̀' },
    behind: { en: 'Behind · needs {w} a week', pcm: 'You don fall back · need {w} every week', yo: 'Ó ń lẹ́yìn · ó nílò {w} lọ́sẹ̀' },
    reachedTag: { en: 'Target reached', pcm: 'You don reach target', yo: 'O ti dé àfojúsùn' },
    potsSub: { en: '{t} saved across {n} pots', pcm: '{t} dey inside {n} pots', yo: '{t} wà nínú àpò {n}' },
    newGoal: { en: 'New savings goal', yo: 'Àfojúsùn tuntun' },
    orSayGoal: { en: 'Or say “I want to save for…”', pcm: 'Or talk “I wan save for…”', yo: 'Tàbí sọ pé “Mo fẹ́ fowó pamọ́ fún…”' },
    activity: { en: 'Activity', yo: 'Ìtàn' },
    actHint: { en: 'Say “How much do I have?”', pcm: 'Talk “How much I get?”', yo: 'Sọ pé “Èló ló wà nínú àpò mi?”' },
    today: { en: 'Today', yo: 'Lónìí' },
    earlier: { en: 'Earlier', pcm: 'Before', yo: 'Ṣáájú' },
    noActivity: { en: 'Nothing yet. Try: send 5k to Tunde.', pcm: 'Nothing yet. Try: send 5k give Tunde.', yo: 'Kò sí nǹkan síbẹ̀. Gbìyànjú: fi ẹgbẹ̀rún márùn-ún ránṣẹ́ sí Tunde.' },
    settings: { en: 'Settings', yo: 'Ètò' },
    language: { en: 'Language', yo: 'Èdè' },
    voiceSpeed: { en: 'Voice speed', yo: 'Ìyára ohùn' },
    slow: { en: 'Slow', yo: 'Díẹ̀díẹ̀' }, normal: { en: 'Normal', yo: 'Déédé' }, fast: { en: 'Fast', yo: 'Kíákíá' },
    handsFree: { en: 'Hands-free' },
    hfDesc: { en: 'Listen again after every reply', yo: 'Gbọ́ lẹ́yìn ìdáhùn kọ̀ọ̀kan' },
    sound: { en: 'Spoken replies', pcm: 'Talk back', yo: 'Ìdáhùn ohùn' },
    soundDesc: { en: 'Vosa reads every reply aloud', pcm: 'Vosa go read every reply out', yo: 'Vosa yóò ka ìdáhùn sókè' },
    secret: { en: 'Secret phrase', yo: 'Ọ̀rọ̀ àṣírí' },
    secretDesc: { en: 'Demo phrase: “{p}”. Say “change my secret phrase to …”', pcm: 'Demo phrase: “{p}”. Talk “change my secret phrase to …”', yo: 'Ọ̀rọ̀ àpẹẹrẹ: “{p}”. Sọ pé “change my secret phrase to …”' },
    textSize: { en: 'Text size', yo: 'Ìwọ̀n ọ̀rọ̀' },
    srTips: { en: 'Screen reader tips', yo: 'Ìmọ̀ràn fún screen reader' },
    srBody: { en: 'Vosa works with TalkBack and VoiceOver. Every button has a spoken label and replies are read out automatically. You can also skip the screen: turn on hands-free and just talk.', pcm: 'Vosa dey work with TalkBack and VoiceOver. Every button get name wey dem go read, and I go read every reply out. You fit even forget the screen: on hands-free and just talk.', yo: 'Vosa ń ṣiṣẹ́ pẹ̀lú TalkBack àti VoiceOver. Gbogbo bọ́tìnnì ló ní orúkọ tí a ń kà, a sì ń ka ìdáhùn sókè fúnra rẹ̀. O tún lè tan hands-free kí o sì kàn sọ̀rọ̀.' },
    open: { en: 'Open', yo: 'Ṣí i' },
    engineLbl: { en: 'Voice engine', yo: 'Ẹ̀rọ ohùn' },
    demoTools: { en: 'Demo tools', yo: 'Irinṣẹ́ àpẹẹrẹ' },
    simulate: { en: 'Simulate ₦50,000 coming in', pcm: 'Make ₦50,000 enter (demo)', yo: 'Jẹ́ kí ₦50,000 wọlé (àpẹẹrẹ)' },
    reset: { en: 'Reset demo', yo: 'Tún bẹ̀rẹ̀' },
    on: { en: 'On', yo: 'Wà' }, off: { en: 'Off', yo: 'Kò sí' },
    tHome: { en: 'Home', yo: 'Ilé' }, tPots: { en: 'Savings', yo: 'Ìfowópamọ́' }, tAct: { en: 'Activity', yo: 'Ìtàn' }, tSet: { en: 'Settings', yo: 'Ètò' },
    speak: { en: 'Speak', pcm: 'Talk', yo: 'Sọ̀rọ̀' }, stopLbl: { en: 'Stop', yo: 'Dúró' },
    micAria: { en: 'Speak to Vosa', pcm: 'Talk to Vosa', yo: 'Bá Vosa sọ̀rọ̀' },
    replayAria: { en: 'Play the reply again', pcm: 'Play am again', yo: 'Tún ìdáhùn sọ' },
    typeInstead: { en: 'Type instead', pcm: 'Type am instead', yo: 'Kọ ọ́ dípò' },
    hideTyping: { en: 'Hide typing', yo: 'Pa á mọ́' },
    typePh: { en: 'Type what you want to say', pcm: 'Type wetin you wan talk', yo: 'Kọ ohun tí o fẹ́ sọ' },
    sendTyped: { en: 'Send', yo: 'Fi ránṣẹ́' },
    youSaid: { en: 'You said:', pcm: 'You talk:', yo: 'O sọ pé:' },
    listening: { en: 'Listening…', pcm: 'I dey hear you…', yo: 'Mo ń gbọ́…' },
    working: { en: 'Working it out…', pcm: 'I dey check am…', yo: 'Mo ń ṣiṣẹ́ lé e lórí…' },
    youSaying: { en: "You're saying", pcm: 'You dey talk', yo: 'Ohun tí o ń sọ' },
    tapFinish: { en: 'Tap to finish, or just stop talking', pcm: 'Tap to finish, or just stop to talk', yo: 'Tẹ̀ ẹ́ láti parí, tàbí kí o kàn dákẹ́' },
    hfStop: { en: 'Say “stop listening” to pause hands-free', pcm: 'Talk “stop listening” to pause hands-free', yo: 'Sọ “stop listening” láti dá hands-free dúró' },
    cancel: { en: 'Cancel', yo: 'Fagilé' },
    kSave: { en: 'Save', yo: 'Fi pamọ́' }, kSend: { en: 'Send', yo: 'Fi ránṣẹ́' }, kMove: { en: 'Move to wallet', pcm: 'Comot to wallet', yo: 'Gbé lọ sí àpò owó' },
    kAirtime: { en: 'Airtime', yo: 'Káàdì ìpè' }, kGoal: { en: 'New goal', yo: 'Àfojúsùn tuntun' },
    rTo: { en: 'To', pcm: 'Give', yo: 'Sí' }, rFrom: { en: 'From', yo: 'Láti' }, rFor: { en: 'For', yo: 'Fún' }, rBy: { en: 'By', pcm: 'Before', yo: 'Títí' }, rWeekly: { en: 'Each week', pcm: 'Every week', yo: 'Lọ́sẹ̀' }, rGoal: { en: 'Goal', yo: 'Àfojúsùn' },
    yesSave: { en: 'Yes, save {a}', yo: 'Bẹ́ẹ̀ni, fi {a} pamọ́' },
    yesBuy: { en: 'Yes, buy {a}', yo: 'Bẹ́ẹ̀ni, ra {a}' },
    yesCreate: { en: 'Yes, create goal', pcm: 'Yes, open the goal', yo: 'Bẹ́ẹ̀ni, ṣí i' },
    noCancel: { en: 'No, cancel', pcm: 'No, cancel am', yo: 'Rárá, fagilé' },
    sayPhrase: { en: 'Say your secret phrase', pcm: 'Talk your secret phrase', yo: 'Sọ ọ̀rọ̀ àṣírí rẹ' },
    imListening: { en: "I'm listening…", pcm: 'I dey listen…', yo: 'Mo ń gbọ́…' },
    typePhrase: { en: 'or type it below', pcm: 'or type am for down', yo: 'tàbí kọ ọ́ sí ìsàlẹ̀' },
    triesLeft: { en: '{n} tries left', pcm: '{n} tries remain', yo: 'Ìgbìyànjú {n} ló kù' },
    fingerprint: { en: 'Use fingerprint (demo)', yo: 'Lo ìka (àpẹẹrẹ)' },
    listenYesNo: { en: 'Listening for “yes” or “no”', pcm: 'I dey wait for “yes” or “no”', yo: 'Mo ń gbọ́ “bẹ́ẹ̀ni” tàbí “rárá”' },
    savedTo: { en: 'Saved to {g}', pcm: 'E don enter {g}', yo: 'Ó ti wọ {g}' },
    sentTo: { en: 'Sent to {n}', pcm: 'E don reach {n}', yo: 'Ó ti dé ọ̀dọ̀ {n}' },
    moved: { en: 'Moved to your wallet', pcm: 'E don enter your wallet', yo: 'Ó ti wọ àpò owó rẹ' },
    airtimeSent: { en: 'Airtime sent', pcm: 'Airtime don land', yo: 'Káàdì ìpè ti dé' },
    goalSet: { en: 'Goal created', pcm: 'Goal don set', yo: 'A ti ṣètò àfojúsùn' },
    walletNow: { en: 'Wallet now', yo: 'Àpò owó báyìí' },
    backHome: { en: 'Back to home', pcm: 'Go back home', yo: 'Padà sí ilé' },
    nudgeQ: { en: 'Want to save {a} to {g} too?', pcm: 'You wan save {a} put for {g} too?', yo: 'Ṣé kí n fi {a} pamọ́ sínú {g} pẹ̀lú?' },
    yesShort: { en: 'Yes, save', yo: 'Bẹ́ẹ̀ni' }, noThanks: { en: 'No thanks', pcm: 'No, thank you', yo: 'Rárá o ṣé' },
    orSayYesNo: { en: 'Or say “yes” or “no”', pcm: 'Or talk “yes” or “no”', yo: 'Tàbí sọ “bẹ́ẹ̀ni” tàbí “rárá”' },
    moneyIn: { en: 'Money in', pcm: 'Money don enter', yo: 'Owó wọlé' },
    fromN: { en: 'From {n}', yo: 'Láti ọ̀dọ̀ {n}' },
    savedForYou: { en: 'I saved {a} for you, as you asked.', pcm: 'I don save {a} for you as you talk.', yo: 'Mo ti fi {a} pamọ́ fún ọ, gẹ́gẹ́ bí o ṣe sọ.' },
    saveTenQ: { en: 'Want me to save 10% of it ({a})?', pcm: 'Make I save 10% of am ({a})?', yo: 'Ṣé kí n fi 10% rẹ̀ ({a}) pamọ́?' },
    autoSave: { en: 'Auto-save' },
    okThanks: { en: 'OK, thanks', pcm: 'Okay, thank you', yo: 'Ó dáa, o ṣé' },
    undo: { en: 'Undo this auto-save', pcm: 'Reverse this auto-save', yo: 'Dá auto-save yìí padà' },
    undone: { en: 'Done. I moved {a} back to your wallet.', pcm: 'I don return {a} to your wallet.', yo: 'Mo ti dá {a} padà sí àpò owó rẹ.' },
    kDidnt: { en: "Didn't catch that", pcm: 'I no hear am', yo: 'Mi ò gbọ́ ọ' },
    kNoMoney: { en: 'Not enough money', pcm: 'Money no reach', yo: 'Owó kò tó' },
    kLocked: { en: 'Cancelled for safety', pcm: 'Cancelled make e safe', yo: 'A fagilé e fún ààbò' },
    kMic: { en: 'Microphone blocked', pcm: 'Microphone no dey work', yo: 'Máíkì kò ṣiṣẹ́' },
    kNoGoal: { en: 'No pot yet', yo: 'Kò sí àpò síbẹ̀' },
    kNoContact: { en: 'Not in your contacts', pcm: 'No dey your contacts', yo: 'Kò sí nínú olùbásọ̀rọ̀ rẹ' },
    kWrongPhrase: { en: 'Wrong secret phrase', yo: 'Ọ̀rọ̀ àṣírí kò tọ̀nà' },
    micTitle: { en: "I can't hear you. The microphone is off for Vosa.", pcm: 'I no fit hear you. Microphone dey off for Vosa.', yo: 'Mi ò lè gbọ́ ọ. Máíkì ti pa fún Vosa.' },
    micBody: { en: 'Open phone settings › Apps › Vosa › Microphone › Allow. In the Claude preview the microphone is always blocked, so type or tap an example.', pcm: 'Open phone settings › Apps › Vosa › Microphone › Allow. For the Claude preview, microphone no dey work, so type or tap example.', yo: 'Ṣí ètò fóònù › Apps › Vosa › Microphone › Allow. Nínú àpẹẹrẹ Claude, máíkì kì í ṣiṣẹ́, nítorí náà kọ ọ́ tàbí tẹ àpẹẹrẹ kan.' },
    tryAgain: { en: 'Try again', yo: 'Tún gbìyànjú' }, ok: { en: 'OK', yo: 'Ó dáa' },
    createGoal: { en: 'Create goal', pcm: 'Open goal', yo: 'Ṣí àfojúsùn' },
    welcomeT: { en: 'If you can talk, you can save.', pcm: 'If you fit talk, you fit save.', yo: 'Tí o bá lè sọ̀rọ̀, o lè fowó pamọ́.' },
    chooseLang: { en: 'Hello, I am Vosa. Which language do you want? Tap or say English, Pidgin or Yorùbá.', pcm: 'How far! Na Vosa be this. Which language you want? Tap or talk English, Pidgin or Yorùbá.', yo: 'Ẹ kú àbọ̀! Èmi ni Vosa. Èdè wo ni o fẹ́? Tẹ̀ tàbí sọ English, Pidgin tàbí Yorùbá.' },
    cont: { en: 'Continue', yo: 'Tẹ̀síwájú' },
    step: { en: 'Step {n} of 2', yo: 'Ìgbésẹ̀ {n} nínú 2' },
    howTalk: { en: 'How do you want to talk to Vosa?', pcm: 'How you wan dey talk to Vosa?', yo: 'Báwo ni o ṣe fẹ́ bá Vosa sọ̀rọ̀?' },
    hfOptD: { en: 'I listen again after every reply. No tapping at all.', pcm: 'I go listen again after every reply. No tapping at all.', yo: 'Màá tún gbọ́ lẹ́yìn ìdáhùn kọ̀ọ̀kan. Kò sí títẹ̀ rárá.' },
    tapOpt: { en: 'Tap to talk', yo: 'Tẹ̀ láti sọ̀rọ̀' },
    tapOptD: { en: 'Tap the green button or press space each time.', pcm: 'Tap the green button or press space every time.', yo: 'Tẹ bọ́tìnnì aláwọ̀ ewé tàbí space nígbà kọ̀ọ̀kan.' },
    phraseInfo: { en: 'To send or withdraw money you say a secret phrase. For this demo it is “{p}”.', pcm: 'To send or comot money, you go talk secret phrase. For this demo na “{p}”.', yo: 'Láti fi owó ránṣẹ́ tàbí yọ owó, o máa sọ ọ̀rọ̀ àṣírí. Fún àpẹẹrẹ yìí, ó jẹ́ “{p}”.' },
    finish: { en: 'Finish setup', yo: 'Parí ètò' },
    whatFor: { en: 'What are you saving for?', pcm: 'Wetin you dey save for?', yo: 'Kí ni o ń fowó pamọ́ fún?' },
    howMuchNeed: { en: 'How much do you need?', pcm: 'How much you need?', yo: 'Èló ni o nílò?' },
    byWhen: { en: 'By when?', pcm: 'Before when?', yo: 'Títí di ìgbà wo?' },
    saveAbout: { en: 'To get there, save about', pcm: 'To reach am, save like', yo: 'Láti dé ibẹ̀, fi pamọ́ tó' },
    aWeek: { en: 'a week', pcm: 'every week', yo: 'lọ́sẹ̀' },
    weeksMonth: { en: '{w} weeks · or {m} a month', pcm: '{w} weeks · or {m} every month', yo: 'Ọ̀sẹ̀ {w} · tàbí {m} lóṣù' },
    other: { en: 'Other', yo: 'Òmíràn' },
    sendTo: { en: 'Send to', pcm: 'Send give', yo: 'Fi ránṣẹ́ sí' },
    amount: { en: 'Amount', yo: 'Iye owó' },
    lastStep: { en: 'Last step: say your secret phrase.', pcm: 'Last step: talk your secret phrase.', yo: 'Ìgbésẹ̀ ìkẹyìn: sọ ọ̀rọ̀ àṣírí rẹ.' },
    sendBtn: { en: 'Send {a} to {n}', pcm: 'Send {a} give {n}', yo: 'Fi {a} ránṣẹ́ sí {n}' },
    orSaySend: { en: 'Or say “Send 5k to Tunde”', pcm: 'Or talk “Send 5k give Tunde”', yo: 'Tàbí sọ pé “Fi ẹgbẹ̀rún márùn-ún ránṣẹ́ sí Tunde”' },
    network: { en: 'Network', yo: 'Nẹ́tíwọ̀ọ̀kì' },
    myLine: { en: 'My line', yo: 'Nọ́ńbà mi' },
    another: { en: 'Another number', yo: 'Nọ́ńbà míì' },
    buyBtn: { en: 'Buy {a} {n} airtime', yo: 'Ra káàdì ìpè {n} ti {a}' },
    orSayAirtime: { en: 'Or say “Buy 1k MTN airtime”', pcm: 'Or talk “Buy 1k MTN airtime”', yo: 'Tàbí sọ pé “Ra káàdì ìpè MTN ẹgbẹ̀rún kan”' },
    savedSoFar: { en: 'Saved so far', pcm: 'Wetin you don save', yo: 'Ohun tí o ti fi pamọ́' },
    toGo: { en: '{a} to go', pcm: '{a} remain', yo: '{a} ló kù' },
    deadline: { en: 'Deadline', yo: 'Ọjọ́ ìparí' },
    weeksLeft: { en: '{n} weeks left', pcm: '{n} weeks remain', yo: 'Ọ̀sẹ̀ {n} ló kù' },
    saveEach: { en: 'Save each week', pcm: 'Save every week', yo: 'Fi pamọ́ lọ́sẹ̀' },
    history: { en: 'History', yo: 'Ìtàn' },
    saveToG: { en: 'Save to {g}', pcm: 'Save for {g}', yo: 'Fi pamọ́ sínú {g}' },
    moveOut: { en: 'Move out', pcm: 'Comot', yo: 'Yọ jáde' },
    howMuchSave: { en: 'How much should I save to {g}?', pcm: 'How much I go save for {g}?', yo: 'Èló ni kí n fi pamọ́ sínú {g}?' },
    howMuchMove: { en: 'How much should I move out of {g}?', pcm: 'How much I go comot from {g}?', yo: 'Èló ni kí n yọ kúrò nínú {g}?' },
    noDeadline: { en: 'No deadline', yo: 'Kò sí ọjọ́' },
    actSaved: { en: 'Saved to {g}', pcm: 'Saved for {g}', yo: 'Pamọ́ sínú {g}' },
    actAuto: { en: 'Auto-saved to {g}', yo: 'Auto-save sínú {g}' },
    actSent: { en: 'Sent to {n}', pcm: 'Sent give {n}', yo: 'Ránṣẹ́ sí {n}' },
    actIn: { en: 'From {n}', yo: 'Láti ọ̀dọ̀ {n}' },
    actMoved: { en: 'Moved from {g}', pcm: 'Comot from {g}', yo: 'Láti inú {g}' },
    actAirtime: { en: '{n} airtime', yo: 'Káàdì ìpè {n}' },
    lIn: { en: 'In', yo: 'Wọlé' }, lOut: { en: 'Out', yo: 'Jáde' }, lSaved: { en: 'Saved', yo: 'Pamọ́' },
    switched: { en: 'Switched to English', pcm: 'I don switch to Pidgin', yo: 'Mo ti yí padà sí Yorùbá' },
    noYoVoice: { en: 'Yorùbá voice replies need the speech service. Showing text.', pcm: 'Yorùbá voice need the speech service. I go show am as text.', yo: 'Ohùn Yorùbá nílò iṣẹ́ ohùn. Mo ń fi ọ̀rọ̀ hàn.' },
    voiceErr: { en: 'I could not hear that. Try again, or type it.', pcm: 'I no fit hear am. Try again or type am.', yo: 'Mi ò gbọ́ ọ. Gbìyànjú lẹ́ẹ̀kan sí i, tàbí kọ ọ́.' },
    asking: { en: 'Asking Claude to help understand…', pcm: 'I dey ask Claude make e help me understand…', yo: 'Mo ń béèrè lọ́wọ́ Claude…' },
    hfReady: { en: 'Hands-free is on', pcm: 'Hands-free dey on', yo: 'Hands-free wà' },
    langName: { en: 'EN', pcm: 'PCM', yo: 'YO' },
    every: { en: 'Reminder: every', yo: 'Ìrántí: gbogbo ọjọ́' },
    hi: { en: 'Hi, Bisi', pcm: 'How far, Bisi', yo: 'Ẹ n lẹ́, Bisi' },
    gM: { en: 'Good morning', pcm: 'Good morning o', yo: 'Ẹ kú àárọ̀' }, gA: { en: 'Good afternoon', pcm: 'Good afternoon o', yo: 'Ẹ kú ọ̀sán' }, gE: { en: 'Good evening', pcm: 'Good evening o', yo: 'Ẹ kú alẹ́' },
    showBal: { en: 'Show balance', yo: 'Fi iye owó hàn' }, hideBal: { en: 'Hide balance', yo: 'Fi iye owó pamọ́' },
    qSave: { en: 'Save', yo: 'Fi pamọ́' }, qSend: { en: 'Send', yo: 'Fi ránṣẹ́' }, qAirtime: { en: 'Airtime', yo: 'Káàdì ìpè' }, qWithdraw: { en: 'Withdraw', pcm: 'Comot', yo: 'Yọ owó' },
    voiceT: { en: 'Talk to Vosa', yo: 'Bá Vosa sọ̀rọ̀' },
    voiceS: { en: 'Try “{ex}”', pcm: 'Try “{ex}”', yo: 'Gbìyànjú “{ex}”' },
    whatSay: { en: 'What can I say?', pcm: 'Wetin I fit talk?', yo: 'Kí ni mo lè sọ?' },
    yourSavings: { en: 'Your savings', pcm: 'Your savings', yo: 'Ìfowópamọ́ rẹ' },
    seeAll2: { en: 'See all', yo: 'Wo gbogbo' }, recent: { en: 'Recent activity', pcm: 'Wetin happen recently', yo: 'Ohun tó ṣẹlẹ̀ láìpẹ́' },
    newShort: { en: 'New', yo: 'Tuntun' }, savedMonth: { en: 'Saved this month', pcm: 'Saved this month', yo: 'Pamọ́ lóṣù yìí' },
    inWeek: { en: 'Money in · 7 days', pcm: 'Money in · 7 days', yo: 'Owó wọlé · ọjọ́ 7' }, outWeek: { en: 'Money out · 7 days', pcm: 'Money out · 7 days', yo: 'Owó jáde · ọjọ́ 7' },
    gVoice: { en: 'Voice and language', yo: 'Ohùn àti èdè' }, gSecurity: { en: 'Security', yo: 'Ààbò' }, gAccess: { en: 'Accessibility', yo: 'Ìrọ̀rùn lílò' },
    simulateT: { en: 'Simulate ₦50,000 coming in', pcm: 'Make ₦50,000 enter', yo: 'Jẹ́ kí ₦50,000 wọlé' }, run: { en: 'Run', yo: 'Ṣe é' },
    resetBtn: { en: 'Reset', yo: 'Tún ṣe' }, close: { en: 'Close', yo: 'Pa á dé' }, back: { en: 'Back', yo: 'Padà' },
    confirmT: { en: 'Confirm', pcm: 'Confirm am', yo: 'Fọwọ́sí' },
    potAfter: { en: 'Pot balance after', pcm: 'Pot go remain', yo: 'Àpò lẹ́yìn náà' }, walletAfter: { en: 'Wallet after', pcm: 'Wallet go remain', yo: 'Àpò owó lẹ́yìn náà' },
    recipient: { en: 'Recipient', pcm: 'Who go collect', yo: 'Ẹni tí ó gbà á' }, bank: { en: 'Bank', yo: 'Báǹkì' }, fee: { en: 'Fee', yo: 'Owó iṣẹ́' }, phoneNo: { en: 'Phone number', yo: 'Nọ́ńbà fóònù' },
    confirmBtn: { en: 'Confirm', yo: 'Fọwọ́sí' }, phrasePh: { en: 'Secret phrase', yo: 'Ọ̀rọ̀ àṣírí' },
    walletBal: { en: 'Wallet balance', yo: 'Iye owó nínú àpò' }, date: { en: 'Date', yo: 'Ọjọ́' }, reference: { en: 'Reference', yo: 'Nọ́ńbà ìtọ́kasí' }, done: { en: 'Done', yo: 'Ó parí' },
    typeT: { en: 'Type to Vosa', pcm: 'Type give Vosa', yo: 'Kọ ọ̀rọ̀ sí Vosa' },
    saveT: { en: 'Save money', yo: 'Fi owó pamọ́' }, withdrawT: { en: 'Withdraw to wallet', pcm: 'Comot to wallet', yo: 'Yọ owó sí àpò owó' },
    toPot: { en: 'Save into', yo: 'Fi pamọ́ sínú' }, fromPot: { en: 'Withdraw from', pcm: 'Comot from', yo: 'Yọ láti inú' },
    recentPeople: { en: 'Recent people', yo: 'Àwọn tí o fi ránṣẹ́ sí láìpẹ́' }, acctNo: { en: 'Account number', yo: 'Nọ́ńbà àkáǹtì' },
    lastStepT: { en: 'Secret phrase needed', yo: 'Ọ̀rọ̀ àṣírí pọndandan' },
    behindShort: { en: 'Behind', pcm: 'You don fall back', yo: 'Ó ń lẹ́yìn' }, onTrackShort: { en: 'On track', yo: 'Ó ń lọ dáadáa' },
    noHistory: { en: 'No activity in this pot yet.', yo: 'Kò sí nǹkan nínú àpò yìí síbẹ̀.' },
    addDemo: { en: 'Add ₦50k (demo)', pcm: 'Add ₦50k (demo)', yo: 'Fi ₦50k kún un' },
    welcomeH: { en: 'Welcome to Vosa', pcm: 'Welcome to Vosa', yo: 'Ẹ kú àbọ̀ sí Vosa' }
  };
  const EXAMPLES = {
    en: ['Save 5,000 for rent', 'Send 5k to Tunde', 'How much do I have?', 'Buy 1,000 MTN airtime', 'Save 10% of any money I receive', 'I want to save 200k for school fees by January', 'Withdraw 3,000 from rent', 'What is a money market fund?'],
    pcm: ['Abeg save 2k for house rent', 'Send 3k give Mama', 'How much I get?', 'Buy 500 Airtel airtime', 'Save 10% of any money wey I receive', 'I wan save 500k for japa before December', 'Comot 2k from my house rent', 'Wetin be inflation?'],
    yo: ['Fi ẹgbẹ̀rún márùn-ún pamọ́ fún owó ilé', 'Èló ló wà nínú àpò mi?', 'Fi ẹgbẹ̀rún méjì ránṣẹ́ sí Mama', 'Ra káàdì ìpè MTN ẹgbẹ̀rún kan', 'Mo fẹ́ fi ẹgbẹ̀rún lọ́nà igba pamọ́ fún owó ilé-ìwé kí ó tó di January', 'Yọ ẹgbẹ̀rún méjì kúrò nínú owó ilé', 'Kí ni èlé?']
  };
  const t = (k, vars) => { const e = T[k]; const s = e ? (e[state.lang] || e.en) : k; return vars ? L.fill(s, vars) : s; };
  const R = (key, vars) => L.say(key, state.lang, vars);

  // ---------- state ----------
  const KEY = 'vosa-demo-v4';
  function seed() {
    const now = Date.now();
    return {
      lang: 'en', muted: false, handsFree: false, onboarded: false, hideBal: false, view: 'home', speed: 1, textScale: 1,
      wallet: 35000, account: '9012345678', myPhone: '08031234412', myNetwork: 'MTN',
      secret: 'blue mango', autoSave: null,
      goals: [
        { key: 'flex', name: null, bal: 12000, target: null, deadline: null },
        { key: 'rent', name: null, bal: 40000, target: 75000, deadline: '2026-12-31' },
        { key: 'school', name: null, bal: 20000, target: 200000, deadline: '2027-01-04' }
      ],
      contacts: [
        { name: 'Tunde', aliases: ['tunde', 'tunde bakare'], bank: 'GTBank', acct: '0123454521' },
        { name: 'Mama', aliases: ['mama', 'mum', 'mummy', 'mom', 'my mother', 'iya mi', 'maami', 'mama mi'], bank: 'OPay', acct: '8031237788' },
        { name: 'Chidi', aliases: ['chidi'], bank: 'Access Bank', acct: '0691230193' },
        { name: 'Aisha', aliases: ['aisha', 'aishat'], bank: 'Kuda', acct: '2011233307' }
      ],
      reminders: [],
      activity: [
        { kind: 'save', g: { key: 'rent', name: null }, amt: 5000, at: now - 2 * 864e5, sub: 'voice' }
      ]
    };
  }
  let state = seed();
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.goals) state = Object.assign(seed(), s); } catch (e) {}
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  let pending = null;   // {type, needsPhrase, tries, ...}
  let awaiting = null;  // {slot, r}
  let ov = null;        // {kind, data}
  let lastHeard = '';
  let lastReply = '';
  let lastReplyLang = 'en';
  let flashGoal = null;
  let typing = false;

  const label = (g, lang) => g.name || L.GOALS[g.key][lang || state.lang];
  const findGoal = (key, name) => state.goals.find(g => (key && g.key === key && !g.name) || (name && g.name && g.name.toLowerCase() === String(name).toLowerCase()));
  const total = () => state.goals.reduce((a, g) => a + g.bal, 0);
  const gref = (g) => ({ key: g.key, name: g.name });
  const findRef = (ref) => findGoal(ref.name ? null : ref.key, ref.name) || null;
  const logAct = (e) => { state.activity.unshift(Object.assign({ at: Date.now() }, e)); state.activity = state.activity.slice(0, 20); };
  const masked = (n) => n.slice(0, 4) + ' ••• ' + n.slice(-4);
  const fmt = L.fmt;
  const roundTo = (n, step) => Math.max(step, Math.round(n / step) * step);
  const weeksUntil = (d) => Math.max(1, Math.round((d - new Date()) / (7 * 864e5)));
  const ymd = (d) => [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-');
  const parseYmd = (s) => new Date(s + 'T00:00:00');

  function potStatus(g) {
    if (!g.target || !g.deadline) return null;
    const left = Math.max(0, g.target - g.bal);
    if (!left) return { cls: '', text: t('reachedTag') };
    const d = parseYmd(g.deadline);
    const weekly = Math.ceil(left / weeksUntil(d) / 100) * 100;
    const elapsedShare = g.bal / g.target;
    const behind = weekly > 10000 && elapsedShare < 0.25;
    return { cls: behind ? 'behind' : '', text: t(behind ? 'behind' : 'onTrack', { w: fmt(weekly) }), weekly };
  }

  // ---------- rendering ----------
  const GOAL_STYLE = {
    rent: ['#E8F6E5', '#0C6B35', 'home'], school: ['#E8EFFD', '#1F4FBF', 'book'], business: ['#FFF4E0', '#8A5200', 'bag'],
    emergency: ['#FDEEEC', '#B42318', 'shield'], travel: ['#EEEFFD', '#4338CA', 'plane'], phone: ['#F1F3F2', '#3F4D45', 'phone'],
    wedding: ['#FCEEF5', '#A3245F', 'heart'], christmas: ['#E8F6E5', '#0C6B35', 'gift'], car: ['#F1F3F2', '#3F4D45', 'car'],
    flex: ['#F1F3F2', '#3F4D45', 'wallet'], custom: ['#F3EEFD', '#5B2BB5', 'pot']
  };
  function goalTile(g) {
    const [bg, fg, ic] = GOAL_STYLE[g.key] || GOAL_STYLE.custom;
    const el = h('span', { class: 'gtile', style: 'background:' + bg + ';color:' + fg, 'aria-hidden': 'true' });
    el.append(icon(ic, 22));
    return el;
  }
  function logoMark(size, dark) {
    const s = document.createElement('span');
    s.style.display = 'inline-grid';
    s.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="' + (dark ? '#FFFFFF' : '#0C6B35') + '"/><g stroke="' + (dark ? '#0C6B35' : '#FFFFFF') + '" stroke-width="2.6" stroke-linecap="round"><path d="M10 13v6"/><path d="M16 9v14"/><path d="M22 12v8"/></g></svg>';
    return s;
  }
  const naira = (n) => fmt(n);
  const amtWithKobo = (n) => h('span', null, fmt(n), h('small', { text: '.00' }));

  function render() {
    document.documentElement.lang = state.lang === 'pcm' ? 'pcm' : state.lang;
    $('views').style.zoom = state.textScale;
    const names = { home: ['home', 'tHome'], pots: ['pot', 'tPots'], activity: ['list', 'tAct'], settings: ['sliders', 'tSet'] };
    document.querySelectorAll('.tab').forEach(b => {
      const [ic, k] = names[b.dataset.view]; b.textContent = ''; b.append(icon(ic, 22), t(k));
      if (b.dataset.view === state.view) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    });
    const mic = $('mic'); mic.textContent = ''; mic.append(icon('mic', 28)); mic.setAttribute('aria-label', t('micAria'));
    for (const v of ['home', 'pots', 'activity', 'settings']) $('v-' + v).hidden = v !== state.view;
    ({ home: renderHome, pots: renderPots, activity: renderActivity, settings: renderSettings })[state.view]();
    renderTalk();
    flashGoal = null;
  }

  function pageHead(title, right) {
    return h('div', { class: 'hd' }, h('h1', { class: 'title', text: title }), right || null);
  }

  function potRow(g, withStatus) {
    const st = potStatus(g);
    const pct = g.target ? Math.min(100, Math.round(g.bal / g.target * 100)) : 0;
    const mid = h('div', { class: 'mid' }, h('b', { text: label(g) }));
    if (g.target) mid.append(h('div', { class: 'bar', role: 'progressbar', 'aria-label': label(g) + ' ' + pct + '%', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('i', { style: 'width:' + pct + '%' })));
    if (withStatus && st) mid.append(h('span', null, h('span', { class: 'pill-s ' + st.cls, text: st.weekly ? t(st.cls ? 'behindShort' : 'onTrackShort') : st.text })));
    else if (!g.target) mid.append(h('span', { text: t('noTarget') }));
    const end = h('div', { class: 'end' }, h('b', { class: 'num', text: naira(g.bal) }),
      h('span', { class: 'num', text: g.target ? pct + '% ' + t('of') + ' ' + naira(g.target) : '' }));
    return h('button', { class: 'row' + (flashGoal === g ? ' flash' : ''), type: 'button', onClick: () => showOv('pot', { ref: gref(g) }) }, goalTile(g), mid, end);
  }

  function renderHome() {
    const v = $('v-home'); v.textContent = '';
    const hr = new Date().getHours();
    v.append(h('div', { class: 'hd' },
      h('div', { class: 'hd-left' }, h('span', { class: 'avatar', 'aria-hidden': 'true', text: 'BA' }),
        h('div', { style: 'min-width:0' }, h('p', { class: 'hi', text: t('hi') }), h('p', { class: 'hi-sub', text: t(hr < 12 ? 'gM' : hr < 17 ? 'gA' : 'gE') }))),
      h('div', { class: 'hd-actions' },
        h('button', { class: 'iconbtn', type: 'button', 'aria-label': t('language') + ': ' + { en: 'English', pcm: 'Pidgin', yo: 'Yorùbá' }[state.lang], onClick: cycleLang }, icon('globe', 18), t('langName')),
        h('button', { class: 'iconbtn' + (state.handsFree ? ' on' : ''), type: 'button', 'aria-pressed': String(state.handsFree), 'aria-label': t('handsFree'), title: t('handsFree'), onClick: toggleHF }, icon('wave', 18)))));

    const hidden = state.hideBal;
    const tags = h('div', { class: 'bal-tags' });
    if (state.autoSave) tags.append(h('span', { text: t('autoSave') + ' ' + state.autoSave.pct + '%' }));
    for (const d of state.reminders) tags.append(h('span', { text: t('every') + ' ' + L.dayLabel(d, state.lang) }));
    v.append(h('section', { class: 'bal', 'aria-label': t('total') },
      h('div', { class: 'bal-top' }, h('span', { class: 'bal-lbl', text: t('total') }),
        h('button', { class: 'eye', type: 'button', 'aria-label': hidden ? t('showBal') : t('hideBal'), onClick: () => { state.hideBal = !state.hideBal; persist(); render(); } }, icon(hidden ? 'eyeoff' : 'eye', 18))),
      h('div', { class: 'bal-amt num' }, hidden ? '₦ • • • • •' : amtWithKobo(total())),
      tags.children.length ? tags : null,
      h('div', { class: 'bal-row' },
        h('div', null, h('span', { text: t('wallet') }), h('b', { class: 'num', text: hidden ? '₦ • • • •' : naira(state.wallet) })),
        h('div', { style: 'text-align:right' }, h('span', { text: t('acct') }), h('b', { class: 'num', text: state.account.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3') })))));

    const qa = (ic, k, fn) => h('button', { type: 'button', onClick: fn }, h('span', { class: 'tile' }, icon(ic, 24)), t(k));
    v.append(h('div', { class: 'qa' },
      qa('potplus', 'qSave', () => showOv('pick', { mode: 'save', ref: null, amount: 5000 })),
      qa('send', 'qSend', () => showOv('send-form', { c: 0, amount: 5000 })),
      qa('phone', 'qAirtime', () => showOv('airtime-form', { net: state.myNetwork, amount: 1000, other: false, phone: '' })),
      qa('out', 'qWithdraw', () => showOv('pick', { mode: 'withdraw', ref: null, amount: 2000 }))));

    v.append(h('button', { class: 'voice', type: 'button', onClick: () => { micDenied = false; startListening(); } },
      h('span', { class: 'vm' }, icon('mic', 22)),
      h('div', null, h('b', { text: t('voiceT') }), h('span', { text: t('voiceS', { ex: EXAMPLES[state.lang][0] }) })),
      h('span', { class: 'chev' }, icon('chev', 20))));
    v.append(h('button', { class: 'link', type: 'button', style: 'align-self:flex-start;margin-top:4px', onClick: () => showOv('type'), text: t('whatSay') }));

    const pots = state.goals.slice(0, 3);
    v.append(h('section', { class: 'sec', 'aria-labelledby': 'h-sav' },
      h('div', { class: 'sec-h' }, h('h2', { id: 'h-sav', text: t('yourSavings') }), h('button', { class: 'more', type: 'button', onClick: () => go('pots'), text: t('seeAll2') })),
      h('div', null, pots.map(g => potRow(g, false)))));

    const recent = state.activity.slice(0, 3);
    v.append(h('section', { class: 'sec', 'aria-labelledby': 'h-rec' },
      h('div', { class: 'sec-h' }, h('h2', { id: 'h-rec', text: t('recent') }), h('button', { class: 'more', type: 'button', onClick: () => go('activity'), text: t('seeAll2') })),
      recent.length ? h('div', null, recent.map(actRow)) : h('p', { class: 'empty', text: t('noActivity') })));
  }

  function renderPots() {
    const v = $('v-pots'); v.textContent = '';
    v.append(pageHead(t('tPots'), h('button', { class: 'iconbtn', type: 'button', onClick: () => showOv('goal-form', { key: 'school', amount: 200000, month: 3 }) }, icon('plus', 18), t('newShort'))));
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const savedMonth = state.activity.filter(a => a.kind === 'save' && a.at >= +monthStart).reduce((s, a) => s + a.amt, 0);
    v.append(h('div', { class: 'summary' },
      h('div', null, h('span', { text: t('total') }), h('b', { class: 'num', text: naira(total()) })),
      h('div', null, h('span', { text: t('savedMonth') }), h('b', { class: 'num', text: naira(savedMonth) }))));
    v.append(h('div', { style: 'margin-top:8px' }, state.goals.map(g => potRow(g, true))));
    v.append(h('p', { class: 'empty', style: 'text-align:center', text: t('orSayGoal') }));
  }

  function actRow(a) {
    const g = a.g ? (findRef(a.g) || a.g) : null;
    const gl = g ? (g.name || (L.GOALS[g.key] || L.GOALS.flex)[state.lang]) : '';
    let title, kind, tileIc, tileStyle = ['#F1F3F2', '#3F4D45'];
    if (a.kind === 'in') { title = t('actIn', { n: a.n }); kind = 'in'; tileIc = 'in'; tileStyle = ['#E8F6E5', '#0C6B35']; }
    else if (a.kind === 'send') { title = t('actSent', { n: a.n }); kind = 'out'; tileIc = 'send'; }
    else if (a.kind === 'airtime') { title = t('actAirtime', { n: a.n }); kind = 'out'; tileIc = 'phone'; }
    else if (a.kind === 'move') { title = t('actMoved', { g: gl }); kind = 'in'; tileIc = 'out'; tileStyle = ['#E8F6E5', '#0C6B35']; }
    else { title = t(a.sub === 'auto' ? 'actAuto' : 'actSaved', { g: gl }); kind = 'saved'; tileIc = 'potplus'; tileStyle = ['#E8F6E5', '#0C6B35']; }
    const d = new Date(a.at);
    const time = d.toLocaleDateString([], { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const sign = kind === 'in' ? '+' : kind === 'out' ? '−' : '';
    const tile = h('span', { class: 'gtile', style: 'background:' + tileStyle[0] + ';color:' + tileStyle[1], 'aria-hidden': 'true' }, icon(tileIc, 20));
    return h('div', { class: 'row' }, tile,
      h('div', { class: 'mid' }, h('b', { text: title }), h('span', { text: [time, a.detail].filter(Boolean).join(' · ') })),
      h('div', { class: 'end' }, h('b', { class: 'num' + (kind === 'in' ? ' in' : ''), text: sign + naira(a.amt) }), h('span', { text: { in: t('lIn'), out: t('lOut'), saved: t('lSaved') }[kind] })));
  }

  function renderActivity() {
    const v = $('v-activity'); v.textContent = '';
    v.append(pageHead(t('activity')));
    const weekAgo = Date.now() - 7 * 864e5;
    const inW = state.activity.filter(a => a.at >= weekAgo && (a.kind === 'in')).reduce((s, a) => s + a.amt, 0);
    const outW = state.activity.filter(a => a.at >= weekAgo && (a.kind === 'send' || a.kind === 'airtime')).reduce((s, a) => s + a.amt, 0);
    v.append(h('div', { class: 'summary' },
      h('div', null, h('span', { text: t('inWeek') }), h('b', { class: 'num', style: 'color:var(--primary)', text: '+' + naira(inW) })),
      h('div', null, h('span', { text: t('outWeek') }), h('b', { class: 'num', text: '−' + naira(outW) }))));
    if (!state.activity.length) { v.append(h('p', { class: 'empty', text: t('noActivity') })); return; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const a1 = state.activity.filter(a => a.at >= +today), a2 = state.activity.filter(a => a.at < +today);
    if (a1.length) { v.append(h('h2', { class: 'day', text: t('today') }), h('div', null, a1.map(actRow))); }
    if (a2.length) { v.append(h('h2', { class: 'day', text: t('earlier') }), h('div', null, a2.map(actRow))); }
  }

  function seg(labelText, options, current, onPick) {
    return h('div', { class: 'seg', role: 'radiogroup', 'aria-label': labelText },
      options.map(([val, txt, style]) => h('button', { type: 'button', role: 'radio', 'aria-checked': String(val === current), style: style || null, onClick: () => onPick(val), text: txt })));
  }
  function sw(checked, onToggle, name) {
    return h('button', { class: 'sw', type: 'button', role: 'switch', 'aria-checked': String(checked), 'aria-label': name, onClick: onToggle }, h('i', { 'aria-hidden': 'true' }));
  }
  function renderSettings() {
    const v = $('v-settings'); v.textContent = '';
    v.append(pageHead(t('settings')));
    const row = (title, desc, control) => h('div', { class: 'set' }, h('div', { style: 'min-width:0' }, h('b', { text: title }), desc ? h('span', { class: 'd', text: desc }) : null), control);
    v.append(h('h2', { class: 'group-t', text: t('gVoice') }), h('div', { class: 'group', style: 'margin-top:0' },
      row(t('language'), null, seg(t('language'), [['en', 'EN'], ['pcm', 'PCM'], ['yo', 'YO']], state.lang, (l) => setLang(l))),
      row(t('voiceSpeed'), null, seg(t('voiceSpeed'), [[0.85, t('slow')], [1, t('normal')], [1.15, t('fast')]], state.speed, (s) => { state.speed = s; persist(); render(); })),
      row(t('handsFree'), t('hfDesc'), sw(state.handsFree, toggleHF, t('handsFree'))),
      row(t('sound'), t('soundDesc'), sw(!state.muted, () => { state.muted = !state.muted; if (state.muted) stopSpeaking(); persist(); render(); }, t('sound')))));
    v.append(h('h2', { class: 'group-t', text: t('gSecurity') }), h('div', { class: 'group', style: 'margin-top:0' },
      row(t('secret'), t('secretDesc', { p: state.secret }), null)));
    v.append(h('h2', { class: 'group-t', text: t('gAccess') }), h('div', { class: 'group', style: 'margin-top:0' },
      row(t('textSize'), null, seg(t('textSize'), [[0.9, 'A', 'font-size:12px'], [1, 'A', 'font-size:15px'], [1.2, 'A', 'font-size:18px']], state.textScale, (s) => { state.textScale = s; persist(); render(); })),
      row(t('srTips'), null, h('button', { class: 'link', type: 'button', text: t('open'), onClick: () => showOv('sheet', { tone: 'ok', icon: 'speaker', title: t('srTips'), body: t('srBody'), actions: [{ label: t('ok'), primary: true, fn: closeOv }] }) }))));
    v.append(h('h2', { class: 'group-t', text: t('demoTools') }), h('div', { class: 'group', style: 'margin-top:0' },
      row(t('engineLbl'), engineText(), null),
      row(t('simulateT'), null, h('button', { class: 'link', type: 'button', text: t('run'), onClick: () => incoming(50000, 'Kemi Adewale') })),
      row(t('reset'), null, h('button', { class: 'link', type: 'button', style: 'color:var(--danger)', text: t('resetBtn'), onClick: resetDemo }))));
  }

  function renderTalk() {
    const bar = $('replybar');
    bar.hidden = !lastReply;
    const mk = $('reply-mark'); mk.textContent = ''; mk.append(logoMark(28, true));
    $('say-text').textContent = lastReply;
    const rp = $('replay'); rp.textContent = ''; rp.append(icon('speaker', 18)); rp.setAttribute('aria-label', t('replayAria'));
    const kb = $('kbd'); kb.textContent = ''; kb.append(icon('kbd', 18)); kb.setAttribute('aria-label', t('typeInstead'));
    const oSay = document.getElementById('ov-say'); if (oSay) oSay.textContent = lastReply;
    const oHeard = document.getElementById('ov-heard'); if (oHeard) { oHeard.textContent = ''; if (lastHeard) oHeard.append(t('youSaid') + ' ', h('b', { text: '“' + lastHeard + '”' })); }
  }

  function go(view) { state.view = view; persist(); render(); $('views').scrollTop = 0; }
  function setLang(l) { state.lang = l; persist(); stopSpeaking(); render(); if (ov) renderOv(); }
  function cycleLang() { const order = ['en', 'pcm', 'yo']; setLang(order[(order.indexOf(state.lang) + 1) % 3]); }
  function toggleHF() { const on = !state.handsFree; setHandsFree(on); reply(R(on ? 'handsfreeOn' : 'handsfreeOff')); }
  function status(s) { if (s) announce(s); }
  function announce(s) { const a = $('announce'); a.textContent = ''; setTimeout(() => { a.textContent = s; }, 30); }

  // ---------- overlays ----------
  function showOv(kind, data) { ov = { kind, data: data || {} }; renderOv(); }
  function closeOv() { ov = null; renderOv(); }

  function vsay() {
    return h('div', { class: 'vsay' },
      h('span', { style: 'flex:0 0 auto' }, logoMark(22)),
      h('p', { id: 'ov-say', 'aria-live': 'polite', text: lastReply }),
      h('button', { type: 'button', 'aria-label': t('replayAria'), onClick: () => speak(lastReply, lastReplyLang, true) }, icon('speaker', 20)));
  }
  function heardLine() {
    const p = h('p', { class: 'heard', id: 'ov-heard' });
    if (lastHeard) p.append(t('youSaid') + ' ', h('b', { text: '“' + lastHeard + '”' }));
    return p;
  }
  function kv(pairs) { return h('div', { class: 'kv' }, pairs.filter(Boolean).map(([k, v]) => h('div', null, h('span', { text: k }), h('b', { class: 'num', text: v })))); }
  function sheetWrap(el, kids, onBackdrop) {
    el.className = 'ov sheet';
    el.addEventListener('click', (e) => { if (e.target === el) (onBackdrop || closeOv)(); });
    el.append(h('section', { class: 'sh' }, h('div', { class: 'grab', 'aria-hidden': 'true' }), kids));
  }
  function sheetHead(title, onClose) {
    return h('div', { class: 'sh-h' }, h('h2', { text: title }), h('button', { class: 'x', type: 'button', 'aria-label': t('close'), onClick: onClose || closeOv }, icon('x', 18)));
  }
  function pageWrap(el, title, onBack, body, foot) {
    el.className = 'ov';
    el.append(h('div', { class: 'pg' },
      h('div', { class: 'pg-h' }, h('button', { class: 'back', type: 'button', 'aria-label': t('back'), onClick: onBack || closeOv }, icon('back', 20)), h('h1', { text: title })),
      h('div', { class: 'pg-body' }, body), foot ? h('div', { class: 'pg-foot' }, foot) : null));
  }

  function renderOv() {
    const el = $('overlay');
    el.textContent = '';
    el.replaceWith(el.cloneNode(false));
    const fresh = $('overlay');
    if (!ov) { fresh.hidden = true; fresh.removeAttribute('role'); return; }
    fresh.hidden = false;
    fresh.setAttribute('role', 'dialog'); fresh.setAttribute('aria-modal', 'true');
    const b = { confirm: ovConfirm, success: ovSuccess, moneyin: ovMoneyIn, sheet: ovSheet, type: ovType, pick: ovPick, 'goal-form': ovGoalForm, 'send-form': ovSendForm, 'airtime-form': ovAirtimeForm, pot: ovPot, amount: ovAmountCompat, onboard: ovOnboard }[ov.kind];
    if (!b) { fresh.hidden = true; return; }
    b(fresh, ov.data);
    const focusEl = fresh.querySelector('h1, h2');
    if (focusEl) { focusEl.setAttribute('tabindex', '-1'); try { focusEl.focus({ preventScroll: true }); } catch (e) {} }
  }

  function ovConfirm(el) {
    const p = pending;
    if (!p) return closeOv();
    const w = state.wallet;
    let kind, rows = [], yes;
    if (p.type === 'save' || p.type === 'nudge') {
      kind = t('kSave'); yes = t('yesSave', { a: fmt(p.amount) });
      rows = [[t('rTo'), label(p.goal)], [t('rFrom'), t('wallet')], [t('potAfter'), fmt(p.goal.bal + p.amount)], [t('walletAfter'), fmt(w - p.amount)]];
    } else if (p.type === 'withdraw') {
      kind = t('kMove');
      rows = [[t('rFrom'), label(p.goal)], [t('rTo'), t('wallet')], [t('potAfter'), fmt(p.goal.bal - p.amount)], [t('walletAfter'), fmt(w + p.amount)]];
    } else if (p.type === 'send') {
      kind = t('kSend');
      rows = [[t('recipient'), p.to.name], [t('bank'), p.to.bank + ' •••• ' + p.to.acct.slice(-4)], [t('fee'), '₦0'], [t('walletAfter'), fmt(w - p.amount)]];
    } else if (p.type === 'airtime') {
      kind = t('kAirtime'); yes = t('yesBuy', { a: fmt(p.amount) });
      rows = [[t('network'), p.net], [t('phoneNo'), /^\d+$/.test(p.who) ? masked(p.who) : masked(state.myPhone)], [t('walletAfter'), fmt(w - p.amount)]];
    } else if (p.type === 'goal') {
      kind = t('kGoal'); yes = t('yesCreate');
      rows = [[t('rGoal'), label(p.goal)], p.deadline ? [t('rBy'), L.dateLabel(p.deadline)] : null,
        p.deadline ? [t('rWeekly'), fmt(Math.ceil(Math.max(0, p.target - p.goal.bal) / weeksUntil(p.deadline) / 100) * 100)] : null];
    }
    const amount = p.type === 'goal' ? p.target : p.amount;
    const kids = [sheetHead(t('confirmT'), cancelPending), heardLine(), vsay(),
      h('div', { class: 'big-amt' }, h('span', { text: kind }), h('b', { class: 'num', text: fmt(amount) })), kv(rows)];
    if (p.needsPhrase) {
      const tries = p.tries || 0;
      kids.push(h('div', { class: 'lockrow', 'aria-live': 'assertive' }, h('span', { class: 'lk' }, icon('lock', 18)),
        h('div', null, h('b', { text: t('sayPhrase') }), h('span', { text: t('imListening') + ' ' + t('typePhrase') }))));
      if (tries) kids.push(h('p', { class: 'tries', text: t('triesLeft', { n: 3 - tries }) }));
      kids.push(h('form', { class: 'inrow', autocomplete: 'off', onSubmit: (e) => { e.preventDefault(); handle(e.target.querySelector('input').value, { via: 'text' }); } },
        h('label', { class: 'sr', for: 'phrase-in', text: t('sayPhrase') }),
        h('input', { class: 'field', id: 'phrase-in', type: 'password', placeholder: t('phrasePh'), autocomplete: 'off' }),
        h('button', { class: 'btn p', type: 'submit', text: t('confirmBtn') })));
      kids.push(h('button', { class: 'btn o', type: 'button', onClick: () => { lastHeard = t('fingerprint'); execute(); } }, icon('finger', 20), t('fingerprint')));
    } else {
      kids.push(h('button', { class: 'btn p', type: 'button', onClick: () => { lastHeard = t('yesShort'); execute(); } }, yes || t('yesShort')));
      kids.push(h('p', { class: 'heard', style: 'text-align:center;margin-top:-6px', text: t('listenYesNo') }));
    }
    sheetWrap(el, kids, cancelPending);
  }

  function nudgeCard(text) {
    return h('section', { class: 'nudge', 'aria-label': text }, h('p', { text: text }),
      h('div', { class: 'row2' },
        h('button', { class: 'btn p', type: 'button', onClick: () => { lastHeard = t('yesShort'); execute(); } }, t('yesShort')),
        h('button', { class: 'btn o', type: 'button', onClick: () => { pending = null; closeOv(); reply(R('cancelled')); } }, t('noThanks'))));
  }
  const ref = () => 'VSA-' + Math.random().toString(36).slice(2, 8).toUpperCase();
  const nowLabel = () => { const d = new Date(); return d.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); };

  function ovSuccess(el, d) {
    el.className = 'ov';
    const body = [h('div', { class: 'done', 'aria-live': 'polite' },
      h('span', { class: 'ok' }, icon('check', 30, 2.4)),
      h('h1', { text: d.title }),
      h('span', { class: 'amt num', text: fmt(d.amount) }),
      d.sub ? h('span', { style: 'color:var(--text2);font-size:14px', text: d.sub }) : null),
      kv([[t('walletBal'), fmt(state.wallet)], [t('date'), nowLabel()], [t('reference'), d.ref || (d.ref = ref())]])];
    if (pending && pending.type === 'nudge') body.push(nudgeCard(t('nudgeQ', { a: fmt(pending.amount), g: label(pending.goal) })));
    el.append(h('div', { class: 'pg' }, h('div', { class: 'pg-body' }, body),
      h('div', { class: 'pg-foot' }, h('button', { class: 'btn p', type: 'button', onClick: () => { pending = null; closeOv(); go('home'); }, text: t('done') }))));
  }

  function ovMoneyIn(el, d) {
    el.className = 'ov';
    el.setAttribute('role', 'alertdialog');
    const body = [h('div', { class: 'done', 'aria-live': 'assertive' },
      h('span', { class: 'ok' }, icon('in', 30, 2.2)),
      h('h1', { text: t('moneyIn') }),
      h('span', { class: 'amt num', style: 'color:var(--primary)', text: '+' + fmt(d.amount) }),
      h('span', { style: 'color:var(--text2);font-size:14px', text: t('fromN', { n: d.name }) }))];
    const foot = [];
    if (d.saved) {
      body.push(h('div', { class: 'nudge' }, h('p', { text: t('savedForYou', { a: fmt(d.saved) }) })));
      body.push(kv([[t('autoSave'), d.pct + '%'], [d.goalLabel, fmt(d.after)], [t('walletBal'), fmt(state.wallet)]]));
      foot.push(h('button', { class: 'btn p', type: 'button', onClick: closeOv, text: t('done') }), h('button', { class: 'btn s', type: 'button', onClick: () => undoAuto(d), text: t('undo') }));
    } else {
      body.push(kv([[t('walletBal'), fmt(state.wallet)], [t('date'), nowLabel()]]));
      if (pending && pending.type === 'nudge') body.push(nudgeCard(t('saveTenQ', { a: fmt(pending.amount) })));
      foot.push(h('button', { class: 'btn s', type: 'button', onClick: () => { pending = null; closeOv(); }, text: t('done') }));
    }
    el.append(h('div', { class: 'pg' }, h('div', { class: 'pg-body' }, body), h('div', { class: 'pg-foot' }, foot)));
  }

  function ovSheet(el, d) {
    const tone = d.tone || 'ok';
    const tileStyle = tone === 'err' ? 'background:var(--danger-bg);color:var(--danger)' : tone === 'warn' ? 'background:var(--warn-bg);color:var(--warn)' : 'background:var(--tint);color:var(--primary)';
    if (tone !== 'ok') el.setAttribute('role', 'alertdialog');
    sheetWrap(el, [
      h('span', { class: 'gtile', style: tileStyle + ';margin-top:4px' }, icon(d.icon || 'alert', 22)),
      h('h2', { style: 'margin:0;font-size:18px;font-weight:800;line-height:1.35', text: d.title }),
      d.body ? h('p', { style: 'margin:0;color:var(--text2);font-size:14.5px', text: d.body }) : null,
      h('div', { class: (d.actions || []).length > 1 ? 'row2' : '' }, (d.actions || []).map(a => h('button', { class: 'btn ' + (a.primary ? 'p' : 's'), type: 'button', onClick: a.fn, text: a.label })))]);
  }

  function ovType(el) {
    const input = h('input', { class: 'field', id: 'typed', type: 'text', enterkeyhint: 'send', placeholder: t('typePh'), autocomplete: 'off' });
    sheetWrap(el, [sheetHead(t('typeT')),
      h('form', { class: 'inrow', autocomplete: 'off', onSubmit: (e) => { e.preventDefault(); const v = input.value; closeOv(); handle(v, { via: 'text' }); } },
        h('label', { class: 'sr', for: 'typed', text: t('typePh') }), input, h('button', { class: 'btn p', type: 'submit', 'aria-label': t('sendTyped') }, icon('send', 18))),
      h('p', { class: 'lbl', style: 'margin:4px 0 0', text: t('trySay') }),
      h('div', null, EXAMPLES[state.lang].map(e => h('button', { class: 'ex', type: 'button', onClick: () => { closeOv(); handle(e, { via: 'tap' }); } }, h('span', { class: 'ei' }, icon('mic', 16)), e)))]);
    setTimeout(() => { try { input.focus(); } catch (e) {} }, 50);
  }

  function ovPick(el, d) {
    const isSave = d.mode === 'save';
    const pots = isSave ? state.goals : state.goals.filter(g => g.bal > 0);
    if (!d.ref && pots[0]) d.ref = gref(isSave ? (findGoal('rent') || pots[0]) : pots[0]);
    const g = d.ref ? findRef(d.ref) : null;
    const amtIn = h('input', { class: 'field num', id: 'pick-amt', inputmode: 'numeric', value: fmt(d.amount), onInput: (e) => { d.amount = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0; }, onBlur: (e) => { e.target.value = fmt(d.amount); } });
    sheetWrap(el, [sheetHead(isSave ? t('saveT') : t('withdrawT')),
      h('div', null, h('span', { class: 'lbl', text: isSave ? t('toPot') : t('fromPot') }),
        h('div', { role: 'radiogroup', 'aria-label': isSave ? t('toPot') : t('fromPot') }, pots.map(p => h('button', { class: 'row', type: 'button', role: 'radio', 'aria-checked': String(g === p), style: 'padding:10px 0', onClick: () => { d.ref = gref(p); renderOv(); } },
          goalTile(p), h('div', { class: 'mid' }, h('b', { text: label(p) }), h('span', { class: 'num', text: fmt(p.bal) })), h('span', { class: 'radio', 'aria-hidden': 'true' }))))),
      h('div', null, h('label', { class: 'lbl', for: 'pick-amt', text: t('amount') }), amtIn,
        h('div', { class: 'choice four', style: 'margin-top:8px' }, [1000, 2000, 5000, 10000].map(a => h('button', { class: 'opt num', type: 'button', 'aria-pressed': String(a === d.amount), onClick: () => { d.amount = a; renderOv(); }, text: '₦' + a / 1000 + 'k' })))),
      h('p', { class: 'heard', text: t('wallet') + ': ' + fmt(state.wallet) }),
      h('button', { class: 'btn p', type: 'button', onClick: () => { if (!g || !d.amount) return; routeUI({ intent: d.mode, goal: g.name ? null : g.key, customName: g.name || null, amount: d.amount }); }, text: t('cont') })]);
  }
  function ovAmountCompat(el, d) { ov = { kind: 'pick', data: { mode: d.mode, ref: d.ref, amount: d.mode === 'save' ? 5000 : 2000 } }; ovPick(el, ov.data); }

  const GOAL_CHOICES = ['rent', 'school', 'business', 'emergency', 'travel', 'other'];
  function nextMonths() {
    const out = [], now = new Date();
    for (let i = 1; i <= 12; i++) out.push(new Date(now.getFullYear(), now.getMonth() + i, 1));
    return out;
  }
  function ovGoalForm(el, d) {
    const months = nextMonths();
    const calc = () => {
      const weeks = weeksUntil(months[d.month]);
      const existing = d.key !== 'other' ? (findGoal(d.key) || { bal: 0 }).bal : 0;
      const left = Math.max(0, (d.amount || 0) - existing);
      return { weekly: Math.ceil(left / weeks / 100) * 100, monthly: Math.ceil(left / Math.max(1, weeks / 4.345) / 500) * 500, weeks };
    };
    const c = calc();
    const calcB = h('b', { class: 'num', text: fmt(c.weekly) });
    const calcS = h('span', { text: ' ' + t('aWeek') + ' · ' + t('weeksMonth', { w: c.weeks, m: fmt(c.monthly) }) });
    const upd = () => { const x = calc(); calcB.textContent = fmt(x.weekly); calcS.textContent = ' ' + t('aWeek') + ' · ' + t('weeksMonth', { w: x.weeks, m: fmt(x.monthly) }); };
    pageWrap(el, t('newGoal'), null, [
      h('fieldset', { style: 'border:0;padding:0;margin:0' }, h('legend', { class: 'lbl', text: t('whatFor') }),
        h('div', { class: 'choice' }, GOAL_CHOICES.map(k => h('button', { class: 'opt', type: 'button', 'aria-pressed': String(d.key === k), onClick: () => { d.key = k; renderOv(); }, text: k === 'other' ? t('other') : L.GOALS[k][state.lang] })))),
      h('div', null, h('label', { class: 'lbl', for: 'goal-amt', text: t('howMuchNeed') }),
        h('input', { class: 'field num', id: 'goal-amt', inputmode: 'numeric', value: fmt(d.amount), onInput: (e) => { d.amount = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0; upd(); }, onBlur: (e) => { e.target.value = fmt(d.amount); } })),
      h('div', null, h('label', { class: 'lbl', for: 'goal-month', text: t('byWhen') }),
        h('select', { class: 'field', id: 'goal-month', onChange: (e) => { d.month = +e.target.value; upd(); } }, months.map((m, i) => h('option', { value: i, selected: i === d.month ? true : null, text: L.dateLabel(m) })))),
      h('div', { class: 'calc', 'aria-live': 'polite' }, t('saveAbout') + ' ', calcB, calcS)],
      [h('button', { class: 'btn p', type: 'button', onClick: () => { if (!d.amount) return; routeUI({ intent: 'goal', goal: d.key === 'other' ? null : d.key, customName: d.key === 'other' ? 'My goal' : null, amount: d.amount, deadline: months[d.month] }); }, text: t('createGoal') }),
        h('p', { class: 'heard', style: 'text-align:center', text: t('orSayGoal') })]);
  }

  function ovSendForm(el, d) {
    const c = state.contacts[d.c];
    pageWrap(el, t('sendMoney'), null, [
      h('div', null, h('span', { class: 'lbl', text: t('recentPeople') }),
        h('div', { class: 'choice four', role: 'radiogroup', 'aria-label': t('recentPeople') }, state.contacts.map((ct, i) => h('button', { class: 'ct', type: 'button', role: 'radio', 'aria-checked': String(i === d.c), 'aria-label': ct.name + ', ' + ct.bank + ' ' + ct.acct.slice(-4), onClick: () => { d.c = i; renderOv(); } },
          h('span', { class: 'av', text: ct.name.slice(0, 2).toUpperCase() }), ct.name)))),
      kv([[t('bank'), c.bank], [t('acctNo'), c.acct]]),
      h('div', null, h('label', { class: 'lbl', for: 'send-amt', text: t('amount') }),
        h('input', { class: 'field num', id: 'send-amt', inputmode: 'numeric', value: fmt(d.amount), onInput: (e) => { d.amount = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0; }, onBlur: (e) => { e.target.value = fmt(d.amount); } }),
        h('div', { class: 'choice four', style: 'margin-top:8px' }, [1000, 2000, 5000, 10000].map(a => h('button', { class: 'opt num', type: 'button', 'aria-pressed': String(a === d.amount), onClick: () => { d.amount = a; renderOv(); }, text: '₦' + a / 1000 + 'k' }))),
        h('p', { class: 'heard', style: 'margin-top:8px', text: t('wallet') + ': ' + fmt(state.wallet) })),
      h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('lock', 18)), h('div', null, h('b', { text: t('lastStepT') }), h('span', { text: t('lastStep') })))],
      [h('button', { class: 'btn p', type: 'button', onClick: () => { if (d.amount) routeUI({ intent: 'send', contact: c, amount: d.amount }); }, text: t('sendBtn', { a: fmt(d.amount), n: c.name }) }),
        h('p', { class: 'heard', style: 'text-align:center', text: t('orSaySend') })]);
  }

  function ovAirtimeForm(el, d) {
    pageWrap(el, t('buyAirtime'), null, [
      h('fieldset', { style: 'border:0;padding:0;margin:0' }, h('legend', { class: 'lbl', text: t('network') }),
        h('div', { class: 'choice four' }, ['MTN', 'Airtel', 'Glo', '9mobile'].map(n => h('button', { class: 'opt', type: 'button', 'aria-pressed': String(n === d.net), onClick: () => { d.net = n; renderOv(); }, text: n })))),
      h('fieldset', { style: 'border:0;padding:0;margin:0' }, h('legend', { class: 'lbl', text: t('rFor') }),
        h('div', { class: 'choice two', role: 'radiogroup' },
          h('button', { class: 'opt', type: 'button', role: 'radio', 'aria-checked': String(!d.other), onClick: () => { d.other = false; renderOv(); } }, t('myLine')),
          h('button', { class: 'opt', type: 'button', role: 'radio', 'aria-checked': String(!!d.other), onClick: () => { d.other = true; renderOv(); } }, t('another'))),
        d.other ? h('div', { style: 'margin-top:8px' }, h('label', { class: 'sr', for: 'air-phone', text: t('phoneNo') }), h('input', { class: 'field num', id: 'air-phone', inputmode: 'tel', placeholder: '0803 123 4567', value: d.phone, onInput: (e) => { d.phone = e.target.value.replace(/\D/g, ''); } }))
          : h('p', { class: 'heard', style: 'margin-top:8px', text: masked(state.myPhone) + ' · ' + state.myNetwork })),
      h('fieldset', { style: 'border:0;padding:0;margin:0' }, h('legend', { class: 'lbl', text: t('amount') }),
        h('div', { class: 'choice' }, [200, 500, 1000, 2000, 5000, 10000].map(a => h('button', { class: 'opt num', type: 'button', 'aria-pressed': String(a === d.amount), onClick: () => { d.amount = a; renderOv(); }, text: fmt(a) }))))],
      [h('button', { class: 'btn p', type: 'button', onClick: () => routeUI({ intent: 'airtime', network: d.net, amount: d.amount, phone: d.other && d.phone.length >= 10 ? d.phone : null }), text: t('buyBtn', { a: fmt(d.amount), n: d.net }) }),
        h('p', { class: 'heard', style: 'text-align:center', text: t('orSayAirtime') })]);
  }

  function ovPot(el, d) {
    const g = findRef(d.ref);
    if (!g) return closeOv();
    const pct = g.target ? Math.min(100, Math.round(g.bal / g.target * 100)) : 0;
    const st = potStatus(g);
    const dl = g.deadline ? parseYmd(g.deadline) : null;
    const hist = state.activity.filter(a => a.g && (a.g.name ? a.g.name === g.name : a.g.key === g.key && !g.name));
    const head = h('div', { style: 'display:flex;align-items:center;gap:12px' }, goalTile(g), h('div', null, h('span', { class: 'lbl', style: 'margin:0', text: t('savedSoFar') }), h('b', { class: 'num', style: 'font-size:30px;font-weight:800;letter-spacing:-0.02em', text: fmt(g.bal) })));
    const prog = g.target ? h('div', { style: 'display:flex;flex-direction:column;gap:8px' },
      h('div', { class: 'bar', style: 'height:8px', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': pct + '%' }, h('i', { style: 'width:' + pct + '%' })),
      h('div', { style: 'display:flex;justify-content:space-between;font-size:13.5px;color:var(--text2)' }, h('span', { class: 'num', text: pct + '% ' + t('of') + ' ' + fmt(g.target) }), h('span', { class: 'num', text: t('toGo', { a: fmt(Math.max(0, g.target - g.bal)) }) }))) : null;
    pageWrap(el, label(g), null, [head, prog,
      h('div', { class: 'summary' },
        h('div', null, h('span', { text: t('deadline') }), h('b', { text: dl ? L.dateLabel(dl) : t('noDeadline') }), dl ? h('span', { text: t('weeksLeft', { n: weeksUntil(dl) }) }) : null),
        h('div', null, h('span', { text: t('saveEach') }), h('b', { class: 'num', text: st && st.weekly ? fmt(st.weekly) : '—' }), st ? h('span', { class: 'pill-s ' + st.cls, style: 'margin-top:4px', text: st.cls ? t('behindShort') : t('onTrackShort') }) : null)),
      h('section', null, h('h2', { class: 'day', style: 'margin:4px 0 0', text: t('history') }),
        hist.length ? h('div', null, hist.slice(0, 5).map(actRow)) : h('p', { class: 'empty', text: t('noHistory') }))],
      [h('div', { class: 'row2' },
        h('button', { class: 'btn p', type: 'button', onClick: () => showOv('pick', { mode: 'save', ref: d.ref, amount: 5000 }), text: t('qSave') }),
        h('button', { class: 'btn s', type: 'button', onClick: () => showOv('pick', { mode: 'withdraw', ref: d.ref, amount: 2000 }), text: t('qWithdraw') }))]);
  }

  function ovOnboard(el, d) {
    el.className = 'ov';
    if (d.step === 1) {
      el.append(h('div', { class: 'pg' },
        h('div', { class: 'pg-body', style: 'padding-top:28px' },
          h('div', { class: 'brand-row' }, logoMark(36), h('span', { class: 'wordmark', text: 'Vosa' })),
          h('div', null, h('h1', { style: 'margin:12px 0 6px;font-size:28px;font-weight:800;letter-spacing:-0.02em;line-height:1.2', text: t('welcomeH') }), h('p', { style: 'margin:0;color:var(--text2)', text: t('welcomeT') })),
          h('div', { class: 'vsay' }, h('span', { style: 'flex:0 0 auto' }, logoMark(22)), h('p', { text: t('chooseLang') }),
            h('button', { type: 'button', 'aria-label': t('replayAria'), onClick: () => speak(t('chooseLang'), state.lang, true) }, icon('speaker', 20))),
          h('div', { role: 'radiogroup', 'aria-label': t('language'), style: 'display:flex;flex-direction:column;gap:10px' },
            [['en', 'English', 'Save 5,000 for rent'], ['pcm', 'Pidgin', 'Abeg save 5k for house rent'], ['yo', 'Yorùbá', 'Fi ẹgbẹ̀rún márùn-ún pamọ́']].map(([code, name, ex]) =>
              h('button', { class: 'lang-row', type: 'button', role: 'radio', 'aria-checked': String(state.lang === code), onClick: () => { setLang(code); speak(t('chooseLang'), code, true); } },
                h('div', null, h('b', { text: name }), h('span', { lang: code === 'yo' ? 'yo' : null, text: ex })), h('span', { class: 'radio', 'aria-hidden': 'true' }))))),
        h('div', { class: 'pg-foot' }, h('button', { class: 'btn p', type: 'button', onClick: () => showOv('onboard', { step: 2, hf: true }), text: t('cont') }))));
    } else {
      const opt = (on, title, desc, val) => h('button', { class: 'lang-row', type: 'button', role: 'radio', 'aria-checked': String(on), onClick: () => { d.hf = val; renderOv(); } },
        h('div', null, h('b', { text: title }), h('span', { text: desc })), h('span', { class: 'radio', 'aria-hidden': 'true' }));
      pageWrap(el, t('step', { n: 2 }), () => showOv('onboard', { step: 1 }), [
        h('h2', { style: 'margin:4px 0 0;font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.25', text: t('howTalk') }),
        h('div', { role: 'radiogroup', style: 'display:flex;flex-direction:column;gap:10px' }, opt(d.hf, t('handsFree'), t('hfOptD'), true), opt(!d.hf, t('tapOpt'), t('tapOptD'), false)),
        h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('lock', 18)), h('div', null, h('b', { text: t('secret') }), h('span', { text: t('phraseInfo', { p: state.secret }) })))],
        [h('button', { class: 'btn p', type: 'button', onClick: () => { state.onboarded = true; persist(); closeOv(); setHandsFree(d.hf); reply(R('welcome')); }, text: t('finish') })]);
    }
  }

  // ---------- language auto-detect ----------
  function detectLang(raw) {
    const n = L.norm(raw);
    if (/[ẹọṣẸỌṢ]/.test(raw) || (n.match(/\b(pamo|egberun|elo|melo|owo|kini|nibo|mi|fun|ni|wa|nino|yo|fi|beeni|rara|ranti|leti|afojusun|mo|fe|ile|ranse|si|ra|kaadi)\b/g) || []).length >= 2) return 'yo';
    if ((n.match(/\b(wetin|abeg|dey|wan|comot|una|fit|na|don|oya|wahala|abi|sef|sabi|make i|give)\b/g) || []).length >= 1 && !/\bgive me\b/.test(n)) return 'pcm';
    if ((n.match(/\b(the|is|do|have|what|want|how|my|please|from|for|much|to|any)\b/g) || []).length >= 2) return 'en';
    return null;
  }
  function maybeSwitch(raw) {
    if (pending && pending.needsPhrase) return;
    const d = detectLang(raw);
    if (d && d !== state.lang && !(d === 'en' && state.lang === 'pcm')) { state.lang = d; persist(); render(); announce(t('switched')); }
  }

  // ---------- optional: ask Claude when the rules don't understand (Claude preview only) ----------
  let sampleFn = null;
  (async () => { try { if (window.claude && window.claude.use) sampleFn = await window.claude.use('sample'); } catch (e) { sampleFn = null; } })();
  async function aiUnderstand(raw) {
    if (!sampleFn) return null;
    const prompt = 'You turn one request to a Nigerian voice money app into JSON. The user may speak English, Nigerian Pidgin or Yoruba (possibly without tone marks). ' +
      'Return ONLY a JSON object with keys: intent ("save"|"withdraw"|"send"|"airtime"|"balance"|"wallet"|"account"|"goal"|"remind"|"autosave"|"explain"|"help"|"goals"|"greet"|"unknown"), ' +
      'amount (number of naira or null), goal ("rent"|"school"|"emergency"|"business"|"travel"|"phone"|"wedding"|"christmas"|"car"|"flex"|null), ' +
      'customName (short goal name if none of those fit, else null), recipient (person name or null), deadlineMonth (1-12 or null), day (0=Sunday..6=Saturday, or null), pct (number or null), ' +
      'network ("MTN"|"Airtel"|"Glo"|"9mobile"|null), term ("mmf"|"tbill"|"mutual"|"inflation"|"interest"|"emergencyfund"|null), lang ("en"|"pcm"|"yo"). ' +
      '"goal" means creating a new savings target; "withdraw" means moving money out of savings. User said: ' + JSON.stringify(raw);
    try {
      status(t('asking'));
      const j = await sampleFn.json(prompt, { modelTier: 'quick' });
      if (!j || !j.intent || j.intent === 'unknown') return null;
      const r = { intent: j.intent, amount: j.amount || null, goal: L.GOALS[j.goal] ? j.goal : null, customName: j.customName || null, day: (j.day ?? null), term: j.term || null, pct: j.pct || null, network: j.network || null };
      if (j.recipient) { r.contact = state.contacts.find(c => [c.name].concat(c.aliases).some(a => a.toLowerCase() === String(j.recipient).toLowerCase())) || null; if (!r.contact) r.unknownName = j.recipient; }
      if (j.deadlineMonth) { const now = new Date(); let d = new Date(now.getFullYear(), j.deadlineMonth - 1, 1); if (d - now < 14 * 864e5) d = new Date(now.getFullYear() + 1, j.deadlineMonth - 1, 1); r.deadline = d; }
      if (j.lang && ['en', 'pcm', 'yo'].includes(j.lang) && j.lang !== state.lang) { state.lang = j.lang; persist(); render(); }
      return r;
    } catch (e) {
      if (e && e.code === 'not_granted') sampleFn = null;
      return null;
    } finally { status(''); }
  }

  // ---------- core flow ----------
  async function reply(text, lang) {
    lang = lang || state.lang;
    lastReply = text; lastReplyLang = lang;
    renderTalk();
    await speak(text, lang);
    afterReply();
  }

  function fail(sheet, text) { showOv('sheet', sheet); return reply(text); }
  const okAction = () => ({ label: t('ok'), primary: true, fn: closeOv });

  function cancelPending() {
    pending = null; closeOv();
    reply(R('cancelled'));
  }

  let busy = false;
  async function handle(raw, opts) {
    opts = opts || {};
    raw = String(raw || '').trim();
    if (!raw) return afterReply();
    stopListening();
    const phraseMode = !!(pending && pending.needsPhrase);
    const isPhrase = phraseMode && L.norm(raw).includes(L.norm(state.secret));
    lastHeard = isPhrase || (phraseMode && opts.via === 'text') ? '••••••' : raw;
    if (ov && ['success', 'moneyin', 'sheet', 'pot', 'amount', 'goal-form', 'send-form', 'airtime-form'].includes(ov.kind) && !(pending && pending.type === 'nudge')) closeOv();
    maybeSwitch(raw);
    renderTalk();
    let r = L.understand(raw, { pending: !!pending, awaiting: awaiting && awaiting.slot, contacts: state.contacts });

    if (phraseMode) {
      if (isPhrase) return execute();
      if (r.intent === 'no') return cancelPending();
      if (r.intent === 'yes') return reply(R('phraseHint'));
      pending.tries = (pending.tries || 0) + 1;
      if (pending.tries >= 3) {
        pending = null;
        return fail({ tone: 'err', icon: 'x', k: t('kLocked'), title: R('locked'), actions: [okAction()] }, R('locked'));
      }
      renderOv();
      return reply(R('phraseWrong'));
    }

    if (r.intent === 'yes') { if (pending) return execute(); r.intent = 'unknown'; }
    if (r.intent === 'no') { if (pending) return cancelPending(); return reply(R('cancelled')); }
    if (pending) { pending = null; if (ov && ['confirm', 'success', 'moneyin'].includes(ov.kind)) closeOv(); }

    if (r.intent === 'fill' && awaiting) {
      const base = awaiting.r;
      if (awaiting.slot === 'amount') base.amount = r.amount;
      if (awaiting.slot === 'day') base.day = r.day;
      if (awaiting.slot === 'recipient') { base.contact = r.contact; base.account = r.account; base.bank = r.bank || base.bank; }
      awaiting = null; r = base;
    } else if (awaiting && awaiting.slot === 'bank' && r.bank) {
      const base = awaiting.r; base.bank = r.bank; awaiting = null; r = base;
    } else {
      awaiting = null;
    }

    if (r.intent === 'unknown') {
      busy = true;
      const ai = await aiUnderstand(raw);
      busy = false;
      if (ai) r = ai;
    }
    return route(r);
  }

  function resolveGoal(r, createIfMissing) {
    let g = findGoal(r.goal, r.customName);
    if (!g && !r.goal && !r.customName) g = findGoal('flex');
    if (!g && createIfMissing) {
      g = { key: r.goal || 'custom', name: r.goal ? null : (r.customName || null), bal: 0, target: null, deadline: null, isNew: true };
      if (!g.name && g.key === 'custom') g.name = 'My goal';
    }
    return g;
  }
  function progVars(g) {
    if (!g.target) return '';
    return R('prog', { pct: Math.min(100, Math.round(g.bal / g.target * 100)), target: fmt(g.target) });
  }
  function lowWallet(amount) {
    const text = R('lowWallet', { wallet: fmt(state.wallet), amt: fmt(amount) });
    return fail({ tone: 'warn', icon: 'alert', k: t('kNoMoney'), title: text, actions: [okAction(), { label: t('addDemo'), fn: () => { closeOv(); incoming(50000, 'Kemi Adewale'); } }] }, text);
  }
  function confirmWith(p, text) { pending = p; showOv('confirm'); return reply(text); }

  function routeUI(r) { lastHeard = ''; renderTalk(); return route(r); }
  function route(r) {
    switch (r.intent) {
      case 'save': {
        if (!r.amount) { awaiting = { slot: 'amount', r }; return reply(R('askSave')); }
        if (state.wallet < r.amount) return lowWallet(r.amount);
        const g = resolveGoal(r, true);
        return confirmWith({ type: 'save', amount: r.amount, goal: g }, R('confirmSave', { amt: fmt(r.amount), goal: label(g) }));
      }
      case 'withdraw': {
        if (!r.amount) { awaiting = { slot: 'amount', r }; return reply(R('askWithdraw')); }
        const g = resolveGoal(r, false);
        if (!g) {
          const text = R('noGoal', { goal: r.goal ? L.GOALS[r.goal][state.lang] : (r.customName || '') });
          return fail({ tone: 'warn', icon: 'pot', k: t('kNoGoal'), title: text, actions: [okAction(), { label: t('createGoal'), fn: () => showOv('goal-form', { key: r.goal && GOAL_CHOICES.includes(r.goal) ? r.goal : 'other', amount: 50000, month: 2 }) }] }, text);
        }
        if (g.bal < r.amount) {
          const text = R('insufficient', { goal: label(g), bal: fmt(g.bal), amt: fmt(r.amount) });
          return fail({ tone: 'warn', icon: 'alert', k: t('kNoMoney'), title: text, actions: [okAction()] }, text);
        }
        return confirmWith({ type: 'withdraw', amount: r.amount, goal: g, needsPhrase: true }, R('confirmWithdraw', { amt: fmt(r.amount), goal: label(g) }));
      }
      case 'send': {
        if (!r.contact && !r.account) {
          if (r.unknownName) {
            const text = R('unknownContact', { name: r.unknownName.replace(/\b\w/g, c => c.toUpperCase()) });
            return fail({ tone: 'warn', icon: 'user', k: t('kNoContact'), title: text, actions: [okAction(), { label: t('sendMoney'), fn: () => showOv('send-form', { c: 0, amount: r.amount || 5000 }) }] }, text);
          }
          awaiting = { slot: 'recipient', r }; return reply(R('askRecipient'));
        }
        if (!r.amount) { awaiting = { slot: 'amount', r }; return reply(R('askSend')); }
        if (state.wallet < r.amount) return lowWallet(r.amount);
        const to = r.contact ? { name: r.contact.name, bank: r.contact.bank, acct: r.contact.acct } : { name: r.account, bank: r.bank, acct: r.account };
        if (!to.bank) { awaiting = { slot: 'bank', r }; return reply(R('needBank', { acct: r.account })); }
        return confirmWith({ type: 'send', amount: r.amount, to, needsPhrase: true }, R('confirmSend', { amt: fmt(r.amount), name: to.name, bank: to.bank, last4: to.acct.slice(-4) }));
      }
      case 'airtime': {
        if (!r.amount) { awaiting = { slot: 'amount', r }; return reply(R('askAirtime')); }
        if (state.wallet < r.amount) return lowWallet(r.amount);
        const net = r.network || state.myNetwork;
        const who = r.phone ? r.phone : R('yourLine');
        return confirmWith({ type: 'airtime', amount: r.amount, net, who }, R('confirmAirtime', { amt: fmt(r.amount), net, who }));
      }
      case 'account': return reply(R('account', { acct: state.account }));
      case 'wallet': go('home'); return reply(R('wallet', { wallet: fmt(state.wallet) }));
      case 'autosave': {
        const pct = Math.min(50, r.pct || 10);
        const g = resolveGoal(r, true);
        if (g.isNew) { delete g.isNew; state.goals.push(g); }
        state.autoSave = { pct, ref: gref(g) };
        persist(); render();
        return reply(R('autosaveSet', { pct, goal: label(g) }));
      }
      case 'autosaveoff': state.autoSave = null; persist(); render(); return reply(R('autosaveOff'));
      case 'handsfree': setHandsFree(r.on); return reply(R(r.on ? 'handsfreeOn' : 'handsfreeOff'));
      case 'setsecret': {
        const phrase = r.phrase.replace(/[^\p{L}\p{N} ]/gu, '').trim();
        if (phrase.length < 3) return reply(R('unknown'));
        state.secret = phrase; persist(); render();
        return reply(R('secretSet', { phrase }));
      }
      case 'goal': {
        if (!r.amount) { awaiting = { slot: 'amount', r }; return reply(R('askGoal')); }
        const g = resolveGoal(r, true);
        const deadline = r.deadline || null;
        const vars = { goal: label(g), target: fmt(r.amount) };
        if (deadline) {
          vars.weekly = fmt(Math.ceil(Math.max(0, r.amount - g.bal) / weeksUntil(deadline) / 100) * 100);
          vars.date = L.dateLabel(deadline);
        }
        return confirmWith({ type: 'goal', goal: g, target: r.amount, deadline }, R(deadline ? 'confirmGoal' : 'confirmGoalNoDate', vars));
      }
      case 'balance': {
        const g = (r.goal || r.customName) ? findGoal(r.goal, r.customName) : null;
        if (g && g.key !== 'flex') { showOv('pot', { ref: gref(g) }); return reply(R('balanceGoal', { goal: label(g), bal: fmt(g.bal), prog: progVars(g) })); }
        go('home');
        const list = state.goals.map(x => label(x) + ': ' + fmt(x.bal)).join('. ') + '.';
        return reply(R('balanceTotal', { wallet: fmt(state.wallet), total: fmt(total()), list }));
      }
      case 'goals': {
        go('pots');
        const list = state.goals.map(x => label(x) + ' ' + fmt(x.bal)).join(', ');
        return reply(R('goals', { n: state.goals.length, list }));
      }
      case 'remind': {
        if (r.day == null) { awaiting = { slot: 'day', r }; return reply(R('askDay')); }
        if (!state.reminders.includes(r.day)) state.reminders.push(r.day);
        persist(); render();
        return reply(R('remind', { day: L.dayLabel(r.day, state.lang) }));
      }
      case 'explain': return reply((L.EXPLAIN[r.term] || {})[state.lang] || R('unknown'));
      case 'help': return reply(R('help'));
      case 'greet': return reply(R('greet'));
      default: {
        const text = R('unknown');
        return fail({ tone: 'warn', icon: 'wave', k: t('kDidnt'), title: text, actions: [
          { label: t('tryAgain'), primary: true, fn: () => { closeOv(); micDenied = false; startListening(); } },
          { label: t('typeInstead'), fn: () => { showOv('type'); } }] }, text);
      }
    }
  }

  function execute() {
    const p = pending; pending = null;
    if (!p) return reply(R('unknown'));
    if (p.goal && p.goal.isNew) { delete p.goal.isNew; state.goals.push(p.goal); }
    const g = p.goal;
    if (p.type === 'save' || p.type === 'nudge') {
      if (state.wallet < p.amount) return lowWallet(p.amount);
      state.wallet -= p.amount; g.bal += p.amount;
      logAct({ kind: 'save', g: gref(g), amt: p.amount });
      let msg = R('doneSave', { goal: label(g), bal: fmt(g.bal), prog: progVars(g) });
      if (g.target && g.bal >= g.target) msg += R('reached');
      flashGoal = g; persist(); render();
      showOv('success', { title: t('savedTo', { g: label(g) }), amount: p.amount, sub: g.target ? Math.min(100, Math.round(g.bal / g.target * 100)) + '% ' + t('of') + ' ' + fmt(g.target) : fmt(g.bal) });
      return reply(msg);
    }
    if (p.type === 'withdraw') {
      g.bal -= p.amount; state.wallet += p.amount;
      logAct({ kind: 'move', g: gref(g), amt: p.amount });
      persist(); render();
      showOv('success', { title: t('moved'), amount: p.amount, sub: label(g) + ': ' + fmt(g.bal) });
      return reply(R('doneWithdraw', { amt: fmt(p.amount), goal: label(g), bal: fmt(g.bal) }));
    }
    if (p.type === 'goal') {
      g.target = p.target;
      g.deadline = p.deadline ? ymd(p.deadline) : null;
      flashGoal = g; persist(); go('pots');
      showOv('success', { title: t('goalSet'), amount: p.target, sub: label(g) + (p.deadline ? ' · ' + L.dateLabel(p.deadline) : '') });
      return reply(R('doneGoal', { goal: label(g), target: fmt(g.target) }));
    }
    if (p.type === 'send') {
      if (state.wallet < p.amount) return lowWallet(p.amount);
      state.wallet -= p.amount;
      logAct({ kind: 'send', n: p.to.name, amt: p.amount, detail: p.to.bank + ' •••• ' + p.to.acct.slice(-4) });
      let msg = R('doneSend', { name: p.to.name, amt: fmt(p.amount), wallet: fmt(state.wallet) });
      const nudge = roundTo(p.amount * 0.1, 500);
      const flex = findGoal('flex') || state.goals[0];
      if (p.amount >= 2000 && state.wallet >= nudge * 3 && flex) {
        msg += R('nudge', { nudge: fmt(nudge), goal: label(flex) });
        pending = { type: 'nudge', amount: nudge, goal: flex };
      }
      persist(); render();
      showOv('success', { title: t('sentTo', { n: p.to.name }), amount: p.amount, sub: p.to.bank + ' •••• ' + p.to.acct.slice(-4) });
      return reply(msg);
    }
    if (p.type === 'airtime') {
      if (state.wallet < p.amount) return lowWallet(p.amount);
      state.wallet -= p.amount;
      const who = /^\d+$/.test(p.who) ? masked(p.who) : masked(state.myPhone);
      logAct({ kind: 'airtime', n: p.net, amt: p.amount, detail: who });
      persist(); render();
      showOv('success', { title: t('airtimeSent'), amount: p.amount, sub: p.net + ' · ' + who });
      return reply(R('doneAirtime', { amt: fmt(p.amount), net: p.net, who: p.who, wallet: fmt(state.wallet) }));
    }
  }

  function incoming(amount, name) {
    stopListening();
    pending = null;
    state.wallet += amount;
    logAct({ kind: 'in', n: name, amt: amount });
    let msg = R('incoming', { amt: fmt(amount), name, wallet: fmt(state.wallet) });
    if (state.autoSave) {
      const g = findRef(state.autoSave.ref || { key: 'flex' }) || findGoal('flex');
      const save = Math.round(amount * state.autoSave.pct / 100);
      const before = g.bal;
      state.wallet -= save; g.bal += save;
      logAct({ kind: 'save', g: gref(g), amt: save, sub: 'auto' });
      msg += R('autoSaved', { pct: state.autoSave.pct, save: fmt(save), goal: label(g) });
      persist(); render();
      showOv('moneyin', { name, amount, saved: save, pct: state.autoSave.pct, goalLabel: label(g), ref: gref(g), before, after: g.bal });
    } else {
      const save = Math.round(amount * 0.1);
      const flex = findGoal('flex') || state.goals[0];
      pending = { type: 'nudge', amount: save, goal: flex };
      msg += R('incomingNudge', { save: fmt(save) });
      persist(); render();
      showOv('moneyin', { name, amount });
    }
    return reply(msg);
  }

  function undoAuto(d) {
    const g = findRef(d.ref);
    if (g && g.bal >= d.saved) { g.bal -= d.saved; state.wallet += d.saved; logAct({ kind: 'move', g: gref(g), amt: d.saved }); }
    persist(); closeOv(); render();
    reply(t('undone', { a: fmt(d.saved) }));
  }

  function resetDemo() {
    const lang = state.lang; stopListening(); stopSpeaking();
    state = seed(); state.lang = lang; pending = null; awaiting = null; lastHeard = ''; lastReply = R('welcome');
    persist(); render(); showOv('onboard', { step: 1 });
  }

  // ---------- speech out ----------
  const backend = { ok: false, sttYo: false, ttsYo: false, ttsEn: false };
  let audioEl = null, warnedYo = false, speakToken = 0;
  function stopSpeaking() {
    speakToken++;
    try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
    if (audioEl) { audioEl.pause(); audioEl = null; }
  }
  async function speak(text, lang, force) {
    if (!text || (state.muted && !force)) return;
    stopSpeaking();
    const my = speakToken;
    const spoken = L.toSpeech(text, lang);
    const useServer = (lang === 'yo' && backend.ttsYo) || (lang !== 'yo' && backend.ttsEn);
    if (useServer) {
      try {
        const res = await fetch('api/speak', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text: spoken, lang, speed: state.speed }) });
        if (!res.ok) throw new Error('speak ' + res.status);
        const blob = await res.blob();
        if (my !== speakToken) return;
        audioEl = new Audio(URL.createObjectURL(blob));
        await new Promise((resolve) => { audioEl.onended = resolve; audioEl.onerror = resolve; audioEl.play().catch(resolve); });
        return;
      } catch (e) { /* fall back to the browser voice */ }
    }
    if (!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices();
    let v;
    if (lang === 'yo') {
      v = voices.find(x => /^yo/i.test(x.lang));
      if (!v) { if (!warnedYo) { warnedYo = true; status(t('noYoVoice')); } return; }
    } else {
      v = voices.find(x => /en-NG/i.test(x.lang)) || voices.find(x => /en-(GB|ZA|KE|GH)/i.test(x.lang)) || voices.find(x => /^en/i.test(x.lang));
    }
    const u = new SpeechSynthesisUtterance(spoken);
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = state.speed;
    await new Promise((resolve) => {
      u.onend = resolve; u.onerror = resolve;
      setTimeout(resolve, Math.min(30000, 1500 + spoken.length * 90 / state.speed));
      speechSynthesis.speak(u);
    });
  }
  if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }

  // ---------- speech in ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let listening = false, rec = null, mediaRec = null, chunks = [], stopTimer = null, vad = null;
  let micDenied = false, emptyRuns = 0;

  function engineText() {
    const parts = [];
    parts.push(SR ? 'English/Pidgin: browser' : (backend.ok ? 'English/Pidgin: Spitch' : 'English/Pidgin: typing only'));
    parts.push(backend.sttYo ? 'Yorùbá: Spitch' : 'Yorùbá: typing (connect Spitch for voice)');
    return parts.join(' · ');
  }
  function showListen(mode) {
    const el = $('listen');
    if (!mode) { el.hidden = true; return; }
    el.hidden = false;
    const ls = $('listen-state'); ls.textContent = ''; ls.append(h('i', { 'aria-hidden': 'true' }), mode === 'work' ? t('working') : t('listening'));
    $('wave').classList.toggle('calm', mode === 'work');
    $('live-label').textContent = t('youSaying');
    if (mode === 'listen') $('live-text').textContent = '';
    const st = $('stop'); st.textContent = ''; st.append(icon('stop', 24)); st.setAttribute('aria-label', t('stopLbl')); st.hidden = mode === 'work';
    const cx = $('listen-cancel'); cx.textContent = ''; cx.append(icon('x', 18)); cx.setAttribute('aria-label', t('cancel'));
    $('listen-hint1').textContent = mode === 'work' ? '' : t('tapFinish');
    $('listen-hint2').textContent = state.handsFree ? t('hfStop') : '';
    announce(mode === 'work' ? t('working') : t('listening'));
  }
  function setLive(on) {
    listening = on;
    $('mic').classList.toggle('live', on);
    showListen(on ? 'listen' : null);
  }
  function canListen() { return !micDenied && ((state.lang === 'yo' && backend.sttYo) || SR || backend.ok); }

  function startListening() {
    if (listening) return;
    stopSpeaking();
    if (state.lang === 'yo' && backend.sttYo) return startRecording();
    if (SR) return startBrowserSR();
    if (backend.ok) return startRecording();
    voiceUnavailable();
  }
  function stopListening() {
    clearTimeout(stopTimer);
    if (rec) { try { rec.abort(); } catch (e) {} rec = null; }
    if (mediaRec && mediaRec.state === 'recording') { mediaRec.discard = true; mediaRec.stop(); }
    if (listening) setLive(false);
    showListen(null);
  }
  function afterReply() {
    if (!state.handsFree || listening || !canListen() || !state.onboarded) return;
    if (ov && ['goal-form', 'send-form', 'airtime-form', 'onboard'].includes(ov.kind)) return;
    setTimeout(() => { if (state.handsFree && !listening) startListening(); }, 350);
  }
  function setHandsFree(on) {
    state.handsFree = !!on; emptyRuns = 0; persist();
    if (!on) stopListening();
    render();
  }

  async function startRecording() {
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { micDenied = true; return voiceUnavailable(); }
    chunks = [];
    const type = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(x => window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(x)) || '';
    const mr = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    mediaRec = mr;
    let heard = false;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser(); an.fftSize = 1024; src.connect(an);
      const buf = new Uint8Array(an.fftSize);
      let lastLoud = Date.now(); const started = Date.now();
      vad = setInterval(() => {
        an.getByteTimeDomainData(buf);
        let sum = 0; for (let i = 0; i < buf.length; i++) { const d = (buf[i] - 128) / 128; sum += d * d; }
        if (Math.sqrt(sum / buf.length) > 0.04) { heard = true; lastLoud = Date.now(); }
        if ((heard && Date.now() - lastLoud > 1300) || (!heard && Date.now() - started > 7000)) { if (mr.state === 'recording') mr.stop(); }
      }, 100);
      mr.addEventListener('stop', () => { clearInterval(vad); ctx.close(); });
    } catch (e) { heard = true; }
    mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    mr.onstop = async () => {
      stream.getTracks().forEach(tr => tr.stop());
      clearTimeout(stopTimer);
      setLive(false);
      if (mr.discard) return;
      const blob = new Blob(chunks, { type: mr.mimeType || 'audio/webm' });
      if (!heard || blob.size < 2000) { emptyRuns++; return emptyRuns < 30 ? afterReply() : status(t('voiceErr')); }
      emptyRuns = 0;
      showListen('work'); busy = true;
      try {
        const lang = state.lang === 'yo' ? 'yo' : 'en';
        const res = await fetch('api/transcribe?lang=' + lang, { method: 'POST', headers: { 'Content-Type': blob.type.split(';')[0] }, body: blob });
        const j = await res.json();
        if (!res.ok || !j.text) throw new Error(j.error || 'no text');
        busy = false; showListen(null);
        handle(j.text, { via: 'voice' });
      } catch (e) { busy = false; showListen(null); status(t('voiceErr')); afterReply(); }
    };
    mr.start();
    setLive(true);
    stopTimer = setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, 15000);
  }

  function startBrowserSR() {
    const r = new SR();
    rec = r;
    r.lang = state.lang === 'yo' ? 'yo-NG' : 'en-NG';
    r.interimResults = true;
    r.maxAlternatives = 1;
    let finalText = '', gotError = false;
    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) finalText += e.results[i][0].transcript; else interim += e.results[i][0].transcript;
      }
      $('live-text').textContent = '“' + (finalText + interim).trim() + '”';
    };
    r.onerror = (e) => {
      gotError = true;
      if (['not-allowed', 'service-not-allowed', 'audio-capture', 'language-not-supported'].includes(e.error)) { micDenied = true; voiceUnavailable(); }
      else if (e.error !== 'no-speech' && e.error !== 'aborted') status(t('voiceErr'));
    };
    r.onend = () => {
      if (rec === r) rec = null;
      listening = false; $('mic').classList.remove('live'); showListen(null);
      if (finalText.trim()) { emptyRuns = 0; handle(finalText, { via: 'voice' }); return; }
      if (!micDenied && state.handsFree) { emptyRuns++; if (emptyRuns < 30) afterReply(); }
      else if (!gotError) status(t('voiceErr'));
    };
    try { r.start(); setLive(true); } catch (e) { micDenied = true; voiceUnavailable(); }
  }

  function voiceUnavailable() {
    setLive(false); showListen(null);
    showOv('sheet', { tone: 'err', icon: 'micoff', k: t('kMic'), title: t('micTitle'), body: t('micBody'), actions: [
      { label: t('typeInstead'), primary: true, fn: () => { showOv('type'); } },
      { label: t('ok'), fn: closeOv }] });
  }

  $('mic').addEventListener('click', () => {
    if (listening) {
      if (rec) { try { rec.stop(); } catch (e) {} }
      if (mediaRec && mediaRec.state === 'recording') mediaRec.stop();
      return;
    }
    micDenied = false;
    startListening();
  });
  $('stop').addEventListener('click', () => {
    if (rec) { try { rec.stop(); } catch (e) {} }
    if (mediaRec && mediaRec.state === 'recording') mediaRec.stop();
  });
  $('listen-cancel').addEventListener('click', () => { stopListening(); });
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || e.repeat) return;
    const tag = (document.activeElement && document.activeElement.tagName) || '';
    if (/INPUT|TEXTAREA|BUTTON|SELECT/.test(tag)) return;
    e.preventDefault();
    $('mic').click();
  });

  // ---------- other controls ----------
  $('replay').addEventListener('click', () => speak(lastReply, lastReplyLang, true));
  $('kbd').addEventListener('click', () => showOv('type'));
  document.querySelectorAll('.tab').forEach(b => b.addEventListener('click', () => go(b.dataset.view)));

  // ---------- start ----------
  lastReply = R('welcome');
  render();
  if (!state.onboarded) showOv('onboard', { step: 1 });
  (async () => {
    try {
      const res = await fetch('api/health', { cache: 'no-store' });
      if (!res.ok) return;
      const j = await res.json();
      if (!j || j.service !== 'vosa') return;
      backend.ok = !!j.spitch; backend.sttYo = !!j.spitch; backend.ttsYo = !!j.spitch; backend.ttsEn = !!j.voiceEn;
      if (state.view === 'settings') render();
    } catch (e) { /* no server: browser-only mode */ }
  })();
})();
