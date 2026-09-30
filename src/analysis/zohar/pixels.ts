import {
  BRIGHT_MEAN, BRIGHT_SHARE, CROP_EDGE, DARK_MEAN, DISALLOWED_SKIN, EMPTY_STD,
  MIN_FACE_AREA, MIN_FINGER_PEAKS, MIN_PALM_LINES, MIN_PALM_SKIN, PALM_BORDER, SHARP_MIN, TINY_FACE_AREA,
} from './limits';
import type { FaceTraits, Frame, IssueCode, PalmTraits, SubjectResult } from './types';

export function luma(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function isSkinPixel(r: number, g: number, b: number): boolean {
  if (r < 70 || g < 35 || b < 20) return false;
  if (r < g || r < b) return false;
  if (Math.max(r, g, b) - Math.min(r, g, b) < 14) return false;
  const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
  const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;
  return cb >= 77 && cb <= 130 && cr >= 130 && cr <= 180;
}

interface Small {
  w: number;
  h: number;
  skin: Uint8Array;
  luma: Uint8Array;
  skinRatio: number;
}

function down(frame: Frame, maxW = 160): Small {
  const scale = Math.min(1, maxW / frame.width);
  const w = Math.max(8, Math.round(frame.width * scale));
  const h = Math.max(8, Math.round(frame.height * scale));
  const skin = new Uint8Array(w * h);
  const lum = new Uint8Array(w * h);
  let skinN = 0;
  for (let y = 0; y < h; y++) {
    const sy = Math.min(frame.height - 1, Math.floor((y + 0.5) * frame.height / h));
    for (let x = 0; x < w; x++) {
      const sx = Math.min(frame.width - 1, Math.floor((x + 0.5) * frame.width / w));
      const i = (sy * frame.width + sx) * 4;
      const r = frame.data[i], g = frame.data[i + 1], b = frame.data[i + 2];
      const L = luma(r, g, b);
      const p = y * w + x;
      lum[p] = L;
      if (isSkinPixel(r, g, b)) { skin[p] = 1; skinN++; }
    }
  }
  return { w, h, skin, luma: lum, skinRatio: skinN / (w * h) };
}

export function sharpness(frame: Frame): number {
  const { luma: lum, w, h } = down(frame, 120);
  let sum = 0, sum2 = 0, n = 0;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const v = lum[i - 1] + lum[i + 1] + lum[i - w] + lum[i + w] - 4 * lum[i];
      sum += v;
      sum2 += v * v;
      n++;
    }
  }
  if (!n) return 0;
  const mean = sum / n;
  return sum2 / n - mean * mean;
}

export function qualityIssue(frame: Frame): IssueCode | null {
  let sum = 0, sum2 = 0, hot = 0;
  const n = frame.width * frame.height;
  if (!n) return 'damaged';
  for (let i = 0; i < frame.data.length; i += 4) {
    const L = luma(frame.data[i], frame.data[i + 1], frame.data[i + 2]);
    sum += L;
    sum2 += L * L;
    if (L > 242) hot++;
  }
  const mean = sum / n;
  const variance = sum2 / n - mean * mean;
  if (mean < DARK_MEAN) return 'dark';
  if (mean > BRIGHT_MEAN || hot / n > BRIGHT_SHARE) return 'bright';
  if (Math.sqrt(Math.max(0, variance)) < EMPTY_STD) return 'empty';
  if (sharpness(frame) < SHARP_MIN) return 'blurry';
  return null;
}

interface Blob {
  area: number;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  cx: number;
  cy: number;
}

function blobsOf(skin: Uint8Array, w: number, h: number): Blob[] {
  const seen = new Uint8Array(w * h);
  const out: Blob[] = [];
  for (let i = 0; i < skin.length; i++) {
    if (!skin[i] || seen[i]) continue;
    const stack = [i];
    seen[i] = 1;
    let area = 0, minX = w, minY = h, maxX = 0, maxY = 0, sx = 0, sy = 0;
    while (stack.length) {
      const p = stack.pop()!;
      const x = p % w;
      const y = (p / w) | 0;
      area++;
      sx += x;
      sy += y;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
      const neigh = [p - 1, p + 1, p - w, p + w];
      for (const n of neigh) {
        if (n < 0 || n >= skin.length || seen[n] || !skin[n]) continue;
        const nx = n % w;
        if (Math.abs(nx - x) > 1) continue;
        seen[n] = 1;
        stack.push(n);
      }
    }
    if (area > 10) out.push({ area, minX, minY, maxX, maxY, cx: sx / area, cy: sy / area });
  }
  return out;
}

function hasEyes(small: Small, b: Blob): boolean {
  const bw = b.maxX - b.minX + 1;
  const bh = b.maxY - b.minY + 1;
  if (bw < 8 || bh < 8) return false;
  const y0 = b.minY + Math.round(bh * 0.18);
  const y1 = b.minY + Math.round(bh * 0.58);
  const mid = b.minX + bw / 2;
  let left = 0, right = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = b.minX + 1; x <= b.maxX - 1; x++) {
      const p = y * small.w + x;
      if (small.luma[p] > 62) continue;
      if (x < mid) left++;
      else right++;
    }
  }
  const need = Math.max(2, Math.round(Math.min(bw, bh) * 0.08));
  return left >= need && right >= need;
}

function eyeLine(small: Small, b: Blob): number {
  const bw = b.maxX - b.minX + 1;
  const bh = b.maxY - b.minY + 1;
  const y0 = b.minY + Math.round(bh * 0.18);
  const y1 = b.minY + Math.round(bh * 0.58);
  let n = 0, sy = 0;
  for (let y = y0; y <= y1; y++) {
    for (let x = b.minX; x <= b.maxX; x++) {
      if (small.luma[y * small.w + x] < 62) { n++; sy += y; }
    }
  }
  return n ? sy / n : b.minY + bh * 0.4;
}

function widthAt(small: Small, b: Blob, t: number): number {
  const y = Math.round(b.minY + (b.maxY - b.minY) * t);
  let n = 0;
  const row = y * small.w;
  for (let x = b.minX; x <= b.maxX; x++) if (small.skin[row + x]) n++;
  return n;
}

function faceShape(small: Small, b: Blob): FaceTraits['shape'] {
  const bw = b.maxX - b.minX + 1;
  const bh = b.maxY - b.minY + 1;
  const top = widthAt(small, b, 0.22);
  const mid = widthAt(small, b, 0.5);
  const bot = widthAt(small, b, 0.82);
  const aspect = bh / bw;
  if (top > bot * 1.35 && bot < mid * 0.8) return 'triangle';
  if (aspect > 1.18) return 'oval';
  if (aspect < 0.95) return 'square';
  return 'round';
}

function foreheadBand(small: Small, b: Blob, eyeY: number): FaceTraits['forehead'] {
  const bh = b.maxY - b.minY + 1;
  const ratio = (eyeY - b.minY) / bh;
  if (ratio > 0.42) return 'high';
  if (ratio > 0.28) return 'medium';
  return 'narrow';
}

function foreheadLines(small: Small, b: Blob, eyeY: number): FaceTraits['lines'] {
  const x0 = b.minX + Math.round((b.maxX - b.minX) * 0.2);
  const x1 = b.maxX - Math.round((b.maxX - b.minX) * 0.2);
  const y0 = b.minY + 2;
  const y1 = Math.max(y0 + 1, Math.round(eyeY) - 2);
  const rows: number[] = [];
  for (let y = y0; y <= y1; y++) {
    let edges = 0;
    for (let x = x0; x < x1; x++) {
      const d = Math.abs(small.luma[y * small.w + x] - small.luma[(y - 1) * small.w + x]);
      if (d > 28) edges++;
    }
    if (edges > (x1 - x0) * 0.18) rows.push(y);
  }
  if (rows.length < 2) return 'none';
  let gaps = 0;
  for (let i = 1; i < rows.length; i++) if (rows[i] - rows[i - 1] > 3) gaps++;
  return gaps >= 2 ? 'broken' : 'straight';
}

function hueOf(r: number, g: number, b: number): FaceTraits['eyes'] {
  if (b > r + 12 && b > g) return 'blue';
  if (g > r + 8 && g > b + 8) return 'green';
  if (r > 150 && g > 90 && b < 100 && r - b > 50) return 'amber';
  return 'brown';
}

function eyeColor(frame: Frame, small: Small, b: Blob): FaceTraits['eyes'] {
  const sx = frame.width / small.w;
  const sy = frame.height / small.h;
  const y0 = b.minY + Math.round((b.maxY - b.minY) * 0.15);
  const y1 = b.minY + Math.round((b.maxY - b.minY) * 0.62);
  const votes: Record<FaceTraits['eyes'], number> = { brown: 0, blue: 0, green: 0, amber: 0 };
  for (let y = y0; y <= y1; y++) {
    for (let x = b.minX; x <= b.maxX; x++) {
      if (small.luma[y * small.w + x] > 62) continue;
      for (let dy = -3; dy <= 3; dy++) {
        for (let dx = -3; dx <= 3; dx++) {
          const dist = Math.max(Math.abs(dx), Math.abs(dy));
          if (dist < 2 || dist > 3) continue;
          const ix = Math.min(frame.width - 1, Math.max(0, Math.round((x + dx + 0.5) * sx)));
          const iy = Math.min(frame.height - 1, Math.max(0, Math.round((y + dy + 0.5) * sy)));
          const i = (iy * frame.width + ix) * 4;
          const pr = frame.data[i], pg = frame.data[i + 1], pb = frame.data[i + 2];
          const L = luma(pr, pg, pb);
          if (L < 55 || L > 200) continue;
          votes[hueOf(pr, pg, pb)]++;
        }
      }
    }
  }
  return (Object.keys(votes) as FaceTraits['eyes'][]).sort((a, c) => votes[c] - votes[a])[0];
}

function cropped(b: Blob, w: number, h: number): boolean {
  const m = CROP_EDGE;
  return b.minX <= w * m || b.minY <= h * m || b.maxX >= w * (1 - m) - 1 || b.maxY >= h * (1 - m) - 1;
}

export function detectFace(frame: Frame): SubjectResult<FaceTraits> {
  const small = down(frame);
  const total = small.w * small.h;
  const list = blobsOf(small.skin, small.w, small.h)
    .filter((b) => hasEyes(small, b))
    .filter((b) => {
      const bw = b.maxX - b.minX + 1;
      const bh = b.maxY - b.minY + 1;
      const aspect = bh / bw;
      return aspect > 0.7 && aspect < 2.1;
    });
  if (!list.length) return { ok: false, code: 'no-face' };
  const big = list.filter((b) => b.area / total >= TINY_FACE_AREA);
  if (big.length >= 2) return { ok: false, code: 'many-faces' };
  const b = list.sort((a, c) => c.area - a.area)[0];
  if (cropped(b, small.w, small.h)) return { ok: false, code: 'face-cropped' };
  if (b.area / total < MIN_FACE_AREA) return { ok: false, code: 'face-small' };
  const eyeY = eyeLine(small, b);
  const traits: FaceTraits = {
    shape: faceShape(small, b),
    forehead: foreheadBand(small, b, eyeY),
    lines: foreheadLines(small, b, eyeY),
    eyes: eyeColor(frame, small, b),
  };
  return { ok: true, traits };
}

function fingerPeaks(small: Small): number {
  const top = new Int16Array(small.w);
  top.fill(small.h);
  for (let x = 0; x < small.w; x++) {
    for (let y = 0; y < small.h; y++) {
      if (small.skin[y * small.w + x]) { top[x] = y; break; }
    }
  }
  const smooth = new Float32Array(small.w);
  const rad = 2;
  for (let x = 0; x < small.w; x++) {
    let s = 0, n = 0;
    for (let k = -rad; k <= rad; k++) {
      const i = x + k;
      if (i < 0 || i >= small.w || top[i] >= small.h) continue;
      s += top[i];
      n++;
    }
    smooth[x] = n ? s / n : small.h;
  }
  const gap = Math.max(4, Math.round(small.w * 0.07));
  const rise = small.h * 0.05;
  let peaks = 0;
  let last = -gap * 2;
  for (let x = gap; x < small.w - gap; x++) {
    if (smooth[x] >= small.h - 1) continue;
    if (smooth[x] > small.h * 0.72) continue;
    const left = smooth[x - gap];
    const right = smooth[x + gap];
    if (left - smooth[x] >= rise && right - smooth[x] >= rise && x - last > gap) {
      peaks++;
      last = x;
    }
  }
  return peaks;
}

function borderSkin(small: Small): number {
  let touch = 0;
  const row = (y: number) => {
    let n = 0;
    for (let x = 0; x < small.w; x++) if (small.skin[y * small.w + x]) n++;
    return n / small.w;
  };
  const col = (x: number) => {
    let n = 0;
    for (let y = 0; y < small.h; y++) if (small.skin[y * small.w + x]) n++;
    return n / small.h;
  };
  if (row(0) > PALM_BORDER) touch++;
  if (row(small.h - 1) > PALM_BORDER) touch++;
  if (col(0) > PALM_BORDER) touch++;
  if (col(small.w - 1) > PALM_BORDER) touch++;
  return touch;
}

function lineRows(small: Small): number {
  const y0 = Math.round(small.h * 0.38);
  const y1 = Math.round(small.h * 0.9);
  const x0 = Math.round(small.w * 0.18);
  const x1 = Math.round(small.w * 0.82);
  const hits: number[] = [];
  for (let y = y0; y < y1; y++) {
    let dark = 0, span = 0;
    for (let x = x0; x < x1; x++) {
      const p = y * small.w + x;
      if (!small.skin[p] && small.luma[p] > 170) continue;
      const up = small.luma[Math.max(0, y - 3) * small.w + x];
      const dn = small.luma[Math.min(small.h - 1, y + 3) * small.w + x];
      span++;
      if (small.luma[p] + 22 < (up + dn) / 2) dark++;
    }
    if (span > 8 && dark / span > 0.28) hits.push(y);
  }
  let bands = 0, prev = -10;
  for (const y of hits) {
    if (y - prev > 4) bands++;
    prev = y;
  }
  return bands;
}

function palmTraits(small: Small): PalmTraits {
  const top = new Int16Array(small.w);
  top.fill(small.h);
  for (let x = 0; x < small.w; x++) {
    for (let y = 0; y < small.h; y++) {
      if (small.skin[y * small.w + x]) { top[x] = y; break; }
    }
  }
  const peaks: number[] = [];
  const gap = Math.max(4, Math.round(small.w * 0.07));
  const rise = small.h * 0.05;
  for (let x = gap; x < small.w - gap; x++) {
    if (top[x] >= small.h) continue;
    if (top[x - gap] - top[x] >= rise && top[x + gap] - top[x] >= rise) peaks.push(top[x]);
  }
  const finger = peaks.length ? peaks.reduce((a, b) => a + b, 0) / peaks.length : small.h * 0.3;
  let bodyTop = 0, bodyN = 0, minX = small.w, maxX = 0, maxY = 0;
  for (let y = Math.round(finger + small.h * 0.08); y < small.h; y++) {
    for (let x = 0; x < small.w; x++) {
      if (!small.skin[y * small.w + x]) continue;
      bodyN++;
      bodyTop += y;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  const bodyH = Math.max(1, maxY - (bodyN ? bodyTop / bodyN : finger));
  const bodyW = Math.max(1, maxX - minX);
  const longPalm = bodyH > bodyW * 1.05;
  const longFingers = (bodyTop / Math.max(1, bodyN) - finger) > bodyH * 0.55;
  const hand: PalmTraits['hand'] = longPalm
    ? (longFingers ? 'long-long' : 'long-short')
    : (longFingers ? 'square-long' : 'square-short');

  const band = (y0r: number, y1r: number) => {
    const y0 = Math.round(small.h * y0r);
    const y1 = Math.round(small.h * y1r);
    let bestY = y0, best = 0, span = 0, ys: number[] = [];
    for (let y = y0; y < y1; y++) {
      let dark = 0, first = -1, last = -1;
      for (let x = Math.round(small.w * 0.15); x < small.w * 0.85; x++) {
        const p = y * small.w + x;
        const up = small.luma[Math.max(0, y - 2) * small.w + x];
        if (small.luma[p] + 18 < up) {
          dark++;
          if (first < 0) first = x;
          last = x;
        }
      }
      if (dark > best) { best = dark; bestY = y; span = last - first; }
      if (dark > small.w * 0.12) ys.push(y);
    }
    const slope = ys.length > 2 ? Math.abs(ys[ys.length - 1] - ys[0]) : 0;
    return { bestY, span, slope, best };
  };
  const heart = band(0.4, 0.58);
  const head = band(0.58, 0.75);
  const width = small.w * 0.7;
  let heartId: PalmTraits['heart'] = 'straight';
  if (heart.span < width * 0.42) heartId = 'short';
  else if (heart.slope > small.h * 0.04) heartId = 'curved';
  else if (heart.span > width * 0.82) heartId = 'long';

  let headId: PalmTraits['head'] = 'straight';
  if (head.span < width * 0.4) headId = 'short';
  else if (head.slope > small.h * 0.045) headId = 'sloping';

  const life = band(0.62, 0.92);
  let lifeId: PalmTraits['life'] = 'wide';
  if (life.best < small.w * 0.08) lifeId = 'broken';
  else if (life.span < width * 0.35) lifeId = 'close';

  return { hand, heart: heartId, head: headId, life: lifeId };
}

export function detectPalm(frame: Frame): SubjectResult<PalmTraits> {
  const small = down(frame);
  if (small.skinRatio < MIN_PALM_SKIN) return { ok: false, code: 'no-palm' };
  if (borderSkin(small) >= 3) return { ok: false, code: 'palm-cropped' };
  if (fingerPeaks(small) < MIN_FINGER_PEAKS) return { ok: false, code: 'no-palm' };
  if (lineRows(small) < MIN_PALM_LINES) return { ok: false, code: 'palm-unclear' };
  return { ok: true, traits: palmTraits(small) };
}

export function hasFaceStructure(frame: Frame): boolean {
  return detectFace(frame).ok;
}

export function hasPalmStructure(frame: Frame): boolean {
  const small = down(frame);
  return fingerPeaks(small) >= MIN_FINGER_PEAKS;
}

/** דוחה תוכן פעיל ותמונת עור שממלאת את הפריים בלי פנים או כף יד. */
export function moderationIssue(frame: Frame): IssueCode | null {
  const small = down(frame);
  if (small.skinRatio >= DISALLOWED_SKIN && !hasFaceStructure(frame) && !hasPalmStructure(frame)) return 'disallowed';
  return null;
}
