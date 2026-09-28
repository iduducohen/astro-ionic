import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import {
  eyeOutline, sparklesOutline, heartOutline, briefcaseOutline, leafOutline, swapVerticalOutline, bulbOutline,
  helpCircleOutline, gitNetworkOutline, layersOutline, compassOutline,
} from 'ionicons/icons';
import type { DrawnCard } from '../core';
import { DEEP, SPREADS, cardMeta, readSpread, type DeepSpread, type Topic } from '../core/tarot-deep';
import { useLang } from '../lang';

const TOPIC_KEY: Record<Topic, 'love' | 'work' | 'self' | null> = { general: null, love: 'love', work: 'work', self: 'self' };

interface Props { cards: DrawnCard[]; shown: boolean[]; spread: DeepSpread; topic: Topic; signId: string | null }

/** הקריאה המלאה: לכל קלף — תמונה, מהות, תחומי חיים, הפוך, עצה ושאלה; ובסוף — קריאת הפריסה כולה */
const TarotReading: React.FC<Props> = ({ cards, shown, spread, topic, signId }) => {
  const { lang: L } = useLang();
  const he = L === 'he';
  const pos = SPREADS[spread].positions;
  const allShown = shown.length > 0 && shown.every(Boolean);
  const r = allShown ? readSpread(cards, spread) : null;
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const areas: { k: 'love' | 'work' | 'self'; icon: string; label: string }[] = [
    { k: 'love', icon: heartOutline, label: he ? 'באהבה ובזוגיות' : 'In love' },
    { k: 'work', icon: briefcaseOutline, label: he ? 'בעבודה ובכסף' : 'Work & money' },
    { k: 'self', icon: leafOutline, label: he ? 'בעולם הפנימי' : 'Inner world' },
  ];
  const focus = TOPIC_KEY[topic];
  const ordered = focus ? [...areas.filter((a) => a.k === focus), ...areas.filter((a) => a.k !== focus)] : areas;

  return (
    <div className="tr">
      {cards.map((d, i) => {
        if (!shown[i]) return null;
        const D = DEEP[d.card.n];
        const m = cardMeta(d.card.n);
        const expanded = openIdx === null ? true : openIdx === i;
        return (
          <article className="tr-card reading-in" key={i}>
            <header className="tr-head">
              <span className="tr-num">{d.card.roman}</span>
              <div>
                <p className="tr-pos">{pos[i].name[L]}</p>
                <h3 className="tr-name">{d.card.name[L]}{d.reversed && <span className="tag">{he ? 'הפוך' : 'Reversed'}</span>}</h3>
                <p className="tr-kw">{d.card.keywords[L]}</p>
              </div>
            </header>
            <p className="tr-posmeaning"><IonIcon icon={compassOutline} aria-hidden="true" />{he ? 'המקום בפריסה: ' : 'Position: '}{pos[i].meaning[L]}</p>

            <ul className="tr-meta">
              <li><IonIcon icon={gitNetworkOutline} aria-hidden="true" />{he ? `האות ${m.letter} · נתיב ${m.path} (${m.between[0].he}–${m.between[1].he})` : `${m.letterName.en} · path ${m.path} (${m.between[0].en}–${m.between[1].en})`}</li>
              <li><IonIcon icon={sparklesOutline} aria-hidden="true" />{d.card.corr[L]}{d.card.signId && d.card.signId === signId ? (he ? ' · הקלף של המזל שלך' : ' · your sign\'s card') : ''}</li>
            </ul>

            <section className="tr-sec tr-main">
              <h4><IonIcon icon={layersOutline} aria-hidden="true" />{he ? 'המהות' : 'Essence'}</h4>
              <p>{D.essence[L]}</p>
              <p className="tr-short">{(d.reversed ? d.card.reversed : d.card.upright)[L]}</p>
            </section>

            {d.reversed && (
              <section className="tr-sec tr-rev">
                <h4><IonIcon icon={swapVerticalOutline} aria-hidden="true" />{he ? 'כשהקלף הפוך' : 'When reversed'}</h4>
                <p>{D.rev[L]}</p>
              </section>
            )}

            {expanded && (
              <>
                <section className="tr-sec">
                  <h4><IonIcon icon={eyeOutline} aria-hidden="true" />{he ? 'מה רואים בקלף' : 'The image'}</h4>
                  <p>{D.image[L]}</p>
                </section>
                {ordered.map((a) => (
                  <section key={a.k} className={`tr-sec${focus === a.k ? ' tr-focus' : ''}`}>
                    <h4><IonIcon icon={a.icon} aria-hidden="true" />{a.label}{focus === a.k && <span className="tr-focus-tag">{he ? 'הנושא שבחרת' : 'Your topic'}</span>}</h4>
                    <p>{D[a.k][L]}</p>
                  </section>
                ))}
              </>
            )}

            <section className="tr-sec tr-advice">
              <h4><IonIcon icon={bulbOutline} aria-hidden="true" />{he ? 'העצה' : 'Advice'}</h4>
              <p>{D.advice[L]}</p>
            </section>
            <p className="tr-question"><IonIcon icon={helpCircleOutline} aria-hidden="true" />{he ? 'שאלה להתבוננות: ' : 'Reflect: '}<b>{D.question[L]}</b></p>

            {cards.length > 1 && (
              <button type="button" className="link-btn inline" onClick={() => setOpenIdx(openIdx === i ? -1 : i)}>
                {expanded ? (he ? 'הסתרת הפירוט' : 'Hide details') : (he ? 'הצגת הפירוט המלא' : 'Show full details')}
              </button>
            )}
          </article>
        );
      })}

      {r && (
        <section className="tr-sum reading-in">
          <h3 className="tr-sum-h"><IonIcon icon={sparklesOutline} aria-hidden="true" />{he ? 'הקריאה של הפריסה כולה' : 'Reading the whole spread'}</h3>
          <p className="tr-sum-text">{r.summary[L]}</p>

          {r.yesno && (
            <div className={`tr-yn yn-${r.yesno.value}`}>
              <span>{r.yesno.value === 'yes' ? (he ? 'כן' : 'Yes') : r.yesno.value === 'no' ? (he ? 'לא' : 'No') : (he ? 'אולי' : 'Maybe')}</span>
              <p>{he ? 'אם שאלת שאלת כן/לא: ' : 'If you asked a yes/no question: '}{r.yesno.text[L]}</p>
            </div>
          )}

          <div className="tr-sum-grid">
            <div className="tr-sum-box">
              <h4>{he ? 'קלף התמצית' : 'Quintessence card'}</h4>
              <p className="tr-q-name">{r.quintessence.name[L]}</p>
              <p>{he ? 'סכום מספרי הקלפים, מצומצם: המסר שמאחורי כל הפריסה. ' : 'The reduced sum of the card numbers: the message behind the whole spread. '}{r.quintessence.essence[L].split('.')[0]}.</p>
            </div>
            <div className="tr-sum-box">
              <h4>{he ? 'איפה אתה במסע' : 'Where you are on the journey'}</h4>
              <ul className="tr-stages">{r.stages.map((s) => <li key={s.name.en}><b>{s.name[L]}{s.count > 1 ? ` ×${s.count}` : ''}</b><span>{s.text[L]}</span></li>)}</ul>
            </div>
          </div>

          {cards.length > 1 && (
            <p className="tr-rev-sum">
              {r.reversedCount === 0 ? (he ? 'כל הקלפים ישרים: האנרגיה זורמת החוצה בלי חסימות משמעותיות.' : 'All cards upright: energy flows outward without major blocks.')
                : r.reversedCount === cards.length ? (he ? 'כל הקלפים הפוכים: תקופה של עבודה פנימית. מה שמתבקש עכשיו הוא להתבונן לפני שפועלים.' : 'All cards reversed: a time of inner work. Reflect before acting.')
                : he ? `${r.reversedCount} מתוך ${cards.length} קלפים הפוכים: חלק מהנושאים זורמים, וחלק מבקשים עבודה פנימית או סבלנות.` : `${r.reversedCount} of ${cards.length} reversed: some themes flow, others ask for inner work or patience.`}
            </p>
          )}
          <p className="tr-note">{he ? 'הטארוט הוא כלי להתבוננות. הקלפים מתארים מגמות ואפשרויות — הבחירה תמיד שלך.' : 'Tarot is a tool for reflection. Cards describe trends and possibilities — the choice is always yours.'}</p>
        </section>
      )}
    </div>
  );
};

export default TarotReading;
