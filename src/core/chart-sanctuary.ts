/**
 * chart-sanctuary.ts — הטקסטים של המפה האישית: מה מקבלים, אודות ושאלות.
 * הניסוח מקורי. המבנה שואב השראה מדוחות מפת לידה (פרקים, אודות, שאלות), לא מהניסוח של אתר אחר.
 */
import type { L } from './astro';

const x = (he: string, en: string): L => ({ he, en });

export interface ChartGet { title: L; text: L }
export interface ChartGroup { title: L; lead: L; items: ChartGet[] }
export interface ChartAbout { title: L; text: L }
export interface ChartFaq { q: L; a: L }

export const CHART_SANCTUARY = {
  kicker: x('מה זו המפה', 'What this chart is'),
  title: x('המפה האישית שלך', 'Your personal chart'),
  lead: x(
    'מפה אישית היא תיאור שלך לפי השם ויום הלידה. היא לא אומרת מה יקרה מחר. היא עונה על שלוש שאלות: איך אתה פועל עם אנשים, איך אתה מרגיש כשאתה לבד, ואיך זרים רואים אותך בפעם הראשונה.',
    'A personal chart is a description of you from your name and birthday. It does not say what will happen tomorrow. It answers three questions: how you act with people, how you feel when you are alone, and how strangers see you the first time.',
  ),
  gets: x(
    'מה שמתקבל בעמוד, אחרי «הצגת המפה»: מזל השמש, כלומר איך אתה פועל עם אנשים; המזל העברי והשנה הסינית; מספר לפי התאריך ומספר לפי השם; ושישה תחומי חיים — עבודה, כסף, אהבה, בריאות, חוזקות ואתגרים. שם ותאריך מספיקים. עיר מוסיפה את הירח, כלומר איך אתה מרגיש לבד. שעה ועיר יחד מוסיפות את המזל העולה, כלומר איך זרים קוראים אותך. אין הרשמה ואין תשלום.',
    'What you get on this page, after “Show the chart”: the Sun sign, meaning how you act with people; the Hebrew sign and the Chinese year; a number from the date and a number from the name; and six areas of life — work, money, love, health, strengths and challenges. A name and a date are enough. A city adds the Moon, meaning how you feel when you are alone. A time and a city together add the rising sign, meaning how strangers read you. There is no signup and no payment.',
  ),
  intro: x(
    'אחרי שממלאים שם ותאריך ולוחצים על «הצגת המפה», התוצאה מופיעה באותו עמוד. כאן רשומים הכרטיסים שתראה, ולפי איזה פרט כל כרטיס מחושב.',
    'After you enter a name and a date and press “Show the chart”, the result appears on the same page. These are the cards you will see, and which detail each one is calculated from.',
  ),
  closing: x(
    'אם אין שעת לידה או אין עיר, הכרטיסים שתלויים בהן לא מופיעים. שאר הכרטיסים מופיעים בכל מקרה.',
    'If there is no birth time or no city, the cards that depend on them do not appear. The rest appear either way.',
  ),
  groups: [
    {
      title: x('שם ותאריך', 'Name and date'),
      lead: x('הכרטיסים האלה מופיעים תמיד.', 'These cards always appear.'),
      items: [
        {
          title: x('מזל השמש', 'The Sun sign'),
          text: x(
            'המזל של יום הלידה. הוא מתאר איך אתה פועל עם אנשים ובהחלטות, לא איך אתה מרגיש כשאתה לבד.',
            'The sign of the birthday. It describes how you act with people and in decisions, not how you feel when you are alone.',
          ),
        },
        {
          title: x('המזל העברי והשבט', 'The Hebrew sign and tribe'),
          text: x(
            'החודש העברי של יום הלידה, המזל של אותו חודש, והשבט. אם נולדת אחרי השקיעה, סמן זאת בטופס: בלוח העברי הערב כבר שייך ליום הבא. מזל השמש לא משתנה.',
            'The Hebrew month of the birthday, that month’s sign, and the tribe. If you were born after sunset, mark it on the form: in the Hebrew calendar the evening already belongs to the next day. The Sun sign does not change.',
          ),
        },
        {
          title: x('השנה הסינית', 'The Chinese year'),
          text: x(
            'החיה, היסוד והקוטב של שנת הלידה. השנה הסינית מתחילה בין סוף ינואר לאמצע פברואר, לא ב־1 בינואר. מי שנולד בינואר שייך לרוב לשנה הקודמת.',
            'The animal, the element and the polarity of the birth year. The Chinese year starts between late January and mid-February, not on 1 January. A January birth usually belongs to the previous year.',
          ),
        },
        {
          title: x('מספר דרך החיים', 'The life path number'),
          text: x(
            'ספרה אחת מסכום הספרות של תאריך הלידה. המספרים 11, 22 ו־33 לא מצומצמים הלאה. זה כיוון לאורך החיים, לא מצב הרוח של היום.',
            'One digit from the sum of the birth date. 11, 22 and 33 are not reduced further. A direction across a life, not today’s mood.',
          ),
        },
        {
          title: x('מספר השם', 'The name number'),
          text: x(
            'ספרה אחת מאותיות השם שכתבת. היא מתארת איך פוגשים אותך בשיחה הראשונה.',
            'One digit from the letters of the name you typed. It describes how people meet you in the first conversation.',
          ),
        },
        {
          title: x('העץ הקלטי', 'The Celtic tree'),
          text: x(
            'עץ לפי היום והחודש בלוח הקלטי. זה דימוי למה שאפשר להישען עליו כשקשה, לא עץ שצריך לשתול.',
            'A tree from the day and month on the Celtic calendar. An image of what you can lean on when things are hard, not a tree to plant.',
          ),
        },
        {
          title: x('קלף הלידה', 'The birth card'),
          text: x(
            'קלף אחד מתוך 22 קלפי הארקנה הגדולה, לפי סכום ספרות התאריך. משפט אחד על התקופה, לא פריסה של כמה קלפים כמו במסך הטארוט.',
            'One card from the 22 Major Arcana, from the sum of the date’s digits. One sentence for this stretch of life, not a spread of several cards like the tarot screen.',
          ),
        },
        {
          title: x('אבן החודש והפרח', 'The month’s stone and flower'),
          text: x(
            'האבן והפרח של חודש הלידה. זו תזכורת, לא המלצה רפואית ולא סיבה לקנות תכשיט.',
            'The stone and flower of the birth month. A reminder, not medical advice and not a reason to buy jewellery.',
          ),
        },
        {
          title: x('שישה תחומי חיים', 'Six areas of life'),
          text: x(
            'שישה כרטיסים: קריירה, כסף, אהבה, בריאות, חוזקות ואתגרים. כל אחד נכתב לפי מזל השמש. בקריירה ובאהבה יש גם משפט לפי מספר דרך החיים.',
            'Six cards: career, money, love, health, strengths and challenges. Each one is written from the Sun sign. Career and love also have a sentence from the life path number.',
          ),
        },
      ],
    },
    {
      title: x('עיר', 'A city'),
      lead: x('אם בוחרים עיר, נוסף כרטיס אחד.', 'If you pick a city, one more card is added.'),
      items: [
        {
          title: x('הירח', 'The Moon'),
          text: x(
            'איך אתה מרגיש כשאתה לבד. זה לא מזל השמש. בלי שעת לידה החישוב הוא לפי צהריים באותה עיר, ולכן הוא משוער. שעה אחרת יכולה להזיז את הירח למזל אחר.',
            'How you feel when you are alone. This is not the Sun sign. Without a birth time the calculation uses noon in that city, so it is an estimate. Another hour can move the Moon into a different sign.',
          ),
        },
      ],
    },
    {
      title: x('שעה ועיר יחד', 'A time and a city together'),
      lead: x('הכרטיס הזה מופיע רק כשיש את שתיהן. עיר בלי שעה לא מספיקה.', 'This card appears only when you have both. A city without a time is not enough.'),
      items: [
        {
          title: x('המזל העולה', 'The rising sign'),
          text: x(
            'המזל שהיה באופק במקום ובשעה שנולדת. הוא מתאר איך זרים קוראים אותך בדקה הראשונה, לפני שמכירים אותך.',
            'The sign on the horizon at the place and time you were born. It describes how strangers read you in the first minute, before they know you.',
          ),
        },
      ],
    },
  ] as ChartGroup[],
  about: [
    {
      title: x('דיוקן, לא פסק דין', 'A portrait, not a verdict'),
      text: x(
        'העמוד מרכיב כמה שכבות מתאריך, משם, ואם יש — גם משעה ומעיר. זו מראה להתבוננות. היא לא אבחון, לא תחזית סגורה, ולא תחליף לשיקול דעת.',
        'The page assembles several layers from a date, a name, and if you have them, a time and a city. A mirror for reflection. It is not a diagnosis, not a closed forecast, and not a substitute for your own judgment.',
      ),
    },
    {
      title: x('מזל השמש', 'The Sun sign'),
      text: x(
        'המזל נקבע לפי מקום השמש ביום הלידה, באחד משנים־עשר המזלות. לכל מזל יש יסוד: אש, אדמה, אוויר או מים. כל מזל מחולק גם לשלושה חלקים, לפי היום בתוך המזל.',
        'The sign is set by where the Sun stood on the birthday, in one of the twelve signs. Each sign has an element: fire, earth, air or water. Each sign is also split into three parts, by the day inside the sign.',
      ),
    },
    {
      title: x('לוח עברי ושנה סינית', 'A Hebrew calendar and a Chinese year'),
      text: x(
        'התאריך מומר ללוח העברי. בלוח הזה הערב כבר שייך ליום הבא, ולכן לידה אחרי השקיעה נספרת ליום שלמחרת. השנה הסינית לא מתחילה ב־1 בינואר, אלא בין סוף ינואר לאמצע פברואר. מי שנולד בינואר שייך לרוב לשנה הסינית הקודמת.',
        'The date is converted to the Hebrew calendar. On that calendar the evening already belongs to the next day, so a birth after sunset counts as the following day. The Chinese year does not start on 1 January, but between late January and mid-February. A January birth usually belongs to the previous Chinese year.',
      ),
    },
    {
      title: x('מספרים, עץ וקלף', 'Numbers, a tree and a card'),
      text: x(
        'מספר דרך החיים יוצא מספרות התאריך. מספר השם יוצא מאותיות השם. העץ הקלטי וקלף הלידה הם שני דימויים לאותו יום לידה, כל אחד בשפה שלו.',
        'The life path number comes from the digits of the date. The name number comes from the letters of the name. The Celtic tree and the birth card are two images of that same birthday, each in its own language.',
      ),
    },
    {
      title: x('ואיפה כל הכוכבים?', 'And where are all the planets?'),
      text: x(
        'בעמוד הזה אין גלגל עם מרקורי, ונוס, מאדים, בתים וזוויות. כאן יש דיוקן: מזל, לוח, מספרים, עץ וקלף. מיקום כל הכוכבים הוא כלי נפרד, תחת אסטרולוגיה, במפת לידה.',
        'This page has no wheel of Mercury, Venus, Mars, houses and angles. Here there is a portrait: a sign, a calendar, numbers, a tree and a card. The position of every planet is a separate tool, under Astrology, on the birth chart.',
      ),
    },
  ] as ChartAbout[],
  faq: [
    {
      q: x('מה ההבדל בין העמוד הזה למפת הלידה באסטרולוגיה?', 'What is the difference between this page and the birth chart under Astrology?'),
      a: x(
        'בעמוד הזה מופיעים מזל השמש, הלוח העברי, השנה הסינית, המספרים, העץ, הקלף ותחומי החיים. מפת הלידה, תחת אסטרולוגיה, מציירת את השמיים: את מיקום הכוכבים, הבתים והזוויות ביניהם. אלה שני כלים נפרדים, ושניהם בחינם.',
        'This page shows the Sun sign, the Hebrew calendar, the Chinese year, the numbers, the tree, the card and the life areas. The birth chart, under Astrology, draws the sky: where the planets stood, the houses and the angles between them. They are two separate tools, and both are free.',
      ),
    },
    {
      q: x('האם חייבים שעת לידה?', 'Do I need a birth time?'),
      a: x(
        'לא. בלי שעה מתקבלים מזל השמש, המזל העברי, השנה הסינית, המספרים, העץ, הקלף ותחומי החיים. עיר מוסיפה ירח משוער, לפי צהריים. שעה ועיר יחד מוסיפות את המזל העולה.',
        'No. Without a time you still get the Sun sign, the Hebrew sign, the Chinese year, the numbers, the tree, the card and the life areas. A city adds an estimated Moon, calculated for noon. A time and a city together add the rising sign.',
      ),
    },
    {
      q: x('מה זה "נולדתי אחרי השקיעה"?', 'What does “born after sunset” mean?'),
      a: x(
        'ביום העברי, הערב כבר שייך ליום הבא. אם נולדת אחרי השקיעה, סמן זאת כדי שהמזל העברי והשבט יחושבו ליום הנכון. מזל השמש לא משתנה.',
        'In the Hebrew day, the evening already belongs to the next day. If you were born after sunset, mark it so the Hebrew sign and tribe use the right day. The Sun sign does not change.',
      ),
    },
    {
      q: x('האם משהו כאן בתשלום?', 'Is anything here paid?'),
      a: x(
        'לא. כל מה שבעמוד הזה פתוח, בלי הרשמה ובלי תשלום.',
        'No. Everything on this page is open, with no signup and no payment.',
      ),
    },
    {
      q: x('אפשר לבנות מפה למישהו אחר?', 'Can I build a chart for someone else?'),
      a: x(
        'כן. כותבים את השם ואת תאריך הלידה שלו. אם יש שעה ועיר, מוסיפים גם אותן. אין חשבון משתמש, והמפה לא נקשרת אליך.',
        'Yes. Type their name and birth date. If you have a time and a city, add those too. There is no user account, and the chart is not tied to you.',
      ),
    },
    {
      q: x('לאן הנתונים הולכים?', 'Where does the data go?'),
      a: x(
        'החישוב רץ במכשיר. השם והתאריך האחרונים נשמרים אצלך בדפדפן, כדי שלא תצטרך להקליד שוב. הם לא נשלחים לשרת.',
        'The calculation runs on the device. The last name and date are kept in your browser, so you do not have to type them again. They are not sent to a server.',
      ),
    },
    {
      q: x('האם זו מדידה מדעית?', 'Is this a scientific measurement?'),
      a: x(
        'לא. אלה מסורות של סמל ופרשנות. אפשר לקרוא אותן כמראה, לא כעובדה רפואית, משפטית או תעסוקתית.',
        'No. These are traditions of symbol and interpretation. Read them as a mirror, not as a medical, legal or hiring fact.',
      ),
    },
  ] as ChartFaq[],
};
