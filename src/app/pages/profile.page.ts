import { ChangeDetectorRef, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { IonButton, IonCheckbox, IonIcon, IonInput, IonNote } from '@ionic/angular';
import {
  BIRTH_MONTH, COUNTRY_CODES, ELEMENTS, ELEMENT_DESCRIPTIONS, MODALITIES, MODALITY_DESCRIPTIONS, NUMBER_MEANINGS, PLACES,
  ZODIAC, chartFor, countryName as countryLabel, type Profile,
} from '../../core';
import { lifeAreas } from '../../core/life-areas';
import { AREA_WHY, CN_ELEMENT, CN_POLE, MOON_NEED, NUMBER_USE, RISE_FACE, STONE_NOTE } from '../../core/reading-use';
import { pageUrlForShare, setSharePreview } from '../../core/seo';
import { SHARE_CHANNELS } from '../../core/share-channels';
import { profileShareText, profileShortText } from '../../core/share-text';
import { LangService } from '../lang.service';
import { readProfile } from '../profile';
import { IntroComponent } from '../shell/intro.component';
import { ScreenComponent } from '../shell/screen.component';
import { WhenFieldComponent } from '../shell/when-field.component';
import { loadJSON, saveJSON } from '../storage';

@Component({
  selector: 'app-profile',
  imports: [ScreenComponent, IntroComponent, RouterLink, WhenFieldComponent, IonButton, IonCheckbox, IonInput, IonNote, IonIcon],
  templateUrl: './profile.page.html',
})
export class ProfilePage {
  readonly lang = inject(LangService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly marks = new Map(SHARE_CHANNELS.map((c) => [c.id, this.sanitizer.bypassSecurityTrustHtml(c.icon)]));
  private readonly shareDlg = viewChild<ElementRef<HTMLDialogElement>>('shareDlg');
  copied = false;
  canNative = typeof navigator !== 'undefined' && !!navigator.share;
  readonly today = new Date().toISOString().slice(0, 10);
  readonly signs = ZODIAC;
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
  private rot = 0;
  private lastIndex: number | null = null;

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
      this.profile.set(profile);
      this.sky = this.readSky();
      this.error = '';
      const lang = this.lang.lang();
      setSharePreview(this.lang.text().signTitle(profile.western.name[lang]), profileShortText(profile, lang), pageUrlForShare(lang));
      saveJSON('astro:last', { ...input, time: this.time, timeKnown: this.timeKnown, cc: this.cc, placeId: this.placeId });
      if (this.placeId) {
        saveJSON('astro:birth:me', {
          name: this.name.trim(), date: this.birth, time: this.time, timeKnown: this.timeKnown && !!this.time, placeId: this.placeId,
        });
      }
      this.cd.detectChanges();
      document.querySelector('.result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  countryName(cc: string): string { return countryLabel(cc, this.lang.lang()); }
  cities() { return PLACES.filter((p) => p.cc === this.cc); }

  onTime(value: string): void { this.time = value; }
  onTimeKnown(event: CustomEvent): void { this.timeKnown = !event.detail.checked; }
  onCountry(event: Event): void {
    this.cc = (event.target as HTMLSelectElement).value;
    if (!this.cities().some((c) => c.id === this.placeId)) this.placeId = '';
  }
  onPlace(event: Event): void { this.placeId = (event.target as HTMLSelectElement).value; }

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
    const contrast = moon.sign.id === sun.id
      ? (he ? `גם הרגש בפנים הולך עם מזל השמש, ${sun.name.he}. ` : `The feeling inside goes with the Sun sign too, ${sun.name.en}. `)
      : (he ? `מזל השמש שלך הוא ${sun.name.he}: ככה אתה פועל עם אנשים. הרגש בפנים אחר. ` : `Your Sun sign is ${sun.name.en}: that is how you act with people. The feeling inside is different. `);
    const clock = known
      ? ''
      : (he ? ` בלי שעה מדויקת זו הערכה לצהריים ב${place.label}. שעה אחרת יכולה להזיז את זה.` : ` Without an exact time this is a noon estimate in ${place.label}. Another hour can move it.`);
    const cards = [{
      title: he ? 'איך אתה מרגיש כשאתה לבד' : 'How you feel when you are alone',
      value: `${moon.sign.name[lang]} ${moon.sign.symbol}`,
      text: contrast + MOON_NEED[moon.sign.id][lang],
      source: (he
        ? 'מה זה נותן לך: הסבר לימים שבהם אתה לא מרגיש כמו שאתה נראה. תן לעצמך את מה שמרגיע כאן.'
        : 'What this gives you: an explanation for days you do not feel the way you look. Give yourself what calms you here.') + clock,
    }];
    const asc = chart.points.asc;
    if (asc && known) {
      cards.push({
        title: he ? 'איך זרים קוראים אותך' : 'How strangers read you',
        value: `${asc.sign.name[lang]} ${asc.sign.symbol}`,
        text: RISE_FACE[asc.sign.id][lang],
        source: he
          ? `זה לפי ${place.label} בשעה ${this.time}. הדקה הראשונה, לפני שמכירים אותך.`
          : `From ${place.label} at ${this.time}. The first minute, before anyone knows you.`,
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
      ? 'מה זה נותן לך: תזכורת למה להישען עליו כשקשה. זה דימוי לאופי, לא עץ שצריך לגדל.'
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
      ? `לפי מספר החיים: ${bit} אם זה תחום אחר מהשורה למעלה, הסגנון היומי נשאר של המזל, והכיוון הארוך הוא של המספר.`
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

  areas(p: Profile) { return lifeAreas(p); }
  life(p: Profile) { return NUMBER_MEANINGS[p.lifePath]; }
  nameNum(p: Profile) { return NUMBER_MEANINGS[p.nameNum.number]; }
  elementName(p: Profile) { return ELEMENTS[p.western.element][this.lang.lang()]; }
  elementText(p: Profile) { return ELEMENT_DESCRIPTIONS[p.western.element][this.lang.lang()]; }
  modalityName(p: Profile) { return MODALITIES[p.western_modality][this.lang.lang()]; }
  modalityText(p: Profile) { return MODALITY_DESCRIPTIONS[p.western_modality][this.lang.lang()]; }

  /** מזל השמש בשפה יומיומית: מה רואים, ומה צובע את זה. */
  plainSun(p: Profile): string {
    const lang = this.lang.lang();
    const feel = SUN_COLOR[p.western.id]?.[lang] ?? p.western.ruler[lang];
    return lang === 'he'
      ? `מזל השמש הוא מה שרואים בך ביום־יום: איך אתה ניגש לאנשים ולהחלטות. ${this.elementText(p)} ${this.modalityText(p)} מה שצובע את זה הוא ${feel}.`
      : `The Sun sign is what people see day to day: how you approach people and decisions. ${this.elementText(p)} ${this.modalityText(p)} What colors it is ${feel}.`;
  }

  /** שלושת חלקי המזל, בלי המילה דקאן. */
  plainSlice(p: Profile): string {
    const lang = this.lang.lang();
    const n = p.western_decan.decan.number;
    const bit = p.western_decan.decan.text[lang];
    if (lang === 'he') {
      const which = ['הראשון', 'השני', 'השלישי'][n - 1];
      return `כל מזל מחולק לשלושה חלקים, לפי היום שנולדת בתוכו. אתה בחלק ${which}: ${bit}`;
    }
    const which = ['first', 'second', 'third'][n - 1];
    return `Each sign is split into three parts, by the day you were born inside it. Yours is the ${which} part: ${bit}`;
  }

  shareBody(p: Profile): string {
    const lang = this.lang.lang();
    const url = pageUrlForShare(lang);
    const brand = lang === 'he' ? 'מה כתוב בכוכבים' : 'What the stars say';
    return profileShareText(p, lang) + (url ? `\n\n${brand}\n${url}` : '');
  }

  openShare(): void {
    this.copied = false;
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

const SUN_COLOR: Record<string, { he: string; en: string }> = {
  aries: { he: 'הדחף לעשות ולא לחכות', en: 'the urge to act instead of waiting' },
  taurus: { he: 'נוחות, יופי ונאמנות למה שבחרת', en: 'comfort, beauty and loyalty to what you chose' },
  gemini: { he: 'סקרנות וצורך לדבר על מה שראית', en: 'curiosity and a need to talk about what you just saw' },
  cancer: { he: 'הבית והאנשים שאתה שומר עליהם', en: 'home and the people you look after' },
  leo: { he: 'חום, נדיבות ורצון שיראו אותך', en: 'warmth, generosity and wanting to be seen' },
  virgo: { he: 'דיוק ורצון שדברים יעבדו כמו שצריך', en: 'precision and wanting things to work properly' },
  libra: { he: 'יופי, יחסים ורצון שכולם יצאו בסדר', en: 'beauty, relationships and wanting everyone to come out all right' },
  scorpio: { he: 'עומק ונאמנות שלא נשברת בקלות', en: 'depth and a loyalty that does not break easily' },
  sagittarius: { he: 'חופש ורצון לראות מה יש מעבר לפינה', en: 'freedom and a wish to see what is around the corner' },
  capricorn: { he: 'אחריות ובנייה לטווח ארוך', en: 'responsibility and building for the long run' },
  aquarius: { he: 'מחשבה עצמאית וחברות בלי לאבד את עצמך', en: 'an independent mind, and friendship without losing yourself' },
  pisces: { he: 'רגישות ודמיון שקולטים את מצב הרוח בחדר', en: 'sensitivity and an imagination that picks up the mood in the room' },
};
