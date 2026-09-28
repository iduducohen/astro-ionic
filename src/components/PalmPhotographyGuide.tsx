import React, { useState } from 'react';
import { useLang } from '../lang';
import Modal from './Modal';

/**
 * PalmPhotographyGuide - מדריך צילום כף יד מקצועי לקריאה דויקת
 */
const PalmPhotographyGuide: React.FC = () => {
  const { lang } = useLang();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="palm-photography-guide">
      <section className="ppg-header">
        <h2>📸 {lang === 'he' ? 'מדריך צילום כף יד מקצועי' : 'Professional Palm Photography Guide'}</h2>
        <p>
          {lang === 'he'
            ? 'קבלו צילומים ברורים ודיוקים כדי לאפשר קריאה מדויקת של כף היד'
            : 'Get clear, precise photos for accurate palm reading analysis'}
        </p>
      </section>

      {/* Lighting Section */}
      <section className="ppg-section">
        <div
          className="ppgs-header"
          onClick={() => setExpandedSection(expandedSection === 'lighting' ? null : 'lighting')}
        >
          <h3>💡 {lang === 'he' ? 'תאורה' : 'Lighting'}</h3>
          <span className="ppgs-toggle">{expandedSection === 'lighting' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'lighting' && (
          <div className="ppgs-content">
            <div className="ppgc-item">
              <h4>✅ {lang === 'he' ? 'נכון' : 'Correct'}</h4>
              <ul className="ppgc-list">
                <li>
                  {lang === 'he'
                    ? '☀️ אור יום טבעי וחזק מחלון או בחוץ'
                    : '☀️ Strong natural daylight from window or outdoors'}
                </li>
                <li>
                  {lang === 'he'
                    ? '🌥️ יום מעונן בהיר (אור פזור ואחיד)'
                    : '🌥️ Bright overcast day (diffused even light)'}
                </li>
                <li>
                  {lang === 'he'
                    ? '📍 אור מופנה על כף היד בזווית 45°'
                    : '📍 Light directed at palm at 45° angle'}
                </li>
                <li>
                  {lang === 'he'
                    ? '⚪ שטח לבן מאחורי היד לגרימת ניגודיות'
                    : '⚪ White background behind hand for contrast'}
                </li>
              </ul>
            </div>

            <div className="ppgc-item ppgc-wrong">
              <h4>❌ {lang === 'he' ? 'לא נכון' : 'Incorrect'}</h4>
              <ul className="ppgc-list">
                <li>
                  {lang === 'he'
                    ? '⚡ פלאש חזק או ישיר (מחק קווים עדינים)'
                    : '⚡ Direct or strong flash (erases fine lines)'}
                </li>
                <li>
                  {lang === 'he'
                    ? '🕯️ אור חלש מדי או עמום'
                    : '🕯️ Too weak or dim light'}
                </li>
                <li>
                  {lang === 'he'
                    ? '🌑 צללים כבדים על כף היד'
                    : '🌑 Heavy shadows on palm'}
                </li>
                <li>
                  {lang === 'he'
                    ? '🔦 אור מצד אחד בלבד'
                    : '🔦 Light from only one side'}
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Focus & Sharpness Section */}
      <section className="ppg-section">
        <div
          className="ppgs-header"
          onClick={() => setExpandedSection(expandedSection === 'focus' ? null : 'focus')}
        >
          <h3>🎯 {lang === 'he' ? 'חדות וריכוז' : 'Focus & Sharpness'}</h3>
          <span className="ppgs-toggle">{expandedSection === 'focus' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'focus' && (
          <div className="ppgs-content">
            <div className="ppgc-checklist">
              <div className="ppgc-check-item">
                <span className="ppgc-check-icon">✓</span>
                <div>
                  <strong>{lang === 'he' ? 'תמונה חדה לחלוטין' : 'Completely Sharp Image'}</strong>
                  <p>
                    {lang === 'he'
                      ? 'כל קו, קמט וטקסטורה צריכים להיות ברורים לחלוטין'
                      : 'Every line, wrinkle, and texture must be crystal clear'}
                  </p>
                </div>
              </div>

              <div className="ppgc-check-item">
                <span className="ppgc-check-icon">✓</span>
                <div>
                  <strong>{lang === 'he' ? 'קווים עדינים גלויים' : 'Fine Lines Visible'}</strong>
                  <p>
                    {lang === 'he'
                      ? 'צריך לראות אפילו את הקווים הקטנים ביותר, לא רק את הקווים הראשיים'
                      : 'Must see even smallest lines, not just main lines'}
                  </p>
                </div>
              </div>

              <div className="ppgc-check-item">
                <span className="ppgc-check-icon">✓</span>
                <div>
                  <strong>{lang === 'he' ? 'ללא טלטול או בלור' : 'No Motion Blur'}</strong>
                  <p>
                    {lang === 'he'
                      ? 'יד צריכה להיות קבועה לחלוטין לזמן צילום (לפחות 2 שניות)'
                      : 'Hand must be completely still (at least 2 seconds)'}
                  </p>
                </div>
              </div>

              <div className="ppgc-check-item">
                <span className="ppgc-check-icon">✓</span>
                <div>
                  <strong>{lang === 'he' ? 'מרחק ציור אופטימלי' : 'Optimal Distance'}</strong>
                  <p>
                    {lang === 'he'
                      ? '25-35 ס"מ מהטלפון - קרוב מספיק לטקסטורה, רחוק מספיק לכל היד'
                      : '25-35 cm from phone - close enough for texture, far enough for full palm'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Photography Angles Section */}
      <section className="ppg-section">
        <div
          className="ppgs-header"
          onClick={() => setExpandedSection(expandedSection === 'angles' ? null : 'angles')}
        >
          <h3>📐 {lang === 'he' ? 'זוויות צילום נדרשות' : 'Required Photography Angles'}</h3>
          <span className="ppgs-toggle">{expandedSection === 'angles' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'angles' && (
          <div className="ppgs-content">
            {/* Angle 1 */}
            <div className="ppga-angle">
              <div className="ppga-title">
                <span className="ppga-number">1️⃣</span>
                <h4>{lang === 'he' ? 'גב כף היד' : 'Back of Hand'}</h4>
              </div>
              <div className="ppga-description">
                <p>
                  {lang === 'he'
                    ? 'אצבעות פרושות וישרות, צלמו מלמעלה בזווית 90°'
                    : 'Fingers spread and straight, photograph from above at 90°'}
                </p>
                <div className="ppga-details">
                  <strong>{lang === 'he' ? 'מטרה:' : 'Purpose:'}</strong>
                  <ul>
                    <li>{lang === 'he' ? 'בחינת מבנה הציפורניים' : 'Examine nail structure'}</li>
                    <li>{lang === 'he' ? 'בחינת צורת האצבעות' : 'Examine finger shapes'}</li>
                    <li>{lang === 'he' ? 'בדוק יד דומיננטית לעומת לא-דומיננטית' : 'Check dominant vs non-dominant'}</li>
                    <li>{lang === 'he' ? 'קווי מברשת/סימנים על גב היד' : 'Lines and marks on back'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Angle 2 */}
            <div className="ppga-angle">
              <div className="ppga-title">
                <span className="ppga-number">2️⃣</span>
                <h4>{lang === 'he' ? 'פנים כף היד - תצוגה כללית' : 'Palm Front - Full View'}</h4>
              </div>
              <div className="ppga-description">
                <p>
                  {lang === 'he'
                    ? 'יד פתוחה לחלוטין ושטוחה, צלמו מלמעלה בזווית 90°'
                    : 'Hand completely open and flat, photograph from above at 90°'}
                </p>
                <div className="ppga-details">
                  <strong>{lang === 'he' ? 'מטרה:' : 'Purpose:'}</strong>
                  <ul>
                    <li>{lang === 'he' ? 'ראו את כל הקווים הראשיים' : 'See all main lines'}</li>
                    <li>{lang === 'he' ? 'בחינת הכריות (mounds)' : 'Examine mounds'}</li>
                    <li>{lang === 'he' ? 'בדוק את צורת הכף' : 'Check palm shape'}</li>
                    <li>{lang === 'he' ? 'בדוק את גודל הכף' : 'Check palm size'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Angle 3 */}
            <div className="ppga-angle">
              <div className="ppga-title">
                <span className="ppga-number">3️⃣</span>
                <h4>{lang === 'he' ? 'פנים כף היד - תקריב קווים' : 'Palm Front - Close-up Lines'}</h4>
              </div>
              <div className="ppga-description">
                <p>
                  {lang === 'he'
                    ? 'תקריב של כל קו בנפרד (חיים, לב, ראש)'
                    : 'Close-up of each line separately (life, heart, head)'}
                </p>
                <div className="ppga-details">
                  <strong>{lang === 'he' ? 'מטרה:' : 'Purpose:'}</strong>
                  <ul>
                    <li>{lang === 'he' ? 'ראו את הפרטים של כל קו' : 'See details of each line'}</li>
                    <li>{lang === 'he' ? 'בחינת שברים, שרשרות, הסתעפויות' : 'Examine breaks, chains, branches'}</li>
                    <li>{lang === 'he' ? 'בדוק את איכות הקו (חזק/חלש)' : 'Check line quality (strong/weak)'}</li>
                    <li>{lang === 'he' ? 'זהה קווים משניים' : 'Identify minor lines'}</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Angle 4 */}
            <div className="ppga-angle">
              <div className="ppga-title">
                <span className="ppga-number">4️⃣</span>
                <h4>{lang === 'he' ? 'פרופיל (צד היד)' : 'Profile (Side View)'}</h4>
              </div>
              <div className="ppga-description">
                <p>
                  {lang === 'he'
                    ? 'צלמו מדופן היד, מאזור הזרת ומטה (כל כף היד בחזה)'
                    : 'Photograph from side of hand, from wrist down (entire palm visible)'}
                </p>
                <div className="ppga-details">
                  <strong>{lang === 'he' ? 'מטרה:' : 'Purpose:'}</strong>
                  <ul>
                    <li>{lang === 'he' ? 'בדוק קווי נישואין (בצד היד)' : 'Check marriage lines (on edge)'}</li>
                    <li>{lang === 'he' ? 'בחינת קווי נסיעות' : 'Examine travel lines'}</li>
                    <li>{lang === 'he' ? 'בדוק את שיפוע הכף' : 'Check palm slope'}</li>
                    <li>{lang === 'he' ? 'בחינת מערכות יחסים וקשרים' : 'Check relationships and bonds'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Hand Position Section */}
      <section className="ppg-section">
        <div
          className="ppgs-header"
          onClick={() => setExpandedSection(expandedSection === 'position' ? null : 'position')}
        >
          <h3>🖐️ {lang === 'he' ? 'עמדת היד' : 'Hand Position'}</h3>
          <span className="ppgs-toggle">{expandedSection === 'position' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'position' && (
          <div className="ppgs-content">
            <div className="ppgc-position">
              <h4>✅ {lang === 'he' ? 'עמדה נכונה' : 'Correct Position'}</h4>
              <ul className="ppgc-list">
                <li>
                  {lang === 'he'
                    ? '🖐️ יד פתוחה לחלוטין, כל אצבע מופרדת מהשנייה'
                    : '🖐️ Hand completely open, each finger separated'}
                </li>
                <li>
                  {lang === 'he'
                    ? '📏 יד שטוחה לחלוטין (כל קו חייב להיות נראה)'
                    : '📏 Hand completely flat (every line must be visible)'}
                </li>
                <li>
                  {lang === 'he'
                    ? '📍 אצבעות מעט מכופפות אחורה (כדי למתוח את קווי כף היד)'
                    : '📍 Fingers slightly bent backward (to stretch palm lines)'}
                </li>
                <li>
                  {lang === 'he'
                    ? '🤚 כף היד פנויה (ללא טבעות או צמידים אם אפשר)'
                    : '🤚 Palm clear (no rings or bracelets if possible)'}
                </li>
              </ul>
            </div>

            <div className="ppgc-position ppgc-wrong">
              <h4>❌ {lang === 'he' ? 'עמדה לא נכונה' : 'Incorrect Position'}</h4>
              <ul className="ppgc-list">
                <li>{lang === 'he' ? '👊 יד סגורה או חצי סגורה' : '👊 Closed or half-closed hand'}</li>
                <li>{lang === 'he' ? '🤐 אצבעות קרובות זו לזו' : '🤐 Fingers close together'}</li>
                <li>{lang === 'he' ? '📐 יד בזווית (מעוות קווים)' : '📐 Hand at angle (distorts lines)'}</li>
                <li>{lang === 'he' ? '✊ יד כף כנופיה' : '✊ Hand in fist'}</li>
                <li>{lang === 'he' ? '💍 טבעות וזהב מסתירים קווים' : '💍 Rings hiding lines'}</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Equipment Section */}
      <section className="ppg-section">
        <div
          className="ppgs-header"
          onClick={() => setExpandedSection(expandedSection === 'equipment' ? null : 'equipment')}
        >
          <h3>📱 {lang === 'he' ? 'ציוד וטלפון' : 'Equipment & Phone'}</h3>
          <span className="ppgs-toggle">{expandedSection === 'equipment' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'equipment' && (
          <div className="ppgs-content">
            <div className="ppgc-equipment">
              <h4>📷 {lang === 'he' ? 'מצב צילום טוב' : 'Good Camera Setup'}</h4>
              <ul className="ppgc-list">
                <li>{lang === 'he' ? 'טלפון עם מצלמה 12MP ומעלה' : 'Phone with 12MP+ camera'}</li>
                <li>{lang === 'he' ? 'מצב פורטרט (Portrait mode) למיקוד טוב' : 'Portrait mode for good focus'}</li>
                <li>{lang === 'he' ? 'טלפון קבוע או סטטיב (לא בידיים רועדות)' : 'Stable phone (not shaky hands)'}</li>
                <li>{lang === 'he' ? 'מצלמה סרוקת עם High Definition' : 'High Definition camera'}</li>
              </ul>
            </div>

            <div className="ppgc-equipment">
              <h4>⚙️ {lang === 'he' ? 'הגדרות מצלמה מומלצות' : 'Recommended Camera Settings'}</h4>
              <ul className="ppgc-list">
                <li>{lang === 'he' ? 'כיבוי פלאש' : 'Turn OFF flash'}</li>
                <li>{lang === 'he' ? 'הגדר ל-HD או 4K' : 'Set to HD or 4K'}</li>
                <li>{lang === 'he' ? 'הגדר ריכוז ידני אם אפשר' : 'Use manual focus if available'}</li>
                <li>{lang === 'he' ? 'הגדר לא להיות מגנטי' : 'Disable autofocus hunting'}</li>
              </ul>
            </div>
          </div>
        )}
      </section>

      {/* Common Mistakes Section */}
      <section className="ppg-section ppg-mistakes">
        <div
          className="ppgs-header"
          onClick={() => setExpandedSection(expandedSection === 'mistakes' ? null : 'mistakes')}
        >
          <h3>⚠️ {lang === 'he' ? 'טעויות נפוצות' : 'Common Mistakes'}</h3>
          <span className="ppgs-toggle">{expandedSection === 'mistakes' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'mistakes' && (
          <div className="ppgs-content">
            <div className="ppgm-mistake">
              <span className="ppgm-icon">❌</span>
              <div>
                <strong>{lang === 'he' ? 'שימוש בפלאש' : 'Using Flash'}</strong>
                <p>
                  {lang === 'he'
                    ? 'פלאש מחק קווים עדינים ויוצר הסוואה לבנה'
                    : 'Flash erases fine lines and creates white blur'}
                </p>
              </div>
            </div>

            <div className="ppgm-mistake">
              <span className="ppgm-icon">❌</span>
              <div>
                <strong>{lang === 'he' ? 'יד בזווית' : 'Hand at Angle'}</strong>
                <p>
                  {lang === 'he'
                    ? 'זה מעוות את הקווים וממקד את אורך הקווים'
                    : 'Distorts lines and changes perceived line length'}
                </p>
              </div>
            </div>

            <div className="ppgm-mistake">
              <span className="ppgm-icon">❌</span>
              <div>
                <strong>{lang === 'he' ? 'צללים על יד' : 'Shadows on Hand'}</strong>
                <p>
                  {lang === 'he'
                    ? 'צללים מחד את הקווים וכופים הערכה'
                    : 'Shadows hide lines and make assessment difficult'}
                </p>
              </div>
            </div>

            <div className="ppgm-mistake">
              <span className="ppgm-icon">❌</span>
              <div>
                <strong>{lang === 'he' ? 'מרחק לא נכון' : 'Wrong Distance'}</strong>
                <p>
                  {lang === 'he'
                    ? 'קרוב מדי או רחוק מדי - קשה לראות פרטים'
                    : 'Too close or too far - hard to see details'}
                </p>
              </div>
            </div>

            <div className="ppgm-mistake">
              <span className="ppgm-icon">❌</span>
              <div>
                <strong>{lang === 'he' ? 'עיבוד בפוטושופ' : 'Photo Editing'}</strong>
                <p>
                  {lang === 'he'
                    ? 'תמונות עם מסנני או עריכה משנות את הקווים'
                    : 'Filtered or edited photos change appearance of lines'}
                </p>
              </div>
            </div>

            <div className="ppgm-mistake">
              <span className="ppgm-icon">❌</span>
              <div>
                <strong>{lang === 'he' ? 'טבעות וקישוטים' : 'Rings & Jewelry'}</strong>
                <p>
                  {lang === 'he'
                    ? 'טבעות מסתירות קווים חשובים'
                    : 'Rings hide important lines and marks'}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Tips for Best Results */}
      <section className="ppg-section ppg-tips">
        <h3>🌟 {lang === 'he' ? 'טיפים לתוצאות הטובות ביותר' : 'Tips for Best Results'}</h3>
        <div className="ppgt-grid">
          <div className="ppgt-tip">
            <div className="ppgt-icon">🎯</div>
            <h4>{lang === 'he' ? 'צלמו מספר תמונות' : 'Take Multiple Photos'}</h4>
            <p>
              {lang === 'he'
                ? '5-10 תמונות מזוויות שונות, בחרו את הטובות ביותר'
                : 'Take 5-10 photos from different angles, pick the best'}
            </p>
          </div>

          <div className="ppgt-tip">
            <div className="ppgt-icon">⏱️</div>
            <h4>{lang === 'he' ? 'תמתינו לאור טוב' : 'Wait for Good Light'}</h4>
            <p>
              {lang === 'he'
                ? 'אור יום טוב הוא המפתח - אל תמהר'
                : 'Good light is key - don\'t rush to take photos'}
            </p>
          </div>

          <div className="ppgt-tip">
            <div className="ppgt-icon">🛠️</div>
            <h4>{lang === 'he' ? 'השתמש בסטטיו' : 'Use Tripod/Stable Base'}</h4>
            <p>
              {lang === 'he'
                ? 'טלפון יציב = תמונה חדה'
                : 'Stable phone = sharp image'}
            </p>
          </div>

          <div className="ppgt-tip">
            <div className="ppgt-icon">✨</div>
            <h4>{lang === 'he' ? 'נקה את כף היד' : 'Clean Your Hand'}</h4>
            <p>
              {lang === 'he'
                ? 'יד נקייה משפרת את איכות התמונה'
                : 'Clean hand improves photo quality and clarity'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PalmPhotographyGuide;
