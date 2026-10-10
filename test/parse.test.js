require('../src/logic.js');
const L = globalThis.VosaLogic;
const now = new Date(2026, 9, 10);
const cases = [
  'Save 5000 for rent', 'save 5k for my house rent', 'Abeg save 2k put for school fees',
  'Fi ẹgbẹ̀rún márùn-ún pamọ́ fún owó ilé', 'fi egberun marun pamo fun owo ile',
  'Fi ẹgbẹ̀rún lọ́nà ogún pamọ́ fún owó ilé-ìwé', 'ẹgbẹ̀rún méjì àti ọgọ́rùn-ún márùn-ún',
  'How much do I have?', 'Èló ló wà nínú àpò mi?', 'how much I get for rent', 'wetin remain for my school fees',
  'I want to save 200k for school fees by January', 'I wan save 500k for japa before December',
  'Mo fẹ́ fi ẹgbẹ̀rún lọ́nà igba pamọ́ fún owó ilé-ìwé kí ó tó di January',
  'I want to save 150000 for a new laptop in 3 months', 'Create a goal of 1 million for my wedding',
  'save for christmas 10k', 'Withdraw 3000 from rent', 'comot 2k from my emergency money', 'Yọ ẹgbẹ̀rún méjì kúrò nínú owó ilé',
  'remind me every friday', 'Rán mi létí ní ọjọ́ Ẹtì', 'what is a money market fund?', 'wetin be inflation', 'Kí ni èlé?',
  'help', 'show my goals', 'save two thousand five hundred naira', 'put ₦7,500 inside my business money', 'hello', 'blah blah',
  'save fifty thousand for school', 'how far'
];
for (const c of cases) {
  const r = L.understand(c, { now });
  console.log(JSON.stringify(c).padEnd(70), '→', r.intent, r.amount || '', r.goal || r.customName || '', r.deadline ? L.dateLabel(r.deadline, now) : '', r.day ?? '', r.term || '');
}
console.log(L.understand('yes', {pending:true}).intent, L.understand('Bẹ́ẹ̀ni', {pending:true}).intent, L.understand('rárá', {pending:true}).intent, L.understand('10k', {awaiting:'amount'}).intent);
console.log('--- payments ---');
const contacts=[{name:'Tunde',aliases:['tunde']},{name:'Mama',aliases:['mama','mum','iya mi']}];
for (const c of ['Send 5k to Tunde','transfer 2000 to mama','Send 3k give Mama','Fi ẹgbẹ̀rún méjì ránṣẹ́ sí Mama','send 5000 to 0123456789 GTBank','send 2k to zero one two three four five six seven eight nine access','send 4k to Bola','pay Tunde 1500',
 'Buy 1,000 MTN airtime','recharge 500 airtel for 08031234567','Ra káàdì ìpè MTN ẹgbẹ̀rún kan','Save 10% of any money I receive','save 20 percent anytime money enter for my rent','stop auto save',
 'What is my account number?','how much is in my wallet','turn on hands-free','stop listening','change my secret phrase to red pepper','Save 5,000 for rent','Withdraw 3,000 from rent']) {
  const r=L.understand(c,{now,contacts});
  console.log(JSON.stringify(c).padEnd(62),'→',r.intent,r.amount||'',(r.contact&&r.contact.name)||r.account||r.unknownName||'',r.bank||'',r.network||'',r.phone||'',r.pct||'',r.on??'',r.phrase||'');
}
console.log(L.toSpeech('Send ₦5,000 to Tunde, GTBank ••4521? acct 9012345678, 10%','en'));
