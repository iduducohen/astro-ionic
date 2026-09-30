/**
 * tarot.ts — 22 קלפי הארקנה הגדולה, משיכה אקראית וקלף לידה.
 * ההקבלות האסטרולוגיות לפי מסורת "השחר המוזהב" (Golden Dawn).
 */
import type { L } from './astro';

export interface TarotCard {
  n: number;          // 0–21
  roman: string;
  name: L;
  glyph: string;      // סמל ההקבלה האסטרולוגית
  corr: L;            // מזל / כוכב / יסוד מקביל
  signId?: string;    // אם מקביל למזל: id מתוך ZODIAC
  keywords: L;
  upright: L;
  reversed: L;
}

export const MAJOR_ARCANA: TarotCard[] = [
  { n: 0, roman: '0', name: { he: 'השוטה', en: 'The Fool' }, glyph: '✧', corr: { he: 'אוויר', en: 'Air' },
    keywords: { he: 'התחלה, ספונטניות, אמונה', en: 'Beginnings, spontaneity, faith' },
    upright: { he: 'צעד ראשון לדרך חדשה. לא הכל ידוע, וזה בסדר — הסקרנות היא המצפן.', en: 'A first step onto a new road. Not everything is known, and that is fine — curiosity is the compass.' },
    reversed: { he: 'קפיצה בלי להסתכל. כדאי לעצור רגע ולבדוק מה באמת נמצא מתחת לרגליים.', en: 'Leaping without looking. Pause and check what is really under your feet.' } },
  { n: 1, roman: 'I', name: { he: 'הקוסם', en: 'The Magician' }, glyph: '☿', corr: { he: 'כוכב חמה', en: 'Mercury' },
    keywords: { he: 'כישרון, יוזמה, ריכוז', en: 'Skill, initiative, focus' },
    upright: { he: 'יש לך את כל הכלים שצריך. הגיע הזמן להפוך רעיון למעשה.', en: 'You already hold every tool you need. Time to turn an idea into action.' },
    reversed: { he: 'כוח שמתפזר לכל הכיוונים, או כישרון שלא מנוצל. לבחור מטרה אחת.', en: 'Power scattered in every direction, or talent left unused. Pick one goal.' } },
  { n: 2, roman: 'II', name: { he: 'הכוהנת הגדולה', en: 'The High Priestess' }, glyph: '☽', corr: { he: 'ירח', en: 'The Moon' },
    keywords: { he: 'אינטואיציה, סוד, הקשבה', en: 'Intuition, mystery, listening' },
    upright: { he: 'התשובה כבר בפנים. שקט והקשבה יגלו יותר מכל ויכוח.', en: 'The answer is already inside. Quiet listening will reveal more than any argument.' },
    reversed: { he: 'התעלמות מתחושת בטן, או סודות שמכבידים. מה את/ה לא מוכן/ה לשמוע?', en: 'Ignoring your gut, or secrets weighing you down. What are you not ready to hear?' } },
  { n: 3, roman: 'III', name: { he: 'הקיסרית', en: 'The Empress' }, glyph: '♀', corr: { he: 'נוגה', en: 'Venus' },
    keywords: { he: 'שפע, יצירה, טיפוח', en: 'Abundance, creation, nurture' },
    upright: { he: 'תקופה פורייה. מה שמטפחים עכשיו — קשר, פרויקט, גוף — יצמח.', en: 'A fertile time. What you nurture now — a bond, a project, your body — will grow.' },
    reversed: { he: 'נתינה לכולם חוץ מלעצמך. גם את/ה צריך/ה השקיה.', en: 'Giving to everyone but yourself. You need watering too.' } },
  { n: 4, roman: 'IV', name: { he: 'הקיסר', en: 'The Emperor' }, glyph: '♈', corr: { he: 'טלה', en: 'Aries' }, signId: 'aries',
    keywords: { he: 'סמכות, מבנה, יציבות', en: 'Authority, structure, stability' },
    upright: { he: 'זה הזמן לסדר, כללים ואחריות. מנהיגות רגועה עובדת יותר מצעקה.', en: 'A time for order, rules and responsibility. Calm leadership beats shouting.' },
    reversed: { he: 'שליטה שהפכה לנוקשות. אולי מישהו — או משהו — צריך קצת יותר חופש.', en: 'Control turned rigid. Someone — or something — may need more room.' } },
  { n: 5, roman: 'V', name: { he: 'הכוהן הגדול', en: 'The Hierophant' }, glyph: '♉', corr: { he: 'שור', en: 'Taurus' }, signId: 'taurus',
    keywords: { he: 'מסורת, לימוד, השתייכות', en: 'Tradition, learning, belonging' },
    upright: { he: 'ללמוד ממי שהלך בדרך לפנייך. מסגרת מוכרת יכולה לתת ביטחון.', en: 'Learn from those who walked the path before you. A familiar framework can bring security.' },
    reversed: { he: 'הכללים הישנים כבר לא מתאימים. מותר לשאול למה.', en: 'The old rules no longer fit. It is fine to ask why.' } },
  { n: 6, roman: 'VI', name: { he: 'האוהבים', en: 'The Lovers' }, glyph: '♊', corr: { he: 'תאומים', en: 'Gemini' }, signId: 'gemini',
    keywords: { he: 'בחירה, חיבור, ערכים', en: 'Choice, connection, values' },
    upright: { he: 'בחירה שנעשית מהלב ומתוך הערכים שלך. חיבור אמיתי עם אדם אחר.', en: 'A choice made from the heart and your values. A real connection with another person.' },
    reversed: { he: 'חוסר איזון במערכת יחסים, או בחירה שנדחית שוב ושוב.', en: 'Imbalance in a relationship, or a choice put off again and again.' } },
  { n: 7, roman: 'VII', name: { he: 'המרכבה', en: 'The Chariot' }, glyph: '♋', corr: { he: 'סרטן', en: 'Cancer' }, signId: 'cancer',
    keywords: { he: 'נחישות, תנועה, ניצחון', en: 'Willpower, momentum, victory' },
    upright: { he: 'כוח רצון מוביל קדימה. לרסן את הכוחות המנוגדים ולנסוע ישר למטרה.', en: 'Willpower drives you forward. Rein in the opposing forces and head straight for the goal.' },
    reversed: { he: 'מושכים לכיוונים שונים. בלי כיוון ברור, גם הרבה אנרגיה לא תזיז את העגלה.', en: 'Pulling in different directions. Without a clear heading, even lots of energy will not move the cart.' } },
  { n: 8, roman: 'VIII', name: { he: 'הכוח', en: 'Strength' }, glyph: '♌', corr: { he: 'אריה', en: 'Leo' }, signId: 'leo',
    keywords: { he: 'אומץ, סבלנות, רכות', en: 'Courage, patience, gentleness' },
    upright: { he: 'כוח אמיתי הוא שקט. סבלנות וחמלה יאלפו את מה שכוח גס לא יצליח.', en: 'Real strength is quiet. Patience and compassion will tame what brute force cannot.' },
    reversed: { he: 'ספק עצמי או כעס שמשתלט. להתחיל בחמלה כלפי עצמך.', en: 'Self-doubt or anger taking over. Start with compassion for yourself.' } },
  { n: 9, roman: 'IX', name: { he: 'הנזיר', en: 'The Hermit' }, glyph: '♍', corr: { he: 'בתולה', en: 'Virgo' }, signId: 'virgo',
    keywords: { he: 'התבוננות, בדידות, חוכמה', en: 'Reflection, solitude, wisdom' },
    upright: { he: 'זמן לצאת מהרעש ולחפש תשובות בפנים. פנס קטן מספיק כדי לראות את הצעד הבא.', en: 'Time to step out of the noise and look inward. A small lantern is enough to see the next step.' },
    reversed: { he: 'בדידות שהפכה לבידוד. אולי הגיע הזמן לחזור לאנשים.', en: 'Solitude turned into isolation. It may be time to return to people.' } },
  { n: 10, roman: 'X', name: { he: 'גלגל המזל', en: 'Wheel of Fortune' }, glyph: '♃', corr: { he: 'צדק', en: 'Jupiter' },
    keywords: { he: 'מחזוריות, מזל, שינוי', en: 'Cycles, luck, change' },
    upright: { he: 'הגלגל מסתובב לטובתך. שינוי מגיע — כדאי להיות מוכנים לתפוס אותו.', en: 'The wheel turns in your favor. Change is coming — be ready to catch it.' },
    reversed: { he: 'תקופה פחות מזלית. היא תעבור, כמו כל סיבוב של הגלגל.', en: 'A less lucky stretch. It will pass, like every turn of the wheel.' } },
  { n: 11, roman: 'XI', name: { he: 'הצדק', en: 'Justice' }, glyph: '♎', corr: { he: 'מאזניים', en: 'Libra' }, signId: 'libra',
    keywords: { he: 'הוגנות, אמת, תוצאה', en: 'Fairness, truth, consequence' },
    upright: { he: 'מה שנזרע נקצר. החלטה שקולה והוגנת תעמוד במבחן.', en: 'You reap what you sow. A fair, considered decision will stand the test.' },
    reversed: { he: 'משהו לא מאוזן או לא כנה. כדאי לבדוק את העובדות שוב.', en: 'Something is off-balance or not honest. Check the facts again.' } },
  { n: 12, roman: 'XII', name: { he: 'התלוי', en: 'The Hanged Man' }, glyph: '▽', corr: { he: 'מים', en: 'Water' },
    keywords: { he: 'השהיה, ויתור, נקודת מבט', en: 'Pause, surrender, perspective' },
    upright: { he: 'לעצור ולהסתכל על הדברים הפוך. ההמתנה עצמה היא חלק מהתשובה.', en: 'Stop and look at things upside down. The waiting itself is part of the answer.' },
    reversed: { he: 'תקיעות בלי תכלית. אם ההמתנה לא מלמדת כלום, אולי הגיע זמן לזוז.', en: 'Stuck with no purpose. If waiting teaches nothing, it may be time to move.' } },
  { n: 13, roman: 'XIII', name: { he: 'המוות', en: 'Death' }, glyph: '♏', corr: { he: 'עקרב', en: 'Scorpio' }, signId: 'scorpio',
    keywords: { he: 'סיום, שינוי, התחדשות', en: 'Endings, transformation, renewal' },
    upright: { he: 'לא מוות אמיתי — סוף פרק. משהו נסגר כדי שמשהו חדש יוכל להתחיל.', en: 'Not a literal death — the end of a chapter. Something closes so something new can begin.' },
    reversed: { he: 'היאחזות במה שכבר נגמר. לשחרר יכול להיות הקל מכל.', en: 'Clinging to what is already over. Letting go may be the easiest part.' } },
  { n: 14, roman: 'XIV', name: { he: 'המתינות', en: 'Temperance' }, glyph: '♐', corr: { he: 'קשת', en: 'Sagittarius' }, signId: 'sagittarius',
    keywords: { he: 'איזון, מידה, ריפוי', en: 'Balance, moderation, healing' },
    upright: { he: 'לערבב בדיוק במינון הנכון. דרך האמצע מביאה ריפוי ושקט.', en: 'Mix things in exactly the right measure. The middle path brings healing and calm.' },
    reversed: { he: 'הקצנה לצד אחד. משהו בחיים צריך יותר איזון.', en: 'Going to one extreme. Something in your life needs more balance.' } },
  { n: 15, roman: 'XV', name: { he: 'השטן', en: 'The Devil' }, glyph: '♑', corr: { he: 'גדי', en: 'Capricorn' }, signId: 'capricorn',
    keywords: { he: 'התמכרות, פיתוי, כבלים', en: 'Attachment, temptation, chains' },
    upright: { he: 'משהו מחזיק בך יותר ממה שנדמה. השרשראות רפויות — אפשר להוריד אותן.', en: 'Something holds you more than it seems. The chains are loose — you can lift them off.' },
    reversed: { he: 'השתחררות. מתחילים לראות את הדפוס, וזה הצעד הראשון החוצה.', en: 'Breaking free. You are starting to see the pattern, and that is the first step out.' } },
  { n: 16, roman: 'XVI', name: { he: 'המגדל', en: 'The Tower' }, glyph: '♂', corr: { he: 'מאדים', en: 'Mars' },
    keywords: { he: 'טלטלה, גילוי, שחרור', en: 'Upheaval, revelation, release' },
    upright: { he: 'מבנה שלא היה יציב נופל. זה מפחיד, אבל מפנה מקום לבסיס אמיתי.', en: 'A structure that was never stable comes down. Scary, but it clears space for a real foundation.' },
    reversed: { he: 'שינוי שנדחה עד שיהיה בלתי נמנע. אולי עדיף להוביל אותו בעצמך.', en: 'Change postponed until it becomes unavoidable. Better to lead it yourself.' } },
  { n: 17, roman: 'XVII', name: { he: 'הכוכב', en: 'The Star' }, glyph: '♒', corr: { he: 'דלי', en: 'Aquarius' }, signId: 'aquarius',
    keywords: { he: 'תקווה, השראה, ריפוי', en: 'Hope, inspiration, healing' },
    upright: { he: 'אחרי הסערה מגיע שקט. תקווה אמיתית ותחושה שהדרך נכונה.', en: 'After the storm comes calm. Real hope and a sense that you are on the right path.' },
    reversed: { he: 'אובדן אמונה רגעי. האור עוד שם, רק צריך להרים את הראש.', en: 'A passing loss of faith. The light is still there — look up.' } },
  { n: 18, roman: 'XVIII', name: { he: 'הירח', en: 'The Moon' }, glyph: '♓', corr: { he: 'דגים', en: 'Pisces' }, signId: 'pisces',
    keywords: { he: 'אשליה, חלום, לא נודע', en: 'Illusion, dreams, the unknown' },
    upright: { he: 'לא הכל כמו שהוא נראה. לסמוך על האינטואיציה, אבל לבדוק לפני שמחליטים.', en: 'Not everything is as it seems. Trust your intuition, but verify before deciding.' },
    reversed: { he: 'הערפל מתפזר. דברים שהיו מבלבלים מתחילים להתבהר.', en: 'The fog is lifting. Confusing things are becoming clear.' } },
  { n: 19, roman: 'XIX', name: { he: 'השמש', en: 'The Sun' }, glyph: '☉', corr: { he: 'שמש', en: 'The Sun' },
    keywords: { he: 'שמחה, הצלחה, בהירות', en: 'Joy, success, clarity' },
    upright: { he: 'אחד הקלפים הטובים בחבילה. אור, חום והצלחה — ליהנות מזה.', en: 'One of the best cards in the deck. Light, warmth and success — enjoy it.' },
    reversed: { he: 'השמש שם, אבל מאחורי ענן. שמחה קטנה יותר, או שמחה שמתעכבת.', en: 'The sun is there, behind a cloud. A smaller joy, or a joy that is running late.' } },
  { n: 20, roman: 'XX', name: { he: 'הדין', en: 'Judgement' }, glyph: '△', corr: { he: 'אש', en: 'Fire' },
    keywords: { he: 'התעוררות, סיכום, קריאה', en: 'Awakening, reckoning, calling' },
    upright: { he: 'רגע של התעוררות. להסתכל אחורה בכנות ולענות לקריאה של השלב הבא.', en: 'A moment of awakening. Look back honestly and answer the call of the next stage.' },
    reversed: { he: 'ביקורת עצמית שמשתקת. מותר לסלוח לעצמך ולהמשיך.', en: 'Self-judgment that paralyzes. You are allowed to forgive yourself and move on.' } },
  { n: 21, roman: 'XXI', name: { he: 'העולם', en: 'The World' }, glyph: '♄', corr: { he: 'שבתאי', en: 'Saturn' },
    keywords: { he: 'השלמה, הגשמה, מסע', en: 'Completion, fulfillment, journey' },
    upright: { he: 'מעגל נסגר בהצלחה. רגע לחגוג את מה שהושג לפני המסע הבא.', en: 'A cycle closes successfully. A moment to celebrate before the next journey.' },
    reversed: { he: 'כמעט שם. חסר עוד חלק קטן כדי לסגור את המעגל.', en: 'Almost there. One small piece is still missing to close the circle.' } },
];

export interface DrawnCard { card: TarotCard; reversed: boolean }

export type Spread = 'one' | 'three';

export const SPREAD_POSITIONS: Record<Spread, L[]> = {
  one: [{ he: 'המסר שלך', en: 'Your message' }],
  three: [{ he: 'עבר', en: 'Past' }, { he: 'הווה', en: 'Present' }, { he: 'עתיד', en: 'Future' }],
};

/** מספר אקראי אחיד ב-[0, max) — crypto אם יש, אחרת Math.random */
function randInt(max: number): number {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (c?.getRandomValues) {
    const buf = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max; // בלי הטיית מודולו
    do c.getRandomValues(buf); while (buf[0] >= limit);
    return buf[0] % max;
  }
  return Math.floor(Math.random() * max);
}

/** מערבב (Fisher–Yates) ומושך n קלפים שונים */
export function drawCards(n: number, allowReversed = true, rand: (max: number) => number = randInt): DrawnCard[] {
  const deck = MAJOR_ARCANA.slice();
  for (let i = deck.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck.slice(0, n).map((card) => ({ card, reversed: allowReversed && rand(2) === 1 }));
}

/**
 * קלף לידה: סכום ספרות התאריך המלא, מצומצם עד 22 ומטה (22 = השוטה).
 * למשל 15.03.1990 → 1+5+0+3+1+9+9+0 = 28 → 10 (גלגל המזל).
 */
export function birthCard(y: number, m: number, d: number): TarotCard {
  let n = `${y}${m}${d}`.split('').reduce((a, c) => a + Number(c), 0);
  while (n > 22) n = String(n).split('').reduce((a, c) => a + Number(c), 0);
  return MAJOR_ARCANA[n === 22 ? 0 : n];
}
