/**
 * calculation-methodology.ts
 * 🔮 מדריך מלא של תהליך החישוב לכל ניתוח
 * Complete methodology for all analysis calculations
 */

/**
 * ====================================
 * 1️⃣ NUMEROLOGY CALCULATION PROCESS
 * ====================================
 */

export const NUMEROLOGY_CALCULATION = {
  lifePathNumber: {
    he: 'דרך החיים',
    en: 'Life Path Number',
    formula: 'Sum all digits of birth date, reduce to single digit (1-9)',
    example: {
      birthDate: '1990-05-15',
      calculation: `
        Year: 1990 → 1+9+9+0 = 19 → 1+9 = 10 → 1+0 = 1
        Month: 05 → 0+5 = 5
        Day: 15 → 1+5 = 6
        Total: 1 + 5 + 6 = 12 → 1+2 = 3
        Life Path Number = 3
      `,
      meaning: {
        he: 'היוצר - יצירתיות, ביטוי, שמחה',
        en: 'The Creator - Creativity, Expression, Joy'
      }
    },
    process: [
      {
        step: 1,
        he: 'פרק את תאריך הלידה לחלקים',
        en: 'Break down birth date into components',
        example: 'YYYY-MM-DD → Year, Month, Day'
      },
      {
        step: 2,
        he: 'הוסף כל ספרה בנפרד',
        en: 'Add each digit separately',
        example: 'Year: 1+9+9+0, Month: 0+5, Day: 1+5'
      },
      {
        step: 3,
        he: 'הוסף את התוצאות השלוש',
        en: 'Sum all three results',
        example: '1 + 5 + 6 = 12'
      },
      {
        step: 4,
        he: 'צמצם לספרה יחידה',
        en: 'Reduce to single digit (1-9)',
        example: '12 → 1+2 = 3'
      }
    ],
    masterNumbers: {
      he: 'מספרים מיוחדים שלא מצומצמים',
      en: 'Special numbers that are NOT reduced',
      list: [
        { number: 11, he: 'אינטואיציה וחוכמה', en: 'Intuition & Wisdom' },
        { number: 22, he: 'בנאי רוחני', en: 'Master Builder' },
        { number: 33, he: 'מורה רוחני', en: 'Master Teacher' }
      ]
    }
  },

  destinyNumber: {
    he: 'מספר הגורל',
    en: 'Destiny Number',
    formula: 'Same as Life Path but uses full name',
    process: [
      {
        step: 1,
        he: 'המר כל אות לספרה (A=1, B=2... Z=26)',
        en: 'Convert each letter to number (A=1, B=2... Z=26)',
        table: 'A=1,B=2,C=3,D=4,E=5,F=6,G=7,H=8,I=9,J=10,K=11,L=12,M=13,N=14,O=15,P=16,Q=17,R=18,S=19,T=20,U=21,V=22,W=23,X=24,Y=25,Z=26'
      },
      {
        step: 2,
        he: 'הוסף את כל הספרות של השם',
        en: 'Sum all numbers from name',
        example: 'JOHN = J(10) + O(15) + H(8) + N(14) = 47'
      },
      {
        step: 3,
        he: 'צמצם לספרה יחידה',
        en: 'Reduce to single digit',
        example: '47 → 4+7 = 11 (Master Number)'
      }
    ]
  },

  soulUrgeNumber: {
    he: 'דחף הנשמה',
    en: 'Soul Urge Number',
    formula: 'Sum only VOWELS from full name',
    vowels: ['A', 'E', 'I', 'O', 'U'],
    process: [
      {
        step: 1,
        he: 'בודד רק את התנועות בשם',
        en: 'Extract only vowels from name',
        example: 'JOHN → O = 15'
      },
      {
        step: 2,
        he: 'הוסף את ערכי הספרות של התנועות',
        en: 'Sum numeric values of vowels',
        example: '15 → 1+5 = 6'
      }
    ]
  },

  personalityNumber: {
    he: 'מספר אישיות',
    en: 'Personality Number',
    formula: 'Sum only CONSONANTS from full name',
    process: [
      {
        step: 1,
        he: 'בודד את כל העיצורים',
        en: 'Extract only consonants',
        example: 'JOHN → J(10) + H(8) + N(14) = 32'
      },
      {
        step: 2,
        he: 'צמצם',
        en: 'Reduce',
        example: '32 → 3+2 = 5'
      }
    ]
  }
};

/**
 * ====================================
 * 2️⃣ KABBALAH SEPHIROTH CALCULATION
 * ====================================
 */

export const KABBALAH_CALCULATION = {
  sephiraMapping: {
    he: 'מיפוי לספירות בעץ החיים',
    en: 'Mapping to Sephiroth on Tree of Life',
    method: 'Based on Planetary Rulerships from Birth Chart',

    sunSign_to_Sephira: {
      he: 'כוכב השמש → ספירה',
      en: 'Sun Sign → Sephiroth',
      mapping: {
        'Aries': { sephira: 'Gevurah', he: 'גבורה - חוזק וכוח' },
        'Taurus': { sephira: 'Netzach', he: 'נצח - יצירתיות' },
        'Gemini': { sephira: 'Hod', he: 'הוד - תקשורת' },
        'Cancer': { sephira: 'Yesoid', he: 'יסוד - רגשות' },
        'Leo': { sephira: 'Tiphereth', he: 'תפארת - אני המרכזי' },
        'Virgo': { sephira: 'Hod', he: 'הוד - ניתוח' },
        'Libra': { sephira: 'Netzach', he: 'נצח - איזון' },
        'Scorpio': { sephira: 'Gevurah', he: 'גבורה - שינוי' },
        'Sagittarius': { sephira: 'Chesed', he: 'חסד - הרחבה' },
        'Capricorn': { sephira: 'Binah', he: 'בינה - מבנה' },
        'Aquarius': { sephira: 'Chokmah', he: 'חכמה - יצירה' },
        'Pisces': { sephira: 'Yesoid', he: 'יסוד - דמיון' }
      }
    },

    moonSign_to_Sephira: {
      he: 'כוכב הירח → ספירה',
      en: 'Moon Sign → Sephiroth',
      meaning: {
        he: 'הוד (תת-הכרא וביטחון נפשי)',
        en: 'Represents emotional needs and subconscious'
      }
    },

    ascendant_to_Sephira: {
      he: 'בעל העלייה → ספירה',
      en: 'Ascendant → Sephiroth',
      meaning: {
        he: 'איך אתה נראה לעולם החיצוני',
        en: 'How you appear to external world'
      }
    },

    process: [
      {
        step: 1,
        he: 'קבל את זוגות המזלות (שמש, ירח, עלייה)',
        en: 'Get birth chart signs (Sun, Moon, Ascendant)',
        example: 'Sun: Leo, Moon: Cancer, Ascendant: Libra'
      },
      {
        step: 2,
        he: 'חפש כל מזל בטבלת ההתאמה',
        en: 'Match each sign to Sephiroth table',
        example: 'Leo → Tiphereth, Cancer → Yesoid, Libra → Netzach'
      },
      {
        step: 3,
        he: 'קבע את הספירה המרכזית',
        en: 'Determine dominant Sephira',
        example: 'Tiphereth (Sun) = Core Soul Essence'
      },
      {
        step: 4,
        he: 'בנה את תמונה הרוחנית המלאה',
        en: 'Build complete spiritual profile',
        example: 'Spiritual Level: Tiphereth, Emotional: Yesoid, Expression: Netzach'
      }
    ]
  },

  worldCalculation: {
    he: 'קביעת עולם הקבלה',
    en: 'Determining Kabbalistic World',
    worlds: [
      { world: 'Atziluth', sephiroth: ['Keter', 'Chokmah', 'Binah'], meaning: 'Pure Divinity' },
      { world: 'Briah', sephiroth: ['Chokmah', 'Binah', 'Chesed', 'Gevurah', 'Tiphereth'], meaning: 'Creation' },
      { world: 'Yetzirah', sephiroth: ['Chokmah', 'Chesed', 'Gevurah', 'Tiphereth', 'Netzach', 'Hod', 'Yesoid'], meaning: 'Formation' },
      { world: 'Assiyah', sephiroth: ['Malkuth'], meaning: 'Action' }
    ],
    process: [
      {
        step: 1,
        he: 'בדוק את מעמד הנשמה המרכזי',
        en: 'Check dominant soul level',
        example: 'If Tiphereth (Sun) is strongest → Briah'
      },
      {
        step: 2,
        he: 'זהה את העולם המתאים',
        en: 'Identify corresponding world',
        example: 'Tiphereth belongs to Briah world'
      }
    ]
  }
};

/**
 * ====================================
 * 3️⃣ TAROT CARD INTERPRETATION
 * ====================================
 */

export const TAROT_CALCULATION = {
  cardMeaning: {
    he: 'פרשנות קלף טאָרוט',
    en: 'Tarot Card Interpretation',

    upright_vs_reversed: {
      he: 'משמעות ישירה לעומת הפוכה',
      en: 'Upright vs Reversed Meaning',
      process: [
        {
          step: 1,
          he: 'קבע את כיוון הקלף',
          en: 'Determine card orientation',
          check: 'Is card upright or upside down?'
        },
        {
          step: 2,
          he: 'בחר את המשמעות המתאימה',
          en: 'Select appropriate meaning',
          upright: 'Positive, forward energy',
          reversed: 'Shadow, blocked, opposite energy'
        }
      ]
    },

    numerology_meaning: {
      he: 'משמעות נומרולוגית של קלף',
      en: 'Numerological Meaning of Card',
      example: {
        card: 'The Wheel of Fortune',
        number: 10,
        calculation: '1 + 0 = 1',
        meaning: {
          he: 'התחלה חדשה דרך גורל',
          en: 'New beginning through destiny'
        }
      }
    },

    kabbalah_connection: {
      he: 'קשר קבלי',
      en: 'Kabbalistic Connection',
      process: [
        {
          he: 'קלפי אַרְקַנָה הגדול (0-21) = הנתיבים',
          en: 'Major Arcana (0-21) = The Paths',
          example: 'The Fool (0) = Path 11 on Tree of Life'
        },
        {
          he: 'קלפים קטנים = ספירות + יסודות',
          en: 'Minor Arcana = Sephiroth + Elements',
          example: 'Wands = Fire, Cups = Water, Swords = Air, Pentacles = Earth'
        }
      ]
    }
  }
};

/**
 * ====================================
 * 4️⃣ ZOHAR PERSONALITY ANALYSIS
 * ====================================
 */

export const ZOHAR_CALCULATION = {
  facialAnalysis: {
    he: 'ניתוח פנים לפי הזוהר',
    en: 'Facial Analysis by Zohar',

    eyeColor_to_Element: {
      he: 'צבע עיניים → יסוד',
      en: 'Eye Color → Element',
      calculation: [
        { color: 'Brown', element: 'Earth', meaning: 'Stability, grounded' },
        { color: 'Blue', element: 'Water', meaning: 'Intuition, emotional' },
        { color: 'Green', element: 'Air', meaning: 'Wisdom, intellectual' },
        { color: 'Amber', element: 'Fire', meaning: 'Strength, passionate' },
        { color: 'Hazel', element: 'Mixed', meaning: 'Adaptable, balanced' }
      ],
      process: [
        {
          step: 1,
          he: 'זהה צבע עיניים בתמונה',
          en: 'Identify eye color in photo',
          method: 'Examine iris color in natural light'
        },
        {
          step: 2,
          he: 'חפש בטבלה להתאמה',
          en: 'Match to table',
          example: 'Blue eyes → Water element'
        },
        {
          step: 3,
          he: 'קבע את היסוד של הנשמה',
          en: 'Determine soul element',
          meaning: 'This reveals core nature'
        }
      ]
    },

    faceShape_to_Sephira: {
      he: 'צורת פנים → ספירה',
      en: 'Face Shape → Sephiroth',
      calculation: [
        { shape: 'Round', sephira: 'Yesoid', meaning: 'Emotional, intuitive' },
        { shape: 'Oval', sephira: 'Tiphereth', meaning: 'Harmonious, balanced' },
        { shape: 'Square', sephira: 'Chesed', meaning: 'Strong, determined' },
        { shape: 'Triangle', sephira: 'Gevurah', meaning: 'Dynamic, powerful' },
        { shape: 'Heart', sephira: 'Netzach', meaning: 'Creative, passionate' }
      ]
    }
  },

  palmAnalysis: {
    he: 'ניתוח כף יד לפי הזוהר',
    en: 'Palm Analysis by Zohar',

    lifeLineQuality: {
      he: 'איכות קו החיים',
      en: 'Life Line Quality',
      analysis: [
        {
          type: 'Long & Clear',
          meaning: {
            he: 'חיים בריאים, אנרגיה גבוהה',
            en: 'Healthy life, high energy'
          },
          calculation: 'Measure from thumb web to little finger edge'
        },
        {
          type: 'Short & Clear',
          meaning: {
            he: 'חיים אינטנסיביים וממוקדים',
            en: 'Intense, focused life'
          },
          calculation: 'Length less than 3/4 of palm'
        },
        {
          type: 'Broken',
          meaning: {
            he: 'שינויים משמעותיים בחיים',
            en: 'Major life changes'
          },
          calculation: 'Line has clear breaks/gaps'
        },
        {
          type: 'Chained',
          meaning: {
            he: 'שיעורים חוזרים',
            en: 'Recurring lessons'
          },
          calculation: 'Line has linked chain-like pattern'
        },
        {
          type: 'Double',
          meaning: {
            he: 'הגנה מיוחדת',
            en: 'Special protection'
          },
          calculation: 'Two parallel life lines visible'
        }
      ]
    },

    heartLineQuality: {
      he: 'איכות קו הלב',
      en: 'Heart Line Quality',
      analysis: [
        {
          type: 'Long & Clear',
          meaning: 'Great emotional capacity, deep love',
          measurement: 'Spans from pinky to index finger'
        },
        {
          type: 'Short',
          meaning: 'Selective in relationships',
          measurement: 'Ends mid-palm'
        },
        {
          type: 'Curved',
          meaning: 'Great empathy',
          pattern: 'Arcs upward'
        },
        {
          type: 'Straight',
          meaning: 'Logical emotions',
          pattern: 'Relatively straight line'
        }
      ]
    },

    headLineQuality: {
      he: 'איכות קו הראש',
      en: 'Head Line Quality',
      analysis: [
        { type: 'Long', meaning: 'Deep wisdom, analytical' },
        { type: 'Short', meaning: 'Quick thinking, direct' },
        { type: 'Curved', meaning: 'Creative mind' },
        { type: 'Straight', meaning: 'Logical thinker' },
        { type: 'Forked', meaning: 'Sees both sides' }
      ]
    },

    palmMounds: {
      he: 'כריות כף היד ודרכים',
      en: 'Palm Mounds & Meanings',
      calculation: [
        {
          mound: 'Venus',
          location: 'Below thumb',
          prominent: 'Strong love nature',
          flat: 'Reserved emotionally'
        },
        {
          mound: 'Mars',
          location: 'Below Mercury',
          prominent: 'Courageous, bold',
          flat: 'Gentle, passive'
        },
        {
          mound: 'Jupiter',
          location: 'Below index finger',
          prominent: 'Ambitious leader',
          flat: 'Modest, reserved'
        },
        {
          mound: 'Saturn',
          location: 'Below middle finger',
          prominent: 'Responsible, serious',
          flat: 'Carefree, lucky'
        },
        {
          mound: 'Sun',
          location: 'Below ring finger',
          prominent: 'Successful, confident',
          flat: 'Struggles with confidence'
        },
        {
          mound: 'Mercury',
          location: 'Below pinky',
          prominent: 'Excellent communicator',
          flat: 'Communication challenges'
        },
        {
          mound: 'Moon',
          location: 'Side of palm (inner)',
          prominent: 'Imaginative, intuitive',
          flat: 'Practical, realistic'
        }
      ]
    }
  },

  temperamentDetermination: {
    he: 'קביעת טמפרמנט',
    en: 'Temperament Determination',

    formula: 'Element (from eye color) + Sephira (from face shape) + Line quality',

    examples: [
      {
        combination: 'Fire (amber eyes) + Gevurah (triangle face) + Strong life line',
        result: 'Choleric - Leader, passionate, action-oriented'
      },
      {
        combination: 'Water (blue eyes) + Yesoid (round face) + Curved heart line',
        result: 'Sanguine - Emotional, intuitive, empathetic'
      },
      {
        combination: 'Air (green eyes) + Hod (oval face) + Long head line',
        result: 'Melancholic - Analytical, intellectual, introspective'
      },
      {
        combination: 'Earth (brown eyes) + Chesed (square face) + Clear life line',
        result: 'Phlegmatic - Stable, practical, grounded'
      }
    ]
  }
};

/**
 * ====================================
 * 5️⃣ OVERALL CALCULATION PROCESS FLOW
 * ====================================
 */

export const ANALYSIS_FLOW = {
  step1_dataCollection: {
    he: 'שלב 1: איסוף נתונים',
    en: 'Step 1: Data Collection',
    inputs: [
      'Birth date (YYYY-MM-DD)',
      'Birth location',
      'Birth time (for exact chart)',
      'Full name',
      'Mother\'s name',
      'Facial photos (front, profile)',
      'Palm photos (both hands, multiple angles)',
      'Visual feature identification'
    ]
  },

  step2_calculation: {
    he: 'שלב 2: חישוב',
    en: 'Step 2: Calculation',
    processes: [
      'Generate birth chart (sun, moon, ascendant signs)',
      'Calculate numerology numbers',
      'Map to Sephiroth on Tree of Life',
      'Analyze facial features',
      'Analyze palm lines and mounds',
      'Determine element and temperament'
    ]
  },

  step3_interpretation: {
    he: 'שלב 3: פרשנות',
    en: 'Step 3: Interpretation',
    actions: [
      'Connect eye color to element',
      'Map face shape to Sephira',
      'Interpret palm lines quality',
      'Cross-reference with Kabbalistic meanings',
      'Determine spiritual level',
      'Identify life challenge and gift'
    ]
  },

  step4_synthesis: {
    he: 'שלב 4: סינתזה',
    en: 'Step 4: Synthesis',
    output: [
      'Complete personality profile',
      'Spiritual alignment report',
      'Life purpose and challenges',
      'Temperament classification',
      'Kabbalistic spiritual path',
      'Personal power and weaknesses'
    ]
  },

  step5_presentation: {
    he: 'שלב 5: הצגה',
    en: 'Step 5: Presentation',
    format: [
      'Visual cards with results',
      'Detailed explanations',
      'Kabbalistic correspondences',
      'Meditation guidance',
      'Life affirmations',
      'Practical wisdom'
    ]
  }
};

export const QUALITY_ASSURANCE = {
  validations: [
    {
      he: 'בדיקת נתונים',
      en: 'Data Validation',
      checks: [
        'Birth date format valid',
        'Names not empty',
        'Photos have adequate quality',
        'Features selected properly'
      ]
    },
    {
      he: 'בדיקת הגיון',
      en: 'Logic Validation',
      checks: [
        'Sephiroth mapping correct',
        'Element assignments valid',
        'Numerology reduction correct',
        'Palm analysis consistent'
      ]
    },
    {
      he: 'בדיקת עקביות',
      en: 'Consistency Check',
      checks: [
        'Multiple analysis types agree',
        'Kabbalistic references align',
        'Temperament matches elements',
        'Results make sense together'
      ]
    }
  ]
};
