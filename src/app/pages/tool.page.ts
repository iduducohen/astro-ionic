import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonCheckbox, IonInput, IonLabel, IonSegment, IonSegmentButton, IonSpinner } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  COUNTRY_CODES, ELECTION_LABEL, HORARY_LABEL, NATIONS, PLACES, countryName as countryLabel, electionReport, forecastReport,
  horaryReport, karmicReport, listTimeZones, mundaneReport, natalReport, parseDate, placeById, reportHTML,
  synastryReport, zonedToUtc, type BirthData, type ElectionEvent, type HoraryCategory, type Lang, type Strings,
} from '../../core';
import { LangService } from '../lang.service';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';
import { loadJSON, saveJSON } from '../storage';
import type { Tool } from './charts.page';

const today = () => new Date().toISOString().slice(0, 10);
const emptyBirth = (): BirthData => ({ name: '', date: '', time: '', timeKnown: true, placeId: 'jerusalem' });

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

@Component({
  selector: 'app-tool',
  imports: [ScreenComponent, RouterLink, WhenFieldComponent, IonButton, IonCheckbox, IonInput, IonLabel, IonSegment, IonSegmentButton, IonSpinner],
  templateUrl: './tool.page.html',
})
export class ToolPage {
  readonly tool = input.required<Tool>();
  readonly lang = inject(LangService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly cd = inject(ChangeDetectorRef);
  readonly countries = COUNTRY_CODES.map((cc) => cc);
  readonly zones = listTimeZones();
  readonly horaryLabels = Object.entries(HORARY_LABEL) as [HoraryCategory, { he: string; en: string }][];
  readonly electionLabels = Object.entries(ELECTION_LABEL) as [ElectionEvent, { he: string; en: string }][];
  readonly nations = NATIONS;

  me: BirthData = emptyBirth();
  pt: BirthData = emptyBirth();
  sr = '';
  hq = '';
  hcat: HoraryCategory = 'general';
  hwhen: 'now' | 'custom' = 'now';
  hDate = '';
  hTime = '';
  place = 'jerusalem';
  cc = 'IL';
  ev: ElectionEvent = 'wedding';
  efrom = today();
  edays = 30;
  eh1 = 9;
  eh2 = 21;
  nation = 'israel';
  mName = '';
  mDate = '';
  mTime = '12:00';
  error = '';
  busy = false;
  html: SafeHtml = '';

  constructor() {
    loadJSON<BirthData>('astro:birth:me').then(async (b) => {
      if (b) { this.me = b; if (b.placeId) { this.place = b.placeId; this.cc = placeById(b.placeId)?.cc ?? 'IL'; } }
      else {
        const basic = await loadJSON<{ name: string; birth: string }>('astro:last');
        if (basic) this.me = { ...this.me, name: basic.name, date: basic.birth };
      }
      this.cd.detectChanges();
    });
    loadJSON<BirthData>('astro:birth:pt').then((b) => { if (b) { this.pt = b; this.cd.detectChanges(); } });
  }

  countryName(cc: string): string { return countryLabel(cc, this.lang.lang()); }
  cities() { return PLACES.filter((p) => p.cc === this.cc); }

  submit(event: Event): void {
    event.preventDefault();
    const S = this.lang.text();
    const tool = this.tool();
    try {
      let a: Args;
      if (tool === 'natal' || tool === 'karmic' || tool === 'forecast' || tool === 'synastry') {
        const m = this.checkBirth(this.me, S);
        saveJSON('astro:birth:me', this.me);
        if (tool === 'synastry') {
          const p = this.checkBirth(this.pt, S);
          saveJSON('astro:birth:pt', this.pt);
          a = { tool, me: m, pt: p };
        } else if (tool === 'forecast') a = { tool, me: m, sr: this.sr || undefined };
        else a = { tool, me: m };
      } else if (tool === 'horary') {
        a = { tool, question: this.hq.trim(), category: this.hcat, placeId: this.place, date: this.hwhen === 'now' ? new Date() : this.localToUtc(`${this.hDate}T${this.hTime || '00:00'}`, this.place, S) };
      } else if (tool === 'election') {
        if (!parseDate(this.efrom)) throw new Error(S.errBadDate);
        a = { tool, event: this.ev, start: this.efrom, days: Math.max(1, Math.min(60, this.edays || 30)), hourFrom: Math.min(this.eh1, this.eh2), hourTo: Math.max(this.eh1, this.eh2), placeId: this.place };
      } else if (this.nation === 'custom') {
        if (!parseDate(this.mDate)) throw new Error(S.errBadDate);
        a = { tool: 'mundane', custom: { name: this.mName.trim() || S.customEvent, date: this.localToUtc(`${this.mDate}T${this.mTime || '12:00'}`, this.place, S), placeId: this.place } };
      } else a = { tool: 'mundane', nationId: this.nation };
      this.busy = true;
      this.error = '';
      setTimeout(() => {
        try { this.html = this.sanitizer.bypassSecurityTrustHtml(compute(a, this.lang.lang())); }
        catch (err) {
          const m = (err as Error).message;
          this.error = m === 'no-place' ? S.errNoPlace : /^[a-z-]+$/.test(m) ? S.errGeneric : m;
        }
        this.busy = false;
        this.cd.detectChanges();
      }, 30);
    } catch (err) { this.error = (err as Error).message; }
  }

  sample(): void {
    const he = this.lang.lang() === 'he';
    this.me = { name: he ? 'נועה' : 'Noa', date: '1990-03-15', time: '08:30', timeKnown: true, placeId: 'tel-aviv' };
    this.pt = { name: he ? 'דניאל' : 'Daniel', date: '1988-07-22', time: '19:10', timeKnown: true, placeId: 'jerusalem' };
    this.place = 'tel-aviv';
    this.cc = 'IL';
    this.hq = he ? 'האם אקבל את המשרה החדשה?' : 'Will I get the new job?';
    this.error = '';
  }

  private checkBirth(b: BirthData, S: Strings): BirthData {
    if (!b.date) throw new Error(S.errNoDate);
    if (!parseDate(b.date)) throw new Error(S.errBadDate);
    if (!b.placeId && !(Math.abs(b.lat ?? NaN) <= 90 && Math.abs(b.lon ?? NaN) <= 180)) throw new Error(S.errBadCoords);
    return { ...b, name: b.name.trim() || S.guest, timeKnown: b.timeKnown && !!b.time };
  }

  private localToUtc(dt: string, placeId: string, S: Strings): Date {
    const p = placeById(placeId)!;
    const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(dt);
    if (!m) throw new Error(S.errBadDate);
    return zonedToUtc(+m[1], +m[2], +m[3], +m[4], +m[5], p.tz, p.lon);
  }
}
