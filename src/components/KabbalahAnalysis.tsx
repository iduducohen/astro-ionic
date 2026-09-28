import React, { useState } from 'react';
import { SEPHIROTH, getSephiraById, calculateNumerology, PLANETARY_SEPHIROTH } from '../core/kabbalah';
import { useLang } from '../lang';
import Modal from './Modal';

interface Props {
  birthDate?: string;
  planets?: Record<string, string>; // planet name -> house/sign
}

/**
 * KabbalahAnalysis - ניתוח קבלי מעמוק של תאריך לידה וכוכבים
 */
const KabbalahAnalysis: React.FC<Props> = ({ birthDate = '1990-01-01', planets = {} }) => {
  const { lang } = useLang();
  const numerology = birthDate ? calculateNumerology(birthDate) : null;

  // Info modals
  const [showNumerologyInfo, setShowNumerologyInfo] = useState(false);
  const [showTreeInfo, setShowTreeInfo] = useState(false);
  const [showPlanetaryInfo, setShowPlanetaryInfo] = useState(false);

  return (
    <div className="kabbalah-analysis">
      <section className="ka-intro">
        <div className="ka-intro-content">
          <h2>🔯 {lang === 'he' ? 'ניתוח קבלי עמוק' : 'Deep Kabbalah Analysis'}</h2>
          <p>
            {lang === 'he'
              ? 'הבנה מיסטית של עץ החיים ותפילת הנשמה שלך דרך עולמות ספירות וכוכבים'
              : 'Mystical understanding of the Tree of Life and your soul\'s journey through Sephiroth and worlds'}
          </p>
        </div>
      </section>

      {numerology && (
        <section className="ka-numerology">
          <div className="ka-section-header">
            <h3>🔢 {lang === 'he' ? 'נומרולוגיה קבלית' : 'Kabbalistic Numerology'}</h3>
            <button className="ka-info-btn" onClick={() => setShowNumerologyInfo(true)} title={lang === 'he' ? 'מידע נוסף' : 'More info'}>
              ℹ️
            </button>
          </div>
          <p className="ka-section-desc">
            {lang === 'he'
              ? '🔍 מספרי הלידה שלך מחשפים את דרך החיים, הגורל, נקיות הנשמה והאישיות הרוחנית שלך'
              : '🔍 Your birth numbers reveal your life path, destiny, soul essence, and spiritual personality'}
          </p>
          <div className="ka-numbers">
            <div className="ka-number-card">
              <div className="kan-label">{lang === 'he' ? 'דרך החיים' : 'Life Path'}</div>
              <div className="kan-number">{numerology.lifePathNumber}</div>
            </div>
            <div className="ka-number-card">
              <div className="kan-label">{lang === 'he' ? 'גורל' : 'Destiny'}</div>
              <div className="kan-number">{numerology.destinyNumber}</div>
            </div>
            <div className="ka-number-card">
              <div className="kan-label">{lang === 'he' ? 'נשמה' : 'Soul Urge'}</div>
              <div className="kan-number">{numerology.soulUrgeNumber}</div>
            </div>
            <div className="ka-number-card">
              <div className="kan-label">{lang === 'he' ? 'אישיות' : 'Personality'}</div>
              <div className="kan-number">{numerology.personalityNumber}</div>
            </div>
          </div>
        </section>
      )}

      <section className="ka-tree">
        <div className="ka-section-header">
          <h3>🌳 {lang === 'he' ? 'עץ החיים' : 'The Tree of Life'}</h3>
          <button className="ka-info-btn" onClick={() => setShowTreeInfo(true)} title={lang === 'he' ? 'מידע נוסף' : 'More info'}>
            ℹ️
          </button>
        </div>
        <p className="ka-section-desc">
          {lang === 'he'
            ? '📊 10 ספירות המייצגות שלבים בהתפתחות הרוחנית, המחוברות בדרכים של משמעות מיסטית'
            : '📊 10 Sephiroth representing spiritual development stages, connected by mystical paths'}
        </p>
        <div className="ka-sephiroth-grid">
          {SEPHIROTH.map((sephira) => (
            <div key={sephira.id} className="ka-sephira" title={sephira.name.en}>
              <div className="kas-number">{sephira.number}</div>
              <div className="kas-name">{sephira.name[lang]}</div>
              <div className="kas-meaning">{sephira.meaning[lang]}</div>
              {sephira.planets.length > 0 && (
                <div className="kas-planets">{sephira.planets.join(', ')}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="ka-planetary">
        <div className="ka-section-header">
          <h3>⭐ {lang === 'he' ? 'התכתבויות כוכביות' : 'Planetary Correspondences'}</h3>
          <button className="ka-info-btn" onClick={() => setShowPlanetaryInfo(true)} title={lang === 'he' ? 'מידע נוסף' : 'More info'}>
            ℹ️
          </button>
        </div>
        <p className="ka-section-desc">
          {lang === 'he'
            ? '🪐 כל כוכב משודך לספירה בעץ החיים, ומגדיר את השפעתו על קביעות אישיותך'
            : '🪐 Each planet corresponds to a Sephira, influencing your life and personality'}
        </p>
        <div className="ka-planets-list">
          {Object.entries(planets).map(([planet, position]) => {
            const sephiraId = PLANETARY_SEPHIROTH[planet];
            const sephira = getSephiraById(sephiraId);
            return (
              <div key={planet} className="ka-planet-item">
                <div className="kapi-planet">
                  <span className="kapi-name">{planet}</span>
                  <span className="kapi-position">{position}</span>
                </div>
                {sephira && (
                  <div className="kapi-sephira">
                    <span className="kapi-sephira-name">{sephira.name[lang]}</span>
                    <span className="kapi-sephira-meaning">{sephira.meaning[lang]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="ka-interpretation">
        <h3>💎 {lang === 'he' ? 'פירוש קבלי' : 'Kabbalistic Interpretation'}</h3>
        <div className="ka-text">
          <p>
            {lang === 'he'
              ? `דרך החיים שלך מספר ${numerology?.lifePathNumber} מקשרת אתך לספירה מסוימת בעץ החיים. זה מייצג את המסע הרוחני שלך דרך ממדים שונים של קיום.`
              : `Your life path number ${numerology?.lifePathNumber} connects you to a specific Sephira on the Tree of Life. This represents your spiritual journey through different dimensions of existence.`}
          </p>
        </div>
      </section>

      {/* Numerology Info Modal */}
      <Modal
        isOpen={showNumerologyInfo}
        title={lang === 'he' ? '🔢 מידע על נומרולוגיה קבלית' : '🔢 About Kabbalistic Numerology'}
        onClose={() => setShowNumerologyInfo(false)}
      >
        <div className="ka-modal-content">
          <h4>{lang === 'he' ? 'דרך החיים (Life Path)' : 'Life Path Number'}</h4>
          <p>
            {lang === 'he'
              ? 'מחושב מסכום כל ספרות תאריך הלידה. זה מייצג את דרך הקודש שלך בחיים - המסע הרוחני והאתגרים שתפגוש.'
              : 'Calculated from the sum of your birth date digits. It represents your spiritual path and life mission - the journey you are meant to take.'}
          </p>

          <h4>{lang === 'he' ? 'גורל (Destiny)' : 'Destiny Number'}</h4>
          <p>
            {lang === 'he'
              ? 'מייצג את יעדך הגדול בחיים, את מה שאתה אמור להשיג או לתרום לעולם. זה קשור לתכלית הנשמה שלך.'
              : 'Represents your greater purpose in life and your ultimate goals. It reveals what you are meant to achieve and contribute to the world.'}
          </p>

          <h4>{lang === 'he' ? 'נקיות הנשמה (Soul Urge)' : 'Soul Urge Number'}</h4>
          <p>
            {lang === 'he'
              ? 'חושף את ההנעות הפנימיות שלך, מה שאתה באמת רוצה בלב. זה הרצון הגלום של הנשמה שלך.'
              : 'Reveals your inner motivations and what your soul truly desires. It shows your deepest values and aspirations.'}
          </p>

          <h4>{lang === 'he' ? 'אישיות (Personality)' : 'Personality Number'}</h4>
          <p>
            {lang === 'he'
              ? 'חושף כיצד אתה מופיע לעולם, את הדימוי הציבורי שלך. זה הדרך שבה אחרים רואים אותך.'
              : 'Shows how you appear to the world and how others perceive you. It represents your external personality.'}
          </p>
        </div>
      </Modal>

      {/* Tree of Life Info Modal */}
      <Modal
        isOpen={showTreeInfo}
        title={lang === 'he' ? '🌳 מידע על עץ החיים' : '🌳 About the Tree of Life'}
        onClose={() => setShowTreeInfo(false)}
      >
        <div className="ka-modal-content">
          <h4>{lang === 'he' ? '10 הספירות' : 'The 10 Sephiroth'}</h4>
          <p>
            {lang === 'he'
              ? 'עץ החיים מורכב מ-10 ספירות המייצגות שלבי היצירה והתפתחות רוחנית. כל ספירה היא מרכז כוח וחוכמה מסוג מסוים.'
              : 'The Tree of Life contains 10 Sephiroth representing stages of creation and spiritual evolution. Each is a center of power and specific wisdom.'}
          </p>

          <h4>{lang === 'he' ? '22 הנתיבות' : 'The 22 Paths'}</h4>
          <p>
            {lang === 'he'
              ? 'הנתיבות המחברות את הספירות ייצוג את הקשרים בין ההיבטים השונים של קיום. הם נחבתו לקלפי הטארוט.'
              : 'The paths connecting the Sephiroth represent relationships between different aspects of existence. They correspond to the Tarot Major Arcana.'}
          </p>

          <h4>{lang === 'he' ? 'ארבעת העולמות' : 'The Four Worlds'}</h4>
          <p>
            {lang === 'he'
              ? 'כל ספירה קיימת בארבעת העולמות: אצילות (רוח), בריאה (קוסמי), יצירה (קוסמי-אתרי), עשיה (פיזי). זה הדרגתיות של התבטאות.'
              : 'Each Sephira exists in Four Worlds: Atziluth (spirit), Briah (archetypal), Yetzirah (astral), Assiah (physical). These represent levels of manifestation.'}
          </p>
        </div>
      </Modal>

      {/* Planetary Info Modal */}
      <Modal
        isOpen={showPlanetaryInfo}
        title={lang === 'he' ? '⭐ מידע על התכתבויות כוכביות' : '⭐ About Planetary Correspondences'}
        onClose={() => setShowPlanetaryInfo(false)}
      >
        <div className="ka-modal-content">
          <h4>{lang === 'he' ? 'כוכבים וספירות' : 'Planets and Sephiroth'}</h4>
          <p>
            {lang === 'he'
              ? 'בקבלה, כל כוכב לוויין משודך לספירה מסוימת בעץ החיים. זה מגדיר את התכונות וההשפעות של אותו כוכב.'
              : 'In Kabbalah, each planet corresponds to a specific Sephira. This defines the qualities and influences of that planet on human consciousness.'}
          </p>

          <h4>{lang === 'he' ? 'הספירות הכוכביות' : 'The Planetary Sephiroth'}</h4>
          <p>
            {lang === 'he'
              ? 'שמונה ספירות קשורות לכוכבים (משה עד כוכב). זה מראה כיצד כוחות קוסמיים משפיעים על אישיותנו ודינמיקת החיים שלנו.'
              : 'Eight Sephiroth correspond to planets, showing how cosmic forces influence our personalities and life dynamics.'}
          </p>

          <h4>{lang === 'he' ? 'השימוש בעולם המודרני' : 'Modern Magical Use'}</h4>
          <p>
            {lang === 'he'
              ? 'המדיטציה על הכוכבים והספירות שלהם עוזרת לנו ליישר ולשדרג את אנרגיות אלו בתוך עצמנו. זוהי דרך לקבל את כוחותיהם.'
              : 'Meditating on planetary Sephiroth helps align and activate these cosmic energies within us. This is a way to consciously work with planetary forces.'}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default KabbalahAnalysis;
