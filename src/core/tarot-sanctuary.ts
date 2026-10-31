/**
 * tarot-sanctuary.ts — הטקסטים של מסך הטארוט: קלף יומי, איך זה עובד, אודות ושאלות.
 * הניסוח מקורי. המבנה שואב השראה מעמודי תוכן של קריאת קלפים, לא מהניסוח של אתר אחר.
 */
import type { L } from './astro';
import type { Topic } from './tarot-deep';

const x = (he: string, en: string): L => ({ he, en });

export interface SanctuaryStep { n: string; title: L; text: L }
export interface SanctuaryFaq { q: L; a: L }
export interface SanctuaryPrompt { topic: Topic; label: L; question: L }
export interface SanctuaryLink { path: string; mark: string; title: L; text: L }
export interface SanctuaryPractice { kind: L; text: L }

export const SANCTUARY = {
  kicker: x('הארקנה הגדולה · 22 קלפים', 'The Major Arcana · 22 cards'),
  title: x('קריאה בקלפים, כמו במקדש שקט', 'A card reading, like a quiet temple'),
  lead: x(
    'שאלה אחת, חפיסה של הארקנה הגדולה, ופירוש שנקרא לפי המקום של כל קלף. הקלפים מציעים מראה. הם לא מחליטים במקומך.',
    'One question, a Major Arcana deck, and a reading by each card’s place. The cards offer a mirror. They do not decide for you.',
  ),
  reversedHelp: x(
    'קלף הפוך הוא אותו קלף, כשהאנרגיה שלו חסומה, חלשה או מופנית פנימה. בלי הסימון נקראים רק קלפים ישרים.',
    'A reversed card is the same card, with its energy blocked, weakened or turned inward. Without this, only upright cards are read.',
  ),
  prompts: [
    { topic: 'love', label: x('מה חשוב לי להבין על הקשר?', 'What should I understand about the relationship?'), question: x('מה חשוב לי להבין על הקשר שלי עכשיו?', 'What do I need to understand about my relationship now?') },
    { topic: 'work', label: x('מה יעזור לי בעבודה?', 'What would help my work?'), question: x('מה יעזור לי בעבודה בחודשים הקרובים?', 'What would help my work in the coming months?') },
    { topic: 'general', label: x('על מה להתמקד החודש?', 'What should I focus on this month?'), question: x('על מה כדאי לי להתמקד החודש?', 'What should I focus on this month?') },
    { topic: 'self', label: x('מה יעזור לי להחליט?', 'What would help me decide?'), question: x('מה יעזור לי לבחור נכון?', 'What would help me choose well?') },
  ] as SanctuaryPrompt[],
  steps: [
    {
      n: 'א',
      title: x('מנסחים שאלה אחת', 'Phrase one question'),
      text: x(
        'נושא אחד. משפט קצר. "מה" ו"איך" נותנים כיוון. שאלה שמערבבת עבודה, כסף וזוגיות מקבלת תשובה מפוזרת.',
        'One subject. A short sentence. "What" and "how" give a direction. A question that mixes work, money and love gets a scattered answer.',
      ),
    },
    {
      n: 'ב',
      title: x('החפיסה מתערבבת', 'The deck is shuffled'),
      text: x(
        '22 הקלפים נשלפים בלי חזרה. אפשר לכלול קלף הפוך: אותה אנרגיה, כשהיא חסומה או מופנית פנימה.',
        'The 22 cards are drawn without repeats. A reversed card is allowed: the same energy, blocked or turned inward.',
      ),
    },
    {
      n: 'ג',
      title: x('קוראים לפי המקום', 'Read by position'),
      text: x(
        'הופכים כל קלף. הפירוש מחבר את משמעות הקלף למקום שלו בפריסה ולנושא שבחרת. בסוף מופיעה תמצית הפריסה.',
        'Turn each card. The reading joins the card’s meaning to its place in the spread and to the subject you chose. A quintessence closes the spread.',
      ),
    },
  ] as SanctuaryStep[],
  about: [
    x(
      '22 קלפי הארקנה הגדולה מתארים מסע: מהשוטה, שעומד בתחילת הדרך, ועד העולם, שמעגל נסגר בו. כל קלף כאן נושא גם הקבלה מהמסורת של השחר המוזהב — כוכב, מזל או יסוד — וגם אות עברית ונתיב על עץ החיים.',
      'The 22 Major Arcana describe a journey: from the Fool, standing at the start, to the World, where a circle closes. Each card here also carries a Golden Dawn correspondence — a planet, a sign or an element — and a Hebrew letter, a path on the Tree of Life.',
    ),
    x(
      'הפירוש לא מוצג כטקסט קבוע שנפרד מהשאלה. קלף ב"עבר" נקרא אחרת מקלף ב"עצה", ונושא של אהבה מביא שכבה אחרת מנושא של עבודה. זו התבוננות, לא חיזוי ולא הבטחה.',
      'The reading is not a fixed text detached from the question. A card in “past” is read differently from a card in “advice”, and a love subject brings a different layer from a work subject. This is reflection, not a forecast and not a promise.',
    ),
    x(
      'הערבוב והקריאה נעשים במכשיר. אין הרשמה, ואין שמירת השאלה בשרת. קלף היום נשאר זהה עד חצות, כדי שיהיה לאן לחזור.',
      'The shuffle and the reading happen on your device. There is no account, and the question is not stored on a server. Today’s card stays the same until midnight, so there is something to come back to.',
    ),
  ],
  faq: [
    {
      q: x('מה זו פתיחת קלפים כאן?', 'What is a card draw here?'),
      a: x(
        'פריסה לפי שאלה שכתבת. אפשר קלף אחד, שלושה (עבר, הווה, עתיד), ארבעה לזוגיות או חמישה לעצה. הקלפים נפתחים על המסך, והפירוש מתייחס למקום של כל אחד.',
        'A spread for a question you wrote. One card, three (past, present, future), four for a relationship, or five for guidance. The cards open on the screen, and the reading follows each position.',
      ),
    },
    {
      q: x('למה הפירוש לא זהה בכל פעם?', 'Why is the reading not the same every time?'),
      a: x(
        'החפיסה מתערבבת מחדש, והטקסט תלוי במקום של הקלף ובנושא. אותו קלף בעבר ובאתגר לא אומר אותו דבר. קלף היום, לעומת זאת, קבוע עד חצות.',
        'The deck is shuffled again, and the text depends on the card’s position and the subject. The same card in the past and in the challenge does not say the same thing. Today’s card, by contrast, stays fixed until midnight.',
      ),
    },
    {
      q: x('כמה קלפים לפתוח?', 'How many cards should I open?'),
      a: x(
        'קלף אחד נותן מסר קצר. שלושה מראים תנועה. ארבעה מתאימים לקשר. חמישה מתאימים כשיש שכבות: לב העניין, אתגר, שורש, עצה ותוצאה אפשרית.',
        'One card gives a short message. Three show a movement. Four suit a relationship. Five suit a layered situation: the heart of it, the challenge, the root, advice and a likely outcome.',
      ),
    },
    {
      q: x('מה זה קלף הפוך?', 'What is a reversed card?'),
      a: x(
        'אותו קלף, כשהאנרגיה שלו חסומה, מוגזמת או מופנית פנימה. אפשר לכבות את האפשרות ולקרוא רק קלפים ישרים.',
        'The same card, when its energy is blocked, overdone or turned inward. You can switch this off and read upright cards only.',
      ),
    },
    {
      q: x('האם זו תשובה ודאית?', 'Is this a certain answer?'),
      a: x(
        'לא. טארוט כאן הוא כלי להתבוננות. שאלה ממוקדת מקבלת פירוש שימושי יותר. אם משהו לא יושב, אפשר לנסח מחדש או לפתוח פריסה רחבה יותר. זו לא עצה רפואית, משפטית או פיננסית.',
        'No. Tarot here is a tool for reflection. A focused question gets a more useful reading. If something does not sit right, rephrase or open a wider spread. This is not medical, legal or financial advice.',
      ),
    },
    {
      q: x('איך זה מתחבר לקבלה?', 'How does this connect to Kabbalah?'),
      a: x(
        'לכל קלף יש אות עברית ונתיב בין שתי ספירות. במרחב התוכן אפשר לראות את האות, ובעץ החיים את המפה כולה.',
        'Each card has a Hebrew letter and a path between two Sephiroth. The content space shows the letter, and the Tree of Life shows the whole map.',
      ),
    },
  ] as SanctuaryFaq[],
  links: [
    { path: '/kabbalah', mark: 'עץ', title: x('עץ החיים', 'Tree of Life'), text: x('עשר הספירות, 22 הנתיבים, והאות של חודש הלידה.', 'Ten Sephiroth, 22 paths, and the letter of your birth month.') },
    { path: '/charts', mark: '☉', title: x('מפת לידה', 'Birth chart'), text: x('השמיים ברגע הלידה: מזלות, בתים וכוכבים.', 'The sky at birth: signs, houses and planets.') },
    { path: '/psychology', mark: 'נפש', title: x('מפת אישיות', 'Personality map'), text: x('MBTI, אניאגרם וחמש התכונות, כשכבה פנימית.', 'MBTI, Enneagram and the Big Five, as an inner layer.') },
    { path: '/me', mark: '☽', title: x('המפה שלי', 'My chart'), text: x('מזל, מספר דרך חיים וקלף הלידה במקום אחד.', 'Sign, life path and birth card in one place.') },
  ] as SanctuaryLink[],
  practices: [
    { kind: x('צעד', 'A step'), text: x('דקה אחת: כתוב לאן הצעד הבא הולך, בלי לתכנן את כל הדרך.', 'One minute: write where the next step goes, without planning the whole road.') },
    { kind: x('מיקוד', 'Focus'), text: x('בחר כלי אחד שכבר יש לך, ועשר נשימות לפני שמתחילים בו.', 'Pick one tool you already have, and ten breaths before you start with it.') },
    { kind: x('שקט', 'Quiet'), text: x('שלוש דקות בלי מסך. שאלה אחת בלבד: מה אני כבר יודע?', 'Three minutes without a screen. One question only: what do I already know?') },
    { kind: x('טיפוח', 'Nurture'), text: x('דבר אחד קטן שמזין אותך היום: מים, אוכל, הודעה טובה, או מנוחה.', 'One small thing that feeds you today: water, food, a kind message, or rest.') },
    { kind: x('מבנה', 'Structure'), text: x('כתוב כלל אחד להיום. קצר. כזה שאפשר לעמוד בו עד הערב.', 'Write one rule for today. Short. One you can keep until evening.') },
    { kind: x('לימוד', 'Learning'), text: x('שאל אדם אחד, או טקסט אחד, מה הוא כבר יודע על השאלה שלך.', 'Ask one person, or one text, what they already know about your question.') },
    { kind: x('בחירה', 'Choice'), text: x('כתוב שתי אפשרויות ומה כל אחת שומרת. בחר אחת עד מחר.', 'Write two options and what each one protects. Choose one by tomorrow.') },
    { kind: x('כיוון', 'Direction'), text: x('משפט אחד: לאן אני נוסע היום. תלה אותו איפה שהעין פוגשת.', 'One sentence: where I am heading today. Put it where the eye will meet it.') },
    { kind: x('רכות', 'Gentleness'), text: x('כשהדחף הוא ללחוץ, רכך את הלסת. נשימה ארוכה החוצה, ארבע פעמים.', 'When the urge is to push, soften the jaw. A long breath out, four times.') },
    { kind: x('פנס', 'A lantern'), text: x('עשר דקות לבד. כתוב רק את הצעד שנראה באור הקטן, לא את כל הלילה.', 'Ten minutes alone. Write only the step the small light shows, not the whole night.') },
    { kind: x('גלגל', 'The wheel'), text: x('סמן דבר אחד שזז היום לטובתך, גם אם הוא קטן. אל תדחוף את הגלגל.', 'Mark one thing that moved in your favor today, even if it is small. Do not push the wheel.') },
    { kind: x('מאזניים', 'Scales'), text: x('לפני תשובה: מה העובדות, ומה הפרשנות. שורה לכל אחד.', 'Before an answer: what are the facts, and what is the interpretation. One line each.') },
    { kind: x('השהיה', 'A pause'), text: x('אל תענה מיד. שעה אחת, או שינה אחת, ואז הסתכל על השאלה הפוך.', 'Do not answer at once. One hour, or one sleep, then look at the question upside down.') },
    { kind: x('שחרור', 'Release'), text: x('כתוב מה נגמר. קפל את הדף או מחק את השורה. זה הסיום להיום.', 'Write what has ended. Fold the page or delete the line. That is today’s ending.') },
    { kind: x('מידה', 'Measure'), text: x('בחר אמצע: לא הכול, ולא כלום. כוס מים בין שני קצוות.', 'Choose a middle: not everything, and not nothing. A glass of water between two extremes.') },
    { kind: x('שרשרת', 'A chain'), text: x('תן שם להרגל שמחזיק אותך. כתוב פעולה אחת שמרופפת חוליה.', 'Name the habit that holds you. Write one action that loosens a link.') },
    { kind: x('אוויר', 'Air'), text: x('צא החוצה לדקה. מה שנשבר לא צריך תיקון באותו הרגע. רק אוויר.', 'Step outside for a minute. What broke does not need a repair in the same moment. Just air.') },
    { kind: x('כוכב', 'A star'), text: x('כתוב תקווה אחת בלי הסבר. קרא אותה בקול פעם אחת.', 'Write one hope with no explanation. Read it aloud once.') },
    { kind: x('ערפל', 'Fog'), text: x('אל תחליט מתוך ערפל. רשום מה לא ברור, ודחה את ההחלטה למחר.', 'Do not decide inside fog. Write what is unclear, and leave the decision for tomorrow.') },
    { kind: x('אור', 'Light'), text: x('דבר אחד שכבר הצליח השבוע. אמור אותו, בלי להקטין.', 'One thing that already went well this week. Say it, without shrinking it.') },
    { kind: x('קריאה', 'A call'), text: x('משפט אחד: מה אני סולח לעצמי, ומה אני עונה לו היום.', 'One sentence: what I forgive myself, and what I answer to it today.') },
    { kind: x('מעגל', 'A circle'), text: x('סגור משימה אחת פתוחה. אחר כך דקה של שקט, בלי המשימה הבאה.', 'Close one open task. Then a minute of quiet, without the next task.') },
  ] as SanctuaryPractice[],
};

/** קלף יציב לאותו יום מקומי. מתחלף בחצות. */
export function dailyCardIndex(date = new Date()): number {
  const key = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  let h = key >>> 0;
  h = Math.imul(h ^ (h >>> 16), 0x7feb352d);
  h = Math.imul(h ^ (h >>> 15), 0x846ca68b);
  h = (h ^ (h >>> 16)) >>> 0;
  return h % 22;
}

export function dayStamp(date = new Date()): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
