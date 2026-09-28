/**
 * compat-deep.ts — התאמה זוגית מורחבת: 11 פרמטרים בארבע קבוצות, עם הסבר ספציפי לכל זוג.
 * מערבי: יסודות · היבט בין המזלות · איכות
 * עברי: יסודות · היבט בין המזלות העבריים
 * סיני: החיות · מחזור חמשת היסודות · יין/יאנג
 * נומרולוגיה: דרך החיים · מספר השם · (מספר הזוג — תיאורי, לא נכנס לציון)
 */
import {
  ELEMENTS, NUMBER_MEANINGS, ZODIAC, chineseScore, elementScore, numberScore, reduceNumber,
  type Element, type L, type Lang, type Profile, type ZodiacSign,
} from './astro.ts';

export type Group = 'western' | 'hebrew' | 'chinese' | 'numbers';
export interface Param { group: Group; key: string; label: L; detail: L; score: number; text: L }
export interface DeepCompat {
  total: number;
  groups: { id: Group; label: L; score: number }[];
  params: Param[];
  strengths: Param[];
  challenges: Param[];
  couple: { n: number; title: L; text: L };
}

const x = (he: string, en: string): L => ({ he, en });
const avg = (a: number[]) => Math.round(a.reduce((s, v) => s + v, 0) / a.length);
const and = (a: string, b: string, lang: Lang) => (lang === 'he' ? `${a} ו${b}` : `${a} & ${b}`);
const both = (fn: (l: Lang) => string): L => ({ he: fn('he'), en: fn('en') });

export const GROUP_LABEL: Record<Group, L> = {
  western: x('אסטרולוגיה מערבית', 'Western astrology'),
  hebrew: x('המזל העברי', 'Hebrew sign'),
  chinese: x('האסטרולוגיה הסינית', 'Chinese astrology'),
  numbers: x('נומרולוגיה', 'Numerology'),
};

/* ---------- יסודות ---------- */
const EL_PAIR: Record<string, L> = {
  same: x('אותו יסוד: אתם מבינים זה את זה בלי הסברים, מדברים באותה שפה רגשית. הסכנה — שחסר מי שיאזן.', 'Same element: you understand each other without explaining and share an emotional language. The risk is nobody to balance you.'),
  'air-fire': x('אוויר מזין אש: אחד מביא רעיונות, השני תשוקה ותנועה. זוג מלהיב ומלא אנרגיה.', 'Air feeds fire: one brings ideas, the other passion and motion. An exciting, energetic pair.'),
  'earth-water': x('מים משקים אדמה: רגש ויציבות משלימים זה את זה. זוג שבונה בית חם ובטוח.', 'Water nourishes earth: feeling and stability complete each other. A pair that builds a warm, safe home.'),
  'earth-fire': x('אש ואדמה: אחד רוצה לזוז מהר, השני לבנות לאט. אם מכבדים את הקצב — יוצאת מזה עשייה גדולה.', 'Fire and earth: one wants speed, the other slow building. Respect each pace and you achieve a lot.'),
  'air-water': x('אוויר ומים: ראש מול לב. אחד מנתח, השני מרגיש — צריך ללמוד לתרגם.', 'Air and water: head versus heart. One analyzes, the other feels — you need to learn to translate.'),
  'fire-water': x('אש ומים: משיכה חזקה ורגשות סוערים. יוצרים אדים — או מכבים זה את זה.', 'Fire and water: strong attraction, stormy feelings. You make steam — or put each other out.'),
  'air-earth': x('אוויר ואדמה: חלומות מול מציאות. אחד מרחף, השני מקרקע — משלים, אבל דורש סבלנות.', 'Air and earth: dreams versus reality. One floats, the other grounds — complementary but needs patience.'),
};
function elementParam(group: Group, a: ZodiacSign, b: ZodiacSign): Param {
  const k = a.element === b.element ? 'same' : [a.element, b.element].sort().join('-');
  return {
    group, key: `${group}-el`, label: x('התאמת יסודות', 'Element harmony'),
    detail: both((l) => and(`${a.name[l]} (${ELEMENTS[a.element][l]})`, `${b.name[l]} (${ELEMENTS[b.element][l]})`, l)),
    score: elementScore(a.element, b.element), text: EL_PAIR[k],
  };
}

/* ---------- היבט לפי המרחק בגלגל ---------- */
const ASPECTS: { name: L; score: number; text: L }[] = [
  { name: x('אותו מזל (צמידות)', 'Same sign (conjunction)'), score: 78, text: x('אתם מראה זה של זה: הבנה מיידית, אבל גם אותן נקודות עיוורות.', 'You mirror each other: instant understanding, but the same blind spots.') },
  { name: x('מזלות שכנים', 'Neighbouring signs'), score: 55, text: x('מזלות צמודים בגלגל שונים מאוד באופיים. יש למידה הדדית, אבל גם אי-הבנות קטנות.', 'Adjacent signs differ greatly in nature. Mutual learning, but small misunderstandings.') },
  { name: x('סקסטיל (60°)', 'Sextile (60°)'), score: 85, text: x('ידידות ושיתוף פעולה טבעיים. קל לדבר, קל ליהנות יחד.', 'Natural friendship and cooperation. Easy to talk, easy to enjoy together.') },
  { name: x('ריבוע (90°)', 'Square (90°)'), score: 45, text: x('חיכוך שמניע: אתם מאתגרים זה את זה. יכול לחשל מאוד — או לעייף.', 'Friction that drives: you challenge each other. It can forge you — or wear you out.') },
  { name: x('טריגון (120°)', 'Trine (120°)'), score: 95, text: x('ההיבט ההרמוני ביותר: זרימה, תמיכה וכיף ללא מאמץ.', 'The most harmonious aspect: flow, support and effortless fun.') },
  { name: x('קווינקונקס (150°)', 'Quincunx (150°)'), score: 50, text: x('שני עולמות שונים שצריכים התאמות מתמידות. דורש גמישות משני הצדדים.', 'Two different worlds needing constant adjustment. Requires flexibility from both.') },
  { name: x('אופוזיציה (180°)', 'Opposition (180°)'), score: 72, text: x('הפכים נמשכים: כל אחד מחזיק את מה שחסר לשני. משיכה חזקה ואיזון — כשלומדים לא להתחרות.', 'Opposites attract: each holds what the other lacks. Strong pull and balance — once you stop competing.') },
];
function aspectParam(group: Group, a: ZodiacSign, b: ZodiacSign): Param {
  const ia = ZODIAC.findIndex((z) => z.id === a.id), ib = ZODIAC.findIndex((z) => z.id === b.id);
  let d = Math.abs(ia - ib); if (d > 6) d = 12 - d;
  const asp = ASPECTS[d];
  return {
    group, key: `${group}-asp`, label: x('היבט בין המזלות', 'Aspect between the signs'),
    detail: both((l) => `${and(a.name[l], b.name[l], l)} · ${asp.name[l]}`), score: asp.score, text: asp.text,
  };
}

/* ---------- איכות (קרדינלי/קבוע/משתנה) ---------- */
const MODE: L[] = [x('קרדינלי', 'Cardinal'), x('קבוע', 'Fixed'), x('משתנה', 'Mutable')];
const MODE_TEXT: Record<string, L> = {
  '0-0': x('שניכם יוזמים ומובילים: הרבה אנרגיה, אבל שני "מנהלים" — כדאי לחלק תחומים.', 'Both initiators: lots of energy, but two "bosses" — divide your domains.'),
  '1-1': x('שניכם קבועים ונאמנים: קשר יציב מאוד, אבל כשיש מחלוקת אף אחד לא מוותר.', 'Both fixed and loyal: very stable, but in a dispute nobody yields.'),
  '2-2': x('שניכם גמישים וסקרנים: קליל ומגוון, אבל חסר לפעמים מי שיחליט ויסגור.', 'Both flexible and curious: light and varied, but sometimes nobody decides.'),
  '0-1': x('יוזם וקבוע: אחד פותח דרכים, השני שומר על מה שנבנה. חלוקת תפקידים טובה.', 'Initiator and stabilizer: one opens paths, the other keeps what is built. A good division.'),
  '0-2': x('יוזם וגמיש: אחד מוביל, השני מתאים את עצמו ומוסיף רעיונות. זרימה טובה.', 'Initiator and adapter: one leads, the other adapts and adds ideas. Good flow.'),
  '1-2': x('קבוע וגמיש: יציבות מול שינוי. אחד מעגן, השני מרענן — אם מקבלים את השוני.', 'Fixed and mutable: stability versus change. One anchors, the other refreshes — if you accept the difference.'),
};
function modeParam(a: ZodiacSign, b: ZodiacSign): Param {
  const ma = ZODIAC.findIndex((z) => z.id === a.id) % 3, mb = ZODIAC.findIndex((z) => z.id === b.id) % 3;
  const k = [ma, mb].sort().join('-');
  return {
    group: 'western', key: 'western-mode', label: x('איכות המזלות', 'Sign modes'),
    detail: both((l) => and(MODE[ma][l], MODE[mb][l], l)), score: ma === mb ? 58 : 78, text: MODE_TEXT[k],
  };
}

/* ---------- סיני ---------- */
const CH_EL = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
function chineseAnimalParam(a: Profile, b: Profile): Param {
  const ia = a.chinese.index, ib = b.chinese.index, s = chineseScore(ia, ib);
  const text = ia === ib ? x('אותה חיה: אותם ערכים ואותו קצב. מבינים זה את זה, לפעמים גם מתחרים.', 'Same animal: same values and pace. You understand — and sometimes compete with — each other.')
    : ia % 4 === ib % 4 ? x('שתי חיות מאותו משולש הרמוני בגלגל: חשיבה דומה ותמיכה הדדית טבעית.', 'Two animals of the same harmonious trine: similar thinking and natural mutual support.')
    : Math.abs(ia - ib) === 6 ? x('חיות מנוגדות בגלגל (עימות): משיכה של הפכים, אבל גם מאבקי כוח. צריך הרבה כבוד הדדי.', 'Opposite animals (clash): attraction of opposites, but power struggles too. Needs much respect.')
    : s === 85 ? x('"חברים סודיים" בגלגל הסיני: זוג שמשלים זה את זה בשקט ובנאמנות.', '"Secret friends" on the Chinese wheel: a pair that quietly, loyally complete each other.')
    : x('קשר ניטרלי בגלגל: לא הרמוני במיוחד ולא מתנגש — תלוי בכם.', 'A neutral link on the wheel: neither especially harmonious nor clashing — it\'s up to you.');
  return { group: 'chinese', key: 'chinese-animal', label: x('החיות', 'The animals'),
    detail: both((l) => and(`${a.chinese.animal.emoji} ${a.chinese.animal.name[l]}`, `${b.chinese.animal.emoji} ${b.chinese.animal.name[l]}`, l)), score: s, text };
}
function chineseElementParam(a: Profile, b: Profile): Param {
  const ea = CH_EL.indexOf(a.chinese.element.en), eb = CH_EL.indexOf(b.chinese.element.en);
  let score = 65, text: L;
  if (ea === eb) { score = 75; text = x('אותו יסוד סיני: הבנה והרמוניה, עם מעט אתגר.', 'Same Chinese element: understanding and harmony, with little challenge.'); }
  else if ((ea + 1) % 5 === eb || (eb + 1) % 5 === ea) {
    score = 88;
    const giver = (ea + 1) % 5 === eb ? a : b, taker = giver === a ? b : a;
    text = both((l) => l === 'he'
      ? `מחזור ההזנה: יסוד ה${giver.chinese.element.he} של ${giver.name} מזין את יסוד ה${taker.chinese.element.he} של ${taker.name}. אחד נותן כוח, השני פורח.`
      : `The nourishing cycle: ${giver.name}'s ${giver.chinese.element.en} feeds ${taker.name}'s ${taker.chinese.element.en}. One gives strength, the other flourishes.`);
  } else {
    score = 48;
    const ctrl = (ea + 2) % 5 === eb ? a : b, other = ctrl === a ? b : a;
    text = both((l) => l === 'he'
      ? `מחזור הריסון: יסוד ה${ctrl.chinese.element.he} של ${ctrl.name} מרסן את יסוד ה${other.chinese.element.he} של ${other.name}. יכול להגביל — או לתת מסגרת בריאה.`
      : `The controlling cycle: ${ctrl.name}'s ${ctrl.chinese.element.en} restrains ${other.name}'s ${other.chinese.element.en}. It can limit — or give healthy structure.`);
  }
  return { group: 'chinese', key: 'chinese-el', label: x('מחזור חמשת היסודות', 'Five-element cycle'),
    detail: both((l) => and(a.chinese.element[l], b.chinese.element[l], l)), score, text: text! };
}
function yinYangParam(a: Profile, b: Profile): Param {
  const same = a.chinese.polarity.en === b.chinese.polarity.en;
  return { group: 'chinese', key: 'chinese-yy', label: x('יין ויאנג', 'Yin and yang'),
    detail: both((l) => and(a.chinese.polarity[l], b.chinese.polarity[l], l)), score: same ? 62 : 84,
    text: same ? x('אותה קוטביות: אותו סגנון אנרגיה — פעיל או קולט. נוח, אבל צריך לדאוג לאיזון.', 'Same polarity: the same energy style — active or receptive. Comfortable, but mind the balance.')
      : x('יין ויאנג משלימים: אחד פעיל ויוזם, השני קולט ומעמיק. איזון קלאסי.', 'Yin and yang complete each other: one active, the other receptive. Classic balance.') };
}

/* ---------- נומרולוגיה ---------- */
const NUM_GROUP: L[] = [x('הוגים עצמאיים (1, 5, 7)', 'independent thinkers (1, 5, 7)'), x('בונים מעשיים (2, 4, 8)', 'practical builders (2, 4, 8)'), x('יוצרים ונותנים (3, 6, 9)', 'creators and givers (3, 6, 9)')];
const grp = (n: number) => [[1, 5, 7], [2, 4, 8], [3, 6, 9]].findIndex((g) => g.includes(reduceNumber(n, false)));
function numParam(key: string, label: L, na: number, nb: number): Param {
  const s = numberScore(na, nb), ga = grp(na), gb = grp(nb);
  const text = reduceNumber(na, false) === reduceNumber(nb, false)
    ? x('אותו מספר: מטרות וקצב דומים. חשוב לשמור שלא יהיה "יותר מדי מאותו דבר".', 'The same number: similar goals and pace. Watch for "too much of the same".')
    : ga === gb ? both((l) => l === 'he' ? `שניכם מקבוצת ה${NUM_GROUP[ga].he} — ערכים משותפים והבנה טבעית.` : `Both of you are ${NUM_GROUP[ga].en} — shared values and natural understanding.`)
      : both((l) => l === 'he' ? `${NUM_GROUP[ga].he.split(' (')[0]} מול ${NUM_GROUP[gb].he.split(' (')[0]}: גישות שונות לחיים, שיכולות להעשיר זו את זו.` : `${NUM_GROUP[ga].en.split(' (')[0]} meets ${NUM_GROUP[gb].en.split(' (')[0]}: different approaches that can enrich each other.`);
  return { group: 'numbers', key, label, detail: both((l) => `${na} ${l === 'he' ? 'ו־' : '& '}${nb}`), score: s, text };
}

const ADVICE: Record<string, L> = {
  el: x('דברו על הצרכים השונים שלכם בגלוי — מה שטבעי לאחד לא מובן מאליו לשני.', 'Talk openly about your different needs — what is natural to one isn\'t obvious to the other.'),
  asp: x('כשיש חיכוך, זכרו שהוא גם מקור לצמיחה. קבעו כללי "ויכוח הוגן".', 'When there is friction, remember it also drives growth. Agree on "fair fight" rules.'),
  mode: x('חלקו תחומי אחריות ברורים כדי לא להתנגש על מי מחליט.', 'Split clear areas of responsibility so you don\'t clash over who decides.'),
  animal: x('הימנעו ממאבקי כוח: תנו לכל אחד תחום שבו הוא מוביל.', 'Avoid power struggles: give each of you an area to lead.'),
  cel: x('שימו לב שהמסגרת לא תהפוך למגבלה — שאלו מה השני צריך כדי לפרוח.', 'Make sure structure doesn\'t become restriction — ask what the other needs to flourish.'),
  yy: x('דאגו לאיזון בין פעילות למנוחה, בין יציאה החוצה לזמן שקט.', 'Balance activity and rest, going out and quiet time.'),
  num: x('כבדו את הדרך השונה של השני להגיע למטרה.', 'Respect the other\'s different way of reaching goals.'),
};
const adviceKey = (k: string) => k.endsWith('-el') && k.startsWith('chinese') ? 'cel' : k.split('-').pop() === 'animal' ? 'animal' : k.endsWith('-yy') ? 'yy' : k.endsWith('-mode') ? 'mode' : k.endsWith('-asp') ? 'asp' : k.startsWith('num') ? 'num' : 'el';
export const adviceFor = (p: Param): L => ADVICE[adviceKey(p.key)];

export function deepCompat(a: Profile, b: Profile): DeepCompat {
  const params: Param[] = [
    elementParam('western', a.western, b.western), aspectParam('western', a.western, b.western), modeParam(a.western, b.western),
    elementParam('hebrew', a.hebrew.sign, b.hebrew.sign), aspectParam('hebrew', a.hebrew.sign, b.hebrew.sign),
    chineseAnimalParam(a, b), chineseElementParam(a, b), yinYangParam(a, b),
    numParam('num-life', x('מספרי דרך החיים', 'Life path numbers'), a.lifePath, b.lifePath),
    numParam('num-name', x('מספרי השם', 'Name numbers'), a.nameNum.number, b.nameNum.number),
  ];
  const groups = (Object.keys(GROUP_LABEL) as Group[]).map((id) => ({ id, label: GROUP_LABEL[id], score: avg(params.filter((p) => p.group === id).map((p) => p.score)) }));
  const total = avg(groups.map((g) => g.score));
  const sorted = [...params].sort((p, q) => q.score - p.score);
  const cn = reduceNumber(a.lifePath + b.lifePath);
  return {
    total, groups, params,
    strengths: sorted.filter((p) => p.score >= 75).slice(0, 3),
    challenges: sorted.filter((p) => p.score <= 58).slice(-3).reverse(),
    couple: { n: cn, title: NUMBER_MEANINGS[cn].title, text: NUMBER_MEANINGS[cn].text },
  };
}


