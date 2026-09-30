import type { PixelFrame } from '../../analysis/handwriting-gate';

const MAX_EDGE = 1600;

function load(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('image'));
    img.src = url;
  });
}

/** פענוח מקומי. התמונה לניתוח מוקטנת, ובדיקת הרזולוציה נשארת על הגודל המקורי. */
export async function frameFromFile(file: File): Promise<{ frame: PixelFrame; width: number; height: number; url: string } | null> {
  const url = URL.createObjectURL(file);
  try {
    const img = await load(url);
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    if (!width || !height) {
      URL.revokeObjectURL(url);
      return null;
    }
    const scale = Math.min(1, MAX_EDGE / Math.max(width, height));
    const dw = Math.max(1, Math.round(width * scale));
    const dh = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = dw;
    canvas.height = dh;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) {
      URL.revokeObjectURL(url);
      return null;
    }
    ctx.drawImage(img, 0, 0, dw, dh);
    const data = ctx.getImageData(0, 0, dw, dh).data;
    return { frame: { width: dw, height: dh, data }, width, height, url };
  } catch {
    URL.revokeObjectURL(url);
    return null;
  }
}
