import React from 'react';
import {
  SEPHIROTH,
  FOUR_WORLDS,
  getSephirothByWorld,
  interpretChartKabbalistically,
  getSephiraById
} from '../core/kabbalah';
import { useLang } from '../lang';

interface Props {
  sunSign?: string;
  moonSign?: string;
  ascendantSign?: string;
}

const AdvancedKabbalahAnalysis: React.FC<Props> = ({
  sunSign = 'Leo',
  moonSign = 'Cancer',
  ascendantSign = 'Libra'
}) => {
  const { lang } = useLang();
  const kabbalistic = interpretChartKabbalistically(sunSign, moonSign, ascendantSign);

  return (
    <div className="advanced-kabbalah">
      <section className="ak-intro">
        <h2>🔯 {lang === 'he' ? 'ניתוח קבלי מתקדם' : 'Advanced Kabbalistic Analysis'}</h2>
        <p>
          {lang === 'he'
            ? 'זהו פרשנות עמוקה של דרכך הרוחנית דרך עץ החיים ופילוסופיית קבלה'
            : 'A deep interpretation of your spiritual path through the Tree of Life'}
        </p>
      </section>

      <section className="ak-pillars">
        <h3>{lang === 'he' ? 'שלוש העמודים' : 'The Three Pillars'}</h3>
        <div className="akp-grid">
          <div className="akp-pillar akp-severity">
            <h4>{lang === 'he' ? 'עמוד הקשיות' : 'Pillar of Severity'}</h4>
            <p className="akp-planet">Gevurah | Mars</p>
            <p className="akp-meaning">
              {lang === 'he'
                ? 'כוח, משמעת, קשיות'
                : 'Strength, discipline, severity'}
            </p>
          </div>

          <div className="akp-pillar akp-middle">
            <h4>{lang === 'he' ? 'עמוד האמצע' : 'Middle Pillar'}</h4>
            <p className="akp-planet">Equilibrium</p>
            <p className="akp-meaning">
              {lang === 'he'
                ? 'דרך מתמדת של התודעה'
                : 'The path of consciousness'}
            </p>
          </div>

          <div className="akp-pillar akp-mercy">
            <h4>{lang === 'he' ? 'עמוד החסד' : 'Pillar of Mercy'}</h4>
            <p className="akp-planet">Chesed | Jupiter</p>
            <p className="akp-meaning">
              {lang === 'he'
                ? 'חסד, הרחבה, מילוי'
                : 'Mercy, expansion, abundance'}
            </p>
          </div>
        </div>
      </section>

      <section className="ak-worlds">
        <h3>{lang === 'he' ? 'ארבעת העולמות' : 'Four Worlds'}</h3>
        <div className="akw-grid">
          {FOUR_WORLDS.map((world) => (
            <div key={world.id} className="akw-card">
              <div className="akwc-name">{world.name[lang]}</div>
              <div className="akwc-meaning">{world.meaning[lang]}</div>
              <p className="akwc-description">{world.description[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ak-journey">
        <h3>{lang === 'he' ? 'דרך כוכבך' : 'Your Sephirothic Journey'}</h3>
        <div className="akj-content">
          <div className="akj-card">
            <div className="akj-label">{lang === 'he' ? 'יסוד' : 'Foundation'}</div>
            <div className="akj-sephira">{ascendantSign}</div>
            <p className="akj-description">
              {lang === 'he'
                ? 'הנקודה ההתחלתית שלך'
                : 'Your starting point'}
            </p>
          </div>

          <div className="akj-arrow">→</div>

          <div className="akj-card">
            <div className="akj-label">{lang === 'he' ? 'גורל' : 'Destiny'}</div>
            <div className="akj-sephira">{moonSign}</div>
            <p className="akj-description">
              {lang === 'he'
                ? 'הדרכים הנסתרות שלך'
                : 'Your inner depths'}
            </p>
          </div>

          <div className="akj-arrow">→</div>

          <div className="akj-card">
            <div className="akj-label">{lang === 'he' ? 'עצמי אמיתי' : 'True Self'}</div>
            <div className="akj-sephira">{sunSign}</div>
            <p className="akj-description">
              {lang === 'he'
                ? 'אתך האמיתית'
                : 'Your true essence'}
            </p>
          </div>
        </div>
      </section>

      <section className="ak-insights">
        <h3>{lang === 'he' ? 'תובנות רוחניות' : 'Spiritual Insights'}</h3>
        <div className="aki-cards">
          <div className="akic">
            <h4>{lang === 'he' ? 'המסע שלך' : 'Your Journey'}</h4>
            <p>
              {lang === 'he'
                ? `במסע הקבלי שלך, אתה מתחיל ב${ascendantSign} בעולם הפיזי, עולה דרך ${moonSign}, וזוקף אל ${sunSign}.`
                : `You begin as ${ascendantSign}, ascend through ${moonSign}, and reach ${sunSign}.`}
            </p>
          </div>

          <div className="akic">
            <h4>{lang === 'he' ? 'הנתיב החביא' : 'The Hidden Path'}</h4>
            <p>
              {lang === 'he'
                ? 'עץ החיים הוא מפה לרוח. כל ספירה מייצגת שלב בהתפתחות הרוחנית.'
                : 'The Tree of Life is a map of consciousness. Each Sephiroth represents a spiritual level.'}
            </p>
          </div>

          <div className="akic">
            <h4>{lang === 'he' ? 'ההדלקה הפנימית' : 'The Inner Light'}</h4>
            <p>
              {lang === 'he'
                ? 'על ידי התאמה עם הספירות שלך, אתה יכול לעורר את האור הפנימי שלך.'
                : 'By aligning with your Sephiroth, you awaken your inner light.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvancedKabbalahAnalysis;
