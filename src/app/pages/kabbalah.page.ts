import { ChangeDetectorRef, Component, ElementRef, inject, viewChild } from '@angular/core';
import { IonButton, IonCheckbox, IonInput } from '@ionic/angular';
import { type L } from '../../core';
import { PAGE_INFO } from '../../core/page-info';
import { MONTH_LETTER, PATHS22, SENSE_TEXT, TREE, WORLDS, sephira, sephiraForNumber, type SephiraId, type TreePath } from '../../core/tree';
import { SEPHIRA_VOICE, TREE_LOVE_DISCLAIMER, TREE_LOVE_METHOD, treeLove, type TreeLoveReading } from '../../core/tree-love';
import { LangService } from '../lang.service';
import { readProfile } from '../profile';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';

type KbTab = 'tree' | 'pair' | 'way';
type KbKind = 'full' | 'sefirot' | 'letters' | 'outlook' | 'practical';

@Component({
  selector: 'app-kabbalah',
  imports: [ScreenComponent, WhenFieldComponent, IonButton, IonCheckbox, IonInput],
  template: `
    <app-screen [title]="lang.text().tabKabbalah">
      <div class="sanctuary kb-sanct">
        <nav class="s-tabs" [attr.aria-label]="isHe ? 'מדורי הקבלה' : 'Kabbalah sections'">
          <button type="button" [class.on]="tab === 'tree'" (click)="setTab('tree')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="6" cy="12" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="12" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="19" r="1.6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 6.6v10.8M7.4 12.8 12 18.2 16.6 12.8" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>
            <span>{{ isHe ? 'העץ' : 'The tree' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'pair'" (click)="setTab('pair')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>
            <span>{{ isHe ? 'מפת הנשמות' : 'Soul map' }}</span>
          </button>
          <button type="button" [class.on]="tab === 'way'" (click)="setTab('way')">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h12M6 12h12M6 19h8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            <span>{{ isHe ? 'השיטה' : 'The method' }}</span>
          </button>
        </nav>

        @if (tab === 'tree') {
          <header class="s-hero">
            <div class="sky" aria-hidden="true">
              @for (i of stars; track i) { <span class="star" [style.--n]="i"></span> }
            </div>
            <p class="s-kicker">✦ {{ isHe ? 'עץ החיים' : 'The Tree of Life' }}</p>
            <h1>{{ isHe ? 'תורת הקבלה' : 'Kabbalah' }}</h1>
            <p class="s-lead">{{ page.summary[lang.lang()] }}</p>
            <ul class="pintro-facts">
              @for (fact of page.facts; track fact.en) { <li>{{ fact[lang.lang()] }}</li> }
            </ul>
          </header>
          <form (submit)="submit($event)" class="form-card s-form">
            <ion-input mode="md" [label]="lang.text().name" labelPlacement="stacked" fill="outline" [value]="name" (ionInput)="name = $any($event).detail.value ?? ''"></ion-input>
            <app-when kind="date" [label]="lang.text().birthDate" [value]="birth" [max]="today" (valueChange)="birth = $event"></app-when>
            <ion-checkbox [checked]="sunset" (ionChange)="sunset = !!$any($event).detail.checked" labelPlacement="end">{{ lang.text().afterSunset }}</ion-checkbox>
            @if (error && tab === 'tree') { <p role="alert" class="err">{{ error }}</p> }
            <ion-button type="submit" expand="block" class="btn-main">{{ isHe ? 'מצא את מקומי בעץ' : 'Find my place on the tree' }}</ion-button>
            <button type="button" class="sample-link" (click)="sample()">{{ isHe ? 'רוצים לראות דוגמה? הצגת קריאה לדוגמה' : 'Want to see an example? Show a sample reading' }}</button>
          </form>
        }

        @if (tab === 'pair') {
          <header class="s-hero">
            <div class="sky" aria-hidden="true">
              @for (i of stars; track i) { <span class="star" [style.--n]="i"></span> }
            </div>
            <p class="s-kicker">✦ {{ isHe ? 'מפת הנשמות הזוגית' : 'The couple’s soul map' }}</p>
            <h1>{{ isHe ? 'שתי ספירות, עץ אחד' : 'Two sephirot, one tree' }}</h1>
            <p class="s-lead">{{ isHe ? 'שמות ותאריכי לידה נפתחים לספירות, לאות ראשונה ולחודש העברי. המודל קבוע, והוא פרשנות רוחנית: לא פסיקה, ולא תחזית אם הקשר יצליח.' : 'Names and birth dates open into sephirot, a first letter and the Hebrew month. The model is fixed, and it is a spiritual reading: not a ruling, and not a forecast of whether the bond will succeed.' }}</p>
          </header>
          <form (submit)="submitPair($event)" class="form-card s-form" id="kb-form">
            <div class="pair-who">
              <div class="pair-person">
                <h3>{{ isHe ? 'אדם ראשון' : 'First person' }}</h3>
                <ion-input mode="md" [label]="isHe ? 'שם בעברית' : 'Name in Hebrew'" labelPlacement="stacked" fill="outline" [value]="aName" (ionInput)="aName = $any($event).detail.value ?? ''"></ion-input>
                <app-when kind="date" [label]="lang.text().birthDate" [value]="aBirth" [max]="today" (valueChange)="aBirth = $event"></app-when>
                <ion-checkbox [checked]="aSunset" (ionChange)="aSunset = !!$any($event).detail.checked" labelPlacement="end">{{ lang.text().afterSunset }}</ion-checkbox>
              </div>
              <div class="pair-person">
                <h3>{{ isHe ? 'אדם שני' : 'Second person' }}</h3>
                <ion-input mode="md" [label]="isHe ? 'שם בעברית' : 'Name in Hebrew'" labelPlacement="stacked" fill="outline" [value]="bName" (ionInput)="bName = $any($event).detail.value ?? ''"></ion-input>
                <app-when kind="date" [label]="lang.text().birthDate" [value]="bBirth" [max]="today" (valueChange)="bBirth = $event"></app-when>
                <ion-checkbox [checked]="bSunset" (ionChange)="bSunset = !!$any($event).detail.checked" labelPlacement="end">{{ lang.text().afterSunset }}</ion-checkbox>
              </div>
            </div>
            <p class="pair-note">{{ isHe ? 'שעת הלידה לא ממופה לספירה. רק מעבר השקיעה מזיז את התאריך העברי ביום.' : 'Birth time is not mapped to a sephira. Only sunset moves the Hebrew date by a day.' }}</p>
            <div class="kb-kinds" role="radiogroup" [attr.aria-label]="isHe ? 'סוג הניתוח' : 'Kind of reading'">
              @for (k of kinds; track k.id) {
                <button type="button" role="radio" [attr.aria-checked]="kind === k.id" [class.on]="kind === k.id" (click)="kind = k.id">{{ k.label[lang.lang()] }}</button>
              }
            </div>
            @if (error && tab === 'pair') { <p role="alert" class="err">{{ error }}</p> }
            <button type="submit" class="s-gold">{{ isHe ? 'הפקת מפת נשמות' : 'Open the soul map' }}</button>
            <button type="button" class="sample-link" (click)="samplePair()">{{ isHe ? 'רוצים לראות דוגמה? נועה ודניאל' : 'Want an example? Noa and Daniel' }}</button>
          </form>
        }

        @if (tab !== 'way') {
          <section class="kb-treewrap">
            <h2 class="kb-tree-title">{{ isHe ? 'עץ החיים' : 'The Tree of Life' }}</h2>
            <p class="kb-tree-lead">{{ treeLead() }}</p>
            @if (tab === 'tree') {
              <button type="button" class="kb-more" [class.on]="detail" [attr.aria-pressed]="detail" (click)="detail = !detail">
                {{ detail ? (isHe ? 'חזרה לעץ הקצר' : 'Back to the short tree') : (isHe ? 'עץ מפורט' : 'Detailed tree') }}
              </button>
            }
            <p class="kb-pillars" dir="ltr">
              <span>{{ isHe ? 'דין' : 'Severity' }}</span>
              <span>{{ isHe ? 'רחמים' : 'Balance' }}</span>
              <span>{{ isHe ? 'חסד' : 'Mercy' }}</span>
            </p>
            <svg viewBox="0 0 300 520" class="kb-tree" role="img" [attr.aria-label]="isHe ? 'עץ החיים' : 'Tree of Life'">
              @if (detail && tab === 'tree') {
                @for (p of paths; track p.n) {
                  <g class="tp" [class.on]="pathHot(p.letter)" [class.sel]="p.n === pathN" role="button" tabindex="0" [attr.aria-pressed]="p.n === pathN" [attr.aria-label]="pathLabel(p)" (click)="pickPath(p.n)" (keydown.enter)="pickPath(p.n)">
                    <line [attr.x1]="at(p.from).x" [attr.y1]="at(p.from).y" [attr.x2]="at(p.to).x" [attr.y2]="at(p.to).y" />
                    <circle class="tp-dot" [attr.cx]="pathPoint(p).x" [attr.cy]="pathPoint(p).y" r="8" />
                    <text class="tp-letter" [attr.x]="pathPoint(p).x" [attr.y]="pathPoint(p).y" dominant-baseline="central">{{ p.letter }}</text>
                  </g>
                }
              } @else {
                <g class="paths">
                  @for (p of paths; track p.n) {
                    <line [class.on]="pathHot(p.letter)" [attr.x1]="at(p.from).x" [attr.y1]="at(p.from).y" [attr.x2]="at(p.to).x" [attr.y2]="at(p.to).y" />
                  }
                </g>
              }
              @for (s of tree; track s.id) {
                <g class="ts" [class.life]="isLife(s.id)" [class.sel]="s.id === sel" [class.named]="showRing(s.id)" role="button" tabindex="0" [attr.aria-pressed]="s.id === sel" [attr.aria-label]="s.name[lang.lang()] + ' — ' + s.meaning[lang.lang()]" (click)="open(s.id)" (keydown.enter)="open(s.id)">
                  <circle class="ts-c" [attr.cx]="s.x" [attr.cy]="s.y" r="28" />
                  @if (showRing(s.id)) {
                    <circle class="ts-ring" [attr.cx]="s.x" [attr.cy]="s.y" r="33" />
                  }
                  <text class="ts-name" [attr.x]="s.x" [attr.y]="detail && tab === 'tree' ? s.y - 5 : s.y" dominant-baseline="central">{{ s.name[lang.lang()] }}</text>
                  @if (detail && tab === 'tree') {
                    <text class="ts-num" [attr.x]="s.x" [attr.y]="s.y + 11">{{ s.n }}</text>
                  }
                </g>
              }
            </svg>
            <ul class="kb-legend">
              <li><i class="lg lg-open"></i>{{ isHe ? 'העיגול הפתוח עכשיו' : 'Open now' }}</li>
              @if (tab === 'tree' && life) { <li><i class="lg lg-life"></i>{{ isHe ? 'ספירת דרך החיים' : 'Life-path sephira' }}</li> }
              @if (tab === 'tree' && named && named !== life) { <li><i class="lg lg-name"></i>{{ isHe ? 'ספירת השם' : 'Name sephira' }}</li> }
              @if (tab === 'tree' && monthLetter) { <li><i class="lg lg-path"></i>{{ isHe ? 'נתיב חודש הלידה' : 'Birth-month path' }}</li> }
              @if (tab === 'pair' && reading) {
                <li><i class="lg lg-life"></i>{{ isHe ? 'דרך החיים של שניכם' : 'Both life paths' }}</li>
                <li><i class="lg lg-name"></i>{{ isHe ? 'ספירת השם' : 'Name sephira' }}</li>
                <li><i class="lg lg-path"></i>{{ isHe ? 'אות החודש' : 'Month letter' }}</li>
              }
            </ul>
            @if (detail && tab === 'tree' && chosenPath(); as path) {
              <p class="kb-pathnote">{{ pathLabel(path) }}@if (senseOf(path.letter); as sense) { <span> · {{ sense }}</span> }</p>
            }
            @if (detail && tab === 'tree') {
              <section class="kb-worlds">
                <h3>{{ isHe ? 'ארבעת העולמות' : 'The four worlds' }}</h3>
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
        }

        @if (tab === 'pair' && reading; as r) {
          <section class="s-block" id="kb-soul">
            @if (face('people')) {
              <div class="pair-who">
                @for (p of r.people; track p.name) {
                  <article class="pair-method">
                    <p class="s-kicker">{{ p.name }}</p>
                    <h3>{{ p.life.name[lang.lang()] }}</h3>
                    <p>{{ isHe ? 'דרך חיים' : 'Life path' }} {{ p.lifeNumber }} · {{ voice(p.life.id) }}</p>
                    <p>{{ isHe ? 'ספירת השם' : 'Name sephira' }}: {{ p.nameSeph.name[lang.lang()] }} · {{ p.nameFromHebrew ? (isHe ? 'גימטריה' : 'gematria') : (isHe ? 'מספר לטיני' : 'Latin number') }} {{ p.nameNumber }}</p>
                    <p>{{ p.month[lang.lang()] }} · {{ p.sign[lang.lang()] }} · {{ p.letter }} {{ p.letterName[lang.lang()] }} · {{ p.sense[lang.lang()] }}</p>
                  </article>
                }
              </div>
            }
            @if (face('bond') || face('tension') || face('lesson') || face('potential')) {
              <div class="pair-three">
                @if (face('bond')) {
                  <article>
                    <p class="s-kicker">{{ r.bond.kicker[lang.lang()] }}</p>
                    <h3>{{ r.bond.title[lang.lang()] }}</h3>
                    <p>{{ r.bond.text[lang.lang()] }}</p>
                  </article>
                }
                @if (face('tension')) {
                  <article>
                    <p class="s-kicker">{{ r.tension.kicker[lang.lang()] }}</p>
                    <h3>{{ r.tension.title[lang.lang()] }}</h3>
                    <p>{{ r.tension.text[lang.lang()] }}</p>
                  </article>
                }
                @if (face('lesson')) {
                  <article>
                    <p class="s-kicker">{{ r.lesson.kicker[lang.lang()] }}</p>
                    <h3>{{ r.lesson.title[lang.lang()] }}</h3>
                    <p>{{ r.lesson.text[lang.lang()] }}</p>
                  </article>
                }
                @if (face('potential')) {
                  <article>
                    <p class="s-kicker">{{ r.potential.kicker[lang.lang()] }}</p>
                    <h3>{{ r.potential.title[lang.lang()] }}</h3>
                    <p>{{ r.potential.text[lang.lang()] }}</p>
                  </article>
                }
              </div>
            }
            @if (face('outlook')) {
              <article class="pair-method">
                <p class="s-kicker">{{ r.outlook.kicker[lang.lang()] }}</p>
                <h3>{{ r.outlook.title[lang.lang()] }}</h3>
                <p>{{ r.outlook.text[lang.lang()] }}</p>
              </article>
            }
            @if (face('insights')) {
              <ol class="pair-insights">
                @for (line of r.insights; track line.en) { <li>{{ line[lang.lang()] }}</li> }
              </ol>
            }
            @if (face('life')) {
              <article class="pair-method">
                <p class="s-kicker">{{ isHe ? 'התאמת דרך החיים' : 'Life-path match' }}</p>
                <h3>{{ r.life.title[lang.lang()] }}</h3>
                <p>{{ r.life.attraction[lang.lang()] }}</p>
                <p>{{ r.life.challenge[lang.lang()] }}</p>
                <p>{{ r.life.repair[lang.lang()] }}</p>
              </article>
            }
            @if (face('names')) {
              <article class="pair-method">
                <p class="s-kicker">{{ isHe ? 'ספירת השם' : 'Name sephira' }}</p>
                <h3>{{ r.names.title[lang.lang()] }}</h3>
                <p>{{ r.names.attraction[lang.lang()] }}</p>
                <p>{{ r.names.potential[lang.lang()] }}</p>
              </article>
            }
            @if (face('letters')) {
              <article class="pair-method">
                <p class="s-kicker">{{ isHe ? 'אותיות ונתיבים' : 'Letters and paths' }}</p>
                <h3>{{ isHe ? 'האות הראשונה' : 'The first letter' }}</h3>
                <p>{{ r.letters[lang.lang()] }}</p>
              </article>
            }
            @if (face('months')) {
              <article class="pair-method">
                <p class="s-kicker">{{ isHe ? 'חודש הלידה העברי' : 'Hebrew birth month' }}</p>
                <h3>{{ isHe ? 'שער החודש' : 'The month’s gate' }}</h3>
                <p>{{ r.months[lang.lang()] }}</p>
              </article>
            }
            @if (face('ten')) {
              <h2>{{ isHe ? 'עשר הספירות' : 'The ten sephirot' }}</h2>
              <p class="pair-note">{{ isHe ? 'אין כאן ספירה טובה יותר. זו שפה להבדל ולחוזקה.' : 'No sephira is better. This is a language for difference and for strength.' }}</p>
              <div class="kb-ten">
                @for (s of tree; track s.id) {
                  <article class="kb-sef" [class.on]="onTree(s.id)">
                    <h3>{{ s.name[lang.lang()] }}</h3>
                    <p>{{ voice(s.id) }}</p>
                  </article>
                }
              </div>
            }
            <p class="pair-note">{{ r.disclaimer[lang.lang()] }}</p>
          </section>
        }

        @if (tab === 'pair' && !reading) {
          <p class="kb-tree-lead">{{ isHe ? 'שני שמות ושני תאריכים פותחים את המפה.' : 'Two names and two dates open the map.' }}</p>
        }

        @if (tab === 'way') {
          <section class="s-block">
            <p class="s-kicker">✦ {{ isHe ? 'איך זה מחושב' : 'How it is calculated' }}</p>
            <h2>{{ isHe ? 'שיטה אחת, לא פסיקה' : 'One method, not a ruling' }}</h2>
            <p>{{ method[lang.lang()] }}</p>
            <p class="pair-note">{{ disclaimer[lang.lang()] }}</p>
            <h2>{{ isHe ? 'עשר הספירות בזוגיות' : 'The ten sephirot in a couple' }}</h2>
            <div class="kb-ten">
              @for (s of tree; track s.id) {
                <article class="kb-sef">
                  <h3>{{ s.n }} · {{ s.name[lang.lang()] }}</h3>
                  <p>{{ voice(s.id) }}</p>
                </article>
              }
            </div>
            @for (section of page.more; track section.title.en) {
              <article class="pair-method">
                <h3>{{ section.title[lang.lang()] }}</h3>
                <p>{{ section.text[lang.lang()] }}</p>
              </article>
            }
          </section>
        }
      </div>

      <dialog class="map-dialog" #dlg (click)="backdrop($event)">
        @if (current(); as cur) {
          <div class="map-dialog-bar">
            <h2>{{ cur.name[lang.lang()] }}</h2>
            <button type="button" class="map-close" (click)="close()" [attr.aria-label]="isHe ? 'סגירה' : 'Close'">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="map-info kb-detail">
            <div class="kb-d-head">
              <span class="kb-d-num">{{ cur.n }}</span>
              <p class="kb-d-meaning">{{ cur.meaning[lang.lang()] }}</p>
            </div>
            @if (tab === 'tree' && life === cur.id) { <p class="kb-d-tag">{{ isHe ? 'ספירת דרך החיים שלך' : 'Your life-path sephira' }}</p> }
            @if (tab === 'tree' && named === cur.id) { <p class="kb-d-tag">{{ isHe ? 'ספירת השם שלך' : 'Your name sephira' }}</p> }
            @if (tab === 'pair' && marks(cur.id)) { <p class="kb-d-tag">{{ marks(cur.id) }}</p> }
            <p class="kb-d-theme">{{ cur.theme[lang.lang()] }}</p>
            <p class="kb-d-theme">{{ voice(cur.id) }}</p>
            <dl class="kb-facts">
              <div><dt>{{ isHe ? 'חוזקה' : 'Gift' }}</dt><dd>{{ cur.gift[lang.lang()] }}</dd></div>
              <div><dt>{{ isHe ? 'אתגר' : 'Challenge' }}</dt><dd>{{ cur.challenge[lang.lang()] }}</dd></div>
              <div><dt>{{ isHe ? 'עולם' : 'World' }}</dt><dd>{{ worldName(cur.world) }}</dd></div>
              <div><dt>{{ isHe ? 'כוכב' : 'Planet' }}</dt><dd>{{ cur.planet[lang.lang()] }}</dd></div>
              @if (detail && tab === 'tree') {
                <div><dt>{{ isHe ? 'שם' : 'Name' }}</dt><dd>{{ cur.divineName }}</dd></div>
                @if (cur.figure.he !== '—') {
                  <div><dt>{{ isHe ? 'דמות' : 'Figure' }}</dt><dd>{{ cur.figure[lang.lang()] }}</dd></div>
                }
                <div><dt>{{ isHe ? 'בגוף' : 'In the body' }}</dt><dd>{{ cur.body[lang.lang()] }}</dd></div>
              }
            </dl>
            @if (detail && tab === 'tree') {
              <p class="kb-d-theme">{{ isHe ? 'נתיבים שיוצאים מכאן:' : 'Paths from here:' }} {{ linkedLetters(cur.id) }}</p>
            }
            @if (letter && tab === 'tree' && (life === cur.id || named === cur.id)) { <p class="kb-d-theme">{{ letter }}</p> }
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
  readonly page = PAGE_INFO.kabbalah;
  readonly method = TREE_LOVE_METHOD;
  readonly disclaimer = TREE_LOVE_DISCLAIMER;
  readonly stars = Array.from({ length: 18 }, (_, i) => i);
  readonly kinds: { id: KbKind; label: L }[] = [
    { id: 'full', label: { he: 'ניתוח משולב', en: 'Full reading' } },
    { id: 'sefirot', label: { he: 'ספירות', en: 'Sephirot' } },
    { id: 'letters', label: { he: 'אותיות וחודשים', en: 'Letters and months' } },
    { id: 'outlook', label: { he: 'תחזית סמלית', en: 'Symbolic outlook' } },
    { id: 'practical', label: { he: 'התאמה מעשית', en: 'Practical match' } },
  ];
  tab: KbTab = 'tree';
  kind: KbKind = 'full';
  name = '';
  birth = '';
  sunset = false;
  aName = '';
  bName = '';
  aBirth = '';
  bBirth = '';
  aSunset = false;
  bSunset = false;
  error = '';
  detail = false;
  sel: SephiraId = 'tiferet';
  life: SephiraId | null = null;
  named: SephiraId | null = null;
  letter = '';
  monthLetter = '';
  pathN: number | null = null;
  reading: TreeLoveReading | null = null;

  get isHe(): boolean { return this.lang.lang() === 'he'; }

  setTab(tab: KbTab): void {
    this.tab = tab;
    this.error = '';
  }

  face(part: 'people' | 'bond' | 'tension' | 'lesson' | 'potential' | 'outlook' | 'insights' | 'life' | 'names' | 'letters' | 'months' | 'ten'): boolean {
    const k = this.kind;
    if (k === 'full') return true;
    if (k === 'sefirot') return part === 'people' || part === 'bond' || part === 'tension' || part === 'life' || part === 'names' || part === 'ten';
    if (k === 'letters') return part === 'people' || part === 'letters' || part === 'months';
    if (k === 'outlook') return part === 'people' || part === 'lesson' || part === 'outlook';
    return part === 'people' || part === 'tension' || part === 'insights';
  }

  voice(id: SephiraId): string { return SEPHIRA_VOICE[id][this.lang.lang()]; }

  current() { return sephira(this.sel); }

  open(id: SephiraId): void {
    this.sel = id;
    this.cd.detectChanges();
    const dlg = this.dlg()?.nativeElement;
    if (dlg && !dlg.open) dlg.showModal();
  }

  close(): void { this.dlg()?.nativeElement.close(); }

  backdrop(event: MouseEvent): void {
    if (event.target === this.dlg()?.nativeElement) this.close();
  }

  at(id: SephiraId) { return sephira(id); }
  worldName(id: string) { return WORLDS.find((w) => w.id === id)?.name[this.lang.lang()] ?? ''; }
  lifeWorld() { return this.life ? sephira(this.life).world : null; }

  isLife(id: SephiraId): boolean {
    if (this.tab === 'pair' && this.reading) return this.reading.people.some((p) => p.life.id === id);
    return this.life === id;
  }

  showRing(id: SephiraId): boolean {
    if (this.tab === 'pair' && this.reading) return this.reading.people.some((p) => p.nameSeph.id === id);
    return this.named === id && this.named !== this.life;
  }

  pathHot(letter: string): boolean {
    if (this.tab === 'pair' && this.reading) return this.reading.people.some((p) => p.letter === letter);
    return this.monthLetter === letter;
  }

  onTree(id: SephiraId): boolean {
    return !!this.reading && this.reading.people.some((p) => p.life.id === id || p.nameSeph.id === id);
  }

  marks(id: SephiraId): string {
    if (!this.reading) return '';
    const bits: string[] = [];
    for (const p of this.reading.people) {
      if (p.life.id === id) bits.push(this.isHe ? `דרך החיים של ${p.name}` : `${p.name}: life path`);
      if (p.nameSeph.id === id) bits.push(this.isHe ? `השם של ${p.name}` : `${p.name}: name`);
    }
    return bits.join(' · ');
  }

  treeLead(): string {
    if (this.tab === 'pair') {
      return this.isHe
        ? 'העיגול המלא הוא דרך החיים. הטבעת היא ספירת השם. הקו הבהיר הוא אות חודש הלידה.'
        : 'A filled circle is a life path. A ring is a name sephira. A bright line is the birth-month letter.';
    }
    return this.detail
      ? (this.isHe
        ? '22 האותיות על הנתיבים, מספר כל ספירה, וארבעת העולמות. לחצו על אות כדי לקרוא על הנתיב.'
        : 'The 22 letters on the paths, a number on each sephira, and the four worlds. Click a letter to read the path.')
      : (this.isHe
        ? 'מפה של עשר ספירות. לחצו על עיגול וההסבר ייפתח בחלון. הקווים הם הנתיבים שמחברים ביניהן.'
        : 'A map of ten sephirot. Click a circle and the explanation opens in a window. The lines are the paths that join them.');
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

  pickPath(n: number): void { this.pathN = this.pathN === n ? null : n; }
  chosenPath() { return this.paths.find((p) => p.n === this.pathN) ?? null; }

  pathLabel(p: TreePath): string {
    const from = this.at(p.from).name[this.lang.lang()];
    const to = this.at(p.to).name[this.lang.lang()];
    const label = p.letterName[this.lang.lang()];
    return this.isHe ? `נתיב ${p.n} · ${label} · מחבר ${from} ו${to}` : `Path ${p.n} · ${label} · joins ${from} and ${to}`;
  }

  senseOf(letter: string): string { return SENSE_TEXT[letter]?.[this.lang.lang()] ?? ''; }

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
      const path = PATHS22.find((item) => item.letter === ml.letter);
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

  submitPair(event: Event): void {
    event.preventDefault();
    try {
      const A = readProfile(this.lang.text(), this.aName, this.aBirth, this.aSunset);
      const B = readProfile(this.lang.text(), this.bName, this.bBirth, this.bSunset);
      this.reading = treeLove(
        { name: A.name, birth: this.aBirth, sunset: this.aSunset },
        { name: B.name, birth: this.bBirth, sunset: this.bSunset },
      );
      this.error = '';
      void this.reveal();
    } catch (err) {
      this.reading = null;
      this.error = (err as Error).message;
    }
  }

  samplePair(): void {
    this.aName = this.isHe ? 'נועה לוי' : 'Noa Levi';
    this.bName = this.isHe ? 'דניאל כהן' : 'Daniel Cohen';
    this.aBirth = '1990-03-15';
    this.bBirth = '1992-07-30';
    this.aSunset = false;
    this.bSunset = false;
    this.kind = 'full';
    this.submitPair(new Event('submit'));
  }

  private async reveal(): Promise<void> {
    this.cd.detectChanges();
    const ion = document.querySelector('ion-content') as (HTMLElement & { getScrollElement?: () => Promise<HTMLElement> }) | null;
    const el = document.getElementById('kb-soul');
    if (!el || !ion?.getScrollElement) return;
    const sc = await ion.getScrollElement();
    sc.scrollTo({ top: el.getBoundingClientRect().top + sc.scrollTop - 12, behavior: 'smooth' });
  }
}
