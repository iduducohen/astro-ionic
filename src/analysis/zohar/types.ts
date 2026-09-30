export type ReadingKind = 'face' | 'palm';
export type HandSide = 'right' | 'left';

export type IssueCode =
  | 'too-large'
  | 'bad-type'
  | 'damaged'
  | 'too-small-dims'
  | 'too-large-dims'
  | 'bad-aspect'
  | 'empty'
  | 'dark'
  | 'bright'
  | 'blurry'
  | 'no-face'
  | 'many-faces'
  | 'face-small'
  | 'face-cropped'
  | 'face-unclear'
  | 'no-palm'
  | 'palm-cropped'
  | 'palm-unclear'
  | 'disallowed'
  | 'quota'
  | 'cancelled'
  | 'camera-denied'
  | 'camera-missing';

export interface Frame {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface CheckLine {
  id: string;
  ok: boolean;
  he: string;
  en: string;
}

export interface FaceTraits {
  shape: 'round' | 'oval' | 'square' | 'triangle';
  forehead: 'high' | 'medium' | 'narrow';
  lines: 'none' | 'straight' | 'broken';
  eyes: 'brown' | 'blue' | 'green' | 'amber';
}

export interface PalmTraits {
  hand: 'square-short' | 'square-long' | 'long-short' | 'long-long';
  heart: 'curved' | 'straight' | 'long' | 'short';
  head: 'straight' | 'sloping' | 'short' | 'forked';
  life: 'wide' | 'close' | 'broken';
}

export interface SubjectOk<T> {
  ok: true;
  traits: T;
}

export interface SubjectFail {
  ok: false;
  code: IssueCode;
}

export type SubjectResult<T> = SubjectOk<T> | SubjectFail;
