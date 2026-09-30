import { Injectable } from '@angular/core';
import { loadJSON, removeJSON, saveJSON } from '../storage';

/** שמירה מקומית. אפשר להחליף אחר כך בשרת בלי לשנות את המסכים. */
@Injectable({ providedIn: 'root' })
export class HdStorageService {
  get<T>(key: string): Promise<T | null> {
    return loadJSON<T>(key);
  }

  set(key: string, value: unknown): Promise<void> {
    return saveJSON(key, value);
  }

  remove(key: string): Promise<void> {
    return removeJSON(key);
  }
}
