/**
 * life-areas.ts — פירוט המפה האישית לפי תחומי חיים:
 * אישיות, קריירה, כסף, אהבה, בריאות, חוזקות ואתגרים — לפי המזל המערבי,
 * בתוספת דרך החיים (קריירה וזוגיות), מזלות וחיות מתאימים, ויום המזל.
 */
import { CHINESE_ANIMALS, ZODIAC, reduceNumber, type L, type Profile } from './astro';

const x = (he: string, en: string): L => ({ he, en });
interface SignAreas { career: L; money: L; love: L; health: L; strengths: L; challenges: L }

export const SIGN_AREAS: Record<string, SignAreas> = {
  aries: {
    career: x('מתאים לתפקידים של הובלה, יזמות ותחרות: ניהול, מכירות, ספורט, חירום וביטחון. פורח כשיש אתגר ותוצאה מהירה.', 'Suited to leading, entrepreneurial, competitive roles: management, sales, sport, emergency services. Thrives on challenge and quick results.'),
    money: x('מרוויח מהר ומוציא מהר. כדאי לבנות הרגל של חיסכון אוטומטי ולא להחליט על השקעות בדחף.', 'Earns fast and spends fast. Build an automatic saving habit and avoid impulse investing.'),
    love: x('מחזר ישיר ונלהב שאוהב את ההתחלה. צריך בן/בת זוג עם אנרגיה ועצמאות, שלא ייבהלו מהלהט.', 'A direct, passionate pursuer who loves beginnings. Needs a partner with energy and independence who isn\'t scared by the fire.'),
    health: x('אנרגיה גבוהה שצריכה פורקן — ספורט אינטנסיבי מתאים. במסורת: הראש והפנים; לשים לב לכאבי ראש ולחץ.', 'High energy needing release — intense sport suits. Traditionally the head and face; watch for headaches and stress.'),
    strengths: x('אומץ, יוזמה וכנות. זה מה שפותח לך דלתות: להתחיל כשאחרים עוד מתלבטים, ולהגיד את האמת בלי עיגול פינות.', 'Courage, initiative and honesty. This is what opens doors: starting while others are still deciding, and saying the truth without rounding the corners.'),
    challenges: x('חוסר סבלנות וכעס מהיר, והרבה התחלות בלי סיום. מה שעוזר: לבחור דבר אחד ולגמור אותו לפני שקופצים לבא.', 'Impatience, quick anger, and many starts without a finish. What helps: pick one thing and finish it before jumping to the next.'),
  },
  taurus: {
    career: x('טוב בכל מה שבונה ערך לאורך זמן: פיננסים, נדל״ן, אוכל, עיצוב, אומנות וחקלאות. מעדיף יציבות על פני הימור.', 'Good at building lasting value: finance, real estate, food, design, art and agriculture. Prefers stability over gambling.'),
    money: x('חוסך טבעי שאוהב ביטחון כלכלי ודברים איכותיים. הסכנה — להיאחז במה שיש ולפספס הזדמנויות.', 'A natural saver who loves financial security and quality things. The risk — clinging to what you have and missing chances.'),
    love: x('נאמן, חושני ויציב. בונה קשר לאט אבל לטווח ארוך; צריך ביטחון, מגע ותשומת לב קבועה.', 'Loyal, sensual and steady. Builds slowly but for the long term; needs security, touch and steady attention.'),
    health: x('גוף חזק שנהנה מאוכל טוב — כדאי לשמור על תנועה. במסורת: הצוואר והגרון.', 'A strong body that enjoys good food — keep moving. Traditionally the neck and throat.'),
    strengths: x('התמדה ואמינות. אנשים חוזרים אליך כי מה שהתחלת נשאר, וכי אפשר לסמוך על המילה שלך.', 'Persistence and reliability. People come back because what you start stays, and because your word can be counted on.'),
    challenges: x('עקשנות וקושי לזוז כשמשהו כבר לא עובד. מה שעוזר: לשאול פעם בחודש אם ההרגל הזה עוד משרת אותך.', 'Stubbornness and trouble moving when something no longer works. What helps: once a month, ask whether this habit still serves you.'),
  },
  gemini: {
    career: x('תקשורת, כתיבה, הוראה, שיווק, מסחר ומדיה. זקוק לגיוון ולאנשים; משעמם לו בשגרה חוזרת.', 'Communication, writing, teaching, marketing, trade and media. Needs variety and people; routine bores him.'),
    money: x('מוצא הזדמנויות רבות במקביל, אבל מתפזר. כדאי לרכז מקורות הכנסה ולעקוב אחרי הוצאות קטנות.', 'Finds many parallel opportunities but scatters. Concentrate income sources and track small expenses.'),
    love: x('צריך בן/בת זוג שהוא גם חבר ושיחה טובה. שעמום הוא האויב — סקרנות וצחוק מחזיקים את הקשר.', 'Needs a partner who is also a friend and good conversation. Boredom is the enemy — curiosity and laughter keep it alive.'),
    health: x('מערכת עצבים רגישה ומחשבות שרצות — חשובים שינה, נשימה והפסקות. במסורת: הידיים, הכתפיים והריאות.', 'A sensitive nervous system and racing thoughts — sleep, breathing and breaks matter. Traditionally hands, shoulders and lungs.'),
    strengths: x('שנינות, גמישות וסקרנות. זה מה שפותח לך דלתות: להסביר, לחבר בין אנשים, ולמצוא ניסוח שכולם מבינים.', 'Wit, flexibility and curiosity. This is what opens doors: explaining, connecting people, and finding wording everyone understands.'),
    challenges: x('פיזור וקושי להעמיק. מה שעוזר: דבר אחד ליום, עד הסוף, לפני שפותחים את הדבר הבא.', 'Scattering and trouble going deep. What helps: one thing a day, through to the end, before opening the next.'),
  },
  cancer: {
    career: x('תחומים של טיפול, חינוך, בריאות, אוכל, נדל״ן ומשאבי אנוש. עובד הכי טוב בסביבה שמרגישה כמו משפחה.', 'Care, education, health, food, real estate and HR. Works best in a family-like environment.'),
    money: x('חוסך למען הביטחון של הבית. אינטואיציה טובה לכסף, אבל פחד עלול לעצור השקעה נכונה.', 'Saves for home security. Good money intuition, but fear may block a sound investment.'),
    love: x('אוהב עמוק, מגונן ומשפחתי. צריך ביטחון רגשי ומחויבות; פגיעות מסתתרת מאחורי שריון.', 'Loves deeply, protective and family-minded. Needs emotional security and commitment; vulnerability hides behind armour.'),
    health: x('הרגש משפיע ישירות על הגוף, במיוחד על העיכול. במסורת: הקיבה והחזה. חשוב לעבד רגשות ולא לבלוע אותם.', 'Emotions affect the body directly, especially digestion. Traditionally stomach and chest. Process feelings rather than swallow them.'),
    strengths: x('רגישות ונאמנות. אתה קולט מה אדם צריך לפני שהוא מבקש, ומי שנכנס אליך נשאר עם תחושת בית.', 'Sensitivity and loyalty. You notice what a person needs before they ask, and whoever comes in stays with the feeling of home.'),
    challenges: x('מצבי רוח והיאחזות בעבר. מה שעוזר: להגיד את הפגיעה באותו יום, לא לשמור אותה לשבוע הבא.', 'Moods and clinging to the past. What helps: say the hurt on the same day, instead of saving it for next week.'),
  },
  leo: {
    career: x('במה, ניהול, יצירה ובידור, חינוך ופוליטיקה. צריך מקום להוביל, להופיע ולקבל הכרה.', 'The stage, management, creativity, entertainment, education and politics. Needs room to lead, perform and be recognised.'),
    money: x('נדיב ואוהב איכות וראוותנות. כדאי לתכנן כדי שהנדיבות לא תהפוך לבזבוז.', 'Generous and loves quality and flair. Plan so generosity doesn\'t become waste.'),
    love: x('רומנטי, חם ונאמן מאוד. צריך הערכה, מחמאות והרבה תשומת לב — ונותן את אותו הדבר בחזרה.', 'Romantic, warm and very loyal. Needs appreciation, compliments and attention — and gives the same back.'),
    health: x('חיוניות גבוהה ולב גדול, פשוטו כמשמעו: במסורת הלב והגב. חשוב פעילות לבבית ולנוח כשצריך.', 'High vitality and a big heart, literally: traditionally heart and back. Cardio matters, and rest when needed.'),
    strengths: x('ביטחון ונדיבות. אנשים נמשכים אליך כי אתה נותן חום ומקום, ולא רק תופס את הבמה לעצמך.', 'Confidence and generosity. People are drawn to you because you give warmth and room, not only take the stage.'),
    challenges: x('צורך בהכרה, ודרמה כשלא רואים אותך. מה שעוזר: לבקש את המחמאה במקום לבדוק אם היא מגיעה לבד.', 'A need to be recognised, and drama when you are not seen. What helps: ask for the compliment instead of checking whether it arrives on its own.'),
  },
  virgo: {
    career: x('דיוק וסדר: רפואה, מחקר, ניתוח נתונים, עריכה, הנהלת חשבונות ושירות. מצטיין בשיפור מערכות.', 'Precision and order: medicine, research, data analysis, editing, accounting and service. Excels at improving systems.'),
    money: x('מתכנן, חוסך ובודק כל פרט. הסכנה היחידה — דאגה מוגזמת שמונעת ליהנות מהכסף.', 'Plans, saves and checks every detail. The only risk — excessive worry that prevents enjoying money.'),
    love: x('מראה אהבה דרך מעשים ועזרה מעשית. צריך קשר רגוע ונקי מדרמה; לומד להרפות מביקורת.', 'Shows love through deeds and practical help. Needs a calm, drama-free bond; learning to let go of criticism.'),
    health: x('מודעות גבוהה לבריאות ולתזונה. במסורת: מערכת העיכול. דאגה ולחץ עלולים להתבטא בגוף.', 'High health and nutrition awareness. Traditionally the digestive system. Worry may show in the body.'),
    strengths: x('דיוק ורצון לעזור. אתה רואה את התקלה לפני כולם, ומתקן אותה בלי רעש.', 'Precision and a wish to help. You see the fault before everyone else, and you fix it without noise.'),
    challenges: x('פרפקציוניזם ודאגה שלא נגמרת. מה שעוזר: להחליט מראש מה "מספיק טוב" ולעצור שם.', 'Perfectionism and worry that does not end. What helps: decide in advance what "good enough" is, and stop there.'),
  },
  libra: {
    career: x('משפט, גישור, עיצוב, אופנה, יחסי ציבור ודיפלומטיה. עובד הכי טוב בשותפות ובסביבה אסתטית.', 'Law, mediation, design, fashion, PR and diplomacy. Works best in partnership and a beautiful setting.'),
    money: x('אוהב יופי ונוחות ומוכן להשקיע בהם. כדאי להחליט על תקציב ולא להשאיר החלטות כספיות "לאחר כך".', 'Loves beauty and comfort and invests in them. Set a budget and don\'t leave money decisions "for later".'),
    love: x('זוגיות היא מרכז החיים. רומנטי, מתחשב ומחפש הרמוניה; צריך לזכור לבטא גם את הצרכים שלו.', 'Partnership is central. Romantic, considerate and seeking harmony; must remember to voice his own needs too.'),
    health: x('איזון הוא המפתח — שינה, אוכל ומנוחה. במסורת: הכליות והגב התחתון.', 'Balance is key — sleep, food and rest. Traditionally the kidneys and lower back.'),
    strengths: x('הוגנות וטעם. אתה מרגיע חדר, מוצא ניסוח שלא פוצע, ורואה מה חסר כדי שמשהו ייראה שלם.', 'Fairness and taste. You calm a room, find wording that does not wound, and see what is missing for something to look whole.'),
    challenges: x('התלבטות ורצון שכולם יהיו מרוצים. מה שעוזר: לבחור גם כששתי האפשרויות טובות, ולהגיד מה אתה רוצה לפני ששואלים.', 'Indecision and wanting everyone pleased. What helps: choose even when both options are good, and say what you want before anyone asks.'),
  },
  scorpio: {
    career: x('עומק ומחקר: פסיכולוגיה, בילוש, מחקר, רפואה, פיננסים ומשברים. מצטיין במה שאחרים מפחדים לגעת בו.', 'Depth and investigation: psychology, detection, research, medicine, finance and crisis. Excels where others fear to tread.'),
    money: x('אסטרטג כלכלי עם חוש לכסף משותף, השקעות וירושות. שומר קלפים קרוב לחזה.', 'A financial strategist with a sense for shared money, investments and inheritance. Keeps cards close.'),
    love: x('אוהב בעוצמה, בנאמנות מוחלטת ובתשוקה. צריך אמון מלא; קנאה ושליטה הן המבחן שלו.', 'Loves intensely, with total loyalty and passion. Needs full trust; jealousy and control are his test.'),
    health: x('כוח התאוששות מרשים. במסורת: מערכת הרבייה וההפרשה. חשוב לשחרר רגשות כבדים ולא לאגור אותם.', 'Impressive recovery power. Traditionally reproductive and excretory systems. Release heavy feelings rather than hoard them.'),
    strengths: x('עומק ונאמנות. כשאתה בפנים, אתה בפנים עד הסוף, ואתה קולט מה לא נאמר.', 'Depth and loyalty. When you are in, you are in to the end, and you notice what was not said.'),
    challenges: x('חשד וקושי לשחרר פגיעה. מה שעוזר: לבדוק עובדה אחת לפני שמסיקים, ולהגיד את הכעס לפני שהוא הופך לשתיקה.', 'Suspicion and trouble letting a hurt go. What helps: check one fact before you conclude, and say the anger before it becomes silence.'),
  },
  sagittarius: {
    career: x('השכלה, הוראה, תיירות, משפט, פילוסופיה, פרסום והוצאה לאור. צריך חופש, משמעות ומרחב.', 'Higher education, teaching, travel, law, philosophy, publishing. Needs freedom, meaning and space.'),
    money: x('אופטימי ונדיב — לפעמים יותר מדי. מזל טוב בכסף, אבל כדאי לבנות רשת ביטחון.', 'Optimistic and generous — sometimes too much. Lucky with money, but build a safety net.'),
    love: x('צריך בן/בת זוג שהוא גם שותף להרפתקאות. כן, מצחיק וחופשי; מחויבות מגיעה כשיש מרחב.', 'Needs a partner who shares adventures. Honest, funny and free; commitment comes when there is space.'),
    health: x('אוהב תנועה וחוץ. במסורת: הירכיים והכבד — כדאי להיזהר מהגזמות באוכל ובשתייה.', 'Loves movement and the outdoors. Traditionally hips and liver — beware excess food and drink.'),
    strengths: x('אופטימיות וכנות. אתה פותח לאנשים אופק, ואומר את האמת בלי משחק.', 'Optimism and honesty. You open a horizon for people, and you say the truth without a game.'),
    challenges: x('דיבור חד מדי, והבטחות בחום של הרגע. מה שעוזר: לעצור שנייה לפני משפט, ולבדוק אם יש לך כוח לקיים אותו.', 'Speech that is too sharp, and promises made in the heat of the moment. What helps: pause one second before a sentence, and check whether you can keep it.'),
  },
  capricorn: {
    career: x('ניהול, הנדסה, פיננסים, ממשל ועסקים. בונה קריירה בסבלנות, שלב אחר שלב, עד לפסגה.', 'Management, engineering, finance, government and business. Builds a career patiently, step by step, to the top.'),
    money: x('הכי אחראי בגלגל: מתכנן לטווח ארוך, חוסך ומשקיע בחוכמה. לזכור גם ליהנות ממה שנבנה.', 'The most responsible on the wheel: plans long-term, saves and invests wisely. Remember to enjoy what you build.'),
    love: x('רציני ונאמן, מראה אהבה דרך אחריות ויציבות. נפתח לאט, אבל כשכבר מחויב — זה לתמיד.', 'Serious and loyal, shows love through responsibility and stability. Opens slowly, but once committed — it\'s for good.'),
    health: x('סיבולת גבוהה ועבודה קשה. במסורת: העצמות, המפרקים והברכיים. חשוב לנוח ולא רק לעבוד.', 'High endurance and hard work. Traditionally bones, joints and knees. Rest, don\'t only work.'),
    strengths: x('אחריות וסבלנות. אתה מסיים מה שהתחלת, ואנשים נותנים לך את מה שחשוב כי זה לא נופל.', 'Responsibility and patience. You finish what you start, and people give you what matters because it does not get dropped.'),
    challenges: x('קשיחות ועבודה בלי הפסקה. מה שעוזר: לקבוע שעת סיום מראש, ולנוח בלי לקרוא לזה בזבוז.', 'Rigidity and work without a break. What helps: set an end time in advance, and rest without calling it a waste.'),
  },
  aquarius: {
    career: x('טכנולוגיה, מדע, חדשנות, מגזר חברתי וארגונים. צריך חופש מחשבתי ומטרה שמשנה משהו בעולם.', 'Technology, science, innovation, social causes and organisations. Needs intellectual freedom and a world-changing aim.'),
    money: x('לא מונע מכסף אלא מרעיונות — ודווקא רעיונות מקוריים יכולים להפוך לרווח. כדאי מסגרת פשוטה לניהול.', 'Driven by ideas, not money — yet original ideas can become profit. A simple management framework helps.'),
    love: x('חבר קודם כול. צריך בן/בת זוג שמכבד את העצמאות ואת הייחודיות שלו. מביע רגש בדרכים לא שגרתיות.', 'A friend first. Needs a partner who respects independence and uniqueness. Expresses feeling unconventionally.'),
    health: x('ראש שלא עוצר. במסורת: השוקיים ומחזור הדם. תנועה ויציאה מהמסך חשובות.', 'A mind that never stops. Traditionally calves and circulation. Movement and screen breaks matter.'),
    strengths: x('מקוריות וראייה רחבה. אתה מביא פתרון שאחרים לא חשבו עליו, בלי לאבד את האדם שמולך.', 'Originality and a wide view. You bring a solution others did not think of, without losing the person in front of you.'),
    challenges: x('ריחוק ועיקשות על הרעיון. מה שעוזר: משפט אחד על מה שאתה מרגיש, לא רק על מה שנכון.', 'Distance and clinging to the idea. What helps: one sentence about what you feel, not only about what is correct.'),
  },
  pisces: {
    career: x('אמנות, מוזיקה, טיפול, רוחניות, רפואה ועבודה עם אנשים. מצליח כשיש משמעות ומקום לדמיון.', 'Art, music, therapy, spirituality, medicine and people work. Succeeds with meaning and room for imagination.'),
    money: x('נדיב ולא תמיד מעשי בכסף. כדאי להיעזר במישהו מסודר ולהגדיר גבולות לנתינה.', 'Generous and not always practical with money. Get an organised helper and set limits on giving.'),
    love: x('רומנטי, רגיש ומוסר את עצמו לגמרי. צריך קשר רוחני ועמוק — ולהיזהר מהתאהבות באידיאל ולא באדם.', 'Romantic, sensitive and gives completely. Needs a deep, spiritual bond — and must beware loving an ideal rather than a person.'),
    health: x('רגיש מאוד לסביבה ולאנרגיות. במסורת: כפות הרגליים ומערכת החיסון. מים, מנוחה ומוזיקה מרפאים.', 'Very sensitive to surroundings. Traditionally feet and immune system. Water, rest and music heal.'),
    strengths: x('חמלה ודמיון. אתה מרגיש אדם לפני שהוא מסביר, ויודע למצוא דרך רכה איפה שאחרים נתקעים.', 'Compassion and imagination. You feel a person before they explain, and you find a soft way where others get stuck.'),
    challenges: x('בריחה וויתור על עצמך. מה שעוזר: גבול אחד ברור ביום, ומנוחה לפני שאתה נגמר.', 'Escape and giving yourself away. What helps: one clear boundary a day, and rest before you run out.'),
  },
};

export const LIFE_PATH_AREAS: Record<number, { career: L; love: L }> = {
  1: {
    career: x('לאורך שנים אתה נמשך להחליט לבד: יזמות, הובלה, או עסק משלך. תפקיד שבו מחכים לאישור על כל צעד שוחק אותך.', 'Over the years you are drawn to deciding alone: a venture, a lead role, or a business of your own. A job that waits for approval on every step wears you out.'),
    love: x('בקשר אתה צריך מישהו שמכבד שתישאר עצמאי. קרבה שמבטלת אותך לא מחזיקה.', 'In a bond you need someone who respects that you stay independent. Closeness that cancels you does not last.'),
  },
  2: {
    career: x('לאורך שנים אתה נמשך לעבודה בזוג או בצוות: גישור, ייעוץ, תמיכה. לבד אתה מדויק פחות.', 'Over the years you are drawn to work in a pair or a team: mediation, advice, support. Alone you are less precise.'),
    love: x('הקשר הוא עוגן. אתה קולט את האווירה בחדר, אז בית שקט ושיחה כנה חשובים יותר מהצגה.', 'The bond is an anchor. You pick up the mood in the room, so a quiet home and an honest talk matter more than a show.'),
  },
  3: {
    career: x('לאורך שנים אתה נמשך לדבר, לכתוב, ליצור או לעמוד מול אנשים. עבודה בלי קול משעממת אותך.', 'Over the years you are drawn to speaking, writing, making, or standing in front of people. Work with no voice bores you.'),
    love: x('אתה צריך שמחה ושיחה בקשר. בלי הומור ובלי מקום להגיד מה אתה מרגיש, הקשר מתייבש.', 'You need joy and talk in the bond. Without humour and a place to say what you feel, it dries out.'),
  },
  4: {
    career: x('לאורך שנים אתה נמשך לבנות משהו שמחזיק: ארגון, כסף, מלאכה, הנדסה. קפיצות בלי בסיס לא מתאימות לך.', 'Over the years you are drawn to building something that holds: organisation, money, craft, engineering. Jumps without a base do not suit you.'),
    love: x('נאמנות ויציבות קודמות לדרמה. אתה נפתח לאט, ונשאר כשיש בית שאפשר לסמוך עליו.', 'Loyalty and stability come before drama. You open slowly, and you stay when there is a home you can count on.'),
  },
  5: {
    career: x('לאורך שנים אתה נמשך לתנועה: מכירות, נסיעות, מדיה, תפקיד שמשתנה. שגרה זהה כל יום שוברת אותך.', 'Over the years you are drawn to movement: sales, travel, media, a role that changes. The same routine every day breaks you.'),
    love: x('אתה צריך חופש וגיוון בתוך הקשר, לא מחוץ לו. שעמום מסוכן יותר מוויכוח.', 'You need freedom and variety inside the bond, not outside it. Boredom is more dangerous than an argument.'),
  },
  6: {
    career: x('לאורך שנים אתה נמשך לטפל, ללמד, לעצב או לשרת אנשים. עבודה בלי אדם בצד השני מרגישה ריקה.', 'Over the years you are drawn to care, teaching, design or serving people. Work with no person on the other side feels empty.'),
    love: x('אתה נותן הרבה בבית. הקשר מחזיק כשגם אתה מקבל, לא רק כשאתה הדואג.', 'You give a lot at home. The bond lasts when you receive too, not only when you are the one who cares.'),
  },
  7: {
    career: x('לאורך שנים אתה נמשך להבין לעומק: מחקר, טכנולוגיה, כתיבה, לימוד. רעש בלי תוכן שורף אותך.', 'Over the years you are drawn to understand deeply: research, technology, writing, study. Noise without content burns you out.'),
    love: x('אתה צריך שקט ומרחב בתוך הקשר. מישהו שדורש נוכחות כל הזמן מעייף אותך.', 'You need quiet and room inside the bond. Someone who demands presence all the time tires you.'),
  },
  8: {
    career: x('לאורך שנים אתה נמשך לאחריות ולכסף: ניהול, עסק, פיננסים או נדל״ן. גם אם היום העבודה היא שיחה, השאיפה היא להחזיק משהו משלך.', 'Over the years you are drawn to responsibility and money: management, a business, finance or property. Even if today’s work is conversation, the aim is to hold something of your own.'),
    love: x('אתה צריך בן או בת זוג חזקים, לא מישהו שאתה סוחב. שוויון בכוח מחזיק את הקשר יותר מרומנטיקה לבד.', 'You need a strong partner, not someone you carry. Equality of strength holds the bond more than romance alone.'),
  },
  9: {
    career: x('לאורך שנים אתה נמשך לעבודה שיש בה משמעות לאחרים: הוראה, טיפול, אמנות, עזרה. הצלחה בלי אדם שנהנה ממנה מרגישה ריקה.', 'Over the years you are drawn to work that means something to others: teaching, care, art, help. Success nobody benefits from feels empty.'),
    love: x('אתה אוהב רחב. הקשר צריך מטרה משותפת, לא רק שגרה של שניים.', 'You love widely. The bond needs a shared purpose, not only a routine of two.'),
  },
  11: {
    career: x('לאורך שנים אתה נמשך להשרות על אחרים: הוראה, ייעוץ, אמנות. הרעיון צריך גם מעשה, אחרת הוא נשאר באוויר.', 'Over the years you are drawn to move other people: teaching, advice, art. The idea also needs an action, or it stays in the air.'),
    love: x('אתה צריך קשר עמוק ורגיש. שיחה שטחית לא מספיקה לך לטווח ארוך.', 'You need a deep, sensitive bond. Small talk is not enough for the long run.'),
  },
  22: {
    career: x('לאורך שנים אתה נמשך לפרויקט גדול שאפשר לגעת בו: בנייה, הנהגה, משהו שנשאר אחריך.', 'Over the years you are drawn to a big project you can touch: building, leading, something that stays after you.'),
    love: x('אתה צריך שותף לחזון, לא רק חברה נעימה. בלי כיוון משותף אתה מתרחק.', 'You need a partner in a vision, not only pleasant company. Without a shared direction you drift away.'),
  },
  33: {
    career: x('לאורך שנים אתה נמשך ללמד, לרפא או לשרת קהילה. זה עובד כשאתה גם נח.', 'Over the years you are drawn to teach, heal or serve a community. It works when you also rest.'),
    love: x('אתה אוהב דרך נתינה. הקשר מחזיק רק אם מישהו שומר גם עליך.', 'You love by giving. The bond lasts only if someone looks after you too.'),
  },
};

const LUCKY_DAY: Record<string, L> = {
  aries: x('שלישי', 'Tuesday'), taurus: x('שישי', 'Friday'), gemini: x('רביעי', 'Wednesday'), cancer: x('שני', 'Monday'),
  leo: x('ראשון', 'Sunday'), virgo: x('רביעי', 'Wednesday'), libra: x('שישי', 'Friday'), scorpio: x('שלישי', 'Tuesday'),
  sagittarius: x('חמישי', 'Thursday'), capricorn: x('שבת', 'Saturday'), aquarius: x('שבת', 'Saturday'), pisces: x('חמישי', 'Thursday'),
};

const EL_HEALTH: Record<string, L> = {
  fire: x('כשיש הרבה מרץ, צריך פורקן גופני ומנוחה אמיתית כדי לא להישרף.', 'When there is a lot of drive, you need physical release and real rest so you do not burn out.'),
  earth: x('כשהבסיס יציב, עוזרות שגרה, אוכל טוב ותנועה קבועה בחוץ.', 'When the base is steady, routine, good food and regular movement outside help.'),
  air: x('כשהראש רץ, עוזרים נשימה, שינה טובה והפסקות מהמחשבות.', 'When the mind is racing, breathing, good sleep and breaks from thinking help.'),
  water: x('כשהרגש חזק, עוזרים מנוחה, קרבה למים וסביבה רגועה.', 'When feeling is strong, rest, being near water and a calm setting help.'),
};

export interface LifeAreas {
  areas: SignAreas;
  lifePath: { career: L; love: L };
  healthEl: L;
  matchSigns: L[];
  matchAnimals: L[];
  luckyDay: L;
  luckyNumbers: number[];
}

export function lifeAreas(p: Profile): LifeAreas {
  const w = p.western;
  const comp: Record<string, string[]> = { fire: ['fire', 'air'], air: ['air', 'fire'], earth: ['earth', 'water'], water: ['water', 'earth'] };
  const matchSigns = ZODIAC.filter((z) => z.id !== w.id && comp[w.element].includes(z.element)).map((z) => z.name);
  const ci = p.chinese.index;
  const matchAnimals = CHINESE_ANIMALS.filter((_, i) => i !== ci && i % 4 === ci % 4).map((a) => ({ he: `${a.emoji} ${a.name.he}`, en: `${a.emoji} ${a.name.en}` }));
  return {
    areas: SIGN_AREAS[w.id],
    lifePath: LIFE_PATH_AREAS[p.lifePath] ?? LIFE_PATH_AREAS[reduceNumber(p.lifePath, false)],
    healthEl: EL_HEALTH[w.element],
    matchSigns, matchAnimals,
    luckyDay: LUCKY_DAY[w.id],
    luckyNumbers: Array.from(new Set([p.lifePath, p.nameNum.number, p.hebrew.day % 9 || 9])),
  };
}

