import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular';
import { LangService } from '../lang.service';
import { HumanDesignChartComponent } from './hd-chart.component';
import { ChartStateService } from './hd-state.service';

@Component({
  selector: 'app-hd-chart-page',
  imports: [HumanDesignChartComponent, RouterLink, IonButton],
  templateUrl: './hd-chart.page.html',
})
export class HdChartPage {
  readonly lang = inject(LangService);
  readonly charts = inject(ChartStateService);

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }
}
