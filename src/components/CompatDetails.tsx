import { IonIcon } from '@ionic/react';
import {
  sunnyOutline, starOutline, pawOutline, calculatorOutline, thumbsUpOutline, alertCircleOutline, heartOutline, bulbOutline,
} from 'ionicons/icons';
import { adviceFor, type DeepCompat, type Group } from '../core/compat-deep';
import { useLang } from '../lang';

const SHORT: Record<Group, { he: string; en: string }> = { western: { he: 'מערבי', en: 'Western' }, hebrew: { he: 'עברי', en: 'Hebrew' }, chinese: { he: 'סיני', en: 'Chinese' }, numbers: { he: 'מספרים', en: 'Numbers' } };
const G_ICON: Record<Group, string> = { western: sunnyOutline, hebrew: starOutline, chinese: pawOutline, numbers: calculatorOutline };

/** רדאר של ארבע הקבוצות — מעוין שמראה איפה החיבור חזק ואיפה חלש */
const Radar: React.FC<{ d: DeepCompat }> = ({ d }) => {
  const { lang: L } = useLang();
  const C = 110, R = 78;
  const pts = d.groups.map((g, i) => {
    const ang = -Math.PI / 2 + (i * Math.PI) / 2;
    const r = (g.score / 100) * R;
    return { x: C + Math.cos(ang) * r, y: C + Math.sin(ang) * r, lx: C + Math.cos(ang) * (R + 20), ly: C + Math.sin(ang) * (R + 20), g };
  });
  const ring = (f: number) => [0, 1, 2, 3].map((i) => { const a = -Math.PI / 2 + (i * Math.PI) / 2; return `${C + Math.cos(a) * R * f},${C + Math.sin(a) * R * f}`; }).join(' ');
  return (
    <svg className="radar" viewBox="-45 0 310 220" role="img" aria-label={d.groups.map((g) => `${g.label[L]} ${g.score}%`).join(', ')}>
      {[0.25, 0.5, 0.75, 1].map((f) => <polygon key={f} points={ring(f)} className="rd-ring" />)}
      <line x1={C} y1={C - R} x2={C} y2={C + R} className="rd-axis" /><line x1={C - R} y1={C} x2={C + R} y2={C} className="rd-axis" />
      <polygon points={pts.map((p) => `${p.x},${p.y}`).join(' ')} className="rd-area" />
      {pts.map((p) => <circle key={p.g.id} cx={p.x} cy={p.y} r="4" className="rd-dot" />)}
      {pts.map((p) => (
        <text key={p.g.id} x={p.lx} y={p.ly} className="rd-lbl" dominantBaseline="middle">{SHORT[p.g.id][L]} {p.g.score}%</text>
      ))}
    </svg>
  );
};

const CompatDetails: React.FC<{ d: DeepCompat; names: [string, string] }> = ({ d, names }) => {
  const { lang: L } = useLang();
  const he = L === 'he';
  return (
    <div className="cd">
      {/* ארבע הקבוצות */}
      <section className="cd-card">
        <h3 className="cd-h"><IonIcon icon={heartOutline} aria-hidden="true" />{he ? 'ההתאמה בארבעה תחומים' : 'The match in four areas'}</h3>
        <div className="cd-groups">
          <Radar d={d} />
          <ul className="cd-glist">
            {d.groups.map((g) => (
              <li key={g.id}>
                <span className="cd-gic"><IonIcon icon={G_ICON[g.id]} aria-hidden="true" /></span>
                <span className="cd-gname">{g.label[L]}</span>
                <span className="cd-gscore">{g.score}%</span>
                <div className="lp-bar"><i style={{ width: `${g.score}%` }} /></div>
              </li>
            ))}
          </ul>
        </div>
        <p className="cd-note">{he ? `הציון הכולל הוא ממוצע של ארבעת התחומים, המבוססים על ${d.params.length} פרמטרים.` : `The total is the average of the four areas, based on ${d.params.length} parameters.`}</p>
      </section>

      {/* חוזקות ואתגרים */}
      <div className="cd-two">
        <section className="cd-card cd-good">
          <h3 className="cd-h"><IonIcon icon={thumbsUpOutline} aria-hidden="true" />{he ? 'מה מחבר ביניכם' : 'What connects you'}</h3>
          {d.strengths.length ? (
            <ul className="cd-list">{d.strengths.map((p) => <li key={p.key}><b>{SHORT[p.group][L]} · {p.label[L]} · {p.score}%</b><span>{p.text[L]}</span></li>)}</ul>
          ) : <p className="cd-empty">{he ? 'אין תחום אחד בולט — החיבור מתחלק באופן שווה.' : 'No single standout area — the connection is evenly spread.'}</p>}
        </section>
        <section className="cd-card cd-hard">
          <h3 className="cd-h"><IonIcon icon={alertCircleOutline} aria-hidden="true" />{he ? 'איפה לשים לב' : 'Where to take care'}</h3>
          {d.challenges.length ? (
            <ul className="cd-list">{d.challenges.map((p) => (
              <li key={p.key}><b>{SHORT[p.group][L]} · {p.label[L]} · {p.score}%</b><span>{p.text[L]}</span>
                <span className="cd-tip"><IonIcon icon={bulbOutline} aria-hidden="true" />{adviceFor(p)[L]}</span></li>
            ))}</ul>
          ) : <p className="cd-empty">{he ? 'אין נקודות חיכוך משמעותיות. נהדר!' : 'No significant friction points. Great!'}</p>}
        </section>
      </div>

      {/* מספר הזוג */}
      <section className="cd-card cd-couple">
        <span className="cd-cnum">{d.couple.n}</span>
        <div>
          <h3 className="cd-h" style={{ margin: 0 }}>{he ? 'מספר הזוג' : 'Couple number'} · {d.couple.title[L]}</h3>
          <p>{he ? `סכום מספרי דרך החיים של ${names[0]} ו${names[1]}, מצומצם. הוא מתאר את האנרגיה של הקשר עצמו: ` : `The reduced sum of both life paths. It describes the energy of the relationship itself: `}{d.couple.text[L]}</p>
        </div>
      </section>

      {/* פירוט מלא */}
      <h3 className="section-label" style={{ margin: '22px 0 8px', textAlign: 'start' }}>{he ? 'הפירוט המלא' : 'Full breakdown'}</h3>
      {d.groups.map((g) => (
        <section key={g.id} className="cd-card cd-detail">
          <h3 className="cd-h"><IonIcon icon={G_ICON[g.id]} aria-hidden="true" />{g.label[L]}<span className="cd-hscore">{g.score}%</span></h3>
          <ul className="love-parts">
            {d.params.filter((p) => p.group === g.id).map((p) => (
              <li key={p.key}>
                <div className="lp-top"><span className="lp-label">{p.label[L]}</span><span className="lp-score">{p.score}%</span></div>
                <p className="lp-detail">{p.detail[L]}</p>
                <div className="lp-bar"><i style={{ width: `${p.score}%` }} /></div>
                <p className="lp-info">{p.text[L]}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default CompatDetails;
