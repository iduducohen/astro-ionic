import { Component, ElementRef, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { filter } from 'rxjs';
import type { Strings } from '../../core';
import { LangService } from '../lang.service';

type LabelKey = 'tabMe' | 'tabCharts' | 'tabPair' | 'tabTarot' | 'tabKabbalah' | 'tabPsychology' | 'tabZohar' | 'tabGraphology' | 'tabHD';

interface NavItem {
  path: string;
  exact: boolean;
  key: LabelKey;
  icon: string;
}

const NAV: NavItem[] = [
  { path: '/me', exact: true, key: 'tabMe', icon: 'star-outline' },
  { path: '/charts', exact: false, key: 'tabCharts', icon: 'planet-outline' },
  { path: '/pair', exact: true, key: 'tabPair', icon: 'heart-outline' },
  { path: '/tarot', exact: true, key: 'tabTarot', icon: 'sparkles-outline' },
  { path: '/kabbalah', exact: true, key: 'tabKabbalah', icon: 'git-network-outline' },
  { path: '/psychology', exact: true, key: 'tabPsychology', icon: 'bulb-outline' },
  { path: '/zohar', exact: true, key: 'tabZohar', icon: 'sunny-outline' },
  { path: '/graphology', exact: true, key: 'tabGraphology', icon: 'pencil-outline' },
  { path: '/hd', exact: true, key: 'tabHD', icon: 'infinite-outline' },
];

@Component({
  selector: 'app-desk-nav',
  imports: [RouterLink, RouterLinkActive, IonIcon],
  template: `
    <nav class="desk-nav" [attr.aria-label]="lang.lang() === 'he' ? 'כלים' : 'Tools'">
      @for (item of items; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: item.exact }" [queryParams]="query()">
          <ion-icon [name]="item.icon" aria-hidden="true"></ion-icon>
          <span>{{ label(item) }}</span>
        </a>
      }
    </nav>
  `,
})
export class DeskNavComponent {
  readonly lang = inject(LangService);
  readonly items = NAV;

  query(): { lang: string } | null {
    return this.lang.lang() === 'en' ? { lang: 'en' } : null;
  }

  label(item: NavItem): string {
    return this.lang.text()[item.key];
  }
}

@Component({
  selector: 'app-mob-dock',
  imports: [RouterLink, RouterLinkActive, IonIcon],
  template: `
    <nav class="mob-tabs" [attr.aria-label]="lang.lang() === 'he' ? 'כלים' : 'Tools'">
      @for (item of items; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: item.exact }" [queryParams]="query()">
          <ion-icon [name]="item.icon" aria-hidden="true"></ion-icon>
          <span>{{ label(item) }}</span>
        </a>
      }
    </nav>
  `,
})
export class MobDockComponent {
  readonly lang = inject(LangService);
  readonly items = NAV;
  private readonly router = inject(Router);
  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      queueMicrotask(() => {
        this.host.nativeElement.querySelector('a.on')?.scrollIntoView({ inline: 'center', block: 'nearest' });
      });
    });
  }

  query(): { lang: string } | null {
    return this.lang.lang() === 'en' ? { lang: 'en' } : null;
  }

  label(item: NavItem): string {
    const text: Strings = this.lang.text();
    return text[item.key];
  }
}
