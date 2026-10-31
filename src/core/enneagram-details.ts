import type { L } from './astro';

/** תיאור מורחב לכל טיפוס באניאגרם. משמש את מסך התוצאה. */
export interface EnnDetail {
  overview: L;
  daily: { he: string[]; en: string[] };
  strengths: { he: string[]; en: string[] };
  challenges: { he: string[]; en: string[] };
  relationships: L;
  work: L;
  /** כנפיים: מפתח הוא מספר הטיפוס השכן */
  wings: Record<string, L>;
  tips: { he: string[]; en: string[] };
  /** הטיפוס שאליו עוברים בלחץ / בצמיחה (קווי האניאגרם) */
  stress: string;
  growth: string;
  stressText: L;
  growthText: L;
}

export const ENN_CENTER: Record<string, { he: string; en: string }> = {
  '8': { he: 'מרכז הגוף (אינסטינקט)', en: 'Body center (instinct)' },
  '9': { he: 'מרכז הגוף (אינסטינקט)', en: 'Body center (instinct)' },
  '1': { he: 'מרכז הגוף (אינסטינקט)', en: 'Body center (instinct)' },
  '2': { he: 'מרכז הלב (רגש)', en: 'Heart center (feeling)' },
  '3': { he: 'מרכז הלב (רגש)', en: 'Heart center (feeling)' },
  '4': { he: 'מרכז הלב (רגש)', en: 'Heart center (feeling)' },
  '5': { he: 'מרכז הראש (חשיבה)', en: 'Head center (thinking)' },
  '6': { he: 'מרכז הראש (חשיבה)', en: 'Head center (thinking)' },
  '7': { he: 'מרכז הראש (חשיבה)', en: 'Head center (thinking)' },
};

export const ENN_CENTER_TEXT: Record<'body' | 'heart' | 'head', L> = {
  body: {
    he: 'טיפוסים 8, 9, 1 מתמודדים במיוחד עם כעס ועם שליטה. הם מגיבים דרך הבטן: תחושת "נכון / לא נכון", גבולות, ותחושת עוצמה או חוסר עוצמה.',
    en: 'Types 8, 9 and 1 deal especially with anger and control. They respond from the gut: a sense of right and wrong, boundaries, and a feeling of power or powerlessness.',
  },
  heart: {
    he: 'טיפוסים 2, 3, 4 מתמודדים במיוחד עם תחושת ערך ודימוי עצמי. הם קוראים את העולם דרך יחסים, ביטוי עצמי ושאלה "מי אני בעיני אחרים ובעיני עצמי".',
    en: 'Types 2, 3 and 4 deal especially with worth and self-image. They read the world through relationships, self-expression and the question "who am I in others\' eyes and in my own".',
  },
  head: {
    he: 'טיפוסים 5, 6, 7 מתמודדים במיוחד עם פחד וחרדה. הם מגיבים דרך ניתוח, תכנון ובחינת סכנות, כדי להרגיש שיש להם קרקע יציבה.',
    en: 'Types 5, 6 and 7 deal especially with fear and anxiety. They respond through analysis, planning and scanning for danger, so as to feel on solid ground.',
  },
};

export const ENN_DETAILS: Record<string, EnnDetail> = {
  '1': {
    overview: {
      he: 'טיפוס 1 מונע מתחושה פנימית של "יש דרך נכונה לעשות דברים". יש לו מצפון חד ורצון אמיתי לשפר את עצמו ואת העולם. מתחת לרצינות יש כעס מרוסן על כך שדברים אינם כפי שהיו צריכים להיות, והוא מופנה בעיקר פנימה, אל מבקר פנימי קבוע.',
      en: 'Type 1 is driven by an inner sense that there is a right way to do things. It has a sharp conscience and a real wish to improve itself and the world. Beneath the seriousness is restrained anger that things are not as they should be, mostly aimed inward at a constant inner critic.',
    },
    daily: {
      he: ['מבחין בפגמים, בטעויות ובפערים בין המצוי לרצוי', 'מקשיב לקול פנימי ביקורתי שמעיר ומתקן', 'מתקשה לנוח לפני שהכול "מסודר כראוי"', 'מקפיד על עקרונות, על זמנים ועל דיוק', 'מבקר מבחוץ בצורה מאופקת, אבל מרגיש כעס מבפנים'],
      en: ['Notices flaws, mistakes and the gap between what is and what should be', 'Hears an inner critic that comments and corrects', 'Finds it hard to rest before everything is in order', 'Is careful about principles, time and precision', 'Criticizes outwardly in a restrained way but feels anger inside'],
    },
    strengths: {
      he: ['יושרה ואחריות', 'שאיפה עקבית לשיפור', 'סטנדרטים גבוהים ויכולת הקפדה', 'אמינות ועמידה בהתחייבויות', 'מוסריות ומחויבות לערכים'],
      en: ['Integrity and responsibility', 'A steady drive to improve', 'High standards and attention to detail', 'Reliability and keeping commitments', 'Morality and commitment to values'],
    },
    challenges: {
      he: ['שיפוטיות כלפי עצמך וכלפי אחרים', 'נוקשות, חשיבה בשחור-לבן', 'קושי להרפות ולהנות בלי "לעשות קודם את מה שצריך"', 'כעס שנבלע ומתבטא במתח גופני או בציניות', 'פרפקציוניזם שמשתק או מעייף'],
      en: ['Judgment toward yourself and others', 'Rigidity, black-and-white thinking', 'Difficulty relaxing without "doing what must be done first"', 'Swallowed anger that shows up as body tension or cynicism', 'Perfectionism that paralyzes or exhausts'],
    },
    relationships: {
      he: 'בקשרים טיפוס 1 נאמן, אחראי ורציני. הוא עלול להפוך למתקן של בן הזוג או החברים, ולהקשות על עצמו להראות כעס או פגיעות באופן ישיר. הוא זקוק לחוויה שאפשר לאהוב אותו גם כשהוא לא מושלם.',
      en: 'In relationships Type 1 is loyal, responsible and serious. It can become the fixer of a partner or friends, and finds it hard to show anger or vulnerability directly. It needs the experience of being loved even when imperfect.',
    },
    work: {
      he: 'עובד יסודי, מסור ובעל רמת איכות גבוהה. מתאים לתפקידים שדורשים דיוק, אתיקה וניהול איכות. אתגר: האצלה, גמישות, והבחנה בין "טוב מספיק" ל"מושלם".',
      en: 'A thorough, dedicated worker with high quality standards. Suited to roles that need precision, ethics and quality control. Challenge: delegating, flexibility, and telling "good enough" from "perfect".',
    },
    wings: {
      '9': { he: 'כנף 9 (1w9): רגוע, מופשט ומרוחק יותר, מתקן דרך עקרונות ופחות דרך מעורבות אישית. ביקורת שקטה יותר ופחות התלהבות חברתית.', en: 'Wing 9 (1w9): calmer, more detached and idealistic; reforms through principle rather than personal involvement. Quieter criticism and less social enthusiasm.' },
      '2': { he: 'כנף 2 (1w2): חם, מעורב ובין-אישי יותר. רוצה לתקן עולם דרך עזרה לאנשים, אבל עלול להיות מתערב ונוקשה יותר.', en: 'Wing 2 (1w2): warmer, more involved and interpersonal. Wants to fix the world by helping people, but can be more intrusive and stern.' },
    },
    tips: {
      he: ['הקדש זמן קבוע לדבר שאתה עושה רק בשביל הנאה, ללא תוצר', 'כשהקול הביקורתי עולה, שאל: "מה הייתי אומר לחבר במקומי?"', 'תרגל לומר "טוב מספיק" על משימות קטנות', 'שים לב לכעס בגוף לפני שהוא הופך לביקורת', 'בקש משוב על מה שעבד, לא רק על מה שצריך לתקן'],
      en: ['Set aside regular time for something done purely for pleasure, with no output', 'When the critic rises, ask: "What would I tell a friend in my place?"', 'Practice saying "good enough" on small tasks', 'Notice anger in the body before it turns into criticism', 'Ask for feedback on what worked, not only what needs fixing'],
    },
    stress: '4', growth: '7',
    stressText: {
      he: 'בלחץ טיפוס 1 נע לכיוון 4: מרגיש מנותק, מתבודד, נסחף למלנכוליה, קנאה ותחושת "אף אחד לא מבין כמה אני משתדל".',
      en: 'Under stress Type 1 moves toward 4: feeling cut off, withdrawing, sliding into melancholy, envy and a sense that "nobody sees how hard I try".',
    },
    growthText: {
      he: 'בצמיחה טיפוס 1 נע לכיוון 7: נעשה ספונטני, שמח, קל יותר עם עצמו, ומאפשר לעצמו הנאה בלי אשמה.',
      en: 'In growth Type 1 moves toward 7: becoming spontaneous, joyful, lighter on itself, and allowing pleasure without guilt.',
    },
  },
  '2': {
    overview: {
      he: 'טיפוס 2 מכוון אל אנשים. הוא קולט צרכים של אחרים במהירות, נותן בנדיבות וחש ערך כשהוא נחוץ. מתחת לנתינה יש צורך עמוק להיות אהוב, ולעיתים קושי לזהות מה הוא עצמו צריך.',
      en: 'Type 2 is directed toward people. It senses others\' needs quickly, gives generously and feels worth when needed. Beneath the giving is a deep need to be loved, and sometimes difficulty identifying what it needs itself.',
    },
    daily: {
      he: ['קולט מצבי רוח ורצונות של אחרים עוד לפני שנאמרו', 'נותן עזרה, עצה ותשומת לב כמעט בלי לחשוב', 'מתקשה לומר לא ומתקשה לבקש', 'מרגיש פגוע כשהנתינה לא מוערכת', 'משנה את עצמו כדי להתאים לאדם שמולו'],
      en: ['Senses moods and wants of others before they are spoken', 'Gives help, advice and attention almost without thinking', 'Finds it hard to say no and to ask', 'Feels hurt when giving is not appreciated', 'Adapts itself to fit the person in front of it'],
    },
    strengths: {
      he: ['חום ואמפתיה אמיתיים', 'נדיבות ומסירות', 'יכולת ליצור קשרים ולהרגיש בבית עם אנשים', 'תמיכה רגשית ואכפתיות', 'יכולת לעודד ולהוציא את הטוב מאחרים'],
      en: ['Genuine warmth and empathy', 'Generosity and devotion', 'Ability to build bonds and feel at home with people', 'Emotional support and caring', 'Ability to encourage and bring out the best in others'],
    },
    challenges: {
      he: ['הזנחת הצרכים של עצמך', 'נתינה מתוך ציפייה סמויה לקבל בחזרה', 'קושי להציב גבולות', 'תלות בהכרה ובאישור', 'התפרצות או תסכול כשמרגישים לא מוערכים'],
      en: ['Neglecting your own needs', 'Giving with a hidden expectation of return', 'Difficulty setting boundaries', 'Dependence on recognition and approval', 'Outbursts or frustration when feeling unappreciated'],
    },
    relationships: {
      he: 'טיפוס 2 הוא חבר ובן זוג מסור ונוכח. האתגר: לתת בלי לשלוט, לקבל בלי אשמה, ולהאמין שהוא אהוב גם כשהוא לא עוזר.',
      en: 'Type 2 is a devoted, present friend and partner. The challenge: giving without controlling, receiving without guilt, and believing it is loved even when not helping.',
    },
    work: {
      he: 'מצטיין בתפקידי עזרה, חינוך, טיפול, משאבי אנוש, ובניית צוותים. אתגר: לקחת קרדיט, לדרוש עבור עצמו, ולא להיות זה שמחזיק את כולם.',
      en: 'Excels in helping, education, care, HR and team-building roles. Challenge: taking credit, asking for itself, and not being the one who holds everyone up.',
    },
    wings: {
      '1': { he: 'כנף 1 (2w1): יותר מוסרי, ממוקד ומשמעתי. נותן מתוך תחושת חובה ועקרונות, ועלול להיות ביקורתי כלפי עצמו.', en: 'Wing 1 (2w1): more ethical, focused and disciplined. Gives from duty and principle, and can be self-critical.' },
      '3': { he: 'כנף 3 (2w3): חברתי, כריזמטי ושאפתן יותר. נתינה עם דימוי והישג, ורצון להיות מוערך ומצליח בעיני אחרים.', en: 'Wing 3 (2w3): more social, charismatic and ambitious. Giving with image and achievement, wanting to be valued and successful in others\' eyes.' },
    },
    tips: {
      he: ['שאל את עצמך כל יום: "מה אני צריך עכשיו?" לפני שאתה שואל מה אחרים צריכים', 'תרגל לבקש דבר קטן ולהישאר עם אי הנוחות', 'שים לב מתי נתינה היא בחירה ומתי היא ציפייה', 'הגדר שעה בשבוע ששייכת רק לך', 'אפשר לאחרים לתת לך'],
      en: ['Ask daily: "What do I need now?" before asking what others need', 'Practice asking for something small and staying with the discomfort', 'Notice when giving is a choice and when it is an expectation', 'Set one hour a week that belongs only to you', 'Let others give to you'],
    },
    stress: '8', growth: '4',
    stressText: {
      he: 'בלחץ טיפוס 2 נע לכיוון 8: הופך תקיף, כועס ותובעני, ומוציא החוצה את הכעס שנבלע.',
      en: 'Under stress Type 2 moves toward 8: becoming forceful, angry and demanding, releasing the anger it swallowed.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 2 נע לכיוון 4: מתחבר לעולם הפנימי שלו, לרגשותיו האמיתיים ולצרכיו, ומפסיק להגדיר את עצמו דרך אחרים.',
      en: 'In growth Type 2 moves toward 4: connecting to its own inner world, true feelings and needs, and no longer defining itself through others.',
    },
  },
  '3': {
    overview: {
      he: 'טיפוס 3 מכוון מטרות, יעיל ומסתגל. הוא יודע מה נדרש כדי להצליח ומתאים את עצמו בהתאם. מתחת להישגים יש שאלה: "האם אני אהוב ושווה גם בלי ההצלחה?"',
      en: 'Type 3 is goal-oriented, efficient and adaptable. It knows what it takes to succeed and adjusts accordingly. Beneath the achievements is a question: "Am I loved and worthy even without success?"',
    },
    daily: {
      he: ['חושב בקטגוריות של יעדים, תוצאות ויעילות', 'מתאים את עצמו לקהל ולהקשר', 'עסוק, מהיר, וקשה לו לעצור', 'מושפע מאוד מהדימוי שהוא משדר', 'מדלג על רגשות כדי להמשיך להתקדם'],
      en: ['Thinks in goals, results and efficiency', 'Adapts to audience and context', 'Busy, fast, and hard to stop', 'Strongly affected by the image it projects', 'Skips over feelings in order to keep moving'],
    },
    strengths: {
      he: ['מוטיבציה והתמדה', 'יכולת ביצוע ויעילות', 'כריזמה וביטחון', 'יכולת לעורר השראה ולהוביל', 'אופטימיות ויכולת להתאושש מכשלון'],
      en: ['Drive and persistence', 'Execution ability and efficiency', 'Charisma and confidence', 'Ability to inspire and lead', 'Optimism and bounce-back after failure'],
    },
    challenges: {
      he: ['הזדהות עם התפקיד וההישגים', 'ניתוק מרגשות אמיתיים', 'עבודה מוגזמת ופגיעה בקשרים', 'חשש מכישלון וחשיפה', 'קושי להבחין בין מי שאתה לבין הדימוי'],
      en: ['Identifying with role and achievements', 'Disconnection from real feelings', 'Overwork and harm to relationships', 'Fear of failure and exposure', 'Difficulty separating who you are from the image'],
    },
    relationships: {
      he: 'טיפוס 3 נדיב, תומך ונלהב בתחילת קשר, אבל עלול להעדיף "לעשות" על פני "להיות". הוא צריך מרחב שבו לא צריך להצליח כדי להיות אהוב.',
      en: 'Type 3 is generous, supportive and enthusiastic early on, but may prefer doing over being. It needs space where it does not have to succeed to be loved.',
    },
    work: {
      he: 'מצטיין בתפקידי ניהול, מכירות, יזמות וקידום. אתגר: שותפות אמיתית, כנות לגבי מגבלות, ולא להפוך את העבודה לזהות.',
      en: 'Excels in management, sales, entrepreneurship and promotion. Challenge: real partnership, honesty about limits, and not letting work become identity.',
    },
    wings: {
      '2': { he: 'כנף 2 (3w2): חם, חברתי ומוכוון אנשים. רוצה להצליח ולהיות אהוב, ומשתמש בקסם אישי.', en: 'Wing 2 (3w2): warm, social and people-oriented. Wants to succeed and be liked, using personal charm.' },
      '4': { he: 'כנף 4 (3w4): מופנם, יצירתי ומורכב יותר. הישגים עם ייחודיות, ויותר רגישות לאותנטיות.', en: 'Wing 4 (3w4): more introverted, creative and complex. Achievement with uniqueness, and more sensitivity to authenticity.' },
    },
    tips: {
      he: ['עצור פעם ביום ושאל: "מה אני מרגיש כרגע?"', 'שמור זמן לדברים שאין להם תוצר או קהל', 'שאל מה אתה רוצה, ולא מה יוערך', 'שתף מישהו בכישלון או בספק', 'הבחן בין "אני עושה" לבין "אני"'],
      en: ['Pause once a day and ask: "What am I feeling right now?"', 'Keep time for things with no output or audience', 'Ask what you want, not what will be valued', 'Share a failure or a doubt with someone', 'Tell apart "what I do" from "who I am"'],
    },
    stress: '9', growth: '6',
    stressText: {
      he: 'בלחץ טיפוס 3 נע לכיוון 9: מתנתק, נעשה אפתי ומתעכב, ומתקשה להחליט או לפעול.',
      en: 'Under stress Type 3 moves toward 9: disengaging, becoming apathetic and stalling, finding it hard to decide or act.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 3 נע לכיוון 6: נעשה כן, מחויב ומשתף פעולה, ופועל מתוך ערכים ולא רק מתוך הצלחה.',
      en: 'In growth Type 3 moves toward 6: becoming honest, committed and cooperative, acting from values and not only from success.',
    },
  },
  '4': {
    overview: {
      he: 'טיפוס 4 מונע מתחושה שהוא שונה ומשהו בסיסי חסר לו. הוא חי בעולם רגשי עשיר ועמוק, מחפש אותנטיות ומשמעות, ומרגיש קשר חזק לכאב, ליופי ולערגה. הפחד המרכזי הוא להיות חסר זהות או משמעות, והצורך המרכזי הוא להיות מובן וייחודי באמת.',
      en: 'Type 4 is driven by a sense of being different and missing something basic. It lives in a rich, deep emotional world, seeks authenticity and meaning, and feels strongly connected to pain, beauty and longing. The core fear is having no identity or meaning, and the core need is to be truly understood and unique.',
    },
    daily: {
      he: ['חווה רגשות בעוצמה, גם עדינים', 'מרגיש שמשהו חסר, ומתגעגע למה שאין', 'משווה את עצמו לאחרים ומרגיש "שונה" או "מחוץ"', 'מושך ליופי, אמנות, משמעות ועומק', 'מצבי רוח משתנים, ולעיתים נעלם אל מלנכוליה', 'מתקשה עם שטחיות ועם "שיחות סתם"'],
      en: ['Experiences feelings intensely, even subtle ones', 'Feels something is missing and longs for what is absent', 'Compares itself to others and feels different or outside', 'Drawn to beauty, art, meaning and depth', 'Moods shift, sometimes sinking into melancholy', 'Struggles with superficiality and small talk'],
    },
    strengths: {
      he: ['עומק רגשי ואמפתיה לכאב של אחרים', 'יצירתיות וראייה אסתטית', 'אותנטיות וכנות פנימית', 'יכולת להיות נוכח עם קושי של אחרים', 'רגישות לניואנסים ולמשמעות'],
      en: ['Emotional depth and empathy for others\' pain', 'Creativity and an aesthetic eye', 'Authenticity and inner honesty', 'Ability to be present with others\' difficulty', 'Sensitivity to nuance and meaning'],
    },
    challenges: {
      he: ['היבלעות בתוך הרגש והרהור-יתר', 'קנאה והשוואה עצמית', 'דרמטיות ותחושת "אף אחד לא מבין"', 'ראיית היום-יום כאפור לעומת הדימוי האידיאלי', 'נטייה להתבודד ולדחות מי שקרוב'],
      en: ['Getting absorbed in feeling and rumination', 'Envy and self-comparison', 'Drama and a sense that nobody understands', 'Seeing everyday life as gray next to an ideal image', 'A tendency to withdraw and push away those close'],
    },
    relationships: {
      he: 'טיפוס 4 מחפש קשר עמוק ואמיתי, ומביא עוצמה, נאמנות רגשית ונוכחות. הוא עלול להיות בתנועת "בוא קרוב, לך רחוק": להשתוקק לקרבה ולהרגיש חנוק או לא מובן כשהיא מגיעה. זקוק לבני אדם שיכולים להכיל את הרגש שלו בלי לתקן אותו.',
      en: 'Type 4 seeks deep, real connection and brings intensity, emotional loyalty and presence. It may move in a "come close, go away" pattern: longing for closeness and feeling smothered or misunderstood when it arrives. It needs people who can hold its feelings without trying to fix them.',
    },
    work: {
      he: 'פורח בתחומים יצירתיים, אמנותיים, טיפוליים ומשמעותיים: כתיבה, עיצוב, מוזיקה, ייעוץ. מתקשה עם שגרה משעממת ועם סביבות שטחיות. אתגר: להמשיך גם כשאין השראה, ולא לחכות לרגש הנכון.',
      en: 'Thrives in creative, artistic, therapeutic and meaningful fields: writing, design, music, counseling. Struggles with dull routine and shallow settings. Challenge: continuing when there is no inspiration, and not waiting for the right mood.',
    },
    wings: {
      '3': { he: 'כנף 3 (4w3): חברתי, שאפתן ובולט יותר. מבטא את הייחודיות החוצה, רוצה להצליח ולהיראות, ויותר מוכוון הישג.', en: 'Wing 3 (4w3): more social, ambitious and visible. Expresses uniqueness outward, wants to succeed and be seen, and is more achievement-oriented.' },
      '5': { he: 'כנף 5 (4w5): מופנם, אינטלקטואלי ופרטי יותר. עולם פנימי עשיר, עומק, סקרנות לרעיונות לא שגרתיים, נטייה להתבונן מרחוק ולהתרחק מאנשים.', en: 'Wing 5 (4w5): more introverted, intellectual and private. A rich inner world, depth, curiosity about unconventional ideas, a tendency to observe from afar and withdraw from people.' },
    },
    tips: {
      he: ['שים לב מתי אתה משווה את עצמך, ושאל מה אתה באמת רוצה', 'עשה דברים קטנים ויומיומיים מתוך משמעת, לא מתוך מצב רוח', 'כתוב או צור כדי לבטא רגש, לא כדי להתבסס בו', 'תרגל הכרת תודה על מה שכבר קיים', 'חפש קשר עם מי שמכיל, ואל תתרחק כשהוא קרוב'],
      en: ['Notice when you compare yourself and ask what you actually want', 'Do small daily things from discipline, not mood', 'Write or create to express feeling, not to sink into it', 'Practice gratitude for what already exists', 'Seek contact with those who can hold you, and do not pull away when they are near'],
    },
    stress: '2', growth: '1',
    stressText: {
      he: 'בלחץ טיפוס 4 נע לכיוון 2: נעשה תלותי, מחפש קרבה ואישור בכל מחיר, ומנסה "לקנות" אהבה דרך נתינה או הצמדות.',
      en: 'Under stress Type 4 moves toward 2: becoming dependent, seeking closeness and approval at any cost, and trying to buy love through giving or clinging.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 4 נע לכיוון 1: נעשה ממוקד, ממושמע ועקבי, פועל לפי עקרונות במקום לפי מצב רוח, ומרגיש יציב יותר.',
      en: 'In growth Type 4 moves toward 1: becoming focused, disciplined and consistent, acting on principle instead of mood, and feeling more stable.',
    },
  },
  '5': {
    overview: {
      he: 'טיפוס 5 חש שהמשאבים שלו, מהזמן ועד האנרגיה, מוגבלים, ולכן הוא מגן עליהם ומחזק את עצמו דרך ידע והבנה. הוא מתבונן מהצד, אוסף מידע וצובר מומחיות. מתחת לעצמאות יש חשש להיות מוצף או חסר יכולת.',
      en: 'Type 5 feels its resources, from time to energy, are limited, so it protects them and builds itself through knowledge and understanding. It observes from the side, gathers information and builds expertise. Beneath the independence is a fear of being overwhelmed or incapable.',
    },
    daily: {
      he: ['צריך זמן ומרחב לעצמו כדי להטעין', 'מעדיף להבין לפני שהוא פועל', 'מנתק רגש ממחשבה, ומעבד רגשות מאוחר', 'קמצן עם זמן, אנרגיה ופרטים אישיים', 'חש צורך להתכונן לפני מפגש או משימה'],
      en: ['Needs time and space alone to recharge', 'Prefers to understand before acting', 'Separates feeling from thought and processes feelings later', 'Stingy with time, energy and personal details', 'Feels a need to prepare before an encounter or task'],
    },
    strengths: {
      he: ['חשיבה מעמיקה ואנליטית', 'עצמאות ושקט פנימי', 'מומחיות וסקרנות', 'אובייקטיביות ויכולת להישאר רגוע במשבר', 'מקוריות ויכולת לראות דפוסים'],
      en: ['Deep analytical thinking', 'Independence and inner calm', 'Expertise and curiosity', 'Objectivity and calm in a crisis', 'Originality and pattern-seeing'],
    },
    challenges: {
      he: ['נסיגה והתבודדות', 'ניתוק מרגשות וגוף', 'דחיינות בפעולה עד ש"מוכן"', 'קושי לבקש עזרה או להיות תלוי', 'אבחנה שהעולם דורש יותר ממה שיש לו'],
      en: ['Withdrawal and isolation', 'Disconnection from feelings and body', 'Delaying action until "ready"', 'Difficulty asking for help or being dependent', 'A sense the world demands more than it has'],
    },
    relationships: {
      he: 'טיפוס 5 נאמן, מכבד מרחב ולא פולשני, אך עלול להיראות מרוחק. הוא צריך אנשים שמכבדים את הצורך שלו בבדידות ומאפשרים לו להתקרב בקצב שלו.',
      en: 'Type 5 is loyal, respects space and is not intrusive, but can seem distant. It needs people who respect its need for solitude and let it approach at its own pace.',
    },
    work: {
      he: 'מצטיין במחקר, תכנות, ניתוח, כתיבה וייעוץ מומחה. מעדיף עבודה עצמאית. אתגר: לשתף, לפעול לפני שיש כל המידע, ולהיראות.',
      en: 'Excels in research, programming, analysis, writing and expert consulting. Prefers independent work. Challenge: sharing, acting before all information is in, and being seen.',
    },
    wings: {
      '4': { he: 'כנף 4 (5w4): יצירתי, רגיש ופנימי יותר. עולם פנימי עשיר ונטייה לאמנות, אך גם יותר בדידות והסתגרות.', en: 'Wing 4 (5w4): more creative, sensitive and inward. A rich inner world and a lean toward art, but also more loneliness and withdrawal.' },
      '6': { he: 'כנף 6 (5w6): זהיר, שיטתי ומחויב יותר. חשיבה מעשית, נאמנות למערכות ולאנשים, וחשדנות מסוימת.', en: 'Wing 6 (5w6): more careful, methodical and committed. Practical thinking, loyalty to systems and people, and some suspicion.' },
    },
    tips: {
      he: ['תכנן מפגשים חברתיים קבועים וקצרים', 'נסה לפעול גם עם 70% מהמידע', 'שים לב לתחושות בגוף כמה פעמים ביום', 'שתף מחשבה לא גמורה עם מישהו', 'הכר בכך ששיתוף לא חייב לרוקן אותך'],
      en: ['Plan regular, short social encounters', 'Try acting with 70% of the information', 'Notice body sensations a few times a day', 'Share an unfinished thought with someone', 'Recognize that sharing need not drain you'],
    },
    stress: '7', growth: '8',
    stressText: {
      he: 'בלחץ טיפוס 5 נע לכיוון 7: פיזור, פעילות מהירה ואימפולסיבית, ונסיון לברוח מהחרדה דרך גירויים ורעיונות.',
      en: 'Under stress Type 5 moves toward 7: scattered, fast and impulsive activity, trying to escape anxiety through stimulation and ideas.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 5 נע לכיוון 8: נעשה נוכח, תקיף ופעיל, ומוכן לפעול ולהביע עמדה בביטחון.',
      en: 'In growth Type 5 moves toward 8: becoming present, assertive and active, ready to act and take a stand with confidence.',
    },
  },
  '6': {
    overview: {
      he: 'טיפוס 6 מחפש ביטחון, ובודק כל הזמן מה עלול להשתבש ובמי אפשר לסמוך. הוא נאמן, אחראי ומודע לסיכונים, ובו בזמן נושא בתוכו ספק וחרדה. חלקו נטייה לציית לסמכות וחלקו לערער עליה.',
      en: 'Type 6 seeks security and constantly checks what might go wrong and whom to trust. It is loyal, responsible and risk-aware, while carrying doubt and anxiety. Part of it leans to obey authority and part to challenge it.',
    },
    daily: {
      he: ['חושב "ומה אם?" ומדמיין תרחישים', 'בודק ושואל כדי להרגיש בטוח', 'נאמן מאוד לאנשים ולקבוצות שבהם הוא בוטח', 'מתלבט בין אמון לחשד', 'חש חרדה או מתח לפני החלטות'],
      en: ['Thinks "what if?" and imagines scenarios', 'Checks and asks in order to feel safe', 'Very loyal to people and groups it trusts', 'Torn between trust and suspicion', 'Feels anxiety or tension before decisions'],
    },
    strengths: {
      he: ['נאמנות ואחריות', 'יכולת לצפות בעיות ולהתכונן', 'אומץ מול סכנה אמיתית', 'עבודת צוות ושיתוף פעולה', 'הומור ואכפתיות כלפי הקרובים'],
      en: ['Loyalty and responsibility', 'Ability to foresee problems and prepare', 'Courage in the face of real danger', 'Teamwork and cooperation', 'Humor and care toward those close'],
    },
    challenges: {
      he: ['חרדה וחשיבת תרחישי אסון', 'קושי לסמוך על שיפוט פנימי', 'ספק עצמי והתלבטויות', 'חשדנות כלפי מניעים', 'תלות בסמכות או מרד בה'],
      en: ['Anxiety and worst-case thinking', 'Difficulty trusting inner judgment', 'Self-doubt and indecision', 'Suspicion of motives', 'Dependence on authority or rebellion against it'],
    },
    relationships: {
      he: 'טיפוס 6 הוא חבר ובן זוג נאמן ויציב, אבל נוטה לבדוק ולבחון. הוא זקוק לעקביות, לכנות ולאישור חוזר שהקשר בטוח.',
      en: 'Type 6 is a loyal, steady friend and partner, but tends to test and probe. It needs consistency, honesty and repeated reassurance that the bond is safe.',
    },
    work: {
      he: 'מצטיין בתפקידי ניהול סיכונים, ביטחון, בקרה, משפטים וצוותים. אתגר: לקבל החלטות, לפעול תחת אי ודאות, ולא לדחות מפחד טעות.',
      en: 'Excels in risk management, security, controls, law and team roles. Challenge: making decisions, acting under uncertainty, and not delaying from fear of error.',
    },
    wings: {
      '5': { he: 'כנף 5 (6w5): אנליטי, מופנם ועצמאי יותר. נשען על ידע והבנה כדי להרגיש בטוח.', en: 'Wing 5 (6w5): more analytical, introverted and independent. Leans on knowledge and understanding to feel safe.' },
      '7': { he: 'כנף 7 (6w7): חברתי, שנון ומשחקי יותר. מתמודד עם חרדה דרך הומור, קשרים ופעילות.', en: 'Wing 7 (6w7): more social, witty and playful. Copes with anxiety through humor, connection and activity.' },
    },
    tips: {
      he: ['כתוב את החשש, ואז כתוב מה באמת קרה בעבר במקרים דומים', 'קבל החלטה קטנה מבלי להתייעץ', 'שים לב להבדל בין סיכון אמיתי לחרדה', 'התחבר לגוף: נשימה, תנועה, הליכה', 'זכור פעמים שבהן הסתדרת'],
      en: ['Write the worry, then write what actually happened in similar cases', 'Make one small decision without consulting', 'Notice the difference between real risk and anxiety', 'Connect to the body: breath, movement, walking', 'Remember times you managed'],
    },
    stress: '3', growth: '9',
    stressText: {
      he: 'בלחץ טיפוס 6 נע לכיוון 3: עבודה כפייתית, חשש לתדמית, ורצון להוכיח יכולת.',
      en: 'Under stress Type 6 moves toward 3: compulsive work, concern with image, and a wish to prove competence.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 6 נע לכיוון 9: רגוע, בוטח, פתוח, ומרגיש שאפשר להניח את הכוננות.',
      en: 'In growth Type 6 moves toward 9: calm, trusting, open, feeling it can put down the vigilance.',
    },
  },
  '7': {
    overview: {
      he: 'טיפוס 7 נמשך לאפשרויות, לחוויות ולרעיונות, ומנסה לשמור על החיים קלים וטובים. הוא אופטימי, מהיר וסקרן, ומתחת לשמחה יש נטייה להתרחק מכאב, מחסור ומשעמום.',
      en: 'Type 7 is drawn to possibilities, experiences and ideas, and tries to keep life light and good. It is optimistic, quick and curious, and beneath the joy is a tendency to move away from pain, lack and boredom.',
    },
    daily: {
      he: ['תמיד יש כמה תוכניות ורעיונות', 'מסתכל על הצד החיובי ומתקן מבט', 'מתקשה להישאר עם רגש קשה', 'חושש לפספס ולהיות מוגבל', 'עובר מהר מדבר לדבר'],
      en: ['Always has several plans and ideas', 'Looks on the bright side and reframes', 'Finds it hard to stay with a difficult feeling', 'Fears missing out and being limited', 'Moves quickly from one thing to another'],
    },
    strengths: {
      he: ['אופטימיות ושמחת חיים', 'סקרנות וחשיבה יצירתית', 'גמישות והסתגלות', 'יכולת להלהיב ולהדביק באנרגיה', 'חוסן ויכולת לראות אפשרויות'],
      en: ['Optimism and joy of life', 'Curiosity and creative thinking', 'Flexibility and adaptability', 'Ability to excite and spread energy', 'Resilience and seeing possibilities'],
    },
    challenges: {
      he: ['בריחה מכאב דרך תוכניות וגירויים', 'פיזור וקושי להשלים דברים', 'חוסר סבלנות לשעמום ולמחויבות', 'שטחיות רגשית', 'קושי להישאר עם אי נוחות'],
      en: ['Escaping pain through plans and stimulation', 'Scatteredness and difficulty finishing things', 'Impatience with boredom and commitment', 'Emotional shallowness', 'Difficulty staying with discomfort'],
    },
    relationships: {
      he: 'טיפוס 7 חבר מהנה, נדיב ומלא חיים. האתגר הוא להישאר גם כשהקשר דורש עומק, כאב או התחייבות.',
      en: 'Type 7 is a fun, generous and lively friend. The challenge is staying when the bond asks for depth, pain or commitment.',
    },
    work: {
      he: 'מצטיין בתפקידים יצירתיים, יזמיים, שיווק, הדרכה וחדשנות. אתגר: להשלים, להתמיד בשגרה ולהישאר עם פרטים.',
      en: 'Excels in creative, entrepreneurial, marketing, training and innovation roles. Challenge: finishing, persisting in routine and staying with details.',
    },
    wings: {
      '6': { he: 'כנף 6 (7w6): אחראי, נאמן וחברתי יותר, אבל גם חרד יותר. קשרים והומור כמקור ביטחון.', en: 'Wing 6 (7w6): more responsible, loyal and social, but also more anxious. Bonds and humor as a source of safety.' },
      '8': { he: 'כנף 8 (7w8): תקיף, שאפתן ואנרגטי יותר. רוצה חופש ושליטה, ופחות סבלנות לעיכובים.', en: 'Wing 8 (7w8): more assertive, ambitious and energetic. Wants freedom and control, with less patience for delay.' },
    },
    tips: {
      he: ['שב עם רגש לא נעים דקה אחת לפני שאתה זז הלאה', 'סיים דבר אחד לפני שאתה פותח חדש', 'בחר עומק במקום עוד אפשרות', 'שאל: "ממה אני בורח עכשיו?"', 'תרגל הכרת תודה על מה שכבר יש'],
      en: ['Sit with an unpleasant feeling for a minute before moving on', 'Finish one thing before opening a new one', 'Choose depth over another option', 'Ask: "What am I escaping right now?"', 'Practice gratitude for what is already here'],
    },
    stress: '1', growth: '5',
    stressText: {
      he: 'בלחץ טיפוס 7 נע לכיוון 1: ביקורתי, נוקשה ומתוח, ודורש מעצמו ומאחרים שלמות.',
      en: 'Under stress Type 7 moves toward 1: critical, rigid and tense, demanding perfection of itself and others.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 7 נע לכיוון 5: עמוק, ממוקד ושקט, מתמקד ברעיון אחד ומעמיק בו.',
      en: 'In growth Type 7 moves toward 5: deep, focused and quiet, concentrating on one idea and going deeper into it.',
    },
  },
  '8': {
    overview: {
      he: 'טיפוס 8 חזק, ישיר ומגן. הוא רוצה לשלוט בגורלו ולא להיות נשלט, ומראה כוח כדי להגן על עצמו ועל אלה שהוא אוהב. מתחת לשריון יש פגיעות שהוא נותן לה לגעת רק לעיתים נדירות.',
      en: 'Type 8 is strong, direct and protective. It wants to control its fate and not be controlled, and shows strength to protect itself and those it loves. Beneath the armor is vulnerability that it lets surface only rarely.',
    },
    daily: {
      he: ['אומר מה שהוא חושב בישירות', 'לוקח פיקוד באופן טבעי', 'מגיב בעוצמה לעוול או לשליטה', 'חש תחושת עוצמה, ורוצה לחוות חיים במלואם', 'מתקשה להראות חולשה'],
      en: ['Says what it thinks directly', 'Takes charge naturally', 'Reacts strongly to injustice or control', 'Feels a sense of power and wants to experience life fully', 'Finds it hard to show weakness'],
    },
    strengths: {
      he: ['עוצמה ואומץ', 'הגנה על חלשים והגינות', 'החלטיות ויכולת להוביל', 'ישירות וכנות', 'נדיבות כלפי הקרובים'],
      en: ['Strength and courage', 'Protecting the weak and fairness', 'Decisiveness and leadership', 'Directness and honesty', 'Generosity toward those close'],
    },
    challenges: {
      he: ['שליטה ותוקפנות', 'קושי להראות פגיעות', 'חוסר סבלנות ופסילת אחרים', 'עוצמה מוגזמת שמרתיעה', 'קושי לסמוך'],
      en: ['Control and aggression', 'Difficulty showing vulnerability', 'Impatience and dismissing others', 'Excess intensity that intimidates', 'Difficulty trusting'],
    },
    relationships: {
      he: 'טיפוס 8 נאמן ומגן, ומעריך כנות ועמידה על דעתך. הוא זקוק למי שלא מפחד ממנו, ומאפשר לו להיות רך.',
      en: 'Type 8 is loyal and protective and values honesty and holding your ground. It needs someone who is not afraid of it and lets it be soft.',
    },
    work: {
      he: 'מצטיין בניהול, יזמות ומנהיגות. אתגר: להקשיב, להאציל, ולהבין שעוצמה אינה זהה לשליטה.',
      en: 'Excels in management, entrepreneurship and leadership. Challenge: listening, delegating, and understanding that strength is not the same as control.',
    },
    wings: {
      '7': { he: 'כנף 7 (8w7): חברתי, אנרגטי ושאפתן יותר, אוהב הנאה ולא מסתתר.', en: 'Wing 7 (8w7): more social, energetic and ambitious, loves pleasure and does not hide.' },
      '9': { he: 'כנף 9 (8w9): רגוע, יציב ושקט יותר, כוח שקט שמגן ולא תוקף.', en: 'Wing 9 (8w9): calmer, steadier and quieter, a quiet power that protects rather than attacks.' },
    },
    tips: {
      he: ['שים לב לפני שאתה מגיב: מה אני מגן עליו כרגע?', 'הראה פגיעות במישהו אחד שאתה סומך עליו', 'הקשב עד הסוף לפני שאתה מגיב', 'שאל אחרים מה הם צריכים ממך', 'זכור שרכות היא חלק מהכוח'],
      en: ['Pause before reacting: what am I protecting right now?', 'Show vulnerability to one person you trust', 'Listen to the end before responding', 'Ask others what they need from you', 'Remember that softness is part of strength'],
    },
    stress: '5', growth: '2',
    stressText: {
      he: 'בלחץ טיפוס 8 נע לכיוון 5: מתכנס, מתנתק ומסתגר, ומתרחק מאנשים כדי להתאושש.',
      en: 'Under stress Type 8 moves toward 5: retreating, disconnecting and withdrawing from people to recover.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 8 נע לכיוון 2: נעשה חם, אכפתי ופתוח, ונותן מתוך לב ולא מתוך כוח.',
      en: 'In growth Type 8 moves toward 2: becoming warm, caring and open, giving from the heart and not from power.',
    },
  },
  '9': {
    overview: {
      he: 'טיפוס 9 רוצה שלום ושלווה. הוא רואה את כל הצדדים, מתאים את עצמו לסביבה ומקרין שקט. מתחת לנוחות יש נטייה למחוק את הרצונות והכעס של עצמו כדי לשמור על הרמוניה.',
      en: 'Type 9 wants peace and calm. It sees all sides, adapts to its surroundings and radiates stillness. Beneath the ease is a tendency to erase its own wants and anger in order to keep harmony.',
    },
    daily: {
      he: ['רואה את נקודת המבט של כולם', 'מתקשה לדעת מה הוא עצמו רוצה', 'נמנע מעימות ודוחה החלטות', 'מתרכז בדברים משניים כדי להימנע מהעיקר', 'יציב ורגוע, ולפעמים עקשן בשקט'],
      en: ['Sees everyone\'s point of view', 'Finds it hard to know what it itself wants', 'Avoids conflict and postpones decisions', 'Busies itself with secondary things to avoid the main one', 'Steady and calm, sometimes quietly stubborn'],
    },
    strengths: {
      he: ['קבלה וסבלנות', 'יכולת לגשר ולתווך', 'יציבות ושקט', 'נוכחות מרגיעה', 'פתיחות לעמדות שונות'],
      en: ['Acceptance and patience', 'Ability to bridge and mediate', 'Stability and calm', 'A soothing presence', 'Openness to differing views'],
    },
    challenges: {
      he: ['מחיקה עצמית והתאמה יתר', 'הימנעות מעימות', 'דחיינות ופסיביות', 'כעס סמוי ועקשנות פסיבית', 'קושי להתחיל ולהחליט'],
      en: ['Self-erasure and over-adapting', 'Avoiding conflict', 'Procrastination and passivity', 'Hidden anger and passive stubbornness', 'Difficulty starting and deciding'],
    },
    relationships: {
      he: 'טיפוס 9 חבר ובן זוג נינוח, מקבל ונאמן. האתגר: להשמיע רצון וכעס, ולא להיעלם בתוך הקשר.',
      en: 'Type 9 is a relaxed, accepting and loyal friend and partner. The challenge: voicing want and anger, and not disappearing inside the relationship.',
    },
    work: {
      he: 'מצטיין בתיווך, ייעוץ, צוותים ועבודה יציבה. אתגר: לקבוע סדרי עדיפויות, לקחת מקום ולהחליט.',
      en: 'Excels in mediation, counseling, teams and steady work. Challenge: setting priorities, taking space and deciding.',
    },
    wings: {
      '8': { he: 'כנף 8 (9w8): תקיף ועצמאי יותר, עם כוח שקט ויכולת להתעמת כשצריך.', en: 'Wing 8 (9w8): more assertive and independent, with quiet power and ability to confront when needed.' },
      '1': { he: 'כנף 1 (9w1): מסודר, עקרוני ושיפוטי יותר, עם צורך בסדר פנימי.', en: 'Wing 1 (9w1): more orderly, principled and judgmental, with a need for inner order.' },
    },
    tips: {
      he: ['שאל בכל בוקר: "מה אני רוצה היום?"', 'אמור דעה קטנה לפני שאתה מתאים אותה', 'התחל קודם את המשימה החשובה', 'שים לב לכעס קטן לפני שהוא נבלע', 'קבע תנועה גופנית קבועה'],
      en: ['Ask each morning: "What do I want today?"', 'State a small opinion before adjusting it', 'Start the important task first', 'Notice small anger before it is swallowed', 'Set a regular physical movement'],
    },
    stress: '6', growth: '3',
    stressText: {
      he: 'בלחץ טיפוס 9 נע לכיוון 6: חרדתי, חשדן ומתלבט, וחושש ממה שעלול להשתבש.',
      en: 'Under stress Type 9 moves toward 6: anxious, suspicious and indecisive, fearing what might go wrong.',
    },
    growthText: {
      he: 'בצמיחה טיפוס 9 נע לכיוון 3: נעשה ממוקד, פעיל ופועל למען מטרות שלו.',
      en: 'In growth Type 9 moves toward 3: becoming focused, active and working toward its own goals.',
    },
  },
};
