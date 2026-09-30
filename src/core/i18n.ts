/**
 * i18n.ts — מחרוזות ממשק לשתי השפות, משותף לאתר ולאפליקציה.
 */
import { joinAnd, type Lang, type Profile } from './astro';

export const LANGS: Lang[] = ['he', 'en'];
export const dirOf = (lang: Lang): 'rtl' | 'ltr' => (lang === 'he' ? 'rtl' : 'ltr');

const LANG_MIRROR = 'astro:lang';

function readSavedLang(): Lang | null {
  try {
    const raw = localStorage.getItem(LANG_MIRROR) ?? localStorage.getItem('CapacitorStorage.astro:lang');
    if (!raw) return null;
    const parsed = raw.startsWith('"') ? JSON.parse(raw) : raw;
    return parsed === 'he' || parsed === 'en' ? parsed : null;
  } catch {
    return null;
  }
}

/** שומר בחירת שפה גם מחוץ ל-Preferences, כדי שהכיוון יהיה נכון כבר בפריים הראשון. */
export function mirrorLang(lang: Lang): void {
  try { localStorage.setItem(LANG_MIRROR, lang); } catch { /* מצב פרטי */ }
}

function isNativeShell(): boolean {
  const cap = (globalThis as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor;
  try {
    return cap?.isNativePlatform?.() === true;
  } catch {
    return false;
  }
}

export function urlLang(): Lang | null {
  if (typeof location === 'undefined') return null;
  try {
    const q = new URLSearchParams(location.search).get('lang');
    return q === 'he' || q === 'en' ? q : null;
  } catch {
    return null;
  }
}

export function detectLang(): Lang {
  // באתר: עברית כברירת מחדל, כדי שגוגל יאנדקס את העברית.
  // אנגלית נפתחת רק מקישור ?lang=en או אחרי שהמשתמש בחר שפה.
  if (!isNativeShell()) {
    const fromUrl = urlLang();
    if (fromUrl) return fromUrl;
  }
  const saved = readSavedLang();
  if (saved) return saved;
  return 'he';
}

const he = {
  appTitle: 'מה כתוב לך בכוכבים',
  intro: 'שם ותאריך לידה, ומקבלים את המזל המערבי, העברי והסיני, נומרולוגיה ועוד — במקום אחד.',
  tabMe: 'המפה שלי',
  tabPair: 'התאמה זוגית',
  name: 'שם',
  namePlaceholder: 'למשל: נועה לוי',
  birthDate: 'תאריך לידה',
  afterSunset: 'נולדתי אחרי השקיעה',
  afterSunsetHelp: 'התאריך העברי מתחלף בערב, אז זה משנה את המזל העברי בימים הגבוליים.',
  showChart: 'הצגת המפה',
  you: 'את/ה',
  partner: 'בן/בת הזוג',
  checkMatch: 'בדיקת התאמה',
  guest: 'אורח/ת',
  errNoDate: 'צריך למלא תאריך לידה.',
  errBadDate: 'תאריך הלידה לא תקין.',
  errFuture: 'תאריך הלידה נמצא בעתיד.',
  ageLine: (name: string, age: number) => `${name}, בגיל ${age}`,
  signTitle: (sign: string) => `מזל ${sign}`,
  element: (e: string) => `יסוד ${e}`,
  ruler: (r: string) => `כוכב שולט: ${r}`,
  hebrewSign: 'מזל עברי',
  hebrewBorn: (date: string, tribe: string) => `נולדת ב${date}, שבט ${tribe}`,
  hebrewSame: 'המזל העברי שלך זהה למערבי — שני הלוחות מסכימים עלייך.',
  hebrewDiff: 'לפי חודש הלידה העברי יוצא מזל שונה מהמערבי.',
  chineseSign: 'מזל סיני',
  chineseSub: (el: string, pol: string, year: number) => `יסוד ${el}, ${pol}, שנת ${year}`,
  lifePath: 'מסלול חיים',
  lifePathSub: 'מחושב מסכום ספרות תאריך הלידה',
  nameNumber: 'מספר השם',
  gematria: (n: number) => `גימטריה של השם: ${n}`,
  pythagorean: 'לפי השיטה הפיתגוראית',
  celtic: 'עץ קלטי',
  stoneFlower: 'אבן ופרח',
  flowerOf: (f: string) => `פרח החודש: ${f}`,
  copy: 'העתקת הסיכום',
  share: 'שיתוף הסיכום',
  copied: 'הועתק.',
  copyBlocked: 'ההעתקה נחסמה בדפדפן. אפשר לסמן את הטקסט ולהעתיק ידנית.',
  shareTitle: 'מה כתוב לי בכוכבים',
  percent: (n: number) => `${n} אחוז`,
  footer: 'לבידור בלבד. החישובים מתבצעים במכשיר שלך ושום פרט לא נשלח לשרת.',
  switchTo: 'English',
  switchLabel: 'Switch to English',
  and: (a: string, b: string) => joinAnd(a, b, 'he'),
  tabPsychology: 'פסיכולוגיה',
  tabKabbalah: 'קבלה',
  tabZohar: 'זוהר',
  tabGraphology: 'גרפולוגיה',
  tabHD: 'עיצוב אנושי',
  tabTarot: 'טארוט',
  tarotIntro: 'אפשר לחשוב על שאלה, לבחור פריסה ולמשוך מתוך 22 קלפי הארקנה הגדולה.',
  question: 'שאלה (לא חובה)',
  questionPlaceholder: 'למשל: מה כדאי לי לדעת על השבוע הקרוב?',
  spread: 'פריסה',
  spreadOne: 'קלף אחד',
  spreadThree: 'עבר, הווה, עתיד',
  includeReversed: 'לכלול קלפים הפוכים',
  draw: 'ערבוב ומשיכה',
  drawAgain: 'משיכה חדשה',
  tapToReveal: 'לחיצה על קלף הופכת אותו.',
  revealAll: 'חשיפת כל הקלפים',
  cardBack: (pos: string) => `קלף סגור: ${pos}. לחיצה לחשיפה`,
  reversedTag: 'הפוך',
  corr: (x: string) => `מקביל ל${x}`,
  yourSignCard: 'זה הקלף של המזל שלך.',
  yourQuestion: (q: string) => `השאלה: ${q}`,
  birthCard: 'קלף טארוט לידה',
  birthCardSub: 'מסכום כל ספרות תאריך הלידה',
  tabCharts: 'אסטרולוגיה',
  chartsIntro: 'ניתוחים מלאים לפי מיקום הכוכבים המדויק ברגע הלידה. צריך תאריך, שעה ומקום.',
  tools: {
    natal: 'מפת לידה', karmic: 'קרמתית', forecast: 'תחזית', synastry: 'סינסטרי',
    horary: 'שאלה הוררית', election: 'בחירת מועד', mundane: 'עולמית',
  } as Record<string, string>,
  toolDesc: {
    natal: 'אישיות, חוזקות ודפוסים לפי המפה המלאה: כוכבים, בתים והיבטים.',
    karmic: 'ציר הגורל (קשרי הירח), כוכבים בנסיגה ונקודות גורל.',
    forecast: 'טרנזיטים עכשיו ובשנה הקרובה, חזרה סולארית וקידומים.',
    synastry: 'השוואת שתי מפות לידה ומפת קומפוזיט של הקשר.',
    horary: 'שאלה אחת ממוקדת, ותשובה ממפת הרגע שבו נשאלה.',
    election: 'חיפוש המועד הטוב ביותר לחתונה, עסק, חוזה או מעבר.',
    mundane: 'מפות של מדינות והשמיים של השנה: כניסות, מחזורים וליקויים.',
  } as Record<string, string>,
  myDetails: 'הפרטים שלי',
  partnerDetails: 'הפרטים של בן/בת הזוג',
  birthTime: 'שעת לידה',
  timeUnknown: 'לא ידועה שעת הלידה',
  birthPlace: 'מקום לידה',
  placeIsrael: 'ישראל',
  placeWorld: 'עולם',
  placeCustom: 'מיקום אחר (קואורדינטות)',
  latitude: 'קו רוחב (צפון +)',
  longitude: 'קו אורך (מזרח +)',
  timezone: 'אזור זמן',
  calc: 'חישוב',
  computing: 'מחשב…',
  srPlace: 'עיר לחזרה הסולארית',
  sameAsBirth: 'כמו מקום הלידה',
  horaryQuestion: 'השאלה',
  horaryPlaceholder: 'למשל: האם אקבל את העבודה?',
  horaryCategory: 'נושא השאלה',
  horaryWhen: 'רגע השאלה',
  horaryNow: 'עכשיו',
  horaryCustom: 'רגע אחר',
  wherePlace: 'איפה את/ה',
  electionEvent: 'סוג האירוע',
  electionFrom: 'מתאריך',
  electionDays: 'מספר ימים (עד 60)',
  electionHours: 'שעות ביום',
  hourFrom: 'משעה',
  hourTo: 'עד שעה',
  country: 'מדינה',
  customEvent: 'אירוע אחר',
  eventName: 'שם האירוע או המדינה',
  eventDate: 'תאריך',
  eventTime: 'שעה',
  errNoPlace: 'צריך לבחור מקום.',
  errBadCoords: 'קואורדינטות לא תקינות.',
  errTimeNeeded: 'לשיטה הזו צריך שעת לידה מדויקת.',
  errGeneric: 'לא הצלחנו לחשב. כדאי לבדוק את הפרטים.',
  edit: 'עריכה',
};

type Dict = typeof he;

const en: Dict = {
  appTitle: 'What the stars say about you',
  intro: 'A name and a birth date get you your Western, Hebrew and Chinese signs, numerology and more — in one place.',
  tabMe: 'My chart',
  tabPair: 'Compatibility',
  name: 'Name',
  namePlaceholder: 'e.g. Noa Levi',
  birthDate: 'Date of birth',
  afterSunset: 'I was born after sunset',
  afterSunsetHelp: 'The Hebrew date changes at nightfall, so this can change your Hebrew sign on borderline days.',
  showChart: 'Show my chart',
  you: 'You',
  partner: 'Your partner',
  checkMatch: 'Check compatibility',
  guest: 'Guest',
  errNoDate: 'Enter a date of birth.',
  errBadDate: 'That date of birth is not valid.',
  errFuture: 'That date of birth is in the future.',
  ageLine: (name, age) => `${name}, age ${age}`,
  signTitle: (sign) => sign,
  element: (e) => `${e} sign`,
  ruler: (r) => `Ruled by ${r}`,
  hebrewSign: 'Hebrew sign',
  hebrewBorn: (date, tribe) => `Born ${date}, tribe of ${tribe}`,
  hebrewSame: 'Your Hebrew sign matches your Western one — both calendars agree about you.',
  hebrewDiff: 'Your Hebrew birth month gives a different sign from the Western one.',
  chineseSign: 'Chinese sign',
  chineseSub: (el, pol, year) => `${el}, ${pol}, year ${year}`,
  lifePath: 'Life path',
  lifePathSub: 'The sum of the digits of your birth date',
  nameNumber: 'Name number',
  gematria: (n) => `Gematria value of your name: ${n}`,
  pythagorean: 'Pythagorean method',
  celtic: 'Celtic tree',
  stoneFlower: 'Stone & flower',
  flowerOf: (f) => `Birth flower: ${f}`,
  copy: 'Copy summary',
  share: 'Share summary',
  copied: 'Copied.',
  copyBlocked: 'Your browser blocked copying. Select the text and copy it manually.',
  shareTitle: 'What the stars say about me',
  percent: (n) => `${n} percent`,
  footer: 'For fun only. Everything is calculated on your device and nothing is sent to a server.',
  switchTo: 'עברית',
  switchLabel: 'החלפה לעברית',
  and: (a, b) => joinAnd(a, b, 'en'),
  tabPsychology: 'Psychology',
  tabKabbalah: 'Kabbalah',
  tabZohar: 'Zohar',
  tabGraphology: 'Graphology',
  tabHD: 'Human Design',
  tabTarot: 'Tarot',
  tarotIntro: 'Think of a question, pick a spread and draw from the 22 cards of the Major Arcana.',
  question: 'Question (optional)',
  questionPlaceholder: 'e.g. What should I know about the week ahead?',
  spread: 'Spread',
  spreadOne: 'One card',
  spreadThree: 'Past, present, future',
  includeReversed: 'Include reversed cards',
  draw: 'Shuffle and draw',
  drawAgain: 'Draw again',
  tapToReveal: 'Tap a card to turn it over.',
  revealAll: 'Reveal all cards',
  cardBack: (pos) => `Face-down card: ${pos}. Tap to reveal`,
  reversedTag: 'Reversed',
  corr: (x) => `Linked to ${x}`,
  yourSignCard: "This is your sign's card.",
  yourQuestion: (q) => `Your question: ${q}`,
  birthCard: 'Tarot birth card',
  birthCardSub: 'From the sum of every digit in your birth date',
  tabCharts: 'Astrology',
  chartsIntro: 'Full readings from the exact planetary positions at birth. Needs date, time and place.',
  tools: {
    natal: 'Birth chart', karmic: 'Karmic', forecast: 'Forecast', synastry: 'Synastry',
    horary: 'Horary', election: 'Electional', mundane: 'Mundane',
  },
  toolDesc: {
    natal: 'Personality, strengths and patterns from the full chart: planets, houses and aspects.',
    karmic: 'The nodal axis, retrograde planets and the Arabic lots.',
    forecast: 'Transits now and over the next year, solar return and progressions.',
    synastry: 'Two birth charts compared, plus a composite chart of the relationship.',
    horary: 'One focused question, answered from the chart of the moment it was asked.',
    election: 'Find the best time for a wedding, business, contract or move.',
    mundane: 'National charts and the sky of the year: ingresses, cycles and eclipses.',
  },
  myDetails: 'My details',
  partnerDetails: "Partner's details",
  birthTime: 'Time of birth',
  timeUnknown: 'Birth time unknown',
  birthPlace: 'Place of birth',
  placeIsrael: 'Israel',
  placeWorld: 'World',
  placeCustom: 'Other location (coordinates)',
  latitude: 'Latitude (north +)',
  longitude: 'Longitude (east +)',
  timezone: 'Time zone',
  calc: 'Calculate',
  computing: 'Calculating…',
  srPlace: 'City for the solar return',
  sameAsBirth: 'Same as birthplace',
  horaryQuestion: 'Your question',
  horaryPlaceholder: 'e.g. Will I get the job?',
  horaryCategory: 'Topic',
  horaryWhen: 'Moment of the question',
  horaryNow: 'Now',
  horaryCustom: 'Another moment',
  wherePlace: 'Where you are',
  electionEvent: 'Type of event',
  electionFrom: 'From date',
  electionDays: 'Number of days (up to 60)',
  electionHours: 'Hours of the day',
  hourFrom: 'From',
  hourTo: 'To',
  country: 'Country',
  customEvent: 'Another event',
  eventName: 'Event or country name',
  eventDate: 'Date',
  eventTime: 'Time',
  errNoPlace: 'Choose a place.',
  errBadCoords: 'Those coordinates are not valid.',
  errTimeNeeded: 'This technique needs an exact birth time.',
  errGeneric: 'Could not calculate. Check the details.',
  edit: 'Edit',
};

export const STRINGS: Record<Lang, Dict> = { he, en };
export type Strings = Dict;

/** מחרוזת סיכום לשיתוף/העתקה */
export function summaryText(p: Profile, lang: Lang): string {
  if (lang === 'he') {
    return `${p.name} — מזל ${p.western.name.he}, מזל עברי ${p.hebrew.sign.name.he}, מזל סיני ${p.chinese.animal.name.he}, מסלול חיים ${p.lifePath}, עץ ${p.celtic.name.he}.`;
  }
  return `${p.name} — ${p.western.name.en}, Hebrew sign ${p.hebrew.sign.name.en}, Chinese ${p.chinese.animal.name.en}, life path ${p.lifePath}, ${p.celtic.name.en} tree.`;
}
