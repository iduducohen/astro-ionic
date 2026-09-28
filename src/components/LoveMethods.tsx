import { useEffect, useMemo, useState } from 'react';
import { IonCheckbox, IonIcon, IonInput } from '@ionic/react';
import {
  flameOutline, chatbubblesOutline, homeOutline, hourglassOutline, gitMergeOutline, gitNetworkOutline, leafOutline,
  calendarOutline, walkOutline, keyOutline, informationCircleOutline,
} from 'ionicons/icons';
import { useLang } from '../lang';
import { loadJSON, saveJSON } from '../storage';
import { parseDate, type BirthData } from '../core';
import BirthFields from './BirthFields';
import ShareBar from './ShareBar';
import {
  astroLove, kabbalahLove, numerologyLove, PLANET_NAME, SY_ELEMENT_NAME, PERSONAL_YEAR, GOALS,
  type AstroLove, type KabLove, type NumLove, type KabPerson, type NumPerson,
} from '../core/love-methods';

const today = new Date().toISOString().slice(0, 10);
const SEC_ICON: Record<string, string> = { chem: flameOutline, talk: chatbubblesOutline, home: homeOutline, duty: hourglassOutline };

const Meter: React.FC<{ label: string; score: number; icon?: string }> = ({ label, score, icon }) => (
  <div className="lm-meter">
    <div className="lp-top">
      <span className="lp-label">{icon && <IonIcon icon={icon} aria-hidden="true" />}{label}</span>
      <span className="lp-score">{score}%</span>
    </div>
    <div className="lp-bar"><i style={{ width: `${score}%` }} /></div>
  </div>
);

const BigScore: React.FC<{ score: number; label: string }> = ({ score, label }) => (
  <div className="lm-big"><span className="lm-big-n">{score}%</span><span className="lm-big-l">{label}</span></div>
);

/* =====================================================================
   אסטרולוגיה
   ===================================================================== */
const emptyBirth = (): BirthData => ({ name: '', date: '', time: '', timeKnown: true, placeId: 'jerusalem' });

export const AstroMode: React.FC = () => {
  const { lang: L, S } = useLang();
  const he = L === 'he';
  const [a, setA] = useState<BirthData>(emptyBirth());
  const [b, setB] = useState<BirthData>(emptyBirth());
  const [args, setArgs] = useState<[BirthData, BirthData] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJSON<BirthData>('astro:birth:me').then((v) => v && setA(v));
    loadJSON<BirthData>('astro:birth:pt').then((v) => v && setB(v));
  }, []);

  const check = (v: BirthData): BirthData => {
    if (!v.date) throw new Error(S.errNoDate);
    if (!parseDate(v.date)) throw new Error(S.errBadDate);
    return { ...v, name: v.name.trim() || S.guest, timeKnown: v.timeKnown && !!v.time };
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try { const ca = check(a), cb = check(b); saveJSON('astro:birth:me', a); saveJSON('astro:birth:pt', b); setArgs([ca, cb]); setError(''); }
    catch (err) { setError((err as Error).message); }
  };
  const sample = () => {
    const sa = { name: he ? 'נועה' : 'Noa', date: '1990-03-15', time: '08:30', timeKnown: true, placeId: 'tel-aviv' };
    const sb = { name: he ? 'דניאל' : 'Daniel', date: '1988-07-22', time: '19:10', timeKnown: true, placeId: 'jerusalem' };
    setA(sa); setB(sb); setArgs([sa, sb]); setError('');
  };

  const r: AstroLove | null = useMemo(() => {
    if (!args) return null;
    try { return astroLove(args[0], args[1], L); } catch { return null; }
  }, [args, L]);

  return (
    <>
      <form onSubmit={submit} noValidate className="love-form">
        <div className="form-card love-card"><h2 className="section-label">{S.you}</h2><BirthFields v={a} set={setA} /></div>
        <div className="love-link" aria-hidden="true"><span>♥</span></div>
        <div className="form-card love-card"><h2 className="section-label">{S.partner}</h2><BirthFields v={b} set={setB} /></div>
        {error && <p role="alert" className="err" style={{ marginTop: 14 }}>{error}</p>}
        <button type="submit" className="love-btn">{he ? 'השוואת מפות לידה' : 'Compare birth charts'} <span aria-hidden="true">♥</span></button>
        <button type="button" className="link-btn love-sample" onClick={sample}>{he ? 'הצגת דוגמה' : 'Show an example'}</button>
      </form>

      {r && args && (
        <div className="love-result lm-result" aria-live="polite">
          <p className="love-names">{S.and(args[0].name, args[1].name)}</p>
          <BigScore score={r.total} label={he ? 'הרמוניה אסטרולוגית' : 'Astrological harmony'} />
          {r.timeNote && <p className="lm-note"><IonIcon icon={informationCircleOutline} aria-hidden="true" />{he ? 'חסרה שעת לידה אצל אחד מכם — מיקום הירח משוער ועלול לסטות בכמה מעלות.' : 'A birth time is missing — the Moon\'s position is approximate.'}</p>}
          <div className="cd">
            {r.sections.map((s) => (
              <section key={s.id} className="cd-card">
                <h3 className="cd-h"><IonIcon icon={SEC_ICON[s.id]} aria-hidden="true" />{s.title[L]}<span className="cd-hscore">{s.score}%</span></h3>
                <p className="lm-what">{s.what[L]}</p>
                <div className="lp-bar"><i style={{ width: `${s.score}%` }} /></div>
                <p className="lm-text">{s.text[L]}</p>
                <div className="lm-pos">
                  {s.positions.map((p, i) => <span key={i}><b>{PLANET_NAME[p.planet][L]}</b> {p.name}: {p.sign[L]}</span>)}
                </div>
                {s.contacts.length > 0 ? (
                  <ul className="lm-contacts">{s.contacts.slice(0, 4).map((c, i) => (
                    <li key={i} className={c.value > 0.3 ? 'good' : c.value < 0 ? 'hard' : ''}>{c.text[L]} <span className="muted">({c.orb.toFixed(1)}°)</span></li>
                  ))}</ul>
                ) : <p className="lm-none">{he ? 'אין היבט ישיר בין הכוכבים האלה — הציון מבוסס על התאמת היסודות של המזלות שלהם.' : 'No direct aspect between these planets — the score is based on their signs\' elements.'}</p>}
              </section>
            ))}
            <section className="cd-card">
              <h3 className="cd-h"><IonIcon icon={gitMergeOutline} aria-hidden="true" />{he ? 'מפת הקומפוזיט — הקשר עצמו' : 'Composite chart — the bond itself'}</h3>
              <p className="lm-what">{he ? 'נקודת האמצע בין הכוכבים של שניכם יוצרת מפה אחת: לא אתה ולא היא — ה"אנחנו".' : 'The midpoints of your planets form one chart: not you, not them — the "us".'}</p>
              <ul className="lm-comp">{r.composite.map((c) => (
                <li key={c.planet}><b>{PLANET_NAME[c.planet][L]} {he ? 'בקומפוזיט' : 'in composite'}: {c.sign[L]}</b><span>{c.text[L]}</span></li>
              ))}</ul>
            </section>
          </div>
          <ShareBar title={he ? 'התאמה אסטרולוגית' : 'Astrological match'}
            text={[`💞 ${S.and(args[0].name, args[1].name)} — ${r.total}%`, ...r.sections.map((s) => `• ${s.title[L]}: ${s.score}%`), ...r.composite.map((c) => `✦ ${PLANET_NAME[c.planet][L]} ${he ? 'בקומפוזיט' : 'composite'}: ${c.sign[L]}`)].join('\n')}
            short={`💞 ${S.and(args[0].name, args[1].name)} — ${r.total}% · ${r.sections.map((s) => `${s.title[L]} ${s.score}%`).join(' · ')}`} />
        </div>
      )}
    </>
  );
};

/* =====================================================================
   קבלה וזוהר
   ===================================================================== */
const emptyKab = (): KabPerson => ({ name: '', mother: '', birth: '', sunset: false });

const KabFields: React.FC<{ title: string; v: KabPerson; set: (p: KabPerson) => void }> = ({ title, v, set }) => {
  const { lang: L, S } = useLang();
  const he = L === 'he';
  return (
    <div className="form-card love-card">
      <h2 className="section-label">{title}</h2>
      <IonInput mode="md" label={he ? 'שם פרטי (בעברית)' : 'First name (Hebrew)'} labelPlacement="stacked" fill="outline" value={v.name}
        onIonInput={(e) => set({ ...v, name: String(e.detail.value ?? '') })} />
      <IonInput mode="md" label={he ? 'שם האם (בעברית)' : 'Mother\'s name (Hebrew)'} labelPlacement="stacked" fill="outline" value={v.mother}
        onIonInput={(e) => set({ ...v, mother: String(e.detail.value ?? '') })} />
      <IonInput mode="md" label={S.birthDate} labelPlacement="stacked" fill="outline" type="date" min="1900-01-01" max={today}
        value={v.birth} onIonInput={(e) => set({ ...v, birth: String(e.detail.value ?? '') })} />
      <IonCheckbox checked={v.sunset} labelPlacement="end" justify="start" onIonChange={(e) => set({ ...v, sunset: e.detail.checked })}>{S.afterSunset}</IonCheckbox>
    </div>
  );
};

export const KabbalahMode: React.FC = () => {
  const { lang: L, S } = useLang();
  const he = L === 'he';
  const [a, setA] = useState<KabPerson>(emptyKab());
  const [b, setB] = useState<KabPerson>(emptyKab());
  const [args, setArgs] = useState<[KabPerson, KabPerson] | null>(null);
  const [error, setError] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    for (const p of [a, b]) {
      if (!p.name.trim() || !p.mother.trim()) { setError(he ? 'נא למלא שם ושם אם לשני בני הזוג' : 'Please fill in both names and mothers\' names'); return; }
      if (!parseDate(p.birth)) { setError(S.errNoDate); return; }
    }
    setError(''); setArgs([a, b]);
  };
  const sample = () => {
    const sa = { name: 'נועה', mother: 'רחל', birth: '1990-03-15', sunset: false };
    const sb = { name: 'דניאל', mother: 'שרה', birth: '1988-07-22', sunset: true };
    setA(sa); setB(sb); setError(''); setArgs([sa, sb]);
  };

  const r: KabLove | null = useMemo(() => (args ? kabbalahLove(args[0], args[1]) : null), [args]);

  return (
    <>
      <form onSubmit={submit} noValidate className="love-form">
        <KabFields title={S.you} v={a} set={setA} />
        <div className="love-link" aria-hidden="true"><span>♥</span></div>
        <KabFields title={S.partner} v={b} set={setB} />
        {error && <p role="alert" className="err" style={{ marginTop: 14 }}>{error}</p>}
        <button type="submit" className="love-btn">{he ? 'ניתוח השמות והנשמות' : 'Analyze names and souls'} <span aria-hidden="true">♥</span></button>
        <button type="button" className="link-btn love-sample" onClick={sample}>{he ? 'הצגת דוגמה' : 'Show an example'}</button>
      </form>

      {r && args && (
        <div className="love-result lm-result" aria-live="polite">
          <p className="love-names">{S.and(args[0].name, args[1].name)}</p>
          <BigScore score={r.total} label={he ? 'הרמוניה נשמתית' : 'Soul harmony'} />
          {!r.people.every((p) => p.hebrewNames) && <p className="lm-note"><IonIcon icon={informationCircleOutline} aria-hidden="true" />{he ? 'חלק מהשמות כתובים באותיות לועזיות. לגימטריה מדויקת כתבו את השמות בעברית.' : 'Some names use Latin letters. Write names in Hebrew for true gematria.'}</p>}
          <div className="cd">
            <section className="cd-card">
              <h3 className="cd-h"><IonIcon icon={gitNetworkOutline} aria-hidden="true" />{he ? 'שורש הנשמה של כל אחד' : 'Each soul\'s root'}</h3>
              <p className="lm-what">{he ? 'גימטריית השם ושם האם (כנהוג בקבלה), מצומצמת לספירה בעץ החיים.' : 'The gematria of name and mother\'s name (as in Kabbalah), reduced to a Sephira.'}</p>
              <div className="lm-souls">
                {r.people.map((p, i) => (
                  <div key={i} className="lm-soul">
                    <span className="lm-soul-n">{p.seph.n}</span>
                    <b>{p.name}</b>
                    <span>{args[i].name} {he ? 'בן/בת' : 'child of'} {args[i].mother} = {p.value}</span>
                    <span className="lm-soul-s">{p.seph.name[L]} — {p.seph.meaning[L]}</span>
                  </div>
                ))}
              </div>
              <Meter label={he ? 'הקשר בין שני השורשים' : 'Link between the roots'} score={r.relation.score} />
              <p className="lm-text">{r.relation.text[L]}</p>
              {r.relation.path && <p className="lm-path"><span className="lm-letter">{r.relation.path.letter}</span>{he ? `נתיב ${r.relation.path.n} בעץ, המקביל לקלף "${r.relation.path.card.he}".` : `Path ${r.relation.path.n}, matching the card "${r.relation.path.card.en}".`}</p>}
            </section>

            <section className="cd-card">
              <h3 className="cd-h"><IonIcon icon={keyOutline} aria-hidden="true" />{he ? 'תיקון נשמתי וייעוד משותף' : 'Shared tikkun and purpose'}</h3>
              <p className="lm-what">{he ? `חיבור הגימטריות של שניכם (${r.couple.value}) מצביע על ספירה אחת — השיעור שהקשר הזה נועד ללמד.` : `Your combined gematria (${r.couple.value}) points to one Sephira — the lesson this bond is meant to teach.`}</p>
              <p className="lm-seph">{r.couple.seph.name[L]} <span>— {r.couple.seph.meaning[L]}</span></p>
              <p className="lm-text">{r.couple.tikkun[L]}</p>
            </section>

            <section className="cd-card">
              <h3 className="cd-h"><IonIcon icon={leafOutline} aria-hidden="true" />{he ? 'היסודות הרוחניים (ספר יצירה)' : 'Spiritual elements (Sefer Yetzirah)'}</h3>
              <p className="lm-what">{he ? 'לפי מזל חודש הלידה העברי ואותיות האמות בשמות: א — רוח, מ — מים, ש — אש.' : 'From the Hebrew birth month and the mother letters in your names: Aleph — air, Mem — water, Shin — fire.'}</p>
              <div className="lm-souls">
                {r.people.map((p, i) => (
                  <div key={i} className="lm-soul">
                    <b>{p.name}</b>
                    <span className="lm-soul-s">{SY_ELEMENT_NAME[p.el][L]}</span>
                    <span className="muted">א×{p.mothers['א']} · מ×{p.mothers['מ']} · ש×{p.mothers['ש']}</span>
                  </div>
                ))}
              </div>
              <Meter label={he ? 'איזון היסודות' : 'Element balance'} score={r.elements.score} />
              <p className="lm-text">{r.elements.text[L]}</p>
            </section>
          </div>
          <ShareBar title={he ? 'התאמה לפי הקבלה' : 'Kabbalistic match'}
            text={[`💞 ${S.and(args[0].name, args[1].name)} — ${r.total}%`, `🌳 ${args[0].name}: ${r.people[0].seph.name[L]} · ${args[1].name}: ${r.people[1].seph.name[L]}`, `🔑 ${he ? 'תיקון משותף' : 'Shared tikkun'}: ${r.couple.seph.name[L]} — ${r.couple.tikkun[L]}`, `🔥 ${SY_ELEMENT_NAME[r.people[0].el][L]} + ${SY_ELEMENT_NAME[r.people[1].el][L]}`].join('\n')}
            short={`💞 ${S.and(args[0].name, args[1].name)} — ${r.total}% · ${r.couple.seph.name[L]}`} />
        </div>
      )}
    </>
  );
};

/* =====================================================================
   נומרולוגיה
   ===================================================================== */
export const NumbersMode: React.FC = () => {
  const { lang: L, S } = useLang();
  const he = L === 'he';
  const [a, setA] = useState<NumPerson>({ name: '', birth: '' });
  const [b, setB] = useState<NumPerson>({ name: '', birth: '' });
  const [args, setArgs] = useState<[NumPerson, NumPerson] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => { loadJSON<{ name: string; birth: string }>('astro:last').then((s) => s && setA({ name: s.name, birth: s.birth })); }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parseDate(a.birth) || !parseDate(b.birth)) { setError(S.errNoDate); return; }
    setError(''); setArgs([{ ...a, name: a.name.trim() || S.guest }, { ...b, name: b.name.trim() || S.guest }]);
  };
  const sample = () => {
    const sa = { name: he ? 'נועה' : 'Noa', birth: '1990-03-15' }, sb = { name: he ? 'דניאל' : 'Daniel', birth: '1988-07-22' };
    setA(sa); setB(sb); setError(''); setArgs([sa, sb]);
  };
  const r: NumLove | null = useMemo(() => (args ? numerologyLove(args[0], args[1]) : null), [args]);

  const Fields = ({ title, v, set }: { title: string; v: NumPerson; set: (p: NumPerson) => void }) => (
    <div className="form-card love-card">
      <h2 className="section-label">{title}</h2>
      <IonInput mode="md" label={S.name} labelPlacement="stacked" fill="outline" value={v.name} onIonInput={(e) => set({ ...v, name: String(e.detail.value ?? '') })} />
      <IonInput mode="md" label={S.birthDate} labelPlacement="stacked" fill="outline" type="date" min="1900-01-01" max={today} value={v.birth} onIonInput={(e) => set({ ...v, birth: String(e.detail.value ?? '') })} />
    </div>
  );

  return (
    <>
      <form onSubmit={submit} noValidate className="love-form">
        {Fields({ title: S.you, v: a, set: setA })}
        <div className="love-link" aria-hidden="true"><span>♥</span></div>
        {Fields({ title: S.partner, v: b, set: setB })}
        {error && <p role="alert" className="err" style={{ marginTop: 14 }}>{error}</p>}
        <button type="submit" className="love-btn">{he ? 'חישוב המספרים של הזוג' : 'Calculate the couple\'s numbers'} <span aria-hidden="true">♥</span></button>
        <button type="button" className="link-btn love-sample" onClick={sample}>{he ? 'הצגת דוגמה' : 'Show an example'}</button>
      </form>

      {r && args && (
        <div className="love-result lm-result" aria-live="polite">
          <p className="love-names">{S.and(args[0].name, args[1].name)}</p>
          <BigScore score={r.total} label={he ? 'התאמה נומרולוגית' : 'Numerological match'} />
          <div className="cd">
            <section className="cd-card cd-couple">
              <span className="cd-cnum">{r.destiny.n}</span>
              <div>
                <h3 className="cd-h" style={{ margin: 0 }}>{he ? 'מספר הגורל המשותף' : 'Shared destiny number'} · {r.destiny.title[L]}</h3>
                <p>{he ? 'חיבור כל הספרות של שני תאריכי הלידה — ה"קוד האנרגטי" של מערכת היחסים: ' : 'All digits of both birth dates added — the relationship\'s "energy code": '}{r.destiny.text[L]}</p>
              </div>
            </section>

            <section className="cd-card">
              <h3 className="cd-h"><IonIcon icon={walkOutline} aria-hidden="true" />{he ? 'נתיב החיים והקצב' : 'Life path and pace'}</h3>
              <div className="lm-souls">
                {r.lp.map((n, i) => (
                  <div key={i} className="lm-soul"><span className="lm-soul-n">{n}</span><b>{args[i].name}</b><span className="lm-soul-s">{(i ? r.pace.b : r.pace.a).name[L]}</span></div>
                ))}
              </div>
              <Meter label={he ? 'התאמת קצב החיים' : 'Pace match'} score={r.pace.score} />
              <p className="lm-text">{r.pace.text[L]}</p>
            </section>

            <section className="cd-card">
              <h3 className="cd-h"><IonIcon icon={calendarOutline} aria-hidden="true" />{he ? 'עיתוי: השנים האישיות שלכם' : 'Timing: your personal years'}</h3>
              <p className="lm-what">{he ? 'השנה האישית = יום הלידה + חודש הלידה + השנה הנוכחית, מצומצם. היא מתארת את האנרגיה של כל שנה. סימון ♥♥ = שנה מתאימה לשניכם; ♥ = לאחד מכם.' : 'Personal year = birth day + birth month + current year, reduced. ♥♥ = good for both; ♥ = for one of you.'}</p>
              <div className="pg-table-wrap"><table className="pg-table lm-years">
                <thead><tr><th>{he ? 'שנה' : 'Year'}</th><th>{args[0].name}</th><th>{args[1].name}</th>{GOALS.map((g) => <th key={g.id} title={g.label[L]}>{g.short[L]}</th>)}</tr></thead>
                <tbody>{r.years.map((y) => (
                  <tr key={y.year}>
                    <td className="ltr"><b>{y.year}</b></td>
                    <td><span className="pg-num">{y.a}</span> <span className="muted">{PERSONAL_YEAR[y.a][L]}</span></td>
                    <td><span className="pg-num">{y.b}</span> <span className="muted">{PERSONAL_YEAR[y.b][L]}</span></td>
                    {y.goals.map((g) => <td key={g.id} className={`lm-goal${g.both ? ' both' : g.one ? ' one' : ''}`}>{g.both ? '♥♥' : g.one ? '♥' : '·'}</td>)}
                  </tr>
                ))}</tbody>
              </table></div>
              <ul className="lm-goals">{GOALS.map((g) => {
                const best = r.years.find((y) => y.goals.find((q) => q.id === g.id)!.both);
                return <li key={g.id}><b>{g.label[L]}:</b> {best ? (he ? `השנה המתאימה ביותר לשניכם — ${best.year}.` : `Best year for both — ${best.year}.`) : (he ? 'אין בשש השנים הקרובות שנה שמתאימה לשניכם יחד; בחרו שנה שמתאימה לפחות לאחד (♥).' : 'No year in the next six suits both; pick one that suits at least one of you (♥).')}</li>;
              })}</ul>
            </section>
          </div>
          <ShareBar title={he ? 'התאמה נומרולוגית' : 'Numerology match'}
            text={[`💞 ${S.and(args[0].name, args[1].name)} — ${r.total}%`, `🔢 ${he ? 'מספר גורל משותף' : 'Shared destiny'}: ${r.destiny.n} — ${r.destiny.title[L]}`, `🚶 ${args[0].name}: ${r.lp[0]} (${r.pace.a.name[L]}) · ${args[1].name}: ${r.lp[1]} (${r.pace.b.name[L]})`].join('\n')}
            short={`💞 ${S.and(args[0].name, args[1].name)} — ${r.total}% · ${r.destiny.n} ${r.destiny.title[L]}`} />
        </div>
      )}
    </>
  );
};
