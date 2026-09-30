/**
 * chart.ts — חישוב מפת כוכבים: מיקומי כוכבים, קשרי ירח, אופק (ASC), רום שמיים (MC),
 * בתים (פלסידוס, או בתים שווים מעל חוג הקוטב), היבטים ונקודות ערביות (נקודת המזל).
 * מבוסס astronomy-engine (MIT), דיוק של שניות-קשת עד דקות-קשת.
 */
import * as Astro from 'astronomy-engine';
import { ZODIAC, type ZodiacSign } from './astro';

export type PlanetId =
  | 'sun' | 'moon' | 'mercury' | 'venus' | 'mars'
  | 'jupiter' | 'saturn' | 'uranus' | 'neptune' | 'pluto';
export type PointId = PlanetId | 'node' | 'southNode' | 'asc' | 'mc' | 'fortune' | 'spirit';

export const PLANET_IDS: PlanetId[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
export const TRADITIONAL: PlanetId[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'];

const BODY: Record<PlanetId, Astro.Body> = {
  sun: Astro.Body.Sun, moon: Astro.Body.Moon, mercury: Astro.Body.Mercury, venus: Astro.Body.Venus,
  mars: Astro.Body.Mars, jupiter: Astro.Body.Jupiter, saturn: Astro.Body.Saturn,
  uranus: Astro.Body.Uranus, neptune: Astro.Body.Neptune, pluto: Astro.Body.Pluto,
};

const RAD = Math.PI / 180;
export const norm = (x: number): number => ((x % 360) + 360) % 360;
/** הפרש זוויתי מסומן b−a בטווח (−180, 180] */
export const delta = (a: number, b: number): number => { const d = norm(b - a); return d > 180 ? d - 360 : d; };
export const signOf = (lon: number): ZodiacSign => ZODIAC[Math.floor(norm(lon) / 30)];
export const degInSign = (lon: number): number => norm(lon) % 30;

/** אורך אקליפטי גיאוצנטרי (טרופי, של התאריך) */
export function bodyLongitude(id: PlanetId, date: Date): number {
  if (id === 'sun') return norm(Astro.SunPosition(date).elon);
  if (id === 'moon') return norm(Astro.EclipticGeoMoon(date).lon);
  const v = Astro.GeoVector(BODY[id], date, true);
  const r = Astro.RotateVector(Astro.Rotation_EQJ_ECT(date), v);
  return norm(Astro.SphereFromVector(r).lon);
}

/** מהירות יומית (מעלות ליום), שלילית = נסיגה */
export function bodySpeed(id: PlanetId, date: Date): number {
  const h = id === 'moon' ? 1 / 24 : 0.5;
  const a = bodyLongitude(id, new Date(date.getTime() - h * 864e5));
  const b = bodyLongitude(id, new Date(date.getTime() + h * 864e5));
  return delta(a, b) / (2 * h);
}

function julianCenturiesTT(date: Date): number {
  return Astro.MakeTime(date).tt / 36525;
}

/** ראש הדרקון הממוצע (Meeus, פרק 47) */
export function meanNode(date: Date): number {
  const T = julianCenturiesTT(date);
  return norm(125.0445479 - 1934.1362891 * T + 0.0020754 * T * T + (T * T * T) / 467441 - (T * T * T * T) / 60616000);
}

export function obliquity(date: Date): number {
  return Astro.e_tilt(Astro.MakeTime(date)).tobl;
}

/** זמן כוכבי מקומי במעלות (RAMC) */
export function ramc(date: Date, lon: number): number {
  return norm(Astro.SiderealTime(date) * 15 + lon);
}

export function mcLongitude(ramcDeg: number, eps: number): number {
  return norm(Math.atan2(Math.sin(ramcDeg * RAD), Math.cos(ramcDeg * RAD) * Math.cos(eps * RAD)) / RAD);
}

export function ascLongitude(ramcDeg: number, eps: number, lat: number): number {
  const r = ramcDeg * RAD, e = eps * RAD, f = lat * RAD;
  return norm(Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(e) + Math.tan(f) * Math.sin(e))) / RAD);
}

/** אורך אקליפטי של נקודה על האקליפטיקה בעלייה ישרה נתונה */
function lonFromRA(ra: number, eps: number): number {
  return norm(Math.atan2(Math.sin(ra * RAD), Math.cos(ra * RAD) * Math.cos(eps * RAD)) / RAD);
}

export type HouseSystem = 'placidus' | 'equal';

/** 12 קודקודי בתים. פלסידוס בשיטת חצי-הקשת האיטרטיבית; מעל 66° רוחב → בתים שווים. */
export function houseCusps(ramcDeg: number, eps: number, lat: number, system: HouseSystem = 'placidus'): { cusps: number[]; system: HouseSystem } {
  const asc = ascLongitude(ramcDeg, eps, lat);
  const mc = mcLongitude(ramcDeg, eps);
  if (system === 'equal' || Math.abs(lat) > 66) {
    return { cusps: Array.from({ length: 12 }, (_, i) => norm(asc + 30 * i)), system: 'equal' };
  }
  const tanPhi = Math.tan(lat * RAD);
  /**
   * שיטת חצי-הקשת: עלייה ישרה של קודקוד = RAMC + k·DSA (בתים 11/12, מעל האופק)
   * או RAMC + 180 − k·NSA (בתים 2/3, מתחת לאופק). DSA/NSA תלויים בנטיית הנקודה,
   * ולכן מחשבים איטרטיבית עד התכנסות.
   */
  const cusp = (k: number, nocturnal: boolean): number => {
    let ra = norm(nocturnal ? ramcDeg + 180 - k * 90 : ramcDeg + k * 90);
    for (let i = 0; i < 50; i++) {
      const lon = lonFromRA(ra, eps);
      const dec = Math.asin(Math.sin(eps * RAD) * Math.sin(lon * RAD));
      const ad = Math.asin(Math.max(-1, Math.min(1, tanPhi * Math.tan(dec)))) / RAD;
      const next = nocturnal ? norm(ramcDeg + 180 - k * (90 - ad)) : norm(ramcDeg + k * (90 + ad));
      const done = Math.abs(delta(ra, next)) < 1e-9;
      ra = next;
      if (done) break;
    }
    return lonFromRA(ra, eps);
  };
  const c11 = cusp(1 / 3, false);
  const c12 = cusp(2 / 3, false);
  const c2 = cusp(2 / 3, true);
  const c3 = cusp(1 / 3, true);
  const cusps = [asc, c2, c3, norm(mc + 180), norm(c11 + 180), norm(c12 + 180), norm(asc + 180), norm(c2 + 180), norm(c3 + 180), mc, c11, c12];
  return { cusps, system: 'placidus' };
}

/** מספר הבית (1–12) של אורך נתון */
export function houseOf(lon: number, cusps: number[]): number {
  for (let i = 0; i < 12; i++) {
    const a = cusps[i], b = cusps[(i + 1) % 12];
    const span = norm(b - a), off = norm(lon - a);
    if (off < span) return i + 1;
  }
  return 1;
}

export interface Point {
  id: PointId;
  lon: number;
  sign: ZodiacSign;
  deg: number;         // מעלה בתוך המזל
  house?: number;
  speed?: number;
  retro?: boolean;
}

export interface Chart {
  date: Date;
  lat: number;
  lon: number;
  timeKnown: boolean;
  points: Record<PointId, Point | undefined>;
  planets: Point[];
  cusps?: number[];
  houseSystem?: HouseSystem;
  isDay: boolean;       // שמש מעל האופק
}

export interface ChartInput {
  date: Date;          // רגע UTC
  lat: number;
  lon: number;
  timeKnown?: boolean; // ללא שעה: אין בתים/אופק
  houseSystem?: HouseSystem;
}

export function makePoint(id: PointId, lon: number, cusps?: number[], speed?: number): Point {
  return {
    id, lon: norm(lon), sign: signOf(lon), deg: degInSign(lon),
    house: cusps ? houseOf(lon, cusps) : undefined,
    speed, retro: speed !== undefined ? speed < 0 : undefined,
  };
}

export function buildChart(input: ChartInput): Chart {
  const { date, lat, lon } = input;
  const timeKnown = input.timeKnown !== false;
  let cusps: number[] | undefined;
  let system: HouseSystem | undefined;
  const eps = obliquity(date);
  const rc = ramc(date, lon);
  if (timeKnown) {
    const h = houseCusps(rc, eps, lat, input.houseSystem ?? 'placidus');
    cusps = h.cusps; system = h.system;
  }
  const points: Record<string, Point | undefined> = {};
  const planets = PLANET_IDS.map((id) => {
    const p = makePoint(id, bodyLongitude(id, date), cusps, bodySpeed(id, date));
    if (id === 'sun' || id === 'moon') p.retro = false;
    points[id] = p;
    return p;
  });
  const node = meanNode(date);
  points.node = makePoint('node', node, cusps);
  points.southNode = makePoint('southNode', node + 180, cusps);

  // האם השמש מעל האופק: בית 7–12
  let isDay = true;
  if (cusps) {
    points.asc = makePoint('asc', cusps[0], cusps);
    points.mc = makePoint('mc', cusps[9], cusps);
    const sunHouse = points.sun!.house!;
    isDay = sunHouse >= 7;
    const asc = cusps[0], sun = points.sun!.lon, moon = points.moon!.lon;
    // נקודת המזל ונקודת הרוח (לפי יום/לילה)
    const fortune = isDay ? asc + moon - sun : asc + sun - moon;
    const spirit = isDay ? asc + sun - moon : asc + moon - sun;
    points.fortune = makePoint('fortune', fortune, cusps);
    points.spirit = makePoint('spirit', spirit, cusps);
  }
  return { date, lat, lon, timeKnown, points: points as Chart['points'], planets, cusps, houseSystem: system, isDay };
}

/* ---------------- היבטים ---------------- */

export type AspectId = 'conj' | 'sext' | 'square' | 'trine' | 'opp';
export const ASPECTS: { id: AspectId; angle: number; orb: number; glyph: string; harmony: number }[] = [
  { id: 'conj', angle: 0, orb: 8, glyph: '☌', harmony: 0 },
  { id: 'sext', angle: 60, orb: 5, glyph: '⚹', harmony: 1 },
  { id: 'square', angle: 90, orb: 7, glyph: '□', harmony: -1 },
  { id: 'trine', angle: 120, orb: 7, glyph: '△', harmony: 1 },
  { id: 'opp', angle: 180, orb: 8, glyph: '☍', harmony: -1 },
];

export interface Aspect {
  a: PointId;
  b: PointId;
  type: AspectId;
  orb: number;          // מרחק מדיוק
  applying?: boolean;   // מתקרב לדיוק
}

function aspectBetween(la: number, lb: number, orbScale = 1): { type: AspectId; orb: number } | null {
  const sep = Math.abs(delta(la, lb));
  let best: { type: AspectId; orb: number } | null = null;
  for (const as of ASPECTS) {
    const o = Math.abs(sep - as.angle);
    if (o <= as.orb * orbScale && (!best || o < best.orb)) best = { type: as.id, orb: o };
  }
  return best;
}

/** מהירות של נקודה (לחישוב מתקרב/מתרחק) */
const pointSpeed = (p: Point): number => p.speed ?? 0;

function isApplying(pa: Point, pb: Point, type: AspectId): boolean {
  const angle = ASPECTS.find((x) => x.id === type)!.angle;
  const sepNow = Math.abs(delta(pa.lon, pb.lon));
  const dt = 0.01;
  const sepNext = Math.abs(delta(pa.lon + pointSpeed(pa) * dt, pb.lon + pointSpeed(pb) * dt));
  return Math.abs(sepNext - angle) < Math.abs(sepNow - angle);
}

const ASPECT_POINTS: PointId[] = [...PLANET_IDS, 'node', 'asc', 'mc'];

/** היבטים בתוך מפה אחת */
export function natalAspects(c: Chart, orbScale = 1): Aspect[] {
  const ids = ASPECT_POINTS.filter((id) => c.points[id]);
  const out: Aspect[] = [];
  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = c.points[ids[i]]!, b = c.points[ids[j]]!;
      if ((a.id === 'asc' && b.id === 'mc') || (a.id === 'node' && b.id !== 'sun' && b.id !== 'moon' && b.id !== 'asc')) continue;
      const hit = aspectBetween(a.lon, b.lon, orbScale);
      if (hit) out.push({ a: a.id, b: b.id, type: hit.type, orb: hit.orb, applying: isApplying(a, b, hit.type) });
    }
  }
  return out.sort((x, y) => x.orb - y.orb);
}

/** היבטים בין שתי מפות (סינסטרי / טרנזיטים). a = מפה חיצונית, b = מפת בסיס */
export function crossAspects(outer: Chart, base: Chart, outerIds: PointId[], baseIds: PointId[], orbScale = 1): Aspect[] {
  const out: Aspect[] = [];
  for (const ia of outerIds) {
    const a = outer.points[ia]; if (!a) continue;
    for (const ib of baseIds) {
      const b = base.points[ib]; if (!b) continue;
      const hit = aspectBetween(a.lon, b.lon, orbScale);
      if (hit) out.push({ a: ia, b: ib, type: hit.type, orb: hit.orb });
    }
  }
  return out.sort((x, y) => x.orb - y.orb);
}

/* ---------------- שליטים מסורתיים ---------------- */

export const TRAD_RULER: Record<string, PlanetId> = {
  aries: 'mars', taurus: 'venus', gemini: 'mercury', cancer: 'moon', leo: 'sun', virgo: 'mercury',
  libra: 'venus', scorpio: 'mars', sagittarius: 'jupiter', capricorn: 'saturn', aquarius: 'saturn', pisces: 'jupiter',
};

/** עוצמה מסורתית: בית (domicile), רום (exaltation), גלות (detriment), נפילה (fall) */
const EXALT: Partial<Record<PlanetId, string>> = { sun: 'aries', moon: 'taurus', mercury: 'virgo', venus: 'pisces', mars: 'capricorn', jupiter: 'cancer', saturn: 'libra' };
const OPP_SIGN = (id: string) => ZODIAC[(ZODIAC.findIndex((z) => z.id === id) + 6) % 12].id;

export function dignity(p: PlanetId, signId: string): 'domicile' | 'exalted' | 'detriment' | 'fall' | null {
  const ruled = Object.entries(TRAD_RULER).filter(([, r]) => r === p).map(([s]) => s);
  if (ruled.includes(signId)) return 'domicile';
  if (EXALT[p] === signId) return 'exalted';
  if (ruled.some((s) => OPP_SIGN(s) === signId)) return 'detriment';
  if (EXALT[p] && OPP_SIGN(EXALT[p]!) === signId) return 'fall';
  return null;
}

/* ---------------- חיפושים בזמן ---------------- */

/** הרגע שבו השמש חוזרת לאורך נתון, סביב תאריך התחלה (חזרה סולארית) */
export function solarReturn(sunLon: number, near: Date): Date {
  const start = new Date(near.getTime() - 10 * 864e5);
  const t = Astro.SearchSunLongitude(sunLon, start, 30);
  if (!t) throw new Error('solar-return-not-found');
  return t.date;
}

/** זמן מדויק (בדיוק של דקות) שבו טרנזיט מגיע להיבט מדויק, בחיפוש בינארי בין שני רגעים */
export function refineExact(id: PlanetId, target: number, angle: number, t0: Date, t1: Date): Date {
  const f = (t: Date) => {
    const sep = Math.abs(delta(bodyLongitude(id, t), target));
    return sep - angle;
  };
  let a = t0.getTime(), b = t1.getTime();
  let fa = f(t0);
  for (let i = 0; i < 40 && b - a > 60000; i++) {
    const m = (a + b) / 2, fm = f(new Date(m));
    if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else b = m;
  }
  return new Date((a + b) / 2);
}

export { Astro };
