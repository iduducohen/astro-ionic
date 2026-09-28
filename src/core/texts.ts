/**
 * texts.ts — אוצר המילים הפרשני, בעברית ובאנגלית.
 * הפירושים מורכבים מרכיבים: כוכב (מה) × מזל (איך) × בית (איפה) × היבט (איך מתחברים).
 * כך 10 כוכבים × 12 מזלות × 12 בתים מקבלים טקסט קוהרנטי בלי אלפי משפטים כתובים ידנית.
 */
import type { L } from './astro.ts';
import type { AspectId, PointId } from './chart.ts';

export interface PointInfo {
  name: L;
  glyph: string;
  theme: L;        // "תחום X" — מה הנקודה מייצגת
  transit?: L;     // השפעה כטרנזיט
  retro?: L;       // משמעות קרמתית בנסיגה
  mundane?: L;     // משמעות באסטרולוגיה עולמית
}

export const POINTS: Record<PointId, PointInfo> = {
  sun: { name: { he: 'שמש', en: 'Sun' }, glyph: '☉',
    theme: { he: 'הזהות, הרצון והחיוניות', en: 'identity, will and vitality' },
    transit: { he: 'תשומת לב ואנרגיה', en: 'attention and energy' },
    mundane: { he: 'המנהיג והזהות הלאומית', en: 'the leader and national identity' } },
  moon: { name: { he: 'ירח', en: 'Moon' }, glyph: '☽',
    theme: { he: 'הרגשות, הצרכים והביטחון', en: 'emotions, needs and security' },
    transit: { he: 'מצב רוח ותגובות רגשיות', en: 'moods and emotional reactions' },
    mundane: { he: 'העם ומצב הרוח הציבורי', en: 'the people and public mood' } },
  mercury: { name: { he: 'כוכב חמה', en: 'Mercury' }, glyph: '☿',
    theme: { he: 'המחשבה, הלמידה והתקשורת', en: 'thinking, learning and communication' },
    transit: { he: 'מחשבות, שיחות והחלטות', en: 'thoughts, conversations and decisions' },
    retro: { he: 'שיעור של הקשבה: ללמוד לחשוב ולדבר מתוך עצמך, לא לפי הציפיות של אחרים.', en: 'A lesson in listening: learning to think and speak from within, not from what others expect.' },
    mundane: { he: 'תקשורת, תחבורה ומסחר', en: 'media, transport and trade' } },
  venus: { name: { he: 'נוגה', en: 'Venus' }, glyph: '♀',
    theme: { he: 'האהבה, היופי והערכים', en: 'love, beauty and values' },
    transit: { he: 'משיכה, הנאה ופיוס', en: 'attraction, pleasure and reconciliation' },
    retro: { he: 'שיעור בערך עצמי: להגדיר מחדש מה באמת יקר לך, באהבה ובכסף.', en: 'A lesson in self-worth: redefining what you truly value, in love and in money.' },
    mundane: { he: 'תרבות, דיפלומטיה ורווחה', en: 'culture, diplomacy and prosperity' } },
  mars: { name: { he: 'מאדים', en: 'Mars' }, glyph: '♂',
    theme: { he: 'הפעולה, התשוקה והאסרטיביות', en: 'action, desire and assertiveness' },
    transit: { he: 'דחף, מאבק ויוזמה', en: 'drive, conflict and initiative' },
    retro: { he: 'שיעור בכעס ובכוח: לכוון אנרגיה פנימה לפני שמתפרצים החוצה.', en: 'A lesson in anger and power: directing energy inward before it bursts out.' },
    mundane: { he: 'צבא, ביטחון וסכסוכים', en: 'military, security and conflict' } },
  jupiter: { name: { he: 'צדק', en: 'Jupiter' }, glyph: '♃',
    theme: { he: 'הצמיחה, האמונה וההזדמנויות', en: 'growth, faith and opportunity' },
    transit: { he: 'הרחבה, מזל והזדמנויות', en: 'expansion, luck and opportunity' },
    retro: { he: 'שיעור באמונה: למצוא משמעות ופילוסופיה אישית, לא לאמץ אחת מוכנה.', en: 'A lesson in faith: finding personal meaning rather than adopting a ready-made one.' },
    mundane: { he: 'כלכלה, משפט וצמיחה', en: 'economy, law and growth' } },
  saturn: { name: { he: 'שבתאי', en: 'Saturn' }, glyph: '♄',
    theme: { he: 'המשמעת, הגבולות והאחריות', en: 'discipline, limits and responsibility' },
    transit: { he: 'מבחן, אחריות ובגרות', en: 'testing, responsibility and maturity' },
    retro: { he: 'שיעור בסמכות פנימית: לבנות מבנה משלך במקום לפחד מהמבנים של אחרים.', en: 'A lesson in inner authority: building your own structure instead of fearing other people’s.' },
    mundane: { he: 'ממשל, מוסדות וצמצום', en: 'government, institutions and austerity' } },
  uranus: { name: { he: 'אורנוס', en: 'Uranus' }, glyph: '♅',
    theme: { he: 'החדשנות, החופש והמרד', en: 'innovation, freedom and rebellion' },
    transit: { he: 'שינוי פתאומי ושחרור', en: 'sudden change and liberation' },
    retro: { he: 'המהפכה מתחילה בפנים: להשתחרר מדפוסים לפני שמשנים את העולם.', en: 'The revolution starts inside: breaking your own patterns before changing the world.' },
    mundane: { he: 'טכנולוגיה, מחאות ותפניות פתאומיות', en: 'technology, protest and sudden turns' } },
  neptune: { name: { he: 'נפטון', en: 'Neptune' }, glyph: '♆',
    theme: { he: 'הדמיון, הרוחניות והחמלה', en: 'imagination, spirituality and compassion' },
    transit: { he: 'השראה, ערפול ורגישות', en: 'inspiration, fog and sensitivity' },
    retro: { he: 'שיעור באשליות: להבחין בין חלום שמרפא לחלום שבורחים אליו.', en: 'A lesson in illusion: telling a healing dream from an escape.' },
    mundane: { he: 'אידיאלים, דת, תקשורת המונים והטעיה', en: 'ideals, religion, mass media and deception' } },
  pluto: { name: { he: 'פלוטו', en: 'Pluto' }, glyph: '♇',
    theme: { he: 'הכוח, הטרנספורמציה והעומק', en: 'power, transformation and depth' },
    transit: { he: 'טרנספורמציה עמוקה', en: 'deep transformation' },
    retro: { he: 'שיעור בכוח: לעבור טרנספורמציה פנימית במקום לנסות לשלוט במה שבחוץ.', en: 'A lesson in power: transforming within instead of controlling what is outside.' },
    mundane: { he: 'מאבקי כוח, משאבים ושינוי שורשי', en: 'power struggles, resources and radical change' } },
  node: { name: { he: 'ראש הדרקון', en: 'North Node' }, glyph: '☊',
    theme: { he: 'הייעוד וכיוון הצמיחה', en: 'destiny and direction of growth' } },
  southNode: { name: { he: 'זנב הדרקון', en: 'South Node' }, glyph: '☋',
    theme: { he: 'הכישרונות והדפוסים מהעבר', en: 'past talents and patterns' } },
  asc: { name: { he: 'אופק עולה', en: 'Ascendant' }, glyph: 'AC',
    theme: { he: 'הרושם הראשוני והגישה לחיים', en: 'first impression and approach to life' },
    mundane: { he: 'האופי הלאומי והדימוי בעולם', en: 'national character and world image' } },
  mc: { name: { he: 'רום שמיים', en: 'Midheaven' }, glyph: 'MC',
    theme: { he: 'הקריירה, השאיפות והמוניטין', en: 'career, ambitions and reputation' },
    mundane: { he: 'השלטון והיעד הלאומי', en: 'the government and national goals' } },
  fortune: { name: { he: 'נקודת המזל', en: 'Part of Fortune' }, glyph: '⊗',
    theme: { he: 'המקום שבו השפע זורם בקלות', en: 'where abundance flows easily' } },
  spirit: { name: { he: 'נקודת הרוח', en: 'Part of Spirit' }, glyph: '⊕',
    theme: { he: 'הכוונה והבחירה המודעת', en: 'intention and conscious choice' } },
};

/** איך מזל "צובע" את מה שבתוכו — תוארי פועל */
export const SIGN_STYLE: Record<string, L> = {
  aries: { he: 'בישירות, באומץ ובקצב מהיר', en: 'directly, boldly and fast' },
  taurus: { he: 'ביציבות, בסבלנות ובחושניות', en: 'steadily, patiently and sensually' },
  gemini: { he: 'בסקרנות, בגמישות ובמילים', en: 'curiously, flexibly and through words' },
  cancer: { he: 'ברגישות, באכפתיות ובזהירות', en: 'sensitively, caringly and cautiously' },
  leo: { he: 'בחום, בגאווה ובנדיבות', en: 'warmly, proudly and generously' },
  virgo: { he: 'בדיוק, בענייניות ובתשומת לב לפרטים', en: 'precisely, practically and with an eye for detail' },
  libra: { he: 'בהרמוניה, בהגינות ובשיתוף', en: 'harmoniously, fairly and in partnership' },
  scorpio: { he: 'בעוצמה, בעומק ובפרטיות', en: 'intensely, deeply and privately' },
  sagittarius: { he: 'באופטימיות, בחופשיות ובחיפוש משמעות', en: 'optimistically, freely and in search of meaning' },
  capricorn: { he: 'באחריות, בשאפתנות ובאיפוק', en: 'responsibly, ambitiously and with restraint' },
  aquarius: { he: 'במקוריות, בעצמאות ובמבט לעתיד', en: 'originally, independently and with an eye on the future' },
  pisces: { he: 'בדמיון, בחמלה ובאינטואיציה', en: 'imaginatively, compassionately and intuitively' },
};

/** איכות המזל כשם עצם — לצומת הירח ולנקודות */
export const SIGN_QUALITY: Record<string, L> = {
  aries: { he: 'עצמאות ואומץ לעמוד לבד', en: 'independence and the courage to stand alone' },
  taurus: { he: 'יציבות, ערך עצמי ופשטות', en: 'stability, self-worth and simplicity' },
  gemini: { he: 'סקרנות, הקשבה ולמידה', en: 'curiosity, listening and learning' },
  cancer: { he: 'רגש, בית ושייכות', en: 'feeling, home and belonging' },
  leo: { he: 'ביטוי עצמי, יצירה ולב פתוח', en: 'self-expression, creativity and an open heart' },
  virgo: { he: 'שירות, סדר ועבודה מדויקת', en: 'service, order and careful work' },
  libra: { he: 'שותפות, איזון והתחשבות', en: 'partnership, balance and consideration' },
  scorpio: { he: 'אינטימיות, שינוי ושחרור', en: 'intimacy, change and letting go' },
  sagittarius: { he: 'אמונה, חוכמה והרחבת אופקים', en: 'faith, wisdom and wider horizons' },
  capricorn: { he: 'אחריות, מבנה והישג', en: 'responsibility, structure and achievement' },
  aquarius: { he: 'קהילה, חזון וחופש', en: 'community, vision and freedom' },
  pisces: { he: 'חמלה, אמונה וויתור על שליטה', en: 'compassion, faith and surrendering control' },
};

export const HOUSE_DOMAIN: L[] = [
  { he: 'הדימוי העצמי והגוף', en: 'self-image and the body' },
  { he: 'הכסף, הרכוש והערך העצמי', en: 'money, possessions and self-worth' },
  { he: 'התקשורת, הלימודים והאחים', en: 'communication, study and siblings' },
  { he: 'הבית, המשפחה והשורשים', en: 'home, family and roots' },
  { he: 'היצירה, האהבה והילדים', en: 'creativity, romance and children' },
  { he: 'העבודה היומיומית, ההרגלים והבריאות', en: 'daily work, habits and wellbeing' },
  { he: 'הזוגיות והשותפויות', en: 'partnership and relationships' },
  { he: 'המשאבים המשותפים, האינטימיות והשינוי', en: 'shared resources, intimacy and change' },
  { he: 'הלימודים הגבוהים, הנסיעות והאמונה', en: 'higher learning, travel and belief' },
  { he: 'הקריירה והמעמד', en: 'career and status' },
  { he: 'החברים, הקהילה והחלומות', en: 'friends, community and dreams' },
  { he: 'העולם הפנימי, המנוחה והנסתר', en: 'the inner world, rest and the hidden' },
];

export const HOUSE_MUNDANE: L[] = [
  { he: 'העם והאווירה הכללית', en: 'the people and general climate' },
  { he: 'הכלכלה והאוצר', en: 'the economy and treasury' },
  { he: 'התקשורת, התחבורה והשכנים', en: 'media, transport and neighbors' },
  { he: 'הקרקע, החקלאות והאופוזיציה', en: 'land, agriculture and the opposition' },
  { he: 'התרבות, הפנאי והילדים', en: 'culture, leisure and children' },
  { he: 'מערכת הבריאות, העובדים והשירות הציבורי', en: 'health system, workers and civil service' },
  { he: 'היחסים הבינלאומיים, בריתות ויריבים', en: 'foreign relations, alliances and rivals' },
  { he: 'החובות, המיסים והמשאבים המשותפים', en: 'debt, taxes and shared resources' },
  { he: 'המשפט, הדת וההשכלה הגבוהה', en: 'law, religion and higher education' },
  { he: 'ההנהגה והממשלה', en: 'leadership and government' },
  { he: 'הפרלמנט ובני הברית', en: 'parliament and allies' },
  { he: 'מוסדות סגורים, מודיעין ונושאים נסתרים', en: 'closed institutions, intelligence and hidden matters' },
];

export const ASPECT_INFO: Record<AspectId, { name: L; nature: L; short: L }> = {
  conj: { name: { he: 'צמוד', en: 'conjunct' },
    nature: { he: 'מתמזגים ופועלים כיחידה אחת — עוצמה מרוכזת', en: 'merge and act as one — concentrated power' },
    short: { he: 'מיזוג', en: 'fusion' } },
  sext: { name: { he: 'בשישית', en: 'sextile' },
    nature: { he: 'משתפים פעולה — הזדמנות שדורשת צעד קטן', en: 'cooperate — an opportunity that asks for a small step' },
    short: { he: 'הזדמנות', en: 'opportunity' } },
  square: { name: { he: 'בריבוע', en: 'square' },
    nature: { he: 'נמצאים במתח שדורש עבודה — ומייצר צמיחה', en: 'are in a tension that demands work — and produces growth' },
    short: { he: 'מתח', en: 'tension' } },
  trine: { name: { he: 'במשולש', en: 'trine' },
    nature: { he: 'זורמים בקלות — כישרון טבעי', en: 'flow easily — a natural talent' },
    short: { he: 'זרימה', en: 'flow' } },
  opp: { name: { he: 'באופוזיציה', en: 'opposite' },
    nature: { he: 'מושכים לכיוונים הפוכים — ומחפשים איזון', en: 'pull in opposite directions — seeking balance' },
    short: { he: 'קוטביות', en: 'polarity' } },
};

export const ELEMENT_TEXT: Record<string, L> = {
  fire: { he: 'דומיננטיות של אש: התלהבות, יוזמה ומנוע פנימי חזק. כדאי לשים לב לשחיקה ולחוסר סבלנות.', en: 'Fire dominant: enthusiasm, initiative and a strong inner engine. Watch for burnout and impatience.' },
  earth: { he: 'דומיננטיות של אדמה: מעשיות, יציבות ויכולת לבנות. כדאי להשאיר מקום לספונטניות.', en: 'Earth dominant: practicality, stability and the ability to build. Leave room for spontaneity.' },
  air: { he: 'דומיננטיות של אוויר: מחשבה, תקשורת ורעיונות. כדאי לחבר את הראש גם לגוף ולרגש.', en: 'Air dominant: thought, communication and ideas. Remember to connect the head to body and feeling.' },
  water: { he: 'דומיננטיות של מים: רגש, אינטואיציה ואמפתיה. כדאי לשמור על גבולות.', en: 'Water dominant: emotion, intuition and empathy. Keep healthy boundaries.' },
};

export const MODALITY: Record<string, { name: L; text: L }> = {
  cardinal: { name: { he: 'קרדינלי', en: 'Cardinal' }, text: { he: 'מתחיל דברים, יוזם ומוביל.', en: 'Starts things, initiates and leads.' } },
  fixed: { name: { he: 'קבוע', en: 'Fixed' }, text: { he: 'מתמיד, נאמן ומחזיק לאורך זמן.', en: 'Persistent, loyal and in it for the long haul.' } },
  mutable: { name: { he: 'משתנה', en: 'Mutable' }, text: { he: 'גמיש, מסתגל ומחבר בין דברים.', en: 'Flexible, adaptable and a connector.' } },
};

export const MODALITY_OF: Record<string, string> = {
  aries: 'cardinal', cancer: 'cardinal', libra: 'cardinal', capricorn: 'cardinal',
  taurus: 'fixed', leo: 'fixed', scorpio: 'fixed', aquarius: 'fixed',
  gemini: 'mutable', virgo: 'mutable', sagittarius: 'mutable', pisces: 'mutable',
};

export const DIGNITY_NAME: Record<string, L> = {
  domicile: { he: 'בביתו', en: 'in domicile' },
  exalted: { he: 'ברום', en: 'exalted' },
  detriment: { he: 'בגלות', en: 'in detriment' },
  fall: { he: 'בנפילה', en: 'in fall' },
};
