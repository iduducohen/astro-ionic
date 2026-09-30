import { ALLOWED_EXT, ALLOWED_MIME, MAX_FILE_SIZE } from './limits';
import type { IssueCode } from './types';

const JPEG = [0xff, 0xd8, 0xff];
const PNG = [0x89, 0x50, 0x4e, 0x47];

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
  const n = Math.min(bytes.length, 80);
  let s = '';
  for (let i = 0; i < n; i++) s += String.fromCharCode(bytes[i]);
  return s.trim().toLowerCase();
}

function extOf(name: string): string {
  const i = name.lastIndexOf('.');
  return i >= 0 ? name.slice(i + 1).toLowerCase() : '';
}

function kindOf(bytes: Uint8Array): 'jpeg' | 'png' | 'webp' | null {
  if (starts(bytes, JPEG)) return 'jpeg';
  if (starts(bytes, PNG)) return 'png';
  if (isWebp(bytes)) return 'webp';
  return null;
}

/** בדיקת קובץ לפני פענוח: סוג, סיומת, חתימה, גודל, ותוכן פעיל. */
export function fileIssues(input: { size: number; mime: string; name: string; bytes: Uint8Array }): IssueCode | null {
  const text = headText(input.bytes);
  if (text.startsWith('<svg') || text.startsWith('<?xml') || text.startsWith('<!doctype') || text.startsWith('<html') || text.startsWith('<script')) {
    return 'disallowed';
  }
  if (input.size > MAX_FILE_SIZE) return 'too-large';
  const ext = extOf(input.name);
  if (ext && !ALLOWED_EXT.includes(ext as (typeof ALLOWED_EXT)[number])) return 'bad-type';
  const mime = input.mime.toLowerCase().split(';')[0].trim();
  if (mime && !ALLOWED_MIME.includes(mime as (typeof ALLOWED_MIME)[number]) && mime !== 'image/jpg') return 'bad-type';
  const kind = kindOf(input.bytes);
  if (!kind) return input.bytes.length < 16 ? 'damaged' : 'bad-type';
  if (kind === 'jpeg' && mime && mime !== 'image/jpeg' && mime !== 'image/jpg') return 'bad-type';
  if (kind === 'png' && mime && mime !== 'image/png') return 'bad-type';
  if (kind === 'webp' && mime && mime !== 'image/webp') return 'bad-type';
  if (kind === 'jpeg' && input.bytes.length < 64) return 'damaged';
  if (kind === 'png' && input.bytes.length < 32) return 'damaged';
  if (kind === 'webp' && input.bytes.length < 32) return 'damaged';
  return null;
}
