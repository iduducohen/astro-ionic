import type { DrawnCard } from '../core';
import { useLang } from '../lang';

interface Props { d: DrawnCard; open: boolean; position: string; onReveal: () => void }

/** קלף טארוט שמתהפך בלחיצה. גב הקלף זהה לכל החבילה; הפנים מסובבים ב-180° לקלף הפוך. */
const TarotCard: React.FC<Props> = ({ d, open, position, onReveal }) => {
  const { lang: L, S } = useLang();
  const c = d.card;
  return (
    <div className="slot">
      <span className="pos">{position}</span>
      <button
        type="button"
        className={`tcard${open ? ' open' : ''}${d.reversed ? ' rev' : ''}`}
        onClick={onReveal}
        aria-label={open ? c.name[L] : S.cardBack(position)}
        aria-disabled={open}
      >
        <span className="inner">
          <span className="face back" aria-hidden="true">✦</span>
          <span className="face front" aria-hidden="true">
            <span className="art">
              {d.reversed && <span className="rev-badge">{S.reversedTag}</span>}
              <span className="roman">{c.roman}</span>
              <span className="glyph">{c.glyph + '\uFE0E'}</span>
              <span className="cname">{c.name[L]}</span>
            </span>
          </span>
        </span>
      </button>
    </div>
  );
};

export default TarotCard;
