import * as C from './chart.ts';
import { zonedToUtc, tzOffsetMinutes } from './places.ts';
import assert from 'node:assert';
import * as Astro from 'astronomy-engine';

// זמנים
assert.equal(zonedToUtc(2024, 7, 1, 12, 0, 'Asia/Jerusalem').toISOString(), '2024-07-01T09:00:00.000Z');
assert.equal(zonedToUtc(2024, 1, 1, 12, 0, 'Asia/Jerusalem').toISOString(), '2024-01-01T10:00:00.000Z');
assert.equal(zonedToUtc(2024, 7, 1, 12, 0, 'America/New_York').toISOString(), '2024-07-01T16:00:00.000Z');
assert.equal(tzOffsetMinutes(0, 'LMT', -75.16), -301);

// ASC גיאומטרית: הנקודה על האקליפטיקה בגובה 0 בצד מזרח
function geomAsc(date: Date, lat: number, lon: number): number {
  const eps = C.obliquity(date), lst = C.ramc(date, lon);
  let best = 0, bestErr = 1e9;
  for (let l = 0; l < 360; l += 0.01) {
    const r = Math.PI / 180, la = l * r;
    const ra = Math.atan2(Math.sin(la) * Math.cos(eps * r), Math.cos(la)) / r;
    const dec = Math.asin(Math.sin(eps * r) * Math.sin(la));
    const H = (lst - ra) * r;
    const alt = Math.asin(Math.sin(lat * r) * Math.sin(dec) + Math.cos(lat * r) * Math.cos(dec) * Math.cos(H));
    const east = Math.sin(H) < 0;
    if (east && Math.abs(alt) < bestErr) { bestErr = Math.abs(alt); best = l; }
  }
  return best;
}
for (const [iso, lat, lon] of [['1990-03-15T10:30:00Z', 32.08, 34.78], ['1985-10-25T22:10:00Z', 40.71, -74.0], ['2001-06-21T03:00:00Z', -33.87, 151.2], ['1977-12-01T17:45:00Z', 59.9, 30.3]] as const) {
  const d = new Date(iso);
  const eps = C.obliquity(d), rc = C.ramc(d, lon);
  const a = C.ascLongitude(rc, eps, lat), g = geomAsc(d, lat, lon);
  assert.ok(Math.abs(C.delta(a, g)) < 0.05, `ASC mismatch ${iso}: ${a} vs ${g}`);
  const { cusps } = C.houseCusps(rc, eps, lat);
  // סדר עולה של הקודקודים סביב הגלגל
  for (let i = 0; i < 12; i++) {
    const span = C.norm(cusps[(i + 1) % 12] - cusps[i]);
    assert.ok(span > 0 && span < 90, `cusp order ${iso} house ${i + 1}: ${span}`);
  }
  // בדיקת פלסידוס: בקודקוד 11 זווית השעה = שליש מחצי הקשת היומית
  const r = Math.PI / 180, l11 = cusps[10];
  const ra = C.norm(Math.atan2(Math.sin(l11 * r) * Math.cos(eps * r), Math.cos(l11 * r)) / r);
  const dec = Math.asin(Math.sin(eps * r) * Math.sin(l11 * r));
  const dsa = 90 + Math.asin(Math.tan(lat * r) * Math.tan(dec)) / r;
  assert.ok(Math.abs(C.delta(rc, ra) - dsa / 3) < 1e-4, 'placidus 11');
}

// שמש ב-J2000
assert.ok(Math.abs(C.bodyLongitude('sun', new Date(Date.UTC(2000, 0, 1, 12))) - 280.37) < 0.05);
// כוכב חמה בנסיגה 1–25 באפריל 2024
assert.equal(C.bodySpeed('mercury', new Date('2024-04-10T00:00Z')) < 0, true);
assert.equal(C.bodySpeed('mercury', new Date('2024-05-10T00:00Z')) < 0, false);
// ראש דרקון בטלה ב-2024
assert.equal(C.signOf(C.meanNode(new Date('2024-06-01T00:00Z'))).id, 'aries');
// מזל שמש מהמפה תואם למזל לפי תאריך
const ch = C.buildChart({ date: zonedToUtc(1990, 3, 15, 12, 30, 'Asia/Jerusalem'), lat: 32.08, lon: 34.78 });
assert.equal(ch.points.sun!.sign.id, 'pisces');
assert.equal(ch.points.sun!.house, 9); // 40 דק׳ אחרי הצהריים האמיתי → עברה את ה-MC לבית 9
assert.ok(C.natalAspects(ch).length > 5);
// חזרה סולארית
const sr = C.solarReturn(ch.points.sun!.lon, new Date('2026-03-15T00:00Z'));
assert.ok(Math.abs(C.delta(C.bodyLongitude('sun', sr), ch.points.sun!.lon)) < 0.001);
assert.equal(C.dignity('venus', 'pisces'), 'exalted'); assert.equal(C.dignity('mars', 'libra'), 'detriment');
console.log('CHART OK', ch.points.asc!.sign.en ?? ch.points.asc!.sign.name.en, ch.points.moon!.sign.name.en, ch.houseSystem);
void Astro;
