import { Component, effect, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular';
import { LangService } from '../lang.service';
import { WhenFieldComponent } from '../shell/when-field.component';
import { birthIssue } from './map-chart';
import { ChartStateService } from './hd-state.service';

@Component({
  selector: 'app-hd-birth',
  imports: [WhenFieldComponent, IonButton, RouterLink],
  templateUrl: './hd-birth.page.html',
})
export class HdBirthPage {
  readonly lang = inject(LangService);
  private readonly charts = inject(ChartStateService);
  private readonly router = inject(Router);
  birth = '';
  time = '12:00';
  timeUnknown = false;
  error = '';
  private filled = false;

  constructor() {
    effect(() => {
      const saved = this.charts.birth();
      if (!saved || this.filled) return;
      this.birth = saved.date;
      this.time = saved.time || '12:00';
      this.timeUnknown = saved.timeUnknown;
      this.filled = true;
    });
  }

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  setUnknown(event: Event): void {
    this.timeUnknown = (event.target as HTMLInputElement).checked;
    this.error = '';
  }

  async submit(event: Event): Promise<void> {
    event.preventDefault();
    const issue = birthIssue({ date: this.birth, time: this.time, timeUnknown: this.timeUnknown });
    if (issue === 'date') {
      this.error = this.t('צריך תאריך לידה תקין.', 'Enter a valid birth date.');
      return;
    }
    if (issue === 'time') {
      this.error = this.t('צריך שעת לידה תקינה, או לסמן שהשעה לא ידועה.', 'Enter a valid birth time, or mark the time as unknown.');
      return;
    }
    await this.charts.save({
      date: this.birth,
      time: this.timeUnknown ? '12:00' : this.time,
      timeUnknown: this.timeUnknown,
      place: '',
    });
    this.error = '';
    await this.router.navigate(['/hd/chart']);
  }
}
