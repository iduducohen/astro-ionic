export type DeckPhase = 'idle' | 'shuffling' | 'dealing' | 'dealt';

const N = 14; // קלפים שמצוירים בערימה (מספיק כדי שייראה כמו חבילה)

/**
 * חבילת הקלפים על השולחן. במצב shuffling שתי חצאי החבילה נפרדים לצדדים
 * ומשתלבים חזרה (ריפל), פעמיים. במצב dealing הקלף העליון מחליק החוצה.
 */
const TarotDeck: React.FC<{ phase: DeckPhase; left: number; label: string }> = ({ phase, left, label }) => (
  <div className={`deck ${phase}`} role="img" aria-label={label}>
    {Array.from({ length: N }, (_, i) => (
      <span key={i} className="dcard card-back" style={{ '--i': i } as React.CSSProperties} aria-hidden="true">
        {i === N - 1 && '✦'}
      </span>
    ))}
    <span className="deck-count" aria-hidden="true">{left}</span>
  </div>
);

export default TarotDeck;
