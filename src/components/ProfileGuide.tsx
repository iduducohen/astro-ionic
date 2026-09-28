import { IonIcon } from '@ionic/react';
import {
  sunnyOutline, starOutline, pawOutline, calculatorOutline, textOutline, leafOutline, sparklesOutline, diamondOutline,
  flameOutline, gridOutline, informationCircleOutline,
} from 'ionicons/icons';
import {
  ZODIAC, ELEMENTS, HEBREW_MONTHS, CHINESE_ANIMALS, NUMBER_MEANINGS, CELTIC_TREES, BIRTH_MONTH, type L,
} from '../core';
import { useLang } from '../lang';

const x = (he: string, en: string): L => ({ he, en });
const dm = (d: [number, number]) => `${d[1]}.${d[0]}`;

const MODES: L[] = [x('קרדינלי — יוזם', 'Cardinal — initiating'), x('קבוע — מייצב', 'Fixed — stabilizing'), x('משתנה — מסתגל', 'Mutable — adapting')];
const EL_TEXT: Record<string, L> = {
  fire: x('תשוקה, יוזמה והתלהבות. פועלים מהר ומלהיבים אחרים.', 'Passion, initiative and enthusiasm. Quick to act, inspiring others.'),
  earth: x('מעשיות, יציבות וסבלנות. בונים לאט ולאורך זמן.', 'Practicality, stability and patience. Build slowly and to last.'),
  air: x('מחשבה, תקשורת וחברה. חיים ברעיונות ובשיחות.', 'Thought, communication and company. Live in ideas and conversation.'),
  water: x('רגש, אינטואיציה ואמפתיה. מרגישים את מה שלא נאמר.', 'Feeling, intuition and empathy. Sense what goes unsaid.'),
};
const GEM: [string, number][] = [['א', 1], ['ב', 2], ['ג', 3], ['ד', 4], ['ה', 5], ['ו', 6], ['ז', 7], ['ח', 8], ['ט', 9], ['י', 10], ['כ', 20], ['ל', 30], ['מ', 40], ['נ', 50], ['ס', 60], ['ע', 70], ['פ', 80], ['צ', 90], ['ק', 100], ['ר', 200], ['ש', 300], ['ת', 400]];

/** מדריך מלא למסך "המפה שלי" — כל שיטה, איך מחושבת, וטבלאות מלאות מתוך הנתונים של האפליקציה */
const ProfileGuide: React.FC = () => {
  const { lang: L } = useLang();
  const he = L === 'he';
  const thisYear = new Date().getFullYear();
  const yearOf = (i: number) => { let y = 2020 + i; while (y + 12 <= thisYear) y += 12; return y; }; // 2020 = עכברוש

  const Sec: React.FC<{ icon: string; title: string; children: React.ReactNode; open?: boolean }> = ({ icon, title, children, open }) => (
    <details className="pg-sec" open={open}>
      <summary><span className="pg-ic"><IonIcon icon={icon} aria-hidden="true" /></span>{title}</summary>
      <div className="pg-body">{children}</div>
    </details>
  );

  return (
    <div className="pg">
      <Sec icon={informationCircleOutline} open title={he ? 'מה מקבלים במפה האישית' : 'What your chart includes'}>
        <p>{he ? 'שם ותאריך לידה מספיקים כדי לחשב שמונה שיטות מסורתיות שונות. כל אחת מסתכלת על האדם מזווית אחרת — השמש, החודש העברי, השנה הסינית, המספרים, העצים והאבנים. כשכמה שיטות מצביעות על אותה תכונה, כדאי לשים לב אליה.' : 'A name and birth date are enough for eight traditional systems. Each looks at you from another angle — the Sun, the Hebrew month, the Chinese year, numbers, trees and stones. When several agree on a trait, it is worth noticing.'}</p>
        <ul className="pg-icons">
          {[
            [sunnyOutline, he ? 'מזל מערבי' : 'Western sign'], [starOutline, he ? 'מזל עברי' : 'Hebrew sign'], [pawOutline, he ? 'מזל סיני' : 'Chinese sign'],
            [calculatorOutline, he ? 'מספר דרך החיים' : 'Life path'], [textOutline, he ? 'מספר השם' : 'Name number'], [leafOutline, he ? 'עץ קלטי' : 'Celtic tree'],
            [sparklesOutline, he ? 'קלף הלידה' : 'Birth card'], [diamondOutline, he ? 'אבן ופרח' : 'Stone and flower'],
          ].map(([ic, t]) => <li key={t}><IonIcon icon={ic} aria-hidden="true" />{t}</li>)}
        </ul>
      </Sec>

      <Sec icon={sunnyOutline} title={he ? 'המזל המערבי — 12 המזלות' : 'Western sign — the 12 signs'}>
        <p>{he ? 'המזל נקבע לפי המקום של השמש בגלגל המזלות ביום הלידה. התאריכים יכולים לזוז ביום בין שנים, כי השמש לא נכנסת למזל בדיוק באותה שעה בכל שנה. כל מזל שייך ליסוד אחד ולאחת משלוש איכויות, ולכל מזל כוכב שולט.' : 'Your sign is where the Sun stood in the zodiac on your birthday. Dates can shift by a day between years. Each sign has an element, a mode and a ruling planet.'}</p>
        <div className="pg-table-wrap"><table className="pg-table">
          <thead><tr><th>{he ? 'מזל' : 'Sign'}</th><th>{he ? 'תאריכים' : 'Dates'}</th><th>{he ? 'יסוד' : 'Element'}</th><th>{he ? 'איכות' : 'Mode'}</th><th>{he ? 'שליט' : 'Ruler'}</th></tr></thead>
          <tbody>{ZODIAC.map((z, i) => (
            <tr key={z.id}><td><span className="pg-sym">{z.symbol}{'︎'}</span> {z.name[L]}</td><td className="ltr">{dm(z.from)}–{dm(z.to)}</td><td>{ELEMENTS[z.element][L]}</td><td>{MODES[i % 3][L].split(' — ')[0]}</td><td>{z.ruler[L]}</td></tr>
          ))}</tbody>
        </table></div>
      </Sec>

      <Sec icon={flameOutline} title={he ? 'ארבעת היסודות ושלוש האיכויות' : 'The four elements and three modes'}>
        <dl className="pg-dl">
          {(Object.keys(ELEMENTS) as (keyof typeof ELEMENTS)[]).map((k) => (
            <div key={k}><dt>{ELEMENTS[k][L]} · {ZODIAC.filter((z) => z.element === k).map((z) => z.name[L]).join(', ')}</dt><dd>{EL_TEXT[k][L]}</dd></div>
          ))}
        </dl>
        <p>{he ? 'האיכות מתארת איך האנרגיה פועלת: מזלות קרדינליים (טלה, סרטן, מאזניים, גדי) פותחים עונה ויוזמים; קבועים (שור, אריה, עקרב, דלי) מייצבים ומתמידים; משתנים (תאומים, בתולה, קשת, דגים) מסיימים עונה ומסתגלים.' : 'The mode describes how the energy works: cardinal signs start seasons and initiate; fixed signs stabilize and persist; mutable signs end seasons and adapt.'}</p>
      </Sec>

      <Sec icon={starOutline} title={he ? 'המזל העברי — חודשים ושבטים' : 'Hebrew sign — months and tribes'}>
        <p>{he ? 'לפי ספר יצירה והמסורת, לכל חודש עברי יש מזל ושבט. התאריך הלועזי מומר ללוח העברי; היום העברי מתחיל בשקיעה, ולכן מי שנולד בערב נמצא כבר ביום הבא. בשנה מעוברת יש אדר א׳ ואדר ב׳, ושניהם במזל דגים. בגלל ההפרש בין הלוחות, המזל העברי שונה לפעמים מהמערבי.' : 'Each Hebrew month has a sign and a tribe. Your date is converted to the Hebrew calendar; the Hebrew day begins at sunset. Leap years have Adar I and II, both Pisces. Because the calendars drift, your Hebrew sign may differ from your Western one.'}</p>
        <div className="pg-table-wrap"><table className="pg-table">
          <thead><tr><th>{he ? 'חודש' : 'Month'}</th><th>{he ? 'מזל' : 'Sign'}</th><th>{he ? 'שבט' : 'Tribe'}</th></tr></thead>
          <tbody>{HEBREW_MONTHS.filter((m) => m.id !== 'adar1' && m.id !== 'adar2').map((m) => {
            const z = ZODIAC.find((s) => s.id === m.signId)!;
            return <tr key={m.id}><td>{m.name[L]}</td><td><span className="pg-sym">{z.symbol}{'︎'}</span> {z.name[L]}</td><td>{m.tribe[L]}</td></tr>;
          })}</tbody>
        </table></div>
      </Sec>

      <Sec icon={pawOutline} title={he ? 'המזל הסיני — 12 חיות ו-5 יסודות' : 'Chinese sign — 12 animals, 5 elements'}>
        <p>{he ? 'הלוח הסיני בנוי ממחזור של 60 שנה: 12 חיות × 5 יסודות (עץ, אש, אדמה, מתכת, מים), וכל שנה גם יין או יאנג. השנה הסינית מתחילה במולד השני אחרי היפוך החורף — בין 21 בינואר ל-20 בפברואר — ולכן מי שנולד בינואר או בתחילת פברואר שייך בדרך כלל לחיה של השנה הקודמת.' : 'The Chinese calendar is a 60-year cycle: 12 animals × 5 elements, each year yin or yang. The year starts at the second new moon after the winter solstice (21 Jan–20 Feb), so January births usually belong to the previous year\'s animal.'}</p>
        <div className="pg-animals">
          {CHINESE_ANIMALS.map((a, i) => (
            <div key={a.id} className="pg-animal"><span className="pg-emoji" aria-hidden="true">{a.emoji}</span><b>{a.name[L]}</b><span className="muted">{yearOf(i) - 12}, {yearOf(i)}</span></div>
          ))}
        </div>
      </Sec>

      <Sec icon={calculatorOutline} title={he ? 'מספר דרך החיים' : 'Life path number'}>
        <p>{he ? 'מחברים את ספרות היום, החודש והשנה, כל אחד בנפרד, ומצמצמים עד ספרה אחת. 11, 22 ו-33 הם "מספרי מאסטר" ולא מצומצמים.' : 'Add the digits of day, month and year separately, then reduce to one digit. 11, 22 and 33 are "master numbers" and are not reduced.'}</p>
        <p className="pg-example">{he ? 'דוגמה: 15.3.1990 ← יום 1+5=6 · חודש 3 · שנה 1+9+9+0=19←10←1 · 6+3+1=10 ← 1+0 = 1' : 'Example: 15.3.1990 → day 1+5=6 · month 3 · year 1+9+9+0=19→10→1 · 6+3+1=10 → 1'}</p>
        <dl className="pg-dl">
          {Object.entries(NUMBER_MEANINGS).map(([n, m]) => <div key={n}><dt><span className="pg-num">{n}</span> {m.title[L]}</dt><dd>{m.text[L]}</dd></div>)}
        </dl>
      </Sec>

      <Sec icon={textOutline} title={he ? 'מספר השם וגימטריה' : 'Name number and gematria'}>
        <p>{he ? 'בשם בעברית מחברים את ערכי האותיות לפי הגימטריה (אותיות סופיות שוות לרגילות), ומצמצמים. בשם באותיות לועזיות משתמשים בשיטה הפיתגוראית: A=1 … I=9, J=1 וחוזר חלילה. המספר מתאר את האופן שבו אחרים חווים אותך.' : 'For a Hebrew name, add the letter values by gematria (final forms count like regular ones) and reduce. For Latin letters the Pythagorean system is used: A=1…I=9, J=1 and so on. The number describes how others experience you.'}</p>
        <div className="pg-gem">{GEM.map(([l, v]) => <span key={l}><b>{l}</b>{v}</span>)}</div>
      </Sec>

      <Sec icon={leafOutline} title={he ? 'העץ הקלטי' : 'Celtic tree'}>
        <p>{he ? 'לוח עצים בהשראת הא״ב האירי העתיק (אוגהם), שמחלק את השנה ל-13 חודשי ירח, לכל אחד עץ ותכונה. זו מסורת שעוצבה בעיקר במאה ה-20, ומשמשת כהשראה ולא כשיטה עתיקה מדויקת.' : 'A tree calendar inspired by the Irish Ogham alphabet, dividing the year into 13 lunar months, each with a tree. Largely shaped in the 20th century, it is inspirational rather than an exact ancient system.'}</p>
        <div className="pg-table-wrap"><table className="pg-table">
          <thead><tr><th>{he ? 'עץ' : 'Tree'}</th><th>{he ? 'תאריכים' : 'Dates'}</th><th>{he ? 'תכונה' : 'Trait'}</th></tr></thead>
          <tbody>{CELTIC_TREES.map((t) => <tr key={t.name.en}><td>{t.name[L]}</td><td className="ltr">{dm(t.from)}–{dm(t.to)}</td><td>{t.text[L].split('.')[0]}</td></tr>)}</tbody>
        </table></div>
      </Sec>

      <Sec icon={sparklesOutline} title={he ? 'קלף הלידה בטארוט' : 'Tarot birth card'}>
        <p>{he ? 'מחברים את כל ספרות תאריך הלידה כמספר אחד (למשל 1990+3+15 ← 1+9+9+0+3+1+5 = 28), ומצמצמים עד שמתקבל מספר בין 1 ל-22. המספר הוא הקלף בארקנה הגדולה (22 הוא השוטה). הקלף מתאר נושא מרכזי שחוזר בחיים — מעין "שיעור" אישי.' : 'Add all the digits of your birth date as one (e.g. 1+9+9+0+3+1+5 = 28) and reduce until you get 1–22. That is your Major Arcana card (22 is the Fool) — a theme that recurs through life.'}</p>
      </Sec>

      <Sec icon={diamondOutline} title={he ? 'אבן, צבע ופרח לפי חודש' : 'Stone, colour and flower by month'}>
        <p>{he ? 'אבני החודשים המודרניות נקבעו בארה״ב ב-1912, בהשראת 12 אבני החושן של הכהן הגדול — אבן לכל שבט. הפרחים לפי חודש מגיעים ממסורת אנגלית.' : 'The modern birthstones were set in the US in 1912, inspired by the 12 stones of the High Priest\'s breastplate — one per tribe. Birth flowers come from English tradition.'}</p>
        <div className="pg-table-wrap"><table className="pg-table">
          <thead><tr><th>{he ? 'חודש' : 'Month'}</th><th>{he ? 'אבן' : 'Stone'}</th><th>{he ? 'פרח' : 'Flower'}</th></tr></thead>
          <tbody>{BIRTH_MONTH.map((b, i) => (
            <tr key={i}><td>{new Intl.DateTimeFormat(he ? 'he' : 'en', { month: 'long' }).format(new Date(2000, i, 1))}</td><td><span className="swatch" style={{ background: b.color }} />{b.stone[L]}</td><td>{b.flower[L]}</td></tr>
          ))}</tbody>
        </table></div>
      </Sec>

      <Sec icon={gridOutline} title={he ? 'דיוק ומגבלות' : 'Accuracy and limits'}>
        <p>{he ? 'כל החישובים מתבצעים במכשיר. המזל המערבי כאן מבוסס על טבלת תאריכים; לחישוב מדויק לפי שעה ומקום (כולל מזל עולה וירח) השתמשו ב"מפת לידה" במסך אסטרולוגיה. המזל העברי והסיני מחושבים לפי לוחות השנה של הדפדפן/המכשיר.' : 'Everything is calculated on your device. The Western sign uses a date table; for a precise chart by time and place (with Ascendant and Moon) use the Birth chart in Astrology. Hebrew and Chinese signs use the device calendar.'}</p>
      </Sec>
    </div>
  );
};

export default ProfileGuide;
