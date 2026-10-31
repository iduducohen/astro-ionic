import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { LangService } from '../lang.service';
import { DeskNavComponent } from './site-nav.component';

function motifOf(url: string): string {
  if (url.includes('/tarot')) return 'tarot';
  if (url.includes('/charts')) return 'charts';
  if (url.includes('/pair')) return 'pair';
  if (url.includes('/kabbalah')) return 'tree';
  if (url.includes('/psychology')) return 'psy';
  if (url.includes('/zohar')) return 'zohar';
  if (url.includes('/graphology')) return 'ink';
  if (url.includes('/hd')) return 'hd';
  if (url.includes('/more')) return 'more';
  return 'me';
}

@Component({
  selector: 'app-screen',
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonBackButton, DeskNavComponent, RouterLink],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          @if (back()) {
            <ion-back-button [defaultHref]="back()!" [text]="lang.lang() === 'he' ? 'חזרה' : 'Back'"></ion-back-button>
          }
          <a class="brand" routerLink="/me" [queryParams]="lang.lang() === 'en' ? { lang: 'en' } : null">
            <img src="logo.svg" width="32" height="32" alt="" />
            <span class="brand-name">{{ lang.lang() === 'he' ? 'מה כתוב בכוכבים' : 'What the stars say' }}</span>
          </a>
        </ion-buttons>
        <ion-title>{{ title() }}</ion-title>
        <ion-buttons slot="end">
          <ion-button class="lang-btn" (click)="lang.toggle()" [attr.aria-label]="lang.lang() === 'he' ? 'Switch to English' : 'החלפה לעברית'">
            {{ lang.lang() === 'he' ? 'EN' : 'עב' }}
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <app-desk-nav></app-desk-nav>
    </ion-header>
    <ion-content>
      <div class="night-veil" [attr.data-motif]="motif" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
      <div class="wrap">
        <ng-content></ng-content>
      </div>
    </ion-content>
  `,
})
export class ScreenComponent {
  readonly title = input('');
  readonly back = input<string | null>(null);
  readonly lang = inject(LangService);
  /** תנועת הרקע של המסך הנוכחי */
  readonly motif = motifOf(inject(Router).url);
}


