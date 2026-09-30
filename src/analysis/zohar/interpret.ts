import { FEATURES, readZohar, type ZoharReading } from '../../core/zohar';
import type { FaceTraits, PalmTraits, ReadingKind } from './types';

const FACE_KEYS = ['faceShape', 'forehead', 'lines', 'eyes'] as const;
const PALM_KEYS = ['hand', 'heart', 'head', 'life'] as const;

export interface ReadingItem {
  key: string;
  group: string;
  name: { he: string; en: string };
  seen: { he: string; en: string };
  text: { he: string; en: string };
}

export interface TraditionalReading {
  kind: ReadingKind;
  items: ReadingItem[];
  chart: ZoharReading;
}

const FACE_GROUP: Record<string, string> = {
  faceShape: 'structure',
  forehead: 'forehead',
  lines: 'forehead',
  eyes: 'eyes',
};

const PALM_GROUP: Record<string, string> = {
  hand: 'hand',
  heart: 'heart',
  head: 'head',
  life: 'life',
};

function choicesOf(kind: ReadingKind, traits: FaceTraits | PalmTraits): Record<string, string> {
  if (kind === 'face') {
    const t = traits as FaceTraits;
    return { faceShape: t.shape, forehead: t.forehead, lines: t.lines, eyes: t.eyes };
  }
  const t = traits as PalmTraits;
  return { hand: t.hand, heart: t.heart, head: t.head, life: t.life };
}

export function interpret(kind: ReadingKind, traits: FaceTraits | PalmTraits): TraditionalReading {
  const choices = choicesOf(kind, traits);
  const keys = kind === 'face' ? FACE_KEYS : PALM_KEYS;
  const groups = kind === 'face' ? FACE_GROUP : PALM_GROUP;
  const items: ReadingItem[] = [];
  for (const key of keys) {
    const feature = FEATURES.find((f) => f.key === key);
    const opt = feature?.options.find((o) => o.id === choices[key]);
    if (!feature || !opt) continue;
    items.push({
      key,
      group: groups[key],
      name: feature.name,
      seen: opt.label,
      text: opt.text,
    });
  }
  return { kind, items, chart: readZohar(choices, '', '') };
}
