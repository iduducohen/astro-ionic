import assert from 'node:assert/strict';
import { captureChoices } from './capture.ts';
import { fileIssues } from './file-check.ts';
import { gateImage, resetQuota } from './gate.ts';
import { interpret } from './interpret.ts';
import { MAX_FILE_SIZE } from './limits.ts';
import { isSkinPixel, qualityIssue, detectFace, detectPalm } from './pixels.ts';
import { TEMPERAMENTS } from './temperaments.ts';
import type { Frame } from './types.ts';

function frame(w: number, h: number, paint: (x: number, y: number) => [number, number, number]): Frame {
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

function inside(x: number, y: number, cx: number, cy: number, rx: number, ry: number): boolean {
  const dx = (x - cx) / rx;
  const dy = (y - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

const SKIN: [number, number, number] = [224, 176, 144];
const BG: [number, number, number] = [186, 204, 214];

function drawFace(x: number, y: number, cx: number, cy: number, rx: number, ry: number, eye: 'brown' | 'blue', lines: boolean): [number, number, number] | null {
  if (!inside(x, y, cx, cy, rx, ry)) return null;
  const er = Math.max(3, rx * 0.14);
  const ey = cy - ry * 0.05;
  const eyes = [cx - rx * 0.34, cx + rx * 0.34];
  for (const ex of eyes) {
    if (inside(x, y, ex, ey, er * 0.42, er * 0.42)) return [16, 16, 22];
    if (inside(x, y, ex, ey, er, er * 0.72)) return eye === 'blue' ? [80, 120, 180] : [120, 72, 48];
  }
  if (lines) {
    const top = cy - ry * 0.55;
    for (const ly of [top, top + ry * 0.12, top + ry * 0.24]) {
      if (Math.abs(y - ly) < 1.2 && Math.abs(x - cx) < rx * 0.45) return [90, 54, 40];
    }
  }
  return SKIN;
}

function face(w: number, h: number, parts: { cx: number; cy: number; rx: number; ry: number; eye?: 'brown' | 'blue'; lines?: boolean }[]): Frame {
  return frame(w, h, (x, y) => {
    if (x < 3 || y < 3) return [30, 30, 30];
    for (const p of parts) {
      const hit = drawFace(x, y, p.cx, p.cy, p.rx, p.ry, p.eye ?? 'brown', !!p.lines);
      if (hit) return hit;
    }
    return BG;
  });
}

function palm(cut: boolean, lines: boolean): Frame {
  const w = 200, h = 280;
  return frame(w, h, (x, y) => {
    if (!cut && (x < 2 || y < 2)) return [30, 30, 30];
    const skin = (px: number, py: number) => {
      const fingers = [38, 74, 110, 146];
      for (const fx of fingers) {
        const top = cut ? 0 : 34;
        if (px >= fx && px <= fx + 24 && py >= top && py <= 108) return true;
      }
      if (px >= 16 && px <= 52 && py >= 118 && py <= 188) return true;
      const left = cut ? 0 : 34;
      const right = cut ? w - 1 : 170;
      const bottom = cut ? h - 1 : 248;
      return px >= left && px <= right && py >= 100 && py <= bottom;
    };
    if (lines && y >= 148 && y <= 151 && x >= 58 && x <= 156) return [100, 58, 44];
    if (lines && y >= 186 && y <= 189 && x >= 64 && x <= 150) return [100, 58, 44];
    if (lines && y >= 220 && y <= 224 && x >= 78 && x <= 142) return [100, 58, 44];
    return skin(x, y) ? SKIN : BG;
  });
}

function jpeg(n = 80): Uint8Array {
  const b = new Uint8Array(n);
  b[0] = 0xff; b[1] = 0xd8; b[2] = 0xff;
  return b;
}

const clear = face(180, 230, [{ cx: 90, cy: 118, rx: 48, ry: 64 }]);
const photo = face(520, 640, [{ cx: 260, cy: 320, rx: 130, ry: 170 }]);

resetQuota();
assert.equal(isSkinPixel(224, 176, 144), true);
assert.equal(isSkinPixel(20, 40, 200), false);

assert.equal(detectFace(clear).ok, true);
assert.equal(detectFace(face(180, 230, [{ cx: 90, cy: 118, rx: 16, ry: 20 }])).ok, false);
assert.equal(detectFace(face(180, 230, [{ cx: 90, cy: 118, rx: 16, ry: 20 }])).ok === false && (detectFace(face(180, 230, [{ cx: 90, cy: 118, rx: 16, ry: 20 }])) as { code: string }).code, 'face-small');
assert.equal((detectFace(face(200, 240, [
  { cx: 55, cy: 120, rx: 36, ry: 48 },
  { cx: 145, cy: 120, rx: 36, ry: 48 },
])) as { code?: string }).code, 'many-faces');
assert.equal((detectFace(face(180, 230, [{ cx: 90, cy: 20, rx: 48, ry: 64 }])) as { code?: string }).code, 'face-cropped');
assert.equal((detectFace(frame(180, 230, (x, y) => (x < 40 ? [20, 80, 40] : [180, 200, 160]))) as { code?: string }).code, 'no-face');

const blue = detectFace(face(180, 230, [{ cx: 90, cy: 118, rx: 48, ry: 64, eye: 'blue' }]));
assert.equal(blue.ok && blue.traits.eyes, 'blue');
const lined = detectFace(face(180, 230, [{ cx: 90, cy: 118, rx: 48, ry: 64, lines: true }]));
assert.equal(lined.ok, true);
assert.equal(lined.ok && lined.traits.lines !== 'none', true);

const palmOk = detectPalm(palm(false, true));
assert.equal(palmOk.ok, true);
assert.equal((detectPalm(frame(200, 280, () => [40, 120, 70])) as { code?: string }).code, 'no-palm');
assert.equal((detectPalm(palm(true, true)) as { code?: string }).code, 'palm-cropped');
assert.equal((detectPalm(palm(false, false)) as { code?: string }).code, 'palm-unclear');

assert.equal(qualityIssue(frame(80, 80, () => [12, 12, 12])), 'dark');
assert.equal(qualityIssue(frame(80, 80, () => [250, 250, 250])), 'bright');
assert.equal(qualityIssue(frame(80, 80, () => [140, 140, 140])), 'empty');
assert.equal(qualityIssue(frame(120, 120, (x) => {
  const v = 70 + (x / 120) * 90;
  return [v, v * 0.95, v * 0.9];
})), 'blurry');

assert.equal(fileIssues({ size: 100, mime: 'image/jpeg', name: 'a.jpg', bytes: jpeg() }), null);
assert.equal(fileIssues({ size: MAX_FILE_SIZE + 1, mime: 'image/jpeg', name: 'a.jpg', bytes: jpeg() }), 'too-large');
assert.equal(fileIssues({ size: 20, mime: 'image/gif', name: 'a.gif', bytes: Uint8Array.from([0x47, 0x49, 0x46, 0x38, 0x39, 0x61]) }), 'bad-type');
assert.equal(fileIssues({ size: 4, mime: 'image/jpeg', name: 'a.jpg', bytes: Uint8Array.from([0xff, 0xd8, 0xff]) }), 'damaged');
assert.equal(fileIssues({ size: 40, mime: 'image/svg+xml', name: 'a.svg', bytes: new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"/>') }), 'disallowed');

let analyzed = 0;
const spy: typeof interpret = (kind, traits) => { analyzed++; return interpret(kind, traits); };
const blocked = gateImage({
  size: 100, mime: 'image/jpeg', name: 'a.jpg', bytes: jpeg(), kind: 'face',
  frame: frame(520, 640, (x, y) => {
    const n = ((x * 17 + y * 13) % 29) - 14;
    return [210 + n, 160 + n, 130 + n];
  }),
}, spy);
assert.equal(blocked.ok, false);
assert.equal(blocked.code, 'disallowed');
assert.equal(analyzed, 0);

const passed = gateImage({ size: 100, mime: 'image/jpeg', name: 'a.jpg', bytes: jpeg(), kind: 'face', frame: photo }, spy);
assert.equal(passed.ok, true);
assert.equal(analyzed, 1);
assert.ok(passed.ok && passed.reading.items.length >= 4);
assert.match(passed.ok ? passed.reading.items[0].text.he : '', /./);

const noFace = gateImage({
  size: 100, mime: 'image/jpeg', name: 'a.jpg', bytes: jpeg(), kind: 'face',
  frame: frame(520, 640, (x, y) => (x < 8 || y < 8 ? [20, 20, 20] : [170, 190, 150])),
}, spy);
assert.equal(noFace.code, 'no-face');
assert.equal(analyzed, 1);

assert.equal(captureChoices({ native: true, mediaDevices: false, videoInputs: 0, mobile: true }).camera, true);
assert.equal(captureChoices({ native: true, mediaDevices: false, videoInputs: 0, mobile: true }).gallery, true);
assert.equal(captureChoices({ native: false, mediaDevices: true, videoInputs: 0, mobile: false }).camera, false);
assert.equal(captureChoices({ native: false, mediaDevices: true, videoInputs: 0, mobile: false }).unavailableNote, true);
assert.equal(captureChoices({ native: false, mediaDevices: true, videoInputs: 0, mobile: false }).file, true);
assert.equal(captureChoices({ native: false, mediaDevices: true, videoInputs: 1, mobile: false }).camera, true);
assert.equal(captureChoices({ native: false, mediaDevices: false, videoInputs: null, mobile: true }).camera, false);

assert.equal(TEMPERAMENTS.length, 4);
assert.deepEqual(TEMPERAMENTS.map((t) => t.id), ['fire', 'air', 'water', 'earth']);

console.log('zohar image OK');
