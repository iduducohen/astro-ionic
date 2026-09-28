/**
 * handwriting.ts — מדידת מאפייני כתב יד מתוך תמונה, במכשיר בלבד (canvas).
 *
 * שלבים:
 * 1. הקטנה לרוחב ~900px, גווני אפור, סף אוטסו → מסכת דיו.
 * 2. היטל אופקי → שורות טקסט (רצועות).
 * 3. לחץ   = כהות ממוצעת של פיקסלי הדיו.
 *    גודל  = גובה שורה חציוני ביחס לרוחב התמונה.
 *    קו כתיבה = שיפוע רגרסיה של תחתית הדיו לאורך כל שורה.
 *    נטייה = זווית ההטיה (shear) שבה ההיטל האנכי "הכי חד" — הקווים האנכיים מתיישרים.
 *    מרווח = רווח חציוני בין מילים ביחס לגובה השורה.
 */

export type Dir = 'rtl' | 'ltr';
export type Slant = 'back' | 'upright' | 'forward';
export type Pressure = 'light' | 'medium' | 'heavy';
export type Size = 'small' | 'medium' | 'large';
export type Baseline = 'falling' | 'straight' | 'rising';
export type Spacing = 'narrow' | 'balanced' | 'wide';

export interface Measured {
  slant: { deg: number; value: Slant };
  pressure: { darkness: number; value: Pressure };
  size: { ratio: number; value: Size };
  baseline: { deg: number; value: Baseline };
  spacing: { ratio: number; value: Spacing };
  lines: number;
}

const MAX_W = 900;

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error('image'));
    img.src = src;
  });
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

const median = (a: number[]) => {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)];
};

export async function measureHandwriting(src: string, dir: Dir): Promise<Measured> {
  const img = await loadImage(src);
  const scale = Math.min(1, MAX_W / img.width);
  const W = Math.round(img.width * scale), H = Math.round(img.height * scale);
  const cv = document.createElement('canvas');
  cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, W, H);
  const px = ctx.getImageData(0, 0, W, H).data;

  // גווני אפור, בלי שוליים של 4% (צללים וקצוות דף)
  const mx = Math.round(W * 0.04), my = Math.round(H * 0.04);
  const gray = new Uint8Array(W * H);
  const hist = new Array(256).fill(0);
  let n = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const g = Math.round(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]);
    gray[y * W + x] = g;
    if (x >= mx && x < W - mx && y >= my && y < H - my) { hist[g]++; n++; }
  }
  const thr = otsu(hist, n);

  const ink = new Uint8Array(W * H);
  let inkCount = 0, inkSum = 0, bgSum = 0, bgCount = 0;
  for (let y = my; y < H - my; y++) for (let x = mx; x < W - mx; x++) {
    const g = gray[y * W + x];
    if (g < thr) { ink[y * W + x] = 1; inkCount++; inkSum += g; } else { bgSum += g; bgCount++; }
  }
  // מחיקת שורות מחברת וקו שוליים: שורות/עמודות שרובן "דיו" הן קווים מודפסים, לא כתב
  for (let y = my; y < H - my; y++) {
    let c = 0; for (let x = mx; x < W - mx; x++) c += ink[y * W + x];
    if (c > (W - 2 * mx) * 0.35) for (let x = mx; x < W - mx; x++) if (ink[y * W + x]) { ink[y * W + x] = 0; inkCount--; inkSum -= gray[y * W + x]; }
  }
  for (let x = mx; x < W - mx; x++) {
    let c = 0; for (let y = my; y < H - my; y++) c += ink[y * W + x];
    if (c > (H - 2 * my) * 0.5) for (let y = my; y < H - my; y++) if (ink[y * W + x]) { ink[y * W + x] = 0; inkCount--; inkSum -= gray[y * W + x]; }
  }
  const inkRatio = inkCount / n;
  if (inkRatio < 0.003 || inkRatio > 0.35) throw new Error('no-text');

  // ---- שורות: היטל אופקי ----
  const rows = new Array(H).fill(0);
  for (let y = 0; y < H; y++) { let c = 0; for (let x = 0; x < W; x++) c += ink[y * W + x]; rows[y] = c; }
  const sm = rows.map((_, y) => { let s = 0, k = 0; for (let d = -2; d <= 2; d++) { const v = rows[y + d]; if (v !== undefined) { s += v; k++; } } return s / k; });
  const peak = Math.max(...sm);
  const bands: [number, number][] = [];
  let start = -1;
  for (let y = 0; y < H; y++) {
    const on = sm[y] > peak * 0.12;
    if (on && start < 0) start = y;
    if ((!on || y === H - 1) && start >= 0) { if (y - start >= 6) bands.push([start, y]); start = -1; }
  }
  if (!bands.length) throw new Error('no-text');
  const lineH = median(bands.map(([a, b]) => b - a));

  // ---- לחץ ----
  const inkMean = inkSum / Math.max(1, inkCount);
  const bgMean = bgSum / Math.max(1, bgCount);
  const darkness = Math.max(0, Math.min(1, (bgMean - inkMean) / Math.max(40, bgMean)));
  const pressure: Pressure = darkness < 0.5 ? 'light' : darkness > 0.72 ? 'heavy' : 'medium';

  // ---- גודל ----
  const sizeRatio = lineH / W;
  const size: Size = sizeRatio < 0.03 ? 'small' : sizeRatio > 0.06 ? 'large' : 'medium';

  // ---- קו כתיבה: שיפוע מרכז הדיו לאורך כל שורה (עמיד לאותיות יורדות כמו ק, ן, ך) ----
  const slopes: number[] = [];
  const SEG = 12;
  for (const [a0, b0] of bands) {
    const pad = Math.round((b0 - a0) * 0.3), a = Math.max(0, a0 - pad), b = Math.min(H - 1, b0 + pad);
    const pts: [number, number][] = [];
    for (let s = 0; s < SEG; s++) {
      const x0 = Math.floor((W * s) / SEG), x1 = Math.floor((W * (s + 1)) / SEG);
      let cnt = 0, sy = 0;
      for (let y = a; y <= b; y++) for (let x = x0; x < x1; x++) if (ink[y * W + x]) { cnt++; sy += y; }
      if (cnt > 20) pts.push([(x0 + x1) / 2, sy / cnt]);
    }
    if (pts.length >= 4) {
      const mxp = pts.reduce((s, p) => s + p[0], 0) / pts.length, myp = pts.reduce((s, p) => s + p[1], 0) / pts.length;
      let num = 0, den = 0;
      for (const [x, y] of pts) { num += (x - mxp) * (y - myp); den += (x - mxp) ** 2; }
      if (den) slopes.push(num / den);
    }
  }
  // dy/dx בתמונה (y כלפי מטה). בכתיבה מימין לשמאל "עולה" = y קטן לכיוון שמאל = שיפוע חיובי.
  const slope = median(slopes);
  const riseDeg = (Math.atan(slope) * 180) / Math.PI * (dir === 'rtl' ? 1 : -1);
  const baseline: Baseline = Math.abs(riseDeg) < 1.5 ? 'straight' : riseDeg > 0 ? 'rising' : 'falling';

  // ---- נטייה: זווית הקווים הכמעט-אנכיים, לפי כיוון הקצוות (Sobel) ----
  // קו שנוטה ימינה (ראשו ימינה) בזווית φ מייצר גרדיאנט עם gy/gx = tan φ.
  // אוספים רק קצוות של קווים אנכיים (|φ| < 40°) ולוקחים חציון משוקלל — עמיד לקווים האופקיים של האותיות.
  const bins = new Float64Array(81); // -40..40 מעלות
  const inBand = new Uint8Array(H);
  for (const [a, b] of bands) for (let y = a; y <= b; y++) inBand[y] = 1;
  for (let y = 1; y < H - 1; y++) {
    if (!inBand[y]) continue;
    for (let x = 1; x < W - 1; x++) {
      const i = y * W + x;
      if (!ink[i] && !ink[i - 1] && !ink[i + 1]) continue;
      const g = (dx: number, dy: number) => gray[(y + dy) * W + (x + dx)];
      const gx = -g(-1, -1) - 2 * g(-1, 0) - g(-1, 1) + g(1, -1) + 2 * g(1, 0) + g(1, 1);
      const gy = -g(-1, -1) - 2 * g(0, -1) - g(1, -1) + g(-1, 1) + 2 * g(0, 1) + g(1, 1);
      const mag = Math.hypot(gx, gy);
      if (mag < 60 || Math.abs(gx) < Math.abs(gy) * 1.2) continue;
      const phi = (Math.atan(gy / gx) * 180) / Math.PI;
      if (Math.abs(phi) > 40) continue;
      bins[Math.round(phi) + 40] += mag;
    }
  }
  let total = 0; for (const v of bins) total += v;
  let acc = 0, bestA = 0;
  for (let k = 0; k < bins.length; k++) { acc += bins[k]; if (acc >= total / 2) { bestA = k - 40; break; } }
  // bestA > 0 ⇔ ראש הקו נוטה ימינה. "קדימה" = לכיוון הכתיבה.
  const forwardDeg = dir === 'ltr' ? bestA : -bestA;
  const slant: Slant = Math.abs(forwardDeg) < 6 ? 'upright' : forwardDeg > 0 ? 'forward' : 'back';

  // ---- מרווחים: רווחים בין מילים ביחס לגובה שורה ----
  const gaps: number[] = [];
  for (const [a, b] of bands) {
    const bh = b - a;
    let run = 0, seenInk = false;
    for (let x = 0; x < W; x++) {
      let c = 0;
      for (let y = a; y <= b; y++) c += ink[y * W + x];
      if (c === 0) run++;
      else { if (seenInk && run > bh * 0.3) gaps.push(run / bh); run = 0; seenInk = true; }
    }
  }
  const spacingRatio = median(gaps);
  const spacing: Spacing = !gaps.length ? 'balanced' : spacingRatio < 0.42 ? 'narrow' : spacingRatio > 0.9 ? 'wide' : 'balanced';

  return {
    slant: { deg: Math.round(forwardDeg), value: slant },
    pressure: { darkness: Math.round(darkness * 100) / 100, value: pressure },
    size: { ratio: Math.round(sizeRatio * 1000) / 1000, value: size },
    baseline: { deg: Math.round(riseDeg * 10) / 10, value: baseline },
    spacing: { ratio: Math.round(spacingRatio * 100) / 100, value: spacing },
    lines: bands.length,
  };
}
