/**
 * tree.ts — עץ החיים: 10 ספירות, 22 נתיבים ואותיות, ואותיות החודשים לפי ספר יצירה.
 * מבנה הנתיבים לפי הסידור המקובל (הגר״א/קירכר), כולל הקבלה לקלפי הארקנה הגדולה.
 */
import type { L } from './astro';

export type SephiraId = 'keter' | 'chokhmah' | 'binah' | 'chesed' | 'gevurah' | 'tiferet' | 'netzach' | 'hod' | 'yesod' | 'malkhut';
export type Pillar = 'right' | 'left' | 'middle';
export type WorldId = 'atzilut' | 'beriah' | 'yetzirah' | 'assiyah';

export interface TreeSephira {
  id: SephiraId;
  n: number;
  name: L;
  meaning: L;
  x: number; y: number;          // מיקום בתרשים (viewBox 300×520)
  pillar: Pillar;
  world: WorldId;
  divineName: string;
  figure: L;                     // דמות מקראית (לשבע המידות)
  body: L;
  planet: L;
  theme: L;                      // מה הספירה מבטאת
  gift: L;                       // כשהיא "שלך": החוזקה
  challenge: L;                  // והאתגר
}

export const TREE: TreeSephira[] = [
  { id: 'keter', n: 1, name: { he: 'כתר', en: 'Keter' }, meaning: { he: 'הרצון העליון', en: 'The supreme will' }, x: 150, y: 42, pillar: 'middle', world: 'atzilut',
    divineName: 'אהיה', figure: { he: '—', en: '—' }, body: { he: 'מעל הראש', en: 'Above the head' }, planet: { he: 'ראשית התנועה', en: 'The first motion' },
    theme: { he: 'המקור שממנו הכל מתחיל: רצון טהור, עוד לפני מחשבה ומילים.', en: 'The source everything begins from: pure will, before thought or words.' },
    gift: { he: 'יכולת להתחיל דברים מאפס ולראות את התכלית הגדולה.', en: 'The ability to start from nothing and see the larger purpose.' },
    challenge: { he: 'לתרגם השראה גבוהה לצעדים מעשיים.', en: 'Turning high inspiration into practical steps.' } },
  { id: 'chokhmah', n: 2, name: { he: 'חכמה', en: 'Chokhmah' }, meaning: { he: 'הברק הראשון של הרעיון', en: 'The first flash of insight' }, x: 245, y: 100, pillar: 'right', world: 'atzilut',
    divineName: 'יה', figure: { he: '—', en: '—' }, body: { he: 'המוח הימני', en: 'Right brain' }, planet: { he: 'גלגל המזלות', en: 'The zodiac' },
    theme: { he: 'הנקודה שבה רעיון נולד בבת אחת, לפני שהוא מפורט.', en: 'The point where an idea is born all at once, before it is worked out.' },
    gift: { he: 'אינטואיציה, מקוריות והבזקי הבנה.', en: 'Intuition, originality and flashes of understanding.' },
    challenge: { he: 'להשלים את מה שהתחלת ולתת לרעיון צורה.', en: 'Finishing what you start and giving ideas form.' } },
  { id: 'binah', n: 3, name: { he: 'בינה', en: 'Binah' }, meaning: { he: 'הבנה ופיתוח', en: 'Understanding' }, x: 55, y: 100, pillar: 'left', world: 'beriah',
    divineName: 'יהו״ה (בניקוד אלהים)', figure: { he: '—', en: '—' }, body: { he: 'המוח השמאלי והלב', en: 'Left brain and heart' }, planet: { he: 'שבתאי', en: 'Saturn' },
    theme: { he: 'הרחבת הרעיון לפרטים, הבנת דבר מתוך דבר.', en: 'Unfolding the idea into detail; deriving one thing from another.' },
    gift: { he: 'עומק, ניתוח ויכולת לבנות מבנים יציבים.', en: 'Depth, analysis and the ability to build stable structures.' },
    challenge: { he: 'לא לשקוע בפרטים ובדאגה.', en: 'Not sinking into detail and worry.' } },
  { id: 'chesed', n: 4, name: { he: 'חסד', en: 'Chesed' }, meaning: { he: 'נתינה ואהבה', en: 'Loving-kindness' }, x: 245, y: 210, pillar: 'right', world: 'yetzirah',
    divineName: 'אל', figure: { he: 'אברהם', en: 'Abraham' }, body: { he: 'יד ימין', en: 'Right arm' }, planet: { he: 'צדק', en: 'Jupiter' },
    theme: { he: 'שפע שיוצא החוצה בלי גבול: נדיבות, הכלה, אהבה.', en: 'Abundance flowing outward without limit: generosity, embrace, love.' },
    gift: { he: 'נדיבות, חום ויכולת לגרום לאנשים להרגיש רצויים.', en: 'Generosity, warmth and making people feel welcome.' },
    challenge: { he: 'להציב גבולות ולא לתת עד שאין כוח.', en: 'Setting limits rather than giving until depleted.' } },
  { id: 'gevurah', n: 5, name: { he: 'גבורה', en: 'Gevurah' }, meaning: { he: 'דין, גבול ועוצמה', en: 'Strength and judgment' }, x: 55, y: 210, pillar: 'left', world: 'yetzirah',
    divineName: 'אלהים', figure: { he: 'יצחק', en: 'Isaac' }, body: { he: 'יד שמאל', en: 'Left arm' }, planet: { he: 'מאדים', en: 'Mars' },
    theme: { he: 'הכוח לצמצם, להבחין ולומר "עד כאן".', en: 'The power to restrain, discern and say "this far".' },
    gift: { he: 'משמעת, אומץ ויושר בלתי מתפשר.', en: 'Discipline, courage and uncompromising honesty.' },
    challenge: { he: 'לרכך ביקורת ולא להיות קשה מדי עם עצמך ועם אחרים.', en: 'Softening criticism, toward yourself and others.' } },
  { id: 'tiferet', n: 6, name: { he: 'תפארת', en: 'Tiferet' }, meaning: { he: 'הרמוניה ואמת', en: 'Beauty and harmony' }, x: 150, y: 265, pillar: 'middle', world: 'yetzirah',
    divineName: 'יהו״ה', figure: { he: 'יעקב', en: 'Jacob' }, body: { he: 'הגוף והלב', en: 'Torso and heart' }, planet: { he: 'שמש', en: 'Sun' },
    theme: { he: 'המרכז של העץ: איזון בין חסד לדין, ומקום האמת.', en: 'The center of the tree: balance between mercy and judgment, the place of truth.' },
    gift: { he: 'יכולת לגשר, לראות את שני הצדדים ולפעול ביושר.', en: 'Bridging, seeing both sides and acting with integrity.' },
    challenge: { he: 'להכריע גם כשהאיזון לא מושלם.', en: 'Deciding even when balance isn\'t perfect.' } },
  { id: 'netzach', n: 7, name: { he: 'נצח', en: 'Netzach' }, meaning: { he: 'התמדה וניצחון', en: 'Endurance and victory' }, x: 245, y: 345, pillar: 'right', world: 'yetzirah',
    divineName: 'יהו״ה צבאות', figure: { he: 'משה', en: 'Moses' }, body: { he: 'רגל ימין', en: 'Right leg' }, planet: { he: 'נוגה', en: 'Venus' },
    theme: { he: 'הכוח ללכת קדימה ולהתגבר על מכשולים.', en: 'The drive to move forward and overcome obstacles.' },
    gift: { he: 'יוזמה, התלהבות וכושר עמידה.', en: 'Initiative, enthusiasm and stamina.' },
    challenge: { he: 'לדעת מתי לעצור ולהקשיב.', en: 'Knowing when to stop and listen.' } },
  { id: 'hod', n: 8, name: { he: 'הוד', en: 'Hod' }, meaning: { he: 'הודיה וענווה', en: 'Splendor and acknowledgment' }, x: 55, y: 345, pillar: 'left', world: 'yetzirah',
    divineName: 'אלהים צבאות', figure: { he: 'אהרן', en: 'Aaron' }, body: { he: 'רגל שמאל', en: 'Left leg' }, planet: { he: 'כוכב חמה', en: 'Mercury' },
    theme: { he: 'היכולת להודות, לקבל ולהתמסר, וגם השפה והסדר.', en: 'Acknowledging, accepting and yielding, as well as language and order.' },
    gift: { he: 'הקשבה, דיוק ויכולת להסביר.', en: 'Listening, precision and the ability to explain.' },
    challenge: { he: 'לא לוותר על עצמך מתוך רצון לרצות.', en: 'Not giving yourself up to please others.' } },
  { id: 'yesod', n: 9, name: { he: 'יסוד', en: 'Yesod' }, meaning: { he: 'חיבור והתקשרות', en: 'Foundation and connection' }, x: 150, y: 405, pillar: 'middle', world: 'yetzirah',
    divineName: 'שדי / אל חי', figure: { he: 'יוסף', en: 'Joseph' }, body: { he: 'ברית', en: 'The covenant' }, planet: { he: 'ירח', en: 'Moon' },
    theme: { he: 'הצינור שאוסף את כל המידות ומעביר אותן אל העולם.', en: 'The channel that gathers all the qualities and passes them into the world.' },
    gift: { he: 'יכולת ליצור קשר אמיתי ולהביא דברים לידי ביטוי.', en: 'Creating real connection and bringing things into expression.' },
    challenge: { he: 'לשמור על נאמנות ועל גבולות בקשרים.', en: 'Keeping faithfulness and boundaries in relationships.' } },
  { id: 'malkhut', n: 10, name: { he: 'מלכות', en: 'Malkhut' }, meaning: { he: 'העולם הממשי', en: 'The kingdom' }, x: 150, y: 480, pillar: 'middle', world: 'assiyah',
    divineName: 'אדני', figure: { he: 'דוד', en: 'David' }, body: { he: 'הפה', en: 'The mouth' }, planet: { he: 'הארץ', en: 'Earth' },
    theme: { he: 'המקום שבו הכל מתממש: מעשים, דיבור ונוכחות בעולם.', en: 'Where everything becomes real: deeds, speech and presence in the world.' },
    gift: { he: 'מעשיות, נוכחות ויכולת להוציא לפועל.', en: 'Practicality, presence and getting things done.' },
    challenge: { he: 'לזכור שיש מקור ומשמעות מעבר לחומר.', en: 'Remembering there is a source and meaning beyond matter.' } },
];

export const sephira = (id: SephiraId) => TREE.find((s) => s.id === id)!;

export interface TreePath { n: number; letter: string; letterName: L; from: SephiraId; to: SephiraId; tarot: number }

const P = (n: number, letter: string, he: string, en: string, from: SephiraId, to: SephiraId): TreePath =>
  ({ n, letter, letterName: { he, en }, from, to, tarot: n - 11 });

export const PATHS22: TreePath[] = [
  P(11, 'א', 'אלף', 'Aleph', 'keter', 'chokhmah'), P(12, 'ב', 'בית', 'Beth', 'keter', 'binah'),
  P(13, 'ג', 'גימל', 'Gimel', 'keter', 'tiferet'), P(14, 'ד', 'דלת', 'Daleth', 'chokhmah', 'binah'),
  P(15, 'ה', 'הא', 'He', 'chokhmah', 'tiferet'), P(16, 'ו', 'וו', 'Vav', 'chokhmah', 'chesed'),
  P(17, 'ז', 'זין', 'Zayin', 'binah', 'tiferet'), P(18, 'ח', 'חית', 'Het', 'binah', 'gevurah'),
  P(19, 'ט', 'טית', 'Tet', 'chesed', 'gevurah'), P(20, 'י', 'יוד', 'Yod', 'chesed', 'tiferet'),
  P(21, 'כ', 'כף', 'Kaph', 'chesed', 'netzach'), P(22, 'ל', 'למד', 'Lamed', 'gevurah', 'tiferet'),
  P(23, 'מ', 'מם', 'Mem', 'gevurah', 'hod'), P(24, 'נ', 'נון', 'Nun', 'tiferet', 'netzach'),
  P(25, 'ס', 'סמך', 'Samekh', 'tiferet', 'yesod'), P(26, 'ע', 'עין', 'Ayin', 'tiferet', 'hod'),
  P(27, 'פ', 'פא', 'Pe', 'netzach', 'hod'), P(28, 'צ', 'צדי', 'Tsadi', 'netzach', 'yesod'),
  P(29, 'ק', 'קוף', 'Qoph', 'netzach', 'malkhut'), P(30, 'ר', 'ריש', 'Resh', 'hod', 'yesod'),
  P(31, 'ש', 'שין', 'Shin', 'hod', 'malkhut'), P(32, 'ת', 'תו', 'Tav', 'yesod', 'malkhut'),
];

/** ספר יצירה: 12 האותיות הפשוטות, כל אחת לחודש ולחוש */
export const MONTH_LETTER: Record<string, { letter: string; sense: L }> = {
  nisan: { letter: 'ה', sense: { he: 'שיחה', en: 'Speech' } },
  iyar: { letter: 'ו', sense: { he: 'הרהור', en: 'Thought' } },
  sivan: { letter: 'ז', sense: { he: 'הילוך', en: 'Motion' } },
  tamuz: { letter: 'ח', sense: { he: 'ראייה', en: 'Sight' } },
  av: { letter: 'ט', sense: { he: 'שמיעה', en: 'Hearing' } },
  elul: { letter: 'י', sense: { he: 'מעשה', en: 'Action' } },
  tishrei: { letter: 'ל', sense: { he: 'תשמיש', en: 'Intimacy' } },
  cheshvan: { letter: 'נ', sense: { he: 'ריח', en: 'Smell' } },
  kislev: { letter: 'ס', sense: { he: 'שינה', en: 'Sleep' } },
  tevet: { letter: 'ע', sense: { he: 'רוגז', en: 'Anger' } },
  shevat: { letter: 'צ', sense: { he: 'לעיטה', en: 'Taste' } },
  adar: { letter: 'ק', sense: { he: 'שחוק', en: 'Laughter' } },
  adar1: { letter: 'ק', sense: { he: 'שחוק', en: 'Laughter' } },
  adar2: { letter: 'ק', sense: { he: 'שחוק', en: 'Laughter' } },
};

export const SENSE_TEXT: Record<string, L> = {
  'ה': { he: 'כוח הדיבור: היכולת לבטא את עצמך ולהשפיע במילים.', en: 'The power of speech: expressing yourself and influencing through words.' },
  'ו': { he: 'כוח המחשבה: התבוננות, תכנון וחיבור בין רעיונות.', en: 'The power of thought: reflection, planning and linking ideas.' },
  'ז': { he: 'כוח ההליכה: תנועה קדימה, התקדמות ושינוי.', en: 'The power of motion: moving forward, progress and change.' },
  'ח': { he: 'כוח הראייה: לראות את הטוב ואת התמונה השלמה.', en: 'The power of sight: seeing the good and the whole picture.' },
  'ט': { he: 'כוח השמיעה: הקשבה, קבלה והבנה של אחרים.', en: 'The power of hearing: listening, receiving and understanding others.' },
  'י': { he: 'כוח המעשה: להפוך כוונה לפעולה ולתיקון.', en: 'The power of action: turning intention into deed and repair.' },
  'ל': { he: 'כוח החיבור: אהבה, זוגיות ואיחוד בין הפכים.', en: 'The power of union: love, partnership and joining opposites.' },
  'נ': { he: 'כוח הריח: חוש עדין להבחין בין אמת לשקר.', en: 'The power of smell: a fine sense for telling true from false.' },
  'ס': { he: 'כוח השינה: מנוחה, אמון והתחדשות.', en: 'The power of sleep: rest, trust and renewal.' },
  'ע': { he: 'כוח הרוגז: להפוך כעס לכוח מניע ולתיקון.', en: 'The power of anger: turning anger into drive and repair.' },
  'צ': { he: 'כוח הטעם: הנאה, הזנה ויכולת להבחין בטעם הדברים.', en: 'The power of taste: enjoyment, nourishment and discernment.' },
  'ק': { he: 'כוח השחוק: שמחה שמסוגלת להפוך מצבים.', en: 'The power of laughter: a joy that can turn situations around.' },
};

export const WORLDS: { id: WorldId; name: L; level: L; text: L }[] = [
  { id: 'atzilut', name: { he: 'אצילות', en: 'Atzilut' }, level: { he: 'עולם האצילות — רוח', en: 'Emanation — spirit' }, text: { he: 'הקרוב ביותר למקור. כאן הרצון והחכמה עדיין אחדים לגמרי עם האור.', en: 'Closest to the source, where will and wisdom are still one with the light.' } },
  { id: 'beriah', name: { he: 'בריאה', en: 'Beriah' }, level: { he: 'עולם הבריאה — שכל', en: 'Creation — intellect' }, text: { he: 'עולם ההבנה, שבו דבר ראשון נפרד ומקבל קיום משלו.', en: 'The world of understanding, where something first becomes separate and exists in itself.' } },
  { id: 'yetzirah', name: { he: 'יצירה', en: 'Yetzirah' }, level: { he: 'עולם היצירה — רגש', en: 'Formation — emotion' }, text: { he: 'עולם המידות והרגשות, שבו הדברים מקבלים צורה ואופי.', en: 'The world of qualities and emotions, where things take shape and character.' } },
  { id: 'assiyah', name: { he: 'עשייה', en: 'Assiyah' }, level: { he: 'עולם העשייה — מעשה', en: 'Action — deed' }, text: { he: 'העולם הממשי שלנו: מעשים, חומר וגוף.', en: 'Our tangible world: deeds, matter and body.' } },
];

const ORDER: SephiraId[] = ['keter', 'chokhmah', 'binah', 'chesed', 'gevurah', 'tiferet', 'netzach', 'hod', 'yesod'];

/** מספר (כולל מספרי מאסטר) → ספירה לפי סדר 1–9 */
export function sephiraForNumber(n: number): SephiraId {
  let k = n;
  while (k > 9) k = String(k).split('').reduce((a, c) => a + Number(c), 0);
  return ORDER[(k || 9) - 1];
}
