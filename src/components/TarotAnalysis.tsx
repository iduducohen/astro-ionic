import React from 'react';
import { getTarotCard, TarotCard } from '../core/tarot-data';
import { useLang } from '../lang';

interface Props {
  cardId?: string;
}

/**
 * TarotAnalysis - ניתוח מעמוק של קלף טאָרוט בקבלה ואסטרולוגיה
 */
const TarotAnalysis: React.FC<Props> = ({ cardId = 'the-fool' }) => {
  const { lang } = useLang();
  const card = getTarotCard(cardId);

  if (!card) return <div>Card not found</div>;

  return (
    <div className="tarot-analysis">
      <section className="ta-header">
        <h2 className="ta-name">{card.name[lang]}</h2>
        <div className="ta-number">#{card.number}</div>
        <div className="ta-arcana">{card.arcana === 'major' ? 'Major Arcana' : 'Minor Arcana'}</div>
      </section>

      <section className="ta-meaning">
        <h3>{lang === 'he' ? 'משמעות' : 'Meaning'}</h3>
        <p className="ta-meaning-text">{card.meaning[lang]}</p>
      </section>

      <section className="ta-reversed">
        <h3>{lang === 'he' ? 'משמעות הפוכה' : 'Reversed Meaning'}</h3>
        <p className="ta-reversed-text">{card.reversedMeaning[lang]}</p>
      </section>

      <section className="ta-connections">
        <div className="ta-col">
          <h4>{lang === 'he' ? 'קבלה' : 'Kabbalah'}</h4>
          {card.kabbalah.sephira && <p><strong>{lang === 'he' ? 'ספירה' : 'Sephira'}:</strong> {card.kabbalah.sephira}</p>}
          {card.kabbalah.path && <p><strong>{lang === 'he' ? 'נתיב' : 'Path'}:</strong> {card.kabbalah.path}</p>}
          {card.kabbalah.hebrewLetter && <p><strong>{lang === 'he' ? 'אות עברית' : 'Hebrew Letter'}:</strong> {card.kabbalah.hebrewLetter}</p>}
        </div>

        <div className="ta-col">
          <h4>{lang === 'he' ? 'אסטרולוגיה' : 'Astrology'}</h4>
          {card.astrology.planet && <p><strong>{lang === 'he' ? 'כוכב' : 'Planet'}:</strong> {card.astrology.planet}</p>}
          {card.astrology.sign && <p><strong>{lang === 'he' ? 'מזל' : 'Sign'}:</strong> {card.astrology.sign}</p>}
          {card.astrology.element && <p><strong>{lang === 'he' ? 'יסוד' : 'Element'}:</strong> {card.astrology.element}</p>}
        </div>

        <div className="ta-col">
          <h4>{lang === 'he' ? 'נומרולוגיה' : 'Numerology'}</h4>
          <p><strong>{lang === 'he' ? 'מספר' : 'Number'}:</strong> {card.numerology}</p>
        </div>
      </section>
    </div>
  );
};

export default TarotAnalysis;
