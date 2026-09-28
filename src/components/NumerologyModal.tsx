import React from 'react';
import { useLang } from '../lang';
import Modal from './Modal';

interface Props {
  numberValue: number;
  numberType: 'life-path' | 'destiny' | 'soul-urge' | 'personality';
  isOpen: boolean;
  onClose: () => void;
}

/**
 * NumerologyModal - הסבר מפורט של כל מספר נומרולוגי
 */
const NumerologyModal: React.FC<Props> = ({ numberValue, numberType, isOpen, onClose }) => {
  const { lang } = useLang();
  const reducedNum = numberValue % 9 === 0 ? 9 : numberValue % 9;

  const numberDetails: Record<number, any> = {
    1: {
      name: { he: 'המנהיג', en: 'The Leader' },
      keywords: { he: 'מובילות, עצמאות, חדשנות', en: 'Leadership, Independence, Innovation' },
      description: {
        he: 'מספר 1 מייצג התחלה חדשה, קדימה, ויכולת מובילות. אתה אדם שאוהב לפתוח דרכים חדשות.',
        en: 'Number 1 represents new beginnings, forward momentum, and leadership ability. You are a pioneer.'
      },
      strengths: {
        he: 'חזקים, בעלי דעה, משכנעים, אדיבים',
        en: 'Strong, opinionated, persuasive, determined'
      },
      challenges: {
        he: 'עלול להיות אגואיסטי, שאה יותר מדי, לא שומע אחרים',
        en: 'Can be selfish, stubborn, domineering'
      },
      lifePath: {
        he: 'דרכך היא להיות מנהיג וממציא. חיפוש עצמאות והשגת עצמך.',
        en: 'Your path is to lead and innovate. Seeking independence and self-actualization.'
      }
    },
    2: {
      name: { he: 'התיווך', en: 'The Peacemaker' },
      keywords: { he: 'שיתוף פעולה, אמפתיה, טקט', en: 'Cooperation, Empathy, Diplomacy' },
      description: {
        he: 'מספר 2 מייצג שיתוף פעולה, רגישות, והיכולת להביא הרמוניה. אתה אדם שמחבר אנשים.',
        en: 'Number 2 represents cooperation, sensitivity, and harmony. You are a natural diplomat.'
      },
      strengths: {
        he: 'אמפתי, טקטי, רגישים, תומכים',
        en: 'Empathetic, diplomatic, sensitive, supportive'
      },
      challenges: {
        he: 'עלול להיות תלוי, פחדני, לא בטוח בעצמו',
        en: 'Can be dependent, fearful, insecure'
      },
      lifePath: {
        he: 'דרכך היא להיות מתווך ומייצר שלום. חיפוש שיתוף פעולה ושיווי משקל.',
        en: 'Your path is to promote harmony and balance. Seeking cooperation and unity.'
      }
    },
    3: {
      name: { he: 'היוצר', en: 'The Creator' },
      keywords: { he: 'יצירתיות, ביטוי עצמי, שמחה', en: 'Creativity, Self-Expression, Joy' },
      description: {
        he: 'מספר 3 מייצג יצירתיות, ביטוי, ושמחת חיים. אתה אמן בנשמה.',
        en: 'Number 3 represents creativity, expression, and joy. You are an artist at heart.'
      },
      strengths: {
        he: 'יצירתיים, תקשורתיים, אופטימיים, חברותיים',
        en: 'Creative, communicative, optimistic, social'
      },
      challenges: {
        he: 'עלול להיות פזור, אנוך, לא מתמקד',
        en: 'Can be scattered, superficial, unfocused'
      },
      lifePath: {
        he: 'דרכך היא להוציא את הכישרון היצירתי שלך. חיפוש ביטוי ושמחה.',
        en: 'Your path is to express your creative gifts. Seeking joy and self-expression.'
      }
    },
    4: {
      name: { he: 'הבנאי', en: 'The Builder' },
      keywords: { he: 'יציבות, כישרון מעשי, אחריות', en: 'Stability, Practicality, Responsibility' },
      description: {
        he: 'מספר 4 מייצג יציבות, מעשיות, ובנייה מוצקה. אתה בנאי ממלך.',
        en: 'Number 4 represents stability, practicality, and solid foundation. You are a builder.'
      },
      strengths: {
        he: 'מעשיים, ממולכדים, אחראיים, ישירים',
        en: 'Practical, organized, responsible, grounded'
      },
      challenges: {
        he: 'עלול להיות קשיח, משעמם, לא גמיש',
        en: 'Can be rigid, boring, inflexible'
      },
      lifePath: {
        he: 'דרכך היא לבנות משהו מודד ויציב. חיפוש סדר וביטחון.',
        en: 'Your path is to build something lasting and solid. Seeking security and order.'
      }
    },
    5: {
      name: { he: 'הנסיין', en: 'The Adventurer' },
      keywords: { he: 'שינוי, חופש, נסיון', en: 'Change, Freedom, Adventure' },
      description: {
        he: 'מספר 5 מייצג שינוי, חופש, והרפתקה. אתה אוהב פרט וגילויים.',
        en: 'Number 5 represents change, freedom, and adventure. You love discovery.'
      },
      strengths: {
        he: 'כוח הסתגלות, פיזור, סקרנים, דינמיים',
        en: 'Adaptable, curious, dynamic, versatile'
      },
      challenges: {
        he: 'עלול להיות פזור, חוסר אחריות, בלתי יציב',
        en: 'Can be impulsive, irresponsible, unstable'
      },
      lifePath: {
        he: 'דרכך היא לחקור וללמוד. חיפוש חופש וגוון בחיים.',
        en: 'Your path is to explore and experience. Seeking freedom and variety.'
      }
    },
    6: {
      name: { he: 'הטיפול', en: 'The Caregiver' },
      keywords: { he: 'אחריות, אהבה, שירות', en: 'Responsibility, Love, Service' },
      description: {
        he: 'מספר 6 מייצג אחריות, אהבה, ועזרה. אתה טיפול בטבע.',
        en: 'Number 6 represents responsibility, love, and caring. You are a natural caregiver.'
      },
      strengths: {
        he: 'אוהבים, אחראיים, כנים, מיישבים',
        en: 'Loving, responsible, honest, harmonious'
      },
      challenges: {
        he: 'עלול להיות דוגמה יתר, מדכדך, משתלם יתר',
        en: 'Can be overly responsible, meddling, codependent'
      },
      lifePath: {
        he: 'דרכך היא לטפל ולשרת. חיפוש אהבה וחיבור.',
        en: 'Your path is to care and serve. Seeking love and connection.'
      }
    },
    7: {
      name: { he: 'המחפש', en: 'The Seeker' },
      keywords: { he: 'חוכמה, עצמיות, רוחניות', en: 'Wisdom, Analysis, Spirituality' },
      description: {
        he: 'מספר 7 מייצג חוכמה, ניתוח, ורוחניות. אתה מחפש אמת עמוקה.',
        en: 'Number 7 represents wisdom, analysis, and spirituality. You seek deeper truth.'
      },
      strengths: {
        he: 'חכמים, אנליטיים, אינטואיטיביים, חמקמקים',
        en: 'Wise, analytical, intuitive, spiritual'
      },
      challenges: {
        he: 'עלול להיות מודודי, בדידות, מעטים מדי',
        en: 'Can be withdrawn, isolated, detached'
      },
      lifePath: {
        he: 'דרכך היא לחקור את מסתורי החיים. חיפוש חוכמה ותבונה.',
        en: 'Your path is to uncover life\'s mysteries. Seeking wisdom and understanding.'
      }
    },
    8: {
      name: { he: 'הגזבר', en: 'The Executive' },
      keywords: { he: 'כוח, הצלחה, בקרה', en: 'Power, Success, Authority' },
      description: {
        he: 'מספר 8 מייצג כוח, הצלחה, וסמכות. אתה אדם של הישגים.',
        en: 'Number 8 represents power, success, and authority. You are an achiever.'
      },
      strengths: {
        he: 'רובוסטיים, מוצלחים, אמביציוזיים, חזקים',
        en: 'Powerful, successful, ambitious, authoritative'
      },
      challenges: {
        he: 'עלול להיות חומדני, אימפריאליסטי, כושל',
        en: 'Can be greedy, domineering, ruthless'
      },
      lifePath: {
        he: 'דרכך היא להשיג הצלחה וכוח. חיפוש השפעה וזיהוי.',
        en: 'Your path is to achieve success and power. Seeking influence and recognition.'
      }
    },
    9: {
      name: { he: 'הנתרם', en: 'The Humanitarian' },
      keywords: { he: 'גניבות, השגה, סדר עולם', en: 'Compassion, Completion, Wisdom' },
      description: {
        he: 'מספר 9 מייצג חמלה, השלמה, וגניבות. אתה נתרם לעולם.',
        en: 'Number 9 represents compassion, completion, and wisdom. You are a humanitarian.'
      },
      strengths: {
        he: 'כנופיים, חכמים, נתרמים, אוניברסליים',
        en: 'Compassionate, wise, humanitarian, universal'
      },
      challenges: {
        he: 'עלול להיות מתנוקה יתר, לא מטופל, מרוחק',
        en: 'Can be overly emotional, distant, fatalistic'
      },
      lifePath: {
        he: 'דרכך היא לשרת את הבני אדם. חיפוש משמעות ושירות.',
        en: 'Your path is to serve humanity. Seeking purpose and global service.'
      }
    }
  };

  const details = numberDetails[reducedNum];

  const typeLabel = {
    'life-path': { he: 'דרך החיים', en: 'Life Path' },
    'destiny': { he: 'גורל', en: 'Destiny' },
    'soul-urge': { he: 'דחף הנשמה', en: 'Soul Urge' },
    'personality': { he: 'אישיות', en: 'Personality' }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${typeLabel[numberType][lang]} - ${details.name[lang]} (#${reducedNum})`}
      size="large"
    >
      <div className="numerology-modal-content">
        {/* Number Header */}
        <section className="nmc-header">
          <div className="nmch-big-number">{reducedNum}</div>
          <div className="nmch-info">
            <h3>{details.name[lang]}</h3>
            <p className="nmch-keywords">{details.keywords[lang]}</p>
          </div>
        </section>

        {/* Description */}
        <section className="nmc-section">
          <h3>{lang === 'he' ? 'הגדרה' : 'Definition'}</h3>
          <p className="nmc-description">{details.description[lang]}</p>
        </section>

        {/* Strengths */}
        <section className="nmc-section nmc-strengths">
          <h3>💪 {lang === 'he' ? 'חוזקות' : 'Strengths'}</h3>
          <p className="nmc-strengths-text">{details.strengths[lang]}</p>
          <ul className="nmc-list">
            {details.strengths[lang].split(',').map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </section>

        {/* Challenges */}
        <section className="nmc-section nmc-challenges">
          <h3>⚡ {lang === 'he' ? 'אתגרים' : 'Challenges'}</h3>
          <p className="nmc-challenges-text">{details.challenges[lang]}</p>
          <ul className="nmc-list">
            {details.challenges[lang].split(',').map((item, i) => (
              <li key={i}>{item.trim()}</li>
            ))}
          </ul>
        </section>

        {/* Life Path */}
        <section className="nmc-section nmc-lifepath">
          <h3>🛤️ {lang === 'he' ? 'דרך החיים שלך' : 'Your Life Path'}</h3>
          <p className="nmc-lifepath-text">{details.lifePath[lang]}</p>
        </section>

        {/* Meditation */}
        <section className="nmc-section nmc-meditation">
          <h3>🧘 {lang === 'he' ? 'מדיטציית מספרים' : 'Number Meditation'}</h3>
          <div className="nmc-meditation-guide">
            <p>
              {lang === 'he'
                ? `לישב בנוח, סגור עיניים, וכתוב את המספר ${reducedNum} על מנת הנפש שלך. הרגיש את האנרגיה של הדרך הזו.`
                : `Sit quietly and visualize the number ${reducedNum} glowing with light. Feel the energy of this path.`}
            </p>
          </div>
        </section>

        {/* Affirmation */}
        <section className="nmc-section nmc-affirmation">
          <h3>✨ {lang === 'he' ? 'אישור יומי' : 'Daily Affirmation'}</h3>
          <p className="nmc-affirmation-text">
            {lang === 'he'
              ? `"אני משתקם עם כוחה של הספרה ${reducedNum}. אני [${details.name.he}]"`
              : `"I align with the power of number ${reducedNum}. I am [${details.name.en}]"`}
          </p>
        </section>

        {/* Career & Life Guidance */}
        <section className="nmc-section nmc-guidance">
          <h3>💼 {lang === 'he' ? 'הדרכת חיים' : 'Life Guidance'}</h3>
          <div className="nmcg-grid">
            <div className="nmcg-item">
              <strong>{lang === 'he' ? 'קריירה' : 'Career'}</strong>
              <p>
                {lang === 'he'
                  ? 'חיפוש עבודה שמאפשרת ביטוי של הספרה הזו'
                  : 'Seek roles that express this number\'s energy'}
              </p>
            </div>
            <div className="nmcg-item">
              <strong>{lang === 'he' ? 'קשרים' : 'Relationships'}</strong>
              <p>
                {lang === 'he'
                  ? 'בנה קשרים בהתאם לערכים של הספרה'
                  : 'Build relationships aligned with this number'}
              </p>
            </div>
            <div className="nmcg-item">
              <strong>{lang === 'he' ? 'צמיחה' : 'Growth'}</strong>
              <p>
                {lang === 'he'
                  ? 'טפל בחוזקות והתגבר על אתגרים'
                  : 'Cultivate strengths and transcend challenges'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </Modal>
  );
};

export default NumerologyModal;
