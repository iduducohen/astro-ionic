import { ChangeDetectorRef, Component, ElementRef, inject, viewChild } from '@angular/core';
import { IonButton, IonCheckbox, IonInput } from '@ionic/angular';
import { MONTH_LETTER, PATHS22, SENSE_TEXT, TREE, WORLDS, sephira, sephiraForNumber, type SephiraId, type TreePath } from '../../core/tree';
import { LangService } from '../lang.service';
import { readProfile } from '../profile';
import { IntroComponent } from '../shell/intro.component';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';

@Component({
  selector: 'app-kabbalah',
  imports: [ScreenComponent, IntroComponent, WhenFieldComponent, IonButton, IonCheckbox, IonInput],
  template: `
    <app-screen [title]="lang.text().tabKabbalah">
      <app-intro page="kabbalah" [heading]="lang.lang() === 'he' ? 'תורת הקבלה' : 'Kabbalah'"></app-intro>
      <form (submit)="submit($event)" class="form-card">
        <ion-input mode="md" [label]="lang.text().name" labelPlacement="stacked" fill="outline" [value]="name" (ionInput)="name = $any($event).detail.value ?? ''"></ion-input>
        <app-when kind="date" [label]="lang.text().birthDate" [value]="birth" [max]="today" (valueChange)="birth = $event"></app-when>
        <ion-checkbox [checked]="sunset" (ionChange)="sunset = !!$any($event).detail.checked" labelPlacement="end">{{ lang.text().afterSunset }}</ion-checkbox>
        @if (error) { <p role="alert" class="err">{{ error }}</p> }
        <ion-button type="submit" expand="block" class="btn-main">{{ lang.lang() === 'he' ? 'מצא את מקומי בעץ' : 'Find my place on the tree' }}</ion-button>
        <button type="button" class="sample-link" (click)="sample()">{{ lang.lang() === 'he' ? 'רוצים לראות דוגמה? הצגת קריאה לדוגמה' : 'Want to see an example? Show a sample reading' }}</button>
      </form>
      <section class="kb-treewrap">
        <h2 class="kb-tree-title">{{ lang.lang() === 'he' ? 'עץ החיים' : 'The Tree of Life' }}</h2>
        <p class="kb-tree-lead">{{ detail
          ? (lang.lang() === 'he'
            ? '22 האותיות על הנתיבים, מספר כל ספירה, וארבעת העולמות. לחצו על אות כדי לקרוא על הנתיב.'
            : 'The 22 letters on the paths, a number on each sephira, and the four worlds. Click a letter to read the path.')
          : (lang.lang() === 'he'
            ? 'מפה של עשר ספירות. לחצו על עיגול וההסבר ייפתח בחלון. הקווים הם הנתיבים שמחברים ביניהן.'
            : 'A map of ten sephirot. Click a circle and the explanation opens in a window. The lines are the paths that join them.') }}</p>
        <button type="button" class="kb-more" [class.on]="detail" [attr.aria-pressed]="detail" (click)="detail = !detail">
          {{ detail
            ? (lang.lang() === 'he' ? 'חזרה לעץ הקצר' : 'Back to the short tree')
            : (lang.lang() === 'he' ? 'עץ מפורט' : 'Detailed tree') }}
        </button>
        <p class="kb-pillars" dir="ltr">
          <span>{{ lang.lang() === 'he' ? 'דין' : 'Severity' }}</span>
          <span>{{ lang.lang() === 'he' ? 'רחמים' : 'Balance' }}</span>
          <span>{{ lang.lang() === 'he' ? 'חסד' : 'Mercy' }}</span>
        </p>
        <svg viewBox="0 0 300 520" class="kb-tree" role="img" [attr.aria-label]="lang.lang() === 'he' ? 'עץ החיים' : 'Tree of Life'">
          @if (detail) {
            @for (p of paths; track p.n) {
              <g class="tp" [class.on]="p.letter === monthLetter" [class.sel]="p.n === pathN" role="button" tabindex="0" [attr.aria-pressed]="p.n === pathN" [attr.aria-label]="pathLabel(p)" (click)="pickPath(p.n)" (keydown.enter)="pickPath(p.n)">
                <line [attr.x1]="at(p.from).x" [attr.y1]="at(p.from).y" [attr.x2]="at(p.to).x" [attr.y2]="at(p.to).y" />
                <circle class="tp-dot" [attr.cx]="pathPoint(p).x" [attr.cy]="pathPoint(p).y" r="8" />
                <text class="tp-letter" [attr.x]="pathPoint(p).x" [attr.y]="pathPoint(p).y" dominant-baseline="central">{{ p.letter }}</text>
              </g>
            }
          } @else {
            <g class="paths">
              @for (p of paths; track p.n) {
                <line [class.on]="p.letter === monthLetter" [attr.x1]="at(p.from).x" [attr.y1]="at(p.from).y" [attr.x2]="at(p.to).x" [attr.y2]="at(p.to).y" />
              }
            </g>
          }
          @for (s of tree; track s.id) {
            <g class="ts" [class.life]="s.id === life" [class.sel]="s.id === sel" [class.named]="s.id === named && s.id !== life" role="button" tabindex="0" [attr.aria-pressed]="s.id === sel" [attr.aria-label]="s.name[lang.lang()] + ' — ' + s.meaning[lang.lang()]" (click)="open(s.id)" (keydown.enter)="open(s.id)">
              <circle class="ts-c" [attr.cx]="s.x" [attr.cy]="s.y" r="28" />
              @if (s.id === named && s.id !== life) {
                <circle class="ts-ring" [attr.cx]="s.x" [attr.cy]="s.y" r="33" />
              }
              <text class="ts-name" [attr.x]="s.x" [attr.y]="detail ? s.y - 5 : s.y" dominant-baseline="central">{{ s.name[lang.lang()] }}</text>
              @if (detail) {
                <text class="ts-num" [attr.x]="s.x" [attr.y]="s.y + 11">{{ s.n }}</text>
              }
            </g>
          }
        </svg>
        <ul class="kb-legend">
          <li><i class="lg lg-open"></i>{{ lang.lang() === 'he' ? 'העיגול הפתוח עכשיו' : 'Open now' }}</li>
          @if (life) { <li><i class="lg lg-life"></i>{{ lang.lang() === 'he' ? 'ספירת דרך החיים' : 'Life-path sephira' }}</li> }
          @if (named && named !== life) { <li><i class="lg lg-name"></i>{{ lang.lang() === 'he' ? 'ספירת השם' : 'Name sephira' }}</li> }
          @if (monthLetter) { <li><i class="lg lg-path"></i>{{ lang.lang() === 'he' ? 'נתיב חודש הלידה' : 'Birth-month path' }}</li> }
        </ul>
        @if (detail && chosenPath(); as path) {
          <p class="kb-pathnote">{{ pathLabel(path) }}@if (senseOf(path.letter); as sense) { <span> · {{ sense }}</span> }</p>
        }
        @if (detail) {
          <section class="kb-worlds">
            <h3>{{ lang.lang() === 'he' ? 'ארבעת העולמות' : 'The four worlds' }}</h3>
            <ol>
              @for (w of worlds; track w.id) {
                <li [class.on]="lifeWorld() === w.id">
                  <span class="kw-name">{{ w.name[lang.lang()] }}</span>
                  <span class="kw-level">{{ w.level[lang.lang()] }}</span>
                  <span class="kw-text">{{ w.text[lang.lang()] }}</span>
                </li>
              }
            </ol>
          </section>
        }
      </section>
      <dialog class="map-dialog" #dlg (click)="backdrop($event)">
        @if (current(); as cur) {
          <div class="map-dialog-bar">
            <h2>{{ cur.name[lang.lang()] }}</h2>
            <button type="button" class="map-close" (click)="close()" [attr.aria-label]="lang.lang() === 'he' ? 'סגירה' : 'Close'">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="map-info kb-detail">
            <div class="kb-d-head">
              <span class="kb-d-num">{{ cur.n }}</span>
              <p class="kb-d-meaning">{{ cur.meaning[lang.lang()] }}</p>
            </div>
            @if (life === cur.id) { <p class="kb-d-tag">{{ lang.lang() === 'he' ? 'ספירת דרך החיים שלך' : 'Your life-path sephira' }}</p> }
            @if (named === cur.id) { <p class="kb-d-tag">{{ lang.lang() === 'he' ? 'ספירת השם שלך' : 'Your name sephira' }}</p> }
            <p class="kb-d-theme">{{ cur.theme[lang.lang()] }}</p>
            <dl class="kb-facts">
              <div><dt>{{ lang.lang() === 'he' ? 'חוזקה' : 'Gift' }}</dt><dd>{{ cur.gift[lang.lang()] }}</dd></div>
              <div><dt>{{ lang.lang() === 'he' ? 'אתגר' : 'Challenge' }}</dt><dd>{{ cur.challenge[lang.lang()] }}</dd></div>
              <div><dt>{{ lang.lang() === 'he' ? 'עולם' : 'World' }}</dt><dd>{{ worldName(cur.world) }}</dd></div>
              <div><dt>{{ lang.lang() === 'he' ? 'כוכב' : 'Planet' }}</dt><dd>{{ cur.planet[lang.lang()] }}</dd></div>
              @if (detail) {
                <div><dt>{{ lang.lang() === 'he' ? 'שם' : 'Name' }}</dt><dd>{{ cur.divineName }}</dd></div>
                @if (cur.figure.he !== '—') {
                  <div><dt>{{ lang.lang() === 'he' ? 'דמות' : 'Figure' }}</dt><dd>{{ cur.figure[lang.lang()] }}</dd></div>
                }
                <div><dt>{{ lang.lang() === 'he' ? 'בגוף' : 'In the body' }}</dt><dd>{{ cur.body[lang.lang()] }}</dd></div>
              }
            </dl>
            @if (detail) {
              <p class="kb-d-theme">{{ lang.lang() === 'he' ? 'נתיבים שיוצאים מכאן:' : 'Paths from here:' }} {{ linkedLetters(cur.id) }}</p>
            }
            @if (letter && (life === cur.id || named === cur.id)) { <p class="kb-d-theme">{{ letter }}</p> }
          </div>
        }
      </dialog>
    </app-screen>
  `,
})
export class KabbalahPage {
  readonly lang = inject(LangService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly dlg = viewChild<ElementRef<HTMLDialogElement>>('dlg');
  readonly today = new Date().toISOString().slice(0, 10);
  readonly tree = TREE;
  readonly paths: TreePath[] = PATHS22;
  readonly worlds = WORLDS;
  name = '';
  birth = '';
  sunset = false;
  error = '';
  detail = false;
  sel: SephiraId = 'tiferet';
  life: SephiraId | null = null;
  named: SephiraId | null = null;
  letter = '';
  monthLetter = '';
  pathN: number | null = null;

  current() { return sephira(this.sel); }

  open(id: SephiraId): void {
    this.sel = id;
    this.cd.detectChanges();
    const dlg = this.dlg()?.nativeElement;
    if (dlg && !dlg.open) dlg.showModal();
  }

  close(): void {
    this.dlg()?.nativeElement.close();
  }

  backdrop(event: MouseEvent): void {
    if (event.target === this.dlg()?.nativeElement) this.close();
  }
  at(id: SephiraId) { return sephira(id); }
  seph(id: SephiraId) { return sephira(id); }
  worldName(id: string) { return WORLDS.find((w) => w.id === id)?.name[this.lang.lang()] ?? ''; }

  lifeWorld() {
    return this.life ? sephira(this.life).world : null;
  }

  pathPoint(p: TreePath) {
    const a = this.at(p.from);
    const b = this.at(p.to);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: mx + (-dy / len) * 12, y: my + (dx / len) * 12 };
  }

  pickPath(n: number): void {
    this.pathN = this.pathN === n ? null : n;
  }

  chosenPath() {
    return this.paths.find((p) => p.n === this.pathN) ?? null;
  }

  pathLabel(p: TreePath): string {
    const from = this.at(p.from).name[this.lang.lang()];
    const to = this.at(p.to).name[this.lang.lang()];
    const name = p.letterName[this.lang.lang()];
    return this.lang.lang() === 'he'
      ? `נתיב ${p.n} · ${name} · מחבר ${from} ו${to}`
      : `Path ${p.n} · ${name} · joins ${from} and ${to}`;
  }

  senseOf(letter: string): string {
    return SENSE_TEXT[letter]?.[this.lang.lang()] ?? '';
  }

  linkedLetters(id: SephiraId): string {
    return this.paths.filter((p) => p.from === id || p.to === id).map((p) => p.letter).join(' · ');
  }

  submit(event: Event): void {
    event.preventDefault();
    try {
      const p = readProfile(this.lang.text(), this.name, this.birth, this.sunset);
      this.life = sephiraForNumber(p.lifePath);
      this.named = this.name.trim() ? sephiraForNumber(p.nameNum.number) : null;
      const ml = MONTH_LETTER[p.hebrew.month.id];
      const path = PATHS22.find((x) => x.letter === ml.letter);
      this.monthLetter = ml.letter;
      this.letter = `${ml.letter} · ${ml.sense[this.lang.lang()]}${path ? ' · ' + path.letterName[this.lang.lang()] : ''}`;
      this.error = '';
      this.open(this.life);
    } catch (err) {
      this.error = (err as Error).message;
    }
  }

  sample(): void {
    this.name = 'נועה לוי';
    this.birth = '1990-03-15';
    this.sunset = false;
    this.submit(new Event('submit'));
  }
}
