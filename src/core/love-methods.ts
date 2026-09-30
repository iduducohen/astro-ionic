/**
 * love-methods.ts — שלוש דרכים לבחון קשר זוגי:
 * 1. אסטרולוגיה: סינסטרי ממוקד (נוגה/מאדים, כוכב חמה, ירח, שבתאי) ומפת קומפוזיט.
 * 2. קבלה וזוהר: גימטריית שם + שם האם, שורש הנשמה בעץ החיים, תיקון משותף, יסודות לפי ספר יצירה.
 * 3. נומרולוגיה: מספר גורל משותף, קצב דרכי החיים, ועיתוי לפי שנה אישית.
 */
import {
  ELEMENTS, NUMBER_MEANINGS, elementScore, hebrewDate, nameNumber, parseDate, reduceNumber,
  type Element, type L, type Lang,
} from './astro';
import { crossAspects, norm, signOf, type AspectId, type Chart, type PlanetId, type PointId } from './chart';
import { chartFor, type BirthData } from './techniques';
import { PATHS22, sephira, sephiraForNumber, type SephiraId, type TreeSephira } from './tree';
import { MAJOR_ARCANA } from './tarot';

const x = (he: string, en: string): L => ({ he, en });
const avg = (a: number[]) => (a.length ? Math.round(a.reduce((s, v) => s + v, 0) / a.length) : 50);
const clamp = (n: number) => Math.max(5, Math.min(98, Math.round(n)));

/* =====================================================================
   1. אסטרולוגיה
   ===================================================================== */
export const PLANET_NAME: Record<string, L> = {
  sun: x('שמש', 'Sun'), moon: x('ירח', 'Moon'), mercury: x('כוכב חמה', 'Mercury'), venus: x('נוגה', 'Venus'),
  mars: x('מאדים', 'Mars'), saturn: x('שבתאי', 'Saturn'), jupiter: x('צדק', 'Jupiter'),
};
const ASP_NAME: Record<AspectId, L> = {
  conj: x('צמידות', 'conjunction'), sext: x('סקסטיל', 'sextile'), square: x('ריבוע', 'square'), trine: x('טריגון', 'trine'), opp: x('אופוזיציה', 'opposition'),
};
const ASP_TONE: Record<AspectId, L> = {
  conj: x('מיזוג עוצמתי', 'a powerful merging'), sext: x('זרימה ידידותית', 'friendly flow'), square: x('חיכוך מאתגר', 'challenging friction'),
  trine: x('הרמוניה טבעית', 'natural harmony'), opp: x('משיכה של הפכים', 'an attraction of opposites'),
};

export interface Contact { a: string; b: string; who: [string, string]; type: AspectId; orb: number; value: number; text: L }
export interface AstroSection { id: string; title: L; what: L; score: number; contacts: Contact[]; positions: { name: string; planet: string; sign: L }[]; text: L }
export interface AstroLove { sections: AstroSection[]; composite: { planet: string; sign: L; element: Element; text: L }[]; total: number; timeNote: boolean }

/** ערך של היבט לפי זוג הכוכבים: לנוגה–מאדים גם אופוזיציה וצמידות הן משיכה */
function aspectValue(pa: string, pb: string, type: AspectId): number {
  const romance = (pa === 'venus' && pb === 'mars') || (pa === 'mars' && pb === 'venus');
  const saturn = pa === 'saturn' || pb === 'saturn';
  if (saturn) return type === 'trine' || type === 'sext' ? 0.7 : type === 'conj' ? 0.1 : -0.7;
  switch (type) {
    case 'trine': return 1;
    case 'sext': return 0.8;
    case 'conj': return romance ? 1 : 0.7;
    case 'opp': return romance ? 0.6 : -0.2;
    case 'square': return romance ? 0.1 : -0.6;
  }
}

function contacts(A: Chart, B: Chart, pairs: [PlanetId, PlanetId][], names: [string, string], both = true): Contact[] {
  const out: Contact[] = [];
  const run = (X: Chart, Y: Chart, nx: string, ny: string, pa: PlanetId, pb: PlanetId) => {
    for (const asp of crossAspects(X, Y, [pa as PointId], [pb as PointId], 1)) {
      const v = aspectValue(pa, pb, asp.type);
      out.push({
        a: pa, b: pb, who: [nx, ny], type: asp.type, orb: asp.orb, value: v,
        text: {
          he: `${PLANET_NAME[pa].he} של ${nx} ב${ASP_NAME[asp.type].he} ל${PLANET_NAME[pb].he} של ${ny} — ${ASP_TONE[asp.type].he}.`,
          en: `${nx}'s ${PLANET_NAME[pa].en} in ${ASP_NAME[asp.type].en} to ${ny}'s ${PLANET_NAME[pb].en} — ${ASP_TONE[asp.type].en}.`,
        },
      });
    }
  };
  for (const [pa, pb] of pairs) {
    run(A, B, names[0], names[1], pa, pb);
    if (both && pa !== pb) run(B, A, names[1], names[0], pa, pb);
  }
  return out.sort((p, q) => p.orb - q.orb);
}

function sectionScore(cs: Contact[], fallback: number): number {
  if (!cs.length) return fallback;
  const w = cs.map((c) => 1 - c.orb / 10);
  const s = cs.reduce((acc, c, i) => acc + c.value * w[i], 0) / w.reduce((a, b) => a + b, 0);
  return clamp(55 + 42 * s);
}

const SECTION_TEXT: Record<string, { good: L; mid: L; hard: L }> = {
  chem: {
    good: x('המשיכה ביניכם חזקה וזורמת: מה שאחד מחפש באהבה (נוגה) נפגש עם הדרך שבה השני יוזם ומחזר (מאדים).', 'Strong, flowing attraction: what one seeks in love (Venus) meets how the other pursues (Mars).'),
    mid: x('יש משיכה, אבל היא צריכה הזנה: טעמים וסגנונות שונים באהבה, שאפשר ללמוד ליהנות מהם.', 'There is attraction, but it needs feeding: different tastes in love you can learn to enjoy.'),
    hard: x('הכימיה אינה אוטומטית: הקצב והביטוי של התשוקה שונים. כדאי לדבר על מה מדליק כל אחד.', 'Chemistry isn\'t automatic: desire has a different pace and expression. Talk about what excites each of you.'),
  },
  talk: {
    good: x('תקשורת קלה: אתם חושבים באותו גל, מבינים רמזים ויודעים להתווכח בלי לפגוע.', 'Easy communication: you think on the same wave, catch hints and argue without hurting.'),
    mid: x('התקשורת טובה ברוב הזמן, אבל בוויכוחים כל אחד שומע משהו אחר. כדאי לחזור על מה ששמעתם.', 'Communication is mostly good, but in arguments each hears something else. Repeat back what you heard.'),
    hard: x('סגנונות חשיבה שונים מאוד: אחד מהיר, השני יסודי; אחד ישיר, השני עקיף. דרוש תרגום.', 'Very different thinking styles: fast versus thorough, direct versus indirect. You need translation.'),
  },
  home: {
    good: x('ביטחון רגשי עמוק: הצרכים הרגשיים של שניכם דומים, ויש תחושת "בית" טבעית.', 'Deep emotional security: your emotional needs are similar and there is a natural sense of home.'),
    mid: x('יש חום וקרבה, אבל כל אחד צריך דברים אחרים כדי להרגיש בטוח. חשוב לשאול ולא לנחש.', 'Warmth and closeness, but each needs different things to feel safe. Ask rather than guess.'),
    hard: x('הצרכים הרגשיים שונים: מה שמרגיע אחד עלול להלחיץ את השני. שווה להשקיע בהקשבה.', 'Different emotional needs: what calms one may stress the other. Invest in listening.'),
  },
  duty: {
    good: x('שבתאי תומך: הקשר נושא תחושת מחויבות, אחריות ויציבות לטווח ארוך.', 'Saturn supports: the bond carries commitment, responsibility and long-term stability.'),
    mid: x('שבתאי מביא גם יציבות וגם כובד: יהיו תקופות של עבודה קשה, שמחזקות את הקשר.', 'Saturn brings stability and weight: periods of hard work that strengthen the bond.'),
    hard: x('כאן נמצאים השיעורים הגדולים: ביקורת, ריחוק או תחושת הגבלה. בהתמדה — הם הופכים לחוזק.', 'Here are the big lessons: criticism, distance or restriction. With persistence they become strength.'),
  },
};

const COMP_TEXT: Record<string, L> = {
  sun: x('מטרת הקשר: כך הזוגיות שלכם "מתנהגת" כלפי העולם.', 'The purpose of the bond: how your relationship "acts" in the world.'),
  moon: x('האקלים הרגשי של הבית המשותף.', 'The emotional climate of your shared home.'),
  venus: x('איך אתם אוהבים יחד — מה משמח את הזוגיות.', 'How you love together — what delights the relationship.'),
};
const EL_STYLE: Record<Element, L> = {
  fire: x('נמרץ, מלהיב ויוזם', 'lively, passionate and bold'), earth: x('יציב, מעשי ונאמן', 'steady, practical and loyal'),
  air: x('חברותי, סקרן ומדבר', 'sociable, curious and talkative'), water: x('רגשי, אינטימי ומכיל', 'emotional, intimate and nurturing'),
};

export function astroLove(a: BirthData, b: BirthData, lang: Lang): AstroLove {
  const A = chartFor(a, lang).chart, B = chartFor(b, lang).chart;
  const names: [string, string] = [a.name, b.name];
  const p = (C: Chart, id: PlanetId) => C.points[id]!;
  const sgn = (C: Chart, id: PlanetId) => p(C, id).sign;
  const elFallback = (ia: PlanetId, ib: PlanetId) => elementScore(sgn(A, ia).element, sgn(B, ib).element);
  const pos = (ids: PlanetId[]) => ids.flatMap((id) => [
    { name: a.name, planet: id, sign: sgn(A, id).name }, { name: b.name, planet: id, sign: sgn(B, id).name },
  ]);
  const band = (s: number, k: string) => (s >= 72 ? SECTION_TEXT[k].good : s >= 55 ? SECTION_TEXT[k].mid : SECTION_TEXT[k].hard);

  const chemC = contacts(A, B, [['venus', 'mars'], ['venus', 'venus'], ['mars', 'mars']], names);
  const chem = sectionScore(chemC, avg([elFallback('venus', 'mars'), elFallback('mars', 'venus')]));
  const talkC = contacts(A, B, [['mercury', 'mercury'], ['mercury', 'moon'], ['mercury', 'sun']], names);
  const talk = sectionScore(talkC, elFallback('mercury', 'mercury'));
  const homeC = contacts(A, B, [['moon', 'moon'], ['sun', 'moon'], ['moon', 'venus']], names);
  const home = sectionScore(homeC, elFallback('moon', 'moon'));
  const dutyC = contacts(A, B, [['saturn', 'sun'], ['saturn', 'moon'], ['saturn', 'venus'], ['saturn', 'mercury']], names);
  const duty = sectionScore(dutyC, 65);

  const sections: AstroSection[] = [
    { id: 'chem', title: x('כימיה ומשיכה', 'Chemistry and attraction'), what: x('נוגה (אהבה וערכים) ומאדים (תשוקה ויוזמה) של שניכם', 'Venus (love, values) and Mars (desire, initiative) of both'), score: chem, contacts: chemC, positions: pos(['venus', 'mars']), text: band(chem, 'chem') },
    { id: 'talk', title: x('תקשורת ואינטלקט', 'Communication and intellect'), what: x('כוכב חמה — איך אתם מבינים זה את זה ומנהלים ויכוחים', 'Mercury — how you understand each other and argue'), score: talk, contacts: talkC, positions: pos(['mercury']), text: band(talk, 'talk') },
    { id: 'home', title: x('ביטחון רגשי ובית', 'Emotional security and home'), what: x('הירח — הצרכים הרגשיים העמוקים ותחושת ה"בית"', 'The Moon — deepest emotional needs and sense of home'), score: home, contacts: homeC, positions: pos(['moon']), text: band(home, 'home') },
    { id: 'duty', title: x('אתגרים ומחויבות', 'Challenges and commitment'), what: x('שבתאי — איפה תצטרכו לעבוד ולהתמיד כדי שהקשר יחזיק', 'Saturn — where you must work and persist for the bond to last'), score: duty, contacts: dutyC, positions: pos(['saturn']), text: band(duty, 'duty') },
  ];

  const mid = (la: number, lb: number) => { const d = norm(lb - la); return norm(la + (d > 180 ? (d - 360) / 2 : d / 2)); };
  const composite = (['sun', 'moon', 'venus'] as PlanetId[]).map((id) => {
    const s = signOf(mid(p(A, id).lon, p(B, id).lon));
    return { planet: id, sign: s.name, element: s.element, text: { he: `${COMP_TEXT[id].he} ב${s.name.he}: ${EL_STYLE[s.element].he}.`, en: `${COMP_TEXT[id].en} In ${s.name.en}: ${EL_STYLE[s.element].en}.` } };
  });

  return { sections, composite, total: avg([chem, talk, home, duty]), timeNote: !a.timeKnown || !b.timeKnown };
}

/* =====================================================================
   2. קבלה וזוהר
   ===================================================================== */
export interface KabPerson { name: string; mother: string; birth: string; sunset: boolean }

const TIKKUN: Record<SephiraId, L> = {
  keter: x('ענווה ורצון משותף: ללמוד לוותר על ה"אני" לטובת משהו גדול משניכם.', 'Humility and shared will: learning to set aside the "I" for something greater than both.'),
  chokhmah: x('אמון באינטואיציה: להקשיב לתחושה הפנימית של השני גם כשאין לה הסבר.', 'Trusting intuition: listening to the other\'s inner sense even without explanation.'),
  binah: x('הבנה וסבלנות: לתת זמן, להקשיב עד הסוף, ולבנות לאט.', 'Understanding and patience: giving time, listening fully, building slowly.'),
  chesed: x('נתינה ללא תנאי: לתת בלי לספור, ולקבל בלי להרגיש חוב.', 'Unconditional giving: to give without counting and receive without feeling in debt.'),
  gevurah: x('גבולות ושחרור שליטה: לדעת לומר "לא" באהבה, ולהרפות מהצורך לשלוט.', 'Boundaries and releasing control: saying "no" lovingly and letting go of control.'),
  tiferet: x('אמת ואיזון: לדבר ביושר, ולמצוא את הדרך האמצעית בין שני רצונות.', 'Truth and balance: speaking honestly and finding the middle path between two wills.'),
  netzach: x('התמדה: להמשיך לבחור זה בזה גם כשקשה, ולא לוותר בדרך.', 'Perseverance: choosing each other again when it\'s hard, not giving up on the way.'),
  hod: x('הודיה והכרת תודה: לראות ולהגיד תודה על מה שהשני נותן.', 'Gratitude: seeing and acknowledging what the other gives.'),
  yesod: x('נאמנות וחיבור: לבנות אמון מלא, קרבה אמיתית ובית משותף.', 'Faithfulness and connection: building full trust, real closeness and a shared home.'),
  malkhut: x('להביא לעולם: להפוך את האהבה לבית, למשפחה ולמעשים.', 'Bringing it into the world: turning love into a home, a family and deeds.'),
};

const SY_EL: Record<Element, L> = { fire: x('אש', 'Fire'), air: x('רוח', 'Air (Ruach)'), water: x('מים', 'Water'), earth: x('עפר', 'Earth') };
const SY_PAIR: Record<string, L> = {
  same: x('אותו יסוד רוחני: נשמות שמדברות באותה שפה. חשוב להכניס גם את מה שחסר לשניכם.', 'The same spiritual element: souls that speak the same language. Bring in what you both lack.'),
  'air-fire': x('רוח מלבה אש: אחד נותן השראה והשני מבעיר. זוג נלהב, מלא תנועה ורעיונות.', 'Air fans fire: one inspires, the other ignites. A passionate pair, full of motion and ideas.'),
  'earth-water': x('מים ועפר: המים נותנים חיים לעפר, והעפר נותן להם צורה. זוג שבונה.', 'Water and earth: water gives earth life, earth gives water form. A building pair.'),
  'fire-water': x('אש ומים — "שין שורקת ומם דוממת": הפכים גמורים, שהרוח (האיזון) מכריעה ביניהם. דרוש שלישי: אהבה ותבונה.', 'Fire and water — the hissing Shin and silent Mem: total opposites that Air (balance) mediates. It takes a third: love and wisdom.'),
  'air-water': x('רוח ומים: רגש ומחשבה נפגשים. הרוח מזיזה את המים — תנועה ושינוי.', 'Air and water: feeling meets thought. Wind moves water — motion and change.'),
  'air-earth': x('רוח ועפר: חלום ומציאות. צריך סבלנות כדי שהרעיון ינחת.', 'Air and earth: dream and reality. Patience is needed for ideas to land.'),
  'earth-fire': x('אש ועפר: תשוקה ויציבות. האש מחממת, העפר שומר עליה מלהתפזר.', 'Fire and earth: passion and stability. Fire warms, earth keeps it from scattering.'),
};

/** יסוד רוחני: מזל חודש הלידה העברי + אותיות האמות (א=רוח, מ=מים, ש=אש) בשם */
function soulElement(p: KabPerson): { el: Element; mothers: Record<string, number> } {
  const d = parseDate(p.birth)!;
  const month = hebrewDate(d[0], d[1], d[2], p.sunset);
  const score: Record<Element, number> = { fire: 0, air: 0, water: 0, earth: 0 };
  score[month.sign.element] += 2;
  const mothers = { 'א': 0, 'מ': 0, 'ש': 0 } as Record<string, number>;
  for (const ch of `${p.name}${p.mother}`) {
    if (ch === 'א') { mothers['א']++; score.air++; }
    if (ch === 'מ' || ch === 'ם') { mothers['מ']++; score.water++; }
    if (ch === 'ש') { mothers['ש']++; score.fire++; }
  }
  const el = (Object.keys(score) as Element[]).sort((x1, x2) => score[x2] - score[x1])[0];
  return { el, mothers };
}

export interface KabLove {
  people: { name: string; value: number; seph: TreeSephira; el: Element; mothers: Record<string, number>; hebrewNames: boolean }[];
  couple: { value: number; seph: TreeSephira; tikkun: L };
  relation: { score: number; text: L; path?: { letter: string; n: number; card: L } };
  elements: { score: number; text: L };
  total: number;
}

export function kabbalahLove(A: KabPerson, B: KabPerson): KabLove {
  const person = (p: KabPerson) => {
    const g = nameNumber(`${p.name} ${p.mother}`);
    const value = g.gematria || g.latin;
    const s = soulElement(p);
    return { name: p.name, value, seph: sephira(sephiraForNumber(reduceNumber(value || 1))), el: s.el, mothers: s.mothers, hebrewNames: g.gematria > 0 && g.latin === 0 };
  };
  const pa = person(A), pb = person(B);
  const cv = pa.value + pb.value;
  const cs = sephira(sephiraForNumber(reduceNumber(cv || 1)));

  let relation: KabLove['relation'];
  const path = PATHS22.find((q) => (q.from === pa.seph.id && q.to === pb.seph.id) || (q.from === pb.seph.id && q.to === pa.seph.id));
  if (pa.seph.id === pb.seph.id) relation = { score: 86, text: x(`שתי הנשמות מאותו שורש — ${pa.seph.name.he}. בלשון הזוהר, "פלג גופא": חצאים שמזהים זה את זה מיד.`, `Both souls share one root — ${pa.seph.name.en}. In the Zohar's words, "half a body": halves that recognize each other at once.`) };
  else if (path) relation = { score: 90, text: x(`הספירות שלכם (${pa.seph.name.he} ו${pb.seph.name.he}) מחוברות בנתיב ישיר בעץ החיים — נתיב האות ${path.letterName.he}. הקשר זורם בלי מתווכים.`, `Your Sephiroth (${pa.seph.name.en} and ${pb.seph.name.en}) are joined by a direct path on the Tree — the path of ${path.letterName.en}. The bond flows without intermediaries.`), path: { letter: path.letter, n: path.n, card: MAJOR_ARCANA[path.tarot].name } };
  else if (pa.seph.pillar === pb.seph.pillar) relation = { score: 74, text: x(`שתי הספירות על אותו עמוד (${pa.seph.pillar === 'right' ? 'החסד' : pa.seph.pillar === 'left' ? 'הדין' : 'האמצע'}): אותה נטייה נשמתית, בעוצמות שונות.`, `Both on the same pillar: the same soul tendency, at different strengths.`) };
  else if ((pa.seph.pillar === 'right' && pb.seph.pillar === 'left') || (pa.seph.pillar === 'left' && pb.seph.pillar === 'right')) relation = { score: 80, text: x('אחד מעמוד החסד והשני מעמוד הדין: הפכים משלימים, שנפגשים בתפארת — האיזון שביניכם.', 'One from the pillar of mercy, one from severity: complementary opposites that meet in Tiferet — the balance between you.') };
  else relation = { score: 66, text: x('אין נתיב ישיר בין הספירות — הקשר עובר דרך ספירות מתווכות. החיבור נבנה בהדרגה, דרך עבודה משותפת.', 'No direct path between your Sephiroth — the bond passes through intermediate ones. Connection builds gradually through shared work.') };

  const ek = pa.el === pb.el ? 'same' : [pa.el, pb.el].sort().join('-');
  const elements = { score: elementScore(pa.el, pb.el), text: SY_PAIR[ek] };
  const coupleBonus = ['tiferet', 'yesod', 'chesed', 'keter'].includes(cs.id) ? 88 : 76;
  return {
    people: [pa, pb],
    couple: { value: cv, seph: cs, tikkun: TIKKUN[cs.id] },
    relation, elements,
    total: avg([relation.score, elements.score, coupleBonus]),
  };
}

export const SY_ELEMENT_NAME = SY_EL;

/* =====================================================================
   3. נומרולוגיה
   ===================================================================== */
export interface NumPerson { name: string; birth: string }

const PACE: { ids: number[]; name: L; text: L }[] = [
  { ids: [1, 3, 5], name: x('חופש ותנועה', 'freedom and movement'), text: x('צורך בעצמאות, גיוון ומרחב', 'a need for independence, variety and space') },
  { ids: [2, 4, 6, 8], name: x('יציבות ומסגרת', 'stability and structure'), text: x('צורך בביטחון, סדר ומחויבות', 'a need for security, order and commitment') },
  { ids: [7, 9], name: x('עומק ומשמעות', 'depth and meaning'), text: x('צורך בשקט, התבוננות ומטרה גדולה', 'a need for quiet, reflection and a larger purpose') },
];
const paceOf = (n: number) => PACE.find((p) => p.ids.includes(reduceNumber(n, false)))!;

export const PERSONAL_YEAR: Record<number, L> = {
  1: x('התחלות חדשות', 'New beginnings'), 2: x('שותפות וזוגיות', 'Partnership'), 3: x('יצירה ושמחה', 'Creativity and joy'),
  4: x('בנייה ויסודות', 'Building foundations'), 5: x('שינוי ותנועה', 'Change and movement'), 6: x('בית, משפחה ואחריות', 'Home, family and responsibility'),
  7: x('התבוננות פנימית', 'Inner reflection'), 8: x('הישגים וכסף', 'Achievement and money'), 9: x('סיום וסגירת מעגל', 'Completion'),
};
export const GOALS: { id: string; label: L; short: L; years: number[] }[] = [
  { id: 'marry', label: x('מיסוד הקשר / חתונה', 'Commitment / wedding'), short: x('חתונה', 'Wed'), years: [2, 6] },
  { id: 'kids', label: x('הרחבת המשפחה', 'Growing the family'), short: x('ילדים', 'Kids'), years: [6, 3] },
  { id: 'move', label: x('מעבר דירה', 'Moving home'), short: x('מעבר', 'Move'), years: [4, 5, 1] },
];

export function personalYear(birth: string, year: number): number {
  const d = parseDate(birth)!;
  return reduceNumber(reduceNumber(d[2], false) + reduceNumber(d[1], false) + reduceNumber(year, false), false);
}

export interface NumLove {
  lp: [number, number];
  destiny: { n: number; title: L; text: L };
  pace: { a: typeof PACE[number]; b: typeof PACE[number]; score: number; text: L };
  years: { year: number; a: number; b: number; goals: { id: string; both: boolean; one: boolean }[] }[];
  total: number;
}

export function numerologyLove(A: NumPerson, B: NumPerson, from = new Date().getFullYear()): NumLove {
  const lpOf = (s: string) => { const d = parseDate(s)!; return reduceNumber(reduceNumber(d[0]) + reduceNumber(d[1]) + reduceNumber(d[2])); };
  const la = lpOf(A.birth), lb = lpOf(B.birth);
  const digits = `${A.birth}${B.birth}`.replace(/\D/g, '').split('').reduce((s, c) => s + Number(c), 0);
  const dn = reduceNumber(digits);
  const pa = paceOf(la), pb = paceOf(lb);
  const same = pa === pb;
  const pace = {
    a: pa, b: pb, score: same ? 86 : (pa.ids.includes(7) || pb.ids.includes(7)) ? 66 : 58,
    text: same
      ? x(`שניכם בקצב של ${pa.name.he} — ${pa.text.he}. קל לכם להבין את הצרכים זה של זה.`, `You both live at the pace of ${pa.name.en} — ${pa.text.en}. You easily understand each other's needs.`)
      : x(`${A.name} בקצב של ${pa.name.he} (${pa.text.he}), ו${B.name} בקצב של ${pb.name.he} (${pb.text.he}). הפער הזה הוא מקור לצמיחה — אם מכבדים אותו ולא מנסים לשנות.`, `${A.name} lives at the pace of ${pa.name.en} (${pa.text.en}), ${B.name} of ${pb.name.en} (${pb.text.en}). The gap drives growth — if respected rather than fought.`),
  };
  const years = Array.from({ length: 6 }, (_, i) => {
    const y = from + i, a = personalYear(A.birth, y), b = personalYear(B.birth, y);
    return { year: y, a, b, goals: GOALS.map((g) => ({ id: g.id, both: g.years.includes(a) && g.years.includes(b), one: g.years.includes(a) !== g.years.includes(b) })) };
  });
  const m = NUMBER_MEANINGS[dn];
  return { lp: [la, lb], destiny: { n: dn, title: m.title, text: m.text }, pace, years, total: avg([pace.score, [2, 6, 9, 11, 22, 33].includes(dn) ? 86 : 74]) };
}

