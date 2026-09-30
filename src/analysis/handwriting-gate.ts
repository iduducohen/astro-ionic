/**
 * שער לפני ניתוח גרפולוגי. הכול רץ על פיקסלים במכשיר.
 * אין כאן העלאה לשרת ואין קריאה לשירות Vision חיצוני.
 *
 * קובץ → סוג וגודל → רזולוציה → תאורה → חדות → מבנה דיו (כתב יד / דפוס / כמות).
 */

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MIN_WIDTH = 800;
export const MIN_HEIGHT = 600;
/** מתחת לזה התמונה מטושטשת באופן מובהק. רעש קל עדיין עובר. */
/** סף לטשטוש מובהק. תמונה חדה נמצאת באלפים; רעש קל נשאר מעליו. */
export const BLUR_MIN = 900;
export const MIN_LINES = 3;
const HANDWRITING_MIN = 0.55;

export interface PixelFrame {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface GateNote {
  code: string;
  he: string;
  en: string;
}

export interface HandwritingChecks {
  fileType: boolean;
  fileSize: boolean;
  resolution: boolean;
  blur: boolean;
  brightness: boolean;
  handwriting: boolean;
  sufficientContent: boolean;
}

export interface HandwritingSignals {
  lines: number;
  confidence: number;
  sharpness: number;
  inkRatio: number;
  paper: number;
  widthCv: number;
  gapCv: number;
  runs: number;
}

export interface HandwritingValidation {
  valid: boolean;
  errors: GateNote[];
  warnings: GateNote[];
  checks: HandwritingChecks;
  handwriting: { isHandwriting: boolean; confidence: number };
  ran: { quality: boolean; blur: boolean; content: boolean };
  signals: HandwritingSignals;
}

const NOTES: Record<string, Omit<GateNote, 'code'>> = {
  type: { he: 'אפשר להעלות רק תמונות JPEG, PNG או WebP.', en: 'Only JPEG, PNG, or WebP photos can be uploaded.' },
  size: { he: 'יש לבחור תמונה בגודל של עד 10MB.', en: 'Choose a photo of up to 10MB.' },
  damaged: { he: 'הקובץ אינו תמונה תקינה.', en: 'This file is not a valid photo.' },
  resolution: { he: 'התמונה באיכות נמוכה מדי. נא להעלות תמונה ברורה יותר.', en: 'The photo quality is too low. Please upload a clearer photo.' },
  blur: { he: 'התמונה אינה ברורה מספיק. נסה לצלם מחדש בתמונה חדה יותר.', en: 'The photo is not sharp enough. Try again with a sharper photo.' },
  light: { he: 'התמונה אינה מוארת מספיק. נא לצלם בתאורה טובה וללא צללים.', en: 'The photo is not lit well enough. Take it in good light, without shadows.' },
  handwriting: { he: 'התמונה אינה נראית כמו דוגמת כתב יד מתאימה. נא להעלות דף עם 3–4 שורות לפחות של כתב יד.', en: 'This photo does not look like a usable handwriting sample. Upload a page with at least 3–4 lines of handwriting.' },
  printed: { he: 'נראה שהתמונה מכילה בעיקר טקסט מודפס. נא להעלות כתב יד אישי.', en: 'The photo looks mostly like printed text. Please upload your own handwriting.' },
  lines: { he: 'צריך לפחות 3–4 שורות של כתב יד כדי לבצע את הניתוח.', en: 'At least 3–4 lines of handwriting are needed for the analysis.' },
  angle: { he: 'נראה שהדף צולם בזווית. כדאי לצלם שוב ישר מלמעלה, או להמשיך.', en: 'The page looks tilted. A straight overhead photo is better, or you can continue.' },
  paper: { he: 'עדיף נייר בהיר ועט כחול או שחור. אפשר להמשיך אם הכתב ברור.', en: 'Light paper and blue or black ink work best. You can continue if the writing is clear.' },
  printedMaybe: { he: 'ייתכן שיש בתמונה גם טקסט מודפס. אם זה כתב היד שלך, אפשר להמשיך.', en: 'There may also be printed text in the photo. If this is your handwriting, you can continue.' },
};

const JPEG = [0xff, 0xd8, 0xff];
const PNG = [0x89, 0x50, 0x4e, 0x47];
const IMAGE_EXT = new Set(['jpg', 'jpeg', 'png', 'webp']);

const stamps: number[] = [];

export function resetUploadQuota(): void {
  stamps.length = 0;
}

/** מגביל ניסיונות חוזרים במכשיר. ביטול צילום לא נספר. */
export function allowUpload(now = Date.now()): boolean {
  const fresh = stamps.filter((t) => now - t < 60_000);
  stamps.length = 0;
  stamps.push(...fresh);
  if (stamps.length >= 12) return false;
  stamps.push(now);
  return true;
}

function note(code: string): GateNote {
  return { code, ...NOTES[code] };
}

function emptySignals(): HandwritingSignals {
  return { lines: 0, confidence: 0, sharpness: 0, inkRatio: 0, paper: 0, widthCv: 1, gapCv: 1, runs: 0 };
}

function emptyChecks(): HandwritingChecks {
  return {
    fileType: false,
    fileSize: false,
    resolution: false,
    blur: false,
    brightness: false,
    handwriting: false,
    sufficientContent: false,
  };
}

function pack(
  errors: GateNote[],
  warnings: GateNote[],
  checks: HandwritingChecks,
  ran: HandwritingValidation['ran'],
  signals: HandwritingSignals,
): HandwritingValidation {
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    checks,
    handwriting: { isHandwriting: checks.handwriting, confidence: signals.confidence },
    ran,
    signals,
  };
}

function starts(bytes: Uint8Array, sig: number[]): boolean {
  if (bytes.length < sig.length) return false;
  return sig.every((b, i) => bytes[i] === b);
}

function isWebp(bytes: Uint8Array): boolean {
  if (bytes.length < 12) return false;
  const riff = String.fromCharCode(...bytes.slice(0, 4));
  const webp = String.fromCharCode(...bytes.slice(8, 12));
  return riff === 'RIFF' && webp === 'WEBP';
}

function headText(bytes: Uint8Array): string {
  const n = Math.min(bytes.length, 120);
  let s = '';
  for (let i = 0; i < n; i++) s += String.fromCharCode(bytes[i]);
  return s.trim().toLowerCase();
}

function extOf(name: string): string {
  const base = name.split(/[/\\]/).pop() ?? name;
  const i = base.lastIndexOf('.');
  return i >= 0 ? base.slice(i + 1).toLowerCase() : '';
}

function kindOf(bytes: Uint8Array): 'jpeg' | 'png' | 'webp' | null {
  if (starts(bytes, JPEG)) return 'jpeg';
  if (starts(bytes, PNG)) return 'png';
  if (isWebp(bytes)) return 'webp';
  return null;
}

/** סוג הקובץ נקבע לפי החתימה, לא לפי ה-MIME שהדפדפן מדווח. */
export function validateHandwritingFile(input: { size: number; mime: string; name: string; bytes: Uint8Array }): HandwritingValidation {
  const checks = emptyChecks();
  const ran = { quality: false, blur: false, content: false };
  const size = Math.max(0, input.size, input.bytes.byteLength);
  if (size <= 0) return pack([note('damaged')], [], checks, ran, emptySignals());
  if (size > MAX_FILE_BYTES) return pack([note('size')], [], checks, ran, emptySignals());
  checks.fileSize = true;
  const text = headText(input.bytes);
  if (input.bytes.length < 24 || text.startsWith('<') || text.includes('<svg') || text.includes('<html') || text.includes('<?xml') || text.startsWith('%pdf') || text.startsWith('gif')) {
    return pack([note('damaged')], [], checks, ran, emptySignals());
  }
  const kind = kindOf(input.bytes);
  const ext = extOf(input.name);
  if (!kind || (ext !== '' && !IMAGE_EXT.has(ext))) return pack([note('type')], [], checks, ran, emptySignals());
  checks.fileType = true;
  return pack([], [], checks, ran, emptySignals());
}

/** הקובץ עבר בדיקת סוג, אבל הפענוח לתמונה נכשל. */
export function unreadableHandwriting(): HandwritingValidation {
  const checks = emptyChecks();
  checks.fileType = true;
  checks.fileSize = true;
  return pack([note('damaged')], [], checks, { quality: false, blur: false, content: false }, emptySignals());
}

function luma(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function isSkin(r: number, g: number, b: number): boolean {
  if (r < 70 || g < 35 || b < 20) return false;
  if (r < g || r < b) return false;
  if (Math.max(r, g, b) - Math.min(r, g, b) < 14) return false;
  const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
  const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
  return cb >= 77 && cb <= 130 && cr >= 130 && cr <= 180;
}

function isPaper(r: number, g: number, b: number): boolean {
  const l = luma(r, g, b);
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  return l > 176 && sat < 46;
}

function cv(values: number[]): number {
  if (values.length < 2) return 1;
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  if (mean < 1e-3) return 1;
  const variance = values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length;
  return Math.sqrt(variance) / mean;
}

function otsu(hist: number[], total: number): number {
  let sum = 0;
  for (let i = 0; i < 256; i++) sum += i * hist[i];
  let sumB = 0, wB = 0, best = 0, thr = 127;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (!wB) continue;
    const wF = total - wB;
    if (!wF) break;
    sumB += t * hist[t];
    const mB = sumB / wB, mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) ** 2;
    if (between > best) { best = between; thr = t; }
  }
  return thr;
}

interface Sample {
  w: number;
  h: number;
  gray: Uint8Array;
  red: Uint8Array;
  green: Uint8Array;
  blue: Uint8Array;
  mean: number;
  std: number;
  paper: number;
  skin: number;
}

function sample(frame: PixelFrame, maxW = 480): Sample {
  const scale = Math.min(1, maxW / Math.max(1, frame.width));
  const w = Math.max(8, Math.round(frame.width * scale));
  const h = Math.max(8, Math.round(frame.height * scale));
  const gray = new Uint8Array(w * h);
  const red = new Uint8Array(w * h);
  const green = new Uint8Array(w * h);
  const blue = new Uint8Array(w * h);
  let sum = 0, sum2 = 0, paper = 0, skin = 0;
  for (let y = 0; y < h; y++) {
    const sy = Math.min(frame.height - 1, Math.floor((y + 0.5) * frame.height / h));
    for (let x = 0; x < w; x++) {
      const sx = Math.min(frame.width - 1, Math.floor((x + 0.5) * frame.width / w));
      const i = (sy * frame.width + sx) * 4;
      const r = frame.data[i], g = frame.data[i + 1], b = frame.data[i + 2];
      const p = y * w + x;
      const l = luma(r, g, b);
      gray[p] = l;
      red[p] = r;
      green[p] = g;
      blue[p] = b;
      sum += l;
      sum2 += l * l;
      if (isPaper(r, g, b)) paper++;
      if (isSkin(r, g, b)) skin++;
    }
  }
  const n = w * h;
  const mean = sum / n;
  return { w, h, gray, red, green, blue, mean, std: Math.sqrt(Math.max(0, sum2 / n - mean * mean)), paper: paper / n, skin: skin / n };
}

export function sharpnessOf(frame: PixelFrame): number {
  const { gray, w, h } = sample(frame, 160);
  let sum = 0, sum2 = 0, n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v = gray[i - 1] + gray[i + 1] + gray[i - w] + gray[i + w] - 4 * gray[i];
      sum += v;
      sum2 += v * v;
      n++;
    }
  }
  if (!n) return 0;
  const mean = sum / n;
  return sum2 / n - mean * mean;
}

function lightingProblem(view: Sample): boolean {
  if (view.mean < 52) return true;
  if (view.std < 9 && view.mean > 55 && view.mean < 210) return true;
  return false;
}

interface InkRead {
  looks: boolean;
  lines: number;
  inkRatio: number;
  paper: number;
  widthCv: number;
  gapCv: number;
  runs: number;
  printed: 'no' | 'soft' | 'hard';
  tilt: boolean;
  paperWeak: boolean;
  oddInk: boolean;
  contrast: number;
}

function readInk(view: Sample): InkRead {
  const { w, h, gray } = view;
  const mx = Math.round(w * 0.03), my = Math.round(h * 0.03);
  const hist = new Array(256).fill(0);
  let n = 0;
  for (let y = my; y < h - my; y++) for (let x = mx; x < w - mx; x++) { hist[gray[y * w + x]]++; n++; }
  const thr = otsu(hist, Math.max(1, n));
  const ink = new Uint8Array(w * h);
  let inkCount = 0, inkSum = 0, bgSum = 0, bgCount = 0;
  let inkR = 0, inkG = 0, inkB = 0, preferred = 0;
  for (let y = my; y < h - my; y++) for (let x = mx; x < w - mx; x++) {
    const p = y * w + x;
    const g = gray[p];
    if (g <= thr) {
      ink[p] = 1;
      inkCount++;
      inkSum += g;
      inkR += view.red[p];
      inkG += view.green[p];
      inkB += view.blue[p];
      const r = view.red[p], gc = view.green[p], b = view.blue[p];
      const sat = Math.max(r, gc, b) - Math.min(r, gc, b);
      const dark = g < 120;
      if (dark && (sat < 40 || (b >= r && b >= gc))) preferred++;
    } else {
      bgSum += g;
      bgCount++;
    }
  }
  for (let y = my; y < h - my; y++) {
    let c = 0;
    for (let x = mx; x < w - mx; x++) c += ink[y * w + x];
    if (c > (w - 2 * mx) * 0.9) {
      for (let x = mx; x < w - mx; x++) if (ink[y * w + x]) { ink[y * w + x] = 0; inkCount--; }
    }
  }
  const rows = new Array(h).fill(0);
  for (let y = 0; y < h; y++) {
    let c = 0;
    for (let x = 0; x < w; x++) c += ink[y * w + x];
    rows[y] = c;
  }
  const sm = rows.map((_, y) => {
    let s = 0, k = 0;
    for (let d = -2; d <= 2; d++) {
      const v = rows[y + d];
      if (v !== undefined) { s += v; k++; }
    }
    return k ? s / k : 0;
  });
  const peak = Math.max(...sm, 0);
  const bands: [number, number][] = [];
  let start = -1;
  for (let y = 0; y < h; y++) {
    const on = peak > 8 && sm[y] > peak * 0.18;
    if (on && start < 0) start = y;
    if ((!on || y === h - 1) && start >= 0) {
      const end = on && y === h - 1 ? y + 1 : y;
      if (end - start >= 4 && end - start < h * 0.2) bands.push([start, end]);
      start = -1;
    }
  }
  const merged: [number, number][] = [];
  for (const band of bands) {
    const prev = merged[merged.length - 1];
    if (prev && band[0] - prev[1] <= 3) prev[1] = band[1];
    else merged.push([band[0], band[1]]);
  }
  const widths: number[] = [];
  const gaps: number[] = [];
  let leftY = 0, leftN = 0, rightY = 0, rightN = 0;
  for (const [a, b] of merged) {
    const cols = new Uint8Array(w);
    for (let y = a; y < b; y++) for (let x = 0; x < w; x++) if (ink[y * w + x]) cols[x] = 1;
    let x = 0;
    while (x < w && !cols[x]) x++;
    while (x < w) {
      let run = 0;
      const x0 = x;
      while (x < w && cols[x]) { run++; x++; }
      if (run) widths.push(run);
      let gap = 0;
      while (x < w && !cols[x]) { gap++; x++; }
      if (gap && x < w) gaps.push(gap);
      const mid = x0 + run / 2;
      if (mid < w / 3) { leftY += (a + b) / 2; leftN++; }
      if (mid > (2 * w) / 3) { rightY += (a + b) / 2; rightN++; }
    }
  }
  const widthCv = cv(widths);
  const gapCv = cv(gaps);
  const runs = widths.length;
  const inkRatio = n ? inkCount / n : 0;
  const contrast = (bgCount ? bgSum / bgCount : 0) - (inkCount ? inkSum / inkCount : 0);
  const lines = merged.length;
  const printedHard = lines >= 3 && runs >= 12 && widthCv < 0.16 && gapCv < 0.22;
  const printedSoft = !printedHard && lines >= 3 && runs >= 10 && widthCv < 0.28 && gapCv < 0.32;
  const looks = lines >= 1 && inkRatio >= 0.006 && inkRatio <= 0.3 && view.paper >= 0.38 && view.skin < 0.28 && contrast >= 28;
  const tilt = leftN > 0 && rightN > 0 && Math.abs(leftY / leftN - rightY / rightN) > h * 0.12;
  const oddInk = inkCount > 20 && preferred / inkCount < 0.4;
  return {
    looks: looks && !printedHard,
    lines,
    inkRatio,
    paper: view.paper,
    widthCv,
    gapCv,
    runs,
    printed: printedHard ? 'hard' : printedSoft ? 'soft' : 'no',
    tilt,
    paperWeak: view.paper < 0.62,
    oddInk,
    contrast,
  };
}

function confidenceOf(ink: InkRead, sharp: number, blurOk: boolean): number {
  let score = 0;
  if (ink.paper > 0.55) score += 0.25;
  if (ink.inkRatio > 0.008 && ink.inkRatio < 0.2) score += 0.2;
  if (ink.lines >= 4) score += 0.3;
  else if (ink.lines >= MIN_LINES) score += 0.22;
  else if (ink.lines >= 1) score += 0.08;
  if (ink.widthCv > 0.25) score += 0.15;
  if (blurOk) score += 0.1;
  if (ink.printed === 'hard' || !ink.looks) score = Math.min(score, 0.34);
  if (sharp < BLUR_MIN) score = Math.min(score, 0.7);
  return Math.round(Math.min(0.99, score) * 100) / 100;
}

/**
 * בדיקת איכות והתאמה לכתב יד. `width` ו-`height` הם גודל התמונה המקורי,
 * גם אם `frame` הוקטן לניתוח.
 */
export function validateHandwritingFrame(frame: PixelFrame, size?: { width: number; height: number }): HandwritingValidation {
  const checks = emptyChecks();
  checks.fileType = true;
  checks.fileSize = true;
  const errors: GateNote[] = [];
  const warnings: GateNote[] = [];
  const width = size?.width ?? frame.width;
  const height = size?.height ?? frame.height;
  const ran = { quality: true, blur: false, content: false };
  if (width < MIN_WIDTH || height < MIN_HEIGHT) {
    errors.push(note('resolution'));
    return pack(errors, warnings, checks, ran, emptySignals());
  }
  checks.resolution = true;
  const view = sample(frame);
  const sharp = sharpnessOf(frame);
  ran.blur = true;
  checks.blur = sharp >= BLUR_MIN;
  const dark = lightingProblem(view);
  checks.brightness = !dark;
  if (dark) {
    errors.push(note('light'));
    return pack(errors, warnings, checks, ran, { ...emptySignals(), sharpness: sharp, paper: view.paper });
  }
  const ink = readInk(view);
  ran.content = true;
  const blurOk = checks.blur;
  const confidence = confidenceOf(ink, sharp, blurOk);
  const signals: HandwritingSignals = {
    lines: ink.lines,
    confidence,
    sharpness: Math.round(sharp * 10) / 10,
    inkRatio: Math.round(ink.inkRatio * 1000) / 1000,
    paper: Math.round(ink.paper * 100) / 100,
    widthCv: Math.round(ink.widthCv * 100) / 100,
    gapCv: Math.round(ink.gapCv * 100) / 100,
    runs: ink.runs,
  };
  const isWriting = ink.looks && ink.printed !== 'hard' && confidence >= HANDWRITING_MIN;
  if (ink.printed === 'hard') {
    errors.push(note('printed'));
  } else if (!isWriting) {
    errors.push(note('handwriting'));
  } else if (!blurOk) {
    checks.handwriting = true;
    checks.sufficientContent = ink.lines >= MIN_LINES;
    errors.push(note('blur'));
  } else if (ink.lines < MIN_LINES) {
    checks.handwriting = true;
    errors.push(note('lines'));
  } else if (ink.contrast < 32) {
    checks.brightness = false;
    errors.push(note('light'));
  } else {
    checks.handwriting = true;
    checks.sufficientContent = true;
    if (ink.printed === 'soft') warnings.push(note('printedMaybe'));
    if (ink.tilt) warnings.push(note('angle'));
    if (ink.paperWeak || ink.oddInk) warnings.push(note('paper'));
  }
  return pack(errors, warnings, checks, ran, signals);
}
