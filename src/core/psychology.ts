/**
 * psychology.ts — שלושה שאלוני אישיות, בגרסה מקוצרת ומלאה, בעברית נייטרלית מגדרית.
 * MBTI: 20 / 64 היגדים · אניאגרם: 27 / 72 · Big Five: 20 / 50 (במבנה IPIP-50, חצי הפוכים).
 * סולם תשובה 1–5 (בכלל לא מתאים … מתאים מאוד).
 */
import type { L } from './astro.ts';

export type TestId = 'mbti' | 'enneagram' | 'bigfive';
export interface Q { id: string; text: L; key: string; reverse?: boolean }
export type Answers = Record<string, number>; // questionId → 1..5

const q = (id: string, key: string, he: string, en: string, reverse = false): Q => ({ id, key, text: { he, en }, reverse });

/* ---------------- MBTI ---------------- */
// key = הקוטב שההיגד מחזק
export const MBTI_Q: Q[] = [
  q('m1', 'E', 'פגישה עם אנשים חדשים נותנת לי אנרגיה', 'Meeting new people gives me energy'),
  q('m2', 'I', 'אחרי יום חברתי עמוס יש לי צורך בזמן לבד', 'After a busy social day I need time alone'),
  q('m3', 'S', 'עובדות ופרטים מוחשיים חשובים לי יותר מרעיונות מופשטים', 'Concrete facts and details matter more to me than abstract ideas'),
  q('m4', 'N', 'מה שיכול להיות מעניין אותי יותר ממה שכבר קיים', 'What could be interests me more than what already is'),
  q('m5', 'T', 'בהחלטות חשובות ההיגיון קובע אצלי יותר מהרגש', 'In important decisions, logic outweighs feelings for me'),
  q('m6', 'F', 'לפני החלטה חשוב לי לדעת איך היא תשפיע על אנשים', 'Before deciding, I want to know how it will affect people'),
  q('m7', 'J', 'תוכנית מסודרת מראש נותנת לי שקט', 'Having a plan in advance puts me at ease'),
  q('m8', 'P', 'שינויים של הרגע האחרון לא מפריעים לי, ולפעמים אפילו משמחים אותי', 'Last-minute changes don\'t bother me, and sometimes I enjoy them'),
  q('m9', 'E', 'הכי קל לי לחשוב בקול רם, תוך כדי שיחה', 'I think best out loud, while talking'),
  q('m10', 'I', 'שיחה עמוקה עם אדם אחד עדיפה בעיניי על מסיבה גדולה', 'A deep talk with one person beats a big party for me'),
  q('m11', 'S', 'הוראות צעד אחר צעד עוזרות לי יותר מתיאור כללי', 'Step-by-step instructions help me more than a general outline'),
  q('m12', 'N', 'קל לי לזהות דפוסים וקשרים שאחרים לא רואים', 'I easily spot patterns and links others miss'),
  q('m13', 'T', 'ביקורת עניינית חשובה בעיניי יותר משמירה על אווירה נעימה', 'Honest criticism matters more to me than keeping the mood pleasant'),
  q('m14', 'F', 'הרמוניה ביחסים עם אחרים חשובה לי מאוד', 'Harmony in my relationships matters a lot to me'),
  q('m15', 'J', 'חשוב לי לסיים משימה לפני שעוברים לדבר הבא', 'I like to finish one task before moving to the next'),
  q('m16', 'P', 'נוח לי להשאיר אפשרויות פתוחות ולהחליט ברגע האחרון', 'I\'m comfortable keeping options open and deciding late'),
  q('m17', 'E', 'בקבוצה חדשה קל לי לפתוח בשיחה', 'In a new group I find it easy to start a conversation'),
  q('m18', 'N', 'רעיונות חדשים מושכים אותי יותר משיטות מוכחות', 'New ideas attract me more than proven methods'),
  q('m19', 'T', 'קל לי להפריד בין רגשות לבין שיקולים ענייניים', 'I find it easy to separate feelings from practical considerations'),
  q('m20', 'J', 'סדר וארגון בסביבה שלי חשובים לי', 'Order and organization around me are important to me'),
];

export const MBTI_AXES: { a: string; b: string; name: L; aName: L; bName: L }[] = [
  { a: 'E', b: 'I', name: { he: 'מקור האנרגיה', en: 'Energy' }, aName: { he: 'מוחצנות', en: 'Extraversion' }, bName: { he: 'מופנמות', en: 'Introversion' } },
  { a: 'S', b: 'N', name: { he: 'קליטת מידע', en: 'Information' }, aName: { he: 'חושים', en: 'Sensing' }, bName: { he: 'אינטואיציה', en: 'Intuition' } },
  { a: 'T', b: 'F', name: { he: 'קבלת החלטות', en: 'Decisions' }, aName: { he: 'חשיבה', en: 'Thinking' }, bName: { he: 'רגש', en: 'Feeling' } },
  { a: 'J', b: 'P', name: { he: 'אורח חיים', en: 'Lifestyle' }, aName: { he: 'תכנון', en: 'Judging' }, bName: { he: 'גמישות', en: 'Perceiving' } },
];

export interface TypeText { name: L; short: L; strengths: L; growth: L }

export const MBTI_TYPES16: Record<string, TypeText> = {
  INTJ: { name: { he: 'האדריכל', en: 'The Architect' }, short: { he: 'אסטרטג עצמאי עם חזון ארוך טווח.', en: 'An independent strategist with a long-range vision.' }, strengths: { he: 'תכנון, חשיבה מערכתית ושאיפה לשיפור מתמיד.', en: 'Planning, systems thinking and constant improvement.' }, growth: { he: 'לתת מקום לרגשות ולדעות של אחרים גם כשהם פחות "יעילים".', en: 'Making room for others\' feelings and views, even when less "efficient".' } },
  INTP: { name: { he: 'ההוגה', en: 'The Logician' }, short: { he: 'סקרנות אנליטית שנמשכת להבנת האופן שבו דברים עובדים.', en: 'Analytical curiosity drawn to how things work.' }, strengths: { he: 'מקוריות, דיוק לוגי ופתיחות לרעיונות.', en: 'Originality, logical precision and openness to ideas.' }, growth: { he: 'להביא רעיונות לסיום ולשתף אחרים בתהליך.', en: 'Bringing ideas to completion and sharing the process.' } },
  ENTJ: { name: { he: 'המפקד', en: 'The Commander' }, short: { he: 'מנהיגות נחושה שמארגנת אנשים ומשאבים סביב מטרה.', en: 'Determined leadership organizing people and resources around a goal.' }, strengths: { he: 'החלטיות, ראייה אסטרטגית ויכולת ביצוע.', en: 'Decisiveness, strategy and execution.' }, growth: { he: 'סבלנות והקשבה לקצב של אחרים.', en: 'Patience and listening to others\' pace.' } },
  ENTP: { name: { he: 'הממציא', en: 'The Debater' }, short: { he: 'מחשבה מהירה שאוהבת לאתגר רעיונות ולמצוא דרכים חדשות.', en: 'Quick thinking that loves challenging ideas and finding new ways.' }, strengths: { he: 'יצירתיות, שנינות ויכולת לראות אפשרויות.', en: 'Creativity, wit and seeing possibilities.' }, growth: { he: 'התמדה בפרטים ובמשימות שגרתיות.', en: 'Persistence with details and routine tasks.' } },
  INFJ: { name: { he: 'הסנגור', en: 'The Advocate' }, short: { he: 'אידיאליזם שקט עם הבנה עמוקה של אנשים.', en: 'Quiet idealism with a deep understanding of people.' }, strengths: { he: 'אמפתיה, תובנה ומחויבות לערכים.', en: 'Empathy, insight and commitment to values.' }, growth: { he: 'לשמור על גבולות ולא לשאת לבד את משא העולם.', en: 'Keeping boundaries rather than carrying the world alone.' } },
  INFP: { name: { he: 'המגשר', en: 'The Mediator' }, short: { he: 'עולם פנימי עשיר, רגיש ונאמן לערכים אישיים.', en: 'A rich inner world, sensitive and true to personal values.' }, strengths: { he: 'יצירתיות, חמלה ואותנטיות.', en: 'Creativity, compassion and authenticity.' }, growth: { he: 'להפוך חלומות לצעדים מעשיים.', en: 'Turning dreams into practical steps.' } },
  ENFJ: { name: { he: 'המוביל', en: 'The Protagonist' }, short: { he: 'כריזמה חמה שמעוררת השראה ומחברת בין אנשים.', en: 'Warm charisma that inspires and connects people.' }, strengths: { he: 'מנהיגות, תקשורת ויכולת לראות פוטנציאל באחרים.', en: 'Leadership, communication and seeing potential in others.' }, growth: { he: 'לדאוג גם לצרכים של עצמך.', en: 'Caring for your own needs too.' } },
  ENFP: { name: { he: 'המשלהב', en: 'The Campaigner' }, short: { he: 'התלהבות, סקרנות ואהבת אנשים ורעיונות.', en: 'Enthusiasm, curiosity and love of people and ideas.' }, strengths: { he: 'אופטימיות, יצירתיות וחום.', en: 'Optimism, creativity and warmth.' }, growth: { he: 'התמקדות ובחירה בין אפשרויות רבות.', en: 'Focusing and choosing among many options.' } },
  ISTJ: { name: { he: 'הלוגיסטיקאי', en: 'The Logistician' }, short: { he: 'אמינות, סדר ומחויבות למילה.', en: 'Reliability, order and keeping your word.' }, strengths: { he: 'אחריות, דיוק ויציבות.', en: 'Responsibility, precision and stability.' }, growth: { he: 'פתיחות לשינויים ולדרכים חדשות.', en: 'Openness to change and new ways.' } },
  ISFJ: { name: { he: 'המגן', en: 'The Defender' }, short: { he: 'דאגה שקטה ומסורה לאנשים הקרובים.', en: 'Quiet, devoted care for those close to you.' }, strengths: { he: 'נאמנות, תשומת לב לפרטים ורגישות.', en: 'Loyalty, attention to detail and sensitivity.' }, growth: { he: 'לומר "לא" ולבקש עזרה.', en: 'Saying "no" and asking for help.' } },
  ESTJ: { name: { he: 'המנהל', en: 'The Executive' }, short: { he: 'ארגון, סדר והובלה ברורה.', en: 'Organization, order and clear leadership.' }, strengths: { he: 'יעילות, ישירות ועמידה בהתחייבויות.', en: 'Efficiency, directness and keeping commitments.' }, growth: { he: 'גמישות והקשבה לרגשות.', en: 'Flexibility and attention to feelings.' } },
  ESFJ: { name: { he: 'המארח', en: 'The Consul' }, short: { he: 'חום חברתי ורצון שכולם ירגישו טוב.', en: 'Social warmth and a wish for everyone to feel good.' }, strengths: { he: 'אכפתיות, שיתוף פעולה ויצירת קהילה.', en: 'Caring, cooperation and building community.' }, growth: { he: 'לא לתלות את הערך העצמי בהערכת אחרים.', en: 'Not tying self-worth to others\' approval.' } },
  ISTP: { name: { he: 'האומן', en: 'The Virtuoso' }, short: { he: 'סקרנות מעשית ופתרון בעיות בידיים.', en: 'Practical curiosity and hands-on problem solving.' }, strengths: { he: 'קור רוח, מיומנות והסתגלות.', en: 'Composure, skill and adaptability.' }, growth: { he: 'לשתף ברגשות ובתוכניות.', en: 'Sharing feelings and plans.' } },
  ISFP: { name: { he: 'האמן', en: 'The Adventurer' }, short: { he: 'רגישות אסתטית וחיים ברגע.', en: 'Aesthetic sensitivity and living in the moment.' }, strengths: { he: 'עדינות, יצירתיות ופתיחות.', en: 'Gentleness, creativity and openness.' }, growth: { he: 'תכנון לטווח ארוך ועמידה על שלך.', en: 'Long-term planning and standing your ground.' } },
  ESTP: { name: { he: 'היזם', en: 'The Entrepreneur' }, short: { he: 'פעולה מהירה, אנרגיה ואהבת אתגרים.', en: 'Quick action, energy and a love of challenge.' }, strengths: { he: 'תושייה, ביטחון וקריאת מצבים.', en: 'Resourcefulness, confidence and reading situations.' }, growth: { he: 'לחשוב על ההשלכות לטווח ארוך.', en: 'Considering long-term consequences.' } },
  ESFP: { name: { he: 'הבדרן', en: 'The Entertainer' }, short: { he: 'שמחת חיים, ספונטניות ואהבת אנשים.', en: 'Joy, spontaneity and love of people.' }, strengths: { he: 'חום, הומור והתאמה מהירה.', en: 'Warmth, humor and quick adaptation.' }, growth: { he: 'התמדה ותכנון קדימה.', en: 'Persistence and planning ahead.' } },
};

/* ---------------- אניאגרם ---------------- */
export const ENN_Q: Q[] = [
  q('e1', '1', 'חשוב לי שדברים ייעשו בדיוק כמו שצריך', 'It matters to me that things are done exactly right'),
  q('e2', '2', 'אכפת לי מאוד מהצרכים של אנשים סביבי', 'I care deeply about the needs of people around me'),
  q('e3', '3', 'הצלחה והישגים חשובים לי מאוד', 'Success and achievement matter a lot to me'),
  q('e4', '4', 'יש לי תחושה שאני שונה מרוב האנשים', 'I feel different from most people'),
  q('e5', '5', 'הבנה מעמיקה של נושא קודמת אצלי לפעולה', 'Understanding a subject deeply comes before action for me'),
  q('e6', '6', 'חשוב לי לדעת על מי ועל מה אפשר לסמוך', 'I need to know who and what I can rely on'),
  q('e7', '7', 'חוויות חדשות והרפתקאות ממלאות אותי', 'New experiences and adventures fill me up'),
  q('e8', '8', 'חשוב לי להיות בשליטה על מה שקורה לי', 'Being in control of what happens to me is important'),
  q('e9', '9', 'שלום ושקט חשובים לי יותר מלנצח בוויכוח', 'Peace and quiet matter more to me than winning an argument'),
  q('e10', '1', 'קשה לי להשלים עם טעויות, גם קטנות', 'I find it hard to accept mistakes, even small ones'),
  q('e11', '2', 'חשוב לי להרגיש שצריכים אותי', 'I need to feel needed'),
  q('e12', '3', 'חשוב לי איך אחרים רואים אותי', 'How others see me is important to me'),
  q('e13', '4', 'רגשות עמוקים, גם עצובים, הם חלק חשוב ממני', 'Deep feelings, even sad ones, are an important part of me'),
  q('e14', '5', 'זמן ומרחב פרטי חשובים לי מאוד', 'Private time and space are very important to me'),
  q('e15', '6', 'המחשבה על מה עלול להשתבש עוברת לי בראש לעיתים קרובות', 'I often think about what might go wrong'),
  q('e16', '7', 'קשה לי להישאר עם רגשות קשים לאורך זמן', 'I find it hard to stay with painful feelings for long'),
  q('e17', '8', 'קל לי לעמוד על שלי גם מול התנגדות', 'I stand my ground easily, even against opposition'),
  q('e18', '9', 'קל לי לראות את נקודת המבט של כל הצדדים', 'I easily see every side\'s point of view'),
  q('e19', '1', 'יש לי קול פנימי ביקורתי שמעיר לי כל הזמן', 'An inner critic comments on everything I do'),
  q('e20', '2', 'קל לי יותר לתת עזרה מאשר לבקש אותה', 'Giving help is easier for me than asking for it'),
  q('e21', '3', 'כשיש לי מטרה, קשה לעצור אותי', 'When I have a goal, I\'m hard to stop'),
  q('e22', '4', 'חשוב לי לבטא את עצמי בדרך ייחודית ואותנטית', 'Expressing myself in a unique, authentic way matters to me'),
  q('e23', '5', 'מצבים רגשיים סוערים מעייפים אותי, ונוח לי יותר להתבונן מהצד', 'Stormy emotional situations tire me and I prefer to observe'),
  q('e24', '6', 'נאמנות היא אחד הערכים החשובים לי ביותר', 'Loyalty is one of my most important values'),
  q('e25', '7', 'יש לי תמיד כמה תוכניות מרגשות לעתיד', 'I always have a few exciting plans for the future'),
  q('e26', '8', 'חולשה היא דבר שקשה לי להראות', 'Showing weakness is hard for me'),
  q('e27', '9', 'לפעמים קשה לי לדעת מה אני עצמי רוצה', 'Sometimes it\'s hard to know what I myself want'),
];

export interface EnnType { name: L; desire: L; fear: L; strength: L; growth: L }
export const ENN_TYPES: Record<string, EnnType> = {
  '1': { name: { he: 'המתקן', en: 'The Reformer' }, desire: { he: 'להיות טוב, ישר ונכון', en: 'To be good and right' }, fear: { he: 'להיות פגום או מושחת', en: 'Being flawed or corrupt' }, strength: { he: 'יושרה, אחריות ושאיפה לשיפור.', en: 'Integrity, responsibility and striving to improve.' }, growth: { he: 'לקבל את עצמך ואחרים גם בלי שלמות.', en: 'Accepting yourself and others without perfection.' } },
  '2': { name: { he: 'העוזר', en: 'The Helper' }, desire: { he: 'להיות אהוב ורצוי', en: 'To be loved and wanted' }, fear: { he: 'להיות לא רצוי', en: 'Being unwanted' }, strength: { he: 'נדיבות, חום ואכפתיות אמיתית.', en: 'Generosity, warmth and genuine care.' }, growth: { he: 'להכיר בצרכים שלך ולבקש עזרה.', en: 'Recognizing your own needs and asking for help.' } },
  '3': { name: { he: 'המשיג', en: 'The Achiever' }, desire: { he: 'להיות בעל ערך ומוערך', en: 'To feel valuable' }, fear: { he: 'להיות חסר ערך', en: 'Being worthless' }, strength: { he: 'מוטיבציה, יעילות ויכולת להשפיע.', en: 'Drive, efficiency and influence.' }, growth: { he: 'להבחין בין מי שאתה לבין מה שאתה משיג.', en: 'Separating who you are from what you achieve.' } },
  '4': { name: { he: 'האינדיבידואליסט', en: 'The Individualist' }, desire: { he: 'למצוא את עצמך ואת משמעותך', en: 'To find yourself and your meaning' }, fear: { he: 'להיות חסר זהות', en: 'Having no identity' }, strength: { he: 'עומק רגשי, יצירתיות ואותנטיות.', en: 'Emotional depth, creativity and authenticity.' }, growth: { he: 'לראות גם את מה שכבר יש, ולא רק את מה שחסר.', en: 'Seeing what you already have, not only what\'s missing.' } },
  '5': { name: { he: 'החוקר', en: 'The Investigator' }, desire: { he: 'להיות מסוגל ובעל ידע', en: 'To be capable and knowledgeable' }, fear: { he: 'להיות חסר אונים', en: 'Being helpless' }, strength: { he: 'חשיבה עמוקה, עצמאות וראייה צלולה.', en: 'Deep thinking, independence and clear sight.' }, growth: { he: 'לצאת מהראש אל החוויה ואל אנשים.', en: 'Stepping out of your head into experience and people.' } },
  '6': { name: { he: 'הנאמן', en: 'The Loyalist' }, desire: { he: 'ביטחון ותמיכה', en: 'Security and support' }, fear: { he: 'להישאר בלי תמיכה', en: 'Being without support' }, strength: { he: 'נאמנות, אחריות ויכולת לצפות בעיות.', en: 'Loyalty, responsibility and anticipating problems.' }, growth: { he: 'לסמוך על השיפוט הפנימי שלך.', en: 'Trusting your own inner judgment.' } },
  '7': { name: { he: 'הנלהב', en: 'The Enthusiast' }, desire: { he: 'להיות מסופק וחופשי', en: 'To be satisfied and free' }, fear: { he: 'להיות לכוד בכאב או בחסר', en: 'Being trapped in pain or lack' }, strength: { he: 'אופטימיות, סקרנות ושמחת חיים.', en: 'Optimism, curiosity and joy.' }, growth: { he: 'להישאר ולהעמיק, גם כשזה פחות מרגש.', en: 'Staying and deepening, even when it\'s less exciting.' } },
  '8': { name: { he: 'המתגר', en: 'The Challenger' }, desire: { he: 'להגן על עצמך ולשלוט בגורלך', en: 'To protect yourself and control your fate' }, fear: { he: 'להיות נשלט או פגיע', en: 'Being controlled or vulnerable' }, strength: { he: 'עוצמה, אומץ והגנה על החלשים.', en: 'Strength, courage and protecting the weak.' }, growth: { he: 'לאפשר רכות ופגיעות.', en: 'Allowing softness and vulnerability.' } },
  '9': { name: { he: 'משכין השלום', en: 'The Peacemaker' }, desire: { he: 'שלום פנימי וחיצוני', en: 'Inner and outer peace' }, fear: { he: 'ניתוק וקונפליקט', en: 'Separation and conflict' }, strength: { he: 'קבלה, סבלנות ויכולת לגשר.', en: 'Acceptance, patience and bridging.' }, growth: { he: 'להשמיע את הקול שלך ולבחור.', en: 'Voicing yourself and choosing.' } },
};

/* ---------------- Big Five ---------------- */
export const BF_Q: Q[] = [
  q('b1', 'O', 'רעיונות חדשים ומופשטים מסקרנים אותי', 'New and abstract ideas intrigue me'),
  q('b2', 'C', 'משימות אצלי מסתיימות בזמן', 'I get tasks done on time'),
  q('b3', 'E', 'במפגש חברתי יש לי הרבה אנרגיה', 'I have lots of energy at social gatherings'),
  q('b4', 'A', 'אכפת לי באמת מהרגשות של אחרים', 'I genuinely care about others\' feelings'),
  q('b5', 'N', 'דאגות מעסיקות אותי לעיתים קרובות', 'Worries occupy me often'),
  q('b6', 'O', 'הדרך המוכרת עדיפה בעיניי על ניסוי דברים חדשים', 'I prefer the familiar way to trying new things', true),
  q('b7', 'C', 'קורה לי לא מעט לשכוח התחייבויות', 'I fairly often forget commitments', true),
  q('b8', 'E', 'ערב שקט בבית עדיף בעיניי על יציאה', 'A quiet evening at home beats going out for me', true),
  q('b9', 'A', 'קל לי לסלוח', 'I forgive easily'),
  q('b10', 'N', 'גם במצבי לחץ יש בי שקט פנימי', 'Even under pressure I feel calm inside', true),
  q('b11', 'O', 'אמנות, מוזיקה או ספרות מרגשות אותי', 'Art, music or literature move me'),
  q('b12', 'C', 'סדר ותכנון הם חלק מהיום שלי', 'Order and planning are part of my day'),
  q('b13', 'E', 'נוח לי להיות במרכז העניינים', 'I\'m comfortable being the center of attention'),
  q('b14', 'A', 'ויכוחים ועימותים לא מרתיעים אותי', 'Arguments and confrontation don\'t deter me', true),
  q('b15', 'N', 'מצב הרוח שלי משתנה בקלות', 'My mood changes easily'),
  q('b16', 'O', 'דיונים פילוסופיים משעממים אותי', 'Philosophical discussions bore me', true),
  q('b17', 'C', 'קשה לי להתמיד במשימה משעממת', 'I struggle to stick with a boring task', true),
  q('b18', 'E', 'בקבוצה גדולה אני נוטה לשתוק', 'In a large group I tend to stay quiet', true),
  q('b19', 'A', 'לשתף פעולה חשוב לי יותר מלנצח', 'Cooperating matters more to me than winning'),
  q('b20', 'N', 'רוב הזמן מלווה אותי תחושה של רוגע ויציבות', 'Most of the time I feel calm and steady', true),
];

export interface Trait { key: 'O' | 'C' | 'E' | 'A' | 'N'; name: L; what: L; low: L; high: L }
export const BF_TRAITS: Trait[] = [
  { key: 'O', name: { he: 'פתיחות לחוויות', en: 'Openness' }, what: { he: 'סקרנות, דמיון ועניין ברעיונות ובאמנות', en: 'Curiosity, imagination and interest in ideas and art' },
    low: { he: 'מעשי ומעדיף את המוכר והמוכח. יציבות וקרקע במקום ניסויים.', en: 'Practical and prefers the familiar and proven: grounded rather than experimental.' },
    high: { he: 'סקרנות רחבה, דמיון ופתיחות לרעיונות ולחוויות חדשות.', en: 'Wide curiosity, imagination and openness to new ideas and experiences.' } },
  { key: 'C', name: { he: 'מצפוניות', en: 'Conscientiousness' }, what: { he: 'סדר, משמעת עצמית ועמידה ביעדים', en: 'Order, self-discipline and meeting goals' },
    low: { he: 'ספונטניות וגמישות. פחות תכנון, יותר זרימה.', en: 'Spontaneous and flexible: less planning, more flow.' },
    high: { he: 'אמינות, ארגון והתמדה. דברים נעשים עד הסוף.', en: 'Reliable, organized and persistent: things get finished.' } },
  { key: 'E', name: { he: 'מוחצנות', en: 'Extraversion' }, what: { he: 'אנרגיה חברתית, ביטחון והנאה מחברה', en: 'Social energy, assertiveness and enjoying company' },
    low: { he: 'מופנמות: אנרגיה שמגיעה משקט ומקשרים מעטים ועמוקים.', en: 'Introverted: energy comes from quiet and a few deep connections.' },
    high: { he: 'חברותיות, אנרגיה ונכונות לקחת מקום.', en: 'Sociable, energetic and ready to take the floor.' } },
  { key: 'A', name: { he: 'נעימות', en: 'Agreeableness' }, what: { he: 'חמלה, אמון ושיתוף פעולה', en: 'Compassion, trust and cooperation' },
    low: { he: 'ישירות וחשיבה ביקורתית. לא חוששים מעימות כשצריך.', en: 'Direct and critical-minded: not afraid of conflict when needed.' },
    high: { he: 'חום, אמפתיה ורצון לעזור ולשתף פעולה.', en: 'Warm, empathetic and eager to help and cooperate.' } },
  { key: 'N', name: { he: 'יציבות רגשית', en: 'Emotional stability' }, what: { he: 'עד כמה קל לשמור על רוגע מול לחץ', en: 'How easily you stay calm under stress' },
    low: { he: 'רגישות רגשית גבוהה: דברים נוגעים ומשפיעים לעומק.', en: 'High emotional sensitivity: things touch and affect you deeply.' },
    high: { he: 'רוגע ויציבות. מתאוששים מהר מלחצים.', en: 'Calm and steady: you recover quickly from stress.' } },
];

/* ---------------- הגרסה המלאה: היגדים נוספים ---------------- */
// MBTI: +44 → 64 (16 לכל ציר)
const MBTI_MORE: Q[] = [
  q('m21', 'E', 'שיחה עם אנשים עוזרת לי לסדר את המחשבות', 'Talking with people helps me sort out my thoughts'),
  q('m22', 'S', 'חשוב לי לדעת בדיוק מה צריך לעשות לפני שמתחילים', 'I need to know exactly what to do before starting'),
  q('m23', 'T', 'בוויכוח חשוב לי יותר להגיע לאמת מאשר לשמור על שלום', 'In an argument, reaching the truth matters more to me than keeping the peace'),
  q('m24', 'J', 'רשימת משימות עוזרת לי לנהל את היום', 'A to-do list helps me run my day'),
  q('m25', 'I', 'שקט הוא תנאי בשבילי כדי להתרכז', 'I need quiet to concentrate'),
  q('m26', 'N', 'לעיתים קרובות המחשבות שלי קופצות מרעיון לרעיון', 'My thoughts often jump from idea to idea'),
  q('m27', 'F', 'קשה לי לומר דבר שעלול לפגוע במישהו, גם כשהוא נכון', 'I find it hard to say something hurtful, even if it\'s true'),
  q('m28', 'P', 'נוח לי לאלתר כשהתוכנית משתנה', 'I\'m comfortable improvising when plans change'),
  q('m29', 'E', 'אחרי מפגש חברתי יש לי יותר אנרגיה מאשר לפניו', 'After socializing I have more energy than before'),
  q('m30', 'S', 'ניסיון מעשי מלמד אותי יותר מתיאוריה', 'Hands-on experience teaches me more than theory'),
  q('m31', 'T', 'החלטה טובה היא החלטה עקבית, גם אם היא לא נעימה לכולם', 'A good decision is a consistent one, even if not everyone likes it'),
  q('m32', 'J', 'איחורים מפריעים לי', 'Lateness bothers me'),
  q('m33', 'I', 'מחשבות שלי עוברות עיבוד פנימי ארוך לפני שהן נאמרות בקול', 'My thoughts go through long inner processing before I voice them'),
  q('m34', 'N', 'מעניין אותי לשאול "מה אם" ולדמיין תרחישים', 'I enjoy asking "what if" and imagining scenarios'),
  q('m35', 'F', 'הערכים שלי קובעים את ההחלטות שלי יותר מחישובים', 'My values drive my decisions more than calculations'),
  q('m36', 'P', 'לעיתים קרובות העבודה שלי נעשית ברגע האחרון, ודווקא אז היא הכי טובה', 'I often work at the last minute, and that\'s when I do best'),
  q('m37', 'E', 'קל לי להכיר אנשים חדשים באירועים', 'I easily get to know new people at events'),
  q('m38', 'S', 'פרטים קטנים שאחרים מפספסים בולטים לי', 'Small details others miss stand out to me'),
  q('m39', 'T', 'ניתוח של יתרונות וחסרונות הוא הדרך שלי להחליט', 'Weighing pros and cons is how I decide'),
  q('m40', 'J', 'חשוב לי להחליט מהר ולסגור עניינים פתוחים', 'I like to decide quickly and close open matters'),
  q('m41', 'I', 'מעגל חברים קטן וקרוב מתאים לי יותר מרשת רחבה', 'A small close circle suits me more than a wide network'),
  q('m42', 'N', 'המשמעות שמאחורי הדברים חשובה לי יותר מהעובדות עצמן', 'The meaning behind things matters more to me than the facts'),
  q('m43', 'F', 'רגשות של אחרים משפיעים עליי מאוד', 'Other people\'s feelings affect me a lot'),
  q('m44', 'P', 'חשוב לי שיהיה ביום מקום להפתעות', 'I like my day to leave room for surprises'),
  q('m45', 'E', 'עבודה בצוות מתאימה לי יותר מעבודה לבד', 'Teamwork suits me more than working alone'),
  q('m46', 'S', 'שיטות שכבר הוכיחו את עצמן מעוררות בי יותר אמון', 'Methods that have proven themselves earn more of my trust'),
  q('m47', 'T', 'קל לי לתת ביקורת כשמשהו לא עובד', 'I find it easy to criticize when something isn\'t working'),
  q('m48', 'J', 'חופשה טובה בשבילי היא חופשה מתוכננת היטב', 'A good vacation for me is a well-planned one'),
  q('m49', 'I', 'טלפון שמצלצל באמצע היום מרגיש לי כהפרעה', 'A phone ringing mid-day feels like an interruption'),
  q('m50', 'N', 'שגרה קבועה משעממת אותי מהר', 'A fixed routine bores me quickly'),
  q('m51', 'F', 'הוגנות בעיניי היא להתחשב בנסיבות של כל אדם', 'To me, fairness means considering each person\'s circumstances'),
  q('m52', 'P', 'קשה לי להתחייב לתוכנית ארוכת טווח מראש', 'I find it hard to commit to a long-term plan in advance'),
  q('m53', 'E', 'סוף שבוע בלי תוכניות חברתיות מרגיש לי ריק', 'A weekend without social plans feels empty'),
  q('m54', 'S', 'תיאור מדויק ומוחשי עדיף בעיניי על מטאפורות', 'I prefer precise, concrete descriptions to metaphors'),
  q('m55', 'T', 'הוגנות בעיניי היא ליישם את אותם כללים על כולם', 'To me, fairness means applying the same rules to everyone'),
  q('m56', 'J', 'סיום עבודה לפני הדדליין נותן לי שקט', 'Finishing before the deadline gives me peace'),
  q('m57', 'I', 'ערב לבד עם ספר או סדרה הוא בשבילי מנוחה אמיתית', 'An evening alone with a book or show is real rest for me'),
  q('m58', 'N', 'תחושת בטן מכוונת אותי גם בלי הסבר מסודר', 'Gut feeling guides me even without a clear explanation'),
  q('m59', 'F', 'מילה טובה נותנת לי המון כוח', 'A kind word gives me a lot of strength'),
  q('m60', 'P', 'רעיון חדש ומסקרן יכול להסיט אותי מהתוכנית', 'A new, intriguing idea can pull me off my plan'),
  q('m61', 'I', 'דיבור מול קבוצה גדולה לא קל לי', 'Speaking to a large group is not easy for me'),
  q('m62', 'S', 'ההווה מעסיק אותי יותר מהעתיד הרחוק', 'The present occupies me more than the distant future'),
  q('m63', 'F', 'אווירה טובה בצוות חשובה לי יותר מיעילות', 'A good team atmosphere matters more to me than efficiency'),
  q('m64', 'P', 'כללים נוקשים מגבילים אותי', 'Rigid rules hold me back'),
];

// אניאגרם: +45 → 72 (8 לכל טיפוס)
const ENN_MORE: Q[] = [
  q('e28', '1', 'יש דרך נכונה לעשות דברים, וחשוב לי לעשות אותם כך', 'There is a right way to do things, and I want to do them that way'),
  q('e29', '2', 'קל לי לזהות מה אחרים צריכים עוד לפני שהם אומרים', 'I sense what others need before they say it'),
  q('e30', '3', 'חשוב לי להצטיין במה שאני עושה', 'Excelling at what I do is important to me'),
  q('e31', '4', 'לעיתים קרובות יש לי תחושה שמשהו חסר בחיים שלי', 'I often feel something is missing in my life'),
  q('e32', '5', 'חשוב לי להבין איך דברים עובדים לעומק', 'I need to understand how things work in depth'),
  q('e33', '6', 'לפני החלטה חשובה יש לי צורך לבדוק את כל התרחישים', 'Before an important decision I need to check every scenario'),
  q('e34', '7', 'משעמם לי כשיש יותר מדי שגרה', 'Too much routine bores me'),
  q('e35', '8', 'קשה לי לסבול חוסר צדק, ויש בי דחף להתערב', 'I can\'t stand injustice and feel driven to step in'),
  q('e36', '9', 'קשה לי לומר "לא" כדי לא ליצור מתח', 'I find it hard to say "no" so as not to create tension'),
  q('e37', '1', 'קשה לי להירגע כשמשהו לא מסודר', 'I find it hard to relax when things are out of order'),
  q('e38', '2', 'יחסים קרובים הם הדבר החשוב ביותר בחיים שלי', 'Close relationships are the most important thing in my life'),
  q('e39', '3', 'כישלון קשה לי מאוד', 'Failure is very hard for me'),
  q('e40', '4', 'יופי ואסתטיקה חשובים לי מאוד', 'Beauty and aesthetics matter a lot to me'),
  q('e41', '5', 'יש לי צורך לשמור על האנרגיה והזמן שלי', 'I need to protect my energy and time'),
  q('e42', '6', 'קשה לי לסמוך על אנשים חדשים', 'I find it hard to trust new people'),
  q('e43', '7', 'קל לי להתחיל דברים חדשים וקשה לי לסיים אותם', 'I start new things easily and struggle to finish them'),
  q('e44', '8', 'כעס יוצא ממני ישירות ומהר', 'My anger comes out directly and fast'),
  q('e45', '9', 'יש לי נטייה לדחות דברים לא נעימים', 'I tend to put off unpleasant things'),
  q('e46', '1', 'אחריות ומוסר חשובים לי מאוד', 'Responsibility and morality matter greatly to me'),
  q('e47', '2', 'כשלא מעריכים את מה שנתתי, זה פוגע בי', 'It hurts when what I gave isn\'t appreciated'),
  q('e48', '3', 'קל לי להתאים את עצמי למה שהסביבה מצפה', 'I easily adapt to what those around me expect'),
  q('e49', '4', 'קשה לי עם דברים שטחיים ובנאליים', 'I struggle with superficial, banal things'),
  q('e50', '5', 'נוח לי יותר לצפות מאשר להשתתף', 'I\'m more comfortable observing than participating'),
  q('e51', '6', 'יש בי חשדנות כלפי סמכות, ובכל זאת צורך בה', 'I\'m suspicious of authority, yet I need it'),
  q('e52', '7', 'גם במצב קשה קל לי לראות את הצד החיובי', 'Even in hard times I easily see the bright side'),
  q('e53', '8', 'חשוב לי להגן על האנשים שלי', 'Protecting my people is important to me'),
  q('e54', '9', 'שגרה נוחה ורגועה מתאימה לי', 'A comfortable, calm routine suits me'),
  q('e55', '1', 'לפעמים הביקורת שלי על אחרים גלויה מדי', 'Sometimes my criticism of others is too open'),
  q('e56', '2', 'קשה לי לסרב לבקשה', 'I find it hard to refuse a request'),
  q('e57', '3', 'רשימת הישגים ויעדים נותנת לי מוטיבציה', 'A list of goals and achievements motivates me'),
  q('e58', '4', 'מצבי הרוח שלי עמוקים ומשתנים', 'My moods are deep and changeable'),
  q('e59', '5', 'ידע נותן לי תחושת ביטחון', 'Knowledge gives me a sense of security'),
  q('e60', '6', 'מחויבות לקבוצה או למשפחה חשובה לי מאוד', 'Commitment to my group or family matters a lot'),
  q('e61', '7', 'תכנון של הנאות ובילויים משמח אותי', 'Planning pleasures and outings makes me happy'),
  q('e62', '8', 'קשה לי לקבל הוראות ממישהו אחר', 'I find it hard to take orders from someone else'),
  q('e63', '9', 'אנשים מרגישים איתי בנוח', 'People feel at ease with me'),
  q('e64', '1', 'קשה לי לנוח לפני שהכל גמור', 'I find it hard to rest before everything is done'),
  q('e65', '2', 'אנשים פונים אליי כשהם צריכים תמיכה', 'People turn to me when they need support'),
  q('e66', '3', 'זמן בלי תפוקה מרגיש לי מבוזבז', 'Unproductive time feels wasted to me'),
  q('e67', '4', 'חשוב לי שיבינו את העולם הפנימי שלי', 'I need others to understand my inner world'),
  q('e68', '5', 'דרישות רגשיות מאחרים עלולות להציף אותי', 'Emotional demands from others can overwhelm me'),
  q('e69', '6', 'ספקות מלווים אותי גם אחרי שהחלטתי', 'Doubts stay with me even after I decide'),
  q('e70', '7', 'הגבלות וחובות מעיקים עליי', 'Limits and obligations weigh on me'),
  q('e71', '8', 'עימות ישיר עדיף בעיניי על התחמקות', 'I prefer direct confrontation to avoidance'),
  q('e72', '9', 'הכעס שלי נוטה להישאר בפנים', 'My anger tends to stay inside'),
];

// Big Five: +30 → 50 (10 לכל תכונה, 5 ישירים ו-5 הפוכים) — במבנה IPIP-50
const BF_MORE: Q[] = [
  q('b21', 'O', 'יש לי דמיון עשיר', 'I have a vivid imagination'),
  q('b22', 'C', 'תשומת לב לפרטים היא חלק ממני', 'Attention to detail is part of who I am'),
  q('b23', 'E', 'קל לי לפתוח בשיחה עם אנשים שאינם מוכרים לי', 'I easily start conversations with strangers'),
  q('b24', 'A', 'קל לי להרגיש את מה שאחרים מרגישים', 'I easily sense what others feel'),
  q('b25', 'N', 'דברים קטנים מעצבנים אותי בקלות', 'Little things irritate me easily'),
  q('b26', 'O', 'שינויים בשגרה לא קלים לי', 'Changes to my routine aren\'t easy for me', true),
  q('b27', 'C', 'החפצים שלי מפוזרים לא פעם', 'My things are often scattered around', true),
  q('b28', 'E', 'העדפה שלי היא להישאר ברקע', 'I prefer to stay in the background', true),
  q('b29', 'A', 'לפעמים יוצאות ממני הערות עוקצניות', 'I sometimes make cutting remarks', true),
  q('b30', 'N', 'רוב הזמן מצב הרוח שלי יציב', 'Most of the time my mood is stable', true),
  q('b31', 'O', 'קל לי להבין רעיונות מופשטים', 'I grasp abstract ideas easily'),
  q('b32', 'C', 'הכנה מראש לפני משימה חשובה היא הרגל שלי', 'Preparing ahead for important tasks is a habit of mine'),
  q('b33', 'E', 'אנשים סביבי אומרים שיש לי הרבה אנרגיה', 'People around me say I have lots of energy'),
  q('b34', 'A', 'גם ביום עמוס יש לי זמן לעזור', 'Even on a busy day I make time to help'),
  q('b35', 'N', 'יש לי נטייה להרגיש חרדה', 'I tend to feel anxious'),
  q('b36', 'O', 'אמנות מודרנית לא מדברת אליי', 'Modern art doesn\'t speak to me', true),
  q('b37', 'C', 'דחיינות היא בעיה מוכרת לי', 'Procrastination is a familiar problem for me', true),
  q('b38', 'E', 'אחרי מפגש חברתי יש לי צורך במנוחה ארוכה', 'After socializing I need a long rest', true),
  q('b39', 'A', 'האינטרס שלי קודם כמעט תמיד', 'My own interest comes first almost always', true),
  q('b40', 'N', 'קל לי להירגע אחרי אירוע מלחיץ', 'I calm down easily after a stressful event', true),
  q('b41', 'O', 'מעניין אותי לטעום אוכל ממטבחים לא מוכרים', 'I like trying food from unfamiliar cuisines'),
  q('b42', 'C', 'התחייבות שלי היא דבר שמקוים', 'When I commit, it gets done'),
  q('b43', 'E', 'חגיגות ומסיבות משמחות אותי', 'Celebrations and parties make me happy'),
  q('b44', 'A', 'אמון באנשים הוא נקודת המוצא שלי', 'Trusting people is my starting point'),
  q('b45', 'N', 'ביקורת פוגעת בי לאורך זמן', 'Criticism hurts me for a long time'),
  q('b46', 'O', 'שאלות גדולות על החיים פחות מעניינות אותי', 'Big questions about life interest me less', true),
  q('b47', 'C', 'קל לי לוותר כשמשהו נהיה קשה', 'I give up easily when things get hard', true),
  q('b48', 'E', 'קשה לי להביע את עצמי מול אנשים שלא מכירים אותי', 'I find it hard to express myself with people who don\'t know me', true),
  q('b49', 'A', 'קשה לי להתעניין בבעיות של אחרים', 'I find it hard to take interest in others\' problems', true),
  q('b50', 'N', 'רק לעיתים רחוקות יש לי תחושת עצב', 'I rarely feel sad', true),
];

export type Version = 'short' | 'full';
export const QUESTIONS: Record<TestId, Record<Version, Q[]>> = {
  mbti: { short: MBTI_Q, full: [...MBTI_Q, ...MBTI_MORE] },
  enneagram: { short: ENN_Q, full: [...ENN_Q, ...ENN_MORE] },
  bigfive: { short: BF_Q, full: [...BF_Q, ...BF_MORE] },
};
const ALL_MBTI = QUESTIONS.mbti.full, ALL_ENN = QUESTIONS.enneagram.full, ALL_BF = QUESTIONS.bigfive.full;

/* ---------------- חישוב (רק על היגדים שנענו) ---------------- */

export interface MbtiScore { type: string; axes: { a: string; b: string; pctA: number }[] }
export function scoreMbti(ans: Answers): MbtiScore {
  const axes = MBTI_AXES.map(({ a, b }) => {
    let sum = 0, max = 0;
    for (const x of ALL_MBTI) {
      if ((x.key !== a && x.key !== b) || ans[x.id] === undefined) continue;
      const v = ans[x.id] - 3;                   // -2..2
      sum += x.key === a ? v : -v;
      max += 2;
    }
    return { a, b, pctA: max ? Math.round(50 + (50 * sum) / max) : 50 };
  });
  const type = axes.map((x) => (x.pctA >= 50 ? x.a : x.b)).join('');
  return { type, axes };
}

export interface EnnScore { type: string; wing: string; ranked: { type: string; pct: number }[] }
export function scoreEnneagram(ans: Answers): EnnScore {
  const sum: Record<string, number> = {}, n: Record<string, number> = {};
  for (const x of ALL_ENN) {
    if (ans[x.id] === undefined) continue;
    sum[x.key] = (sum[x.key] ?? 0) + ans[x.id];
    n[x.key] = (n[x.key] ?? 0) + 1;
  }
  const pct = (k: string) => (n[k] ? Math.round(((sum[k] - n[k]) / (4 * n[k])) * 100) : 0); // ממוצע 1..5 → 0..100
  const ranked = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    .map((type) => ({ type, pct: pct(type) }))
    .sort((x, y) => y.pct - x.pct || Number(x.type) - Number(y.type));
  const type = ranked[0].type;
  const k = Number(type);
  const left = String(k === 1 ? 9 : k - 1), right = String(k === 9 ? 1 : k + 1);
  const wing = pct(left) >= pct(right) ? left : right;
  return { type, wing, ranked };
}

export type BfScore = Record<Trait['key'], number>; // 0..100, N מוצג כיציבות (הפוך)
export function scoreBigFive(ans: Answers): BfScore {
  const acc: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] };
  for (const x of ALL_BF) {
    const v = ans[x.id];
    if (v === undefined) continue;
    acc[x.key].push(x.reverse ? 6 - v : v);
  }
  const pct = (a: number[]) => (a.length ? Math.round(((a.reduce((s, v) => s + v, 0) / a.length - 1) / 4) * 100) : 50);
  return { O: pct(acc.O), C: pct(acc.C), E: pct(acc.E), A: pct(acc.A), N: 100 - pct(acc.N) };
}
