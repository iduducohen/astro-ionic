/**
 * tarot-deep.ts — פירוש מעמיק ל-22 קלפי הארקנה הגדולה, ופריסות מורחבות.
 * לכל קלף: תמונה, מהות, אהבה, עבודה וכסף, עולם פנימי, קלף הפוך, עצה, שאלה להתבוננות ונטיית כן/לא.
 * בנוסף: קריאת פריסה שלמה (תמצית, שלבי מסע השוטה, איזון ישר/הפוך).
 */
import type { L } from './astro.ts';
import { MAJOR_ARCANA, type DrawnCard } from './tarot.ts';
import { PATHS22, sephira } from './tree.ts';

const x = (he: string, en: string): L => ({ he, en });

export type Topic = 'general' | 'love' | 'work' | 'self';
export type YesNo = 'yes' | 'no' | 'maybe';

export interface DeepCard {
  image: L; essence: L; love: L; work: L; self: L; rev: L; advice: L; question: L; yesno: YesNo;
}

export const DEEP: DeepCard[] = [
  { // 0 השוטה
    image: x('צעיר עומד על שפת צוק, תרמיל קטן על כתפו, פרח לבן בידו וכלב קטן מקפץ לרגליו. הוא מביט אל השמיים ולא אל התהום.', 'A young traveller at a cliff edge, small bag on his shoulder, a white rose in hand, a little dog at his feet. He looks at the sky, not the drop.'),
    essence: x('ראשית של הכול: אפס, הריק שממנו נולד כל דבר. אמון תמים בחיים, חופש מציפיות, והנכונות לצאת לדרך בלי לדעת לאן היא מובילה.', 'The beginning of everything: zero, the void from which all is born. Innocent trust in life, freedom from expectations, the willingness to set out without knowing where the road leads.'),
    love: x('קשר חדש, קליל ומפתיע, או רוח חדשה בקשר קיים. זמן ליהנות מהרגע בלי לתכנן יותר מדי. לבודדים — הזדמנות להיפתח למישהו שונה מהרגיל.', 'A new, light, surprising connection, or fresh air in an existing one. Enjoy the moment without over-planning. Single? Open up to someone unlike your usual type.'),
    work: x('התחלה חדשה: תפקיד, מקצוע, עסק או מעבר. הקלף מעודד לקחת סיכון מחושב ולנסות דבר שלא עשית. בכסף — להיזהר מהוצאות אימפולסיביות.', 'A new start: role, profession, business or move. Take a calculated risk and try something new. With money — beware impulse spending.'),
    self: x('הילד הפנימי מבקש מקום. קלילות, סקרנות וחוסר פחד מטעויות מחזירים חיות ושמחה.', 'Your inner child wants room. Lightness, curiosity and not fearing mistakes bring back vitality and joy.'),
    rev: x('הפוך, השוטה מזהיר מפזיזות, מחוסר אחריות או מקפיצה לדבר חדש כדי לברוח מהישן. לחלופין — פחד שמשתק ומונע את הצעד הראשון.', 'Reversed, the Fool warns of recklessness, irresponsibility or jumping into something new to escape the old. Or the opposite — fear that freezes the first step.'),
    advice: x('צא לדרך, אבל הסתכל רגע לאן אתה דורך. אמון — כן; עיוורון — לא.', 'Set out, but glance where you step. Trust — yes; blindness — no.'),
    question: x('מה הייתי עושה אילו לא פחדתי להיכשל?', 'What would I do if I weren\'t afraid to fail?'), yesno: 'yes' },
  { // 1 הקוסם
    image: x('דמות עומדת מול שולחן ועליו ארבעת כלי הטארוט: גביע, מטבע, חרב ושרביט. יד אחת מורמת לשמיים והשנייה מצביעה לאדמה — "כמו למעלה, כך למטה".', 'A figure at a table holding the four tarot tools: cup, coin, sword and wand. One hand raised to the sky, one pointing to the earth — "as above, so below".'),
    essence: x('כוח הרצון וההגשמה. כל המשאבים כבר נמצאים לפניך; מה שנדרש הוא ריכוז, כוונה ופעולה. הקוסם מחבר בין רעיון לבין מציאות.', 'Willpower and manifestation. All resources are already before you; what\'s needed is focus, intent and action. The Magician links idea and reality.'),
    love: x('יוזמה וכריזמה. זה הזמן לומר את מה שאתה מרגיש ולפעול כדי ליצור את הקשר שאתה רוצה. בקשר קיים — תקשורת פתוחה משנה את התמונה.', 'Initiative and charisma. Say what you feel and act to create the bond you want. In a relationship — open communication changes the picture.'),
    work: x('כישרונות, מיומנויות ויכולת שכנוע במיטבם. מתאים להציג רעיון, לפתוח פרויקט, לחתום או להתראיין. בכסף — אפשר ליצור הכנסה מכישרון.', 'Skills and persuasion at their best. Good for pitching, launching, signing or interviewing. Money can come from a talent.'),
    self: x('ביטחון עצמי שנשען על היכולות האמיתיות שלך. להפסיק לחכות ל"רגע הנכון" — הרגע הוא עכשיו.', 'Self-confidence resting on your real abilities. Stop waiting for "the right moment" — it\'s now.'),
    rev: x('הפוך: כישרון שלא מנוצל, פיזור בין יותר מדי כיוונים, או מניפולציה — שלך או של מישהו מולך. לבדוק כוונות.', 'Reversed: unused talent, scattering in too many directions, or manipulation — yours or someone else\'s. Check intentions.'),
    advice: x('בחר מטרה אחת והשתמש בכל הכלים שלך כדי לממש אותה.', 'Choose one goal and use all your tools to achieve it.'),
    question: x('איזה כישרון שלי אני לא מנצל עד הסוף?', 'Which talent of mine am I not fully using?'), yesno: 'yes' },
  { // 2 הכוהנת הגדולה
    image: x('אישה יושבת בין עמוד שחור לעמוד לבן, מגילה חצי מוסתרת בחיקה, סהר לרגליה ומסך רימונים מאחוריה — השער לידע הנסתר.', 'A woman seated between a black and a white pillar, a half-hidden scroll in her lap, a crescent at her feet, a veil of pomegranates behind — the gate to hidden knowledge.'),
    essence: x('הידע השקט: אינטואיציה, חלומות וחוכמה פנימית. לא כל תשובה מגיעה מחשיבה — חלק מהתשובות מגיעות מהקשבה. מה שעוד לא נחשף יתגלה בזמנו.', 'Quiet knowing: intuition, dreams and inner wisdom. Not every answer comes from thinking — some come from listening. What is hidden will be revealed in time.'),
    love: x('משיכה עמוקה ושקטה, או רגשות שעדיין לא נאמרו. כדאי לתת לדברים להבשיל ולא לדחוק. יש משהו שעוד לא ידוע לך — סבלנות.', 'Deep, quiet attraction, or feelings not yet spoken. Let things ripen; don\'t push. Something is still unknown to you — patience.'),
    work: x('לא הזמן להחלטות חפוזות. לאסוף מידע, להקשיב לתחושת בטן, לשמור על דיסקרטיות. מתאים למחקר, ייעוץ וטיפול.', 'Not a time for rash decisions. Gather information, trust your gut, keep things discreet. Suits research, counselling and therapy.'),
    self: x('זמן לרוחניות, למדיטציה ולכתיבת חלומות. הקול הפנימי מדבר בשקט — צריך שקט כדי לשמוע אותו.', 'Time for spirituality, meditation and dream journaling. The inner voice speaks softly — you need quiet to hear it.'),
    rev: x('הפוך: התעלמות מהאינטואיציה, סודות שמכבידים, או ניתוק מהרגש. לפעמים — מידע שמוסתר ממך.', 'Reversed: ignoring intuition, burdensome secrets, or disconnection from feeling. Sometimes — information hidden from you.'),
    advice: x('לפני שאתה מחליט, שב בשקט ושאל את עצמך מה אתה כבר יודע.', 'Before deciding, sit quietly and ask what you already know.'),
    question: x('מה התחושה הפנימית שלי אומרת, כשאני מפסיק לנתח?', 'What does my gut say when I stop analysing?'), yesno: 'maybe' },
  { // 3 הקיסרית
    image: x('אישה על כס מרופד בשדה חיטה פורח, כתר של שנים-עשר כוכבים לראשה ומגן בצורת לב עם סמל נוגה לצידה. נהר זורם מאחור.', 'A woman on a cushioned throne in a ripening wheat field, a crown of twelve stars, a heart-shaped shield bearing Venus beside her. A river flows behind.'),
    essence: x('שפע, פריון ויצירה. אם האדמה — טבע, יופי, הנאה חושית ונתינה. מה שנשתל טוב גדל ופורח.', 'Abundance, fertility and creation. The earth mother — nature, beauty, sensual pleasure and nurture. What is well planted grows and blooms.'),
    love: x('אהבה חמה, מטפחת ובטוחה. קרבה, רוך, ולעיתים — הריון, משפחה או בית משותף. בקשר קיים — זמן לפנק ולהעמיק.', 'Warm, nurturing, secure love. Closeness, tenderness, sometimes pregnancy, family or a shared home. In a relationship — time to pamper and deepen.'),
    work: x('פרויקטים יצירתיים פורחים, צמיחה והכנסה שמגיעה מהשקעה סבלנית. טוב לעיצוב, אומנות, טיפול וכל מה שמגדל משהו.', 'Creative projects flourish; growth and income from patient investment. Good for design, art, care work and anything that grows something.'),
    self: x('לטפל בגוף, לצאת לטבע, ליהנות. היכולת לקבל — לא רק לתת — היא חלק מהשפע.', 'Care for your body, go into nature, enjoy. Being able to receive — not only give — is part of abundance.'),
    rev: x('הפוך: תלות, דאגה חונקת לאחרים, או הזנחה של עצמך. לפעמים — יצירתיות חסומה או תחושת מחסור.', 'Reversed: dependence, smothering care, or neglecting yourself. Sometimes blocked creativity or a sense of lack.'),
    advice: x('טפח את מה שחשוב לך בסבלנות, ותן לו זמן לגדול.', 'Nurture what matters to you patiently, and give it time to grow.'),
    question: x('במה אני יכול להרשות לעצמי ליהנות יותר?', 'Where can I allow myself more pleasure?'), yesno: 'yes' },
  { // 4 הקיסר
    image: x('מלך בגלימה אדומה על כס אבן מעוטר ראשי אילים, שרביט בידו אחת וכדור בשנייה, ומאחוריו הרים חשופים.', 'A king in red on a stone throne carved with rams\' heads, sceptre and orb in hand, bare mountains behind.'),
    essence: x('סדר, מבנה וסמכות. הכוח לבנות מסגרת יציבה, לקבוע כללים ולקחת אחריות. האב, המנהיג, המגן.', 'Order, structure and authority. The power to build a stable framework, set rules and take responsibility. The father, the leader, the protector.'),
    love: x('מחויבות, יציבות ונאמנות. קשר עם גבולות ברורים. לפעמים — צורך לרכך שליטה ולהשאיר מקום לרגש.', 'Commitment, stability and loyalty. A bond with clear boundaries. Sometimes a need to soften control and leave room for feeling.'),
    work: x('הובלה, ניהול ותכנון. זמן לבנות תשתית, לקבוע יעדים ולעמוד על שלך. טוב למשא ומתן ולתפקידי אחריות. בכסף — משמעת ותקציב.', 'Leadership, management and planning. Build infrastructure, set goals and stand firm. Good for negotiations and senior roles. With money — discipline and budgeting.'),
    self: x('לקחת את החיים לידיים: שגרה, משמעת עצמית וגבולות בריאים יוצרים ביטחון.', 'Take charge of your life: routine, self-discipline and healthy boundaries create security.'),
    rev: x('הפוך: שליטה נוקשה, עקשנות או שימוש לרעה בכוח — או להפך, חוסר מסגרת וקושי לקחת אחריות.', 'Reversed: rigid control, stubbornness or abuse of power — or the opposite, lack of structure and avoiding responsibility.'),
    advice: x('בנה מבנה ברור, והובל מתוך אחריות ולא מתוך פחד.', 'Build a clear structure, and lead from responsibility, not fear.'),
    question: x('איפה אני צריך יותר סדר — ואיפה יותר גמישות?', 'Where do I need more order — and where more flexibility?'), yesno: 'yes' },
  { // 5 הכוהן הגדול
    image: x('דמות דתית בכתר משולש יושבת בין שני עמודים, יד מורמת בברכה, ולרגליה שני תלמידים ושני מפתחות מוצלבים.', 'A religious figure in a triple crown between two pillars, hand raised in blessing, two disciples and two crossed keys at his feet.'),
    essence: x('מסורת, לימוד וערכים משותפים. מורה, רב או מדריך; מוסדות, טקסים והשתייכות לקהילה. ידע שעובר מדור לדור.', 'Tradition, learning and shared values. A teacher, rabbi or mentor; institutions, rituals and belonging. Knowledge handed down the generations.'),
    love: x('קשר רציני שמתבסס על ערכים משותפים, לעיתים עד מיסוד וחתונה. חשוב לבדוק אם הציפיות של שניכם מאותו עולם.', 'A serious bond built on shared values, sometimes leading to commitment and marriage. Check that your expectations come from the same world.'),
    work: x('עבודה במסגרת מוסדית, לימודים, הסמכה או חניכה. כדאי ללמוד ממי שכבר עשה את הדרך.', 'Work within institutions, studies, certification or mentoring. Learn from those who walked the road before.'),
    self: x('חיפוש משמעות דרך מסורת, קהילה או מורה רוחני. לפעמים — שאלה אם הכללים שקיבלת עדיין מתאימים לך.', 'Seeking meaning through tradition, community or a spiritual teacher. Sometimes — asking whether inherited rules still fit you.'),
    rev: x('הפוך: מרד בממסד, דרך עצמאית, או הצורך לשבור כלל שכבר לא משרת אותך. לחלופין — נוקשות ודוגמטיות.', 'Reversed: rebellion, an independent path, or needing to break a rule that no longer serves you. Or — rigidity and dogma.'),
    advice: x('היעזר בחוכמה ובניסיון של אחרים, ובחר מתוכם את מה שנכון לך.', 'Draw on others\' wisdom and experience, and choose what is right for you.'),
    question: x('אילו מהערכים שלי באמת שלי, ואילו ירשתי בלי לבדוק?', 'Which of my values are truly mine, and which did I inherit unchecked?'), yesno: 'maybe' },
  { // 6 האוהבים
    image: x('גבר ואישה עומדים עירומים זה מול זה, מלאך גדול מברך מעליהם, מאחוריהם עץ הדעת עם נחש ועץ החיים בלהבות.', 'A man and woman stand naked facing each other, a great angel blessing above, the Tree of Knowledge with a serpent and the Tree of Life in flames behind.'),
    essence: x('אהבה, חיבור ובחירה. הקלף אינו רק על רומנטיקה — הוא על בחירה שנעשית מהלב ותואמת את הערכים שלך. איחוד של הפכים.', 'Love, union and choice. Not only romance — a choice made from the heart that aligns with your values. The union of opposites.'),
    love: x('חיבור עמוק והדדי, משיכה חזקה, ולעיתים — החלטה חשובה בקשר. בודדים: מפגש משמעותי. יש לבחור מתוך אמת ולא מתוך פחד.', 'Deep, mutual connection, strong attraction, sometimes an important decision in the relationship. Single: a meaningful meeting. Choose from truth, not fear.'),
    work: x('שותפות מבטיחה, או צומת דרכים בין שתי אפשרויות. הבחירה הנכונה היא זו שמתאימה לערכים שלך, לא רק לכסף.', 'A promising partnership, or a crossroads between two options. The right choice fits your values, not just the money.'),
    self: x('קבלה ואהבה עצמית; חיבור בין השכל ללב. להיות נאמן לעצמך.', 'Self-acceptance and self-love; uniting head and heart. Being true to yourself.'),
    rev: x('הפוך: חוסר איזון בקשר, ערכים שמתנגשים, התלבטות שנגררת, או בחירה שנעשתה מסיבות לא נכונות.', 'Reversed: imbalance in the relationship, clashing values, dragging indecision, or a choice made for the wrong reasons.'),
    advice: x('בחר במה שאתה באמת אוהב — ועמוד מאחורי הבחירה.', 'Choose what you truly love — and stand behind the choice.'),
    question: x('אם הייתי בוחר רק מהלב, מה הייתי בוחר?', 'If I chose only from the heart, what would I choose?'), yesno: 'yes' },
  { // 7 המרכבה
    image: x('לוחם בשריון עומד במרכבה שמושכים שני ספינקסים — אחד שחור ואחד לבן — ללא מושכות. חופה זרועת כוכבים מעליו ועיר מאחוריו.', 'An armoured warrior in a chariot drawn by two sphinxes, one black and one white, with no reins. A starry canopy above, a city behind.'),
    essence: x('נחישות, שליטה עצמית וניצחון. כשהרצון ממוקד, אפשר לרתום כוחות מנוגדים לאותו כיוון ולהתקדם.', 'Determination, self-mastery and victory. When will is focused, opposing forces can be harnessed in one direction.'),
    love: x('התקדמות בקשר, התגברות על מכשול או החלטה לקחת פיקוד. לפעמים — קשר מרחוק או מעבר משותף.', 'Progress in a relationship, overcoming an obstacle or taking charge. Sometimes a long-distance bond or moving together.'),
    work: x('הצלחה בזכות מיקוד וכוח רצון. קידום, עמידה ביעד, תחרות מנצחת. גם נסיעה או מעבר מקום.', 'Success through focus and willpower. Promotion, hitting targets, winning a competition. Also travel or relocation.'),
    self: x('להחזיק את ההגה: לא לתת לרגשות או לנסיבות להסיט אותך מהמטרה.', 'Hold the wheel: don\'t let feelings or circumstances pull you off course.'),
    rev: x('הפוך: כיוון אבוד, כוחות שמושכים לצדדים, תוקפנות או תסכול. צריך לעצור ולמקד מחדש.', 'Reversed: lost direction, forces pulling apart, aggression or frustration. Stop and refocus.'),
    advice: x('הגדר יעד אחד ברור והתקדם אליו בעקביות.', 'Set one clear goal and advance steadily.'),
    question: x('אילו שני כוחות בתוכי צריכים ללמוד לנוע לאותו כיוון?', 'Which two forces within me must learn to move the same way?'), yesno: 'yes' },
  { // 8 הכוח
    image: x('אישה בלבן סוגרת בעדינות את פיו של אריה. מעל ראשה סמל האינסוף, וזר פרחים סביב מותניה.', 'A woman in white gently closes a lion\'s jaws. The infinity sign above her head, a garland of flowers at her waist.'),
    essence: x('כוח פנימי, אומץ וחמלה. לא כוח שכופה אלא כוח שמרכך — אילוף היצרים והפחדים באהבה ובסבלנות.', 'Inner strength, courage and compassion. Not force that compels but strength that softens — taming instincts and fears with love and patience.'),
    love: x('סבלנות, רוך ואמון. היכולת להכיל את השני — ואת עצמך — גם ברגעים הקשים. תשוקה שמנוהלת בחוכמה.', 'Patience, tenderness and trust. Holding the other — and yourself — in hard moments too. Passion guided wisely.'),
    work: x('התמדה ואומץ מול לחץ. מנהיגות רכה שמשיגה יותר מכוחניות. מתאים לטיפול בעימות בשקט.', 'Persistence and courage under pressure. Soft leadership achieves more than force. Good for handling conflict calmly.'),
    self: x('אמונה ביכולת שלך להתמודד. הפחד לא נעלם — אבל הוא כבר לא מנהל אותך.', 'Belief in your ability to cope. Fear doesn\'t vanish — but it no longer runs you.'),
    rev: x('הפוך: ספק עצמי, התפרצויות, או תחושה שהיצרים או החרדה משתלטים. זמן לחזור לנשימה ולגוף.', 'Reversed: self-doubt, outbursts, or feeling instincts or anxiety take over. Return to breath and body.'),
    advice: x('הגב ברוך במקום בכוח — ותגלה כמה אתה חזק.', 'Respond with gentleness instead of force — and discover how strong you are.'),
    question: x('איזה פחד שלי מבקש חמלה ולא מלחמה?', 'Which of my fears asks for compassion, not battle?'), yesno: 'yes' },
  { // 9 הנזיר
    image: x('זקן בגלימה אפורה עומד לבדו על פסגה מושלגת, מחזיק פנס ובו כוכב בעל שישה קצוות ומקל הליכה.', 'An old man in a grey cloak stands alone on a snowy peak, holding a lantern with a six-pointed star and a staff.'),
    essence: x('התבוננות פנימית, בדידות מבחירה וחיפוש אמת. האור שהנזיר מחזיק מאיר רק את הצעד הבא — וזה מספיק.', 'Introspection, chosen solitude and the search for truth. The hermit\'s light shows only the next step — and that is enough.'),
    love: x('זמן להבין מה אתה באמת צריך לפני קשר חדש, או מרחב אישי בתוך קשר. זה לא בהכרח סוף — זו העמקה.', 'Time to understand what you truly need before a new bond, or personal space within one. Not necessarily an ending — a deepening.'),
    work: x('לימוד, מחקר, כתיבה או עבודה עצמאית. להתרחק מהרעש כדי לראות את התמונה. לעיתים — מנטור חכם.', 'Study, research, writing or independent work. Step away from noise to see the picture. Sometimes — a wise mentor.'),
    self: x('ריטריט, שקט, טבע. שאלות של משמעות וייעוד. להקשיב לעצמך ולא לדעות של אחרים.', 'Retreat, silence, nature. Questions of meaning and purpose. Listen to yourself, not others\' opinions.'),
    rev: x('הפוך: בדידות שהפכה לניתוק, הסתגרות מפחד, או להפך — בריחה מזמן לבד שנחוץ לך.', 'Reversed: solitude turned into isolation, withdrawing from fear, or the opposite — avoiding the alone time you need.'),
    advice: x('קח זמן לבד כדי לשמוע את הקול שלך, ואז שתף את האור שמצאת.', 'Take time alone to hear your own voice, then share the light you found.'),
    question: x('מה הייתי שומע אילו השקט סביבי היה מוחלט?', 'What would I hear if the silence around me were complete?'), yesno: 'maybe' },
  { // 10 גלגל המזל
    image: x('גלגל גדול בשמיים ועליו אותיות וסמלים, ספינקס בראשו, נחש יורד בצידו ודמות עולה בצד השני. בפינות — ארבע חיות הקודש.', 'A great wheel in the sky inscribed with letters and symbols, a sphinx atop, a snake descending one side and a figure rising on the other. The four holy creatures in the corners.'),
    essence: x('מחזוריות, גורל ונקודות מפנה. מה שלמטה יעלה ומה שלמעלה ירד. הזדמנות שמגיעה בזמן שלה — ומה שעושים איתה.', 'Cycles, fate and turning points. What is down will rise, what is up will fall. An opportunity arriving in its time — and what you do with it.'),
    love: x('מפגש "גורלי", שינוי כיוון בקשר או חזרה של מישהו מהעבר. הקלף אומר: משהו זז, ואי אפשר לעצור אותו.', 'A "fated" meeting, a change of direction, or someone returning from the past. Something is moving and can\'t be stopped.'),
    work: x('הזדמנות, מזל או שינוי פתאומי — לרוב לטובה. זמן לתפוס את הגל. בכסף — תנודתיות; לא להתקבע.', 'Opportunity, luck or sudden change — usually for the better. Catch the wave. With money — volatility; don\'t get fixed.'),
    self: x('לקבל את מה שלא בשליטתך ולזהות דפוסים שחוזרים בחייך.', 'Accept what is out of your control and recognise patterns repeating in your life.'),
    rev: x('הפוך: תקופה של "חוסר מזל", התנגדות לשינוי או חזרה על אותה טעות. הגלגל ימשיך להסתובב — השאלה מה תלמד.', 'Reversed: a run of "bad luck", resisting change or repeating the same mistake. The wheel keeps turning — what will you learn?'),
    advice: x('זרום עם השינוי, ותפוס את ההזדמנות כשהיא מגיעה.', 'Flow with change, and seize the opportunity when it comes.'),
    question: x('איזה דפוס חוזר בחיי, ומה הוא מנסה ללמד אותי?', 'What pattern keeps recurring in my life, and what is it teaching me?'), yesno: 'yes' },
  { // 11 הצדק
    image: x('דמות בגלימה אדומה יושבת בין עמודים, חרב זקופה ביד ימין ומאזניים ביד שמאל. הפנים ישירות, המבט צלול.', 'A red-robed figure seated between pillars, upright sword in the right hand, scales in the left. A direct face, a clear gaze.'),
    essence: x('אמת, איזון ואחריות. סיבה ותוצאה: מה שנזרע נקצר. החלטה שקולה, הוגנת וישרה.', 'Truth, balance and responsibility. Cause and effect: you reap what you sow. A fair, considered, honest decision.'),
    love: x('הדדיות ויושר. הקשר מאוזן כשכל צד נותן ומקבל. זמן לשיחה כנה, ולפעמים — להחלטה מחייבת.', 'Reciprocity and honesty. A bond is balanced when each gives and receives. Time for a frank talk, and sometimes a binding decision.'),
    work: x('חוזים, עניינים משפטיים, משא ומתן — יוכרעו בהגינות. להקפיד על פרטים ועל יושרה.', 'Contracts, legal matters, negotiations — settled fairly. Mind the details and integrity.'),
    self: x('לקחת אחריות על הבחירות שלך, בלי להאשים ובלי להלקות את עצמך.', 'Take responsibility for your choices, without blaming others or yourself.'),
    rev: x('הפוך: חוסר הגינות, הטיה, התחמקות מאחריות או החלטה שנדחית. לבדוק איפה אתה לא כן עם עצמך.', 'Reversed: unfairness, bias, dodging responsibility or a postponed decision. Check where you\'re not honest with yourself.'),
    advice: x('שקול את כל הצדדים והחלט לפי האמת — גם כשהיא לא נוחה.', 'Weigh all sides and decide by the truth — even when it\'s uncomfortable.'),
    question: x('מה הייתה ההחלטה הנכונה, אילו לא הייתי מפחד מהתוצאה?', 'What would the right decision be, if I didn\'t fear the outcome?'), yesno: 'maybe' },
  { // 12 התלוי
    image: x('אדם תלוי הפוך מרגלו על עץ חי, ידיו מאחורי גבו, פניו רגועות והילה של אור סביב ראשו.', 'A man hangs upside down by one foot from a living tree, hands behind his back, face calm, a halo of light around his head.'),
    essence: x('השהיה, ויתור ונקודת מבט חדשה. לפעמים העצירה היא הצעד. כשמפסיקים להיאבק, מתגלה תובנה.', 'Suspension, surrender and a new perspective. Sometimes stopping is the step. When you stop struggling, insight appears.'),
    love: x('קשר בהמתנה, או צורך להסתכל על המצב מהצד השני. לוותר על הצורך לשלוט כדי שמשהו חדש יוכל לקרות.', 'A relationship on hold, or a need to see things from the other side. Let go of control so something new can happen.'),
    work: x('עיכוב שמזמין לחשוב מחדש. אל תדחוף — זה זמן לתכנן, ללמוד ולבחון את ההנחות שלך.', 'A delay inviting you to rethink. Don\'t push — plan, learn and test your assumptions.'),
    self: x('הקרבה קטנה לטובת צמיחה גדולה. לראות את העולם הפוך — ולגלות שזה בדיוק מה שהיה חסר.', 'A small sacrifice for great growth. Seeing the world upside down — and finding it was exactly what was missing.'),
    rev: x('הפוך: תקיעות בלי תכלית, קורבנות, או סירוב לשנות נקודת מבט. ההמתנה הפכה לדחיינות.', 'Reversed: pointless stagnation, martyrdom, or refusing to change perspective. Waiting has become procrastination.'),
    advice: x('עצור, הרפה, והסתכל על המצב מזווית שעוד לא ניסית.', 'Pause, let go, and look at the situation from an angle you haven\'t tried.'),
    question: x('מה ישתנה אם אפסיק להילחם במצב ופשוט אסתכל עליו?', 'What would change if I stopped fighting the situation and simply looked at it?'), yesno: 'maybe' },
  { // 13 המוות
    image: x('שלד בשריון רוכב על סוס לבן ומחזיק דגל שחור ובו ורד לבן. לפניו מלך נופל, ילד וכומר; באופק השמש זורחת בין שני מגדלים.', 'A skeleton in armour on a white horse carries a black banner with a white rose. Before him a king falls, a child, a priest; on the horizon the sun rises between two towers.'),
    essence: x('סוף שמאפשר התחלה. כמעט אף פעם לא מוות ממשי — אלא טרנספורמציה: פרק נסגר, הרגל נגמר, זהות ישנה משתנה.', 'An ending that makes a beginning possible. Almost never literal death — transformation: a chapter closes, a habit ends, an old identity changes.'),
    love: x('סיום של קשר או של שלב בקשר. גם בקשר טוב — משהו ישן צריך למות כדי שהקשר יתחדש.', 'The end of a relationship or of a stage within it. Even in a good bond — something old must die for it to renew.'),
    work: x('סגירה של תפקיד, פרויקט או דרך. פינוי מקום לכיוון חדש. לא להיאחז במה שכבר נגמר.', 'Closing a role, project or path. Making room for a new direction. Don\'t cling to what has ended.'),
    self: x('לשחרר את מה שכבר לא משרת אותך — אמונות, קשרים, דפוסים — ולתת לעצמך להשתנות.', 'Release what no longer serves you — beliefs, bonds, patterns — and let yourself change.'),
    rev: x('הפוך: התנגדות לשינוי שכבר קורה, היאחזות בעבר, או מעבר איטי וכואב יותר מהנדרש.', 'Reversed: resisting change already underway, clinging to the past, or a transition slower and more painful than needed.'),
    advice: x('תן למה שנגמר להיגמר; השמש כבר זורחת באופק.', 'Let what has ended end; the sun is already rising on the horizon.'),
    question: x('ממה אני צריך להיפרד כדי לפנות מקום לחדש?', 'What must I part with to make room for the new?'), yesno: 'no' },
  { // 14 המתינות
    image: x('מלאך עומד ברגל אחת במים וברגל אחת על היבשה, ומוזג מים בין שני גביעים. דרך מובילה אל הרים וכתר של אור.', 'An angel stands with one foot in water and one on land, pouring water between two cups. A path leads to mountains and a crown of light.'),
    essence: x('איזון, מתינות ושילוב. חיבור של הפכים לשלם חדש — בסבלנות, במינון הנכון ובזרימה.', 'Balance, moderation and blending. Combining opposites into a new whole — patiently, in the right measure, flowing.'),
    love: x('הרמוניה, פשרה בריאה והקשבה. קשר שמרפא. למצוא את הקצב המשותף בלי לוותר על עצמך.', 'Harmony, healthy compromise and listening. A healing bond. Finding a shared rhythm without giving yourself up.'),
    work: x('שיתוף פעולה, גישור ושילוב תחומים. התקדמות יציבה עדיפה על קפיצות.', 'Cooperation, mediation and combining fields. Steady progress beats leaps.'),
    self: x('ריפוי ואיזון בין גוף, נפש ורוח. הדרך האמצעית.', 'Healing and balance between body, mind and spirit. The middle way.'),
    rev: x('הפוך: קיצוניות, חוסר סבלנות, עודף בתחום אחד וחוסר באחר. לחזור לאיזון.', 'Reversed: extremes, impatience, excess in one area and lack in another. Return to balance.'),
    advice: x('מצא את המינון הנכון — לא יותר מדי ולא פחות מדי.', 'Find the right measure — not too much, not too little.'),
    question: x('באיזה תחום בחיי אני נוטה לקיצוניות?', 'In which area of life do I lean toward extremes?'), yesno: 'yes' },
  { // 15 השטן
    image: x('יצור בעל קרניים וכנפי עטלף יושב על כן, ולרגליו גבר ואישה כבולים בשרשראות רפויות — הם יכולים להשתחרר, אבל לא שמים לב.', 'A horned, bat-winged creature sits on a pedestal; below, a man and woman in loose chains — they could free themselves but don\'t notice.'),
    essence: x('התמכרות, חומריות ותלות. הצל — מה שאנחנו לא רוצים לראות בעצמנו. השרשראות רפויות: החופש אפשרי ברגע שמבינים.', 'Addiction, materialism and dependence. The shadow — what we don\'t want to see in ourselves. The chains are loose: freedom is possible once you see.'),
    love: x('משיכה עזה, תשוקה, אבל גם קנאה, שליטה או תלות. לבדוק אם הקשר מחזיק אותך מתוך אהבה או מתוך פחד.', 'Intense attraction and desire, but also jealousy, control or dependence. Ask whether the bond holds you by love or by fear.'),
    work: x('כבילות לעבודה בגלל כסף, מעמד או פחד. פיתוי לקיצורי דרך. בכסף — חובות או הוצאות כפייתיות.', 'Being chained to work by money, status or fear. Temptation to cut corners. With money — debts or compulsive spending.'),
    self: x('לזהות הרגל שמחזיק אותך, ולהבין מה הוא נותן לך. ההכרה היא תחילת השחרור.', 'Recognise a habit that holds you and what it gives you. Awareness is the start of release.'),
    rev: x('הפוך: השתחררות! שבירת הרגל, יציאה מקשר מזיק, או רגע של פקיחת עיניים.', 'Reversed: liberation! Breaking a habit, leaving a harmful bond, or a moment of waking up.'),
    advice: x('הסתכל ביושר על מה שכובל אותך — ותגלה שאתה יכול להסיר את השרשרת.', 'Look honestly at what binds you — and discover you can remove the chain.'),
    question: x('מה אני ממשיך לעשות למרות שאני יודע שזה לא טוב לי?', 'What do I keep doing though I know it\'s not good for me?'), yesno: 'no' },
  { // 16 המגדל
    image: x('מגדל גבוה על צוק נפגע מברק, הכתר שבראשו עף, להבות פורצות מהחלונות ושתי דמויות נופלות.', 'A tall tower on a crag struck by lightning, its crown blown off, flames bursting from windows, two figures falling.'),
    essence: x('טלטלה פתאומית שמפילה מבנה שנבנה על יסודות רעועים. כואב — אבל משחרר: מה שנופל לא היה אמיתי.', 'A sudden upheaval that topples a structure built on shaky foundations. Painful — but liberating: what falls wasn\'t real.'),
    love: x('גילוי מפתיע, משבר או פרידה פתאומית. לפעמים — אמת שיוצאת לאור ומנקה את האוויר.', 'A surprising revelation, a crisis or sudden break-up. Sometimes a truth comes out and clears the air.'),
    work: x('שינוי לא צפוי: פיטורים, קריסת תוכנית, שינוי ארגוני. הזדמנות לבנות מחדש, הפעם על בסיס יציב.', 'Unexpected change: layoff, a plan collapsing, reorganisation. A chance to rebuild, this time on solid ground.'),
    self: x('התפכחות. אמונה או אשליה נשברת, ואיתה בא חופש לראות את האמת.', 'Disillusionment. A belief or illusion shatters, and with it comes freedom to see the truth.'),
    rev: x('הפוך: משבר שנמנע ברגע האחרון, או שינוי שאתה מנסה לעכב. מה שצריך ליפול — עדיף שייפול עכשיו.', 'Reversed: a crisis narrowly avoided, or change you\'re trying to delay. What must fall had better fall now.'),
    advice: x('אל תיאחז במה שמתמוטט; בנה מחדש על אמת.', 'Don\'t cling to what collapses; rebuild on truth.'),
    question: x('איזה חלק בחיי נשען על יסודות שאני יודע שאינם יציבים?', 'Which part of my life rests on foundations I know are unstable?'), yesno: 'no' },
  { // 17 הכוכב
    image: x('אישה עירומה כורעת ליד בריכה, מוזגת מים מכד אחד לבריכה ומכד שני לאדמה. מעליה כוכב גדול ושבעה קטנים, וציפור על עץ.', 'A naked woman kneels by a pool, pouring water from one jug into the pool and from another onto the land. Above her a great star and seven small ones, a bird on a tree.'),
    essence: x('תקווה, ריפוי והשראה אחרי הסערה. אמון מחודש בעתיד, חשיפה אמיתית ופתיחות.', 'Hope, healing and inspiration after the storm. Renewed faith in the future, authentic openness.'),
    love: x('אהבה שמרפאת, פתיחות רגשית ואמון. קשר שנותן השראה. אחרי תקופה קשה — אור.', 'Healing love, emotional openness and trust. An inspiring bond. After a hard time — light.'),
    work: x('חזון, יצירתיות ומוניטין שמתחיל לזהור. זמן לחלום בגדול ולשתף את הרעיונות שלך.', 'Vision, creativity and a reputation beginning to shine. Dream big and share your ideas.'),
    self: x('החלמה והתחדשות. לחזור להאמין בעצמך ובחיים. רוחניות שקטה.', 'Recovery and renewal. Believing again in yourself and in life. Quiet spirituality.'),
    rev: x('הפוך: ייאוש, חוסר אמונה או ניתוק מהחלום. התקווה לא נעלמה — היא רק מחכה שתחזיר אליה את המבט.', 'Reversed: despair, lack of faith, disconnection from the dream. Hope hasn\'t gone — it waits for you to look back to it.'),
    advice: x('תאמין שהטוב בדרך, ופעל כאילו הוא כבר כאן.', 'Believe good is coming, and act as though it\'s already here.'),
    question: x('איזה חלום נטשתי, ואולי הגיע הזמן לחזור אליו?', 'Which dream did I abandon, and is it time to return to it?'), yesno: 'yes' },
  { // 18 הירח
    image: x('ירח מלא עם פנים מאיר דרך בין שני מגדלים. כלב וזאב מייללים אליו, וסרטן זוחל מבריכה אל הדרך.', 'A full moon with a face lights a path between two towers. A dog and a wolf howl at it; a crayfish crawls from a pool onto the path.'),
    essence: x('אשליות, חלומות ופחדים מהלא-מודע. לא הכול כפי שנראה. הדרך קיימת, אבל עוברים בה באור עמום — בעזרת האינטואיציה.', 'Illusion, dreams and fears from the unconscious. Not all is as it seems. The path exists, but you walk it in dim light — guided by intuition.'),
    love: x('בלבול, חשדות או רגשות לא ברורים. להיזהר מהשלכות ומפנטזיות, ולבקש בהירות לפני החלטה.', 'Confusion, suspicion or unclear feelings. Beware projection and fantasy; seek clarity before deciding.'),
    work: x('מידע חלקי, חוסר ודאות או משהו שמוסתר. לא לחתום בלי לבדוק. מתאים לעבודה יצירתית ודמיונית.', 'Partial information, uncertainty or something hidden. Don\'t sign without checking. Suits creative, imaginative work.'),
    self: x('להקשיב לחלומות ולפחדים בלי לתת להם לנהל אותך. דמיון עשיר, רגישות גבוהה.', 'Listen to dreams and fears without letting them rule you. Rich imagination, high sensitivity.'),
    rev: x('הפוך: הערפל מתפזר. אמת יוצאת לאור, פחדים מתבררים כלא מוצדקים.', 'Reversed: the fog lifts. Truth comes out, fears prove unfounded.'),
    advice: x('התקדם לאט, בדוק עובדות, והקשב לתחושת הבטן.', 'Move slowly, check facts, and listen to your gut.'),
    question: x('מה אני מפחד שיתגלה — ומה אם דווקא הגילוי ישחרר אותי?', 'What am I afraid will be revealed — and what if revealing it frees me?'), yesno: 'no' },
  { // 19 השמש
    image: x('ילד מחייך רוכב על סוס לבן ומחזיק דגל אדום. מעליו שמש גדולה וקורנת, ומאחוריו חומה עם חמניות פורחות.', 'A smiling child rides a white horse holding a red banner. A great radiant sun above, a wall of blooming sunflowers behind.'),
    essence: x('שמחה, הצלחה ובהירות. אחד הקלפים החיוביים בחבילה: חיוניות, ביטחון ואור שמאיר הכול.', 'Joy, success and clarity. One of the most positive cards: vitality, confidence and light that illuminates everything.'),
    love: x('אהבה שמחה ופתוחה, הדדיות וחגיגה. זמן טוב למיסוד, למשפחה ולהנאה משותפת.', 'Happy, open love, reciprocity and celebration. A good time to commit, for family and shared joy.'),
    work: x('הצלחה, הכרה ותוצאות. הביטחון שלך מושך הזדמנויות. בכסף — שפע ויציבות.', 'Success, recognition and results. Your confidence attracts opportunity. With money — abundance and stability.'),
    self: x('להיות אתה, בלי מסכות. שמחה פשוטה, בריאות ואנרגיה.', 'Being yourself, without masks. Simple joy, health and energy.'),
    rev: x('הפוך: השמחה עדיין שם, אבל מעוננת — עייפות, ספק או אופטימיות מוגזמת. האור יחזור.', 'Reversed: the joy is still there, but clouded — fatigue, doubt or over-optimism. The light will return.'),
    advice: x('תן לעצמך לזרוח; השמחה שלך היא לא מותרות.', 'Let yourself shine; your joy is not a luxury.'),
    question: x('מה ממלא אותי באמת בשמחה, ואיך אתן לזה יותר מקום?', 'What truly fills me with joy, and how can I give it more room?'), yesno: 'yes' },
  { // 20 הדין
    image: x('מלאך תוקע בשופר מהשמיים, ומהקברות מתחת קמים אנשים עם ידיים פרושות, עונים לקריאה.', 'An angel blows a trumpet from the sky; below, people rise from graves with arms outstretched, answering the call.'),
    essence: x('התעוררות, חשבון נפש וקריאה פנימית. זמן לסכם, לסלוח — גם לעצמך — ולקום לחיים חדשים.', 'Awakening, reckoning and an inner calling. Time to sum up, forgive — yourself too — and rise into a new life.'),
    love: x('הזדמנות שנייה, פיוס או החלטה משמעותית על עתיד הקשר. לראות את הקשר באור חדש.', 'A second chance, reconciliation or a meaningful decision about the future. Seeing the relationship in a new light.'),
    work: x('ייעוד: הבנה מה אתה באמת אמור לעשות. הערכה, סיכום תקופה והחלטה אמיצה.', 'Vocation: understanding what you\'re truly meant to do. Evaluation, closing a period and a bold decision.'),
    self: x('חשבון נפש מתוך אהבה, לא ביקורת. להקשיב לקריאה שחוזרת אליך שוב ושוב.', 'A loving self-reckoning, not criticism. Listen to the call that keeps returning.'),
    rev: x('הפוך: ביקורת עצמית קשה, התעלמות מהקריאה, או פחד להחליט. אין צורך להיות מושלם כדי לקום.', 'Reversed: harsh self-criticism, ignoring the call, or fear of deciding. You don\'t need to be perfect to rise.'),
    advice: x('ענה לקריאה הפנימית שלך — עכשיו.', 'Answer your inner call — now.'),
    question: x('איזו קריאה פנימית אני ממשיך לדחות?', 'What inner call do I keep postponing?'), yesno: 'yes' },
  { // 21 העולם
    image: x('דמות רוקדת בתוך זר ענק, מחזיקה שני שרביטים. בארבע הפינות — ארבע חיות הקודש: אדם, נשר, אריה ושור.', 'A figure dances inside a great wreath, holding two wands. In the four corners, the four holy creatures: human, eagle, lion and bull.'),
    essence: x('השלמה, הגשמה ושלמות. סוף מסע השוטה — מעגל שנסגר בהצלחה, והכנה למעגל הבא ברמה גבוהה יותר.', 'Completion, fulfilment and wholeness. The end of the Fool\'s journey — a circle closed successfully, ready for the next at a higher level.'),
    love: x('קשר שלם ומאוזן, תחושת "הגענו". לעיתים — אירוע משמעותי כמו חתונה, או אהבה ממקום רחוק.', 'A whole, balanced bond, a sense of "we\'ve arrived". Sometimes a milestone like a wedding, or love from far away.'),
    work: x('סיום מוצלח, השגת יעד, הכרה. גם הצלחה בינלאומית, נסיעה או הרחבה לעולם.', 'Successful completion, a goal reached, recognition. Also international success, travel or going global.'),
    self: x('תחושת שלמות ושייכות. להכיר בדרך שעברת לפני שמתחילים את הבאה.', 'A sense of wholeness and belonging. Acknowledge the road you travelled before starting the next.'),
    rev: x('הפוך: כמעט שם — חסרה חתיכה אחרונה, או קושי לסגור פרק ולעבור הלאה.', 'Reversed: almost there — one last piece missing, or trouble closing a chapter and moving on.'),
    advice: x('סיים את מה שהתחלת, וחגוג את ההישג.', 'Finish what you started, and celebrate the achievement.'),
    question: x('מה אני צריך לסיים כדי להרגיש שלם?', 'What do I need to finish to feel whole?'), yesno: 'yes' },
];

/* ---------------- פריסות ---------------- */
export type DeepSpread = 'one' | 'three' | 'love' | 'five';
export interface Position { name: L; meaning: L }

export const SPREADS: Record<DeepSpread, { label: L; desc: L; positions: Position[] }> = {
  one: { label: x('קלף אחד', 'One card'), desc: x('מסר ממוקד לשאלה או ליום.', 'A focused message for a question or the day.'),
    positions: [{ name: x('המסר שלך', 'Your message'), meaning: x('התשובה הממוקדת לשאלה — מה חשוב לדעת עכשיו.', 'The focused answer — what matters to know now.') }] },
  three: { label: x('עבר, הווה, עתיד', 'Past, present, future'), desc: x('איך הגעת לכאן, איפה אתה עומד, ולאן זה מוביל.', 'How you got here, where you stand, where it leads.'),
    positions: [
      { name: x('עבר', 'Past'), meaning: x('השורשים של המצב — מה שהשפיע והוביל עד כאן.', 'The roots of the situation — what led here.') },
      { name: x('הווה', 'Present'), meaning: x('האנרגיה המרכזית שפועלת עכשיו.', 'The main energy at work now.') },
      { name: x('עתיד', 'Future'), meaning: x('הכיוון הצפוי אם הדברים ימשיכו כך — לא גזירה, אלא מגמה.', 'The likely direction if things continue — a trend, not a verdict.') },
    ] },
  love: { label: x('זוגיות (4 קלפים)', 'Relationship (4 cards)'), desc: x('מה כל אחד מביא לקשר, מה ביניכם ולאן הקשר הולך.', 'What each brings, what\'s between you and where it\'s going.'),
    positions: [
      { name: x('אני', 'Me'), meaning: x('מה שאתה מביא לקשר ואיך אתה מרגיש בו.', 'What you bring to the bond and how you feel in it.') },
      { name: x('בן/בת הזוג', 'Partner'), meaning: x('מה שהצד השני מביא ומה עובר עליו.', 'What the other brings and is going through.') },
      { name: x('מה שביניכם', 'Between you'), meaning: x('הדינמיקה והאנרגיה של הקשר עצמו.', 'The dynamic and energy of the bond itself.') },
      { name: x('הכיוון', 'Direction'), meaning: x('לאן הקשר נע, ומה יכול לעזור לו.', 'Where the bond is moving, and what can help it.') },
    ] },
  five: { label: x('פריסת עצה (5 קלפים)', 'Guidance (5 cards)'), desc: x('ניתוח עמוק של מצב: הלב, האתגר, השורש, העצה והתוצאה.', 'A deep look: the heart, the challenge, the root, advice and outcome.'),
    positions: [
      { name: x('לב העניין', 'The heart of it'), meaning: x('מה באמת עומד במרכז השאלה.', 'What truly lies at the centre of the question.') },
      { name: x('האתגר', 'The challenge'), meaning: x('המכשול או הכוח שמקשה עליך.', 'The obstacle or force making it hard.') },
      { name: x('השורש', 'The root'), meaning: x('הסיבה העמוקה — לעיתים לא מודעת.', 'The deep cause — sometimes unconscious.') },
      { name: x('העצה', 'The advice'), meaning: x('הדרך הטובה ביותר לפעול עכשיו.', 'The best way to act now.') },
      { name: x('התוצאה הצפויה', 'Likely outcome'), meaning: x('לאן זה מוביל אם תפעל לפי העצה.', 'Where it leads if you follow the advice.') },
    ] },
};

export const TOPICS: { id: Topic; label: L }[] = [
  { id: 'general', label: x('כללי', 'General') },
  { id: 'love', label: x('אהבה וזוגיות', 'Love') },
  { id: 'work', label: x('עבודה וכסף', 'Work & money') },
  { id: 'self', label: x('צמיחה אישית', 'Personal growth') },
];

/* ---------------- קריאה של הפריסה כולה ---------------- */
const STAGES: { from: number; to: number; name: L; text: L }[] = [
  { from: 0, to: 0, name: x('השוטה — נקודת ההתחלה', 'The Fool — the starting point'), text: x('השוטה עומד מחוץ לשלבים: הוא הנוסע עצמו, תמיד בתחילת דרך.', 'The Fool stands outside the stages: he is the traveller himself, always at the start.') },
  { from: 1, to: 7, name: x('עולם החומר והאגו (I–VII)', 'The world of matter and ego (I–VII)'), text: x('בניית זהות, כישורים, מערכות יחסים ומקום בעולם.', 'Building identity, skills, relationships and a place in the world.') },
  { from: 8, to: 14, name: x('עולם הנפש (VIII–XIV)', 'The world of the psyche (VIII–XIV)'), text: x('מסע פנימה: כוח פנימי, התבוננות, קבלת הגורל, ויתור ואיזון.', 'The journey inward: inner strength, reflection, accepting fate, surrender and balance.') },
  { from: 15, to: 21, name: x('עולם הרוח (XV–XXI)', 'The world of spirit (XV–XXI)'), text: x('מפגש עם הצל, שבירת אשליות, תקווה, התעוררות ושלמות.', 'Meeting the shadow, shattering illusions, hope, awakening and wholeness.') },
];
const stageOf = (n: number) => STAGES.find((s) => n >= s.from && n <= s.to)!;

export interface CardMeta { letter: string; letterName: L; path: number; between: [L, L] }
export function cardMeta(n: number): CardMeta {
  const p = PATHS22.find((q) => q.tarot === n)!;
  return { letter: p.letter, letterName: p.letterName, path: p.n, between: [sephira(p.from).name, sephira(p.to).name] };
}

export interface SpreadReading {
  quintessence: { n: number; name: L; essence: L };
  stages: { name: L; text: L; count: number }[];
  reversedCount: number;
  yesno?: { value: YesNo; text: L };
  summary: L;
}

export function readSpread(cards: DrawnCard[], spread: DeepSpread): SpreadReading {
  let sum = cards.reduce((s, d) => s + d.card.n, 0);
  while (sum > 22) sum = String(sum).split('').reduce((a, c) => a + Number(c), 0);
  const q = sum === 22 ? 0 : sum;
  const qc = MAJOR_ARCANA[q];
  const counts = new Map<string, { name: L; text: L; count: number }>();
  for (const d of cards) {
    const st = stageOf(d.card.n);
    const k = st.name.en;
    counts.set(k, { name: st.name, text: st.text, count: (counts.get(k)?.count ?? 0) + 1 });
  }
  const reversedCount = cards.filter((d) => d.reversed).length;
  const pos = SPREADS[spread].positions;
  const summary: L = {
    he: cards.map((d, i) => `${pos[i].name.he === 'המסר שלך' ? 'המסר שלך' : `במקום "${pos[i].name.he}"`} — ${d.card.name.he}${d.reversed ? ' (הפוך)' : ''}: ${DEEP[d.card.n].essence.he.split('.')[0]}.`).join(' '),
    en: cards.map((d, i) => `In "${pos[i].name.en}" is ${d.card.name.en}${d.reversed ? ' (reversed)' : ''}: ${DEEP[d.card.n].essence.en.split('.')[0]}.`).join(' '),
  };
  let yesno: SpreadReading['yesno'];
  if (cards.length === 1) {
    const d = cards[0];
    let v = DEEP[d.card.n].yesno;
    if (d.reversed) v = v === 'yes' ? 'maybe' : v === 'maybe' ? 'no' : 'maybe';
    yesno = { value: v, text: v === 'yes' ? x('כן — האנרגיה תומכת.', 'Yes — the energy supports it.') : v === 'no' ? x('לא בשלב זה — יש מה לשנות או להבין קודם.', 'Not now — something must change or be understood first.') : x('אולי — התשובה תלויה בך ובזמן.', 'Maybe — it depends on you and timing.') };
  }
  return { quintessence: { n: q, name: qc.name, essence: DEEP[q].essence }, stages: [...counts.values()], reversedCount, yesno, summary };
}
