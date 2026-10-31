/**
 * pair-destiny.ts — מפת הגורל הזוגי: חמש שיטות נארגות לסיפור אחד.
 * הניסוח מקורי. זו פרשנות סמלית, לא תחזית שניתן לאמת.
 */
import {
  parseDate,
  type Element, type L, type Profile,
} from './astro';
import { adviceFor, deepCompat, type DeepCompat } from './compat-deep';
import { PERSONAL_YEAR, numerologyLove, personalYear, type AstroLove } from './love-methods';

const x = (he: string, en: string): L => ({ he, en });
const both = (fn: (l: 'he' | 'en') => string): L => ({ he: fn('he'), en: fn('en') });
const join = (a: string, b: string, l: 'he' | 'en') => (l === 'he' ? `${a} ו${b}` : `${a} and ${b}`);

export interface PairBit { kicker: L; title: L; text: L; lines: L[]; note?: L }
export interface PairCard { n: number; role: L }
export interface PairReading {
  title: L;
  lead: L;
  gift: PairBit;
  challenge: PairBit;
  crossroads: PairBit;
  insights: L[];
  methods: PairBit[];
  forecasts: PairBit[];
  tales: PairBit[];
  cards: PairCard[];
  disclaimer: L;
}

const ARCH: Record<Element, L> = {
  fire: x('ההרפתקן', 'The adventurer'),
  earth: x('המגן', 'The guardian'),
  air: x('החולם', 'The dreamer'),
  water: x('המרפא', 'The healer'),
};
const ARCH_TEXT: Record<Element, L> = {
  fire: x('מביא תנועה, אומץ ורצון לצאת לדרך.', 'Brings motion, courage and a wish to set out.'),
  earth: x('מביא יציבות, נאמנות ובית שאפשר לחזור אליו.', 'Brings stability, loyalty and a home to return to.'),
  air: x('מביא רעיונות, שיחה ומרחב לנשום.', 'Brings ideas, conversation and room to breathe.'),
  water: x('מביא רגש, קרבה והקשבה.', 'Brings feeling, closeness and listening.'),
};
const CHAKRA: Record<Element, L> = {
  fire: x('מקלעת השמש — רצון ויוזמה', 'the solar plexus — will and initiative'),
  earth: x('השורש — ביטחון ואדמה', 'the root — safety and ground'),
  air: x('הגרון — דיבור ואמת', 'the throat — speech and truth'),
  water: x('הלב — קרבה וחמלה', 'the heart — closeness and care'),
};

function bit(kicker: L, title: L, text: L, lines: L[] = [], note?: L): PairBit {
  return note ? { kicker, title, text, lines, note } : { kicker, title, text, lines };
}

function cardsFor(a: string, b: string): number[] {
  const digits = `${a}${b}`.replace(/\D/g, '');
  let h = 2166136261;
  for (const c of digits) h = Math.imul(h ^ Number(c), 0x01000193);
  const out: number[] = [];
  let n = h >>> 0;
  while (out.length < 4) {
    n = Math.imul(n ^ (n >>> 16), 0x7feb352d) >>> 0;
    const card = n % 22;
    if (!out.includes(card)) out.push(card);
  }
  return out;
}

function moonGap(a: string, b: string): number {
  const da = parseDate(a)!, db = parseDate(b)!;
  const day = (y: number, m: number, d: number) => Math.floor(Date.UTC(y, m - 1, d) / 86400000);
  return Math.abs(day(da[0], da[1], da[2]) - day(db[0], db[1], db[2])) % 30;
}

function pick(list: DeepCompat['params'], key: string) {
  return list.find((p) => p.key === key)!;
}

export function pairDestiny(a: Profile, b: Profile, sky: AstroLove | null, dates: { a: string; b: string }, now = new Date()): PairReading {
  const deep = deepCompat(a, b);
  const nums = numerologyLove({ name: a.name, birth: dates.a }, { name: b.name, birth: dates.b }, now.getFullYear());
  const year = now.getFullYear();
  const ya = personalYear(dates.a, year);
  const yb = personalYear(dates.b, year);
  const strength = deep.strengths[0] ?? deep.params.slice().sort((p, q) => q.score - p.score)[0];
  const challenge = deep.challenges[0] ?? deep.params.slice().sort((p, q) => p.score - q.score)[0];
  const advice = adviceFor(challenge);
  const samePace = nums.pace.a === nums.pace.b;
  const feed = ['air-fire', 'earth-water'].includes([a.western.element, b.western.element].sort().join('-'));
  const gap = moonGap(dates.a, dates.b);
  const drawn = cardsFor(dates.a, dates.b);
  const elA = a.western.element;
  const elB = b.western.element;

  const title = samePace
    ? both((l) => (l === 'he' ? `שניכם בקצב של ${nums.pace.a.name.he}` : `You both move at the pace of ${nums.pace.a.name.en}`))
    : both((l) => (l === 'he'
      ? `החיבור בין ${nums.pace.a.name.he} ל${nums.pace.b.name.he}`
      : `The meeting of ${nums.pace.a.name.en} and ${nums.pace.b.name.en}`));

  const lead = both((l) => (l === 'he'
    ? `${join(a.name, b.name, l)}: ${a.western.name.he} ו${b.western.name.he}. מספר הגורל המשותף הוא ${nums.destiny.n}, ${nums.destiny.title.he}. ${nums.pace.text.he}`
    : `${join(a.name, b.name, l)}: ${a.western.name.en} and ${b.western.name.en}. The shared destiny number is ${nums.destiny.n}, ${nums.destiny.title.en}. ${nums.pace.text.en}`));

  const gift = bit(
    x('המתנה של הקשר', 'The gift of the bond'),
    strength.label,
    both((l) => (l === 'he'
      ? `${strength.detail.he}. ${strength.text.he} ${a.name}: ${ARCH_TEXT[elA].he} ${b.name}: ${ARCH_TEXT[elB].he}`
      : `${strength.detail.en}. ${strength.text.en} ${a.name}: ${ARCH_TEXT[elA].en} ${b.name}: ${ARCH_TEXT[elB].en}`)),
    [strength.detail],
  );

  const challengeBit = bit(
    x('האתגר הנסתר', 'The hidden challenge'),
    challenge.label,
    both((l) => (l === 'he'
      ? `${challenge.detail.he}. ${challenge.text.he} בלי שיחה, צורך בקרבה עלול להישמע כלחץ, וצורך במרחב עלול להישמע כריחוק.`
      : `${challenge.detail.en}. ${challenge.text.en} Without a conversation, a need for closeness can sound like pressure, and a need for space can sound like distance.`)),
    [challenge.detail],
  );

  const crossroads = bit(
    x('הצומת הבא', 'The next crossroads'),
    x('שני מסלולים, לא גזירה', 'Two paths, not a verdict'),
    both((l) => (l === 'he'
      ? `מסלול אחד: ${advice.he} מסלול אחר: אותם דפוסים חוזרים בלי שיחה, והקשר נשחק. הבחירה נשארת בידיים של ${join(a.name, b.name, l)}.`
      : `One path: ${advice.en} The other path: the same patterns repeat without a conversation, and the bond wears thin. The choice stays with ${join(a.name, b.name, l)}.`)),
  );

  const insights: L[] = [
    both((l) => (l === 'he' ? `מה מחבר: ${strength.text.he}` : `What connects you: ${strength.text.en}`)),
    both((l) => (l === 'he'
      ? `מה להבין על הצד השני: ${a.name} — ${nums.pace.a.text.he}. ${b.name} — ${nums.pace.b.text.he}.`
      : `What to understand about the other: ${a.name} — ${nums.pace.a.text.en}. ${b.name} — ${nums.pace.b.text.en}.`)),
    both((l) => (l === 'he' ? `השבוע: ${advice.he}` : `This week: ${advice.en}`)),
  ];

  const west = [pick(deep.params, 'western-el'), pick(deep.params, 'western-asp'), pick(deep.params, 'western-mode')];
  const skyLines: L[] = sky
    ? sky.sections.map((s) => both((l) => (l === 'he' ? `${s.title.he} (${s.score}): ${s.text.he}` : `${s.title.en} (${s.score}): ${s.text.en}`)))
    : [];
  const synastry = bit(
    x('שיטה 1', 'Method 1'),
    x('אסטרולוגיה זוגית', 'Couple astrology'),
    sky
      ? x('השוואה בין השמש, הירח, נוגה, מאדים, כוכב חמה ושבתאי של שניכם.', 'A comparison of both Suns, Moons, Venus, Mars, Mercury and Saturn.')
      : x('לפי מזלות השמש: איך כל אחד אוהב, ואיפה המזלות נפגשים בגלגל. עיר ושעה פותחות גם את הירח, נוגה ומאדים.', 'From the Sun signs: how each of you loves, and where the signs meet on the wheel. A city and a time also open the Moon, Venus and Mars.'),
    [...west.map((p) => p.text), ...skyLines],
    sky?.timeNote
      ? x('בלי שעה מדויקת הירח משוער. המזל העולה לא נכנס לקריאה הזו.', 'Without an exact time the Moon is estimated. The rising sign is not part of this reading.')
      : undefined,
  );

  const numbers = bit(
    x('שיטה 2', 'Method 2'),
    x('נומרולוגיה זוגית', 'Couple numerology'),
    nums.pace.text,
    [
      both((l) => (l === 'he'
        ? `דרכי חיים ${nums.lp[0]} ו־${nums.lp[1]}. מספר הגורל המשותף ${nums.destiny.n}: ${nums.destiny.text.he}`
        : `Life paths ${nums.lp[0]} and ${nums.lp[1]}. Shared destiny number ${nums.destiny.n}: ${nums.destiny.text.en}`)),
      both((l) => (l === 'he'
        ? `השנה האישית של ${a.name} היא ${ya}, ${PERSONAL_YEAR[ya].he}. של ${b.name} היא ${yb}, ${PERSONAL_YEAR[yb].he}.`
        : `${a.name}'s personal year is ${ya}, ${PERSONAL_YEAR[ya].en}. ${b.name}'s is ${yb}, ${PERSONAL_YEAR[yb].en}.`)),
      pick(deep.params, 'num-name').text,
    ],
  );

  const tarot = bit(
    x('שיטה 3', 'Method 3'),
    x('טארוט זוגי', 'Couple tarot'),
    x('ארבעה קלפים קבועים לשני התאריכים: מה כל אחד מביא, מה מחזק את הקרבה, ומסלול אחד להמשך. הופכים אותם בטקס.', 'Four cards fixed to the two dates: what each person brings, what strengthens the closeness, and one path onward. Turn them in the rite.'),
    [
      x('מה כל אחד מביא לקשר.', 'What each person brings to the bond.'),
      x('מה מחזק או מעכב את הקרבה.', 'What strengthens or slows the closeness.'),
      x('מסלול אחד שאפשר לבחור, לא עתיד סגור.', 'One path you can choose, not a closed future.'),
    ],
  );

  const chinese = bit(
    x('שיטה 4', 'Method 4'),
    x('השנה הסינית', 'The Chinese year'),
    x('לפי שנת הלידה: החיה, יסוד מתוך החמישה, ויין או יאנג. זו שכבה אחרת ממזל השמש.', 'From the birth year: the animal, one of the five elements, and yin or yang. A different layer from the Sun sign.'),
    ['chinese-animal', 'chinese-el', 'chinese-yy'].map((k) => pick(deep.params, k).text),
  );

  const energy = bit(
    x('שיטה 5', 'Method 5'),
    x('מפת האנרגיה', 'The energy map'),
    both((l) => (l === 'he'
      ? `${a.name} יושב ב${CHAKRA[elA].he}. ${b.name} יושב ב${CHAKRA[elB].he}. ${feed ? 'היסודות מזינים זה את זה.' : 'היסודות מבקשים תרגום, לא מחיקה.'}`
      : `${a.name} sits in ${CHAKRA[elA].en}. ${b.name} sits in ${CHAKRA[elB].en}. ${feed ? 'The elements feed each other.' : 'The elements ask for translation, not erasure.'}`)),
    [
      both((l) => (l === 'he'
        ? `${ARCH[elA].he} מול ${ARCH[elB].he}. ${samePace ? 'נתינה וקבלה באותו קצב.' : 'אחד נותן קרבה, השני שומר מרחב.'}`
        : `${ARCH[elA].en} meets ${ARCH[elB].en}. ${samePace ? 'Giving and receiving at the same pace.' : 'One offers closeness, the other keeps space.'}`)),
      pick(deep.params, 'chinese-yy').text,
    ],
    x('פרשנות רוחנית של סמלים. לא מדידה של אנרגיה, ולא אבחון.', 'A spiritual reading of symbols. Not a measurement of energy, and not a diagnosis.'),
  );

  const forecasts: PairBit[] = [
    bit(x('30 יום', '30 days'), x('הנושא הקרוב', 'The near theme'),
      both((l) => (l === 'he'
        ? `החודש סובב סביב ${PERSONAL_YEAR[ya].he} אצל ${a.name}, וסביב ${PERSONAL_YEAR[yb].he} אצל ${b.name}. שאלה לשיחה: מה כל אחד צריך השבוע כדי להרגיש שרואים אותו.`
        : `This stretch turns around ${PERSONAL_YEAR[ya].en} for ${a.name}, and ${PERSONAL_YEAR[yb].en} for ${b.name}. A question for a talk: what each of you needs this week in order to feel seen.`)),
      [advice]),
    bit(x('3 חודשים', '3 months'), x('התקרבות ומתח', 'Closeness and tension'),
      both((l) => (l === 'he'
        ? `ההזדמנות להתקרב יושבת ב${strength.label.he}. המתח שכדאי לשים לב אליו יושב ב${challenge.label.he}.`
        : `The chance to come closer sits in ${strength.label.en}. The tension worth noticing sits in ${challenge.label.en}.`)),
      [strength.text, challenge.text]),
    bit(x('השנה', 'The year'), x(`מפת ${year}`, `The ${year} map`),
      both((l) => (l === 'he'
        ? `${year} אצל ${a.name}: ${PERSONAL_YEAR[ya].he}. אצל ${b.name}: ${PERSONAL_YEAR[yb].he}. ${ya === yb ? 'אותה שנה אישית — קל ללכת יחד, וקשה לראות את הנקודה העיוורת המשותפת.' : 'שתי שנים שונות: אחד בונה, השני זז. תאמו ציפיות בתחילת כל עונה.'}`
        : `${year} for ${a.name}: ${PERSONAL_YEAR[ya].en}. For ${b.name}: ${PERSONAL_YEAR[yb].en}. ${ya === yb ? 'The same personal year — easy to walk together, and easy to share a blind spot.' : 'Two different years: one builds, the other moves. Set expectations at the start of each season.'}`))),
    bit(x('משיכה', 'Attraction'), x('כימיה', 'Chemistry'),
      sky ? sky.sections[0].text : west[1].text,
      sky ? sky.sections[0].contacts.slice(0, 2).map((c) => c.text) : [west[0].text]),
    bit(x('קונפליקט', 'Conflict'), x('פער הציפיות', 'The gap in expectations'),
      challenge.text,
      [advice, x('סגנון אחד לא צריך לנצח. צריך משפט אחד ששניהם מבינים באותו אופן.', 'One style does not have to win. You need one sentence you both understand the same way.')]),
    bit(x('מסלול', 'A path'), x('לפי מה שתבחרו', 'According to what you choose'),
      crossroads.text),
  ];

  const phase = gap < 4 ? x('מפגש של מולד', 'a new-moon meeting')
    : gap < 12 ? x('מפגש של ירח מתמלא', 'a waxing meeting')
      : gap < 18 ? x('מפגש של ירח מלא', 'a full-moon meeting')
        : x('מפגש של ירח מתרוקן', 'a waning meeting');

  const tales: PairBit[] = [
    bit(x('סיפור', 'A story'), x('קשר מגלגולים', 'A bond from other turns'),
      a.hebrew.sign.id === b.hebrew.sign.id
        ? x('אותו מזל עברי. בסיפור הרוחני זו תחושת היכרות: נושא שכבר ישב ביניכם, וחוזר כדי שייבחרו בו במודע.', 'The same Hebrew sign. In the spiritual story this is a sense of recognition: a theme that already sat between you, returning so you can choose it on purpose.')
        : x('מזלות עבריים שונים. בסיפור הרוחני זה שיעור חדש, לא חוב. אין כאן הוכחה לגלגול — יש דימוי לנושא שכדאי לא לחזור עליו בלי לדבר.', 'Different Hebrew signs. In the spiritual story this is a new lesson, not a debt. No proof of another life — an image of a theme worth not repeating without a conversation.'),
      [],
      x('פרשנות רוחנית. לא זיכרון, ולא עובדה.', 'A spiritual reading. Not a memory, and not a fact.')),
    bit(x('סיפור', 'A story'), x('חוט הגורל האדום', 'The red thread'),
      feed
        ? x('היסודות מזינים זה את זה. בפולקלור זה חוט שכבר נמשך: המפגש מרגיש מתבקש. הוא עדיין מבקש בחירה בכל יום.', 'The elements feed each other. In folklore the thread is already drawn: the meeting feels invited. It still asks for a choice every day.')
        : x('החוט כאן לא "מוכיח" גורל. הוא שואל אם שניכם בוחרים לקשור אותו: בשיחה, בזמן, ובכבוד לקצב של השני.', 'The thread here does not "prove" fate. It asks whether you both choose to tie it: in conversation, in time, and in respect for the other\'s pace.')),
    bit(x('סיפור', 'A story'), x('סנכרון ירחי', 'A lunar sync'),
      both((l) => {
        const span = gap === 1 ? (l === 'he' ? 'יום אחד' : 'one day') : (l === 'he' ? `${gap} ימים` : `${gap} days`);
        return l === 'he'
          ? `בין ימי הלידה יש ${span} במחזור של שלושים. סמלית זה ${phase.he}. טקס קצר: בערב אחד, כל אחד אומר משפט על מה הוא צריך מהקשר, בלי להסביר את השני.`
          : `Between the birthdays there are ${span} in a cycle of thirty. Symbolically this is ${phase.en}. A short rite: one evening, each of you says one sentence about what you need from the bond, without explaining the other.`;
      })),
    bit(x('סיפור', 'A story'), x('ארכיטיפים', 'Archetypes'),
      both((l) => (l === 'he'
        ? `${a.name} הוא ${ARCH[elA].he}. ${b.name} הוא ${ARCH[elB].he}. ${ARCH_TEXT[elA].he} ${ARCH_TEXT[elB].he} ${elA === elB ? 'אותו ארכיטיפ פעמיים: כוח כפול, ואותה נקודה עיוורת.' : 'הם משלימים במקום שבו אחד חסר לשני, ומתנגשים כשאחד מבקש מהשני להיות הוא.'}`
        : `${a.name} is ${ARCH[elA].en}. ${b.name} is ${ARCH[elB].en}. ${ARCH_TEXT[elA].en} ${ARCH_TEXT[elB].en} ${elA === elB ? 'The same archetype twice: double strength, and the same blind spot.' : 'They complete each other where one lacks what the other holds, and they clash when one asks the other to be them.'}`))),
  ];

  const roles = [
    both((l) => (l === 'he' ? `מה ${a.name} מביא` : `What ${a.name} brings`)),
    both((l) => (l === 'he' ? `מה ${b.name} מביא` : `What ${b.name} brings`)),
    x('מה מחזק את הקרבה', 'What strengthens the closeness'),
    x('מסלול אחד להמשך', 'One path onward'),
  ];

  return {
    title, lead, gift, challenge: challengeBit, crossroads, insights,
    methods: [synastry, numbers, tarot, chinese, energy],
    forecasts, tales,
    cards: drawn.map((n, i) => ({ n, role: roles[i] })),
    disclaimer: x(
      'זו פרשנות מיסטית להשראה ולהיכרות. אין הוכחה שהיא חוזה את עתיד הקשר. ההחלטות נשארות שלכם.',
      'This is a mystical reading for inspiration and for knowing each other. Nothing here proves the future of the bond. The decisions stay yours.',
    ),
  };
}

