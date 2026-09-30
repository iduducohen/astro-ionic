import { Injectable, inject, signal } from '@angular/core';
import { HumanDesignCalculationService } from './calculation.service';
import { HdStorageService } from './hd-storage.service';
import type { BirthData, HdChartView, UserProfile } from './models';

const BIRTH_KEY = 'hd.birth';
const PROFILE_KEY = 'hd.profile';

@Injectable({ providedIn: 'root' })
export class UserStateService {
  private readonly storage = inject(HdStorageService);
  readonly profile = signal<UserProfile>({ name: '' });

  async restore(): Promise<void> {
    const saved = await this.storage.get<UserProfile>(PROFILE_KEY);
    if (saved?.name) this.profile.set({ name: saved.name });
  }

  async setName(name: string): Promise<void> {
    const profile = { name: name.trim() };
    this.profile.set(profile);
    await this.storage.set(PROFILE_KEY, profile);
  }
}

@Injectable({ providedIn: 'root' })
export class ChartStateService {
  private readonly storage = inject(HdStorageService);
  private readonly calc = inject(HumanDesignCalculationService);
  readonly birth = signal<BirthData | null>(null);
  readonly chart = signal<HdChartView | null>(null);
  readonly ready = signal(false);

  async restore(): Promise<void> {
    const birth = await this.storage.get<BirthData>(BIRTH_KEY);
    if (birth?.date) {
      this.birth.set(birth);
      this.chart.set(this.calc.calculate(birth));
    }
    this.ready.set(true);
  }

  async save(birth: BirthData): Promise<HdChartView> {
    const chart = this.calc.calculate(birth);
    this.birth.set(birth);
    this.chart.set(chart);
    await this.storage.set(BIRTH_KEY, birth);
    return chart;
  }

  async clear(): Promise<void> {
    this.birth.set(null);
    this.chart.set(null);
    await this.storage.remove(BIRTH_KEY);
  }
}

/** יושלם עם מנוע השאלונים. כרגע שומר רק אילו שאלונים נשמרו במכשיר. */
@Injectable({ providedIn: 'root' })
export class QuestionnaireStateService {
  readonly savedIds = signal<string[]>([]);
}
