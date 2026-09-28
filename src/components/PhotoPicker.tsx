import { useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { useLang } from '../lang';

export interface Sample { src: string; label: string }

interface Props {
  label: string;
  hint?: string;
  value: string | null;              // data URL או כתובת של קובץ דוגמה
  onChange: (src: string | null) => void;
  samples?: Sample[];                // קבצי דוגמה לניסיון / הורדה
}

/** צילום אפשרי רק באפליקציה (Android/iOS). בדפדפן — העלאת קובץ בלבד. */
const NATIVE = Capacitor.isNativePlatform();

/**
 * בחירת תמונה: צילום (באפליקציה בלבד) או בחירה מהגלריה/קובץ,
 * ואפשרות לנסות עם קובץ דוגמה.
 */
const PhotoPicker: React.FC<Props> = ({ label, hint, value, onChange, samples }) => {
  const { lang: L } = useLang();
  const he = L === 'he';
  const cam = useRef<HTMLInputElement>(null);
  const gal = useRef<HTMLInputElement>(null);

  const read = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onChange(String(r.result));
    r.readAsDataURL(f);
  };

  return (
    <div className="photo-picker">
      <div className="pp-head">
        <span className="pp-label">{label}</span>
        {hint && <span className="pp-hint">{hint}</span>}
      </div>
      {value ? (
        <div className="pp-preview">
          <img src={value} alt={label} />
          <div className="pp-actions">
            <button type="button" className="pp-btn" onClick={() => gal.current?.click()}>{he ? 'החלפה' : 'Replace'}</button>
            <button type="button" className="pp-btn pp-danger" onClick={() => onChange(null)}>{he ? 'הסרה' : 'Remove'}</button>
          </div>
        </div>
      ) : (
        <div className={`pp-empty${NATIVE ? '' : ' one'}`}>
          {NATIVE && (
            <button type="button" className="pp-big" onClick={() => cam.current?.click()}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="12" cy="13" r="3.6" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
              {he ? 'צילום' : 'Take photo'}
            </button>
          )}
          <button type="button" className="pp-big" onClick={() => gal.current?.click()}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M4 16l5-5 4 4 2-2 5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><circle cx="15.5" cy="9.5" r="1.4" fill="currentColor"/></svg>
            {NATIVE ? (he ? 'גלריה' : 'Gallery') : (he ? 'העלאת תמונה מהמחשב' : 'Upload an image')}
          </button>
        </div>
      )}
      {!NATIVE && !value && (
        <p className="pp-note">{he ? 'צילום ישיר זמין באפליקציה בטלפון. בדפדפן אפשר להעלות קובץ תמונה.' : 'Taking a photo is available in the phone app. In the browser, upload an image file.'}</p>
      )}
      {samples && samples.length > 0 && (
        <div className="pp-samples">
          <span className="pp-samples-label">{he ? 'אין תמונה? נסו עם קובץ דוגמה:' : 'No photo? Try a sample file:'}</span>
          <div className="pp-samples-row">
            {samples.map((s) => (
              <div key={s.src} className={`pp-sample${value === s.src ? ' on' : ''}`}>
                <button type="button" onClick={() => onChange(s.src)} aria-label={s.label}>
                  <img src={s.src} alt="" />
                  <span>{s.label}</span>
                </button>
                <a href={s.src} download className="pp-dl">{he ? 'הורדה' : 'Download'}</a>
              </div>
            ))}
          </div>
        </div>
      )}
      {NATIVE && <input ref={cam} type="file" accept="image/*" capture="environment" hidden onChange={read} />}
      <input ref={gal} type="file" accept="image/*" hidden onChange={read} />
    </div>
  );
};

export default PhotoPicker;
