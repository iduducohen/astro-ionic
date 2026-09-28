/**
 * human-design.ts — Human Design Chart
 * מערכת עיצוב אנושי המשלבת אסטרולוגיה, קבלה, צ'אקרות ופיזיקה קוונטית
 * לפי תאריך הלידה (שעה חשובה!), מקום, ושם
 */

import { type L } from './astro';

export type HDType = 'manifestor' | 'generator' | 'gen-manifesting' | 'projector' | 'reflector';
export type HDAuthority = 'emotional' | 'sacral' | 'splenic' | 'ego' | 'self' | 'none';
export type HDProfile = 1|2|3|4|5|6|7|8|9|10|11|12;

export interface HDType_Data {
  id: HDType;
  name: L;
  percentage: number;
  role: L;
  strategy: L;
  aura: L;
  description: L;
}

export const HD_TYPES: Record<HDType, HDType_Data> = {
  manifestor: {
    id: 'manifestor',
    name: { he: 'מניפסטור', en: 'Manifestor' },
    percentage: 9,
    role: { he: 'היוזם', en: 'The Initiator' },
    strategy: { he: 'הודע לפני שאתה פועל', en: 'Inform before you act' },
    aura: { he: 'דוחה ומופקד', en: 'Repelling and closed' },
    description: { he: 'אתה הכוח היוזם של היקום. אתה באים לעשות דברים, להתחיל מחדש, לנסות דברים חדשים. אבל רבים אינם מבינים את הכוח שלך וחושים כאילו אתה מאיים עליהם. ולכן קריטי לך להודיע לאחרים לפני שאתה פועל. כך שהם יוכלו להכין את עצמם.', en: 'You are the driving force of the universe. You come to initiate, to start fresh, to try new things. But many do not understand your power and feel threatened by you. So it\'s critical for you to inform others before you act, so they can prepare themselves.' }
  },
  generator: {
    id: 'generator',
    name: { he: 'גנרטור', en: 'Generator' },
    percentage: 37,
    role: { he: 'בונה', en: 'The Builder' },
    strategy: { he: 'חכה לתגובה', en: 'Wait for response' },
    aura: { he: 'מושך וחם', en: 'Attracting and warm' },
    description: { he: 'אתה הבונה של העולם. הנשמה שלך פוקדת על עשיית דברים, על עבודה, על בנייה. אתה בעל אנרגיה עצומה, אבל היא לא תמיד כיוונה למקום הנכון. קריטי לך לחכות לתגובה מן היקום - תגובה שתגיד לך כן או לא. ואז אתה יכול לשים את כל אנרגיתך שם.', en: 'You are the builder of the world. Your soul is dedicated to doing, working, building. You have enormous energy, but it\'s not always directed to the right place. Critical for you to wait for a response from the universe—a response that tells you yes or no. Then you can put all your energy there.' }
  },
  'gen-manifesting': {
    id: 'gen-manifesting',
    name: { he: 'גנרטור מניפסטור', en: 'Manifesting Generator' },
    percentage: 32,
    role: { he: 'הגנרטור המהיר', en: 'The Fast Builder' },
    strategy: { he: 'חכה לתגובה, אבל בעמידה שלך', en: 'Wait for response while standing' },
    aura: { he: 'משלב דוחה וחם', en: 'Mixed repelling and warm' },
    description: { he: 'אתה גנרטור עם כושר יוזם. יש לך את האנרגיה של בונה, אבל גם את הדחף של מניפסטור. אתה גדול בעבודות שדורשות תנופה, שינוי מהיר. אבל אתה עדיין צריך לחכות לתגובה כדי לדעת אם אתה בכיוון הנכון.', en: 'You\'re a generator with initiating power. You have the energy of a builder, but also the drive of a manifestor. You\'re great at work that requires momentum, quick change. But you still need to wait for response to know if you\'re heading the right way.' }
  },
  projector: {
    id: 'projector',
    name: { he: 'פרוג\'קטור', en: 'Projector' },
    percentage: 20,
    role: { he: 'המדריך', en: 'The Guide' },
    strategy: { he: 'חכה להזמנה', en: 'Wait for invitation' },
    aura: { he: 'מיקוד וקולט', en: 'Focusing and absorbing' },
    description: { he: 'אתה מומחה טבעי בהנחיית אחרים. אתה רואה מה שאחרים לא רואים, איך הם יכולים להשתפר. אבל אתה לא בנוי כדי לעשות את המעשה בעצמך. אתה צריך להיות מזמן לפי כדי שהאחרים יוכלו ליהנות מההתמחות שלך. אם אתה תוקע עצמך בעבודה ללא הזמנה, אתה תהיה מעוייף וכועס.', en: 'You\'re a natural expert in guiding others. You see what others don\'t see, how they can improve. But you\'re not built to do the action yourself. You need to be invited so others can enjoy your expertise. If you push yourself into work without invitation, you\'ll be exhausted and bitter.' }
  },
  reflector: {
    id: 'reflector',
    name: { he: 'רפלקטור', en: 'Reflector' },
    percentage: 2,
    role: { he: 'המראה', en: 'The Mirror' },
    strategy: { he: 'חכה לחודש לכאן', en: 'Wait a lunar month' },
    aura: { he: 'קלטת וקולטת', en: 'Sampling and absorbing' },
    description: { he: 'אתה מילי אחד בעיר. כמו ירח המשקף את האור של השמש. אתה משקף את הבריאות והמצב של קהילתך. אתה קלטת כל דבר, כל אנרגיה. ולכן קריטי לך לסגור את עצמך לעיתים ולהיות בטוח שאתה מקשיב לקולך שלך, לא לקולות אחרים.', en: 'You\'re one in a city. Like the moon reflecting the light of the sun. You reflect the health and condition of your community. You sample everything, every energy. So it\'s critical for you to close yourself off sometimes and make sure you\'re listening to your own voice, not others\' voices.' }
  }
};

export const HD_AUTHORITIES: Record<HDAuthority, L> = {
  emotional: { he: 'רגשית (סקורל)', en: 'Emotional (Sacral)' },
  sacral: { he: 'סקרלית', en: 'Sacral' },
  splenic: { he: 'טחולית (אינטואיציה)', en: 'Splenic (Intuition)' },
  ego: { he: 'אגו (רוח)', en: 'Ego (Will)' },
  self: { he: 'עצמית (כיווני גוף)', en: 'Self (Body awareness)' },
  none: { he: 'לא קיימת (בחכמה אלוהית)', en: 'None (Divine wisdom)' }
};

export const HD_PROFILES: Record<HDProfile, L> = {
  1: { he: 'התלמיד/ה (1/3) - חוקר בסיסי', en: 'Student (1/3) - basic researcher' },
  2: { he: 'הכושל/ת (1/4) - מומחה שלוקדת', en: 'Heretic (1/4) - expert who stumbles' },
  3: { he: 'המתנסה (2/4) - מתנסה שיודע', en: 'Experimenter (2/4) - knowing experimenter' },
  4: { he: 'המנהיג/ת (2/5) - כוח וידע', en: 'Leader (2/5) - power and knowledge' },
  5: { he: 'התובע (3/5) - כושל ומתקן', en: 'Heretic (3/5) - failing and fixing' },
  6: { he: 'המנהיג המשיח (3/6) - מבחוץ, הוא בפנים', en: 'Savior (3/6) - out then in' },
  7: { he: 'הקול (4/6) - לא מוקשב, אבל משפיע', en: 'Voice (4/6) - unheard, but influential' },
  8: { he: 'המתבונן (5/1) - משימה וביסוד', en: 'Observer (5/1) - mission and foundation' },
  9: { he: 'המצליח (5/2) - משימה וידע', en: 'Success (5/2) - mission and knowledge' },
  10: { he: 'המדריך (6/2) - חוכמה מניסיון', en: 'Guide (6/2) - wisdom from experience' },
  11: { he: 'הרברים (6/3) - דוגמה לתקומה', en: 'Rebel (6/3) - example of resurrection' },
  12: { he: 'הנביא (4/1) - מונח ומבטיח', en: 'Prophet (4/1) - settled and promise' }
};

export interface HumanDesignChart {
  type: HDType_Data;
  authority: HDAuthority;
  profile: HDProfile;
  profileData: L;
  isActivated: boolean; // האם הוא/היא בתוך הדעה שלו
}

/** חישוב Human Design (קירוב בדיוק של שעה) */
export function calculateHumanDesign(y: number, m: number, d: number, hour: number = 12): HumanDesignChart {
  // קירוב פשוט לפי תאריך
  // HD אמיתי דורש חישוב כוכבים מדויק לפי שעת הלידה

  // Type - בהתבסס על חוקי 1-5
  const dayOfYear = (m * 30 + d) % 365;
  const typeId = dayOfYear % 5;
  const types: HDType[] = ['manifestor', 'generator', 'gen-manifesting', 'projector', 'reflector'];
  const type = HD_TYPES[types[typeId]];

  // Authority - בהתבסס על שעה (קירוב)
  const authorityId = hour % 6;
  const authorities: HDAuthority[] = ['emotional', 'sacral', 'splenic', 'ego', 'self', 'none'];
  const authority = authorities[authorityId];

  // Profile - בהתבסס על יום
  const profileId = (dayOfYear % 12) as HDProfile;
  const profileNum = profileId + 1 as HDProfile;

  return {
    type,
    authority,
    profile: profileNum,
    profileData: HD_PROFILES[profileNum],
    isActivated: Math.random() > 0.5 // קירוב לבדיקה
  };
}
