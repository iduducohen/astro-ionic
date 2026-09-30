/**
 * techniques.ts — שבע שיטות הניתוח. כל פונקציה מחזירה Report שכבר מתורגם לשפה המבוקשת,
 * כך שגם האתר וגם האפליקציה מציגים אותו אותו דבר (render.ts).
 */
import { ZODIAC, ELEMENTS, type L, type Lang } from './astro';
import {
  ASPECTS, PLANET_IDS, TRADITIONAL, TRAD_RULER, buildChart, bodyLongitude, bodySpeed, crossAspects, delta, dignity,
  natalAspects, norm, refineExact, signOf, solarReturn, houseOf,
  type Aspect, type AspectId, type Chart, type PlanetId, type PointId, Astro,
} from './chart';
import { placeById, utcToZoned, zonedToUtc } from './places';
import {
  ASPECT_INFO, DIGNITY_NAME, ELEMENT_TEXT, HOUSE_DOMAIN, HOUSE_MUNDANE, MODALITY, MODALITY_OF, POINTS, SIGN_QUALITY, SIGN_STYLE,
} from './texts';

/* ---------------- מודל הדוח ---------------- */

export type Tone = 'good' | 'hard' | 'neutral';
export interface Item { label: string; value: string; sub?: string; text?: string; tone?: Tone; tag?: string }
export interface Section { title: string; intro?: string; items: Item[] }
export interface Report {
  title: string;
  subtitle?: string;
  wheel?: { inner: Chart; outer?: Chart; caption?: string };
  verdict?: { label: string; text: string; tone: Tone; score?: number };
  sections: Section[];
  notes: string[];
}

/* ---------------- נתוני לידה ---------------- */

export interface BirthData {
  name: string;
  date: string;        // YYYY-MM-DD
  time?: string;       // HH:MM
  timeKnown: boolean;
  placeId?: string;    // מתוך PLACES, או:
  lat?: number;
  lon?: number;
  tz?: string;
  placeLabel?: string; // שם המקום כשנבחר מחיפוש מקוון
}

export interface ResolvedPlace { lat: number; lon: number; tz: string; label: string }

export function resolvePlace(b: { placeId?: string; lat?: number; lon?: number; tz?: string; placeLabel?: string }, lang: Lang): ResolvedPlace {
  const p = b.placeId ? placeById(b.placeId) : undefined;
  if (p) return { lat: p.lat, lon: p.lon, tz: p.tz, label: p.name[lang] };
  if (b.lat === undefined || b.lon === undefined || Number.isNaN(b.lat) || Number.isNaN(b.lon)) throw new Error('no-place');
  const label = b.placeLabel || `${Math.abs(b.lat).toFixed(2)}°${b.lat >= 0 ? 'N' : 'S'} ${Math.abs(b.lon).toFixed(2)}°${b.lon >= 0 ? 'E' : 'W'}`;
  return { lat: b.lat, lon: b.lon, tz: b.tz || 'UTC', label };
}

export function birthMoment(b: BirthData, place: ResolvedPlace): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(b.date);
  if (!m) throw new Error('bad-date');
  const [hh, mm] = b.timeKnown && b.time && /^\d{1,2}:\d{2}$/.test(b.time) ? b.time.split(':').map(Number) : [12, 0];
  return zonedToUtc(+m[1], +m[2], +m[3], hh, mm, place.tz, place.lon);
}

export function chartFor(b: BirthData, lang: Lang): { chart: Chart; place: ResolvedPlace } {
  const place = resolvePlace(b, lang);
  const date = birthMoment(b, place);
  return { chart: buildChart({ date, lat: place.lat, lon: place.lon, timeKnown: b.timeKnown }), place };
}

/* ---------------- מחרוזות ---------------- */

const T = {
  natalTitle: { he: 'מפת הלידה של {n}', en: 'Birth chart: {n}' },
  bigThree: { he: 'השלישייה הגדולה', en: 'The big three' },
  planets: { he: 'הכוכבים במפה', en: 'Planets in the chart' },
  keyAspects: { he: 'היבטים מרכזיים', en: 'Key aspects' },
  balance: { he: 'איזון יסודות ואיכויות', en: 'Elements and modalities' },
  highlights: { he: 'דגשים', en: 'Highlights' },
  house: { he: 'בית {h}', en: 'House {h}' },
  retroTag: { he: 'בנסיגה', en: 'retrograde' },
  sunText: { he: 'הליבה שלך. ', en: 'Your core. ' },
  moonText: { he: 'הצרכים הרגשיים שלך מתבטאים {s}.', en: 'Your emotional needs are expressed {s}.' },
  ascText: { he: 'כך אחרים פוגשים אותך בפעם הראשונה: {s}.', en: 'How others meet you first: {s}.' },
  planetSentence: { he: 'תחום {t} מתבטא {s}', en: 'Your {t} are expressed {s}' },
  inHouse: { he: ', בעיקר סביב {d}', en: ', especially around {d}' },
  aspectSentence: { he: '{a} ({ka}) ו{b} ({kb}) {n}.', en: '{a} ({ka}) and {b} ({kb}) {n}.' },
  dominantEl: { he: 'יסוד דומיננטי', en: 'Dominant element' },
  missingEl: { he: 'יסוד חלש: {e}. זה תחום שדורש מאמץ מודע.', en: 'Weak element: {e}. An area that takes conscious effort.' },
  dominantMod: { he: 'איכות דומיננטית', en: 'Dominant modality' },
  chartRuler: { he: 'שליט המפה', en: 'Chart ruler' },
  chartRulerText: { he: '{p}, שולט המזל העולה, נמצא ב{s}{h}. זה ה"נהג" של המפה כולה.', en: '{p}, ruler of your rising sign, sits in {s}{h}. It steers the whole chart.' },
  stellium: { he: 'ריכוז כוכבים', en: 'Stellium' },
  stelliumText: { he: '{c} כוכבים ב{s}: אנרגיה מרוכזת מאוד בנושאי המזל הזה.', en: '{c} planets in {s}: a strong concentration of this sign’s themes.' },
  strong: { he: 'כוכבים בעוצמה', en: 'Planets in strength' },
  weak: { he: 'כוכבים באתגר', en: 'Challenged planets' },
  noTime: { he: 'ללא שעת לידה: אין אופק עולה ובתים, ומיקום הירח משוער (עד ±7°).', en: 'No birth time: no rising sign or houses, and the Moon’s position is approximate (up to ±7°).' },
  placidusNote: { he: 'שיטת בתים: פלסידוס. ראש דרקון ממוצע.', en: 'House system: Placidus. Mean lunar node.' },
  equalNote: { he: 'שיטת בתים: בתים שווים (פלסידוס לא מוגדר ברוחב הזה).', en: 'House system: Equal (Placidus is undefined at this latitude).' },
  // קרמתי
  karmicTitle: { he: 'מפה קרמתית של {n}', en: 'Karmic chart: {n}' },
  nodesAxis: { he: 'ציר הגורל', en: 'The nodal axis' },
  northText: { he: 'כיוון הצמיחה שלך בגלגול הזה: {q}{h}. זה מרגיש לא טבעי בהתחלה — ודווקא שם מחכה ההגשמה.', en: 'Your direction of growth in this life: {q}{h}. It feels unnatural at first — and that is exactly where fulfillment waits.' },
  southText: { he: 'מה שמוכר וקל לך מהעבר: {q}{h}. כישרון אמיתי, אבל גם אזור נוחות שקל להיתקע בו.', en: 'What feels familiar from the past: {q}{h}. A real gift, but also a comfort zone that is easy to get stuck in.' },
  inArea: { he: ', בתחום {d}', en: ', in the area of {d}' },
  retroSection: { he: 'כוכבים בנסיגה בלידה', en: 'Planets retrograde at birth' },
  noRetro: { he: 'אין כוכבים בנסיגה', en: 'No retrograde planets' },
  noRetroText: { he: 'השיעורים שלך פונים בעיקר החוצה, אל העולם, ולא אל עיבוד פנימי של העבר.', en: 'Your lessons face mostly outward, toward the world, rather than inward processing of the past.' },
  lessons: { he: 'שיעורים ונקודות גורל', en: 'Lessons and lots' },
  saturnLesson: { he: 'השיעור המרכזי', en: 'The main lesson' },
  saturnText: { he: 'שבתאי ב{s}: הבגרות שלך נבנית דרך {q}{h}. מה שקשה כאן בצעירותך הופך לעמוד תווך בהמשך.', en: 'Saturn in {s}: your maturity is built through {q}{h}. What is hard here when young becomes a pillar later.' },
  onNode: { he: '{p} על ציר הגורל', en: '{p} on the nodal axis' },
  onNodeText: { he: '{p} צמוד ל{n}: תחום {t} קשור ישירות לייעוד שלך.', en: '{p} conjunct the {n}: your {t} is tied directly to your purpose.' },
  fortuneText: { he: 'השפע והקלות זורמים אליך דרך {q}{h}.', en: 'Abundance and ease come to you through {q}{h}.' },
  spiritText: { he: 'הכוונה והבחירה המודעת שלך מתבטאות דרך {q}{h}.', en: 'Your intention and conscious choice express through {q}{h}.' },
  plutoText: { he: 'פלוטו ב{h}: כאן עוברת הטרנספורמציה העמוקה ביותר שלך בחיים האלה.', en: 'Pluto in {h}: this is where your deepest transformation happens in this life.' },
  karmicNote: { he: 'אסטרולוגיה קרמתית היא מסגרת רוחנית-סמלית, לא טענה עובדתית על גלגולים.', en: 'Karmic astrology is a symbolic, spiritual framework, not a factual claim about past lives.' },
  // תחזית
  forecastTitle: { he: 'תחזית עבור {n}', en: 'Forecast: {n}' },
  nowTransits: { he: 'טרנזיטים פעילים עכשיו', en: 'Active transits now' },
  noActive: { he: 'אין טרנזיט איטי מדויק כרגע', en: 'No exact slow transit right now' },
  noActiveText: { he: 'תקופה שקטה יחסית מבחינת הכוכבים האיטיים.', en: 'A relatively quiet period for the slow planets.' },
  transitSentence: { he: '{t} בתחום {n}. {x}.', en: '{t} in the area of {n}. {x}.' },
  applying: { he: 'מתקרב', en: 'applying' },
  separating: { he: 'מתרחק', en: 'separating' },
  upcoming: { he: '12 החודשים הקרובים', en: 'The next 12 months' },
  pass: { he: 'מעבר {i} מתוך {n}', en: 'pass {i} of {n}' },
  upcomingIntro: { he: 'מעברים מדויקים של הכוכבים האיטיים על הנקודות האישיות במפה. מעבר בנסיגה יכול לחזור כמה פעמים.', en: 'Exact hits of the slow planets on the personal points in your chart. A retrograde pass can repeat several times.' },
  returnOf: { he: 'חזרת {p}', en: '{p} return' },
  saturnReturn: { he: 'רגע של סיכום ובגרות: מה שנבנה בשלושים השנים האחרונות נבחן, ומה שלא מחזיק — משתנה.', en: 'A moment of reckoning and maturity: what was built over the past ~30 years is tested, and what does not hold changes.' },
  jupiterReturn: { he: 'תחילת מחזור צמיחה חדש של 12 שנה. זמן טוב להתחיל, ללמוד ולהתרחב.', en: 'The start of a new 12-year growth cycle. A good time to begin, learn and expand.' },
  solarReturn: { he: 'חזרה סולארית {y}', en: 'Solar return {y}' },
  srIntro: { he: 'מפת הרגע שבו השמש חוזרת למיקומה בלידה. מתארת את אופי השנה עד יום ההולדת הבא.', en: 'The chart of the moment the Sun returns to its birth position. It describes the year until your next birthday.' },
  srMoment: { he: 'רגע החזרה', en: 'Return moment' },
  srAsc: { he: 'אופי השנה', en: 'Tone of the year' },
  srAscText: { he: 'מזל עולה {s}: השנה ניגשים לדברים {st}.', en: 'Rising {s}: this year you approach things {st}.' },
  srSun: { he: 'נושא השנה', en: 'Focus of the year' },
  srSunText: { he: 'השמש בבית {h}: המוקד השנה הוא {d}.', en: 'Sun in house {h}: the focus this year is {d}.' },
  srMoon: { he: 'הרגש של השנה', en: 'Emotional tone' },
  srMoonText: { he: 'ירח ב{s}{h}: הצרכים הרגשיים השנה מתבטאים {st}.', en: 'Moon in {s}{h}: this year your emotional needs are expressed {st}.' },
  srAngular: { he: 'כוכבים בולטים בשנה', en: 'Prominent planets this year' },
  srAngularText: { he: '{p} על ציר בית {h}: תחום {t} בולט במיוחד, סביב {d}.', en: '{p} angular in house {h}: your {t} stand out, around {d}.' },
  progressions: { he: 'קידומים משניים', en: 'Secondary progressions' },
  progIntro: { he: 'יום אחד אחרי הלידה = שנה אחת בחיים. מתאר את ההתפתחות הפנימית האיטית.', en: 'One day after birth = one year of life. Describes slow inner development.' },
  progSun: { he: 'השמש המקודמת', en: 'Progressed Sun' },
  progSunText: { he: 'הזהות שלך מתפתחת עכשיו לכיוון {q}.', en: 'Your identity is now developing toward {q}.' },
  progSunChange: { he: ' בעוד כשנתיים השמש המקודמת עוברת ל{s} — שינוי זהות משמעותי.', en: ' In about two years the progressed Sun moves into {s} — a significant shift of identity.' },
  progMoon: { he: 'הירח המקודם', en: 'Progressed Moon' },
  progMoonText: { he: 'לשנתיים וחצי הקרובות בערך, הצרכים הרגשיים שלך מתבטאים {st}{h}.', en: 'For roughly the next two and a half years, your emotional needs are expressed {st}{h}.' },
  // סינסטרי
  synTitle: { he: 'התאמה אסטרולוגית: {a} ו{b}', en: 'Synastry: {a} & {b}' },
  synAspects: { he: 'המגעים החזקים בין המפות', en: 'The strongest contacts between the charts' },
  overlays: { he: 'הכוכבים שלכם בבתים של השני', en: 'Your planets in each other’s houses' },
  overlayText: { he: '{p} של {a} נופל בבית {h} של {b}: {a} מעורר/ת אצל {b} את תחום {d}.', en: "{a}'s {p} falls in {b}'s house {h}: {a} activates {b}'s {d}." },
  composite: { he: 'מפת הקומפוזיט — הקשר כישות', en: 'Composite chart — the relationship itself' },
  compositeIntro: { he: 'נקודות האמצע בין שתי המפות. מתארת את האופי של הקשר עצמו.', en: 'The midpoints between both charts. Describes the character of the relationship itself.' },
  compSun: { he: 'זהות הקשר', en: 'Identity of the bond' },
  compMoon: { he: 'הרגש המשותף', en: 'Shared feelings' },
  compVenus: { he: 'האהבה בקשר', en: 'Love in the bond' },
  compStyle: { he: '{s}: {st}.', en: '{s}: {st}.' },
  synVerdict: [
    { he: 'חיבור עמוק וזורם. המפות מדברות באותה שפה.', en: 'A deep, flowing connection. The charts speak the same language.' },
    { he: 'בסיס חזק עם מספיק חיכוך כדי לצמוח ביחד.', en: 'A strong base with enough friction to grow together.' },
    { he: 'קשר מאתגר שמלמד הרבה. דורש תקשורת ומודעות.', en: 'A challenging bond that teaches a lot. It takes communication and awareness.' },
    { he: 'הרבה מתח בין המפות. אפשרי — אבל לא מובן מאליו.', en: 'A lot of tension between the charts. Possible — but not a given.' },
  ],
  harmonyScore: { he: 'מדד הרמוניה', en: 'Harmony index' },
  // הוררי
  horaryTitle: { he: 'שאלה הוררית', en: 'Horary question' },
  askedAt: { he: 'נשאלה ב־{t}, {p}', en: 'Asked {t}, {p}' },
  radicality: { he: 'תקפות המפה', en: 'Chart validity' },
  tooEarly: { he: 'המזל העולה במעלות הראשונות ({d}°): מוקדם מדי לשאול, או שהמצב עוד לא התגבש.', en: 'Rising sign in its first degrees ({d}°): too early to ask, or the situation has not formed yet.' },
  tooLate: { he: 'המזל העולה במעלות האחרונות ({d}°): העניין כנראה כבר הוכרע, או שמאוחר לשנות אותו.', en: 'Rising sign in its last degrees ({d}°): the matter is probably already decided or too late to change.' },
  radicalOk: { he: 'המפה תקפה לשיפוט.', en: 'The chart is fit to judge.' },
  significators: { he: 'המייצגים', en: 'Significators' },
  querent: { he: 'השואל/ת', en: 'The querent' },
  quesited: { he: 'הנשאל', en: 'The matter asked' },
  sigText: { he: '{p} (שליט בית {h}) ב{s}, בית {ph}.', en: '{p} (ruler of house {h}) in {s}, house {ph}.' },
  sameSig: { he: 'אותו כוכב מייצג את שני הצדדים — התשובה נקבעת לפי הירח.', en: 'The same planet represents both sides — the Moon decides the answer.' },
  perfection: { he: 'השלמה', en: 'Perfection' },
  perfects: { he: '{a} ו{b} מגיעים ל{x} מדויק בעוד כ־{d} ימים.', en: '{a} and {b} form an exact {x} in about {d} days.' },
  noPerfect: { he: 'המייצגים לא מגיעים להיבט ביניהם לפני שאחד מהם מחליף מזל.', en: 'The significators do not reach an aspect before one of them changes sign.' },
  moonState: { he: 'מצב הירח', en: 'The Moon' },
  voc: { he: 'הירח "ריק ממהלך": לא יוצר היבט לפני שהוא עוזב את המזל. במסורת: "לא ייצא מזה כלום", או שהעניין לא יתפתח.', en: 'The Moon is void of course: it makes no aspect before leaving its sign. Traditionally: "nothing will come of it."' },
  vocException: { he: ' (בשור, סרטן, קשת ודגים המסורת מקלה בכך.)', en: ' (Tradition softens this in Taurus, Cancer, Sagittarius and Pisces.)' },
  moonNext: { he: 'ההיבט הבא של הירח: {x} ל{p} בעוד כ־{d} שעות.', en: "The Moon's next aspect: {x} {p} in about {d} hours." },
  translation: { he: 'הירח מעביר אור מ{a} ל{b}: העניין יכול להסתדר בעזרת גורם שלישי.', en: 'The Moon translates light from {a} to {b}: the matter can come together through a third party.' },
  lostNear: { he: 'שליט בית 2 בבית זוויתי ({h}): החפץ כנראה קרוב, ויימצא.', en: 'The ruler of house 2 is angular ({h}): the item is probably close by and will be found.' },
  lostHome: { he: 'שליט בית 2 בבית 4: כדאי לחפש בבית.', en: 'The ruler of house 2 is in house 4: look at home.' },
  lostFar: { he: 'שליט בית 2 בבית נופל ({h}): החפץ כנראה רחוק יותר או קשה להשגה.', en: 'The ruler of house 2 is cadent ({h}): the item is probably farther away or hard to reach.' },
  verdictYes: { he: 'כן, כנראה', en: 'Likely yes' },
  verdictYesHard: { he: 'כן, אבל במאמץ', en: 'Yes, with effort' },
  verdictMaybe: { he: 'אפשרי, בעקיפין', en: 'Possible, indirectly' },
  verdictNo: { he: 'כנראה שלא', en: 'Likely not' },
  verdictNothing: { he: 'העניין לא יתפתח', en: 'Nothing much will come of it' },
  verdictYesText: { he: 'המייצגים נפגשים בהיבט הרמוני. התשובה נוטה לחיוב.', en: 'The significators meet in a harmonious aspect. The answer leans yes.' },
  verdictYesHardText: { he: 'המייצגים נפגשים — אבל בהיבט מתוח. זה יקרה, אולי לא בדרך הפשוטה.', en: 'The significators meet — but in a tense aspect. It can happen, maybe not the easy way.' },
  verdictOppText: { he: 'המייצגים נפגשים באופוזיציה: העניין יכול להתממש, אבל עם חרטה או מחיר.', en: 'The significators meet in opposition: it can happen, but with regret or a cost.' },
  verdictMaybeText: { he: 'אין מפגש ישיר בין המייצגים, אבל הירח מחבר ביניהם.', en: 'No direct meeting between the significators, but the Moon connects them.' },
  verdictNoText: { he: 'המייצגים לא נפגשים. בשלב הזה התשובה נוטה לשלילה.', en: 'The significators do not meet. For now the answer leans no.' },
  horaryNote: { he: 'אסטרולוגיה הוררית לפי כללים מסורתיים (ויליאם לילי), בגרסה פשוטה. לשאלה רצינית — לשאול פעם אחת בלבד, ולא לחזור עליה.', en: 'Horary astrology using simplified traditional rules (William Lilly). For a serious question, ask it once and do not repeat it.' },
  // אלקטיבי
  electionTitle: { he: 'בחירת מועד: {e}', en: 'Choosing a time: {e}' },
  electionIntro: { he: 'נבדקו {n} מועדים בין {a} ל־{b}. אלה הטובים ביותר:', en: 'Checked {n} candidate times between {a} and {b}. These are the best:' },
  bestTimes: { he: 'המועדים המומלצים', en: 'Recommended times' },
  avoid: { he: 'תקופות שכדאי להימנע מהן בטווח', en: 'Periods to avoid in this range' },
  rxPeriod: { he: '{p} בנסיגה', en: '{p} retrograde' },
  rxAvoid: { he: 'מסורתית פחות מומלץ ל{t}.', en: 'Traditionally less suited to: {t}.' },
  noAvoid: { he: 'אין נסיגות של כוכב חמה, נוגה או מאדים בטווח', en: 'No Mercury, Venus or Mars retrograde in range' },
  scoreLbl: { he: 'ציון {s}', en: 'Score {s}' },
  // עולמי
  mundaneTitle: { he: 'אסטרולוגיה עולמית: {c}', en: 'Mundane astrology: {c}' },
  nationalChart: { he: 'המפה הלאומית', en: 'The national chart' },
  nationalTransits: { he: 'טרנזיטים למפה הלאומית עכשיו', en: 'Transits to the national chart now' },
  nationalTransitText: { he: '{t} נוגע ב{n} — נושאי {m} בתחום {h}.', en: '{t} touches the {n} — themes of {m} in the area of {h}.' },
  skyOfYear: { he: 'השמיים ב־12 החודשים הקרובים', en: 'The sky over the next 12 months' },
  ingress: { he: '{p} נכנס ל{s}', en: '{p} enters {s}' },
  ingressText: { he: 'נושאי {m} מתנהלים {st} ברמה העולמית.', en: 'Worldwide, themes of {m} unfold {st}.' },
  outerAspect: { he: '{a} {x} {b}', en: '{a} {x} {b}' },
  outerAspectText: { he: 'מפגש של מחזורים ארוכים: {ma} ו{mb} {n}.', en: 'A meeting of long cycles: {ma} and {mb} {n}.' },
  solarEclipse: { he: 'ליקוי חמה ב{s}', en: 'Solar eclipse in {s}' },
  lunarEclipse: { he: 'ליקוי ירח ב{s}', en: 'Lunar eclipse in {s}' },
  eclipseText: { he: 'ליקויים מסמנים נקודות מפנה בנושאי {q}.', en: 'Eclipses mark turning points around {q}.' },
  eclipseHits: { he: ' הליקוי נופל על {p} של המפה הלאומית — משמעותי במיוחד.', en: ' It falls on the national chart’s {p} — especially significant.' },
  mundaneNote: { he: 'שעות הקמה של מדינות שנויות במחלוקת; כאן נעשה שימוש בשעה המקובלת. הפירושים הם נושאים כלליים ואינם תחזית פוליטית.', en: 'Founding times of nations are disputed; this uses a commonly cited time. The readings are general themes, not political predictions.' },
  capForecast: { he: 'טבעת פנימית: מפת הלידה. טבעת חיצונית: השמיים עכשיו.', en: 'Inner ring: birth chart. Outer ring: the sky now.' },
  capSyn: { he: 'טבעת פנימית: {a}. טבעת חיצונית: {b}.', en: 'Inner ring: {a}. Outer ring: {b}.' },
  capMundane: { he: 'טבעת פנימית: המפה הלאומית. טבעת חיצונית: השמיים עכשיו.', en: 'Inner ring: the national chart. Outer ring: the sky now.' },
  capElection: { he: 'המפה של המועד המומלץ הראשון.', en: 'Chart of the top recommended time.' },
  unknownPartner: { he: 'אין שעת לידה לאחד הצדדים: בלי בתים ואופק בחישוב.', en: 'Birth time missing for one side: no houses or ascendant in the calculation.' },
};

const t = (l: L, lang: Lang, vars: Record<string, string | number> = {}): string =>
  l[lang].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''));

const KEY: Partial<Record<PointId, L>> = {
  sun: { he: 'זהות', en: 'identity' }, moon: { he: 'רגש', en: 'feeling' }, mercury: { he: 'מחשבה', en: 'mind' },
  venus: { he: 'אהבה', en: 'love' }, mars: { he: 'פעולה', en: 'drive' }, jupiter: { he: 'צמיחה', en: 'growth' },
  saturn: { he: 'אחריות', en: 'duty' }, uranus: { he: 'חופש', en: 'freedom' }, neptune: { he: 'דמיון', en: 'dreams' },
  pluto: { he: 'עוצמה', en: 'power' }, node: { he: 'ייעוד', en: 'purpose' }, asc: { he: 'דימוי', en: 'persona' },
  mc: { he: 'קריירה', en: 'career' },
};

/* ---------------- עזרי פורמט ---------------- */

const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const pad = (n: number) => String(n).padStart(2, '0');

export function fmtDate(date: Date, tz: string, lon: number, lang: Lang, withTime = true): string {
  const z = utcToZoned(date, tz, lon);
  const d = lang === 'he' ? `${z.d}.${z.m}.${z.y}` : `${z.d} ${MONTHS_EN[z.m - 1]} ${z.y}`;
  return withTime ? `${d}, ${pad(z.h)}:${pad(z.min)}` : d;
}

export function fmtDeg(lon: number): string {
  const d = norm(lon) % 30;
  let deg = Math.floor(d), min = Math.round((d - deg) * 60);
  if (min === 60) { deg += 1; min = 0; }
  // בידוד LTR כדי שבעברית סימני המעלות לא יתהפכו
  return `\u2066${deg}°${pad(min)}′\u2069`;
}

const pname = (id: PointId, lang: Lang) => POINTS[id].name[lang];
const pos = (lon: number, lang: Lang) => `${signOf(lon).name[lang]} ${fmtDeg(lon)}`;
const houseStr = (h: number | undefined, lang: Lang) => (h ? t(T.house, lang, { h }) : '');

function planetText(p: { id: PointId; sign: { id: string }; house?: number }, lang: Lang): string {
  let s = t(T.planetSentence, lang, { t: POINTS[p.id].theme[lang], s: SIGN_STYLE[p.sign.id][lang] });
  if (p.house) s += t(T.inHouse, lang, { d: HOUSE_DOMAIN[p.house - 1][lang] });
  return s + '.';
}

function aspectText(a: Aspect, lang: Lang): string {
  return t(T.aspectSentence, lang, {
    a: pname(a.a, lang), ka: KEY[a.a]?.[lang] ?? '', b: pname(a.b, lang), kb: KEY[a.b]?.[lang] ?? '',
    n: ASPECT_INFO[a.type].nature[lang],
  });
}

function aspectTone(a: Aspect): Tone {
  if (a.type === 'conj') {
    const hard = ['saturn', 'mars', 'pluto'];
    return hard.includes(a.a) || hard.includes(a.b) ? 'hard' : 'good';
  }
  return ASPECTS.find((x) => x.id === a.type)!.harmony > 0 ? 'good' : 'hard';
}

const aspectLabel = (a: Aspect, lang: Lang) =>
  `${pname(a.a, lang)} ${ASPECT_INFO[a.type].name[lang]} ${lang === 'he' ? 'ל' : ''}${pname(a.b, lang)}`;

/* ---------------- 1. מפת לידה ---------------- */

export function natalReport(b: BirthData, lang: Lang): Report {
  const { chart: c, place } = chartFor(b, lang);
  const P = c.points;
  const sun = P.sun!, moon = P.moon!;
  const notes: string[] = [];
  const big: Item[] = [
    { label: pname('sun', lang), value: `${pos(sun.lon, lang)}${sun.house ? ', ' + houseStr(sun.house, lang) : ''}`,
      text: T.sunText[lang] + ZODIAC.find((z) => z.id === sun.sign.id)!.text[lang] },
    { label: pname('moon', lang), value: `${pos(moon.lon, lang)}${moon.house ? ', ' + houseStr(moon.house, lang) : ''}`,
      text: t(T.moonText, lang, { s: SIGN_STYLE[moon.sign.id][lang] }) },
  ];
  if (P.asc) big.push({ label: pname('asc', lang), value: pos(P.asc.lon, lang), text: t(T.ascText, lang, { s: SIGN_STYLE[P.asc.sign.id][lang] }) });

  const planets: Item[] = c.planets.filter((p) => p.id !== 'sun' && p.id !== 'moon').map((p) => {
    const dig = dignity(p.id as PlanetId, p.sign.id);
    const tags = [p.retro ? T.retroTag[lang] : '', dig ? DIGNITY_NAME[dig][lang] : ''].filter(Boolean).join(', ');
    return {
      label: `${POINTS[p.id].glyph} ${pname(p.id, lang)}`,
      value: `${pos(p.lon, lang)}${p.house ? ', ' + houseStr(p.house, lang) : ''}`,
      tag: tags || undefined,
      text: planetText(p, lang),
    };
  });
  if (P.mc) planets.push({ label: `MC ${pname('mc', lang)}`, value: pos(P.mc.lon, lang), text: planetText({ ...P.mc, house: undefined }, lang) });

  const aspects = natalAspects(c).filter((a) => a.a !== 'node' && a.b !== 'node').slice(0, 9).map((a) => ({
    label: `${POINTS[a.a].glyph} ${ASPECTS.find((x) => x.id === a.type)!.glyph} ${POINTS[a.b].glyph}`,
    value: aspectLabel(a, lang), sub: `orb ${a.orb.toFixed(1)}°`, text: aspectText(a, lang), tone: aspectTone(a),
  }));

  // איזון: שמש, ירח ואופק במשקל כפול
  const weights: [string, number][] = [
    ...c.planets.slice(0, 7).map((p): [string, number] => [p.sign.id, p.id === 'sun' || p.id === 'moon' ? 2 : 1]),
    ...(P.asc ? [[P.asc.sign.id, 2] as [string, number]] : []),
  ];
  const el: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
  const mo: Record<string, number> = { cardinal: 0, fixed: 0, mutable: 0 };
  for (const [sid, w] of weights) { el[ZODIAC.find((z) => z.id === sid)!.element] += w; mo[MODALITY_OF[sid]] += w; }
  const domEl = Object.entries(el).sort((a, b) => b[1] - a[1])[0][0];
  const weakEl = Object.entries(el).sort((a, b) => a[1] - b[1])[0];
  const domMo = Object.entries(mo).sort((a, b) => b[1] - a[1])[0][0];
  const elLine = Object.entries(el).map(([k, v]) => `${ELEMENTS[k as keyof typeof ELEMENTS][lang]} ${v}`).join(' · ');
  const balance: Item[] = [
    { label: T.dominantEl[lang], value: ELEMENTS[domEl as keyof typeof ELEMENTS][lang], sub: elLine, text: ELEMENT_TEXT[domEl][lang] },
    { label: T.dominantMod[lang], value: MODALITY[domMo].name[lang], text: MODALITY[domMo].text[lang] },
  ];
  if (weakEl[1] <= 1) balance[0].text += ' ' + t(T.missingEl, lang, { e: ELEMENTS[weakEl[0] as keyof typeof ELEMENTS][lang] });

  const hl: Item[] = [];
  if (P.asc) {
    const rid = TRAD_RULER[P.asc.sign.id], r = P[rid]!;
    hl.push({ label: T.chartRuler[lang], value: `${POINTS[rid].glyph} ${pname(rid, lang)}`,
      text: t(T.chartRulerText, lang, { p: pname(rid, lang), s: r.sign.name[lang], h: r.house ? `, ${houseStr(r.house, lang)}` : '' }) });
  }
  const bySign: Record<string, number> = {};
  c.planets.forEach((p) => { bySign[p.sign.id] = (bySign[p.sign.id] ?? 0) + 1; });
  for (const [sid, n] of Object.entries(bySign)) if (n >= 3) {
    hl.push({ label: T.stellium[lang], value: ZODIAC.find((z) => z.id === sid)!.name[lang], text: t(T.stelliumText, lang, { c: n, s: ZODIAC.find((z) => z.id === sid)!.name[lang] }) });
  }
  const strong = TRADITIONAL.filter((id) => ['domicile', 'exalted'].includes(dignity(id, P[id]!.sign.id) ?? ''));
  const weak = TRADITIONAL.filter((id) => ['detriment', 'fall'].includes(dignity(id, P[id]!.sign.id) ?? ''));
  if (strong.length) hl.push({ label: T.strong[lang], value: strong.map((id) => pname(id, lang)).join(', '), tone: 'good' });
  if (weak.length) hl.push({ label: T.weak[lang], value: weak.map((id) => pname(id, lang)).join(', '), tone: 'hard' });

  if (!c.timeKnown) notes.push(T.noTime[lang]);
  else notes.push(c.houseSystem === 'equal' ? T.equalNote[lang] : T.placidusNote[lang]);

  return {
    title: t(T.natalTitle, lang, { n: b.name }),
    subtitle: `${fmtDate(c.date, place.tz, place.lon, lang, c.timeKnown)} · ${place.label}`,
    wheel: { inner: c },
    sections: [
      { title: T.bigThree[lang], items: big },
      { title: T.planets[lang], items: planets },
      { title: T.keyAspects[lang], items: aspects },
      { title: T.balance[lang], items: balance },
      { title: T.highlights[lang], items: hl },
    ],
    notes,
  };
}

/* ---------------- 2. קרמתי ---------------- */

export function karmicReport(b: BirthData, lang: Lang): Report {
  const { chart: c, place } = chartFor(b, lang);
  const P = c.points;
  const area = (h?: number) => (h ? t(T.inArea, lang, { d: HOUSE_DOMAIN[h - 1][lang] }) : '');
  const nn = P.node!, sn = P.southNode!;
  const axis: Item[] = [
    { label: `☊ ${pname('node', lang)}`, value: `${pos(nn.lon, lang)}${nn.house ? ', ' + houseStr(nn.house, lang) : ''}`,
      text: t(T.northText, lang, { q: SIGN_QUALITY[nn.sign.id][lang], h: area(nn.house) }), tone: 'good' },
    { label: `☋ ${pname('southNode', lang)}`, value: `${pos(sn.lon, lang)}${sn.house ? ', ' + houseStr(sn.house, lang) : ''}`,
      text: t(T.southText, lang, { q: SIGN_QUALITY[sn.sign.id][lang], h: area(sn.house) }) },
  ];
  for (const p of c.planets) {
    for (const nid of ['node', 'southNode'] as const) {
      if (Math.abs(delta(p.lon, P[nid]!.lon)) <= 5) {
        axis.push({ label: t(T.onNode, lang, { p: pname(p.id, lang) }), value: pos(p.lon, lang),
          text: t(T.onNodeText, lang, { p: pname(p.id, lang), n: pname(nid, lang), t: POINTS[p.id].theme[lang] }) });
      }
    }
  }
  const retro = c.planets.filter((p) => p.retro && POINTS[p.id].retro);
  const retroItems: Item[] = retro.length
    ? retro.map((p) => ({ label: `${POINTS[p.id].glyph} ${pname(p.id, lang)}`, value: pos(p.lon, lang), tag: T.retroTag[lang], text: POINTS[p.id].retro![lang] }))
    : [{ label: T.noRetro[lang], value: '', text: T.noRetroText[lang] }];

  const sat = P.saturn!;
  const lessons: Item[] = [
    { label: T.saturnLesson[lang], value: `♄ ${pos(sat.lon, lang)}${sat.house ? ', ' + houseStr(sat.house, lang) : ''}`,
      text: t(T.saturnText, lang, { s: sat.sign.name[lang], q: SIGN_QUALITY[sat.sign.id][lang], h: area(sat.house) }) },
  ];
  if (P.fortune) lessons.push({ label: `⊗ ${pname('fortune', lang)}`, value: `${pos(P.fortune.lon, lang)}, ${houseStr(P.fortune.house, lang)}`,
    text: t(T.fortuneText, lang, { q: SIGN_QUALITY[P.fortune.sign.id][lang], h: area(P.fortune.house) }), tone: 'good' });
  if (P.spirit) lessons.push({ label: `⊕ ${pname('spirit', lang)}`, value: `${pos(P.spirit.lon, lang)}, ${houseStr(P.spirit.house, lang)}`,
    text: t(T.spiritText, lang, { q: SIGN_QUALITY[P.spirit.sign.id][lang], h: area(P.spirit.house) }) });
  if (P.pluto!.house) lessons.push({ label: `♇ ${pname('pluto', lang)}`, value: houseStr(P.pluto!.house, lang),
    text: t(T.plutoText, lang, { h: HOUSE_DOMAIN[P.pluto!.house - 1][lang] }) });

  const notes = [T.karmicNote[lang]];
  if (!c.timeKnown) notes.push(T.noTime[lang]);
  return {
    title: t(T.karmicTitle, lang, { n: b.name }),
    subtitle: `${fmtDate(c.date, place.tz, place.lon, lang, c.timeKnown)} · ${place.label}`,
    wheel: { inner: c },
    sections: [
      { title: T.nodesAxis[lang], items: axis },
      { title: T.retroSection[lang], items: retroItems },
      { title: T.lessons[lang], items: lessons },
    ],
    notes,
  };
}

/* ---------------- 3. תחזית: טרנזיטים, קידומים, חזרה סולארית ---------------- */

const SLOW: PlanetId[] = ['jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
const PERSONAL_TARGETS: PointId[] = ['sun', 'moon', 'mercury', 'venus', 'mars', 'asc', 'mc'];

export interface TransitHit { planet: PlanetId; target: PointId; type: AspectId; date: Date }

/** סריקה יומית של מעברים מדויקים (כולל חזרות צדק/שבתאי) */
export function scanTransits(natal: Chart, from: Date, days: number, planets = SLOW, targets = PERSONAL_TARGETS): TransitHit[] {
  const hits: TransitHit[] = [];
  const types: AspectId[] = ['conj', 'square', 'trine', 'opp'];
  for (const pl of planets) {
    const tgts: PointId[] = [...targets];
    if (pl === 'saturn' || pl === 'jupiter') tgts.push(pl);
    let prevT = from, prevLon = bodyLongitude(pl, from);
    for (let i = 1; i <= days; i++) {
      const tt = new Date(from.getTime() + i * 864e5), lon = bodyLongitude(pl, tt);
      for (const tg of tgts) {
        const np = natal.points[tg]; if (!np) continue;
        if (tg === pl) { // חזרה: רק צמידות
          const d0 = delta(np.lon, prevLon), d1 = delta(np.lon, lon);
          if (Math.sign(d0) !== Math.sign(d1) && Math.abs(d0) < 5) hits.push({ planet: pl, target: tg, type: 'conj', date: refineExact(pl, np.lon, 0, prevT, tt) });
          continue;
        }
        for (const ty of types) {
          const ang = ASPECTS.find((x) => x.id === ty)!.angle;
          const f0 = Math.abs(delta(prevLon, np.lon)) - ang, f1 = Math.abs(delta(lon, np.lon)) - ang;
          if (Math.sign(f0) !== Math.sign(f1) && Math.abs(f0) < 3) {
            hits.push({ planet: pl, target: tg, type: ty, date: refineExact(pl, np.lon, ang, prevT, tt) });
          }
        }
      }
      prevT = tt; prevLon = lon;
    }
  }
  return hits.sort((a, b) => a.date.getTime() - b.date.getTime());
}

function transitTone(pl: PlanetId, ty: AspectId): Tone {
  if (ty === 'trine' || ty === 'sext') return 'good';
  if (ty === 'conj') return pl === 'jupiter' ? 'good' : pl === 'neptune' || pl === 'uranus' ? 'neutral' : 'hard';
  return pl === 'jupiter' ? 'neutral' : 'hard';
}

export function forecastReport(b: BirthData, lang: Lang, now = new Date(), relocate?: { placeId?: string; lat?: number; lon?: number; tz?: string }): Report {
  const { chart: natal, place } = chartFor(b, lang);
  const sky = buildChart({ date: now, lat: place.lat, lon: place.lon, timeKnown: false });
  const targets = PERSONAL_TARGETS.filter((id) => natal.points[id]);

  // עכשיו: טרנזיטים איטיים בתוך 2°
  const active = crossAspects(sky, natal, SLOW, targets, 1).filter((a) => a.orb <= 2 && a.type !== 'sext');
  const nowItems: Item[] = active.length ? active.map((a) => {
    const sp = bodySpeed(a.a as PlanetId, now);
    const ang = ASPECTS.find((x) => x.id === a.type)!.angle;
    const next = Math.abs(delta(sky.points[a.a]!.lon + sp, natal.points[a.b]!.lon)) - ang;
    const applying = Math.abs(next) < a.orb;
    return {
      label: `${POINTS[a.a].glyph} ${ASPECTS.find((x) => x.id === a.type)!.glyph} ${POINTS[a.b].glyph}`,
      value: aspectLabel(a, lang), sub: `orb ${a.orb.toFixed(1)}°, ${(applying ? T.applying : T.separating)[lang]}`,
      text: t(T.transitSentence, lang, { t: POINTS[a.a].transit![lang], n: POINTS[a.b].theme[lang], x: ASPECT_INFO[a.type].short[lang] }),
      tone: transitTone(a.a as PlanetId, a.type),
    };
  }) : [{ label: T.noActive[lang], value: '', text: T.noActiveText[lang] }];

  // 12 חודשים קדימה
  const hits = scanTransits(natal, now, 365, SLOW, targets);
  const passCount: Record<string, number> = {}, passIdx: Record<string, number> = {};
  for (const h of hits) { const k = `${h.planet}-${h.target}-${h.type}`; passCount[k] = (passCount[k] ?? 0) + 1; }
  const upItems: Item[] = hits.slice(0, 16).map((h) => {
    const isReturn = h.planet === h.target;
    const k = `${h.planet}-${h.target}-${h.type}`; passIdx[k] = (passIdx[k] ?? 0) + 1;
    return {
      tag: passCount[k] > 1 ? t(T.pass, lang, { i: passIdx[k], n: passCount[k] }) : undefined,
      label: fmtDate(h.date, place.tz, place.lon, lang, false),
      value: isReturn ? t(T.returnOf, lang, { p: pname(h.planet, lang) })
        : `${pname(h.planet, lang)} ${ASPECT_INFO[h.type].name[lang]} ${lang === 'he' ? 'ל' : ''}${pname(h.target, lang)}`,
      text: isReturn ? (h.planet === 'saturn' ? T.saturnReturn : T.jupiterReturn)[lang]
        : t(T.transitSentence, lang, { t: POINTS[h.planet].transit![lang], n: POINTS[h.target].theme[lang], x: ASPECT_INFO[h.type].short[lang] }),
      tone: isReturn ? (h.planet === 'jupiter' ? 'good' : 'hard') : transitTone(h.planet, h.type),
    };
  });

  // חזרה סולארית: יום ההולדת הקרוב שכבר עבר (השנה הנוכחית של המשתמש)
  const birthMonthDay = b.date.slice(5);
  const thisYear = utcToZoned(now, place.tz, place.lon).y;
  const bdayThisYear = new Date(`${thisYear}-${birthMonthDay}T12:00:00Z`);
  const srYear = bdayThisYear.getTime() <= now.getTime() + 2 * 864e5 ? thisYear : thisYear - 1;
  const srDate = solarReturn(natal.points.sun!.lon, new Date(`${srYear}-${birthMonthDay}T12:00:00Z`));
  const srPlace = relocate && (relocate.placeId || relocate.lat !== undefined) ? resolvePlace(relocate, lang) : place;
  const sr = buildChart({ date: srDate, lat: srPlace.lat, lon: srPlace.lon, timeKnown: true });
  const srItems: Item[] = [
    { label: T.srMoment[lang], value: `${fmtDate(srDate, srPlace.tz, srPlace.lon, lang)} · ${srPlace.label}` },
    { label: T.srAsc[lang], value: pos(sr.points.asc!.lon, lang), text: t(T.srAscText, lang, { s: sr.points.asc!.sign.name[lang], st: SIGN_STYLE[sr.points.asc!.sign.id][lang] }) },
    { label: T.srSun[lang], value: houseStr(sr.points.sun!.house, lang), text: t(T.srSunText, lang, { h: sr.points.sun!.house!, d: HOUSE_DOMAIN[sr.points.sun!.house! - 1][lang] }) },
    { label: T.srMoon[lang], value: `${pos(sr.points.moon!.lon, lang)}, ${houseStr(sr.points.moon!.house, lang)}`,
      text: t(T.srMoonText, lang, { s: sr.points.moon!.sign.name[lang], h: `, ${houseStr(sr.points.moon!.house, lang)}`, st: SIGN_STYLE[sr.points.moon!.sign.id][lang] }) },
  ];
  for (const p of sr.planets) {
    if (p.id === 'sun' || p.id === 'moon' || !p.house || ![1, 4, 7, 10].includes(p.house)) continue;
    // רק אם הכוכב קרוב לקודקוד (±8°)
    if (Math.abs(delta(sr.cusps![p.house - 1], p.lon)) > 8) continue;
    srItems.push({ label: T.srAngular[lang], value: `${POINTS[p.id].glyph} ${pname(p.id, lang)}, ${houseStr(p.house, lang)}`,
      text: t(T.srAngularText, lang, { p: pname(p.id, lang), h: p.house, t: POINTS[p.id].theme[lang], d: HOUSE_DOMAIN[p.house - 1][lang] }) });
  }

  // קידומים משניים: יום אחרי הלידה לכל שנה
  const ageYears = (now.getTime() - natal.date.getTime()) / (365.2422 * 864e5);
  const progDate = new Date(natal.date.getTime() + ageYears * 864e5);
  const pSun = bodyLongitude('sun', progDate), pMoon = bodyLongitude('moon', progDate);
  const pSunIn2 = bodyLongitude('sun', new Date(progDate.getTime() + 2 * 864e5));
  const pMoonHouse = natal.cusps ? houseOf(pMoon, natal.cusps) : undefined;
  const progItems: Item[] = [
    { label: T.progSun[lang], value: pos(pSun, lang),
      text: t(T.progSunText, lang, { q: SIGN_QUALITY[signOf(pSun).id][lang] })
        + (signOf(pSunIn2).id !== signOf(pSun).id ? t(T.progSunChange, lang, { s: signOf(pSunIn2).name[lang] }) : '') },
    { label: T.progMoon[lang], value: `${pos(pMoon, lang)}${pMoonHouse ? ', ' + houseStr(pMoonHouse, lang) : ''}`,
      text: t(T.progMoonText, lang, { st: SIGN_STYLE[signOf(pMoon).id][lang], h: pMoonHouse ? t(T.inHouse, lang, { d: HOUSE_DOMAIN[pMoonHouse - 1][lang] }) : '' }) },
  ];

  const notes = natal.timeKnown ? [] : [T.noTime[lang]];
  return {
    title: t(T.forecastTitle, lang, { n: b.name }),
    subtitle: fmtDate(now, place.tz, place.lon, lang),
    wheel: { inner: natal, outer: sky, caption: T.capForecast[lang] },
    sections: [
      { title: T.nowTransits[lang], items: nowItems },
      { title: T.upcoming[lang], intro: T.upcomingIntro[lang], items: upItems },
      { title: t(T.solarReturn, lang, { y: srYear }), intro: T.srIntro[lang], items: srItems },
      { title: T.progressions[lang], intro: T.progIntro[lang], items: progItems },
    ],
    notes,
  };
}

/* ---------------- 4. סינסטרי וקומפוזיט ---------------- */

const PAIR_WEIGHT: Record<string, number> = {
  'sun-moon': 3, 'moon-sun': 3, 'venus-mars': 3, 'mars-venus': 3, 'sun-sun': 1.5, 'moon-moon': 2,
  'venus-venus': 1.5, 'sun-venus': 2, 'venus-sun': 2, 'moon-venus': 2, 'venus-moon': 2, 'asc-sun': 2, 'sun-asc': 2,
  'asc-moon': 2, 'moon-asc': 2, 'saturn-sun': 2, 'sun-saturn': 2, 'saturn-moon': 2, 'moon-saturn': 2,
  'saturn-venus': 2, 'venus-saturn': 2, 'mercury-mercury': 1.5, 'mars-mars': 1,
};

export function synastryReport(a: BirthData, bb: BirthData, lang: Lang): Report {
  const A = chartFor(a, lang).chart, B = chartFor(bb, lang).chart;
  const ids: PointId[] = [...PLANET_IDS.slice(0, 7), 'asc'];
  const asp = crossAspects(A, B, ids, ids, 0.8).filter((x) => !(x.a === 'asc' && x.b === 'asc'));
  let score = 0, max = 0;
  const ranked = asp.map((x) => {
    const w = PAIR_WEIGHT[`${x.a}-${x.b}`] ?? 1;
    const tone = aspectTone(x);
    const val = tone === 'good' ? 1 : tone === 'hard' ? -0.6 : 0.2;
    const tight = 1 - x.orb / 8;
    score += val * w * tight; max += w * tight;
    return { x, w, tone, rank: w * tight };
  }).sort((p, q) => q.rank - p.rank);
  const harmony = max ? Math.round(50 + 50 * (score / max)) : 50;
  const tier = harmony >= 75 ? 0 : harmony >= 60 ? 1 : harmony >= 45 ? 2 : 3;

  const items: Item[] = ranked.slice(0, 10).map(({ x, tone }) => ({
    label: `${POINTS[x.a].glyph} ${ASPECTS.find((q) => q.id === x.type)!.glyph} ${POINTS[x.b].glyph}`,
    value: `${pname(x.a, lang)} (${a.name}) ${ASPECT_INFO[x.type].name[lang]} ${lang === 'he' ? 'ל' : ''}${pname(x.b, lang)} (${bb.name})`,
    sub: `orb ${x.orb.toFixed(1)}°`,
    text: t(T.aspectSentence, lang, { a: pname(x.a, lang), ka: KEY[x.a]?.[lang] ?? '', b: pname(x.b, lang), kb: KEY[x.b]?.[lang] ?? '', n: ASPECT_INFO[x.type].nature[lang] }),
    tone,
  }));

  const overlays: Item[] = [];
  const over = (X: Chart, Y: Chart, nx: string, ny: string) => {
    if (!Y.cusps) return;
    for (const id of ['sun', 'moon', 'venus', 'mars'] as PlanetId[]) {
      const h = houseOf(X.points[id]!.lon, Y.cusps);
      overlays.push({ label: `${POINTS[id].glyph} ${pname(id, lang)} (${nx})`, value: `${houseStr(h, lang)} (${ny})`,
        text: t(T.overlayText, lang, { p: pname(id, lang), a: nx, b: ny, h, d: HOUSE_DOMAIN[h - 1][lang] }) });
    }
  };
  over(A, B, a.name, bb.name); over(B, A, bb.name, a.name);

  // קומפוזיט: נקודות אמצע בקשת הקצרה
  const mid = (x: number, y: number) => norm(x + delta(x, y) / 2);
  const comp = (id: PlanetId) => mid(A.points[id]!.lon, B.points[id]!.lon);
  const compItems: Item[] = ([['sun', T.compSun], ['moon', T.compMoon], ['venus', T.compVenus]] as [PlanetId, L][]).map(([id, lbl]) => {
    const lon = comp(id), s = signOf(lon);
    return { label: lbl[lang], value: `${POINTS[id].glyph} ${pos(lon, lang)}`, text: t(T.compStyle, lang, { s: s.name[lang], st: SIGN_STYLE[s.id][lang] }) };
  });
  if (A.points.asc && B.points.asc) {
    const lon = mid(A.points.asc.lon, B.points.asc.lon), s = signOf(lon);
    compItems.push({ label: pname('asc', lang), value: pos(lon, lang), text: t(T.compStyle, lang, { s: s.name[lang], st: SIGN_STYLE[s.id][lang] }) });
  }

  const notes = A.timeKnown && B.timeKnown ? [] : [T.unknownPartner[lang]];
  return {
    title: t(T.synTitle, lang, { a: a.name, b: bb.name }),
    wheel: { inner: A, outer: B, caption: t(T.capSyn, lang, { a: a.name, b: bb.name }) },
    verdict: { label: T.harmonyScore[lang], score: harmony, text: T.synVerdict[tier][lang], tone: tier <= 1 ? 'good' : tier === 2 ? 'neutral' : 'hard' },
    sections: [
      { title: T.synAspects[lang], items },
      ...(overlays.length ? [{ title: T.overlays[lang], items: overlays }] : []),
      { title: T.composite[lang], intro: T.compositeIntro[lang], items: compItems },
    ],
    notes,
  };
}

/* ---------------- 5. הוררי ---------------- */

export type HoraryCategory = 'general' | 'lost' | 'money' | 'love' | 'job' | 'business' | 'home' | 'travel' | 'contract' | 'study';
export const HORARY_HOUSE: Record<HoraryCategory, number> = {
  general: 7, lost: 2, money: 2, love: 7, job: 10, business: 10, home: 4, travel: 9, contract: 7, study: 9,
};
export const HORARY_LABEL: Record<HoraryCategory, L> = {
  general: { he: 'שאלה כללית (כן/לא)', en: 'General (yes/no)' },
  lost: { he: 'חפץ שאבד', en: 'Lost item' },
  money: { he: 'כסף והכנסה', en: 'Money and income' },
  love: { he: 'אהבה וזוגיות', en: 'Love and relationship' },
  job: { he: 'עבודה וקריירה', en: 'Job and career' },
  business: { he: 'הצלחת עסק', en: 'Business success' },
  home: { he: 'בית ונדל״ן', en: 'Home and property' },
  travel: { he: 'נסיעה', en: 'Travel' },
  contract: { he: 'חוזה או הסכם', en: 'Contract or agreement' },
  study: { he: 'לימודים ומבחנים', en: 'Study and exams' },
};

interface Perfection { type: AspectId; date: Date; days: number; beforeSignChange: boolean }

/** ההיבט המדויק הבא בין שני כוכבים, סריקה בצעדים וזיקוק בחיפוש בינארי */
export function nextPerfection(a: PlanetId, b: PlanetId, from: Date, maxDays: number, types: AspectId[] = ['conj', 'sext', 'square', 'trine', 'opp']): Perfection | null {
  const fast = ['moon', 'sun', 'mercury', 'venus', 'mars'];
  const step = a === 'moon' || b === 'moon' ? 1 / 24 : fast.includes(a) || fast.includes(b) ? 0.25 : 1;
  const sa0 = signOf(bodyLongitude(a, from)).id, sb0 = signOf(bodyLongitude(b, from)).id;
  const sepAt = (tt: Date) => Math.abs(delta(bodyLongitude(a, tt), bodyLongitude(b, tt)));
  let prev = from, prevSep = sepAt(from);
  for (let d = step; d <= maxDays; d += step) {
    const tt = new Date(from.getTime() + d * 864e5), sep = sepAt(tt);
    for (const ty of types) {
      const ang = ASPECTS.find((x) => x.id === ty)!.angle;
      const f0 = prevSep - ang, f1 = sep - ang;
      if (f0 === 0 || (Math.sign(f0) !== Math.sign(f1) && Math.abs(f0) < 15)) {
        let lo = prev.getTime(), hi = tt.getTime();
        for (let i = 0; i < 30; i++) {
          const m = (lo + hi) / 2, fm = sepAt(new Date(m)) - ang;
          if (Math.sign(fm) === Math.sign(f0)) lo = m; else hi = m;
        }
        const date = new Date((lo + hi) / 2);
        const same = signOf(bodyLongitude(a, date)).id === sa0 && signOf(bodyLongitude(b, date)).id === sb0;
        return { type: ty, date, days: (date.getTime() - from.getTime()) / 864e5, beforeSignChange: same };
      }
    }
    prev = tt; prevSep = sep;
  }
  return null;
}

function moonIngress(from: Date): Date {
  const s0 = signOf(bodyLongitude('moon', from)).id;
  let tt = from;
  for (let h = 1; h < 24 * 3; h++) {
    tt = new Date(from.getTime() + h * 36e5);
    if (signOf(bodyLongitude('moon', tt)).id !== s0) return tt;
  }
  return tt;
}

export interface HoraryInput { question: string; category: HoraryCategory; date: Date; placeId?: string; lat?: number; lon?: number; tz?: string }

export function horaryReport(q: HoraryInput, lang: Lang): Report {
  const place = resolvePlace(q, lang);
  const c = buildChart({ date: q.date, lat: place.lat, lon: place.lon, timeKnown: true });
  const asc = c.points.asc!;
  const qh = HORARY_HOUSE[q.category];
  const s1 = TRAD_RULER[asc.sign.id];
  const s2 = TRAD_RULER[signOf(c.cusps![qh - 1]).id];
  const P1 = c.points[s1]!, P2 = c.points[s2]!;
  const notes = [T.horaryNote[lang]];

  const radical: Item = { label: T.radicality[lang], value: `${pname('asc', lang)} ${pos(asc.lon, lang)}` };
  if (asc.deg < 3) { radical.text = t(T.tooEarly, lang, { d: asc.deg.toFixed(0) }); radical.tone = 'hard'; }
  else if (asc.deg > 27) { radical.text = t(T.tooLate, lang, { d: asc.deg.toFixed(0) }); radical.tone = 'hard'; }
  else { radical.text = T.radicalOk[lang]; radical.tone = 'good'; }

  const sigItems: Item[] = [
    { label: T.querent[lang], value: `${POINTS[s1].glyph} ${pname(s1, lang)}`, text: t(T.sigText, lang, { p: pname(s1, lang), h: 1, s: P1.sign.name[lang], ph: P1.house! }) },
    { label: `${T.quesited[lang]}: ${HORARY_LABEL[q.category][lang]}`, value: `${POINTS[s2].glyph} ${pname(s2, lang)}`,
      text: t(T.sigText, lang, { p: pname(s2, lang), h: qh, s: P2.sign.name[lang], ph: P2.house! }) },
  ];
  if (s1 === s2) sigItems.push({ label: '', value: '', text: T.sameSig[lang] });

  // מצב הירח: ריק ממהלך?
  const ingress = moonIngress(q.date);
  const hoursToIngress = (ingress.getTime() - q.date.getTime()) / 36e5;
  let moonNext: { p: PlanetId; perf: Perfection } | null = null;
  for (const pid of TRADITIONAL.filter((x) => x !== 'moon')) {
    const perf = nextPerfection('moon', pid, q.date, hoursToIngress / 24);
    if (perf && (!moonNext || perf.date < moonNext.perf.date)) moonNext = { p: pid, perf };
  }
  const voc = !moonNext;
  const moon = c.points.moon!;
  const moonItems: Item[] = [{
    label: `☽ ${pname('moon', lang)}`, value: `${pos(moon.lon, lang)}, ${houseStr(moon.house, lang)}`,
    text: voc
      ? T.voc[lang] + (['taurus', 'cancer', 'sagittarius', 'pisces'].includes(moon.sign.id) ? T.vocException[lang] : '')
      : t(T.moonNext, lang, { x: ASPECT_INFO[moonNext!.perf.type].name[lang], p: pname(moonNext!.p, lang), d: Math.max(1, Math.round(moonNext!.perf.days * 24)) }),
    tone: voc ? 'hard' : 'neutral',
  }];

  // השלמה בין המייצגים
  const perfItems: Item[] = [];
  let perf: Perfection | null = null;
  if (s1 !== s2) {
    perf = nextPerfection(s1, s2, q.date, 120);
    if (perf && !perf.beforeSignChange) perf = null;
    perfItems.push(perf
      ? { label: T.perfection[lang], value: ASPECT_INFO[perf.type].name[lang], text: t(T.perfects, lang, { a: pname(s1, lang), b: pname(s2, lang), x: ASPECT_INFO[perf.type].name[lang], d: Math.max(1, Math.round(perf.days)) }), tone: aspectTone({ a: s1, b: s2, type: perf.type, orb: 0 }) }
      : { label: T.perfection[lang], value: '—', text: T.noPerfect[lang], tone: 'hard' });
  }
  // העברת אור: הירח פוגש את אחד המייצגים ואז את השני
  let translation = false;
  if (!perf && s1 !== s2 && moonNext && (moonNext.p === s1 || moonNext.p === s2)) {
    const other = moonNext.p === s1 ? s2 : s1;
    const second = nextPerfection('moon', other, moonNext.perf.date, (ingress.getTime() - moonNext.perf.date.getTime()) / 864e5);
    if (second) {
      translation = true;
      perfItems.push({ label: T.perfection[lang], value: '☽', text: t(T.translation, lang, { a: pname(moonNext.p, lang), b: pname(other, lang) }), tone: 'neutral' });
    }
  }
  if (q.category === 'lost') {
    const h = P2.house!;
    perfItems.push({ label: HORARY_LABEL.lost[lang], value: houseStr(h, lang),
      text: h === 4 ? T.lostHome[lang] : [1, 7, 10].includes(h) ? t(T.lostNear, lang, { h }) : [3, 6, 9, 12].includes(h) ? t(T.lostFar, lang, { h }) : t(T.lostNear, lang, { h }) });
  }

  // פסק
  let label: L, text: L, tone: Tone;
  if (voc && !perf) { label = T.verdictNothing; text = T.voc; tone = 'hard'; }
  else if (s1 === s2) {
    const good = moonNext && ['conj', 'sext', 'trine'].includes(moonNext.perf.type);
    label = good ? T.verdictYes : T.verdictYesHard; text = good ? T.verdictYesText : T.verdictYesHardText; tone = good ? 'good' : 'neutral';
  } else if (perf) {
    if (['conj', 'sext', 'trine'].includes(perf.type)) { label = T.verdictYes; text = T.verdictYesText; tone = 'good'; }
    else if (perf.type === 'square') { label = T.verdictYesHard; text = T.verdictYesHardText; tone = 'neutral'; }
    else { label = T.verdictYesHard; text = T.verdictOppText; tone = 'neutral'; }
  } else if (translation) { label = T.verdictMaybe; text = T.verdictMaybeText; tone = 'neutral'; }
  else { label = T.verdictNo; text = T.verdictNoText; tone = 'hard'; }

  return {
    title: q.question ? `״${q.question}״` : T.horaryTitle[lang],
    subtitle: t(T.askedAt, lang, { t: fmtDate(q.date, place.tz, place.lon, lang), p: place.label }),
    wheel: { inner: c },
    verdict: { label: label[lang], text: text[lang], tone },
    sections: [
      { title: T.radicality[lang], items: [radical] },
      { title: T.significators[lang], items: sigItems },
      { title: T.perfection[lang], items: perfItems.length ? perfItems : [{ label: '', value: '', text: T.sameSig[lang] }] },
      { title: T.moonState[lang], items: moonItems },
    ],
    notes,
  };
}

/* ---------------- 6. אלקטיבי ---------------- */

export type ElectionEvent = 'wedding' | 'business' | 'contract' | 'move' | 'start';
export const ELECTION_LABEL: Record<ElectionEvent, L> = {
  wedding: { he: 'חתונה', en: 'Wedding' },
  business: { he: 'פתיחת עסק', en: 'Opening a business' },
  contract: { he: 'חתימה על חוזה', en: 'Signing a contract' },
  move: { he: 'מעבר דירה', en: 'Moving home' },
  start: { he: 'התחלה חדשה כללית', en: 'A new beginning' },
};

const R = {
  waxing: { he: 'ירח במילוי — צמיחה', en: 'Waxing Moon — growth' },
  waning: { he: 'ירח בחסר', en: 'Waning Moon' },
  vocBad: { he: 'ירח ריק ממהלך', en: 'Void-of-course Moon' },
  moonStrong: { he: 'ירח ב{s} (מזל חזק לירח)', en: 'Moon in {s} (strong for the Moon)' },
  moonWeak: { he: 'ירח ב{s} (מזל חלש לירח)', en: 'Moon in {s} (weak for the Moon)' },
  moonToBenefic: { he: 'הירח פונה ל{p} בהיבט הרמוני', en: 'Moon applying harmoniously to {p}' },
  moonToMalefic: { he: 'הירח פונה ל{p} בהיבט מתוח', en: 'Moon applying in tension to {p}' },
  rx: { he: '{p} בנסיגה', en: '{p} retrograde' },
  beneficAngular: { he: '{p} בבית {h} (זוויתי)', en: '{p} in house {h} (angular)' },
  maleficRising: { he: '{p} בבית {h}', en: '{p} in house {h}' },
  eventHouse: { he: 'בית {h} ({d}) נתמך', en: 'House {h} ({d}) supported' },
  ascLate: { he: 'מזל עולה במעלות האחרונות', en: 'Rising sign in its last degrees' },
  rulerDignity: { he: '{p}, שליט בית {h}, {d}', en: '{p}, ruler of house {h}, {d}' },
};

interface Candidate { date: Date; score: number; plus: string[]; minus: string[]; asc: string }

export interface ElectionInput { event: ElectionEvent; start: string; days: number; hourFrom: number; hourTo: number; placeId?: string; lat?: number; lon?: number; tz?: string }

export function electionReport(e: ElectionInput, lang: Lang): Report {
  const place = resolvePlace(e, lang);
  const [y, m, d] = e.start.split('-').map(Number);
  const days = Math.max(1, Math.min(60, e.days));
  const cands: Candidate[] = [];
  const hard: PlanetId[] = ['mars', 'saturn'];
  const eventHouse: Record<ElectionEvent, number> = { wedding: 7, business: 10, contract: 7, move: 4, start: 1 };
  const rxPenalty: Record<ElectionEvent, Partial<Record<PlanetId, number>>> = {
    wedding: { venus: 5, mercury: 2, mars: 1 }, business: { mercury: 3, mars: 2, venus: 1 },
    contract: { mercury: 5, venus: 1 }, move: { mercury: 3, venus: 1 }, start: { mercury: 3, venus: 1, mars: 1 },
  };
  let checked = 0;
  for (let day = 0; day < days; day++) {
    for (let h = e.hourFrom; h <= e.hourTo; h++) {
      const date = zonedToUtc(y, m, d + day, h, 0, place.tz, place.lon);
      const c = buildChart({ date, lat: place.lat, lon: place.lon, timeKnown: true });
      checked++;
      const P = c.points, plus: string[] = [], minus: string[] = [];
      let s = 0;
      const moon = P.moon!, sun = P.sun!;
      const phase = norm(moon.lon - sun.lon);
      if (phase > 10 && phase < 170) { s += 2; plus.push(R.waxing[lang]); }
      else if (phase > 190) { s -= 1; minus.push(R.waning[lang]); }
      if (['taurus', 'cancer'].includes(moon.sign.id)) { s += 2; plus.push(t(R.moonStrong, lang, { s: moon.sign.name[lang] })); }
      if (['scorpio', 'capricorn'].includes(moon.sign.id)) { s -= 2; minus.push(t(R.moonWeak, lang, { s: moon.sign.name[lang] })); }
      // ההיבט הבא של הירח בתוך המזל (קירוב ליניארי — מהיר מספיק לסריקה)
      const left = 30 - moon.deg, ms = moon.speed!;
      let next: { p: PlanetId; ty: AspectId; dist: number } | null = null;
      for (const pid of TRADITIONAL.filter((x) => x !== 'moon')) {
        const rel = ms - (P[pid]!.speed ?? 0);
        for (const as of ASPECTS) {
          for (const target of [as.angle, -as.angle]) {
            const cur = delta(P[pid]!.lon, moon.lon);
            let need = norm(target - cur); if (need > 180) continue;
            const deg = need * ms / rel;
            if (deg >= 0 && deg <= left && (!next || deg < next.dist)) next = { p: pid, ty: as.id, dist: deg };
          }
        }
      }
      if (!next) { s -= 4; minus.push(R.vocBad[lang]); }
      else if (['venus', 'jupiter'].includes(next.p) && ['sext', 'trine', 'conj'].includes(next.ty)) { s += 3; plus.push(t(R.moonToBenefic, lang, { p: pname(next.p, lang) })); }
      else if (hard.includes(next.p) && ['square', 'opp', 'conj'].includes(next.ty)) { s -= 3; minus.push(t(R.moonToMalefic, lang, { p: pname(next.p, lang) })); }
      for (const [pid, pen] of Object.entries(rxPenalty[e.event]) as [PlanetId, number][]) {
        if (P[pid]!.retro) { s -= pen; minus.push(t(R.rx, lang, { p: pname(pid, lang) })); }
      }
      for (const pid of ['venus', 'jupiter'] as PlanetId[]) {
        const hh = P[pid]!.house!;
        if ([1, 10].includes(hh)) { s += 2; plus.push(t(R.beneficAngular, lang, { p: pname(pid, lang), h: hh })); }
        else if ([4, 7].includes(hh)) { s += 1; plus.push(t(R.beneficAngular, lang, { p: pname(pid, lang), h: hh })); }
        if (hh === eventHouse[e.event]) { s += 2; plus.push(t(R.eventHouse, lang, { h: hh, d: HOUSE_DOMAIN[hh - 1][lang] })); }
      }
      for (const pid of hard) if (P[pid]!.house === 1 || P[pid]!.house === eventHouse[e.event]) { s -= 2; minus.push(t(R.maleficRising, lang, { p: pname(pid, lang), h: P[pid]!.house! })); }
      if (P.asc!.deg > 27) { s -= 1; minus.push(R.ascLate[lang]); }
      // מושל הבית של האירוע בעוצמה
      const ruler = TRAD_RULER[signOf(c.cusps![eventHouse[e.event] - 1]).id];
      const dg = dignity(ruler, P[ruler]!.sign.id);
      if (dg === 'domicile' || dg === 'exalted') { s += 2; plus.push(t(R.rulerDignity, lang, { p: pname(ruler, lang), h: eventHouse[e.event], d: DIGNITY_NAME[dg][lang] })); }
      if (dg === 'detriment' || dg === 'fall') { s -= 2; minus.push(t(R.rulerDignity, lang, { p: pname(ruler, lang), h: eventHouse[e.event], d: DIGNITY_NAME[dg][lang] })); }
      cands.push({ date, score: s, plus, minus, asc: P.asc!.sign.name[lang] });
    }
  }
  cands.sort((p, q) => q.score - p.score);
  const best: Candidate[] = [];
  for (const cd of cands) {
    if (best.length >= 6) break;
    if (best.every((x) => Math.abs(x.date.getTime() - cd.date.getTime()) > 18 * 36e5)) best.push(cd);
  }
  const bestItems: Item[] = best.map((cd) => ({
    label: fmtDate(cd.date, place.tz, place.lon, lang),
    value: `${pname('asc', lang)}: ${cd.asc}`,
    tag: t(T.scoreLbl, lang, { s: cd.score }),
    text: [...cd.plus.map((x) => '✓ ' + x), ...cd.minus.map((x) => '✗ ' + x)].join(' · '),
    tone: cd.score >= 6 ? 'good' : cd.score >= 2 ? 'neutral' : 'hard',
  }));

  // נסיגות בטווח
  const startD = zonedToUtc(y, m, d, 0, 0, place.tz, place.lon);
  const avoidItems: Item[] = [];
  for (const pid of ['mercury', 'venus', 'mars'] as PlanetId[]) {
    let inRx = false, from: Date | null = null;
    for (let i = 0; i <= days; i++) {
      const tt = new Date(startD.getTime() + i * 864e5), rx = bodySpeed(pid, tt) < 0;
      if (rx && !inRx) { from = tt; inRx = true; }
      if ((!rx || i === days) && inRx) {
        avoidItems.push({ label: t(T.rxPeriod, lang, { p: pname(pid, lang) }),
          value: `${fmtDate(from!, place.tz, place.lon, lang, false)} – ${fmtDate(tt, place.tz, place.lon, lang, false)}`,
          text: t(T.rxAvoid, lang, { t: ELECTION_LABEL[e.event][lang] }), tone: 'hard' });
        inRx = false;
      }
    }
  }
  if (!avoidItems.length) avoidItems.push({ label: T.noAvoid[lang], value: '', tone: 'good' });
  const endD = new Date(startD.getTime() + (days - 1) * 864e5);
  return {
    title: t(T.electionTitle, lang, { e: ELECTION_LABEL[e.event][lang] }),
    subtitle: place.label,
    wheel: best[0] ? { inner: buildChart({ date: best[0].date, lat: place.lat, lon: place.lon, timeKnown: true }), caption: T.capElection[lang] } : undefined,
    sections: [
      { title: T.bestTimes[lang], intro: t(T.electionIntro, lang, { n: checked, a: fmtDate(startD, place.tz, place.lon, lang, false), b: fmtDate(endD, place.tz, place.lon, lang, false) }), items: bestItems },
      { title: T.avoid[lang], items: avoidItems },
    ],
    notes: [],
  };
}

/* ---------------- 7. עולמי ---------------- */

export interface NationChart { id: string; name: L; utc: string; placeId?: string; lat: number; lon: number; tz: string; note: L }
export const NATIONS: NationChart[] = [
  { id: 'israel', name: { he: 'ישראל', en: 'Israel' }, utc: '1948-05-14T14:00:00Z', lat: 32.0853, lon: 34.7818, tz: 'Asia/Jerusalem',
    note: { he: 'הכרזת העצמאות, 14.5.1948, 16:00, תל אביב', en: 'Declaration of Independence, 14 May 1948, 16:00, Tel Aviv' } },
  { id: 'usa', name: { he: 'ארצות הברית', en: 'United States' }, utc: '1776-07-04T22:10:40Z', lat: 39.9526, lon: -75.1652, tz: 'LMT',
    note: { he: 'מפת סיבלי, 4.7.1776, 17:10 זמן מקומי, פילדלפיה', en: 'Sibly chart, 4 July 1776, 17:10 local mean time, Philadelphia' } },
  { id: 'uk', name: { he: 'בריטניה', en: 'United Kingdom' }, utc: '1801-01-01T00:00:29Z', lat: 51.5074, lon: -0.1278, tz: 'LMT',
    note: { he: 'חוק האיחוד, 1.1.1801, חצות, לונדון', en: 'Act of Union, 1 Jan 1801, midnight, London' } },
  { id: 'france', name: { he: 'צרפת (הרפובליקה החמישית)', en: 'France (Fifth Republic)' }, utc: '1958-10-04T23:00:00Z', lat: 48.8566, lon: 2.3522, tz: 'Europe/Paris',
    note: { he: 'חוקת הרפובליקה החמישית, 5.10.1958, חצות, פריז', en: 'Fifth Republic constitution, 5 Oct 1958, midnight, Paris' } },
  { id: 'germany', name: { he: 'גרמניה (איחוד)', en: 'Germany (reunification)' }, utc: '1990-10-02T22:00:00Z', lat: 52.52, lon: 13.405, tz: 'Europe/Berlin',
    note: { he: 'איחוד גרמניה, 3.10.1990, חצות, ברלין', en: 'Reunification, 3 Oct 1990, midnight, Berlin' } },
  { id: 'india', name: { he: 'הודו', en: 'India' }, utc: '1947-08-14T18:30:00Z', lat: 28.6139, lon: 77.209, tz: 'Asia/Kolkata',
    note: { he: 'עצמאות הודו, 15.8.1947, חצות, ניו דלהי', en: 'Independence, 15 Aug 1947, midnight, New Delhi' } },
];

export interface MundaneInput { nationId?: string; custom?: { name: string; date: Date; placeId?: string; lat?: number; lon?: number; tz?: string } }

export function mundaneReport(inp: MundaneInput, lang: Lang, now = new Date()): Report {
  let name: string, chart: Chart, tz: string, lon0: number, sub: string;
  const n = NATIONS.find((x) => x.id === inp.nationId);
  if (n) {
    name = n.name[lang]; tz = n.tz; lon0 = n.lon; sub = n.note[lang];
    chart = buildChart({ date: new Date(n.utc), lat: n.lat, lon: n.lon, timeKnown: true });
  } else if (inp.custom) {
    const pl = resolvePlace(inp.custom, lang);
    name = inp.custom.name; tz = pl.tz; lon0 = pl.lon;
    chart = buildChart({ date: inp.custom.date, lat: pl.lat, lon: pl.lon, timeKnown: true });
    sub = `${fmtDate(inp.custom.date, pl.tz, pl.lon, lang)} · ${pl.label}`;
  } else throw new Error('no-nation');
  const P = chart.points;
  const natItems: Item[] = (['sun', 'moon', 'asc', 'mc'] as PointId[]).filter((id) => P[id]).map((id) => ({
    label: `${POINTS[id].glyph} ${pname(id, lang)}`, value: `${pos(P[id]!.lon, lang)}${P[id]!.house && id !== 'asc' && id !== 'mc' ? ', ' + houseStr(P[id]!.house, lang) : ''}`,
    text: `${POINTS[id].mundane![lang]}: ${SIGN_STYLE[P[id]!.sign.id][lang]}.`,
  }));

  const sky = buildChart({ date: now, lat: chart.lat, lon: chart.lon, timeKnown: false });
  const tr = crossAspects(sky, chart, SLOW, ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'asc', 'mc'], 1).filter((a) => a.orb <= 2 && a.type !== 'sext');
  const trItems: Item[] = tr.map((a) => {
    const house = chart.cusps ? houseOf(sky.points[a.a]!.lon, chart.cusps) : 1;
    return {
      label: `${POINTS[a.a].glyph} ${ASPECTS.find((x) => x.id === a.type)!.glyph} ${POINTS[a.b].glyph}`,
      value: aspectLabel(a, lang), sub: `orb ${a.orb.toFixed(1)}°`,
      text: t(T.nationalTransitText, lang, { t: pname(a.a, lang), n: pname(a.b, lang), m: POINTS[a.a].mundane![lang], h: HOUSE_MUNDANE[house - 1][lang] }),
      tone: transitTone(a.a as PlanetId, a.type),
    };
  });
  if (!trItems.length) trItems.push({ label: T.noActive[lang], value: '', text: T.noActiveText[lang] });

  // השמיים של השנה: כניסות, היבטים בין כוכבים איטיים, ליקויים
  type Ev = { date: Date; item: Item };
  const evs: Ev[] = [];
  for (const pl of SLOW) {
    let prev = signOf(bodyLongitude(pl, now)).id;
    for (let i = 1; i <= 365; i++) {
      const tt = new Date(now.getTime() + i * 864e5), s = signOf(bodyLongitude(pl, tt));
      if (s.id !== prev) {
        evs.push({ date: tt, item: { label: fmtDate(tt, tz, lon0, lang, false), value: t(T.ingress, lang, { p: pname(pl, lang), s: s.name[lang] }),
          text: t(T.ingressText, lang, { m: POINTS[pl].mundane![lang], st: SIGN_STYLE[s.id][lang] }) } });
        prev = s.id;
      }
    }
  }
  for (let i = 0; i < SLOW.length; i++) for (let j = i + 1; j < SLOW.length; j++) {
    const pa = SLOW[i], pb = SLOW[j];
    let from = now;
    for (let k = 0; k < 3; k++) {
      const perf = nextPerfection(pa, pb, from, 365 - (from.getTime() - now.getTime()) / 864e5, ['conj', 'square', 'trine', 'opp', 'sext']);
      if (!perf) break;
      evs.push({ date: perf.date, item: {
        label: fmtDate(perf.date, tz, lon0, lang, false),
        value: t(T.outerAspect, lang, { a: pname(pa, lang), x: ASPECT_INFO[perf.type].name[lang], b: (lang === 'he' ? 'ל' : '') + pname(pb, lang) }),
        text: t(T.outerAspectText, lang, { ma: POINTS[pa].mundane![lang], mb: POINTS[pb].mundane![lang], n: ASPECT_INFO[perf.type].nature[lang] }),
        tone: aspectTone({ a: pa, b: pb, type: perf.type, orb: 0 }) } });
      from = new Date(perf.date.getTime() + 5 * 864e5);
    }
  }
  const end = now.getTime() + 365 * 864e5;
  const hitsNational = (lonE: number) => (['sun', 'moon', 'asc', 'mc'] as PointId[]).filter((id) => P[id] && Math.abs(delta(P[id]!.lon, lonE)) <= 3);
  for (let e = Astro.SearchGlobalSolarEclipse(now); e.peak.date.getTime() < end; e = Astro.NextGlobalSolarEclipse(e.peak)) {
    const lonE = bodyLongitude('sun', e.peak.date), s = signOf(lonE), h = hitsNational(lonE);
    evs.push({ date: e.peak.date, item: { label: fmtDate(e.peak.date, tz, lon0, lang, false), value: t(T.solarEclipse, lang, { s: `${s.name[lang]} ${fmtDeg(lonE)}` }),
      text: t(T.eclipseText, lang, { q: SIGN_QUALITY[s.id][lang] }) + (h.length ? t(T.eclipseHits, lang, { p: h.map((id) => pname(id, lang)).join(', ') }) : ''), tone: h.length ? 'hard' : 'neutral' } });
  }
  for (let e = Astro.SearchLunarEclipse(now); e.peak.date.getTime() < end; e = Astro.NextLunarEclipse(e.peak)) {
    const lonE = bodyLongitude('moon', e.peak.date), s = signOf(lonE), h = hitsNational(lonE);
    evs.push({ date: e.peak.date, item: { label: fmtDate(e.peak.date, tz, lon0, lang, false), value: t(T.lunarEclipse, lang, { s: `${s.name[lang]} ${fmtDeg(lonE)}` }),
      text: t(T.eclipseText, lang, { q: SIGN_QUALITY[s.id][lang] }) + (h.length ? t(T.eclipseHits, lang, { p: h.map((id) => pname(id, lang)).join(', ') }) : ''), tone: h.length ? 'hard' : 'neutral' } });
  }
  evs.sort((a, b) => a.date.getTime() - b.date.getTime());

  return {
    title: t(T.mundaneTitle, lang, { c: name }),
    subtitle: sub,
    wheel: { inner: chart, outer: sky, caption: T.capMundane[lang] },
    sections: [
      { title: T.nationalChart[lang], items: natItems },
      { title: T.nationalTransits[lang], items: trItems },
      { title: T.skyOfYear[lang], items: evs.map((e) => e.item) },
    ],
    notes: [T.mundaneNote[lang]],
  };
}

export { T as REPORT_STRINGS };
