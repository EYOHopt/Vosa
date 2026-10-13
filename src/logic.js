/* Vosa — language understanding and replies.
   Rule-based so the demo works offline and never needs an AI key.
   Handles English, Nigerian Pidgin and Yorùbá (with or without tone marks). */
(function (root) {
  'use strict';

  // ---------- text helpers ----------
  function norm(s) {
    return String(s || '')
      .replace(/₦/g, ' naira ').replace(/%/g, ' percent ')
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/ɗ/g, 'd').replace(/ƙ/g, 'k').replace(/ɓ/g, 'b').replace(/ƴ/g, 'y').replace(/ʼ/g, '')
      .replace(/[’'`]/g, '')
      .replace(/(\d),(?=\d{3}\b)/g, '$1')
      .replace(/[^a-z0-9.\s]/g, ' ')
      .replace(/\.(?!\d)/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
  const has = (t, re) => re.test(t);

  // Phone speech recognition is trained on foreign English, so it mishears Pidgin and Nigerian
  // amounts in predictable ways. Fix those before understanding.
  const HEARING = [
    [/\b(i|we|dem|she|he|una|make i) (one|won|wand|want to|wanna|wont)\b/g, '$1 wan'],
    [/\ba beg\b|\babegg\b|\ba bag\b/g, 'abeg'],
    [/\bcome out\b|\bcomote\b|\bcommot\b/g, 'comot'],
    [/\b(safe|sieve|sev|saved|serve|safely)\b(?=.*\b(for|to|my|rent|school|goal|savings|k|thousand)\b)/g, 'save'],
    [/\b(sent|sand|sin|sen|cent|scent)\b(?=\s+(\d|[a-z]+ (k|thousand|naira)|money))/g, 'send'],
    [/\b(\d+|[a-z]+) (kate|kay to|key to|cato)\b/g, '$1 k to'],
    [/\b(\d+|[a-z]+) (kay|key|kei|kei)\b/g, '$1 k'],
    [/\b(\d+)k(\d)\b/g, '$1k$2'],
    [/\bwetin\b|\bwhat in\b|\bwet in\b/g, 'wetin'],
    [/\bthey (dey|day)\b/g, 'dey'],
    [/\b(day|they) (my|for|inside)\b/g, 'dey $2'],
    [/\bgive am\b|\bgive them\b|\bgive him\b|\bgive her\b/g, 'give am'],
    [/\bhow fa\b|\bhow fat\b/g, 'how far'],
    [/\bnairas?\b|\bnyra\b|\bnira\b/g, 'naira'],
    [/\bairtel\b/g, 'airtel'], [/\bair time\b|\bear time\b/g, 'airtime'],
    [/\bgt bank\b|\bjeeti bank\b|\bgeetee\b/g, 'gtbank'],
    [/\bopay\b|\bo pay\b|\boh pay\b/g, 'opay']
  ];
  function fixHearing(text) {
    let t = ' ' + String(text || '').toLowerCase() + ' ';
    for (const [re, to] of HEARING) t = t.replace(re, to);
    return t.trim();
  }

  function fmt(n) {
    n = Math.round(n);
    return '₦' + String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // ---------- amounts ----------
  const EN_ONES = { zero: 0, one: 1, a: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19 };
  const EN_TENS = { twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
  const EN_BIG = { thousand: 1e3, k: 1e3, million: 1e6, m: 1e6 };

  const YO_UNITS = { okan: 1, ookan: 1, eni: 1, kan: 1, meji: 2, eeji: 2, meta: 3, eeta: 3, merin: 4, eerin: 4, marun: 5, aarun: 5, mefa: 6, eefa: 6, meje: 7, eeje: 7, mejo: 8, eejo: 8, mesan: 9, eesan: 9, mewa: 10, eewa: 10, ogun: 20, ogbon: 30, ogoji: 40, aadota: 50, ogota: 60, aadorin: 70, ogorin: 80, aadorun: 90 };
  const YO_BIG = { egberun: 1e3, egbaa: 2e3, milionu: 1e6, miliyonu: 1e6, milionnu: 1e6 };
  const YO_FILLER = { un: 1, an: 1, lona: 1, ni: 0 };

  function digitAmount(t) {
    // "2k5" / "2k 5" = ₦2,500 (Nigerian shorthand)
    const k5 = t.match(/(?:^|\s)(\d{1,3})k\s?(\d)(?=\s|$)/);
    if (k5) return parseInt(k5[1], 10) * 1000 + parseInt(k5[2], 10) * 100;
    const re = /(?:^|\s)(?:n|naira\s*)?(\d+(?:\.\d+)?)\s*(k|thousand|m|million|mil|egberun)?(?=\s|$)/g;
    let m;
    while ((m = re.exec(t))) {
      if (m[1].replace('.', '').length >= 9) continue;
      let v = parseFloat(m[1]);
      const u = m[2];
      if (u === 'k' || u === 'thousand' || u === 'egberun') v *= 1e3;
      else if (u === 'm' || u === 'million' || u === 'mil') v *= 1e6;
      if (v >= 50) return Math.round(v);
    }
    return null;
  }

  function englishAmount(tokens) {
    let total = 0, cur = 0, started = false, sawReal = false, afterBig = false, sawAnd = false, shortcut = false;
    for (const w of tokens) {
      if (w in EN_ONES && !(w === 'a' && started)) {
        if (w !== 'a') sawReal = true;
        // "two thousand five" (no "and", no "hundred") = 2,500 in Nigerian usage
        if (afterBig && !sawAnd && cur === 0 && EN_ONES[w] >= 1 && EN_ONES[w] <= 9) { cur = EN_ONES[w] * 100; afterBig = false; shortcut = true; started = true; continue; }
        // "one fifty" = 150: a single digit followed by a tens word
        cur += EN_ONES[w]; started = true; afterBig = false;
      }
      else if (w in EN_TENS) { if (cur >= 1 && cur <= 9) cur = cur * 100; cur += EN_TENS[w]; started = true; sawReal = true; afterBig = false; }
      else if (w === 'hundred' && started) { cur = shortcut ? cur : (cur || 1) * 100; afterBig = false; shortcut = false; }
      else if (w in EN_BIG && started) { total += (cur || 1) * EN_BIG[w]; cur = 0; sawReal = true; afterBig = true; sawAnd = false; }
      else if (w === 'and' && started) { sawAnd = true; }
      else if (started) { break; }
    }
    const v = total + cur;
    return sawReal && v >= 50 ? v : null;
  }

  function yorubaSmall(tokens, i) {
    // reads a units/tens word at i (skipping fillers), returns [value, nextIndex]
    while (i < tokens.length && tokens[i] in YO_FILLER) i++;
    const after = { igba: 200, ogorun: 100, irinwo: 400, egbeta: 600, egberin: 800 };
    if (i < tokens.length && (tokens[i] in YO_UNITS || tokens[i] in after)) {
      let v = YO_UNITS[tokens[i]] || after[tokens[i]]; i++;
      while (i < tokens.length && (tokens[i] === 'un' || tokens[i] === 'an')) i++;
      return [v, i];
    }
    return [null, i];
  }

  function yorubaAmount(tokens) {
    let total = 0, found = false;
    for (let i = 0; i < tokens.length; i++) {
      const w = tokens[i];
      if (w in YO_BIG) {
        found = true;
        let [mult, j] = yorubaSmall(tokens, i + 1);
        if (mult == null && i > 0 && tokens[i - 1] in YO_UNITS) mult = YO_UNITS[tokens[i - 1]];
        total += YO_BIG[w] * (mult || 1);
        i = (mult != null ? j : i + 1) - 1;
      } else if (w === 'ogorun') {
        found = true;
        let [mult, j] = yorubaSmall(tokens, i + 1);
        total += 100 * (mult || 1);
        i = (mult != null ? j : i + 1) - 1;
      } else if (w === 'ati' && found) {
        continue;
      } else if (found && w in YO_UNITS && tokens[i - 1] === 'ati') {
        total += YO_UNITS[w];
      }
    }
    return found && total >= 50 ? total : null;
  }

  // Hausa: "dubu biyar" = 5,000; "dubu ashirin da biyar" = 25,000; "dari biyar" = 500; "dubu dari" = 100,000
  const HA_UNITS = { daya: 1, biyu: 2, uku: 3, hudu: 4, biyar: 5, shida: 6, bakwai: 7, takwas: 8, tara: 9, goma: 10, ashirin: 20, talatin: 30, arbain: 40, hamsin: 50, sittin: 60, sabain: 70, tamanin: 80, casain: 90, dari: 100 };
  const HA_BIG = { dubu: 1e3, miliyan: 1e6, milyan: 1e6 };
  function hausaSmall(tokens, i) {
    let v = 0, found = false;
    if (tokens[i] === 'naira') i++;
    while (i < tokens.length) {
      const w = tokens[i];
      if (w === 'dari') { found = true; i++; if (tokens[i] in HA_UNITS && tokens[i] !== 'dari') { v += 100 * HA_UNITS[tokens[i]]; i++; } else v += 100; if (tokens[i] === 'da' && tokens[i + 1] in HA_UNITS) { i++; continue; } break; }
      if (w in HA_UNITS) { v += HA_UNITS[w]; found = true; i++; if (tokens[i] === 'da' && tokens[i + 1] in HA_UNITS) { i++; continue; } break; }
      break;
    }
    return [found ? v : null, i];
  }
  function hausaAmount(tokens) {
    let total = 0, found = false;
    for (let i = 0; i < tokens.length; i++) {
      const w = tokens[i];
      if (w in HA_BIG) {
        found = true;
        let [mult, j] = hausaSmall(tokens, i + 1);
        if (mult == null && tokens[i - 1] in HA_UNITS) mult = HA_UNITS[tokens[i - 1]];
        total += HA_BIG[w] * (mult || 1); i = (mult != null ? j : i + 1) - 1;
        if (tokens[i + 1] === 'da') { const [rest, k] = hausaSmall(tokens, i + 2); if (rest != null) { total += rest; i = k - 1; } }
      } else if (w === 'dari') {
        found = true;
        const [mult, j] = hausaSmall(tokens, i + 1);
        total += 100 * (mult || 1); i = (mult != null ? j : i + 1) - 1;
      }
    }
    return found && total >= 50 ? total : null;
  }
  // Igbo: "puku ise" = 5,000; "puku iri abuo na ise" = 25,000; "nari ise" = 500; "nde" = million
  const IG_UNITS = { otu: 1, abuo: 2, ato: 3, ano: 4, ise: 5, isii: 6, asaa: 7, asato: 8, itoolu: 9, itolu: 9, iri: 10 };
  const IG_BIG = { puku: 1e3, nde: 1e6 };
  function igboSmall(tokens, i) {
    let v = 0, found = false;
    if (tokens[i] === 'naira') i++;
    while (i < tokens.length) {
      const w = tokens[i];
      if (w === 'nari') { found = true; i++; if (tokens[i] in IG_UNITS && tokens[i] !== 'iri') { v += 100 * IG_UNITS[tokens[i]]; i++; } else v += 100; if (tokens[i] === 'na' && (tokens[i + 1] in IG_UNITS)) { i++; continue; } break; }
      if (w === 'iri') { found = true; i++; if (tokens[i] in IG_UNITS && tokens[i] !== 'iri') { v += 10 * IG_UNITS[tokens[i]]; i++; } else v += 10; if (tokens[i] === 'na' && tokens[i + 1] in IG_UNITS) { i++; continue; } break; }
      if (w in IG_UNITS) { v += IG_UNITS[w]; found = true; i++; break; }
      break;
    }
    return [found ? v : null, i];
  }
  function igboAmount(tokens) {
    let total = 0, found = false;
    for (let i = 0; i < tokens.length; i++) {
      const w = tokens[i];
      if (w in IG_BIG) {
        found = true;
        let [mult, j] = igboSmall(tokens, i + 1);
        total += IG_BIG[w] * (mult || 1); i = (mult != null ? j : i + 1) - 1;
        if (tokens[i + 1] === 'na') { const [rest, k] = igboSmall(tokens, i + 2); if (rest != null) { total += rest; i = k - 1; } }
      } else if (w === 'nari') {
        found = true;
        const [mult, j] = igboSmall(tokens, i + 1);
        total += 100 * (mult || 1); i = (mult != null ? j : i + 1) - 1;
      }
    }
    return found && total >= 50 ? total : null;
  }
  function parseAmount(t) {
    const toks = t.split(' ');
    return digitAmount(t) || yorubaAmount(toks) || hausaAmount(toks) || igboAmount(toks) || englishAmount(toks);
  }

  // ---------- dates ----------
  const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  const MON_SHORT = { jan: 0, feb: 1, mar: 2, apr: 3, jun: 5, jul: 6, aug: 7, sep: 8, sept: 8, oct: 9, nov: 10, dec: 11 };
  const YO_MONTHS = { sere: 0, erele: 1, erena: 2, igbe: 3, ebibi: 4, okudu: 5, agemo: 6, owewe: 8, owara: 9, belu: 10, ope: 11 };

  const HA_MONTHS = { janairu: 0, fabrairu: 1, maris: 2, afrilu: 3, mayu: 4, yuni: 5, yuli: 6, agusta: 7, satumba: 8, oktoba: 9, nuwamba: 10, disamba: 11 };
  const IG_MONTHS = { jenuwari: 0, jenuari: 0, febuwari: 1, febrụwarị: 1, machi: 2, maachi: 2, eprel: 3, epreel: 3, mee: 4, juun: 5, jun: 5, julai: 6, julaị: 6, ogost: 7, ọgọst: 7, septemba: 8, oktoba: 9, novemba: 10, disemba: 11 };
  function monthIndex(w) {
    let i = MONTHS.indexOf(w);
    if (i >= 0) return i;
    if (w in MON_SHORT) return MON_SHORT[w];
    if (w in YO_MONTHS) return YO_MONTHS[w];
    if (w in HA_MONTHS) return HA_MONTHS[w];
    if (w in IG_MONTHS) return IG_MONTHS[w];
    return -1;
  }

  function parseDeadline(t, now) {
    now = now || new Date();
    const out = (d, matched) => ({ date: d, rest: t.replace(matched, ' ').replace(/\s+/g, ' ').trim() });
    let m;
    if ((m = t.match(/\b(?:by |before |for |till |until |ki o to di |titi di )?(?:christmas|keresimesi|xmas)\b/))) {
      let d = new Date(now.getFullYear(), 11, 25);
      if (d - now < 7 * 864e5) d = new Date(now.getFullYear() + 1, 11, 25);
      return { date: d, rest: t, christmas: true };
    }
    if ((m = t.match(/\b(?:by |before )?(?:the )?end of (?:the )?year\b|\bopin odun\b/))) {
      return out(new Date(now.getFullYear(), 11, 31), m[0]);
    }
    if ((m = t.match(/\b(?:in|within|for|ni|laarin) (\d+|[a-z]+) (weeks?|months?|osu|ose)\b/))) {
      let n = parseInt(m[1], 10);
      if (isNaN(n)) n = EN_ONES[m[1]] || YO_UNITS[m[1]] || 0;
      if (n) {
        const d = new Date(now);
        if (/week|ose/.test(m[2])) d.setDate(d.getDate() + 7 * n); else d.setMonth(d.getMonth() + n);
        return out(d, m[0]);
      }
    }
    if ((m = t.match(/\b(?:osu) (meji|meta|merin|marun|mefa|meje|mejo|mesan|mewa|\d+)\b/))) {
      const n = parseInt(m[1], 10) || YO_UNITS[m[1]];
      const d = new Date(now); d.setMonth(d.getMonth() + n);
      return out(d, m[0]);
    }
    if ((m = t.match(/\bnext month\b/))) { const d = new Date(now); d.setMonth(d.getMonth() + 1); return out(d, m[0]); }
    const re = /\b(by|before|in|till|until|for|reach|latest|ni|titi di|ki o to di|osu|kafin|zuwa|tupu|ruo|na)\s+(?:end of |the end of |watan |ọnwa |onwa )?([a-z]+)(?:\s+(\d{4}))?\b/g;
    while ((m = re.exec(t))) {
      const mi = monthIndex(m[2]);
      if (mi < 0) continue;
      let y = m[3] ? parseInt(m[3], 10) : now.getFullYear();
      let d = new Date(y, mi, 1);
      if (!m[3] && d - now < 14 * 864e5) d = new Date(y + 1, mi, 1);
      return out(d, m[0]);
    }
    // bare month name (not "may")
    const bare = t.match(/\b(january|february|march|april|june|july|august|september|october|november|december)\b(?:\s+(\d{4}))?/);
    if (bare) {
      const mi = MONTHS.indexOf(bare[1]);
      let y = bare[2] ? parseInt(bare[2], 10) : now.getFullYear();
      let d = new Date(y, mi, 1);
      if (!bare[2] && d - now < 14 * 864e5) d = new Date(y + 1, mi, 1);
      return out(d, bare[0]);
    }
    return null;
  }

  // ---------- days ----------
  const DAYS = [
    { re: /\b(monday|mon|aje|ojo aje)\b/, i: 1 },
    { re: /\b(tuesday|tue|tues|isegun|ojo isegun)\b/, i: 2 },
    { re: /\b(wednesday|wed|ojoru)\b/, i: 3 },
    { re: /\b(thursday|thur|thurs|ojobo)\b/, i: 4 },
    { re: /\b(friday|fri|eti|ojo eti|jimoh|jimo)\b/, i: 5 },
    { re: /\b(saturday|sat|abameta|satide)\b/, i: 6 },
    { re: /\b(sunday|sun|aiku|ojo aiku|sonde)\b/, i: 0 }
  ];
  function parseDay(t) {
    for (const d of DAYS) if (d.re.test(t)) return d.i;
    if (/\b(payday|pay day|salary|month end|end of the month|end of month|ojo owo osu)\b/.test(t)) return 'payday';
    return null;
  }

  // ---------- goals ----------
  const GOALS = {
    flex: { en: 'Flexible savings', pcm: 'Flexible savings', yo: 'Àpò ìfowópamọ́', ha: 'Ajiyar kyauta', ig: 'Nchekwa nnwere onwe' },
    rent: { en: 'Rent', pcm: 'House rent', yo: 'Owó ilé', ha: 'Kuɗin haya', ig: 'Ụgwọ ụlọ' },
    school: { en: 'School fees', pcm: 'School fees', yo: 'Owó ilé-ìwé', ha: 'Kuɗin makaranta', ig: 'Ụgwọ akwụkwọ' },
    emergency: { en: 'Emergency fund', pcm: 'Emergency money', yo: 'Owó pàjáwìrì', ha: 'Kuɗin gaggawa', ig: 'Ego mberede' },
    business: { en: 'Business', pcm: 'Business money', yo: 'Owó òwò', ha: 'Kasuwanci', ig: 'Azụmahịa' },
    travel: { en: 'Travel', pcm: 'Japa money', yo: 'Ìrìn-àjò', ha: 'Tafiya', ig: 'Njem' },
    phone: { en: 'New phone', pcm: 'New phone', yo: 'Fóònù tuntun', ha: 'Sabuwar waya', ig: 'Ekwentị ọhụrụ' },
    wedding: { en: 'Wedding', pcm: 'Wedding', yo: 'Ìgbéyàwó', ha: 'Aure', ig: 'Agbamakwụkwọ' },
    christmas: { en: 'Christmas', pcm: 'Christmas', yo: 'Kérésìmesì', ha: 'Kirsimeti', ig: 'Ekeresimesi' },
    car: { en: 'Car', pcm: 'Motor', yo: 'Ọkọ̀', ha: 'Mota', ig: 'Ụgbọ ala' }
  };
  const GOAL_RE = [
    ['school', /\b(school|fees|tuition|ile iwe|iwe omo|university|exam|makaranta|akwukwo|ulo akwukwo)\b/],
    ['rent', /\b(rent|house|ile|landlord|shelter|haya|kudin haya|ugwo ulo|ulo)\b/],
    ['emergency', /\b(emergency|pajawiri|rainy day|hospital|gaggawa|mberede)\b/],
    ['business', /\b(business|shop|goods|okoowo|owo|oja|capital|market|kasuwanci|sanaa|kasuwa|azumahia|ahia)\b(?! market fund)/],
    ['travel', /\b(japa|travel|visa|abroad|irin ajo|trip|tafiya|njem)\b/],
    ['phone', /\b(phone|laptop|foonu|iphone|gadget|waya|ekwenti)\b/],
    ['wedding', /\b(wedding|igbeyawo|owambe|marriage|aure|agbamakwukwo)\b/],
    ['christmas', /\b(christmas|keresimesi|xmas|festive|sallah|salah|ileya|kirsimeti|ekeresimesi|krismas)\b/],
    ['car', /\b(car|motor|moto|okada|keke|oko|mota|ugbo ala|ugboala)\b/],
    ['flex', /\b(flexible|free savings|wallet|apo|savings account|general)\b/]
  ];
  function detectGoal(t) {
    // Avoid reading "owo" (money) alone as business: require owo oja / owo okoowo
    const t2 = t.replace(/\bowo (ile iwe|ile|pajawiri|oja|okoowo)\b/g, ' $1 ').replace(/\bowo\b/g, ' ').replace(/\bmoney market\b/g, ' ');
    for (const [k, re] of GOAL_RE) if (re.test(t2)) return k;
    return null;
  }
  function customGoalName(raw) {
    const t = norm(raw);
    const m = t.match(/\b(?:for|fun|towards|to buy|to)\s+(?:my |the |a |an |mi )?([a-z][a-z ]{2,24}?)(?=\s+(?:by|before|in|till|until|every|ni|titi|ki)\b|\s*$)/);
    if (!m) return null;
    let name = m[1].replace(/\b(goal|target|afojusun|savings?)\b/g, '').trim();
    if (!name || /^(me|it|am|you|naira|\d)/.test(name)) return null;
    return name.replace(/\b\w/g, c => c.toUpperCase());
  }

  // ---------- explain ----------
  const TERMS = [
    ['mmf', /\b(money market|mmf)\b/],
    ['tbill', /\b(treasury|t bill|tbill|tbills|t bills)\b/],
    ['mutual', /\b(mutual fund|mutual funds)\b/],
    ['inflation', /\b(inflation|price dey go up|owo ngbe)\b/],
    ['interest', /\b(interest|ele|owo ele|returns?)\b/],
    ['emergencyfund', /\b(emergency fund|owo pajawiri)\b/]
  ];
  const EXPLAIN_TRIGGER = /\b(what is|whats|what are|wetin be|wetin|explain|meaning|mean|kini|ki ni|salaye|se alaye|tell me about|how does|how e dey work)\b/;

  // ---------- payments helpers ----------
  const DIGIT_WORDS = { zero: '0', oh: '0', o: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' };
  function joinSpokenDigits(t) {
    // "zero one two three ..." (6+ digit words) -> "0123..."; also "0 1 2 3" -> "0123"
    let out = t.replace(/\b(?:(?:zero|oh|one|two|three|four|five|six|seven|eight|nine)\s+){5,}(?:zero|oh|one|two|three|four|five|six|seven|eight|nine)\b/g,
      (m) => m.split(/\s+/).map(w => DIGIT_WORDS[w]).join(''));
    out = out.replace(/\b(?:\d\s){5,}\d\b/g, (m) => m.replace(/\s/g, ''));
    return out;
  }
  const BANKS = [
    ['GTBank', /\b(gtbank|gtb|guaranty|gt bank)\b/], ['Access Bank', /\baccess\b/], ['Zenith Bank', /\bzenith\b/],
    ['First Bank', /\b(first bank|firstbank)\b/], ['UBA', /\buba\b/], ['Kuda', /\bkuda\b/], ['OPay', /\b(opay|o pay)\b/],
    ['Moniepoint', /\bmoniepoint\b/], ['PalmPay', /\b(palmpay|palm pay)\b/], ['Wema Bank', /\bwema\b/], ['Fidelity Bank', /\bfidelity\b/],
    ['Sterling Bank', /\bsterling\b/], ['Union Bank', /\bunion\b/], ['FCMB', /\bfcmb\b/], ['Stanbic IBTC', /\bstanbic\b/],
    ['Polaris Bank', /\bpolaris\b/], ['Ecobank', /\becobank\b/]
  ];
  const parseBank = (t) => { const b = BANKS.find(([, re]) => re.test(t)); return b ? b[0] : null; };
  const parseAccount = (t) => { const m = t.match(/\b(\d{10})\b/); return m ? m[1] : null; };
  const parsePhone = (t) => { const m = t.match(/\b(0[789][01]\d{8})\b/); return m ? m[1] : null; };
  const NETWORKS = [['MTN', /\bmtn\b/], ['Airtel', /\bairtel\b/], ['Glo', /\b(glo|globacom)\b/], ['9mobile', /\b(9mobile|9 mobile|etisalat)\b/]];
  const parseNetwork = (t) => { const n = NETWORKS.find(([, re]) => re.test(t)); return n ? n[0] : null; };
  function parsePct(t) {
    const m = t.match(/\b(\d{1,2})\s*(?:percent|per cent|pc|%)/) || t.match(/\b(?:ida|idaa)\s+(\d{1,2})\b/);
    if (m) return parseInt(m[1], 10);
    const w = t.match(/\b(five|ten|fifteen|twenty|twenty five|thirty|fifty)\s+(?:percent|per cent)\b/);
    if (w) return { five: 5, ten: 10, fifteen: 15, twenty: 20, 'twenty five': 25, thirty: 30, fifty: 50 }[w[1]];
    if (/\bhalf\b|\bidaji\b/.test(t)) return 50;
    return null;
  }
  function editDistance(a, b) {
    const m = a.length, n = b.length, d = [];
    for (let i = 0; i <= m; i++) { d[i] = [i]; }
    for (let j = 1; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    return d[m][n];
  }
  // Collapses the parts of a name that speech recognition confuses: doubled letters, vowel swaps, soft endings.
  const soundKey = (w) => w.replace(/ph/g, 'f').replace(/ck/g, 'k').replace(/c(?=[eiy])/g, 's').replace(/c/g, 'k').replace(/[aeiouy]+/g, 'a').replace(/(.)\1+/g, '$1');
  const COMMON = /^(send|transfer|pay|give|buy|save|withdraw|take|keep|put|move|check|show|tell|make|comot|collect|bring|remove|cancel|stop|start|help|hello|balance|much|what|which|where|when|have|from|into|about|some|your|their|dey|wan|dem|them|then|than|also|just|again|only|every|money|mine|maka|nye|ego|puku|nari|akpa|ugwo|ulo|akwukwo|biko|nke|ndi|ihe|kaadi|zuta|tupu|chekwaa|chekwa|debe|zipu|ziga|wepu|kudi|kudin|dubu|dari|naira|haya|daga|zuwa|kafin|wannan|kake|kana|nake|sayi|kati|katin|ajiye|adana|aika|tura|cire|walat|gida|yanzu|sannu|ndewo|kedu|my|the|a|an|one|me|am|him|her|them|person|someone|account|bank|money|wallet|rent|school|fees|goal|naira|thousand|hundred|card|airtime|data|please|abeg|wan|want|for|from|into|and|with|this|that|now|today|tomorrow|mama|papa|aunty|uncle|brother|sister|boss|madam|oga|baba|iya)$/;
  function findContact(t, contacts) {
    contacts = contacts || [];
    for (const c of contacts) {
      const names = [c.name].concat(c.aliases || []).map(n => norm(n));
      if (names.some(n => n && new RegExp('\\b' + n + '\\b').test(t))) return c;
    }
    // Nothing exact: look for a word that sounds like a contact's first name ("Tunday" -> Tunde)
    const words = t.split(' ').filter(w => w.length >= 4 && !/\d/.test(w) && !COMMON.test(w));
    let best = null, bestScore = 99;
    for (const c of contacts) {
      const parts = [c.name].concat(c.aliases || []).map(n => norm(n)).join(' ').split(' ').filter(p => p.length >= 4);
      for (const p of parts) for (const w of words) {
        if (w[0] !== p[0]) continue;
        const d = editDistance(w, p);
        const close = soundKey(w) === soundKey(p) || d <= (p.length >= 7 ? 2 : 1);
        if (close && d < bestScore) { best = c; bestScore = d; }
      }
    }
    return best;
  }

  // ---------- challenge digits (anti-replay) ----------
  const DIGIT_MAP = {
    zero: 0, oh: 0, one: 1, two: 2, to: 2, too: 2, three: 3, four: 4, for: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    odo: 0, ookan: 1, okan: 1, eeji: 2, meji: 2, eeta: 3, meta: 3, eerin: 4, merin: 4, aarun: 5, marun: 5, eefa: 6, mefa: 6, eeje: 7, meje: 7, eejo: 8, mejo: 8, eesan: 9, mesan: 9
  };
  const TENS_MAP = { twenty: 2, thirty: 3, forty: 4, fourty: 4, fifty: 5, sixty: 6, seventy: 7, eighty: 8, ninety: 9 };
  function newChallenge() {
    let d = '';
    while (d.length < 3) { const x = 2 + Math.floor(Math.random() * 8); if (!d.endsWith(String(x))) d += x; }
    return d;
  }
  // Turns "blue mango seven four two", "742", "7 4 2" or "meje merin meji" into "742"
  function spokenDigits(raw) {
    const toks = norm(raw).split(' ');
    let out = '';
    for (let i = 0; i < toks.length; i++) {
      const w = toks[i];
      if (/^\d+$/.test(w)) { out += w; continue; }
      if (w in TENS_MAP) {
        const nx = toks[i + 1];
        if (nx && nx in DIGIT_MAP && DIGIT_MAP[nx] > 0) { out += TENS_MAP[w] + '' + DIGIT_MAP[nx]; i++; }
        else out += TENS_MAP[w] + '0';
        continue;
      }
      if (w in DIGIT_MAP) {
        // "to"/"for"/"too" only count as numbers when next to other numbers
        if (['to', 'too', 'for'].includes(w)) {
          const prev = toks[i - 1], next = toks[i + 1];
          const isNum = (x) => x && (/^\d+$/.test(x) || (x in DIGIT_MAP && !['to', 'too', 'for'].includes(x)) || x in TENS_MAP);
          if (!isNum(prev) && !isNum(next)) continue;
        }
        out += DIGIT_MAP[w];
      }
    }
    return out;
  }
  const challengeOk = (raw, challenge) => spokenDigits(raw).includes(challenge);

  // ---------- understanding ----------
  const YES = /^(yes|yeah|yea|yep|yup|ok|okay|confirm|sure|do it|go ahead|correct|na so|oya|do am|abeg do am|make e be|e do|sharp|beeni|bee ni|en|o daa|o dara|mo gba|ti gba|bee ni o|eh|i|to|haka ne|na yarda|ee|eeh|o di mma|odi mma|kwado)\b/;
  const NO = /^(no|nope|cancel|stop|dont|do not|abeg no|leave am|forget am|no do am|no wahala no|rara|ma se|fi sile|fagile|bee ko|aa|a a|soke|kada|mba|kagbuo|kwusi)\b/;

  function understand(raw, ctx) {
    ctx = ctx || {};
    const now = ctx.now || new Date();
    const t0 = joinSpokenDigits(norm(fixHearing(raw)));
    const r = { raw, t: t0 };

    if (ctx.pending) {
      if (YES.test(t0)) return { intent: 'yes' };
      if (NO.test(t0)) return { intent: 'no' };
    }
    if (ctx.awaiting && NO.test(t0) && !/\d/.test(t0)) return { intent: 'no' };
    if (!t0) return { intent: 'unknown' };

    const dl = parseDeadline(t0, now);
    const t = dl ? dl.rest : t0;
    r.deadline = dl ? dl.date : null;
    r.amount = parseAmount(t);
    r.goal = detectGoal(t0);
    r.day = parseDay(t0);

    // slot filling for a question Vosa just asked
    if (ctx.awaiting === 'account' || ctx.awaiting === 'recipient') {
      // Account numbers are often heard in groups ("012 345 6789") or as words ("zero one two ...")
      const digits = spokenDigits(raw);
      const bank = parseBank(t0);
      if (digits.length === 10 || (digits.length === 11 && digits[0] === '0' && bank && /opay|palmpay|moniepoint|kuda/i.test(bank))) {
        r.account = digits.length === 11 ? digits.slice(1) : digits; r.bank = bank; r.amount = null; r.intent = 'fill'; return r;
      }
    }
    if (ctx.awaiting === 'bank' && parseBank(t0)) { r.bank = parseBank(t0); r.intent = 'fill'; return r; }
    if (ctx.awaiting === 'amount' && r.amount && !/\b(withdraw|balance|how much)\b/.test(t0)) { r.intent = 'fill'; return r; }
    if (ctx.awaiting === 'day' && r.day != null) { r.intent = 'fill'; return r; }

    // hands-free on/off
    // Trusted Circle
    {
      const helperNames = (ctx.helpers || []).map(n => norm(n));
      const named = helperNames.find(n => n && new RegExp('\\b' + n + '\\b').test(t0));
      if (/\b(remove|delete|comot|yo)\b/.test(t0) && (/\b(helper|circle|trusted)\b/.test(t0) || named)) {
        r.intent = 'removehelper'; r.helperName = named || null; return r;
      }
      if (/\b(add|make|put|invite)\b/.test(t0) && /\b(helper|trusted|circle|guardian|oluranlowo)\b/.test(t0)) {
        const m = t0.match(/\b(?:add|make|put|invite)\s+([a-z]{2,20})\b/);
        r.intent = 'addhelper';
        r.helperName = m && !/^(a|an|my|me|one|new|someone|somebody|helper|trusted|person|another)$/.test(m[1]) ? m[1] : null;
        return r;
      }
      if (/\b(my helpers|trusted circle|who (are|be) my helpers|who (has|don|fit|can) (see|seen)|who see my account|who check(ed)? my account)\b/.test(t0)) { r.intent = 'helpers'; return r; }
    }
    if (/\b(voice ?id|voiceprint|voice print|my voice)\b/.test(t0) && /\b(set ?up|add|turn on|enable|start|redo|teach|learn|register|sabi)\b/.test(t0)) { r.intent = 'voicesetup'; return r; }
    if (/\b(last receipt|my receipt|read (me )?(my |the )?receipt|last transaction|last payment|what did i (just )?do|what was (my|the) last|wetin i do last|last thing i do|iwe owo mi|idunadura (mi )?to koja)\b/.test(t0)) { r.intent = 'receipt'; return r; }
    // Voice Promise: "record a promise for rent", "play my promise", "add a promise to school fees"
    if (/\b(promise|promis|ileri)\b/.test(t0)) {
      r.intent = 'promise'; r.play = /\b(play|hear|listen|replay|gbo)\b/.test(t0) && !/\b(record|add|make|new|redo|change)\b/.test(t0);
      r.goal = detectGoal(t0); if (!r.goal) { const m = t0.match(/\b(?:for|to|on|fun|si)\s+(?:my\s+)?([a-z][a-z ]{1,24})$/); r.customName = m ? customGoalName(m[1]) : null; }
      return r;
    }
    if (/\b(hands ?free|stop listening|keep listening|start listening|listen continuously)\b/.test(t0)) {
      r.intent = 'handsfree'; r.on = !/\b(off|stop|disable|turn off)\b/.test(t0); return r;
    }
    // change secret phrase
    let sm;
    if ((sm = t0.match(/\b(?:secret phrase|secret word|passphrase|password|oro asiri)\b.*?\b(?:to|is|be|na|ni|as)\s+(.{3,40})$/))) {
      r.intent = 'setsecret'; r.phrase = sm[1].trim(); return r;
    }
    r.contact = findContact(t0, ctx.contacts);
    r.account = parseAccount(t0);
    r.bank = parseBank(t0);
    r.phone = parsePhone(t0);
    r.network = parseNetwork(t0);
    r.pct = parsePct(t0);

    if (/\b(account number|my account details|my account no|acct number|account no|nomba akanti|account details)\b/.test(t0) && !/\b(send|transfer)\b/.test(t0)) { r.intent = 'account'; return r; }

    if (/\b(auto ?save|automatically save|save automatically|any money (i|wey i) (receive|get)|every money|whenever .*?(receive|enter|come)|anytime money|owo to ba wole|owo ba wole)\b/.test(t0)) {
      r.intent = /\b(stop|off|cancel|disable|no more)\b/.test(t0) ? 'autosaveoff' : 'autosave'; return r;
    }

    if (/\b(airtime|recharge|card|credit for my line|top up my line|load card|kaadi ipe|kaadi|data|kati|katin|kati waya)\b/.test(t0)) { r.intent = 'airtime'; return r; }

    // "send money", "send 5k", "transfer to a GTB account", "pay Tunde" -> send. "send 5k to my rent" -> save.
    const sendVerb = /\b(send|transfer|wire|ranse|fi ranse|aika|aiko|tura|zipu|zipuo|ziga|zie|zitere)\b/.test(t0) || (/\b(pay|give)\b/.test(t0) && !/\bgive me\b/.test(t0) && (r.contact || r.account || r.bank || /\b(to|give|si|fun)\s+[a-z]/.test(t0)));
    const saveCtx = /\b(save|pamo|savings|for my (rent|school|goal)|ajiye|adana|chekwaa|chekwa|debe|dobe)\b/.test(t0) || (r.goal && !r.contact && !r.account && !r.bank);
    if ((sendVerb && !saveCtx) || (r.contact && r.amount && !/\b(save|pamo)\b/.test(t0))) {
      r.intent = 'send';
      if (!r.contact && !r.account) {
        const all = [...t0.matchAll(/\b(?:to|give|si)\s+([a-z]{1,20})\b/g)];
        const nm = all.length ? all[all.length - 1] : null;
        const generic = /^(send|transfer|pay|give|buy|save|withdraw|my|the|a|an|one|me|am|him|her|them|person|someone|somebody|account|bank|money|wallet|another|other|this|that|una|im|e|o)$/;
        r.unknownName = nm && !generic.test(nm[1]) && !parseBank(nm[1]) && !(nm[1] in DIGIT_MAP) ? nm[1] : null;
      }
      return r;
    }
    if (ctx.awaiting === 'recipient' && (r.contact || r.account)) { r.intent = 'fill'; return r; }

    if (/\b(help|what can you do|wetin you fit do|how e dey work|how does this work|ran mi lowo|kini o le se|ki lo le se|taimako|taimaka|enyemaka|nyere m aka)\b/.test(t0)) { r.intent = 'help'; return r; }

    const term = TERMS.find(([, re]) => re.test(t0));
    if (term && (EXPLAIN_TRIGGER.test(t0) || /\?/.test(raw) || !['interest', 'emergencyfund'].includes(term[0])) && !r.amount) {
      r.intent = 'explain'; r.term = term[0]; return r;
    }

    if (/\b(withdraw|take out|takeout|comot|cash out|remove|collect|bring out|yo owo|yo kuro|yo jade|gba owo|mu owo|yo|cire|fitar|fito da|wepu|wepuo|weputa|nweta)\b/.test(t0) || /\btake\b.*\bout\b/.test(t0)) { r.intent = 'withdraw'; return r; }

    if (/\b(remind|reminder|remember me|ranti|ran mi leti|leti)\b/.test(t0)) { r.intent = 'remind'; return r; }

    const wantsGoal = /\b(goal|target|afojusun|plan|buri|burin|manufa|ebumnuche|mgbaru)\b/.test(t0) ||
      (r.deadline && /\b(want|wan|wanna|need|fe|plan|go save|dey save|save up|gather|ina son|son|achoro|choro)\b/.test(t0)) ||
      (/\bsave up\b|\bsaving up\b|\bsaving towards\b|\bsave towards\b/.test(t0) && !r.amount);
    if (wantsGoal && !/\b(how much|balance|elo|melo)\b/.test(t0)) {
      r.intent = 'goal';
      if (!r.goal) r.customName = customGoalName(dl ? dl.rest : raw);
      return r;
    }

    if (/\b(wallet|spend money|apo owo|walat|akpa ego)\b/.test(t0) && /\b(how much|balance|elo|melo|check|wetin|nawa|ole)\b/.test(t0)) { r.intent = 'wallet'; return r; }
    if (/\b(balance|how much|how far (with|my|for)|wetin (i|dey|remain)|i get how much|elo|melo|iye owo|owo melo|how my money|check|what do i have|what i get|how many|nawa|kudi nawa|duba|ego ole|ole|lelee)\b/.test(t0)) { r.intent = 'balance'; return r; }

    if (/\b(my goals|all goals|goals|list|show me|afojusun mi|gbogbo)\b/.test(t0) && !r.amount) { r.intent = 'goals'; return r; }

    if (/\b(save|put|keep|gather|add|deposit|drop|send|top up|pamo|fi kun|fikun|ko si|fi si|fi|ajiye|adana|tara|sa|chekwaa|chekwa|debe|dobe|zoo|tinye)\b/.test(t0) || r.amount) {
      r.intent = 'save';
      if (!r.goal) r.customName = customGoalName(raw);
      return r;
    }

    if (/\b(hello|hi|hey|how far|good morning|good afternoon|good evening|bawo|e kaaro|e kaasan|e kaale|pele|sannu|ina kwana|ina wuni|barka|ndewo|kedu|nnoo|ututu oma|ehihie oma|mgbede oma)\b/.test(t0)) { r.intent = 'greet'; return r; }

    // Just a goal name ("rent", "school fees"): tell them how that goal is doing
    if (r.goal && t0.split(' ').length <= 4) { r.intent = 'balance'; return r; }

    r.intent = 'unknown';
    return r;
  }

  // ---------- replies ----------
  const MONTH_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAY_LABEL = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    pcm: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    yo: ['Àìkú', 'Ajé', 'Ìṣẹ́gun', 'Ọjọ́rú', 'Ọjọ́bọ̀', 'Ẹtì', 'Àbámẹ́ta']
  };
  function dateLabel(d, now) {
    now = now || new Date();
    const sameYear = d.getFullYear() === now.getFullYear();
    return (d.getDate() !== 1 ? d.getDate() + ' ' : '') + MONTH_LABEL[d.getMonth()] + (sameYear ? '' : ' ' + d.getFullYear());
  }
  function dayLabel(day, lang) {
    if (!DAY_LABEL[lang]) lang = 'en';
    if (day === 'payday') return { en: 'payday', pcm: 'salary day', yo: 'owó oṣù' }[lang];
    return DAY_LABEL[lang][day];
  }

  const S = {
    welcome: {
      en: "Hello, I'm Vosa. Tell me what you want to do with your money.",
      pcm: 'How you dey? Na me be Vosa. Wetin we go do with your money today?',
      yo: 'Ẹ kú àbọ̀! Èmi ni Vosa. Kí ni o fẹ́ ṣe pẹ̀lú owó rẹ lónìí?'
    },
    greet: {
      en: "Hello! What would you like to do? You can save, check your balance or set a goal.",
      pcm: 'I dey o! Wetin you wan do? You fit save money, check your balance, or set target.',
      yo: 'Ẹ n lẹ́ o! Kí ni o fẹ́ ṣe? O lè fowó pamọ́, wo iye owó rẹ, tàbí ṣètò àfojúsùn.'
    },
    help: {
      en: 'You can say: save 5,000 for rent. Send 5k to Tunde. Buy 1,000 MTN airtime. How much do I have? I want to save 200k for school fees by January. Save 10% of any money I receive. Or ask: what is a money market fund?',
      pcm: 'You fit talk say: save 5k for house rent. Send 5k give Tunde. Buy 1k MTN card. How much I get? I wan gather 200k for school fees before January. Anytime money enter, save 10%. Or ask me: wetin be money market fund?',
      yo: 'O lè sọ pé: fi ẹgbẹ̀rún márùn-ún pamọ́ fún owó ilé. Fi ẹgbẹ̀rún márùn-ún ránṣẹ́ sí Tunde. Ra káàdì ìpè MTN ẹgbẹ̀rún kan. Èló ló wà nínú àpò mi? Tàbí kí o béèrè pé: kí ni money market fund?'
    },
    unknown: {
      en: "Sorry, I didn't catch that. Try saying: save 5,000 for rent.",
      pcm: 'Abeg, I no catch wetin you talk. Try talk am like this: save 5k for house rent.',
      yo: 'Ẹ jọ̀ọ́, mi ò gbọ́ ọ dáadáa. Gbìyànjú kí o sọ pé: fi ẹgbẹ̀rún márùn-ún pamọ́ fún owó ilé.'
    },
    wallet: { en: 'Your wallet has {wallet} to spend.', pcm: 'You get {wallet} for your wallet wey you fit spend.', yo: '{wallet} ló wà nínú àpò owó rẹ láti ná.' },
    lowWallet: { en: 'Your wallet only has {wallet}, so I cannot do {amt}.', pcm: 'Ah, na only {wallet} remain for your wallet. E no reach {amt}.', yo: '{wallet} nìkan ló wà nínú àpò owó rẹ, nítorí náà mi ò lè ṣe {amt}.' },
    askSend: { en: 'How much should I send?', pcm: 'How much make I send?', yo: 'Èló ni kí n fi ránṣẹ́?' },
    askRecipient: { en: 'Who are you sending to? Say their name, or the account number.', pcm: 'Who you wan send am give? Talk the person name, or call the account number.', yo: 'Ta ni o fẹ́ fi ránṣẹ́ sí? Sọ orúkọ rẹ̀, tàbí nọ́ńbà àkáǹtì rẹ̀.' },
    askAccount: { en: 'Okay, {bank}. What is the account number you are sending to?', pcm: 'Okay, {bank}. Call the account number where you wan send the money go.', yo: 'Ó dáa, {bank}. Sọ nọ́ńbà àkáǹtì tí o fẹ́ fi owó ránṣẹ́ sí.' },
    needVoiceId: { en: 'For your safety, set up Voice ID before you send or withdraw money. It takes about 20 seconds.', pcm: 'Make your money dey safe: set up Voice ID first before you send or comot money. E go take like 20 seconds.', yo: 'Fún ààbò owó rẹ, ṣètò Voice ID kí o tó fi owó ránṣẹ́ tàbí yọ owó. Ó máa gba ìṣẹ́jú-àáyá 20.' },
    voiceSetupGo: { en: 'Okay. Read the sentences on the screen out loud until the bar is full.', pcm: 'Okay. Read the lines wey dey screen out loud until the bar full.', yo: 'Ó dáa. Ka àwọn gbólóhùn tó wà lójú ìbòjú sókè títí ìlà náà yóò fi kún.' },
    askedHelper: {
      en: 'This is {amt}{why}. To keep you safe, I have asked {names} to check it. I will tell you when they answer.',
      pcm: 'This one na {amt}{why}. Make your money dey safe, I don ask {names} make dem check am. I go tell you when dem answer.',
      yo: 'Èyí jẹ́ {amt}{why}. Fún ààbò rẹ, mo ti ní kí {names} ṣàyẹ̀wò rẹ̀. Màá sọ fún ọ nígbà tí wọ́n bá dáhùn.'
    },
    whyNew: { en: ' to someone new', pcm: ' to person wey you never send money before', yo: ' sí ẹni tuntun' },
    helperApproved: { en: '{name} approved it. ', pcm: '{name} don approve am. ', yo: '{name} ti fọwọ́sí i. ' },
    helperDeclined: { en: '{name} declined it, so the money did not move.', pcm: '{name} no gree, so the money no move.', yo: '{name} kò fọwọ́sí i, nítorí náà owó náà kò lọ.' },
    helperTimeout: { en: '{names} did not answer in time, so I held it. The money did not move.', pcm: '{names} no answer on time, so I hold am. The money no move.', yo: '{names} kò dáhùn lásìkò, nítorí náà mo dá a dúró. Owó náà kò lọ.' },
    helperLink: {
      en: "I've made {name}'s helper link. Share it with them. When they tap Accept, they join your Trusted Circle.",
      pcm: 'I don make {name} helper link. Send am give dem. When dem press Accept, dem go join your Trusted Circle.',
      yo: 'Mo ti ṣe ìlànà olùrànlọ́wọ́ fún {name}. Fi ránṣẹ́ sí wọn. Nígbà tí wọ́n bá tẹ Accept, wọ́n á darapọ̀ mọ́ Trusted Circle rẹ.'
    },
    helperJoined: { en: '{name} accepted and is now your {role}.', pcm: '{name} don accept. Na your {role} dem be now.', yo: '{name} ti gbà, ó sì ti di {role} rẹ báyìí.' },
    helpersList: { en: 'Your Trusted Circle: {list}.', pcm: 'Your Trusted Circle: {list}.', yo: 'Trusted Circle rẹ: {list}.' },
    helpersNone: { en: 'You have no helpers yet. Say: add Bisi as my helper.', pcm: 'You never get helper. Talk say: add Bisi as my helper.', yo: 'O kò tíì ní olùrànlọ́wọ́. Sọ pé: add Bisi as my helper.' },
    helperRemoved: { en: "I've removed {name}. They can't see or approve anything any more.", pcm: 'I don remove {name}. Dem no fit see or approve anything again.', yo: 'Mo ti yọ {name} kúrò. Wọn kò lè rí tàbí fọwọ́sí ohunkóhun mọ́.' },
    helperViewed: { en: '{name} checked your account.', pcm: '{name} check your account.', yo: '{name} wo àkáǹtì rẹ.' },
    helperPaid: { en: '{name} paid {amt} to {to} for you. Your wallet has {wallet}.', pcm: '{name} don pay {amt} give {to} for you. {wallet} remain for your wallet.', yo: '{name} ti san {amt} fún {to} fún ọ. {wallet} ló kù nínú àpò owó rẹ.' },
    askAccountNoBank: { en: 'What is the account number you are sending to?', pcm: 'Call the account number where you wan send the money go.', yo: 'Sọ nọ́ńbà àkáǹtì tí o fẹ́ fi owó ránṣẹ́ sí.' },
    promiseOffer: {
      en: ' Would you like to record a promise in your own voice? If you ever try to take this money out early, I will play it back to you. Say yes or no.',
      pcm: ' You wan record promise with your own voice? If you later try comot this money before time, I go play am back for you. Talk yes or no.',
      yo: ' Ṣé o fẹ́ gba ìlérí sílẹ̀ pẹ̀lú ohùn ara rẹ? Tí o bá gbìyànjú láti yọ owó yìí ní kùtùkùtù, màá tún gbé e sọ fún ọ. Sọ bẹ́ẹ̀ni tàbí rárá.'
    },
    promiseIntro: {
      en: 'After the beep, say why this money matters, in your own words. For example: “This is for Tolu’s school fees. Don’t let me touch it before January.”',
      pcm: 'After the beep, talk why this money matter, with your own words. Like: “Na for Tolu school fees. No let me touch am before January.”',
      yo: 'Lẹ́yìn ìró náà, sọ ìdí tí owó yìí fi ṣe pàtàkì, ní ọ̀rọ̀ ara rẹ. Bí àpẹẹrẹ: “Owó ilé ìwé Tolu nìyí. Má jẹ́ kí n fọwọ́ kàn án kí January tó dé.”'
    },
    promiseSaved: { en: 'Your promise for {goal} is saved. I will remind you with your own voice if you ever try to take it out early.', pcm: 'I don keep your promise for {goal}. I go remind you with your own voice if you try comot am before time.', yo: 'Mo ti pa ìlérí rẹ fún {goal} mọ́. Màá rán ọ létí pẹ̀lú ohùn ara rẹ tí o bá fẹ́ yọ ọ́ ní kùtùkùtù.' },
    promiseNone: { en: 'There is no promise for {goal} yet. Say “record a promise for {goal}” to add one.', pcm: 'No promise for {goal} yet. Talk “record promise for {goal}” to add one.', yo: 'Kò sí ìlérí fún {goal} síbẹ̀. Sọ pé “gba ìlérí sílẹ̀ fún {goal}”.' },
    promiseWhich: { en: 'Which savings is the promise for?', pcm: 'Which savings the promise be for?', yo: 'Fún ìfowópamọ́ wo ni ìlérí náà?' },
    promisePlay: { en: 'Here is the promise you made for {goal}.', pcm: 'Na the promise wey you make for {goal} be this.', yo: 'Èyí ni ìlérí tí o ṣe fún {goal}.' },
    promiseGate: {
      en: 'Before I take {amt} out of {goal}, listen to what you told me.',
      pcm: 'Before I comot {amt} from {goal}, listen to wetin you tell me.',
      yo: 'Kí n tó yọ {amt} kúrò nínú {goal}, gbọ́ ohun tí o sọ fún mi.'
    },
    promiseAsk: { en: ' Is this an emergency? Say yes or no.', pcm: ' Na emergency? Talk yes or no.', yo: ' Ṣé pàjáwìrì ni? Sọ bẹ́ẹ̀ni tàbí rárá.' },
    promiseKept: { en: 'Okay. Your money stays safe in {goal}. Well done for keeping your promise.', pcm: 'Okay. Your money dey safe inside {goal}. Well done, you keep your promise.', yo: 'Ó dára. Owó rẹ wà láìléwu nínú {goal}. Kú iṣẹ́ fún pípa ìlérí rẹ mọ́.' },
    promiseHelper: {
      en: 'Since it is an emergency, I will ask {names} to approve it. They may call you first. Confirm with your secret phrase, then I will send the request.',
      pcm: 'Since na emergency, I go ask {names} to approve am. Dem fit call you first. Confirm with your secret phrase, then I go send the request.',
      yo: 'Níwọ̀n bí ó ti jẹ́ pàjáwìrì, màá béèrè lọ́wọ́ {names} láti fọwọ́ sí i. Wọ́n lè pè ọ́ ná. Jẹ́rìí pẹ̀lú ọ̀rọ̀ àṣírí rẹ, màá sì fi ìbéèrè náà ránṣẹ́.'
    },
    promiseHold: {
      en: 'You have no helper yet, so I will hold {amt} for 24 hours. Ask me again after {when} and it will be ready. Adding a trusted helper lets emergencies go through faster.',
      pcm: 'You never get helper, so I go hold {amt} for 24 hours. Ask me again after {when} and e go ready. If you add helper wey you trust, emergency go pass faster.',
      yo: 'O kò tíì ní olùrànlọ́wọ́, nítorí náà màá dá {amt} dúró fún wákàtí 24. Tún béèrè lẹ́yìn {when}, yóò sì ṣetán. Fífi olùrànlọ́wọ́ kún un máa ń jẹ́ kí pàjáwìrì yára kọjá.'
    },
    promiseWaiting: { en: 'Your {amt} from {goal} will be ready after {when}.', pcm: 'Your {amt} from {goal} go ready after {when}.', yo: 'Owó {amt} rẹ láti inú {goal} yóò ṣetán lẹ́yìn {when}.' },
    promiseReady: { en: 'The 24 hours have passed, so this one goes through.', pcm: 'The 24 hours don pass, so this one go pass.', yo: 'Wákàtí 24 ti kọjá, nítorí náà èyí yóò kọjá.' },
    askedHelperW: { en: 'I have asked {names} to approve taking {amt} out of {goal}. They may call you first. I will tell you when they answer.', pcm: 'I don ask {names} make dem approve to comot {amt} from {goal}. Dem fit call you first. I go tell you when dem answer.', yo: 'Mo ti béèrè lọ́wọ́ {names} láti fọwọ́ sí yíyọ {amt} kúrò nínú {goal}. Wọ́n lè pè ọ́ ná. Màá sọ fún ọ nígbà tí wọ́n bá dáhùn.' },
    promiseReached: { en: ' You kept your promise.', pcm: ' You keep your promise.', yo: ' O pa ìlérí rẹ mọ́.' },
    receiptNone: { en: 'You have not done anything yet.', pcm: 'You never do anything yet.', yo: 'O kò tíì ṣe ohunkóhun.' },
    receipt: {
      en: 'Your last transaction: {when}, {what}{how}. Reference {ref}.',
      pcm: 'Your last transaction: {when}, {what}{how}. Reference na {ref}.',
      yo: 'Ìdúnàdúrà rẹ tó kọjá: {when}, {what}{how}. Nọ́ńbà ìtọ́kasí {ref}.'
    },
    rSend: { en: 'you sent {amt} to {n} at {bank}', pcm: 'you send {amt} give {n} for {bank}', yo: 'o fi {amt} ránṣẹ́ sí {n} ní {bank}' },
    rSave: { en: 'you saved {amt} to {g}', pcm: 'you keep {amt} for {g}', yo: 'o fi {amt} pamọ́ sí {g}' },
    rMove: { en: 'you moved {amt} from {g} to your wallet', pcm: 'you comot {amt} from {g} go your wallet', yo: 'o gbé {amt} láti {g} sí àpò rẹ' },
    rAirtime: { en: 'you bought {amt} {n} airtime', pcm: 'you buy {amt} {n} card', yo: 'o ra káàdì ìpè {n} {amt}' },
    rIn: { en: 'you received {amt} from {n}', pcm: '{n} send you {amt}', yo: 'o gba {amt} láti ọ̀dọ̀ {n}' },
    rHow: { en: ', verified with {v}', pcm: ', verified with {v}', yo: ', tí a fọwọ́ sí pẹ̀lú {v}' },
    promiseRuleQ: {
      en: ' If you ever need this money in an emergency, what should I do? Say: just confirm, ask my helper, or hold for 24 hours.',
      pcm: ' If emergency come and you need this money, wetin I go do? Talk: just confirm, ask my helper, or hold am for 24 hours.',
      yo: ' Tí pàjáwìrì bá dé tí o sì nílò owó yìí, kí ni kí n ṣe? Sọ pé: kàn jẹ́rìí, béèrè lọ́wọ́ olùrànlọ́wọ́ mi, tàbí dá a dúró fún wákàtí 24.'
    },
    promiseRuleSet: { en: 'Okay. In an emergency I will {rule}. You can change this on the goal’s page.', pcm: 'Okay. If emergency come, I go {rule}. You fit change am for the goal page.', yo: 'Ó dára. Nínú pàjáwìrì màá {rule}. O lè yí i padà lójú ewé èròngbà náà.' },
    ruleConfirm: { en: 'let it through once you confirm', pcm: 'let am pass once you confirm', yo: 'jẹ́ kí ó kọjá tí o bá jẹ́rìí' },
    ruleHelper: { en: 'ask your helper first', pcm: 'ask your helper first', yo: 'béèrè lọ́wọ́ olùrànlọ́wọ́ rẹ ná' },
    ruleWait: { en: 'hold it for 24 hours', pcm: 'hold am for 24 hours', yo: 'dá a dúró fún wákàtí 24' },
    promiseOwn: { en: 'Since it is an emergency, confirm and it is yours.', pcm: 'Since na emergency, confirm am and e be your own.', yo: 'Níwọ̀n bí ó ti jẹ́ pàjáwìrì, jẹ́rìí, tìrẹ ni.' },
    promiseWait: { en: 'Since it is an emergency, I will hold {amt} for 24 hours as you asked. Ask me again after {when}.', pcm: 'Since na emergency, I go hold {amt} for 24 hours as you talk. Ask me again after {when}.', yo: 'Níwọ̀n bí ó ti jẹ́ pàjáwìrì, màá dá {amt} dúró fún wákàtí 24 bí o ti béèrè. Tún béèrè lẹ́yìn {when}.' },
    voiceSample: { en: 'Hello, I am {v}. I can help you save money, send money, and keep your savings safe. Just talk to me.', pcm: 'Hello, na {v} be this. I fit help you save money, send money, and keep your savings safe. Just talk to me.', yo: 'Báwo, {v} ni mí. Mo lè ràn ọ́ lọ́wọ́ láti fi owó pamọ́, fi owó ránṣẹ́, kí n sì dáàbò bo owó rẹ. Kàn bá mi sọ̀rọ̀.' },
    notCaught: { en: "I didn't catch that.", pcm: 'I no catch am well.', yo: 'Mi ò gbọ́ ọ dáadáa.' },
    sayDigits: { en: 'Say the 10 digits slowly, one by one.', pcm: 'Call the 10 numbers slowly, one by one.', yo: 'Sọ àwọn nọ́ńbà mẹ́wàá náà díẹ̀díẹ̀, ní ọ̀kọ̀ọ̀kan.' },
    confirmSendAcct: {
      en: 'Send {amt} to {bank} account {acct}? Say your secret phrase to confirm, or no to cancel.',
      pcm: 'Make I send {amt} go {bank} account {acct}? Talk your secret phrase make I send am. If you no want again, talk no.',
      yo: 'Ṣé kí n fi {amt} ránṣẹ́ sí àkáǹtì {bank} {acct}? Sọ ọ̀rọ̀ àṣírí rẹ láti fọwọ́sí, tàbí “rárá” láti fagilé.'
    },
    confirmSend: {
      en: 'Send {amt} to {name}, {bank} ••{last4}? Say your secret phrase to confirm, or no to cancel.',
      pcm: 'Make I send {amt} give {name}, {bank} ••{last4}? Talk your secret phrase make I send am. If you no want again, talk no.',
      yo: 'Ṣé kí n fi {amt} ránṣẹ́ sí {name}, {bank} ••{last4}? Sọ ọ̀rọ̀ àṣírí rẹ láti fọwọ́sí, tàbí “rárá” láti fagilé.'
    },
    doneSend: {
      en: 'Sent. {name} has received {amt}. Your wallet now has {wallet}.',
      pcm: 'E don go! {name} don collect {amt}. {wallet} remain for your wallet.',
      yo: 'Ó ti lọ! {name} ti gba {amt}. {wallet} ló kù nínú àpò owó rẹ.'
    },
    nudge: {
      en: ' Want to save {nudge} to {goal} too? Say yes or no.',
      pcm: ' Shey make I put {nudge} for {goal} join? Talk yes or no.',
      yo: ' Ṣé kí n fi {nudge} pamọ́ sínú {goal} pẹ̀lú? Sọ “bẹ́ẹ̀ni” tàbí “rárá”.'
    },
    unknownContact: {
      en: 'I cannot find {name} in your contacts. Say their 10-digit account number and bank, like: send 5,000 to 0123456789 GTBank.',
      pcm: 'I no see {name} for your contacts o. Give me the account number and the bank, like: send 5k to 0123456789 GTBank.',
      yo: 'Mi ò rí {name} nínú àwọn olùbásọ̀rọ̀ rẹ. Sọ nọ́ńbà àkáǹtì rẹ̀ àti báǹkì, bíi: fi ẹgbẹ̀rún márùn-ún ránṣẹ́ sí 0123456789 GTBank.'
    },
    needBank: { en: 'Which bank is account {acct} with?', pcm: 'Na which bank be this account {acct}?', yo: 'Báǹkì wo ni àkáǹtì {acct} wà?' },
    phraseHint: { en: 'Please say your secret phrase to confirm, or no to cancel.', pcm: 'Abeg talk your secret phrase make I confirm am. If you no want again, talk no.', yo: 'Jọ̀ọ́ sọ ọ̀rọ̀ àṣírí rẹ láti fọwọ́sí, tàbí “rárá” láti fagilé.' },
    phraseWrong: { en: 'That is not your secret phrase. Try again, or say no to cancel.', pcm: 'That one no be your secret phrase o. Try again, or talk no.', yo: 'Ìyẹn kọ́ ni ọ̀rọ̀ àṣírí rẹ. Gbìyànjú lẹ́ẹ̀kan sí i, tàbí sọ “rárá”.' },
    locked: { en: 'Too many wrong tries. I cancelled it to keep your money safe.', pcm: 'You don try am too many times, so I cancel am make your money dey safe.', yo: 'O ti gbìyànjú ní ọ̀pọ̀ ìgbà. Mo ti fagilé e kí owó rẹ lè wà láìléwu.' },
    secretSet: { en: 'Your secret phrase is now: {phrase}. Keep it private.', pcm: 'I don change your secret phrase to: {phrase}. No tell anybody o.', yo: 'Ọ̀rọ̀ àṣírí rẹ ti di: {phrase}. Má sọ fún ẹnikẹ́ni.' },
    account: {
      en: 'Your Vosa account number is {acct}, Vosa Demo Bank. People can send money to you with it.',
      pcm: 'Your Vosa account number na {acct}, Vosa Demo Bank. Anybody fit use am send you money.',
      yo: 'Nọ́ńbà àkáǹtì Vosa rẹ ni {acct}, Vosa Demo Bank. Àwọn ènìyàn lè fi owó ránṣẹ́ sí ọ pẹ̀lú rẹ̀.'
    },
    incoming: {
      en: '{amt} just came in from {name}. Your wallet now has {wallet}.',
      pcm: 'Alert don land! {name} send you {amt}. Your wallet don reach {wallet}.',
      yo: 'Owó wọlé! {amt} ti dé láti ọ̀dọ̀ {name}. {wallet} ló wà nínú àpò owó rẹ báyìí.'
    },
    autoSaved: {
      en: ' As you asked, I saved {pct}%, that is {save}, to {goal}.',
      pcm: ' As you talk am, I don keep {pct}%, wey be {save}, for {goal}.',
      yo: ' Gẹ́gẹ́ bí o ṣe sọ, mo ti fi {pct}%, ìyẹn {save}, pamọ́ sínú {goal}.'
    },
    incomingNudge: {
      en: ' Want me to save 10% of it, that is {save}? Say yes or no.',
      pcm: ' Shey make I keep 10% of am, wey be {save}? Talk yes or no.',
      yo: ' Ṣé kí n fi 10% rẹ̀ pamọ́, ìyẹn {save}? Sọ “bẹ́ẹ̀ni” tàbí “rárá”.'
    },
    autosaveSet: {
      en: 'Done. From now on, I will save {pct}% of any money you receive into {goal}.',
      pcm: 'No wahala. Anytime money enter, I go keep {pct}% for {goal} sharp sharp.',
      yo: 'Ó dáa. Láti ìsinsìnyí lọ, màá máa fi {pct}% nínú owó tó bá wọlé pamọ́ sínú {goal}.'
    },
    autosaveOff: { en: 'Auto-save is off.', pcm: 'I don stop auto-save.', yo: 'Mo ti pa auto-save.' },
    askAirtime: { en: 'How much airtime?', pcm: 'How much card you wan buy?', yo: 'Káàdì ìpè èló ni?' },
    confirmAirtime: {
      en: 'Buy {amt} {net} airtime for {who}? Say yes to confirm.',
      pcm: 'Make I buy {amt} {net} card for {who}? Talk yes make I do am.',
      yo: 'Ṣé kí n ra káàdì ìpè {net} ti {amt} fún {who}? Sọ “bẹ́ẹ̀ni” láti fọwọ́sí.'
    },
    doneAirtime: {
      en: 'Done. {amt} {net} airtime sent to {who}. Your wallet has {wallet}.',
      pcm: 'E don land! {amt} {net} card don enter {who}. {wallet} remain for your wallet.',
      yo: 'Ó ti parí! Káàdì ìpè {amt} ti wọ {who}. {wallet} ló kù nínú àpò owó rẹ.'
    },
    yourLine: { en: 'your line', pcm: 'your line', yo: 'nọ́ńbà rẹ' },
    handsfreeOn: {
      en: 'Hands-free is on. I will listen again after every reply. Say stop listening to turn it off.',
      pcm: 'Hands-free don on. After every answer, I go dey listen. If you wan make I stop, talk “stop listening”.',
      yo: 'Hands-free ti bẹ̀rẹ̀. Màá máa gbọ́ lẹ́yìn ìdáhùn kọ̀ọ̀kan. Sọ “stop listening” láti pa á.'
    },
    handsfreeOff: { en: 'Hands-free is off. Tap the microphone or press the space bar when you want to talk.', pcm: 'Hands-free don off. When you wan talk, tap the mic or press space bar.', yo: 'Hands-free ti dúró. Tẹ máíkì tàbí space bar tí o bá fẹ́ sọ̀rọ̀.' },
    challenge: { en: ' After your secret phrase, say these numbers: {d}.', pcm: ' After your secret phrase, talk these numbers: {d}.', yo: ' Lẹ́yìn ọ̀rọ̀ àṣírí rẹ, sọ àwọn nọ́ńbà yìí: {d}.' },
    digitsWrong: { en: 'The numbers did not match. Say your secret phrase, then these new numbers: {d}.', pcm: 'The numbers no correct. Talk your secret phrase, then these new numbers: {d}.', yo: 'Àwọn nọ́ńbà náà kò bá a mu. Sọ ọ̀rọ̀ àṣírí rẹ, kí o sì sọ àwọn nọ́ńbà tuntun yìí: {d}.' },
    voiceWrong: { en: 'That does not sound like you, so I did not move the money. Try again with these numbers: {d}.', pcm: 'That voice no be your own, so I no move the money. Try again with these numbers: {d}.', yo: 'Ohùn yẹn kò dà bí tìrẹ, nítorí náà mi ò gbé owó náà. Gbìyànjú lẹ́ẹ̀kan sí i pẹ̀lú àwọn nọ́ńbà yìí: {d}.' },
    voiceShort: { en: 'I could not hear enough of your voice. Please say it again, a bit longer: your secret phrase, then {d}.', pcm: 'I no hear your voice well. Abeg talk am again: your secret phrase, then {d}.', yo: 'Mi ò gbọ́ ohùn rẹ tó. Jọ̀ọ́ tún un sọ: ọ̀rọ̀ àṣírí rẹ, lẹ́yìn náà {d}.' },
    sayAloud: { en: 'Voice ID is on, so please say it out loud instead of typing. Or use the fingerprint backup.', pcm: 'Voice ID dey on, so abeg talk am out instead of to type. Or use the fingerprint backup.', yo: 'Voice ID wà, nítorí náà jọ̀ọ́ sọ ọ́ jáde dípò kí o kọ ọ́. Tàbí lo ìka rẹ.' },
    askSave: { en: 'How much do you want to save?', pcm: 'How much you wan keep?', yo: 'Èló ni o fẹ́ fi pamọ́?' },
    askWithdraw: { en: 'How much do you want to withdraw?', pcm: 'How much you wan comot?', yo: 'Èló ni o fẹ́ yọ?' },
    askGoal: { en: 'How much is the goal?', pcm: 'How much be the target?', yo: 'Èló ni àfojúsùn náà?' },
    askDay: { en: 'Which day should I remind you?', pcm: 'Which day make I dey remind you?', yo: 'Ọjọ́ wo ni kí n máa rán ẹ létí?' },
    cancelled: { en: 'Okay, cancelled. Nothing changed.', pcm: 'No wahala, I don cancel am. Nothing change.', yo: 'Ó dáa, mo ti fagilé e. Kò sí ohun tó yí padà.' },
    confirmSave: {
      en: 'Save {amt} to {goal}? Say yes to confirm, or no to cancel.',
      pcm: 'Make I put {amt} inside {goal}? Talk yes make I do am, or talk no.',
      yo: 'Ṣé kí n fi {amt} sínú {goal}? Sọ “bẹ́ẹ̀ni” láti fọwọ́sí, tàbí “rárá” láti fagilé.'
    },
    doneSave: {
      en: 'Done. {goal} now has {bal}{prog}.',
      pcm: 'E don enter! {goal} don reach {bal}{prog}.',
      yo: 'Ó ti parí! {goal} ti tó {bal} báyìí{prog}.'
    },
    prog: { en: ', {pct}% of your {target} target', pcm: ', wey be {pct}% of your {target} target', yo: ', ìyẹn {pct}% nínú {target}' },
    reached: { en: ' You reached your target!', pcm: ' You don hit your target! Well done o!', yo: ' O ti dé àfojúsùn rẹ!' },
    confirmGoal: {
      en: 'Create a {goal} goal of {target} by {date}? That is about {weekly} a week. Say yes to confirm.',
      pcm: 'Make I open {goal} target of {target} before {date}? You go dey keep like {weekly} every week. Talk yes make I do am.',
      yo: 'Ṣé kí n ṣí àfojúsùn {goal} ti {target} kí ó tó di {date}? Ìyẹn tó {weekly} lọ́sẹ̀. Sọ “bẹ́ẹ̀ni” láti fọwọ́sí.'
    },
    confirmGoalNoDate: {
      en: 'Create a {goal} goal of {target}? Say yes to confirm.',
      pcm: 'Make I open {goal} target of {target}? Talk yes make I do am.',
      yo: 'Ṣé kí n ṣí àfojúsùn {goal} ti {target}? Sọ “bẹ́ẹ̀ni” láti fọwọ́sí.'
    },
    doneGoal: {
      en: "Your {goal} goal is set. Let's reach {target} together.",
      pcm: 'I don open your {goal} target. We go reach {target} together, small small.',
      yo: 'A ti ṣètò àfojúsùn {goal}. A ó jọ dé {target}.'
    },
    confirmWithdraw: {
      en: 'Move {amt} from {goal} to your wallet? Say your secret phrase to confirm, or no to cancel.',
      pcm: 'You wan comot {amt} from {goal} put for your wallet? Talk your secret phrase make I do am, or talk no.',
      yo: 'Ṣé kí n gbé {amt} láti inú {goal} lọ sí àpò owó rẹ? Sọ ọ̀rọ̀ àṣírí rẹ láti fọwọ́sí, tàbí “rárá” láti fagilé.'
    },
    doneWithdraw: {
      en: 'Done. {amt} is now in your wallet. {goal} has {bal} left.',
      pcm: 'E don land! {amt} don enter your wallet. {bal} remain for {goal}.',
      yo: 'Ó ti parí! {amt} ti wọ àpò owó rẹ. {bal} ló ṣẹ́kù nínú {goal}.'
    },
    insufficient: {
      en: '{goal} only has {bal}, so I cannot withdraw {amt}.',
      pcm: 'Na only {bal} dey inside {goal}, so I no fit comot {amt}.',
      yo: '{bal} nìkan ló wà nínú {goal}, nítorí náà mi ò lè yọ {amt}.'
    },
    balanceTotal: {
      en: 'Your wallet has {wallet}, and you have {total} saved. {list}',
      pcm: 'You get {wallet} for your wallet, and {total} for savings. {list}',
      yo: '{wallet} ló wà nínú àpò owó rẹ, o sì ti fi {total} pamọ́. {list}'
    },
    balanceGoal: { en: '{goal} has {bal}{prog}.', pcm: '{bal} dey inside {goal}{prog}.', yo: '{bal} ló wà nínú {goal}{prog}.' },
    goals: { en: 'You have {n} savings pots: {list}.', pcm: 'You get {n} savings pots: {list}.', yo: 'O ní àpò ìfowópamọ́ {n}: {list}.' },
    remind: {
      en: 'Okay. I will remind you to save every {day}.',
      pcm: 'No wahala. Every {day}, I go remind you make you save.',
      yo: 'Ó dáa. Màá máa rán ẹ létí láti fowó pamọ́ ní gbogbo ọjọ́ {day}.'
    },
    noGoal: {
      en: "You don't have a {goal} pot yet. Say: I want to save 50k for {goal} by December.",
      pcm: 'You never open {goal} pot o. Talk like this: I wan save 50k for {goal} before December.',
      yo: 'O kò tíì ní àpò {goal}. Sọ pé: mo fẹ́ fi ẹgbẹ̀rún lọ́nà àádọ́ta pamọ́ fún {goal} kí ó tó di December.'
    },
    yoNoVoice: {
      en: 'Voice input is not available here. Type below or tap an example.',
      pcm: 'Voice no dey work for here. Type am or tap one example.',
      yo: 'Ohùn kò ṣiṣẹ́ níbí. Tẹ ọ̀rọ̀ sí ìsàlẹ̀ tàbí tẹ àpẹẹrẹ kan.'
    }
  };

  const EXPLAIN = {
    mmf: {
      en: 'A money market fund pools money from many people and lends it safely to the government and big companies for short periods. It usually pays more interest than a bank account, and you can take your money out quickly.',
      pcm: 'Money market fund na where plenty people gather money, and dem lend am to government and big companies for short time. E dey pay better interest pass bank, and you fit collect your money quick quick.',
      yo: 'Money market fund ni ibi tí ọ̀pọ̀ ènìyàn ti ń kó owó jọ, tí wọ́n sì ń yá ìjọba àti àwọn ilé-iṣẹ́ ńlá ní owó náà fún ìgbà kúkúrú. Èlé rẹ̀ sábà máa ń ju ti báǹkì lọ, o sì lè gba owó rẹ padà kíákíá.'
    },
    interest: {
      en: 'Interest is extra money you earn for keeping your money saved. The longer you save, the more it grows.',
      pcm: 'Interest na the extra money wey you dey gain as you keep your money. The longer you keep am, the more e go grow.',
      yo: 'Èlé ni owó àfikún tí o ń rí gbà nítorí pé o fi owó rẹ pamọ́. Bí o bá ṣe pẹ́ tó, bẹ́ẹ̀ ni yóò ṣe pọ̀ sí i.'
    },
    inflation: {
      en: 'Inflation means prices keep going up, so the same money buys less over time. Saving where you earn interest helps your money keep its value.',
      pcm: 'Inflation mean say price of things dey go up, so the same money go dey buy less as time dey go. If you keep your money where e dey gain interest, e no go lose value too much.',
      yo: 'Inflation túmọ̀ sí pé iye ọjà ń gòkè, nítorí náà owó kan náà yóò máa ra nǹkan díẹ̀ bí àkókò ti ń lọ. Fífi owó pamọ́ níbi tí o ti ń jẹ èlé ń ràn án lọ́wọ́ láti má ṣe pàdánù iye rẹ̀.'
    },
    tbill: {
      en: 'Treasury bills are short loans you give to the government. They pay you back with interest after a few months, and they are very safe.',
      pcm: 'Treasury bill na like small loan wey you give government. After some months, dem go pay you back with interest, and e safe well well.',
      yo: 'Treasury bills jẹ́ owó tí o yá ìjọba fún ìgbà kúkúrú. Wọ́n á san án padà fún ọ pẹ̀lú èlé lẹ́yìn oṣù díẹ̀, ó sì ní ààbò gan-an.'
    },
    mutual: {
      en: 'A mutual fund collects money from many people, and experts invest it in different things for you, so your risk is spread out.',
      pcm: 'Mutual fund na where dem gather money from plenty people, and experts go invest am for different things, so your risk no go dey one place.',
      yo: 'Mutual fund ń kó owó jọ láti ọ̀dọ̀ ọ̀pọ̀ ènìyàn, àwọn amòye á sì fi í ṣòwò ní ọ̀nà oríṣiríṣi fún ọ, kí ewu má bàa wà ní ibì kan ṣoṣo.'
    },
    emergencyfund: {
      en: 'An emergency fund is money you keep aside for surprises, like hospital bills or losing income. A good target is three months of your expenses.',
      pcm: 'Emergency fund na money wey you keep aside for sudden wahala, like hospital bill or if work stop. Try get like three months of your spending.',
      yo: 'Owó pàjáwìrì ni owó tí o yà sọ́tọ̀ fún ohun àìròtẹ́lẹ̀ bí owó ilé-ìwòsàn. Ó dára kí o ní iye tí o ń ná fún oṣù mẹ́ta.'
    }
  };

  // Hausa and Igbo replies for the everyday flows. Anything not listed here falls back to English.
  // First version: a fluent speaker should review these before launch.
  const HA_IG = {
    welcome: { ha: 'Sannu, ni ce Vosa. Faɗa mini abin da kake son yi da kuɗinka.', ig: 'Ndewo, abụ m Vosa. Gwa m ihe ị chọrọ iji ego gị mee.' },
    greet: { ha: 'Sannu! Me kake son yi? Za ka iya ajiye kuɗi, duba kuɗinka, ko saita buri.', ig: 'Ndewo! Gịnị ka ị chọrọ ime? Ị nwere ike chekwaa ego, lelee ego gị, ma ọ bụ tọọ ebumnuche.' },
    help: { ha: 'Za ka iya cewa: ajiye naira dubu biyar don haya. Aika dubu biyar ga Tunde. Sayi katin MTN na dubu ɗaya. Kuɗi nawa nake da shi? Ina son ajiye dubu ɗari biyu don kuɗin makaranta kafin Janairu.', ig: 'Ị nwere ike ịsị: chekwaa puku naira ise maka ụgwọ ụlọ. Zipu puku ise nye Tunde. Zụta kaadị MTN puku naira. Ego ole ka m nwere? Achọrọ m ichekwa puku narị abụọ maka ụgwọ akwụkwọ tupu Jenụwarị.' },
    unknown: { ha: 'Yi haƙuri, ban gane ba. Gwada cewa: ajiye naira dubu biyar don haya.', ig: 'Ndo, aghọtaghị m. Nwaa ịsị: chekwaa puku naira ise maka ụgwọ ụlọ.' },
    notCaught: { ha: 'Ban gane ba.', ig: 'Aghọtaghị m.' },
    wallet: { ha: 'Walat ɗinka yana da {wallet} don kashewa.', ig: 'Akpa ego gị nwere {wallet} iji mefuo.' },
    lowWallet: { ha: 'Walat ɗinka yana da {wallet} kawai, don haka ba zan iya yin {amt} ba.', ig: 'Akpa ego gị nwere naanị {wallet}, ya mere enweghị m ike ime {amt}.' },
    askSend: { ha: 'Nawa zan aika?', ig: 'Ego ole ka m ga-ezipu?' },
    askRecipient: { ha: 'Ga wa kake aikawa? Faɗi sunansa, ko lambar asusu.', ig: 'Onye ka ị na-ezigara? Kwuo aha ya, ma ọ bụ nọmba akaụntụ.' },
    confirmSend: { ha: 'A aika {amt} ga {name}, {bank} ••{last4}? Faɗi kalmar sirrinka don tabbatarwa, ko a’a don sokewa.', ig: 'Zipu {amt} nye {name}, {bank} ••{last4}? Kwuo okwu nzuzo gị iji kwado, ma ọ bụ mba iji kagbuo.' },
    doneSend: { ha: 'An aika. {name} ya karɓi {amt}. Yanzu walat ɗinka yana da {wallet}.', ig: 'Ezipụla ya. {name} anatala {amt}. Akpa ego gị nwere {wallet} ugbu a.' },
    askSave: { ha: 'Nawa kake son ajiyewa?', ig: 'Ego ole ka ị chọrọ ichekwa?' },
    confirmSave: { ha: 'A ajiye {amt} a {goal}? Ka ce eh don tabbatarwa, ko a’a don sokewa.', ig: 'Chekwaa {amt} na {goal}? Sị ee iji kwado, ma ọ bụ mba iji kagbuo.' },
    doneSave: { ha: 'An gama. Yanzu {goal} yana da {bal}{prog}.', ig: 'Emeela. {goal} nwere {bal} ugbu a{prog}.' },
    prog: { ha: ', kashi {pct} cikin ɗari na burinka na {target}', ig: ', pasent {pct} nke ebumnuche gị {target}' },
    reached: { ha: ' Ka cimma burinka!', ig: ' I ruola ebumnuche gị!' },
    askWithdraw: { ha: 'Nawa kake son cirewa?', ig: 'Ego ole ka ị chọrọ iwepụ?' },
    confirmWithdraw: { ha: 'A mayar da {amt} daga {goal} zuwa walat ɗinka? Faɗi kalmar sirrinka don tabbatarwa, ko a’a don sokewa.', ig: 'Bugharịa {amt} site na {goal} gaa n’akpa ego gị? Kwuo okwu nzuzo gị iji kwado, ma ọ bụ mba iji kagbuo.' },
    doneWithdraw: { ha: 'An gama. {amt} yanzu yana cikin walat ɗinka. {goal} ya rage {bal}.', ig: 'Emeela. {amt} dị n’akpa ego gị ugbu a. {goal} fọdụrụ {bal}.' },
    insufficient: { ha: '{goal} yana da {bal} kawai, don haka ba zan iya cire {amt} ba.', ig: '{goal} nwere naanị {bal}, ya mere enweghị m ike iwepụ {amt}.' },
    balanceTotal: { ha: 'Walat ɗinka yana da {wallet}, kuma ka ajiye {total}. {list}', ig: 'Akpa ego gị nwere {wallet}, i chekwakwara {total}. {list}' },
    balanceGoal: { ha: '{goal} yana da {bal}{prog}.', ig: '{goal} nwere {bal}{prog}.' },
    goals: { ha: 'Kana da asusun ajiya {n}: {list}.', ig: 'Ị nwere akpa nchekwa {n}: {list}.' },
    askGoal: { ha: 'Nawa ne burin?', ig: 'Ego ole bụ ebumnuche ahụ?' },
    confirmGoal: { ha: 'A ƙirƙiri burin {goal} na {target} kafin {date}? Wato kusan {weekly} a mako. Ka ce eh don tabbatarwa.', ig: 'Mepụta ebumnuche {goal} nke {target} tupu {date}? Nke ahụ bụ ihe dị ka {weekly} kwa izu. Sị ee iji kwado.' },
    confirmGoalNoDate: { ha: 'A ƙirƙiri burin {goal} na {target}? Ka ce eh don tabbatarwa.', ig: 'Mepụta ebumnuche {goal} nke {target}? Sị ee iji kwado.' },
    doneGoal: { ha: 'An saita burin {goal}. Mu cimma {target} tare.', ig: 'Etọọla ebumnuche {goal} gị. Ka anyị rute {target} ọnụ.' },
    cancelled: { ha: 'To, an soke. Babu abin da ya canza.', ig: 'Ọ dị mma, akagbuola ya. Ọ dịghị ihe gbanwere.' },
    challenge: { ha: ' Bayan kalmar sirrinka, faɗi waɗannan lambobi: {d}.', ig: ' Mgbe i kwuchara okwu nzuzo gị, kwuo nọmba ndị a: {d}.' },
    phraseHint: { ha: 'Don Allah faɗi kalmar sirrinka don tabbatarwa, ko a’a don sokewa.', ig: 'Biko kwuo okwu nzuzo gị iji kwado, ma ọ bụ mba iji kagbuo.' },
    phraseWrong: { ha: 'Wannan ba kalmar sirrinka ba ce. Sake gwadawa, ko ka ce a’a don sokewa.', ig: 'Nke ahụ abụghị okwu nzuzo gị. Nwaa ọzọ, ma ọ bụ sị mba iji kagbuo.' },
    digitsWrong: { ha: 'Lambobin ba su yi daidai ba. Faɗi kalmar sirrinka, sannan waɗannan sababbin lambobi: {d}.', ig: 'Nọmba ndị ahụ adabaghị. Kwuo okwu nzuzo gị, wee kwuo nọmba ọhụrụ ndị a: {d}.' },
    voiceWrong: { ha: 'Wannan ba kamar muryarka ba ce, don haka ban motsa kuɗin ba. Sake gwadawa da waɗannan lambobi: {d}.', ig: 'Nke ahụ adịghị ka olu gị, ya mere ebugharịghị m ego ahụ. Nwaa ọzọ na nọmba ndị a: {d}.' },
    sayAloud: { ha: 'Voice ID yana kunne, don haka faɗa da baki maimakon rubutu. Ko ka yi amfani da yatsa.', ig: 'Voice ID gbanyere, biko kwuo ya n’olu kama ide ya. Ma ọ bụ jiri mkpịsị aka gị.' },
    askAirtime: { ha: 'Katin nawa?', ig: 'Kaadị ego ole?' },
    confirmAirtime: { ha: 'A sayi katin {net} na {amt} don {who}? Ka ce eh don tabbatarwa.', ig: 'Zụta kaadị {net} nke {amt} maka {who}? Sị ee iji kwado.' },
    doneAirtime: { ha: 'An gama. An aika katin {net} na {amt} zuwa {who}. Walat ɗinka yana da {wallet}.', ig: 'Emeela. Ezipụla kaadị {net} nke {amt} nye {who}. Akpa ego gị nwere {wallet}.' },
    locked: { ha: 'Kuskure da yawa. Na soke shi don kare kuɗinka.', ig: 'Mmehie dị ọtụtụ. Akagbuola m ya iji chebe ego gị.' },
    nudge: { ha: ' Kana son ajiye {nudge} a {goal} ma? Ka ce eh ko a’a.', ig: ' Ị chọrọ ichekwakwa {nudge} na {goal}? Sị ee ma ọ bụ mba.' },
    promiseOffer: { ha: ' Kana son yin alƙawari da muryarka? Idan ka yi ƙoƙarin cire wannan kuɗi da wuri, zan sake kunna maka shi. Ka ce eh ko a’a.', ig: ' Ị chọrọ ikwe nkwa n’olu gị? Ọ bụrụ na ị gbalịa iwepụ ego a n’oge na-erubeghị, m ga-akpọghachi gị ya. Sị ee ma ọ bụ mba.' },
    promiseIntro: { ha: 'Bayan ƙara, faɗi dalilin da wannan kuɗi ke da muhimmanci, da kalmominka. Misali: “Na kuɗin makarantar Tolu ne. Kada ka bar ni in taɓa shi kafin Janairu.”', ig: 'Mgbe ụda ahụ gasịrị, kwuo ihe mere ego a ji dị mkpa, n’okwu gị. Ọmụmaatụ: “Ọ bụ maka ụgwọ akwụkwọ Tolu. Ekwela ka m metụ ya tupu Jenụwarị.”' },
    promiseGate: { ha: 'Kafin in cire {amt} daga {goal}, ka saurari abin da ka faɗa mini.', ig: 'Tupu m ewepụ {amt} na {goal}, gee ntị n’ihe ị gwara m.' },
    promiseAsk: { ha: ' Gaggawa ce? Ka ce eh ko a’a.', ig: ' Ọ bụ ihe mberede? Sị ee ma ọ bụ mba.' },
    promiseKept: { ha: 'To. Kuɗinka ya tsare a {goal}. Madalla da cika alƙawarinka.', ig: 'Ọ dị mma. Ego gị nọ na nchekwa na {goal}. I meela maka idebe nkwa gị.' },
    promiseSaved: { ha: 'An ajiye alƙawarinka na {goal}. Zan tunatar da kai da muryarka idan ka yi ƙoƙarin cirewa da wuri.', ig: 'Echekwala nkwa gị maka {goal}. M ga-eji olu gị chetara gị ma ọ bụrụ na ị gbalịa iwepụ ya n’oge na-erubeghị.' },
    promiseReached: { ha: ' Ka cika alƙawarinka.', ig: ' I debere nkwa gị.' },
    askedHelper: { ha: 'Wannan {amt} ne{why}. Don kare ka, na nemi {names} ya duba. Zan faɗa maka idan ya amsa.', ig: 'Nke a bụ {amt}{why}. Iji chebe gị, arịọla m {names} ka ọ lelee ya. M ga-agwa gị mgbe ọ zara.' },
    whyNew: { ha: ' ga wanda ba ka taɓa biya ba', ig: ' nye onye ị na-akwụbeghị ụgwọ mbụ' },
    helperApproved: { ha: '{name} ya amince. ', ig: '{name} kwadoro ya. ' },
    helperDeclined: { ha: '{name} ya ƙi, don haka kuɗin bai motsa ba.', ig: '{name} jụrụ ya, ya mere ego ahụ agaghị.' },
    handsfreeOn: { ha: 'Hands-free yana kunne. Zan sake saurara bayan kowace amsa. Ka ce daina saurara don kashewa.', ig: 'Hands-free gbanyere. M ga-ege ntị ọzọ mgbe ọ bụla m zachara. Sị kwụsị ige ntị iji gbanyụọ ya.' },
    handsfreeOff: { ha: 'Hands-free a kashe yake. Taɓa makirufo lokacin da kake son magana.', ig: 'Hands-free gbanyụrụ. Pịa ígwè olu mgbe ị chọrọ ikwu okwu.' },
    account: { ha: 'Lambar asusun Vosa ɗinka ita ce {acct}, Vosa Demo Bank. Mutane za su iya aika maka kuɗi da ita.', ig: 'Nọmba akaụntụ Vosa gị bụ {acct}, Vosa Demo Bank. Ndị mmadụ nwere ike iji ya zitere gị ego.' },
    voiceSample: { ha: 'Sannu, ni ce {v}. Zan iya taimaka maka ka ajiye kuɗi, ka aika kuɗi, kuma in kare ajiyarka. Kawai ka yi magana da ni.', ig: 'Ndewo, abụ m {v}. Enwere m ike inyere gị aka ichekwa ego, izipu ego, na ichebe nchekwa gị. Naanị gwa m okwu.' }
  };
  for (const k in HA_IG) if (S[k]) Object.assign(S[k], HA_IG[k]);

  function fill(tpl, vars) {
    return tpl.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? vars[k] : ''));
  }
  function say(key, lang, vars) {
    const e = S[key];
    return fill((e && (e[lang] || e.en)) || key, vars || {});
  }

  // Spoken form: "₦5,000" -> "5,000 naira" (Yorùbá: "5,000 náírà")
  function toSpeech(text, lang) {
    return text
      .replace(/₦(\d[\d,]*\d|\d)/g, (_, n) => (lang === 'ha' || lang === 'ig' ? 'naira ' + n : n + (lang === 'yo' ? ' náírà' : ' naira')))
      .replace(/••(\d{4})/g, (_, n) => (lang === 'yo' ? 'tó parí sí ' : lang === 'ha' ? 'mai ƙarewa da ' : lang === 'ig' ? 'nke na-ejedebe na ' : 'ending ') + n.split('').join(' '))
      .replace(/\b(\d{10,11})\b/g, (n) => n.split('').join(' '))
      .replace(/%/g, lang === 'yo' ? ' nínú ọgọ́rùn-ún' : ' percent');
  }

  root.VosaLogic = { newChallenge, spokenDigits, challengeOk, norm, fmt, parseAmount, parseDeadline, parseDay, detectGoal, customGoalName, understand, fixHearing, say, fill, S, EXPLAIN, GOALS, dateLabel, dayLabel, toSpeech };
})(typeof window !== 'undefined' ? window : globalThis);
