import { useMemo, useState } from 'react';
import { IonInput, useIonViewWillEnter } from '@ionic/react';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import ShareBar from '../components/ShareBar';
import CompatDetails from '../components/CompatDetails';
import { AstroMode, KabbalahMode, NumbersMode } from '../components/LoveMethods';
import { IonIcon } from '@ionic/react';
import { heartOutline, planetOutline, gitNetworkOutline, calculatorOutline, helpCircleOutline } from 'ionicons/icons';
import { deepCompat } from '../core/compat-deep';
import { compatibility } from '../core';
import { readProfile } from '../validate';
import { loadJSON } from '../storage';
import { useLang } from '../lang';

const today = new Date().toISOString().slice(0, 10);

interface Person { name: string; birth: string }

const PersonFields: React.FC<{ title: string; v: Person; set: (p: Person) => void }> = ({ title, v, set }) => {
  const { S } = useLang();
  return (
    <div className="form-card love-card">
      <h2 className="section-label">{title}</h2>
      <IonInput mode="md" label={S.name} labelPlacement="stacked" fill="outline" value={v.name}
        onIonInput={(e) => set({ ...v, name: String(e.detail.value ?? '') })} />
      <IonInput mode="md" label={S.birthDate} labelPlacement="stacked" fill="outline" type="date" min="1900-01-01" max={today}
        value={v.birth} onIonInput={(e) => set({ ...v, birth: String(e.detail.value ?? '') })} />
    </div>
  );
};

/** שני לבבות שחץ של קופידון עובר דרכם, ולבבות קטנים שעולים */
const LoveHero: React.FC = () => (
  <div className="love-hero" aria-hidden="true">
    <svg viewBox="0 0 320 150">
      <defs>
        <linearGradient id="lh1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e5738f" /><stop offset="1" stopColor="#b8325a" /></linearGradient>
        <linearGradient id="lh2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3a6b8" /><stop offset="1" stopColor="#d9587a" /></linearGradient>
      </defs>
      <g className="lh-heart lh-a"><path d="M130 118 C 70 82 58 44 84 30 C 102 21 122 30 130 48 C 138 30 158 21 176 30 C 202 44 190 82 130 118 Z" fill="url(#lh1)" /></g>
      <g className="lh-heart lh-b"><path d="M192 122 C 140 91 130 58 152 46 C 168 38 185 46 192 62 C 199 46 216 38 232 46 C 254 58 244 91 192 122 Z" fill="url(#lh2)" opacity=".92" /></g>
      <g className="lh-arrow">
        <line x1="40" y1="112" x2="282" y2="44" stroke="#8a6519" strokeWidth="3" strokeLinecap="round" />
        <path d="M282 44 l-16 -1 l6 10 z" fill="#8a6519" transform="rotate(-16 282 44)" />
        <path d="M44 111 l-10 -8 m10 8 l-12 1 m18 -5 l-10 -8 m10 8 l-12 1" stroke="#8a6519" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>
    </svg>
    {Array.from({ length: 7 }, (_, i) => <span key={i} className="float-heart" style={{ '--k': i } as React.CSSProperties}>♥</span>)}
  </div>
);

/** לב שמתמלא לפי אחוז ההתאמה */
const ScoreHeart: React.FC<{ pct: number }> = ({ pct }) => (
  <svg className="score-heart" viewBox="0 0 200 180" role="img" aria-label={`${pct}%`}>
    <defs>
      <clipPath id="sh-clip"><path d="M100 170 C 20 118 0 70 28 38 C 52 12 88 20 100 50 C 112 20 148 12 172 38 C 200 70 180 118 100 170 Z" /></clipPath>
    </defs>
    <path d="M100 170 C 20 118 0 70 28 38 C 52 12 88 20 100 50 C 112 20 148 12 172 38 C 200 70 180 118 100 170 Z" className="sh-bg" />
    <g clipPath="url(#sh-clip)">
      <rect className="sh-fill" x="0" y={180 - (pct / 100) * 160} width="200" height="180" style={{ '--h': `${(pct / 100) * 160}px` } as React.CSSProperties} />
    </g>
    <path d="M100 170 C 20 118 0 70 28 38 C 52 12 88 20 100 50 C 112 20 148 12 172 38 C 200 70 180 118 100 170 Z" className="sh-line" />
    <text x="100" y="104" className="sh-num">{pct}%</text>
  </svg>
);

type Mode = 'quick' | 'astro' | 'kabbalah' | 'numbers';
type LL = { he: string; en: string };
const MODES: { id: Mode; icon: string; label: LL; desc: LL; info: LL; when: LL }[] = [
  { id: 'quick', icon: heartOutline, label: { he: 'כללי', en: 'Overview' },
    desc: { he: 'בדיקה מהירה לפי תאריכי לידה בלבד: מזלות, יסודות, סיני ונומרולוגיה — 10 פרמטרים.', en: 'A quick check from birth dates only: signs, elements, Chinese and numerology — 10 parameters.' },
    info: { he: '', en: '' }, when: { he: '', en: '' } },
  { id: 'astro', icon: planetOutline, label: { he: 'אסטרולוגיה', en: 'Astrology' },
    desc: { he: 'סינסטרי ומפת קומפוזיט לפי תאריך, שעה ומקום לידה: נוגה ומאדים, כוכב חמה, הירח ושבתאי.', en: 'Synastry and composite from date, time and place: Venus and Mars, Mercury, the Moon and Saturn.' },
    info: { he: 'דינמיקת התנהגות, צרכים רגשיים, חיי יום-יום ומשיכה.', en: 'Behavioral dynamics, emotional needs, daily life and attraction.' },
    when: { he: 'כשרוצים להבין מאיפה נובעים פערים בתקשורת או בהתנהלות השוטפת.', en: 'To understand where gaps in communication or daily life come from.' } },
  { id: 'kabbalah', icon: gitNetworkOutline, label: { he: 'קבלה וזוהר', en: 'Kabbalah & Zohar' },
    desc: { he: 'שמות עבריים ושמות האימהות, שורש הנשמה בעץ החיים, תיקון משותף ויסודות לפי ספר יצירה.', en: 'Hebrew names and mothers\' names, soul roots on the Tree of Life, shared tikkun and Sefer Yetzirah elements.' },
    info: { he: 'שורש הנשמה, ייעוד רוחני, שיעורים קארמתיים ותיקון.', en: 'Soul root, spiritual purpose, karmic lessons and tikkun.' },
    when: { he: 'כשחשים חיבור גורלי, חזק ולא מוסבר, ורוצים להבין את משמעותו הרוחנית.', en: 'When you feel a strong, fated, unexplained bond and want its spiritual meaning.' } },
  { id: 'numbers', icon: calculatorOutline, label: { he: 'נומרולוגיה', en: 'Numerology' },
    desc: { he: 'מספר גורל משותף, קצב דרכי החיים, ועיתוי לפי שנה אישית למיסוד, ילדים ומעבר.', en: 'Shared destiny number, life path pace, and personal-year timing for commitment, children and moving.' },
    info: { he: 'התאמת קצב חיים, מספר הגורל המשותף ועיתויים נכונים.', en: 'Pace of life, shared destiny number and right timing.' },
    when: { he: 'ככלי מעשי להחלטות על מיסוד, מעברים ושלבים בחיים.', en: 'As a practical tool for decisions on commitment, moves and life stages.' } },
];

const BAND: { he: string; en: string }[] = [
  { he: 'חיבור נדיר: רוב השיטות מצביעות על הרמוניה עמוקה ביניכם.', en: 'A rare bond: most systems point to deep harmony between you.' },
  { he: 'התאמה טובה: בסיס חזק, עם מספיק הבדלים כדי שיהיה מעניין.', en: 'A good match: a strong base with enough differences to keep it interesting.' },
  { he: 'התאמה בינונית: יש חיבור אמיתי ויש גם עבודה — ובזה בדיוק הצמיחה.', en: 'A moderate match: real connection and real work — which is where growth happens.' },
  { he: 'הפכים: הרבה חיכוך, ולכן גם הרבה פוטנציאל ללמוד זה מזה.', en: 'Opposites: much friction, and so much potential to learn from each other.' },
];

const CompatPage: React.FC = () => {
  const { lang, S } = useLang();
  const he = lang === 'he';
  const [a, setA] = useState<Person>({ name: '', birth: '' });
  const [b, setB] = useState<Person>({ name: '', birth: '' });
  const [submitted, setSubmitted] = useState<{ a: Person; b: Person } | null>(null);
  const [burst, setBurst] = useState(0);
  const [mode, setMode] = useState<Mode>('quick');
  const [showGuide, setShowGuide] = useState(false);

  // ממלא את האדם הראשון מהמפה האחרונה שחושבה
  useIonViewWillEnter(() => {
    loadJSON<Person>('astro:last').then((s) => {
      if (s) setA((cur) => (cur.birth ? cur : { name: s.name, birth: s.birth }));
    });
  });

  const { result, error } = useMemo(() => {
    if (!submitted) return { result: null, error: '' };
    try {
      const pa = readProfile(S, submitted.a.name, submitted.a.birth);
      const pb = readProfile(S, submitted.b.name, submitted.b.birth);
      return { result: { r: compatibility(pa, pb, lang), d: deepCompat(pa, pb), pa, pb }, error: '' };
    } catch (err) {
      return { result: null, error: (err as Error).message };
    }
  }, [submitted, S, lang]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted({ a, b });
    setBurst((n) => n + 1);
  };

  const sample = () => {
    const pa = { name: he ? 'נועה' : 'Noa', birth: '1990-03-15' };
    const pb = { name: he ? 'דניאל' : 'Daniel', birth: '1988-07-22' };
    setA(pa); setB(pb); setSubmitted({ a: pa, b: pb }); setBurst((n) => n + 1);
  };

  return (
    <Page title={S.tabPair}>
      <div className="love">
        <LoveHero />
        <PageIntro page="pair" title={he ? 'התאמה זוגית' : 'Compatibility'} />

        <section className="lm-guide">
          <button type="button" className="psy-how-toggle" aria-expanded={showGuide} onClick={() => setShowGuide((v) => !v)}>
            <span><IonIcon icon={helpCircleOutline} aria-hidden="true" /> {he ? 'איזו שיטה מתאימה לאיזו מטרה?' : 'Which method for which purpose?'}</span>
            <span aria-hidden="true">{showGuide ? '−' : '+'}</span>
          </button>
          {showGuide && (
            <div className="psy-how-body">
              <p className="lm-what">{he ? 'כל שיטה בוחנת רובד אחר של הזוגיות — מהתקשורת היומיומית ועד התיקון הנשמתי העמוק.' : 'Each method looks at a different layer of the relationship — from daily communication to the deepest soul repair.'}</p>
              <div className="lm-gcards">{MODES.filter((m) => m.id !== 'quick').map((m) => (
                <article key={m.id} className="lm-gcard">
                  <h4><IonIcon icon={m.icon} aria-hidden="true" />{m.label[lang]}</h4>
                  <p><b>{he ? 'מה מקבלים: ' : 'You learn: '}</b>{m.info[lang]}</p>
                  <p><b>{he ? 'מתי להשתמש: ' : 'Use it: '}</b>{m.when[lang]}</p>
                  <button type="button" className="link-btn inline" onClick={() => setMode(m.id)}>{he ? 'לבדיקה בשיטה זו' : 'Use this method'}</button>
                </article>
              ))}</div>
            </div>
          )}
        </section>

        <div className="lm-tabs" role="tablist" aria-label={he ? 'שיטת בדיקה' : 'Method'}>
          {MODES.map((m) => (
            <button type="button" key={m.id} role="tab" aria-selected={mode === m.id} className={mode === m.id ? 'on' : ''} onClick={() => setMode(m.id)}>
              <IonIcon icon={m.icon} aria-hidden="true" />
              <span>{m.label[lang]}</span>
            </button>
          ))}
        </div>
        <p className="lm-mode-desc">{MODES.find((m) => m.id === mode)!.desc[lang]}</p>

        {mode === 'astro' && <AstroMode />}
        {mode === 'kabbalah' && <KabbalahMode />}
        {mode === 'numbers' && <NumbersMode />}

        {mode === 'quick' && (<>
        <form onSubmit={submit} noValidate className="love-form">
          <PersonFields title={S.you} v={a} set={setA} />
          <div className="love-link" aria-hidden="true"><span>♥</span></div>
          <PersonFields title={S.partner} v={b} set={setB} />
          {error && <p role="alert" className="err" style={{ marginTop: 14 }}>{error}</p>}
          <button type="submit" className="love-btn">{S.checkMatch} <span aria-hidden="true">♥</span></button>
          <button type="button" className="link-btn love-sample" onClick={sample}>{he ? 'אין פרטים בהישג יד? הצג דוגמה' : 'No details handy? Show an example'}</button>
        </form>

        {result && (
          <div aria-live="polite" className="love-result" key={burst}>
            <div className="burst" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <span key={i} style={{ '--k': i } as React.CSSProperties}>♥</span>)}
            </div>
            <p className="love-names">{S.and(result.pa.name, result.pb.name)}</p>
            <ScoreHeart pct={result.d.total} />
            <p className="love-summary">{BAND[result.d.total >= 80 ? 0 : result.d.total >= 65 ? 1 : result.d.total >= 50 ? 2 : 3][lang]}</p>
            <CompatDetails d={result.d} names={[result.pa.name, result.pb.name]} />
            <ShareBar
              title={he ? 'התאמה זוגית' : 'Compatibility'}
              text={[
                '💞 ' + S.and(result.pa.name, result.pb.name) + ' — ' + result.d.total + '%',
                BAND[result.d.total >= 80 ? 0 : result.d.total >= 65 ? 1 : result.d.total >= 50 ? 2 : 3][lang],
                '',
                ...result.d.groups.map((g) => '♥ ' + g.label[lang] + ': ' + g.score + '%'),
                '',
                ...result.d.params.map((p) => '• ' + p.label[lang] + ' (' + p.detail[lang] + '): ' + p.score + '%'),
              ].join('\n')}
              short={'💞 ' + S.and(result.pa.name, result.pb.name) + ' — ' + result.d.total + '% · ' + result.d.groups.map((g) => g.label[lang] + ' ' + g.score + '%').join(' · ')}
            />
            <p className="love-foot">{he ? 'להעמקה, עברו למצבים "אסטרולוגיה", "קבלה וזוהר" או "נומרולוגיה" למעלה.' : 'To go deeper, switch to Astrology, Kabbalah or Numerology above.'}</p>
          </div>
        )}
        </>)}
      </div>
    </Page>
  );
};

export default CompatPage;
