import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular';
import { LangService } from '../lang.service';
import { ChartStateService } from './hd-state.service';
import type { HdTopic } from './models';

@Component({
  selector: 'app-hd-topic',
  imports: [RouterLink, IonButton],
  templateUrl: './hd-topic.page.html',
})
export class HdTopicPage {
  readonly topic = input<HdTopic>('type');
  readonly lang = inject(LangService);
  readonly charts = inject(ChartStateService);

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  text(value: { he: string; en: string } | undefined): string {
    if (!value) return '';
    return value[this.lang.lang()];
  }

  title(): string {
    const topic = this.topic();
    if (topic === 'strategy') return this.t('האסטרטגיה שלך', 'Your strategy');
    if (topic === 'authority') return this.t('סמכות קבלת ההחלטות', 'Decision authority');
    if (topic === 'profile') return this.t('הפרופיל שלך', 'Your profile');
    return this.t('סוג האנרגיה שלך', 'Your energy type');
  }
}
