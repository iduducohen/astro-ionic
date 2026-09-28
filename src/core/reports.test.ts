import * as X from './index.ts';
import assert from 'node:assert';
const now = new Date('2026-09-27T09:00:00Z');
const me: X.BirthData = { name: 'דנה', date: '1990-03-15', time: '12:30', timeKnown: true, placeId: 'tel-aviv' };
const you: X.BirthData = { name: 'Yossi', date: '1988-08-02', time: '07:15', timeKnown: true, placeId: 'haifa' };
const noTime: X.BirthData = { name: 'Noa', date: '1995-11-20', timeKnown: false, placeId: 'jerusalem' };
const time = (label: string, f: () => X.Report) => { const t0 = performance.now(); const r = f(); const ms = performance.now() - t0; console.log(label.padEnd(10), ms.toFixed(0).padStart(5) + 'ms', r.sections.map((s) => s.items.length).join('/')); return r; };
const reps: X.Report[] = [];
for (const lang of ['he', 'en'] as const) {
  reps.push(time('natal', () => X.natalReport(me, lang)));
  reps.push(time('natal-nt', () => X.natalReport(noTime, lang)));
  reps.push(time('karmic', () => X.karmicReport(me, lang)));
  reps.push(time('forecast', () => X.forecastReport(me, lang, now)));
  reps.push(time('synastry', () => X.synastryReport(me, you, lang)));
  reps.push(time('syn-nt', () => X.synastryReport(me, noTime, lang)));
  reps.push(time('horary', () => X.horaryReport({ question: 'האם אמצא את המפתחות?', category: 'lost', date: now, placeId: 'netanya' }, lang)));
  reps.push(time('horary-j', () => X.horaryReport({ question: '', category: 'job', date: new Date('2026-10-02T15:20:00Z'), placeId: 'london' }, lang)));
  reps.push(time('election', () => X.electionReport({ event: 'wedding', start: '2026-10-01', days: 45, hourFrom: 10, hourTo: 22, placeId: 'jerusalem' }, lang)));
  reps.push(time('mundane', () => X.mundaneReport({ nationId: 'israel' }, lang, now)));
  reps.push(time('mund-usa', () => X.mundaneReport({ nationId: 'usa' }, lang, now)));
}
// כל דוח מתרנדר, ואין placeholders שלא הוחלפו
for (const r of reps) {
  const html = X.reportHTML(r);
  assert.ok(!/\{[a-z]+\}/i.test(html.replace(/<svg[\s\S]*?<\/svg>/g, '')), 'unreplaced placeholder in ' + r.title + ': ' + html.match(/\{[a-z]+\}/i));
  assert.ok(!/undefined|NaN/.test(html), 'undefined/NaN in ' + r.title + ' :: ' + (html.match(/.{60}(undefined|NaN).{20}/) || [''])[0]);
  assert.ok(html.includes('<svg') || !r.wheel);
}
const rep = X.REPORT_STRINGS as Record<string, unknown>;
const check = (o: unknown, path = ''): void => { if (o && typeof o === 'object') { const r = o as Record<string, unknown>; if ('he' in r && 'en' in r) { assert.ok(r.he && r.en, path); return; } for (const k of Object.keys(r)) check(r[k], path + '.' + k); } };
check({ rep, P: X.POINTS, S: X.SIGN_STYLE, Q: X.SIGN_QUALITY, H: X.HOUSE_DOMAIN, M: X.HOUSE_MUNDANE, A: X.ASPECT_INFO, E: X.ELEMENT_TEXT, N: X.NATIONS, PL: X.PLACES, HL: X.HORARY_LABEL, EL: X.ELECTION_LABEL });
// אותם מפתחות placeholder בשתי השפות
for (const [k, v] of Object.entries(rep)) {
  const list = Array.isArray(v) ? v : [v];
  for (const l of list as X.L[]) {
    const ph = (s: string) => (s.match(/\{\w+\}/g) || []).sort().join();
    assert.equal(ph(l.he), ph(l.en), 'placeholder mismatch ' + k);
  }
}
const h = reps[6]; console.log('HORARY:', h.verdict?.label, '|', h.sections[1].items.map((i) => i.value).join(' / '));
const e = reps[8]; console.log('ELECTION top:', e.sections[0].items[0].label, e.sections[0].items[0].tag);
console.log('MUNDANE year events:', reps[9].sections[2].items.length, reps[9].sections[2].items.slice(0, 4).map((i) => i.label + ' ' + i.value).join(' | '));
console.log('SYN verdict:', reps[4].verdict);
console.log('REPORTS OK');
