/**
 * psychology-assessments.ts
 * 🧠 שלוש מודלים פסיכולוגיים מודרניים:
 * MBTI / Enneagram / Big Five
 */

/**
 * ====================================
 * 1️⃣ MBTI - MYERS-BRIGGS TYPE INDICATOR
 * ====================================
 * 4 dimensions × 2 options = 16 types
 */

export interface MBTIQuestion {
  id: string;
  he: string;
  en: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  pole: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  scale: number; // 1-5 or 1-7
}

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  // Extraversion-Introversion (EI)
  {
    id: 'mbti_ei_1',
    he: 'אני מרגיש אנרגיה כשאני עם אנשים חדשים',
    en: 'I feel energized when meeting new people',
    dimension: 'EI',
    pole: 'E',
    scale: 5
  },
  {
    id: 'mbti_ei_2',
    he: 'אני צריך זמן לבד כדי להטען את הסוללה שלי',
    en: 'I need alone time to recharge my energy',
    dimension: 'EI',
    pole: 'I',
    scale: 5
  },
  {
    id: 'mbti_ei_3',
    he: 'אני אוהב להיות במרכז של קבוצה',
    en: 'I enjoy being the center of a group',
    dimension: 'EI',
    pole: 'E',
    scale: 5
  },
  {
    id: 'mbti_ei_4',
    he: 'אני מעדיף שיחות עמוקות אחד על אחד',
    en: 'I prefer deep one-on-one conversations',
    dimension: 'EI',
    pole: 'I',
    scale: 5
  },
  {
    id: 'mbti_ei_5',
    he: 'אני נוהג לדבר קודם לחשיבה',
    en: 'I tend to speak first and think later',
    dimension: 'EI',
    pole: 'E',
    scale: 5
  },
  {
    id: 'mbti_ei_6',
    he: 'אני בדרך כלל שקט וקשוב בקבוצה',
    en: 'I am usually quiet and observant in groups',
    dimension: 'EI',
    pole: 'I',
    scale: 5
  },

  // Sensing-Intuition (SN)
  {
    id: 'mbti_sn_1',
    he: 'אני מעדיף לעבוד עם עובדות ופרטים ממשיים',
    en: 'I prefer working with concrete facts and details',
    dimension: 'SN',
    pole: 'S',
    scale: 5
  },
  {
    id: 'mbti_sn_2',
    he: 'אני אוהב חשוב על אפשרויות עתידיות ודפוסים גדולים',
    en: 'I enjoy thinking about future possibilities and patterns',
    dimension: 'SN',
    pole: 'N',
    scale: 5
  },
  {
    id: 'mbti_sn_3',
    he: 'אני מישהו שחי בהווה ובחוויות בפועל',
    en: 'I am someone who lives in the present and actual experiences',
    dimension: 'SN',
    pole: 'S',
    scale: 5
  },
  {
    id: 'mbti_sn_4',
    he: 'אני אוהב לפרש משמעויות ולהמציא תרחישים',
    en: 'I enjoy interpreting meanings and imagining scenarios',
    dimension: 'SN',
    pole: 'N',
    scale: 5
  },

  // Thinking-Feeling (TF)
  {
    id: 'mbti_tf_1',
    he: 'אני מחליט בהתבסס על לוגיקה ובהערכה אובייקטיבית',
    en: 'I decide based on logic and objective analysis',
    dimension: 'TF',
    pole: 'T',
    scale: 5
  },
  {
    id: 'mbti_tf_2',
    he: 'אני מחשוב על ההשפעה הרגשית על אנשים',
    en: 'I consider emotional impact on people',
    dimension: 'TF',
    pole: 'F',
    scale: 5
  },
  {
    id: 'mbti_tf_3',
    he: 'אני נחשוב כמישהו ממש עיקביות וצודקות עם אחרים',
    en: 'I am seen as someone fair and consistent',
    dimension: 'TF',
    pole: 'T',
    scale: 5
  },
  {
    id: 'mbti_tf_4',
    he: 'אני אוהב לעזור ולהיות סמכה לאחרים',
    en: 'I enjoy helping and supporting others',
    dimension: 'TF',
    pole: 'F',
    scale: 5
  },

  // Judging-Perceiving (JP)
  {
    id: 'mbti_jp_1',
    he: 'אני אוהב לתכנן וארגן דברים מראש',
    en: 'I enjoy planning and organizing things in advance',
    dimension: 'JP',
    pole: 'J',
    scale: 5
  },
  {
    id: 'mbti_jp_2',
    he: 'אני אוהב להישאר גמיש ולהתאים תוכניות',
    en: 'I like staying flexible and adapting plans',
    dimension: 'JP',
    pole: 'P',
    scale: 5
  },
  {
    id: 'mbti_jp_3',
    he: 'אני בדרך כלל מסדר ומאורגן',
    en: 'I am usually neat and organized',
    dimension: 'JP',
    pole: 'J',
    scale: 5
  },
  {
    id: 'mbti_jp_4',
    he: 'אני אוהב לגלות דברים חדשים בדרך',
    en: 'I enjoy discovering new things as I go',
    dimension: 'JP',
    pole: 'P',
    scale: 5
  }
];

export const MBTI_TYPES: Record<string, { he: string; en: string; description: { he: string; en: string } }> = {
  'ISTJ': { he: 'הלוגיסטיקאי', en: 'The Logistician', description: { he: 'מסודר, אחראי, מהימן', en: 'Practical, fact-oriented, reliable' } },
  'ISFJ': { he: 'ההגן', en: 'The Defender', description: { he: 'דואג, סיפוק לאחרים, מנותקי', en: 'Warm, caring, protective' } },
  'INFJ': { he: 'העצרת', en: 'The Advocate', description: { he: 'אידיאליסט, בעל ראיה גלובאלית', en: 'Idealistic, visionary, purpose-driven' } },
  'INTJ': { he: 'הארכיטקט', en: 'The Architect', description: { he: 'אנליטי, ולרז אישי, עצמאי', en: 'Analytical, independent, strategic' } },
  'ISTP': { he: 'התחנוכי', en: 'The Virtuoso', description: { he: 'מעשי, סקרן, יד מוכשרת', en: 'Practical, curious, hands-on' } },
  'ISFP': { he: 'הסוקר', en: 'The Adventurer', description: { he: 'אמני, ספונטני, אוהב את הטבע', en: 'Artistic, spontaneous, sensitive' } },
  'INFP': { he: 'התיכן', en: 'The Mediator', description: { he: 'אידיאליסט, יצירתי, עמוק', en: 'Idealistic, creative, introspective' } },
  'INTP': { he: 'המחקר', en: 'The Logician', description: { he: 'אנליטי, סקרן, פילוסופי', en: 'Analytical, curious, logical' } },
  'ESTP': { he: 'היזם', en: 'The Entrepreneur', description: { he: 'דינמי, אסטרטגי, פעיל', en: 'Dynamic, strategic, adaptable' } },
  'ESFP': { he: 'התצייצדנ', en: 'The Entertainer', description: { he: 'חברותי, אנרגטי, עכשוי', en: 'Outgoing, energetic, fun-loving' } },
  'ENFP': { he: 'המקדם', en: 'The Campaigner', description: { he: 'יצירתי, חברותי, אופטימי', en: 'Creative, sociable, optimistic' } },
  'ENTP': { he: 'ה debater', en: 'The Debater', description: { he: 'הגיוני, מטוטל, דדיקטי', en: 'Logical, inquisitive, debater' } },
  'ESTJ': { he: 'המנהל', en: 'The Executive', description: { he: 'מנהיגי, ארגוני, ישירי', en: 'Leadership, organized, direct' } },
  'ESFJ': { he: 'הקונסול', en: 'The Consul', description: { he: 'חברותי, אחראי, דואג', en: 'Social, responsible, caring' } },
  'ENFJ': { he: 'המנהל מנותקי', en: 'The Protagonist', description: { he: 'כריזמטי, בעלי השראה, מנהיגים', en: 'Charismatic, inspiring, leader' } },
  'ENTJ': { he: 'המפקד', en: 'The Commander', description: { he: 'אסטרטגי, חכם, נחוש', en: 'Strategic, ambitious, determined' } }
};

/**
 * ====================================
 * 2️⃣ ENNEAGRAM - תשע סוגי אישיות
 * ====================================
 */

export interface EnneagramQuestion {
  id: string;
  he: string;
  en: string;
  type: number; // 1-9
  scale: number; // 1-5 or 1-4
}

export const ENNEAGRAM_QUESTIONS: EnneagramQuestion[] = [
  // Type 1 - The Reformer
  {
    id: 'enn_1_1',
    he: 'אני דואג מאד לעמוד בתקנים וצדק',
    en: 'I care deeply about standards and justice',
    type: 1,
    scale: 5
  },
  {
    id: 'enn_1_2',
    he: 'אני חושבן הרבה על איך צריך להיות דברים',
    en: 'I think a lot about how things should be',
    type: 1,
    scale: 5
  },

  // Type 2 - The Helper
  {
    id: 'enn_2_1',
    he: 'אני אוהב לעזור לאחרים ולהיות חשוב',
    en: 'I love helping others and being important',
    type: 2,
    scale: 5
  },
  {
    id: 'enn_2_2',
    he: 'אני בדרך כלל תו בעדיפות הצרכים של אחרים',
    en: 'I usually prioritize others\' needs',
    type: 2,
    scale: 5
  },

  // Type 3 - The Achiever
  {
    id: 'enn_3_1',
    he: 'אני דחוף להצליח ולהיות מוצלח',
    en: 'I am driven to succeed and be successful',
    type: 3,
    scale: 5
  },
  {
    id: 'enn_3_2',
    he: 'אני אוהב להיות יעיל וקצב',
    en: 'I love being efficient and productive',
    type: 3,
    scale: 5
  },

  // Type 4 - The Individualist
  {
    id: 'enn_4_1',
    he: 'אני רגישות עמוקה והבחנה רגשית',
    en: 'I have deep feelings and emotional sensitivity',
    type: 4,
    scale: 5
  },
  {
    id: 'enn_4_2',
    he: 'אני חושבן שאני שונה מאחרים',
    en: 'I feel different from others',
    type: 4,
    scale: 5
  },

  // Type 5 - The Investigator
  {
    id: 'enn_5_1',
    he: 'אני אוהב לחקור והבין דברים בעומק',
    en: 'I love exploring and understanding things deeply',
    type: 5,
    scale: 5
  },
  {
    id: 'enn_5_2',
    he: 'אני בדרך כלל צפויה בתצפית',
    en: 'I am usually observant and analytical',
    type: 5,
    scale: 5
  },

  // Type 6 - The Loyalist
  {
    id: 'enn_6_1',
    he: 'אני אוהב לדעת על מה להסתמך',
    en: 'I like to know what to rely on',
    type: 6,
    scale: 5
  },
  {
    id: 'enn_6_2',
    he: 'אני נוטה להיות חוזר ודואגני',
    en: 'I tend to be cautious and worried',
    type: 6,
    scale: 5
  },

  // Type 7 - The Enthusiast
  {
    id: 'enn_7_1',
    he: 'אני אוהב הרפתקאות וחוויות חדשות',
    en: 'I love adventures and new experiences',
    type: 7,
    scale: 5
  },
  {
    id: 'enn_7_2',
    he: 'אני בדרך כלל אופטימי וקל צחוק',
    en: 'I am usually optimistic and upbeat',
    type: 7,
    scale: 5
  },

  // Type 8 - The Challenger
  {
    id: 'enn_8_1',
    he: 'אני אוהב לשלוט בסביבתי',
    en: 'I like to be in control',
    type: 8,
    scale: 5
  },
  {
    id: 'enn_8_2',
    he: 'אני דומיננטי וחזק בעמדותיי',
    en: 'I am strong-willed and assertive',
    type: 8,
    scale: 5
  },

  // Type 9 - The Peacemaker
  {
    id: 'enn_9_1',
    he: 'אני אוהב שלום ויציבות',
    en: 'I love peace and stability',
    type: 9,
    scale: 5
  },
  {
    id: 'enn_9_2',
    he: 'אני בדרך כלל מדי סבלנות ועדין',
    en: 'I am usually easygoing and adaptable',
    type: 9,
    scale: 5
  }
];

export const ENNEAGRAM_TYPES: Record<number, { he: string; en: string; virtue: { he: string; en: string }; vice: { he: string; en: string } }> = {
  1: {
    he: 'המתקן',
    en: 'The Reformer',
    virtue: { he: 'נוסח - עמוד שלם וישר', en: 'Integrity - principled' },
    vice: { he: 'כעס - תסכול על אי-שלמות', en: 'Anger - frustration at imperfection' }
  },
  2: {
    he: 'העוזר',
    en: 'The Helper',
    virtue: { he: 'צניעות - דאגה כנה', en: 'Humility - genuine care' },
    vice: { he: 'גאווה - צורך בהכרה', en: 'Pride - need for appreciation' }
  },
  3: {
    he: 'המשיג',
    en: 'The Achiever',
    virtue: { he: 'כנות - משא אמיתיות', en: 'Authenticity - true self' },
    vice: { he: 'דקרה - מעמדתה בעלמא', en: 'Deceit - image focus' }
  },
  4: {
    he: 'הפרט',
    en: 'The Individualist',
    virtue: { he: 'ימניות - עומק רגשי', en: 'Equanimity - emotional depth' },
    vice: { he: 'קנאה - משמעות חוסר', en: 'Envy - feeling inadequate' }
  },
  5: {
    he: 'החוקר',
    en: 'The Investigator',
    virtue: { he: 'טבע - תרומה ידע', en: 'Objectivity - knowledge' },
    vice: { he: 'ממלא - בידוד חרדה', en: 'Avarice - anxious detachment' }
  },
  6: {
    he: 'הנאמן',
    en: 'The Loyalist',
    virtue: { he: 'אומץ - ניצחון פחד', en: 'Courage - overcoming fear' },
    vice: { he: 'פחד - חרדה משתנה', en: 'Fear - anxiety' }
  },
  7: {
    he: 'הנדורן',
    en: 'The Enthusiast',
    virtue: { he: 'צמצום - הנאה מודע', en: 'Sobriety - conscious joy' },
    vice: { he: 'בחינוך - עמתה בבהלה', en: 'Gluttony - seeking distractions' }
  },
  8: {
    he: 'הקוטל',
    en: 'The Challenger',
    virtue: { he: 'אמת - הוגנות וחוזק', en: 'Truth - justice' },
    vice: { he: 'תאוה - צורך לשלוט', en: 'Lust - domination' }
  },
  9: {
    he: 'שנוטיק',
    en: 'The Peacemaker',
    virtue: { he: 'שקט - מדטטיו פנימית', en: 'Peace - inner harmony' },
    vice: { he: 'דזואק - זנוח עצמי', en: 'Sloth - self-neglect' }
  }
};

/**
 * ====================================
 * 3️⃣ BIG FIVE - חמשת הגורמים הגדולים
 * ====================================
 */

export interface BigFiveQuestion {
  id: string;
  he: string;
  en: string;
  trait: 'O' | 'C' | 'E' | 'A' | 'N'; // Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
  direction: 'positive' | 'negative'; // positive = higher score = more of trait
  scale: number; // 1-5 or 1-7
}

export const BIG_FIVE_QUESTIONS: BigFiveQuestion[] = [
  // Openness (פתיחות)
  {
    id: 'bf5_o_1',
    he: 'אני חוקר תמיד רעיונות וחוויות חדשות',
    en: 'I am always exploring new ideas and experiences',
    trait: 'O',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_o_2',
    he: 'אני אוהב אמנות וספרות',
    en: 'I enjoy art and literature',
    trait: 'O',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_o_3',
    he: 'אני בדרך כלל דק מרעיונות מוזרים',
    en: 'I am typically resistant to strange ideas',
    trait: 'O',
    direction: 'negative',
    scale: 5
  },

  // Conscientiousness (יעדיות)
  {
    id: 'bf5_c_1',
    he: 'אני מאורגן ותכניתני',
    en: 'I am organized and well-planned',
    trait: 'C',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_c_2',
    he: 'אני לא מדויק בעבודתי',
    en: 'I am not precise in my work',
    trait: 'C',
    direction: 'negative',
    scale: 5
  },
  {
    id: 'bf5_c_3',
    he: 'אני בודק תמיד שגיעתי למטרות שלי',
    en: 'I am always checking that I reach my goals',
    trait: 'C',
    direction: 'positive',
    scale: 5
  },

  // Extraversion (חברותיות)
  {
    id: 'bf5_e_1',
    he: 'אני אדם חברותי והיצעי',
    en: 'I am sociable and outgoing',
    trait: 'E',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_e_2',
    he: 'אני שמור וקילוע בקבוצות',
    en: 'I am reserved in group settings',
    trait: 'E',
    direction: 'negative',
    scale: 5
  },
  {
    id: 'bf5_e_3',
    he: 'אני בדרך כלל השקט בקבוצה',
    en: 'I am usually quiet in a group',
    trait: 'E',
    direction: 'negative',
    scale: 5
  },

  // Agreeableness (נוחות)
  {
    id: 'bf5_a_1',
    he: 'אני אדם תן וסיפקותי',
    en: 'I am compassionate and empathetic',
    trait: 'A',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_a_2',
    he: 'אני בדרך כלל מתקוטטין עם אחרים',
    en: 'I usually argue with others',
    trait: 'A',
    direction: 'negative',
    scale: 5
  },
  {
    id: 'bf5_a_3',
    he: 'אני לא מעניין בבעיות אחרים',
    en: 'I am not interested in others\' problems',
    trait: 'A',
    direction: 'negative',
    scale: 5
  },

  // Neuroticism (עצביות)
  {
    id: 'bf5_n_1',
    he: 'אני בדרך כלל דאוג ועקוב',
    en: 'I am usually anxious and worried',
    trait: 'N',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_n_2',
    he: 'אני רגיש וקל להתנדנד מזגי',
    en: 'I am sensitive to my moods',
    trait: 'N',
    direction: 'positive',
    scale: 5
  },
  {
    id: 'bf5_n_3',
    he: 'אני בדרך כלל שקוע ורגוע',
    en: 'I am usually calm and relaxed',
    trait: 'N',
    direction: 'negative',
    scale: 5
  }
];

export const BIG_FIVE_TRAITS: Record<string, { he: string; en: string; description: { he: string; en: string } }> = {
  'O': {
    he: 'פתיחות',
    en: 'Openness',
    description: { he: 'יצירתיות, סקרנות, פתיחות לחוויות חדשות', en: 'Creativity, curiosity, openness to new experiences' }
  },
  'C': {
    he: 'יעדיות',
    en: 'Conscientiousness',
    description: { he: 'ארגון, אחריות, יעילות', en: 'Organization, responsibility, efficiency' }
  },
  'E': {
    he: 'חברותיות',
    en: 'Extraversion',
    description: { he: 'חברותיות, חוצפה, אנרגיה', en: 'Sociability, assertiveness, energy' }
  },
  'A': {
    he: 'נוחות',
    en: 'Agreeableness',
    description: { he: 'עדינות, שיתוף פעולה, כנות', en: 'Kindness, cooperation, honesty' }
  },
  'N': {
    he: 'עצביות',
    en: 'Neuroticism',
    description: { he: 'רגישות רגשית, דאגה, שינויי מזג', en: 'Emotional sensitivity, worry, mood swings' }
  }
};

/**
 * ====================================
 * ASSESSMENT SCORING SYSTEM
 * ====================================
 */

export interface AssessmentResponse {
  questionId: string;
  score: number; // 1-5 or 1-7
}

export interface MBTIResult {
  type: string; // e.g., "INTJ"
  name: { he: string; en: string };
  description: { he: string; en: string };
  dimensions: {
    E_vs_I: number; // -5 to 5
    S_vs_N: number;
    T_vs_F: number;
    J_vs_P: number;
  };
}

export interface EnneagramResult {
  type: number; // 1-9
  name: { he: string; en: string };
  wing: number; // 1-9
  level: string; // healthy, average, unhealthy
  description: { he: string; en: string };
}

export interface BigFiveResult {
  openness: number; // 0-100
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  interpretation: { he: string; en: string };
}

/**
 * Calculate MBTI Type from responses
 */
export function calculateMBTI(responses: AssessmentResponse[]): MBTIResult {
  let EI = 0, SN = 0, TF = 0, JP = 0;

  responses.forEach(response => {
    const question = MBTI_QUESTIONS.find(q => q.id === response.questionId);
    if (!question) return;

    const score = response.score - 3; // Convert 1-5 to -2 to 2

    if (question.dimension === 'EI') {
      EI += question.pole === 'E' ? score : -score;
    } else if (question.dimension === 'SN') {
      SN += question.pole === 'S' ? score : -score;
    } else if (question.dimension === 'TF') {
      TF += question.pole === 'T' ? score : -score;
    } else if (question.dimension === 'JP') {
      JP += question.pole === 'J' ? score : -score;
    }
  });

  const type =
    (EI > 0 ? 'E' : 'I') +
    (SN > 0 ? 'S' : 'N') +
    (TF > 0 ? 'T' : 'F') +
    (JP > 0 ? 'J' : 'P');

  return {
    type,
    name: MBTI_TYPES[type],
    description: MBTI_TYPES[type].description,
    dimensions: { E_vs_I: EI, S_vs_N: SN, T_vs_F: TF, J_vs_P: JP }
  };
}

/**
 * Calculate Enneagram Type from responses
 */
export function calculateEnneagram(responses: AssessmentResponse[]): EnneagramResult {
  const scores: Record<number, number> = {};

  for (let i = 1; i <= 9; i++) {
    scores[i] = 0;
  }

  responses.forEach(response => {
    const question = ENNEAGRAM_QUESTIONS.find(q => q.id === response.questionId);
    if (!question) return;
    scores[question.type] += response.score;
  });

  const highestType = Object.keys(scores).reduce((a, b) =>
    parseInt(scores[parseInt(b)] > scores[parseInt(a)] ? b : a)
  ) as unknown as number;

  return {
    type: highestType,
    name: ENNEAGRAM_TYPES[highestType],
    wing: 0, // Simplified
    level: 'average',
    description: ENNEAGRAM_TYPES[highestType]
  };
}

/**
 * Calculate Big Five Traits from responses
 */
export function calculateBigFive(responses: AssessmentResponse[]): BigFiveResult {
  const traits: Record<string, number[]> = { O: [], C: [], E: [], A: [], N: [] };

  responses.forEach(response => {
    const question = BIG_FIVE_QUESTIONS.find(q => q.id === response.questionId);
    if (!question) return;

    const score = question.direction === 'positive' ? response.score : 6 - response.score;
    traits[question.trait].push(score);
  });

  const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length * 20; // Scale to 0-100

  return {
    openness: average(traits.O),
    conscientiousness: average(traits.C),
    extraversion: average(traits.E),
    agreeableness: average(traits.A),
    neuroticism: average(traits.N),
    interpretation: { he: 'פרופיל Big Five שלך', en: 'Your Big Five profile' }
  };
}
