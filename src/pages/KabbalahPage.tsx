import { useEffect, useMemo, useState } from 'react';
import { IonButton, IonCheckbox, IonInput } from '@ionic/react';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import { useLang } from '../lang';
import { loadJSON } from '../storage';
import { readProfile } from '../validate';
import { MAJOR_ARCANA } from '../core';
import {
  TREE, PATHS22, WORLDS, MONTH_LETTER, SENSE_TEXT, sephira, sephiraForNumber, type SephiraId, type TreePath,
} from '../core/tree';

interface Saved { name: string; birth: string; sunset: boolean }
const today = new Date().toISOString().slice(0, 10);
const R = 22; // רדיוס ספירה בתרשים

const KabbalahPage: React.FC = () => {
  const { lang: L, S } = useLang();
  const he = L === 'he';
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [sunset, setSunset] = useState(false);
  const [submitted, setSubmitted] = useState<Saved | null>(null);
  const [sel, setSel] = useState<SephiraId>('tiferet');

  useEffect(() => {
    loadJSON<Saved>('astro:last').then((s) => {
      if (!s) return;
      setName(s.name); setBirth(s.birth); setSunset(s.sunset);
    });
  }, []);

  const { res, error } = useMemo(() => {
    if (!submitted) return { res: null, error: '' };
    try {
      const p = readProfile(S, submitted.name, submitted.birth, submitted.sunset);
      const lifeSeph = sephiraForNumber(p.lifePath);
      const nameVal = submitted.name.trim() ? p.nameNum.gematria || p.nameNum.latin : 0; // בלי שם אין גימטריה
      const nameSeph = nameVal ? sephiraForNumber(p.nameNum.number) : null;
      const ml = MONTH_LETTER[p.hebrew.month.id];
      const path = PATHS22.find((x) => x.letter === ml.letter)!;
      return { res: { p, lifeSeph, nameSeph, nameVal, ml, path }, error: '' };
    } catch (e) {
      return { res: null, error: (e as Error).message };
    }
  }, [submitted, S]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ name, birth, sunset });
  };

  useEffect(() => { if (res) setSel(res.lifeSeph); }, [res]);

  const cur = sephira(sel);
  const world = WORLDS.find((w) => w.id === cur.world)!;
  const tag = (id: SephiraId) =>
    res && id === res.lifeSeph ? (he ? 'ספירת דרך החיים שלך' : 'Your life path Sephira')
    : res && id === res.nameSeph ? (he ? 'ספירת השם שלך' : 'Your name Sephira') : null;

  return (
    <Page title={S.tabKabbalah}>
      <PageIntro page="kabbalah" title={he ? 'תורת הקבלה' : 'Kabbalah'} />

      <form onSubmit={submit} noValidate className="form-card">
        <IonInput mode="md" label={S.name} labelPlacement="stacked" fill="outline" value={name}
          placeholder={he ? 'שם בעברית לחישוב גימטריה' : 'Hebrew name gives true gematria'}
          onIonInput={(e) => setName(String(e.detail.value ?? ''))} />
        <IonInput mode="md" label={S.birthDate} labelPlacement="stacked" fill="outline" type="date" min="1900-01-01" max={today}
          value={birth} onIonInput={(e) => setBirth(String(e.detail.value ?? ''))} />
        <IonCheckbox checked={sunset} labelPlacement="end" justify="start" onIonChange={(e) => setSunset(e.detail.checked)}>
          {S.afterSunset}
        </IonCheckbox>
        {error && <p role="alert" className="err">{error}</p>}
        <IonButton type="submit" expand="block" className="btn-main">{he ? 'מצא את מקומי בעץ' : 'Find my place on the tree'}</IonButton>
        <button type="button" className="link-btn" onClick={() => { const s = { name: 'נועה לוי', birth: '1990-03-15', sunset: false }; setName(s.name); setBirth(s.birth); setSunset(false); setSubmitted(s); }}>
          {he ? 'רוצים לראות דוגמה? קריאה לדוגמה' : 'Want to see an example? Sample reading'}
        </button>
      </form>

      {res && (
        <section className="kb-keys" aria-live="polite">
          <button type="button" className={`kb-key${sel === res.lifeSeph ? ' on' : ''}`} onClick={() => setSel(res.lifeSeph)}>
            <span className="kb-k-label">{he ? 'דרך החיים' : 'Life path'} · {res.p.lifePath}</span>
            <span className="kb-k-val">{sephira(res.lifeSeph).name[L]}</span>
            <span className="kb-k-sub">{sephira(res.lifeSeph).meaning[L]}</span>
          </button>
          {res.nameSeph && (
            <button type="button" className={`kb-key${sel === res.nameSeph ? ' on' : ''}`} onClick={() => setSel(res.nameSeph!)}>
              <span className="kb-k-label">{he ? 'גימטריית השם' : 'Name gematria'} · {res.nameVal}</span>
              <span className="kb-k-val">{sephira(res.nameSeph).name[L]}</span>
              <span className="kb-k-sub">{sephira(res.nameSeph).meaning[L]}</span>
            </button>
          )}
          <div className="kb-key static">
            <span className="kb-k-label">{he ? `חודש ${res.p.hebrew.month.name.he}` : `Month of ${res.p.hebrew.month.name.en}`}</span>
            <span className="kb-k-val kb-letter">{res.ml.letter}</span>
            <span className="kb-k-sub">{he ? `חוש ה${res.ml.sense.he}` : `Sense of ${res.ml.sense.en.toLowerCase()}`}</span>
          </div>
        </section>
      )}

      <section className="kb-treewrap">
        <TreeSvg sel={sel} onSel={setSel} life={res?.lifeSeph} named={res?.nameSeph ?? undefined} path={res?.path} lang={L} />
        <ul className="kb-legend">
          <li><span className="lg lg-life" />{he ? 'דרך החיים' : 'Life path'}</li>
          <li><span className="lg lg-name" />{he ? 'השם' : 'Name'}</li>
          <li><span className="lg lg-path" />{he ? 'נתיב חודש הלידה' : 'Birth-month path'}</li>
          <li className="muted">{he ? 'לחיצה על ספירה מציגה אותה' : 'Tap a Sephira to view it'}</li>
        </ul>
      </section>

      {/* פרטי הספירה שנבחרה */}
      <section className="kb-detail" aria-live="polite">
        <div className="kb-d-head">
          <span className="kb-d-num">{cur.n}</span>
          <div>
            <h2 className="kb-d-name">{cur.name[L]}</h2>
            <p className="kb-d-meaning">{cur.meaning[L]}</p>
          </div>
        </div>
        {tag(sel) && <p className="kb-d-tag">{tag(sel)}</p>}
        <p className="kb-d-theme">{cur.theme[L]}</p>
        <dl className="kb-facts">
          <div><dt>{he ? 'חוזקה' : 'Gift'}</dt><dd>{cur.gift[L]}</dd></div>
          <div><dt>{he ? 'אתגר' : 'Challenge'}</dt><dd>{cur.challenge[L]}</dd></div>
          <div><dt>{he ? 'שם קודש' : 'Divine name'}</dt><dd>{cur.divineName}</dd></div>
          {cur.figure.he !== '—' && <div><dt>{he ? 'דמות' : 'Figure'}</dt><dd>{cur.figure[L]}</dd></div>}
          <div><dt>{he ? 'גוף' : 'Body'}</dt><dd>{cur.body[L]}</dd></div>
          <div><dt>{he ? 'כוכב' : 'Planet'}</dt><dd>{cur.planet[L]}</dd></div>
          <div><dt>{he ? 'עמוד' : 'Pillar'}</dt><dd>{
            cur.pillar === 'right' ? (he ? 'ימין — חסד' : 'Right — mercy')
            : cur.pillar === 'left' ? (he ? 'שמאל — דין' : 'Left — severity')
            : (he ? 'אמצע — רחמים' : 'Middle — balance')}</dd></div>
          <div><dt>{he ? 'עולם' : 'World'}</dt><dd>{world.name[L]}</dd></div>
        </dl>
      </section>

      {res && (
        <section className="report">
          <h2 className="r-title">{he ? 'הקריאה שלך' : 'Your reading'}</h2>
          <p className="r-sub">{res.p.hebrew.formatted[L]}</p>
          <div className="r-sec">
            <article className="ri">
              <h4>{he ? `דרך החיים ${res.p.lifePath} ← ${sephira(res.lifeSeph).name.he}` : `Life path ${res.p.lifePath} → ${sephira(res.lifeSeph).name.en}`}</h4>
              <p className="ri-val">{sephira(res.lifeSeph).meaning[L]}</p>
              <p className="ri-text">{sephira(res.lifeSeph).theme[L]} {he ? 'החוזקה שלך:' : 'Your gift:'} {sephira(res.lifeSeph).gift[L]} {he ? 'מה לעבוד עליו:' : 'To work on:'} {sephira(res.lifeSeph).challenge[L]}</p>
            </article>
            {res.nameSeph && (
              <article className="ri">
                <h4>{he ? `השם "${res.p.name}" = ${res.nameVal} ← ${sephira(res.nameSeph).name.he}` : `The name "${res.p.name}" = ${res.nameVal} → ${sephira(res.nameSeph).name.en}`}</h4>
                <p className="ri-val">{sephira(res.nameSeph).meaning[L]}</p>
                <p className="ri-text">
                  {res.nameSeph === res.lifeSeph
                    ? (he ? 'השם והתאריך מצביעים על אותה ספירה: הכוונה והדרך מחזקות זו את זו.' : 'Name and date point to the same Sephira: purpose and path reinforce each other.')
                    : (he ? `השם מוסיף לדרך החיים את כוחה של ${sephira(res.nameSeph).name.he}: ${sephira(res.nameSeph).gift.he}` : `Your name adds the power of ${sephira(res.nameSeph).name.en}: ${sephira(res.nameSeph).gift.en}`)}
                  {!res.p.nameNum.gematria && (he ? ' (השם נכתב באותיות לטיניות. לגימטריה אמיתית כתבו אותו בעברית.)' : ' (Latin letters used. Write the name in Hebrew for true gematria.)')}
                </p>
              </article>
            )}
            <article className="ri">
              <h4>{he ? `האות ${res.ml.letter} · חודש ${res.p.hebrew.month.name.he} · שבט ${res.p.hebrew.month.tribe.he}` : `Letter ${res.path.letterName.en} · ${res.p.hebrew.month.name.en} · tribe of ${res.p.hebrew.month.tribe.en}`}</h4>
              <p className="ri-val">{he ? `חוש ה${res.ml.sense.he}` : `The sense of ${res.ml.sense.en.toLowerCase()}`}</p>
              <p className="ri-text">
                {SENSE_TEXT[res.ml.letter][L]}{' '}
                {he
                  ? `בעץ החיים האות ${res.path.letterName.he} היא הנתיב ה-${res.path.n}, בין ${sephira(res.path.from).name.he} ל${sephira(res.path.to).name.he}, ומקבילה לקלף "${MAJOR_ARCANA[res.path.tarot]?.name.he}".`
                  : `On the Tree, ${res.path.letterName.en} is path ${res.path.n}, between ${sephira(res.path.from).name.en} and ${sephira(res.path.to).name.en}, matching the card "${MAJOR_ARCANA[res.path.tarot]?.name.en}".`}
              </p>
            </article>
          </div>
        </section>
      )}

      <section className="kb-worlds">
        <h2 className="section-label">{he ? 'ארבעת העולמות' : 'The four worlds'}</h2>
        <ol>
          {WORLDS.map((w) => (
            <li key={w.id} className={w.id === cur.world ? 'on' : ''}>
              <span className="kw-name">{w.name[L]}</span>
              <span className="kw-level">{w.level[L]}</span>
              <span className="kw-text">{w.text[L]}</span>
              <span className="kw-seph">{TREE.filter((s) => s.world === w.id).map((s) => s.name[L]).join(' · ')}</span>
            </li>
          ))}
        </ol>
      </section>
    </Page>
  );
};

/** תרשים עץ החיים: נתיבים, ספירות ואותיות. נגיש במקלדת. */
const TreeSvg: React.FC<{ sel: SephiraId; onSel: (id: SephiraId) => void; life?: SephiraId; named?: SephiraId; path?: TreePath; lang: 'he' | 'en' }> =
  ({ sel, onSel, life, named, path, lang }) => (
    <svg className="kb-tree" viewBox="0 0 300 520" role="group" aria-label={lang === 'he' ? 'עץ החיים' : 'Tree of Life'}>
      {/* שלושת העמודים ברקע */}
      <rect x="37" y="80" width="36" height="290" rx="18" className="pillar" />
      <rect x="227" y="80" width="36" height="290" rx="18" className="pillar" />
      <rect x="132" y="20" width="36" height="482" rx="18" className="pillar" />
      {PATHS22.map((p) => {
        const a = sephira(p.from), b = sephira(p.to);
        const on = path?.n === p.n;
        const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        return (
          <g key={p.n} className={`tp${on ? ' on' : ''}`}>
            <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            <circle cx={mx} cy={my} r="8.5" className="tp-dot" />
            <text x={mx} y={my + 3.5} className="tp-letter">{p.letter}</text>
          </g>
        );
      })}
      {TREE.map((s) => {
        const cls = ['ts', sel === s.id && 'sel', life === s.id && 'life', named === s.id && 'named'].filter(Boolean).join(' ');
        return (
          <g key={s.id} className={cls} tabIndex={0} role="button" aria-pressed={sel === s.id}
            aria-label={`${s.n}. ${s.name[lang]} — ${s.meaning[lang]}`}
            onClick={() => onSel(s.id)} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSel(s.id))}>
            {named === s.id && <circle cx={s.x} cy={s.y} r={R + 5} className="ts-ring" />}
            <circle cx={s.x} cy={s.y} r={R} className="ts-c" />
            <text x={s.x} y={s.y - 1} className="ts-name">{s.name[lang]}</text>
            <text x={s.x} y={s.y + 11} className="ts-num">{s.n}</text>
          </g>
        );
      })}
    </svg>
  );

export default KabbalahPage;
