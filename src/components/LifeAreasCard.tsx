import { IonIcon } from '@ionic/react';
import {
  briefcaseOutline, cashOutline, heartOutline, fitnessOutline, thumbsUpOutline, alertCircleOutline, peopleOutline, starOutline,
} from 'ionicons/icons';
import type { Profile } from '../core';
import { lifeAreas } from '../core/life-areas';
import { useLang } from '../lang';

/** פירוט המפה לפי תחומי חיים: קריירה, כסף, אהבה, בריאות, חוזקות, אתגרים, התאמות ומזל */
const LifeAreasCard: React.FC<{ p: Profile }> = ({ p }) => {
  const { lang: L } = useLang();
  const he = L === 'he';
  const a = lifeAreas(p);
  const sign = p.western.name[L];
  const rows: { icon: string; title: string; body: React.ReactNode }[] = [
    { icon: briefcaseOutline, title: he ? 'קריירה ועבודה' : 'Career', body: <>
      <p>{a.areas.career[L]}</p>
      <p className="la-extra"><b>{he ? `לפי דרך החיים ${p.lifePath}:` : `By life path ${p.lifePath}:`}</b> {a.lifePath.career[L]}</p></> },
    { icon: cashOutline, title: he ? 'כסף' : 'Money', body: <p>{a.areas.money[L]}</p> },
    { icon: heartOutline, title: he ? 'אהבה וזוגיות' : 'Love', body: <>
      <p>{a.areas.love[L]}</p>
      <p className="la-extra"><b>{he ? `לפי דרך החיים ${p.lifePath}:` : `By life path ${p.lifePath}:`}</b> {a.lifePath.love[L]}</p></> },
    { icon: fitnessOutline, title: he ? 'בריאות ואנרגיה' : 'Health & energy', body: <>
      <p>{a.areas.health[L]}</p>
      <p className="la-extra">{a.healthEl[L]}</p></> },
    { icon: thumbsUpOutline, title: he ? 'חוזקות' : 'Strengths', body: <p>{a.areas.strengths[L]}</p> },
    { icon: alertCircleOutline, title: he ? 'אתגרים לעבודה' : 'Challenges', body: <p>{a.areas.challenges[L]}</p> },
    { icon: peopleOutline, title: he ? 'מי מתאים לך' : 'Who suits you', body: <>
      <p><b>{he ? 'מזלות מערביים: ' : 'Western signs: '}</b>{a.matchSigns.map((s) => s[L]).join(he ? ', ' : ', ')}</p>
      <p><b>{he ? 'חיות סיניות (אותו משולש): ' : 'Chinese animals (same trine): '}</b>{a.matchAnimals.map((s) => s[L]).join(', ')}</p></> },
    { icon: starOutline, title: he ? 'מזל טוב' : 'Lucky', body: <>
      <p><b>{he ? 'יום: ' : 'Day: '}</b>{a.luckyDay[L]} · <b>{he ? 'מספרים: ' : 'Numbers: '}</b>{a.luckyNumbers.join(', ')} · <b>{he ? 'אבן: ' : 'Stone: '}</b>{p.birth.stone[L]}</p></> },
  ];
  return (
    <section className="la">
      <h2 className="section-label">{he ? `תחומי החיים — ${sign}` : `Life areas — ${sign}`}</h2>
      <p className="la-intro">{he ? 'פירוט לפי המזל המערבי, דרך החיים והמזל הסיני. זו תמונה כללית — למפה מדויקת לפי שעה ומקום, השתמשו ב"מפת לידה" במסך אסטרולוגיה.' : 'Based on your sign, life path and Chinese sign. A general picture — for a precise chart by time and place, use the Birth chart in Astrology.'}</p>
      <div className="la-grid">
        {rows.map((r) => (
          <article key={r.title} className="la-item">
            <h3><span className="sys-ic"><IonIcon icon={r.icon} aria-hidden="true" /></span>{r.title}</h3>
            {r.body}
          </article>
        ))}
      </div>
    </section>
  );
};

export default LifeAreasCard;
