import assert from 'node:assert/strict';
import { applyOverrides, type Measured } from './handwriting.ts';
import {
  MAX_FILE_BYTES, allowUpload, resetUploadQuota, validateHandwritingFile, validateHandwritingFrame,
  type PixelFrame,
} from './handwriting-gate.ts';

function frame(w: number, h: number, paint: (x: number, y: number) => [number, number, number]): PixelFrame {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const [r, g, b] = paint(x, y);
      const i = (y * w + x) * 4;
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }
  return { width: w, height: h, data };
}

function rand(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

function writing(lines: number): PixelFrame {
  return frame(900, 700, (x, y) => {
    const paper: [number, number, number] = [246, 244, 238];
    const ink: [number, number, number] = [18, 32, 84];
    for (let line = 0; line < lines; line++) {
      const base = 90 + line * 150;
      const wave = Math.sin(x / 28 + line) * 5;
      const y0 = base + wave;
      if (Math.abs(y - (y0 + 14)) < 1.6 && x > 48 && x < 850) return ink;
      const cell = Math.floor(x / 11);
      const n = rand(cell, line * 19 + 3);
      const h = 7 + Math.floor(rand(cell, line + 11) * 18);
      if (n > 0.38 && y > y0 && y < y0 + h && x > 48 && x < 850) return ink;
    }
    return paper;
  });
}

function printed(): PixelFrame {
  return frame(900, 700, (x, y) => {
    for (let line = 0; line < 6; line++) {
      const y0 = 70 + line * 100;
      for (let col = 0; col < 26; col++) {
        const x0 = 36 + col * 32;
        if (x >= x0 && x < x0 + 12 && y >= y0 && y < y0 + 20) return [12, 12, 12];
      }
    }
    return [252, 252, 252];
  });
}

function jpegBytes(): Uint8Array {
  const bytes = new Uint8Array(32);
  bytes[0] = 0xff;
  bytes[1] = 0xd8;
  bytes[2] = 0xff;
  bytes[3] = 0xe0;
  return bytes;
}

const jpeg = validateHandwritingFile({ size: 1200, mime: 'application/octet-stream', name: 'page.jpg', bytes: jpegBytes() });
assert.equal(jpeg.checks.fileType, true, 'jpeg magic');
assert.equal(jpeg.checks.fileSize, true);

const renamed = validateHandwritingFile({ size: 80, mime: 'image/jpeg', name: 'photo.jpg.exe', bytes: jpegBytes() });
assert.equal(renamed.checks.fileType, false);

const gif = new Uint8Array(32);
gif.set([0x47, 0x49, 0x46, 0x38, 0x39, 0x61], 0);
const gifFile = validateHandwritingFile({ size: 80, mime: 'image/jpeg', name: 'page.jpg', bytes: gif });
assert.equal(gifFile.valid, false);
assert.equal(gifFile.errors[0]?.code, 'damaged');

const html = new Uint8Array(32);
const htmlText = '<svg xmlns="http://www.w3.org/2000/svg">';
for (let i = 0; i < htmlText.length; i++) html[i] = htmlText.charCodeAt(i);
const htmlFile = validateHandwritingFile({ size: 80, mime: 'image/svg+xml', name: 'page.png', bytes: html });
assert.equal(htmlFile.errors[0]?.code, 'damaged');

const big = validateHandwritingFile({ size: MAX_FILE_BYTES + 1, mime: 'image/jpeg', name: 'big.jpg', bytes: new Uint8Array() });
assert.equal(big.errors[0]?.code, 'size');
assert.equal(big.errors[0]?.he, 'יש לבחור תמונה בגודל של עד 10MB.');

const small = validateHandwritingFrame(frame(640, 480, () => [240, 240, 240]), { width: 640, height: 480 });
assert.equal(small.errors[0]?.code, 'resolution');
assert.equal(small.valid, false);

const dark = validateHandwritingFrame(frame(900, 700, () => [16, 16, 18]));
assert.equal(dark.errors[0]?.code, 'light');

const blank = validateHandwritingFrame(frame(900, 700, () => [250, 250, 248]));
assert.equal(blank.valid, false);
assert.equal(blank.errors[0]?.code, 'handwriting');

const face = validateHandwritingFrame(frame(900, 700, (x, y) => {
  const dx = (x - 450) / 220;
  const dy = (y - 340) / 280;
  if (dx * dx + dy * dy <= 1) {
    if ((x - 380) ** 2 + (y - 300) ** 2 < 18 ** 2) return [20, 20, 20];
    if ((x - 520) ** 2 + (y - 300) ** 2 < 18 ** 2) return [20, 20, 20];
    return [214, 166, 140];
  }
  return [120, 150, 130];
}));
assert.equal(face.valid, false, JSON.stringify(face.signals));
assert.notEqual(face.errors[0]?.code, 'size');

const page = validateHandwritingFrame(writing(4));
assert.equal(page.valid, true, JSON.stringify({ errors: page.errors, signals: page.signals, checks: page.checks }));
assert.equal(page.checks.handwriting, true);
assert.equal(page.checks.sufficientContent, true);
assert.equal(page.checks.blur, true);
assert.equal(page.checks.brightness, true);
assert.ok(page.handwriting.confidence >= 0.55, String(page.handwriting.confidence));
assert.ok(page.signals.lines >= 3, String(page.signals.lines));

const short = validateHandwritingFrame(writing(1));
assert.equal(short.valid, false, JSON.stringify(short.signals));
assert.equal(short.errors[0]?.code, 'lines');
assert.equal(short.checks.handwriting, true);
assert.equal(short.checks.sufficientContent, false);

const print = validateHandwritingFrame(printed());
assert.equal(print.valid, false, JSON.stringify(print.signals));
assert.equal(print.errors[0]?.code, 'printed');

function blurFrame(src: PixelFrame, radius = 8): PixelFrame {
  const { width: w, height: h, data } = src;
  const out = new Uint8ClampedArray(data.length);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let r = 0, g = 0, b = 0, n = 0;
      for (let dy = -radius; dy <= radius; dy += 2) {
        const yy = Math.min(h - 1, Math.max(0, y + dy));
        for (let dx = -radius; dx <= radius; dx += 2) {
          const i = (yy * w + Math.min(w - 1, Math.max(0, x + dx))) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          n++;
        }
      }
      const o = (y * w + x) * 4;
      out[o] = r / n;
      out[o + 1] = g / n;
      out[o + 2] = b / n;
      out[o + 3] = 255;
    }
  }
  return { width: w, height: h, data: out };
}

const mild = validateHandwritingFrame(blurFrame(writing(4), 2));
const heavy = validateHandwritingFrame(blurFrame(writing(4), 9));
assert.equal(mild.valid, true, JSON.stringify(mild.signals));
assert.equal(heavy.valid, false, JSON.stringify(heavy.signals));
assert.equal(heavy.errors[0]?.code, 'blur', JSON.stringify(heavy.signals));

const sample: Measured = {
  slant: { deg: 8, value: 'forward' },
  pressure: { darkness: 0.4, value: 'light' },
  size: { ratio: 0.04, value: 'medium' },
  baseline: { deg: 0.2, value: 'straight' },
  spacing: { ratio: 0.5, value: 'balanced' },
  lines: 4,
};
const edited = applyOverrides(sample, { slant: 'back', pressure: 'heavy' });
assert.equal(edited.slant.value, 'back');
assert.equal(edited.slant.deg, 8);
assert.equal(edited.pressure.value, 'heavy');
assert.equal(edited.size.value, 'medium');

resetUploadQuota();
for (let i = 0; i < 12; i++) assert.equal(allowUpload(1_000), true);
assert.equal(allowUpload(1_000), false);
resetUploadQuota();
assert.equal(allowUpload(1_000), true);

console.log('handwriting gate OK');
