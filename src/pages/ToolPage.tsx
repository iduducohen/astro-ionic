import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonButton, IonInput, IonLabel, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/react';
import Page from '../components/Page';
import ToolInfoCard from '../components/ToolInfoCard';
import {
  ELECTION_LABEL, HORARY_LABEL, NATIONS, electionReport, forecastReport, horaryReport, karmicReport, mundaneReport,
  natalReport, parseDate, placeById, reportHTML, synastryReport, zonedToUtc,
  type BirthData, type ElectionEvent, type HoraryCategory, type Lang, type Strings,
} from '../core';
import { useLang } from '../lang';
import { loadJSON, saveJSON } from '../storage';
import BirthFields from '../components/BirthFields';
import PlaceSelect from '../components/PlaceSelect';
import type { Tool } from './ChartsHub';

const today = () => new Date().toISOString().slice(0, 10);
const emptyBirth = (): BirthData => ({ name: '', date: '', time: '', timeKnown: true, placeId: 'jerusalem' });

/** קלט שמור לכל כלי — כדי לחשב מחדש בהחלפת שפה, בלי לשאול שוב */
type Args =
  | { tool: 'natal' | 'karmic'; me: BirthData }
  | { tool: 'forecast'; me: BirthData; sr?: string }
  | { tool: 'synastry'; me: BirthData; pt: BirthData }
  | { tool: 'horary'; question: string; category: HoraryCategory; date: Date; placeId: string }
  | { tool: 'election'; event: ElectionEvent; start: string; days: number; hourFrom: number; hourTo: number; placeId: string }
  | { tool: 'mundane'; nationId?: string; custom?: { name: string; date: Date; placeId: string } };

function compute(a: Args, lang: Lang): string {
  switch (a.tool) {
    case 'natal': return reportHTML(natalReport(a.me, lang));
    case 'karmic': return reportHTML(karmicReport(a.me, lang));
    case 'forecast': return reportHTML(forecastReport(a.me, lang, new Date(), a.sr ? { placeId: a.sr } : undefined));
    case 'synastry': return reportHTML(synastryReport(a.me, a.pt, lang));
    case 'horary': return reportHTML(horaryReport(a, lang));
    case 'election': return reportHTML(electionReport(a, lang));
    case 'mundane': return reportHTML(mundaneReport(a, lang));
  }
}

function checkBirth(b: BirthData, S: Strings): BirthData {
  if (!b.date) throw new Error(S.errNoDate);
  if (!parseDate(b.date)) throw new Error(S.errBadDate);
  if (!b.placeId && !(Math.abs(b.lat ?? NaN) <= 90 && Math.abs(b.lon ?? NaN) <= 180)) throw new Error(S.errBadCoords);
  return { ...b, name: b.name.trim() || S.guest, timeKnown: b.timeKnown && !!b.time };
}

function localToUtc(dt: string, placeId: string, S: Strings): Date {
  const p = placeById(placeId)!;
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(dt);
  if (!m) throw new Error(S.errBadDate);
  return zonedToUtc(+m[1], +m[2], +m[3], +m[4], +m[5], p.tz, p.lon);
}

const ToolPage: React.FC = () => {
  const { tool } = useParams<{ tool: Tool }>();
  const { lang, S } = useLang();
  const [me, setMe] = useState<BirthData>(emptyBirth());
  const [pt, setPt] = useState<BirthData>(emptyBirth());
  const [sr, setSr] = useState('');
  const [hq, setHq] = useState(''); const [hcat, setHcat] = useState<HoraryCategory>('general');
  const [hwhen, setHwhen] = useState<'now' | 'custom'>('now'); const [hdt, setHdt] = useState('');
  const [place, setPlace] = useState('jerusalem');
  const [ev, setEv] = useState<ElectionEvent>('wedding'); const [efrom, setEfrom] = useState(today());
  const [edays, setEdays] = useState(30); const [eh1, setEh1] = useState(9); const [eh2, setEh2] = useState(21);
  const [nation, setNation] = useState('israel'); const [mName, setMName] = useState(''); const [mDate, setMDate] = useState(''); const [mTime, setMTime] = useState('12:00');
  const [args, setArgs] = useState<Args | null>(null);
  const [html, setHtml] = useState(''); const [error, setError] = useState(''); const [busy, setBusy] = useState(false);
  const contentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    loadJSON<BirthData>('astro:birth:me').then(async (b) => {
      if (b) { setMe(b); if (b.placeId) setPlace(b.placeId); return; }
      const basic = await loadJSON<{ name: string; birth: string }>('astro:last');
      if (basic) setMe((cur) => ({ ...cur, name: basic.name, date: basic.birth }));
    });
    loadJSON<BirthData>('astro:birth:pt').then((b) => b && setPt(b));
  }, []);

  // חישוב (וחישוב מחדש בהחלפת שפה). setTimeout נותן לספינר להופיע לפני עבודה כבדה.
  useEffect(() => {
    if (!args) return;
    setBusy(true);
    const id = setTimeout(() => {
      try { setHtml(compute(args, lang)); setError(''); }
      catch (err) { const m = (err as Error).message; setError(m === 'no-place' ? S.errNoPlace : /^[a-z-]+$/.test(m) ? S.errGeneric : m); }
      setBusy(false);
      contentRef.current?.scrollToPoint(0, (document.querySelector('.tool-result') as HTMLElement | null)?.offsetTop ?? 0, 400);
    }, 30);
    return () => clearTimeout(id);
  }, [args, lang, S]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let a: Args;
      if (tool === 'natal' || tool === 'karmic' || tool === 'forecast' || tool === 'synastry') {
        const m = checkBirth(me, S); saveJSON('astro:birth:me', me);
        if (tool === 'synastry') { const p = checkBirth(pt, S); saveJSON('astro:birth:pt', pt); a = { tool, me: m, pt: p }; }
        else if (tool === 'forecast') a = { tool, me: m, sr: sr || undefined };
        else a = { tool, me: m };
      } else if (tool === 'horary') {
        a = { tool, question: hq.trim(), category: hcat, placeId: place, date: hwhen === 'now' ? new Date() : localToUtc(hdt, place, S) };
      } else if (tool === 'election') {
        if (!parseDate(efrom)) throw new Error(S.errBadDate);
        a = { tool, event: ev, start: efrom, days: Math.max(1, Math.min(60, edays || 30)), hourFrom: Math.min(eh1, eh2), hourTo: Math.max(eh1, eh2), placeId: place };
      } else {
        if (nation === 'custom') {
          if (!parseDate(mDate)) throw new Error(S.errBadDate);
          a = { tool: 'mundane', custom: { name: mName.trim() || S.customEvent, date: localToUtc(`${mDate}T${mTime || '12:00'}`, place, S), placeId: place } };
        } else a = { tool: 'mundane', nationId: nation };
      }
      setArgs(a);
    } catch (err) { setError((err as Error).message); }
  };

  // נתוני דוגמה: נועה, 15.3.1990 08:30 תל אביב · דניאל, 22.7.1988 19:10 ירושלים
  const fillSample = () => {
    setMe({ name: lang === 'he' ? 'נועה' : 'Noa', date: '1990-03-15', time: '08:30', timeKnown: true, placeId: 'tel-aviv' });
    setPt({ name: lang === 'he' ? 'דניאל' : 'Daniel', date: '1988-07-22', time: '19:10', timeKnown: true, placeId: 'jerusalem' });
    setHq(lang === 'he' ? 'האם אקבל את המשרה החדשה?' : 'Will I get the new job?'); setHcat('general');
    setError('');
  };

  const nat = (label: string, value: string | number, on: (v: string) => void, opts: [string, string][]) => (
    <label className="native-field"><span>{label}</span>
      <select value={value} onChange={(e) => on(e.target.value)}>{opts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
    </label>
  );

  return (
    <Page title={S.tools[tool]} back="/charts" contentRef={contentRef}>
        <h1 className="page-title">{S.tools[tool]}</h1>
        <p className="page-intro">{S.toolDesc[tool]}</p>
        <ToolInfoCard tool={tool} title={S.tools[tool]} />
        <form onSubmit={submit} noValidate className="form-grid">
          {['natal', 'karmic', 'forecast', 'synastry'].includes(tool) && (
            <div className="form-card">
              <h2 className="section-label">{S.myDetails}</h2>
              <BirthFields v={me} set={setMe} />
            </div>
          )}
          {tool === 'synastry' && (
            <div className="form-card">
              <h2 className="section-label">{S.partnerDetails}</h2>
              <BirthFields v={pt} set={setPt} />
            </div>
          )}
          {tool === 'forecast' && <div className="form-card"><PlaceSelect label={S.srPlace} value={sr} onChange={setSr} sameLabel={S.sameAsBirth} /></div>}
          {tool === 'horary' && (
            <div className="form-card">
              <IonInput mode="md" label={S.horaryQuestion} labelPlacement="stacked" fill="outline" maxlength={160}
                placeholder={S.horaryPlaceholder} value={hq} onIonInput={(e) => setHq(String(e.detail.value ?? ''))} />
              {nat(S.horaryCategory, hcat, (v) => setHcat(v as HoraryCategory), Object.entries(HORARY_LABEL).map(([k, l]) => [k, l[lang]]))}
              <PlaceSelect label={S.wherePlace} value={place} onChange={setPlace} />
              <span className="muted" style={{ fontSize: 13, marginBottom: -8 }}>{S.horaryWhen}</span>
              <IonSegment value={hwhen} onIonChange={(e) => setHwhen(e.detail.value as 'now' | 'custom')}>
                <IonSegmentButton value="now"><IonLabel>{S.horaryNow}</IonLabel></IonSegmentButton>
                <IonSegmentButton value="custom"><IonLabel>{S.horaryCustom}</IonLabel></IonSegmentButton>
              </IonSegment>
              {hwhen === 'custom' && <IonInput mode="md" fill="outline" type="datetime-local" aria-label={S.horaryCustom} value={hdt} onIonInput={(e) => setHdt(String(e.detail.value ?? ''))} />}
            </div>
          )}
          {tool === 'election' && (
            <div className="form-card">
              {nat(S.electionEvent, ev, (v) => setEv(v as ElectionEvent), Object.entries(ELECTION_LABEL).map(([k, l]) => [k, l[lang]]))}
              <PlaceSelect label={S.wherePlace} value={place} onChange={setPlace} />
              <IonInput mode="md" label={S.electionFrom} labelPlacement="stacked" fill="outline" type="date" value={efrom} onIonInput={(e) => setEfrom(String(e.detail.value ?? ''))} />
              <IonInput mode="md" label={S.electionDays} labelPlacement="stacked" fill="outline" type="number" min={1} max={60} value={edays} onIonInput={(e) => setEdays(Number(e.detail.value))} />
              <div className="row2">
                <IonInput mode="md" label={S.hourFrom} labelPlacement="stacked" fill="outline" type="number" min={0} max={23} value={eh1} onIonInput={(e) => setEh1(Number(e.detail.value))} />
                <IonInput mode="md" label={S.hourTo} labelPlacement="stacked" fill="outline" type="number" min={0} max={23} value={eh2} onIonInput={(e) => setEh2(Number(e.detail.value))} />
              </div>
            </div>
          )}
          {tool === 'mundane' && (
            <div className="form-card">
              {nat(S.country, nation, setNation, [...NATIONS.map((n): [string, string] => [n.id, n.name[lang]]), ['custom', S.customEvent]])}
              {nation === 'custom' && (
                <>
                  <IonInput mode="md" label={S.eventName} labelPlacement="stacked" fill="outline" value={mName} onIonInput={(e) => setMName(String(e.detail.value ?? ''))} />
                  <div className="row2">
                    <IonInput mode="md" label={S.eventDate} labelPlacement="stacked" fill="outline" type="date" value={mDate} onIonInput={(e) => setMDate(String(e.detail.value ?? ''))} />
                    <IonInput mode="md" label={S.eventTime} labelPlacement="stacked" fill="outline" type="time" value={mTime} onIonInput={(e) => setMTime(String(e.detail.value ?? ''))} />
                  </div>
                  <PlaceSelect label={S.wherePlace} value={place} onChange={setPlace} />
                </>
              )}
            </div>
          )}
          {error && <p role="alert" className="err">{error}</p>}
          <IonButton type="submit" expand="block" className="btn-main" disabled={busy}>
            {busy ? <><IonSpinner name="dots" style={{ marginInlineEnd: 8 }} />{S.computing}</> : S.calc}
          </IonButton>
          <button type="button" className="link-btn" onClick={fillSample}>{lang === 'he' ? 'אין פרטים בהישג יד? מילוי דוגמה' : 'No details handy? Fill an example'}</button>
        </form>
        <div className="tool-result" aria-live="polite" dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  );
};

export default ToolPage;
