import type { L } from './astro';

/** תיאור מורחב לכל אחד מ-16 טיפוסי ה-MBTI. משמש את מסך התוצאה. */
export interface MbtiDetail {
  /** סדר הפונקציות הקוגניטיביות: דומיננטית, עזר, שלישית, נחותה */
  stack: string;
  overview: L;
  daily: { he: string[]; en: string[] };
  strengths: { he: string[]; en: string[] };
  challenges: { he: string[]; en: string[] };
  relationships: L;
  work: L;
  stress: L;
  tips: { he: string[]; en: string[] };
}

export const MBTI_FUNCTIONS: Record<string, L> = {
  Ni: { he: 'אינטואיציה פנימית: זיהוי דפוסים וחזון ארוך טווח', en: 'Introverted Intuition: patterns and long-range vision' },
  Ne: { he: 'אינטואיציה חיצונית: יצירת אפשרויות וקישורים בין רעיונות', en: 'Extraverted Intuition: possibilities and links between ideas' },
  Si: { he: 'חושים פנימיים: זיכרון, ניסיון, שגרה ויציבות', en: 'Introverted Sensing: memory, experience, routine and stability' },
  Se: { he: 'חושים חיצוניים: נוכחות ברגע, פעולה וחוויה ישירה', en: 'Extraverted Sensing: presence in the moment, action and direct experience' },
  Ti: { he: 'חשיבה פנימית: היגיון עצמאי ומערכת מושגים מדויקת', en: 'Introverted Thinking: independent logic and a precise framework' },
  Te: { he: 'חשיבה חיצונית: ארגון, יעילות ותוצאות מדידות', en: 'Extraverted Thinking: organization, efficiency and measurable results' },
  Fi: { he: 'רגש פנימי: ערכים אישיים ואותנטיות', en: 'Introverted Feeling: personal values and authenticity' },
  Fe: { he: 'רגש חיצוני: הרמוניה, הקשבה לקבוצה ולצרכי אחרים', en: 'Extraverted Feeling: harmony, tuning in to the group and others\' needs' },
};

export const MBTI_DETAILS: Record<string, MbtiDetail> = {
  INTJ: {
    stack: 'Ni · Te · Fi · Se',
    overview: {
      he: 'INTJ רואה תמונה גדולה ומתכנן קדימה. הוא נמשך למערכות, ליעילות ולשיפור, ומעדיף לפעול לפי הבנה פנימית שלו ולא לפי מוסכמה. מבחוץ הוא נראה רגוע ושקול, ומבפנים הוא מנהל כל הזמן תוכניות ותרחישים.',
      en: 'The INTJ sees the big picture and plans ahead. It is drawn to systems, efficiency and improvement, and prefers to act on its own inner understanding rather than convention. Outwardly calm and measured, inwardly it keeps running plans and scenarios.',
    },
    daily: {
      he: ['חושב על "איך זה אמור להיראות" ובונה תוכנית', 'מעדיף עבודה עצמאית ושקט כדי להתרכז', 'מתאכזב מחוסר יעילות או מחשיבה מבולבלת', 'משתף מעט, ומעדיף מעגל קרוב קטן'],
      en: ['Thinks about how it should look and builds a plan', 'Prefers independent work and quiet to concentrate', 'Gets frustrated by inefficiency or muddled thinking', 'Shares little and prefers a small close circle'],
    },
    strengths: {
      he: ['חשיבה אסטרטגית', 'עצמאות וביטחון בשיפוט', 'התמדה לטווח ארוך', 'יכולת לראות פגמים במערכת'],
      en: ['Strategic thinking', 'Independence and confidence in judgment', 'Long-term persistence', 'Spotting flaws in a system'],
    },
    challenges: {
      he: ['נוקשות ביחס לתוכנית', 'קושי להביע רגש וחום', 'נטייה לביקורתיות ולהיראות מתנשא', 'קושי לבקש עזרה'],
      en: ['Rigidity about the plan', 'Difficulty expressing feeling and warmth', 'Tendency to seem critical or aloof', 'Difficulty asking for help'],
    },
    relationships: {
      he: 'מעריך עומק, כנות ושיחה אמיתית, ונאמן מאוד כשהוא מתחייב. הקושי: לבטא רגש בקול ולא להפוך את הקשר לפרויקט לשיפור.',
      en: 'Values depth, honesty and real conversation, and is very loyal once committed. The difficulty: voicing feeling and not turning the relationship into an improvement project.',
    },
    work: {
      he: 'מצטיין באסטרטגיה, מערכות, מחקר, הנדסה, אסטרטגיה עסקית ותכנון. מעדיף אוטונומיה ויעדים ברורים.',
      en: 'Excels in strategy, systems, research, engineering and planning. Prefers autonomy and clear goals.',
    },
    stress: {
      he: 'בלחץ עלול לשקוע בפרטים חושיים ובדחפים (אכילה, בילוי יתר, התעסקות בסביבה) או להתפרץ רגשית באופן לא אופייני.',
      en: 'Under stress may sink into sensory detail and impulses (overeating, overindulging, fussing with surroundings) or erupt emotionally in an uncharacteristic way.',
    },
    tips: {
      he: ['שאל אנשים מה הם מרגישים לפני שאתה מציע פתרון', 'קבל דעה לא מושלמת כחלק מהתהליך', 'תרגל הכרה בהישגים ולא רק בפערים'],
      en: ['Ask people what they feel before offering a solution', 'Accept an imperfect opinion as part of the process', 'Practice acknowledging achievements, not only gaps'],
    },
  },
  INTP: {
    stack: 'Ti · Ne · Si · Fe',
    overview: {
      he: 'INTP הוא חוקר של רעיונות ושל איך דברים עובדים. הוא מנתח, מפרק ובונה מודלים, ומעדיף דיוק לוגי על פני נוחות חברתית. חיי הרוח שלו עשירים, ולעיתים הפער בין הרעיון לביצוע גדול.',
      en: 'The INTP is an explorer of ideas and of how things work. It analyzes, takes apart and builds models, and prefers logical precision over social comfort. Its inner life is rich, and the gap between idea and execution can be wide.',
    },
    daily: {
      he: ['שואל "למה" ובודק סתירות לוגיות', 'צולל לנושא שמעניין אותו שעות', 'מתקשה עם שגרה ופרטי ביצוע', 'מתבונן בשיחות ומשתתף כשיש משהו מעניין להוסיף'],
      en: ['Asks why and checks for logical contradictions', 'Dives into an interesting topic for hours', 'Struggles with routine and execution details', 'Observes conversations and joins when there is something interesting to add'],
    },
    strengths: {
      he: ['חשיבה אנליטית ומקורית', 'סקרנות ופתיחות לרעיונות', 'יכולת לפתור בעיות מורכבות', 'אובייקטיביות'],
      en: ['Analytical and original thinking', 'Curiosity and openness to ideas', 'Solving complex problems', 'Objectivity'],
    },
    challenges: {
      he: ['דחיינות וקושי לסיים', 'ניתוק מרגשות ומצרכים מעשיים', 'חוסר סבלנות לפרטים משעממים', 'קושי להביע חום'],
      en: ['Procrastination and difficulty finishing', 'Disconnection from feelings and practical needs', 'Impatience with dull details', 'Difficulty expressing warmth'],
    },
    relationships: {
      he: 'נאמן ופתוח, אך עשוי להיראות מנותק. מעריך חופש, שיחה אינטלקטואלית ובן זוג שלא מצפה ממנו לתגובה רגשית מיידית.',
      en: 'Loyal and open, but may seem detached. Values freedom, intellectual conversation and a partner who does not expect an immediate emotional reaction.',
    },
    work: {
      he: 'מצטיין בתכנות, מדע, פילוסופיה, ניתוח נתונים וסביבות שמאפשרות עצמאות וחשיבה פתוחה.',
      en: 'Excels in programming, science, philosophy, data analysis and settings with independence and open thinking.',
    },
    stress: {
      he: 'בלחץ עלול להפוך ביקורתי וחסר סבלנות כלפי אחרים, או להיסחף לרגשות אחרים בצורה מוגזמת ולהרגיש לא מובן.',
      en: 'Under stress may become critical and impatient toward others, or get swept into emotions excessively and feel misunderstood.',
    },
    tips: {
      he: ['קבע מועד סיום לכל רעיון, ומסור אותו גם בגרסה לא מושלמת', 'שתף את התהליך ולא רק את התוצאה', 'הגדר שגרה קטנה ליום-יום'],
      en: ['Set a finish date for each idea and release it even if imperfect', 'Share the process, not only the result', 'Set a small daily routine'],
    },
  },
  ENTJ: {
    stack: 'Te · Ni · Se · Fi',
    overview: {
      he: 'ENTJ הוא מנהיג טבעי שרואה מטרה ומארגן אנשים ומשאבים כדי להשיג אותה. הוא החלטי, ישיר ובעל חזון, ומתקשה להשלים עם חוסר יעילות.',
      en: 'The ENTJ is a natural leader who sees a goal and organizes people and resources to reach it. Decisive, direct and visionary, it has trouble tolerating inefficiency.',
    },
    daily: {
      he: ['לוקח פיקוד וקובע כיוון', 'מתכנן מהר ומצפה לביצוע', 'אוהב אתגרים ותחרות', 'ישיר בשיחה ובמשוב'],
      en: ['Takes charge and sets direction', 'Plans fast and expects execution', 'Likes challenges and competition', 'Direct in conversation and feedback'],
    },
    strengths: {
      he: ['מנהיגות והחלטיות', 'חשיבה אסטרטגית', 'יעילות וביצוע', 'ביטחון עצמי'],
      en: ['Leadership and decisiveness', 'Strategic thinking', 'Efficiency and execution', 'Self-confidence'],
    },
    challenges: {
      he: ['חוסר סבלנות ושליטה', 'פגיעה ברגשות אחרים ללא כוונה', 'קושי להכיר בפגיעות', 'דחיקת צרכים אישיים לטובת המטרה'],
      en: ['Impatience and control', 'Unintentionally hurting others\' feelings', 'Difficulty admitting vulnerability', 'Pushing aside personal needs for the goal'],
    },
    relationships: {
      he: 'נאמן ושואף לצמיחה משותפת. אתגר: להקשיב לפני שמנחים, להכיר ברגש של האחר ולא לנהל את הקשר כפרויקט.',
      en: 'Loyal and aiming for shared growth. Challenge: listening before directing, acknowledging the other\'s feeling, and not running the relationship like a project.',
    },
    work: {
      he: 'מצטיין בניהול, יזמות, אסטרטגיה, ייעוץ ותפקידי הובלה.',
      en: 'Excels in management, entrepreneurship, strategy, consulting and leadership roles.',
    },
    stress: {
      he: 'בלחץ עלול להיסחף לרגשות חזקים ולא מעובדים, כמו תחושת פגיעה או חוסר הערכה, ולהתפרץ.',
      en: 'Under stress may be swept into strong unprocessed feelings, like hurt or lack of appreciation, and erupt.',
    },
    tips: {
      he: ['שאל "מה אתה חושב?" ואז חכה', 'הכר בהישגים של אחרים בקול', 'תן לעצמך מרחב לרגש מבלי "לפתור" אותו'],
      en: ['Ask "what do you think?" and then wait', 'Acknowledge others\' achievements aloud', 'Give yourself room for feeling without "solving" it'],
    },
  },
  ENTP: {
    stack: 'Ne · Ti · Fe · Si',
    overview: {
      he: 'ENTP הוא ממציא ויכוחן. נהנה לחקור אפשרויות, לשאול שאלות ולבחון רעיונות בדיון חי. הוא יצירתי ומהיר, ומתקשה עם שגרה ועם פרטים.',
      en: 'The ENTP is an inventor and debater. It enjoys exploring possibilities, asking questions and testing ideas in lively discussion. Creative and quick, it struggles with routine and details.',
    },
    daily: {
      he: ['מתלהב מרעיונות חדשים וקופץ בין נושאים', 'מתווכח כדי לבחון, לא תמיד כדי לנצח', 'מתאים את עצמו לרוב הסיטואציות', 'משתעמם מהר משגרה'],
      en: ['Gets excited by new ideas and jumps between topics', 'Argues to test, not always to win', 'Adapts to most situations', 'Gets bored quickly with routine'],
    },
    strengths: {
      he: ['יצירתיות וחדשנות', 'גמישות מחשבתית', 'כושר שכנוע וחוש הומור', 'מהירות חשיבה'],
      en: ['Creativity and innovation', 'Mental flexibility', 'Persuasiveness and humor', 'Quick thinking'],
    },
    challenges: {
      he: ['פיזור ואי השלמה', 'זלזול בפרטים וביצוע', 'ויכוחיות שעלולה לפגוע', 'קושי להתחייב'],
      en: ['Scatteredness and not finishing', 'Neglect of details and execution', 'Argumentativeness that can hurt', 'Difficulty committing'],
    },
    relationships: {
      he: 'מעניין, שנון ומרגש, ומחפש שותף שיכול להתמודד עם רעיונות. אתגר: עקביות, נוכחות רגשית ולא לוותר כשהתלהבות דועכת.',
      en: 'Interesting, witty and exciting, and looks for a partner who can handle ideas. Challenge: consistency, emotional presence and not giving up when excitement fades.',
    },
    work: {
      he: 'מצטיין ביזמות, חדשנות, שיווק, ייעוץ ופתרון בעיות. פחות בתפקידי שגרה.',
      en: 'Excels in entrepreneurship, innovation, marketing, consulting and problem solving. Less so in routine roles.',
    },
    stress: {
      he: 'בלחץ עלול להיתקע בפרטים ובשגרה, להפוך נוקשה או להישאב לזיכרונות ולדאגות על בריאות ומבנה.',
      en: 'Under stress may get stuck in details and routine, become rigid, or be pulled into memories and worries about health and structure.',
    },
    tips: {
      he: ['בחר רעיון אחד והבא אותו עד הסוף', 'שאל לפני שאתה מתווכח: האם זה הזמן?', 'בנה מבנה פשוט שמחזיק אותך בשגרה'],
      en: ['Pick one idea and take it to the end', 'Before arguing ask: is this the time?', 'Build a simple structure that holds you in routine'],
    },
  },
  INFJ: {
    stack: 'Ni · Fe · Ti · Se',
    overview: {
      he: 'INFJ רגיש, עמוק ובעל חזון. הוא קולט אנשים ומצבים באינטואיציה, מחפש משמעות ורוצה להשפיע לטובה. הוא נראה שקט, ומבפנים מנהל עולם ערכים ותובנות עשיר.',
      en: 'The INFJ is sensitive, deep and visionary. It reads people and situations by intuition, seeks meaning and wants to make a positive difference. It appears quiet, while inwardly running a rich world of values and insight.',
    },
    daily: {
      he: ['קולט מצבי רוח ומניעים של אחרים', 'צריך זמן לבד כדי לעבד ולהטעין', 'מונע מערכים ומשמעות', 'מתכנן ומחפש עומק בקשרים'],
      en: ['Picks up others\' moods and motives', 'Needs time alone to process and recharge', 'Driven by values and meaning', 'Plans and seeks depth in relationships'],
    },
    strengths: {
      he: ['אמפתיה ותובנה', 'חזון ומחויבות לערכים', 'יכולת ליעץ ולעודד', 'ריכוז ועקשנות מכוונת'],
      en: ['Empathy and insight', 'Vision and commitment to values', 'Ability to counsel and encourage', 'Focus and purposeful persistence'],
    },
    challenges: {
      he: ['פרפקציוניזם ואידיאליזם', 'התעייפות מרגשות של אחרים', 'קושי להציב גבולות', 'נסיגה כשמרגישים לא מובנים'],
      en: ['Perfectionism and idealism', 'Fatigue from others\' emotions', 'Difficulty setting boundaries', 'Withdrawal when feeling misunderstood'],
    },
    relationships: {
      he: 'מחפש קשר עמוק ואמיתי, ונותן הרבה. אתגר: לבטא צרכים ישירות, ולא לצפות שאחרים "יבינו לבד".',
      en: 'Seeks deep, real connection and gives a lot. Challenge: stating needs directly, and not expecting others to "just know".',
    },
    work: {
      he: 'מצטיין בייעוץ, טיפול, חינוך, כתיבה ובתפקידים עם משמעות ערכית.',
      en: 'Excels in counseling, therapy, education, writing and values-driven roles.',
    },
    stress: {
      he: 'בלחץ עלול לפנות לחושים: אכילה, בילוי, התעסקות בפרטים, או להרגיש מוצף ולהסתגר.',
      en: 'Under stress may turn to the senses: eating, entertainment, fussing with details, or feel overwhelmed and withdraw.',
    },
    tips: {
      he: ['קבע זמן קבוע להתאוששות', 'דבר על מה שאתה צריך לפני שאתה מתעייף', 'הרשה לעצמך להיות "טוב מספיק"'],
      en: ['Set regular recovery time', 'Say what you need before you get exhausted', 'Allow yourself to be "good enough"'],
    },
  },
  INFP: {
    stack: 'Fi · Ne · Si · Te',
    overview: {
      he: 'INFP מונע מערכים פנימיים עמוקים ומחפש אותנטיות. הוא רגיש, דמיוני ואמפתי, ומרגיש קשר חזק לאמנות, לשפה ולסיפורים. בעולם שמרגיש לו מהיר מדי הוא מחפש מקום שלו.',
      en: 'The INFP is driven by deep inner values and seeks authenticity. Sensitive, imaginative and empathic, it feels a strong tie to art, language and stories. In a world that feels too fast it looks for its own place.',
    },
    daily: {
      he: ['מרגיש לעומק ומחפש משמעות', 'מתבונן ושומר רגשות קרוב', 'מושך לאמנות, כתיבה, מוזיקה', 'נסוג כשהערכים שלו נפגעים'],
      en: ['Feels deeply and seeks meaning', 'Observes and keeps feelings close', 'Drawn to art, writing and music', 'Withdraws when values are violated'],
    },
    strengths: {
      he: ['אמפתיה וחמלה', 'יצירתיות ודמיון', 'נאמנות לערכים', 'פתיחות למגוון אנשים'],
      en: ['Empathy and compassion', 'Creativity and imagination', 'Loyalty to values', 'Openness to different people'],
    },
    challenges: {
      he: ['ביקורת עצמית וספק', 'קושי בפרקטיקה ובהשלמה', 'התרחקות מקונפליקט', 'אידיאליזציה והתאכזבות'],
      en: ['Self-criticism and doubt', 'Difficulty with practicalities and finishing', 'Avoiding conflict', 'Idealization and disappointment'],
    },
    relationships: {
      he: 'נאמן, מעריך כנות ועומק, ומקבל בצורה נדירה. אתגר: לומר מה כואב במקום להסתגר.',
      en: 'Loyal, values honesty and depth, and accepts people in a rare way. Challenge: saying what hurts instead of withdrawing.',
    },
    work: {
      he: 'מצטיין בכתיבה, עיצוב, טיפול, חינוך ובעבודה בעלת משמעות ערכית וחופש יצירתי.',
      en: 'Excels in writing, design, therapy, education and meaningful work with creative freedom.',
    },
    stress: {
      he: 'בלחץ עלול להפוך ביקורתי ונוקשה, לנהל "רשימות" של פגמים ולהתייחס לעולם כבלתי יעיל.',
      en: 'Under stress may become critical and rigid, keep lists of flaws and treat the world as inefficient.',
    },
    tips: {
      he: ['פרק מטרות גדולות לצעדים קטנים', 'שתף יצירה לא גמורה עם אדם בטוח', 'תרגל לומר "זה חשוב לי" בקול'],
      en: ['Break big goals into small steps', 'Share an unfinished work with a safe person', 'Practice saying "this matters to me" out loud'],
    },
  },
  ENFJ: {
    stack: 'Fe · Ni · Se · Ti',
    overview: {
      he: 'ENFJ הוא מנחה ומעורר השראה. הוא קולט את הצרכים של קבוצה, מחבר אנשים ומעודד אותם להתפתח. הוא חם, כריזמטי ואחראי, ולעיתים שוכח את עצמו.',
      en: 'The ENFJ is a facilitator and inspirer. It senses a group\'s needs, connects people and encourages their growth. Warm, charismatic and responsible, it sometimes forgets itself.',
    },
    daily: {
      he: ['מזהה במהירות מה אחרים צריכים', 'לוקח אחריות על האווירה', 'אוהב לעודד ולהדריך', 'מתקשה לסרב'],
      en: ['Quickly identifies what others need', 'Takes responsibility for the atmosphere', 'Likes to encourage and guide', 'Finds it hard to refuse'],
    },
    strengths: {
      he: ['אמפתיה וכריזמה', 'יכולת להוביל ולחבר', 'תקשורת ברורה', 'מחויבות לצמיחה של אחרים'],
      en: ['Empathy and charisma', 'Ability to lead and connect', 'Clear communication', 'Commitment to others\' growth'],
    },
    challenges: {
      he: ['הזנחה עצמית', 'רגישות יתר למשוב', 'נטייה להתערב', 'קושי להכיל חוסר הסכמה'],
      en: ['Self-neglect', 'Oversensitivity to feedback', 'A tendency to intervene', 'Difficulty holding disagreement'],
    },
    relationships: {
      he: 'מסור ונוכח, ומשקיע בצמיחה משותפת. אתגר: לא לקחת אחריות על הרגשות של האחר, ולהרשות לעצמו לקבל.',
      en: 'Devoted and present, investing in shared growth. Challenge: not taking responsibility for the other\'s feelings, and allowing itself to receive.',
    },
    work: {
      he: 'מצטיין בהוראה, ניהול אנשים, ייעוץ, משאבי אנוש, ובתפקידים מכוונים אנשים.',
      en: 'Excels in teaching, people management, counseling, HR and people-facing roles.',
    },
    stress: {
      he: 'בלחץ עלול להפוך ביקורתי באופן קר, לנתח אנשים בחדות או להסתגר לתוך היגיון נוקשה.',
      en: 'Under stress may turn coldly critical, analyze people sharply or retreat into rigid logic.',
    },
    tips: {
      he: ['תכנן זמן קבוע לעצמך', 'שאל "מה אני צריך?" לפני "מה הם צריכים?"', 'קבל משוב ללא פירוש כדחייה'],
      en: ['Schedule regular time for yourself', 'Ask "what do I need?" before "what do they need?"', 'Take feedback without reading it as rejection'],
    },
  },
  ENFP: {
    stack: 'Ne · Fi · Te · Si',
    overview: {
      he: 'ENFP הוא נלהב, יצירתי ופתוח. הוא רואה אפשרויות בכל מקום ואנשים בכל מקום, ומתרגש מרעיונות ומקשרים. הוא מחפש חופש ומשמעות, ומתקשה עם שגרה ועם פרטים.',
      en: 'The ENFP is enthusiastic, creative and open. It sees possibilities and people everywhere and is excited by ideas and connections. It seeks freedom and meaning, and struggles with routine and details.',
    },
    daily: {
      he: ['מתלהב מרעיון חדש ומשתף מיד', 'יוצר קשרים בקלות', 'נמשך לאנשים ולמשמעות', 'מתקשה לסיים ולהתמיד'],
      en: ['Gets excited about a new idea and shares at once', 'Connects with people easily', 'Drawn to people and meaning', 'Struggles to finish and persist'],
    },
    strengths: {
      he: ['יצירתיות ואנרגיה', 'אמפתיה וחום', 'גמישות ופתיחות', 'יכולת להלהיב ולהניע'],
      en: ['Creativity and energy', 'Empathy and warmth', 'Flexibility and openness', 'Ability to excite and motivate'],
    },
    challenges: {
      he: ['פיזור ושינויי כיוון', 'קושי עם שגרה ופרטים', 'רגישות לביקורת', 'מחויבות לטווח ארוך'],
      en: ['Scatteredness and changes of direction', 'Difficulty with routine and details', 'Sensitivity to criticism', 'Long-term commitment'],
    },
    relationships: {
      he: 'חם, נלהב ופתוח, ומעריך אותנטיות. אתגר: להישאר גם כשהחידוש נגמר, ולבדוק את הציפיות בקשר.',
      en: 'Warm, enthusiastic and open, and values authenticity. Challenge: staying when novelty ends, and checking expectations in the relationship.',
    },
    work: {
      he: 'מצטיין בתפקידים יצירתיים, הדרכה, שיווק, ייעוץ ויזמות עם גיוון ואנשים.',
      en: 'Excels in creative roles, training, marketing, counseling and entrepreneurship with variety and people.',
    },
    stress: {
      he: 'בלחץ עלול להפוך נוקשה, לדאוג מפרטים ומסכנות, ולהתמקד בעבר או בבריאות.',
      en: 'Under stress may become rigid, worry about details and dangers, and fixate on the past or health.',
    },
    tips: {
      he: ['בחר פרויקט אחד לסיים החודש', 'בנה מבנה שבועי פשוט', 'ברר עם אחרים מה הם צריכים לפני שאתה מתלהב'],
      en: ['Pick one project to finish this month', 'Build a simple weekly structure', 'Check what others need before getting carried away'],
    },
  },
  ISTJ: {
    stack: 'Si · Te · Fi · Ne',
    overview: {
      he: 'ISTJ הוא אחראי, מסודר ואמין. הוא נשען על עובדות, ניסיון וכללים, ומקפיד לעמוד בהתחייבויות. הוא פחות מדבר וחוזר על מה שעבד.',
      en: 'The ISTJ is responsible, organized and reliable. It leans on facts, experience and rules, and is careful to keep commitments. It speaks less and repeats what has worked.',
    },
    daily: {
      he: ['מתכנן ומקפיד על סדר', 'מעדיף שיטות מוכחות', 'עומד בלוחות זמנים', 'שומר על דיסקרטיות'],
      en: ['Plans and keeps order', 'Prefers proven methods', 'Meets deadlines', 'Keeps discretion'],
    },
    strengths: {
      he: ['אמינות ואחריות', 'דיוק ויסודיות', 'התמדה ומשמעת', 'שיפוט מעשי'],
      en: ['Reliability and responsibility', 'Accuracy and thoroughness', 'Persistence and discipline', 'Practical judgment'],
    },
    challenges: {
      he: ['התנגדות לשינוי', 'קושי להביע רגש', 'נוקשות כלפי כללים', 'קושי לקבל דרכים שונות'],
      en: ['Resistance to change', 'Difficulty expressing feeling', 'Rigidity about rules', 'Difficulty accepting different ways'],
    },
    relationships: {
      he: 'נאמן, יציב ומחויב, ומראה אהבה בפעולות. אתגר: להביע רגש במילים ולהכיר בצורך של האחר בהפתעה וספונטניות.',
      en: 'Loyal, steady and committed, showing love through actions. Challenge: expressing feeling in words and recognizing the other\'s need for surprise and spontaneity.',
    },
    work: {
      he: 'מצטיין בחשבונאות, משפט, ניהול תפעול, הנדסה, צבא וכל תחום שדורש דיוק.',
      en: 'Excels in accounting, law, operations, engineering, the military and any precision field.',
    },
    stress: {
      he: 'בלחץ עלול לצלול לתרחישי אסון ואפשרויות שליליות, ולהרגיש חרדה מהלא ידוע.',
      en: 'Under stress may dive into worst-case scenarios and negative possibilities, feeling anxiety about the unknown.',
    },
    tips: {
      he: ['נסה שיטה חדשה אחת בחודש', 'אמור בקול מה אתה מעריך באחרים', 'שאל "מה אם זה יעבוד אחרת?"'],
      en: ['Try one new method a month', 'Say aloud what you value in others', 'Ask "what if this worked differently?"'],
    },
  },
  ISFJ: {
    stack: 'Si · Fe · Ti · Ne',
    overview: {
      he: 'ISFJ הוא מגן ותומך. הוא זוכר פרטים על אנשים, דואג לצרכים של הקרובים ומקפיד על מסורת ויציבות. הוא ענו ונאמן, ופחות מדבר על מה שהוא עצמו צריך.',
      en: 'The ISFJ is a protector and supporter. It remembers details about people, looks after the needs of those close and values tradition and stability. Humble and loyal, it speaks less of what it itself needs.',
    },
    daily: {
      he: ['שם לב לפרטים וצרכים קטנים', 'דואג לנוחות של אחרים', 'מעדיף סביבה יציבה ושגרה', 'מתקשה לסרב'],
      en: ['Notices details and small needs', 'Looks after others\' comfort', 'Prefers a stable environment and routine', 'Finds it hard to refuse'],
    },
    strengths: {
      he: ['נאמנות ואכפתיות', 'זיכרון ופרטים', 'עזרה מעשית', 'סבלנות ואמינות'],
      en: ['Loyalty and caring', 'Memory and detail', 'Practical help', 'Patience and reliability'],
    },
    challenges: {
      he: ['הזנחת צרכים עצמיים', 'קושי בשינוי ובקונפליקט', 'נטייה להתאמץ בשקט ולהיעלב', 'חוסר הערכה עצמית'],
      en: ['Neglect of own needs', 'Difficulty with change and conflict', 'Tendency to strain quietly and feel hurt', 'Low self-appreciation'],
    },
    relationships: {
      he: 'חם, מסור ונוכח, ומראה אהבה במעשים. אתגר: לבקש ולהציב גבולות לפני שהאכזבה מצטברת.',
      en: 'Warm, devoted and present, showing love through deeds. Challenge: asking and setting boundaries before disappointment accumulates.',
    },
    work: {
      he: 'מצטיין בטיפול, חינוך, ניהול, מנהלה ושירות. מעדיף סביבה יציבה עם הערכה.',
      en: 'Excels in care, education, administration and service. Prefers a stable setting with appreciation.',
    },
    stress: {
      he: 'בלחץ עלול להתמלא בתרחישים שליליים ובחרדה מהעתיד, ולהרגיש שהכול ייכשל.',
      en: 'Under stress may fill with negative scenarios and anxiety about the future, feeling everything will fail.',
    },
    tips: {
      he: ['הצב גבול קטן אחד בשבוע', 'בקש משהו מפורש ולא רמז', 'הכר בהישגים שלך'],
      en: ['Set one small boundary a week', 'Ask for something explicitly, not by hint', 'Acknowledge your achievements'],
    },
  },
  ESTJ: {
    stack: 'Te · Si · Ne · Fi',
    overview: {
      he: 'ESTJ הוא מארגן ואחראי. הוא מאמין בסדר, בכללים ובעבודה קשה, ומנהל אנשים ותהליכים ביעילות. הוא ישיר וצפוי, ומצפה לאותה רמת מחויבות מאחרים.',
      en: 'The ESTJ is an organizer and responsible. It believes in order, rules and hard work, and manages people and processes efficiently. Direct and predictable, it expects the same commitment from others.',
    },
    daily: {
      he: ['קובע לוחות זמנים ובודק ביצוע', 'ישיר ומעשי', 'מעריך מסורת וסדר', 'לוקח אחריות על הקבוצה'],
      en: ['Sets schedules and checks execution', 'Direct and practical', 'Values tradition and order', 'Takes responsibility for the group'],
    },
    strengths: {
      he: ['ארגון ויעילות', 'מנהיגות מעשית', 'אמינות ועקביות', 'החלטיות'],
      en: ['Organization and efficiency', 'Practical leadership', 'Reliability and consistency', 'Decisiveness'],
    },
    challenges: {
      he: ['נוקשות וחוסר גמישות', 'קושי עם רגשות ושינוי', 'שיפוטיות כלפי חוסר סדר', 'מתן מעט מקום לדעות אחרות'],
      en: ['Rigidity and inflexibility', 'Difficulty with feelings and change', 'Judgment of disorder', 'Little room for other views'],
    },
    relationships: {
      he: 'נאמן ומחויב, מראה אהבה דרך אחריות ויציבות. אתגר: להקשיב, להכיר ברגש ולא לנהל את הבית כמו ארגון.',
      en: 'Loyal and committed, showing love through responsibility and stability. Challenge: listening, acknowledging feeling and not running the home like an organization.',
    },
    work: {
      he: 'מצטיין בניהול, תפעול, משפט, צבא, כספים ובתפקידים עם מבנה וסמכות.',
      en: 'Excels in management, operations, law, military, finance and structured, authoritative roles.',
    },
    stress: {
      he: 'בלחץ עלול להיתקע בחרדה מאפשרויות, בתרחישי אסון ובחוסר שליטה, או להרגיש מוצף מרגש שלא עיבד.',
      en: 'Under stress may get stuck in anxiety about possibilities, worst-case scenarios and loss of control, or feel flooded by unprocessed emotion.',
    },
    tips: {
      he: ['שאל לדעה לפני שאתה מחליט', 'שמור זמן ללא תוכנית', 'הבע הערכה ולא רק הוראות'],
      en: ['Ask for an opinion before deciding', 'Keep time without a plan', 'Express appreciation, not only instructions'],
    },
  },
  ESFJ: {
    stack: 'Fe · Si · Ne · Ti',
    overview: {
      he: 'ESFJ הוא חברתי, אכפתי ומתאם. הוא יוצר אווירה נעימה, דואג לקהילה ולמסורת, ושם לב לצרכים של אנשים. חשוב לו להרגיש שייך ומוערך.',
      en: 'The ESFJ is social, caring and a coordinator. It creates a pleasant atmosphere, looks after community and tradition, and notices people\'s needs. Feeling belonging and appreciated matters to it.',
    },
    daily: {
      he: ['מארגן אירועים ושומר על קשרים', 'קולט מצבי רוח בקבוצה', 'מעדיף הרמוניה', 'רגיש להערכה ולביקורת'],
      en: ['Organizes events and keeps contacts', 'Picks up the mood in a group', 'Prefers harmony', 'Sensitive to appreciation and criticism'],
    },
    strengths: {
      he: ['חום וחברותיות', 'ארגון מעשי', 'נאמנות ואחריות', 'יכולת לחבר אנשים'],
      en: ['Warmth and sociability', 'Practical organization', 'Loyalty and responsibility', 'Ability to connect people'],
    },
    challenges: {
      he: ['תלות באישור', 'קושי עם ביקורת וקונפליקט', 'נטייה להתערב', 'קושי להתמודד עם שינוי'],
      en: ['Dependence on approval', 'Difficulty with criticism and conflict', 'A tendency to intervene', 'Difficulty with change'],
    },
    relationships: {
      he: 'נדיב, מסור ונוכח. אתגר: לא לקחת ביקורת באופן אישי, ולבקש במפורש.',
      en: 'Generous, devoted and present. Challenge: not taking criticism personally, and asking explicitly.',
    },
    work: {
      he: 'מצטיין בחינוך, טיפול, שירות, אירועים, משאבי אנוש וניהול צוות.',
      en: 'Excels in education, care, service, events, HR and team management.',
    },
    stress: {
      he: 'בלחץ עלול להפוך ביקורתי וקר, להסתגר בהיגיון נוקשה ולפסול אחרים.',
      en: 'Under stress may become critical and cold, retreat into rigid logic and dismiss others.',
    },
    tips: {
      he: ['קבל משוב כמידע ולא כהערכה של ערך', 'תכנן זמן שקט', 'אמור לא לדבר אחד בשבוע'],
      en: ['Take feedback as information, not a judgment of worth', 'Plan quiet time', 'Say no to one thing a week'],
    },
  },
  ISTP: {
    stack: 'Ti · Se · Ni · Fe',
    overview: {
      he: 'ISTP הוא מעשי, רגוע וסקרן לגבי איך דברים עובדים. הוא פותר בעיות בידיים ובראש, שומר על קור רוח במצבי לחץ ומעדיף חופש פעולה.',
      en: 'The ISTP is practical, calm and curious about how things work. It solves problems with hands and head, stays cool under pressure and prefers freedom of action.',
    },
    daily: {
      he: ['מפרק ומרכיב כדי להבין', 'מעדיף פעולה על דיבור', 'רגוע במשברים', 'זקוק לעצמאות ולמרחב'],
      en: ['Takes apart and assembles to understand', 'Prefers action over talk', 'Calm in crisis', 'Needs independence and space'],
    },
    strengths: {
      he: ['פתרון בעיות מעשי', 'קור רוח', 'גמישות ויכולת תגובה', 'עצמאות'],
      en: ['Practical problem solving', 'Coolness', 'Flexibility and responsiveness', 'Independence'],
    },
    challenges: {
      he: ['קושי להביע רגש', 'תכנון ארוך טווח', 'נטייה לקחת סיכונים', 'התרחקות מהתחייבות'],
      en: ['Difficulty expressing feeling', 'Long-term planning', 'A tendency to take risks', 'Avoiding commitment'],
    },
    relationships: {
      he: 'שקט, נאמן ומכבד חופש. מראה אהבה בפעולות. אתגר: לשתף במילים מה קורה בפנים.',
      en: 'Quiet, loyal and respectful of freedom. Shows love in action. Challenge: sharing in words what is happening inside.',
    },
    work: {
      he: 'מצטיין בהנדסה, מכניקה, טכנולוגיה, ספורט, ובמקצועות מעשיים עם עצמאות.',
      en: 'Excels in engineering, mechanics, technology, sports and practical professions with independence.',
    },
    stress: {
      he: 'בלחץ עלול להתפרץ רגשית, לחוש מוצף מצרכי אחרים או להפגין תגובות חריפות.',
      en: 'Under stress may erupt emotionally, feel flooded by others\' needs or show sharp reactions.',
    },
    tips: {
      he: ['תאר מה קורה בך בשתי משפטים', 'הגדר מטרה לשלושה חודשים', 'שים לב לחשיפה לסיכון'],
      en: ['Describe what is happening in you in two sentences', 'Set a three-month goal', 'Watch exposure to risk'],
    },
  },
  ISFP: {
    stack: 'Fi · Se · Ni · Te',
    overview: {
      he: 'ISFP הוא רגיש, שקט ואמנותי. הוא חי את הרגע, מעריך יופי וחופש, ומבטא את עצמו במעשים ובעיצוב יותר מאשר במילים. הערכים שלו עמוקים ופרטיים.',
      en: 'The ISFP is sensitive, quiet and artistic. It lives in the moment, values beauty and freedom, and expresses itself in deeds and design more than words. Its values are deep and private.',
    },
    daily: {
      he: ['חש את הרגע ואת הסביבה', 'מבטא יצירתיות דרך חושים', 'נמנע מלחץ וקונפליקט', 'פועל לפי ערכים פנימיים'],
      en: ['Feels the moment and surroundings', 'Expresses creativity through the senses', 'Avoids pressure and conflict', 'Acts by inner values'],
    },
    strengths: {
      he: ['רגישות ואמפתיה', 'אסתטיקה ויצירתיות', 'גמישות ופתיחות', 'נאמנות לערכים'],
      en: ['Sensitivity and empathy', 'Aesthetics and creativity', 'Flexibility and openness', 'Loyalty to values'],
    },
    challenges: {
      he: ['הימנעות מקונפליקט', 'קושי בתכנון', 'ביקורת עצמית', 'חוסר ביטחון בהצגת עצמו'],
      en: ['Avoiding conflict', 'Difficulty planning', 'Self-criticism', 'Insecurity in presenting itself'],
    },
    relationships: {
      he: 'חם, רגיש ומכבד, ונותן מרחב. אתגר: לבטא בקול רצונות וגבולות.',
      en: 'Warm, sensitive and respectful, giving space. Challenge: voicing wants and boundaries.',
    },
    work: {
      he: 'מצטיין בעיצוב, אמנות, טיפול, טבע ובמקצועות עם יצירה וחופש.',
      en: 'Excels in design, art, care, nature and professions with creation and freedom.',
    },
    stress: {
      he: 'בלחץ עלול להפוך נוקשה, ביקורתי ומתנגד, ולדרוש שליטה ויעילות באופן לא אופייני.',
      en: 'Under stress may become rigid, critical and defiant, demanding control and efficiency in an uncharacteristic way.',
    },
    tips: {
      he: ['הצב יעד קטן לשבוע', 'שתף מה חשוב לך לפני שנפגעת', 'צור באופן קבוע, גם ללא השראה'],
      en: ['Set one small weekly goal', 'Share what matters before getting hurt', 'Create regularly, even without inspiration'],
    },
  },
  ESTP: {
    stack: 'Se · Ti · Fe · Ni',
    overview: {
      he: 'ESTP הוא איש פעולה. הוא חי בהווה, מגיב מהר, אוהב אתגרים ופועל באנרגיה גבוהה. מעשי ופרגמטי, הוא קורא סיטואציות במהירות וממציא פתרון בזמן אמת.',
      en: 'The ESTP is a man of action. It lives in the present, reacts fast, loves challenge and acts with high energy. Practical and pragmatic, it reads situations quickly and invents solutions in real time.',
    },
    daily: {
      he: ['פועל לפני שחושב עד הסוף', 'אוהב חוויה והתרגשות', 'קורא אנשים במהירות', 'משתעמם מתיאוריה'],
      en: ['Acts before thinking it through', 'Loves experience and excitement', 'Reads people fast', 'Bored by theory'],
    },
    strengths: {
      he: ['תגובה מהירה ופתרון בעיות', 'כריזמה ויכולת שכנוע', 'אומץ ויוזמה', 'מעשיות'],
      en: ['Quick response and problem solving', 'Charisma and persuasion', 'Courage and initiative', 'Practicality'],
    },
    challenges: {
      he: ['אימפולסיביות וסיכון', 'חוסר סבלנות לתכנון', 'קושי להתמיד בשגרה', 'התעלמות מתוצאות ארוכות טווח'],
      en: ['Impulsiveness and risk', 'Impatience with planning', 'Difficulty persisting in routine', 'Ignoring long-term results'],
    },
    relationships: {
      he: 'מהנה, נדיב ונוכח. מעריך ישירות ומרחב. אתגר: להקשיב לרגש ולהתחייב לאורך זמן.',
      en: 'Fun, generous and present. Values directness and space. Challenge: listening to feeling and committing over time.',
    },
    work: {
      he: 'מצטיין במכירות, יזמות, חירום, ספורט ובתפקידים דינמיים עם תוצאה מיידית.',
      en: 'Excels in sales, entrepreneurship, emergency work, sport and dynamic roles with immediate results.',
    },
    stress: {
      he: 'בלחץ עלול להסתבך בחרדות מהעתיד ובתחושות של אובדן שליטה או משמעות.',
      en: 'Under stress may tangle in anxiety about the future and feelings of lost control or meaning.',
    },
    tips: {
      he: ['עצור לפני החלטה גדולה ושאל מה יהיה בעוד שנה', 'תכנן לטווח של שלושה חודשים', 'שאל אחרים איך הם קיבלו את זה'],
      en: ['Pause before a big decision and ask what it looks like in a year', 'Plan over three months', 'Ask others how they took it'],
    },
  },
  ESFP: {
    stack: 'Se · Fi · Te · Ni',
    overview: {
      he: 'ESFP הוא חי, חברותי וספונטני. הוא נהנה מהרגע, מביא שמחה לסביבה ומתחבר לאנשים בקלות. הוא חם ונדיב, ואוהב חוויות וצבע.',
      en: 'The ESFP is lively, sociable and spontaneous. It enjoys the moment, brings joy to its surroundings and connects to people easily. Warm and generous, it loves experiences and color.',
    },
    daily: {
      he: ['יוצר אווירה מהנה', 'ספונטני ופתוח לחוויות', 'מתחבר לאנשים במהירות', 'מתקשה עם תכנון וביקורת'],
      en: ['Creates a fun atmosphere', 'Spontaneous and open to experience', 'Connects to people quickly', 'Struggles with planning and criticism'],
    },
    strengths: {
      he: ['חום וכריזמה', 'אנרגיה ושמחה', 'מעשיות ותגובה מהירה', 'אמפתיה'],
      en: ['Warmth and charisma', 'Energy and joy', 'Practicality and quick response', 'Empathy'],
    },
    challenges: {
      he: ['הימנעות מקונפליקט וכאב', 'קושי בתכנון ארוך טווח', 'רגישות לביקורת', 'נטייה להתפזר'],
      en: ['Avoiding conflict and pain', 'Difficulty with long-term planning', 'Sensitivity to criticism', 'A tendency to scatter'],
    },
    relationships: {
      he: 'נדיב, מהנה ונוכח, ומראה אהבה בחוויות משותפות. אתגר: לדבר על דברים קשים ולהתחייב.',
      en: 'Generous, fun and present, showing love through shared experience. Challenge: speaking about hard things and committing.',
    },
    work: {
      he: 'מצטיין בשירות, הופעה, חינוך, אירועים, מכירות ובתפקידים בין-אישיים.',
      en: 'Excels in service, performance, education, events, sales and interpersonal roles.',
    },
    stress: {
      he: 'בלחץ עלול לתפוס דאגות גדולות ושליליות לגבי העתיד ולהרגיש חוסר אונים.',
      en: 'Under stress may seize on large negative worries about the future and feel helpless.',
    },
    tips: {
      he: ['תכנן דבר קטן לעתיד הקרוב', 'דבר על כאב במקום לעקוף אותו', 'בנה מבנה פיננסי פשוט'],
      en: ['Plan one small thing for the near future', 'Talk about pain instead of going around it', 'Build a simple financial structure'],
    },
  },
};
