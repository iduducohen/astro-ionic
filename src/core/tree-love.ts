/**
 * tree-love.ts — מפת נשמות זוגית על עץ החיים.
 * מודל פרשני אחד ועקבי. אין כאן פסיקה דתית ואין תחזית שאפשר לאמת.
 * דרך החיים והשם: מספר מצומצם 1–9 → כתר…יסוד (כמו בעמוד האישי). מלכות אינה מספר לידה.
 * אות ראשונה: הנתיב של האות בעץ, כסיפור ולא כשיוך מחייב.
 * חודש עברי: אות ספר יצירה. אדר א׳ ואדר ב׳ נושאים את אות אדר.
 * שעה אינה נכנסת לחישוב. רק "אחרי השקיעה" מזיז את התאריך העברי ביום.
 */
import { hebrewDate, joinAnd, lifePath, nameNumber, parseDate, ZODIAC, type L } from './astro';
import { MONTH_LETTER, PATHS22, sephira, sephiraForNumber, type SephiraId, type TreePath, type TreeSephira } from './tree';

const x = (he: string, en: string): L => ({ he, en });

export const SEPHIRA_VOICE: Record<SephiraId, L> = {
  keter: x('חזון, משמעות ותחושת ייעוד', 'vision, meaning and a sense of purpose'),
  chokhmah: x('יוזמה, השראה וספונטניות', 'initiative, inspiration and spontaneity'),
  binah: x('הבנה, הכלה ובניית יציבות', 'understanding, holding and the building of stability'),
  chesed: x('אהבה, נדיבות ונתינה', 'love, generosity and giving'),
  gevurah: x('גבולות, עצמאות ומשמעת', 'boundaries, independence and discipline'),
  tiferet: x('הרמוניה, חמלה ואיזון בין הלב לשכל', 'harmony, compassion and a balance of heart and mind'),
  netzach: x('התמדה, תשוקה וחתירה למטרה', 'persistence, desire and a reach toward a goal'),
  hod: x('תקשורת, הקשבה וענווה', 'communication, listening and humility'),
  yesod: x('אינטימיות, אמון וחיבור', 'intimacy, trust and connection'),
  malkhut: x('מימוש, בית ושותפות ביום־יום', 'making it real: a home and a partnership in daily life'),
};

const LESSON: Record<SephiraId, L> = {
  keter: x('ללמוד לרצות יחד משהו גדול משני הרצונות הנפרדים.', 'Learning to want, together, something larger than the two separate wills.'),
  chokhmah: x('לתת להברקה של אחד מהם מקום, גם כשאין לה עדיין הסבר.', 'Giving one person\'s spark a place, even before it can be explained.'),
  binah: x('להאט, להקשיב עד הסוף, ולבנות לאט.', 'Slowing down, listening to the end, and building slowly.'),
  chesed: x('לתת בלי לספור, ולקבל בלי להרגיש חוב.', 'Giving without counting, and receiving without feeling a debt.'),
  gevurah: x('לומר "עד כאן" באהבה, בלי להפוך גבול לריחוק.', 'Saying "this far" with love, without turning a boundary into distance.'),
  tiferet: x('לדבר ביושר ולחפש את הדרך ששני הצדדים יכולים לעמוד בה.', 'Speaking honestly and looking for a way both can stand in.'),
  netzach: x('להמשיך לבחור זה בזה גם כשההתלהבות שוככת.', 'Keeping the choice of each other after the first enthusiasm fades.'),
  hod: x('להגיד תודה על מה שהצד השני נותן, ובקול רם.', 'Thanking the other, out loud, for what they give.'),
  yesod: x('לבנות אמון במעשים קטנים שחוזרים, לא בהבטחה אחת.', 'Building trust in small acts that repeat, not in a single promise.'),
  malkhut: x('להפוך את מה שמרגישים לבית, לסידור ולמעשה של יום חול.', 'Turning what you feel into a home, a rhythm and an ordinary-day deed.'),
};

/** קריאה יצירתית לאות. לא שיוך מסורתי של האות לאופי. */
const LETTER_GLANCE: Record<string, L> = {
  א: x('נשימה ואחדות: רווח בין שני כוחות', 'breath and unity: a pause between two forces'),
  ב: x('בית: מקום שמחזיק את מה שנכנס', 'a house: a place that holds what enters'),
  ג: x('גשר: תנועה שמחברת שני צדדים', 'a bridge: motion that joins two sides'),
  ד: x('דלת: סף, פתיחה והזמנה', 'a door: a threshold, an opening, an invitation'),
  ה: x('דיבור שיוצא מהנשימה', 'speech leaving the breath'),
  ו: x('וו שמחבר: "וגם", לא "או"', 'a hook that joins: "and", not "or"'),
  ז: x('הבחנה: חיתוך שמבהיר', 'discernment: a cut that clarifies'),
  ח: x('גדר חיה: מרחב פנימי שמוגן', 'a living fence: an inner space that is kept'),
  ט: x('טוב שמוסתר ומבשיל לאט', 'a hidden good that ripens slowly'),
  י: x('נקודה: הניצוץ הקטן שממנו מתחיל', 'a point: the small spark a thing starts from'),
  כ: x('כף: היכולת להחזיק ולתת צורה', 'a palm: the ability to hold and to give form'),
  ל: x('למידה שמגביהה', 'learning that reaches upward'),
  מ: x('עומק: תהליך רגשי שלוקח זמן', 'depth: an emotional process that takes time'),
  נ: x('ירידה וחזרה: המשכיות', 'a descent and a return: continuity'),
  ס: x('סומך: מעגל שמחזיק', 'a support: a circle that holds'),
  ע: x('עין: לראות את מה שלא נאמר', 'an eye: seeing what was not said'),
  פ: x('פה: מה שמבקש לצאת בדיבור', 'a mouth: what asks to come out in speech'),
  צ: x('חיפוש שיש לו כיוון', 'a search that has a direction'),
  ק: x('מה שמאחורי הפנים: שמחה שמזיזה מצב', 'what is behind the face: a joy that moves a situation'),
  ר: x('ראש: התחלה ופנים שפונות קדימה', 'a head: a beginning, a face turned forward'),
  ש: x('אש: שינוי שאי אפשר לעשות בלי חום', 'fire: a change that cannot happen without heat'),
  ת: x('תו: חותם, סיום והסכמה', 'a mark: a seal, an ending, an agreement'),
};

export const TREE_LOVE_METHOD: L = x(
  'זו שיטה אחת קבועה, והיא מודל פרשני: אין מסורת קבלית מוסכמת שמחשבת לכל אדם "ספירת דרך חיים". מספר דרך החיים, סכום ספרות תאריך הלידה, מוצג גם כמספר מאסטר אם יש, ואז מצומצם ל־1–9 וממופה לכתר עד יסוד. מלכות אינה מספר לידה במודל הזה; היא הקומה שבה הקשר חי בבית וביום־יום. ספירת השם היא הגימטריה הרגילה של האותיות העבריות, באותה מפה. אם אין בשם אות עברית, נלקח המספר הלטיני והדבר נאמר בקריאה. האות הראשונה בשם נקראת כנתיב בעץ, כסיפור ולא כשיוך אופי מחייב. חודש הלידה העברי מביא את אות ספר יצירה. בשנה מעוברת אדר א׳ ואדר ב׳ נושאים את אות אדר, קו״ף, כי הספר מונה שנים־עשר חודשים. שעת הלידה אינה נכנסת לחישוב. רק סימון "אחרי השקיעה" מזיז את התאריך העברי ביום אחד.',
  'One fixed method, and it is an interpretive model: there is no single agreed Kabbalistic rule that assigns a life-path sephira from a birth date. The life-path number, the sum of the birth-date digits, is shown as a master number when it is one, then reduced to 1–9 and mapped from Keter to Yesod. Malkhut is not a birth number in this model; it is the floor where the bond is lived, at home and on an ordinary day. The name sephira is the ordinary gematria of the Hebrew letters, on the same map. If the name has no Hebrew letter, the Latin number is used and the reading says so. The first letter of the name is read as a path on the Tree, a story rather than a binding trait. The Hebrew birth month brings the letter of Sefer Yetzirah. In a leap year Adar I and Adar II both carry the letter of Adar, Qoph, because the book counts twelve months. Birth time is not part of the calculation. Only "after sunset" moves the Hebrew date by one day.',
);

export const TREE_LOVE_DISCLAIMER: L = x(
  'קריאה רוחנית להשראה ולהיכרות. לא פסיקה דתית, ולא תחזית שאפשר לאמת. אי אפשר להסיק ממנה אם הקשר יצליח.',
  'A spiritual reading for inspiration and for knowing each other. Not a religious ruling, and not a forecast that can be verified. It cannot say whether the relationship will succeed.',
);

export interface TreeLoveInput { name: string; birth: string; sunset: boolean }

export interface TreeLovePerson {
  name: string;
  lifeNumber: number;
  life: TreeSephira;
  nameNumber: number;
  nameFromHebrew: boolean;
  nameSeph: TreeSephira;
  first: { letter: string; path: TreePath } | null;
  monthId: string;
  month: L;
  sign: L;
  letter: string;
  letterName: L;
  sense: L;
  leapAdar: boolean;
}

export interface TreePairFace {
  a: TreeSephira;
  b: TreeSephira;
  title: L;
  attraction: L;
  challenge: L;
  repair: L;
  potential: L;
}

export interface TreeLoveReading {
  people: [TreeLovePerson, TreeLovePerson];
  life: TreePairFace;
  names: TreePairFace;
  bond: { kicker: L; title: L; text: L };
  tension: { kicker: L; title: L; text: L };
  lesson: { kicker: L; title: L; text: L };
  potential: { kicker: L; title: L; text: L };
  outlook: { kicker: L; title: L; text: L };
  letters: L;
  months: L;
  insights: [L, L, L];
  method: L;
  disclaimer: L;
}

const FINALS: Record<string, string> = { ך: 'כ', ם: 'מ', ן: 'נ', ף: 'פ', ץ: 'צ' };

function firstLetter(name: string): { letter: string; path: TreePath } | null {
  for (const ch of name) {
    const letter = FINALS[ch] ?? ch;
    const path = PATHS22.find((p) => p.letter === letter);
    if (path) return { letter, path };
  }
  return null;
}

function opposed(a: TreeSephira, b: TreeSephira): boolean {
  return (a.pillar === 'right' && b.pillar === 'left') || (a.pillar === 'left' && b.pillar === 'right');
}

function face(a: TreeSephira, b: TreeSephira, nameA: string, nameB: string): TreePairFace {
  const same = a.id === b.id;
  const title = same
    ? x(a.name.he, a.name.en)
    : x(`${a.name.he} + ${b.name.he}`, `${a.name.en} + ${b.name.en}`);
  const pairHe = joinAnd(nameA, nameB, 'he');
  const pairEn = joinAnd(nameA, nameB, 'en');
  const attraction = same
    ? x(
      `${pairHe} חולקים את מידת ${a.name.he}: ${SEPHIRA_VOICE[a.id].he}. כשהשפה זהה, כדאי להכניס במודע מידה שחסרה לשניכם.`,
      `${pairEn} share the quality of ${a.name.en}: ${SEPHIRA_VOICE[a.id].en}. When the language is the same, bring in on purpose a quality you both lack.`,
    )
    : x(
      `${nameA} מביא את מידת ${a.name.he}: ${SEPHIRA_VOICE[a.id].he}. ${nameB} מביא את מידת ${b.name.he}: ${SEPHIRA_VOICE[b.id].he}.`,
      `${nameA} brings the quality of ${a.name.en}: ${SEPHIRA_VOICE[a.id].en}. ${nameB} brings the quality of ${b.name.en}: ${SEPHIRA_VOICE[b.id].en}.`,
    );
  const challenge = same
    ? x(
      `הקושי המשותף של ${a.name.he}: ${a.challenge.he}`,
      `The shared difficulty of ${a.name.en}: ${a.challenge.en}`,
    )
    : x(
      `אצל ${nameA}: ${a.challenge.he} אצל ${nameB}: ${b.challenge.he}`,
      `For ${nameA}: ${a.challenge.en} For ${nameB}: ${b.challenge.en}`,
    );
  const repair = opposed(a, b)
    ? x(
      `התיקון הסמלי עובר בעמוד האמצע: ${a.name.he} לא בולע את ${b.name.he}, ו${b.name.he} לא מבטל את ${a.name.he}.`,
      `The symbolic repair passes through the middle pillar: ${a.name.en} does not swallow ${b.name.en}, and ${b.name.en} does not cancel ${a.name.en}.`,
    )
    : same
      ? x(
        `התיקון הוא לא להישאר רק ב${a.name.he}. מידה אחת, כשהיא לבד, נעשית צרה.`,
        `The repair is not to stay only in ${a.name.en}. One quality, left alone, grows narrow.`,
      )
      : x(
        `התיקון הוא לתת ל${a.name.he} מקום משלו ול${b.name.he} מקום משלו, ואז לבחור צעד אחד ששתיהן יכולות לעמוד מאחוריו.`,
        `The repair is to give ${a.name.en} its own place and ${b.name.en} its own place, then choose one step both can stand behind.`,
      );
  const potential = x(
    `הקשר יכול להחזיק את ${SEPHIRA_VOICE[a.id].he} יחד עם ${SEPHIRA_VOICE[b.id].he}, כשכל צד מזהה את המידה של השני כשפה ולא כהפרעה.`,
    `The bond can hold ${SEPHIRA_VOICE[a.id].en} together with ${SEPHIRA_VOICE[b.id].en}, when each person meets the other's quality as a language rather than a disturbance.`,
  );
  return { a, b, title, attraction, challenge, repair, potential };
}

function pathLine(a: TreeSephira, b: TreeSephira): L | null {
  if (a.id === b.id) return null;
  const path = PATHS22.find((p) => (p.from === a.id && p.to === b.id) || (p.from === b.id && p.to === a.id));
  if (path) {
    const from = sephira(path.from);
    const to = sephira(path.to);
    return x(
      `בין ${a.name.he} ל${b.name.he} עובר נתיב ${path.n}, אות ${path.letterName.he}, מ${from.name.he} אל ${to.name.he}. בעץ זה קו ישיר.`,
      `Between ${a.name.en} and ${b.name.en} runs path ${path.n}, the letter ${path.letterName.en}, from ${from.name.en} to ${to.name.en}. On the Tree this is a direct line.`,
    );
  }
  return x(
    `אין קו ישיר בין ${a.name.he} ל${b.name.he}. החיבור נבנה דרך ספירות שבדרך.`,
    `There is no direct line between ${a.name.en} and ${b.name.en}. The bond is built through sephirot along the way.`,
  );
}

function joinText(a: L, b: L | null): L {
  if (!b) return a;
  return x(`${a.he} ${b.he}`, `${a.en} ${b.en}`);
}

function person(input: TreeLoveInput): TreeLovePerson {
  const d = parseDate(input.birth);
  if (!d) throw new Error('bad date');
  const lifeNumber = lifePath(d[0], d[1], d[2]);
  const g = nameNumber(input.name);
  const he = hebrewDate(d[0], d[1], d[2], input.sunset);
  const ml = MONTH_LETTER[he.month.id];
  const path = PATHS22.find((p) => p.letter === ml.letter)!;
  const sign = ZODIAC.find((z) => z.id === he.sign.id)!;
  return {
    name: input.name,
    lifeNumber,
    life: sephira(sephiraForNumber(lifeNumber)),
    nameNumber: g.number,
    nameFromHebrew: g.gematria > 0 && g.latin === 0,
    nameSeph: sephira(sephiraForNumber(g.number || 1)),
    first: firstLetter(input.name),
    monthId: he.month.id,
    month: he.month.name,
    sign: sign.name,
    letter: ml.letter,
    letterName: path.letterName,
    sense: ml.sense,
    leapAdar: he.month.id === 'adar1' || he.month.id === 'adar2',
  };
}

function oneLetter(p: TreeLovePerson): L {
  if (!p.first) {
    return x(
      `בשם ${p.name} אין אות עברית, ולכן אין כאן נתיב של אות ראשונה.`,
      `${p.name} has no Hebrew letter, so there is no first-letter path here.`,
    );
  }
  const from = sephira(p.first.path.from);
  const to = sephira(p.first.path.to);
  const glance = LETTER_GLANCE[p.first.letter];
  return x(
    `${p.name}: ${p.first.letter} ${p.first.path.letterName.he}, נתיב ${p.first.path.n} בין ${from.name.he} ל${to.name.he}. בקריאה הזו האות מסמנת ${glance.he}.`,
    `${p.name}: ${p.first.letter} ${p.first.path.letterName.en}, path ${p.first.path.n} between ${from.name.en} and ${to.name.en}. In this reading the letter marks ${glance.en}.`,
  );
}

function letterStory(a: TreeLovePerson, b: TreeLovePerson): L {
  const left = oneLetter(a);
  const right = oneLetter(b);
  return x(
    `${left.he} ${right.he} זו קריאה יצירתית של האות הראשונה, לא שיוך מסורתי מחייב של אות לאופי.`,
    `${left.en} ${right.en} This is a creative reading of the first letter, not a binding traditional assignment of a letter to a character.`,
  );
}

function monthStory(a: TreeLovePerson, b: TreeLovePerson): L {
  const line = (p: TreeLovePerson) => x(
    `${p.name} נולד ב${p.month.he} (${p.sign.he}). אות החודש לפי ספר יצירה היא ${p.letter} ${p.letterName.he}, וכוחה כאן: ${p.sense.he}.`,
    `${p.name} was born in ${p.month.en} (${p.sign.en}). The month's letter in Sefer Yetzirah is ${p.letter} ${p.letterName.en}, and its force here is ${p.sense.en}.`,
  );
  const la = line(a);
  const lb = line(b);
  const same = a.monthId === b.monthId;
  const gate = same
    ? x('שניכם נולדתם באותו שער חודשי.', 'You were both born in the same monthly gate.')
    : x('החודשים פותחים שערים שונים. אי אפשר להסיק מהם לבדם אם הקשר יצליח.', 'The months open different gates. They cannot, by themselves, say whether the bond will succeed.');
  const leap = a.leapAdar || b.leapAdar
    ? x(' בשנה מעוברת אדר א׳ ואדר ב׳ נושאים כאן את אות אדר.', ' In a leap year Adar I and Adar II both carry the letter of Adar here.')
    : x('', '');
  return x(`${la.he} ${lb.he} ${gate.he}${leap.he}`, `${la.en} ${lb.en} ${gate.en}${leap.en}`);
}

export function treeLove(a: TreeLoveInput, b: TreeLoveInput): TreeLoveReading {
  const pa = person(a);
  const pb = person(b);
  const life = face(pa.life, pb.life, pa.name, pb.name);
  const names = face(pa.nameSeph, pb.nameSeph, pa.name, pb.name);
  const nameNote: L | null = pa.nameFromHebrew && pb.nameFromHebrew
    ? null
    : x(
      'ספירת שם בלי אותיות עבריות מחושבת כאן מהמספר הלטיני, לא מגימטריה.',
      'A name sephira without Hebrew letters is taken here from the Latin number, not from gematria.',
    );
  const tensionFace = opposed(life.a, life.b) ? life : opposed(names.a, names.b) ? names : life;
  const shared = sephira(sephiraForNumber(pa.lifeNumber + pb.lifeNumber));
  const pairHe = joinAnd(pa.name, pb.name, 'he');
  const pairEn = joinAnd(pa.name, pb.name, 'en');
  return {
    people: [pa, pb],
    life,
    names: { ...names, attraction: joinText(names.attraction, nameNote) },
    bond: {
      kicker: x('החיבור המרכזי', 'The central bond'),
      title: life.title,
      text: joinText(life.attraction, pathLine(pa.life, pb.life)),
    },
    tension: {
      kicker: x('האתגר המרכזי', 'The central challenge'),
      title: tensionFace.title,
      text: joinText(tensionFace.challenge, x(tensionFace.repair.he, tensionFace.repair.en)),
    },
    lesson: {
      kicker: x('השיעור המשותף', 'The shared lesson'),
      title: x(shared.name.he, shared.name.en),
      text: LESSON[shared.id],
    },
    potential: {
      kicker: x('הפוטנציאל', 'The potential'),
      title: x('מה אפשר לבנות מכאן', 'What can be built from here'),
      text: life.potential,
    },
    outlook: {
      kicker: x('תחזית סמלית', 'A symbolic outlook'),
      title: x('שאלה, לא אירוע', 'A question, not an event'),
      text: x(
        `במקום לקבוע מה יקרה, השאלה לתקופה הקרובה היא אם ${pa.sense.he} של ${pa.name} פוגש את ${pb.sense.he} של ${pb.name}. שיחה שבה כל אחד אומר מה גורם לו להרגיש אהוב היא הצעד הבא.`,
        `Rather than deciding what will happen, the question for the near term is whether ${pa.name}'s ${pa.sense.en} meets ${pb.name}'s ${pb.sense.en}. A talk in which each person says what makes them feel loved is the next step.`,
      ),
    },
    letters: letterStory(pa, pb),
    months: monthStory(pa, pb),
    insights: [
      x(
        `מה מחבר: ${pairHe} נפגשים ב${life.title.he}.`,
        `What joins you: ${pairEn} meet in ${life.title.en}.`,
      ),
      x(
        `מה להבין: אצל ${pb.name} האהבה עוברת דרך מידת ${pb.life.name.he} — ${SEPHIRA_VOICE[pb.life.id].he}. אצל ${pa.name} היא עוברת דרך מידת ${pa.life.name.he} — ${SEPHIRA_VOICE[pa.life.id].he}.`,
        `What to understand: for ${pb.name}, love moves through ${pb.life.name.en} — ${SEPHIRA_VOICE[pb.life.id].en}. For ${pa.name}, it moves through ${pa.life.name.en} — ${SEPHIRA_VOICE[pa.life.id].en}.`,
      ),
      x(
        'השבוע: עשר דקות שבהן כל אחד משלים את המשפט "אני מרגיש אהוב כש".',
        'This week: ten minutes in which each person finishes the sentence "I feel loved when".',
      ),
    ],
    method: TREE_LOVE_METHOD,
    disclaimer: TREE_LOVE_DISCLAIMER,
  };
}
