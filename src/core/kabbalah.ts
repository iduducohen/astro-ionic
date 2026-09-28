/**
 * kabbalah.ts — ניתוח קבלי והתכתבויות בעץ החיים
 * תיאוריה כבלית עם התאמה לאסטרולוגיה
 */

export interface Sephira {
  id: string;
  name: { he: string; en: string };
  number: number;
  meaning: { he: string; en: string };
  position: { x: number; y: number };
  planets: string[];
  hebrewLetter: string;
  archangel: string;
  divineName: string;
  color: string;
  element?: string;
  world: 'Atziluth' | 'Briah' | 'Yetzirah' | 'Assiyah';
  description: { he: string; en: string };
  virtue: { he: string; en: string };
  vice: { he: string; en: string };
}

export interface KabbalahPath {
  id: string;
  number: number;
  connectsSephiroth: [string, string];
  tarotCard: number;
  hebrewLetter: string;
  meaning: { he: string; en: string };
}

// עץ החיים - 10 הספירות עם פרטים מלאים
export const SEPHIROTH: Sephira[] = [
  {
    id: 'malkuth',
    name: { he: 'מלכות', en: 'Malkuth' },
    number: 10,
    meaning: { he: 'הממלכה - עולם הפיזי', en: 'The Kingdom - physical world' },
    position: { x: 50, y: 90 },
    planets: ['Earth'],
    hebrewLetter: 'He',
    archangel: 'Sandalphon',
    divineName: 'Adonai Ha-Aretz (Lord of Earth)',
    color: 'Citrine / Olive / Russet / Black',
    world: 'Assiyah',
    description: {
      he: 'הממלכה היא הביטוי הפיזי של העץ, עולם החומר והחושים. זה הקרקע לכל חיינו היומיומי.',
      en: 'The Kingdom is the physical expression of the Tree, the world of matter and senses. It is the foundation of our daily life.'
    },
    virtue: {
      he: 'אבחנה - יכולת להבדיל בין טוב לרע בחיים הפיזיים',
      en: 'Discrimination - ability to discern good from evil in physical life'
    },
    vice: {
      he: 'אינרציה - הנחיתות הרוחנית',
      en: 'Inertia - spiritual lethargy and limitation'
    }
  },
  {
    id: 'yesod',
    name: { he: 'יסוד', en: 'Yesod' },
    number: 9,
    meaning: { he: 'היסוד - תת-הכרה ושינויים', en: 'The Foundation - subconscious' },
    position: { x: 50, y: 70 },
    planets: ['Moon'],
    hebrewLetter: 'Gimel',
    archangel: 'Gabriel',
    divineName: 'Elohim Tzabaoth (God of Hosts)',
    color: 'Purple',
    element: 'Water',
    world: 'Yetzirah',
    description: {
      he: 'יסוד הוא העמוד של התחום התת-הכרתי, של הרוח וההדמיה. זו ספירת הירח והמחזוריות.',
      en: 'Yesod is the pillar of the subconscious realm, of dreams and imagination. This is the sphere of the Moon and cycles.'
    },
    virtue: {
      he: 'דמיון - יכולה ליצור דימויים נפשיים',
      en: 'Imagination - power to create mental images'
    },
    vice: {
      he: 'אי-אמת - שקר ודיוקים במנטליות',
      en: 'Lying - falsehood and deception'
    }
  },
  {
    id: 'hod',
    name: { he: 'הוד', en: 'Hod' },
    number: 8,
    meaning: { he: 'הדר - חשיבה וקשר', en: 'Splendor - intellect and communication' },
    position: { x: 30, y: 50 },
    planets: ['Mercury'],
    hebrewLetter: 'Beth',
    archangel: 'Michael',
    divineName: 'Elohim Tzabaoth',
    color: 'Yellow',
    world: 'Yetzirah',
    description: { he: 'הוד הוא ספירת הבינה', en: 'Hod is the sphere of intellect' },
    virtue: { he: 'מדע', en: 'Science' },
    vice: { he: 'כישוף', en: 'Cunning' }
  },
  {
    id: 'netzach',
    name: { he: 'נצח', en: 'Netzach' },
    number: 7,
    meaning: { he: 'נצחון - אמוציה ויצירה', en: 'Victory - emotions and creativity' },
    position: { x: 70, y: 50 },
    planets: ['Venus'],
    hebrewLetter: 'Daleth',
    archangel: 'Haniel'
  },
  {
    id: 'tiphereth',
    name: { he: 'תפארת', en: 'Tiphereth' },
    number: 6,
    meaning: { he: 'יופי - הנשמה המרכזית', en: 'Beauty - individual soul' },
    position: { x: 50, y: 50 },
    planets: ['Sun'],
    hebrewLetter: 'Vav',
    archangel: 'Raphael',
    divineName: 'YHVH Aloah ve-Daath (God manifest in action)',
    color: 'Yellow / Gold',
    element: 'Fire/Spirit',
    world: 'Briah',
    description: {
      he: 'תפארת היא לב העץ, מרכז הנשמה וזהות האדם. זו ספירת השמש ורוח הקדש המרכזית.',
      en: 'Tiphereth is the heart of the Tree, center of the soul and human identity. This is the sphere of the Sun and central Divine Will.'
    },
    virtue: {
      he: 'כשרון עצמי - התפתחות של הנשמה האמיתית',
      en: 'Self-realization - development of true spiritual self'
    },
    vice: {
      he: 'גאווה ויהירות - ביטוי שקר של האני',
      en: 'Pride and arrogance - false expression of ego'
    }
  },
  {
    id: 'gevurah',
    name: { he: 'גבורה', en: 'Gevurah' },
    number: 5,
    meaning: { he: 'גבור - כוח וענישה', en: 'Severity - strength and discipline' },
    position: { x: 30, y: 30 },
    planets: ['Mars'],
    hebrewLetter: 'He',
    archangel: 'Samael'
  },
  {
    id: 'chesed',
    name: { he: 'חסד', en: 'Chesed' },
    number: 4,
    meaning: { he: 'חסד - הטבה וחמלה', en: 'Mercy - grace and compassion' },
    position: { x: 70, y: 30 },
    planets: ['Jupiter'],
    hebrewLetter: 'Zayin',
    archangel: 'Tzadkiel'
  },
  {
    id: 'binah',
    name: { he: 'בינה', en: 'Binah' },
    number: 3,
    meaning: { he: 'בינה - הבנה וצורה', en: 'Understanding - form and structure' },
    position: { x: 30, y: 10 },
    planets: ['Saturn'],
    hebrewLetter: 'Aleph',
    archangel: 'Cassiel'
  },
  {
    id: 'chokmah',
    name: { he: 'חכמה', en: 'Chokmah' },
    number: 2,
    meaning: { he: 'חכמה - כוח יצירה', en: 'Wisdom - creative potential' },
    position: { x: 70, y: 10 },
    planets: ['Uranus'],
    hebrewLetter: 'Yod',
    archangel: 'Ratziel'
  },
  {
    id: 'keter',
    name: { he: 'כתר', en: 'Keter' },
    number: 1,
    meaning: { he: 'כתר - אלוהות', en: 'Crown - divine unity' },
    position: { x: 50, y: -10 },
    planets: [],
    hebrewLetter: 'Shin',
    archangel: 'Metatron',
    divineName: 'Eheieh (I Am)',
    color: 'White / Brilliance',
    world: 'Atziluth',
    description: {
      he: 'כתר היא ספירה הראשונה, אור אלוהי טהור, מעבר לכל הבנה ממנית. זו הנקודה שממנה זורמים כל הקיום.',
      en: 'Keter is the first sphere, pure divine light beyond all understanding. It is the source from which all existence flows.'
    },
    virtue: {
      he: 'השגה עליונה - איחוד עם האלוהות',
      en: 'Attainment of the highest - union with Divinity'
    },
    vice: {
      he: 'אין היפך - כתר אינה בגדר טוב או רע',
      en: 'None - Keter transcends duality'
    }
  }
];

// נתיבים קבליים - 22 נתיבים בין הספירות
export const PATHS: KabbalahPath[] = [
  {
    id: 'path-11',
    number: 11,
    connectsSephiroth: ['chokmah', 'keter'],
    tarotCard: 0,
    hebrewLetter: 'Aleph',
    meaning: { he: 'מסע התחלתי', en: 'Initial journey' }
  },
  {
    id: 'path-12',
    number: 12,
    connectsSephiroth: ['binah', 'keter'],
    tarotCard: 1,
    hebrewLetter: 'Beth',
    meaning: { he: 'כוח הקוסם', en: 'Magician\'s power' }
  },
  {
    id: 'path-13',
    number: 13,
    connectsSephiroth: ['chokmah', 'binah'],
    tarotCard: 2,
    hebrewLetter: 'Gimel',
    meaning: { he: 'הנוכחות הגבוהה', en: 'High priestess' }
  },
  {
    id: 'path-14',
    number: 14,
    connectsSephiroth: ['chokmah', 'chesed'],
    tarotCard: 3,
    hebrewLetter: 'Daleth',
    meaning: { he: 'יצירה אלהית', en: 'Divine creation' }
  },
  {
    id: 'path-15',
    number: 15,
    connectsSephiroth: ['chokmah', 'gevurah'],
    tarotCard: 4,
    hebrewLetter: 'He',
    meaning: { he: 'כוח הסמכות', en: 'Authority power' }
  },
];

export interface NumerologyProfile {
  destinyNumber: number;
  lifePathNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  meaning: { he: string; en: string };
}

/**
 * חישוב מספרים נומרולוגיים
 */
export function calculateNumerology(birthDate: string): NumerologyProfile {
  // פורמט: YYYY-MM-DD
  const [year, month, day] = birthDate.split('-').map(Number);

  const reduce = (num: number): number => {
    while (num > 9) {
      num = Math.floor(num / 10) + (num % 10);
    }
    return num;
  };

  const dayNum = reduce(day);
  const monthNum = reduce(month);
  const yearNum = reduce(year);

  const lifePathNumber = reduce(dayNum + monthNum + yearNum);
  const destinyNumber = lifePathNumber; // בפשטות
  const personalityNumber = reduce(monthNum + dayNum);

  const soulUrgeNumber = reduce(monthNum + dayNum);

  return {
    destinyNumber,
    lifePathNumber,
    soulUrgeNumber,
    personalityNumber,
    meaning: {
      he: `דרך החיים שלך מספר ${lifePathNumber}`,
      en: `Your life path number is ${lifePathNumber}`
    }
  };
}

/**
 * מיפוי כוכבים לספירות
 */
export const PLANETARY_SEPHIROTH: Record<string, string> = {
  'Sun': 'tiphereth',
  'Moon': 'yesod',
  'Mercury': 'hod',
  'Venus': 'netzach',
  'Mars': 'gevurah',
  'Jupiter': 'chesed',
  'Saturn': 'binah',
  'Uranus': 'chokmah',
  'Neptune': 'yesod',
  'Pluto': 'gevurah'
};

/**
 * קבלי פירוש כוכבים בבית
 */
export function interpretPlanetInSephira(planet: string, sephiraId: string): { he: string; en: string } {
  const sephira = SEPHIROTH.find(s => s.id === sephiraId);
  if (!sephira) return { he: 'לא ידוע', en: 'Unknown' };

  const meanings: Record<string, Record<string, { he: string; en: string }>> = {
    'Sun': {
      'tiphereth': { he: 'זהירות נפש וייצוג עצמי מושלם', en: 'Soul consciousness and perfect self-expression' },
      'chokmah': { he: 'יצירה רוחנית ועוצמה דינמית', en: 'Spiritual creation and dynamic power' }
    },
    'Moon': {
      'yesod': { he: 'חיבור עמוק להשכל תת-הכרתי', en: 'Deep connection to subconscious wisdom' },
      'netzach': { he: 'רגישות רגשית וחיוביות', en: 'Emotional sensitivity and positivity' }
    },
    // ... עוד מיפויים
  };

  return meanings[planet]?.[sephiraId] || {
    he: `${planet} ב${sephira.name.he}`,
    en: `${planet} in ${sephira.name.en}`
  };
}

export function getSephiraById(id: string): Sephira | undefined {
  return SEPHIROTH.find(s => s.id === id);
}

export function getPathByNumber(num: number): KabbalahPath | undefined {
  return PATHS.find(p => p.number === num);
}

/**
 * Four Worlds of Kabbalah
 */
export interface World {
  id: string;
  name: { he: string; en: string };
  meaning: { he: string; en: string };
  sephiroth: string[];
  description: { he: string; en: string };
}

export const FOUR_WORLDS: World[] = [
  {
    id: 'atziluth',
    name: { he: 'עצילות', en: 'Atziluth' },
    meaning: { he: 'עולם הפליטות - האל הטהור', en: 'World of Emanation - Pure Godhead' },
    sephiroth: ['keter', 'chokmah', 'binah'],
    description: {
      he: 'עצילות היא העולם העליון ביותר, עולם של אלוהות טהורה וקיום קדום. כאן שוכנת חוכמה עליונה ואור אלוהי בלתי מוגבל.',
      en: 'Atziluth is the highest world, realm of pure Divinity and archetypal existence. Here resides supreme wisdom and unlimited divine light.'
    }
  },
  {
    id: 'briah',
    name: { he: 'בריאה', en: 'Briah' },
    meaning: { he: 'עולם הבריאה - תעודות אלוהיות', en: 'World of Creation - Divine Intellect' },
    sephiroth: ['chokmah', 'binah', 'chesed', 'gevurah', 'tiphereth'],
    description: {
      he: 'בריאה היא עולם הרוח, בו תעודות אלוהיות וארכטיפים של חוכמה הם בני קיום. זה עולם של אינטליגנציה טהורה.',
      en: 'Briah is the world of pure spirit, where divine ideas and archetypes exist. This is the realm of pure intellect and celestial forms.'
    }
  },
  {
    id: 'yetzirah',
    name: { he: 'יצירה', en: 'Yetzirah' },
    meaning: { he: 'עולם היצירה - תבניות פסיכולוגיות', en: 'World of Formation - Psychological Patterns' },
    sephiroth: ['chokmah', 'chesed', 'gevurah', 'tiphereth', 'netzach', 'hod', 'yesod'],
    description: {
      he: 'יצירה היא עולם הנשמות, הרוח, הדמיון ותבניות נפשיות. כאן שוכנים האנג\'לים וגופים אסטרליים של בני אדם.',
      en: 'Yetzirah is the world of souls, spirit, imagination and psychological forms. Angels and astral bodies of humans dwell here.'
    }
  },
  {
    id: 'assiyah',
    name: { he: 'עשייה', en: 'Assiyah' },
    meaning: { he: 'עולם העשייה - החומר והפיזיקה', en: 'World of Action - Matter and Physics' },
    sephiroth: ['malkuth'],
    description: {
      he: 'עשייה היא העולם הנמוך ביותר, עולם החומר, הגופים הפיזיים ויקום הטבע. זהו החיים היומיומיים שלנו.',
      en: 'Assiyah is the lowest world, realm of matter, physical bodies and natural universe. This is our everyday physical life.'
    }
  }
];

/**
 * Gematria - Hebrew letter numerological values
 */
export const GEMATRIA: Record<string, number> = {
  'Aleph': 1,
  'Beth': 2,
  'Gimel': 3,
  'Daleth': 4,
  'He': 5,
  'Vav': 6,
  'Zayin': 7,
  'Cheth': 8,
  'Teth': 9,
  'Yod': 10,
  'Kaph': 20,
  'Lamed': 30,
  'Mem': 40,
  'Nun': 50,
  'Samekh': 60,
  'Ayin': 70,
  'Pe': 80,
  'Tsade': 90,
  'Qoph': 100,
  'Resh': 200,
  'Shin': 300,
  'Tav': 400
};

/**
 * Calculate Gematria value of Hebrew word
 */
export function calculateGematria(hebrewWord: string): number {
  return 0; // Implementation would parse Hebrew text
}

/**
 * Get Four Worlds
 */
export function getWorld(worldId: string): World | undefined {
  return FOUR_WORLDS.find(w => w.id === worldId);
}

/**
 * Get all Sephiroth in a specific world
 */
export function getSephirothByWorld(worldId: string): Sephira[] {
  const world = getWorld(worldId);
  if (!world) return [];
  return SEPHIROTH.filter(s => world.sephiroth.includes(s.id));
}

/**
 * Kabbalistic interpretation of birth chart
 */
export interface KabbalahChartInterpretation {
  sunSephira: string;
  moonSephira: string;
  ascendantSephira: string;
  dominantWorld: string;
  spiritualPath: { he: string; en: string };
}

export function interpretChartKabbalistically(
  sunSign: string,
  moonSign: string,
  ascendantSign: string
): KabbalahChartInterpretation {
  // Map zodiac signs to Sephiroth through planetary rulerships
  const signToSephira: Record<string, string> = {
    'Aries': 'gevurah',
    'Taurus': 'netzach',
    'Gemini': 'hod',
    'Cancer': 'yesoid',
    'Leo': 'tiphereth',
    'Virgo': 'hod',
    'Libra': 'netzach',
    'Scorpio': 'gevurah',
    'Sagittarius': 'chesed',
    'Capricorn': 'binah',
    'Aquarius': 'chokmah',
    'Pisces': 'yesoid'
  };

  const sunSephira = signToSephira[sunSign] || 'tiphereth';
  const moonSephira = signToSephira[moonSign] || 'yesoid';
  const ascendantSephira = signToSephira[ascendantSign] || 'malkuth';

  const worlds = [ascendantSephira, moonSephira, sunSephira]
    .map(id => SEPHIROTH.find(s => s.id === id)?.world)
    .filter(Boolean) as string[];

  const dominantWorld = worlds[0] || 'Assiyah';

  return {
    sunSephira,
    moonSephira,
    ascendantSephira,
    dominantWorld,
    spiritualPath: {
      he: `דרך קבלית של ${sunSign} בשמש וכהנה בירח`,
      en: `Kabbalistic path of ${sunSign} Sun with ${moonSign} Moon`
    }
  };
}
