import { useMemo, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { searchOutline, globeOutline, locationOutline, closeCircle } from 'ionicons/icons';
import { PLACES, COUNTRY_CODES, countryName, placeById } from '../core';
import { useLang } from '../lang';

export interface OnlinePlace { lat: number; lon: number; tz: string; label: string }

interface Props {
  label: string;
  value: string;                       // מזהה עיר, 'custom' או '' (כמו בלידה)
  onChange: (id: string) => void;
  allowCustom?: boolean;
  sameLabel?: string;
  onPickOnline?: (p: OnlinePlace) => void; // אם קיים — מאפשר חיפוש מקוון בכל העולם
  customLabel?: string;                // שם המקום המותאם שנבחר
}

interface GeoResult { name: string; admin1?: string; country?: string; latitude: number; longitude: number; timezone?: string }

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[׳'"]/g, '');

/**
 * בחירת מקום לידה מכל העולם:
 * 1. חיפוש חופשי ברשימה המובנית (עיר או מדינה, בעברית או באנגלית)
 * 2. מדינה ← עיר (כל מדינות העולם)
 * 3. חיפוש מקוון (Open-Meteo) לכל עיר/עיירה בעולם — מחזיר קואורדינטות ואזור זמן
 */
const PlaceSelect: React.FC<Props> = ({ label, value, onChange, allowCustom, sameLabel, onPickOnline, customLabel }) => {
  const { lang, S } = useLang();
  const he = lang === 'he';
  const current = value && value !== 'custom' ? placeById(value) : undefined;
  const [cc, setCc] = useState<string>(current?.cc ?? 'IL');
  const [q, setQ] = useState('');
  const [online, setOnline] = useState<GeoResult[] | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  const activeCc = current?.cc ?? (value === 'custom' ? '' : cc);

  const countries = useMemo(() => {
    const list = COUNTRY_CODES.map((c) => ({ cc: c, name: countryName(c, lang) }));
    list.sort((a, b) => a.name.localeCompare(b.name, lang));
    const il = list.findIndex((c) => c.cc === 'IL');
    if (il > 0) list.unshift(list.splice(il, 1)[0]);
    return list;
  }, [lang]);

  const cities = useMemo(() => PLACES.filter((p) => p.cc === activeCc).sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang)), [activeCc, lang]);

  const matches = useMemo(() => {
    const t = norm(q.trim());
    if (t.length < 2) return [];
    return PLACES.filter((p) => norm(p.name.he).includes(t) || norm(p.name.en).includes(t) || norm(countryName(p.cc, lang)).includes(t)).slice(0, 12);
  }, [q, lang]);

  const pick = (id: string) => { onChange(id); setQ(''); setOnline(null); };

  const searchOnline = async () => {
    if (!onPickOnline || q.trim().length < 2) return;
    setBusy(true); setErr(''); setOnline(null);
    try {
      const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q.trim())}&count=10&language=${lang}&format=json`);
      const j = await r.json();
      const res: GeoResult[] = (j.results ?? []).filter((x: GeoResult) => x.timezone);
      setOnline(res);
      if (!res.length) setErr(he ? 'לא נמצאו מקומות בשם הזה.' : 'No places found.');
    } catch {
      setErr(he ? 'אין חיבור לאינטרנט. אפשר לבחור מהרשימה או להזין קואורדינטות.' : 'No connection. Pick from the list or enter coordinates.');
    } finally { setBusy(false); }
  };

  return (
    <div className="place-picker">
      <span className="pl-label">{label}</span>

      {/* הבחירה הנוכחית */}
      <div className="pl-current">
        <IonIcon icon={locationOutline} aria-hidden="true" />
        {current ? <span><b>{current.name[lang]}</b>, {countryName(current.cc, lang)}</span>
          : value === 'custom' ? <span><b>{customLabel || (he ? 'מיקום מותאם אישית' : 'Custom location')}</b></span>
          : <span>{sameLabel}</span>}
      </div>

      {/* חיפוש */}
      <div className="pl-search">
        <IonIcon icon={searchOutline} aria-hidden="true" />
        <input type="search" value={q} onChange={(e) => { setQ(e.target.value); setOnline(null); setErr(''); }}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), matches.length ? pick(matches[0].id) : searchOnline())}
          placeholder={he ? 'חיפוש עיר או מדינה, בעברית או באנגלית…' : 'Search a city or country…'} aria-label={he ? 'חיפוש מקום' : 'Search place'} />
        {q && <button type="button" className="pl-clear" onClick={() => { setQ(''); setOnline(null); }} aria-label={he ? 'ניקוי' : 'Clear'}><IonIcon icon={closeCircle} /></button>}
      </div>

      {q.trim().length >= 2 && (
        <div className="pl-results">
          {matches.map((p) => (
            <button type="button" key={p.id} onClick={() => pick(p.id)}>
              <b>{p.name[lang]}</b><span>{countryName(p.cc, lang)}</span>
            </button>
          ))}
          {!matches.length && !online && <p className="pl-empty">{he ? 'לא ברשימה המובנית.' : 'Not in the built-in list.'}</p>}
          {onPickOnline && !online && (
            <button type="button" className="pl-online" onClick={searchOnline} disabled={busy}>
              <IonIcon icon={globeOutline} aria-hidden="true" />
              {busy ? (he ? 'מחפש…' : 'Searching…') : (he ? `חיפוש "${q.trim()}" בכל העולם (מקוון)` : `Search "${q.trim()}" worldwide (online)`)}
            </button>
          )}
          {online?.map((g, i) => (
            <button type="button" key={i} onClick={() => {
              onPickOnline!({ lat: g.latitude, lon: g.longitude, tz: g.timezone!, label: [g.name, g.admin1, g.country].filter(Boolean).join(', ') });
              setQ(''); setOnline(null);
            }}>
              <b>{g.name}</b><span>{[g.admin1, g.country].filter(Boolean).join(', ')}</span>
            </button>
          ))}
          {err && <p className="pl-empty">{err}</p>}
        </div>
      )}

      {/* מדינה ← עיר */}
      {!q && (
        <div className="row2">
          <label className="native-field">
            <span>{he ? 'מדינה' : 'Country'}</span>
            <select value={activeCc} onChange={(e) => {
              const c = e.target.value; setCc(c);
              const first = PLACES.filter((p) => p.cc === c).sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang))[0];
              if (first) onChange(first.id);
            }}>
              {activeCc === '' && <option value="">—</option>}
              {countries.map((c) => <option key={c.cc} value={c.cc}>{c.name}</option>)}
            </select>
          </label>
          <label className="native-field">
            <span>{he ? 'עיר' : 'City'}</span>
            <select value={current ? current.id : value} onChange={(e) => onChange(e.target.value)}>
              {sameLabel !== undefined && <option value="">{sameLabel}</option>}
              {!current && value === 'custom' && <option value="custom">{customLabel || S.placeCustom}</option>}
              {cities.map((p) => <option key={p.id} value={p.id}>{p.name[lang]}</option>)}
              {allowCustom && value !== 'custom' && <option value="custom">{S.placeCustom}</option>}
            </select>
          </label>
        </div>
      )}
      {onPickOnline && !q && <p className="pl-hint">{he ? 'העיר לא ברשימה? הקלידו את שמה בחיפוש ובחרו "חיפוש בכל העולם".' : 'City not listed? Type it in search and choose "search worldwide".'}</p>}
    </div>
  );
};

export default PlaceSelect;
