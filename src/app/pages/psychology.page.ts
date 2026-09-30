import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import {
  BF_TRAITS, ENN_TYPES, MBTI_AXES, MBTI_TYPES16, QUESTIONS,
  scoreBigFive, scoreEnneagram, scoreMbti,
  type Answers, type BfScore, type EnnScore, type MbtiScore, type Q, type TestId,
} from '../../core/psychology';
import { LangService } from '../lang.service';
import { AnswerScaleComponent, DisclaimerComponent, ProgressBarComponent, ScoreBarComponent, TestCardComponent } from '../psychology/psy-bits';
import { ScreenComponent } from '../shell/screen.component';
import { loadJSON, saveJSON } from '../storage';

type View = 'home' | 'tests' | 'profile' | 'intro' | 'q' | 'mid' | 'load' | 'result';

interface Draft { answers: Answers; index: number; midSeen: boolean }
interface DoneMap {
  mbti?: MbtiScore;
  enneagram?: EnnScore;
  bigfive?: BfScore;
}
interface PsyPersisted { draft: Partial<Record<TestId, Draft>>; done: DoneMap }

const KEY = 'astro:psy';
const EMPTY: PsyPersisted = { draft: {}, done: {} };

const SCALE = [
  { n: 1, he: 'לא מסכים/ה בכלל', en: 'Strongly disagree' },
  { n: 2, he: 'לא מסכים/ה', en: 'Disagree' },
  { n: 3, he: 'ניטרלי/ת', en: 'Neutral' },
  { n: 4, he: 'מסכים/ה', en: 'Agree' },
  { n: 5, he: 'מסכים/ה מאוד', en: 'Strongly agree' },
];

const POLE: Record<string, { he: string; en: string }> = {
  E: { he: 'יש נטייה לקבל אנרגיה ממפגש עם אנשים.', en: 'There is a tendency to draw energy from being with people.' },
  I: { he: 'יש נטייה לקבל אנרגיה מזמן שקט ומעיבוד פנימי.', en: 'There is a tendency to draw energy from quiet and inner processing.' },
  S: { he: 'יש נטייה להישען על עובדות ועל מה שאפשר לראות ולמדוד.', en: 'There is a tendency to lean on facts and on what can be seen.' },
  N: { he: 'יש נטייה להימשך לרעיונות, לדפוסים ולמה שעוד לא קיים.', en: 'There is a tendency to be drawn to ideas, patterns and what is not here yet.' },
  T: { he: 'יש נטייה להחליט לפי היגיון ועקביות.', en: 'There is a tendency to decide by logic and consistency.' },
  F: { he: 'יש נטייה להחליט לפי השפעה על אנשים ולפי ערכים.', en: 'There is a tendency to decide by the effect on people and by values.' },
  J: { he: 'יש נטייה לסדר, לתוכנית ולסגירת עניינים.', en: 'There is a tendency toward order, a plan and closing things.' },
  P: { he: 'יש נטייה להשאיר פתח ולזוז עם מה שקורה.', en: 'There is a tendency to keep options open and move with what happens.' },
};

const TRAIT_COLOR: Record<string, string> = {
  O: '#6d5efc', C: '#2f8f62', E: '#d4893a', A: '#c45b7a', N: '#3a7ca5',
};

@Component({
  selector: 'app-psychology',
  imports: [ScreenComponent, TestCardComponent, ProgressBarComponent, AnswerScaleComponent, ScoreBarComponent, DisclaimerComponent],
  templateUrl: './psychology.page.html',
})
export class PsychologyPage implements OnDestroy {
  readonly lang = inject(LangService);
  private readonly cd = inject(ChangeDetectorRef);
  readonly axes = MBTI_AXES;
  readonly traits = BF_TRAITS;
  readonly tests: TestId[] = ['mbti', 'enneagram', 'bigfive'];

  view: View = 'home';
  test: TestId | null = null;
  questions: Q[] = [];
  index = 0;
  answers: Answers = {};
  midSeen = false;
  copied = false;
  about: TestId | null = null;
  mbti: MbtiScore | null = null;
  enn: EnnScore | null = null;
  big: BfScore | null = null;
  private saved: PsyPersisted = EMPTY;
  private timer = 0;

  constructor() {
    loadJSON<PsyPersisted>(KEY).then((s) => {
      if (s?.draft && s.done) this.saved = s;
      this.cd.detectChanges();
    });
  }

  ngOnDestroy(): void { window.clearTimeout(this.timer); }

  he(): boolean { return this.lang.lang() === 'he'; }
  t(he: string, en: string): string { return this.he() ? he : en; }

  go(view: View): void {
    window.clearTimeout(this.timer);
    this.view = view;
    this.copied = false;
  }

  title(id: TestId): string {
    return id === 'mbti' ? 'MBTI' : id === 'enneagram' ? (this.he() ? 'אניאגרם' : 'Enneagram') : 'Big Five';
  }

  meta(id: TestId): string {
    if (id === 'mbti') return this.t('16 טיפוסים', '16 types');
    if (id === 'enneagram') return this.t('9 טיפוסים', '9 types');
    return this.t('5 תכונות', '5 traits');
  }

  blurb(id: TestId): string {
    if (id === 'mbti') return this.t(
      'מודל של 16 טיפוסים המבוסס על ארבעה צירי העדפה: מוחצנות או מופנמות, חושים או אינטואיציה, חשיבה או רגש, ושיפוט או תפיסה.',
      'A model of 16 types built on four preference axes: extraversion or introversion, sensing or intuition, thinking or feeling, and judging or perceiving.',
    );
    if (id === 'enneagram') return this.t(
      'מודל של תשעה טיפוסים. לכל טיפוס מוטיבציה ופחד שמופיעים שוב ושוב.',
      'A model of nine types. Each type has a motivation and a fear that show up again and again.',
    );
    return this.t(
      'מודל שמתאר אישיות דרך חמש תכונות, כל אחת על רצף ולא כתווית סגורה.',
      'A model that describes personality through five traits, each on a range rather than a closed label.',
    );
  }

  moreLabel(id: TestId): string {
    return this.about === id ? this.t('הסתרת הפירוט', 'Hide the details') : this.t('מה כולל המודל?', 'What does this model include?');
  }

  toggleAbout(id: TestId): void {
    this.about = this.about === id ? null : id;
    if (!this.about) return;
    queueMicrotask(() => document.getElementById('psy-about')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
  }

  aboutTitle(id: TestId): string {
    return this.t(`מה כולל ${this.title(id)}`, `What ${this.title(id)} includes`);
  }

  aboutLead(id: TestId): string {
    if (id === 'mbti') return this.t(
      'המודל מסדר העדפות, לא יכולות. יש ארבעה צירים. כל ציר נותן אות אחת, וארבע האותיות יחד הן הטיפוס.',
      'The model sorts preferences, not abilities. There are four axes. Each axis gives one letter, and the four letters together are the type.',
    );
    if (id === 'enneagram') return this.t(
      'תשעה דפוסים. לכל טיפוס יש רצון שחוזר, ופחד שחוזר. בסוף רואים ציון לכל התשעה. הציון הגבוה ביותר הוא הטיפוס שנראה דומיננטי בגרסה הזו.',
      'Nine patterns. Each type has a wish that returns, and a fear that returns. At the end you see a score for all nine. The highest score is the type that looks dominant in this version.',
    );
    return this.t(
      'חמש תכונות על רצף מ-0 עד 100. אין כאן טיפוס אחד. אפשר להיות גבוה באחת ונמוך באחרת.',
      'Five traits on a range from 0 to 100. There is no single type. You can be high on one and low on another.',
    );
  }

  aboutRows(id: TestId): { title: string; text: string }[] {
    const L = this.lang.lang();
    if (id === 'mbti') {
      const plain: Record<string, { he: string; en: string }> = {
        E: { he: 'אנרגיה מאנשים ומעשייה יחד.', en: 'Energy from people and doing things together.' },
        I: { he: 'אנרגיה משקט ומזמן לבד.', en: 'Energy from quiet and time alone.' },
        S: { he: 'שמים לב למה שקורה עכשיו ולפרטים שאפשר לראות.', en: 'Attention goes to what is happening now and to details you can see.' },
        N: { he: 'שמים לב לתמונה הגדולה, לרעיונות ולמה שעוד לא קיים.', en: 'Attention goes to the big picture, to ideas and to what is not here yet.' },
        T: { he: 'החלטה לפי היגיון ועקביות.', en: 'A decision by logic and consistency.' },
        F: { he: 'החלטה לפי ערכים ולפי מה שזה עושה לאנשים.', en: 'A decision by values and by what it does to people.' },
        J: { he: 'נוח יותר עם תוכנית, סדר וסגירת עניינים.', en: 'More at ease with a plan, order and closing things.' },
        P: { he: 'נוח יותר להשאיר פתח ולהגיב למה שנפתח בדרך.', en: 'More at ease leaving a door open and responding to what comes up.' },
      };
      return [
        ...MBTI_AXES.map((axis) => ({
          title: `${axis.aName[L]} / ${axis.bName[L]}`,
          text: `${axis.name[L]}. ${plain[axis.a][L]} ${plain[axis.b][L]}`,
        })),
        {
          title: this.t('מה מתקבל בסוף', 'What you get'),
          text: this.t(
            '16 צירופים אפשריים. על המסך מופיעות האותיות, פס לכל ציר, כמה חוזקות אפשריות וכמה נקודות שכדאי לשים לב אליהן.',
            '16 possible combinations. The screen shows the letters, a bar for each axis, a few possible strengths and a few points worth noticing.',
          ),
        },
      ];
    }
    if (id === 'enneagram') {
      return Object.entries(ENN_TYPES).map(([n, type]) => ({
        title: `${n}. ${type.name[L]}`,
        text: this.t(`רצון שחוזר: ${type.desire.he}. פחד שחוזר: ${type.fear.he}.`, `A returning wish: ${type.desire.en}. A returning fear: ${type.fear.en}.`),
      }));
    }
    return BF_TRAITS.map((trait) => ({
      title: trait.name[L],
      text: this.t(
        `${trait.what.he}. ציון גבוה: ${trait.high.he} ציון נמוך: ${trait.low.he}`,
        `${trait.what.en}. A high score: ${trait.high.en} A low score: ${trait.low.en}`,
      ),
    }));
  }

  aboutFoot(id: TestId): string {
    const n = this.count(id);
    const m = this.minutes(id);
    return this.t(
      `בגרסה הזו ${n} שאלות, בערך ${m} דקות. זה כלי להתבוננות אישית, לא אבחון.`,
      `This version has ${n} questions, about ${m} minutes. It is a tool for personal reflection, not a diagnosis.`,
    );
  }

  count(id: TestId): number { return QUESTIONS[id].short.length; }
  minutes(id: TestId): number { return id === 'enneagram' ? 7 : 5; }

  introTitle(id: TestId): string {
    if (id === 'mbti') return this.t('מה מניע את הדרך שבה חושבים ומתנהלים?', 'What shapes the way you think and organize?');
    if (id === 'enneagram') return this.t('מה חוזר אצלך כשחשוב וגם כשקשה?', 'What shows up for you when it matters, and when it is hard?');
    return this.t('איפה אתם על חמישה רצפים?', 'Where do you sit on five ranges?');
  }

  open(id: TestId): void {
    window.clearTimeout(this.timer);
    this.test = id;
    this.questions = QUESTIONS[id].short;
    this.copied = false;
    const draft = this.saved.draft[id];
    if (draft && Object.keys(draft.answers).length) {
      this.answers = { ...draft.answers };
      this.index = Math.min(draft.index, this.questions.length - 1);
      this.midSeen = draft.midSeen;
    } else {
      this.answers = {};
      this.index = 0;
      this.midSeen = false;
    }
    this.view = 'intro';
  }

  hasDraft(id: TestId = this.test!): boolean {
    const d = this.saved.draft[id];
    return !!d && Object.keys(d.answers).length > 0;
  }

  start(fresh: boolean): void {
    if (!this.test) return;
    if (fresh) {
      this.answers = {};
      this.index = 0;
      this.midSeen = false;
      delete this.saved.draft[this.test];
      this.persist();
    }
    this.view = 'q';
  }

  q(): Q { return this.questions[this.index]; }

  progress(): number {
    if (!this.questions.length) return 0;
    return Math.round((this.index / this.questions.length) * 100);
  }

  options(): { n: number; label: string }[] {
    const lang = this.lang.lang();
    return SCALE.map((s) => ({ n: s.n, label: s[lang] }));
  }

  selected(): number | null {
    const q = this.q();
    return q && this.answers[q.id] !== undefined ? this.answers[q.id] : null;
  }

  pick(n: number): void {
    const q = this.q();
    if (!q) return;
    window.clearTimeout(this.timer);
    this.answers = { ...this.answers, [q.id]: n };
    this.persist();
    this.timer = window.setTimeout(() => this.advance(), 320);
  }

  private advance(): void {
    const half = Math.floor(this.questions.length / 2);
    if (this.index + 1 >= this.questions.length) {
      this.view = 'load';
      this.cd.detectChanges();
      this.timer = window.setTimeout(() => this.reveal(), 1400);
      return;
    }
    if (!this.midSeen && this.index + 1 === half) {
      this.midSeen = true;
      this.view = 'mid';
      this.persist();
      this.cd.detectChanges();
      return;
    }
    this.index += 1;
    this.persist();
    this.cd.detectChanges();
  }

  continueMid(): void {
    this.index += 1;
    this.view = 'q';
    this.persist();
  }

  backQ(): void {
    window.clearTimeout(this.timer);
    if (this.index === 0) { this.view = 'intro'; return; }
    this.index -= 1;
    this.persist();
  }

  exit(): void {
    window.clearTimeout(this.timer);
    this.persist();
    this.view = 'home';
  }

  private reveal(): void {
    if (!this.test) return;
    if (this.test === 'mbti') {
      this.mbti = scoreMbti(this.answers);
      this.saved.done.mbti = this.mbti;
    } else if (this.test === 'enneagram') {
      this.enn = scoreEnneagram(this.answers);
      this.saved.done.enneagram = this.enn;
    } else {
      this.big = scoreBigFive(this.answers);
      this.saved.done.bigfive = this.big;
    }
    delete this.saved.draft[this.test];
    this.persist();
    this.view = 'result';
    this.cd.detectChanges();
  }

  watch(id: TestId): void {
    this.test = id;
    this.mbti = id === 'mbti' ? this.saved.done.mbti ?? null : null;
    this.enn = id === 'enneagram' ? this.saved.done.enneagram ?? null : null;
    this.big = id === 'bigfive' ? this.saved.done.bigfive ?? null : null;
    this.view = 'result';
  }

  doneOf(id: TestId): boolean {
    return id === 'mbti' ? !!this.saved.done.mbti : id === 'enneagram' ? !!this.saved.done.enneagram : !!this.saved.done.bigfive;
  }

  summary(id: TestId): string {
    if (id === 'mbti' && this.saved.done.mbti) {
      const code = this.saved.done.mbti.type;
      return `${code} · ${MBTI_TYPES16[code].name[this.lang.lang()]}`;
    }
    if (id === 'enneagram' && this.saved.done.enneagram) {
      const n = this.saved.done.enneagram.type;
      return this.t(`טיפוס ${n} · ${ENN_TYPES[n].name.he}`, `Type ${n} · ${ENN_TYPES[n].name.en}`);
    }
    if (id === 'bigfive' && this.saved.done.bigfive) {
      const s = this.saved.done.bigfive;
      return BF_TRAITS.map((tr) => `${tr.name[this.lang.lang()]} ${s[tr.key]}`).join(' · ');
    }
    return '';
  }

  typeName(): string { return this.mbti ? MBTI_TYPES16[this.mbti.type].name[this.lang.lang()] : ''; }
  typeShort(): string { return this.mbti ? MBTI_TYPES16[this.mbti.type].short[this.lang.lang()] : ''; }
  bits(text: string): string[] {
    return text.split(/[,،.]/).map((s) => s.trim()).filter((s) => s.length > 1);
  }
  strengths(): string[] { return this.mbti ? this.bits(MBTI_TYPES16[this.mbti.type].strengths[this.lang.lang()]) : []; }
  watchouts(): string[] { return this.mbti ? this.bits(MBTI_TYPES16[this.mbti.type].growth[this.lang.lang()]) : []; }

  axisRow(i: number): { name: string; pct: number; note: string } {
    const axis = this.axes[i];
    const score = this.mbti!.axes[i];
    const winA = score.pctA >= 50;
    const letter = winA ? axis.a : axis.b;
    return {
      name: (winA ? axis.aName : axis.bName)[this.lang.lang()],
      pct: winA ? score.pctA : 100 - score.pctA,
      note: POLE[letter][this.lang.lang()],
    };
  }

  ennName(n: string): string { return ENN_TYPES[n].name[this.lang.lang()]; }
  ennDesire(): string { return this.enn ? ENN_TYPES[this.enn.type].desire[this.lang.lang()] : ''; }
  ennFear(): string { return this.enn ? ENN_TYPES[this.enn.type].fear[this.lang.lang()] : ''; }
  ennMark(): string { return this.enn ? ENN_TYPES[this.enn.type].strength[this.lang.lang()] : ''; }

  traitColor(key: string): string { return TRAIT_COLOR[key]; }
  traitText(key: BfScoreKey, score: number): string {
    const trait = BF_TRAITS.find((x) => x.key === key)!;
    return (score >= 50 ? trait.high : trait.low)[this.lang.lang()];
  }
  traitBand(score: number): string {
    if (score >= 67) return this.t('גבוה', 'High');
    if (score >= 40) return this.t('בינוני', 'Middle');
    return this.t('נמוך', 'Low');
  }

  disclaimer(): string {
    return this.t(
      'חשוב לדעת: אלה גרסאות מקוצרות לשימוש אישי, לא כלי אבחון. התוצאה משקפת את האופן שבו תיארת את עצמך בזמן המענה.',
      'Worth knowing: these are short versions for personal use, not a diagnostic tool. The result reflects how you described yourself while answering.',
    );
  }

  async share(): Promise<void> {
    const text = this.shareText();
    try {
      if (navigator.share) await navigator.share({ title: this.t('פרופיל אישיות', 'Personality profile'), text });
      else {
        await navigator.clipboard.writeText(text);
        this.copied = true;
        this.cd.detectChanges();
      }
    } catch { /* בוטל */ }
  }

  private shareText(): string {
    if (this.test === 'mbti' && this.mbti) return `${this.mbti.type} · ${this.typeName()}\n${this.typeShort()}`;
    if (this.test === 'enneagram' && this.enn) return this.t(`טיפוס ${this.enn.type} · ${this.ennName(this.enn.type)}`, `Type ${this.enn.type} · ${this.ennName(this.enn.type)}`);
    if (this.test === 'bigfive' && this.big) return this.summary('bigfive');
    return '';
  }

  private persist(): void {
    if (this.test && this.view !== 'result') {
      this.saved.draft[this.test] = { answers: this.answers, index: this.index, midSeen: this.midSeen };
    }
    void saveJSON(KEY, this.saved);
  }
}

type BfScoreKey = 'O' | 'C' | 'E' | 'A' | 'N';
