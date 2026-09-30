/**
 * page-info.ts — מה כל מסך עושה, בקצרה ובהרחבה.
 * התקציר מוצג בראש המסך; ה"קרא עוד" נפתח בחלון.
 */
import type { L } from './astro';

export interface InfoSection { title: L; text: L }
export interface PageInfo { summary: L; facts: L[]; more: InfoSection[] }

export type PageKey = 'me' | 'charts' | 'pair' | 'tarot' | 'psychology' | 'kabbalah' | 'zohar' | 'graphology' | 'hd';

export const PAGE_INFO: Record<PageKey, PageInfo> = {
  me: {
    summary: {
      he: 'שם ותאריך נותנים את מזל השמש, המזל העברי, המזל הסיני ומספר דרך החיים. שעת לידה ומקום מוסיפים את הירח ואת המזל העולה.',
      en: 'A name and a date give the Sun sign, the Hebrew and Chinese signs, and the life path number. A birth time and place add the Moon and the rising sign.',
    },
    facts: [
      { he: '12 מזלות מערביים', en: '12 Western signs' },
      { he: '12 חודשים עבריים ושבטים', en: '12 Hebrew months and tribes' },
      { he: '12 חיות סיניות × 5 יסודות', en: '12 Chinese animals × 5 elements' },
    ],
    more: [
      { title: { he: 'המזל המערבי', en: 'The Western sign' }, text: { he: 'נקבע לפי מיקום השמש ביום הלידה, באחד מ-12 המזלות לאורך גלגל המזלות. כל מזל שייך לאחד מארבעת היסודות: אש, אדמה, אוויר ומים.', en: 'Set by where the Sun stood on your birthday, in one of the 12 signs of the zodiac. Each sign belongs to one of four elements: fire, earth, air and water.' } },
      { title: { he: 'המזל העברי', en: 'The Hebrew sign' }, text: { he: 'במסורת היהודית כל חודש עברי קשור למזל ולשבט. תאריך הלידה מומר ללוח העברי, ולכן מי שנולד אחרי השקיעה מסמן זאת: היום העברי מתחיל בערב.', en: 'In Jewish tradition every Hebrew month is tied to a sign and a tribe. Your date is converted to the Hebrew calendar, which is why birth after sunset matters: the Hebrew day begins at nightfall.' } },
      { title: { he: 'המזל הסיני', en: 'The Chinese sign' }, text: { he: 'מחזור של 12 שנים, כל שנה בסימן חיה ויסוד. השנה הסינית מתחילה בין סוף ינואר לאמצע פברואר, כך שמי שנולד בינואר שייך לרוב לשנה הקודמת.', en: 'A 12-year cycle, each year under an animal and an element. The Chinese year starts between late January and mid-February, so January births usually belong to the previous year.' } },
      { title: { he: 'נומרולוגיה', en: 'Numerology' }, text: { he: 'מספר דרך החיים הוא סכום ספרות תאריך הלידה, מצומצם לספרה אחת. 11, 22 ו-33 נשארים כמו שהם ונקראים מספרי מאסטר.', en: 'The life path number is the sum of your birth date digits, reduced to one digit. 11, 22 and 33 stay as they are and are called master numbers.' } },
    ],
  },
  charts: {
    summary: {
      he: 'מפות אסטרולוגיות מלאות לפי תאריך, שעה ומקום לידה: מפת לידה, תחזית שנתית, התאמה זוגית, שאלה שעתית ועוד.',
      en: 'Full astrological charts from date, time and place of birth: natal chart, yearly forecast, synastry, horary questions and more.',
    },
    facts: [
      { he: '7 סוגי מפות', en: '7 chart types' },
      { he: 'מיקומי כוכבים מחושבים', en: 'Calculated planet positions' },
      { he: 'ערים מכל העולם', en: 'Cities worldwide' },
    ],
    more: [
      { title: { he: 'למה צריך שעה ומקום?', en: 'Why time and place?' }, text: { he: 'המזל העולה והבתים זזים כל כמה דקות ותלויים במיקום על פני כדור הארץ. בלי שעה מדויקת אפשר לראות את מיקומי הכוכבים במזלות, אבל לא את הבתים.', en: 'The rising sign and the houses shift every few minutes and depend on where on Earth you are. Without an exact time you still get planets in signs, but not houses.' } },
      { title: { he: 'מפת לידה', en: 'Natal chart' }, text: { he: 'תמונה של השמיים ברגע הלידה: עשרה גופים שמימיים ב-12 מזלות ו-12 בתים, והזוויות ביניהם.', en: 'A snapshot of the sky at the moment of birth: ten bodies in 12 signs and 12 houses, and the angles between them.' } },
      { title: { he: 'תחזית', en: 'Forecast' }, text: { he: 'מבוססת על מעברי כוכבים (טרנזיטים) על פני מפת הלידה ועל מפת חזרת השמש ליום ההולדת.', en: 'Based on transits over the natal chart and on the solar return chart for your birthday.' } },
    ],
  },
  pair: {
    summary: {
      he: 'בדיקת התאמה בין שני אנשים לפי המזלות, היסודות והנומרולוגיה של כל אחד, עם ציון ופירוט של כל מרכיב.',
      en: 'A compatibility check between two people based on their signs, elements and numerology, with a score and a breakdown.',
    },
    facts: [
      { he: 'מזל מערבי, עברי וסיני', en: 'Western, Hebrew and Chinese signs' },
      { he: 'התאמת יסודות', en: 'Element harmony' },
      { he: 'מספרי דרך חיים', en: 'Life path numbers' },
    ],
    more: [
      { title: { he: 'איך מחושב הציון?', en: 'How is the score built?' }, text: { he: 'ארבעה מרכיבים מקבלים ציון בנפרד: המזל המערבי והמזל העברי לפי התאמת היסודות (אש ואוויר מזינים זה את זה, אדמה ומים משלימים), המזל הסיני לפי המשולשים וההתנגדויות בגלגל 12 החיות, ומספרי דרך החיים. הציון הכולל הוא הממוצע של ארבעתם.', en: 'Four parts are scored separately: the Western and Hebrew signs by element harmony (fire and air feed each other, earth and water complement), the Chinese sign by the trines and oppositions of the 12-animal wheel, and the life path numbers. The total is the average of the four.' } },
      { title: { he: 'להתאמה מעמיקה', en: 'For a deeper match' }, text: { he: 'במסך "אסטרולוגיה" יש מפת סינסטרי, שמשווה בין מפות הלידה המלאות של שניכם ודורשת שעות ומקומות לידה.', en: 'The Astrology tab has a synastry chart that compares both full natal charts and needs birth times and places.' } },
    ],
  },
  tarot: {
    summary: {
      he: 'שליפה מתוך 22 קלפי הארקנה הגדולה. מערבבים את החבילה, שולפים קלף אחד או שלושה והופכים כל קלף כדי לקרוא את פירושו.',
      en: 'A draw from the 22 Major Arcana. Shuffle the deck, draw one or three cards and turn each one over to read it.',
    },
    facts: [
      { he: '22 קלפי ארקנה גדולה', en: '22 Major Arcana cards' },
      { he: 'פריסת קלף אחד או שלושה', en: 'One or three card spread' },
      { he: 'קלפים הפוכים', en: 'Reversed cards' },
    ],
    more: [
      { title: { he: 'מה זה טארוט?', en: 'What is tarot?' }, text: { he: 'חבילת קלפים שהופיעה באיטליה במאה ה-15 כמשחק, והפכה במאות ה-18 וה-19 לכלי להתבוננות. 22 קלפי הארקנה הגדולה מתארים מסע: מהשוטה (0) ועד העולם (21).', en: 'A deck that appeared in 15th-century Italy as a game and became a tool for reflection in the 18th and 19th centuries. The 22 Major Arcana describe a journey, from the Fool (0) to the World (21).' } },
      { title: { he: 'קלף הפוך', en: 'Reversed cards' }, text: { he: 'קלף שיוצא הפוך מבטא את אותה אנרגיה כשהיא חסומה, חלשה או מופנית פנימה. אפשר לכבות את האפשרות ולקרוא רק קלפים ישרים.', en: 'A card drawn upside down expresses the same energy blocked, weakened or turned inward. You can switch this off and read upright cards only.' } },
      { title: { he: 'פריסת שלושה קלפים', en: 'Three-card spread' }, text: { he: 'הקלפים נקראים לפי מקומם: עבר, הווה ועתיד. כדאי לנסח שאלה פתוחה ("מה כדאי לי לדעת על…") ולא שאלת כן/לא.', en: 'Cards are read by position: past, present and future. An open question ("What should I know about…") works better than a yes/no question.' } },
      { title: { he: 'טארוט וקבלה', en: 'Tarot and Kabbalah' }, text: { he: 'במסורת האזוטרית כל אחד מ-22 הקלפים מקביל לאחת מ-22 האותיות העבריות ולאחד מ-22 הנתיבים בעץ החיים.', en: 'In esoteric tradition each of the 22 cards matches one of the 22 Hebrew letters and one of the 22 paths on the Tree of Life.' } },
    ],
  },
  psychology: {
    summary: {
      he: 'שלושה שאלוני אישיות מוכרים: MBTI (16 טיפוסים), אניאגרם (9 טיפוסים) ו-Big Five (חמש תכונות). לכל היגד בוחרים עד כמה הוא מתאים לך, מ"בכלל לא" ועד "מתאים מאוד".',
      en: 'Three well-known personality questionnaires: MBTI (16 types), Enneagram (9 types) and Big Five (five traits). Rate each statement from "strongly disagree" to "strongly agree".',
    },
    facts: [
      { he: 'שאלון דיווח עצמי', en: 'Self-report questionnaire' },
      { he: 'כ-5 דקות לכל שאלון', en: 'About 5 minutes each' },
      { he: 'התשובות נשארות במכשיר', en: 'Answers stay on your device' },
    ],
    more: [
      { title: { he: 'MBTI', en: 'MBTI' }, text: { he: 'פותח בשנות ה-40 על ידי קתרין בריגס ואיזבל מאיירס, על בסיס הטיפולוגיה של קרל יונג. ממיין העדפות בארבעה צירים: מוחצנות/מופנמות, חושים/אינטואיציה, חשיבה/רגש, שיפוט/תפיסה. השילוב נותן 16 טיפוסים.', en: 'Developed in the 1940s by Katharine Briggs and Isabel Myers, based on Carl Jung\'s typology. It sorts preferences on four axes: extraversion/introversion, sensing/intuition, thinking/feeling, judging/perceiving, giving 16 types.' } },
      { title: { he: 'אניאגרם', en: 'Enneagram' }, text: { he: 'מודל של תשעה טיפוסים, שכל אחד מהם מונע ממוטיבציה ומפחד מרכזיים. הטיפוס שקיבל את הציון הגבוה ביותר הוא הטיפוס הדומיננטי.', en: 'A model of nine types, each driven by a core motivation and a core fear. The type with the highest score is your dominant type.' } },
      { title: { he: 'Big Five', en: 'Big Five' }, text: { he: 'המודל המבוסס ביותר במחקר הפסיכולוגי. מודד חמש תכונות על רצף: פתיחות, מצפוניות, מוחצנות, נעימות ויציבות רגשית. כל תכונה מקבלת ציון בין 0 ל-100.', en: 'The best-supported model in psychological research. It measures five traits on a continuum: openness, conscientiousness, extraversion, agreeableness and emotional stability, each scored 0–100.' } },
      { title: { he: 'חשוב לדעת', en: 'Good to know' }, text: { he: 'אלה גרסאות מקוצרות לשימוש אישי ולא כלי אבחון. התוצאה משקפת איך תיארת את עצמך היום, והיא יכולה להשתנות.', en: 'These are short versions for personal use, not a diagnostic tool. The result reflects how you described yourself today and may change.' } },
    ],
  },
  kabbalah: {
    summary: {
      he: 'עץ החיים ו-10 הספירות. לפי תאריך הלידה והשם שלך נמצא את הספירה של דרך החיים, את ספירת השם ואת האות והנתיב של חודש הלידה העברי.',
      en: 'The Tree of Life and its 10 Sephiroth. From your birth date and name we find your life path Sephira, your name Sephira, and the letter and path of your Hebrew birth month.',
    },
    facts: [
      { he: '10 ספירות', en: '10 Sephiroth' },
      { he: '22 נתיבים ואותיות', en: '22 paths and letters' },
      { he: '4 עולמות', en: '4 worlds' },
    ],
    more: [
      { title: { he: 'מה זה עץ החיים?', en: 'What is the Tree of Life?' }, text: { he: 'מפה של עשר ספירות, דרכן לפי הקבלה האור האלוהי יורד ומתגלה בעולם, מכתר (הרצון העליון) ועד מלכות (העולם הממשי). הספירות מסודרות בשלושה עמודים: חסד מימין, דין משמאל ורחמים באמצע.', en: 'A map of ten Sephiroth through which, in Kabbalah, divine light descends and becomes manifest, from Keter (the supreme will) to Malkuth (the physical world). They stand in three pillars: mercy on the right, severity on the left and balance in the middle.' } },
      { title: { he: '22 הנתיבים', en: 'The 22 paths' }, text: { he: 'הספירות מחוברות ב-22 נתיבים, כמספר האותיות העבריות. ספר יצירה מחלק את האותיות לשלוש: 3 אמות (א, מ, ש), 7 כפולות (בגד כפרת) ו-12 פשוטות, שכל אחת מהן מקבילה לחודש ולמזל.', en: 'The Sephiroth are joined by 22 paths, like the 22 Hebrew letters. Sefer Yetzirah divides the letters into 3 mothers (Aleph, Mem, Shin), 7 doubles and 12 simple letters, each matching a month and a sign.' } },
      { title: { he: 'איך מחושבת הספירה שלך?', en: 'How is your Sephira found?' }, text: { he: 'מספר דרך החיים (סכום ספרות תאריך הלידה) מצומצם לספרה בין 1 ל-9, והיא מתאימה לספירה לפי סדרה בעץ: 1 כתר, 2 חכמה… 9 יסוד. ספירת השם מחושבת באותה דרך מהגימטריה של השם. מספרי מאסטר (11, 22, 33) מוצגים ומצומצמים לצורך ההתאמה.', en: 'Your life path number (the sum of your birth date digits) is reduced to 1–9 and matched to the Sephira in that order: 1 Keter, 2 Chokhmah… 9 Yesod. The name Sephira uses the gematria of your name the same way. Master numbers (11, 22, 33) are shown and reduced for the match.' } },
      { title: { he: 'ארבעת העולמות', en: 'The four worlds' }, text: { he: 'אצילות, בריאה, יצירה ועשייה: ארבע רמות של התגלות, מהרוחני לגמרי ועד המעשי. כל ספירה נמצאת בעיקר באחד מהם.', en: 'Atzilut, Beriah, Yetzirah and Assiyah: four levels of manifestation, from wholly spiritual to practical. Each Sephira sits mainly in one of them.' } },
    ],
  },
  zohar: {
    summary: {
      he: 'לפי המסורת המובאת בספר הזוהר, אפשר להתבונן בתווי הפנים ובקווי כף היד ולקבל פרשנות רוחנית. זו אינה אבחנה רפואית או מדעית.',
      en: 'According to the tradition in the Zohar, the face and the lines of the palm can be read as a spiritual interpretation. It is not a medical or scientific diagnosis.',
    },
    facts: [
      { he: 'קריאת פנים (פרצוף)', en: 'Face reading (partzuf)' },
      { he: 'קווי כף היד', en: 'Palm lines' },
      { he: '4 טמפרמנטים', en: '4 temperaments' },
    ],
    more: [
      { title: { he: 'חכמת הפרצוף', en: 'The wisdom of the face' }, text: { he: 'הזוהר מתאר קשר בין צורת המצח, העיניים והשפתיים לבין תכונות הנפש, ומחלק אנשים לסוגים לפי ארבע אותיות שם הוי״ה. הפירוש כאן מבוסס על המאפיינים שבוחרים.', en: 'The Zohar links the shape of the forehead, eyes and lips to traits of the soul, and groups people by the four letters of the divine name. The reading here is based on the features you choose.' } },
      { title: { he: 'קווי היד', en: 'Lines of the hand' }, text: { he: 'לפי הזוהר, הקווים בכף היד ובאצבעות הם "רזי אצבעות" שמשקפים את דרכו של האדם. מתייחסים לקו הלב, הראש והחיים ולצורת היד.', en: 'In the Zohar, the lines of the palm and fingers are "secrets of the fingers" that reflect a person\'s path. The heart, head and life lines and the shape of the hand are considered.' } },
      { title: { he: 'איך לצלם?', en: 'How to take the photos' }, text: { he: 'אור יום רך, בלי פלאש. פנים: מבט ישר למצלמה ותמונת פרופיל. כף יד: פתוחה וישרה, כל כף היד בתוך התמונה.', en: 'Soft daylight, no flash. Face: looking straight at the camera, plus a profile. Palm: open and flat, the whole hand in the frame.' } },
    ],
  },
  graphology: {
    summary: {
      he: 'ניתוח כתב יד: מצלמים או מעלים דף בכתב ידך. המערכת מודדת את נטיית הכתב, גודל האותיות, הלחץ, קו הכתיבה והמרווחים. זו קריאה מסורתית, לא אבחון ולא עובדה מדעית.',
      en: 'Handwriting analysis: take or upload a photo of your handwriting. The app measures slant, letter size, pressure, baseline and spacing. The reading is traditional, not a diagnosis and not a scientific fact.',
    },
    facts: [
      { he: '5 מאפיינים נמדדים', en: '5 measured features' },
      { he: 'מצלמה, גלריה או קובץ', en: 'Camera, gallery, or file' },
      { he: 'הניתוח מתבצע במכשיר', en: 'Analyzed on your device' },
    ],
    more: [
      { title: { he: 'מה זו גרפולוגיה?', en: 'What is graphology?' }, text: { he: 'ניסיון ללמוד על אישיות מתוך צורת הכתב. התחום התפתח בצרפת ובגרמניה במאה ה-19. בישראל השתמשו בו בעבר במיונים לעבודה, אבל תוקפו המדעי שנוי במחלוקת, ולכן כדאי להתייחס לתוצאה כנקודה למחשבה.', en: 'An attempt to learn about personality from the form of writing, developed in 19th-century France and Germany. It has been used in hiring, but its scientific validity is disputed, so treat the result as food for thought.' } },
      { title: { he: 'מה נמדד בתמונה?', en: 'What is measured in the photo?' }, text: { he: 'נטייה: הזווית שבה הקווים האנכיים ישרים ביותר. גודל: גובה שורת טקסט ביחס לרוחב הדף. לחץ: כהות הדיו. קו כתיבה: האם השורות עולות או יורדות. מרווח: היחס בין רווחים לדיו בתוך השורה.', en: 'Slant: the angle at which vertical strokes line up best. Size: line height relative to page width. Pressure: how dark the ink is. Baseline: whether lines rise or fall. Spacing: the ratio of gaps to ink within a line.' } },
      { title: { he: 'איך לצלם?', en: 'How to take the photo' }, text: { he: 'לפחות 3–4 שורות בעט כחול או שחור על נייר לבן בלי שורות. מצלמים ישר מלמעלה, באור טוב ובלי צל. התמונה נבדקת במכשיר לפני הניתוח, ולא נשמרת אחר כך.', en: 'At least 3–4 lines in blue or black pen on plain white paper. Shoot straight from above, in good light, with no shadow. The photo is checked on the device before analysis, and it is not kept afterwards.' } },
    ],
  },
  hd: {
    summary: {
      he: 'עיצוב אנושי הוא כלי רוחני להתבוננות עצמית. לפי תאריך לידה ושעה מוצגים סוג האנרגיה, האסטרטגיה, הסמכות והפרופיל, כפי שהמערכת מפרשת אותם. זו אינה מדידה מדעית.',
      en: 'Human Design is a spiritual tool for self-reflection. From a birth date and time it shows an energy type, strategy, authority and profile, as the system interprets them. It is not a scientific measurement.',
    },
    facts: [
      { he: '5 סוגי אנרגיה', en: '5 energy types' },
      { he: '6 רשויות החלטה', en: '6 decision authorities' },
      { he: '12 פרופילים', en: '12 profiles' },
    ],
    more: [
      { title: { he: 'מה זה Human Design?', en: 'What is Human Design?' }, text: { he: 'מערכת רוחנית שפותחה בשנות ה-80. היא שואבת רעיונות ממסורות שונות, בהן אסטרולוגיה, קבלה וצ\'אקרות. אין בסיס מדעי מבוסס לכך שהיא מודדת אישיות, מחליטה עבור אדם או חוזה התנהגות.', en: 'A spiritual system developed in the 1980s. It draws on several traditions, including astrology, Kabbalah and chakras. There is no established scientific basis for it measuring personality, deciding for a person, or predicting behavior.' } },
      { title: { he: 'סוגי אנרגיה', en: 'Energy types' }, text: { he: 'חמישה סוגים: מניפסטור (יוזם), גנרטור (בונה), גנרטור-מניפסטור (יוזם-בונה), פרוג\'קטור (מדריך), רפלקטור (מראה). כל סוג בעל אסטרטגיה משלו לקבלת החלטות.', en: 'Five types: Manifestor (initiator), Generator (builder), Manifesting Generator (fast builder), Projector (guide) and Reflector (mirror). Each has its own strategy for decision-making.' } },
      { title: { he: 'רשויות החלטה', en: 'Decision authorities' }, text: { he: 'לפי המערכת, לצד האסטרטגיה יש "סמכות": אופן שבו נהוג לבדוק החלטה. השמות משתנים בין מקורות. כאן: רגשית, סקרלית, טחולית, אגו, עצמית, או סמכות ירחית.', en: 'In this system, alongside strategy there is an "authority": a way decisions are usually checked. Names vary between sources. Here: emotional, sacral, splenic, ego, self-projected, or lunar.' } },
      { title: { he: 'פרופילים', en: 'Profiles' }, text: { he: 'שתים-עשרה פרופילים המתארים את תפקידך החברתי ודרכך בחיים. כל פרופיל הוא שילוב של שני מספרים (1–6) המייצגים שני מימדים של האישיות.', en: 'Twelve profiles that describe your social role and life path. Each profile is a blend of two numbers (1–6) representing two dimensions of personality.' } },
    ],
  },
};
