import { Component, inject } from '@angular/core';
import { IonInput } from '@ionic/angular';
import { deepCompat, type DeepCompat } from '../../core/compat-deep';
import { pageUrlForShare } from '../../core/seo';
import { LangService } from '../lang.service';
import { readProfile } from '../profile';
import { IntroComponent } from '../shell/intro.component';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';

@Component({
  selector: 'app-compat',
  imports: [ScreenComponent, IntroComponent, WhenFieldComponent, IonInput],
  template: `
    <app-screen [title]="lang.text().tabPair">
      <div class="love">
        <div class="love-hero" aria-hidden="true">
          <svg viewBox="0 0 420 176">
            <g fill="none" stroke="var(--love)" stroke-linecap="round">
              <path d="M78 34 Q 28 88 78 142" stroke-width="3.2"/>
              <path d="M78 34 L 78 142" stroke-width="1.5"/>
            </g>
            <g class="lh-arrow">
              <line x1="78" y1="88" x2="196" y2="74" stroke="var(--love)" stroke-width="2.4" stroke-linecap="round"/>
              <path fill="var(--love)" d="M196 74 l-16 -1.5 5.5 11 z"/>
              <path fill="none" stroke="var(--love)" stroke-width="1.8" stroke-linecap="round" d="M86 82 l-12 9 M92 94 l-8 13"/>
            </g>
            <g transform="translate(214, 38) scale(3.15)">
              <g class="lh-heart">
                <path fill="var(--love)" d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>
              </g>
            </g>
            <g transform="translate(286, 62) scale(2.25)">
              <g class="lh-heart lh-b">
                <path fill="var(--love-2)" d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54z"/>
              </g>
            </g>
          </svg>
          @for (k of floatHearts; track k) {
            <span class="float-heart" [style.--k]="k">♥</span>
          }
        </div>
        <app-intro page="pair" [heading]="lang.lang() === 'he' ? 'התאמה זוגית' : 'Compatibility'"></app-intro>
        <form (submit)="submit($event)" class="love-form">
          <div class="form-card love-card">
            <h2 class="section-label">{{ lang.text().you }}</h2>
            <ion-input mode="md" [label]="lang.text().name" labelPlacement="stacked" fill="outline" [value]="aName" (ionInput)="aName = $any($event).detail.value ?? ''"></ion-input>
            <app-when kind="date" [label]="lang.text().birthDate" [value]="aBirth" (valueChange)="aBirth = $event"></app-when>
          </div>
          <div class="love-link" aria-hidden="true"><span>♥</span></div>
          <div class="form-card love-card">
            <h2 class="section-label">{{ lang.text().partner }}</h2>
            <ion-input mode="md" [label]="lang.text().name" labelPlacement="stacked" fill="outline" [value]="bName" (ionInput)="bName = $any($event).detail.value ?? ''"></ion-input>
            <app-when kind="date" [label]="lang.text().birthDate" [value]="bBirth" (valueChange)="bBirth = $event"></app-when>
          </div>
          @if (error) { <p role="alert" class="err">{{ error }}</p> }
          <button type="submit" class="love-btn">{{ lang.text().checkMatch }}</button>
          <button type="button" class="sample-link" (click)="sample()">{{ lang.lang() === 'he' ? 'רוצים לראות דוגמה? הצגת התאמה לדוגמה' : 'Want to see an example? Show a sample match' }}</button>
        </form>
        @if (result; as r) {
          <section class="love-result" aria-live="polite">
            <div class="burst" aria-hidden="true">
              @for (k of burst; track k) { <span [style.--k]="k">♥</span> }
            </div>
            <p class="love-names">{{ aName }} · {{ bName }}</p>
            <svg class="score-heart" viewBox="0 0 200 180" role="img" [attr.aria-label]="r.total + '%'">
              <defs>
                <clipPath id="pair-heart">
                  <path d="M100 168C28 118 8 78 42 48 64 28 88 36 100 58 112 36 136 28 158 48 192 78 172 118 100 168Z"/>
                </clipPath>
              </defs>
              <path class="sh-line" d="M100 168C28 118 8 78 42 48 64 28 88 36 100 58 112 36 136 28 158 48 192 78 172 118 100 168Z"/>
              <g clip-path="url(#pair-heart)">
                <rect class="sh-bg" width="200" height="180"/>
                <rect class="sh-fill" width="200" [attr.y]="180 - fill(r.total)" [attr.height]="fill(r.total)" style="--h: 100%"/>
              </g>
              <text class="sh-num" x="100" y="112">{{ r.total }}%</text>
            </svg>
            <h2 class="headline">{{ r.couple.title[lang.lang()] }}</h2>
            <p class="love-summary">{{ r.couple.text[lang.lang()] }}</p>
            <ul class="love-parts">
              @for (g of r.groups; track g.id) {
                <li>
                  <div class="lp-top"><span class="lp-label">{{ g.label[lang.lang()] }}</span><span class="lp-score">{{ g.score }}%</span></div>
                  <div class="lp-bar"><i [style.width.%]="g.score"></i></div>
                </li>
              }
              @for (p of r.params; track p.key) {
                <li>
                  <div class="lp-top"><span class="lp-label">{{ p.label[lang.lang()] }}</span><span class="lp-score">{{ p.score }}%</span></div>
                  <p class="lp-detail">{{ p.detail[lang.lang()] }}</p>
                  <div class="lp-bar"><i [style.width.%]="p.score"></i></div>
                  <p class="lp-info">{{ p.text[lang.lang()] }}</p>
                </li>
              }
            </ul>
            <button type="button" class="link-btn love-sample" (click)="share(r)">{{ lang.lang() === 'he' ? 'שיתוף' : 'Share' }}</button>
          </section>
        }
      </div>
    </app-screen>
  `,
})
export class CompatPage {
  readonly lang = inject(LangService);
  readonly floatHearts = [0, 1, 2, 3, 4, 5];
  readonly burst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  aName = '';
  aBirth = '';
  bName = '';
  bBirth = '';
  error = '';
  result: DeepCompat | null = null;

  fill(score: number): number {
    return Math.round(180 * score / 100);
  }

  submit(event: Event): void {
    event.preventDefault();
    try {
      const S = this.lang.text();
      const a = readProfile(S, this.aName, this.aBirth);
      const b = readProfile(S, this.bName, this.bBirth);
      this.result = deepCompat(a, b);
      this.error = '';
    } catch (err) {
      this.result = null;
      this.error = (err as Error).message;
    }
  }

  sample(): void {
    const he = this.lang.lang() === 'he';
    this.aName = he ? 'נועה' : 'Noa';
    this.aBirth = '1990-03-15';
    this.bName = he ? 'דניאל' : 'Daniel';
    this.bBirth = '1988-07-22';
    this.submit(new Event('submit'));
  }

  async share(r: DeepCompat): Promise<void> {
    const lang = this.lang.lang();
    const url = pageUrlForShare(lang);
    const text = `${r.total}% · ${r.couple.title[lang]}\n${r.couple.text[lang]}${url ? `\n${url}` : ''}`;
    try {
      if (navigator.share) await navigator.share({ title: this.lang.text().tabPair, text });
      else await navigator.clipboard.writeText(text);
    } catch { /* בוטל */ }
  }
}
