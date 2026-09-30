import { fileIssues } from './file-check';
import { ANALYSIS_QUOTA, MAX_ASPECT, MAX_IMAGE_HEIGHT, MAX_IMAGE_WIDTH, MIN_ASPECT, MIN_IMAGE_HEIGHT, MIN_IMAGE_WIDTH, QUOTA_WINDOW_MS } from './limits';
import { interpret, type TraditionalReading } from './interpret';
import { detectFace, detectPalm, moderationIssue, qualityIssue } from './pixels';
import type { CheckLine, FaceTraits, Frame, IssueCode, PalmTraits, ReadingKind } from './types';

export interface GateInput {
  size: number;
  mime: string;
  name: string;
  bytes: Uint8Array;
  frame: Frame | null;
  kind: ReadingKind;
  now?: number;
}

export interface GateFail {
  ok: false;
  code: IssueCode;
  checks: CheckLine[];
  reading?: undefined;
}

export interface GatePass {
  ok: true;
  code?: undefined;
  checks: CheckLine[];
  reading: TraditionalReading;
  traits: FaceTraits | PalmTraits;
}

export type GateResult = GateFail | GatePass;

const hits: number[] = [];

export function resetQuota(): void {
  hits.length = 0;
}

function takeQuota(now: number): boolean {
  while (hits.length && now - hits[0] > QUOTA_WINDOW_MS) hits.shift();
  if (hits.length >= ANALYSIS_QUOTA) return false;
  hits.push(now);
  return true;
}

function line(id: string, ok: boolean, he: string, en: string): CheckLine {
  return { id, ok, he, en };
}

function dimensionIssue(frame: Frame): IssueCode | null {
  if (frame.width < MIN_IMAGE_WIDTH || frame.height < MIN_IMAGE_HEIGHT) return 'too-small-dims';
  if (frame.width > MAX_IMAGE_WIDTH || frame.height > MAX_IMAGE_HEIGHT) return 'too-large-dims';
  const aspect = frame.width / frame.height;
  if (aspect < MIN_ASPECT || aspect > MAX_ASPECT) return 'bad-aspect';
  return null;
}

/**
 * השער היחיד לפני פרשנות.
 * קובץ, איכות, התאמת נושא ומסננת תוכן. כישלון במסננת לא מגיע לפרשנות.
 * באפליקציה הזו אין שרת העלאה: אותה בדיקה רצה במכשיר, והתמונה לא נשלחת החוצה.
 */
export function gateImage(input: GateInput, analyze: typeof interpret = interpret): GateResult {
  const fileCode = fileIssues({ size: input.size, mime: input.mime, name: input.name, bytes: input.bytes });
  if (fileCode) {
    return { ok: false, code: fileCode, checks: [line('file', false, 'הקובץ לא עבר את הבדיקה', 'The file did not pass')] };
  }
  const frame = input.frame;
  if (!frame) {
    return { ok: false, code: 'damaged', checks: [line('file', false, 'התמונה לא נקראה', 'The image was not read')] };
  }
  const dim = dimensionIssue(frame);
  if (dim) {
    return { ok: false, code: dim, checks: [line('file', true, 'תמונה תקינה', 'Valid image'), line('size', false, 'המידות לא מתאימות', 'The size does not fit')] };
  }
  const quality = qualityIssue(frame);
  if (quality) {
    return {
      ok: false,
      code: quality,
      checks: [
        line('file', true, 'תמונה תקינה', 'Valid image'),
        line('quality', false, 'מומלץ לצלם מחדש', 'A new photo is recommended'),
      ],
    };
  }
  const blocked = moderationIssue(frame);
  if (blocked) {
    return {
      ok: false,
      code: blocked,
      checks: [line('file', true, 'תמונה תקינה', 'Valid image'), line('safety', false, 'התמונה אינה מתאימה', 'The image is not suitable')],
    };
  }
  const subject = input.kind === 'face' ? detectFace(frame) : detectPalm(frame);
  if (!subject.ok) {
    const label = input.kind === 'face'
      ? { he: 'פנים מזוהות', en: 'Face found' }
      : { he: 'כף יד מזוהה', en: 'Palm found' };
    const code = 'code' in subject ? subject.code : input.kind === 'face' ? 'no-face' : 'no-palm';
    return {
      ok: false,
      code,
      checks: [
        line('file', true, 'תמונה תקינה', 'Valid image'),
        line('quality', true, 'איכות מספקת', 'Quality is enough'),
        line('subject', false, label.he, label.en),
      ],
    };
  }
  if (!takeQuota(input.now ?? Date.now())) {
    return { ok: false, code: 'quota', checks: [line('quota', false, 'אפשר להמשיך בעוד רגע', 'Please wait a moment')] };
  }
  const reading = analyze(input.kind, subject.traits);
  const subjectLabel = input.kind === 'face'
    ? { he: 'פנים מזוהות', en: 'Face found' }
    : { he: 'כף יד מזוהה', en: 'Palm found' };
  return {
    ok: true,
    traits: subject.traits,
    reading,
    checks: [
      line('file', true, 'תמונה תקינה', 'Valid image'),
      line('quality', true, 'איכות מספקת', 'Quality is enough'),
      line('subject', true, subjectLabel.he, subjectLabel.en),
    ],
  };
}
