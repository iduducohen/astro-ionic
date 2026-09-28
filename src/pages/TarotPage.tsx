import { useEffect, useRef, useState } from 'react';
import { IonButton, IonCheckbox, IonInput } from '@ionic/react';
import Page from '../components/Page';
import PageIntro from '../components/PageIntro';
import { drawCards, parseDate, westernSign, type DrawnCard } from '../core';
import { SPREADS, TOPICS, type DeepSpread, type Topic } from '../core/tarot-deep';
import TarotReading from '../components/TarotReading';
import { useLang } from '../lang';
import { loadJSON } from '../storage';
import TarotCard from '../components/TarotCard';
import TarotDeck, { type DeckPhase } from '../components/TarotDeck';

const FLIP_MS = 800;
const SHUFFLE_MS = 1900;  // שני סבבי ריפל
const DEAL_STAGGER = 260; // השהיה בין קלף לקלף בחלוקה
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Draw { cards: DrawnCard[]; spread: DeepSpread; topic: Topic; q: string }

const TarotPage: React.FC = () => {
  const { lang: L, S } = useLang();
  const [q, setQ] = useState('');
  const [spread, setSpread] = useState<DeepSpread>('three');
  const [topic, setTopic] = useState<Topic>('general');
  const [allowRev, setAllowRev] = useState(true);
  const [phase, setPhase] = useState<DeckPhase>('idle');
  const [draw, setDraw] = useState<Draw | null>(null);
  const [open, setOpen] = useState<boolean[]>([]);   // קלפים שהתהפכו
  const [shown, setShown] = useState<boolean[]>([]); // פירושים שמוצגים (אחרי סוף האנימציה)
  const [signId, setSignId] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const timers = useRef<number[]>([]);

  // המזל מהמפה האחרונה, כדי לסמן "הקלף של המזל שלך"
  useEffect(() => {
    loadJSON<{ birth: string }>('astro:last').then((s) => {
      const p = s && parseDate(s.birth);
      if (p) setSignId(westernSign(p[1], p[2]).id);
    });
    return () => timers.current.forEach(clearTimeout);
  }, []);

  const later = (fn: () => void, ms: number) => { timers.current.push(window.setTimeout(fn, ms)); };

  const doDraw = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === 'shuffling' || phase === 'dealing') return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    const n = SPREADS[spread].positions.length;
    const cards = drawCards(n, allowRev);
    setDraw(null);
    scrollToTable();

    if (reducedMotion()) {
      setDraw({ cards, spread, topic, q: q.trim() });
      setOpen(cards.map(() => false)); setShown(cards.map(() => false));
      setPhase('dealt');
      return;
    }
    setPhase('shuffling');
    later(() => {
      setDraw({ cards, spread, topic, q: q.trim() });
      setOpen(cards.map(() => false)); setShown(cards.map(() => false));
      setPhase('dealing');
    }, SHUFFLE_MS);
    later(() => setPhase('dealt'), SHUFFLE_MS + DEAL_STAGGER * n + 500);
  };

  // מביא את השולחן לראש המסך, כדי שהערבוב והקלפים ייראו
  const scrollToTable = async () => {
    const c = contentRef.current, t = tableRef.current;
    if (!c || !t) return;
    const el = await c.getScrollElement();
    const y = t.getBoundingClientRect().top - el.getBoundingClientRect().top + el.scrollTop - 8;
    c.scrollToPoint(0, y, reducedMotion() ? 0 : 450);
  };

  const reveal = (idx: number[]) => {
    idx.forEach((i, k) => {
      const go = () => {
        setOpen((o) => o.map((v, j) => v || j === i));
        later(() => setShown((s) => s.map((v, j) => v || j === i)), reducedMotion() ? 0 : FLIP_MS);
      };
      if (k === 0 || reducedMotion()) go(); else later(go, k * 350);
    });
  };

  const pos = draw ? SPREADS[draw.spread].positions.map((p) => p.name) : [];
  const allOpen = open.length > 0 && open.every(Boolean);
  const busy = phase === 'shuffling' || phase === 'dealing';
  const deckLeft = 22 - (draw && phase !== 'shuffling' ? draw.cards.length : 0);

  return (
    <Page title={S.tabTarot} contentRef={contentRef}>
      <PageIntro page="tarot" title={L === 'he' ? 'קלפי טארוט' : 'Tarot'} />

      <form onSubmit={doDraw} noValidate className="form-card">
        <IonInput mode="md" label={S.question} labelPlacement="stacked" fill="outline" maxlength={140}
          placeholder={S.questionPlaceholder} value={q} onIonInput={(e) => setQ(String(e.detail.value ?? ''))} />
        <div className="tp-field">
          <span className="muted small">{S.spread}</span>
          <div className="tp-spreads" role="radiogroup" aria-label={S.spread}>
            {(Object.keys(SPREADS) as DeepSpread[]).map((k) => (
              <button type="button" key={k} role="radio" aria-checked={spread === k} className={spread === k ? 'on' : ''} onClick={() => setSpread(k)}>
                <b>{SPREADS[k].label[L]}</b><span>{SPREADS[k].desc[L]}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="tp-field">
          <span className="muted small">{L === 'he' ? 'על מה השאלה?' : 'What is it about?'}</span>
          <div className="chips-wrap" role="radiogroup">
            {TOPICS.map((t) => (
              <button type="button" key={t.id} role="radio" aria-checked={topic === t.id} className={topic === t.id ? 'on' : ''} onClick={() => setTopic(t.id)}>{t.label[L]}</button>
            ))}
          </div>
        </div>
        <IonCheckbox checked={allowRev} onIonChange={(e) => setAllowRev(e.detail.checked)} labelPlacement="end" justify="start">
          {S.includeReversed}
        </IonCheckbox>
        <IonButton type="submit" expand="block" className="btn-main" disabled={busy}>
          {phase === 'shuffling' ? (L === 'he' ? 'מערבב…' : 'Shuffling…') : draw ? S.drawAgain : S.draw}
        </IonButton>
      </form>

      {/* השולחן: החבילה למעלה, הפריסה מתחת */}
      <div className="table" ref={tableRef}>
        <TarotDeck phase={phase} left={deckLeft} label={L === 'he' ? 'חבילת 22 קלפים' : 'Deck of 22 cards'} />
        <p className="table-status" aria-live="polite">
          {phase === 'idle' && (L === 'he' ? 'החבילה מוכנה. חשבו על השאלה ולחצו על "ערבוב ומשיכה".' : 'The deck is ready. Hold your question in mind and press "Shuffle and draw".')}
          {phase === 'shuffling' && (L === 'he' ? 'מערבבים את החבילה…' : 'Shuffling the deck…')}
          {phase === 'dealing' && (L === 'he' ? 'מחלקים את הקלפים…' : 'Dealing the cards…')}
          {phase === 'dealt' && !allOpen && S.tapToReveal}
          {phase === 'dealt' && allOpen && (L === 'he' ? 'כל הקלפים גלויים. הפירוש מופיע למטה.' : 'All cards are revealed. The reading is below.')}
        </p>

        {draw && phase !== 'shuffling' && (
          <>
            {draw.q && <p className="question">{S.yourQuestion(draw.q)}</p>}
            <div className={`spread n${draw.cards.length}${phase === 'dealing' ? ' dealing' : ''}`}>
              {draw.cards.map((d, i) => (
                <div className="deal" key={`${d.card.n}-${i}`} style={{ '--d': `${i * DEAL_STAGGER}ms` } as React.CSSProperties}>
                  <TarotCard d={d} open={open[i]} position={pos[i][L]}
                    onReveal={() => phase === 'dealt' && !open[i] && reveal([i])} />
                </div>
              ))}
            </div>
            {phase === 'dealt' && !allOpen && draw.cards.length > 1 && (
              <div className="tarot-actions">
                <IonButton fill="outline" size="small"
                  onClick={() => reveal(draw.cards.map((_, i) => i).filter((i) => !open[i]))}>{S.revealAll}</IonButton>
              </div>
            )}
          </>
        )}
      </div>

      {draw && (
        <TarotReading cards={draw.cards} shown={shown} spread={draw.spread} topic={draw.topic} signId={signId} />
      )}
    </Page>
  );
};

export default TarotPage;
