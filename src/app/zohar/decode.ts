import { FACE_PROFILE, PALM_PROFILE, type Frame, type ReadingKind } from '../../analysis/zohar';

/** הקטנה לפני הקריאה. לכף יד שומרים יותר פרטים, כדי שקווים לא יימרחו. */
export async function frameFromBlob(blob: Blob, kind: ReadingKind): Promise<{ frame: Frame; url: string }> {
  const bitmap = await createImageBitmap(blob);
  const profile = kind === 'palm' ? PALM_PROFILE : FACE_PROFILE;
  const scale = Math.min(1, profile.maxEdge / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) {
    bitmap.close();
    throw new Error('canvas');
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const image = ctx.getImageData(0, 0, width, height);
  const preview = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', profile.quality));
  const url = URL.createObjectURL(preview ?? blob);
  return { frame: { width, height, data: image.data }, url };
}
