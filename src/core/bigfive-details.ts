import type { L } from './astro';

/** תיאור מורחב לכל אחת מחמש התכונות. משמש את מסך התוצאה. */
export type BfBand = 'low' | 'mid' | 'high';

export interface BfBandText { life: L; work: L; love: L }

export interface BfDetail {
  facets: { he: string[]; en: string[] };
  bands: Record<BfBand, BfBandText>;
  tips: Record<BfBand, { he: string[]; en: string[] }>;
}

export function bfBand(score: number): BfBand {
  return score >= 67 ? 'high' : score >= 40 ? 'mid' : 'low';
}

export const BF_DETAILS: Record<'O' | 'C' | 'E' | 'A' | 'N', BfDetail> = {
  O: {
    facets: {
      he: ['דמיון', 'עניין באמנות ויופי', 'פתיחות לרגשות', 'סקרנות לחוויות חדשות', 'סקרנות אינטלקטואלית', 'פתיחות לערכים וגישות שונות'],
      en: ['Imagination', 'Interest in art and beauty', 'Openness to feelings', 'Curiosity about new experiences', 'Intellectual curiosity', 'Openness to different values and views'],
    },
    bands: {
      high: {
        life: { he: 'אתה נמשך לחידוש, לרעיונות ולחוויות לא מוכרות. נוח לך עם מורכבות ועם שאלות פתוחות, ויש לך עולם פנימי עשיר.', en: 'You are drawn to novelty, ideas and unfamiliar experience. You are comfortable with complexity and open questions, and have a rich inner world.' },
        work: { he: 'מתאים לתחומים יצירתיים, מחקר, חדשנות ופתרון בעיות בדרכים לא שגרתיות. עלול להשתעמם מתפקידים חוזרים.', en: 'Suited to creative fields, research, innovation and unconventional problem solving. May get bored in repetitive roles.' },
        love: { he: 'מעריך בן זוג שמעניין, סקרן ופתוח לשיחה. יכול להיות מתוסכל מקשר צפוי מדי.', en: 'Values an interesting, curious partner open to conversation. May be frustrated by an overly predictable relationship.' },
      },
      mid: {
        life: { he: 'אתה מאזן בין החדש למוכר. פתוח לרעיונות כשיש להם תכלית, ומעריך גם יציבות.', en: 'You balance the new with the familiar. Open to ideas when they have a purpose, and you value stability too.' },
        work: { he: 'מתאים לתפקידים שמשלבים חדשנות ויישום מעשי. גמיש יחסית בין עבודה שגרתית ליצירתית.', en: 'Suited to roles combining innovation and practical application. Relatively flexible between routine and creative work.' },
        love: { he: 'נוח לך עם בן זוג דומה או שונה, כל עוד יש כבוד הדדי. נהנה מחוויות חדשות במידה.', en: 'You are comfortable with a similar or different partner as long as there is mutual respect. You enjoy new experiences in moderation.' },
      },
      low: {
        life: { he: 'אתה מעדיף את המוכר, המעשי והמוכח. אתה יציב וקרקעי, ופחות מושך לתיאוריה או לניסוי.', en: 'You prefer the familiar, practical and proven. You are steady and grounded, less drawn to theory or experiment.' },
        work: { he: 'מתאים לתפקידים עם מבנה ברור, שיטות מוכחות ותוצאות מעשיות. עלול להתקשות בסביבה שמשתנה מהר.', en: 'Suited to roles with clear structure, proven methods and practical results. May struggle in fast-changing environments.' },
        love: { he: 'מעריך יציבות, שגרה ואמינות. עלול להתקשות עם בן זוג שמחפש ריגוש וחידוש תמידי.', en: 'Values stability, routine and reliability. May struggle with a partner who seeks constant thrill and novelty.' },
      },
    },
    tips: {
      high: { he: ['בחר רעיון אחד והשלם אותו', 'בנה שגרה שתחזיק את היצירתיות', 'בדוק את הרעיונות מול מציאות'], en: ['Pick one idea and complete it', 'Build a routine to carry the creativity', 'Test ideas against reality'] },
      mid: { he: ['נסה דבר חדש אחד בחודש', 'שים לב מתי אתה נצמד למוכר מנוחות בלבד'], en: ['Try one new thing a month', 'Notice when you cling to the familiar only for comfort'] },
      low: { he: ['הכר בתועלת של הלא מוכר בקטן: ספר, מסלול, תחום', 'שאל "למה לא?" לפני שאתה דוחה', 'שמור על היתרון שלך: אמינות ויישום'], en: ['Meet the unfamiliar in small doses: a book, a route, a field', 'Ask "why not?" before rejecting', 'Keep your strength: reliability and execution'] },
    },
  },
  C: {
    facets: {
      he: ['מסוגלות עצמית', 'סדר', 'חובה ומצפון', 'שאיפה להישגים', 'משמעת עצמית', 'שיקול דעת וזהירות'],
      en: ['Self-efficacy', 'Orderliness', 'Dutifulness', 'Achievement striving', 'Self-discipline', 'Cautiousness'],
    },
    bands: {
      high: {
        life: { he: 'אתה מתכנן, מארגן ומתמיד. דברים נעשים אצלך עד הסוף, ואחרים סומכים עליך.', en: 'You plan, organize and persist. Things get finished with you, and others rely on you.' },
        work: { he: 'מצטיין בתפקידים שדורשים אחריות, דיוק והתמדה. הסיכון: פרפקציוניזם, עבודת יתר וקושי להאציל.', en: 'Excels in roles requiring responsibility, accuracy and persistence. Risk: perfectionism, overwork and difficulty delegating.' },
        love: { he: 'אמין ומחויב בקשר. עלול להיות מצפה ונוקשה כלפי בן הזוג, ולהקשות על ספונטניות.', en: 'Reliable and committed in a relationship. May be demanding and rigid toward a partner, and make spontaneity harder.' },
      },
      mid: {
        life: { he: 'אתה מאזן בין תכנון לגמישות. יודע להתאמץ כשצריך וגם להרפות.', en: 'You balance planning and flexibility. You know how to push when needed and also let go.' },
        work: { he: 'מתאים למגוון תפקידים. כדאי לבנות מבנה ברור במשימות ארוכות כדי לשמור על התמדה.', en: 'Suited to a range of roles. Worth building clear structure in long tasks to keep persistence.' },
        love: { he: 'נוח לך עם שילוב של תכנון וספונטניות, ומתאים לבני זוג משני הסגנונות.', en: 'You are comfortable mixing planning and spontaneity, and suit partners of either style.' },
      },
      low: {
        life: { he: 'אתה ספונטני, גמיש וזורם. פחות נצמד לתוכניות ולרשימות, ונהנה מחופש.', en: 'You are spontaneous, flexible and flowing. Less attached to plans and lists, and enjoying freedom.' },
        work: { he: 'מתאים לסביבות גמישות, יצירתיות ודינמיות. עלול להתקשות עם דדליינים, פרטים והתמדה במשימות משעממות.', en: 'Suited to flexible, creative and dynamic environments. May struggle with deadlines, details and persisting in dull tasks.' },
        love: { he: 'ספונטני ומהנה, אך עלול לאכזב בהתחייבויות קטנות. מועיל להסכים על מבנה בסיסי.', en: 'Spontaneous and fun, but may let down on small commitments. Helpful to agree on basic structure.' },
      },
    },
    tips: {
      high: { he: ['תכנן זמן ריק בלי תוצר', 'הבחן בין "טוב מספיק" למושלם', 'האצל משימה אחת בשבוע'], en: ['Schedule empty time with no output', 'Tell "good enough" from perfect', 'Delegate one task a week'] },
      mid: { he: ['בחר שגרה אחת קבועה ושמור עליה', 'שמור גמישות במה שלא קריטי'], en: ['Pick one fixed routine and keep it', 'Stay flexible where it is not critical'] },
      low: { he: ['השתמש ברשימה אחת קצרה ליום', 'חלק משימות גדולות לשלבים עם מועדים', 'בקש מחבר שיעזור לך לעמוד ביעד'], en: ['Use one short list a day', 'Split big tasks into stages with dates', 'Ask a friend to help you meet a target'] },
    },
  },
  E: {
    facets: {
      he: ['חמימות', 'חברותיות', 'אסרטיביות', 'רמת פעילות', 'חיפוש גירוי', 'רגשות חיוביים'],
      en: ['Warmth', 'Gregariousness', 'Assertiveness', 'Activity level', 'Excitement seeking', 'Positive emotions'],
    },
    bands: {
      high: {
        life: { he: 'אתה מקבל אנרגיה מאנשים ומפעילות. אתה חברותי, מדבר בקלות ומרגיש בנוח במרכז העניינים.', en: 'You gain energy from people and activity. You are sociable, talk easily and feel at ease at the center.' },
        work: { he: 'מתאים לתפקידים עם אנשים, מכירות, הנחיה וניהול. עלול להתקשות בעבודה לבד לאורך זמן.', en: 'Suited to roles with people, sales, facilitation and management. May struggle with long solitary work.' },
        love: { he: 'חם, נוכח ומביא אנרגיה. עלול לצפות מבן הזוג ליותר חברתיות ממה שנוח לו.', en: 'Warm, present and energetic. May expect more sociability from a partner than is comfortable for them.' },
      },
      mid: {
        life: { he: 'אתה "אמביוורט": נהנה מחברה וגם מבדידות. אפשר להסתגל לשני העולמות.', en: 'You are an ambivert: enjoying company and solitude alike, able to adapt to both worlds.' },
        work: { he: 'גמיש בין עבודת צוות לעבודה עצמאית. כדאי להכיר מתי אתה זקוק לאחד מהם.', en: 'Flexible between teamwork and independent work. Worth knowing when you need each.' },
        love: { he: 'מתאים לבני זוג בשני הסגנונות, כל עוד יש איזון בין זמן משותף לזמן לבד.', en: 'Suits partners of either style as long as time together and apart is balanced.' },
      },
      low: {
        life: { he: 'אתה מופנם: אנרגיה משקט, מקשרים מעטים ועמוקים ומזמן עם עצמך. זה לא ביישנות, אלא העדפה.', en: 'You are introverted: energy from quiet, a few deep bonds and time to yourself. This is not shyness but preference.' },
        work: { he: 'מתאים לעבודה שקטה ומרוכזת, כתיבה, מחקר ותפקידים עצמאיים. מתעייף מישיבות וממפגשים ארוכים.', en: 'Suited to quiet focused work, writing, research and independent roles. Tires from long meetings and gatherings.' },
        love: { he: 'נאמן ועמוק, וצריך זמן להתאושש. כדאי להסביר לבן הזוג שהנסיגה אינה דחייה.', en: 'Loyal and deep, and needs time to recover. Worth explaining to a partner that withdrawal is not rejection.' },
      },
    },
    tips: {
      high: { he: ['הקשב יותר ממה שאתה מדבר באחת השיחות היום', 'תן לעצמך שקט כדי לעבד', 'שים לב להתלהבות שמשתיקה אחרים'], en: ['Listen more than you talk in one conversation today', 'Give yourself quiet to process', 'Notice enthusiasm that silences others'] },
      mid: { he: ['הכר את הסימנים שאתה זקוק לאחד מהקצוות', 'תכנן שבוע עם איזון'], en: ['Know the signs you need one end or the other', 'Plan a balanced week'] },
      low: { he: ['תכנן זמן התאוששות אחרי אירועים', 'התחל בשיחה אחת קטנה ביום', 'אמור לאחרים מראש מה אתה צריך'], en: ['Plan recovery time after events', 'Start with one small conversation a day', 'Tell others in advance what you need'] },
    },
  },
  A: {
    facets: {
      he: ['אמון', 'כנות', 'אלטרואיזם', 'ציות ושיתוף פעולה', 'ענווה', 'רכות לב'],
      en: ['Trust', 'Straightforwardness', 'Altruism', 'Compliance', 'Modesty', 'Tender-mindedness'],
    },
    bands: {
      high: {
        life: { he: 'אתה חם, אמפתי ונוטה לאמון. אכפת לך מאחרים ואתה מעדיף שיתוף פעולה על פני ויכוח.', en: 'You are warm, empathic and trusting. You care about others and prefer cooperation over argument.' },
        work: { he: 'מצטיין בצוותים, בשירות, בחינוך ובטיפול. עלול להתקשות במשא ומתן, בהצבת גבולות ובמתן משוב קשה.', en: 'Excels in teams, service, education and care. May struggle with negotiation, setting boundaries and giving hard feedback.' },
        love: { he: 'נדיב ומכבד. הסיכון: לוותר על עצמך, או לספוג יותר מדי.', en: 'Generous and respectful. Risk: giving yourself up, or absorbing too much.' },
      },
      mid: {
        life: { he: 'אתה מאזן בין חום לביקורת. שיתוף פעולה כשצריך ועמידה על שלך כשחשוב.', en: 'You balance warmth and criticism. Cooperating when needed and holding your ground when it matters.' },
        work: { he: 'מתאים לרוב התפקידים. כדאי לשים לב אם אתה נוטה לוותר או להתעמת בלחץ.', en: 'Suited to most roles. Worth noticing whether you tend to give in or confront under pressure.' },
        love: { he: 'מסוגל גם לחום וגם להתעמת באופן בריא, ומתאים לקשרים מאוזנים.', en: 'Capable of warmth and healthy confrontation, suited to balanced relationships.' },
      },
      low: {
        life: { he: 'אתה ישיר, ספקן ותחרותי. אתה אומר מה שאתה חושב ולא נרתע מעימות כשצריך.', en: 'You are direct, skeptical and competitive. You say what you think and do not shy from conflict when needed.' },
        work: { he: 'מתאים למשא ומתן, ביקורת, ניתוח ותפקידים שדורשים עמידה על עמדה. עלול להיתפס כקר או תוקפני.', en: 'Suited to negotiation, critique, analysis and roles requiring a firm stand. May be perceived as cold or aggressive.' },
        love: { he: 'כן וישיר. כדאי לרכך ניסוח ולהראות הערכה, כי הכוונה טובה אבל ההשפעה חדה.', en: 'Honest and direct. Worth softening phrasing and showing appreciation, since intent is good but impact sharp.' },
      },
    },
    tips: {
      high: { he: ['תרגל לומר "לא" בנימוס', 'בדוק אם אתה עוזר מתוך בחירה או מתוך פחד לאכזב', 'דבר על צרכים בקול'], en: ['Practice saying a polite "no"', 'Check whether you help by choice or from fear of disappointing', 'Name your needs aloud'] },
      mid: { he: ['שים לב להבדל בין הסכמה לשלום לבין הסכמה אמיתית'], en: ['Notice the difference between agreeing for peace and truly agreeing'] },
      low: { he: ['שאל "איך זה נשמע?" לפני שאתה שולח', 'הוסף הכרה לפני ביקורת', 'תן ליתרון של אחרים להיות גלוי'], en: ['Ask "how does this sound?" before sending', 'Add acknowledgment before criticism', 'Let others\' strengths be visible'] },
    },
  },
  N: {
    facets: {
      he: ['חרדה', 'כעס', 'דיכאון', 'מודעות עצמית', 'דחפים', 'פגיעות ללחץ'],
      en: ['Anxiety', 'Anger', 'Depression', 'Self-consciousness', 'Impulsiveness', 'Vulnerability to stress'],
    },
    bands: {
      high: {
        life: { he: 'ציון גבוה ביציבות רגשית: אתה נשאר רגוע תחת לחץ, מתאושש מהר ופחות נסחף למצבי רוח.', en: 'A high emotional-stability score: you stay calm under pressure, recover fast and are less swept by moods.' },
        work: { he: 'מתאים לתפקידים תחת לחץ, משברים וקבלת החלטות. הסיכון: אי הבנה למי שמרגיש מוצף, או התעלמות מאותות מוקדמים.', en: 'Suited to high-pressure roles, crises and decision-making. Risk: not understanding those who feel overwhelmed, or ignoring early signals.' },
        love: { he: 'יציב ורגוע, מהווה עוגן. כדאי לשים לב לצורך של בן הזוג בתמיכה רגשית ולא רק בפתרונות.', en: 'Steady and calm, an anchor. Worth noticing a partner\'s need for emotional support, not only solutions.' },
      },
      mid: {
        life: { he: 'אתה חווה מתח ודאגה כמו רוב האנשים, ומתאושש בקצב ממוצע. יש ימים טובים ויש קשים.', en: 'You feel tension and worry like most people and recover at an average pace. Some days are good and some are hard.' },
        work: { he: 'מתאים לרוב הסביבות. כדאי לזהות מה מעורר אצלך לחץ ולבנות שיגרות הרגעה.', en: 'Suited to most environments. Worth identifying what triggers stress and building calming routines.' },
        love: { he: 'מגיב ללחץ ביחסים כמו רוב האנשים. תקשורת פתוחה עוזרת למנוע הצטברות.', en: 'Reacts to relationship stress like most people. Open communication prevents accumulation.' },
      },
      low: {
        life: { he: 'ציון נמוך ביציבות רגשית: אתה רגיש לרגש וללחץ, חווה דאגה ומצבי רוח בעוצמה, ונמשך להרהר.', en: 'A low emotional-stability score: you are sensitive to emotion and stress, experiencing worry and moods strongly, and prone to rumination.' },
        work: { he: 'מתאים לסביבה תומכת, עם מבנה ובהירות. הרגישות יכולה להיות יתרון בזיהוי סיכונים ואנשים.', en: 'Suited to a supportive setting with structure and clarity. Sensitivity can be an advantage in spotting risks and people.' },
        love: { he: 'עמוק ורגיש, אך עלול להגיב בעוצמה לשינויים קטנים. בן זוג מרגיע ותקשורת בהירה עוזרים.', en: 'Deep and sensitive, but may react strongly to small changes. A calming partner and clear communication help.' },
      },
    },
    tips: {
      high: { he: ['שאל אחרים מה הם מרגישים, אל תניח', 'שים לב ללחץ גופני לפני שהוא מתפרץ'], en: ['Ask others what they feel, do not assume', 'Notice bodily tension before it surfaces'] },
      mid: { he: ['בנה הרגל הרגעה קבוע: נשימה, הליכה, שינה', 'זהה שלושה גורמי לחץ ושמור עליהם'], en: ['Build a regular calming habit: breath, walking, sleep', 'Identify three stressors and keep an eye on them'] },
      low: { he: ['כתוב את המחשבה המטרידה ובדוק מה באמת קרה בעבר', 'שמור על שינה, תנועה ומבנה יומי', 'פנה לתמיכה מקצועית אם הדאגה מפריעה לחיים'], en: ['Write the troubling thought and check what actually happened before', 'Keep sleep, movement and daily structure', 'Seek professional support if worry interferes with life'] },
    },
  },
};
