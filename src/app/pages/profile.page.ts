import { ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { IonButton, IonCheckbox, IonIcon, IonInput, IonNote } from '@ionic/angular';
import {
  BIRTH_MONTH, COUNTRY_CODES, ELEMENTS, ELEMENT_DESCRIPTIONS, MODALITIES, MODALITY_DESCRIPTIONS, NUMBER_MEANINGS, PLACES,
  ZODIAC, chartFor, natalAspects, countryName as countryLabel, type Profile, type ZodiacSign,
} from '../../core';
import { lifeAreas } from '../../core/life-areas';
import { AREA_WHY, CN_ELEMENT, CN_POLE, MOON_NEED, NUMBER_USE, RISE_FACE, STONE_NOTE } from '../../core/reading-use';
import { pageUrlForShare, setSharePreview } from '../../core/seo';
import { ASPECT_INFO } from '../../core/texts';
import { SHARE_CHANNELS } from '../../core/share-channels';
import { profileShareText, profileShortText } from '../../core/share-text';
import { CHART_SANCTUARY } from '../../core/chart-sanctuary';
import { readingFacts } from '../../core/reading-facts';
import { LangService } from '../lang.service';
import { ReadingService } from '../reading.service';
import { readProfile } from '../profile';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';
import { loadJSON, saveJSON } from '../storage';

type AtlasTab = 'map' | 'gifts' | 'about' | 'faq';

@Component({
  selector: 'app-profile',
  imports: [ScreenComponent, RouterLink, WhenFieldComponent, IonButton, IonCheckbox, IonInput, IonNote, IonIcon],
  templateUrl: './profile.page.html',
})
export class ProfilePage {
  readonly lang = inject(LangService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly reading = inject(ReadingService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly marks = new Map(SHARE_CHANNELS.map((c) => [c.id, this.sanitizer.bypassSecurityTrustHtml(c.icon)]));
  private readonly shareDlg = viewChild<ElementRef<HTMLDialogElement>>('shareDlg');
  copied = false;
  shareTip = false;
  wheelTip = false;
  hover: ZodiacSign | null = null;
  readonly ELEMENTS = ELEMENTS;
  private readonly monthsHe = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
  private readonly monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  /** הסבר קצר אחרי פתיחת אינסטגרם: הטקסט מועתק, או שמעתיקים אותו מהכפתור למטה. */
  igNote = '';
  canNative = typeof navigator !== 'undefined' && !!navigator.share;
  readonly sanctuary = CHART_SANCTUARY;
  readonly stars = Array.from({ length: 18 }, (_, i) => i);
  readonly today = new Date().toISOString().slice(0, 10);
  readonly signs = ZODIAC;
  tab: AtlasTab = 'map';
  faqOpen: number | null = null;
  readonly countries = COUNTRY_CODES;
  name = '';
  birth = '';
  sunset = false;
  time = '';
  timeKnown = true;
  cc = 'IL';
  placeId = '';
  sky: { title: string; value: string; text: string; source: string }[] = [];
  profile = signal<Profile | null>(null);
  error = '';
  weaveSections: { title: string; lines: string[] }[] = [];
  weaveError = '';
  weaveBusy = false;
  weaveStep = 0;
  private weaveTimer: ReturnType<typeof setInterval> | null = null;
  private thinkHooked = false;
  private readonly thinkHe = ['קורא את מיקומי הכוכבים', 'מחפש את ההיבט ההדוק', 'כותב תמונת אישיות'];
  private readonly thinkEn = ['Reading the planet positions', 'Looking for the tightest aspect', 'Writing a personality picture'];
  private rot = 0;
  private lastIndex: number | null = null;
  /** מחכים שהגלגל ייכנס למסך, ואז מתחיל הסיבוב */
  private holdSpin = false;

  constructor() {
    loadJSON<{ name: string; birth: string; sunset: boolean; time?: string; timeKnown?: boolean; cc?: string; placeId?: string }>('astro:last').then((s) => {
      if (!s) return;
      this.name = s.name;
      this.birth = s.birth;
      this.sunset = s.sunset;
      this.time = s.time ?? '';
      this.timeKnown = s.timeKnown ?? true;
      this.cc = s.cc || 'IL';
      this.placeId = s.placeId ?? '';
      this.cd.detectChanges();
    });
  }

  submit(event: Event): void {
    event.preventDefault();
    const input = { name: this.name, birth: this.birth, sunset: this.sunset };
    try {
      const profile = readProfile(this.lang.text(), input.name, input.birth, input.sunset);
      const wheelOnScreen = this.wheelInView();
      this.holdSpin = !wheelOnScreen;
      this.profile.set(profile);
      this.sky = this.readSky();
      this.error = '';
      this.weaveSections = [];
      this.weaveError = '';
      const lang = this.lang.lang();
      setSharePreview(this.lang.text().signTitle(profile.western.name[lang]), profileShortText(profile, lang), pageUrlForShare(lang));
      saveJSON('astro:last', { ...input, time: this.time, timeKnown: this.timeKnown, cc: this.cc, placeId: this.placeId });
      if (this.placeId) {
        saveJSON('astro:birth:me', {
          name: this.name.trim(), date: this.birth, time: this.time, timeKnown: this.timeKnown && !!this.time, placeId: this.placeId,
        });
      }
      this.cd.detectChanges();
      void this.revealResult(wheelOnScreen);
    } catch (err) {
      this.profile.set(null);
      this.sky = [];
      this.error = (err as Error).message;
    }
  }

  sample(): void {
    const he = this.lang.lang() === 'he';
    this.name = he ? 'נועה לוי' : 'Noa Levi';
    this.birth = '1990-03-15';
    this.sunset = false;
    this.time = '';
    this.timeKnown = true;
    this.placeId = '';
    this.submit(new Event('submit'));
  }

  txt(value: { he: string; en: string }): string { return value[this.lang.lang()]; }

  setTab(tab: AtlasTab): void {
    this.tab = tab;
    const ion = document.querySelector('ion-content') as (HTMLElement & { scrollToTop?: (ms?: number) => void }) | null;
    ion?.scrollToTop?.(0);
  }

  toggleFaq(index: number): void {
    this.faqOpen = this.faqOpen === index ? null : index;
  }

  /** הגלגל שלם בתוך החלון, לא חתוך למעלה או למטה. */
  private wheelInView(): boolean {
    const wheel = document.querySelector('.wheel-box');
    if (!wheel) return true;
    const r = wheel.getBoundingClientRect();
    return r.height > 40 && r.top >= 8 && r.bottom <= window.innerHeight - 8;
  }

  private async revealResult(wheelOnScreen: boolean): Promise<void> {
    const ion = document.querySelector('ion-content') as (HTMLElement & { getScrollElement?: () => Promise<HTMLElement> }) | null;
    const wheel = document.querySelector('.wheel-box');
    if (!wheel) return;
    if (!ion?.getScrollElement) {
      wheel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.releaseSpin();
      return;
    }
    const sc = await ion.getScrollElement();
    const port = sc.getBoundingClientRect();
    if (!wheelOnScreen) {
      const wr = wheel.getBoundingClientRect();
      sc.scrollTo({ top: Math.max(0, wr.top - port.top + sc.scrollTop - 16), behavior: 'smooth' });
      await new Promise((resolve) => setTimeout(resolve, 650));
      this.releaseSpin();
      return;
    }
    const result = document.querySelector('.result');
    if (!result) return;
    const top = result.getBoundingClientRect().top - port.top + sc.scrollTop - 16;
    if (result.getBoundingClientRect().top > port.bottom - 120) {
      sc.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }
  }

  private releaseSpin(): void {
    if (!this.holdSpin) return;
    this.holdSpin = false;
    this.cd.detectChanges();
  }

  countryName(cc: string): string { return countryLabel(cc, this.lang.lang()); }
  cities() { return PLACES.filter((p) => p.cc === this.cc); }

  onTime(value: string): void { this.time = value; }
  onTimeKnown(event: CustomEvent): void { this.timeKnown = !event.detail.checked; }
  onCountry(event: Event): void {
    this.cc = (event.target as HTMLSelectElement).value;
    if (!this.cities().some((c) => c.id === this.placeId)) this.placeId = '';
  }
  onPlace(event: Event): void { this.placeId = (event.target as HTMLSelectElement).value; }

  thinkLine(): string {
    const lines = this.lang.lang() === 'he' ? this.thinkHe : this.thinkEn;
    return lines[this.weaveStep % lines.length];
  }

  async weave(p: Profile): Promise<void> {
    if (this.weaveBusy) return;
    this.weaveBusy = true;
    this.weaveError = '';
    this.weaveStep = 0;
    this.startThink();
    this.cd.detectChanges();
    try {
      const facts = readingFacts(p, this.lang.lang(), this.skyFacts());
      this.weaveSections = await this.reading.weave(facts);
    } catch (err) {
      this.weaveError = this.weaveMessage((err as Error).message);
    } finally {
      this.stopThink();
      this.weaveBusy = false;
      this.cd.detectChanges();
    }
  }

  private startThink(): void {
    this.stopThink();
    if (!this.thinkHooked) {
      this.thinkHooked = true;
      this.destroyRef.onDestroy(() => this.stopThink());
    }
    this.weaveTimer = setInterval(() => {
      this.weaveStep += 1;
      this.cd.detectChanges();
    }, 1600);
  }

  private stopThink(): void {
    if (!this.weaveTimer) return;
    clearInterval(this.weaveTimer);
    this.weaveTimer = null;
  }

  private skyFacts() {
    if (!this.placeId) return {};
    const lang = this.lang.lang();
    const he = lang === 'he';
    const known = this.timeKnown && !!this.time;
    const { chart, place } = chartFor({
      name: this.name.trim() || this.lang.text().guest,
      date: this.birth,
      time: this.time || '12:00',
      timeKnown: known,
      placeId: this.placeId,
    }, lang);
    const names: Record<string, string> = he
      ? { sun: 'שמש', moon: 'ירח', mercury: 'כוכב חמה', venus: 'נוגה', mars: 'מאדים', jupiter: 'צדק', saturn: 'שבתאי', asc: 'מזל עולה' }
      : { sun: 'Sun', moon: 'Moon', mercury: 'Mercury', venus: 'Venus', mars: 'Mars', jupiter: 'Jupiter', saturn: 'Saturn', asc: 'Ascendant' };
    const ids = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn'] as const;
    const bodies = ids.flatMap((id) => {
      const point = chart.points[id];
      if (!point) return [];
      const house = known && point.house ? (he ? `, בית ${point.house}` : `, house ${point.house}`) : '';
      const retro = point.retro ? (he ? ', נסיגה' : ', retrograde') : '';
      const placeIn = he ? `ב${point.sign.name.he}` : `in ${point.sign.name.en}`;
      return [`${names[id]} ${placeIn} ${Math.round(point.deg)}°${house}${retro}`];
    });
    const asc = chart.points.asc;
    if (known && asc) {
      bodies.push(he
        ? `${names.asc} ב${asc.sign.name.he} ${Math.round(asc.deg)}°`
        : `${names.asc} in ${asc.sign.name.en} ${Math.round(asc.deg)}°`);
    }
    const personal = new Set<string>(known ? ['sun', 'moon', 'mercury', 'venus', 'mars', 'asc'] : ['sun', 'moon', 'mercury', 'venus', 'mars']);
    const aspects = natalAspects(chart)
      .filter((aspect) => personal.has(aspect.a) && personal.has(aspect.b) && aspect.orb <= 5)
      .slice(0, 5)
      .map((aspect) => he
        ? `${names[aspect.a]} ${ASPECT_INFO[aspect.type].name.he} ${names[aspect.b]}, מרחק ${aspect.orb.toFixed(1)} מעלות`
        : `${names[aspect.a]} ${ASPECT_INFO[aspect.type].name.en} ${names[aspect.b]}, ${aspect.orb.toFixed(1)} degrees apart`);
    const moon = chart.points.moon;
    const moonName = moon?.sign.name[lang];
    return {
      moon: moon && moonName ? { sign: moonName, estimated: !known, place: place.label } : undefined,
      rising: asc && known ? { sign: asc.sign.name[lang], place: place.label, time: this.time } : undefined,
      bodies,
      aspects,
    };
  }

  private weaveMessage(code: string): string {
    const he = this.lang.lang() === 'he';
    if (code === 'missing-key') {
      return he
        ? 'כדי לכתוב את הקריאה צריך מפתח. יוצרים קובץ בשם .env בשורש הפרויקט, כותבים בו ANTHROPIC_API_KEY= והמפתח, ומפעילים מחדש.'
        : 'A key is needed to write the reading. Create a file named .env in the project root, write ANTHROPIC_API_KEY= and the key, then start again.';
    }
    if (code === 'rejected-key') {
      return he
        ? 'המפתח בקובץ .env לא מוכר. יוצרים מפתח חדש, מדביקים אותו בשורה ANTHROPIC_API_KEY, ושומרים. אחר כך מפעילים מחדש.'
        : 'The key in the .env file is not recognized. Create a new key, paste it on the ANTHROPIC_API_KEY line, and save. Then start again.';
    }
    if (code === 'offline') {
      return he
        ? 'שרת הקריאה לא רץ. מפעילים את האפליקציה מחדש.'
        : 'The reading server is not running. Start the app again.';
    }
    return he ? 'הקריאה לא נכתבה. אפשר לנסות שוב.' : 'The reading was not written. You can try again.';
  }

  /** ירח ומזל עולה — רק כשיש מקום. בלי שעה הירח משוער ואין אופק. */
  private readSky(): { title: string; value: string; text: string; source: string }[] {
    if (!this.placeId) return [];
    const lang = this.lang.lang();
    const he = lang === 'he';
    const known = this.timeKnown && !!this.time;
    const { chart, place } = chartFor({
      name: this.name.trim() || this.lang.text().guest,
      date: this.birth,
      time: this.time || '12:00',
      timeKnown: known,
      placeId: this.placeId,
    }, lang);
    const sun = this.profile()!.western;
    const moon = chart.points.moon!;
    const moonName = moon.sign.name[lang];
    const sunName = sun.name[lang];
    const same = moon.sign.id === sun.id;
    const clock = known
      ? ''
      : (he ? ` בלי שעה מדויקת, זו הערכה לצהריים ב${place.label}. שעה אחרת יכולה להזיז את הירח.` : ` Without an exact time, this is a noon estimate in ${place.label}. Another hour can move the Moon.`);
    const moonLead = he
      ? `הירח שלך ב${moonName}. הירח הוא הצורך כשאתה לבד, לא מזל השמש.`
      : `Your Moon is in ${moonName}. The Moon is what you need when you are alone. It is not the Sun sign.`;
    const sunAside = same
      ? (he ? ` כאן הוא יושב באותו מזל כמו השמש, ${sunName}.` : ` Here it sits in the same sign as the Sun, ${sunName}.`)
      : (he ? ` מזל השמש שלך הוא ${sunName}, וזה איך אתה פועל עם אנשים.` : ` Your Sun sign is ${sunName}, and that is how you act with people.`);
    const cards = [{
      title: he ? 'הירח · איך אתה מרגיש לבד' : 'The Moon · how you feel alone',
      value: `${moonName} ${moon.sign.symbol}`,
      text: `${moonLead}${sunAside} ${MOON_NEED[moon.sign.id][lang]}`,
      source: (he
        ? 'מה זה נותן לך: הסבר לימים שבהם אתה לא מרגיש כמו שאתה נראה. תן לעצמך את מה שמרגיע כאן.'
        : 'What this gives you: an explanation for days you do not feel the way you look. Give yourself what calms you here.') + clock,
    }];
    const asc = chart.points.asc;
    if (asc && known) {
      const rise = asc.sign.name[lang];
      cards.push({
        title: he ? 'המזל העולה · איך זרים קוראים אותך' : 'The rising sign · how strangers read you',
        value: `${rise} ${asc.sign.symbol}`,
        text: he
          ? `ב${place.label} בשעה ${this.time} עלה באופק מזל ${rise}. זה הרושם בדקה הראשונה, לפני שמכירים אותך. ${RISE_FACE[asc.sign.id][lang]}`
          : `In ${place.label} at ${this.time}, ${rise} was rising on the horizon. That is the first impression, before anyone knows you. ${RISE_FACE[asc.sign.id][lang]}`,
        source: he
          ? 'זה לא מזל השמש. השמש היא איך אתה פועל. המזל העולה הוא איך נכנסים אליך לחדר.'
          : 'This is not the Sun sign. The Sun is how you act. The rising sign is how you enter a room.',
      });
    }
    return cards;
  }

  hebrewBody(p: Profile): string {
    const he = this.lang.lang() === 'he';
    const same = p.hebrew.sign.id === p.western.id;
    if (he) {
      return same
        ? `גם לפי החודש העברי יצא ${p.hebrew.sign.name.he}. התיאור שלמעלה מתאים לך משני כיוונים: העונה שנולדת בה, והלוח של הבית. זאת תמונה אחת של האופי, לא שני סיפורים.`
        : `לפי החודש העברי יצא ${p.hebrew.sign.name.he}, לא ${p.western.name.he}. ${p.hebrew.sign.text.he} המזל שלמעלה הוא איך אתה נראה בעונה שנולדת בה. המזל הזה הוא הצד של הבית ושל המשפחה.`;
    }
    return same
      ? `The Hebrew month gives ${p.hebrew.sign.name.en} too. The description above fits you from two directions: the season you were born in, and the calendar of home. One picture of character, not two stories.`
      : `The Hebrew month gives ${p.hebrew.sign.name.en}, not ${p.western.name.en}. ${p.hebrew.sign.text.en} The sign above is how you look in the season you were born. This one is the side of home and family.`;
  }

  hebrewGives(p: Profile): string {
    const he = this.lang.lang() === 'he';
    const same = p.hebrew.sign.id === p.western.id;
    if (he) {
      return same
        ? 'מה זה נותן לך: אפשר לסמוך על תיאור המזל שלמעלה. אין כאן גרסה שנייה שסותרת אותו.'
        : 'מה זה נותן לך: שני חדרים. בחוץ ובשגרה — המזל שלמעלה. בבית ועם המשפחה — המזל העברי.';
    }
    return same
      ? 'What this gives you: you can rely on the sign description above. There is no second version that contradicts it.'
      : 'What this gives you: two rooms. Outside and in daily life — the sign above. At home and with family — the Hebrew sign.';
  }

  chineseBody(p: Profile): string {
    const lang = this.lang.lang();
    const el = CN_ELEMENT[p.chinese.element[lang]]?.[lang] ?? '';
    const pole = CN_POLE[p.chinese.polarity[lang]]?.[lang] ?? '';
    return `${p.chinese.animal.text[lang]} ${el} ${pole}`.trim();
  }

  chineseGives(): string {
    return this.lang.lang() === 'he'
      ? 'מה זה נותן לך: תמונה של איך אתה עובד לאורך שנים, לא של השבוע הזה. זה לא מחליף את מזל השמש.'
      : 'What this gives you: a picture of how you work over years, not of this week. It does not replace the Sun sign.';
  }

  lifeGives(p: Profile): string {
    return NUMBER_USE[p.lifePath]?.[this.lang.lang()] ?? '';
  }

  nameBody(p: Profile): string {
    const lang = this.lang.lang();
    const style = NUMBER_MEANINGS[p.nameNum.number].text[lang];
    const same = p.nameNum.number === p.lifePath;
    if (lang === 'he') {
      const extra = same ? ' יצא אותו מספר כמו במסלול החיים: השם והתאריך מספרים אותו סיפור.' : ' זה לפי השם שכתבת, לא לפי התאריך. ככה אנשים פוגשים אותך בשיחה הראשונה.';
      return style + extra;
    }
    const extra = same ? ' It matches the life-path number: the name and the date tell the same story.' : ' This is from the name you typed, not the date. This is how people meet you in the first conversation.';
    return style + extra;
  }

  nameGives(p: Profile): string {
    const he = this.lang.lang() === 'he';
    if (p.nameNum.number === p.lifePath) {
      return he
        ? 'מה זה נותן לך: חיזוק למה שכבר כתוב במסלול החיים. השם לא מושך לכיוון אחר.'
        : 'What this gives you: support for what the life path already says. The name does not pull another way.';
    }
    return NUMBER_USE[p.nameNum.number]?.[this.lang.lang()] ?? '';
  }

  celticGives(): string {
    return this.lang.lang() === 'he'
      ? 'מה זה נותן לך: תזכורת למה שאפשר להישען עליו כשקשה. זה דימוי לאופי, לא עץ שצריך לגדל.'
      : 'What this gives you: a reminder of what to lean on when things are hard. An image of character, not a tree to grow.';
  }

  tarotGives(): string {
    return this.lang.lang() === 'he'
      ? 'מה זה נותן לך: משפט אחד לתקופה. כשמשהו תקוע, בודקים אם אתה הולך נגד המשפט הזה.'
      : 'What this gives you: one sentence for this stretch of life. When something is stuck, check whether you are going against that sentence.';
  }

  stoneBody(p: Profile): string {
    const i = BIRTH_MONTH.indexOf(p.birth);
    const note = STONE_NOTE[i];
    return note ? note[this.lang.lang()] : '';
  }

  stoneGives(): string {
    return this.lang.lang() === 'he'
      ? 'מה זה נותן לך: סמל לחודש שנולדת בו, כמו תזכורת בכיס. לא תרופה, ולא סיבה לקנות תכשיט.'
      : 'What this gives you: a symbol of the month you were born, like a reminder in a pocket. Not medicine, and not a reason to buy jewellery.';
  }

  areaWhy(key: 'career' | 'money' | 'love' | 'health' | 'strengths' | 'challenges'): string {
    return AREA_WHY[key][this.lang.lang()];
  }

  lifePathCareer(p: Profile): string {
    const bit = this.areas(p).lifePath.career[this.lang.lang()];
    return this.lang.lang() === 'he'
      ? `לפי מספר דרך החיים: ${bit}. אם זה תחום אחר מהשורה שלמעלה, הסגנון היומי נשאר של המזל, והכיוון לאורך שנים הוא של המספר.`
      : `From the life-path number: ${bit} If that is a different field from the line above, the daily style stays with the sign, and the long aim stays with the number.`;
  }

  lifePathLove(p: Profile): string {
    const bit = this.areas(p).lifePath.love[this.lang.lang()];
    return this.lang.lang() === 'he'
      ? `לפי מספר החיים, מה הקשר צריך לאורך זמן: ${bit}`
      : `From the life-path number, what the bond needs over time: ${bit}`;
  }

  healthExtra(p: Profile): string {
    return this.areas(p).healthEl[this.lang.lang()];
  }

  onName(event: CustomEvent): void { this.name = String(event.detail.value ?? ''); }
  onBirth(value: string): void { this.birth = value; }
  onSunset(event: CustomEvent): void { this.sunset = !!event.detail.checked; }

  signIndex(): number | null {
    const profile = this.profile();
    return profile ? ZODIAC.indexOf(profile.western) : null;
  }

  wheelRotation(): number {
    const index = this.signIndex();
    if (this.holdSpin) return this.rot;
    if (index !== null && index !== this.lastIndex) {
      const target = -index * 30;
      const delta = (((target - this.rot) % 360) + 360) % 360;
      this.rot += delta + 360;
      this.lastIndex = index;
    }
    return this.rot;
  }

  pt(deg: number, r: number): { x: number; y: number } {
    const a = ((deg - 90) * Math.PI) / 180;
    return { x: 110 + r * Math.cos(a), y: 110 + r * Math.sin(a) };
  }

  /** פלח של 30° סביב סמל המזל, כדי שריחוף יתפוס את כל התא ולא רק את הסימן. */
  sector(i: number): string {
    const a0 = i * 30 - 15;
    const a1 = i * 30 + 15;
    const o0 = this.pt(a0, 104);
    const o1 = this.pt(a1, 104);
    const i1 = this.pt(a1, 64);
    const i0 = this.pt(a0, 64);
    return `M ${o0.x} ${o0.y} A 104 104 0 0 1 ${o1.x} ${o1.y} L ${i1.x} ${i1.y} A 64 64 0 0 0 ${i0.x} ${i0.y} Z`;
  }

  showSign(sign: ZodiacSign, event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.hover = sign;
  }

  hideSign(event: PointerEvent): void {
    if (event.pointerType === 'touch') return;
    this.hover = null;
  }

  tapSign(sign: ZodiacSign, event: PointerEvent): void {
    if (event.pointerType !== 'touch') return;
    this.hover = this.hover?.id === sign.id ? null : sign;
  }

  signDates(sign: ZodiacSign): string {
    const he = this.lang.lang() === 'he';
    const months = he ? this.monthsHe : this.monthsEn;
    const [m1, d1] = sign.from;
    const [m2, d2] = sign.to;
    return he ? `${d1} ב${months[m1 - 1]} – ${d2} ב${months[m2 - 1]}` : `${months[m1 - 1]} ${d1} – ${months[m2 - 1]} ${d2}`;
  }

  signLine(sign: ZodiacSign): string {
    const text = sign.text[this.lang.lang()];
    const cut = text.indexOf('. ');
    return cut === -1 ? text : text.slice(0, cut + 1);
  }

  areas(p: Profile) { return lifeAreas(p); }
  life(p: Profile) { return NUMBER_MEANINGS[p.lifePath]; }
  nameNum(p: Profile) { return NUMBER_MEANINGS[p.nameNum.number]; }
  elementName(p: Profile) { return ELEMENTS[p.western.element][this.lang.lang()]; }
  elementText(p: Profile) { return ELEMENT_DESCRIPTIONS[p.western.element][this.lang.lang()]; }
  modalityName(p: Profile) { return MODALITIES[p.western_modality][this.lang.lang()]; }
  modalityText(p: Profile) { return MODALITY_DESCRIPTIONS[p.western_modality][this.lang.lang()]; }

  /** מזל השמש והחלק בתוכו, כל משפט בנקודה משלו. */
  portraitPoints(p: Profile): string[] {
    const he = this.lang.lang() === 'he';
    const lang = this.lang.lang();
    const n = p.western_decan.decan.number;
    const which = he ? ['הראשון', 'השני', 'השלישי'][n - 1] : ['first', 'second', 'third'][n - 1];
    const color = SUN_COLOR[p.western.id]?.[lang] ?? [p.western.ruler[lang]];
    const partBits = p.western_decan.decan.text[lang]
      .split(/\.\s*/)
      .map((bit) => bit.trim())
      .filter(Boolean)
      .flatMap((bit) => {
        const pair = bit.split(/\s+ו|\s+and\s+/i).map((side) => side.trim()).filter(Boolean);
        return pair.length === 2 && pair.every((side) => side.split(/\s+/).length === 1) ? pair : [bit];
      });
    return [
      ...(he
        ? ['מזל השמש הוא מה שרואים בך ביום־יום.', 'זה איך אתה ניגש לאנשים ולהחלטות.']
        : ['The Sun sign is what people see day to day.', 'It is how you approach people and decisions.']),
      ...ELEMENT_POINTS[p.western.element][lang],
      ...MODALITY_POINTS[p.western_modality][lang],
      ...color.map((bit) => he ? `מה שצובע את זה: ${bit}.` : `What colors it: ${bit}.`),
      ...(he
        ? ['כל מזל מחולק לשלושה חלקים.', 'החלוקה היא לפי היום שנולדת בתוכו.', `אתה בחלק ${which}.`]
        : ['Each sign is split into three parts.', 'The split follows the day you were born inside it.', `You are in the ${which} part.`]),
      ...partBits.map((bit) => bit.endsWith('.') ? bit : `${bit}.`),
    ];
  }

  shareBody(p: Profile): string {
    const lang = this.lang.lang();
    const url = pageUrlForShare(lang);
    const brand = lang === 'he' ? 'מה כתוב בכוכבים' : 'What the stars say';
    return profileShareText(p, lang, { sky: this.sky, sections: this.weaveSections }) + (url ? `\n\n${brand}\n${url}` : '');
  }

  openShare(): void {
    this.copied = false;
    this.igNote = '';
    this.shareTip = false;
    this.cd.detectChanges();
    const dlg = this.shareDlg()?.nativeElement;
    if (dlg && !dlg.open) dlg.showModal();
  }

  closeShare(): void {
    this.shareDlg()?.nativeElement.close();
  }

  shareBackdrop(event: MouseEvent): void {
    if (event.target === this.shareDlg()?.nativeElement) this.closeShare();
  }

  async copyShare(p: Profile): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.shareBody(p));
      this.copied = true;
    } catch { /* הדפדפן חסם */ }
  }

  async shareInstagram(p: Profile): Promise<void> {
    const he = this.lang.lang() === 'he';
    let copied = false;
    try {
      await navigator.clipboard.writeText(this.shareBody(p));
      copied = true;
    } catch { /* הדפדפן חסם */ }
    this.igNote = copied
      ? (he ? 'הטקסט הועתק. באינסטגרם מדביקים אותו בסטורי או בהודעה.' : 'The text is copied. Paste it into an Instagram story or message.')
      : (he ? 'אינסטגרם נפתח. לוחצים על העתקת הטקסט, ואז מדביקים בסטורי או בהודעה.' : 'Instagram is open. Copy the text, then paste it into a story or a message.');
    this.cd.detectChanges();
    window.open('https://www.instagram.com/', '_blank', 'noopener');
  }

  async nativeShare(p: Profile): Promise<void> {
    const lang = this.lang.lang();
    const url = pageUrlForShare(lang);
    try {
      await navigator.share({ title: this.lang.text().shareTitle, text: this.shareBody(p), url: url || undefined });
      this.closeShare();
    } catch { /* בוטל */ }
  }

  shareLinks(p: Profile): { id: string; label: string; href: string; color: string; icon: SafeHtml }[] {
    const lang = this.lang.lang();
    const url = pageUrlForShare(lang);
    const payload = {
      text: this.shareBody(p),
      url,
      short: `${profileShortText(p, lang)}${url ? `\n${url}` : ''}`,
      title: this.lang.text().shareTitle,
    };
    return SHARE_CHANNELS.map((c) => ({
      id: c.id,
      label: c.label[lang],
      href: c.href(payload),
      color: c.color,
      icon: this.marks.get(c.id)!,
    }));
  }
}

const ELEMENT_POINTS: Record<string, { he: string[]; en: string[] }> = {
  fire: {
    he: ['אש: אתה זז.', 'אתה מתלהב.', 'קשה לך לשבת ולחכות.'],
    en: ['Fire: you move.', 'You get excited.', 'It is hard for you to sit and wait.'],
  },
  earth: {
    he: ['אדמה: אתה רוצה משהו אמיתי.', 'צריך להיות על מה לבנות.', 'רעיון לבד לא מספיק.'],
    en: ['Earth: you want something real.', 'There has to be something to build on.', 'An idea on its own is not enough.'],
  },
  air: {
    he: ['אוויר: אתה חי משיחה.', 'דעות מזיזות אותך.', 'אתה צריך חופש לחשוב.'],
    en: ['Air: you live on conversation.', 'Opinions move you.', 'You need freedom to think.'],
  },
  water: {
    he: ['מים: אתה מרגיש את האנשים סביבך.', 'לפעמים זה קורה לפני שהם דיברו.'],
    en: ['Water: you feel the people around you.', 'Sometimes that happens before they have spoken.'],
  },
};

const MODALITY_POINTS: Record<string, { he: string[]; en: string[] }> = {
  cardinal: {
    he: ['אתה מהאנשים שמתחילים.', 'כשמשהו תקוע אתה זז ראשון.'],
    en: ['You are someone who starts things.', 'When something is stuck you move first.'],
  },
  fixed: {
    he: ['אחרי שבחרת כיוון אתה נשאר בו.', 'קשה להזיז אותך.'],
    en: ['Once you pick a direction you stay with it.', 'You are hard to move.'],
  },
  mutable: {
    he: ['אתה מסתגל.', 'כשהמצב משתנה אתה משתנה איתו.'],
    en: ['You adapt.', 'When the situation changes you change with it.'],
  },
};

const SUN_COLOR: Record<string, { he: string[]; en: string[] }> = {
  aries: { he: ['הדחף לעשות', 'לא לחכות'], en: ['the urge to act', 'not waiting'] },
  taurus: { he: ['נוחות', 'יופי', 'נאמנות למה שבחרת'], en: ['comfort', 'beauty', 'loyalty to what you chose'] },
  gemini: { he: ['סקרנות', 'צורך לדבר על מה שראית'], en: ['curiosity', 'a need to talk about what you just saw'] },
  cancer: { he: ['הבית', 'האנשים שאתה שומר עליהם'], en: ['home', 'the people you look after'] },
  leo: { he: ['חום', 'נדיבות', 'רצון שיראו אותך'], en: ['warmth', 'generosity', 'wanting to be seen'] },
  virgo: { he: ['דיוק', 'רצון שדברים יעבדו כמו שצריך'], en: ['precision', 'wanting things to work properly'] },
  libra: { he: ['יופי', 'יחסים', 'רצון שכולם יצאו בסדר'], en: ['beauty', 'relationships', 'wanting everyone to come out all right'] },
  scorpio: { he: ['עומק', 'נאמנות שלא נשברת בקלות'], en: ['depth', 'a loyalty that does not break easily'] },
  sagittarius: { he: ['חופש', 'רצון לראות מה יש מעבר לפינה'], en: ['freedom', 'a wish to see what is around the corner'] },
  capricorn: { he: ['אחריות', 'בנייה לטווח ארוך'], en: ['responsibility', 'building for the long run'] },
  aquarius: { he: ['מחשבה עצמאית', 'חברות בלי לאבד את עצמך'], en: ['an independent mind', 'friendship without losing yourself'] },
  pisces: { he: ['רגישות', 'דמיון שקולט את מצב הרוח בחדר'], en: ['sensitivity', 'an imagination that picks up the mood in the room'] },
};
