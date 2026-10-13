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
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
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
    wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M3 10h18M16 15h2"/>',
    copy: '<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h9"/>',
    dots: '<circle cx="6" cy="12" r="1.3" fill="currentColor"/><circle cx="12" cy="12" r="1.3" fill="currentColor"/><circle cx="18" cy="12" r="1.3" fill="currentColor"/>',
    down: '<path d="M7 10l5 5 5-5"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 12h.01"/>',
    callp: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
    spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>'
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
    trySay: { en: 'Try saying', pcm: 'You fit talk', yo: 'Gbìyànjú kí o sọ pé' },
    pots: { en: 'Savings pots', yo: 'Àwọn àpò ìfowópamọ́' },
    seeAll: { en: 'See all {n}', yo: 'Wo gbogbo {n}' },
    sendMoney: { en: 'Send money', yo: 'Fi owó ránṣẹ́' },
    buyAirtime: { en: 'Buy airtime', yo: 'Ra káàdì ìpè' },
    noTarget: { en: 'No target · take out any time', pcm: 'No target · comot am anytime', yo: 'Kò sí àfojúsùn · o lè yọ ọ́ nígbàkúgbà' },
    of: { en: 'of', yo: 'nínú' },
    by: { en: 'by', pcm: 'before', yo: 'títí' },
    onTrack: { en: 'On track · {w} a week', pcm: 'On track · {w} every week', yo: 'Ó ń lọ dáadáa · {w} lọ́sẹ̀' },
    behind: { en: 'Behind · needs {w} a week', pcm: 'You dey behind · need {w} every week', yo: 'Ó ń lẹ́yìn · ó nílò {w} lọ́sẹ̀' },
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
    nudgeQ: { en: 'Want to save {a} to {g} too?', pcm: 'Shey make I put {a} for {g} join?', yo: 'Ṣé kí n fi {a} pamọ́ sínú {g} pẹ̀lú?' },
    yesShort: { en: 'Yes, save', yo: 'Bẹ́ẹ̀ni' }, noThanks: { en: 'No thanks', pcm: 'No, thank you', yo: 'Rárá o ṣé' },
    orSayYesNo: { en: 'Or say “yes” or “no”', pcm: 'Or talk “yes” or “no”', yo: 'Tàbí sọ “bẹ́ẹ̀ni” tàbí “rárá”' },
    moneyIn: { en: 'Money in', pcm: 'Money don enter', yo: 'Owó wọlé' },
    fromN: { en: 'From {n}', yo: 'Láti ọ̀dọ̀ {n}' },
    savedForYou: { en: 'I saved {a} for you, as you asked.', pcm: 'As you talk am, I don keep {a} for you.', yo: 'Mo ti fi {a} pamọ́ fún ọ, gẹ́gẹ́ bí o ṣe sọ.' },
    saveTenQ: { en: 'Want me to save 10% of it ({a})?', pcm: 'Shey make I keep 10% of am ({a})?', yo: 'Ṣé kí n fi 10% rẹ̀ ({a}) pamọ́?' },
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
    chooseLang: { en: 'Hello, I am Vosa. Which language do you want? Tap or say English, Pidgin or Yorùbá.', pcm: 'How you dey? Na me be Vosa. Which language you wan use? Tap am or talk English, Pidgin or Yorùbá.', yo: 'Ẹ kú àbọ̀! Èmi ni Vosa. Èdè wo ni o fẹ́? Tẹ̀ tàbí sọ English, Pidgin tàbí Yorùbá.' },
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
    promiseT: { en: 'Voice Promise', pcm: 'Voice Promise', yo: 'Ìlérí Ohùn' },
    promiseRow: { en: 'Recorded {d}', pcm: 'Recorded {d}', yo: 'A gbà á sílẹ̀ {d}' }, promiseNoneRow: { en: 'Protect this money with your own voice', pcm: 'Protect this money with your own voice', yo: 'Dáàbò bo owó yìí pẹ̀lú ohùn rẹ' },
    promiseRec: { en: 'Record', pcm: 'Record', yo: 'Gbà sílẹ̀' }, promiseRedo: { en: 'Record again', pcm: 'Record again', yo: 'Tún gbà sílẹ̀' }, promiseKeep: { en: 'Keep this promise', pcm: 'Keep this promise', yo: 'Pa ìlérí yìí mọ́' },
    promisePlayBtn: { en: 'Play', pcm: 'Play', yo: 'Gbọ́' }, promiseAgain: { en: 'Play again', pcm: 'Play again', yo: 'Tún gbọ́' },
    promiseRecording: { en: 'Recording… tap Stop when you finish', pcm: 'E dey record… press Stop when you finish', yo: 'Ń gbà sílẹ̀… tẹ Dúró tí o bá parí' },
    promiseTooShort: { en: 'That was too short. Please say a full sentence.', pcm: 'E too short. Abeg talk full sentence.', yo: 'Ó kúrú jù. Jọ̀wọ́ sọ gbólóhùn kíkún.' },
    promiseReview: { en: 'Here is what you said. Keep it, or record again.', pcm: 'Na wetin you talk be this. Keep am, or record again.', yo: 'Èyí ni ohun tí o sọ. Pa á mọ́, tàbí tún gbà sílẹ̀.' },
    yourPromise: { en: 'Your promise for {g}', pcm: 'Your promise for {g}', yo: 'Ìlérí rẹ fún {g}' },
    promiseQ: { en: 'Is this an emergency?', pcm: 'Na emergency?', yo: 'Ṣé pàjáwìrì ni?' },
    yesEmergency: { en: 'Yes, it’s an emergency', pcm: 'Yes, na emergency', yo: 'Bẹ́ẹ̀ni, pàjáwìrì ni' }, noKeep: { en: 'No, keep it saved', pcm: 'No, keep am', yo: 'Rárá, pa á mọ́' },
    takeOutOf: { en: 'Take out of {g}', pcm: 'Comot from {g}', yo: 'Yọ kúrò nínú {g}' }, emergencyChip: { en: 'Said it’s an emergency', pcm: 'Talk say na emergency', yo: 'Sọ pé pàjáwìrì ni' },
    demoAskW: { en: '{n} wants to take {a} out of {g} early. They said it’s an emergency.', pcm: '{n} wan comot {a} from {g} before time. Dem talk say na emergency.', yo: '{n} fẹ́ yọ {a} kúrò nínú {g} ní kùtùkùtù. Wọ́n sọ pé pàjáwìrì ni.' },
    recordPromiseBtn: { en: 'Record a Voice Promise', pcm: 'Record Voice Promise', yo: 'Gba Ìlérí Ohùn sílẹ̀' }, notNow: { en: 'Not now', pcm: 'Not now', yo: 'Kì í ṣe báyìí' },
    promiseWhy: { en: 'Like a witness at ajo: you promise in your own voice, and Vosa plays it back if you ever try to break it. Emergencies always go through.', pcm: 'Like witness for ajo: you promise with your own voice, and Vosa go play am back if you try break am. Emergency go always pass.', yo: 'Bí ẹlẹ́rìí nínú àjọ: o ṣèlérí pẹ̀lú ohùn rẹ, Vosa yóò sì tún gbé e sọ tí o bá fẹ́ dà á. Pàjáwìrì máa ń kọjá nígbà gbogbo.' },
    needsSpitchLang: { en: 'Hausa and Igbo voice need the Spitch key on the server. You can type for now.', ha: 'Muryar Hausa tana buƙatar Spitch a sabar. Za ka iya rubutu yanzu.', ig: 'Olu Igbo chọrọ Spitch na sava. Ị nwere ike ide ugbu a.' },
    voiceLbl: { en: 'Vosa’s voice', pcm: 'Vosa voice', yo: 'Ohùn Vosa' },
    voiceD: { en: 'Spitch is a natural Nigerian voice (uses Spitch credit; repeated replies are free). Phone uses the built-in voice.', pcm: 'Spitch na natural Naija voice (e dey use Spitch credit; reply wey e don talk before na free). Phone na the built-in voice.', yo: 'Spitch jẹ́ ohùn Nàìjíríà tó dára (ó ń lo krẹ́dìtì Spitch). Fóònù ń lo ohùn inú fóònù.' },
    whichVoice: { en: 'Which voice', pcm: 'Which voice', yo: 'Ohùn wo' },
    whichVoiceD: { en: 'Pick one, then tap Hear it.', pcm: 'Pick one, then press Hear am.', yo: 'Yan ọ̀kan, kí o tẹ Gbọ́ ọ.' },
    hearIt: { en: 'Hear it', pcm: 'Hear am', yo: 'Gbọ́ ọ' },
    hearLbl: { en: 'How Vosa hears you', pcm: 'How Vosa dey hear you', yo: 'Bí Vosa ṣe ń gbọ́ ọ' },
    hearD: { en: 'Phone is free. Spitch understands Nigerian accents and Pidgin better, but uses your Spitch credit.', pcm: 'Phone na free. Spitch sabi Naija accent and Pidgin pass, but e dey use your Spitch credit.', yo: 'Fóònù jẹ́ ọ̀fẹ́. Spitch gbọ́ ohùn Nàìjíríà dáradára, ṣùgbọ́n ó ń lo krẹ́dìtì Spitch rẹ.' },
    hearPhone: { en: 'Phone', pcm: 'Phone', yo: 'Fóònù' },
    goAhead: { en: 'Go ahead, I’m listening.', pcm: 'Talk, I dey hear you.', yo: 'Sọ̀rọ̀, mo ń gbọ́.' },
    heardYou: { en: 'I heard: “{x}”', pcm: 'I hear: “{x}”', yo: 'Mo gbọ́: “{x}”' },
    voiceErr: { en: 'I could not hear that. Try again, or type it.', pcm: 'I no fit hear am. Try again or type am.', yo: 'Mi ò gbọ́ ọ. Gbìyànjú lẹ́ẹ̀kan sí i, tàbí kọ ọ́.' },
    asking: { en: 'Asking Claude to help understand…', pcm: 'I dey ask Claude make e help me understand…', yo: 'Mo ń béèrè lọ́wọ́ Claude…' },
    hfReady: { en: 'Hands-free is on', pcm: 'Hands-free dey on', yo: 'Hands-free wà' },
    langName: { en: 'EN', pcm: 'PCM', yo: 'YO' },
    every: { en: 'Reminder: every', yo: 'Ìrántí: gbogbo ọjọ́' },
    hi: { en: 'Hello, {n}', pcm: 'How far, {n}', yo: 'Ẹ n lẹ́, {n}' },
    walletBalLbl: { en: 'Wallet balance', pcm: 'Wallet balance', yo: 'Owó inú àpò' },
    savedStrip: { en: 'Saved', pcm: 'Savings', yo: 'Ìfowópamọ́' },
    copyAcct: { en: 'Copy account number', yo: 'Da nọ́ńbà àkáǹtì kọ' },
    qMore: { en: 'More', pcm: 'More', yo: 'Míràn' },
    bannerT: { en: 'Just talk. Vosa does the rest.', pcm: 'Just talk. Vosa go do the rest.', yo: 'Kàn sọ̀rọ̀. Vosa á ṣe ìyókù.' },
    bannerS: { en: 'Say “{ex}”', pcm: 'Talk “{ex}”', yo: 'Sọ pé “{ex}”' },
    tapTalk: { en: 'Tap to talk', pcm: 'Press to talk', yo: 'Tẹ láti sọ̀rọ̀' },
    hfOn: { en: 'Hands-free on', pcm: 'Hands-free on', yo: 'Hands-free wà' },
    quick: { en: 'Quick access', pcm: 'Quick access', yo: 'Ọ̀nà kíákíá' },
    qGoal: { en: 'New goal', pcm: 'New target', yo: 'Àfojúsùn tuntun' },
    qHelpers: { en: 'Helpers', pcm: 'Helpers', yo: 'Olùrànlọ́wọ́' },
    txHistory: { en: 'Transaction history', pcm: 'Transaction history', yo: 'Ìtàn owó' },
    explore: { en: 'Explore', pcm: 'Explore', yo: 'Ṣàwárí' },
    exCircleT: { en: 'Never share your PIN', pcm: 'No share your PIN again', yo: 'Má fi PIN rẹ hàn mọ́' }, exCircleS: { en: 'Add a trusted helper', pcm: 'Add helper wey you trust', yo: 'Fi olùrànlọ́wọ́ kún un' },
    exMmfT: { en: 'Grow your savings', pcm: 'Make your money grow', yo: 'Mú owó rẹ dàgbà' }, exMmfS: { en: 'What is a money market fund?', pcm: 'Wetin be money market fund?', yo: 'Kí ni money market fund?' },
    exAutoT: { en: 'Save without thinking', pcm: 'Save without stress', yo: 'Fowó pamọ́ láìronú' }, exAutoS: { en: 'Auto-save money you receive', pcm: 'Auto-save money wey enter', yo: 'Fi owó tó wọlé pamọ́ fúnra rẹ̀' },
    moreT: { en: 'More', yo: 'Míràn' }, mAcct: { en: 'Account details', pcm: 'Account details', yo: 'Àlàyé àkáǹtì' }, mMoneyIn: { en: 'Receive money (demo)', pcm: 'Collect money (demo)', yo: 'Gba owó (ìdánwò)' },
    gM: { en: 'Good morning', pcm: 'Good morning o', yo: 'Ẹ kú àárọ̀' }, gA: { en: 'Good afternoon', pcm: 'Good afternoon o', yo: 'Ẹ kú ọ̀sán' }, gE: { en: 'Good evening', pcm: 'Good evening o', yo: 'Ẹ kú alẹ́' },
    showBal: { en: 'Show balance', yo: 'Fi iye owó hàn' }, hideBal: { en: 'Hide balance', yo: 'Fi iye owó pamọ́' },
    qSave: { en: 'Save', yo: 'Fi pamọ́' }, qSend: { en: 'Send', yo: 'Fi ránṣẹ́' }, qAirtime: { en: 'Airtime', yo: 'Káàdì ìpè' }, qWithdraw: { en: 'Withdraw', pcm: 'Comot', yo: 'Yọ owó' },
    voiceT: { en: 'Talk to Vosa', yo: 'Bá Vosa sọ̀rọ̀' },
    voiceS: { en: 'Try “{ex}”', pcm: 'Try “{ex}”', yo: 'Gbìyànjú “{ex}”' },
    whatSay: { en: 'What can I say?', pcm: 'Wetin I fit talk?', yo: 'Kí ni mo lè sọ?' },
    yourSavings: { en: 'Your savings', pcm: 'Your savings', yo: 'Ìfowópamọ́ rẹ' },
    seeAll2: { en: 'See all', yo: 'Wo gbogbo' }, recent: { en: 'Recent activity', pcm: 'Wetin don happen', yo: 'Ohun tó ṣẹlẹ̀ láìpẹ́' },
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
    behindShort: { en: 'Behind', pcm: 'Behind', yo: 'Ó ń lẹ́yìn' }, onTrackShort: { en: 'On track', yo: 'Ó ń lọ dáadáa' },
    noHistory: { en: 'No activity in this pot yet.', yo: 'Kò sí nǹkan nínú àpò yìí síbẹ̀.' },
    addDemo: { en: 'Add ₦50k (demo)', pcm: 'Add ₦50k (demo)', yo: 'Fi ₦50k kún un' },
    sentences: {
      en: ['My money should work as hard as I do.', 'Every Friday I put a little aside for rent and school fees.', 'Vosa, please keep my savings safe and growing.'],
      pcm: ['My money suppose dey work hard like me.', 'Every Friday, I dey keep small money for house rent and school fees.', 'Vosa, abeg keep my savings safe make e dey grow.'],
      yo: ['Owó mi gbọ́dọ̀ ṣiṣẹ́ kára bí èmi náà.', 'Ní gbogbo ọjọ́ Ẹtì, mo máa ń fi owó díẹ̀ pamọ́ fún owó ilé.', 'Vosa, jọ̀ọ́ dáàbò bo owó mi kí ó sì máa pọ̀ sí i.']
    },
    vidTitle: { en: 'Voice ID' },
    vidOn: { en: 'On · your voice is checked before money moves', pcm: 'On · I go check your voice before money move', yo: 'Wà · a ó ṣàyẹ̀wò ohùn rẹ kí owó tó lọ' },
    vidOff: { en: 'Not set up yet', pcm: 'You never set am', yo: 'O kò tíì ṣètò rẹ̀' },
    vidNeedsKey: { en: 'Needs the Spitch speech key on the server', pcm: 'E need the Spitch key for server', yo: 'Ó nílò kọ́kọ́rọ́ Spitch' },
    vidDownload: { en: 'Downloading the voice checker. This happens once (about 18 MB).', pcm: 'I dey download the voice checker. Na only once (like 18 MB).', yo: 'Mo ń gba ohun tí ń ṣàyẹ̀wò ohùn sílẹ̀. Ẹ̀ẹ̀kan péré ni (nǹkan bí 18 MB).' },
    enrollNoisy: { en: 'It was too noisy, or more than one person was talking. Please try again in a quiet place.', pcm: 'Noise too much, or another person dey talk join. Abeg try again for quiet place.', yo: 'Ariwo pọ̀ jù, tàbí ẹlòmíì ń sọ̀rọ̀ pẹ̀lú. Jọ̀ọ́ tún gbìyànjú níbi tí ó dákẹ́.' },
    enrollSaving: { en: 'Saving your voiceprint…', pcm: 'I dey save your voiceprint…', yo: 'Mo ń fi ohùn rẹ pamọ́…' },
    setUp: { en: 'Set up', yo: 'Ṣètò' }, redo: { en: 'Redo', yo: 'Tún ṣe' },
    strictness: { en: 'Voice match', yo: 'Ìbámu ohùn' }, strictDesc: { en: 'How closely your voice must match', pcm: 'How your voice must match reach', yo: 'Bí ohùn rẹ ṣe gbọ́dọ̀ bá a mu tó' },
    relaxed: { en: 'Relaxed', pcm: 'Easy', yo: 'Rọrùn' }, strict: { en: 'Strict', yo: 'Le' },
    removeVoice: { en: 'Remove my voiceprint', pcm: 'Delete my voiceprint', yo: 'Pa ohùn mi rẹ́' }, remove: { en: 'Remove', pcm: 'Delete', yo: 'Pa á rẹ́' },
    enrollT: { en: 'Teach Vosa your voice', pcm: 'Make Vosa sabi your voice', yo: 'Kọ́ Vosa ní ohùn rẹ' },
    enrollIntro: { en: 'Read these sentences out loud in your normal voice. Keep reading until the bar is full. It takes about 20 seconds.', pcm: 'Read these lines out for your normal voice. Continue until the bar full. E go take like 20 seconds.', yo: 'Ka àwọn gbólóhùn yìí sókè ní ohùn rẹ déédé. Máa kà á títí ìlà náà yóò fi kún. Ó máa gba ìṣẹ́jú-àáyá 20.' },
    enrollPrivT: { en: 'Stays on this phone', pcm: 'E dey only for this phone', yo: 'Ó wà lórí fóònù yìí nìkan' },
    enrollPriv: { en: 'Your voiceprint is made and stored on this phone. Your voice is not sent anywhere.', pcm: 'Na this phone dey keep your voiceprint. We no dey send your voice go anywhere.', yo: 'Fóònù yìí ni a ti ṣe ohùn rẹ, ibẹ̀ náà ni ó wà. A kì í fi ohùn rẹ ránṣẹ́ sí ibikíbi.' },
    start: { en: 'Start', pcm: 'Start', yo: 'Bẹ̀rẹ̀' }, skip: { en: 'Skip for now', pcm: 'Skip am for now', yo: 'Fò ó fún báyìí' },
    enrollRec: { en: 'Listening… keep reading', pcm: 'I dey hear you… continue to read', yo: 'Mo ń gbọ́… máa kà á lọ' },
    enrollKeep: { en: 'Read the lines again from the top if you finish before the bar is full.', pcm: 'If you finish before the bar full, start again from the top.', yo: 'Tí o bá parí kí ìlà tó kún, tún un kà láti òkè.' },
    enrollDoneT: { en: 'Voice ID is ready', pcm: 'Voice ID don ready', yo: 'Voice ID ti ṣetán' },
    enrollDoneB: { en: 'Sending and withdrawing money now need three things: your secret phrase, the numbers I give you, and your voice.', pcm: 'To send or comot money now need three things: your secret phrase, the numbers I give you, and your voice.', yo: 'Fífi owó ránṣẹ́ àti yíyọ owó nílò nǹkan mẹ́ta báyìí: ọ̀rọ̀ àṣírí rẹ, àwọn nọ́ńbà tí mo fún ọ, àti ohùn rẹ.' },
    enrollErr: { en: 'Voice ID could not start', pcm: 'Voice ID no fit start', yo: 'Voice ID kò lè bẹ̀rẹ̀' },
    vidLoading: { en: 'Getting Voice ID ready…', pcm: 'I dey prepare Voice ID…', yo: 'Mo ń múra Voice ID sílẹ̀…' },
    vidErrShort: { en: 'Voice ID could not start. Checking phrase and numbers only.', pcm: 'Voice ID no start. Na phrase and numbers I go check.', yo: 'Voice ID kò bẹ̀rẹ̀. Ọ̀rọ̀ àṣírí àti nọ́ńbà nìkan ni mo máa ṣàyẹ̀wò.' },
    sayPhraseThen: { en: 'Say your secret phrase, then these numbers', pcm: 'Talk your secret phrase, then these numbers', yo: 'Sọ ọ̀rọ̀ àṣírí rẹ, lẹ́yìn náà àwọn nọ́ńbà yìí' },
    numbersAria: { en: 'Numbers to say: {d}', yo: 'Nọ́ńbà tí o máa sọ: {d}' },
    chkPhrase: { en: 'Secret phrase', yo: 'Ọ̀rọ̀ àṣírí' }, chkNumbers: { en: 'New numbers', yo: 'Nọ́ńbà tuntun' }, chkVoice: { en: 'Your voice', pcm: 'Your voice', yo: 'Ohùn rẹ' },
    gCircle: { en: 'Trusted Circle', yo: 'Trusted Circle' },
    circleDesc: { en: 'Helpers can watch your account or approve big transfers, so you never have to share your PIN. They can never change your secret phrase or Voice ID.', pcm: 'Helpers fit watch your account or approve big transfer, so you no go need share your PIN. Dem no fit change your secret phrase or Voice ID.', yo: 'Àwọn olùrànlọ́wọ́ lè máa wo àkáǹtì rẹ tàbí fọwọ́sí owó ńlá, kí o má baà fi PIN rẹ hàn ẹnikẹ́ni. Wọn kò lè yí ọ̀rọ̀ àṣírí tàbí Voice ID rẹ padà.' },
    circleDescShort: { en: 'People you trust, without sharing your PIN', pcm: 'People wey you trust, no need to share PIN', yo: 'Àwọn tí o fọkàn tán, láìfi PIN hàn' },
    addHelper: { en: 'Add a helper', pcm: 'Add helper', yo: 'Fi olùrànlọ́wọ́ kún un' }, add: { en: 'Add', yo: 'Fi kún' },
    roleWatcher: { en: 'Watcher', yo: 'Olùwòye' }, roleApprover: { en: 'Approver', yo: 'Olùfọwọ́sí' }, roleSpender: { en: 'Spender', yo: 'Olùsanwó' },
    roleWatcherD: { en: 'Sees your balance and activity. Gets alerts.', pcm: 'E go see your balance and wetin you do. E go dey get alert.', yo: 'Ó máa rí iye owó rẹ àti ohun tí o ṣe.' },
    roleApproverD: { en: 'Approves or declines big or unusual transfers.', pcm: 'E go approve or reject big or strange transfer.', yo: 'Ó máa fọwọ́sí tàbí kọ owó ńlá tàbí àjèjì.' },
    roleSpenderD: { en: 'Can pay for you, up to a monthly limit.', pcm: 'E fit pay for you, but no pass the monthly limit.', yo: 'Ó lè sanwó fún ọ, títí dé ààlà oṣù kan.' },
    stInvited: { en: 'Waiting to accept', pcm: 'Never accept', yo: 'Kò tíì gbà' }, stActive: { en: 'Active', pcm: 'Active', yo: 'Ó ń ṣiṣẹ́' },
    approveOver: { en: 'Ask approval from', pcm: 'Ask approval from', yo: 'Béèrè ìfọwọ́sí láti' },
    approveOverD: { en: 'Also for ₦5,000+ to someone new', pcm: 'Plus ₦5,000+ to new person', yo: 'Àti ₦5,000+ sí ẹni tuntun' },
    whoChecked: { en: 'Who checked my account', pcm: 'Who check my account', yo: 'Ta ló wo àkáǹtì mi' },
    noChecks: { en: 'Nobody this week', pcm: 'Nobody this week', yo: 'Kò sí ẹnikẹ́ni lọ́sẹ̀ yìí' },
    logView: { en: '{n} checked your account', yo: '{n} wo àkáǹtì rẹ' }, logApproved: { en: '{n} approved a transfer', yo: '{n} fọwọ́sí owó kan' }, logDeclined: { en: '{n} declined a transfer', yo: '{n} kọ owó kan' },
    demoModeT: { en: 'Demo mode', yo: 'Ìdánwò' },
    demoBanner: { en: 'No link will be made yet: the helper will appear on this phone instead. To invite a real person on their own phone, add the free Upstash Redis database in Vercel and redeploy.', pcm: 'No link go show for now: the helper go appear for this phone. To invite real person for their own phone, add the free Upstash Redis database for Vercel and redeploy.', yo: 'Kò ní sí ìjápọ̀ síbẹ̀: olùrànlọ́wọ́ náà yóò hàn lórí fóònù yìí. Láti pe ẹni gidi lórí fóònù tiwọn, fi database Upstash Redis ọ̀fẹ́ kún Vercel kí o sì tún gbé e jáde.' },
    circleDemo: { en: 'Approvals show on this phone. Add the free database in Vercel to use a real second phone.', pcm: 'Approval go show for this phone. Add the free database for Vercel to use another phone.', yo: 'Ìfọwọ́sí máa hàn lórí fóònù yìí. Fi database ọ̀fẹ́ kún un ní Vercel láti lo fóònù kejì.' },
    helperName: { en: "Helper's name", pcm: 'Helper name', yo: 'Orúkọ olùrànlọ́wọ́' },
    helperPhone: { en: "Helper's phone (optional, to text them the link)", pcm: 'Helper phone number (optional, to SMS dem the link)', yo: 'Nọ́ńbà fóònù olùrànlọ́wọ́ (tí o bá fẹ́)' },
    yourName: { en: 'Your name (what they will see)', pcm: 'Your name (wetin dem go see)', yo: 'Orúkọ rẹ (ohun tí wọ́n máa rí)' },
    monthlyLimit: { en: 'Monthly limit', pcm: 'Monthly limit', yo: 'Ààlà oṣù' },
    whatCanTheyDo: { en: 'What can they do?', pcm: 'Wetin dem fit do?', yo: 'Kí ni wọ́n lè ṣe?' },
    neverT: { en: 'Helpers can never', pcm: 'Helpers no fit', yo: 'Àwọn olùrànlọ́wọ́ kò lè' },
    neverB: { en: 'Change your secret phrase, Voice ID or helpers. You hear about everything they do.', pcm: 'Change your secret phrase, Voice ID or helpers. You go hear everything wey dem do.', yo: 'Yí ọ̀rọ̀ àṣírí, Voice ID tàbí àwọn olùrànlọ́wọ́ rẹ padà. Wàá gbọ́ gbogbo ohun tí wọ́n bá ṣe.' },
    createLink: { en: 'Create helper link', pcm: 'Make helper link', yo: 'Ṣe ìlànà olùrànlọ́wọ́' },
    needName: { en: "Please enter the helper's name.", pcm: 'Abeg put the helper name.', yo: 'Jọ̀ọ́ kọ orúkọ olùrànlọ́wọ́.' },
    helperErr: { en: 'Could not create the link. Check your internet and try again.', pcm: 'I no fit make the link. Check your network, try again.', yo: 'Mi ò lè ṣe ìlànà náà. Ṣàyẹ̀wò íńtánẹ́ẹ̀tì rẹ.' },
    helperLinkT: { en: "{n}'s helper link", yo: 'Ìlànà {n}' },
    linkInfo: { en: 'Send this link to {n}. They open it on their phone and tap Accept. Only share it with {n}.', pcm: 'Send this link give {n}. Dem go open am for their phone, press Accept. Na only {n} you go give am.', yo: 'Fi ìlànà yìí ránṣẹ́ sí {n}. Wọ́n máa ṣí i lórí fóònù wọn, wọ́n á sì tẹ Accept. {n} nìkan ni kí o fi ránṣẹ́ sí.' },
    shareMsg: { en: '{me} added you as a trusted helper on Vosa. Open this link to accept: {link}' },
    someone: { en: 'Someone' },
    smsSent: { en: 'We also sent it to {n} by SMS.', pcm: 'We don SMS am give {n} too.', yo: 'A tún fi SMS ránṣẹ́ sí {n}.' },
    shareLink: { en: 'Share link', pcm: 'Share link', yo: 'Pín ìlànà' }, whatsapp: { en: 'Send on WhatsApp', pcm: 'Send am for WhatsApp', yo: 'Fi ránṣẹ́ lórí WhatsApp' },
    copyLink: { en: 'Copy link', yo: 'Da ìlànà kọ' }, copied: { en: 'Copied', yo: 'A ti dà á kọ' },
    removeQ: { en: 'Remove {n}?', pcm: 'Remove {n}?', yo: 'Yọ {n} kúrò?' },
    removeB: { en: "They won't be able to see or approve anything any more.", pcm: 'Dem no go fit see or approve anything again.', yo: 'Wọn kò ní lè rí tàbí fọwọ́sí ohunkóhun mọ́.' },
    maxHelpers: { en: 'You can have up to 3 helpers', yo: 'O lè ní olùrànlọ́wọ́ mẹ́ta' },
    waitingFor: { en: 'Waiting for {n}', pcm: 'We dey wait for {n}', yo: 'A ń dúró de {n}' },
    waitBodyT: { en: 'Asked for approval', pcm: 'We don ask for approval', yo: 'A ti béèrè ìfọwọ́sí' },
    waitBody: { en: '{n} can approve or decline it on their phone. The money has not moved.', pcm: '{n} fit approve or reject am for their phone. The money never move.', yo: '{n} lè fọwọ́sí tàbí kọ̀ ọ́ lórí fóònù wọn. Owó náà kò tíì lọ.' },
    cancelTransfer: { en: 'Cancel transfer', pcm: 'Cancel the transfer', yo: 'Fagilé owó náà' },
    demoPhone: { en: "{n}'s phone (demo)", yo: 'Fóònù {n} (ìdánwò)' },
    demoAsk: { en: 'Approve {a} to {to}?', pcm: 'Approve {a} to {to}?', yo: 'Fọwọ́sí {a} sí {to}?' },
    offlineDemo: { en: "Couldn't reach the server, so this is shown here instead.", yo: 'Kò sí ìsopọ̀, nítorí náà ó hàn níbí.' },
    approve: { en: 'Approve', pcm: 'Approve', yo: 'Fọwọ́sí' }, decline: { en: 'Decline', pcm: 'Reject', yo: 'Kọ̀ ọ́' },
    newRecipient: { en: 'New recipient', pcm: 'New person', yo: 'Ẹni tuntun' },
    approvedBy: { en: 'Approved by {n}', pcm: '{n} approve am', yo: '{n} fọwọ́sí i' },
    sendTo: { en: 'To', pcm: 'To', yo: 'Sí' }, and: { en: 'and', pcm: 'and', yo: 'àti' }, month: { en: 'month', yo: 'oṣù' },
    didSend: { en: '{amt} was sent to {n}', pcm: '{amt} don go {n}', yo: 'a fi {amt} ránṣẹ́ sí {n}' },
    didSave: { en: '{amt} was saved to {g}', pcm: '{amt} don enter {g}', yo: 'a fi {amt} pamọ́ sínú {g}' },
    didWithdraw: { en: '{amt} was moved from {g}', pcm: '{amt} don comot from {g}', yo: 'a yọ {amt} láti inú {g}' },
    didAirtime: { en: '{amt} airtime was bought', pcm: '{amt} card don enter', yo: 'a ra káàdì ìpè {amt}' },
    link: { en: 'Link', pcm: 'Connect', yo: 'So pọ̀' }, unlink: { en: 'Unlink', pcm: 'Disconnect', yo: 'Yọ ọ́' },
    needsDb: { en: 'Needs the free database in Vercel', pcm: 'E need the free database for Vercel', yo: 'Ó nílò database ọ̀fẹ́ ní Vercel' },
    helperFormGo: { en: "Okay. Choose what {n} can do, then tap Create helper link.", pcm: 'Okay. Choose wetin {n} fit do, then press Make helper link.', yo: 'Ó dáa. Yan ohun tí {n} lè ṣe, lẹ́yìn náà tẹ Ṣe ìlànà olùrànlọ́wọ́.' },
    yourHelper: { en: 'your helper', pcm: 'your helper', yo: 'olùrànlọ́wọ́ rẹ' },
    whichHelper: { en: 'Which helper? Say: remove, then their name.', pcm: 'Which helper? Talk: remove, then the name.', yo: 'Olùrànlọ́wọ́ wo? Sọ pé: remove, lẹ́yìn náà orúkọ wọn.' },
    kVoiceNeeded: { en: 'Voice ID needed', pcm: 'Voice ID dey needed', yo: 'Voice ID pọndandan' },
    requireVoice: { en: 'Require Voice ID to move money', pcm: 'Make Voice ID compulsory to move money', yo: 'Voice ID pọndandan láti gbé owó' },
    requireVoiceDesc: { en: 'Turn off only for testing', pcm: 'Off am only when you dey test', yo: 'Pa á nìkan fún ìdánwò' },
    setUpVoice: { en: 'Add Voice ID', pcm: 'Add Voice ID', yo: 'Fi Voice ID kún un' },
    voiceMatch: { en: 'voice match {p}%', yo: 'ìbámu ohùn {p}%' },
    phraseNumsPh: { en: 'Phrase and numbers', pcm: 'Phrase and numbers', yo: 'Ọ̀rọ̀ àṣírí àti nọ́ńbà' },
    speakNow: { en: 'Speak now', pcm: 'Talk now', yo: 'Sọ̀rọ̀ báyìí' },
    verifiedBy: { en: 'Verified with', pcm: 'Checked with', yo: 'A fi ṣàyẹ̀wò' },
    verifyAll: { en: 'Phrase, numbers, voice ({p}%)', yo: 'Ọ̀rọ̀, nọ́ńbà, ohùn ({p}%)' },
    verifyNoVoice: { en: 'Phrase and numbers', yo: 'Ọ̀rọ̀ àti nọ́ńbà' },
    verifyFp: { en: 'Fingerprint (demo)', yo: 'Ìka (àpẹẹrẹ)' },
    welcomeH: { en: 'Welcome to Vosa', pcm: 'Welcome to Vosa', yo: 'Ẹ kú àbọ̀ sí Vosa' }
  };
  const EXAMPLES = {
    en: ['Save 5,000 for rent', 'Send 5k to Tunde', 'How much do I have?', 'Buy 1,000 MTN airtime', 'Save 10% of any money I receive', 'I want to save 200k for school fees by January', 'Withdraw 3,000 from rent', 'What is a money market fund?'],
    pcm: ['Abeg keep 2k for my house rent', 'Send 3k give Mama', 'How much I get?', 'Buy 500 Airtel card', 'Anytime money enter, save 10%', 'I wan gather 500k for japa before December', 'Comot 2k from my house rent', 'Wetin be inflation?'],
    ha: ['Ajiye dubu biyar don kuɗin haya', 'Aika dubu biyar ga Tunde', 'Kuɗi nawa nake da shi?', 'Sayi katin MTN na dubu ɗaya', 'Ina son ajiye dubu ɗari biyu don kuɗin makaranta kafin Janairu', 'Cire dubu uku daga haya'],
    ig: ['Chekwaa puku ise maka ụgwọ ụlọ', 'Zipu puku ise nye Tunde', 'Ego ole ka m nwere?', 'Zụta kaadị MTN puku', 'Achọrọ m ichekwa puku narị abụọ maka ụgwọ akwụkwọ tupu Jenụwarị', 'Wepụ puku atọ na ụgwọ ụlọ'],
    yo: ['Fi ẹgbẹ̀rún márùn-ún pamọ́ fún owó ilé', 'Èló ló wà nínú àpò mi?', 'Fi ẹgbẹ̀rún méjì ránṣẹ́ sí Mama', 'Ra káàdì ìpè MTN ẹgbẹ̀rún kan', 'Mo fẹ́ fi ẹgbẹ̀rún lọ́nà igba pamọ́ fún owó ilé-ìwé kí ó tó di January', 'Yọ ẹgbẹ̀rún méjì kúrò nínú owó ilé', 'Kí ni èlé?']
  };
  // Hausa and Igbo for the main screens. Anything not listed falls back to English. First version: needs a fluent speaker's review.
  const T_HA_IG = {
    greetM: { ha: 'Barka da safiya, {n}.', ig: 'Ụtụtụ ọma, {n}.' }, greetA: { ha: 'Barka da rana, {n}.', ig: 'Ehihie ọma, {n}.' }, greetE: { ha: 'Barka da yamma, {n}.', ig: 'Mgbede ọma, {n}.' },
    hi: { ha: 'Sannu, {n}', ig: 'Ndewo, {n}' }, tHome: { ha: 'Gida', ig: 'Ụlọ' }, tPots: { ha: 'Ajiya', ig: 'Nchekwa' }, tAct: { ha: 'Ayyuka', ig: 'Omume' }, tSet: { ha: 'Saituna', ig: 'Ntọala' },
    gM: { ha: 'Barka da safiya', ig: 'Ụtụtụ ọma' }, gA: { ha: 'Barka da rana', ig: 'Ehihie ọma' }, gE: { ha: 'Barka da yamma', ig: 'Mgbede ọma' },
    walletBalLbl: { ha: 'Kuɗin walat', ig: 'Ego akpa' }, walletBal: { ha: 'Kuɗin walat', ig: 'Ego akpa' }, savedStrip: { ha: 'An ajiye', ig: 'Echekwara' }, total: { ha: 'Jimillar ajiya', ig: 'Mkpokọta nchekwa' },
    qSave: { ha: 'Ajiye', ig: 'Chekwaa' }, qSend: { ha: 'Aika', ig: 'Zipu' }, qWithdraw: { ha: 'Cire', ig: 'Wepụ' }, qMore: { ha: 'Ƙari', ig: 'Ọzọ' }, qAirtime: { ha: 'Kati', ig: 'Kaadị' }, qGoal: { ha: 'Sabon buri', ig: 'Ebumnuche ọhụrụ' }, qHelpers: { ha: 'Mataimaka', ig: 'Ndị enyemaka' },
    bannerT: { ha: 'Kawai ka yi magana. Vosa zai yi sauran.', ig: 'Naanị kwuo okwu. Vosa ga-eme ndị ọzọ.' }, bannerS: { ha: 'Ka ce “{ex}”', ig: 'Sị “{ex}”' }, tapTalk: { ha: 'Taɓa ka yi magana', ig: 'Pịa ka ị kwuo' }, hfOn: { ha: 'Hands-free yana kunne', ig: 'Hands-free dị' },
    quick: { ha: 'Hanyoyi masu sauri', ig: 'Ụzọ ngwa ngwa' }, yourSavings: { ha: 'Ajiyarka', ig: 'Nchekwa gị' }, seeAll2: { ha: 'Duba duka', ig: 'Lee ha niile' }, txHistory: { ha: 'Tarihin kuɗi', ig: 'Akụkọ ego' }, explore: { ha: 'Bincika', ig: 'Nyochaa' },
    pots: { ha: 'Asusun ajiya', ig: 'Akpa nchekwa' }, newGoal: { ha: 'Sabon burin ajiya', ig: 'Ebumnuche nchekwa ọhụrụ' }, activity: { ha: 'Ayyuka', ig: 'Ihe omume' }, today: { ha: 'Yau', ig: 'Taa' }, earlier: { ha: 'A baya', ig: 'Na mbụ' },
    settings: { ha: 'Saituna', ig: 'Ntọala' }, language: { ha: 'Harshe', ig: 'Asụsụ' }, voiceSpeed: { ha: 'Saurin murya', ig: 'Ọsọ olu' }, slow: { ha: 'A hankali', ig: 'Nwayọọ' }, normal: { ha: 'Daidai', ig: 'Nkịtị' }, fast: { ha: 'Da sauri', ig: 'Ngwa ngwa' },
    handsFree: { ha: 'Hands-free', ig: 'Hands-free' }, sound: { ha: 'Amsoshi da murya', ig: 'Azịza n’olu' }, secret: { ha: 'Kalmar sirri', ig: 'Okwu nzuzo' }, gVoice: { ha: 'Murya da harshe', ig: 'Olu na asụsụ' },
    listening: { ha: 'Ina saurara…', ig: 'Ana m ege ntị…' }, working: { ha: 'Ina aiki a kai…', ig: 'Ana m arụ ya…' }, youSaying: { ha: 'Kana cewa', ig: 'Ị na-ekwu' }, cancel: { ha: 'Soke', ig: 'Kagbuo' }, ok: { ha: 'To', ig: 'Ọ dị mma' }, tryAgain: { ha: 'Sake gwadawa', ig: 'Nwaa ọzọ' }, typeInstead: { ha: 'Rubuta maimakon', ig: 'Dee ya kama' },
    yesSave: { ha: 'Eh, ajiye {a}', ig: 'Ee, chekwaa {a}' }, yesBuy: { ha: 'Eh, sayi {a}', ig: 'Ee, zụta {a}' }, yesCreate: { ha: 'Eh, ƙirƙiri buri', ig: 'Ee, mepụta ebumnuche' }, noCancel: { ha: 'A’a, soke', ig: 'Mba, kagbuo' },
    sayPhrase: { ha: 'Faɗi kalmar sirrinka', ig: 'Kwuo okwu nzuzo gị' }, confirmT: { ha: 'Tabbatar', ig: 'Kwado' }, savedTo: { ha: 'An ajiye a {g}', ig: 'Echekwara na {g}' }, sentTo: { ha: 'An aika ga {n}', ig: 'Ezipụrụ {n}' }, moved: { ha: 'An mayar zuwa walat ɗinka', ig: 'Ebugharịrị gaa n’akpa ego gị' }, goalSet: { ha: 'An ƙirƙiri buri', ig: 'Emepụtara ebumnuche' },
    welcomeH: { ha: 'Barka da zuwa Vosa', ig: 'Nnọọ na Vosa' }, welcomeT: { ha: 'Idan za ka iya magana, za ka iya ajiya.', ig: 'Ọ bụrụ na ị nwere ike ikwu okwu, ị nwere ike ichekwa ego.' }, cont: { ha: 'Ci gaba', ig: 'Gaa n’ihu' },
    chooseLang: { ha: 'Sannu, ni ce Vosa. Wane harshe kake so? Taɓa ko ka faɗi Turanci, Pidgin, Yarbanci, Hausa ko Igbo.', ig: 'Ndewo, abụ m Vosa. Asụsụ ole ka ị chọrọ? Pịa ma ọ bụ kwuo Bekee, Pidgin, Yoruba, Hausa ma ọ bụ Igbo.' },
    kDidnt: { ha: 'Ban gane ba', ig: 'Aghọtaghị m' }, switched: { ha: 'An koma Hausa', ig: 'Agbanweela gaa Igbo' }, langName: { ha: 'HA', ig: 'IG' },
    promiseT: { ha: 'Alƙawarin Murya', ig: 'Nkwa Olu' }, promiseQ: { ha: 'Gaggawa ce?', ig: 'Ọ bụ ihe mberede?' }, yesEmergency: { ha: 'Eh, gaggawa ce', ig: 'Ee, ọ bụ mberede' }, noKeep: { ha: 'A’a, a bar shi', ig: 'Mba, debe ya' },
    approve: { ha: 'Amince', ig: 'Kwado' }, decline: { ha: 'Ƙi', ig: 'Jụ' }, recipient: { ha: 'Mai karɓa', ig: 'Onye nnata' }, amount: { ha: 'Adadi', ig: 'Ego ole' }
  };
  for (const k in T_HA_IG) if (T[k]) Object.assign(T[k], T_HA_IG[k]);
  const t = (k, vars) => { const e = T[k]; const s = e ? (e[state.lang] || e.en) : k; return vars ? L.fill(s, vars) : s; };
  const R = (key, vars) => L.say(key, state.lang, vars);

  // ---------- state ----------
  const KEY = 'vosa-demo-v4';
  function seed() {
    const now = Date.now();
    return {
      lang: 'en', muted: false, handsFree: false, onboarded: false, hideBal: false, view: 'home', speed: 1, textScale: 1,
      voiceEngine: 'spitch', voices: {},
      wallet: 35000, account: '9012345678', myPhone: '08031234412', myNetwork: 'MTN',
      secret: 'blue mango', autoSave: null, voicePrint: null, voicePrintV: 2, voiceStrict: 0.5, requireVoice: true,
      ownerId: null, myName: 'Ade Bello', helpers: [], approveOver: 20000, circleLog: [], seenEvents: [],
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
        { kind: 'save', g: { key: 'rent', name: null }, amt: 5000, at: now - 2 * 864e5, sub: 'voice' },
        { kind: 'airtime', n: 'MTN', amt: 1000, detail: '0803 ••• 1234', at: now - 3 * 864e5 },
        { kind: 'send', n: 'Mama', amt: 10000, detail: 'OPay •••• 7788', at: now - 4 * 864e5 },
        { kind: 'in', n: 'Kemi Adewale', amt: 50000, at: now - 5 * 864e5 },
        { kind: 'save', g: { key: 'school', name: null }, amt: 20000, at: now - 5 * 864e5, sub: 'auto' },
        { kind: 'send', n: 'Tunde', amt: 5000, detail: 'GTBank •••• 4521', at: now - 9 * 864e5 }
      ]
    };
  }
  let state = seed();
  try { const s = JSON.parse(localStorage.getItem(KEY) || 'null'); if (s && s.goals) state = Object.assign(seed(), s); } catch (e) {}
  // Older demo versions stored a Picovoice profile; the new engine needs a fresh voiceprint.
  if ('voiceProfile' in state) delete state.voiceProfile;
  // Voiceprints from the first open-source model (v1) don't work with the new one: ask for a fresh setup
  if (state.voicePrint && state.voicePrintV !== 2) { state.voicePrint = null; state.voiceStrict = 0.5; }
  if (![0.4, 0.5, 0.6].includes(state.voiceStrict)) state.voiceStrict = 0.5;
  // A private id for this account on the server (Trusted Circle). Never shown to anyone.
  if (!state.ownerId) state.ownerId = Array.from(crypto.getRandomValues(new Uint8Array(24))).map(b => b.toString(16).padStart(2, '0')).join('');
  if (!Array.isArray(state.helpers)) state.helpers = [];
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} try { scheduleSync(); } catch (e) {} };

  let pending = null;   // {type, needsPhrase, tries, ...}
  let awaiting = null;  // {slot, r}
  let ov = null;        // {kind, data}
  let lastHeard = '', lastVia = '';
  let lastReply = '';
  let lastReplyLang = 'en';
  let flashGoal = null;
  let typing = false;

  const label = (g, lang) => g.name || (L.GOALS[g.key][lang || state.lang] || L.GOALS[g.key].en);
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
    rent: ['#E8F6E5', '#1F9D55', 'home'], school: ['#E8EFFD', '#1F4FBF', 'book'], business: ['#FFF4E0', '#8A5200', 'bag'],
    emergency: ['#FDEEEC', '#B42318', 'shield'], travel: ['#EEEFFD', '#4338CA', 'plane'], phone: ['#F1F3F2', '#3F4D45', 'phone'],
    wedding: ['#FCEEF5', '#A3245F', 'heart'], christmas: ['#E8F6E5', '#1F9D55', 'gift'], car: ['#F1F3F2', '#3F4D45', 'car'],
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
    s.innerHTML = '<svg width="' + size + '" height="' + size + '" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="' + (dark ? '#FFFFFF' : '#CC4A0A') + '"/><g stroke="' + (dark ? '#CC4A0A' : '#FFFFFF') + '" stroke-width="2.6" stroke-linecap="round"><path d="M10 13v6"/><path d="M16 9v14"/><path d="M22 12v8"/></g></svg>';
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
    const first = (state.myName || 'Ade').split(' ')[0];
    const initials = (state.myName || 'Ade').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    const hidden = state.hideBal;
    const langLabel = { en: 'English', pcm: 'Pidgin', yo: 'Yorùbá', ha: 'Hausa', ig: 'Igbo' }[state.lang];

    // 1. Header + balance + main actions (one white card, like a bank app's top panel)
    const copyBtn = h('button', { class: 'copy', type: 'button', 'aria-label': t('copyAcct'), onClick: async (e) => {
      try { await navigator.clipboard.writeText(state.account); } catch (err) {}
      const b = e.currentTarget; b.textContent = ''; b.append(icon('check', 16, 2.4)); announce(t('copied'));
      setTimeout(() => { b.textContent = ''; b.append(icon('copy', 16)); }, 1500);
    } }, icon('copy', 16));
    const act = (ic, k, fn) => h('button', { class: 'act', type: 'button', onClick: fn }, h('span', { class: 'ring' }, icon(ic, 22)), t(k));
    v.append(h('section', { class: 'card top' },
      h('div', { class: 'hd' },
        h('div', { class: 'hd-left' }, h('span', { class: 'avatar', 'aria-hidden': 'true' }, h('span', { text: initials })),
          h('div', { style: 'min-width:0' }, h('p', { class: 'hi', text: t('hi', { n: first }) }), h('p', { class: 'hi-sub', text: t(hr < 12 ? 'gM' : hr < 17 ? 'gA' : 'gE') }))),
        h('button', { class: 'pillbtn', type: 'button', 'aria-label': t('language') + ': ' + langLabel, onClick: cycleLang }, icon('globe', 16), langLabel, icon('down', 16))),
      h('span', { class: 'bal-lbl2', text: t('walletBalLbl') }),
      h('div', { class: 'bal-line' },
        h('span', { class: 'bal-amt2 num' }, hidden ? '*****' : amtWithKobo(state.wallet)),
        h('button', { class: 'eye2', type: 'button', 'aria-label': hidden ? t('showBal') : t('hideBal'), onClick: () => { state.hideBal = !state.hideBal; persist(); render(); } }, icon(hidden ? 'eyeoff' : 'eye', 20))),
      h('div', { class: 'acct-line' }, h('span', { class: 'num', text: state.account }), h('span', { class: 'acct-bank', text: 'Vosa' }), copyBtn),
      h('button', { class: 'saved-strip', type: 'button', onClick: () => go('pots') },
        icon('pot', 18), h('span', { text: t('savedStrip') }), h('b', { class: 'num', text: hidden ? '*****' : naira(total()) }),
        state.autoSave ? h('span', { class: 'tag', text: t('autoSave') + ' ' + state.autoSave.pct + '%' }) : null,
        h('span', { class: 'chev' }, icon('chev', 16))),
      h('div', { class: 'acts' },
        act('send', 'qSend', () => showOv('send-form', { c: 0, amount: 5000 })),
        act('potplus', 'qSave', () => showOv('pick', { mode: 'save', ref: null, amount: 5000 })),
        act('out', 'qWithdraw', () => showOv('pick', { mode: 'withdraw', ref: null, amount: 2000 })),
        act('dots', 'qMore', () => showOv('more')))));

    // 2. Voice banner (the "promo" slot)
    v.append(h('section', { class: 'banner', 'aria-label': t('voiceT') },
      h('div', { class: 'banner-txt' },
        h('h2', { text: t('bannerT') }),
        h('p', { text: t('bannerS', { ex: EXAMPLES[state.lang][1] || EXAMPLES[state.lang][0] }) }),
        h('div', { class: 'banner-btns' },
          h('button', { class: 'bpill', type: 'button', onClick: () => { micDenied = false; startListening(); } }, icon('mic', 16), t('tapTalk')),
          h('button', { class: 'bpill' + (state.handsFree ? ' on' : ''), type: 'button', 'aria-pressed': String(state.handsFree), onClick: toggleHF }, icon('wave', 16), state.handsFree ? t('hfOn') : t('handsFree')))),
      h('div', { class: 'banner-art', 'aria-hidden': 'true' }, [18, 34, 52, 30, 60, 42, 24].map(x => h('i', { style: 'height:' + x + 'px' })))));

    // 3. Quick access
    const qa = (ic, k, fn) => h('button', { class: 'qtile', type: 'button', onClick: fn }, h('span', { class: 'qi' }, icon(ic, 20)), t(k));
    v.append(h('section', { class: 'card' }, h('h2', { class: 'card-t', text: t('quick') }),
      h('div', { class: 'qgrid' },
        qa('phone', 'qAirtime', () => showOv('airtime-form', { net: state.myNetwork, amount: 1000, other: false, phone: '' })),
        qa('target', 'qGoal', () => showOv('goal-form', { key: 'school', amount: 200000, month: 3 })),
        qa('shield', 'qHelpers', () => (state.helpers || []).length ? go('settings') : showOv('helper-form', {})))));

    // 4. Savings (Vosa is savings-first)
    v.append(h('section', { class: 'card', 'aria-labelledby': 'h-sav' },
      h('div', { class: 'sec-h' }, h('h2', { class: 'card-t', id: 'h-sav', text: t('yourSavings') }), h('button', { class: 'more', type: 'button', onClick: () => go('pots'), text: t('seeAll2') })),
      h('div', null, state.goals.slice(0, 3).map(g => potRow(g, false)))));

    // 5. Transaction history
    const last = state.activity[0];
    v.append(h('button', { class: 'card rowcard', type: 'button', onClick: () => go('activity') },
      h('span', { class: 'qi' }, icon('receipt', 20)),
      h('span', { class: 'rc-mid' }, h('b', { text: t('txHistory') }), last ? h('span', { text: actRow(last).querySelector('.mid b').textContent + ' · ' + naira(last.amt) }) : null),
      h('span', { class: 'chev' }, icon('chev', 18))));

    // 6. Explore
    const ex = (ic, tk, sk, tone, fn) => h('button', { class: 'excard ' + tone, type: 'button', onClick: fn }, h('span', { class: 'qi' }, icon(ic, 20)), h('b', { text: t(tk) }), h('span', { text: t(sk) }));
    v.append(h('section', { class: 'card', style: 'padding-right:0' }, h('h2', { class: 'card-t', text: t('explore') }),
      h('div', { class: 'exrow' },
        ex('shield', 'exCircleT', 'exCircleS', 't1', () => showOv('helper-form', {})),
        ex('spark', 'exMmfT', 'exMmfS', 't3', () => { handle(L.EXPLAIN.mmf ? 'what is a money market fund' : 'help', { via: 'text' }); }),
        ex('in', 'exAutoT', 'exAutoS', 't4', () => handle('save 10% of any money I receive', { via: 'text' })))));
  }

  function ovMore(el) {
    const row = (ic, label, fn) => h('button', { class: 'ex', type: 'button', onClick: () => { closeOv(); fn(); } }, h('span', { class: 'ei' }, icon(ic, 20)), label);
    sheetWrap(el, [sheetHead(t('moreT')),
      h('div', null,
        row('phone', t('qAirtime'), () => showOv('airtime-form', { net: state.myNetwork, amount: 1000, other: false, phone: '' })),
        row('target', t('qGoal'), () => showOv('goal-form', { key: 'school', amount: 200000, month: 3 })),
        row('wallet', t('mAcct'), () => handle('what is my account number', { via: 'text' })),
        row('shield', t('gCircle'), () => go('settings')),
        row('in', t('mMoneyIn'), () => incoming(50000, 'Kemi Adewale')))]);
  }

  function renderPots() {
    const v = $('v-pots'); v.textContent = '';
    v.append(pageHead(t('tPots'), h('button', { class: 'iconbtn', type: 'button', onClick: () => showOv('goal-form', { key: 'school', amount: 200000, month: 3 }) }, icon('plus', 18), t('newShort'))));
    const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
    const savedMonth = state.activity.filter(a => a.kind === 'save' && a.at >= +monthStart).reduce((s, a) => s + a.amt, 0);
    v.append(h('div', { class: 'summary' },
      h('div', null, h('span', { text: t('total') }), h('b', { class: 'num', text: naira(total()) })),
      h('div', null, h('span', { text: t('savedMonth') }), h('b', { class: 'num', text: naira(savedMonth) }))));
    v.append(h('section', { class: 'card' }, state.goals.map(g => potRow(g, true))));
    v.append(h('p', { class: 'empty', style: 'text-align:center', text: t('orSayGoal') }));
  }

  function actRow(a) {
    const g = a.g ? (findRef(a.g) || a.g) : null;
    const gl = g ? (g.name || (L.GOALS[g.key] || L.GOALS.flex)[state.lang] || (L.GOALS[g.key] || L.GOALS.flex).en) : '';
    let title, kind, tileIc, tileStyle = ['#F1F3F2', '#3F4D45'];
    if (a.kind === 'in') { title = t('actIn', { n: a.n }); kind = 'in'; tileIc = 'in'; tileStyle = ['#E8F6E5', '#1F9D55']; }
    else if (a.kind === 'send') { title = t('actSent', { n: a.n }); kind = 'out'; tileIc = 'send'; }
    else if (a.kind === 'airtime') { title = t('actAirtime', { n: a.n }); kind = 'out'; tileIc = 'phone'; }
    else if (a.kind === 'move') { title = t('actMoved', { g: gl }); kind = 'in'; tileIc = 'out'; tileStyle = ['#E8F6E5', '#1F9D55']; }
    else { title = t(a.sub === 'auto' ? 'actAuto' : 'actSaved', { g: gl }); kind = 'saved'; tileIc = 'potplus'; tileStyle = ['#E8F6E5', '#1F9D55']; }
    const d = new Date(a.at);
    const time = d.toLocaleDateString([], { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const sign = kind === 'in' ? '+' : kind === 'out' ? '−' : '';
    const tile = h('span', { class: 'gtile', style: 'background:' + tileStyle[0] + ';color:' + tileStyle[1], 'aria-hidden': 'true' }, icon(tileIc, 20));
    return h('div', { class: 'row' }, tile,
      h('div', { class: 'mid' }, h('b', { text: title }), h('span', { text: [time, a.detail, a.by ? t('byHelper', { n: a.by }) : null].filter(Boolean).join(' · ') })),
      h('div', { class: 'end' }, h('b', { class: 'num' + (kind === 'in' ? ' in' : ''), text: sign + naira(a.amt) }), h('span', { text: { in: t('lIn'), out: t('lOut'), saved: t('lSaved') }[kind] })));
  }

  function renderActivity() {
    const v = $('v-activity'); v.textContent = '';
    v.append(pageHead(t('activity')));
    const weekAgo = Date.now() - 7 * 864e5;
    const inW = state.activity.filter(a => a.at >= weekAgo && (a.kind === 'in')).reduce((s, a) => s + a.amt, 0);
    const outW = state.activity.filter(a => a.at >= weekAgo && (a.kind === 'send' || a.kind === 'airtime')).reduce((s, a) => s + a.amt, 0);
    v.append(h('div', { class: 'summary' },
      h('div', null, h('span', { text: t('inWeek') }), h('b', { class: 'num', style: 'color:#15803D', text: '+' + naira(inW) })),
      h('div', null, h('span', { text: t('outWeek') }), h('b', { class: 'num', text: '−' + naira(outW) }))));
    if (!state.activity.length) { v.append(h('p', { class: 'empty', text: t('noActivity') })); return; }
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const a1 = state.activity.filter(a => a.at >= +today), a2 = state.activity.filter(a => a.at < +today);
    if (a1.length) { v.append(h('section', { class: 'card' }, h('h2', { class: 'card-t', text: t('today') }), h('div', null, a1.map(actRow)))); }
    if (a2.length) { v.append(h('section', { class: 'card' }, h('h2', { class: 'card-t', text: t('earlier') }), h('div', null, a2.map(actRow)))); }
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
      row(t('language'), null, seg(t('language'), [['en', 'EN'], ['pcm', 'PCM'], ['yo', 'YO'], ['ha', 'HA'], ['ig', 'IG']], state.lang, (l) => setLang(l))),
      backend.ok ? row(t('voiceLbl'), t('voiceD'), seg(t('voiceLbl'), [['spitch', 'Spitch'], ['phone', t('hearPhone')]], state.voiceEngine === 'phone' ? 'phone' : 'spitch', (v) => { state.voiceEngine = v; persist(); render(); })) : null,
      backend.ok && state.voiceEngine !== 'phone' && backend.voices && backend.voices[state.lang] ? voicePicker(row) : null,
      row(t('voiceSpeed'), null, seg(t('voiceSpeed'), [[0.85, t('slow')], [1, t('normal')], [1.15, t('fast')]], state.speed, (s) => { state.speed = s; persist(); render(); })),
      row(t('handsFree'), t('hfDesc'), sw(state.handsFree, toggleHF, t('handsFree'))),
      row(t('sound'), t('soundDesc'), sw(!state.muted, () => { state.muted = !state.muted; if (state.muted) stopSpeaking(); persist(); render(); }, t('sound')))));
    v.append(h('h2', { class: 'group-t', text: t('gSecurity') }), h('div', { class: 'group', style: 'margin-top:0' },
      row(t('secret'), t('secretDesc', { p: state.secret }), null),
      row(t('vidTitle'), !backend.voiceId ? t('vidNeedsKey') : state.voicePrint ? t('vidOn') : t('vidOff'),
        backend.voiceId ? h('button', { class: 'link', type: 'button', text: state.voicePrint ? t('redo') : t('setUp'), onClick: () => showOv('enroll', { stage: 'intro' }) }) : null),
      backend.voiceId ? row(t('requireVoice'), t('requireVoiceDesc'), sw(state.requireVoice !== false, () => { state.requireVoice = state.requireVoice === false; persist(); render(); }, t('requireVoice'))) : null,
      voiceIdOn() ? row(t('strictness'), t('strictDesc'), seg(t('strictness'), [[0.4, t('relaxed')], [0.5, t('normal')], [0.6, t('strict')]], state.voiceStrict, (v) => { state.voiceStrict = v; persist(); render(); })) : null,
      voiceIdOn() ? row(t('removeVoice'), null, h('button', { class: 'link', type: 'button', style: 'color:var(--danger)', text: t('remove'), onClick: () => { state.voicePrint = null; persist(); render(); } })) : null));
    v.append(h('h2', { class: 'group-t', text: t('gCircle') }), settingsCircle(row));
    v.append(h('h2', { class: 'group-t', text: t('gAccess') }), h('div', { class: 'group', style: 'margin-top:0' },
      row(t('textSize'), null, seg(t('textSize'), [[0.9, 'A', 'font-size:12px'], [1, 'A', 'font-size:15px'], [1.2, 'A', 'font-size:18px']], state.textScale, (s) => { state.textScale = s; persist(); render(); })),
      row(t('srTips'), null, h('button', { class: 'link', type: 'button', text: t('open'), onClick: () => showOv('sheet', { tone: 'ok', icon: 'speaker', title: t('srTips'), body: t('srBody'), actions: [{ label: t('ok'), primary: true, fn: closeOv }] }) }))));
    v.append(h('h2', { class: 'group-t', text: t('demoTools') }), h('div', { class: 'group', style: 'margin-top:0' },
      SR && backend.ok ? row(t('hearLbl'), t('hearD'), seg(t('hearLbl'), [['phone', t('hearPhone')], ['spitch', 'Spitch']], state.hearSpitch ? 'spitch' : 'phone', (v) => { state.hearSpitch = v === 'spitch'; persist(); render(); })) : null,
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
  function cycleLang() { const order = ['en', 'pcm', 'yo', 'ha', 'ig']; setLang(order[(order.indexOf(state.lang) + 1) % order.length]); }
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
    const b = { confirm: ovConfirm, success: ovSuccess, moneyin: ovMoneyIn, sheet: ovSheet, type: ovType, pick: ovPick, 'goal-form': ovGoalForm, 'send-form': ovSendForm, 'airtime-form': ovAirtimeForm, pot: ovPot, amount: ovAmountCompat, onboard: ovOnboard, enroll: ovEnroll, more: ovMore, approval: ovApproval, 'helper-form': ovHelperForm, 'helper-link': ovHelperLink, 'circle-log': ovCircleLog, promise: ovPromise }[ov.kind];
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
      const vOn = voiceIdOn();
      kids.push(h('div', { class: 'lockrow', style: 'flex-direction:column;align-items:stretch;gap:12px', 'aria-live': 'assertive' },
        h('div', { style: 'display:flex;gap:12px;align-items:center' }, h('span', { class: 'lk' }, icon('lock', 18)),
          h('div', null, h('b', { text: t('sayPhraseThen') }), h('span', { text: t('imListening') }))),
        h('div', { class: 'digits', 'aria-label': t('numbersAria', { d: spaced(p.challenge) }) }, String(p.challenge).split('').map(x => h('span', { class: 'num', text: x }))),
        h('div', { class: 'checks' },
          h('span', { class: 'chk' }, icon('check', 14, 2.4), t('chkPhrase')),
          h('span', { class: 'chk' }, icon('check', 14, 2.4), t('chkNumbers')),
          vOn ? h('span', { class: 'chk' }, icon('check', 14, 2.4), t('chkVoice')) : (backend.voiceId ? h('button', { class: 'chk off', type: 'button', onClick: () => showOv('enroll', { stage: 'intro' }) }, icon('plus', 14), t('setUpVoice')) : null))));
      if (tries) kids.push(h('p', { class: 'tries', text: t('triesLeft', { n: 3 - tries }) + (p.lastFail === 'voice' && p.lastScore != null ? ' · ' + t('voiceMatch', { p: Math.round(p.lastScore * 100) }) : '') }));
      if (!vOn) kids.push(h('form', { class: 'inrow', autocomplete: 'off', onSubmit: (e) => { e.preventDefault(); handle(e.target.querySelector('input').value, { via: 'text' }); } },
        h('label', { class: 'sr', for: 'phrase-in', text: t('phraseNumsPh') }),
        h('input', { class: 'field', id: 'phrase-in', type: 'password', placeholder: t('phraseNumsPh'), autocomplete: 'off' }),
        h('button', { class: 'btn p', type: 'submit', text: t('confirmBtn') })));
      else kids.push(h('button', { class: 'btn p', type: 'button', onClick: () => { micDenied = false; startListening(); } }, icon('mic', 20), t('speakNow')));
      kids.push(h('button', { class: 'btn o', type: 'button', onClick: () => { lastHeard = t('fingerprint'); pending.verified = t('verifyFp'); execute(); } }, icon('finger', 20), t('fingerprint')));
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
      kv([[t('walletBal'), fmt(state.wallet)], [t('date'), nowLabel()], d.verified ? [t('verifiedBy'), d.verified] : null, [t('reference'), d.ref || (d.ref = ref())]])];
    if (pending && pending.type === 'nudge') body.push(nudgeCard(t('nudgeQ', { a: fmt(pending.amount), g: label(pending.goal) })));
    if (d.promiseRef) body.push(h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('mic', 18)), h('div', null, h('b', { text: t('promiseT') }), h('span', { text: t('promiseWhy') }))));
    const foot = d.promiseRef
      ? [h('button', { class: 'btn p', type: 'button', onClick: () => { pending = null; showOv('promise', { ref: d.promiseRef, stage: 'intro' }); } }, icon('mic', 20), t('recordPromiseBtn')),
         h('button', { class: 'btn s', type: 'button', onClick: () => { pending = null; closeOv(); go('pots'); }, text: t('notNow') })]
      : [h('button', { class: 'btn p', type: 'button', onClick: () => { pending = null; closeOv(); go('home'); }, text: t('done') })];
    el.append(h('div', { class: 'pg' }, h('div', { class: 'pg-body' }, body), h('div', { class: 'pg-foot' }, foot)));
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
      g.target && navigator.mediaDevices && window.MediaRecorder ? h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('mic', 18)),
        h('div', { style: 'flex:1;min-width:0' }, h('b', { text: t('promiseT') }), h('span', { text: g.promise ? t('promiseRow', { d: new Date(g.promise.at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) }) : t('promiseNoneRow') })),
        h('div', { style: 'display:flex;gap:4px;flex:0 0 auto' },
          g.promise ? h('button', { class: 'link', type: 'button', text: t('promisePlayBtn'), onClick: () => { showOv('promise', { ref: d.ref, stage: 'listen', back: d.ref }); setTimeout(() => playPromise(g), 300); } }) : null,
          h('button', { class: 'link', type: 'button', text: g.promise ? t('promiseRedo') : t('promiseRec'), onClick: () => showOv('promise', { ref: d.ref, stage: 'intro', back: d.ref }) }))) : null,
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
            [['en', 'English', 'Save 5,000 for rent'], ['pcm', 'Pidgin', 'Abeg keep 5k for my house rent'], ['yo', 'Yorùbá', 'Fi ẹgbẹ̀rún márùn-ún pamọ́'], ['ha', 'Hausa', 'Ajiye dubu biyar don haya'], ['ig', 'Igbo', 'Chekwaa puku ise maka ụgwọ ụlọ']].map(([code, name, ex]) =>
              h('button', { class: 'lang-row', type: 'button', role: 'radio', 'aria-checked': String(state.lang === code), onClick: () => { setLang(code); speak(t('chooseLang'), code, true); } },
                h('div', null, h('b', { text: name }), h('span', { lang: ['yo', 'ha', 'ig'].includes(code) ? code : null, text: ex })), h('span', { class: 'radio', 'aria-hidden': 'true' }))))),
        h('div', { class: 'pg-foot' }, h('button', { class: 'btn p', type: 'button', onClick: () => showOv('onboard', { step: 2, hf: true }), text: t('cont') }))));
    } else {
      const opt = (on, title, desc, val) => h('button', { class: 'lang-row', type: 'button', role: 'radio', 'aria-checked': String(on), onClick: () => { d.hf = val; renderOv(); } },
        h('div', null, h('b', { text: title }), h('span', { text: desc })), h('span', { class: 'radio', 'aria-hidden': 'true' }));
      pageWrap(el, t('step', { n: 2 }), () => showOv('onboard', { step: 1 }), [
        h('h2', { style: 'margin:4px 0 0;font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.25', text: t('howTalk') }),
        h('div', { role: 'radiogroup', style: 'display:flex;flex-direction:column;gap:10px' }, opt(d.hf, t('handsFree'), t('hfOptD'), true), opt(!d.hf, t('tapOpt'), t('tapOptD'), false)),
        h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('lock', 18)), h('div', null, h('b', { text: t('secret') }), h('span', { text: t('phraseInfo', { p: state.secret }) })))],
        [h('button', { class: 'btn p', type: 'button', onClick: () => { state.onboarded = true; persist(); setHandsFree(d.hf); if (backend.voiceId && !state.voicePrint) { showOv('enroll', { stage: 'intro', fromOnboard: true }); } else { closeOv(); reply(R('welcome')); } }, text: t('finish') })]);
    }
  }

  // ---------- language auto-detect ----------
  function detectLang(raw) {
    const n = L.norm(raw);
    const count = (re) => (n.match(re) || []).length;
    const ig = count(/\b(chekwaa|chekwa|debe|zipu|ziga|wepu|wepuo|ego|ole|puku|nari|ise|abuo|ato|ano|iri|ugwo|ulo|akwukwo|ndewo|kedu|enyemaka|achoro|maka|nye|kaadi|biko|nke|ka m|zuta|tupu|mberede)\b/g);
    const ha = count(/\b(ajiye|adana|aika|tura|cire|nawa|kudi|kudin|dubu|dari|biyar|biyu|uku|hudu|goma|ashirin|haya|makaranta|sannu|taimako|ina son|zan|kake|kana|don|ga|kati|katin|walat|sayi|kafin|gaggawa)\b/g);
    const yo = count(/\b(pamo|egberun|elo|melo|owo|kini|nibo|mi|fun|ni|wa|nino|yo|fi|beeni|rara|ranti|leti|afojusun|mo|fe|ile|ranse|si|ra|kaadi)\b/g);
    if (/[ụị]/.test(raw) || (ig >= 2 && ig > ha && ig > yo)) return 'ig';
    if (/[ẹṣ]/.test(raw) || (yo >= 2 && yo >= ha && yo >= ig)) return 'yo';
    if (ha >= 2) return 'ha';
    if (count(/\b(wetin|abeg|dey|wan|comot|una|fit|na|don|oya|wahala|abi|sef|sabi|make i|give)\b/g) >= 1 && !/\bgive me\b/.test(n)) return 'pcm';
    if (count(/\b(the|is|do|have|what|want|how|my|please|from|for|much|to|any)\b/g) >= 2) return 'en';
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
      if (j.lang && ['en', 'pcm', 'yo', 'ha', 'ig'].includes(j.lang) && j.lang !== state.lang) { state.lang = j.lang; persist(); render(); }
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
    const p = pending; pending = null; closeOv();
    if (p && p.type === 'promiseq') return reply(R('promiseKept', { goal: label(p.goal) }));
    if (p && p.type === 'promise-offer') return reply(R('cancelled'));
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
    lastHeard = isPhrase || (phraseMode && opts.via === 'text') ? '••••••' : raw; lastVia = opts.via || '';
    if (ov && ['success', 'moneyin', 'sheet', 'pot', 'amount', 'goal-form', 'send-form', 'airtime-form'].includes(ov.kind) && !(pending && pending.type === 'nudge')) closeOv();
    maybeSwitch(raw);
    renderTalk();
    let r = L.understand(raw, { pending: !!pending, awaiting: awaiting && awaiting.slot, contacts: state.contacts, helpers: (state.helpers || []).map(x => x.name) });
    if (cloud.waiting) {
      if (/\b(no|cancel|stop|forget am|leave am|rara|fagile)\b/.test(L.norm(raw))) return cancelApproval();
      return reply(t('waitBody', { n: cloud.waiting.names }));
    }

    if (phraseMode) {
      if (r.intent === 'no' && !isPhrase) return cancelPending();
      if (r.intent === 'yes' && !isPhrase) return reply(R('phraseHint') + R('challenge', { d: spaced(pending.challenge) }));
      if (voiceIdOn() && !(opts.via === 'voice' && opts.voice)) { renderOv(); return reply(R('sayAloud')); }
      const digitsOk = !pending.challenge || L.challengeOk(raw, pending.challenge);
      let voiceOk = true;
      if (voiceIdOn()) {
        if (opts.voice.score == null) { pending.challenge = L.newChallenge(); renderOv(); return reply(R('voiceShort', { d: spaced(pending.challenge) })); }
        pending.lastScore = opts.voice.score;
        voiceOk = opts.voice.score >= state.voiceStrict;
      }
      if (isPhrase && digitsOk && voiceOk) {
        pending.verified = voiceIdOn() ? t('verifyAll', { p: Math.round(opts.voice.score * 100) }) : t('verifyNoVoice');
        return execute();
      }
      pending.tries = (pending.tries || 0) + 1;
      if (pending.tries >= 3) {
        pending = null;
        return fail({ tone: 'err', icon: 'x', k: t('kLocked'), title: R('locked'), actions: [okAction()] }, R('locked'));
      }
      pending.challenge = L.newChallenge();
      pending.lastFail = !isPhrase ? 'phrase' : !digitsOk ? 'digits' : 'voice';
      renderOv();
      if (!isPhrase) return reply(R('phraseWrong') + R('challenge', { d: spaced(pending.challenge) }));
      if (!digitsOk) return reply(R('digitsWrong', { d: spaced(pending.challenge) }));
      return reply(R('voiceWrong', { d: spaced(pending.challenge) }));
    }

    if (r.intent === 'yes') { if (pending) return execute(); r.intent = 'unknown'; }
    if (r.intent === 'no') { if (pending) return cancelPending(); awaiting = null; return reply(R('cancelled')); }
    if (pending) { pending = null; if (ov && ['confirm', 'success', 'moneyin'].includes(ov.kind)) closeOv(); }

    if (awaiting) {
      // Vosa asked a question: keep what we already know and add the new answer to it
      const a = awaiting;
      if (mergeAnswer(a.r, r, a.slot)) { awaiting = null; r = a.r; }
      else if (['unknown', 'fill', 'yes'].includes(r.intent) || r.intent === a.r.intent) {
        a.miss = (a.miss || 0) + 1;
        if (a.miss >= 3) { awaiting = null; return reply(R('cancelled')); }
        const extra = (a.slot === 'account' || a.slot === 'recipient') && /\d/.test(raw) ? ' ' + R('sayDigits') : '';
        return reply(R('notCaught') + ' ' + (a.slot === 'account' ? R('askAccountNoBank') : a.text) + extra);
      } else awaiting = null;
    }

    if (r.intent === 'unknown') {
      busy = true;
      const ai = await aiUnderstand(raw);
      busy = false;
      if (ai) r = ai;
    }
    return route(r);
  }

  function mergeAnswer(base, r, slot) {
    let got = false;
    if (slot === 'day' && r.day != null) { base.day = r.day; got = true; }
    if (slot === 'amount' && r.amount) { base.amount = r.amount; got = true; }
    if (base.intent === 'send') {
      if (r.contact) { base.contact = r.contact; base.account = null; base.unknownName = null; got = true; }
      if (r.account) { base.account = r.account; base.contact = null; base.unknownName = null; got = true; }
      if (r.bank) { base.bank = r.bank; got = true; }
      if (r.amount && !r.account && slot !== 'amount' && !base.amount) { base.amount = r.amount; got = true; }
    }
    return got;
  }
  // Ask a follow-up question and remember what we are waiting for
  function ask(slot, r, key, vars) { const text = R(key, vars); awaiting = { slot, r, text }; return reply(text); }

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
  function confirmWith(p, text) {
    // Money leaving the account: if Voice ID is available but not set up, set it up first
    if (p.needsPhrase && backend.voiceId && !state.voicePrint && state.requireVoice !== false) {
      const msg = R('needVoiceId');
      return fail({ tone: 'warn', icon: 'lock', k: t('kVoiceNeeded'), title: msg, actions: [
        { label: t('setUpVoice'), primary: true, fn: () => showOv('enroll', { stage: 'intro', resume: { p, text } }) },
        { label: t('cancel'), fn: () => { closeOv(); reply(R('cancelled')); } }] }, msg);
    }
    if (p.needsPhrase) { p.challenge = L.newChallenge(); text += R('challenge', { d: spaced(p.challenge) }); }
    pending = p; showOv('confirm'); return reply(text);
  }

  function routeUI(r) { lastHeard = ''; renderTalk(); return route(r); }
  function route(r) {
    switch (r.intent) {
      case 'save': {
        if (!r.amount) { return ask('amount', r, 'askSave'); }
        if (state.wallet < r.amount) return lowWallet(r.amount);
        const g = resolveGoal(r, true);
        return confirmWith({ type: 'save', amount: r.amount, goal: g }, R('confirmSave', { amt: fmt(r.amount), goal: label(g) }));
      }
      case 'withdraw': {
        if (!r.amount) { return ask('amount', r, 'askWithdraw'); }
        const g = resolveGoal(r, false);
        if (!g) {
          const text = R('noGoal', { goal: r.goal ? L.GOALS[r.goal][state.lang] : (r.customName || '') });
          return fail({ tone: 'warn', icon: 'pot', k: t('kNoGoal'), title: text, actions: [okAction(), { label: t('createGoal'), fn: () => showOv('goal-form', { key: r.goal && GOAL_CHOICES.includes(r.goal) ? r.goal : 'other', amount: 50000, month: 2 }) }] }, text);
        }
        if (g.bal < r.amount) {
          const text = R('insufficient', { goal: label(g), bal: fmt(g.bal), amt: fmt(r.amount) });
          return fail({ tone: 'warn', icon: 'alert', k: t('kNoMoney'), title: text, actions: [okAction()] }, text);
        }
        const gate = promiseGate(g, r.amount);
        if (gate === 'play') return startPromiseGate(g, r.amount);
        if (gate === 'wait') { const text = R('promiseWaiting', { amt: fmt(g.hold.amount), goal: label(g), when: timeLabel(g.hold.until) }); return fail({ tone: 'warn', icon: 'clock', k: t('promiseT'), title: text, actions: [okAction()] }, text); }
        const extra = gate === 'ready' ? R('promiseReady') + ' ' : '';
        return confirmWith({ type: 'withdraw', amount: r.amount, goal: g, needsPhrase: true, promiseOk: true }, extra + R('confirmWithdraw', { amt: fmt(r.amount), goal: label(g) }));
      }
      case 'promise': {
        const withTarget = state.goals.filter(x => x.target);
        let g = (r.goal || r.customName) ? findGoal(r.goal, r.customName) : (withTarget.length === 1 ? withTarget[0] : null);
        if (!g) { const text = R('promiseWhich'); return fail({ tone: 'ok', icon: 'mic', k: t('promiseT'), title: text, actions: withTarget.slice(0, 3).map(x => ({ label: label(x), fn: () => { closeOv(); routeUI({ intent: 'promise', goal: x.name ? null : x.key, customName: x.name || null, play: r.play }); } })).concat([{ label: t('cancel'), fn: closeOv }]) }, text); }
        if (r.play) {
          if (!g.promise) return reply(R('promiseNone', { goal: label(g) }));
          showOv('promise', { ref: gref(g), stage: 'listen' }); setTimeout(() => playPromise(g), 300);
          return reply(R('promisePlay', { goal: label(g) }));
        }
        showOv('promise', { ref: gref(g), stage: 'intro' });
        return reply(R('promiseIntro'));
      }
      case 'send': {
        if (!r.contact && !r.account && r.bank) return ask('account', r, 'askAccount', { bank: r.bank });
        if (!r.contact && !r.account) {
          if (r.unknownName) {
            const text = R('unknownContact', { name: r.unknownName.replace(/\b\w/g, c => c.toUpperCase()) });
            return fail({ tone: 'warn', icon: 'user', k: t('kNoContact'), title: text, actions: [okAction(), { label: t('sendMoney'), fn: () => showOv('send-form', { c: 0, amount: r.amount || 5000 }) }] }, text);
          }
          return ask('recipient', r, 'askRecipient');
        }
        if (!r.contact && !r.bank) return ask('bank', r, 'needBank', { acct: r.account });
        if (!r.amount) return ask('amount', r, 'askSend');
        if (state.wallet < r.amount) return lowWallet(r.amount);
        const to = r.contact ? { name: r.contact.name, bank: r.contact.bank, acct: r.contact.acct } : { name: r.account, bank: r.bank, acct: r.account };
        const text = r.contact ? R('confirmSend', { amt: fmt(r.amount), name: to.name, bank: to.bank, last4: to.acct.slice(-4) }) : R('confirmSendAcct', { amt: fmt(r.amount), bank: to.bank, acct: to.acct });
        return confirmWith({ type: 'send', amount: r.amount, to, needsPhrase: true }, text);
      }
      case 'airtime': {
        if (!r.amount) { return ask('amount', r, 'askAirtime'); }
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
      case 'addhelper': {
        if ((state.helpers || []).length >= 3) return reply(t('maxHelpers'));
        const nm = r.helperName ? capName(r.helperName) : '';
        showOv('helper-form', { name: nm });
        return reply(t('helperFormGo', { n: nm || t('yourHelper') }));
      }
      case 'helpers': {
        const hs = state.helpers || [];
        if (!hs.length) return reply(R('helpersNone'));
        const list = hs.map(x => x.name + ', ' + roleName(x.role).toLowerCase() + (x.status !== 'active' ? ' (' + t('stInvited').toLowerCase() + ')' : '')).join('; ');
        const seen = [...new Set((state.circleLog || []).filter(e => e.kind === 'view' && Date.now() - e.at < 7 * 864e5).map(e => e.name))];
        go('settings');
        return reply(R('helpersList', { list }) + (seen.length ? ' ' + seen.map(n => R('helperViewed', { name: n })).join(' ') : ''));
      }
      case 'removehelper': {
        const hs = state.helpers || [];
        const hp = r.helperName ? hs.find(x => L.norm(x.name) === r.helperName || L.norm(x.name).split(' ')[0] === r.helperName) : hs.length === 1 ? hs[0] : null;
        if (!hp) return reply(hs.length ? t('whichHelper') : R('helpersNone'));
        removeHelper(hp);
        return reply(R('helperRemoved', { name: hp.name }));
      }
      case 'voicesetup':
        if (!backend.voiceId) return reply(t('vidNeedsKey'));
        showOv('enroll', { stage: 'intro' }); return reply(R('voiceSetupGo'));
      case 'handsfree': setHandsFree(r.on); return reply(R(r.on ? 'handsfreeOn' : 'handsfreeOff'));
      case 'setsecret': {
        const phrase = r.phrase.replace(/[^\p{L}\p{N} ]/gu, '').trim();
        if (phrase.length < 3) return reply(R('unknown'));
        state.secret = phrase; persist(); render();
        return reply(R('secretSet', { phrase }));
      }
      case 'goal': {
        if (!r.amount) { return ask('amount', r, 'askGoal'); }
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
        if (r.day == null) { return ask('day', r, 'askDay'); }
        if (!state.reminders.includes(r.day)) state.reminders.push(r.day);
        persist(); render();
        return reply(R('remind', { day: L.dayLabel(r.day, state.lang) }));
      }
      case 'explain': return reply((L.EXPLAIN[r.term] || {})[state.lang] || R('unknown'));
      case 'help': return reply(R('help'));
      case 'greet': return reply(R('greet'));
      default: {
        const text = R('unknown');
        return fail({ tone: 'warn', icon: 'wave', k: t('kDidnt'), title: text, body: lastVia === 'voice' && lastHeard ? t('heardYou', { x: lastHeard }) : null, actions: [
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
      if (g.target && g.bal >= g.target) { msg += R('reached'); if (g.promise) { msg += R('promiseReached'); setTimeout(() => playPromise(g), 400); } }
      flashGoal = g; persist(); render();
      showOv('success', { title: t('savedTo', { g: label(g) }), amount: p.amount, sub: g.target ? Math.min(100, Math.round(g.bal / g.target * 100)) + '% ' + t('of') + ' ' + fmt(g.target) : fmt(g.bal) });
      return reply(msg);
    }
    if (p.type === 'withdraw') {
      if (p.emergency && !p.approved) {
        const ap = (state.helpers || []).filter(x => x.role === 'approver' && x.status === 'active');
        if (ap.length) return askApproval(p, { list: ap, isNew: false, kind: 'withdraw' });
      }
      g.bal -= p.amount; state.wallet += p.amount; delete g.hold;
      if (p.approvedBy) p.verified = [p.verified, t('approvedBy', { n: p.approvedBy })].filter(Boolean).join(' · ');
      logAct({ kind: 'move', g: gref(g), amt: p.amount });
      persist(); render();
      showOv('success', { title: t('moved'), amount: p.amount, sub: label(g) + ': ' + fmt(g.bal), verified: p.verified });
      return reply((p.approvedBy ? R('helperApproved', { name: p.approvedBy }) : '') + R('doneWithdraw', { amt: fmt(p.amount), goal: label(g), bal: fmt(g.bal) }));
    }
    if (p.type === 'goal') {
      g.target = p.target;
      g.deadline = p.deadline ? ymd(p.deadline) : null;
      flashGoal = g; persist(); go('pots');
      const canRecord = !!(navigator.mediaDevices && window.MediaRecorder);
      showOv('success', { title: t('goalSet'), amount: p.target, sub: label(g) + (p.deadline ? ' · ' + L.dateLabel(p.deadline) : ''), promiseRef: canRecord && !g.promise ? gref(g) : null });
      if (canRecord && !g.promise) { pending = { type: 'promise-offer', goal: g }; return reply(R('doneGoal', { goal: label(g), target: fmt(g.target) }) + R('promiseOffer')); }
      return reply(R('doneGoal', { goal: label(g), target: fmt(g.target) }));
    }
    if (p.type === 'promise-offer') { showOv('promise', { ref: gref(g), stage: 'intro' }); return reply(R('promiseIntro')); }
    if (p.type === 'promiseq') {
      // "Yes, it's an emergency": a helper must approve, then the usual confirmation. No helper: hold it for 24 hours.
      closeOv();
      const ap = (state.helpers || []).filter(x => x.role === 'approver' && x.status === 'active');
      if (ap.length) {
        const names = joinNames(ap.map(x => x.name));
        return confirmWith({ type: 'withdraw', amount: p.amount, goal: g, needsPhrase: true, emergency: true, promiseOk: true }, R('promiseHelper', { names }) + ' ' + R('confirmWithdraw', { amt: fmt(p.amount), goal: label(g) }));
      }
      g.hold = { amount: p.amount, until: Date.now() + 24 * 3600e3 };
      persist(); render();
      const text = R('promiseHold', { amt: fmt(p.amount), when: timeLabel(g.hold.until) });
      return fail({ tone: 'warn', icon: 'clock', k: t('promiseT'), title: text, actions: [okAction(), { label: t('addHelper'), fn: () => showOv('helper-form', {}) }] }, text);
    }
    if (p.type === 'send') {
      if (state.wallet < p.amount) return lowWallet(p.amount);
      // Trusted Circle: big or unusual transfers wait for a helper's approval
      if (!p.approved) { const info = approversFor(p); if (info.list.length) return askApproval(p, info); }
      state.wallet -= p.amount;
      logAct({ kind: 'send', n: p.to.name, amt: p.amount, detail: p.to.bank + ' •••• ' + p.to.acct.slice(-4) });
      let msg = (p.approvedBy ? R('helperApproved', { name: p.approvedBy }) : '') + R('doneSend', { name: p.to.name, amt: fmt(p.amount), wallet: fmt(state.wallet) });
      if (p.approvedBy) p.verified = [p.verified, t('approvedBy', { n: p.approvedBy })].filter(Boolean).join(' · ');
      const nudge = roundTo(p.amount * 0.1, 500);
      const flex = findGoal('flex') || state.goals[0];
      if (p.amount >= 2000 && state.wallet >= nudge * 3 && flex) {
        msg += R('nudge', { nudge: fmt(nudge), goal: label(flex) });
        pending = { type: 'nudge', amount: nudge, goal: flex };
      }
      persist(); render();
      showOv('success', { title: t('sentTo', { n: p.to.name }), amount: p.amount, sub: p.to.bank + ' •••• ' + p.to.acct.slice(-4), verified: p.verified });
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
  const backend = { ok: false, sttYo: false, ttsYo: false, ttsEn: false, ttsPcm: false, voiceId: false, db: false, sms: false, voices: null };
  let audioEl = null, warnedYo = false, speakToken = 0;
  function stopSpeaking() {
    speakToken++;
    try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {}
    if (audioEl) { audioEl.pause(); audioEl = null; }
  }
  // Spoken audio is kept by the browser, so a sentence Vosa has said before costs no Spitch credit.
  const SPEECH_CACHE = 'vosa-speech-v1';
  async function fetchSpeech(spoken, lang, voice) {
    const url = 'api/speak?' + new URLSearchParams({ text: spoken, lang, speed: String(state.speed), voice: voice || '' });
    let cache = null;
    try { cache = window.caches ? await caches.open(SPEECH_CACHE) : null; } catch (e) { cache = null; }
    if (cache) { const hit = await cache.match(url); if (hit) return hit.blob(); }
    const res = await fetch(url);
    if (!res.ok) throw new Error('speak ' + res.status);
    if (cache) { try { await cache.put(url, res.clone()); } catch (e) {} }
    return res.blob();
  }
  const chosenVoice = (lang) => (state.voices || {})[lang] || null;
  function wantsServerVoice(lang) {
    if (state.voiceEngine === 'phone') return ['yo', 'ha', 'ig'].includes(lang) && backend.ok && !phoneHasVoice(lang);
    return (lang === 'yo' && backend.ttsYo) || (lang === 'pcm' && backend.ttsPcm) || (lang === 'en' && backend.ttsEn) || (['ha', 'ig'].includes(lang) && backend.ok);
  }
  function phoneHasVoice(lang) { try { return speechSynthesis.getVoices().some(x => new RegExp('^' + lang, 'i').test(x.lang)); } catch (e) { return false; } }
  async function speak(text, lang, force) {
    if (!text || (state.muted && !force)) return;
    stopSpeaking();
    const my = speakToken;
    const spoken = L.toSpeech(text, lang);
    if (wantsServerVoice(lang)) {
      try {
        const blob = await fetchSpeech(spoken, lang, chosenVoice(lang));
        if (my !== speakToken) return;
        audioEl = new Audio(URL.createObjectURL(blob));
        await new Promise((resolve) => { audioEl.onended = resolve; audioEl.onerror = resolve; audioEl.play().catch(resolve); });
        return;
      } catch (e) { /* fall back to the phone's voice */ }
    }
    if (!('speechSynthesis' in window)) return;
    const voices = speechSynthesis.getVoices();
    let v;
    if (lang === 'yo' || lang === 'ha' || lang === 'ig') {
      v = voices.find(x => new RegExp('^' + lang, 'i').test(x.lang));
      if (!v) { if (!warnedYo) { warnedYo = true; status(t('noYoVoice')); } return; }
    } else {
      // Prefer the phone's most natural English voice: Nigerian, then other African/British, then any; "natural"/"enhanced" ones first.
      const en = voices.filter(x => /^en/i.test(x.lang));
      const rank = (x) => (/en-NG/i.test(x.lang) ? 0 : /en-(GB|ZA|KE|GH)/i.test(x.lang) ? 1 : 2) * 10 + (/natural|enhanced|premium|neural|wavenet/i.test(x.name) ? 0 : /google|samantha|daniel|karen|moira|serena/i.test(x.name) ? 1 : 2);
      v = en.sort((a, b) => rank(a) - rank(b))[0];
    }
    const u = new SpeechSynthesisUtterance(spoken);
    if (v) { u.voice = v; u.lang = v.lang; }
    u.rate = state.speed; u.pitch = 1;
    await new Promise((resolve) => {
      u.onend = resolve; u.onerror = resolve;
      setTimeout(resolve, Math.min(30000, 1500 + spoken.length * 90 / state.speed));
      speechSynthesis.speak(u);
    });
  }
  if ('speechSynthesis' in window) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {} }

  // ---------- Voice ID (open-source speaker model, runs on the phone) ----------
  // Model: WeSpeaker ResNet34 trained on VoxCeleb (thousands of speakers), int8 version, 6.7 MB.
  // Runtime: ONNX Runtime Web (WebAssembly). Both are served from this site; no key, no account,
  // and voices never leave the phone. Downloaded once (~18 MB in total), then kept by the browser.
  const VID_FILES = { script: 'vendor/ort.wasm.min.js', wasm: 'vendor/ort-wasm-simd-threaded.wasm', model: 'models/voice-id.onnx' };
  const VID_CACHE = 'vosa-voice-id-v2';
  const ENROLL_SECS = 15;      // seconds of speech needed to build a voiceprint
  const VERIFY_MIN_SECS = 1.2; // shortest speech we will score
  const VERIFY_MAX_SECS = 8;
  const ENROLL_MIN_AGREE = 0.45; // the three enrollment slices must sound like the same person
  const vid = { engine: null, loading: null, starting: false, onProgress: null };
  let enrollSession = null;
  function toB64(bytes) { let s = ''; for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000)); return btoa(s); }
  function fromB64(str) { const bin = atob(str); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u; }
  const printToB64 = (f32) => toB64(new Uint8Array(f32.buffer.slice(0)));
  const printFromB64 = (str) => new Float32Array(fromB64(str).buffer);
  function unit(v) { let n = 0; for (let i = 0; i < v.length; i++) n += v[i] * v[i]; n = Math.sqrt(n) || 1; const o = new Float32Array(v.length); for (let i = 0; i < v.length; i++) o[i] = v[i] / n; return o; }
  function cosine(a, b) { if (!a || !b || a.length !== b.length) return null; let d = 0; for (let i = 0; i < a.length; i++) d += a[i] * b[i]; return Number.isFinite(d) ? d : null; }
  // Kaldi-compatible 80-bin log-mel filterbank (what the speaker model was trained on), with mean normalisation
  const FB = (() => {
    const N = 400, SHIFT = 160, NFFT = 512, BINS = 80, SR = 16000;
    const win = new Float32Array(N);
    for (let i = 0; i < N; i++) win[i] = Math.pow(0.5 - 0.5 * Math.cos(2 * Math.PI * i / (N - 1)), 0.85);
    const mel = (f) => 1127 * Math.log(1 + f / 700);
    const lo = mel(20), hi = mel(SR / 2), d = (hi - lo) / (BINS + 1);
    const banks = [];
    for (let m = 0; m < BINS; m++) {
      const l = lo + m * d, c = l + d, r = c + d, w = new Float32Array(NFFT / 2);
      let first = -1, last = -1;
      for (let i = 0; i < NFFT / 2; i++) {
        const x = mel(i * SR / NFFT);
        if (x > l && x < r) { w[i] = x <= c ? (x - l) / (c - l) : (r - x) / (r - c); if (first < 0) first = i; last = i; }
      }
      banks.push({ w, first, last });
    }
    const cos = new Float64Array(NFFT / 2), sin = new Float64Array(NFFT / 2);
    for (let i = 0; i < NFFT / 2; i++) { cos[i] = Math.cos(-2 * Math.PI * i / NFFT); sin[i] = Math.sin(-2 * Math.PI * i / NFFT); }
    const rev = new Uint16Array(NFFT);
    for (let i = 0, bits = Math.log2(NFFT); i < NFFT; i++) { let x = i, y = 0; for (let b = 0; b < bits; b++) { y = (y << 1) | (x & 1); x >>= 1; } rev[i] = y; }
    function fft(re, im) {
      for (let i = 0; i < NFFT; i++) { const j = rev[i]; if (j > i) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t; } }
      for (let size = 2; size <= NFFT; size <<= 1) {
        const half = size >> 1, step = NFFT / size;
        for (let i = 0; i < NFFT; i += size) for (let j = 0; j < half; j++) {
          const k = j * step, a = i + j, b = a + half;
          const tr = re[b] * cos[k] - im[b] * sin[k], ti = re[b] * sin[k] + im[b] * cos[k];
          re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti;
        }
      }
    }
    const EPS = 1.1920928955078125e-7;
    return function fbank(x) {
      const T = x.length < N ? 0 : 1 + Math.floor((x.length - N) / SHIFT);
      const out = new Float32Array(T * BINS), mean = new Float64Array(BINS);
      const re = new Float64Array(NFFT), im = new Float64Array(NFFT), fr = new Float64Array(N), pw = new Float64Array(NFFT / 2);
      for (let t = 0; t < T; t++) {
        let s = 0; for (let i = 0; i < N; i++) { fr[i] = x[t * SHIFT + i]; s += fr[i]; }
        s /= N; for (let i = 0; i < N; i++) fr[i] -= s;
        for (let i = N - 1; i > 0; i--) fr[i] -= 0.97 * fr[i - 1];
        fr[0] -= 0.97 * fr[0];
        re.fill(0); im.fill(0);
        for (let i = 0; i < N; i++) re[i] = fr[i] * win[i];
        fft(re, im);
        for (let i = 0; i < NFFT / 2; i++) pw[i] = re[i] * re[i] + im[i] * im[i];
        for (let m = 0; m < BINS; m++) {
          const { w, first, last } = banks[m]; let e = 0;
          for (let i = first; i <= last; i++) e += w[i] * pw[i];
          const v = Math.log(Math.max(e, EPS)); out[t * BINS + m] = v; mean[m] += v;
        }
      }
      for (let m = 0; m < BINS; m++) mean[m] /= T || 1;
      for (let t = 0; t < T; t++) for (let m = 0; m < BINS; m++) out[t * BINS + m] -= mean[m];
      return { data: out, frames: T };
    };
  })();
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (window.ort) return resolve();
      const s = document.createElement('script'); s.src = src; s.onload = resolve; s.onerror = () => reject(new Error('Voice ID files did not load. Check your internet and try again.'));
      document.head.append(s);
    });
  }
  // Downloads a file once with progress, then keeps it in the browser's cache
  async function fetchKept(url, onBytes) {
    let cache = null;
    try { cache = await caches.open(VID_CACHE); const hit = await cache.match(url); if (hit) { const b = await hit.arrayBuffer(); onBytes(b.byteLength, b.byteLength); return b; } } catch (e) { cache = null; }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Voice ID files did not load (' + res.status + '). Check your internet and try again.');
    const total = +res.headers.get('content-length') || 0;
    let buf;
    if (res.body && res.body.getReader) {
      const reader = res.body.getReader(), parts = []; let got = 0;
      for (;;) { const { done, value } = await reader.read(); if (done) break; parts.push(value); got += value.length; onBytes(got, total || got); }
      const u = new Uint8Array(got); let k = 0; parts.forEach(p => { u.set(p, k); k += p.length; }); buf = u.buffer;
    } else { buf = await res.arrayBuffer(); onBytes(buf.byteLength, buf.byteLength); }
    try { if (cache) await cache.put(url, new Response(buf.slice(0), { headers: { 'Content-Type': 'application/octet-stream' } })); } catch (e) {}
    return buf;
  }
  // Loads the model once. Returns { embed(Float32Array 16 kHz) -> unit-length voiceprint }.
  function vidEngine() {
    if (vid.engine) return Promise.resolve(vid.engine);
    if (window.VOSA_TEST_EMBED) { vid.engine = { embed: async (a) => unit(await window.VOSA_TEST_EMBED(a)) }; return Promise.resolve(vid.engine); }
    if (!vid.loading) vid.loading = (async () => {
      const prog = { wasm: [0, 11.2e6], model: [0, 6.7e6] };
      const tick = (k) => (got, total) => { prog[k] = [got, total]; const g = prog.wasm[0] + prog.model[0], all = prog.wasm[1] + prog.model[1]; if (vid.onProgress) vid.onProgress(Math.min(99, Math.round(g / all * 100))); };
      const [wasm, model] = await Promise.all([fetchKept(VID_FILES.wasm, tick('wasm')), fetchKept(VID_FILES.model, tick('model')), loadScript(VID_FILES.script)]);
      const ort = window.ort;
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.wasmPaths = new URL('vendor/', location.href).href;
      ort.env.wasm.wasmBinary = wasm;
      const session = await ort.InferenceSession.create(new Uint8Array(model), { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });
      const input = session.inputNames[0], output = session.outputNames[0];
      let queue = Promise.resolve();
      vid.engine = {
        embed: (audio) => {
          const job = queue.then(async () => {
            const f = FB(audio);
            if (f.frames < 50) throw new Error('too short');
            const res = await session.run({ [input]: new ort.Tensor('float32', f.data, [1, f.frames, 80]) });
            return unit(Float32Array.from(res[output].data));
          });
          queue = job.catch(() => {});
          return job;
        }
      };
      if (vid.onProgress) vid.onProgress(100);
      return vid.engine;
    })().catch((e) => { vid.loading = null; throw e; });
    return vid.loading;
  }
  const voiceIdOn = () => !!(backend.voiceId && state.voicePrint);
  const spaced = (d) => String(d || '').split('').join(', ');

  // Microphone -> 16 kHz mono Float32 chunks (what the speaker model expects)
  function pcmTap(ctx, src, onChunk) {
    const ratio = ctx.sampleRate / 16000;
    const node = ctx.createScriptProcessor(4096, 1, 1);
    let carry = 0;
    node.onaudioprocess = (e) => {
      const input = e.inputBuffer.getChannelData(0);
      const out = [];
      let pos = carry;
      while (pos + ratio <= input.length) {
        let sum = 0, n = 0;
        // pos can start just before this buffer (left over from the last one); skip those samples
        for (let j = Math.max(0, Math.floor(pos)); j < Math.min(input.length, Math.floor(pos + ratio)); j++) { sum += input[j]; n++; }
        out.push(n ? Math.max(-1, Math.min(1, sum / n)) : 0);
        pos += ratio;
      }
      carry = pos - input.length;
      if (out.length) onChunk(Float32Array.from(out));
    };
    const mute = ctx.createGain(); mute.gain.value = 0;
    src.connect(node); node.connect(mute); mute.connect(ctx.destination);
    return () => { try { src.disconnect(node); node.disconnect(); mute.disconnect(); } catch (e) {} };
  }
  // Keeps only the chunks where someone is speaking, so silence doesn't dilute the voiceprint
  function speechCollector(maxSecs) {
    const parts = []; let n = 0; const cap = maxSecs ? maxSecs * 16000 : Infinity;
    return {
      push(chunk) {
        let s = 0; for (let i = 0; i < chunk.length; i++) s += chunk[i] * chunk[i];
        if (Math.sqrt(s / chunk.length) < 0.015 || n >= cap) return;
        parts.push(chunk); n += chunk.length;
      },
      secs: () => n / 16000,
      audio() { const o = new Float32Array(n); let k = 0; parts.forEach(p => { o.set(p, k); k += p.length; }); return o; }
    };
  }
  // Scores how much the live voice matches the saved voiceprint (cosine similarity, about 0 to 1)
  function voiceScorer(engine) {
    const col = speechCollector(VERIFY_MAX_SECS);
    return {
      push: (c) => col.push(c),
      finish: async () => {
        if (col.secs() < VERIFY_MIN_SECS) return null;
        try { return cosine(await engine.embed(col.audio()), printFromB64(state.voicePrint)); } catch (e) { return null; }
      }
    };
  }

  function setEnrollBar(pct) {
    const bar = document.getElementById('enroll-bar'); if (bar) bar.style.width = pct + '%';
    const lbl = document.getElementById('enroll-pct'); if (lbl) lbl.textContent = pct + '%';
  }
  async function startEnroll(d) {
    stopListening(); stopSpeaking();
    d.stage = 'loading'; d.pct = 0; renderOv();
    let stream, ctx, stopTap, timer, finished = false;
    const cleanup = () => {
      clearInterval(timer);
      try { stopTap && stopTap(); } catch (e) {}
      try { stream && stream.getTracks().forEach(tr => tr.stop()); } catch (e) {}
      try { ctx && ctx.close(); } catch (e) {}
      enrollSession = null; vid.onProgress = null;
    };
    const fail = (e) => { if (finished) return; finished = true; cleanup(); d.stage = 'error'; d.err = (e && e.message) || String(e); renderOv(); };
    enrollSession = { cancel: () => { finished = true; cleanup(); } };
    try {
      vid.onProgress = (pct) => { d.pct = pct; setEnrollBar(pct); };
      const engine = await vidEngine();
      if (finished) return;
      stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const src = ctx.createMediaStreamSource(stream);
      const col = speechCollector();
      d.stage = 'rec'; d.pct = 0; renderOv();
      enrollSession = { cancel: () => { finished = true; cleanup(); } };
      stopTap = pcmTap(ctx, src, (c) => col.push(c));
      timer = setInterval(async () => {
        if (finished) return;
        const pct = Math.min(100, Math.round(col.secs() / ENROLL_SECS * 100));
        d.pct = pct; setEnrollBar(pct);
        if (pct < 100) return;
        finished = true; cleanup();
        d.stage = 'saving'; renderOv();
        try {
          // Three slices of speech -> three voiceprints -> averaged into one
          const audio = col.audio(), part = Math.floor(audio.length / 3);
          const prints = [];
          for (let i = 0; i < 3; i++) prints.push(await engine.embed(audio.slice(i * part, (i + 1) * part)));
          // If the three parts don't sound like one person (noise, TV, someone else talking), ask to redo it
          const agree = Math.min(cosine(prints[0], prints[1]), cosine(prints[0], prints[2]), cosine(prints[1], prints[2]));
          if (!(agree >= ENROLL_MIN_AGREE)) throw new Error(t('enrollNoisy'));
          const acc = new Float32Array(prints[0].length);
          prints.forEach(e => { for (let j = 0; j < e.length; j++) acc[j] += e[j]; });
          state.voicePrint = printToB64(unit(acc)); state.voicePrintV = 2; persist();
          d.stage = 'done'; renderOv(); render();
        } catch (e) { finished = false; fail(e); }
      }, 200);
    } catch (e) { fail(e); }
  }

  function ovEnroll(el, d) {
    const leave = async () => {
      if (enrollSession) enrollSession.cancel();
      closeOv();
      if (d.resume && state.voicePrint) return confirmWith(d.resume.p, d.resume.text);
      if (d.resume) return reply(R('cancelled'));
      if (d.fromOnboard) reply(R('welcome'));
    };
    const sentences = h('div', { class: 'kv', style: 'padding:6px 16px' }, (T.sentences[state.lang] || T.sentences.en).map(s => h('p', { style: 'margin:10px 0;font-size:16px;font-weight:600;line-height:1.45', text: s })));
    if (d.stage === 'done') {
      return pageWrap(el, t('vidTitle'), leave, [
        h('div', { class: 'done' }, h('span', { class: 'ok' }, icon('check', 30, 2.4)), h('h1', { text: t('enrollDoneT') }), h('p', { style: 'margin:0;color:var(--text2)', text: t('enrollDoneB') }))],
        [h('button', { class: 'btn p', type: 'button', onClick: leave, text: t('done') })]);
    }
    if (d.stage === 'error') {
      return pageWrap(el, t('vidTitle'), leave, [
        h('div', { class: 'done' }, h('span', { class: 'ok', style: 'background:var(--danger-bg);color:var(--danger)' }, icon('alert', 30)), h('h1', { text: t('enrollErr') }), h('p', { style: 'margin:0;color:var(--text2);font-size:14px', text: d.err || '' }))],
        [h('button', { class: 'btn p', type: 'button', onClick: () => startEnroll(d), text: t('tryAgain') }), h('button', { class: 'btn s', type: 'button', onClick: leave, text: d.fromOnboard ? t('skip') : t('cancel') })]);
    }
    if (d.stage === 'rec' || d.stage === 'loading' || d.stage === 'saving') {
      const head = d.stage === 'loading' ? t('vidLoading') : d.stage === 'saving' ? t('enrollSaving') : t('enrollRec');
      return pageWrap(el, t('vidTitle'), leave, [
        h('h2', { style: 'margin:4px 0 0;font-size:22px;font-weight:800;letter-spacing:-0.02em', text: head }),
        h('div', { style: 'display:flex;align-items:center;gap:12px' },
          h('div', { class: 'bar', style: 'flex:1;height:10px' }, h('i', { id: 'enroll-bar', style: 'width:' + (d.pct || 0) + '%' })),
          h('b', { id: 'enroll-pct', class: 'num', text: (d.pct || 0) + '%' })),
        d.stage === 'loading' ? h('p', { style: 'margin:0;color:var(--text2)', text: t('vidDownload') }) : sentences,
        d.stage === 'rec' ? h('p', { class: 'heard', text: t('enrollKeep') }) : null],
        [h('button', { class: 'btn s', type: 'button', onClick: leave, text: t('cancel') })]);
    }
    pageWrap(el, t('vidTitle'), leave, [
      h('span', { class: 'gtile', style: 'background:var(--tint);color:var(--primary);width:56px;height:56px;border-radius:16px' }, icon('wave', 28)),
      h('h2', { style: 'margin:0;font-size:24px;font-weight:800;letter-spacing:-0.02em;line-height:1.25', text: t('enrollT') }),
      h('p', { style: 'margin:0;color:var(--text2)', text: t('enrollIntro') }),
      sentences,
      h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('lock', 18)), h('div', null, h('b', { text: t('enrollPrivT') }), h('span', { text: t('enrollPriv') })))],
      [h('button', { class: 'btn p', type: 'button', onClick: () => startEnroll(d) }, icon('mic', 20), t('start')),
        h('button', { class: 'btn s', type: 'button', onClick: leave, text: d.fromOnboard ? t('skip') : t('cancel') })]);
  }

  // ---------- speech in ----------
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let listening = false, rec = null, mediaRec = null, chunks = [], stopTimer = null, vad = null;
  let micDenied = false, emptyRuns = 0;

  function engineText() {
    const parts = [];
    parts.push(SR && !(state.hearSpitch && backend.ok) ? 'English/Pidgin: phone' : (backend.ok ? 'English/Pidgin: Spitch' : 'English/Pidgin: typing only'));
    parts.push(backend.sttYo ? 'Yorùbá, Hausa, Igbo: Spitch' : 'Yorùbá, Hausa, Igbo: typing (connect Spitch for voice)');
    if (backend.ttsPcm) parts.push('Pidgin replies: Spitch');
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
  const spitchLang = () => ['yo', 'ha', 'ig'].includes(state.lang);
  function canListen() { return !micDenied && (spitchLang() ? backend.ok : (SR || backend.ok)); }

  function startListening() {
    if (listening || vid.starting) return;
    stopSpeaking();
    if (pending && pending.needsPhrase && voiceIdOn() && backend.ok) {
      vid.starting = true;
      status(t('vidLoading'));
      return vidEngine().then((engine) => { vid.starting = false; startRecording({ verify: engine }); })
        .catch(() => { vid.starting = false; status(t('vidErrShort')); startRecording(); });
    }
    if (spitchLang()) { if (backend.ok) return startRecording(); status(t('needsSpitchLang')); return showOv('type'); }
    if (SR && !(state.hearSpitch && backend.ok)) return startBrowserSR();
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

  async function startRecording(opts) {
    opts = opts || {};
    let scorer = null, stopTap = null;
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
      if (opts.verify) { scorer = voiceScorer(opts.verify); stopTap = pcmTap(ctx, src, scorer.push); }
      mr.addEventListener('stop', () => { clearInterval(vad); if (stopTap) stopTap(); ctx.close(); });
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
        const lang = spitchLang() ? state.lang : 'en';
        const res = await fetch('api/transcribe?lang=' + lang, { method: 'POST', headers: { 'Content-Type': blob.type.split(';')[0] }, body: blob });
        const j = await res.json();
        if (!res.ok || !j.text) throw new Error(j.error || 'no text');
        const voice = scorer ? { score: await scorer.finish() } : null;
        busy = false; showListen(null);
        handle(j.text, { via: 'voice', voice });
      } catch (e) { busy = false; showListen(null); status(t('voiceErr')); afterReply(); }
    };
    mr.start();
    setLive(true);
    stopTimer = setTimeout(() => { if (mr.state === 'recording') mr.stop(); }, 15000);
  }

  // Scores how well Vosa understood a transcript, so the best of several guesses can be picked.
  function understandingScore(text) {
    const r = L.understand(text, { contacts: state.contacts, helpers: (state.helpers || []).map(x => x.name), awaiting: awaiting && awaiting.slot, pending: !!pending });
    let sc = 0;
    if (r.intent && r.intent !== 'unknown') sc += 4;
    if (r.amount) sc += 2;
    if (r.contact || r.goal || r.account || r.bank) sc += 1;
    return sc;
  }
  function bestAlternative(alts) {
    let best = alts[0], bestScore = -1;
    for (const a of alts) { const sc = understandingScore(a); if (sc > bestScore) { best = a; bestScore = sc; } }
    return best;
  }

  let srRetries = 0;
  function startBrowserSR() {
    const r = new SR();
    rec = r;
    r.lang = state.lang === 'yo' ? 'yo-NG' : 'en-NG';
    r.interimResults = true;
    r.maxAlternatives = 5;
    r.continuous = true; // keep listening through short pauses; we end it ourselves after silence
    const finals = [];           // one entry per final result: the list of alternatives
    let interim = '', gotError = false, sawSpeech = false, silence = null, hardStop = null;
    const endSoon = (ms) => { clearTimeout(silence); silence = setTimeout(() => { try { r.stop(); } catch (e) {} }, ms); };
    r.onresult = (e) => {
      interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) {
          const alts = [];
          for (let k = 0; k < res.length; k++) { const tx = (res[k].transcript || '').trim(); if (tx && !alts.includes(tx)) alts.push(tx); }
          if (alts.length) finals.push(alts);
        } else interim += res[0].transcript;
      }
      sawSpeech = true;
      const shown = finals.map(a => a[0]).concat(interim ? [interim] : []).join(' ').trim();
      $('live-text').textContent = shown ? '“' + shown + '”' : '';
      // After a final result, wait a short moment for more; after interim text, wait a little longer.
      endSoon(finals.length && !interim ? 900 : 1600);
    };
    r.onspeechstart = () => { sawSpeech = true; };
    r.onerror = (e) => {
      if (['not-allowed', 'service-not-allowed', 'audio-capture', 'language-not-supported'].includes(e.error)) { gotError = true; micDenied = true; voiceUnavailable(); }
      else if (e.error === 'no-speech') { /* handled in onend: we restart quietly */ }
      else if (e.error !== 'aborted') { gotError = true; status(t('voiceErr')); }
    };
    r.onend = () => {
      clearTimeout(silence); clearTimeout(hardStop);
      if (rec === r) rec = null;
      listening = false; $('mic').classList.remove('live'); showListen(null);
      if (micDenied) return;
      // Build the best sentence from the alternatives the phone offered
      const text = finals.length ? (finals.length === 1 ? bestAlternative(finals[0]) : finals.map(a => a[0]).join(' ')) : interim.trim();
      if (text) { srRetries = 0; emptyRuns = 0; handle(text, { via: 'voice' }); return; }
      // Nothing heard. Phones often give up before the person starts talking: listen again, quietly.
      if (!gotError && !sawSpeech && srRetries < 2 && !state.handsFree) { srRetries++; status(t('goAhead')); return startBrowserSR(); }
      srRetries = 0;
      if (state.handsFree) { emptyRuns++; if (emptyRuns < 30) afterReply(); }
      else if (!gotError) status(t('voiceErr'));
    };
    try { r.start(); setLive(true); hardStop = setTimeout(() => { try { r.stop(); } catch (e) {} }, 14000); } catch (e) { micDenied = true; voiceUnavailable(); }
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

  // ---------- Trusted Circle ----------
  // The phone keeps the main copy of the account. When a helper is set up, Vosa uploads a
  // snapshot after each change and checks every few seconds for things that happened elsewhere
  // (a helper's decision, a payment by a helper).
  const ROLE_ICON = { watcher: 'eye', approver: 'shield', spender: 'wallet' };
  const roleName = (r) => t('role' + r[0].toUpperCase() + r.slice(1));
  const helperBy = (token) => (state.helpers || []).find(x => x.token === token);
  const capName = (s) => String(s || '').trim().replace(/\s+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  const joinNames = (a) => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' ' + t('and') + ' ' + a[a.length - 1];
  const cloud = { timer: null, syncing: false, dirty: false, pollTimer: null, waiting: null };
  const cloudOn = () => backend.db && ((state.helpers || []).some(x => !x.local));

  async function circleApi(action, body, get) {
    const url = 'api/circle?action=' + action + (get ? '&' + new URLSearchParams(body) : '');
    const r = await fetch(url, get ? { cache: 'no-store' } : { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ action }, body)) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.message || j.error || ('HTTP ' + r.status)); e.code = j.error; throw e; }
    return j;
  }
  async function sha256(s) {
    if (!(window.crypto && crypto.subtle)) return null;
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  }
  async function snapshot() {
    // The secret phrase never leaves the phone as text: only a fingerprint (hash),.
    const words = L.norm(state.secret).split(/\s+/).filter(Boolean);
    return {
      name: state.myName || 'Vosa user', lang: state.lang, wallet: state.wallet, account: state.account, myPhone: state.myPhone, myNetwork: state.myNetwork,
      goals: state.goals.map(g => ({ key: g.key, name: g.name, bal: g.bal, target: g.target, deadline: g.deadline })),
      contacts: state.contacts, activity: state.activity.slice(0, 12),
      secretHash: await sha256(words.join(' ')), secretWords: words.length,
      approveOver: state.approveOver,
      helpers: (state.helpers || []).filter(x => !x.local).map(x => ({ token: x.token }))
    };
  }
  function scheduleSync() {
    if (!cloudOn()) return;
    clearTimeout(cloud.timer);
    cloud.timer = setTimeout(() => { syncNow(); }, 1200);
  }
  async function syncNow() {
    if (!cloudOn()) return;
    if (cloud.syncing) { cloud.dirty = true; return; }
    cloud.syncing = true;
    try {
      const j = await circleApi('sync', { ownerId: state.ownerId, snap: await snapshot() });
      if (!j.ok && j.events) applyEvents(j.events); // apply what happened elsewhere first, then upload again
    } catch (e) { /* offline: try again on the next change or poll */ }
    finally { cloud.syncing = false; if (cloud.dirty) { cloud.dirty = false; scheduleSync(); } }
  }
  function startPolling(ms) {
    clearInterval(cloud.pollTimer);
    cloud.pollTimer = setInterval(pollNow, ms || 4000);
  }
  async function pollNow() {
    const w = cloud.waiting;
    if (w && !w.sim && Date.now() - w.started > 10 * 60e3) return resolveApproval('timeout');
    if (!cloudOn() || (document.hidden && !w)) return;
    try {
      const j = await circleApi('poll', { ownerId: state.ownerId }, true);
      if (j.events && j.events.length) applyEvents(j.events);
      if (cloud.waiting && cloud.waiting.id) {
        const rq = (j.reqs || []).find(x => x.id === cloud.waiting.id);
        if (rq && rq.status !== 'pending') resolveApproval(rq.status, rq.by);
      }
      let changed = false;
      for (const hs of j.helpers || []) {
        const hh = helperBy(hs.token);
        if (hh && hs.status !== 'removed' && hh.status !== hs.status) { hh.status = hs.status; changed = true; }
        if (hh && hs.lastView && hs.lastView !== hh.lastView) { hh.lastView = hs.lastView; changed = true; }
      }
      if (changed) { persist(); if (state.view === 'settings') render(); }
    } catch (e) { /* offline */ }
  }
  function logCircle(e) { state.circleLog = [e].concat(state.circleLog || []).slice(0, 30); }
  function applyEvents(events) {
    const seen = state.seenEvents || (state.seenEvents = []);
    const msgs = [], ids = [];
    for (const ev of events) {
      ids.push(ev.id);
      if (seen.includes(ev.id)) continue;
      seen.push(ev.id);
      if (ev.type === 'tx') { const m = applyRemoteTx(ev.tx); if (m) msgs.push(m); }
      else if (ev.type === 'view') logCircle({ kind: 'view', name: ev.name, at: ev.at });
      else if (ev.type === 'helper') {
        const hh = helperBy(ev.token);
        if (hh && hh.status !== ev.status) { hh.status = ev.status; msgs.push(R('helperJoined', { name: hh.name, role: roleName(hh.role).toLowerCase() })); }
      } else if (ev.type === 'decision') {
        logCircle({ kind: ev.status, name: ev.by, at: ev.at });
        if (ev.origin === 'app' && cloud.waiting && cloud.waiting.id === ev.reqId) resolveApproval(ev.status, ev.by);
      }
    }
    state.seenEvents = seen.slice(-80);
    persist(); render();
    circleApi('ack', { ownerId: state.ownerId, ids }).then(() => scheduleSync()).catch(() => {});
    if (msgs.length) reply(msgs.join(' '));
  }
  // A money movement made away from the phone: by a helper with spending rights.
  function applyRemoteTx(tx) {
    const amt = Math.round(tx.amount || 0);
    const via = 'helper';
    if (tx.type === 'send' || tx.type === 'airtime') state.wallet = Math.max(0, state.wallet - amt);
    let g = null;
    if (tx.type === 'save' || tx.type === 'withdraw') {
      g = findRef(tx.goal || { key: 'flex' }) || findGoal('flex');
      if (!g) return null;
      if (tx.type === 'save') { state.wallet -= amt; g.bal += amt; } else { g.bal = Math.max(0, g.bal - amt); state.wallet += amt; }
    }
    const base = { amt, via, by: tx.by || null };
    if (tx.type === 'send') logAct(Object.assign(base, { kind: 'send', n: tx.to.name, detail: tx.to.bank + ' •••• ' + String(tx.to.acct).slice(-4) }));
    if (tx.type === 'airtime') logAct(Object.assign(base, { kind: 'airtime', n: tx.net, detail: tx.who }));
    if (tx.type === 'save') logAct(Object.assign(base, { kind: 'save', g: gref(g) }));
    if (tx.type === 'withdraw') logAct(Object.assign(base, { kind: 'move', g: gref(g) }));
    return R('helperPaid', { name: tx.by, amt: fmt(amt), to: tx.to ? tx.to.name : '', wallet: fmt(state.wallet) });
  }

  // ----- approvals -----
  function approversFor(p) {
    const ap = (state.helpers || []).filter(x => x.role === 'approver' && x.status === 'active');
    const known = state.contacts.some(c => c.acct === p.to.acct) || state.activity.some(a => a.kind === 'send' && a.n === p.to.name);
    if (!ap.length) return { list: [], isNew: !known };
    const big = p.amount >= (state.approveOver || 20000);
    const isNewBig = !known && p.amount >= 5000;
    return { list: big || isNewBig ? ap : [], isNew: !known };
  }
  async function askApproval(p, info) {
    const names = joinNames(info.list.map(x => x.name));
    const live = backend.db && info.list.some(x => !x.local);
    cloud.waiting = { id: null, p, names, started: Date.now(), sim: !live, isNew: info.isNew, kind: info.kind || 'send' };
    showOv('approval');
    if (p.type === 'withdraw') reply(R('askedHelperW', { amt: fmt(p.amount), goal: label(p.goal), names }));
    else reply(R('askedHelper', { amt: fmt(p.amount), why: info.isNew ? R('whyNew') : '', names }));
    if (!live) return;
    try {
      await syncNow();
      const req = p.type === 'withdraw' ? { amount: p.amount, to: null, kind: 'withdraw', goal: gref(p.goal), goalName: label(p.goal, 'en'), emergency: true }
        : { amount: p.amount, to: p.to, kind: 'send', newRecipient: info.isNew };
      const j = await circleApi('request', { ownerId: state.ownerId, req });
      if (cloud.waiting && cloud.waiting.p === p) cloud.waiting.id = j.id;
      startPolling(2000);
    } catch (e) {
      if (cloud.waiting && cloud.waiting.p === p) { cloud.waiting.sim = true; cloud.waiting.offline = true; renderOv(); }
    }
  }
  function resolveApproval(status, by) {
    const w = cloud.waiting;
    if (!w) return;
    cloud.waiting = null;
    startPolling();
    if (status === 'cancelled') return;
    const name = by || w.names;
    if (status === 'approved') { w.p.approved = true; w.p.approvedBy = name; pending = w.p; return execute(); }
    const text = status === 'declined' ? R('helperDeclined', { name }) : R('helperTimeout', { names: w.names });
    return fail({ tone: 'err', icon: 'shield', title: text, actions: [okAction()] }, text);
  }
  function cancelApproval() {
    const w = cloud.waiting;
    if (!w) return closeOv();
    cloud.waiting = null; startPolling();
    if (w.id) circleApi('cancel', { ownerId: state.ownerId, reqId: w.id }).catch(() => {});
    closeOv(); reply(R('cancelled'));
  }
  function ovApproval(el) {
    const w = cloud.waiting;
    if (!w) { el.hidden = true; return; }
    const p = w.p;
    const isW = p.type === 'withdraw';
    const to = isW ? '' : p.to.name + ' · ' + p.to.bank + ' ••' + String(p.to.acct).slice(-4);
    const kids = [sheetHead(t('waitingFor', { n: w.names }), cancelApproval),
      h('div', { class: 'big-amt' }, h('span', { text: isW ? t('takeOutOf', { g: label(p.goal) }) : t('sendTo') + ' ' + to }), h('b', { class: 'num', text: fmt(p.amount) })),
      w.isNew ? h('div', { class: 'checks' }, h('span', { class: 'hp-chip' }, icon('alert', 14), t('newRecipient'))) : null,
      isW ? h('div', { class: 'checks' }, h('span', { class: 'hp-chip' }, icon('alert', 14), t('emergencyChip'))) : null,
      vsay()];
    if (w.sim) {
      // Demo mode (no database yet): the helper's phone is shown here instead.
      kids.push(h('div', { class: 'hp-notif', role: 'group', 'aria-label': t('demoPhone', { n: w.names }) },
        h('div', { class: 'hp-notif-h' }, icon('phone', 16), h('span', { text: t('demoPhone', { n: w.names }) })),
        h('b', { text: isW ? t('demoAskW', { n: state.myName || t('someone'), a: fmt(p.amount), g: label(p.goal) }) : t('demoAsk', { a: fmt(p.amount), to: p.to.name }) }),
        w.offline ? h('span', { class: 'd', text: t('offlineDemo') }) : null,
        h('div', { class: 'row2' },
          h('button', { class: 'btn d', type: 'button', onClick: () => resolveApproval('declined', w.names.split(/,| and /)[0]) }, t('decline')),
          h('button', { class: 'btn p', type: 'button', onClick: () => resolveApproval('approved', w.names.split(/,| and /)[0]) }, t('approve')))));
    } else {
      kids.push(h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('shield', 18)),
        h('div', null, h('b', null, t('waitBodyT'), h('span', { class: 'dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i'))), h('span', { text: t('waitBody', { n: w.names }) }))));
    }
    kids.push(h('button', { class: 'btn s', type: 'button', onClick: cancelApproval, text: t('cancelTransfer') }));
    sheetWrap(el, kids, () => {});
  }

  // ---------- Voice Promise ----------
  // The person records, in their own voice, why a savings goal matters. If they later try to take money out
  // before the goal is reached, Vosa plays it back and asks whether it is an emergency. Emergencies go to a
  // trusted helper to approve (who can phone them first); without a helper the money is held for 24 hours.
  // Recordings stay on the phone.
  const PROMISE_MAX = 20, PROMISE_MIN = 1.5;
  let promiseRec = null, promiseAudio = null;
  const timeLabel = (ms) => new Date(ms).toLocaleString('en-NG', { weekday: 'short', hour: 'numeric', minute: '2-digit' });
  function promiseGate(g, amount) {
    const reached = g.target && g.bal >= g.target;
    const past = g.deadline && parseYmd(g.deadline) < new Date();
    if (g.hold) { if (Date.now() >= g.hold.until) return 'ready'; return 'wait'; }
    if (!g.promise || reached || past) return null;
    return 'play';
  }
  function startPromiseGate(g, amount) {
    pending = { type: 'promiseq', goal: g, amount };
    showOv('promise', { ref: gref(g), stage: 'gate', amount });
    setTimeout(() => playPromise(g), 600);
    return reply(R('promiseGate', { amt: fmt(amount), goal: label(g) }) + R('promiseAsk'));
  }
  function promiseUrl(g) {
    const bin = atob(g.promise.data); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([u], { type: g.promise.type }));
  }
  function stopPromise() { if (promiseAudio) { try { promiseAudio.pause(); } catch (e) {} promiseAudio = null; } }
  async function playPromise(g) {
    if (!g || !g.promise) return;
    stopSpeaking(); stopPromise();
    const a = new Audio(promiseUrl(g)); promiseAudio = a;
    const el = document.getElementById('promise-wave'); if (el) el.classList.add('live');
    await new Promise((resolve) => { a.onended = resolve; a.onerror = resolve; a.play().catch(resolve); });
    if (el) el.classList.remove('live');
    if (promiseAudio === a) promiseAudio = null;
  }
  async function recordPromise(d) {
    let stream;
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: true }); }
    catch (e) { micDenied = true; closeOv(); return voiceUnavailable(); }
    stopSpeaking();
    const type = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'].find(x => MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(x)) || '';
    const mr = new MediaRecorder(stream, type ? { mimeType: type } : undefined);
    const chunks = []; const started = Date.now();
    mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    const done = new Promise((resolve) => { mr.onstop = resolve; });
    promiseRec = { stop: () => { if (mr.state === 'recording') mr.stop(); }, cancel: () => { mr.discard = true; if (mr.state === 'recording') mr.stop(); } };
    d.stage = 'rec'; d.secs = 0; renderOv();
    const tick = setInterval(() => { d.secs = Math.round((Date.now() - started) / 1000); const el = document.getElementById('promise-secs'); if (el) el.textContent = d.secs + 's'; if (d.secs >= PROMISE_MAX) promiseRec.stop(); }, 250);
    try { mr.start(); } catch (e) { clearInterval(tick); stream.getTracks().forEach(t => t.stop()); d.stage = 'intro'; d.err = t('voiceErr'); return renderOv(); }
    await done;
    clearInterval(tick); stream.getTracks().forEach(t => t.stop());
    promiseRec = null;
    if (mr.discard) return;
    const secs = (Date.now() - started) / 1000;
    const blob = new Blob(chunks, { type: mr.mimeType || type || 'audio/webm' });
    if (secs < PROMISE_MIN || blob.size < 1500) { d.stage = 'intro'; d.err = t('promiseTooShort'); return renderOv(); }
    const b64 = await new Promise((resolve) => { const fr = new FileReader(); fr.onload = () => resolve(String(fr.result).split(',')[1]); fr.readAsDataURL(blob); });
    d.draft = { data: b64, type: blob.type, at: Date.now(), secs: Math.round(secs) };
    d.stage = 'review'; d.err = null; renderOv();
    const g = findRef(d.ref); const tmp = { promise: d.draft };
    setTimeout(() => playPromise(tmp), 300);
  }
  function ovPromise(el, d) {
    const g = findRef(d.ref);
    if (!g) return closeOv();
    const leave = () => { if (promiseRec) promiseRec.cancel(); stopPromise(); closeOv(); if (d.back) showOv('pot', { ref: d.back }); };
    const wave = h('div', { id: 'promise-wave', class: 'pwave', 'aria-hidden': 'true' }, [1, 2, 3, 4, 5, 6, 7].map(() => h('i')));
    if (d.stage === 'gate') {
      const answer = (yes) => { if (!pending || pending.type !== 'promiseq') return; stopPromise(); if (yes) { lastHeard = t('yesEmergency'); execute(); } else cancelPending(); };
      return pageWrap(el, t('yourPromise', { g: label(g) }), null, [
        h('div', { class: 'done', style: 'padding-top:8px' }, h('span', { class: 'ok' }, icon('mic', 30)), h('h1', { text: t('takeOutOf', { g: label(g) }) }), h('span', { class: 'amt num', text: fmt(d.amount) })),
        h('div', { class: 'lockrow', style: 'flex-direction:column;align-items:stretch;gap:10px' }, h('div', { style: 'display:flex;align-items:center;gap:12px' }, h('span', { class: 'lk' }, icon('speaker', 18)), h('div', { style: 'flex:1' }, h('b', { text: t('yourPromise', { g: label(g) }) }), h('span', { text: t('promiseRow', { d: new Date(g.promise.at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) }) })),
          h('button', { class: 'link', type: 'button', text: t('promiseAgain'), onClick: () => playPromise(g) })), wave),
        h('h2', { style: 'margin:8px 0 0;font-size:22px;font-weight:800;letter-spacing:-0.02em;text-align:center', text: t('promiseQ') }),
        vsay()],
        [h('div', { class: 'row2' }, h('button', { class: 'btn s', type: 'button', onClick: () => answer(false), text: t('noKeep') }), h('button', { class: 'btn d', type: 'button', onClick: () => answer(true), text: t('yesEmergency') }))]);
    }
    if (d.stage === 'listen') {
      return pageWrap(el, t('yourPromise', { g: label(g) }), leave, [
        h('div', { class: 'done', style: 'padding-top:8px' }, h('span', { class: 'ok' }, icon('speaker', 30)), h('h1', { text: label(g) }), h('span', { style: 'color:var(--text2);font-size:14px', text: t('promiseRow', { d: new Date(g.promise.at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short' }) }) })),
        wave],
        [h('button', { class: 'btn p', type: 'button', onClick: () => playPromise(g) }, icon('speaker', 20), t('promiseAgain')),
         h('button', { class: 'btn s', type: 'button', onClick: () => { stopPromise(); d.stage = 'intro'; renderOv(); }, text: t('promiseRedo') }),
         h('button', { class: 'btn s', type: 'button', onClick: leave, text: t('done') })]);
    }
    if (d.stage === 'rec') {
      return pageWrap(el, t('promiseT'), leave, [
        h('h2', { style: 'margin:4px 0 0;font-size:22px;font-weight:800;letter-spacing:-0.02em', text: t('promiseRecording') }),
        h('div', { style: 'display:flex;align-items:center;gap:14px' }, Object.assign(wave, { className: 'pwave live' }), h('b', { id: 'promise-secs', class: 'num', style: 'font-size:22px', text: (d.secs || 0) + 's' })),
        h('p', { class: 'heard', text: R('promiseIntro') })],
        [h('button', { class: 'btn p', type: 'button', onClick: () => promiseRec && promiseRec.stop() }, icon('stop', 20), t('stopLbl')), h('button', { class: 'btn s', type: 'button', onClick: leave, text: t('cancel') })]);
    }
    if (d.stage === 'review') {
      const tmp = { promise: d.draft };
      const keep = () => { stopPromise(); g.promise = d.draft; persist(); render(); closeOv(); if (d.back) showOv('pot', { ref: d.back }); reply(R('promiseSaved', { goal: label(g) })); };
      return pageWrap(el, t('promiseT'), leave, [
        h('h2', { style: 'margin:4px 0 0;font-size:22px;font-weight:800;letter-spacing:-0.02em', text: t('promiseReview') }),
        h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('speaker', 18)), h('div', { style: 'flex:1' }, h('b', { text: t('yourPromise', { g: label(g) }) }), h('span', { text: d.draft.secs + 's' })), h('button', { class: 'link', type: 'button', text: t('promiseAgain'), onClick: () => playPromise(tmp) })),
        wave],
        [h('button', { class: 'btn p', type: 'button', onClick: keep }, icon('check', 20), t('promiseKeep')), h('button', { class: 'btn s', type: 'button', onClick: () => recordPromise(d), text: t('promiseRedo') })]);
    }
    // intro
    return pageWrap(el, t('promiseT'), leave, [
      h('div', { class: 'done', style: 'padding-top:8px' }, h('span', { class: 'ok' }, icon('mic', 30)), h('h1', { text: label(g) }), h('span', { style: 'color:var(--text2);font-size:14px', text: g.target ? fmt(g.target) + (g.deadline ? ' · ' + L.dateLabel(parseYmd(g.deadline)) : '') : '' })),
      h('p', { style: 'margin:0;color:var(--text2)', text: t('promiseWhy') }),
      h('div', { class: 'vsay' }, h('span', { style: 'flex:0 0 auto' }, logoMark(22)), h('p', { text: R('promiseIntro') }), h('button', { type: 'button', 'aria-label': t('replayAria'), onClick: () => speak(R('promiseIntro'), state.lang, true) }, icon('speaker', 20))),
      d.err ? h('p', { class: 'tries', role: 'alert', text: d.err }) : null],
      [h('button', { class: 'btn p', type: 'button', onClick: () => recordPromise(d) }, icon('mic', 20), t('promiseRec')), h('button', { class: 'btn s', type: 'button', onClick: leave, text: g.promise ? t('cancel') : t('notNow') })]);
  }

  // ----- managing helpers -----
  const randHex = (n) => Array.from(crypto.getRandomValues(new Uint8Array(n))).map(b => b.toString(16).padStart(2, '0')).join('');
  function ovHelperForm(el, d) {
    d.role = d.role || 'approver'; d.limit = d.limit || 30000;
    if (d.myName == null) d.myName = state.myName || '';
    const field = (id, labelText, key, attrs) => h('div', null, h('label', { class: 'lbl', for: id, text: labelText }),
      h('input', Object.assign({ class: 'field', id, value: d[key] || '', onInput: (e) => { d[key] = e.target.value; } }, attrs || {})));
    const roles = h('div', { role: 'radiogroup', 'aria-label': t('whatCanTheyDo'), style: 'display:flex;flex-direction:column;gap:8px' },
      ['approver', 'watcher', 'spender'].map(r => h('button', { class: 'lang-row', type: 'button', role: 'radio', 'aria-checked': String(d.role === r), onClick: () => { d.role = r; renderOv(); } },
        h('span', { class: 'gtile', style: 'background:var(--tint);color:var(--primary);width:40px;height:40px' }, icon(ROLE_ICON[r], 20)),
        h('div', { style: 'flex:1;min-width:0' }, h('b', { text: roleName(r) }), h('span', { text: t('role' + r[0].toUpperCase() + r.slice(1) + 'D') })),
        h('span', { class: 'radio', 'aria-hidden': 'true' }))));
    const err = d.err ? h('p', { class: 'tries', role: 'alert', text: d.err }) : null;
    pageWrap(el, t('addHelper'), closeOv, [
      h('p', { style: 'margin:0;color:var(--text2)', text: t('circleDesc') }),
      !backend.db ? h('div', { class: 'notice', role: 'note' }, icon('alert', 18), h('div', null, h('b', { text: t('demoModeT') }), h('span', { text: t('demoBanner') }))) : null,
      field('hf-name', t('helperName'), 'name', { autocomplete: 'off', placeholder: 'Bisi' }),
      h('div', null, h('span', { class: 'lbl', text: t('whatCanTheyDo') }), roles),
      d.role === 'spender' ? h('div', null, h('span', { class: 'lbl', text: t('monthlyLimit') }),
        seg(t('monthlyLimit'), [[10000, '₦10k'], [30000, '₦30k'], [50000, '₦50k']], d.limit, (v) => { d.limit = v; renderOv(); })) : null,
      backend.db ? field('hf-phone', t('helperPhone'), 'phone', { type: 'tel', inputmode: 'tel', autocomplete: 'off', placeholder: '0803 000 0000' }) : null,
      field('hf-me', t('yourName'), 'myName', { autocomplete: 'name', placeholder: 'Mama Ade' }),
      err,
      h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('lock', 18)), h('div', null, h('b', { text: t('neverT') }), h('span', { text: t('neverB') })))],
      [h('button', { class: 'btn p', type: 'button', disabled: d.busy ? true : null, onClick: () => submitHelper(d) }, icon('shield', 20), d.busy ? t('working') : t('createLink'))]);
  }
  async function submitHelper(d) {
    const name = capName(d.name);
    if (!name) { d.err = t('needName'); return renderOv(); }
    const hp = { token: randHex(16), name, role: d.role, limit: d.role === 'spender' ? d.limit : null, phone: (d.phone || '').trim() || null, status: backend.db ? 'invited' : 'active', local: !backend.db, created: Date.now() };
    if (d.myName && d.myName.trim()) state.myName = capName(d.myName);
    if (backend.db) {
      d.busy = true; d.err = null; renderOv();
      try {
        const j = await circleApi('invite', { ownerId: state.ownerId, ownerName: state.myName || '', helper: hp });
        hp.link = j.link; hp.sms = !!j.sms;
      } catch (e) { d.busy = false; d.err = t('helperErr') + ' (' + e.message + ')'; return renderOv(); }
    }
    state.helpers = (state.helpers || []).concat(hp);
    persist(); syncNow(); startPolling(); render();
    if (!backend.db) {
      const text = R('helperJoined', { name, role: roleName(hp.role).toLowerCase() });
      return fail({ tone: 'ok', icon: 'shield', title: text, body: t('circleDemo'), actions: [okAction()] }, text);
    }
    showOv('helper-link', { token: hp.token });
    return reply(R('helperLink', { name }));
  }
  function ovHelperLink(el, d) {
    const hp = helperBy(d.token);
    if (!hp) { closeOv(); return; }
    const msg = t('shareMsg', { me: state.myName || t('someone'), link: hp.link });
    const copy = async () => { try { await navigator.clipboard.writeText(hp.link); d.copied = true; renderOv(); } catch (e) { const f = document.getElementById('hl-link'); if (f) { f.select(); } } };
    pageWrap(el, t('helperLinkT', { n: hp.name }), closeOv, [
      h('div', { class: 'done', style: 'padding-top:16px' }, h('span', { class: 'ok' }, icon(ROLE_ICON[hp.role], 30)), h('h1', { text: hp.name + ' · ' + roleName(hp.role) })),
      h('p', { style: 'margin:0;color:var(--text2)', text: t('linkInfo', { n: hp.name }) }),
      h('input', { class: 'field', id: 'hl-link', readonly: true, value: hp.link, 'aria-label': t('helperLinkT', { n: hp.name }), onFocus: (e) => e.target.select() }),
      hp.sms ? h('p', { class: 'heard', text: t('smsSent', { n: hp.name }) }) : null,
      navigator.share ? h('button', { class: 'btn p', type: 'button', onClick: () => navigator.share({ title: 'Vosa', text: msg }).catch(() => {}) }, icon('send', 20), t('shareLink')) : null,
      h('a', { class: 'btn o', href: 'https://wa.me/?text=' + encodeURIComponent(msg), target: '_blank', rel: 'noopener', style: 'text-decoration:none' }, t('whatsapp')),
      h('button', { class: 'btn s', type: 'button', onClick: copy }, d.copied ? t('copied') : t('copyLink'))],
      [h('button', { class: 'btn p', type: 'button', onClick: () => { closeOv(); go('settings'); }, text: t('done') })]);
  }
  function removeHelper(hp) {
    state.helpers = (state.helpers || []).filter(x => x.token !== hp.token);
    if (!hp.local && backend.db) circleApi('remove', { ownerId: state.ownerId, token: hp.token }).catch(() => {});
    persist(); syncNow(); render();
  }
  function confirmRemoveHelper(hp) {
    showOv('sheet', { tone: 'warn', icon: 'user', title: t('removeQ', { n: hp.name }), body: t('removeB'), actions: [
      { label: t('cancel'), fn: closeOv },
      { label: t('remove'), primary: true, fn: () => { removeHelper(hp); closeOv(); reply(R('helperRemoved', { name: hp.name })); } }] });
  }
  function circleSummary() {
    const recent = (state.circleLog || []).filter(e => Date.now() - e.at < 7 * 864e5).slice(0, 8);
    return recent.map(e => {
      const d = new Date(e.at);
      const when = d.toLocaleDateString([], { weekday: 'short' }) + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      return t(e.kind === 'view' ? 'logView' : e.kind === 'approved' ? 'logApproved' : 'logDeclined', { n: e.name }) + ' · ' + when;
    });
  }
  function ovCircleLog(el) {
    const lines = circleSummary();
    sheetWrap(el, [sheetHead(t('whoChecked')),
      lines.length ? h('div', { class: 'kv' }, lines.map(l => h('div', null, h('span', { text: l })))) : h('p', { class: 'empty', text: t('noChecks') }),
      h('button', { class: 'btn p', type: 'button', onClick: closeOv, text: t('ok') })]);
  }
  function voicePicker(row) {
    const lang = state.lang, list = backend.voices[lang] || [];
    const cur = chosenVoice(lang) || list[0];
    const cap = (n) => n.charAt(0).toUpperCase() + n.slice(1);
    const sample = (v) => speak(R('voiceSample', { v: cap(v) }), lang, true);
    const pick = seg(t('whichVoice'), list.map(n => [n, cap(n)]), cur, (v) => { state.voices = Object.assign({}, state.voices, { [lang]: v }); persist(); render(); sample(v); });
    pick.style.width = '100%';
    return h('div', { class: 'set', style: 'flex-direction:column;align-items:stretch;gap:10px' },
      h('div', { style: 'display:flex;justify-content:space-between;align-items:center;gap:12px' },
        h('div', { style: 'min-width:0' }, h('b', { text: t('whichVoice') }), h('span', { class: 'd', text: t('whichVoiceD') })),
        h('button', { class: 'link', type: 'button', text: t('hearIt'), onClick: () => sample(cur) })),
      pick);
  }
  function settingsCircle(row) {
    const hs = state.helpers || [];
    const rows = hs.map(hp => row(hp.name, roleName(hp.role) + (hp.limit ? ' (' + fmt(hp.limit) + '/' + t('month') + ')' : '') + ' · ' + (hp.status === 'active' ? t('stActive') : t('stInvited')),
      h('div', { style: 'display:flex;gap:14px;flex:0 0 auto' },
        hp.link && hp.status !== 'active' ? h('button', { class: 'link', type: 'button', text: t('shareLink'), onClick: () => showOv('helper-link', { token: hp.token }) }) : null,
        h('button', { class: 'link', type: 'button', style: 'color:var(--danger)', text: t('remove'), onClick: () => confirmRemoveHelper(hp) }))));
    return h('div', { class: 'group', style: 'margin-top:0' },
      row(t('gCircle'), t('circleDescShort'), null),
      rows,
      row(t('addHelper'), hs.length >= 3 ? t('maxHelpers') : null, hs.length >= 3 ? null : h('button', { class: 'link', type: 'button', text: t('add'), onClick: () => showOv('helper-form', {}) })),
      hs.some(x => x.role === 'approver') ? row(t('approveOver'), t('approveOverD'), seg(t('approveOver'), [[10000, '₦10k'], [20000, '₦20k'], [50000, '₦50k']], state.approveOver, (v) => { state.approveOver = v; persist(); render(); })) : null,
      hs.length ? row(t('whoChecked'), circleSummary()[0] || t('noChecks'), h('button', { class: 'link', type: 'button', text: t('open'), onClick: () => showOv('circle-log') })) : null,
      !backend.db ? row(t('demoModeT'), t('circleDemo'), null) : null);
  }

  // ----- the helper's own page: open a link like vosa.vercel.app/?helper=… -----
  function helperApp(token) {
    document.title = 'Vosa Helper';
    const app = $('app');
    app.textContent = '';
    const root = h('main', { class: 'views', id: 'hp' });
    app.append(root, h('div', { class: 'sr', id: 'announce', 'aria-live': 'assertive' }));
    let data = null, lastJson = '', seenReq = new Set(), msg = '', form = { contact: null, amount: '', note: '' }, busy = false;
    const post = async (action, body) => {
      const r = await fetch('api/circle', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.assign({ action, token }, body)) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.message || 'Something went wrong');
      return j;
    };
    function alertNew() {
      try { navigator.vibrate && navigator.vibrate([250, 120, 250]); } catch (e) {}
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        [0, 0.25].forEach(at => { const o = ctx.createOscillator(), g = ctx.createGain(); o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(ctx.destination); o.start(ctx.currentTime + at); o.stop(ctx.currentTime + at + 0.15); });
      } catch (e) {}
      document.title = '(1) Approval needed · Vosa';
    }
    async function load() {
      try {
        const r = await fetch('api/circle?action=helper&token=' + encodeURIComponent(token), { cache: 'no-store' });
        const j = await r.json().catch(() => ({}));
        data = r.ok ? j : { error: j.message || 'This helper link is not working.' };
      } catch (e) { if (!data) data = { error: 'Can’t reach Vosa. Check your internet connection.' }; }
      const pend = (data.requests || []).filter(x => x.status === 'pending');
      let fresh = false;
      pend.forEach(x => { if (!seenReq.has(x.id)) { seenReq.add(x.id); fresh = true; } });
      if (fresh && lastJson) alertNew();
      if (!pend.length) document.title = 'Vosa Helper';
      const js = JSON.stringify(data);
      if (js !== lastJson) { lastJson = js; draw(); }
    }
    const when = (ms) => { const d = new Date(ms); return d.toLocaleDateString([], { day: 'numeric', month: 'short' }) + ', ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }); };
    function actLine(a) {
      const who = a.by ? ' · by ' + a.by : '';
      const title = a.kind === 'send' ? 'Sent to ' + (a.n || (a.to && a.to.name) || '') : a.kind === 'in' ? 'Received from ' + a.n : a.kind === 'airtime' ? 'Airtime' : a.kind === 'move' || a.kind === 'withdraw' ? 'Moved from savings' : 'Saved';
      const sign = a.kind === 'in' || a.kind === 'move' || a.kind === 'withdraw' ? '+' : a.kind === 'save' ? '' : '−';
      return h('div', { class: 'row' }, h('div', { class: 'mid' }, h('b', { text: title }), h('span', { text: when(a.at) + who })), h('div', { class: 'end' }, h('b', { class: 'num', text: sign + L.fmt(a.amt) })));
    }
    function draw() {
      root.textContent = '';
      const v = h('section', { class: 'view' });
      v.append(h('div', { class: 'hd' }, h('div', { class: 'hd-left' }, logoMark(40), h('div', null, h('p', { class: 'hi', text: 'Vosa Helper' }), h('p', { class: 'hi-sub', text: 'Trusted Circle' })))));
      if (!data) { v.append(h('p', { class: 'empty', text: 'Loading…' })); root.append(v); return; }
      if (data.error) { v.append(h('div', { class: 'lockrow', role: 'alert' }, h('span', { class: 'lk', style: 'background:var(--danger)' }, icon('alert', 18)), h('div', null, h('b', { text: 'Link not working' }), h('span', { text: data.error })))); root.append(v); return; }
      const hp = data.helper;
      const roleT = { watcher: 'Watcher', approver: 'Approver', spender: 'Spender' }[hp.role];
      const can = { watcher: 'See their balance and activity.', approver: 'Approve or decline their big or unusual transfers. See their balance and activity.', spender: 'Pay for them, up to ' + L.fmt(hp.limit || 0) + ' a month.' }[hp.role];
      if (hp.status !== 'active') {
        v.append(h('div', { class: 'done', style: 'padding-top:24px' }, h('span', { class: 'ok' }, icon(ROLE_ICON[hp.role], 30)),
          h('h1', { text: hp.ownerName + ' added you as their ' + roleT.toLowerCase() }),
          h('p', { style: 'margin:0;color:var(--text2)', text: 'Vosa is a voice banking app. ' + hp.ownerName + ' wants you in their Trusted Circle, so they never have to share their PIN.' })),
          h('div', { style: 'display:flex;flex-direction:column;gap:10px;margin-top:20px' },
            h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('check', 18)), h('div', null, h('b', { text: 'You can' }), h('span', { text: can }))),
            h('div', { class: 'lockrow' }, h('span', { class: 'lk', style: 'background:var(--danger)' }, icon('x', 18)), h('div', null, h('b', { text: 'You can never' }), h('span', { text: 'Move their money without them, or change their secret phrase or Voice ID.' })))),
          h('div', { style: 'display:flex;flex-direction:column;gap:10px;margin-top:20px' },
            h('button', { class: 'btn p', type: 'button', onClick: async () => { try { await post('accept', {}); lastJson = ''; await load(); } catch (e) { alert(e.message); } } }, icon('check', 20), 'Accept'),
            msg ? h('p', { class: 'heard', text: msg }) : null));
        root.append(v); return;
      }
      v.append(h('p', { style: 'margin:0 0 12px;color:var(--text2)', text: 'You’re helping ' + hp.ownerName + ' as their ' + roleT.toLowerCase() + '.' }));
      if (hp.role === 'approver') {
        const reqs = data.requests || [];
        if (!reqs.length) v.append(h('div', { class: 'lockrow' }, h('span', { class: 'lk' }, icon('shield', 18)), h('div', null, h('b', { text: 'Nothing to approve' }), h('span', { text: 'Keep this page open. You’ll get a buzz here' + ' when ' + hp.ownerName + ' needs you.' }))));
        reqs.forEach(r => {
          const to = r.to ? r.to.name + (r.to.bank ? ' · ' + r.to.bank + ' ••' + String(r.to.acct || '').slice(-4) : '') : '';
          const card = h('div', { class: 'hp-req' + (r.status === 'pending' ? ' live' : ''), role: 'group', 'aria-label': 'Transfer request' },
            h('span', { class: 'hp-tag', text: r.status === 'pending' ? 'Approval needed' : r.status === 'approved' ? 'You approved this' : r.status === 'declined' ? 'You declined this' : r.status }),
            h('b', { class: 'num hp-amt', text: L.fmt(r.amount) }),
            h('span', { text: r.kind === 'withdraw' ? hp.ownerName + ' wants to take this out of their ' + (r.goalName || 'savings') + ' savings early.' : hp.ownerName + ' wants to send this to ' + to }),
            r.kind === 'withdraw' && r.emergency ? h('span', { class: 'hp-chip' }, icon('alert', 14), 'They said it’s an emergency') : null,
            r.newRecipient ? h('span', { class: 'hp-chip' }, icon('alert', 14), 'New recipient: they have never paid this person') : null,
            h('span', { class: 'd', text: when(r.created) }),
            r.status === 'pending' ? h('div', { class: 'row2' },
              h('button', { class: 'btn d', type: 'button', disabled: busy ? true : null, onClick: () => decide(r.id, 'decline') }, icon('x', 20), 'Decline'),
              h('button', { class: 'btn p', type: 'button', disabled: busy ? true : null, onClick: () => decide(r.id, 'approve') }, icon('check', 20), 'Approve')) : null,
            r.status === 'pending' ? h('span', { class: 'd', text: r.kind === 'withdraw' ? 'Not sure? Call ' + hp.ownerName + ' first and ask what the emergency is. They recorded a promise to keep this money saved.' : 'Not sure? Call ' + hp.ownerName + ' first. Scammers often pressure people to send money fast.' }) : null);
          v.append(card);
        });
      }
      if (data.account) {
        const a = data.account;
        const saved = a.goals.reduce((x, g) => x + g.bal, 0);
        v.append(h('div', { class: 'bal', style: 'margin-top:16px' }, h('div', { class: 'bal-top' }, h('span', { class: 'bal-lbl', text: hp.ownerName + '’s wallet' })),
          h('div', { class: 'bal-amt num', text: L.fmt(a.wallet) }),
          h('div', { class: 'bal-row' }, h('div', null, h('span', { text: 'Savings' }), h('b', { class: 'num', text: L.fmt(saved) })), h('div', null, h('span', { text: 'Updated' }), h('b', { text: a.updatedAt ? when(a.updatedAt) : '—' })))));
        if (a.activity && a.activity.length) v.append(h('div', { class: 'sec' }, h('div', { class: 'sec-h' }, h('h2', { text: 'Recent activity' })), a.activity.map(actLine)));
      }
      if (data.spend) {
        const s = data.spend;
        v.append(h('div', { class: 'sec' }, h('div', { class: 'sec-h' }, h('h2', { text: 'Pay for ' + hp.ownerName })),
          h('p', { class: 'heard', text: 'Left this month: ' + L.fmt(s.left) + ' of ' + L.fmt(s.limit) }),
          h('span', { class: 'lbl', text: 'Who to pay' }),
          h('div', { class: 'choice two', role: 'radiogroup' }, s.contacts.map(c => h('button', { class: 'opt', type: 'button', role: 'radio', 'aria-checked': String(form.contact === c.name), onClick: () => { form.contact = c.name; draw(); } }, c.name))),
          h('label', { class: 'lbl', for: 'hp-amt', style: 'margin-top:12px', text: 'Amount (₦)' }),
          h('input', { class: 'field', id: 'hp-amt', inputmode: 'numeric', value: form.amount, onInput: (e) => { form.amount = e.target.value.replace(/[^\d]/g, ''); } }),
          h('label', { class: 'lbl', for: 'hp-note', style: 'margin-top:12px', text: 'What is it for? (optional)' }),
          h('input', { class: 'field', id: 'hp-note', value: form.note, onInput: (e) => { form.note = e.target.value; } }),
          msg ? h('p', { class: 'heard', role: 'status', style: 'margin-top:10px', text: msg }) : null,
          h('button', { class: 'btn p', type: 'button', style: 'margin-top:12px', disabled: busy ? true : null, onClick: pay }, icon('send', 20), 'Pay')));
      }
      v.append(h('p', { class: 'heard', style: 'margin-top:24px', text: 'You can never change ' + hp.ownerName + '’s secret phrase or Voice ID. ' + hp.ownerName + ' hears about everything you do, and can remove you at any time.' }));
      root.append(v);
    }
    async function decide(id, decision) {
      busy = true; draw();
      try { await post('decide', { reqId: id, decision }); } catch (e) { alert(e.message); }
      busy = false; lastJson = ''; await load();
    }
    async function pay() {
      if (!form.contact || !Number(form.amount)) { msg = 'Pick who to pay and enter an amount.'; return draw(); }
      busy = true; draw();
      try {
        const j = await post('spend', { contact: form.contact, amount: Number(form.amount), note: form.note });
        msg = 'Paid ' + L.fmt(Number(form.amount)) + ' to ' + form.contact + '. ' + data.helper.ownerName + ' will be told. Left this month: ' + L.fmt(j.left) + '.';
        form = { contact: null, amount: '', note: '' };
      } catch (e) { msg = e.message; }
      busy = false; lastJson = ''; await load();
    }
    load();
    setInterval(load, 3000);
  }

  // ---------- start ----------
  const helperToken = new URLSearchParams(location.search).get('helper');
  if (helperToken) { helperApp(helperToken); return; }
  lastReply = R('welcome');
  render();
  if (!state.onboarded) showOv('onboard', { step: 1 });
  (async () => {
    try {
      const res = await fetch('api/health', { cache: 'no-store' });
      if (!res.ok) return;
      const j = await res.json();
      if (!j || j.service !== 'vosa') return;
      backend.ok = !!j.spitch; backend.sttYo = !!j.spitch; backend.ttsYo = !!j.spitch; backend.ttsEn = !!j.voiceEn; backend.ttsPcm = !!j.spitch; backend.voiceId = !!j.spitch; backend.voices = j.voices || null;
      backend.db = !!j.db; backend.sms = !!j.sms;
      if (state.view === 'settings') render();
      if (cloudOn()) { syncNow(); startPolling(); }
    } catch (e) { /* no server: browser-only mode */ }
  })();
})();
