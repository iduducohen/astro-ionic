/**
 * tarot-data.ts — ספרת הטאָרוט המלאה עם פירושים מיסטיים ותרגומים
 */

export interface TarotCard {
  id: string;
  name: { he: string; en: string };
  number: number;
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  arcana: 'major' | 'minor';
  meaning: { he: string; en: string };
  reversedMeaning: { he: string; en: string };
  kabbalah: {
    sephira?: string;
    path?: string;
    hebrewLetter?: string;
  };
  astrology: {
    sign?: string;
    planet?: string;
    element?: string;
  };
  numerology: number;
}

export const TAROT_CARDS: TarotCard[] = [
  // Major Arcana - המלך הגדול
  {
    id: 'the-fool',
    name: { he: 'השוטה', en: 'The Fool' },
    number: 0,
    arcana: 'major',
    meaning: {
      he: 'התחלה, אמונה, דלגה לאל הידוע. ייצוג של אדם שמוכן לצאת למסע אסטרולוגי עמוק',
      en: 'New beginnings, faith, taking a leap into the unknown. Ready for spiritual journey.'
    },
    reversedMeaning: {
      he: 'התנדנדות, חוסר חשיבה, סכנה',
      en: 'Indecision, recklessness, naivety'
    },
    kabbalah: {
      sephira: 'Chokmah to Malkuth',
      path: '11',
      hebrewLetter: 'Aleph'
    },
    astrology: { planet: 'Uranus', element: 'Air' },
    numerology: 0
  },

  {
    id: 'the-magician',
    name: { he: 'הקוסם', en: 'The Magician' },
    number: 1,
    arcana: 'major',
    meaning: {
      he: 'כוח, כושר, בעלות על כלים. יכולת לממש משימות אסטרולוגיות ופעולות מודעות',
      en: 'Power, skill, mastery. Ability to manifest desires and take conscious action.'
    },
    reversedMeaning: {
      he: 'תחכום, התמרמרות, מיומנות שלילית',
      en: 'Manipulation, cunning, misuse of power'
    },
    kabbalah: {
      sephira: 'Binah',
      path: '12',
      hebrewLetter: 'Beth'
    },
    astrology: { planet: 'Mercury', element: 'Air' },
    numerology: 1
  },

  {
    id: 'the-high-priestess',
    name: { he: 'הכוהנת הגבוהה', en: 'The High Priestess' },
    number: 2,
    arcana: 'major',
    meaning: {
      he: 'ידע סתום, אינטואיציה, אל הנשמע. הקשר לתת-הכרה וחוכמה פנימית',
      en: 'Secret knowledge, intuition, the subconscious. Connection to inner wisdom.'
    },
    reversedMeaning: {
      he: 'אי-זיכרון, התעלמות מחושים, חוסר כושר',
      en: 'Ignorance, suppressed intuition, lack of clarity'
    },
    kabbalah: {
      sephira: 'Chokmah',
      path: '13',
      hebrewLetter: 'Gimel'
    },
    astrology: { planet: 'Moon', element: 'Water' },
    numerology: 2
  },

  {
    id: 'the-empress',
    name: { he: 'הקיסרית', en: 'The Empress' },
    number: 3,
    arcana: 'major',
    meaning: {
      he: 'פקודות, יצירה, טבע, שפע. אנרגיה נשית ומהווה, פוריות והרבייה',
      en: 'Fertility, creativity, nature, abundance. Divine feminine energy.'
    },
    reversedMeaning: {
      he: 'בדלנות, עיכול, שללנות',
      en: 'Sterility, dependence, infertility'
    },
    kabbalah: {
      sephira: 'Binah',
      path: '14',
      hebrewLetter: 'Daleth'
    },
    astrology: { planet: 'Venus', element: 'Earth' },
    numerology: 3
  },

  {
    id: 'the-emperor',
    name: { he: 'הקיסר', en: 'The Emperor' },
    number: 4,
    arcana: 'major',
    meaning: {
      he: 'סמכות, מנהיגות, כוח גברי. שליטה, חזקות ותוקף בחיים',
      en: 'Authority, leadership, masculine power. Control and strength.'
    },
    reversedMeaning: {
      he: 'חולשה, התרסה, נכשל',
      en: 'Weakness, tyrant, impotence'
    },
    kabbalah: {
      sephira: 'Chokmah',
      path: '15',
      hebrewLetter: 'He'
    },
    astrology: { planet: 'Mars', sign: 'Aries', element: 'Fire' },
    numerology: 4
  },

  {
    id: 'the-hierophant',
    name: { he: 'הדוכן הגדול', en: 'The Hierophant' },
    number: 5,
    arcana: 'major',
    meaning: {
      he: 'דת, מסורת, חוכמת זקנים. הדרכה רוחנית וחכמה מסורתית',
      en: 'Spirituality, tradition, wisdom. Guidance and religious instruction.'
    },
    reversedMeaning: {
      he: 'סרבנות, אי-הכנה, סטייה מהדרך',
      en: 'Unorthodoxy, resistance, nonconformity'
    },
    kabbalah: {
      sephira: 'Chokmah',
      path: '16',
      hebrewLetter: 'Vav'
    },
    astrology: { planet: 'Jupiter', sign: 'Taurus', element: 'Earth' },
    numerology: 5
  },

  {
    id: 'the-lovers',
    name: { he: 'האוהבים', en: 'The Lovers' },
    number: 6,
    arcana: 'major',
    meaning: {
      he: 'אהבה, בחירה, הרמוניה. קשרים משמעותיים וחלטות לבבות',
      en: 'Love, choice, harmony. Meaningful relationships and heart decisions.'
    },
    reversedMeaning: {
      he: 'מתח, נתק, רחוקות',
      en: 'Conflict, separation, distance'
    },
    kabbalah: {
      sephira: 'Binah',
      path: '17',
      hebrewLetter: 'Zayin'
    },
    astrology: { planet: 'Mercury', sign: 'Gemini', element: 'Air' },
    numerology: 6
  },

  {
    id: 'the-chariot',
    name: { he: 'הרכב', en: 'The Chariot' },
    number: 7,
    arcana: 'major',
    meaning: {
      he: 'כוח, נצחון, קדימה. שליטה ניצחת והתגבלות על מכשולים',
      en: 'Power, victory, momentum. Control and overcoming obstacles.'
    },
    reversedMeaning: {
      he: 'פגם, חוסר בקרה, נתיבה רעה',
      en: 'Conflict, loss of control, bad direction'
    },
    kabbalah: {
      sephira: 'Gevurah',
      path: '18',
      hebrewLetter: 'Cheth'
    },
    astrology: { planet: 'Mars', sign: 'Cancer', element: 'Water' },
    numerology: 7
  },

  {
    id: 'strength',
    name: { he: 'החוזק', en: 'Strength' },
    number: 8,
    arcana: 'major',
    meaning: {
      he: 'חוזק פנימי, סבלנות, התמדה. כוח אמיתי דרך שליטה ברוח',
      en: 'Inner strength, patience, perseverance. True power through self-control.'
    },
    reversedMeaning: {
      he: 'חולשה, עייפות, חוסר אונים',
      en: 'Weakness, doubt, insecurity'
    },
    kabbalah: {
      sephira: 'Gevurah',
      path: '19',
      hebrewLetter: 'Teth'
    },
    astrology: { planet: 'Venus', sign: 'Leo', element: 'Fire' },
    numerology: 8
  },

  {
    id: 'the-hermit',
    name: { he: 'הנזיר', en: 'The Hermit' },
    number: 9,
    arcana: 'major',
    meaning: {
      he: 'התבודדות, חיפוש פנימי, תבונה. זמן להיות לבדך ולהתהלך עם עצמך',
      en: 'Solitude, inner quest, wisdom. Time for introspection and self-discovery.'
    },
    reversedMeaning: {
      he: 'בדידות, אי-בשר, הימנעות מקרוב',
      en: 'Loneliness, isolation, withdrawal'
    },
    kabbalah: {
      sephira: 'Tiphereth',
      path: '20',
      hebrewLetter: 'Yod'
    },
    astrology: { planet: 'Mercury', sign: 'Virgo', element: 'Earth' },
    numerology: 9
  },

  {
    id: 'wheel-of-fortune',
    name: { he: 'גלגל המזל', en: 'Wheel of Fortune' },
    number: 10,
    arcana: 'major',
    meaning: {
      he: 'גורל, תנועה, מחזור. תנועות חיים הטבעיות וגלגל הקרמה',
      en: 'Fate, cycles, destiny. Life\'s natural rhythms and karma\'s wheel.'
    },
    reversedMeaning: {
      he: 'דרך עלומה, חוסר יציבות, מפגעים',
      en: 'Bad luck, misfortune, sudden change'
    },
    kabbalah: {
      sephira: 'Chokmah',
      path: '21',
      hebrewLetter: 'Kaph'
    },
    astrology: { planet: 'Jupiter', element: 'Fire' },
    numerology: 1
  },
];

export const getTarotCard = (id: string): TarotCard | undefined =>
  TAROT_CARDS.find((c) => c.id === id);

export const getTarotByNumber = (num: number): TarotCard | undefined =>
  TAROT_CARDS.find((c) => c.number === num);

export const getMajorArcana = (): TarotCard[] =>
  TAROT_CARDS.filter((c) => c.arcana === 'major');

export const getMinorArcana = (): TarotCard[] =>
  TAROT_CARDS.filter((c) => c.arcana === 'minor');
