import React, { useState } from 'react';
import { getSephiraById, SEPHIROTH } from '../core/kabbalah';
import { useLang } from '../lang';
import Modal from './Modal';

interface Props {
  sephiraId: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SephiraModal - הסבר מפורט של כל ספירה בעץ החיים
 */
const SephiraModal: React.FC<Props> = ({ sephiraId, isOpen, onClose }) => {
  const { lang } = useLang();
  const sephira = getSephiraById(sephiraId);

  if (!sephira) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={sephira.name[lang]} size="large">
      <div className="sephira-modal-content">
        {/* Header Info */}
        <section className="smc-header">
          <div className="smch-grid">
            <div className="smch-item">
              <span className="smch-label">{lang === 'he' ? 'מספר' : 'Number'}</span>
              <span className="smch-value">{sephira.number}</span>
            </div>
            <div className="smch-item">
              <span className="smch-label">{lang === 'he' ? 'כוכב' : 'Planet'}</span>
              <span className="smch-value">{sephira.planets.join(', ')}</span>
            </div>
            <div className="smch-item">
              <span className="smch-label">{lang === 'he' ? 'אות עברית' : 'Hebrew Letter'}</span>
              <span className="smch-value">{sephira.hebrewLetter}</span>
            </div>
            <div className="smch-item">
              <span className="smch-label">{lang === 'he' ? 'עולם' : 'World'}</span>
              <span className="smch-value">{sephira.world}</span>
            </div>
          </div>
        </section>

        {/* Divine Info */}
        <section className="smc-section">
          <h3>{lang === 'he' ? 'נתונים אלוהיים' : 'Divine Information'}</h3>
          <div className="smcs-grid">
            <div className="smcs-item">
              <strong>{lang === 'he' ? 'שם אלוהי' : 'Divine Name'}</strong>
              <p>{sephira.divineName}</p>
            </div>
            <div className="smcs-item">
              <strong>{lang === 'he' ? 'ארכנג\'ל' : 'Archangel'}</strong>
              <p>{sephira.archangel}</p>
            </div>
            <div className="smcs-item">
              <strong>{lang === 'he' ? 'צבע' : 'Color'}</strong>
              <p>{sephira.color}</p>
            </div>
          </div>
        </section>

        {/* Description */}
        <section className="smc-section">
          <h3>{lang === 'he' ? 'הגדרה וקונצפט' : 'Definition & Concept'}</h3>
          <p className="smc-description">{sephira.description[lang]}</p>
        </section>

        {/* Virtue */}
        <section className="smc-section smc-virtue">
          <h3>{lang === 'he' ? '✨ מעלה (טוב)' : '✨ Virtue (Good)'}</h3>
          <p className="smc-virtue-text">{sephira.virtue[lang]}</p>
          <p className="smc-meaning">
            {lang === 'he'
              ? 'זו התכונה שכדי לפתח ולהשיג בספירה זו'
              : 'This is the quality to develop and achieve in this sphere'}
          </p>
        </section>

        {/* Vice */}
        <section className="smc-section smc-vice">
          <h3>{lang === 'he' ? '⚠️ רעה (גרוע)' : '⚠️ Vice (Shadow)'}</h3>
          <p className="smc-vice-text">{sephira.vice[lang]}</p>
          <p className="smc-meaning">
            {lang === 'he'
              ? 'זו התכונה השלילית שכדי להתגבר עליה'
              : 'This is the shadow aspect to transcend'}
          </p>
        </section>

        {/* Meaning */}
        <section className="smc-section">
          <h3>{lang === 'he' ? 'משמעות בחיים' : 'Meaning in Life'}</h3>
          <p className="smc-life-meaning">
            {lang === 'he'
              ? `בעצם החיים שלך, ${sephira.name.he} מייצגת ${sephira.meaning.he}. כאשר אתה משתקם עם אנרגיה זו, אתה מעודד את הגדילות הרוחנית בתחום זה.`
              : `In your life, ${sephira.name.en} represents ${sephira.meaning.en}. When you align with this energy, you cultivate spiritual growth in this area.`}
          </p>
        </section>

        {/* Meditation Guide */}
        <section className="smc-section smc-meditation">
          <h3>{lang === 'he' ? '🧘 הנחיית מדיטציה' : '🧘 Meditation Guide'}</h3>
          <div className="smc-meditation-steps">
            <div className="sms-step">
              <span className="sms-num">1</span>
              <p>
                {lang === 'he'
                  ? 'התיישב בנוח וסגור את עיניך'
                  : 'Sit comfortably and close your eyes'}
              </p>
            </div>
            <div className="sms-step">
              <span className="sms-num">2</span>
              <p>
                {lang === 'he'
                  ? `דמיין את הצבע ${sephira.color} הזוהר בלבך`
                  : `Visualize the color ${sephira.color} glowing in your heart`}
              </p>
            </div>
            <div className="sms-step">
              <span className="sms-num">3</span>
              <p>
                {lang === 'he'
                  ? `קרא בשקט את השם האלוהי: ${sephira.divineName}`
                  : `Silently intone the Divine Name: ${sephira.divineName}`}
              </p>
            </div>
            <div className="sms-step">
              <span className="sms-num">4</span>
              <p>
                {lang === 'he'
                  ? `רקום עם איכויות זו: ${sephira.virtue.he}`
                  : `Connect with this virtue: ${sephira.virtue.en}`}
              </p>
            </div>
          </div>
        </section>

        {/* Related Sephiroth */}
        <section className="smc-section">
          <h3>{lang === 'he' ? 'ספירות קשורות' : 'Related Sephiroth'}</h3>
          <p className="smc-related">
            {lang === 'he'
              ? 'ספירה זו קשורה לספירות אחרות דרך הנתיבים של עץ החיים, שכל אחד מהם מוביל למסע רוחני עמוק יותר.'
              : 'This Sephiroth connects to others through the Paths of the Tree of Life, each leading to deeper spiritual journeys.'}
          </p>
        </section>
      </div>
    </Modal>
  );
};

export default SephiraModal;
