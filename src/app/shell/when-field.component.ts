import { ChangeDetectorRef, Component, ElementRef, HostListener, effect, inject, input, output } from '@angular/core';
import { IonIcon } from '@ionic/angular';
import { LangService } from '../lang.service';

const MONTHS_HE = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
const MONTHS_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function pad(n: number): string { return String(n).padStart(2, '0'); }

/** מקבל 08/10/1974, 8.10.1974, 08101974 או 1974-10-08. מחזיר YYYY-MM-DD. */
export function parseTypedDate(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  let y = 0, m = 0, d = 0;
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s);
  const dmy = /^(\d{1,2})[./-](\d{1,2})[./-](\d{4})$/.exec(s);
  if (iso) { y = +iso[1]; m = +iso[2]; d = +iso[3]; }
  else if (dmy) { d = +dmy[1]; m = +dmy[2]; y = +dmy[3]; }
  else if (/^\d{8}$/.test(s)) {
    d = +s.slice(0, 2); m = +s.slice(2, 4); y = +s.slice(4);
    if (!realDate(y, m, d)) { y = +s.slice(0, 4); m = +s.slice(4, 6); d = +s.slice(6); }
  } else return null;
  return realDate(y, m, d) ? `${y}-${pad(m)}-${pad(d)}` : null;
}

function realDate(y: number, m: number, d: number): boolean {
  if (y < 1800 || y > 2200 || m < 1 || m > 12 || d < 1) return false;
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : '';
}

/** מקבל 14:30, 9:05 או 1430. מחזיר HH:MM. */
export function parseTypedTime(raw: string): string | null {
  const s = raw.trim();
  if (!s) return null;
  const c = /^(\d{1,2})[:.](\d{2})$/.exec(s);
  let h = 0, mi = 0;
  if (c) { h = +c[1]; mi = +c[2]; }
  else if (/^\d{3,4}$/.test(s)) {
    const p = s.padStart(4, '0');
    h = +p.slice(0, 2); mi = +p.slice(2);
  } else return null;
  if (h > 23 || mi > 59) return null;
  return `${pad(h)}:${pad(mi)}`;
}

interface DayCell { iso: string; n: number; outside: boolean; disabled: boolean }

@Component({
  selector: 'app-when',
  imports: [IonIcon],
  template: `
    <div class="when" [class.open]="open" [class.bad]="invalid" [class.off]="disabled()">
      <div class="when-box">
        <span class="when-label">{{ label() }}</span>
        <input type="text" [attr.inputmode]="kind() === 'time' ? 'numeric' : 'text'" autocomplete="off"
          [attr.placeholder]="placeholder()" [attr.aria-label]="label()" [disabled]="disabled()"
          [value]="text" (input)="onType($event)" (blur)="onBlur($event)" />
        <button type="button" class="when-btn" [disabled]="disabled()" (click)="toggle($event)"
          [attr.aria-expanded]="open" [attr.aria-label]="kind() === 'date' ? (he() ? 'פתיחת לוח שנה' : 'Open calendar') : (he() ? 'פתיחת בחירת שעה' : 'Open time picker')">
          <ion-icon [name]="kind() === 'date' ? 'calendar-outline' : 'time-outline'" aria-hidden="true"></ion-icon>
        </button>
      </div>
      @if (invalid) {
        <p class="when-err">{{ kind() === 'date' ? (he() ? 'תאריך לא תקין. לדוגמה 08/10/1974' : 'Not a valid date. For example 08/10/1974') : (he() ? 'שעה לא תקינה. לדוגמה 14:30' : 'Not a valid time. For example 14:30') }}</p>
      }
      @if (open && kind() === 'date') {
        <div class="when-pop" [attr.style]="popStyle" (mousedown)="$event.preventDefault()">
          <div class="cal-head">
            <button type="button" class="cal-nav" (click)="shift(-1)" [attr.aria-label]="he() ? 'חודש קודם' : 'Previous month'">‹</button>
            <strong>{{ monthLabel() }} {{ year }}</strong>
            <button type="button" class="cal-nav" (click)="shift(1)" [attr.aria-label]="he() ? 'חודש הבא' : 'Next month'">›</button>
          </div>
          <div class="cal-grid cal-week">
            @for (d of weekdays(); track d) { <span>{{ d }}</span> }
          </div>
          <div class="cal-grid">
            @for (day of cells(); track day.iso) {
              <button type="button" [class.out]="day.outside" [class.on]="day.iso === picked()" [class.today]="day.iso === today"
                [disabled]="day.disabled" (click)="pickDay(day)">{{ day.n }}</button>
            }
          </div>
        </div>
      }
      @if (open && kind() === 'time') {
        <div class="when-pop" [attr.style]="popStyle" (mousedown)="$event.preventDefault()">
          <p class="clock-now">{{ clockFace() }}</p>
          <div class="clock">
            <div>
              <h4>{{ he() ? 'שעה' : 'Hour' }}</h4>
              <div class="clock-col">
                @for (h of hours; track h) {
                  <button type="button" [class.on]="h === hourOf()" (click)="pickHour(h)">{{ h }}</button>
                }
              </div>
            </div>
            <div>
              <h4>{{ he() ? 'דקות' : 'Minute' }}</h4>
              <div class="clock-col">
                @for (m of minutes(); track m) {
                  <button type="button" [class.on]="m === minuteOf()" (click)="pickMinute(m)">{{ m }}</button>
                }
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class WhenFieldComponent {
  readonly kind = input.required<'date' | 'time'>();
  readonly label = input('');
  readonly value = input('');
  readonly min = input('');
  readonly max = input('');
  readonly disabled = input(false);
  readonly valueChange = output<string>();

  private readonly lang = inject(LangService);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly cd = inject(ChangeDetectorRef);
  text = '';
  open = false;
  invalid = false;
  year = new Date().getFullYear();
  month = new Date().getMonth();
  popStyle = '';
  private unlistenScroll: (() => void) | null = null;
  readonly today = new Date().toISOString().slice(0, 10);
  readonly hours = Array.from({ length: 24 }, (_, i) => pad(i));
  private editing = false;

  constructor() {
    effect(() => {
      const v = this.value();
      this.kind();
      if (this.editing) return;
      this.text = this.kind() === 'date' ? formatDate(v) : (parseTypedTime(v) ?? '');
      if (this.kind() === 'date' && v) {
        const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
        if (p) { this.year = +p[1]; this.month = +p[2] - 1; }
      }
    });
  }

  he(): boolean { return this.lang.lang() === 'he'; }
  placeholder(): string { return this.kind() === 'date' ? '08/10/1974' : '14:30'; }
  weekdays(): string[] { return this.he() ? ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'] : ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']; }
  monthLabel(): string { return (this.he() ? MONTHS_HE : MONTHS_EN)[this.month]; }

  picked(): string { return this.kind() === 'date' ? (parseTypedDate(this.text) ?? '') : ''; }
  hourOf(): string { return parseTypedTime(this.text)?.slice(0, 2) ?? ''; }
  minuteOf(): string { return parseTypedTime(this.text)?.slice(3) ?? ''; }
  clockFace(): string { return parseTypedTime(this.text) ?? (this.he() ? 'בחרו שעה' : 'Choose a time'); }

  minutes(): string[] {
    const list = Array.from({ length: 12 }, (_, i) => pad(i * 5));
    const cur = parseTypedTime(this.text);
    if (cur && !list.includes(cur.slice(3))) list.push(cur.slice(3));
    return list.sort();
  }

  cells(): DayCell[] {
    const y = this.year, m = this.month;
    const first = new Date(y, m, 1).getDay();
    const count = new Date(y, m + 1, 0).getDate();
    const out: DayCell[] = [];
    for (let i = first; i > 0; i--) out.push(this.cell(new Date(y, m, 1 - i), true));
    for (let n = 1; n <= count; n++) out.push(this.cell(new Date(y, m, n), false));
    let extra = 1;
    while (out.length < 42) out.push(this.cell(new Date(y, m + 1, extra++), true));
    return out;
  }

  onType(event: Event): void {
    this.editing = true;
    this.text = (event.target as HTMLInputElement).value;
    this.invalid = false;
    const parsed = this.kind() === 'date' ? parseTypedDate(this.text) : parseTypedTime(this.text);
    if (parsed) {
      this.text = this.kind() === 'date' ? formatDate(parsed) : parsed;
      this.emit(parsed);
    } else if (!this.text.trim()) this.emit('');
  }

  onBlur(event: FocusEvent): void {
    this.editing = false;
    const raw = (event.target as HTMLInputElement).value.trim();
    this.text = raw;
    if (!raw) { this.invalid = false; this.text = ''; this.emit(''); return; }
    const parsed = this.kind() === 'date' ? parseTypedDate(raw) : parseTypedTime(raw);
    if (!parsed || !this.inRange(parsed)) { this.invalid = true; return; }
    this.invalid = false;
    this.text = this.kind() === 'date' ? formatDate(parsed) : parsed;
    this.emit(parsed);
  }

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled()) return;
    this.open = !this.open;
    if (!this.open) { this.unlistenScroll?.(); return; }
    setTimeout(() => { this.place(); setTimeout(() => this.place()); void this.followScroll(); });
    if (this.kind() === 'date') {
      const iso = parseTypedDate(this.text) || this.value();
      const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
      if (p) { this.year = +p[1]; this.month = +p[2] - 1; }
    } else {
      setTimeout(() => {
        this.host.nativeElement.querySelectorAll('.clock-col .on').forEach((el: Element) => {
          (el as HTMLElement).scrollIntoView({ block: 'center' });
        });
      });
    }
  }

  shift(delta: number): void {
    const d = new Date(this.year, this.month + delta, 1);
    this.year = d.getFullYear();
    this.month = d.getMonth();
  }

  pickDay(day: DayCell): void {
    if (day.disabled) return;
    this.editing = false;
    this.invalid = false;
    this.text = formatDate(day.iso);
    this.open = false;
    const p = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day.iso)!;
    this.year = +p[1]; this.month = +p[2] - 1;
    this.emit(day.iso);
  }

  pickHour(h: string): void {
    const mi = parseTypedTime(this.text)?.slice(3) ?? '00';
    this.commitTime(`${h}:${mi}`, false);
  }

  pickMinute(m: string): void {
    const h = parseTypedTime(this.text)?.slice(0, 2) ?? '12';
    this.commitTime(`${h}:${m}`, true);
  }

  @HostListener('window:resize')
  onResize(): void { if (this.open) this.place(); }

  @HostListener('document:click', ['$event'])
  onDoc(event: MouseEvent): void {
    if (!this.open) return;
    if (!this.host.nativeElement.contains(event.target as Node)) {
      this.open = false;
      this.unlistenScroll?.();
    }
  }

  private async followScroll(): Promise<void> {
    this.unlistenScroll?.();
    const ion = this.host.nativeElement.closest('ion-content') as { getScrollElement?: () => Promise<HTMLElement> } | null;
    const el = await ion?.getScrollElement?.();
    if (!el || !this.open) return;
    const close = () => { this.open = false; this.unlistenScroll?.(); };
    el.addEventListener('scroll', close, { passive: true });
    this.unlistenScroll = () => el.removeEventListener('scroll', close);
  }

  private commitTime(value: string, close: boolean): void {
    this.editing = false;
    this.invalid = false;
    this.text = value;
    if (close) this.open = false;
    this.emit(value);
  }

  private place(): void {
    const box = this.host.nativeElement.querySelector('.when-box') as HTMLElement | null;
    if (!box) return;
    const pop = this.host.nativeElement.querySelector('.when-pop') as HTMLElement | null;
    const r = box.getBoundingClientRect();
    const width = Math.min(320, window.innerWidth - 16);
    const rtl = document.documentElement.dir === 'rtl';
    let left = rtl ? r.right - width : r.left;
    left = Math.max(8, Math.min(left, window.innerWidth - width - 8));
    const height = pop?.offsetHeight || (this.kind() === 'date' ? 372 : 360);
    let top = r.bottom + 6;
    if (top + height > window.innerHeight - 8) top = Math.max(8, r.top - height - 6);
    this.popStyle = `top:${top}px;left:${left}px;width:${width}px`;
    this.cd.detectChanges();
  }

  private emit(value: string): void {
    if (value !== this.value()) this.valueChange.emit(value);
  }

  private inRange(iso: string): boolean {
    if (this.kind() !== 'date') return true;
    if (this.min() && iso < this.min()) return false;
    if (this.max() && iso > this.max()) return false;
    return true;
  }

  private cell(d: Date, outside: boolean): DayCell {
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return { iso, n: d.getDate(), outside, disabled: !this.inRange(iso) };
  }
}
