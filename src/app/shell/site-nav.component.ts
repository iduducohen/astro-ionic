import { Component, inject } from '@angular/core';
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

/** ארבעה כלים שנשארים גלויים בסרגל הצר. השאר נפתחים מ״עוד״. */
const DOCK_MAIN = ['/me', '/charts', '/pair', '/tarot'];

const DOCK_SHORT: Record<LabelKey, { he: string; en: string }> = {
  tabMe: { he: 'מפה', en: 'Chart' },
  tabCharts: { he: 'כוכבים', en: 'Sky' },
  tabPair: { he: 'זוג', en: 'Pair' },
  tabTarot: { he: 'טארוט', en: 'Tarot' },
  tabKabbalah: { he: 'קבלה', en: 'Kabbalah' },
  tabPsychology: { he: 'נפש', en: 'Mind' },
  tabZohar: { he: 'זוהר', en: 'Zohar' },
  tabGraphology: { he: 'כתב', en: 'Script' },
  tabHD: { he: 'עיצוב', en: 'Design' },
};

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
    @if (more) {
      <button type="button" class="mob-shade" (click)="more = false" [attr.aria-label]="lang.lang() === 'he' ? 'סגירה' : 'Close'"></button>
      <div class="mob-sheet" role="dialog" [attr.aria-label]="lang.lang() === 'he' ? 'עוד כלים' : 'More tools'">
        <p class="mob-sheet-title">{{ lang.lang() === 'he' ? 'עוד כלים' : 'More tools' }}</p>
        @for (item of extra; track item.path) {
          <a [routerLink]="item.path" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: item.exact }" [queryParams]="query()">
            <ion-icon [name]="item.icon" aria-hidden="true"></ion-icon>
            <span>{{ label(item) }}</span>
          </a>
        }
      </div>
    }
    <nav class="mob-tabs" [attr.aria-label]="lang.lang() === 'he' ? 'כלים' : 'Tools'">
      @for (item of main; track item.path) {
        <a [routerLink]="item.path" routerLinkActive="on" [routerLinkActiveOptions]="{ exact: item.exact }" [queryParams]="query()" (click)="more = false">
          <ion-icon [name]="item.icon" aria-hidden="true"></ion-icon>
          <span>{{ short(item) }}</span>
        </a>
      }
      <button type="button" class="mob-more" [class.on]="more || extraOn()" [attr.aria-expanded]="more" (click)="more = !more">
        <ion-icon name="grid-outline" aria-hidden="true"></ion-icon>
        <span>{{ lang.lang() === 'he' ? 'עוד' : 'More' }}</span>
      </button>
    </nav>
  `,
})
export class MobDockComponent {
  readonly lang = inject(LangService);
  readonly main = NAV.filter((item) => DOCK_MAIN.includes(item.path));
  readonly extra = NAV.filter((item) => !DOCK_MAIN.includes(item.path));
  more = false;
  private readonly router = inject(Router);

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.more = false;
    });
  }

  extraOn(): boolean {
    const path = this.router.url.split('?')[0];
    return this.extra.some((item) => path === item.path || path.startsWith(item.path + '/'));
  }

  short(item: NavItem): string {
    return DOCK_SHORT[item.key][this.lang.lang()];
  }

  query(): { lang: string } | null {
    return this.lang.lang() === 'en' ? { lang: 'en' } : null;
  }

  label(item: NavItem): string {
    const text: Strings = this.lang.text();
    return text[item.key];
  }
}
