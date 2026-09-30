import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { LangService } from '../lang.service';
import { ScreenComponent } from '../shell/screen.component';

@Component({
  selector: 'app-more',
  imports: [ScreenComponent, RouterLink, IonIcon],
  template: `
    <app-screen [title]="lang.text().appTitle">
      <h2 class="page-title">{{ lang.lang() === 'he' ? 'כלים נוספים' : 'More tools' }}</h2>
      <div class="tool-list">
        @for (tool of tools; track tool.href) {
          <a class="cg-card" [routerLink]="tool.href">
            <ion-icon [name]="tool.icon" aria-hidden="true"></ion-icon>
            <span>{{ tool.label() }}</span>
          </a>
        }
      </div>
    </app-screen>
  `,
})
export class MorePage {
  readonly lang = inject(LangService);
  readonly tools = [
    { href: '/psychology', icon: 'bulb-outline', label: () => this.lang.text().tabPsychology },
    { href: '/zohar', icon: 'hand-left-outline', label: () => this.lang.text().tabZohar },
    { href: '/graphology', icon: 'pencil-outline', label: () => this.lang.text().tabGraphology },
    { href: '/hd', icon: 'sparkles-outline', label: () => this.lang.text().tabHD },
  ];
}
