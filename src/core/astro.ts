/**
 * astro.ts — ליבת החישובים המשותפת לאתר ולאפליקציה (עברית + English).
 * ללא תלויות חיצוניות: לוח עברי וסיני מחושבים דרך Intl של הדפדפן.
 * כל טקסט תוכן מוגדר כ-L = { he, en } ומתורגם בשכבת התצוגה עם tr().
 */
import { birthCard, type TarotCard } from './tarot.ts';

export type Lang = 'he' | 'en';
export interface L { he: string; en: string }
export const tr = (l: L, lang: Lang): string => l[lang];

export type Element = 'fire' | 'earth' | 'air' | 'water';
export type Modality = 'cardinal' | 'fixed' | 'mutable';

export const ELEMENTS: Record<Element, L> = {
  fire: { he: 'אש', en: 'Fire' },
  earth: { he: 'אדמה', en: 'Earth' },
  air: { he: 'אוויר', en: 'Air' },
  water: { he: 'מים', en: 'Water' },
};

export const ELEMENT_DESCRIPTIONS: Record<Element, L> = {
  fire: { he: 'אנרגיה, התלהבות וכוח מניע טבעי. דינמי ויצור.', en: 'Energy, enthusiasm and natural drive. Dynamic and creative.' },
  earth: { he: 'יציבות, מעשיות וקשור למציאות. בנאי וביטחוני.', en: 'Stability, practicality and grounded reality. Builder and secure.' },
  air: { he: 'תקשורת, דעות וחופש רוח. בקי וגמיש.', en: 'Communication, ideas and mental freedom. Witty and adaptable.' },
  water: { he: 'רגישות, אינטואיציה ועומק רגשי. חלזוני ורחמן.', en: 'Sensitivity, intuition and emotional depth. Intuitive and compassionate.' },
};

export const MODALITIES: Record<Modality, L> = {
  cardinal: { he: 'קרדינלי', en: 'Cardinal' },
  fixed: { he: 'קבוע', en: 'Fixed' },
  mutable: { he: 'משתנה', en: 'Mutable' },
};

export const MODALITY_DESCRIPTIONS: Record<Modality, L> = {
  cardinal: { he: 'מתחיל, יוזם ויוצר שינוי. אנשים של פעולה.', en: 'Initiator, pioneer and catalyst for change. People of action.' },
  fixed: { he: 'קבוע, עמוד ומחזיק מעמד. אנשים של יציבות.', en: 'Stable, loyal and holds steady. People of stability.' },
  mutable: { he: 'גמיש, משתנה ומסתגל. אנשים של הסתגלות.', en: 'Flexible, changeable and adaptable. People of adaptation.' },
};

export interface ZodiacSign {
  id: string;
  name: L;
  symbol: string;
  element: Element;
  ruler: L;
  from: [number, number]; // [חודש, יום]
  to: [number, number];
  traits: L[];
  text: L;
}

export const ZODIAC: ZodiacSign[] = [
  { id: 'aries', name: { he: 'טלה', en: 'Aries' }, symbol: '♈', element: 'fire', ruler: { he: 'מאדים', en: 'Mars' }, from: [3, 21], to: [4, 19],
    traits: [{ he: 'יוזם', en: 'Driven' }, { he: 'אמיץ', en: 'Brave' }, { he: 'חסר סבלנות', en: 'Impatient' }],
    text: { he: 'הראשון לקפוץ למים. אנרגיה של התחלות, תחרותיות בריאה ויכולת לסחוף אחרים — כל עוד לא צריך לחכות יותר מדי.',
            en: 'First to jump in. The energy of beginnings, healthy competitiveness and a knack for rallying others — as long as nobody makes you wait.' } },
  { id: 'taurus', name: { he: 'שור', en: 'Taurus' }, symbol: '♉', element: 'earth', ruler: { he: 'נוגה', en: 'Venus' }, from: [4, 20], to: [5, 20],
    traits: [{ he: 'יציב', en: 'Steady' }, { he: 'נאמן', en: 'Loyal' }, { he: 'עקשן', en: 'Stubborn' }],
    text: { he: 'בונה לאט ובונה טוב. אוהב נוחות, אוכל טוב ודברים שמחזיקים מעמד, וכמעט אי אפשר להזיז אותו מעמדה שבחר.',
            en: 'Builds slowly and builds well. Loves comfort, good food and things that last, and almost never moves from a position once taken.' } },
  { id: 'gemini', name: { he: 'תאומים', en: 'Gemini' }, symbol: '♊', element: 'air', ruler: { he: 'כוכב חמה', en: 'Mercury' }, from: [5, 21], to: [6, 20],
    traits: [{ he: 'סקרן', en: 'Curious' }, { he: 'שנון', en: 'Witty' }, { he: 'משתנה', en: 'Restless' }],
    text: { he: 'ראש שעובד בכמה ערוצים במקביל. מתחבר מהר לאנשים ולרעיונות, ומשתעמם מהר באותה מידה.',
            en: 'A mind running on several channels at once. Connects quickly with people and ideas, and gets bored just as quickly.' } },
  { id: 'cancer', name: { he: 'סרטן', en: 'Cancer' }, symbol: '♋', element: 'water', ruler: { he: 'ירח', en: 'the Moon' }, from: [6, 21], to: [7, 22],
    traits: [{ he: 'רגיש', en: 'Sensitive' }, { he: 'מגונן', en: 'Protective' }, { he: 'זוכר הכל', en: 'Never forgets' }],
    text: { he: 'הבית והאנשים הקרובים הם מרכז העולם. קליפה קשה מבחוץ, רכות גדולה מבפנים וזיכרון רגשי ארוך.',
            en: 'Home and close people are the center of the world. A hard shell outside, great softness inside, and a long emotional memory.' } },
  { id: 'leo', name: { he: 'אריה', en: 'Leo' }, symbol: '♌', element: 'fire', ruler: { he: 'שמש', en: 'the Sun' }, from: [7, 23], to: [8, 22],
    traits: [{ he: 'נדיב', en: 'Generous' }, { he: 'כריזמטי', en: 'Charismatic' }, { he: 'גאה', en: 'Proud' }],
    text: { he: 'נולד לבמה. חם, נדיב ומוביל באופן טבעי, ומצפה — בצדק, לדעתו — לקצת הכרה בתמורה.',
            en: 'Born for the stage. Warm, generous and a natural leader, who expects — rightly, in their view — a little recognition in return.' } },
  { id: 'virgo', name: { he: 'בתולה', en: 'Virgo' }, symbol: '♍', element: 'earth', ruler: { he: 'כוכב חמה', en: 'Mercury' }, from: [8, 23], to: [9, 22],
    traits: [{ he: 'מדויק', en: 'Precise' }, { he: 'מעשי', en: 'Practical' }, { he: 'ביקורתי', en: 'Critical' }],
    text: { he: 'רואה את הפרט שכולם פספסו. אוהב סדר, שיפור מתמיד ועזרה אמיתית, ולפעמים מחמיר בעיקר עם עצמו.',
            en: 'Spots the detail everyone else missed. Loves order, constant improvement and being genuinely useful — and is hardest on themselves.' } },
  { id: 'libra', name: { he: 'מאזניים', en: 'Libra' }, symbol: '♎', element: 'air', ruler: { he: 'נוגה', en: 'Venus' }, from: [9, 23], to: [10, 22],
    traits: [{ he: 'הוגן', en: 'Fair' }, { he: 'אסתטי', en: 'Refined' }, { he: 'מתלבט', en: 'Indecisive' }],
    text: { he: 'מחפש איזון בכל דבר — ביחסים, בעיצוב ובוויכוחים. דיפלומט מלידה שמתקשה לבחור בין שתי אפשרויות טובות.',
            en: 'Seeks balance in everything — relationships, design, arguments. A born diplomat who struggles to choose between two good options.' } },
  { id: 'scorpio', name: { he: 'עקרב', en: 'Scorpio' }, symbol: '♏', element: 'water', ruler: { he: 'פלוטו ומאדים', en: 'Pluto and Mars' }, from: [10, 23], to: [11, 21],
    traits: [{ he: 'עמוק', en: 'Deep' }, { he: 'נחוש', en: 'Determined' }, { he: 'חשדן', en: 'Guarded' }],
    text: { he: 'הכל או כלום. אינטנסיבי, חד אבחנה ונאמן עד הסוף — וזוכר היטב גם מי לא היה נאמן לו.',
            en: 'All or nothing. Intense, perceptive and loyal to the end — and remembers exactly who was not loyal back.' } },
  { id: 'sagittarius', name: { he: 'קשת', en: 'Sagittarius' }, symbol: '♐', element: 'fire', ruler: { he: 'צדק', en: 'Jupiter' }, from: [11, 22], to: [12, 21],
    traits: [{ he: 'אופטימי', en: 'Optimistic' }, { he: 'הרפתקן', en: 'Adventurous' }, { he: 'ישיר', en: 'Blunt' }],
    text: { he: 'תמיד בדרך למקום הבא. אוהב חופש, רעיונות גדולים ואמת בלי פילטרים, גם כשהיא לא הכי נעימה.',
            en: 'Always on the way to the next place. Loves freedom, big ideas and unfiltered truth, even when it is not the nicest thing to hear.' } },
  { id: 'capricorn', name: { he: 'גדי', en: 'Capricorn' }, symbol: '♑', element: 'earth', ruler: { he: 'שבתאי', en: 'Saturn' }, from: [12, 22], to: [1, 19],
    traits: [{ he: 'שאפתן', en: 'Ambitious' }, { he: 'אחראי', en: 'Responsible' }, { he: 'מאופק', en: 'Reserved' }],
    text: { he: 'מטפס בסבלנות לפסגה. חושב לטווח ארוך, לוקח אחריות ברצינות ומגלה הומור יבש רק למי שמכיר אותו.',
            en: 'Climbs patiently to the top. Thinks long-term, takes responsibility seriously and reveals a dry sense of humor only to those who know them.' } },
  { id: 'aquarius', name: { he: 'דלי', en: 'Aquarius' }, symbol: '♒', element: 'air', ruler: { he: 'אורנוס ושבתאי', en: 'Uranus and Saturn' }, from: [1, 20], to: [2, 18],
    traits: [{ he: 'מקורי', en: 'Original' }, { he: 'עצמאי', en: 'Independent' }, { he: 'חברתי', en: 'Social' }],
    text: { he: 'חושב אחרת בכוונה. חבר של כולם אבל שומר מרחק, ומתלהב יותר מרעיונות שמשנים את העולם מאשר מדרמות קטנות.',
            en: 'Thinks differently on purpose. Friends with everyone yet keeps a little distance, and cares more about world-changing ideas than small dramas.' } },
  { id: 'pisces', name: { he: 'דגים', en: 'Pisces' }, symbol: '♓', element: 'water', ruler: { he: 'נפטון וצדק', en: 'Neptune and Jupiter' }, from: [2, 19], to: [3, 20],
    traits: [{ he: 'חולמני', en: 'Dreamy' }, { he: 'אמפתי', en: 'Empathetic' }, { he: 'אינטואיטיבי', en: 'Intuitive' }],
    text: { he: 'קולט את מצב הרוח בחדר לפני שמישהו דיבר. יצירתי, רך ורוחני, וצריך מדי פעם לברוח קצת מהמציאות.',
            en: 'Reads the mood of a room before anyone speaks. Creative, gentle and spiritual, and needs to escape reality now and then.' } },
];

function inRange(md: number, from: [number, number], to: [number, number]): boolean {
  const a = from[0] * 100 + from[1];
  const b = to[0] * 100 + to[1];
  return a <= b ? md >= a && md <= b : md >= a || md <= b;
}

export function westernSign(month: number, day: number): ZodiacSign {
  return ZODIAC.find((s) => inRange(month * 100 + day, s.from, s.to)) ?? ZODIAC[0];
}

/* ---------------- לוח עברי ---------------- */

export interface HebrewMonth { id: string; name: L; signId: string; tribe: L }

export const HEBREW_MONTHS: HebrewMonth[] = [
  { id: 'nisan', name: { he: 'ניסן', en: 'Nisan' }, signId: 'aries', tribe: { he: 'יהודה', en: 'Judah' } },
  { id: 'iyar', name: { he: 'אייר', en: 'Iyar' }, signId: 'taurus', tribe: { he: 'יששכר', en: 'Issachar' } },
  { id: 'sivan', name: { he: 'סיוון', en: 'Sivan' }, signId: 'gemini', tribe: { he: 'זבולון', en: 'Zebulun' } },
  { id: 'tamuz', name: { he: 'תמוז', en: 'Tammuz' }, signId: 'cancer', tribe: { he: 'ראובן', en: 'Reuben' } },
  { id: 'av', name: { he: 'אב', en: 'Av' }, signId: 'leo', tribe: { he: 'שמעון', en: 'Simeon' } },
  { id: 'elul', name: { he: 'אלול', en: 'Elul' }, signId: 'virgo', tribe: { he: 'גד', en: 'Gad' } },
  { id: 'tishrei', name: { he: 'תשרי', en: 'Tishrei' }, signId: 'libra', tribe: { he: 'אפרים', en: 'Ephraim' } },
  { id: 'cheshvan', name: { he: 'חשוון', en: 'Cheshvan' }, signId: 'scorpio', tribe: { he: 'מנשה', en: 'Manasseh' } },
  { id: 'kislev', name: { he: 'כסלו', en: 'Kislev' }, signId: 'sagittarius', tribe: { he: 'בנימין', en: 'Benjamin' } },
  { id: 'tevet', name: { he: 'טבת', en: 'Tevet' }, signId: 'capricorn', tribe: { he: 'דן', en: 'Dan' } },
  { id: 'shevat', name: { he: 'שבט', en: 'Shevat' }, signId: 'aquarius', tribe: { he: 'אשר', en: 'Asher' } },
  { id: 'adar', name: { he: 'אדר', en: 'Adar' }, signId: 'pisces', tribe: { he: 'נפתלי', en: 'Naphtali' } },
  { id: 'adar1', name: { he: 'אדר א׳', en: 'Adar I' }, signId: 'pisces', tribe: { he: 'נפתלי', en: 'Naphtali' } },
  { id: 'adar2', name: { he: 'אדר ב׳', en: 'Adar II' }, signId: 'pisces', tribe: { he: 'נפתלי', en: 'Naphtali' } },
];

/** ממפה שם חודש באנגלית (כפי ש-ICU מחזיר) למזהה. עמיד להבדלי כתיב בין דפדפנים. */
function matchHebrewMonth(raw: string): HebrewMonth {
  const s = raw.toLowerCase().replace(/[^a-z ]/g, '').trim();
  const id =
    /^adar ii|^adar 2|^adar b/.test(s) ? 'adar2' :
    /^adar i|^adar 1|^adar a/.test(s) ? 'adar1' :
    s.startsWith('adar') ? 'adar' :
    s.startsWith('nis') ? 'nisan' :
    s.startsWith('iy') ? 'iyar' :
    s.startsWith('siv') ? 'sivan' :
    s.startsWith('tam') ? 'tamuz' :
    s.startsWith('av') || s.startsWith('ab') ? 'av' :
    s.startsWith('el') ? 'elul' :
    s.startsWith('tis') ? 'tishrei' :
    /^(hes|ches|kh?es|mar)/.test(s) ? 'cheshvan' :
    s.startsWith('kis') ? 'kislev' :
    s.startsWith('tev') || s.startsWith('teb') ? 'tevet' :
    /^(shv|she|seb|shb)/.test(s) ? 'shevat' : 'nisan';
  return HEBREW_MONTHS.find((m) => m.id === id)!;
}

const GEM_UNITS = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
const GEM_TENS = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
const GEM_HUNDREDS = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];

/** מספר (1–999) לאותיות עבריות עם גרש/גרשיים, למשל 750 → תש״ן */
export function toHebrewNumeral(n: number, finalForm = false): string {
  n = n % 1000;
  let out = GEM_HUNDREDS[Math.floor(n / 100)];
  const rest = n % 100;
  if (rest === 15) out += 'טו';
  else if (rest === 16) out += 'טז';
  else out += GEM_TENS[Math.floor(rest / 10)] + GEM_UNITS[rest % 10];
  if (finalForm && out.length > 1) {
    const finals: Record<string, string> = { כ: 'ך', מ: 'ם', נ: 'ן', פ: 'ף', צ: 'ץ' };
    out = out.slice(0, -1) + (finals[out.slice(-1)] ?? out.slice(-1));
  }
  return out.length === 1 ? out + '׳' : out.slice(0, -1) + '״' + out.slice(-1);
}

export interface HebrewDateResult {
  day: number;
  year: number;
  month: HebrewMonth;
  sign: ZodiacSign;
  formatted: L; // he: י״ח באדר תש״ן · en: 18 Adar 5750
}

function utcNoon(y: number, m: number, d: number): Date {
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function hebrewDate(y: number, m: number, d: number, afterSunset = false): HebrewDateResult {
  const date = utcNoon(y, m, d);
  if (afterSunset) date.setUTCDate(date.getUTCDate() + 1);
  const parts = new Intl.DateTimeFormat('en-u-ca-hebrew', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = parseInt(get('day'), 10);
  const year = parseInt(get('year'), 10);
  const month = matchHebrewMonth(get('month'));
  const sign = ZODIAC.find((s) => s.id === month.signId)!;
  return {
    day, year, month, sign,
    formatted: {
      he: `${toHebrewNumeral(day)} ב${month.name.he} ${toHebrewNumeral(year, true)}`,
      en: `${day} ${month.name.en} ${year}`,
    },
  };
}

/* ---------------- מזל סיני ---------------- */

export interface ChineseAnimal { id: string; name: L; emoji: string; text: L }

export const CHINESE_ANIMALS: ChineseAnimal[] = [
  { id: 'rat', name: { he: 'עכברוש', en: 'Rat' }, emoji: '🐀',
    text: { he: 'חריף, משאבי ומהיר להבחין בהזדמנות. יודע לשרוד ולשגשג כמעט בכל מצב.', en: 'Sharp, resourceful and quick to spot an opportunity. Knows how to survive and thrive almost anywhere.' } },
  { id: 'ox', name: { he: 'שור', en: 'Ox' }, emoji: '🐂',
    text: { he: 'חרוץ, סבלני ואמין. מתקדם בקצב שלו ולא מוותר עד שהעבודה גמורה.', en: 'Hardworking, patient and dependable. Moves at their own pace and does not stop until the job is done.' } },
  { id: 'tiger', name: { he: 'נמר', en: 'Tiger' }, emoji: '🐅',
    text: { he: 'נועז, תחרותי ומלא תשוקה. לא מפחד מסיכונים ולא אוהב שאומרים לו מה לעשות.', en: 'Bold, competitive and passionate. Not afraid of risk, and does not like being told what to do.' } },
  { id: 'rabbit', name: { he: 'ארנב', en: 'Rabbit' }, emoji: '🐇',
    text: { he: 'עדין, מנומס ובעל טעם טוב. מעדיף שלום ונוחות על פני עימותים.', en: 'Gentle, polite and tasteful. Prefers peace and comfort over confrontation.' } },
  { id: 'dragon', name: { he: 'דרקון', en: 'Dragon' }, emoji: '🐉',
    text: { he: 'שאפתן, בטוח בעצמו ומלא חיות. הסימן הנחשק ביותר בגלגל הסיני.', en: 'Ambitious, confident and full of life. The most sought-after sign on the Chinese wheel.' } },
  { id: 'snake', name: { he: 'נחש', en: 'Snake' }, emoji: '🐍',
    text: { he: 'חכם, מסתורי ואינטואיטיבי. חושב הרבה לפני שהוא פועל, ופועל בדיוק.', en: 'Wise, mysterious and intuitive. Thinks long before acting, then acts with precision.' } },
  { id: 'horse', name: { he: 'סוס', en: 'Horse' }, emoji: '🐎',
    text: { he: 'חופשי, אנרגטי ועליז. אוהב תנועה, קהל ותחושה שהדרך עוד פתוחה.', en: 'Free, energetic and cheerful. Loves movement, company and the feeling that the road is still open.' } },
  { id: 'goat', name: { he: 'עז', en: 'Goat' }, emoji: '🐐',
    text: { he: 'יצירתי, רגיש ורך. מוצא יופי בדברים קטנים וזקוק לסביבה תומכת.', en: 'Creative, sensitive and kind. Finds beauty in small things and needs a supportive environment.' } },
  { id: 'monkey', name: { he: 'קוף', en: 'Monkey' }, emoji: '🐒',
    text: { he: 'שנון, שובב וממציא. פותר בעיות בדרכים שאף אחד אחר לא חשב עליהן.', en: 'Clever, playful and inventive. Solves problems in ways nobody else thought of.' } },
  { id: 'rooster', name: { he: 'תרנגול', en: 'Rooster' }, emoji: '🐓',
    text: { he: 'חרוץ, גלוי לב ומקפיד על הופעה. אומר את מה שהוא חושב, בדרך כלל בקול.', en: 'Diligent, candid and well turned-out. Says what they think, usually out loud.' } },
  { id: 'dog', name: { he: 'כלב', en: 'Dog' }, emoji: '🐕',
    text: { he: 'נאמן, ישר ובעל חוש צדק חזק. החבר שתמיד יבוא כשצריך אותו.', en: 'Loyal, honest and with a strong sense of justice. The friend who always shows up when needed.' } },
  { id: 'pig', name: { he: 'חזיר', en: 'Pig' }, emoji: '🐖',
    text: { he: 'נדיב, חם ונהנתן. מאמין בטוב שבאנשים ויודע ליהנות מהחיים.', en: 'Generous, warm and pleasure-loving. Believes in the good in people and knows how to enjoy life.' } },
];

const CHINESE_ELEMENTS: L[] = [
  { he: 'עץ', en: 'Wood' }, { he: 'אש', en: 'Fire' }, { he: 'אדמה', en: 'Earth' },
  { he: 'מתכת', en: 'Metal' }, { he: 'מים', en: 'Water' },
];
const YANG: L = { he: 'יאנג', en: 'Yang' };
const YIN: L = { he: 'יין', en: 'Yin' };

export interface ChineseResult {
  animal: ChineseAnimal;
  index: number;
  element: L;
  polarity: L;
  chineseYear: number;
}

export function chineseZodiac(y: number, m: number, d: number): ChineseResult {
  let related = y;
  try {
    const parts = new Intl.DateTimeFormat('en-u-ca-chinese', { year: 'numeric', timeZone: 'UTC' })
      .formatToParts(utcNoon(y, m, d));
    const r = parts.find((p) => (p.type as string) === 'relatedYear')?.value;
    if (r) related = parseInt(r, 10);
    else if (m < 2 || (m === 2 && d < 4)) related = y - 1; // קירוב אם אין תמיכה
  } catch {
    if (m < 2 || (m === 2 && d < 4)) related = y - 1;
  }
  const cycle = (((related - 4) % 60) + 60) % 60;
  const index = cycle % 12;
  return {
    animal: CHINESE_ANIMALS[index],
    index,
    element: CHINESE_ELEMENTS[Math.floor((cycle % 10) / 2)],
    polarity: cycle % 2 === 0 ? YANG : YIN,
    chineseYear: related,
  };
}

/* ---------------- נומרולוגיה ---------------- */

const MASTER = new Set([11, 22, 33]);

export function reduceNumber(n: number, keepMaster = true): number {
  while (n > 9 && !(keepMaster && MASTER.has(n))) {
    n = String(n).split('').reduce((a, c) => a + Number(c), 0);
  }
  return n;
}

export const NUMBER_MEANINGS: Record<number, { title: L; text: L }> = {
  1: { title: { he: 'המוביל', en: 'The Leader' }, text: { he: 'עצמאות, יוזמה ורצון לפתוח דרכים חדשות.', en: 'Independence, initiative and a drive to open new paths.' } },
  2: { title: { he: 'המחבר', en: 'The Connector' }, text: { he: 'שיתוף פעולה, רגישות ויכולת לגשר בין אנשים.', en: 'Cooperation, sensitivity and a gift for bridging people.' } },
  3: { title: { he: 'היוצר', en: 'The Creator' }, text: { he: 'ביטוי עצמי, הומור ושמחת חיים מדבקת.', en: 'Self-expression, humor and contagious joy.' } },
  4: { title: { he: 'הבונה', en: 'The Builder' }, text: { he: 'סדר, התמדה ויסודות שמחזיקים לאורך זמן.', en: 'Order, persistence and foundations that last.' } },
  5: { title: { he: 'ההרפתקן', en: 'The Adventurer' }, text: { he: 'חופש, שינוי וסקרנות לגבי כל מה שעוד לא ניסה.', en: 'Freedom, change and curiosity about everything not yet tried.' } },
  6: { title: { he: 'המטפל', en: 'The Nurturer' }, text: { he: 'אחריות, משפחה ורצון לדאוג לאחרים.', en: 'Responsibility, family and a wish to care for others.' } },
  7: { title: { he: 'החוקר', en: 'The Seeker' }, text: { he: 'עומק, התבוננות וחיפוש אחר האמת שמתחת לפני השטח.', en: 'Depth, reflection and a search for the truth beneath the surface.' } },
  8: { title: { he: 'המנהל', en: 'The Executive' }, text: { he: 'שאפתנות, כוח והבנה טובה של עולם החומר.', en: 'Ambition, power and a firm grasp of the material world.' } },
  9: { title: { he: 'ההומניסט', en: 'The Humanitarian' }, text: { he: 'חמלה, ראייה רחבה ורצון לתרום לעולם.', en: 'Compassion, a wide view and a wish to give back to the world.' } },
  11: { title: { he: 'המאיר (מספר מאסטר)', en: 'The Illuminator (master number)' }, text: { he: 'אינטואיציה חזקה, השראה ויכולת להאיר דרך לאחרים.', en: 'Strong intuition, inspiration and the ability to light the way for others.' } },
  22: { title: { he: 'הבונה הגדול (מספר מאסטר)', en: 'The Master Builder (master number)' }, text: { he: 'הפיכת חזון גדול למציאות מוחשית.', en: 'Turning a grand vision into tangible reality.' } },
  33: { title: { he: 'המורה (מספר מאסטר)', en: 'The Teacher (master number)' }, text: { he: 'נתינה, ריפוי והובלה מתוך אהבה.', en: 'Giving, healing and leading through love.' } },
};

export function lifePath(y: number, m: number, d: number): number {
  return reduceNumber(reduceNumber(y) + reduceNumber(m) + reduceNumber(d));
}

const GEMATRIA: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50, ס: 60, ע: 70,
  פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200, ש: 300, ת: 400,
};

export interface NameNumberResult {
  gematria: number; // סכום אותיות עבריות (0 אם אין)
  latin: number;    // סכום פיתגוראי לאותיות לטיניות
  number: number;   // המספר המצומצם
}

export function nameNumber(name: string): NameNumberResult {
  let gematria = 0;
  let latin = 0;
  for (const ch of name.toLowerCase()) {
    if (GEMATRIA[ch]) gematria += GEMATRIA[ch];
    else if (ch >= 'a' && ch <= 'z') latin += ((ch.charCodeAt(0) - 97) % 9) + 1;
  }
  return { gematria, latin, number: reduceNumber(gematria + latin) };
}

/* ---------------- עצים קלטיים ---------------- */

export interface CelticTree { name: L; from: [number, number]; to: [number, number]; text: L }

export const CELTIC_TREES: CelticTree[] = [
  { name: { he: 'ליבנה', en: 'Birch' }, from: [12, 24], to: [1, 20], text: { he: 'התחלות חדשות. שאפתנות שקטה ויכולת להתחיל מאפס שוב ושוב.', en: 'New beginnings. Quiet ambition and the ability to start from scratch again and again.' } },
  { name: { he: 'חוזרר', en: 'Rowan' }, from: [1, 21], to: [2, 17], text: { he: 'חזון ומקוריות. הוגה דעות שרואה רחוק מאחרים.', en: 'Vision and originality. A thinker who sees further than others.' } },
  { name: { he: 'מֵילָה', en: 'Ash' }, from: [2, 18], to: [3, 17], text: { he: 'דמיון ויצירה. אמן בנשמה שמחבר בין עולמות.', en: 'Imagination and creativity. An artist at heart who connects worlds.' } },
  { name: { he: 'אלמון', en: 'Alder' }, from: [3, 18], to: [4, 14], text: { he: 'אומץ ומנהיגות. מי שיוצא ראשון לדרך ומושך אחריו.', en: 'Courage and leadership. The first to set out, pulling others along.' } },
  { name: { he: 'ערבה', en: 'Willow' }, from: [4, 15], to: [5, 12], text: { he: 'אינטואיציה וזיכרון. רגיש לשינויים ולמחזורים של החיים.', en: "Intuition and memory. Attuned to change and to life's cycles." } },
  { name: { he: 'עוזרר', en: 'Hawthorn' }, from: [5, 13], to: [6, 9], text: { he: 'ניגודים. נראה פשוט מבחוץ ומפתיע מאוד מבפנים.', en: 'Contrasts. Looks simple on the outside and is full of surprises within.' } },
  { name: { he: 'אלון', en: 'Oak' }, from: [6, 10], to: [7, 7], text: { he: 'כוח ויציבות. עמוד תווך שאחרים נשענים עליו.', en: 'Strength and stability. A pillar others lean on.' } },
  { name: { he: 'צינית', en: 'Holly' }, from: [7, 8], to: [8, 4], text: { he: 'אצילות והגנה. לוחם ששומר על מה שחשוב לו.', en: 'Nobility and protection. A guardian of what matters.' } },
  { name: { he: 'אִלְסָר', en: 'Hazel' }, from: [8, 5], to: [9, 1], text: { he: 'חוכמה וידע. אוסף מידע ויודע בדיוק מתי להשתמש בו.', en: 'Wisdom and knowledge. Gathers information and knows exactly when to use it.' } },
  { name: { he: 'גפן', en: 'Vine' }, from: [9, 2], to: [9, 29], text: { he: 'עדינות ושינוי. מתבגר עם הזמן ורק משתבח.', en: 'Refinement and change. Matures with time and only gets better.' } },
  { name: { he: 'קיסוס', en: 'Ivy' }, from: [9, 30], to: [10, 27], text: { he: 'נחישות וחברות. נאחז, צומח ולא מוותר.', en: 'Persistence and friendship. Holds on, grows and never gives up.' } },
  { name: { he: 'קנה', en: 'Reed' }, from: [10, 28], to: [11, 24], text: { he: 'עומק וסודות. חוקר שמגיע לשורש של כל סיפור.', en: 'Depth and secrets. An investigator who gets to the root of every story.' } },
  { name: { he: 'סמבוק', en: 'Elder' }, from: [11, 25], to: [12, 23], text: { he: 'חופש וחקירה. נפש פרועה שמחפשת את המשמעות.', en: 'Freedom and exploration. A wild spirit searching for meaning.' } },
];

export function celticTree(month: number, day: number): CelticTree {
  return CELTIC_TREES.find((t) => inRange(month * 100 + day, t.from, t.to)) ?? CELTIC_TREES[0];
}

/* ---------------- דקנים (תת-חלוקות של כל מזל) ---------------- */

export interface Decan { number: 1 | 2 | 3; range: L; ruler: L; text: L }

export const DECANS: Record<string, Decan[]> = {
  aries: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'מאדים', en: 'Mars' }, text: { he: 'חיה ופעילות טבעית. יוזם בטבעו.', en: 'Energy and natural activity. Naturally driven.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'שמש', en: 'Sun' }, text: { he: 'ביטחון והנהגה. מנהיג טבעי.', en: 'Confidence and leadership. A natural leader.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'צדק', en: 'Jupiter' }, text: { he: 'אופטימיזם והרחבה. חשיבה גדולה.', en: 'Optimism and expansion. Big thinking.' } },
  ],
  taurus: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'נוגה', en: 'Venus' }, text: { he: 'עדינות ויופי. אהבה למנוחה.', en: 'Refinement and beauty. Love of comfort.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'שכל מעשי וכישרון. רציונלי ויצור.', en: 'Practical mind and skill. Rational and creative.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'שבתאי', en: 'Saturn' }, text: { he: 'משמעת וגבולות. אחראי וזהיר.', en: 'Discipline and boundaries. Responsible and cautious.' } },
  ],
  gemini: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'תקשורת וסקרנות. שקוף וחזק.', en: 'Communication and curiosity. Witty and sharp.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'נוגה', en: 'Venus' }, text: { he: 'קסם חברתי. אהוב וחיבוביות.', en: 'Social charm. Popular and likeable.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'אורנוס', en: 'Uranus' }, text: { he: 'מקוריות וחדשנות. חושב אחרת.', en: 'Originality and innovation. Thinks differently.' } },
  ],
  cancer: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'ירח', en: 'Moon' }, text: { he: 'רגישות וחיבור רגשי עמוק. מוגן.', en: 'Sensitivity and deep emotional connection. Protected.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'דעות מעמיקות. חוקר רגשות.', en: 'Thoughtful perspective. Explores emotions.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'פישה', en: 'Pluto' }, text: { he: 'עוצמה נסתרת. יצירה מעמוקה.', en: 'Hidden power. Deep transformation.' } },
  ],
  leo: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'שמש', en: 'Sun' }, text: { he: 'מלוכה טבעית. קורינג וברור.', en: 'Natural royalty. Shining and clear.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'צדק', en: 'Jupiter' }, text: { he: 'נדיבות ותרבות גבוהה. מתון ונעים.', en: 'Generosity and refinement. Gracious and pleasant.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'מאדים', en: 'Mars' }, text: { he: 'שליטה ותחרותיות. רודף כוח וזקיף.', en: 'Dominance and competitive. Seeks power and status.' } },
  ],
  virgo: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'אנליזה חדה וביקורת. מדויק ומחושב.', en: 'Sharp analysis and criticism. Precise and calculated.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'שבתאי', en: 'Saturn' }, text: { he: 'משמעת וסדר. עצמאי ודומה.', en: 'Discipline and order. Independent and reliable.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'נוגה', en: 'Venus' }, text: { he: 'עדינות וחסכנות. איכותי ויפה.', en: 'Refinement and practicality. Quality and grace.' } },
  ],
  libra: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'נוגה', en: 'Venus' }, text: { he: 'גן וטעם. אסתטי וזקוק לאיזון.', en: 'Grace and taste. Aesthetic and needs balance.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'אורנוס', en: 'Uranus' }, text: { he: 'רעיונות מקוריים. חופשי ופעמים לא מצופה.', en: 'Original ideas. Free-thinking and sometimes unconventional.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'אינטליגנציה וקחברה. דיוקי מילים טובים.', en: 'Intelligence and sociability. Good with words.' } },
  ],
  scorpio: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'מאדים', en: 'Mars' }, text: { he: 'עוצמה וסדר מעש. נחוש ודרוך.', en: 'Intensity and drive. Determined and forceful.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'פישה', en: 'Pluto' }, text: { he: 'שינוי עמוק ויכול קוקי מחשבתי.', en: 'Deep transformation and psychological insight.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'שבתאי', en: 'Saturn' }, text: { he: 'תיתור ושימור מסוגל. אוקף שקט שטום.', en: 'Tradition and inner strength. Quiet resilience.' } },
  ],
  sagittarius: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'צדק', en: 'Jupiter' }, text: { he: 'הרחבה הרפתקן. אופטימי חשוק.', en: 'Expansive and adventurous. Optimistic and eager.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'מאדים', en: 'Mars' }, text: { he: 'תחרות ותשוקה. פעיל וגדיר.', en: 'Competitive and passionate. Active and strong.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'שמש', en: 'Sun' }, text: { he: 'קורינג וגדילה. אישי וביטחון.', en: 'Shining and ambitious. Personal and confident.' } },
  ],
  capricorn: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'שבתאי', en: 'Saturn' }, text: { he: 'אחריות משמעתית. שיפוטי והינו אימפרטיבי.', en: 'Disciplined responsibility. Judicious and commanding.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'נוגה', en: 'Venus' }, text: { he: 'אלגנציה ישמרניות. טעם פיננסי טוב.', en: 'Elegance and thrift. Good financial taste.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'תבונה עסקית. חושב בטווח ארוך.', en: 'Business acumen. Long-term thinking.' } },
  ],
  aquarius: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'שבתאי', en: 'Saturn' }, text: { he: 'תיאוריה מקורית. מצפון חברתי.', en: 'Original theory. Social conscience.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'נוגה', en: 'Venus' }, text: { he: 'ידידות טבעית וחיבה. קסום וכן סחיר.', en: 'Natural friendliness and affection. Magnetic.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'מרקוריוס', en: 'Mercury' }, text: { he: 'חדשנות מודעות. קול טוב לרעיונות גרויסים.', en: 'Conscious innovation. Voice for big ideas.' } },
  ],
  pisces: [
    { number: 1, range: { he: '0°-10°', en: '0°-10°' }, ruler: { he: 'נפטון', en: 'Neptune' }, text: { he: 'אופציות ויצירתיות. חלום בעש.', en: 'Idealistic and creative. Dreamy and artistic.' } },
    { number: 2, range: { he: '10°-20°', en: '10°-20°' }, ruler: { he: 'צדק', en: 'Jupiter' }, text: { he: 'רוחנות ונדיבות אנושית. חסדא.', en: 'Spirituality and humanitarian. Merciful.' } },
    { number: 3, range: { he: '20°-30°', en: '20°-30°' }, ruler: { he: 'פלוטו', en: 'Pluto' }, text: { he: 'טרנספורמציה רוחנית. מסתוריות גבוה.', en: 'Spiritual transformation. Deep mysticism.' } },
  ],
};

export function decan(lon: number): { sign: ZodiacSign; decan: Decan; position: number } {
  const norm_lon = ((lon % 360) + 360) % 360;
  const sign = ZODIAC[Math.floor(norm_lon / 30)];
  const deg = norm_lon % 30;
  const decanNum = Math.floor(deg / 10) + 1 as 1 | 2 | 3;
  const decan_obj = DECANS[sign.id][decanNum - 1];
  return { sign, decan: decan_obj, position: deg };
}

export function getModality(sign: ZodiacSign): Modality {
  const idx = ZODIAC.indexOf(sign);
  const mod = idx % 3;
  return mod === 0 ? 'cardinal' : mod === 1 ? 'fixed' : 'mutable';
}

/* ---------------- אבן ופרח ---------------- */

export const BIRTH_MONTH: { stone: L; color: string; flower: L }[] = [
  { stone: { he: 'גרנט (נופך)', en: 'Garnet' }, color: '#8E1B2C', flower: { he: 'ציפורן', en: 'Carnation' } },
  { stone: { he: 'אמטיסט (אחלמה)', en: 'Amethyst' }, color: '#7A4FA0', flower: { he: 'סיגלית', en: 'Violet' } },
  { stone: { he: 'אקוומרין', en: 'Aquamarine' }, color: '#6FC3D1', flower: { he: 'נרקיס', en: 'Daffodil' } },
  { stone: { he: 'יהלום', en: 'Diamond' }, color: '#DDE6EE', flower: { he: 'חיננית', en: 'Daisy' } },
  { stone: { he: 'אמרלד (ברקת)', en: 'Emerald' }, color: '#1F8A5B', flower: { he: 'שושנת העמקים', en: 'Lily of the valley' } },
  { stone: { he: 'פנינה', en: 'Pearl' }, color: '#EDE6DA', flower: { he: 'ורד', en: 'Rose' } },
  { stone: { he: 'רובי (אודם)', en: 'Ruby' }, color: '#B3122E', flower: { he: 'דורבנית', en: 'Larkspur' } },
  { stone: { he: 'פרידוט', en: 'Peridot' }, color: '#9DBF3A', flower: { he: 'סייפן', en: 'Gladiolus' } },
  { stone: { he: 'ספיר', en: 'Sapphire' }, color: '#1F3F9E', flower: { he: 'אסטר', en: 'Aster' } },
  { stone: { he: 'אופל', en: 'Opal' }, color: '#D9C9E6', flower: { he: 'ציפורני חתול', en: 'Marigold' } },
  { stone: { he: 'טופז', en: 'Topaz' }, color: '#E1A43A', flower: { he: 'חרצית', en: 'Chrysanthemum' } },
  { stone: { he: 'טורקיז', en: 'Turquoise' }, color: '#2FB3B0', flower: { he: 'נרקיס החורף', en: 'Paperwhite narcissus' } },
];

/* ---------------- פרופיל מלא ---------------- */

export interface ProfileInput { name: string; birthDate: string; afterSunset?: boolean }

export interface Profile {
  name: string;
  age: number;
  western: ZodiacSign;
  western_decan: { decan: Decan; position: number };
  western_modality: Modality;
  hebrew: HebrewDateResult;
  hebrew_decan: { decan: Decan; position: number };
  hebrew_modality: Modality;
  chinese: ChineseResult;
  lifePath: number;
  nameNum: NameNumberResult;
  celtic: CelticTree;
  birth: (typeof BIRTH_MONTH)[number];
  tarot: TarotCard;
}

export function parseDate(s: string): [number, number, number] | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const y = +m[1], mo = +m[2], d = +m[3];
  const dt = utcNoon(y, mo, d);
  if (dt.getUTCMonth() !== mo - 1 || dt.getUTCDate() !== d) return null;
  return [y, mo, d];
}

export function ageOn(y: number, m: number, d: number, today = new Date()): number {
  let age = today.getFullYear() - y;
  if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age--;
  return age;
}

export function buildProfile(input: ProfileInput, today = new Date()): Profile {
  const p = parseDate(input.birthDate);
  if (!p) throw new Error('invalid-date');
  const [y, m, d] = p;
  const western = westernSign(m, d);
  const hebrew = hebrewDate(y, m, d, !!input.afterSunset);

  // חשב דקנים בהנחה שהשמש בערך בתוך המזל (לא מדויק לחלוטין, אבל טוב מספיק)
  const western_lon = (ZODIAC.indexOf(western) * 30) + ((d % 10) * 3); // קירוב גס
  const hebrew_lon = (ZODIAC.indexOf(hebrew.sign) * 30) + ((d % 10) * 3);

  return {
    name: input.name.trim(),
    age: ageOn(y, m, d, today),
    western,
    western_decan: { decan: decan(western_lon).decan, position: decan(western_lon).position },
    western_modality: getModality(western),
    hebrew,
    hebrew_decan: { decan: decan(hebrew_lon).decan, position: decan(hebrew_lon).position },
    hebrew_modality: getModality(hebrew.sign),
    chinese: chineseZodiac(y, m, d),
    lifePath: lifePath(y, m, d),
    nameNum: nameNumber(input.name),
    celtic: celticTree(m, d),
    birth: BIRTH_MONTH[m - 1],
    tarot: birthCard(y, m, d),
  };
}

/* ---------------- התאמה זוגית ---------------- */

export function elementScore(a: Element, b: Element): number {
  if (a === b) return 85;
  const table: Record<string, number> = {
    'air-fire': 90, 'earth-water': 90,
    'earth-fire': 55, 'air-water': 50,
    'fire-water': 40, 'air-earth': 45,
  };
  return table[[a, b].sort().join('-')] ?? 50;
}

export function chineseScore(a: number, b: number): number {
  if (a === b) return 70;
  if (a % 4 === b % 4) return 92; // משולש הרמוני
  if (Math.abs(a - b) === 6) return 30; // עימות
  const harmony = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]];
  if (harmony.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) return 85;
  return 60;
}

export function numberScore(a: number, b: number): number {
  const ra = reduceNumber(a, false), rb = reduceNumber(b, false);
  if (ra === rb) return 75;
  const groups = [[1, 5, 7], [2, 4, 8], [3, 6, 9]];
  return groups.some((g) => g.includes(ra) && g.includes(rb)) ? 88 : 55;
}

export interface CompatResult {
  total: number;
  parts: { label: string; score: number; detail: string }[];
  summary: string;
}

const COMPAT_LABELS: Record<string, L> = {
  western: { he: 'מזל מערבי', en: 'Western sign' },
  hebrew: { he: 'מזל עברי', en: 'Hebrew sign' },
  chinese: { he: 'מזל סיני', en: 'Chinese sign' },
  life: { he: 'מסלול חיים', en: 'Life path' },
};

const COMPAT_SUMMARY: L[] = [
  { he: 'חיבור טבעי. הכוכבים ממש בעד.', en: 'A natural match. The stars are all for it.' },
  { he: 'בסיס טוב, עם מספיק הבדלים כדי שלא יהיה משעמם.', en: 'A good base, with enough differences to keep it interesting.' },
  { he: 'זוג שדורש עבודה — אבל עבודה שיכולה להשתלם.', en: 'A pairing that takes work — work that can pay off.' },
  { he: 'הפכים גמורים. או שזה יתפוצץ, או שזה יעבוד בגדול.', en: 'Total opposites. It will either explode or work brilliantly.' },
];

/** "א וב" בעברית (עם מקף לפני מילה שאינה עברית), "A & B" באנגלית */
export function joinAnd(x: string, y: string, lang: Lang): string {
  if (lang === 'en') return `${x} & ${y}`;
  return /^[\u05D0-\u05EA]/.test(y) ? `${x} ו${y}` : `${x} ו־${y}`;
}

export function compatibility(a: Profile, b: Profile, lang: Lang = 'he'): CompatResult {
  const and = (x: string, y: string) => joinAnd(x, y, lang);
  const withEl = (s: ZodiacSign) => `${s.name[lang]} (${ELEMENTS[s.element][lang]})`;
  const parts = [
    { label: COMPAT_LABELS.western[lang], score: elementScore(a.western.element, b.western.element),
      detail: and(withEl(a.western), withEl(b.western)) },
    { label: COMPAT_LABELS.hebrew[lang], score: elementScore(a.hebrew.sign.element, b.hebrew.sign.element),
      detail: and(a.hebrew.sign.name[lang], b.hebrew.sign.name[lang]) },
    { label: COMPAT_LABELS.chinese[lang], score: chineseScore(a.chinese.index, b.chinese.index),
      detail: and(a.chinese.animal.name[lang], b.chinese.animal.name[lang]) },
    { label: COMPAT_LABELS.life[lang], score: numberScore(a.lifePath, b.lifePath),
      detail: and(String(a.lifePath), String(b.lifePath)) },
  ];
  const total = Math.round(parts.reduce((s, p) => s + p.score, 0) / parts.length);
  const idx = total >= 80 ? 0 : total >= 65 ? 1 : total >= 50 ? 2 : 3;
  return { total, parts, summary: COMPAT_SUMMARY[idx][lang] };
}
