import React from 'react';
import { calculateNumerology } from '../core/kabbalah';
import { useLang } from '../lang';

interface Props {
  birthDate: string; // YYYY-MM-DD format
}

/**
 * NumerologyAnalysis - ניתוח נומרולוגי מעמוק של תאריך הלידה
 */
const NumerologyAnalysis: React.FC<Props> = ({ birthDate }) => {
  const { lang } = useLang();
  const numerology = calculateNumerology(birthDate);

  const numberMeanings: Record<number, { he: string; en: string; description: { he: string; en: string } }> = {
    1: {
      he: 'המנהיג',
      en: 'The Leader',
      description: {
        he: 'אתה מולד להיות מנהיג טבעי, עם אנרגיה, דינמיקה וראייה ברורה של הדרך קדימה.',
        en: 'You are born to be a natural leader with energy, dynamism and clear vision.'
      }
    },
    2: {
      he: 'התיווך',
      en: 'The Mediator',
      description: {
        he: 'אתה אדם רגיש, אמפתי ויוצא דופן בתקשורת. אתה מחפש שלום והרמוניה.',
        en: 'You are sensitive, empathetic and excellent communicator. You seek peace and harmony.'
      }
    },
    3: {
      he: 'היוצר',
      en: 'The Creator',
      description: {
        he: 'יצירתיות זורמת בדמוך. אתה אמן בנשמה, עם כישרון לבטא עצמך ולהשראות אחרים.',
        en: 'Creativity flows through you. You are an artist at soul with talent for self-expression.'
      }
    },
    4: {
      he: 'הבנאי',
      en: 'The Builder',
      description: {
        he: 'אתה ממוצע וחגור לעשות דברים בדרך הנכונה. בעל יציבות וקביעות שיא.',
        en: 'You are practical and committed to doing things right. Stability and consistency are your hallmarks.'
      }
    },
    5: {
      he: 'הנסיין',
      en: 'The Adventurer',
      description: {
        he: 'אתה אוהב הרפתקאות, שינוי וחירות. עם כישרון להסתגל וליצירתיות טבעית.',
        en: 'You love adventure, change and freedom. Natural adaptability and creativity are your gifts.'
      }
    },
    6: {
      he: 'הטיפול',
      en: 'The Caregiver',
      description: {
        he: 'אתה אנשי-קשר מהטבע, אוהב עזרה וטיפול. אתה מחובר לאחריות ולחמלה.',
        en: 'You are naturally caring and love helping others. You are connected to responsibility and compassion.'
      }
    },
    7: {
      he: 'המחפש',
      en: 'The Seeker',
      description: {
        he: 'אתה מסתורי וחוקר. אתה מחפש את האמת העמוקה ומעוניין בספיריטואליות ובחוכמה.',
        en: 'You are mysterious and analytical. You seek deep truth and are interested in spirituality.'
      }
    },
    8: {
      he: 'הגזבר',
      en: 'The Executive',
      description: {
        he: 'אתה בעל כוח וברכה בעניינים כספיים. אתה יודע איך להשיג הצלחה וסמכות.',
        en: 'You have power and aptitude in financial matters. You know how to achieve success and authority.'
      }
    },
    9: {
      he: 'הנתרם',
      en: 'The Humanitarian',
      description: {
        he: 'אתה אדם חכם וחביב, עם הבנה רחבה של העולם. אתה מוקדש לשירות אחרים.',
        en: 'You are wise and compassionate, with a broad understanding of the world. Dedicated to serving others.'
      }
    }
  };

  const getMeaning = (num: number) => numberMeanings[num % 9 === 0 ? 9 : num % 9];

  const lifePathMeaning = getMeaning(numerology.lifePathNumber);
  const destinyMeaning = getMeaning(numerology.destinyNumber);
  const soulMeaning = getMeaning(numerology.soulUrgeNumber);
  const personalityMeaning = getMeaning(numerology.personalityNumber);

  return (
    <div className="numerology-analysis">
      <section className="na-header">
        <h2>{lang === 'he' ? 'ניתוח נומרולוגי מעמוק' : 'Deep Numerological Analysis'}</h2>
        <p>{lang === 'he' ? 'גילוי את הנתיב של הנומרים וחוקים היקומיים' : 'Discover your numerical path and universal laws'}</p>
      </section>

      <section className="na-grid">
        {/* Life Path Number */}
        <div className="na-card na-life-path">
          <div className="nac-number">{numerology.lifePathNumber}</div>
          <div className="nac-label">{lang === 'he' ? 'דרך החיים' : 'Life Path'}</div>
          <div className="nac-meaning">{lifePathMeaning.he}</div>
          <p className="nac-description">{lifePathMeaning.description[lang]}</p>
        </div>

        {/* Destiny Number */}
        <div className="na-card na-destiny">
          <div className="nac-number">{numerology.destinyNumber}</div>
          <div className="nac-label">{lang === 'he' ? 'גורל' : 'Destiny'}</div>
          <div className="nac-meaning">{destinyMeaning.he}</div>
          <p className="nac-description">{destinyMeaning.description[lang]}</p>
        </div>

        {/* Soul Urge Number */}
        <div className="na-card na-soul">
          <div className="nac-number">{numerology.soulUrgeNumber}</div>
          <div className="nac-label">{lang === 'he' ? 'דחף הנשמה' : 'Soul Urge'}</div>
          <div className="nac-meaning">{soulMeaning.he}</div>
          <p className="nac-description">{soulMeaning.description[lang]}</p>
        </div>

        {/* Personality Number */}
        <div className="na-card na-personality">
          <div className="nac-number">{numerology.personalityNumber}</div>
          <div className="nac-label">{lang === 'he' ? 'אישיות' : 'Personality'}</div>
          <div className="nac-meaning">{personalityMeaning.he}</div>
          <p className="nac-description">{personalityMeaning.description[lang]}</p>
        </div>
      </section>

      <section className="na-interpretation">
        <h3>{lang === 'he' ? 'פירוש מיוחד' : 'Special Interpretation'}</h3>
        <div className="na-text">
          {numerology.lifePathNumber === numerology.destinyNumber ? (
            <p>
              {lang === 'he'
                ? `דרך החיים שלך ודרך הגורל שלך תואמים בנקודה זו. זה אומר שאתה בדרך הנכונה לביצוע חלקך בתכנית הקוסמית.`
                : `Your life path and destiny align at this point. This means you are on the right track to fulfill your cosmic purpose.`}
            </p>
          ) : (
            <p>
              {lang === 'he'
                ? `דרך החיים שלך (${numerology.lifePathNumber}) נמצאת בטנסיה יצירתית עם הגורל שלך (${numerology.destinyNumber}). זה מציע תהליך של אבולוציה וגדילה.`
                : `Your life path (${numerology.lifePathNumber}) is in creative tension with your destiny (${numerology.destinyNumber}). This suggests a process of evolution and growth.`}
            </p>
          )}
        </div>
      </section>

      <section className="na-advanced">
        <h3>{lang === 'he' ? 'נתונים מתקדמים' : 'Advanced Data'}</h3>
        <div className="naa-grid">
          <div className="naa-item">
            <span className="naa-label">{lang === 'he' ? 'תאריך לידה' : 'Birth Date'}</span>
            <span className="naa-value">{birthDate}</span>
          </div>
          <div className="naa-item">
            <span className="naa-label">{lang === 'he' ? 'סכום דרך החיים' : 'Life Path Sum'}</span>
            <span className="naa-value">{numerology.lifePathNumber}</span>
          </div>
          <div className="naa-item">
            <span className="naa-label">{lang === 'he' ? 'מזל רוחני' : 'Spiritual Number'}</span>
            <span className="naa-value">{numerology.soulUrgeNumber}</span>
          </div>
          <div className="naa-item">
            <span className="naa-label">{lang === 'he' ? 'משקל אישי' : 'Personal Weight'}</span>
            <span className="naa-value">{numerology.personalityNumber}</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NumerologyAnalysis;
