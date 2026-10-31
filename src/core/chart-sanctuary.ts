/**
 * chart-sanctuary.ts — הטקסטים של המפה האישית: מה מקבלים, אודות ושאלות.
 * הניסוח מקורי. המבנה שואב השראה מדוחות מפת לידה (פרקים, אודות, שאלות), לא מהניסוח של אתר אחר.
 */
import type { L } from './astro';

const x = (he: string, en: string): L => ({ he, en });

export interface ChartPerk { mark: string; title: L; text: L }
export interface ChartGift { n: string; title: L; text: L; note: L }
export interface ChartAbout { title: L; text: L }
export interface ChartFaq { q: L; a: L }

export const CHART_SANCTUARY = {
  kicker: x('דיוקן אישי · הכול פתוח', 'A personal portrait · all of it open'),
  title: x('המפה האישית שלך', 'Your personal chart'),
  lead: x(
    'שם ותאריך פותחים את הדיוקן: מזל השמש, הלוח העברי, השנה הסינית, מספר דרך החיים וקלף הלידה. שעה ומקום מוסיפים את הירח ואת המזל העולה. אין פרק נעול ואין חשבון.',
    'A name and a date open the portrait: the Sun sign, the Hebrew calendar, the Chinese year, the life path number and the birth card. A time and a place add the Moon and the rising sign. No chapter is locked, and there is no account.',
  ),
  freeLine: x(
    'כל מה שרשום כאן נפתח מיד, אצלך במכשיר. שעה או עיר חסרות רק משאירות פרק בצד — הן לא נועלות את השאר.',
    'Everything listed here opens at once, on your device. A missing time or city only sets one chapter aside. It does not lock the rest.',
  ),
  perks: [
    {
      mark: '☉',
      title: x('לפי השם והתאריך', 'From your name and date'),
      text: x('הדיוקן נבנה מהפרטים שכתבת, לא מטקסט כללי למזל.', 'The portrait is built from the details you typed, not from a generic sign blurb.'),
    },
    {
      mark: '☽',
      title: x('שמש, ירח ואופק', 'Sun, Moon and rising'),
      text: x('השמש תמיד. הירח עם עיר. האופק כשיש גם שעה.', 'The Sun always. The Moon with a city. The rising sign when there is a time too.'),
    },
    {
      mark: '✧',
      title: x('כמה מסורות במבט אחד', 'Several traditions in one view'),
      text: x('מערבי, עברי, סיני, מספר, עץ וקלף. כל אחד שכבה, לא סתירה.', 'Western, Hebrew, Chinese, a number, a tree and a card. Each one is a layer, not a contradiction.'),
    },
    {
      mark: '⌂',
      title: x('בחינם, אצלך', 'Free, and it stays with you'),
      text: x('בלי הרשמה ובלי תשלום. החישוב נעשה במכשיר.', 'No signup and no payment. The calculation happens on the device.'),
    },
  ] as ChartPerk[],
  gifts: [
    {
      n: '01',
      title: x('תמצית המפה', 'The portrait in brief'),
      text: x('שם המזל, היסוד, והחלק בחודש שנולדת בו. זה הפתיח, לפני השכבות.', 'The sign’s name, its element, and the part of the month you were born in. The opening, before the layers.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '02',
      title: x('השמש — הזהות שרואים', 'The Sun — the self people see'),
      text: x('איך אתה ניגש לאנשים ולהחלטות ביום־יום, ומה צובע את הסגנון הזה.', 'How you approach people and decisions day to day, and what colors that style.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '03',
      title: x('הירח — העולם הרגשי', 'The Moon — the inner world'),
      text: x('מה אתה צריך כשאתה לבד, גם כשזה לא דומה למזל השמש.', 'What you need when you are alone, even when it does not look like the Sun sign.'),
      note: x('נפתח כשבוחרים עיר. בלי שעה זו הערכה לצהריים.', 'Opens when you pick a city. Without a time it is a noon estimate.'),
    },
    {
      n: '04',
      title: x('האופק — הדקה הראשונה', 'The rising sign — the first minute'),
      text: x('איך זרים קוראים אותך לפני שמכירים אותך. זה המזל שעולה באופק במקום ובשעה.', 'How strangers read you before they know you. The sign on the horizon at that place and time.'),
      note: x('נפתח רק עם שעה ועיר.', 'Opens only with a time and a city.'),
    },
    {
      n: '05',
      title: x('המזל העברי והשבט', 'The Hebrew sign and tribe'),
      text: x('החודש העברי של יום הלידה, המזל שלו והשבט. אחרי השקיעה היום העברי כבר התחלף.', 'The Hebrew month of the birth day, its sign and its tribe. After sunset the Hebrew day has already changed.'),
      note: x('פתוח מתאריך. סמן אחרי השקיעה אם נולדת בערב.', 'Open from the date. Mark after sunset if you were born in the evening.'),
    },
    {
      n: '06',
      title: x('השנה הסינית', 'The Chinese year'),
      text: x('החיה, היסוד והקוטב. זו תמונה של שנים, לא של השבוע. השנה מתחילה בין סוף ינואר לאמצע פברואר.', 'The animal, the element and the polarity. A picture of years, not of this week. The year starts between late January and mid-February.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '07',
      title: x('מספר דרך החיים', 'The life path number'),
      text: x('סכום ספרות התאריך, מצומצם לספרה. 11, 22 ו־33 נשארים כמו שהם. זה הכיוון הארוך, לא מצב הרוח של היום.', 'The digits of the date, reduced. 11, 22 and 33 stay as they are. The long direction, not today’s mood.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '08',
      title: x('מספר השם', 'The name number'),
      text: x('לפי השם שכתבת. ככה אנשים פוגשים אותך בשיחה הראשונה, לפני שהתאריך נכנס לחדר.', 'From the name you typed. How people meet you in the first conversation, before the date enters the room.'),
      note: x('פתוח מהשם.', 'Open from the name.'),
    },
    {
      n: '09',
      title: x('העץ הקלטי', 'The Celtic tree'),
      text: x('עץ לפי תאריך הלידה. דימוי למה להישען עליו כשקשה, לא עץ שצריך לגדל.', 'A tree from the birth date. An image of what to lean on when things are hard, not a tree to grow.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '10',
      title: x('קלף הלידה', 'The birth card'),
      text: x('קלף אחד מהארקנה הגדולה, לפי סכום התאריך. משפט לתקופה, לא פתיחה מלאה.', 'One Major Arcana card, from the sum of the date. A sentence for this stretch of life, not a full draw.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '11',
      title: x('אבן החודש והפרח', 'The month’s stone and flower'),
      text: x('סמל לחודש שנולדת בו. תזכורת, לא תרופה ולא סיבה לקנות תכשיט.', 'A symbol of the month you were born. A reminder, not medicine and not a reason to buy jewellery.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '12',
      title: x('שישה תחומי חיים', 'Six areas of life'),
      text: x('קריירה, כסף, אהבה, בריאות, חוזקות ואתגרים. השורה הראשונה לפי מזל השמש. בקריירה ובאהבה יש גם שורה לפי מספר החיים.', 'Career, money, love, health, strengths and challenges. The first line is the Sun sign. Career and love also have a line from the life path number.'),
      note: x('פתוח מתאריך הלידה.', 'Open from the birth date.'),
    },
    {
      n: '13',
      title: x('המפה המלאה — כוכבים, בתים והיבטים', 'The full chart — planets, houses and aspects'),
      text: x('גלגל עם כל הגופים, הבתים והזוויות ביניהם. זה החדר הבא, וגם הוא בחינם. בלי שעה רואים מזלות, לא בתים.', 'A wheel with every body, the houses and the angles between them. The next room, and it is free too. Without a time you see signs, not houses.'),
      note: x('נפתח במפת הלידה, עם תאריך. שעה ועיר מוסיפות בתים.', 'Opens on the natal chart, from a date. A time and a city add houses.'),
    },
  ] as ChartGift[],
  about: [
    {
      title: x('דיוקן, לא גזירה', 'A portrait, not a verdict'),
      text: x(
        'העמוד מרכיב כמה שכבות מתוך תאריך, שם, ואם יש — שעה ומקום. זו מראה להתבוננות. היא לא אבחון, לא תחזית סגורה, ולא תחליף לשיקול דעת.',
        'The page assembles several layers from a date, a name, and if you have them, a time and a place. A mirror for reflection. It is not a diagnosis, not a closed forecast, and not a substitute for judgment.',
      ),
    },
    {
      title: x('מזל השמש', 'The Sun sign'),
      text: x(
        'נקבע לפי מקום השמש ביום הלידה, באחד משנים־עשר המזלות. כל מזל שייך ליסוד — אש, אדמה, אוויר או מים — ומחולק לשלושה חלקים לפי היום בתוך המזל.',
        'Set by where the Sun stood on the birthday, in one of the twelve signs. Each sign belongs to an element — fire, earth, air or water — and is split into three parts by the day inside the sign.',
      ),
    },
    {
      title: x('לוח עברי ושנה סינית', 'A Hebrew calendar and a Chinese year'),
      text: x(
        'התאריך מומר ללוח העברי, ולכן לידה אחרי השקיעה שייכת ליום הבא. השנה הסינית לא נפתחת ב־1 בינואר, אז מי שנולד בינואר שייך לרוב לשנה הקודמת.',
        'The date is converted to the Hebrew calendar, so a birth after sunset belongs to the next day. The Chinese year does not open on 1 January, so a January birth usually belongs to the previous year.',
      ),
    },
    {
      title: x('מספרים, עץ וקלף', 'Numbers, a tree and a card'),
      text: x(
        'מספר דרך החיים יוצא מספרות התאריך. מספר השם יוצא מהאותיות. העץ והקלף הם דימויים לאותו יום לידה, כל אחד בשפה שלו.',
        'The life path number comes from the digits of the date. The name number comes from the letters. The tree and the card are images of that same birthday, each in its own language.',
      ),
    },
    {
      title: x('ואיפה כל הכוכבים?', 'And where are all the planets?'),
      text: x(
        'כאן הדיוקן האישי. גלגל עם מרקורי, ונוס, מאדים, הבתים וההיבטים יושב במפת הלידה המלאה. גם היא בחינם, ואפשר לעבור אליה מהדיוקן עצמו.',
        'This page is the personal portrait. A wheel with Mercury, Venus, Mars, the houses and the aspects lives on the full natal chart. That is free too, and you can open it from the portrait itself.',
      ),
    },
  ] as ChartAbout[],
  faq: [
    {
      q: x('מה ההבדל בין הדיוקן למפת הלידה המלאה?', 'What is the difference between the portrait and the full natal chart?'),
      a: x(
        'הדיוקן מרכז מזל, לוח עברי, שנה סינית, מספרים, עץ וקלף. מפת הלידה המלאה מציירת את השמיים: כל הגופים, הבתים והזוויות. שתיהן בחינם. אם מתחילים — נוח להתחיל כאן.',
        'The portrait gathers the sign, the Hebrew calendar, the Chinese year, the numbers, the tree and the card. The full natal chart draws the sky: every body, the houses and the angles. Both are free. If you are starting, this page is the easier door.',
      ),
    },
    {
      q: x('האם חייבים שעת לידה?', 'Do I need a birth time?'),
      a: x(
        'לא. בלי שעה מתקבלים מזל השמש, המזל העברי, השנה הסינית, המספרים, העץ, הקלף ותחומי החיים. שעה ועיר מוסיפות את המזל העולה, והעיר לבדה נותנת ירח משוער.',
        'No. Without a time you still get the Sun sign, the Hebrew sign, the Chinese year, the numbers, the tree, the card and the life areas. A time and a city add the rising sign, and a city alone gives an estimated Moon.',
      ),
    },
    {
      q: x('מה זה "נולדתי אחרי השקיעה"?', 'What does “born after sunset” mean?'),
      a: x(
        'ביום העברי הערב כבר שייך למחר. אם נולדת אחרי השקיעה, סמן זאת כדי שהמזל העברי והשבט יחושבו ליום הנכון. זה לא משנה את מזל השמש.',
        'In the Hebrew day, evening already belongs to tomorrow. If you were born after sunset, mark it so the Hebrew sign and tribe use the right day. It does not change the Sun sign.',
      ),
    },
    {
      q: x('האם משהו כאן בתשלום?', 'Is anything here paid?'),
      a: x(
        'לא. כל הפרקים בעמוד הזה, וגם מפת הלידה המלאה, פתוחים בלי הרשמה ובלי תשלום.',
        'No. Every chapter on this page, and the full natal chart too, is open with no signup and no payment.',
      ),
    },
    {
      q: x('אפשר לבנות מפה למישהו אחר?', 'Can I build a chart for someone else?'),
      a: x(
        'כן. כותבים את השם ואת תאריך הלידה שלו. אם יש שעה ועיר — גם אותן. שום חשבון לא קושר את המפה אליך.',
        'Yes. Type their name and birth date. If you have a time and a city, add those too. No account ties the chart to you.',
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
