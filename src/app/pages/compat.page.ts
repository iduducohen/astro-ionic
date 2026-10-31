import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonCheckbox, IonInput } from '@ionic/angular';
import { COUNTRY_CODES, MAJOR_ARCANA, PLACES, countryName as countryLabel } from '../../core';
import { astroLove } from '../../core/love-methods';
import { pairDestiny, type PairBit, type PairReading } from '../../core/pair-destiny';
import { LangService } from '../lang.service';
import { readProfile } from '../profile';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';

type PairTab = 'map' | 'ways' | 'cast' | 'rite';

@Component({
  selector: 'app-compat',
  imports: [ScreenComponent, RouterLink, WhenFieldComponent, IonInput, IonCheckbox],
  template: `
    <app-screen [title]="lang.text().tabPair">
      <div class="sanctuary pair-sanct">
        <nav class="s-tabs" [attr.aria-label]="isHe ? 'מדורי ההתאמה' : 'Match sections'">
          <button type="button" [class.on]="tab === 'map'" (click)="setTab('map')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
            <span>{{ isHe ? 'מפת הגורל' : 'Destiny map' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'ways'" (click)="setTab('ways')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="7" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17" cy="8" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M4 18c.6-2.4 2.2-3.6 4.5-3.6S12.4 15.6 13 18M11 18c.6-2.4 2.2-3.6 4.5-3.6S20 15.6 20.6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            <span>{{ isHe ? 'חמש השיטות' : 'Five ways' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'cast'" (click)="setTab('cast')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 8v4l3 2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            <span>{{ isHe ? 'תחזיות' : 'Forecasts' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'rite'" (click)="setTab('rite')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3" width="10" height="16" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M9 8h4M9 12h3" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            <span>{{ isHe ? 'הטקס' : 'The rite' }}</span>
          </button>
        </nav>

        @if (tab === 'map') {
          <header class="s-hero">
            <div class="sky" aria-hidden="true">
              @for (i of stars; track i) { <span class="star" [style.--n]="i"></span> }
            </div>
            <p class="s-kicker">♥ {{ isHe ? 'מפת הגורל הזוגי' : 'The couple’s destiny map' }}</p>
            <h1>{{ isHe ? 'שני אנשים, סיפור אחד' : 'Two people, one story' }}</h1>
            <p class="s-lead">{{ isHe ? 'חמש שיטות נארגות יחד: סינסטרי, מספרים, טארוט, השנה הסינית ומפת אנרגיה. בסוף נשארות שלוש תובנות לשבוע. זו פרשנות רוחנית, לא תחזית שניתן להוכיח.' : 'Five ways woven together: synastry, numbers, tarot, the Chinese year and an energy map. Three insights for the week remain at the end. A spiritual reading, not a forecast that can be proved.' }}</p>
          </header>

          <form (submit)="submit($event)" class="form-card s-form" id="pair-form">
            <p class="s-kicker">✦ {{ isHe ? 'היכרות' : 'A meeting' }}</p>
            <h2>{{ isHe ? 'שני שמות, שני תאריכים' : 'Two names, two dates' }}</h2>
            <div class="pair-who">
              <div class="pair-person">
                <h3>{{ lang.text().you }}</h3>
                <ion-input mode="md" [label]="lang.text().name" labelPlacement="stacked" fill="outline" [value]="aName" (ionInput)="aName = $any($event).detail.value ?? ''"></ion-input>
                <app-when kind="date" [label]="lang.text().birthDate" [value]="aBirth" (valueChange)="aBirth = $event"></app-when>
              </div>
              <div class="pair-person">
                <h3>{{ lang.text().partner }}</h3>
                <ion-input mode="md" [label]="lang.text().name" labelPlacement="stacked" fill="outline" [value]="bName" (ionInput)="bName = $any($event).detail.value ?? ''"></ion-input>
                <app-when kind="date" [label]="lang.text().birthDate" [value]="bBirth" (valueChange)="bBirth = $event"></app-when>
              </div>
            </div>
            <button type="button" class="sample-link" (click)="deep = !deep">{{ deep ? (isHe ? 'הסתרת שעה ומקום' : 'Hide time and place') : (isHe ? 'יש שעה ומקום? זה פותח את הסינסטרי המלא' : 'Have a time and a place? That opens the full synastry') }}</button>
            @if (deep) {
              <div class="pair-who">
                <div class="pair-person">
                  <app-when kind="time" [label]="lang.text().birthTime" [value]="aTime" [disabled]="!aTimeKnown" (valueChange)="aTime = $event"></app-when>
                  <ion-checkbox [checked]="!aTimeKnown" (ionChange)="aTimeKnown = !$any($event).detail.checked" labelPlacement="end">{{ lang.text().timeUnknown }}</ion-checkbox>
                  <label class="native-field"><span>{{ lang.text().country }}</span>
                    <select [value]="aCc" (change)="onCountry('a', $event)">
                      @for (c of countries; track c) { <option [value]="c">{{ countryName(c) }}</option> }
                    </select>
                  </label>
                  <label class="native-field"><span>{{ isHe ? 'עיר' : 'City' }}</span>
                    <select [value]="aPlace" (change)="aPlace = $any($event.target).value">
                      <option value="">{{ isHe ? 'בלי עיר' : 'No city' }}</option>
                      @for (city of cities(aCc); track city.id) { <option [value]="city.id">{{ city.name[lang.lang()] }}</option> }
                    </select>
                  </label>
                </div>
                <div class="pair-person">
                  <app-when kind="time" [label]="lang.text().birthTime" [value]="bTime" [disabled]="!bTimeKnown" (valueChange)="bTime = $event"></app-when>
                  <ion-checkbox [checked]="!bTimeKnown" (ionChange)="bTimeKnown = !$any($event).detail.checked" labelPlacement="end">{{ lang.text().timeUnknown }}</ion-checkbox>
                  <label class="native-field"><span>{{ lang.text().country }}</span>
                    <select [value]="bCc" (change)="onCountry('b', $event)">
                      @for (c of countries; track c) { <option [value]="c">{{ countryName(c) }}</option> }
                    </select>
                  </label>
                  <label class="native-field"><span>{{ isHe ? 'עיר' : 'City' }}</span>
                    <select [value]="bPlace" (change)="bPlace = $any($event.target).value">
                      <option value="">{{ isHe ? 'בלי עיר' : 'No city' }}</option>
                      @for (city of cities(bCc); track city.id) { <option [value]="city.id">{{ city.name[lang.lang()] }}</option> }
                    </select>
                  </label>
                </div>
              </div>
            }
            @if (error) { <p role="alert" class="err">{{ error }}</p> }
            <button type="submit" class="s-gold">{{ lang.text().checkMatch }}</button>
            <button type="button" class="sample-link" (click)="sample()">{{ isHe ? 'רוצים לראות דוגמה? נועה ודניאל' : 'Want an example? Noa and Daniel' }}</button>
          </form>

          @if (reading; as r) {
            <section class="s-block pair-story" id="pair-story">
              <p class="s-kicker">✦ {{ isHe ? 'הסיפור' : 'The story' }}</p>
              <h2>{{ txt(r.title) }}</h2>
              <p>{{ txt(r.lead) }}</p>
              <div class="pair-three">
                @for (part of story(r); track part.kicker.en) {
                  <article>
                    <p class="s-kicker">{{ txt(part.kicker) }}</p>
                    <h3>{{ txt(part.title) }}</h3>
                    <p>{{ txt(part.text) }}</p>
                  </article>
                }
              </div>
              <ol class="pair-insights">
                @for (line of r.insights; track line.en) { <li>{{ txt(line) }}</li> }
              </ol>
              <p class="s-foot">{{ txt(r.disclaimer) }}</p>
              <div class="s-jump">
                <button type="button" (click)="setTab('ways')">{{ isHe ? 'חמש השיטות' : 'Five ways' }}</button>
                <button type="button" class="ghost" (click)="setTab('rite')">{{ isHe ? 'להפוך את הקלפים' : 'Turn the cards' }}</button>
              </div>
            </section>
          }
        }

        @if (tab === 'ways') {
          <section class="s-block">
            <p class="s-kicker">✦ {{ isHe ? 'חמש דרכים לראות את אותו קשר' : 'Five ways to see the same bond' }}</p>
            <h2>{{ isHe ? 'כל שיטה שכבה, לא סתירה' : 'Each way is a layer, not a contradiction' }}</h2>
            @if (!reading) {
              <p>{{ isHe ? 'קודם שני תאריכים במפת הגורל. אחר כך כל שיטה נפתחת לפי השמות והימים האלה.' : 'First, two dates on the destiny map. Then each way opens from those names and days.' }}</p>
              <div class="s-jump"><button type="button" (click)="setTab('map')">{{ isHe ? 'למפת הגורל' : 'To the destiny map' }}</button></div>
            } @else {
              @for (method of reading.methods; track method.title.en) {
                <article class="pair-method">
                  <p class="s-kicker">{{ txt(method.kicker) }}</p>
                  <h3>{{ txt(method.title) }}</h3>
                  <p>{{ txt(method.text) }}</p>
                  @if (method.lines.length) {
                    <ul>
                      @for (line of method.lines; track line.en) { <li>{{ txt(line) }}</li> }
                    </ul>
                  }
                  @if (method.note) { <p class="pair-note">{{ txt(method.note) }}</p> }
                </article>
              }
              <p class="s-foot">{{ isHe ? 'הגלגל המלא, עם כל הבתים, יושב במפת הסינסטרי.' : 'The full wheel, with every house, lives on the synastry chart.' }}</p>
              <div class="s-jump">
                <a routerLink="/charts/synastry" [queryParams]="lang.lang() === 'en' ? { lang: 'en' } : null">{{ isHe ? 'לסינסטרי המלא' : 'Full synastry' }}</a>
              </div>
            }
          </section>
        }

        @if (tab === 'cast') {
          <section class="s-block">
            <p class="s-kicker">☽ {{ isHe ? 'זמן' : 'Time' }}</p>
            <h2>{{ isHe ? 'תחזיות כמסלולים, לא כגזירה' : 'Forecasts as paths, not a verdict' }}</h2>
            @if (!reading) {
              <p>{{ isHe ? 'התחזיות נפתחות אחרי שני תאריכי לידה.' : 'The forecasts open after two birth dates.' }}</p>
              <div class="s-jump"><button type="button" (click)="setTab('map')">{{ isHe ? 'למפת הגורל' : 'To the destiny map' }}</button></div>
            } @else {
              <div class="pair-cast">
                @for (item of reading.forecasts; track item.title.en) {
                  <article>
                    <p class="s-kicker">{{ txt(item.kicker) }}</p>
                    <h3>{{ txt(item.title) }}</h3>
                    <p>{{ txt(item.text) }}</p>
                  </article>
                }
              </div>
              <p class="s-foot">{{ txt(reading.disclaimer) }}</p>
            }
          </section>
        }

        @if (tab === 'rite') {
          <section class="s-block">
            <p class="s-kicker">✦ {{ isHe ? 'טקס' : 'A rite' }}</p>
            <h2>{{ isHe ? 'ארבעה קלפים, ואז הסיפורים' : 'Four cards, then the stories' }}</h2>
            @if (!reading) {
              <p>{{ isHe ? 'הקלפים נקבעים לפי שני תאריכי הלידה. קודם ממלאים אותם במפה.' : 'The cards are set by the two birth dates. Fill those on the map first.' }}</p>
              <div class="s-jump"><button type="button" (click)="setTab('map')">{{ isHe ? 'למפת הגורל' : 'To the destiny map' }}</button></div>
            } @else {
              <p>{{ isHe ? 'אותם ארבעה קלפים בכל פעם לשני התאריכים האלה. הופכים אחד־אחד.' : 'The same four cards every time for these two dates. Turn them one by one.' }}</p>
              <div class="pair-spread">
                @for (card of reading.cards; track card.role.en; let i = $index) {
                  <div>
                    <p class="pair-role">{{ txt(card.role) }}</p>
                    <button type="button" class="tcard" [class.open]="open[i]" (click)="open[i] = true" [attr.aria-pressed]="open[i]">
                      <span class="inner">
                        <span class="face back">✦</span>
                        <span class="face front">
                          <img class="card-art" [src]="art(card.n)" alt="" />
                          <span class="plate">{{ txt(arcana(card.n).name) }}</span>
                        </span>
                      </span>
                    </button>
                    @if (open[i]) {
                      <p class="pair-mean">{{ txt(arcana(card.n).upright) }}</p>
                    }
                  </div>
                }
              </div>
              @for (tale of reading.tales; track tale.title.en) {
                <article class="pair-method">
                  <p class="s-kicker">{{ txt(tale.kicker) }}</p>
                  <h3>{{ txt(tale.title) }}</h3>
                  <p>{{ txt(tale.text) }}</p>
                  @if (tale.note) { <p class="pair-note">{{ txt(tale.note) }}</p> }
                </article>
              }
              <p class="s-foot">{{ txt(reading.disclaimer) }}</p>
            }
          </section>
        }
      </div>
    </app-screen>
  `,
})
export class CompatPage {
  readonly lang = inject(LangService);
  private readonly cd = inject(ChangeDetectorRef);
  readonly stars = Array.from({ length: 16 }, (_, i) => i);
  readonly countries = COUNTRY_CODES;
  tab: PairTab = 'map';
  deep = false;
  aName = '';
  aBirth = '';
  bName = '';
  bBirth = '';
  aTime = '';
  bTime = '';
  aTimeKnown = true;
  bTimeKnown = true;
  aCc = 'IL';
  bCc = 'IL';
  aPlace = '';
  bPlace = '';
  error = '';
  reading: PairReading | null = null;
  open = [false, false, false, false];

  get isHe(): boolean { return this.lang.lang() === 'he'; }
  txt(value: { he: string; en: string }): string { return value[this.lang.lang()]; }
  countryName(cc: string): string { return countryLabel(cc, this.lang.lang()); }
  cities(cc: string) { return PLACES.filter((p) => p.cc === cc); }
  art(n: number): string { return `assets/tarot/${n}.jpg`; }
  arcana(n: number) { return MAJOR_ARCANA[n]; }
  story(r: PairReading): PairBit[] { return [r.gift, r.challenge, r.crossroads]; }

  setTab(tab: PairTab): void {
    this.tab = tab;
    const ion = document.querySelector('ion-content') as (HTMLElement & { scrollToTop?: (ms?: number) => void }) | null;
    ion?.scrollToTop?.(0);
  }

  onCountry(who: 'a' | 'b', event: Event): void {
    const cc = (event.target as HTMLSelectElement).value;
    if (who === 'a') {
      this.aCc = cc;
      if (!this.cities(cc).some((c) => c.id === this.aPlace)) this.aPlace = '';
    } else {
      this.bCc = cc;
      if (!this.cities(cc).some((c) => c.id === this.bPlace)) this.bPlace = '';
    }
  }

  submit(event: Event): void {
    event.preventDefault();
    try {
      const S = this.lang.text();
      const a = readProfile(S, this.aName, this.aBirth);
      const b = readProfile(S, this.bName, this.bBirth);
      const sky = this.aPlace && this.bPlace
        ? astroLove(
          { name: a.name, date: this.aBirth, time: this.aTime, timeKnown: this.aTimeKnown && !!this.aTime, placeId: this.aPlace },
          { name: b.name, date: this.bBirth, time: this.bTime, timeKnown: this.bTimeKnown && !!this.bTime, placeId: this.bPlace },
          this.lang.lang(),
        )
        : null;
      this.reading = pairDestiny(a, b, sky, { a: this.aBirth, b: this.bBirth });
      this.open = [false, false, false, false];
      this.error = '';
      this.cd.detectChanges();
      void this.reveal();
    } catch (err) {
      this.reading = null;
      this.error = (err as Error).message;
    }
  }

  sample(): void {
    const he = this.isHe;
    this.aName = he ? 'נועה' : 'Noa';
    this.aBirth = '1990-03-15';
    this.bName = he ? 'דניאל' : 'Daniel';
    this.bBirth = '1988-07-22';
    this.tab = 'map';
    this.submit(new Event('submit'));
  }

  private async reveal(): Promise<void> {
    const ion = document.querySelector('ion-content') as (HTMLElement & { getScrollElement?: () => Promise<HTMLElement> }) | null;
    const el = document.getElementById('pair-story');
    if (!el || !ion?.getScrollElement) return;
    const sc = await ion.getScrollElement();
    sc.scrollTo({ top: el.getBoundingClientRect().top + sc.scrollTop - 12, behavior: 'smooth' });
  }
}
