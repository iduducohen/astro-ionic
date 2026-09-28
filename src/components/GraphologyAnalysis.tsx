import { useEffect, useState } from 'react';
import { useLang } from '../lang';
import PhotoPicker from './PhotoPicker';
import { measureHandwriting, type Dir, type Measured } from '../analysis/handwriting';

type L = { he: string; en: string };
type FeatureKey = 'slant' | 'pressure' | 'size' | 'baseline' | 'spacing';

interface Option { id: string; label: L; text: L }
interface Feature { key: FeatureKey; name: L; what: L; options: Option[] }

/** חמשת המאפיינים, שלוש אפשרויות לכל אחד, ופירוש לכל אפשרות */
const FEATURES: Feature[] = [
  {
    key: 'slant', name: { he: 'נטיית הכתב', en: 'Slant' },
    what: { he: 'לאיזה כיוון נוטות האותיות ביחס לכיוון הכתיבה', en: 'Which way letters lean relative to the writing direction' },
    options: [
      { id: 'back', label: { he: 'לאחור', en: 'Backward' }, text: { he: 'נטייה לאחור קשורה לריסון ולשיקול דעת לפני שמגיבים. מראה על צורך בפרטיות ועל חשיבה עצמאית, ולעיתים על זהירות בפתיחות רגשית.', en: 'A backward slant is linked to restraint and thinking before reacting. It suggests a need for privacy and independent thinking, sometimes caution about opening up emotionally.' } },
      { id: 'upright', label: { he: 'זקוף', en: 'Upright' }, text: { he: 'כתב זקוף מבטא איזון בין רגש להיגיון. אדם שמחליט מתוך שיקול, שומר על יציבות ולא נסחף בקלות.', en: 'Upright writing expresses a balance between feeling and logic: someone who decides deliberately, stays steady and isn\'t easily swept along.' } },
      { id: 'forward', label: { he: 'קדימה', en: 'Forward' }, text: { he: 'נטייה קדימה, לכיוון הכתיבה, מבטאת פתיחות, תגובה רגשית מהירה ורצון לקשר עם אנשים. ככל שהנטייה חזקה יותר, כך הדחף לפעול מהיר יותר.', en: 'Leaning forward, toward the writing direction, shows openness, quick emotional response and a wish to connect. The stronger the lean, the faster the urge to act.' } },
    ],
  },
  {
    key: 'pressure', name: { he: 'לחץ העט', en: 'Pressure' },
    what: { he: 'כמה חזק נלחץ העט, לפי עובי וכהות הקו', en: 'How hard the pen is pressed, by line weight and darkness' },
    options: [
      { id: 'light', label: { he: 'קל', en: 'Light' }, text: { he: 'לחץ קל מעיד על רגישות, עדינות והתאמה מהירה לסביבה. לרוב אדם שחווה דברים לעומק אבל מוציא אנרגיה בזהירות.', en: 'Light pressure points to sensitivity, gentleness and quick adaptation. Often someone who feels deeply but spends energy carefully.' } },
      { id: 'medium', label: { he: 'בינוני', en: 'Medium' }, text: { he: 'לחץ בינוני משקף אנרגיה מאוזנת: מעורבות בלי מתח מיותר, ויכולת להתמיד לאורך זמן.', en: 'Medium pressure reflects balanced energy: engagement without excess tension, and staying power.' } },
      { id: 'heavy', label: { he: 'חזק', en: 'Heavy' }, text: { he: 'לחץ חזק מבטא עוצמה, נחישות ומחויבות. רגשות נחווים בעוצמה ונשארים לאורך זמן, ולפעמים יש בו גם מתח פנימי.', en: 'Heavy pressure expresses strength, determination and commitment. Feelings run strong and last, sometimes with inner tension.' } },
    ],
  },
  {
    key: 'size', name: { he: 'גודל האותיות', en: 'Letter size' },
    what: { he: 'גובה שורת הכתב ביחס לרוחב הדף', en: 'Height of a line of writing relative to page width' },
    options: [
      { id: 'small', label: { he: 'קטן', en: 'Small' }, text: { he: 'כתב קטן קשור לריכוז, דיוק ותשומת לב לפרטים. לרוב אדם שמעדיף לעבוד בשקט ולא לתפוס מקום.', en: 'Small writing is linked to concentration, precision and attention to detail: often someone who prefers to work quietly rather than take up space.' } },
      { id: 'medium', label: { he: 'בינוני', en: 'Medium' }, text: { he: 'גודל בינוני מבטא הסתגלות: יכולת לראות גם את התמונה הכללית וגם את הפרטים.', en: 'Medium size shows adaptability: seeing both the big picture and the details.' } },
      { id: 'large', label: { he: 'גדול', en: 'Large' }, text: { he: 'כתב גדול מבטא ביטחון, חברתיות ורצון להיראות ולהשפיע. ראייה רחבה, לפעמים על חשבון הפרטים הקטנים.', en: 'Large writing expresses confidence, sociability and a wish to be seen and to influence. A wide view, sometimes at the expense of small details.' } },
    ],
  },
  {
    key: 'baseline', name: { he: 'קו הכתיבה', en: 'Baseline' },
    what: { he: 'האם השורות עולות, יורדות או נשארות ישרות', en: 'Whether lines rise, fall or stay level' },
    options: [
      { id: 'falling', label: { he: 'יורד', en: 'Falling' }, text: { he: 'שורות יורדות קשורות בגרפולוגיה לעייפות או למצב רוח ירוד בזמן הכתיבה. כדאי לבדוק שוב בדף אחר, כי זה משתנה מיום ליום.', en: 'Falling lines are linked in graphology to tiredness or low mood at the time of writing. Worth checking another page, as it varies from day to day.' } },
      { id: 'straight', label: { he: 'ישר', en: 'Level' }, text: { he: 'קו ישר מעיד על יציבות, משמעת עצמית ויכולת לשמור על כיוון גם כשיש הסחות.', en: 'A level baseline points to stability, self-discipline and holding a course despite distractions.' } },
      { id: 'rising', label: { he: 'עולה', en: 'Rising' }, text: { he: 'שורות עולות מבטאות אופטימיות, שאפתנות והתלהבות. אנרגיה שמכוונת קדימה ולמעלה.', en: 'Rising lines express optimism, ambition and enthusiasm: energy aimed forward and upward.' } },
    ],
  },
  {
    key: 'spacing', name: { he: 'מרווח בין מילים', en: 'Word spacing' },
    what: { he: 'הרווח בין מילה למילה ביחס לגובה האותיות', en: 'The gap between words relative to letter height' },
    options: [
      { id: 'narrow', label: { he: 'צפוף', en: 'Narrow' }, text: { he: 'מרווח צפוף מבטא צורך בקרבה ובמגע עם אנשים, ולפעמים קושי לקחת מרחק ולראות דברים מבחוץ.', en: 'Narrow spacing expresses a need for closeness and contact, sometimes difficulty stepping back to see things from outside.' } },
      { id: 'balanced', label: { he: 'מאוזן', en: 'Balanced' }, text: { he: 'מרווח מאוזן משקף חשיבה מסודרת ויחסים בריאים: קרבה עם גבולות ברורים.', en: 'Balanced spacing reflects organized thinking and healthy relationships: closeness with clear boundaries.' } },
      { id: 'wide', label: { he: 'מרווח', en: 'Wide' }, text: { he: 'מרווח רחב מבטא צורך במרחב אישי ובעצמאות, וחשיבה צלולה שמפרידה בין נושאים.', en: 'Wide spacing expresses a need for personal space and independence, and clear thinking that separates topics.' } },
    ],
  },
];

const detail = (m: Measured, k: FeatureKey, he: boolean): string => {
  switch (k) {
    case 'slant': return he ? `${Math.abs(m.slant.deg)}° ${m.slant.deg > 0 ? 'קדימה' : m.slant.deg < 0 ? 'לאחור' : ''}` : `${Math.abs(m.slant.deg)}° ${m.slant.deg > 0 ? 'forward' : m.slant.deg < 0 ? 'backward' : ''}`;
    case 'pressure': return he ? `כהות דיו ${Math.round(m.pressure.darkness * 100)}%` : `ink darkness ${Math.round(m.pressure.darkness * 100)}%`;
    case 'size': return he ? `שורה = ${(m.size.ratio * 100).toFixed(1)}% מרוחב הדף` : `line = ${(m.size.ratio * 100).toFixed(1)}% of page width`;
    case 'baseline': { const d = m.baseline.deg; return `${Math.abs(d)}° ${d > 0 ? (he ? 'עולה' : 'rising') : d < 0 ? (he ? 'יורד' : 'falling') : ''}`; }
    case 'spacing': return he ? `רווח ≈ ${m.spacing.ratio}× גובה שורה` : `gap ≈ ${m.spacing.ratio}× line height`;
  }
};

const GraphologyAnalysis: React.FC = () => {
  const { lang } = useLang();
  const he = lang === 'he';
  const [photo, setPhoto] = useState<string | null>(null);
  const [dir, setDir] = useState<Dir>(he ? 'rtl' : 'ltr');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [measured, setMeasured] = useState<Measured | null>(null);
  const [choice, setChoice] = useState<Partial<Record<FeatureKey, string>>>({});
  const [showResult, setShowResult] = useState(false);

  // כיוון הכתב עוקב אחרי שפת הממשק, עד שבוחרים ידנית
  const [dirTouched, setDirTouched] = useState(false);
  useEffect(() => { if (!dirTouched) setDir(he ? 'rtl' : 'ltr'); }, [he, dirTouched]);

  const onPhoto = (p: string | null) => {
    setPhoto(p); setMeasured(null); setError(''); setShowResult(false);
  };

  const analyzePhoto = async () => {
    if (!photo) return;
    setBusy(true); setError('');
    try {
      const m = await measureHandwriting(photo, dir);
      setMeasured(m);
      setChoice({ slant: m.slant.value, pressure: m.pressure.value, size: m.size.value, baseline: m.baseline.value, spacing: m.spacing.value });
      setShowResult(true);
    } catch {
      setError(he ? 'לא זוהה כתב יד ברור בתמונה. נסו לצלם מקרוב יותר, ישר מלמעלה ובאור טוב.' : 'No clear handwriting found. Try a closer photo, straight from above, in good light.');
    } finally {
      setBusy(false);
    }
  };

  const chosen = FEATURES.filter((f) => choice[f.key]);

  return (
    <div className="gr">
      {/* שלב 1: תמונה */}
      <section className="form-card">
        <div className="step-head"><span className="step-num">1</span><h2 className="section-label">{he ? 'תמונה של כתב היד' : 'Photo of your handwriting'}</h2></div>
        <PhotoPicker
          label={he ? 'דף בכתב ידך' : 'A page in your handwriting'}
          hint={he ? '3–4 שורות לפחות, נייר לבן, צילום ישר מלמעלה' : 'At least 3–4 lines, white paper, shot from above'}
          value={photo} onChange={onPhoto}
          samples={[
            { src: '/samples/handwriting-forward.jpg', label: he ? 'נטוי קדימה, לחץ חזק, שורות עולות' : 'Forward, heavy, rising' },
            { src: '/samples/handwriting-upright.jpg', label: he ? 'זקוף, ישר ומרווח' : 'Upright, level, wide' },
            { src: '/samples/handwriting-backward.jpg', label: he ? 'נטוי לאחור, קטן, בעיפרון' : 'Backward, small, pencil' },
          ]} />
        <div className="seg2" role="radiogroup" aria-label={he ? 'שפת הכתב' : 'Script'}>
          <span className="muted small">{he ? 'שפת הכתב:' : 'Script:'}</span>
          <button type="button" role="radio" aria-checked={dir === 'rtl'} className={dir === 'rtl' ? 'on' : ''} onClick={() => { setDir('rtl'); setDirTouched(true); }}>{he ? 'עברית (ימין לשמאל)' : 'Hebrew (RTL)'}</button>
          <button type="button" role="radio" aria-checked={dir === 'ltr'} className={dir === 'ltr' ? 'on' : ''} onClick={() => { setDir('ltr'); setDirTouched(true); }}>{he ? 'אנגלית (שמאל לימין)' : 'English (LTR)'}</button>
        </div>
        {photo && (
          <button type="button" className="btn-solid" onClick={analyzePhoto} disabled={busy}>
            {busy ? (he ? 'מודד…' : 'Measuring…') : (he ? 'מדידת כתב היד' : 'Measure handwriting')}
          </button>
        )}
        {error && <p className="err">{error}</p>}
      </section>

      {/* שלב 2: מאפיינים — מתמלא מהמדידה, ואפשר לבחור ידנית */}
      <section className="form-card">
        <div className="step-head"><span className="step-num">2</span><h2 className="section-label">{he ? 'המאפיינים' : 'The features'}</h2></div>
        <p className="muted small" style={{ margin: 0 }}>
          {measured
            ? (he ? `נמדד מהתמונה (${measured.lines} שורות). אפשר לתקן כל מאפיין ידנית.` : `Measured from the photo (${measured.lines} lines). You can correct any feature.`)
            : (he ? 'אין תמונה? אפשר לבחור ידנית לפי מה שרואים בכתב.' : 'No photo? Choose by looking at the writing.')}
        </p>
        {FEATURES.map((f) => (
          <div className="gr-feature" key={f.key}>
            <div className="gr-f-head">
              <span className="gr-f-name">{f.name[lang]}</span>
              {measured && <span className="gr-f-meas">{detail(measured, f.key, he)}</span>}
            </div>
            <span className="gr-f-what">{f.what[lang]}</span>
            <div className="chips3" role="radiogroup" aria-label={f.name[lang]}>
              {f.options.map((o) => (
                <button type="button" key={o.id} role="radio" aria-checked={choice[f.key] === o.id}
                  className={choice[f.key] === o.id ? 'on' : ''}
                  onClick={() => { setChoice((c) => ({ ...c, [f.key]: o.id })); setShowResult(true); }}>
                  {o.label[lang]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* שלב 3: פירוש */}
      {showResult && chosen.length > 0 && (
        <section className="report" aria-live="polite">
          <h2 className="r-title">{he ? 'מה הכתב מספר' : 'What your writing says'}</h2>
          <div className="r-sec">
            {chosen.map((f) => {
              const o = f.options.find((x) => x.id === choice[f.key])!;
              return (
                <article className="ri" key={f.key}>
                  <h4>{f.name[lang]}</h4>
                  <p className="ri-val">{o.label[lang]}</p>
                  <p className="ri-text">{o.text[lang]}</p>
                </article>
              );
            })}
          </div>
          <ul className="r-notes">
            <li>{he ? 'גרפולוגיה אינה כלי מדעי מוכח. התייחסו לפירוש כהשראה למחשבה.' : 'Graphology is not a proven science. Treat the reading as food for thought.'}</li>
            <li>{he ? 'המדידה רגישה לזווית הצילום ולתאורה. צילום ישר ובהיר נותן תוצאה מדויקת יותר.' : 'Measurement is sensitive to angle and lighting. A straight, bright photo is more accurate.'}</li>
          </ul>
        </section>
      )}
    </div>
  );
};

export default GraphologyAnalysis;
