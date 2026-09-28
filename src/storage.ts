import { Preferences } from '@capacitor/preferences';

/** אחסון מקומי: Preferences בנייטיב, localStorage בדפדפן (Capacitor מטפל בזה). */
export async function loadJSON<T>(key: string): Promise<T | null> {
  try {
    const { value } = await Preferences.get({ key });
    return value ? (JSON.parse(value) as T) : null;
  } catch {
    return null;
  }
}

export async function saveJSON(key: string, value: unknown): Promise<void> {
  try {
    await Preferences.set({ key, value: JSON.stringify(value) });
  } catch {
    /* לא קריטי */
  }
}
