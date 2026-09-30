import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { IonButton, IonCheckbox, IonInput } from '@ionic/angular';
import { drawCards, type DrawnCard } from '../../core';
import { DEEP, SPREADS, TOPICS, readSpread, type DeepSpread, type SpreadReading, type Topic } from '../../core/tarot-deep';
import { LangService } from '../lang.service';
import { IntroComponent } from '../shell/intro.component';
import { ScreenComponent } from '../shell/screen.component';

type Phase = 'idle' | 'shuffling' | 'dealt';

@Component({
  selector: 'app-tarot',
  imports: [ScreenComponent, IntroComponent, IonButton, IonCheckbox, IonInput],
  template: `
    <app-screen [title]="lang.text().tabTarot">
      <app-intro page="tarot" [heading]="lang.lang() === 'he' ? 'קלפי טארוט' : 'Tarot'"></app-intro>
      <form (submit)="draw($event)" class="form-card">
        <ion-input mode="md" [label]="lang.text().question" labelPlacement="stacked" fill="outline" [value]="question" (ionInput)="question = $any($event).detail.value ?? ''"></ion-input>
        <div class="tp-field">
          <span class="muted">{{ lang.lang() === 'he' ? 'פריסה' : 'Spread' }}</span>
          <div class="tp-spreads">
            @for (item of spreads; track item) {
              <button type="button" [class.on]="spread === item" (click)="spread = item">
                <b>{{ spreadInfo(item).label[lang.lang()] }}</b>
                <span>{{ spreadInfo(item).desc[lang.lang()] }}</span>
              </button>
            }
          </div>
        </div>
        <div class="tp-field">
          <span class="muted">{{ lang.lang() === 'he' ? 'נושא' : 'Topic' }}</span>
          <div class="seg2">
            @for (topic of topics; track topic.id) {
              <button type="button" [class.on]="chosen === topic.id" (click)="chosen = topic.id">{{ topic.label[lang.lang()] }}</button>
            }
          </div>
        </div>
        <ion-checkbox [checked]="allowRev" (ionChange)="allowRev = !!$any($event).detail.checked" labelPlacement="end">
          {{ lang.lang() === 'he' ? 'לכלול קלפים הפוכים' : 'Include reversed cards' }}
        </ion-checkbox>
        <ion-button type="submit" expand="block" class="btn-main" [disabled]="phase === 'shuffling'">
          {{ lang.lang() === 'he' ? 'ערבוב ומשיכה' : 'Shuffle and draw' }}
        </ion-button>
      </form>

      <div class="table">
        @if (phase !== 'dealt') {
          <div class="deck" [class.shuffling]="phase === 'shuffling'" aria-hidden="true">
            @for (i of pile; track i) {
              <span class="dcard card-back" [style.--i]="i">✦</span>
            }
            <span class="deck-count">22</span>
          </div>
        } @else {
          <div class="spread dealing" [class.n1]="cards.length === 1" [class.n3]="cards.length === 3" [class.n4]="cards.length === 4" [class.n5]="cards.length === 5">
            @for (card of cards; track $index; let i = $index) {
              <div class="slot deal" [style.--d]="i * 0.14 + 's'">
                <p class="pos">{{ positions()[i].name[lang.lang()] }}</p>
                <button type="button" class="tcard" [class.open]="open[i]" [class.rev]="card.reversed && open[i]" (click)="flip(i)" [attr.aria-pressed]="open[i]" [attr.aria-label]="open[i] ? card.card.name[lang.lang()] : (lang.lang() === 'he' ? 'הפיכת הקלף' : 'Turn the card')">
                  <span class="inner">
                    <span class="face back">✦</span>
                    <span class="face front">
                      <span class="art">
                        @if (card.reversed) { <span class="rev-badge">{{ lang.lang() === 'he' ? 'הפוך' : 'Reversed' }}</span> }
                        <span class="roman">{{ card.card.roman }}</span>
                        <span class="glyph">{{ card.card.glyph }}</span>
                        <span class="cname">{{ card.card.name[lang.lang()] }}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </div>
            }
          </div>
        }
        <p class="table-status">{{ status() }}</p>
      </div>

      @if (phase === 'dealt') {
        @for (card of cards; track $index; let i = $index) {
          @if (open[i]) {
            <article class="tr-card reading-in">
              <div class="tr-head">
                <span class="tr-num">{{ card.card.roman }}</span>
                <div>
                  <p class="tr-pos">{{ positions()[i].name[lang.lang()] }}</p>
                  <h3 class="tr-name">{{ card.card.name[lang.lang()] }}</h3>
                  <p class="tr-kw">{{ card.card.keywords[lang.lang()] }}</p>
                </div>
              </div>
              <p class="tr-posmeaning">{{ positions()[i].meaning[lang.lang()] }}</p>
              <div class="tr-sec tr-main">
                <p>{{ card.reversed ? card.card.reversed[lang.lang()] : card.card.upright[lang.lang()] }}</p>
                <p>{{ focus(card) }}</p>
              </div>
              <div class="tr-sec tr-advice">
                <h4>{{ lang.lang() === 'he' ? 'עצה' : 'Advice' }}</h4>
                <p>{{ deep(card).advice[lang.lang()] }}</p>
              </div>
            </article>
          }
        }
        @if (allOpen() && reading) {
          <article class="tr-card reading-in">
            <div class="tr-head">
              <span class="tr-num">{{ reading.quintessence.n }}</span>
              <div>
                <p class="tr-pos">{{ lang.lang() === 'he' ? 'תמצית הפריסה' : 'Quintessence' }}</p>
                <h3 class="tr-name">{{ reading.quintessence.name[lang.lang()] }}</h3>
              </div>
            </div>
            <div class="tr-sec tr-main">
              <p>{{ reading.summary[lang.lang()] }}</p>
              <p>{{ reading.quintessence.essence[lang.lang()] }}</p>
            </div>
          </article>
        }
      }
    </app-screen>
  `,
})
export class TarotPage implements OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  readonly lang = inject(LangService);
  readonly spreads: DeepSpread[] = ['one', 'three', 'love', 'five'];
  readonly topics = TOPICS;
  readonly pile = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  question = '';
  spread: DeepSpread = 'three';
  chosen: Topic = 'general';
  allowRev = true;
  phase: Phase = 'idle';
  cards: DrawnCard[] = [];
  open: boolean[] = [];
  reading: SpreadReading | null = null;
  private timer = 0;

  ngOnDestroy(): void {
    window.clearTimeout(this.timer);
  }

  spreadInfo(id: DeepSpread) { return SPREADS[id]; }
  positions() { return SPREADS[this.spread].positions; }
  deep(card: DrawnCard) { return DEEP[card.card.n]; }

  focus(card: DrawnCard): string {
    const d = this.deep(card);
    const lang = this.lang.lang();
    if (card.reversed) return d.rev[lang];
    if (this.chosen === 'love') return d.love[lang];
    if (this.chosen === 'work') return d.work[lang];
    if (this.chosen === 'self') return d.self[lang];
    return d.essence[lang];
  }

  allOpen(): boolean {
    return this.open.length > 0 && this.open.every(Boolean);
  }

  status(): string {
    const he = this.lang.lang() === 'he';
    if (this.phase === 'shuffling') return he ? 'מערבים את החפיסה…' : 'Shuffling the deck…';
    if (this.phase === 'dealt' && !this.open.some(Boolean)) return he ? 'לחצו על קלף כדי להפוך אותו' : 'Tap a card to turn it over';
    if (this.phase === 'dealt' && !this.allOpen()) return he ? 'לחצו על שאר הקלפים' : 'Turn the remaining cards';
    if (this.phase === 'dealt') return he ? 'כל הקלפים פתוחים' : 'Every card is open';
    return he ? 'החפיסה מוכנה. ערבבו ומשכו.' : 'The deck is ready. Shuffle and draw.';
  }

  flip(index: number): void {
    if (this.phase !== 'dealt' || this.open[index]) return;
    this.open = this.open.map((value, i) => i === index || value);
  }

  draw(event: Event): void {
    event.preventDefault();
    window.clearTimeout(this.timer);
    this.cards = [];
    this.open = [];
    this.reading = null;
    this.phase = 'shuffling';
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.timer = window.setTimeout(() => {
      const n = SPREADS[this.spread].positions.length;
      this.cards = drawCards(n, this.allowRev);
      this.open = this.cards.map(() => false);
      this.reading = readSpread(this.cards, this.spread);
      this.phase = 'dealt';
      this.cdr.detectChanges();
    }, reduce ? 0 : 1900);
  }
}
