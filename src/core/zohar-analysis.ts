/**
 * zohar-analysis.ts - ניתוח אישיות לפי תורת הזוהר
 * פרצוף (physiognomy) וכף יד (palmistry)
 */

export interface FacialFeatures {
  eyeColor: string;
  skinTone: string;
  foreheadShape: string; // wide, narrow, prominent
  eyePosition: string; // close, distant, slanted
  noseShape: string; // straight, curved, pointed
  jawLine: string; // square, round, pointed
  faceShape: string; // round, oval, square, triangle
  wrinklePatterns: string[];
  eyebrowShape: string;
}

export interface PalmFeatures {
  lifeLineLength: string; // short, medium, long
  lifeLineQuality: string; // clear, broken, chained
  heartLineLength: string;
  heartLineQuality: string;
  headLineLength: string;
  headLineQuality: string;
  fateLine: string;
  sundLine: string;
  mounds: Record<string, string>; // כריות בכף היד
  fingerShapes: string[];
  nailShapes: string;
}

export interface ZoharPersonality {
  soulElement: string; // אש, מים, אוויר, אדמה
  temperament: string; // כולריק, סנגווי, מלנכולי, פלגמטי
  spiritualLevel: string; // הנתיב הרוחני
  lifeChallenge: string; // האתגר הראשי
  lifeGift: string; // המתנה הרוחנית
  sephirothAlignment: string[]; // איזה ספירות משפיעות
  karmaThisLife: string; // תיקון הנשמה
  personalPower: string; // הכוח האישי
  weaknessToOvercome: string; // החולשה להתגבר עליה
}

/**
 * פרשנות צבע עיניים לפי הזוהר
 */
export const EYE_COLOR_MEANINGS: Record<string, { he: string; en: string; element: string }> = {
  'brown': {
    he: 'חום - יסוד האדמה, כמישות וייצוב',
    en: 'Brown - Earth element, stability and groundedness',
    element: 'Earth'
  },
  'blue': {
    he: 'כחול - יסוד המים, רגישות אינטואיציה',
    en: 'Blue - Water element, sensitivity and intuition',
    element: 'Water'
  },
  'green': {
    he: 'ירוק - יסוד האוויר, חוכמה ותקשורת',
    en: 'Green - Air element, wisdom and communication',
    element: 'Air'
  },
  'hazel': {
    he: 'אגוז - שילוב של יסודות, גמישות וסתירות',
    en: 'Hazel - Mixed elements, adaptability',
    element: 'Mixed'
  },
  'amber': {
    he: 'עברי - יסוד האש, חוזק ויכולת מנהיגות',
    en: 'Amber - Fire element, strength and leadership',
    element: 'Fire'
  }
};

/**
 * פרשנות צורת הפנים לפי הזוהר
 */
export const FACE_SHAPE_MEANINGS: Record<string, { he: string; en: string; sephira: string }> = {
  'round': {
    he: 'עגול - ספירת יסוד (Yesod), חיבור לתחום הרגשי',
    en: 'Round - Yesod sphere, emotional and intuitive',
    sephira: 'Yesoid'
  },
  'oval': {
    he: 'אליפסה - ספירת תפארת (Tiphereth), הרמוניה והשלמות',
    en: 'Oval - Tiphereth sphere, harmony and wholeness',
    sephira: 'Tiphereth'
  },
  'square': {
    he: 'ריבוע - ספירת חסד (Chesed), כוח וקביעות',
    en: 'Square - Chesed sphere, strength and determination',
    sephira: 'Chesed'
  },
  'triangle': {
    he: 'משולש - ספירת גבורה (Gevurah), כוח ודינמיקה',
    en: 'Triangle - Gevurah sphere, power and action',
    sephira: 'Gevurah'
  },
  'heart': {
    he: 'לב - ספירת נצח (Netzach), יצירתיות ורגשות',
    en: 'Heart - Netzach sphere, creativity and passion',
    sephira: 'Netzach'
  }
};

/**
 * פרשנות קו החיים בכף היד
 */
export const LIFE_LINE_MEANINGS: Record<string, { he: string; en: string }> = {
  'long-clear': {
    he: 'קו חיים ארוך וברור - חיים בריאים, אנרגיה גבוהה וציפייה ארוכה',
    en: 'Long clear life line - Healthy life, high energy, longevity'
  },
  'short-clear': {
    he: 'קו חיים קצר וברור - חיים אינטנסיביים, פוקוס על איכות על כמות',
    en: 'Short clear life line - Intense life, quality over quantity'
  },
  'broken': {
    he: 'קו חיים שבור - שינויים משמעותיים, התחדשויות, שינוי דרך חיים',
    en: 'Broken life line - Major changes, renewals, life transformations'
  },
  'chained': {
    he: 'קו חיים שרשרתי - אתגרים חוזרים, שיעורים חוזרים',
    en: 'Chained life line - Recurring challenges, repetitive lessons'
  },
  'double': {
    he: 'קו חיים כפול - הגנה מיוחדת, חיים חסוכים, הדרכה רוחנית',
    en: 'Double life line - Special protection, blessed life, spiritual guidance'
  }
};

/**
 * פרשנות קו הלב בכף היד
 */
export const HEART_LINE_MEANINGS: Record<string, { he: string; en: string }> = {
  'long-clear': {
    he: 'קו לב ארוך וברור - קיבול רגשי גדול, אהבה עמוקה, נאמנות',
    en: 'Long clear heart line - Great emotional capacity, deep love'
  },
  'short': {
    he: 'קו לב קצר - אנרגיה רגשית מרוכזת, בחירתיות בקשרים',
    en: 'Short heart line - Focused emotional energy, selective in relationships'
  },
  'curved': {
    he: 'קו לב קמור - רגשי עמוקים, אמפתיה גדולה, נשמה רגישה',
    en: 'Curved heart line - Deep feelings, great empathy, sensitive soul'
  },
  'straight': {
    he: 'קו לב ישר - בקרה רגשית, הגיון על רגש, היגיון בבחירות אמוציונליות',
    en: 'Straight heart line - Emotional control, logic over feeling'
  }
};

/**
 * פרשנות קו הראש בכף היד
 */
export const HEAD_LINE_MEANINGS: Record<string, { he: string; en: string }> = {
  'long': {
    he: 'קו ראש ארוך - חוכמה עמוקה, חשיבה מנתחת, מוח דיוק',
    en: 'Long head line - Deep wisdom, analytical thinking, sharp mind'
  },
  'short': {
    he: 'קו ראש קצר - מחשבה מהירה וישירה, דוגמטיות אפשרית',
    en: 'Short head line - Quick thinking, direct mind, possible stubbornness'
  },
  'curved': {
    he: 'קו ראש קמור - יצירתיות, דמיון עשיר, חשיבה גמישה',
    en: 'Curved head line - Creativity, rich imagination, flexible thinking'
  },
  'straight': {
    he: 'קו ראש ישר - חשיבה הגיונית, דיוק, ריאליזם',
    en: 'Straight head line - Logical thinking, precision, realism'
  },
  'forked': {
    he: 'קו ראש מפוצל - יכולת ראיית דברים משתי זוויות, דואליות במחשבה',
    en: 'Forked head line - Sees both sides, duality in thinking'
  }
};

/**
 * כריות כף היד וחלוקתן לפי הזוהר
 */
export const PALM_MOUNDS: Record<string, { he: string; en: string; planet: string; sephira: string }> = {
  'venus': {
    he: 'כרית ונוס - אהבה, יצירתיות, עוד',
    en: 'Mound of Venus - Love, creativity, sensuality',
    planet: 'Venus',
    sephira: 'Netzach'
  },
  'mars': {
    he: 'כרית מאדים - כוח, אומץ, רצון',
    en: 'Mound of Mars - Strength, courage, willpower',
    planet: 'Mars',
    sephira: 'Gevurah'
  },
  'jupiter': {
    he: 'כרית צדק - מנהיגות, שפע, אמביציה',
    en: 'Mound of Jupiter - Leadership, abundance, ambition',
    planet: 'Jupiter',
    sephira: 'Chesed'
  },
  'saturn': {
    he: 'כרית שבתאי - אחריות, כישרון, אבן חוק',
    en: 'Mound of Saturn - Responsibility, talent, discipline',
    planet: 'Saturn',
    sephira: 'Binah'
  },
  'sun': {
    he: 'כרית השמש - יופי, הצלחה, ביטחון עצמי',
    en: 'Mound of Sun - Beauty, success, confidence',
    planet: 'Sun',
    sephira: 'Tiphereth'
  },
  'mercury': {
    he: 'כרית כוכב חמה - תקשורת, חוכמה, מסחר',
    en: 'Mound of Mercury - Communication, wisdom, commerce',
    planet: 'Mercury',
    sephira: 'Hod'
  },
  'moon': {
    he: 'כרית הירח - דמיון, אינטואיציה, רוחניות',
    en: 'Mound of Moon - Imagination, intuition, spirituality',
    planet: 'Moon',
    sephira: 'Yesod'
  }
};

/**
 * ניתוח אישיות לפי תורת הזוהר
 */
export function analyzePersonalityByZohar(
  facialFeatures: Partial<FacialFeatures>,
  palmFeatures: Partial<PalmFeatures>,
  fullName: string,
  motherName: string
): ZoharPersonality {
  // בנסיון זה, נחזיר ניתוח כללי
  // בעולם האמיתי, זה יצריך בדיקה מפורטת של כל משתנה

  const eyeColor = facialFeatures.eyeColor || 'brown';
  const faceShape = facialFeatures.faceShape || 'oval';
  const lifeLineQuality = palmFeatures.lifeLineQuality || 'clear';

  const eyeMeaning = EYE_COLOR_MEANINGS[eyeColor.toLowerCase()] || EYE_COLOR_MEANINGS['brown'];
  const faceMeaning = FACE_SHAPE_MEANINGS[faceShape.toLowerCase()] || FACE_SHAPE_MEANINGS['oval'];

  return {
    soulElement: eyeMeaning.element,
    temperament: determineTemperament(eyeMeaning.element, faceShape),
    spiritualLevel: faceMeaning.sephira,
    lifeChallenge: determineChallenge(faceShape, lifeLineQuality),
    lifeGift: determineGift(eyeMeaning.element),
    sephirothAlignment: [faceMeaning.sephira, eyeMeaning.element],
    karmaThisLife: determineKarma(fullName, motherName),
    personalPower: determinePower(faceShape),
    weaknessToOvercome: determineWeakness(lifeLineQuality)
  };
}

function determineTemperament(element: string, faceShape: string): string {
  const map: Record<string, Record<string, string>> = {
    'Fire': { 'triangle': 'כולריק (Choleric)', 'square': 'כולריק חזק' },
    'Water': { 'round': 'סנגווי (Sanguine)', 'oval': 'סנגווי בתוך מאזן' },
    'Air': { 'oval': 'מלנכולי (Melancholic)', 'heart': 'מלנכולי יצירתי' },
    'Earth': { 'square': 'פלגמטי (Phlegmatic)', 'round': 'פלגמטי רגיש' }
  };
  return map[element]?.[faceShape] || 'מאוזן (Balanced)';
}

function determineChallenge(faceShape: string, lifeLineQuality: string): string {
  const challenges: Record<string, string> = {
    'triangle': 'שליטה בכוח וחוזק עצמי ללא אלימות',
    'square': 'גמישות והכנעה בפני שינוי',
    'round': 'גבולות עצמיים וקבלת אחריות אישית',
    'oval': 'חיבור בין הרוח לחומר',
    'heart': 'בתי לבבות בפני עולם קר'
  };
  return challenges[faceShape] || 'פתוח ללמידה וצמיחה';
}

function determineGift(element: string): string {
  const gifts: Record<string, string> = {
    'Fire': 'אנרגיה יצירתית והשראה',
    'Water': 'אמפתיה וחיבור רגשי עמוק',
    'Air': 'חוכמה וקשר לתחום הנעלם',
    'Earth': 'יציבות וביצוע מעשי',
    'Mixed': 'גמישות ותיאום'
  };
  return gifts[element] || 'מתנה מיוחדת וייחודית';
}

function determineKarma(fullName: string, motherName: string): string {
  // בנסיון זה, הגמטריה של השם היא מאוד משמעותית
  // נחזיר הסבר כללי
  return `תיקון הנשמה דרך השם: ${fullName} בן/בת ${motherName}`;
}

function determinePower(faceShape: string): string {
  const powers: Record<string, string> = {
    'triangle': 'כוח הפעולה והביצוע',
    'square': 'כוח היצוב והבנייה',
    'round': 'כוח החיבור והרגישות',
    'oval': 'כוח האיזון ההרמוני',
    'heart': 'כוח האהבה וההשראה'
  };
  return powers[faceShape] || 'כוח אישי ייחודי';
}

function determineWeakness(lifeLineQuality: string): string {
  const weaknesses: Record<string, string> = {
    'broken': 'התגבר על רתיעה מפני שינוי',
    'chained': 'שחרור מעבדות נפשית',
    'clear': 'להישמר מעלפיות יתרה',
    'short': 'חידוש והמשך רצוני'
  };
  return weaknesses[lifeLineQuality] || 'עבודה על גדילות אישית';
}

/**
 * פרשנות מצטברת של כל הנתונים
 */
export function generateZoharReport(
  personality: ZoharPersonality,
  facialFeatures: Partial<FacialFeatures>,
  palmFeatures: Partial<PalmFeatures>
): string {
  return `
🔮 דוח ניתוח אישיות לפי תורת הזוהר:

יסוד הנשמה: ${personality.soulElement}
טמפרמנט: ${personality.temperament}
רמה רוחנית: ${personality.spiritualLevel}

אתגר החיים: ${personality.lifeChallenge}
מתנת החיים: ${personality.lifeGift}

כוח אישי: ${personality.personalPower}
חולשה להתגבר עליה: ${personality.weaknessToOvercome}

קרמא בחיים אלה: ${personality.karmaThisLife}
  `;
}
