/**
 * zohar.ts — קריאת פנים וכף יד בהשראת ספר הזוהר (פרשת יתרו, "רזי פרצופא" ו"רזי אצבעות").
 * כל מאפיין שנבחר מצביע על יסוד (אש/אוויר/מים/עפר) ומוסיף פירוש משלו.
 * היסוד הדומיננטי קובע את המזג; צורת הפנים — את הספירה; השם ושם האם — את "שורש הנשמה".
 */
import type { L } from './astro';
import { nameNumber, reduceNumber } from './astro';
import { sephira, sephiraForNumber } from './tree';

export type El = 'fire' | 'air' | 'water' | 'earth';
export interface Opt { id: string; label: L; el?: El; text: L }
export interface Feature { key: string; step: 'face' | 'palm'; name: L; how: L; options: Opt[]; weight?: number }

const o = (id: string, he: string, en: string, el: El | undefined, the: string, ten: string): Opt =>
  ({ id, label: { he, en }, el, text: { he: the, en: ten } });

export const FEATURES: Feature[] = [
  /* ---------- פנים ---------- */
  { key: 'faceShape', step: 'face', name: { he: 'צורת הפנים', en: 'Face shape' }, how: { he: 'הסתכלו על קו המתאר מהמצח ועד הסנטר', en: 'Look at the outline from forehead to chin' }, options: [
    o('round', 'עגולה', 'Round', 'water', 'פנים עגולות קשורות לרכות, לרגש ולחיבור לאנשים.', 'A round face is linked to softness, feeling and connection.'),
    o('oval', 'סגלגלה', 'Oval', 'air', 'פנים סגלגלות מבטאות איזון, דיפלומטיה ויכולת להסתגל.', 'An oval face expresses balance, diplomacy and adaptability.'),
    o('square', 'מרובעת', 'Square', 'earth', 'פנים מרובעות מבטאות יציבות, נחישות ומעשיות.', 'A square face expresses stability, determination and practicality.'),
    o('triangle', 'משולשת / מחודדת', 'Pointed', 'fire', 'פנים מחודדות קשורות לחדות מחשבה, תשוקה ויוזמה.', 'A pointed face is linked to sharp thinking, passion and initiative.'),
  ] },
  { key: 'forehead', step: 'face', name: { he: 'המצח', en: 'Forehead' }, how: { he: 'גובה ורוחב המצח מעל הגבות', en: 'Height and width above the brows' }, options: [
    o('high', 'גבוה ורחב', 'High and broad', 'air', 'מצח רחב מתואר בזוהר כסימן לחכמה, ראייה רחבה ומחשבה עצמאית.', 'A broad forehead is described in the Zohar as a sign of wisdom and independent thought.'),
    o('medium', 'בינוני', 'Medium', 'earth', 'מצח בינוני משקף חשיבה מעשית ומאוזנת, בין רעיון לביצוע.', 'A medium forehead reflects practical, balanced thinking between idea and action.'),
    o('narrow', 'נמוך או צר', 'Low or narrow', 'fire', 'מצח צר קשור לפעולה מהירה ואינטואיטיבית, יותר מלהתלבטות ארוכה.', 'A narrow forehead is linked to quick, intuitive action rather than long deliberation.'),
  ] },
  { key: 'lines', step: 'face', name: { he: 'קמטי המצח', en: 'Forehead lines' }, how: { he: 'הרימו גבות מול מראה וספרו את הקווים', en: 'Raise your brows in a mirror and count the lines' }, options: [
    o('none', 'כמעט אין', 'Hardly any', undefined, 'מצח חלק: לפי הזוהר, תכונות שעדיין לא נחקקו — פתיחות ויכולת לשנות כיוון.', 'A smooth forehead: in the Zohar, traits not yet engraved — openness and room to change course.'),
    o('straight', 'שניים–שלושה קווים ישרים', 'Two or three straight lines', 'earth', 'קווים ישרים ומקבילים מתוארים כסימן ליושר, התמדה ודרך ברורה.', 'Straight parallel lines are described as a sign of integrity, persistence and a clear path.'),
    o('broken', 'קווים שבורים או מצטלבים', 'Broken or crossing lines', 'fire', 'קווים שבורים מעידים על חיים עם תפניות, ועל נפש שמחפשת ומשנה כיוון.', 'Broken lines point to a life of turns, and a soul that searches and changes direction.'),
  ] },
  { key: 'eyes', step: 'face', name: { he: 'צבע העיניים', en: 'Eye colour' }, how: { he: 'הצבע השולט בקשתית', en: 'The dominant iris colour' }, options: [
    o('brown', 'חום', 'Brown', 'earth', 'עיניים חומות קשורות ליציבות, חום ונאמנות.', 'Brown eyes are linked to stability, warmth and loyalty.'),
    o('blue', 'כחול / אפור', 'Blue / grey', 'water', 'עיניים בהירות קשורות לרגישות, עומק ואינטואיציה.', 'Light eyes are linked to sensitivity, depth and intuition.'),
    o('green', 'ירוק', 'Green', 'air', 'עיניים ירוקות קשורות לסקרנות, חשיבה חדה ותקשורת.', 'Green eyes are linked to curiosity, sharp thinking and communication.'),
    o('amber', 'ענבר / דבש', 'Amber / honey', 'fire', 'עיניים בגוון ענבר קשורות לחום, תשוקה ומנהיגות.', 'Amber eyes are linked to warmth, passion and leadership.'),
  ] },
  /* ---------- כף יד ---------- */
  { key: 'hand', step: 'palm', weight: 2, name: { he: 'צורת כף היד', en: 'Hand shape' }, how: { he: 'השוו את כף היד (בלי אצבעות) לאורך האצבעות', en: 'Compare the palm (without fingers) to finger length' }, options: [
    o('square-short', 'כף ריבועית, אצבעות קצרות', 'Square palm, short fingers', 'earth', 'יד "אדמה": מעשית, אמינה ואוהבת עבודה של ממש.', 'An "earth" hand: practical, reliable, loves real work.'),
    o('square-long', 'כף ריבועית, אצבעות ארוכות', 'Square palm, long fingers', 'air', 'יד "אוויר": סקרנית, תקשורתית ואוהבת רעיונות.', 'An "air" hand: curious, communicative, loves ideas.'),
    o('long-short', 'כף מוארכת, אצבעות קצרות', 'Long palm, short fingers', 'fire', 'יד "אש": נמרצת, יוזמת ומלאת תשוקה.', 'A "fire" hand: energetic, enterprising and passionate.'),
    o('long-long', 'כף מוארכת, אצבעות ארוכות', 'Long palm, long fingers', 'water', 'יד "מים": רגישה, יצירתית ואינטואיטיבית.', 'A "water" hand: sensitive, creative and intuitive.'),
  ] },
  { key: 'heart', step: 'palm', name: { he: 'קו הלב', en: 'Heart line' }, how: { he: 'הקו העליון, מתחת לאצבעות, מצד הזרת', en: 'The top line, under the fingers, from the little-finger side' }, options: [
    o('curved', 'מתעקל כלפי מעלה', 'Curves upward', 'fire', 'קו לב מתעקל: רגשות גלויים וחמים, אהבה שמתבטאת במעשים.', 'A curving heart line: open, warm feelings; love shown in deeds.'),
    o('straight', 'ישר', 'Straight', 'air', 'קו לב ישר: רגש שעובר דרך ההיגיון, זהירות בקשרים.', 'A straight heart line: feeling filtered through reason; care in relationships.'),
    o('long', 'ארוך מאוד', 'Very long', 'water', 'קו לב ארוך: עומק רגשי, נאמנות ואמפתיה גדולה.', 'A long heart line: emotional depth, loyalty and great empathy.'),
    o('short', 'קצר', 'Short', 'earth', 'קו לב קצר: רגש מרוכז ומעשי, מעט מילים והרבה עשייה.', 'A short heart line: focused, practical feeling; few words, much doing.'),
  ] },
  { key: 'head', step: 'palm', name: { he: 'קו הראש', en: 'Head line' }, how: { he: 'הקו האמצעי, חוצה את כף היד', en: 'The middle line crossing the palm' }, options: [
    o('straight', 'ישר', 'Straight', 'earth', 'קו ראש ישר: חשיבה לוגית, מסודרת וריאלית.', 'A straight head line: logical, orderly and realistic thinking.'),
    o('sloping', 'משתפל כלפי מטה', 'Slopes down', 'water', 'קו ראש משתפל: דמיון עשיר ויצירתיות.', 'A sloping head line: rich imagination and creativity.'),
    o('short', 'קצר', 'Short', 'fire', 'קו ראש קצר: החלטות מהירות וחשיבה ישירה.', 'A short head line: quick decisions and direct thinking.'),
    o('forked', 'מפוצל בסופו', 'Forked at the end', 'air', 'קו ראש מפוצל: יכולת לראות דבר משתי זוויות, ולגשר בין עולמות.', 'A forked head line: seeing things from two angles and bridging worlds.'),
  ] },
  { key: 'life', step: 'palm', name: { he: 'קו החיים', en: 'Life line' }, how: { he: 'הקו שמקיף את בסיס האגודל', en: 'The line curving around the base of the thumb' }, options: [
    o('wide', 'ארוך ומעוגל רחב', 'Long, wide curve', 'fire', 'קו חיים רחב: חיוניות, אנרגיה ותיאבון לחיים.', 'A wide life line: vitality, energy and appetite for life.'),
    o('close', 'צמוד לאגודל', 'Close to the thumb', 'earth', 'קו חיים צמוד: זהירות, חיבור לבית ולשורשים.', 'A close life line: caution and attachment to home and roots.'),
    o('broken', 'מקוטע או כפול', 'Broken or doubled', 'water', 'קו מקוטע או כפול: תפניות בדרך, ולפי המסורת גם כוח פנימי מגן.', 'A broken or double line: turning points, and traditionally a protective inner strength.'),
  ] },
];

export const ELEMENTS: Record<El, { name: L; letter: string; temperament: L; text: L; gift: L; care: L }> = {
  fire: { name: { he: 'אש', en: 'Fire' }, letter: 'ש', temperament: { he: 'מזג חם ונמרץ (כולרי)', en: 'Warm, energetic (choleric)' },
    text: { he: 'יסוד האש הוא כוח העלייה והתשוקה. בעלי יסוד זה יוזמים, מלהיבים ומובילים.', en: 'Fire is the power of rising and passion. Such people initiate, inspire and lead.' },
    gift: { he: 'אומץ, התלהבות והשראה', en: 'Courage, enthusiasm and inspiration' }, care: { he: 'כעס וחוסר סבלנות', en: 'Anger and impatience' } },
  air: { name: { he: 'אוויר', en: 'Air' }, letter: 'א', temperament: { he: 'מזג קל וחברותי (סנגוויני)', en: 'Light, sociable (sanguine)' },
    text: { he: 'יסוד האוויר מחבר ומתווך בין הפכים. בעלי יסוד זה חושבים, מדברים ומקשרים.', en: 'Air connects and mediates between opposites. Such people think, talk and link.' },
    gift: { he: 'חשיבה, שפה ויכולת לגשר', en: 'Thought, language and bridging' }, care: { he: 'פיזור ושטחיות', en: 'Scatter and superficiality' } },
  water: { name: { he: 'מים', en: 'Water' }, letter: 'מ', temperament: { he: 'מזג רך ורגוע (פלגמטי)', en: 'Soft, calm (phlegmatic)' },
    text: { he: 'יסוד המים הוא כוח החסד והזרימה. בעלי יסוד זה רגישים, מכילים ונותנים.', en: 'Water is the power of kindness and flow. Such people are sensitive, embracing and giving.' },
    gift: { he: 'אמפתיה, דמיון והכלה', en: 'Empathy, imagination and embrace' }, care: { he: 'היסחפות אחרי רגשות', en: 'Being carried off by feelings' } },
  earth: { name: { he: 'עפר', en: 'Earth' }, letter: 'ע', temperament: { he: 'מזג יציב ומעמיק (מלנכולי)', en: 'Steady, deep (melancholic)' },
    text: { he: 'יסוד העפר הוא כוח הקיום והיציבות. בעלי יסוד זה אמינים, סבלניים ובונים לאורך זמן.', en: 'Earth is the power of existence and stability. Such people are reliable, patient and build over time.' },
    gift: { he: 'התמדה, אמינות ומעשיות', en: 'Persistence, reliability and practicality' }, care: { he: 'עצבות ונוקשות', en: 'Gloom and rigidity' } },
};

const FACE_SEPHIRA: Record<string, 'chesed' | 'tiferet' | 'gevurah' | 'netzach' | 'yesod'> = {
  round: 'yesod', oval: 'tiferet', square: 'chesed', triangle: 'gevurah',
};

export type Choices = Record<string, string>;

export interface ZoharReading {
  element: El; counts: Record<El, number>; secondary: El | null;
  faceSephira: ReturnType<typeof sephira> | null;
  root: { value: number; sephira: ReturnType<typeof sephira> } | null;
  items: { step: 'face' | 'palm'; name: L; label: L; text: L }[];
}

export function readZohar(ch: Choices, name: string, mother: string): ZoharReading {
  const counts: Record<El, number> = { fire: 0, air: 0, water: 0, earth: 0 };
  const items: ZoharReading['items'] = [];
  for (const f of FEATURES) {
    const opt = f.options.find((x) => x.id === ch[f.key]);
    if (!opt) continue;
    if (opt.el) counts[opt.el] += f.weight ?? 1;
    items.push({ step: f.step, name: f.name, label: opt.label, text: opt.text });
  }
  const ranked = (Object.keys(counts) as El[]).sort((a, b) => counts[b] - counts[a]);
  const element = ranked[0];
  const secondary = counts[ranked[1]] > 0 ? ranked[1] : null;
  const faceSephira = ch.faceShape ? sephira(FACE_SEPHIRA[ch.faceShape]) : null;
  const full = `${name} ${mother}`.trim();
  const g = full && name.trim() && mother.trim() ? nameNumber(full) : null;
  const value = g ? g.gematria || g.latin : 0;
  const root = value ? { value, sephira: sephira(sephiraForNumber(reduceNumber(value))) } : null;
  return { element, counts, secondary, faceSephira, root, items };
}
