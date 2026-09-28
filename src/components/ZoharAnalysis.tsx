import { useRef, useState } from 'react';
import { useLang } from '../lang';
import PhotoPicker from './PhotoPicker';
import { FEATURES, ELEMENTS, readZohar, type Choices, type El } from '../core/zohar';

type L = { he: string; en: string };
type Step = 0 | 1 | 2 | 3;

const STEPS: { title: L; what: L }[] = [
  { title: { he: 'פרטים', en: 'Details' }, what: { he: 'השם שלך ושם האם. במסורת הקבלית מתייחסים לאדם בשמו ובשם אמו, ומהגימטריה של שניהם נגזר "שורש הנשמה". השדות אינם חובה.', en: 'Your name and your mother\'s name. Kabbalistic tradition refers to a person by their name and their mother\'s; the gematria of both gives the "root of the soul". Optional.' } },
  { title: { he: 'פנים', en: 'Face' }, what: { he: 'צילום פנים (לא חובה) ובחירת ארבעה מאפיינים: צורת הפנים, המצח, קמטי המצח וצבע העיניים. הצילום עוזר לכם להתבונן ולבחור נכון — הבחירה עצמה ידנית.', en: 'A face photo (optional) and four features: face shape, forehead, forehead lines and eye colour. The photo helps you look and choose; the choice itself is manual.' } },
  { title: { he: 'כף יד', en: 'Palm' }, what: { he: 'צילום כף היד הדומיננטית (לא חובה) ובחירת צורת היד ושלושת הקווים הראשיים. התרשים מראה איפה נמצא כל קו.', en: 'A photo of your dominant palm (optional) and the hand shape and three main lines. The diagram shows where each line is.' } },
  { title: { he: 'תוצאה', en: 'Reading' }, what: { he: 'היסוד הדומיננטי והמזג, הספירה של צורת הפנים, שורש הנשמה מהשם, ופירוש של כל מאפיין שבחרתם.', en: 'Your dominant element and temperament, the Sephira of your face shape, the soul root from your name, and each feature you chose.' } },
];

const ZoharAnalysis: React.FC = () => {
  const { lang } = useLang();
  const he = lang === 'he';
  const [step, setStep] = useState<Step>(0);
  const [name, setName] = useState('');
  const [mother, setMother] = useState('');
  const [facePhoto, setFacePhoto] = useState<string | null>(null);
  const [palmPhoto, setPalmPhoto] = useState<string | null>(null);
  const [ch, setCh] = useState<Choices>({});
  const top = useRef<HTMLDivElement>(null);

  const go = (s: Step) => { setStep(s); window.setTimeout(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); };
  const stepFeatures = (s: 'face' | 'palm') => FEATURES.filter((f) => f.step === s);
  const missing = (s: 'face' | 'palm') => stepFeatures(s).filter((f) => !ch[f.key]).length;

  const fillSample = () => {
    setName('נועה לוי'); setMother('רחל');
    setFacePhoto('/samples/face.svg'); setPalmPhoto('/samples/palm.svg');
    setCh({ faceShape: 'oval', forehead: 'high', lines: 'straight', eyes: 'brown', hand: 'square-long', heart: 'curved', head: 'sloping', life: 'wide' });
    go(3);
  };

  const r = step === 3 ? readZohar(ch, name, mother) : null;

  const FeaturePicker = ({ s }: { s: 'face' | 'palm' }) => (
    <>
      {stepFeatures(s).map((f) => (
        <div className="gr-feature" key={f.key}>
          <div className="gr-f-head"><span className="gr-f-name">{f.name[lang]}</span></div>
          <span className="gr-f-what">{f.how[lang]}</span>
          <div className="chips-wrap" role="radiogroup" aria-label={f.name[lang]}>
            {f.options.map((o) => (
              <button type="button" key={o.id} role="radio" aria-checked={ch[f.key] === o.id}
                className={ch[f.key] === o.id ? 'on' : ''} onClick={() => setCh((c) => ({ ...c, [f.key]: o.id }))}>
                {o.label[lang]}
              </button>
            ))}
          </div>
          {ch[f.key] && <p className="zo-opt-text">{f.options.find((o) => o.id === ch[f.key])!.text[lang]}</p>}
        </div>
      ))}
    </>
  );

  return (
    <div className="zo" ref={top} style={{ scrollMarginTop: 8 }}>
      {/* סרגל שלבים */}
      <ol className="stepper" aria-label={he ? 'שלבי הניתוח' : 'Steps'}>
        {STEPS.map((s, i) => (
          <li key={i} className={i === step ? 'cur' : i < step ? 'done' : ''}>
            <button type="button" onClick={() => go(i as Step)} aria-current={i === step ? 'step' : undefined}
              disabled={i === 3 && (missing('face') > 0 || missing('palm') > 0)}>
              <span className="st-n">{i < step ? '✓' : i + 1}</span>
              <span className="st-t">{s.title[lang]}</span>
            </button>
          </li>
        ))}
      </ol>

      <section className="form-card zo-step" key={step}>
        <p className="zo-step-of">{he ? `שלב ${step + 1} מתוך 4` : `Step ${step + 1} of 4`}</p>
        <h2 className="section-label">{STEPS[step].title[lang]}</h2>
        <p className="zo-what">{STEPS[step].what[lang]}</p>

        {step === 0 && (
          <>
            <label className="native-field"><span>{he ? 'שם פרטי ושם משפחה' : 'Full name'}</span>
              <input className="text-in" value={name} onChange={(e) => setName(e.target.value)} placeholder={he ? 'למשל: נועה לוי' : 'e.g. Noa Levi'} /></label>
            <label className="native-field"><span>{he ? 'שם האם' : 'Mother\'s name'}</span>
              <input className="text-in" value={mother} onChange={(e) => setMother(e.target.value)} placeholder={he ? 'למשל: רחל' : 'e.g. Rachel'} /></label>
            <button type="button" className="link-btn zo-sample" onClick={fillSample}>
              {he ? 'רוצים לראות איך זה נראה? מילוי דוגמה מלאה ←' : 'See how it looks: fill a full example →'}
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <PhotoPicker label={he ? 'צילום פנים חזיתי' : 'Front face photo'} hint={he ? 'מבט ישר, אור רך, בלי משקפיים' : 'Straight on, soft light, no glasses'}
              value={facePhoto} onChange={setFacePhoto} samples={[{ src: '/samples/face.svg', label: he ? 'איור פנים לדוגמה' : 'Sample face' }]} />
            <FeaturePicker s="face" />
          </>
        )}

        {step === 2 && (
          <>
            <figure className="zo-guide">
              <img src="/samples/palm.svg" alt={he ? 'תרשים קווי כף היד' : 'Palm lines diagram'} />
              <figcaption>{he ? 'איפה כל קו: הלב למעלה, הראש באמצע, החיים סביב האגודל, הגורל באמצע לאורך.' : 'Where each line is: heart at the top, head in the middle, life around the thumb, fate running up the centre.'}</figcaption>
            </figure>
            <PhotoPicker label={he ? 'צילום כף היד' : 'Palm photo'} hint={he ? 'היד הדומיננטית, פתוחה וישרה, כל כף היד בתמונה' : 'Dominant hand, open and flat, whole palm in frame'}
              value={palmPhoto} onChange={setPalmPhoto} samples={[{ src: '/samples/palm.svg', label: he ? 'תרשים כף יד' : 'Sample palm' }]} />
            <FeaturePicker s="palm" />
          </>
        )}

        {step === 3 && r && (
          <div className="zo-result">
            <div className="zo-el">
              <span className="zo-el-letter" aria-hidden="true">{ELEMENTS[r.element].letter}</span>
              <div>
                <p className="zo-el-label">{he ? 'היסוד הדומיננטי שלך' : 'Your dominant element'}</p>
                <p className="zo-el-name">{ELEMENTS[r.element].name[lang]}</p>
                <p className="zo-el-temp">{ELEMENTS[r.element].temperament[lang]}</p>
              </div>
            </div>
            <p className="zo-lead">{ELEMENTS[r.element].text[lang]}</p>
            <ul className="zo-bars">
              {(Object.keys(r.counts) as El[]).map((e) => {
                const total = Object.values(r.counts).reduce((a, b) => a + b, 0) || 1;
                return (
                  <li key={e} className={e === r.element ? 'top' : ''}>
                    <span>{ELEMENTS[e].name[lang]}</span>
                    <div className="psy-bar"><i style={{ width: `${(r.counts[e] / total) * 100}%` }} /></div>
                    <span className="muted">{Math.round((r.counts[e] / total) * 100)}%</span>
                  </li>
                );
              })}
            </ul>
            <div className="r-sec">
              <article className="ri tone-good"><h4>{he ? 'המתנה שלך' : 'Your gift'}</h4><p className="ri-val">{ELEMENTS[r.element].gift[lang]}</p></article>
              <article className="ri"><h4>{he ? 'ממה להיזהר' : 'Watch out for'}</h4><p className="ri-val">{ELEMENTS[r.element].care[lang]}</p></article>
              {r.secondary && (
                <article className="ri"><h4>{he ? 'יסוד משני' : 'Secondary element'}</h4>
                  <p className="ri-text">{he ? `לצד ה${ELEMENTS[r.element].name.he} יש בך גם ${ELEMENTS[r.secondary].name.he}: ${ELEMENTS[r.secondary].gift.he}.` : `Alongside ${ELEMENTS[r.element].name.en} you also carry ${ELEMENTS[r.secondary].name.en}: ${ELEMENTS[r.secondary].gift.en.toLowerCase()}.`}</p></article>
              )}
              {r.faceSephira && (
                <article className="ri"><h4>{he ? 'הספירה של צורת הפנים' : 'Sephira of your face'}</h4>
                  <p className="ri-val">{r.faceSephira.name[lang]} — {r.faceSephira.meaning[lang]}</p>
                  <p className="ri-text">{r.faceSephira.theme[lang]}</p></article>
              )}
              {r.root && (
                <article className="ri"><h4>{he ? `שורש הנשמה: "${name} בן/בת ${mother}" = ${r.root.value}` : `Soul root: "${name}, child of ${mother}" = ${r.root.value}`}</h4>
                  <p className="ri-val">{r.root.sephira.name[lang]} — {r.root.sephira.meaning[lang]}</p>
                  <p className="ri-text">{r.root.sephira.gift[lang]}</p></article>
              )}
            </div>
            <h3 className="section-label" style={{ marginTop: 22 }}>{he ? 'מה אומר כל מאפיין' : 'What each feature says'}</h3>
            <div className="r-sec">
              {r.items.map((it, i) => (
                <article className="ri" key={i}>
                  <h4>{it.step === 'face' ? (he ? 'פנים · ' : 'Face · ') : (he ? 'כף יד · ' : 'Palm · ')}{it.name[lang]}</h4>
                  <p className="ri-val">{it.label[lang]}</p>
                  <p className="ri-text">{it.text[lang]}</p>
                </article>
              ))}
            </div>
            <ul className="r-notes">
              <li>{he ? 'קריאה בהשראת ספר הזוהר ומסורת קריאת כף היד. אינה כלי מדעי.' : 'A reading inspired by the Zohar and palmistry tradition; not a scientific tool.'}</li>
              <li>{he ? 'התמונות נשארות במכשיר ואינן נשלחות לשום מקום.' : 'Photos stay on your device and are not sent anywhere.'}</li>
            </ul>
          </div>
        )}

        {/* ניווט בין שלבים */}
        <div className="zo-nav">
          {step > 0 ? <button type="button" className="btn-line" onClick={() => go((step - 1) as Step)}>{he ? 'הקודם' : 'Back'}</button> : <span />}
          {step === 1 && <button type="button" className="btn-solid" disabled={missing('face') > 0} onClick={() => go(2)}>{missing('face') ? (he ? `נשארו ${missing('face')} בחירות` : `${missing('face')} left to choose`) : (he ? 'המשך לכף היד' : 'Continue to palm')}</button>}
          {step === 0 && <button type="button" className="btn-solid" onClick={() => go(1)}>{he ? 'המשך לפנים' : 'Continue to face'}</button>}
          {step === 2 && <button type="button" className="btn-solid" disabled={missing('palm') > 0} onClick={() => go(3)}>{missing('palm') ? (he ? `נשארו ${missing('palm')} בחירות` : `${missing('palm')} left to choose`) : (he ? 'לתוצאה' : 'See reading')}</button>}
          {step === 3 && <button type="button" className="btn-solid" onClick={() => { setCh({}); setFacePhoto(null); setPalmPhoto(null); go(0); }}>{he ? 'ניתוח חדש' : 'New reading'}</button>}
        </div>
      </section>
    </div>
  );
};

export default ZoharAnalysis;
