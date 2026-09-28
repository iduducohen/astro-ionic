/**
 * life-areas.ts — פירוט המפה האישית לפי תחומי חיים:
 * אישיות, קריירה, כסף, אהבה, בריאות, חוזקות ואתגרים — לפי המזל המערבי,
 * בתוספת דרך החיים (קריירה וזוגיות), מזלות וחיות מתאימים, ויום המזל.
 */
import { CHINESE_ANIMALS, ZODIAC, reduceNumber, type L, type Profile } from './astro.ts';

const x = (he: string, en: string): L => ({ he, en });
interface SignAreas { career: L; money: L; love: L; health: L; strengths: L; challenges: L }

export const SIGN_AREAS: Record<string, SignAreas> = {
  aries: {
    career: x('מתאים לתפקידים של הובלה, יזמות ותחרות: ניהול, מכירות, ספורט, חירום וביטחון. פורח כשיש אתגר ותוצאה מהירה.', 'Suited to leading, entrepreneurial, competitive roles: management, sales, sport, emergency services. Thrives on challenge and quick results.'),
    money: x('מרוויח מהר ומוציא מהר. כדאי לבנות הרגל של חיסכון אוטומטי ולא להחליט על השקעות בדחף.', 'Earns fast and spends fast. Build an automatic saving habit and avoid impulse investing.'),
    love: x('מחזר ישיר ונלהב שאוהב את ההתחלה. צריך בן/בת זוג עם אנרגיה ועצמאות, שלא ייבהלו מהלהט.', 'A direct, passionate pursuer who loves beginnings. Needs a partner with energy and independence who isn\'t scared by the fire.'),
    health: x('אנרגיה גבוהה שצריכה פורקן — ספורט אינטנסיבי מתאים. במסורת: הראש והפנים; לשים לב לכאבי ראש ולחץ.', 'High energy needing release — intense sport suits. Traditionally the head and face; watch for headaches and stress.'),
    strengths: x('אומץ, יוזמה, כנות ויכולת להתחיל מחדש.', 'Courage, initiative, honesty and the ability to start over.'),
    challenges: x('חוסר סבלנות, כעס מהיר והתחלות בלי סיום.', 'Impatience, quick anger and starting without finishing.'),
  },
  taurus: {
    career: x('טוב בכל מה שבונה ערך לאורך זמן: פיננסים, נדל״ן, אוכל, עיצוב, אומנות וחקלאות. מעדיף יציבות על פני הימור.', 'Good at building lasting value: finance, real estate, food, design, art and agriculture. Prefers stability over gambling.'),
    money: x('חוסך טבעי שאוהב ביטחון כלכלי ודברים איכותיים. הסכנה — להיאחז במה שיש ולפספס הזדמנויות.', 'A natural saver who loves financial security and quality things. The risk — clinging to what you have and missing chances.'),
    love: x('נאמן, חושני ויציב. בונה קשר לאט אבל לטווח ארוך; צריך ביטחון, מגע ותשומת לב קבועה.', 'Loyal, sensual and steady. Builds slowly but for the long term; needs security, touch and steady attention.'),
    health: x('גוף חזק שנהנה מאוכל טוב — כדאי לשמור על תנועה. במסורת: הצוואר והגרון.', 'A strong body that enjoys good food — keep moving. Traditionally the neck and throat.'),
    strengths: x('התמדה, אמינות, סבלנות וחוש יופי.', 'Persistence, reliability, patience and a sense of beauty.'),
    challenges: x('עקשנות, קושי עם שינויים וקנאות לרכוש.', 'Stubbornness, difficulty with change and possessiveness.'),
  },
  gemini: {
    career: x('תקשורת, כתיבה, הוראה, שיווק, מסחר ומדיה. זקוק לגיוון ולאנשים; משעמם לו בשגרה חוזרת.', 'Communication, writing, teaching, marketing, trade and media. Needs variety and people; routine bores him.'),
    money: x('מוצא הזדמנויות רבות במקביל, אבל מתפזר. כדאי לרכז מקורות הכנסה ולעקוב אחרי הוצאות קטנות.', 'Finds many parallel opportunities but scatters. Concentrate income sources and track small expenses.'),
    love: x('צריך בן/בת זוג שהוא גם חבר ושיחה טובה. שעמום הוא האויב — סקרנות וצחוק מחזיקים את הקשר.', 'Needs a partner who is also a friend and good conversation. Boredom is the enemy — curiosity and laughter keep it alive.'),
    health: x('מערכת עצבים רגישה ומחשבות שרצות — חשובים שינה, נשימה והפסקות. במסורת: הידיים, הכתפיים והריאות.', 'A sensitive nervous system and racing thoughts — sleep, breathing and breaks matter. Traditionally hands, shoulders and lungs.'),
    strengths: x('שנינות, גמישות, סקרנות ותקשורת מצוינת.', 'Wit, flexibility, curiosity and excellent communication.'),
    challenges: x('פיזור, חוסר עקביות וקושי להעמיק.', 'Scattering, inconsistency and difficulty going deep.'),
  },
  cancer: {
    career: x('תחומים של טיפול, חינוך, בריאות, אוכל, נדל״ן ומשאבי אנוש. עובד הכי טוב בסביבה שמרגישה כמו משפחה.', 'Care, education, health, food, real estate and HR. Works best in a family-like environment.'),
    money: x('חוסך למען הביטחון של הבית. אינטואיציה טובה לכסף, אבל פחד עלול לעצור השקעה נכונה.', 'Saves for home security. Good money intuition, but fear may block a sound investment.'),
    love: x('אוהב עמוק, מגונן ומשפחתי. צריך ביטחון רגשי ומחויבות; פגיעות מסתתרת מאחורי שריון.', 'Loves deeply, protective and family-minded. Needs emotional security and commitment; vulnerability hides behind armour.'),
    health: x('הרגש משפיע ישירות על הגוף, במיוחד על העיכול. במסורת: הקיבה והחזה. חשוב לעבד רגשות ולא לבלוע אותם.', 'Emotions affect the body directly, especially digestion. Traditionally stomach and chest. Process feelings rather than swallow them.'),
    strengths: x('רגישות, נאמנות, אינטואיציה ודאגה לאחרים.', 'Sensitivity, loyalty, intuition and care for others.'),
    challenges: x('מצבי רוח, היאחזות בעבר ונטייה להיעלב.', 'Moodiness, clinging to the past and taking offence.'),
  },
  leo: {
    career: x('במה, ניהול, יצירה ובידור, חינוך ופוליטיקה. צריך מקום להוביל, להופיע ולקבל הכרה.', 'The stage, management, creativity, entertainment, education and politics. Needs room to lead, perform and be recognised.'),
    money: x('נדיב ואוהב איכות וראוותנות. כדאי לתכנן כדי שהנדיבות לא תהפוך לבזבוז.', 'Generous and loves quality and flair. Plan so generosity doesn\'t become waste.'),
    love: x('רומנטי, חם ונאמן מאוד. צריך הערכה, מחמאות והרבה תשומת לב — ונותן את אותו הדבר בחזרה.', 'Romantic, warm and very loyal. Needs appreciation, compliments and attention — and gives the same back.'),
    health: x('חיוניות גבוהה ולב גדול, פשוטו כמשמעו: במסורת הלב והגב. חשוב פעילות לבבית ולנוח כשצריך.', 'High vitality and a big heart, literally: traditionally heart and back. Cardio matters, and rest when needed.'),
    strengths: x('ביטחון, נדיבות, כריזמה ויצירתיות.', 'Confidence, generosity, charisma and creativity.'),
    challenges: x('גאווה, צורך בהכרה ודרמטיות.', 'Pride, need for recognition and drama.'),
  },
  virgo: {
    career: x('דיוק וסדר: רפואה, מחקר, ניתוח נתונים, עריכה, הנהלת חשבונות ושירות. מצטיין בשיפור מערכות.', 'Precision and order: medicine, research, data analysis, editing, accounting and service. Excels at improving systems.'),
    money: x('מתכנן, חוסך ובודק כל פרט. הסכנה היחידה — דאגה מוגזמת שמונעת ליהנות מהכסף.', 'Plans, saves and checks every detail. The only risk — excessive worry that prevents enjoying money.'),
    love: x('מראה אהבה דרך מעשים ועזרה מעשית. צריך קשר רגוע ונקי מדרמה; לומד להרפות מביקורת.', 'Shows love through deeds and practical help. Needs a calm, drama-free bond; learning to let go of criticism.'),
    health: x('מודעות גבוהה לבריאות ולתזונה. במסורת: מערכת העיכול. דאגה ולחץ עלולים להתבטא בגוף.', 'High health and nutrition awareness. Traditionally the digestive system. Worry may show in the body.'),
    strengths: x('דיוק, אחריות, צניעות ורצון לעזור.', 'Precision, responsibility, modesty and helpfulness.'),
    challenges: x('פרפקציוניזם, ביקורתיות ודאגנות.', 'Perfectionism, criticism and worry.'),
  },
  libra: {
    career: x('משפט, גישור, עיצוב, אופנה, יחסי ציבור ודיפלומטיה. עובד הכי טוב בשותפות ובסביבה אסתטית.', 'Law, mediation, design, fashion, PR and diplomacy. Works best in partnership and a beautiful setting.'),
    money: x('אוהב יופי ונוחות ומוכן להשקיע בהם. כדאי להחליט על תקציב ולא להשאיר החלטות כספיות "לאחר כך".', 'Loves beauty and comfort and invests in them. Set a budget and don\'t leave money decisions "for later".'),
    love: x('זוגיות היא מרכז החיים. רומנטי, מתחשב ומחפש הרמוניה; צריך לזכור לבטא גם את הצרכים שלו.', 'Partnership is central. Romantic, considerate and seeking harmony; must remember to voice his own needs too.'),
    health: x('איזון הוא המפתח — שינה, אוכל ומנוחה. במסורת: הכליות והגב התחתון.', 'Balance is key — sleep, food and rest. Traditionally the kidneys and lower back.'),
    strengths: x('הוגנות, חן, דיפלומטיה וחוש אסתטי.', 'Fairness, grace, diplomacy and aesthetic sense.'),
    challenges: x('התלבטות, רצון לרצות והימנעות מעימות.', 'Indecision, people-pleasing and avoiding conflict.'),
  },
  scorpio: {
    career: x('עומק ומחקר: פסיכולוגיה, בילוש, מחקר, רפואה, פיננסים ומשברים. מצטיין במה שאחרים מפחדים לגעת בו.', 'Depth and investigation: psychology, detection, research, medicine, finance and crisis. Excels where others fear to tread.'),
    money: x('אסטרטג כלכלי עם חוש לכסף משותף, השקעות וירושות. שומר קלפים קרוב לחזה.', 'A financial strategist with a sense for shared money, investments and inheritance. Keeps cards close.'),
    love: x('אוהב בעוצמה, בנאמנות מוחלטת ובתשוקה. צריך אמון מלא; קנאה ושליטה הן המבחן שלו.', 'Loves intensely, with total loyalty and passion. Needs full trust; jealousy and control are his test.'),
    health: x('כוח התאוששות מרשים. במסורת: מערכת הרבייה וההפרשה. חשוב לשחרר רגשות כבדים ולא לאגור אותם.', 'Impressive recovery power. Traditionally reproductive and excretory systems. Release heavy feelings rather than hoard them.'),
    strengths: x('עומק, נחישות, נאמנות ואינטואיציה חדה.', 'Depth, determination, loyalty and sharp intuition.'),
    challenges: x('קנאה, חשדנות ונטייה לנקום.', 'Jealousy, suspicion and vindictiveness.'),
  },
  sagittarius: {
    career: x('השכלה, הוראה, תיירות, משפט, פילוסופיה, פרסום והוצאה לאור. צריך חופש, משמעות ומרחב.', 'Higher education, teaching, travel, law, philosophy, publishing. Needs freedom, meaning and space.'),
    money: x('אופטימי ונדיב — לפעמים יותר מדי. מזל טוב בכסף, אבל כדאי לבנות רשת ביטחון.', 'Optimistic and generous — sometimes too much. Lucky with money, but build a safety net.'),
    love: x('צריך בן/בת זוג שהוא גם שותף להרפתקאות. כן, מצחיק וחופשי; מחויבות מגיעה כשיש מרחב.', 'Needs a partner who shares adventures. Honest, funny and free; commitment comes when there is space.'),
    health: x('אוהב תנועה וחוץ. במסורת: הירכיים והכבד — כדאי להיזהר מהגזמות באוכל ובשתייה.', 'Loves movement and the outdoors. Traditionally hips and liver — beware excess food and drink.'),
    strengths: x('אופטימיות, כנות, חזון ואהבת חופש.', 'Optimism, honesty, vision and love of freedom.'),
    challenges: x('חוסר טקט, פזרנות וקושי במחויבות.', 'Tactlessness, extravagance and trouble committing.'),
  },
  capricorn: {
    career: x('ניהול, הנדסה, פיננסים, ממשל ועסקים. בונה קריירה בסבלנות, שלב אחר שלב, עד לפסגה.', 'Management, engineering, finance, government and business. Builds a career patiently, step by step, to the top.'),
    money: x('הכי אחראי בגלגל: מתכנן לטווח ארוך, חוסך ומשקיע בחוכמה. לזכור גם ליהנות ממה שנבנה.', 'The most responsible on the wheel: plans long-term, saves and invests wisely. Remember to enjoy what you build.'),
    love: x('רציני ונאמן, מראה אהבה דרך אחריות ויציבות. נפתח לאט, אבל כשכבר מחויב — זה לתמיד.', 'Serious and loyal, shows love through responsibility and stability. Opens slowly, but once committed — it\'s for good.'),
    health: x('סיבולת גבוהה ועבודה קשה. במסורת: העצמות, המפרקים והברכיים. חשוב לנוח ולא רק לעבוד.', 'High endurance and hard work. Traditionally bones, joints and knees. Rest, don\'t only work.'),
    strengths: x('משמעת, אחריות, שאפתנות וסבלנות.', 'Discipline, responsibility, ambition and patience.'),
    challenges: x('קשיחות, פסימיות ומכורות לעבודה.', 'Rigidity, pessimism and workaholism.'),
  },
  aquarius: {
    career: x('טכנולוגיה, מדע, חדשנות, מגזר חברתי וארגונים. צריך חופש מחשבתי ומטרה שמשנה משהו בעולם.', 'Technology, science, innovation, social causes and organisations. Needs intellectual freedom and a world-changing aim.'),
    money: x('לא מונע מכסף אלא מרעיונות — ודווקא רעיונות מקוריים יכולים להפוך לרווח. כדאי מסגרת פשוטה לניהול.', 'Driven by ideas, not money — yet original ideas can become profit. A simple management framework helps.'),
    love: x('חבר קודם כול. צריך בן/בת זוג שמכבד את העצמאות ואת הייחודיות שלו. מביע רגש בדרכים לא שגרתיות.', 'A friend first. Needs a partner who respects independence and uniqueness. Expresses feeling unconventionally.'),
    health: x('ראש שלא עוצר. במסורת: השוקיים ומחזור הדם. תנועה ויציאה מהמסך חשובות.', 'A mind that never stops. Traditionally calves and circulation. Movement and screen breaks matter.'),
    strengths: x('מקוריות, חזון, הומניות ועצמאות.', 'Originality, vision, humanity and independence.'),
    challenges: x('ריחוק רגשי, עקשנות רעיונית ומרדנות.', 'Emotional distance, ideological stubbornness and rebelliousness.'),
  },
  pisces: {
    career: x('אמנות, מוזיקה, טיפול, רוחניות, רפואה ועבודה עם אנשים. מצליח כשיש משמעות ומקום לדמיון.', 'Art, music, therapy, spirituality, medicine and people work. Succeeds with meaning and room for imagination.'),
    money: x('נדיב ולא תמיד מעשי בכסף. כדאי להיעזר במישהו מסודר ולהגדיר גבולות לנתינה.', 'Generous and not always practical with money. Get an organised helper and set limits on giving.'),
    love: x('רומנטי, רגיש ומוסר את עצמו לגמרי. צריך קשר רוחני ועמוק — ולהיזהר מהתאהבות באידיאל ולא באדם.', 'Romantic, sensitive and gives completely. Needs a deep, spiritual bond — and must beware loving an ideal rather than a person.'),
    health: x('רגיש מאוד לסביבה ולאנרגיות. במסורת: כפות הרגליים ומערכת החיסון. מים, מנוחה ומוזיקה מרפאים.', 'Very sensitive to surroundings. Traditionally feet and immune system. Water, rest and music heal.'),
    strengths: x('חמלה, דמיון, אינטואיציה ורוחניות.', 'Compassion, imagination, intuition and spirituality.'),
    challenges: x('בריחה מהמציאות, קושי בגבולות והקרבה עצמית.', 'Escapism, weak boundaries and self-sacrifice.'),
  },
};

export const LIFE_PATH_AREAS: Record<number, { career: L; love: L }> = {
  1: { career: x('עצמאות, יזמות ותפקידי הובלה.', 'Independence, entrepreneurship and leadership.'), love: x('צריך קשר שמכבד את העצמאות שלו.', 'Needs a bond that respects independence.') },
  2: { career: x('שיתופי פעולה, גישור, ייעוץ ותמיכה.', 'Cooperation, mediation, counselling and support.'), love: x('זוגיות היא עוגן; רגיש מאוד לאווירה בקשר.', 'Partnership is an anchor; very sensitive to the mood of the bond.') },
  3: { career: x('יצירה, כתיבה, במה, שיווק ותקשורת.', 'Creativity, writing, stage, marketing and media.'), love: x('צריך שמחה, הומור וביטוי רגשי.', 'Needs joy, humour and emotional expression.') },
  4: { career: x('בנייה, הנדסה, ארגון, פיננסים ומלאכה.', 'Building, engineering, organisation, finance and craft.'), love: x('נאמנות ויציבות לפני הכול.', 'Loyalty and stability above all.') },
  5: { career: x('מכירות, תיירות, מדיה ושינוי מתמיד.', 'Sales, travel, media and constant change.'), love: x('צריך הרפתקה, חופש וגיוון בקשר.', 'Needs adventure, freedom and variety.') },
  6: { career: x('חינוך, טיפול, רפואה, עיצוב ושירות.', 'Education, care, medicine, design and service.'), love: x('משפחתי ומחויב; נותן הרבה — ולומד גם לקבל.', 'Family-minded and committed; gives much — learning to receive.') },
  7: { career: x('מחקר, מדע, טכנולוגיה, רוחניות וכתיבה.', 'Research, science, technology, spirituality and writing.'), love: x('צריך עומק, שקט ומרחב אישי.', 'Needs depth, quiet and personal space.') },
  8: { career: x('ניהול, עסקים, פיננסים ונדל״ן.', 'Management, business, finance and real estate.'), love: x('צריך שותף חזק ששווה לו בכוח.', 'Needs a strong partner, an equal in power.') },
  9: { career: x('הומניטריה, אמנות, הוראה וטיפול.', 'Humanitarian work, art, teaching and care.'), love: x('אוהב באופן רחב ונדיב; צריך משמעות משותפת.', 'Loves broadly and generously; needs shared meaning.') },
  11: { career: x('השראה, הוראה, ייעוץ רוחני ואמנות.', 'Inspiration, teaching, spiritual counselling and art.'), love: x('קשר רוחני ועמוק, עם רגישות גבוהה.', 'A deep, spiritual bond with high sensitivity.') },
  22: { career: x('פרויקטים גדולים, מנהיגות ובנייה בקנה מידה רחב.', 'Big projects, leadership and building at scale.'), love: x('צריך שותף לחזון גדול.', 'Needs a partner in a big vision.') },
  33: { career: x('הוראה, ריפוי ושירות לקהילה.', 'Teaching, healing and community service.'), love: x('אוהב מתוך נתינה; חשוב לשמור גם על עצמך.', 'Loves through giving; take care of yourself too.') },
};

const LUCKY_DAY: Record<string, L> = {
  aries: x('שלישי', 'Tuesday'), taurus: x('שישי', 'Friday'), gemini: x('רביעי', 'Wednesday'), cancer: x('שני', 'Monday'),
  leo: x('ראשון', 'Sunday'), virgo: x('רביעי', 'Wednesday'), libra: x('שישי', 'Friday'), scorpio: x('שלישי', 'Tuesday'),
  sagittarius: x('חמישי', 'Thursday'), capricorn: x('שבת', 'Saturday'), aquarius: x('שבת', 'Saturday'), pisces: x('חמישי', 'Thursday'),
};

const EL_HEALTH: Record<string, L> = {
  fire: x('יסוד האש צריך פורקן גופני ומנוחה אמיתית כדי לא "להישרף".', 'Fire needs physical release and real rest to avoid burnout.'),
  earth: x('יסוד האדמה נהנה משגרה, תזונה טובה ותנועה קבועה בטבע.', 'Earth thrives on routine, good food and regular movement outdoors.'),
  air: x('יסוד האוויר צריך נשימה, שינה טובה והפסקות מהמחשבות.', 'Air needs breathing, good sleep and breaks from thinking.'),
  water: x('יסוד המים צריך מנוחה רגשית, קרבה למים וסביבה רגועה.', 'Water needs emotional rest, being near water and a calm environment.'),
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

