/**
 * places.ts — ערים מובנות וקואורדינטות, והמרת שעה מקומית ל-UTC.
 * רשימה מובנית (כל מדינות העולם) + הזנה ידנית; חיפוש מקוון מתבצע ב-PlaceSelect.
 */
import type { L } from './astro.ts';
import { WORLD_DATA, COUNTRY_FALLBACK } from './world-places.ts';

export interface Place {
  id: string;
  name: L;
  lat: number;   // צפון חיובי
  lon: number;   // מזרח חיובי
  tz: string;    // IANA, או 'LMT' לזמן שמש מקומי לפי קו האורך
  cc: string;    // קוד מדינה ISO
}

const P = (id: string, he: string, en: string, lat: number, lon: number, tz: string, cc: string): Place =>
  ({ id, name: { he, en }, lat, lon, tz, cc });

const ISRAEL: Place[] = [
  P('jerusalem', 'ירושלים', 'Jerusalem', 31.7683, 35.2137, 'Asia/Jerusalem', 'IL'),
  P('tel-aviv', 'תל אביב', 'Tel Aviv', 32.0853, 34.7818, 'Asia/Jerusalem', 'IL'),
  P('haifa', 'חיפה', 'Haifa', 32.7940, 34.9896, 'Asia/Jerusalem', 'IL'),
  P('beer-sheva', 'באר שבע', "Be'er Sheva", 31.2518, 34.7913, 'Asia/Jerusalem', 'IL'),
  P('netanya', 'נתניה', 'Netanya', 32.3215, 34.8532, 'Asia/Jerusalem', 'IL'),
  P('ashdod', 'אשדוד', 'Ashdod', 31.8044, 34.6553, 'Asia/Jerusalem', 'IL'),
  P('rishon', 'ראשון לציון', 'Rishon LeZion', 31.9730, 34.7925, 'Asia/Jerusalem', 'IL'),
  P('petah-tikva', 'פתח תקווה', 'Petah Tikva', 32.0840, 34.8878, 'Asia/Jerusalem', 'IL'),
  P('holon', 'חולון', 'Holon', 32.0158, 34.7874, 'Asia/Jerusalem', 'IL'),
  P('ramat-gan', 'רמת גן', 'Ramat Gan', 32.0823, 34.8106, 'Asia/Jerusalem', 'IL'),
  P('bnei-brak', 'בני ברק', 'Bnei Brak', 32.0807, 34.8338, 'Asia/Jerusalem', 'IL'),
  P('herzliya', 'הרצליה', 'Herzliya', 32.1624, 34.8447, 'Asia/Jerusalem', 'IL'),
  P('kfar-saba', 'כפר סבא', 'Kfar Saba', 32.1782, 34.9076, 'Asia/Jerusalem', 'IL'),
  P('raanana', 'רעננה', "Ra'anana", 32.1848, 34.8713, 'Asia/Jerusalem', 'IL'),
  P('rehovot', 'רחובות', 'Rehovot', 31.8928, 34.8113, 'Asia/Jerusalem', 'IL'),
  P('modiin', 'מודיעין', "Modi'in", 31.8980, 35.0104, 'Asia/Jerusalem', 'IL'),
  P('ashkelon', 'אשקלון', 'Ashkelon', 31.6688, 34.5743, 'Asia/Jerusalem', 'IL'),
  P('bat-yam', 'בת ים', 'Bat Yam', 32.0132, 34.7480, 'Asia/Jerusalem', 'IL'),
  P('hadera', 'חדרה', 'Hadera', 32.4340, 34.9196, 'Asia/Jerusalem', 'IL'),
  P('afula', 'עפולה', 'Afula', 32.6078, 35.2897, 'Asia/Jerusalem', 'IL'),
  P('nazareth', 'נצרת', 'Nazareth', 32.6996, 35.3035, 'Asia/Jerusalem', 'IL'),
  P('tiberias', 'טבריה', 'Tiberias', 32.7959, 35.5300, 'Asia/Jerusalem', 'IL'),
  P('safed', 'צפת', 'Safed', 32.9646, 35.4960, 'Asia/Jerusalem', 'IL'),
  P('kiryat-shmona', 'קריית שמונה', 'Kiryat Shmona', 33.2073, 35.5697, 'Asia/Jerusalem', 'IL'),
  P('eilat', 'אילת', 'Eilat', 29.5577, 34.9519, 'Asia/Jerusalem', 'IL'),
];

/** כל המקומות: ישראל + עיר בירה לכל מדינה + ערים מרכזיות (world-places.ts) */
export const PLACES: Place[] = [
  ...ISRAEL,
  ...WORLD_DATA.trim().split(/\r?\n/).map((line) => {
    const [cc, id, he, en, lat, lon, tz] = line.split('|');
    return P(id, he, en, Number(lat), Number(lon), tz, cc);
  }),
];

/** שם מדינה בשפת הממשק (Intl), עם גיבוי למקרים חסרים */
export function countryName(cc: string, lang: 'he' | 'en'): string {
  if (COUNTRY_FALLBACK[cc]) return COUNTRY_FALLBACK[cc][lang];
  try { return new Intl.DisplayNames([lang], { type: 'region' }).of(cc) ?? cc; } catch { return cc; }
}

/** רשימת קודי המדינות שיש להן ערים */
export const COUNTRY_CODES: string[] = Array.from(new Set(PLACES.map((p) => p.cc)));

export const placeById = (id: string): Place | undefined => PLACES.find((p) => p.id === id);

/** היסט (דקות) של אזור זמן מ-UTC ברגע נתון. חיובי מזרחה. */
export function tzOffsetMinutes(utcMs: number, tz: string, lon = 0): number {
  if (tz === 'LMT') return Math.round(lon * 4); // 15° = שעה
  if (tz === 'UTC') return 0;
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz, hourCycle: 'h23',
    year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  }).formatToParts(new Date(utcMs));
  const g = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  const asUtc = Date.UTC(g('year'), g('month') - 1, g('day'), g('hour') % 24, g('minute'), g('second'));
  return Math.round((asUtc - Math.floor(utcMs / 1000) * 1000) / 60000);
}

/** שעה מקומית (לוח קיר) באזור זמן → רגע UTC. מטפל גם במעברי שעון קיץ. */
export function zonedToUtc(y: number, m: number, d: number, h: number, min: number, tz: string, lon = 0): Date {
  const wall = Date.UTC(y, m - 1, d, h, min);
  let off = tzOffsetMinutes(wall, tz, lon);
  let utc = wall - off * 60000;
  const off2 = tzOffsetMinutes(utc, tz, lon);
  if (off2 !== off) { off = off2; utc = wall - off * 60000; }
  return new Date(utc);
}

/** רגע UTC → רכיבי שעה מקומית באזור זמן (לתצוגה) */
export function utcToZoned(date: Date, tz: string, lon = 0): { y: number; m: number; d: number; h: number; min: number } {
  const t = new Date(date.getTime() + tzOffsetMinutes(date.getTime(), tz, lon) * 60000);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate(), h: t.getUTCHours(), min: t.getUTCMinutes() };
}

export function listTimeZones(): string[] {
  const f = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf;
  const base = f ? f('timeZone') : Array.from(new Set(PLACES.map((p) => p.tz)));
  return ['UTC', 'LMT', ...base.filter((z) => z !== 'UTC')];
}
