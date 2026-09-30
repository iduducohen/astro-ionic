import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LangService } from '../lang.service';
import type { HdChartView } from './models';

/** תצוגה בלבד. הנתונים מגיעים מבחוץ, והתרשים המלא יכול להחליף את האזור הריק. */
@Component({
  selector: 'app-hd-chart',
  imports: [RouterLink],
  templateUrl: './hd-chart.component.html',
})
export class HumanDesignChartComponent {
  readonly chart = input.required<HdChartView>();
  readonly lang = inject(LangService);

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  text(value: { he: string; en: string }): string {
    return value[this.lang.lang()];
  }
}
