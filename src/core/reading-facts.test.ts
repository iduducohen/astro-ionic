import assert from 'node:assert';
import { buildProfile } from './astro.ts';
import { readingFacts } from './reading-facts.ts';
import { profileShareText } from './share-text.ts';

const profile = buildProfile({ name: 'נועה לוי', birthDate: '1990-03-15' }, new Date(2026, 8, 27));
const facts = readingFacts(profile, 'he');
assert.equal(facts.sun.sign, 'דגים');
assert.equal(facts.sun.element, 'מים');
assert.equal(facts.lifePath.number, 1);
assert.equal(facts.lifePath.title, 'המוביל');
assert.equal(facts.celtic.length > 0, true);
assert.equal(facts.tarot.length > 0, true);
assert.equal(facts.written.love.length > 20, true);
assert.equal(facts.written.career.length > 20, true);
assert.equal(facts.written.health.length > 20, true);
assert.equal(facts.written.moon, undefined);
assert.equal(facts.moon, undefined);
assert.equal(facts.rising, undefined);

const withSky = readingFacts(profile, 'en', {
  moon: { sign: 'Scorpio', estimated: false, place: 'Petah Tikva' },
  rising: { sign: 'Virgo', place: 'Petah Tikva', time: '16:45' },
});
assert.equal(withSky.sun.sign, 'Pisces');
assert.equal(withSky.moon?.sign, 'Scorpio');
assert.equal(withSky.written.moon?.includes('Small talk'), true);
assert.equal(withSky.written.rising?.includes('tidy'), true);

const shared = profileShareText(profile, 'he', {
  sky: [{ title: 'הירח', value: 'עקרב', text: 'הירח בעקרב.', source: 'מה זה נותן לך.' }],
  sections: [{ title: 'זוגיות', lines: ['שורה ראשונה על הזוגיות.', 'שורה שנייה.'] }],
});
assert.equal(shared.includes('הירח בעקרב'), true);
assert.equal(shared.includes('— ניתוח מעמיק —'), true);
assert.equal(shared.includes('שורה ראשונה על הזוגיות'), true);
assert.equal(shared.includes('אהבה וזוגיות'), true);
assert.equal(withSky.rising?.time, '16:45');
console.log('READING FACTS OK');
