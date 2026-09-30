import { Preferences } from '@capacitor/preferences';

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
  } catch { /* לא קריטי */ }
}

export async function removeJSON(key: string): Promise<void> {
  try {
    await Preferences.remove({ key });
  } catch { /* לא קריטי */ }
}
