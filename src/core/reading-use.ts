/**
 * reading-use.ts — מה כל שורה במפה האישית נותנת למשתמש, בשפה יומיומית.
 */
import type { L } from './astro';

const x = (he: string, en: string): L => ({ he, en });

/** מה הירח אומר על היום הרגיל: מה מרגיע, ומה מכביד. */
export const MOON_NEED: Record<string, L> = {
  aries: x('כשנגמר הכוח, אתה צריך לזוז, לא לשבת ולנתח. הליכה, ספורט או החלטה מהירה מרגיעים יותר משיחה ארוכה. מה שמכביד: לחכות שמישהו יבין לבד.', 'When you are drained, you need to move, not sit and analyse. A walk, sport or a quick decision calms you more than a long talk. What weighs on you: waiting for someone else to figure it out.'),
  taurus: x('אתה צריך שקט, אוכל טוב ומקום שלא זז כל הזמן. לחץ ושינוי פתאומי מעייפים אותך יותר מיום עבודה. מה שמרגיע: שגרה, מגע, ובית שנעים להיות בו.', 'You need quiet, good food and a place that is not constantly changing. Pressure and a sudden change tire you more than a workday. What calms you: routine, touch, and a home that feels good.'),
  gemini: x('אתה צריך לספר למישהו מה עובר עליך, גם אם זה נשמע קטן. שתיקה ארוכה מרגישה כמו כלא. מה שמרגיע: שיחה, הודעה לחבר, או משהו חדש לקרוא.', 'You need to tell someone what is going on, even if it sounds small. A long silence feels like a cage. What calms you: a conversation, a message to a friend, or something new to read.'),
  cancer: x('אתה צריך להרגיש שמישהו שלך קרוב. כשקר, אתה נסגר ומטפל בכולם במקום בעצמך. מה שמרגיע: בית, אוכל, ואדם אחד שאפשר להיות איתו בלי להסביר.', 'You need to feel that someone of yours is close. When it is cold, you shut down and look after everyone else. What calms you: home, food, and one person you can be with without explaining.'),
  leo: x('אתה צריך שייראו אותך, גם בבית. התעלמות כואבת יותר מביקורת. מה שמרגיע: מחמאה אמיתית, משהו שיצרת, וזמן שאתה במרכז בלי להתנצל על זה.', 'You need to be seen, including at home. Being ignored hurts more than criticism. What calms you: a real compliment, something you made, and time in the centre without apologising for it.'),
  virgo: x('אתה צריך סדר קטן כדי שהראש יירגע. בלגן בחדר הופך מהר לבלגן ברגש. מה שמרגיע: לסדר דבר אחד, רשימה קצרה, ותחושה שהגוף בסדר.', 'You need a little order before your mind can rest. A messy room quickly becomes a messy feeling. What calms you: tidying one thing, a short list, and the sense that your body is all right.'),
  libra: x('כשאתה לבד, עייף או בבית, אתה צריך שיהיה שקט והוגן. ויכוח קטן מעייף אותך יותר מיום עמוס. מה שמרגיע: שיחה בלי מנצח ומפסיד, חדר שנעים להיות בו, והרגשה שאף אחד לא יצא פגוע.', 'When you are alone, tired or at home, you need things to be calm and fair. A small argument tires you more than a full day. What calms you: a talk with no winner, a room that feels good, and the sense that nobody left hurt.'),
  scorpio: x('אתה מרגיש עמוק ולא מספר הכל. שיחה שטחית לא מרגיעה, היא רק מעייפת. מה שמרגיע: אדם אחד שאפשר לסמוך עליו, ושקט בלי שחוקרים אותך.', 'You feel deeply and do not tell everything. Small talk does not calm you, it only tires you. What calms you: one person you can trust, and quiet without being questioned.'),
  sagittarius: x('אתה צריך אוויר ותחושה שיש לאן ללכת. גם מקום נעים הופך לכבד אם אי אפשר לצאת ממנו. מה שמרגיע: יציאה, שיחה על משהו גדול, וחופש בלי דין וחשבון.', 'You need air and the feeling that there is somewhere to go. Even a pleasant place gets heavy if you cannot leave it. What calms you: going out, a talk about something big, and freedom without an account of your time.'),
  capricorn: x('אתה נרגע כשיש תוכנית. כאוס מרגיש כמו סכנה, גם כשאין סכנה. מה שמרגיע: משימה שנגמרת, אחריות שאתה עומד בה, ומנוחה בלי אשמה.', 'You settle when there is a plan. Chaos feels like danger, even when it is not. What calms you: a task that gets finished, a duty you have met, and rest without guilt.'),
  aquarius: x('אתה צריך קודם לחשוב לבד, ורק אחר כך לחזור לאנשים. קרבה צפופה מדי חונקת. מה שמרגיע: חבר שמבין בלי לדרוש, ורעיון חדש שאפשר לסובב בראש.', 'You need to think alone first, and only then come back to people. Closeness that is too tight is suffocating. What calms you: a friend who understands without demanding, and a new idea to turn over.'),
  pisces: x('אתה סופג את מצב הרוח של החדר. רעש ואנשים עייפים נכנסים אליך בלי שביקשת. מה שמרגיע: מים, מוזיקה, וזמן לבד בלי מסך.', 'You absorb the mood of the room. Noise and tired people get inside you without being invited. What calms you: water, music, and time alone without a screen.'),
};

/** איך זרים קוראים אותך בדקה הראשונה. */
export const RISE_FACE: Record<string, L> = {
  aries: x('זרים רואים אותך ישיר ומהיר. לפעמים זה נשמע חד, עוד לפני שהספקת להסביר. מה זה נותן לך: לדעת שהרושם הראשון חזק, וכדאי לרכך משפט אחד בהתחלה.', 'Strangers see you as direct and fast. Sometimes that sounds sharp, before you have explained. What this gives you: the first impression is strong, so soften one sentence at the start.'),
  taurus: x('זרים רואים אותך רגוע ויציב. לוקח להם רגע להבין שיש גם עקשנות. מה זה נותן לך: אנשים סומכים עליך מהר, אז שווה להגיד מוקדם מה לא זז אצלך.', 'Strangers see you as calm and steady. It takes them a moment to notice the stubbornness too. What this gives you: people trust you quickly, so say early what will not move.'),
  gemini: x('זרים רואים אותך קל, מדבר וסקרן. השיחה נפתחת מהר. מה זה נותן לך: קל לך להתחיל עם אנשים, וכדאי להישאר עוד דקה כדי שלא יחשבו שכבר עברת הלאה.', 'Strangers see you as light, talkative and curious. The conversation opens fast. What this gives you: it is easy to start with people, and worth staying one more minute so they do not think you already moved on.'),
  cancer: x('זרים רואים אותך זהיר ונעים. החום יוצא רק אחרי שמכירים. מה זה נותן לך: לא להילחץ אם בהתחלה אתה נראה סגור. זה לא חוסר עניין, זה בדיקה.', 'Strangers see you as careful and pleasant. The warmth comes out only after they know you. What this gives you: do not worry if you seem closed at first. That is a check, not a lack of interest.'),
  leo: x('זרים רואים אותך בטוח וחם. אתה תופס מקום בחדר בלי להתאמץ. מה זה נותן לך: אנשים פונים אליך כשצריך מישהו שיוביל, אז כדאי גם להקשיב לפני שאתה תופס את הבמה.', 'Strangers see you as confident and warm. You take up space in the room without trying. What this gives you: people turn to you when someone needs to lead, so listen before you take the stage.'),
  virgo: x('זרים רואים אותך מסודר וענייני. הרושם הוא שאפשר לסמוך עליך בפרטים. מה זה נותן לך: נותנים לך משימות מדויקות. מותר גם להגיד כשזה כבר יותר מדי.', 'Strangers see you as tidy and practical. The impression is that the details are safe with you. What this gives you: you get the precise tasks. You are allowed to say when that is already too much.'),
  libra: x('זרים רואים אותך נעים, מנומס ומישהו שקל לדבר איתו. קשה להם לדעת מה אתה באמת רוצה. מה זה נותן לך: הדלת נפתחת בקלות, וכדאי להגיד העדפה אחת ברורה כדי שלא יחליטו בשבילך.', 'Strangers see you as pleasant, polite and easy to talk to. It is hard for them to tell what you actually want. What this gives you: the door opens easily, and it is worth stating one clear preference so they do not decide for you.'),
  scorpio: x('זרים רואים אותך שקט וחזק. יש מבט שנשאר, גם בלי הרבה מילים. מה זה נותן לך: אנשים מתייחסים אליך ברצינות מהר. חיוך אחד בהתחלה פותח את מי שנבהל מהשקט.', 'Strangers see you as quiet and strong. The look stays, even without many words. What this gives you: people take you seriously quickly. One smile at the start opens anyone who was scared by the quiet.'),
  sagittarius: x('זרים רואים אותך פתוח וצוחק. אתה נותן תחושה שהכל אפשרי. מה זה נותן לך: קל להתחבר אליך, וכדאי לא להבטיח בחום של הדקה הראשונה משהו שאין לך כוח לקיים.', 'Strangers see you as open and laughing. You make everything feel possible. What this gives you: it is easy to connect with you, and worth not promising in the warmth of the first minute something you cannot keep.'),
  capricorn: x('זרים רואים אותך רציני ואחראי, לפעמים מבוגר מהגיל. מה זה נותן לך: סומכים עליך עם דברים חשובים. מותר גם להראות שאתה יודע לצחוק, כדי שלא יחשבו שאתה רק עבודה.', 'Strangers see you as serious and responsible, sometimes older than your age. What this gives you: they trust you with important things. You are allowed to show you can laugh, so they do not think you are only work.'),
  aquarius: x('זרים רואים אותך שונה, חד, וקצת מרוחק. מעניין, ולא תמיד קל לקרוא. מה זה נותן לך: זוכרים אותך. משפט אישי אחד, לא רק רעיון, מקרב את מי שרוצה להכיר.', 'Strangers see you as different, sharp, and a little distant. Memorable, and not always easy to read. What this gives you: people remember you. One personal sentence, not only an idea, brings closer anyone who wants to know you.'),
  pisces: x('זרים רואים אותך רך וקשוב. לפעמים נדמה שאתה במקום אחר. מה זה נותן לך: אנשים נפתחים אליך מהר. כדאי לשמור גבול קטן, כדי שלא יישפך אליך כל מה שיש להם.', 'Strangers see you as soft and attentive. Sometimes you seem to be somewhere else. What this gives you: people open up to you quickly. Keep a small boundary, so everything they carry does not pour into you.'),
};

export const CN_ELEMENT: Record<string, L> = {
  'עץ': x('עץ אומר שאתה צומח ומתחיל דברים, ופחות נוח לך לעמוד במקום.', 'Wood means you grow and start things, and standing still does not suit you.'),
  'Wood': x('עץ אומר שאתה צומח ומתחיל דברים, ופחות נוח לך לעמוד במקום.', 'Wood means you grow and start things, and standing still does not suit you.'),
  'אש': x('אש אומרת שאתה חם, בולט, ומדליק אנשים סביבך.', 'Fire means you are warm, visible, and you light up the people around you.'),
  'Fire': x('אש אומרת שאתה חם, בולט, ומדליק אנשים סביבך.', 'Fire means you are warm, visible, and you light up the people around you.'),
  'אדמה': x('אדמה אומרת שאתה יציב, דואג, ומעדיף משהו שאפשר לבנות עליו.', 'Earth means you are steady, caring, and you prefer something you can build on.'),
  'Earth': x('אדמה אומרת שאתה יציב, דואג, ומעדיף משהו שאפשר לבנות עליו.', 'Earth means you are steady, caring, and you prefer something you can build on.'),
  'מתכת': x('מתכת אומרת שאתה מדייק, שומר על רמה, ולא אוהב עבודה שנשארת חצי גמורה.', 'Metal means you are precise, you keep a standard, and you dislike work left half done.'),
  'Metal': x('מתכת אומרת שאתה מדייק, שומר על רמה, ולא אוהב עבודה שנשארת חצי גמורה.', 'Metal means you are precise, you keep a standard, and you dislike work left half done.'),
  'מים': x('מים אומרים שאתה קולט אנשים, מסתגל, וחושב לפני שאתה זז.', 'Water means you read people, adapt, and think before you move.'),
  'Water': x('מים אומרים שאתה קולט אנשים, מסתגל, וחושב לפני שאתה זז.', 'Water means you read people, adapt, and think before you move.'),
};

export const CN_POLE: Record<string, L> = {
  'יין': x('הצד שלך שקט יותר: הכוח עובד מבפנים, לא חייב להיות הקול הכי רם בחדר.', 'Your side is the quieter one: the strength works from inside, and does not have to be the loudest voice in the room.'),
  'Yin': x('הצד שלך שקט יותר: הכוח עובד מבפנים, לא חייב להיות הקול הכי רם בחדר.', 'Your side is the quieter one: the strength works from inside, and does not have to be the loudest voice in the room.'),
  'יאנג': x('הצד שלך יוצא החוצה: רואים את האנרגיה, והיוזמה מגיעה ממך.', 'Your side comes outward: the energy is visible, and the initiative comes from you.'),
  'Yang': x('הצד שלך יוצא החוצה: רואים את האנרגיה, והיוזמה מגיעה ממך.', 'Your side comes outward: the energy is visible, and the initiative comes from you.'),
};

/** משפט שימוש למספר, אחרי תיאור הסגנון. */
export const NUMBER_USE: Record<number, L> = {
  1: x('מה זה נותן לך: לבחור תפקיד שבו אתה מחליט, לא תפקיד שבו ממתינים לאישור על כל צעד.', 'What this gives you: pick a role where you decide, not one where every step waits for approval.'),
  2: x('מה זה נותן לך: לחפש עבודה וקשר שבנויים על שיתוף. לבד אתה נשחק, ביחד אתה מדויק.', 'What this gives you: look for work and a bond built on sharing. Alone you wear out; together you are precise.'),
  3: x('מה זה נותן לך: לתת מקום לדיבור, לכתיבה או ליצירה. בלי ביטוי אתה נעשה כבד.', 'What this gives you: make room for speech, writing or making something. Without expression you get heavy.'),
  4: x('מה זה נותן לך: לבנות לאט ולשמור על סדר. קפיצות בלי בסיס עולות לך יותר מאשר לאחרים.', 'What this gives you: build slowly and keep order. Jumps without a base cost you more than they cost other people.'),
  5: x('מה זה נותן לך: להכניס שינוי בכוונה, לפני שהשעמום שובר משהו. חופש קטן ביום שומר על השאר.', 'What this gives you: put change in on purpose, before boredom breaks something. A little freedom in the day protects the rest.'),
  6: x('מה זה נותן לך: לדאוג לאחרים, וגם לקבוע מתי אתה נח. בלי הגבול הזה הנתינה הופכת לעייפות.', 'What this gives you: look after others, and also decide when you rest. Without that limit, giving turns into exhaustion.'),
  7: x('מה זה נותן לך: זמן שקט ללמוד ולהבין. בלי זה אתה עונה מהר מדי, ואחר כך מתחרט.', 'What this gives you: quiet time to learn and understand. Without it you answer too fast, and regret it later.'),
  8: x('מה זה נותן לך: לכוון לתפקיד עם אחריות וכסף, לא רק לרעיון יפה. בלי סמכות אתה משתעמם.', 'What this gives you: aim at a role with responsibility and money, not only a nice idea. Without authority you get bored.'),
  9: x('מה זה נותן לך: עבודה או קשר שיש בהם משמעות לאחרים. בלי זה ההצלחה מרגישה ריקה.', 'What this gives you: work or a bond that means something to other people. Without that, success feels empty.'),
  11: x('מה זה נותן לך: להקשיב לתחושה, ואז לבדוק אותה במציאות. האינטואיציה חזקה, והיא צריכה גם עובדות.', 'What this gives you: listen to the feeling, then check it against real life. The intuition is strong, and it still needs facts.'),
  22: x('מה זה נותן לך: פרויקט גדול שאפשר לגעת בו, לא רק חלום. אתה בנוי לבנות משהו שנשאר.', 'What this gives you: a big project you can touch, not only a dream. You are built to make something that stays.'),
  33: x('מה זה נותן לך: ללמד או לרפא, וגם לשמור כוח לעצמך. הנתינה עובדת רק אם אתה לא נגמר.', 'What this gives you: teach or heal, and also keep strength for yourself. The giving works only if you do not run out.'),
};

export const STONE_NOTE: L[] = [
  x('הגרנט הוא תזכורת להתחיל: אומץ קטן, צעד אחד, בלי לחכות שיהיה מושלם. הפרח, ציפורן, אומר אותו דבר בחום.', 'Garnet is a reminder to begin: a little courage, one step, without waiting for perfect. The carnation says the same thing, warmly.'),
  x('האמטיסט הוא תזכורת לעצור לפני תגובה. הסגול אומר רוגע, לא קמע. הסיגלית אומרת אותו דבר בשקט.', 'Amethyst is a reminder to pause before you react. The purple means calm, not a charm. The violet says the same thing quietly.'),
  x('האקוומרין הוא תזכורת להגיד את הדבר בפשטות. הנרקיס אומר התחלה נקייה של עונה.', 'Aquamarine is a reminder to say the thing simply. The daffodil means a clean start to a season.'),
  x('היהלום הוא תזכורת לבהירות: לא לטשטש כשאפשר להגיד ישר. החיננית אומרת פשטות, לא ראווה.', 'The diamond is a reminder of clarity: do not blur what can be said straight. The daisy means simplicity, not display.'),
  x('האמרלד הוא תזכורת לצמיחה איטית. שושנת העמקים אומרת לטפח משהו קטן עד שהוא מחזיק.', 'The emerald is a reminder of slow growth. Lily of the valley means tending something small until it holds.'),
  x('הפנינה היא תזכורת לכוח שקט: רוך שמחזיק, לא רעש. הוורד אומר אותו דבר על קשר ששומרים עליו.', 'The pearl is a reminder of quiet strength: softness that holds, not noise. The rose says the same about a bond you look after.'),
  x('הרובי הוא תזכורת ללב פתוח: לתת בלי להתבייש. הדורבנית אומרת צבע ונוכחות.', 'The ruby is a reminder of an open heart: give without being ashamed of it. Larkspur means colour and presence.'),
  x('הפרידוט הוא תזכורת לשים לב לפרטים הקטנים. הסייפן אומר זקיפות: לעמוד על מה שחשוב.', 'Peridot is a reminder to notice the small details. Gladiolus means standing up for what matters.'),
  x('הספיר הוא תזכורת להגיד אמת גם כשנוח לשתוק. האסטר אומרת עונה של בהירות.', 'Sapphire is a reminder to tell the truth even when silence is easier. The aster means a season of clarity.'),
  x('האופל הוא תזכורת שמותר להיות יותר מדבר אחד. ציפורני החתול אומרות חום בתוך שינוי.', 'Opal is a reminder that you are allowed to be more than one thing. Marigold means warmth inside change.'),
  x('הטופז הוא תזכורת לשמור על חום גם בעונה כבדה. החרצית אומרת נאמנות לאורך זמן.', 'Topaz is a reminder to keep warmth even in a heavy season. Chrysanthemum means loyalty over time.'),
  x('הטורקיז הוא תזכורת לשמור על מי שקרוב, בלי להיסגר מפני כולם. נרקיס החורף אומר אור קטן באמצע עונה קרה.', 'Turquoise is a reminder to protect the people close to you, without closing the door on everyone. Paperwhite means a small light in a cold season.'),
];

/** למה כל תחום חיים קיים על המסך. */
export const AREA_WHY: Record<'career' | 'money' | 'love' | 'health' | 'strengths' | 'challenges', L> = {
  career: x('זה עוזר לבחור עבודה שלא תשעמם אותך, ולראות לאן לכוון בעוד כמה שנים.', 'This helps you pick work that will not bore you, and see where to aim a few years out.'),
  money: x('זה אומר איפה הכסף בורח לך, ומה הרגל אחד שומר עליו.', 'This says where money slips away, and which one habit keeps it.'),
  love: x('זה אומר מה אתה צריך מבן או בת הזוג כדי שהקשר יחזיק, לא רק כדי שיתחיל.', 'This says what you need from a partner for the bond to last, not only to start.'),
  health: x('זה לא אבחון. זה אומר איפה הגוף שלך מגיב ראשון ללחץ, ומה כדאי לשמור.', 'This is not a diagnosis. It says where your body answers stress first, and what is worth protecting.'),
  strengths: x('זה מה שכדאי להשתמש בו בכוונה, בעבודה ובקשר, כי זה כבר עובד אצלך.', 'This is what to use on purpose, at work and in a bond, because it already works for you.'),
  challenges: x('זה המקום שנתקעים בו. לדעת אותו מראש חוסך את אותו ויכוח עם עצמך.', 'This is where you get stuck. Knowing it in advance saves the same argument with yourself.'),
};
