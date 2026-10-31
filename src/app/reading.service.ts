import { Injectable } from '@angular/core';
import type { ReadingFacts } from '../core/reading-facts';

export interface ReadingSection {
  title: string;
  lines: string[];
}

@Injectable({ providedIn: 'root' })
export class ReadingService {
  async weave(facts: ReadingFacts): Promise<ReadingSection[]> {
    let response: Response;
    try {
      response = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(facts),
      });
    } catch {
      throw new Error('offline');
    }
    const data = await response.json().catch(() => ({})) as { sections?: ReadingSection[]; error?: string };
    if (!response.ok || !Array.isArray(data.sections) || !data.sections.length) {
      throw new Error(data.error || 'claude-failed');
    }
    return data.sections;
  }
}
