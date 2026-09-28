import React from 'react';
import { getTarotCard } from '../core/tarot-data';
import { useLang } from '../lang';
import Modal from './Modal';

interface Props {
  cardId: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * TarotCardModal - הסבר מפורט של כל קלף טאָרוט
 */
const TarotCardModal: React.FC<Props> = ({ cardId, isOpen, onClose }) => {
  const { lang } = useLang();
  const card = getTarotCard(cardId);

  if (!card) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={card.name[lang]} size="large">
      <div className="tarot-modal-content">
        {/* Card Header */}
        <section className="tmc-header">
          <div className="tmch-grid">
            <div className="tmch-item">
              <span className="tmch-label">{lang === 'he' ? 'מספר' : 'Number'}</span>
              <span className="tmch-value">{card.number}</span>
            </div>
            <div className="tmch-item">
              <span className="tmch-label">{lang === 'he' ? 'ארקנה' : 'Arcana'}</span>
              <span className="tmch-value">
                {card.arcana === 'major'
                  ? lang === 'he' ? 'ממלך גדול' : 'Major'
                  : lang === 'he' ? 'ממלך קטן' : 'Minor'}
              </span>
            </div>
            <div className="tmch-item">
              <span className="tmch-label">{lang === 'he' ? 'נומרולוגיה' : 'Numerology'}</span>
              <span className="tmch-value">{card.numerology}</span>
            </div>
          </div>
        </section>

        {/* Primary Meaning */}
        <section className="tmc-section tmc-upright">
          <h3>📖 {lang === 'he' ? 'משמעות ישירה' : 'Upright Meaning'}</h3>
          <p className="tmc-meaning-text">{card.meaning[lang]}</p>
        </section>

        {/* Reversed Meaning */}
        <section className="tmc-section tmc-reversed">
          <h3>🔄 {lang === 'he' ? 'משמעות הפוכה' : 'Reversed Meaning'}</h3>
          <p className="tmc-meaning-text">{card.reversedMeaning[lang]}</p>
        </section>

        {/* Kabbalistic Correspondences */}
        <section className="tmc-section">
          <h3>🔯 {lang === 'he' ? 'התכתבויות קבליות' : 'Kabbalistic Correspondences'}</h3>
          <div className="tmc-corr-grid">
            {card.kabbalah.sephira && (
              <div className="tmc-corr-item">
                <span className="tcorr-label">{lang === 'he' ? 'ספירה' : 'Sephiroth'}</span>
                <span className="tcorr-value">{card.kabbalah.sephira}</span>
              </div>
            )}
            {card.kabbalah.path && (
              <div className="tmc-corr-item">
                <span className="tcorr-label">{lang === 'he' ? 'נתיב' : 'Path'}</span>
                <span className="tcorr-value">{card.kabbalah.path}</span>
              </div>
            )}
            {card.kabbalah.hebrewLetter && (
              <div className="tmc-corr-item">
                <span className="tcorr-label">{lang === 'he' ? 'אות עברית' : 'Hebrew Letter'}</span>
                <span className="tcorr-value">{card.kabbalah.hebrewLetter}</span>
              </div>
            )}
          </div>
        </section>

        {/* Astrological Associations */}
        <section className="tmc-section">
          <h3>♈ {lang === 'he' ? 'התכתבויות אסטרולוגיות' : 'Astrological Associations'}</h3>
          <div className="tmc-astro-grid">
            {card.astrology.planet && (
              <div className="tmc-astro-item">
                <span className="tastro-label">{lang === 'he' ? 'כוכב' : 'Planet'}</span>
                <span className="tastro-value">{card.astrology.planet}</span>
              </div>
            )}
            {card.astrology.sign && (
              <div className="tmc-astro-item">
                <span className="tastro-label">{lang === 'he' ? 'מזל' : 'Sign'}</span>
                <span className="tastro-value">{card.astrology.sign}</span>
              </div>
            )}
            {card.astrology.element && (
              <div className="tmc-astro-item">
                <span className="tastro-label">{lang === 'he' ? 'יסוד' : 'Element'}</span>
                <span className="tastro-value">{card.astrology.element}</span>
              </div>
            )}
          </div>
        </section>

        {/* Story & Archetype */}
        <section className="tmc-section tmc-story">
          <h3>📚 {lang === 'he' ? 'הסיפור הארכיטיפי' : 'Archetypal Story'}</h3>
          <p className="tmc-story-text">
            {lang === 'he'
              ? `${card.name.he} מייצגת ארכיטיפ עמוק בנשמת האדם. זהו שלב בדרך הרוח שכל בן אדם עוברים בחייהם.`
              : `${card.name.en} represents a deep archetype in the human soul. It is a stage on the spiritual path that everyone traverses.`}
          </p>
        </section>

        {/* Life Lessons */}
        <section className="tmc-section tmc-lessons">
          <h3>💡 {lang === 'he' ? 'שיעורי חיים' : 'Life Lessons'}</h3>
          <div className="tmc-lessons-list">
            <div className="tmcl-item">
              <span className="tmcl-icon">✓</span>
              <p>
                {lang === 'he'
                  ? 'קלף זה מלמד אותנו על קבלת אחריות עבור מעשינו'
                  : 'This card teaches us about accepting responsibility'}
              </p>
            </div>
            <div className="tmcl-item">
              <span className="tmcl-icon">✓</span>
              <p>
                {lang === 'he'
                  ? 'זה מזמין אותנו לבחון את חיינו בעומק'
                  : 'It invites us to examine our lives deeply'}
              </p>
            </div>
            <div className="tmcl-item">
              <span className="tmcl-icon">✓</span>
              <p>
                {lang === 'he'
                  ? 'זה מציע תקווה וסיכוי לשיתוף ושינוי'
                  : 'It offers hope and opportunity for transformation'}
              </p>
            </div>
          </div>
        </section>

        {/* Spread Positions */}
        <section className="tmc-section tmc-spreads">
          <h3>🃏 {lang === 'he' ? 'משמעויות בקריאה' : 'In Readings'}</h3>
          <div className="tmcs-grid">
            <div className="tmcs-item">
              <strong>{lang === 'he' ? 'בעבר' : 'In The Past'}</strong>
              <p>
                {lang === 'he'
                  ? 'כוח זה היה פעיל בעברך'
                  : 'This influence was active in your past'}
              </p>
            </div>
            <div className="tmcs-item">
              <strong>{lang === 'he' ? 'בהווה' : 'In The Present'}</strong>
              <p>
                {lang === 'he'
                  ? 'כוח זה פועל עכשיו בחיים שלך'
                  : 'This influence is active now in your life'}
              </p>
            </div>
            <div className="tmcs-item">
              <strong>{lang === 'he' ? 'בעתיד' : 'In The Future'}</strong>
              <p>
                {lang === 'he'
                  ? 'כוח זה יהיה משפיע על דרכך קדימה'
                  : 'This influence will shape your path ahead'}
              </p>
            </div>
          </div>
        </section>

        {/* Affirmation */}
        <section className="tmc-section tmc-affirmation">
          <h3>✨ {lang === 'he' ? 'אישור' : 'Affirmation'}</h3>
          <p className="tmc-affirmation-text">
            {lang === 'he'
              ? `"אני משתקם עם כוחה של ${card.name.he} בחיים שלי"`
              : `"I align with the power of ${card.name.en} in my life"`}
          </p>
        </section>
      </div>
    </Modal>
  );
};

export default TarotCardModal;
