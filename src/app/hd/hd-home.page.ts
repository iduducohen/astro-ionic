import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular';
import { LangService } from '../lang.service';
import { IntroComponent } from '../shell/intro.component';
import { ChartStateService, UserStateService } from './hd-state.service';

@Component({
  selector: 'app-hd-home',
  imports: [RouterLink, IonButton, IntroComponent],
  templateUrl: './hd-home.page.html',
})
export class HdHomePage {
  readonly lang = inject(LangService);
  readonly charts = inject(ChartStateService);
  readonly users = inject(UserStateService);

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }

  text(value: { he: string; en: string }): string {
    return value[this.lang.lang()];
  }
}
