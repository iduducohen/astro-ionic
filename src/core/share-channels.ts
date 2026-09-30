/**
 * share-channels.ts — לאן שולחים את המפה, עם האייקון והצבע של כל רשת.
 * href נבנה מהטקסט ומהכתובת, כדי שהשיתוף ייפתח מוכן.
 */
import type { L } from './astro';

export interface SharePayload {
  text: string;
  url: string;
  short: string;
  title: string;
}

export interface ShareChannel {
  id: string;
  label: L;
  color: string;
  /** SVG מלא, currentColor */
  icon: string;
  href: (p: SharePayload) => string;
}

const enc = encodeURIComponent;

const svg = (path: string) =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>`;

export const SHARE_CHANNELS: ShareChannel[] = [
  {
    id: 'wa',
    label: { he: 'וואטסאפ', en: 'WhatsApp' },
    color: '#25D366',
    icon: svg('M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.4 17.5 2 12.04 2zm5.76 13.85c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.12.1-1.81-.11-.41-.13-.95-.31-1.63-.6-2.87-1.24-4.74-4.13-4.88-4.32-.14-.19-1.15-1.53-1.15-2.92s.73-2.07 1-2.35c.24-.28.64-.41 1.02-.41.12 0 .23 0 .33.01.3.01.44.03.64.49.24.58.82 2 .89 2.15.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.16-.29.37-.42.49-.14.14-.28.29-.12.56.16.28.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.6-.07.16-.19.7-.81.88-1.09.19-.28.37-.23.62-.14.26.09 1.62.76 1.9.9.28.14.46.21.53.33.07.12.07.68-.17 1.36z'),
    href: (p) => `https://wa.me/?text=${enc(p.text)}`,
  },
  {
    id: 'fb',
    label: { he: 'פייסבוק', en: 'Facebook' },
    color: '#1877F2',
    icon: svg('M14.5 8.5V6.2c0-.7.5-1.2 1.2-1.2H18V2h-2.6C12.6 2 11 3.7 11 6.4v2.1H8.5V12H11v10h3.5V12h2.7l.4-3.5h-3.1z'),
    href: (p) => `https://www.facebook.com/sharer/sharer.php?u=${enc(p.url)}&quote=${enc(p.short)}`,
  },
  {
    id: 'tg',
    label: { he: 'טלגרם', en: 'Telegram' },
    color: '#229ED9',
    icon: svg('M21.5 4.4 2.7 11.2c-1.2.5-1.2 1.1-.2 1.4l4.8 1.5 1.9 5.6c.2.6.1.9.8.9.4 0 .6-.2.9-.5l2.2-2.1 4.7 3.5c.8.5 1.4.2 1.6-.8l3.2-14.8c.3-1.3-.5-1.9-1.5-1.5zM8.8 13.9l8.6-5.4c.4-.2.8 0 .4.3l-7.2 6.5-.3 3.1-1.5-4.5z'),
    href: (p) => `https://t.me/share/url?url=${enc(p.url)}&text=${enc(p.short)}`,
  },
  {
    id: 'x',
    label: { he: 'X', en: 'X' },
    color: '#111111',
    icon: svg('M17.6 3h3l-6.6 7.5L22 21h-6.2l-4.8-6.3L5.5 21H2.4l7-8L2 3h6.3l4.4 5.8L17.6 3zm-1.1 16.2h1.7L7.7 4.7H5.9l10.6 14.5z'),
    href: (p) => `https://twitter.com/intent/tweet?text=${enc(p.short)}&url=${enc(p.url)}`,
  },
  {
    id: 'mail',
    label: { he: 'אימייל', en: 'Email' },
    color: '#8a5a12',
    icon: svg('M2 5h20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm10 7.2L3.2 6.5h17.6L12 12.2zM3 8.2V17h18V8.2l-8.2 5.3a1.4 1.4 0 0 1-1.6 0L3 8.2z'),
    href: (p) => `mailto:?subject=${enc(p.title)}&body=${enc(p.text)}`,
  },
];
