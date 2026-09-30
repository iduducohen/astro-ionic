import { ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { applyOverrides, measureHandwriting, type Dir, type Measured, type TraitOverrides } from '../../analysis/handwriting';
import { allowUpload, unreadableHandwriting, validateHandwritingFile, validateHandwritingFrame, type HandwritingValidation } from '../../analysis/handwriting-gate';
import { LangService } from '../lang.service';
import { IntroComponent } from '../shell/intro.component';
import { ScreenComponent } from '../shell/screen.component';
import { CameraService } from '../zohar/image.services';
import { frameFromFile } from '../graphology/decode';

const TEXT: Record<string, { he: string; en: string }> = {
  back: { he: 'נטייה לאחור עשויה להיקשר, במסורת הגרפולוגית, לריסון ולשיקול דעת לפני שמגיבים.', en: 'In the graphology tradition, a backward slant may be linked to restraint and thinking before reacting.' },
  upright: { he: 'כתב זקוף נוטה להיקשר, במסורת הגרפולוגית, לאיזון בין רגש להיגיון.', en: 'In the graphology tradition, upright writing tends to be linked to a balance of feeling and logic.' },
  forward: { he: 'נטייה קדימה עשויה להיקשר, במסורת הגרפולוגית, לפתיחות ולתגובה רגשית מהירה.', en: 'In the graphology tradition, a forward slant may be linked to openness and a quick emotional response.' },
  light: { he: 'לחץ קל נוטה להיקשר, במסורת הגרפולוגית, לרגישות ולעדינות.', en: 'In the graphology tradition, light pressure tends to be linked to sensitivity and gentleness.' },
  medium: { he: 'ערך בינוני נוטה להיקשר, במסורת הגרפולוגית, לאנרגיה מאוזנת.', en: 'In the graphology tradition, a medium value tends to be linked to balanced energy.' },
  heavy: { he: 'לחץ חזק עשוי להיקשר, במסורת הגרפולוגית, לנחישות ולרגש עז.', en: 'In the graphology tradition, heavy pressure may be linked to determination and strong feeling.' },
  small: { he: 'כתב קטן נוטה להיקשר, במסורת הגרפולוגית, לריכוז ולתשומת לב לפרטים.', en: 'In the graphology tradition, small writing tends to be linked to concentration and detail.' },
  large: { he: 'כתב גדול עשוי להיקשר, במסורת הגרפולוגית, לביטחון ולרצון להשפיע.', en: 'In the graphology tradition, large writing may be linked to confidence and a wish to influence.' },
  falling: { he: 'שורות יורדות עשויות להיקשר, במסורת הגרפולוגית, לעייפות או למצב רוח ירוד בזמן הכתיבה.', en: 'In the graphology tradition, falling lines may be linked to tiredness or low mood while writing.' },
  straight: { he: 'קו ישר נוטה להיקשר, במסורת הגרפולוגית, ליציבות ולמשמעת עצמית.', en: 'In the graphology tradition, a level baseline tends to be linked to stability and self-discipline.' },
  rising: { he: 'שורות עולות עשויות להיקשר, במסורת הגרפולוגית, לאופטימיות ולהתלהבות.', en: 'In the graphology tradition, rising lines may be linked to optimism and enthusiasm.' },
  narrow: { he: 'מרווח צפוף עשוי להיקשר, במסורת הגרפולוגית, לצורך בקרבה.', en: 'In the graphology tradition, narrow spacing may be linked to a need for closeness.' },
  balanced: { he: 'מרווח מאוזן נוטה להיקשר, במסורת הגרפולוגית, לקרבה עם גבולות ברורים.', en: 'In the graphology tradition, balanced spacing tends to be linked to closeness with clear boundaries.' },
  wide: { he: 'מרווח רחב עשוי להיקשר, במסורת הגרפולוגית, לצורך במרחב אישי.', en: 'In the graphology tradition, wide spacing may be linked to a need for personal space.' },
};

const VALUE: Record<string, { he: string; en: string }> = {
  back: { he: 'לאחור', en: 'Backward' },
  upright: { he: 'זקוף', en: 'Upright' },
  forward: { he: 'קדימה', en: 'Forward' },
  light: { he: 'קל', en: 'Light' },
  medium: { he: 'בינוני', en: 'Medium' },
  heavy: { he: 'חזק', en: 'Heavy' },
  small: { he: 'קטן', en: 'Small' },
  large: { he: 'גדול', en: 'Large' },
  falling: { he: 'יורד', en: 'Falling' },
  straight: { he: 'ישר', en: 'Level' },
  rising: { he: 'עולה', en: 'Rising' },
  narrow: { he: 'צפוף', en: 'Narrow' },
  balanced: { he: 'מאוזן', en: 'Balanced' },
  wide: { he: 'רחב', en: 'Wide' },
};

type Step = 'pick' | 'check' | 'result';
type CheckState = 'ok' | 'bad' | 'skip';

/**
 * התמונה נשארת בזיכרון המסך בלבד.
 * אין העלאה לשרת, אין שמירה, ואין שליחה לשירות חיצוני.
 * יציאה מהמסך משחררת את כתובת התמונה.
 */
@Component({
  selector: 'app-graphology',
  imports: [ScreenComponent, IntroComponent],
  templateUrl: './graphology.page.html',
})
export class GraphologyPage implements OnDestroy {
  readonly lang = inject(LangService);
  private readonly camera = inject(CameraService);
  private readonly cd = inject(ChangeDetectorRef);

  readonly nativeApp = this.camera.native();
  fileFallback = false;
  dir: Dir = 'rtl';
  step: Step = 'pick';
  dragOver = false;
  busy = false;
  error = '';
  previewUrl: string | null = null;
  validation: HandwritingValidation | null = null;
  measured: Measured | null = null;
  /** נשאר ריק עד שיהיה מסך תיקון. המדידות נקראות דרכו, כדי שאפשר יהיה לדרוס נטייה, גודל, לחץ, קו כתיבה ומרווחים. */
  overrides: TraitOverrides = {};

  ngOnDestroy(): void {
    this.revoke();
  }

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  note(item: { he: string; en: string }): string {
    return this.lang.lang() === 'he' ? item.he : item.en;
  }

  async useNative(source: 'camera' | 'photos'): Promise<void> {
    const shot = await this.camera.capture(source, { width: 2000, quality: 92, filename: source === 'camera' ? 'handwriting.jpg' : 'gallery.jpg' });
    if (typeof shot !== 'string') {
      await this.ingest(shot);
      return;
    }
    if (shot === 'cancelled') return;
    if (shot === 'camera-missing') this.fileFallback = true;
    this.error = shot === 'camera-denied'
      ? this.t('אין הרשאה למצלמה או לגלריה. אפשר לאשר אותה בהגדרות המכשיר.', 'Camera or photo access was denied. You can allow it in the device settings.')
      : this.t('המצלמה לא זמינה כאן. אפשר לבחור תמונה מהקבצים.', 'The camera is not available here. You can choose a photo from your files.');
    this.cd.detectChanges();
  }

  onFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) void this.ingest(file);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) void this.ingest(file);
  }

  async ingest(file: File): Promise<void> {
    if (this.busy) return;
    if (!allowUpload()) {
      this.error = this.t('יותר מדי ניסיונות בזמן קצר. נסה שוב בעוד דקה.', 'Too many attempts in a short time. Try again in a minute.');
      this.cd.detectChanges();
      return;
    }
    this.busy = true;
    this.error = '';
    this.measured = null;
    this.overrides = {};
    this.validation = null;
    this.revoke();
    this.cd.detectChanges();
    try {
      const tooBig = file.size > 10 * 1024 * 1024;
      const bytes = tooBig ? new Uint8Array() : new Uint8Array(await file.arrayBuffer());
      const fileResult = validateHandwritingFile({ size: file.size, mime: file.type, name: file.name, bytes });
      if (!fileResult.checks.fileType || !fileResult.checks.fileSize) {
        this.validation = fileResult;
        this.step = 'check';
        return;
      }
      const decoded = await frameFromFile(file);
      if (!decoded) {
        this.validation = unreadableHandwriting();
        this.step = 'check';
        return;
      }
      this.previewUrl = decoded.url;
      this.validation = validateHandwritingFrame(decoded.frame, { width: decoded.width, height: decoded.height });
      this.step = 'check';
    } catch {
      this.error = this.t('לא הצלחנו לקרוא את הקובץ.', 'Could not read the file.');
    } finally {
      this.busy = false;
      this.cd.detectChanges();
    }
  }

  async analyze(): Promise<void> {
    if (!this.validation?.valid || !this.previewUrl || this.busy) return;
    this.busy = true;
    this.error = '';
    this.cd.detectChanges();
    try {
      this.measured = await measureHandwriting(this.previewUrl, this.dir);
      this.overrides = {};
      this.step = 'result';
    } catch {
      this.measured = null;
      this.error = this.t('לא הצלחנו למדוד את הכתב בתמונה הזו. נסה תמונה אחרת.', 'The writing in this photo could not be measured. Try another photo.');
    } finally {
      this.busy = false;
      this.cd.detectChanges();
    }
  }

  setDir(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.dir = value === 'ltr' ? 'ltr' : 'rtl';
    if (this.step === 'result' && this.previewUrl && this.validation?.valid) void this.analyze();
  }

  tryAnother(): void {
    this.revoke();
    this.validation = null;
    this.measured = null;
    this.overrides = {};
    this.error = '';
    this.step = 'pick';
    this.cd.detectChanges();
  }

  checklist(): { id: string; state: CheckState; label: string }[] {
    const v = this.validation;
    if (!v) return [];
    const fileOk = v.checks.fileType && v.checks.fileSize;
    return [
      { id: 'file', state: fileOk ? 'ok' : 'bad', label: this.t('סוג קובץ תקין', 'File type is valid') },
      { id: 'quality', state: !v.ran.quality ? 'skip' : (v.checks.resolution && v.checks.brightness ? 'ok' : 'bad'), label: this.t('איכות תמונה תקינה', 'Photo quality is acceptable') },
      { id: 'clear', state: !v.ran.blur ? 'skip' : (v.checks.blur ? 'ok' : 'bad'), label: this.t('תמונה ברורה', 'Photo is sharp') },
      { id: 'hand', state: !v.ran.content ? 'skip' : (v.checks.handwriting ? 'ok' : 'bad'), label: this.t('זוהה כתב יד', 'Handwriting detected') },
      { id: 'amount', state: !v.ran.content || !v.checks.handwriting ? 'skip' : (v.checks.sufficientContent ? 'ok' : 'bad'), label: this.t('כמות כתב יד מספקת', 'Enough handwriting') },
    ];
  }

  rows() {
    const raw = this.measured;
    if (!raw) return [];
    const m = applyOverrides(raw, this.overrides);
    const L = this.lang.lang();
    const say = (id: string) => TEXT[id]?.[L] ?? id;
    const name = (id: string) => VALUE[id]?.[L] ?? id;
    return [
      { key: 'slant', label: L === 'he' ? 'נטייה' : 'Slant', value: `${name(m.slant.value)} · ${Math.abs(m.slant.deg)}°`, text: say(m.slant.value) },
      { key: 'pressure', label: L === 'he' ? 'לחץ' : 'Pressure', value: name(m.pressure.value), text: say(m.pressure.value) },
      { key: 'size', label: L === 'he' ? 'גודל' : 'Size', value: name(m.size.value), text: say(m.size.value) },
      { key: 'baseline', label: L === 'he' ? 'קו כתיבה' : 'Baseline', value: name(m.baseline.value), text: say(m.baseline.value) },
      { key: 'spacing', label: L === 'he' ? 'מרווח' : 'Spacing', value: name(m.spacing.value), text: say(m.spacing.value) },
    ];
  }

  private revoke(): void {
    if (!this.previewUrl) return;
    URL.revokeObjectURL(this.previewUrl);
    this.previewUrl = null;
  }
}
