import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton } from '@ionic/angular';
import { LangService } from '../lang.service';
import { ChartStateService, UserStateService } from './hd-state.service';

@Component({
  selector: 'app-hd-settings',
  imports: [IonButton],
  templateUrl: './hd-settings.page.html',
})
export class HdSettingsPage {
  readonly lang = inject(LangService);
  readonly users = inject(UserStateService);
  readonly charts = inject(ChartStateService);
  private readonly router = inject(Router);
  name = '';
  saved = false;
  private dirty = false;

  constructor() {
    effect(() => {
      const saved = this.users.profile().name;
      if (!this.dirty) this.name = saved;
    });
  }

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  setName(event: Event): void {
    this.dirty = true;
    this.name = (event.target as HTMLInputElement).value;
    this.saved = false;
  }

  async saveName(): Promise<void> {
    await this.users.setName(this.name);
    this.saved = true;
  }

  async clearChart(): Promise<void> {
    await this.charts.clear();
    await this.router.navigate(['/hd']);
  }
}
