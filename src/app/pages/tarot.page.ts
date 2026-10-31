import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton, IonCheckbox, IonInput } from '@ionic/angular';
import { drawCards, MAJOR_ARCANA, type DrawnCard, type L, type TarotCard } from '../../core';
import { DEEP, SPREADS, TOPICS, cardMeta, readSpread, type DeepSpread, type SpreadReading, type Topic } from '../../core/tarot-deep';
import { SANCTUARY, dailyCardIndex, dayStamp, type SanctuaryPrompt } from '../../core/tarot-sanctuary';
import { LangService } from '../lang.service';
import { ScreenComponent } from '../shell/screen.component';

type Phase = 'idle' | 'shuffling' | 'dealt';
type SanctuaryTab = 'read' | 'how' | 'faq' | 'space';

const JOURNEY_KEY = 'astro.tarot.journey';
const DAILY_KEY = 'astro.tarot.daily';

@Component({
  selector: 'app-tarot',
  imports: [ScreenComponent, RouterLink, IonButton, IonCheckbox, IonInput],
  template: `
    <app-screen [title]="lang.text().tabTarot">
      <div class="sanctuary">
        <nav class="s-tabs" [attr.aria-label]="isHe ? 'מדורי הטארוט' : 'Tarot sections'">
          <button type="button" [class.on]="tab === 'read'" (click)="setTab('read')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="3" width="11" height="16" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="8" y="5" width="11" height="16" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
            <span>{{ isHe ? 'פתיחה' : 'A draw' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'how'" (click)="setTab('how')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="7" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="17" r="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 7h10M8 17h10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            <span>{{ isHe ? 'איך זה עובד' : 'How it works' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'faq'" (click)="setTab('faq')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.8-1.2 1.6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="11.5" cy="16.2" r=".8" fill="currentColor"/></svg>
            <span>{{ isHe ? 'שאלות נפוצות' : 'Questions' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'space'" (click)="setTab('space')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h10a3 3 0 0 1 3 3V19H8a3 3 0 0 0-3 3z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M5 5.5A3 3 0 0 1 8 8.5H18" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
            <span>{{ isHe ? 'ספריית הקלפים' : 'Card library' }}</span>
          </button>
        </nav>

        @if (tab === 'read') {
        <header class="s-hero">
          <div class="sky" aria-hidden="true">
            @for (i of stars; track i) {
              <span class="star" [style.--n]="i"></span>
            }
            <div class="orbit">
              <span>♈︎</span><span>♉︎</span><span>♊︎</span><span>♋︎</span><span>♌︎</span><span>♍︎</span>
              <span>♎︎</span><span>♏︎</span><span>♐︎</span><span>♑︎</span><span>♒︎</span><span>♓︎</span>
            </div>
          </div>
          <p class="s-kicker">✦ {{ txt(sanctuary.kicker) }}</p>
          <h1>{{ txt(sanctuary.title) }}</h1>
          <p class="s-lead">{{ txt(sanctuary.lead) }}</p>
          <div class="s-jump">
            <button type="button" (click)="go('tarot-draw')">{{ isHe ? 'לפתיחת קלפים' : 'Open the cards' }}</button>
            <button type="button" class="ghost" (click)="go('tarot-daily')">{{ isHe ? 'קלף היום' : 'Today’s card' }}</button>
          </div>
        </header>

        <section class="s-panel s-daily" id="tarot-daily">
          <div class="s-daily-copy">
            <p class="s-kicker">☽ {{ isHe ? 'הקלף של היום' : 'Today’s card' }}</p>
            <h2>{{ isHe ? 'אותו קלף עד חצות' : 'The same card until midnight' }}</h2>
            <p class="s-note">{{ journeyLine() }}</p>
            @if (dailyOpen) {
              <p class="s-name">{{ txt(daily.name) }}</p>
              <p class="s-kw">{{ txt(daily.keywords) }}</p>
              <p>{{ txt(daily.upright) }}</p>
              <div class="s-practice">
                <p class="s-practice-kind">{{ txt(practice.kind) }}</p>
                <p>{{ txt(practice.text) }}</p>
              </div>
              <div class="s-share">
                <a class="s-share-wa" [href]="waHref()" target="_blank" rel="noopener noreferrer">{{ isHe ? 'שיתוף בוואטסאפ' : 'Share on WhatsApp' }}</a>
                <button type="button" class="ghost" (click)="copyDaily()">{{ copied ? (isHe ? 'הועתק' : 'Copied') : (isHe ? 'העתקת הטקסט' : 'Copy text') }}</button>
              </div>
            } @else {
              <p>{{ isHe ? 'פותחים את הקלף, קוראים את המסר, ולוקחים תרגול של דקה.' : 'Open the card, read the message, and take a one-minute practice.' }}</p>
            }
          </div>
          <button type="button" class="tcard s-daily-card" [class.open]="dailyOpen" (click)="revealDaily()" [attr.aria-pressed]="dailyOpen" [attr.aria-label]="dailyOpen ? txt(daily.name) : (isHe ? 'פתיחת קלף היום' : 'Open today’s card')">
            <span class="inner">
              <span class="face back">✦</span>
              <span class="face front">
                <img class="card-art" [src]="art(daily.n)" alt="" />
                <span class="plate">{{ txt(daily.name) }}</span>
              </span>
            </span>
          </button>
        </section>

        <form id="tarot-draw" (submit)="draw($event)" class="form-card s-form">
          <p class="s-kicker">✦ {{ isHe ? 'פתיחה' : 'A draw' }}</p>
          <h2>{{ isHe ? 'כתבו שאלה' : 'Write a question' }}</h2>
          <p class="s-prompt-lead">{{ isHe ? 'אין ניסוח? לחיצה על משפט ממלאת אותו בשדה, ואפשר לשנות.' : 'No wording yet? Tap a sentence to fill the field. You can edit it.' }}</p>
          <div class="s-prompts">
            @for (prompt of sanctuary.prompts; track prompt.label.en) {
              <button type="button" (click)="usePrompt(prompt)">{{ txt(prompt.label) }}</button>
            }
          </div>
          <ion-input mode="md" [label]="lang.text().question" labelPlacement="stacked" fill="outline" [value]="question" (ionInput)="question = $any($event).detail.value ?? ''"></ion-input>
          <div class="tp-field">
            <span class="muted">{{ isHe ? 'פריסה' : 'Spread' }}</span>
            <div class="tp-spreads">
              @for (item of spreads; track item) {
                <button type="button" [class.on]="spread === item" (click)="spread = item">
                  <b>{{ txt(spreadInfo(item).label) }}</b>
                  <span>{{ txt(spreadInfo(item).desc) }}</span>
                </button>
              }
            </div>
          </div>
          <div class="tp-field">
            <span class="muted">{{ isHe ? 'נושא' : 'Topic' }}</span>
            <div class="s-topics">
              @for (topic of topics; track topic.id) {
                <button type="button" [class.on]="chosen === topic.id" (click)="chosen = topic.id">
                  @switch (topic.id) {
                    @case ('love') {
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>
                    }
                    @case ('work') {
                      <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="8" width="18" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M8 8V6.5A2.5 2.5 0 0 1 10.5 4h3A2.5 2.5 0 0 1 16 6.5V8M3 13h18" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>
                    }
                    @case ('self') {
                      <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M6 19c1.2-2.6 3.2-4 6-4s4.8 1.4 6 4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                    }
                    @default {
                      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5l1.4 4.2L18 9l-4.6 1.3L12 14.5l-1.4-4.2L6 9l4.6-1.3z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M18 14.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" fill="currentColor"/></svg>
                    }
                  }
                  <b>{{ txt(topic.label) }}</b>
                </button>
              }
            </div>
          </div>
          <div class="rev-row">
            <ion-checkbox [checked]="allowRev" (ionChange)="allowRev = !!$any($event).detail.checked" labelPlacement="end">
              {{ isHe ? 'לכלול קלפים הפוכים' : 'Include reversed cards' }}
            </ion-checkbox>
            <span class="tip-wrap">
              <button type="button" class="qmark" (click)="revTip = !revTip" [attr.aria-expanded]="revTip" [attr.aria-label]="isHe ? 'מה זה קלף הפוך' : 'What a reversed card means'">?</button>
              <span class="tip" role="tooltip" [class.show]="revTip">{{ txt(sanctuary.reversedHelp) }}</span>
            </span>
          </div>
          <ion-button type="submit" expand="block" class="btn-main" [disabled]="phase === 'shuffling'">
            {{ isHe ? 'ערבוב ומשיכה' : 'Shuffle and draw' }}
          </ion-button>
        </form>

        <div class="table" id="tarot-table" [class.ritual]="phase === 'shuffling'">
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
                <div class="slot deal" [style.--d]="i * 0.34 + 's'">
                  <p class="pos">{{ txt(positions()[i].name) }}</p>
                  <button type="button" class="tcard" [class.open]="open[i]" [class.rev]="card.reversed && open[i]" (click)="flip(i)" [attr.aria-pressed]="open[i]" [attr.aria-label]="open[i] ? txt(card.card.name) : (isHe ? 'הפיכת הקלף' : 'Turn the card')">
                    <span class="inner">
                      <span class="face back">✦</span>
                      <span class="face front">
                        <img class="card-art" [class.upsidedown]="card.reversed" [src]="art(card.card.n)" alt="" />
                        @if (card.reversed) { <span class="rev-badge">{{ isHe ? 'הפוך' : 'Reversed' }}</span> }
                        <span class="plate">{{ txt(card.card.name) }}</span>
                      </span>
                    </span>
                  </button>
                </div>
              }
            </div>
          }
          <p class="table-status" [class.ritual-line]="phase === 'shuffling'">{{ status() }}</p>
        </div>

        @if (phase === 'dealt') {
          @for (card of cards; track $index; let i = $index) {
            @if (open[i]) {
              <article class="tr-card reading-in">
                <div class="tr-head">
                  <span class="tr-num">{{ card.card.roman }}</span>
                  <div>
                    <p class="tr-pos">{{ txt(positions()[i].name) }}</p>
                    <h3 class="tr-name">{{ txt(card.card.name) }}</h3>
                    <p class="tr-kw">{{ txt(card.card.keywords) }}</p>
                  </div>
                </div>
                <p class="tr-posmeaning">{{ txt(positions()[i].meaning) }}</p>
                <div class="tr-sec tr-main">
                  <p>{{ card.reversed ? txt(card.card.reversed) : txt(card.card.upright) }}</p>
                  <p>{{ focus(card) }}</p>
                </div>
                <div class="tr-sec tr-advice">
                  <h4>{{ isHe ? 'עצה' : 'Advice' }}</h4>
                  <p>{{ txt(deep(card).advice) }}</p>
                </div>
              </article>
            }
          }
          @if (allOpen() && reading) {
            <article class="tr-card reading-in">
              <div class="tr-head">
                <span class="tr-num">{{ reading.quintessence.n }}</span>
                <div>
                  <p class="tr-pos">{{ isHe ? 'תמצית הפריסה' : 'Quintessence' }}</p>
                  <h3 class="tr-name">{{ txt(reading.quintessence.name) }}</h3>
                </div>
              </div>
              <div class="tr-sec tr-main">
                <p>{{ txt(reading.summary) }}</p>
                <p>{{ txt(reading.quintessence.essence) }}</p>
              </div>
            </article>
          }
        }

        }

        @if (tab === 'how') {
        <section class="s-block" id="tarot-how">
          <p class="s-kicker">✦ {{ isHe ? 'שלושה צעדים' : 'Three steps' }}</p>
          <h2>{{ isHe ? 'איך זה עובד' : 'How it works' }}</h2>
          <ol class="s-steps">
            @for (step of sanctuary.steps; track step.n) {
              <li>
                <span>{{ step.n }}</span>
                <div>
                  <h3>{{ txt(step.title) }}</h3>
                  <p>{{ txt(step.text) }}</p>
                </div>
              </li>
            }
          </ol>
        </section>

        <section class="s-block" id="tarot-about">
          <p class="s-kicker">✦ {{ isHe ? 'על הקריאה' : 'About the reading' }}</p>
          <h2>{{ isHe ? 'מסע, לא גזירה' : 'A journey, not a verdict' }}</h2>
          @for (para of sanctuary.about; track para.en) {
            <p>{{ txt(para) }}</p>
          }
        </section>

        }

        @if (tab === 'faq') {
        <section class="s-block" id="tarot-faq">
          <p class="s-kicker">✦ {{ isHe ? 'לפני ששואלים' : 'Before you ask' }}</p>
          <h2>{{ isHe ? 'שאלות נפוצות' : 'Common questions' }}</h2>
          <div class="s-faq">
            @for (item of sanctuary.faq; track item.q.en; let i = $index) {
              <div class="s-faq-item" [class.on]="faq === i">
                <button type="button" (click)="faq = faq === i ? -1 : i" [attr.aria-expanded]="faq === i">
                  <span>{{ txt(item.q) }}</span>
                  <span aria-hidden="true">{{ faq === i ? '−' : '+' }}</span>
                </button>
                @if (faq === i) {
                  <p>{{ txt(item.a) }}</p>
                }
              </div>
            }
          </div>
        </section>

        }

        @if (tab === 'space') {
        <section class="s-block" id="tarot-library">
          <p class="s-kicker">✦ {{ isHe ? 'ספריית הקלפים' : 'Card library' }}</p>
          <h2>{{ isHe ? 'כל 22 הקלפים, והמשמעות של כל אחד' : 'All 22 cards, and what each one means' }}</h2>
          <p>{{ isHe ? 'זו לא קריאה. כאן אפשר לעיין בקלף בלי שאלה: לוחצים, הוא מתהפך, ומופיע מה הוא אומר.' : 'This is not a reading. Browse a card without a question: tap it, it turns, and its meaning appears.' }}</p>
          <div class="s-lib">
            @for (card of arcana; track card.n) {
              <button type="button" class="tcard lib-card" [class.open]="library === card.n" (click)="library = library === card.n ? -1 : card.n" [attr.aria-pressed]="library === card.n" [attr.aria-label]="txt(card.name)">
                <span class="inner">
                  <span class="face pic">
                    <img class="card-art" [src]="art(card.n)" alt="" />
                    <span class="plate">{{ txt(card.name) }}</span>
                  </span>
                  <span class="face mean">
                    <span class="mean-kicker">{{ card.roman }} · {{ letterLine(card) }}</span>
                    <b>{{ txt(card.name) }}</b>
                    <span class="mean-kw">{{ txt(card.keywords) }}</span>
                    <p>{{ txt(card.upright) }}</p>
                  </span>
                </span>
              </button>
            }
          </div>
          <p class="s-credit">{{ isHe ? 'איורי הקלפים: חפיסת ריידר־וייט־סמית, 1909, נחלת הכלל.' : 'Card art: the Rider–Waite–Smith deck, 1909, public domain.' }}</p>
          <p class="s-prompt-lead">{{ isHe ? 'ואם רוצים להמשיך למפה אחרת במערכת:' : 'To continue into another map in the app:' }}</p>
          <div class="s-links">
            @for (link of sanctuary.links; track link.path) {
              <a [routerLink]="link.path" [queryParams]="lang.lang() === 'en' ? { lang: 'en' } : null">
                <span>{{ link.mark }}</span>
                <b>{{ txt(link.title) }}</b>
                <small>{{ txt(link.text) }}</small>
              </a>
            }
          </div>
        </section>
        }

        <p class="s-foot">{{ isHe ? 'הקריאה מיועדת להתבוננות ולהשראה. היא לא מחליפה ייעוץ מקצועי, ולא החלטה במקומך.' : 'The reading is for reflection and inspiration. It does not replace professional advice, and it does not decide for you.' }}</p>
      </div>
    </app-screen>
  `,
})
export class TarotPage implements OnDestroy {
  private cdr = inject(ChangeDetectorRef);
  readonly lang = inject(LangService);
  readonly sanctuary = SANCTUARY;
  readonly arcana = MAJOR_ARCANA;
  readonly spreads: DeepSpread[] = ['one', 'three', 'love', 'five'];
  readonly topics = TOPICS;
  readonly pile = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  readonly stars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
  readonly journey = touchJourney();
  question = '';
  spread: DeepSpread = 'three';
  chosen: Topic = 'general';
  allowRev = true;
  phase: Phase = 'idle';
  cards: DrawnCard[] = [];
  open: boolean[] = [];
  reading: SpreadReading | null = null;
  dailyOpen = readDailyOpen();
  faq = -1;
  library = -1;
  tab: SanctuaryTab = 'read';
  revTip = false;
  copied = false;
  shuffleCue = 0;
  private timer = 0;
  private copyTimer = 0;
  private waits: number[] = [];

  get isHe(): boolean {
    return this.lang.lang() === 'he';
  }

  get daily(): TarotCard {
    return MAJOR_ARCANA[dailyCardIndex()];
  }

  get practice() {
    return SANCTUARY.practices[this.daily.n];
  }

  ngOnDestroy(): void {
    this.clearWaits();
    window.clearTimeout(this.copyTimer);
  }

  txt(value: L): string {
    return value[this.lang.lang()];
  }

  art(n: number): string {
    return `assets/tarot/${n}.jpg`;
  }

  setTab(tab: SanctuaryTab): void {
    this.tab = tab;
    const ion = document.querySelector('ion-content') as (HTMLElement & { scrollToTop?: (ms?: number) => void }) | null;
    ion?.scrollToTop?.(0);
  }

  spreadInfo(id: DeepSpread) { return SPREADS[id]; }
  positions() { return SPREADS[this.spread].positions; }
  deep(card: DrawnCard) { return DEEP[card.card.n]; }

  letterLine(card: TarotCard): string {
    const meta = cardMeta(card.n);
    const lang = this.lang.lang();
    return `${meta.letter} · ${meta.between[0][lang]} — ${meta.between[1][lang]}`;
  }

  journeyLine(): string {
    if (this.isHe) {
      return this.journey <= 1
        ? 'היום הראשון במסע. מחר מחכה קלף אחר.'
        : `יום ${this.journey} במסע. הקלף מתחלף בחצות.`;
    }
    return this.journey <= 1
      ? 'The first day of the journey. Another card waits tomorrow.'
      : `Day ${this.journey} of the journey. The card changes at midnight.`;
  }

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
    if (this.phase === 'shuffling') {
      const lines = this.isHe
        ? ['חותכים את החפיסה לשתי ידיים…', 'מערבים, קלף אל קלף…', 'שקט. הקלפים מוכנים.']
        : ['Cutting the deck into two hands…', 'Shuffling, card into card…', 'Stillness. The cards are ready.'];
      return lines[this.shuffleCue] ?? lines[0];
    }
    if (this.phase === 'dealt' && !this.open.some(Boolean)) return this.isHe ? 'הקלפים מחכים. הפכו את הראשון.' : 'The cards are waiting. Turn the first one.';
    if (this.phase === 'dealt' && !this.allOpen()) return this.isHe ? 'לחצו על שאר הקלפים' : 'Turn the remaining cards';
    if (this.phase === 'dealt') return this.isHe ? 'כל הקלפים פתוחים' : 'Every card is open';
    return this.isHe ? 'החפיסה מוכנה. ערבבו ומשכו.' : 'The deck is ready. Shuffle and draw.';
  }

  usePrompt(prompt: SanctuaryPrompt): void {
    this.question = prompt.question[this.lang.lang()];
    this.chosen = prompt.topic;
  }

  go(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  revealDaily(): void {
    if (this.dailyOpen) return;
    this.dailyOpen = true;
    try { localStorage.setItem(DAILY_KEY, dayStamp()); } catch { /* הפרטיות של הדפדפן */ }
  }

  shareText(): string {
    const name = this.txt(this.daily.name);
    const line = this.txt(this.daily.upright);
    const practice = this.txt(this.practice.text);
    return this.isHe
      ? `הקלף שלי להיום: ${name}\n${line}\nתרגול: ${practice}`
      : `My card today: ${name}\n${line}\nPractice: ${practice}`;
  }

  waHref(): string {
    return `https://wa.me/?text=${encodeURIComponent(this.shareText())}`;
  }

  async copyDaily(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.shareText());
      this.copied = true;
      window.clearTimeout(this.copyTimer);
      this.copyTimer = window.setTimeout(() => {
        this.copied = false;
        this.cdr.detectChanges();
      }, 1600);
    } catch { /* בלי לוח */ }
  }

  flip(index: number): void {
    if (this.phase !== 'dealt' || this.open[index]) return;
    this.open = this.open.map((value, i) => i === index || value);
  }

  draw(event: Event): void {
    event.preventDefault();
    this.clearWaits();
    this.cards = [];
    this.open = [];
    this.reading = null;
    this.shuffleCue = 0;
    this.phase = 'shuffling';
    document.getElementById('tarot-table')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) {
      this.later(1500, () => { this.shuffleCue = 1; });
      this.later(3400, () => { this.shuffleCue = 2; });
    }
    this.timer = window.setTimeout(() => {
      const n = SPREADS[this.spread].positions.length;
      this.cards = drawCards(n, this.allowRev);
      this.open = this.cards.map(() => false);
      this.reading = readSpread(this.cards, this.spread);
      this.phase = 'dealt';
      this.cdr.detectChanges();
    }, reduce ? 0 : 5200);
  }

  private later(ms: number, fn: () => void): void {
    const id = window.setTimeout(() => {
      fn();
      this.cdr.detectChanges();
    }, ms);
    this.waits.push(id);
  }

  private clearWaits(): void {
    window.clearTimeout(this.timer);
    for (const id of this.waits) window.clearTimeout(id);
    this.waits = [];
  }
}

function touchJourney(): number {
  const today = dayStamp();
  try {
    const raw = localStorage.getItem(JOURNEY_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const days = Array.isArray(parsed) ? parsed.filter((d): d is string => typeof d === 'string') : [];
    if (!days.includes(today)) days.push(today);
    const kept = days.slice(-40);
    localStorage.setItem(JOURNEY_KEY, JSON.stringify(kept));
    return kept.length;
  } catch {
    return 1;
  }
}

function readDailyOpen(): boolean {
  try { return localStorage.getItem(DAILY_KEY) === dayStamp(); } catch { return false; }
}
