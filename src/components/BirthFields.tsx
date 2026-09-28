import { IonCheckbox, IonInput } from '@ionic/react';
import { listTimeZones, type BirthData } from '../core';
import { useLang } from '../lang';
import PlaceSelect from './PlaceSelect';

const TZS = listTimeZones();

/** טופס נתוני לידה: שם, תאריך, שעה (או "לא ידועה"), מקום מהרשימה או קואורדינטות */
const BirthFields: React.FC<{ v: BirthData; set: (b: BirthData) => void }> = ({ v, set }) => {
  const { S } = useLang();
  const custom = !v.placeId;
  return (
    <div className="form-grid" style={{ gap: 14 }}>
      <IonInput mode="md" label={S.name} labelPlacement="stacked" fill="outline" value={v.name}
        onIonInput={(e) => set({ ...v, name: String(e.detail.value ?? '') })} />
      <IonInput mode="md" label={S.birthDate} labelPlacement="stacked" fill="outline" type="date" min="1800-01-01"
        value={v.date} onIonInput={(e) => set({ ...v, date: String(e.detail.value ?? '') })} />
      <IonInput mode="md" label={S.birthTime} labelPlacement="stacked" fill="outline" type="time" disabled={!v.timeKnown}
        value={v.time} onIonInput={(e) => set({ ...v, time: String(e.detail.value ?? '') })} />
      <IonCheckbox checked={!v.timeKnown} labelPlacement="end" justify="start"
        onIonChange={(e) => set({ ...v, timeKnown: !e.detail.checked })}>{S.timeUnknown}</IonCheckbox>
      <PlaceSelect label={S.birthPlace} value={custom ? 'custom' : v.placeId!} allowCustom customLabel={v.placeLabel}
        onChange={(id) => set(id === 'custom' ? { ...v, placeId: undefined, placeLabel: undefined, lat: v.lat ?? 32.08, lon: v.lon ?? 34.78, tz: v.tz ?? 'Asia/Jerusalem' } : { ...v, placeId: id, placeLabel: undefined })}
        onPickOnline={(p) => set({ ...v, placeId: undefined, lat: p.lat, lon: p.lon, tz: p.tz, placeLabel: p.label })} />
      {custom && (
        <>
          <IonInput mode="md" label={S.latitude} labelPlacement="stacked" fill="outline" type="number" inputmode="decimal"
            value={v.lat} onIonInput={(e) => set({ ...v, lat: parseFloat(String(e.detail.value)) })} />
          <IonInput mode="md" label={S.longitude} labelPlacement="stacked" fill="outline" type="number" inputmode="decimal"
            value={v.lon} onIonInput={(e) => set({ ...v, lon: parseFloat(String(e.detail.value)) })} />
          <label className="native-field">
            <span>{S.timezone}</span>
            <select value={v.tz} onChange={(e) => set({ ...v, tz: e.target.value })}>
              {(v.tz && !TZS.includes(v.tz) ? [v.tz, ...TZS] : TZS).map((z) => <option key={z}>{z}</option>)}
            </select>
          </label>
        </>
      )}
    </div>
  );
};

export default BirthFields;
