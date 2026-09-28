import { useEffect, useRef, useState } from 'react';
import { useLang } from '../lang';
import { loadJSON, saveJSON } from '../storage';
import Modal from './Modal';
import {
  QUESTIONS, MBTI_AXES, MBTI_TYPES16, ENN_TYPES, BF_TRAITS,
  scoreMbti, scoreEnneagram, scoreBigFive, type Answers, type TestId, type Version,
} from '../core/psychology';

type L = { he: string; en: string };
const STORE = 'astro:psy';

const TESTS: { id: TestId; name: L; measures: L; result: L; more: L[] }[] = [
  { id: 'mbti', name: { he: 'MBTI', en: 'MBTI' }, measures: { he: 'איך קולטים מידע, מחליטים ומתנהלים ביומיום', en: 'How you take in information, decide and live day to day' }, result: { he: 'אחד מ-16 טיפוסים', en: 'One of 16 types' },
    more: [
      { he: 'מבוסס על הטיפולוגיה של קרל יונג, ופותח על ידי קתרין בריגס ואיזבל מאיירס. ארבעה צירים, ולכל אחד שני קטבים:', en: 'Based on Carl Jung\'s typology, developed by Katharine Briggs and Isabel Myers. Four axes, each with two poles:' },
      { he: 'E/I — מאיפה מגיעה האנרגיה: מאנשים (מוחצנות) או משקט (מופנמות).', en: 'E/I — where energy comes from: people (extraversion) or quiet (introversion).' },
      { he: 'S/N — איך קולטים מידע: עובדות מוחשיות (חושים) או דפוסים ואפשרויות (אינטואיציה).', en: 'S/N — how you take in information: concrete facts (sensing) or patterns and possibilities (intuition).' },
      { he: 'T/F — איך מחליטים: היגיון ועקרונות (חשיבה) או ערכים ואנשים (רגש).', en: 'T/F — how you decide: logic and principles (thinking) or values and people (feeling).' },
      { he: 'J/P — איך מתנהלים: תכנון וסגירה (שיפוט) או גמישות ופתיחות (תפיסה).', en: 'J/P — how you live: planning and closure (judging) or flexibility (perceiving).' },
      { he: 'אלה העדפות ולא יכולות: כל אחד משתמש בשני הקטבים, רק באחד בנוחות רבה יותר.', en: 'These are preferences, not abilities: everyone uses both poles, one more comfortably.' },
    ] },
  { id: 'enneagram', name: { he: 'אניאגרם', en: 'Enneagram' }, measures: { he: 'המוטיבציה העמוקה והפחד שמניעים אותך', en: 'The core motivation and fear that drive you' }, result: { he: 'אחד מ-9 טיפוסים + כנף', en: 'One of 9 types + wing' },
    more: [
      { he: 'מודל של תשעה טיפוסי אישיות המסודרים במעגל. כל טיפוס מוגדר לפי רצון מרכזי ופחד מרכזי, ולא לפי התנהגות.', en: 'A model of nine personality types arranged in a circle. Each is defined by a core desire and a core fear rather than by behavior.' },
      { he: 'הכנף היא הטיפוס השכן במעגל (למשל 4 או 6 אצל טיפוס 5) שמוסיף לטיפוס שלך גוון.', en: 'The wing is the neighboring type on the circle (e.g. 4 or 6 for a type 5) that colors your type.' },
      { he: 'הטיפוס עם הציון הגבוה ביותר הוא הדומיננטי. כדאי לקרוא גם את הטיפוס השני בדירוג: לעיתים הוא מתאים יותר.', en: 'The highest-scoring type is dominant. Read the runner-up too: sometimes it fits better.' },
    ] },
  { id: 'bigfive', name: { he: 'Big Five', en: 'Big Five' }, measures: { he: 'חמש תכונות יסוד על רצף, מ-0 עד 100', en: 'Five core traits on a 0–100 continuum' }, result: { he: 'פרופיל של 5 תכונות', en: 'A 5-trait profile' },
    more: [
      { he: 'המודל המבוסס ביותר במחקר הפסיכולוגי (נקרא גם OCEAN). בניגוד לטיפוסים, כל תכונה נמדדת כרצף.', en: 'The best-supported model in psychological research (also called OCEAN). Unlike types, each trait is a continuum.' },
      { he: 'פתיחות · מצפוניות · מוחצנות · נעימות · יציבות רגשית (ההפך מנוירוטיות).', en: 'Openness · Conscientiousness · Extraversion · Agreeableness · Emotional stability (the reverse of neuroticism).' },
      { he: 'חלק מההיגדים מנוסחים הפוך, כדי לאזן נטייה להסכים עם הכל.', en: 'Some statements are reverse-worded, to balance a tendency to agree with everything.' },
    ] },
];

const SCALE: L[] = [
  { he: 'בכלל לא מתאים', en: 'Strongly disagree' },
  { he: 'לא כל כך', en: 'Disagree' },
  { he: 'חלקית', en: 'Neutral' },
  { he: 'די מתאים', en: 'Agree' },
  { he: 'מתאים מאוד', en: 'Strongly agree' },
];

type Saved = Partial<Record<TestId, Answers>>;
type SavedVer = Partial<Record<TestId, Version>>;

/** טבלת השוואה: מה ההבדל בין שלושת המבחנים */
const COMPARE: { row: L; mbti: L; enneagram: L; bigfive: L }[] = [
  { row: { he: 'מה נמדד', en: 'Measures' }, mbti: { he: 'העדפות: איך קולטים מידע ומחליטים', en: 'Preferences: how you take in information and decide' }, enneagram: { he: 'מוטיבציה: מה מניע ומה מפחיד', en: 'Motivation: what drives and scares you' }, bigfive: { he: 'תכונות: כמה יש מכל תכונה', en: 'Traits: how much of each you have' } },
  { row: { he: 'סוג התוצאה', en: 'Result type' }, mbti: { he: 'טיפוס (אחד מ-16)', en: 'A type (1 of 16)' }, enneagram: { he: 'טיפוס + כנף (אחד מ-9)', en: 'Type + wing (1 of 9)' }, bigfive: { he: '5 ציונים על רצף 0–100', en: '5 scores on 0–100' } },
  { row: { he: 'בסיס', en: 'Basis' }, mbti: { he: 'התיאוריה של יונג', en: "Jung's theory" }, enneagram: { he: 'מסורת רוחנית ופסיכולוגיה', en: 'Spiritual tradition and psychology' }, bigfive: { he: 'מחקר אמפירי רחב', en: 'Broad empirical research' } },
  { row: { he: 'טוב במיוחד ל…', en: 'Best for…' }, mbti: { he: 'עבודה בצוות, תקשורת, קריירה', en: 'Teamwork, communication, career' }, enneagram: { he: 'צמיחה אישית והבנת דפוסים', en: 'Personal growth and patterns' }, bigfive: { he: 'תמונה מדויקת ומדידה', en: 'An accurate, measurable picture' } },
];

const PROCESS: L[] = [
  { he: 'בוחרים מבחן וגרסה: מקוצרת (כ-5 דקות) או מלאה (15–20 דקות, מדויקת יותר).', en: 'Choose a test and a version: short (~5 min) or full (15–20 min, more accurate).' },
  { he: 'עונים על כל היגד לפי התחושה הראשונה — כמו שאתם באמת, לא כמו שהייתם רוצים להיות.', en: "Answer each statement by first instinct — as you really are, not as you'd like to be." },
  { he: 'כל היגד שייך לציר, לטיפוס או לתכונה. התשובה (1–5) מוסיפה או מורידה נקודות לקטגוריה שלו; היגדים הפוכים נספרים הפוך.', en: 'Each statement belongs to an axis, type or trait. Your 1–5 answer adds to or subtracts from it; reversed statements count the other way.' },
  { he: 'בסוף מחושב ממוצע לכל קטגוריה ומוצג כאחוזים — וממנו הטיפוס או הפרופיל. ככל שיש יותר היגדים, כך תשובה בודדת משפיעה פחות.', en: 'Finally each category is averaged and shown as a percentage, giving your type or profile. More statements mean any single answer matters less.' },
];

const PsychologyAssessment: React.FC = () => {
  const { lang } = useLang();
  const he = lang === 'he';
  const [saved, setSaved] = useState<Saved>({});
  const [savedVer, setSavedVer] = useState<SavedVer>({});
  const [ver, setVer] = useState<Version>('short');
  const [showHow, setShowHow] = useState(false);
  const [active, setActive] = useState<TestId | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [view, setView] = useState<TestId | null>(null); // הצגת תוצאה
  const [info, setInfo] = useState<TestId | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    loadJSON<Saved>(STORE).then((s) => s && setSaved(s));
    loadJSON<SavedVer>(STORE + ':ver').then((s) => s && setSavedVer(s));
  }, []);
  // אחרי סיום שאלון או לחיצה על "לתוצאה" — גוללים אל התוצאה
  useEffect(() => {
    if (view) window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }, [view]);

  const start = (t: TestId, v: Version) => { setActive(t); setVer(v); setIdx(0); setAnswers({}); setView(null); };
  const qs = active ? QUESTIONS[active][ver] : [];
  const cur = qs[idx];

  const answer = (v: number) => {
    const next = { ...answers, [cur.id]: v };
    setAnswers(next);
    if (idx < qs.length - 1) {
      window.setTimeout(() => setIdx((i) => i + 1), 180);
    } else {
      const s = { ...saved, [active!]: next };
      setSaved(s); saveJSON(STORE, s);
      const sv = { ...savedVer, [active!]: ver };
      setSavedVer(sv); saveJSON(STORE + ':ver', sv);
      setView(active); setActive(null);
    }
  };

  /* ---------- שאלון פעיל ---------- */
  if (active && cur) {
    const t = TESTS.find((x) => x.id === active)!;
    return (
      <section className="psy-run">
        <div className="psy-run-head">
          <button type="button" className="link-btn" onClick={() => setActive(null)}>{he ? '→ יציאה' : '← Exit'}</button>
          <span className="psy-run-name">{t.name[lang]} · {ver === 'full' ? (he ? 'מלא' : 'full') : (he ? 'מקוצר' : 'short')}</span>
          <span className="psy-run-count">{he ? `${idx + 1} מתוך ${qs.length}` : `${idx + 1} of ${qs.length}`}</span>
        </div>
        <div className="psy-progress" role="progressbar" aria-valuemin={0} aria-valuemax={qs.length} aria-valuenow={idx + 1}>
          <i style={{ width: `${((idx + 1) / qs.length) * 100}%` }} />
        </div>

        <div className="psy-q" key={cur.id}>
          <p className="psy-q-label">{he ? 'עד כמה ההיגד מתאר אותך?' : 'How well does this describe you?'}</p>
          <h2 className="psy-q-text">{cur.text[lang]}</h2>
          <div className="psy-scale" role="radiogroup" aria-label={cur.text[lang]}>
            {SCALE.map((s, i) => (
              <button type="button" key={i} role="radio" aria-checked={answers[cur.id] === i + 1}
                className={`psy-opt${answers[cur.id] === i + 1 ? ' on' : ''}`} onClick={() => answer(i + 1)}>
                <span className="psy-dot" data-v={i + 1} aria-hidden="true" />
                <span>{s[lang]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="psy-nav">
          <button type="button" className="link-btn" disabled={idx === 0} onClick={() => setIdx((i) => i - 1)}>
            {he ? '→ לשאלה הקודמת' : '← Previous'}
          </button>
          {answers[cur.id] && idx < qs.length - 1 && (
            <button type="button" className="link-btn" onClick={() => setIdx((i) => i + 1)}>{he ? 'הבאה ←' : 'Next →'}</button>
          )}
        </div>
      </section>
    );
  }

  /* ---------- בחירת שאלון + תוצאות ---------- */
  return (
    <>
      <section className="psy-how">
        <button type="button" className="psy-how-toggle" aria-expanded={showHow} onClick={() => setShowHow((x) => !x)}>
          <span>{he ? 'איך זה עובד, ומה ההבדל בין המבחנים?' : 'How it works, and how the tests differ'}</span>
          <span aria-hidden="true">{showHow ? '−' : '+'}</span>
        </button>
        {showHow && (
          <div className="psy-how-body">
            <ol className="psy-steps">{PROCESS.map((p, i) => <li key={i}>{p[lang]}</li>)}</ol>
            <div className="psy-table-wrap">
              <table className="psy-table">
                <thead><tr><th /><th>MBTI</th><th>{he ? 'אניאגרם' : 'Enneagram'}</th><th>Big Five</th></tr></thead>
                <tbody>{COMPARE.map((r, i) => (
                  <tr key={i}><th scope="row">{r.row[lang]}</th><td>{r.mbti[lang]}</td><td>{r.enneagram[lang]}</td><td>{r.bigfive[lang]}</td></tr>
                ))}</tbody>
              </table>
            </div>
            <p className="psy-how-note">{he ? 'למה גרסה מלאה? שאלונים מקצועיים כוללים עשרות עד מאות היגדים (MBTI המקורי: 93; IPIP-NEO: 120–300). הגרסה המלאה כאן — 186 היגדים בשלושת המבחנים יחד — נותנת תוצאה יציבה יותר. עדיין מדובר בכלי להתבוננות עצמית, לא באבחון.' : 'Why the full version? Professional questionnaires have dozens to hundreds of items (original MBTI: 93; IPIP-NEO: 120–300). The full version here — 186 statements across the three tests — gives a steadier result. It is still a self-reflection tool, not a diagnosis.'}</p>
          </div>
        )}
      </section>

      <div className="psy-tests">
        {TESTS.map((t) => {
          const done = !!saved[t.id];
          return (
            <article key={t.id} className={`psy-card${view === t.id ? ' on' : ''}`}>
              <div className="psy-card-top">
                <h2 className="psy-card-name">{t.name[lang]}</h2>
                <span className="psy-card-meta">{QUESTIONS[t.id].short.length} / {QUESTIONS[t.id].full.length} {he ? 'היגדים' : 'statements'}</span>
              </div>
              <p className="psy-card-what">{t.measures[lang]}</p>
              <p className="psy-card-res">{he ? 'תוצאה: ' : 'Result: '}{t.result[lang]}</p>
              {done && (
                <p className="psy-card-last">
                  {he ? 'התוצאה האחרונה' : 'Last result'}{savedVer[t.id] ? (he ? (savedVer[t.id] === 'full' ? ' (מלא)' : ' (מקוצר)') : ` (${savedVer[t.id]})`) : ''}: <b>{summary(t.id, saved[t.id]!, lang)}</b>
                  {' '}<button type="button" className="link-btn inline" onClick={() => setView(t.id)}>{he ? 'לתוצאה המלאה' : 'Full result'}</button>
                </p>
              )}
              <div className="psy-card-actions">
                <button type="button" className="btn-solid sm" onClick={() => start(t.id, 'full')}>{he ? `מלא · ${QUESTIONS[t.id].full.length} היגדים · ~${Math.ceil(QUESTIONS[t.id].full.length / 4)} דק׳` : `Full · ${QUESTIONS[t.id].full.length} · ~${Math.ceil(QUESTIONS[t.id].full.length / 4)} min`}</button>
                <button type="button" className="btn-line sm" onClick={() => start(t.id, 'short')}>{he ? `מקוצר · ${QUESTIONS[t.id].short.length}` : `Short · ${QUESTIONS[t.id].short.length}`}</button>
                <button type="button" className="link-btn" onClick={() => setInfo(t.id)}>{he ? 'מה זה?' : 'What is it?'}</button>
              </div>
            </article>
          );
        })}
      </div>

      <div ref={resultRef} style={{ scrollMarginTop: 8 }}>
        {view && saved[view] && <Result test={view} ans={saved[view]!} lang={lang} />}
      </div>

      <Modal isOpen={!!info} onClose={() => setInfo(null)} title={info ? TESTS.find((t) => t.id === info)!.name[lang] : ''}>
        {info && (
          <div className="info-body">
            <p className="info-lead">{TESTS.find((t) => t.id === info)!.measures[lang]}</p>
            {TESTS.find((t) => t.id === info)!.more.map((p, i) => <p key={i}>{p[lang]}</p>)}
          </div>
        )}
      </Modal>
    </>
  );
};

function summary(t: TestId, a: Answers, lang: 'he' | 'en'): string {
  if (t === 'mbti') { const r = scoreMbti(a); return `${r.type} · ${MBTI_TYPES16[r.type].name[lang]}`; }
  if (t === 'enneagram') { const r = scoreEnneagram(a); return `${r.type}w${r.wing} · ${ENN_TYPES[r.type].name[lang]}`; }
  const r = scoreBigFive(a);
  const top = BF_TRAITS.reduce((x, y) => (r[y.key] > r[x.key] ? y : x));
  return `${lang === 'he' ? 'הכי גבוה:' : 'Highest:'} ${top.name[lang]} ${r[top.key]}`;
}

const Bar: React.FC<{ pct: number; left?: string; right?: string }> = ({ pct, left, right }) => (
  <div className="psy-bar-wrap">
    {left && <span className="psy-bar-end">{left}</span>}
    <div className="psy-bar"><i style={{ width: `${pct}%` }} /></div>
    {right && <span className="psy-bar-end">{right}</span>}
  </div>
);

/** נתונים גולמיים לכל קטגוריה: כמה היגדים נענו, וממוצע התשובות (1–5, אחרי היפוך היגדים הפוכים) */
function raw(test: TestId, ans: Answers): Record<string, { n: number; avg: number }> {
  const out: Record<string, { n: number; sum: number }> = {};
  for (const q of QUESTIONS[test].full) {
    const v = ans[q.id];
    if (v === undefined) continue;
    const val = q.reverse ? 6 - v : v;
    out[q.key] = { n: (out[q.key]?.n ?? 0) + 1, sum: (out[q.key]?.sum ?? 0) + val };
  }
  return Object.fromEntries(Object.entries(out).map(([k, o]) => [k, { n: o.n, avg: Math.round((o.sum / o.n) * 10) / 10 }]));
}

const band = (v: number, he: boolean) => (v >= 60 ? (he ? 'גבוה' : 'High') : v <= 40 ? (he ? 'נמוך' : 'Low') : (he ? 'בינוני' : 'Medium'));
const strength = (pct: number, he: boolean) => {
  const d = Math.abs(pct - 50);
  return d < 8 ? (he ? 'כמעט מאוזן' : 'Nearly balanced') : d < 20 ? (he ? 'העדפה קלה' : 'Slight preference') : d < 35 ? (he ? 'העדפה ברורה' : 'Clear preference') : (he ? 'העדפה חזקה' : 'Strong preference');
};

/** הסבר קבוע: איך לקרוא את הציונים */
const ScoreGuide: React.FC<{ test: TestId; he: boolean; answered: number }> = ({ test, he, answered }) => (
  <details className="psy-guide" open>
    <summary>{he ? 'איך לקרוא את הציונים?' : 'How to read the scores'}</summary>
    <div>
      <p>{he
        ? `כל תשובה שלך הומרה לנקודות: "בכלל לא מתאים" = 0, "לא כל כך" = 25, "חלקית" = 50, "די מתאים" = 75, "מתאים מאוד" = 100. הציון של כל קטגוריה הוא ממוצע הנקודות של ההיגדים שלה, ולכן תמיד בין 0 ל-100. התוצאה מבוססת על ${answered} היגדים שענית עליהם.`
        : `Each answer became points: "not at all" = 0, "not really" = 25, "partly" = 50, "fairly" = 75, "very much" = 100. Each category score is the average of its statements, so it always runs 0–100. Based on ${answered} statements you answered.`}</p>
      {test === 'mbti' && <p>{he
        ? 'ב-MBTI כל ציר מחולק בין שני קטבים שסכומם 100%. למשל "מוחצנות 70% · מופנמות 30%" אומר שמתוך הנקודות האפשריות בציר, 70% נטו למוחצנות. 50% = אמצע מדויק; ככל שהמספר רחוק יותר מ-50, ההעדפה ברורה יותר. האות בטיפוס היא הקוטב שקיבל מעל 50%.'
        : 'In MBTI each axis is split between two poles that add up to 100%. "Extraversion 70% · Introversion 30%" means 70% of the axis points leaned to extraversion. 50% is exact balance; the further from 50, the clearer the preference. The letter in your type is the pole above 50%.'}</p>}
      {test === 'enneagram' && <p>{he
        ? 'באניאגרם לכל אחד מתשעת הטיפוסים יש ציון 0–100 שמבטא עד כמה הזדהית עם ההיגדים שלו. זה לא אחוז מתוך סך הכול — כל טיפוס נמדד בנפרד, ולכן כמה טיפוסים יכולים לקבל ציון גבוה. הטיפוס שלך הוא זה עם הציון הגבוה ביותר; אם ההפרש מהשני קטן (פחות מ-10), כדאי לקרוא גם אותו.'
        : 'Each of the nine types gets its own 0–100 score for how much you identified with its statements. It is not a share of a total — types are measured separately, so several can score high. Your type is the highest; if the runner-up is within 10 points, read it too.'}</p>}
      {test === 'bigfive' && <p>{he
        ? 'ב-Big Five כל תכונה היא רצף: 0–40 נמוך, 40–60 בינוני, 60–100 גבוה. אין ציון "טוב" או "רע" — כל קצה של הרצף הוא סגנון אחר. ב"יציבות רגשית" ציון גבוה פירושו רוגע, וציון נמוך — רגישות רגשית גבוהה.'
        : 'In Big Five each trait is a continuum: 0–40 low, 40–60 medium, 60–100 high. No score is "good" or "bad" — each end is a different style. For Emotional stability, high means calm, low means high emotional sensitivity.'}</p>}
    </div>
  </details>
);

const Result: React.FC<{ test: TestId; ans: Answers; lang: 'he' | 'en' }> = ({ test, ans, lang }) => {
  const he = lang === 'he';
  const answered = Object.keys(ans).filter((id) => QUESTIONS[test].full.some((q) => q.id === id)).length;
  const R = raw(test, ans);
  if (test === 'mbti') {
    const r = scoreMbti(ans);
    const t = MBTI_TYPES16[r.type];
    return (
      <section className="report psy-result">
        <p className="r-sub">{he ? 'הטיפוס שלך לפי MBTI' : 'Your MBTI type'}</p>
        <div className="psy-type"><span className="psy-type-code">{r.type}</span><span className="psy-type-name">{t.name[lang]}</span></div>
        <p className="psy-lead">{t.short[lang]}</p>
        <ScoreGuide test={test} he={he} answered={answered} />
        <div className="r-sec">
          {r.axes.map((x, i) => {
            const ax = MBTI_AXES[i];
            const win = x.pctA >= 50;
            const n = (R[x.a]?.n ?? 0) + (R[x.b]?.n ?? 0);
            return (
              <div className="psy-axis" key={x.a}>
                <div className="psy-axis-name"><b>{ax.name[lang]}</b><span className="psy-strength">{strength(x.pctA, he)}</span></div>
                <div className="psy-axis-top">
                  <span className={win ? 'win' : ''}>{x.a} · {ax.aName[lang]} <b>{x.pctA}%</b></span>
                  <span />
                  <span className={!win ? 'win' : ''}><b>{100 - x.pctA}%</b> {ax.bName[lang]} · {x.b}</span>
                </div>
                <div className="psy-split"><i style={{ width: `${x.pctA}%` }} /><span className="psy-mid" /></div>
                <p className="psy-raw">{he ? `${x.pctA} מתוך 100 נקודות הציר נטו ל${ax.aName.he}, ו-${100 - x.pctA} ל${ax.bName.he} · על בסיס ${n} היגדים` : `${x.pctA} of 100 axis points leaned to ${ax.aName.en}, ${100 - x.pctA} to ${ax.bName.en} · ${n} statements`}</p>
              </div>
            );
          })}
        </div>
        <div className="r-sec">
          <article className="ri tone-good"><h4>{he ? 'חוזקות' : 'Strengths'}</h4><p className="ri-text">{t.strengths[lang]}</p></article>
          <article className="ri"><h4>{he ? 'כיוון לצמיחה' : 'Room to grow'}</h4><p className="ri-text">{t.growth[lang]}</p></article>
        </div>
      </section>
    );
  }
  if (test === 'enneagram') {
    const r = scoreEnneagram(ans);
    const t = ENN_TYPES[r.type];
    const gap = r.ranked[0].pct - r.ranked[1].pct;
    return (
      <section className="report psy-result">
        <p className="r-sub">{he ? 'הטיפוס שלך באניאגרם' : 'Your Enneagram type'}</p>
        <div className="psy-type"><span className="psy-type-code">{r.type}<small>w{r.wing}</small></span><span className="psy-type-name">{t.name[lang]}</span></div>
        <p className="psy-lead">{he ? `עם כנף ${r.wing} (${ENN_TYPES[r.wing].name.he}). ` : `With a ${r.wing} wing (${ENN_TYPES[r.wing].name.en}). `}
          {gap < 10 ? (he ? `שים לב: טיפוס ${r.ranked[1].type} קרוב מאוד (${gap} נקודות הפרש) — כדאי לקרוא גם אותו.` : `Note: type ${r.ranked[1].type} is very close (${gap} points) — read it too.`) : (he ? `הטיפוס בולט בהפרש של ${gap} נקודות מהבא אחריו.` : `It leads the next type by ${gap} points.`)}</p>
        <ScoreGuide test={test} he={he} answered={answered} />
        <div className="r-sec">
          <article className="ri"><h4>{he ? 'הרצון המרכזי' : 'Core desire'}</h4><p className="ri-val">{t.desire[lang]}</p></article>
          <article className="ri"><h4>{he ? 'הפחד המרכזי' : 'Core fear'}</h4><p className="ri-val">{t.fear[lang]}</p></article>
          <article className="ri tone-good"><h4>{he ? 'חוזקות' : 'Strengths'}</h4><p className="ri-text">{t.strength[lang]}</p></article>
          <article className="ri"><h4>{he ? 'כיוון לצמיחה' : 'Room to grow'}</h4><p className="ri-text">{t.growth[lang]}</p></article>
        </div>
        <h3 className="section-label" style={{ marginTop: 24 }}>{he ? 'רמת ההזדהות עם כל אחד מתשעת הטיפוסים (0–100)' : 'Identification with each of the nine types (0–100)'}</h3>
        <ul className="psy-rank">
          {r.ranked.map((x) => (
            <li key={x.type} className={x.type === r.type ? 'top' : ''}>
              <span className="psy-rank-n">{x.type}</span>
              <span className="psy-rank-name">{ENN_TYPES[x.type].name[lang]}</span>
              <Bar pct={x.pct} />
              <span className="psy-rank-v">{x.pct}<small>/100</small></span>
              <span className="psy-rank-raw">{he ? `ממוצע ${R[x.type]?.avg ?? '—'} מתוך 5 · ${R[x.type]?.n ?? 0} היגדים` : `avg ${R[x.type]?.avg ?? '—'} of 5 · ${R[x.type]?.n ?? 0} statements`}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }
  const r = scoreBigFive(ans);
  return (
    <section className="report psy-result">
      <p className="r-sub">{he ? 'פרופיל Big Five שלך' : 'Your Big Five profile'}</p>
      <ScoreGuide test={test} he={he} answered={answered} />
      <div className="r-sec">
        {BF_TRAITS.map((t) => {
          const v = r[t.key];
          const raw1 = R[t.key];
          const avgShown = raw1 ? (t.key === 'N' ? Math.round((6 - raw1.avg) * 10) / 10 : raw1.avg) : null;
          return (
            <article className="psy-trait" key={t.key}>
              <div className="psy-trait-top">
                <span className="psy-trait-name">{t.name[lang]}</span>
                <span className="psy-trait-val">{v}<small>/100</small> <span className={`psy-band b-${band(v, false).toLowerCase()}`}>{band(v, he)}</span></span>
              </div>
              <div className="psy-bf-bar"><Bar pct={v} /><div className="psy-ticks"><span>{he ? 'נמוך' : 'Low'}</span><span>{he ? 'בינוני' : 'Medium'}</span><span>{he ? 'גבוה' : 'High'}</span></div></div>
              <p className="psy-raw">{he ? `ממוצע התשובות ${avgShown ?? '—'} מתוך 5 · על בסיס ${raw1?.n ?? 0} היגדים` : `Average answer ${avgShown ?? '—'} of 5 · ${raw1?.n ?? 0} statements`}</p>
              <p className="psy-trait-what">{t.what[lang]}</p>
              <p className="psy-trait-text">{v >= 60 ? t.high[lang] : v <= 40 ? t.low[lang] : (he ? 'באמצע הרצף: שני הצדדים זמינים לך, תלוי במצב.' : 'Mid-range: both sides are available to you, depending on the situation.')}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default PsychologyAssessment;
