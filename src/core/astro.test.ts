import * as A from './index.ts';
import assert from 'node:assert';
const p = A.buildProfile({ name: 'דוד כהן', birthDate: '1990-03-15' }, new Date(2026, 8, 27));
assert.equal(p.western.id, 'pisces'); assert.equal(p.chinese.animal.id, 'horse'); assert.equal(p.chinese.element.en, 'Metal');
assert.equal(p.hebrew.formatted.he, 'י״ח באדר תש״ן'); assert.equal(p.hebrew.formatted.en, '18 Adar 5750'); assert.equal(p.age, 36);
assert.equal(A.westernSign(12, 25).id, 'capricorn'); assert.equal(A.westernSign(1, 19).id, 'capricorn'); assert.equal(A.westernSign(1, 20).id, 'aquarius');
assert.equal(A.chineseZodiac(2024, 2, 9).animal.id, 'rabbit'); assert.equal(A.chineseZodiac(2024, 2, 10).animal.id, 'dragon');
assert.equal(A.lifePath(1990, 3, 15), 1);
assert.equal(A.toHebrewNumeral(15), 'ט״ו'); assert.equal(A.toHebrewNumeral(5784, true), 'תשפ״ד'); assert.equal(A.toHebrewNumeral(1), 'א׳');
assert.equal(A.hebrewDate(2024, 3, 20).month.id, 'adar2'); assert.equal(A.hebrewDate(2000, 10, 1).month.id, 'tishrei');
assert.equal(A.hebrewDate(2000, 9, 29).month.id, 'elul'); assert.equal(A.hebrewDate(2000, 9, 29, true).month.id, 'tishrei');
assert.equal(A.nameNumber('abc').latin, 6);
const q = A.buildProfile({ name: 'Noa', birthDate: '1992-07-30' });
const ce = A.compatibility(p, q, 'en'), ch = A.compatibility(p, q, 'he');
assert.equal(ce.total, ch.total); assert.match(ce.parts[0].detail, /Pisces \(Water\) & Leo \(Fire\)/);
// every bilingual field has both languages filled
const check = (o: unknown, path = ''): void => {
  if (o && typeof o === 'object') {
    const r = o as Record<string, unknown>;
    if ('he' in r && 'en' in r) { assert.ok(r.he && r.en, 'missing translation at ' + path); return; }
    for (const k of Object.keys(r)) check(r[k], path + '.' + k);
  }
};
check({ z: A.ZODIAC, c: A.CHINESE_ANIMALS, n: A.NUMBER_MEANINGS, t: A.CELTIC_TREES, b: A.BIRTH_MONTH, e: A.ELEMENTS });
// UI dictionaries have identical keys
assert.deepEqual(Object.keys(A.STRINGS.he).sort(), Object.keys(A.STRINGS.en).sort());
console.log(A.summaryText(p, 'en')); console.log(A.summaryText(p, 'he'));
console.log('OK');
assert.equal(A.joinAnd('דוד', 'Noa', 'he'), 'דוד ו־Noa'); assert.equal(A.joinAnd('דוד', 'נועה', 'he'), 'דוד ונועה');
assert.equal(A.compatibility(p, q, 'he').parts[3].detail, '1 ו־4');
console.log('OK2');
// tarot
assert.equal(A.MAJOR_ARCANA.length, 22);
A.MAJOR_ARCANA.forEach((c, i) => { assert.equal(c.n, i); if (c.signId) assert.ok(A.ZODIAC.some((z) => z.id === c.signId)); });
check({ t: A.MAJOR_ARCANA, s: A.SPREAD_POSITIONS });
assert.equal(p.tarot.n, 10); // 15.3.1990 → 28 → 10
assert.equal(A.birthCard(1999, 9, 9).n, 10); // 1+9+9+9+9+9=46 → 10
assert.equal(A.birthCard(2000, 1, 1).n, 4); assert.equal(A.birthCard(1989, 12, 29).n, 5); assert.equal(A.birthCard(1980, 1, 3).n, 0); // 22 → Fool
for (let i = 0; i < 500; i++) {
  const d = A.drawCards(3);
  assert.equal(new Set(d.map((x) => x.card.n)).size, 3);
}
const counts = new Array(22).fill(0);
for (let i = 0; i < 22000; i++) counts[A.drawCards(1, false)[0].card.n]++;
assert.ok(Math.min(...counts) > 800 && Math.max(...counts) < 1200, 'draw distribution looks uniform');
assert.ok(A.drawCards(3, false).every((x) => !x.reversed));
console.log('TAROT OK');
assert.deepEqual(Object.keys(A.STRINGS.he.tools).sort(), Object.keys(A.STRINGS.en.tools).sort());
assert.deepEqual(Object.keys(A.STRINGS.he.toolDesc).sort(), Object.keys(A.STRINGS.en.toolDesc).sort());
console.log('I18N OK');
