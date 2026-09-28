/**
 * tool-info.ts — הסבר מורחב לכל אחת משבע המפות האסטרולוגיות:
 * מה זה, מה צריך, מה מקבלים, איך לקרוא, טיפ, ופרקי העמקה.
 */
import type { L } from './astro.ts';

export interface ToolInfo {
  fits: L;          // למי / מתי זה מתאים (שורה אחת לרשימה)
  what: L;
  needs: L[];
  get: L[];
  read: L;
  tip: L;
  deep: { title: L; text: L }[];
}

const x = (he: string, en: string): L => ({ he, en });

export const TOOL_INFO: Record<string, ToolInfo> = {
  natal: {
    fits: x('להכיר את עצמך לעומק — נקודת ההתחלה לכל השאר', 'Knowing yourself in depth — the starting point for everything else'),
    what: x('מפת לידה היא תמונה של השמיים ברגע ובמקום שבהם נולדת: איפה עמדו השמש, הירח ושמונת הכוכבים, באיזה מזל ובאיזה בית. זה הבסיס של כל עבודה אסטרולוגית.',
      'A birth chart is a picture of the sky at the moment and place you were born: where the Sun, Moon and eight planets stood, in which sign and house. It is the basis of all astrological work.'),
    needs: [x('תאריך לידה', 'Date of birth'), x('שעת לידה מדויקת (רצוי מתעודת הלידה)', 'Exact birth time (ideally from the birth certificate)'), x('מקום לידה', 'Place of birth')],
    get: [x('"השלושה הגדולים": שמש, ירח ומזל עולה', 'The "big three": Sun, Moon and Ascendant'), x('כל הכוכבים במזלות ובבתים, עם פירוש', 'Every planet in its sign and house, interpreted'),
      x('ההיבטים החשובים בין הכוכבים', 'The key aspects between planets'), x('איזון יסודות ואיכויות', 'Balance of elements and modes'), x('גלגל מפה מצויר', 'A drawn chart wheel')],
    read: x('התחילו מהשמש (הזהות והמטרה), הירח (הצרכים הרגשיים) והמזל העולה (איך נראים לעולם). אחר כך עברו לכוכבים האישיים — כוכב חמה (חשיבה), נוגה (אהבה וטעם), מאדים (פעולה). בסוף קראו את ההיבטים: טריגון וסקסטיל זורמים, ריבוע ואופוזיציה יוצרים מתח שמניע לצמיחה.',
      'Start with the Sun (identity and purpose), Moon (emotional needs) and Ascendant (how the world sees you). Then the personal planets — Mercury (thinking), Venus (love and taste), Mars (action). Finally the aspects: trines and sextiles flow, squares and oppositions create tension that drives growth.'),
    tip: x('בלי שעת לידה המפה עדיין שימושית, אבל בלי בתים ובלי מזל עולה. הירח זז כ-13° ביום, כך שגם מיקומו פחות מדויק.', 'Without a birth time the chart is still useful, but has no houses or Ascendant. The Moon moves about 13° a day, so its position is less exact.'),
    deep: [
      { title: x('12 הבתים', 'The 12 houses'), text: x('1 עצמי וגוף · 2 כסף וערכים · 3 תקשורת, אחים, לימוד · 4 בית ושורשים · 5 יצירה, אהבה, ילדים · 6 עבודה יומיומית ובריאות · 7 זוגיות ושותפויות · 8 משברים, מיניות, משאבים משותפים · 9 אמונה, מסעות, השכלה גבוהה · 10 קריירה ומעמד · 11 חברים וקהילה · 12 הלא מודע, בדידות, רוחניות.', '1 self and body · 2 money and values · 3 communication, siblings, learning · 4 home and roots · 5 creativity, romance, children · 6 daily work and health · 7 partnership · 8 crisis, sexuality, shared resources · 9 belief, travel, higher learning · 10 career and status · 11 friends and community · 12 the unconscious, solitude, spirituality.') },
      { title: x('חמשת ההיבטים המרכזיים', 'The five major aspects'), text: x('צמידות 0° — מיזוג כוחות · סקסטיל 60° — הזדמנות · ריבוע 90° — מתח ואתגר · טריגון 120° — הרמוניה וכישרון · אופוזיציה 180° — קוטביות שדורשת איזון.', 'Conjunction 0° — merging · Sextile 60° — opportunity · Square 90° — tension and challenge · Trine 120° — harmony and talent · Opposition 180° — polarity that needs balance.') },
      { title: x('עשרת הגופים', 'The ten bodies'), text: x('שמש — זהות · ירח — רגש · כוכב חמה — מחשבה · נוגה — אהבה · מאדים — פעולה · צדק — צמיחה ומזל · שבתאי — גבולות ואחריות · אורנוס — שינוי פתאומי · נפטון — חלום ורוחניות · פלוטו — טרנספורמציה.', 'Sun — identity · Moon — emotion · Mercury — mind · Venus — love · Mars — action · Jupiter — growth and luck · Saturn — limits and responsibility · Uranus — sudden change · Neptune — dreams and spirit · Pluto — transformation.') },
    ],
  },
  karmic: {
    fits: x('שאלות של ייעוד: מאיפה באתי ולאן אני הולך', 'Questions of purpose: where I come from and where I\'m going'),
    what: x('קריאה קרמתית מתמקדת בציר קשרי הירח (ראש וזנב הדרקון), בכוכבים שנולדו בנסיגה ובנקודות גורל. היא מתארת את הכיוון שהנשמה מתבקשת לגדול אליו, ואת מה שכבר מוכר ונוח.',
      'A karmic reading focuses on the lunar nodes (dragon\'s head and tail), planets born retrograde and the lots. It describes the direction the soul is asked to grow toward, and what is already familiar and easy.'),
    needs: [x('תאריך לידה', 'Date of birth'), x('שעת לידה (לבתים ולנקודות הגורל)', 'Birth time (for houses and lots)'), x('מקום לידה', 'Place of birth')],
    get: [x('הקשר הצפוני — הכיוון לצמיחה', 'North Node — the direction of growth'), x('הקשר הדרומי — כישרונות והרגלים מוכרים', 'South Node — familiar talents and habits'),
      x('כוכבים בנסיגה — נושאים לעבודה פנימית', 'Retrograde planets — themes for inner work'), x('נקודת המזל (Fortune) ושיעורים נוספים', 'The Lot of Fortune and further lessons')],
    read: x('הקשר הדרומי מראה מה קל ומוכר; הצפוני — מה מאתגר אבל מצמיח. המטרה אינה לוותר על הדרום אלא להשתמש בו כבסיס כדי לנוע צפונה. כוכב בנסיגה מבטא את תכונתו באופן פנימי ומעמיק יותר.',
      'The South Node shows what is easy and familiar; the North what is challenging but growth-giving. The aim is not to abandon the South but to use it as a base for moving North. A retrograde planet expresses its nature inwardly and more deeply.'),
    tip: x('הקשרים נעים לאחור וחוזרים למקומם בכל 18.6 שנים בערך — סביב גיל 18–19, 37 ו-56 רבים מרגישים נקודת מפנה.', 'The nodes move backward and return about every 18.6 years — around ages 18–19, 37 and 56 many feel a turning point.'),
    deep: [
      { title: x('מה זה קשרי הירח?', 'What are the lunar nodes?'), text: x('שתי הנקודות שבהן מסלול הירח חוצה את מסלול השמש. שם מתרחשים ליקויים — ולכן במסורת הן קשורות לגורל ול"נקודות מפנה".', 'The two points where the Moon\'s path crosses the Sun\'s. Eclipses happen there — so tradition ties them to fate and turning points.') },
      { title: x('נקודות גורל', 'The lots'), text: x('נקודות מחושבות מהמרחק בין שני גופים ומהמזל העולה. המפורסמת היא נקודת המזל (Pars Fortunae) — היכן קל לך לקבל שפע ושמחה.', 'Points calculated from the distance between two bodies and the Ascendant. The best known is the Lot of Fortune — where abundance and joy come easily.') },
    ],
  },
  forecast: {
    fits: x('מה עובר עליי עכשיו ומה צפוי בשנה הקרובה', 'What I\'m going through now and what the coming year holds'),
    what: x('תחזית אסטרולוגית משווה את מיקום הכוכבים היום ובחודשים הבאים למפת הלידה שלך, ומוסיפה את מפת השנה האישית (חזרת השמש) ואת ההתפתחות האיטית של המפה (קידומים).',
      'A forecast compares where the planets are now and in the coming months with your birth chart, and adds your personal year chart (solar return) and the slow unfolding of the chart (progressions).'),
    needs: [x('פרטי לידה מלאים', 'Full birth details'), x('לא חובה: המקום שבו תהיו ביום ההולדת', 'Optional: where you\'ll be on your birthday')],
    get: [x('טרנזיטים פעילים עכשיו', 'Transits active now'), x('טרנזיטים חשובים בשנה הקרובה, עם תאריכים', 'Important transits in the coming year, with dates'),
      x('חזרת השמש — מפת השנה מיום הולדת ליום הולדת', 'Solar return — the chart of your year'), x('קידומים — שינויים פנימיים איטיים', 'Progressions — slow inner changes')],
    read: x('טרנזיט של כוכב איטי (צדק, שבתאי, אורנוס, נפטון, פלוטו) מסמן תקופה של חודשים; של כוכב מהיר — ימים עד שבועות. בחזרת השמש שימו לב למזל העולה של השנה ולבית שבו נמצאת השמש: זה תחום החיים המודגש.',
      'A transit of a slow planet (Jupiter to Pluto) marks a period of months; a fast planet — days to weeks. In the solar return, note the year\'s Ascendant and the house holding the Sun: that is the highlighted area of life.'),
    tip: x('מפת חזרת השמש תלויה במקום שבו אתם ביום ההולדת — יש מי שבוחרים לנסוע כדי "לשפר" אותה.', 'The solar return chart depends on where you are on your birthday — some travel to "improve" it.'),
    deep: [
      { title: x('טרנזיטים', 'Transits'), text: x('כוכב שעובר כעת על נקודה במפת הלידה שלך יוצר איתה היבט. צדק מביא הרחבה, שבתאי — מבחן ומבנה, אורנוס — הפתעה, נפטון — ערפל והשראה, פלוטו — שינוי עמוק.', 'A planet now passing a point in your birth chart forms an aspect with it. Jupiter brings expansion, Saturn tests and structure, Uranus surprise, Neptune fog and inspiration, Pluto deep change.') },
      { title: x('קידומים', 'Progressions'), text: x('שיטה שבה יום אחד אחרי הלידה מייצג שנה אחת בחיים. הירח המקודם מחליף מזל כל כשנתיים וחצי ומסמן שינוי באווירה הרגשית.', 'A method where each day after birth stands for a year of life. The progressed Moon changes sign about every two and a half years, marking a shift in emotional climate.') },
    ],
  },
  synastry: {
    fits: x('זוגיות, שותפות או כל קשר חשוב', 'Romance, partnership or any important relationship'),
    what: x('סינסטרי משווה בין שתי מפות לידה: איך הכוכבים של אדם אחד נוגעים במפה של השני. בנוסף נבנית מפת קומפוזיט — מפה אחת של הקשר עצמו, מנקודות האמצע של שתי המפות.',
      'Synastry compares two birth charts: how one person\'s planets touch the other\'s chart. A composite chart is also built — one chart of the relationship itself, from the midpoints of both charts.'),
    needs: [x('פרטי לידה של שני האנשים', 'Birth details for both people'), x('שעות לידה — לבתים ולקומפוזיט מדויק', 'Birth times — for houses and an accurate composite')],
    get: [x('ההיבטים החשובים בין המפות', 'Key aspects between the charts'), x('כוכבים של אחד בבתים של השני', 'One person\'s planets in the other\'s houses'), x('מפת קומפוזיט של הקשר', 'A composite chart of the relationship')],
    read: x('שמש–ירח ונוגה–מאדים מדברים על משיכה וחום; כוכב חמה — על תקשורת; שבתאי — על מחויבות ולפעמים כובד. ריבועים הם חיכוך, אבל חיכוך הוא גם מה שמחזיק קשר ער.',
      'Sun–Moon and Venus–Mars speak of attraction and warmth; Mercury of communication; Saturn of commitment and sometimes weight. Squares are friction — but friction also keeps a bond alive.'),
    tip: x('אין מפה "מושלמת" לזוגיות. כל קשר משלב חיבורים קלים ומאתגרים, והשאלה היא איך עובדים איתם.', 'There is no "perfect" couple chart. Every bond mixes easy and hard contacts; what matters is how you work with them.'),
    deep: [
      { title: x('מה ההבדל מ"התאמה זוגית"?', 'How is this different from Compatibility?'), text: x('"התאמה זוגית" נותנת ציון מהיר לפי מזלות ומספרים. סינסטרי משתמש במפות המלאות, כולל שעה ומקום, ולכן מדויק ומפורט הרבה יותר.', 'Compatibility gives a quick score from signs and numbers. Synastry uses the full charts, including time and place, so it is far more precise and detailed.') },
    ],
  },
  horary: {
    fits: x('שאלה אחת ממוקדת שמטרידה אותך עכשיו', 'One focused question that is on your mind now'),
    what: x('אסטרולוגיה שעתית (הוררית) עונה על שאלה אחת לפי מפת הרגע שבו נשאלה. זו שיטה עתיקה שפותחה בימי הביניים ושוכללה במאה ה-17 (ויליאם לילי). המפה לא מתארת אותך — אלא את השאלה.',
      'Horary astrology answers one question from the chart of the moment it was asked. It is an old method refined in the 17th century (William Lilly). The chart describes the question, not you.'),
    needs: [x('שאלה ברורה ומנוסחת היטב', 'A clear, well-phrased question'), x('נושא השאלה (אהבה, עבודה, כסף…)', 'The topic (love, work, money…)'), x('הרגע — עכשיו או זמן אחר', 'The moment — now or another time'), x('המקום שבו נשאלה', 'Where it was asked')],
    get: [x('האם המפה "כשירה" לשיפוט', 'Whether the chart is fit to judge'), x('המסמנים: אתה ונושא השאלה', 'The significators: you and the matter'), x('האם ואיך הם נפגשים — תשובה ותזמון', 'Whether and how they meet — answer and timing'), x('מצב הירח', 'The Moon\'s condition')],
    read: x('אם המסמנים מתקרבים להיבט — הדבר צפוי לקרות, ומספר המעלות עד ההיבט רומז על הזמן. אם הם מתרחקים — העניין כבר מאחור. ירח "ריק מהלך" (לא יוצר היבט לפני שיצא מהמזל) מסמן לרוב ש"לא ייצא מזה דבר".',
      'If the significators are applying to an aspect, the matter is likely to happen, and the degrees to perfection hint at timing. If separating, the matter is behind you. A void-of-course Moon usually means "nothing will come of it".'),
    tip: x('שאלו רק שאלה שבאמת חשובה לכם עכשיו, ורק פעם אחת. שאלה חוזרת על אותו נושא נחשבת במסורת לא כשירה.', 'Ask only a question that truly matters now, and only once. Repeating the same question is traditionally considered invalid.'),
    deep: [
      { title: x('איך מנסחים שאלה טובה?', 'How to phrase a good question'), text: x('שאלה אחת, ספציפית, שאפשר לענות עליה: "האם אקבל את המשרה ב…?" ולא "מה יהיה עם העבודה שלי?".', 'One specific, answerable question: "Will I get the job at…?" rather than "What will happen with my work?"') },
    ],
  },
  election: {
    fits: x('בחירת תאריך לחתונה, עסק, חוזה או מעבר', 'Choosing a date for a wedding, business, contract or move'),
    what: x('אסטרולוגיית בחירה מחפשת את הרגע הטוב ביותר להתחיל משהו. היא סורקת את טווח התאריכים והשעות שבחרתם ומדרגת כל מועד לפי תנאי השמיים.',
      'Electional astrology looks for the best moment to begin something. It scans the dates and hours you choose and ranks each moment by the sky\'s conditions.'),
    needs: [x('סוג האירוע', 'Type of event'), x('טווח תאריכים (עד 60 יום)', 'A date range (up to 60 days)'), x('טווח שעות ביום', 'An hour range each day'), x('מקום האירוע', 'Place of the event')],
    get: [x('המועדים המובילים, עם ציון', 'Top moments, each scored'), x('מה טוב ומה פחות בכל מועד', 'What\'s good and less good at each'), x('תקופות שכדאי להימנע מהן (כוכבים בנסיגה)', 'Periods to avoid (retrograde planets)')],
    read: x('הציון נבנה מתנאים כמו: ירח מתמלא, ירח חזק במזלו, ירח שפונה לנוגה או לצדק ולא למאדים או לשבתאי, כוכב חמה ישר לחוזים, נוגה ישר לחתונה. בחרו מתוך שלושת המועדים הראשונים את מה שנוח לכם גם מעשית.',
      'The score is built from conditions such as: a waxing Moon, a Moon strong in its sign, a Moon heading to Venus or Jupiter rather than Mars or Saturn, direct Mercury for contracts, direct Venus for weddings. Pick from the top three what also works practically.'),
    tip: x('המועד הוא רגע ההתחלה עצמו — החתימה, הטבעת, פתיחת הדלת — ולא היום כולו.', 'The moment is the start itself — the signature, the ring, opening the door — not the whole day.'),
    deep: [
      { title: x('למה הירח כל כך חשוב?', 'Why the Moon matters so much'), text: x('הירח הוא הגוף המהיר ביותר ומתאר את "זרימת האירועים" אחרי ההתחלה. ירח מתמלא מסמן צמיחה; ירח ריק מהלך — עניין שלא מתפתח.', 'The Moon is the fastest body and describes how events flow after the start. A waxing Moon means growth; a void Moon means a matter that doesn\'t develop.') },
    ],
  },
  mundane: {
    fits: x('מדינות, אירועים עולמיים ומגמות של השנה', 'Nations, world events and the trends of the year'),
    what: x('אסטרולוגיה עולמית עוסקת במה שקורה לכולנו: מפת "לידה" של מדינה, מעברים של כוכבים איטיים בין מזלות, מפגשים בין כוכבים איטיים (מחזורים) וליקויים.',
      'Mundane astrology deals with what happens to all of us: a nation\'s "birth" chart, slow planets changing signs, meetings between slow planets (cycles) and eclipses.'),
    needs: [x('מדינה מהרשימה, או אירוע משלך (שם, תאריך, שעה, מקום)', 'A nation from the list, or your own event (name, date, time, place)')],
    get: [x('מפת המדינה: שמש, ירח, מזל עולה ואמצע השמיים', 'The national chart: Sun, Moon, Ascendant and Midheaven'), x('טרנזיטים חשובים על מפת המדינה', 'Major transits to the national chart'),
      x('השמיים של השנה: כניסות למזלות, מחזורים וליקויים', 'The sky of the year: ingresses, cycles and eclipses')],
    read: x('מפגש צדק–שבתאי (כל כ-20 שנה) מסמן שינוי חברתי וכלכלי; כוכב איטי שנכנס למזל חדש צובע תקופה שלמה. ליקוי שנופל על נקודה חשובה במפת המדינה מסמן נקודת מפנה.',
      'A Jupiter–Saturn meeting (every ~20 years) marks social and economic change; a slow planet entering a new sign colors a whole era. An eclipse on a key point of the national chart marks a turning point.'),
    tip: x('מפת מדינה תלויה ברגע ההכרזה, ולעיתים יש כמה גרסאות. לישראל משמשת ההכרזה ב-14 במאי 1948, 16:00 בתל אביב.', 'A national chart depends on the moment of declaration, and there may be several versions. For Israel, 14 May 1948, 16:00 in Tel Aviv is used.'),
    deep: [
      { title: x('מחזורים גדולים', 'Great cycles'), text: x('צדק–שבתאי (~20 שנה), שבתאי–אורנוס (~45), שבתאי–פלוטו (~33) ואורנוס–פלוטו (~127). כל מפגש פותח פרק חדש בנושאים של שני הכוכבים.', 'Jupiter–Saturn (~20 yrs), Saturn–Uranus (~45), Saturn–Pluto (~33) and Uranus–Pluto (~127). Each meeting opens a new chapter in the themes of both planets.') },
    ],
  },
};

export const CHART_GUIDE: { q: L; tool: string }[] = [
  { q: x('רוצים להכיר את עצמכם?', 'Want to know yourself?'), tool: 'natal' },
  { q: x('מה עובר עליכם השנה?', 'What\'s your year about?'), tool: 'forecast' },
  { q: x('בודקים קשר עם מישהו?', 'Looking at a relationship?'), tool: 'synastry' },
  { q: x('יש שאלה אחת בוערת?', 'One burning question?'), tool: 'horary' },
  { q: x('צריכים לבחור תאריך?', 'Need to pick a date?'), tool: 'election' },
];
