// Rules for the Promise Score and loans against savings. Run: node test/score.test.js
const assert = require('assert');
require('../src/logic.js');
const L = globalThis.VosaLogic;
const ev = (...ks) => ks.map(k => ({ k, at: 1 }));

// --- Promise Score
assert.strictEqual(L.promiseScore([]).score, null, 'no events, no score');
assert.strictEqual(L.promiseScore(undefined).band, 'none');
assert.strictEqual(L.promiseScore(ev('kept')).score, 67, 'one kept promise');
assert.strictEqual(L.promiseScore(ev('broke')).score, 25, 'one early withdrawal');
assert.strictEqual(L.promiseScore(ev('kept', 'broke')).score, 40, 'breaking weighs more than keeping');
assert.strictEqual(L.promiseScore(ev('repaid')).score, 75, 'repaid on time');
assert.strictEqual(L.promiseScore(ev('late')).score, 20, 'a late loan is the heaviest penalty');
{
  const s = L.promiseScore(ev('kept', 'kept', 'borrowed', 'reached', 'repaid', 'broke'));
  assert.deepStrictEqual([s.tests, s.keptCount, s.events], [4, 3, 6]);
  assert.strictEqual(s.score, 73); assert.strictEqual(s.band, 'steady');
}
assert.strictEqual(L.promiseScore(ev('kept', 'kept', 'kept', 'reached')).band, 'strong');
assert.strictEqual(L.promiseScore(ev('broke', 'broke')).band, 'building');
assert.strictEqual(L.promiseScore(ev('kept', 'nonsense', null)).events, 1, 'unknown events are ignored');
for (let good = 0; good < 30; good++) for (let bad = 0; bad < 30; bad++) {
  const s = L.promiseScore(ev(...Array(good).fill('kept'), ...Array(bad).fill('late')));
  if (s.score != null) assert.ok(s.score > 0 && s.score < 100, 'score stays inside 1 to 99');
}
// more good behaviour never lowers the score; more bad never raises it
{
  let prev = L.promiseScore(ev('broke')).score;
  for (let n = 1; n < 20; n++) { const sc = L.promiseScore(ev('broke', ...Array(n).fill('kept'))).score; assert.ok(sc >= prev); prev = sc; }
  prev = L.promiseScore(ev('kept')).score;
  for (let n = 1; n < 20; n++) { const sc = L.promiseScore(ev('kept', ...Array(n).fill('broke'))).score; assert.ok(sc <= prev); prev = sc; }
}

// --- Loan limit: half the free savings, in steps of 500, never under 1,000
assert.strictEqual(L.loanLimit(40000), 20000);
assert.strictEqual(L.loanLimit(12300), 6000);
assert.strictEqual(L.loanLimit(2000), 1000);
assert.strictEqual(L.loanLimit(1999), 0);
assert.strictEqual(L.loanLimit(0), 0);
assert.strictEqual(L.loanLimit(-500), 0);
assert.strictEqual(L.loanLimit(undefined), 0);
for (let b = 0; b <= 200000; b += 137) assert.ok(L.loanLimit(b) <= b / 2, 'a loan is never more than half the savings');
assert.strictEqual(L.loanLeft({ amount: 5000, repaid: 2000 }), 3000);
assert.strictEqual(L.loanLeft({ amount: 5000, repaid: 9000 }), 0);
assert.strictEqual(L.loanLeft({ amount: 5000 }), 5000);

// --- What people say
const ctx = { contacts: [{ name: 'Tunde', aliases: ['tunde'] }] };
const is = (text, intent, amount, goal) => {
  const r = L.understand(text, ctx);
  assert.strictEqual(r.intent, intent, text + ' → ' + r.intent);
  if (amount !== undefined) assert.strictEqual(r.amount, amount, text + ' amount');
  if (goal !== undefined) assert.strictEqual(r.goal, goal, text + ' goal');
};
is('what is my promise score', 'score');
is('read my savings record', 'score');
is('borrow 5k against my rent', 'borrow', 5000, 'rent');
is('I wan borrow 2k5 from school fees', 'borrow', 2500, 'school');
is('lend me 2000', 'borrow', 2000);
is('I want a loan of 10k', 'borrow', 10000);
is('borrow', 'borrow');
is('how much do I owe', 'loan');
is('what is my loan', 'loan');
is('repay 2k', 'repay', 2000);
is('pay back my loan', 'repay');
is('I wan pay back 3k', 'repay', 3000);
// the new words must not steal existing commands
is('record a promise for rent', 'promise');
is('play my promise', 'promise');
is('withdraw 2k from rent', 'withdraw', 2000, 'rent');
is('save 5k for rent', 'save', 5000, 'rent');
is('send 5k to Tunde', 'send', 5000);
is('pay Tunde 1500', 'send', 1500);
is('how much do I have', 'balance');

// every new reply exists in English and Pidgin and fills its blanks
for (const k of ['scoreNone', 'scoreSay', 'scoreTests', 'confirmBorrow', 'doneBorrow', 'loanActive', 'loanTooMuch', 'loanNoSavings', 'loanMin', 'loanNone', 'loanStatus', 'confirmRepay', 'doneRepay', 'doneRepayAll', 'loanHeld', 'loanSettled', 'promiseOrBorrow', 'rLoan', 'rRepay'])
  for (const lang of ['en', 'pcm', 'yo', 'ha', 'ig']) {
    const out = L.say(k, lang, { score: 70, band: 'x', detail: 'x', kept: 1, tests: 2, amt: '₦1', goal: 'Rent', due: '1 May', left: '₦1', max: '₦1', held: '₦1', free: '₦1', g: 'Rent', n: 1 });
    assert.ok(out && out !== k && !/\{\w+\}/.test(out), k + ' in ' + lang);
  }
console.log('score.test.js: all checks passed');
