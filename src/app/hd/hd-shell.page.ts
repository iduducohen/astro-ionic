import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LangService } from '../lang.service';
import { ScreenComponent } from '../shell/screen.component';
import { ChartStateService, UserStateService } from './hd-state.service';

interface HdLink {
  path: string;
  exact: boolean;
  he: string;
  en: string;
}

const LINKS: HdLink[] = [
  { path: '/hd', exact: true, he: 'בית', en: 'Home' },
  { path: '/hd/birth', exact: false, he: 'פרטי לידה', en: 'Birth details' },
  { path: '/hd/chart', exact: false, he: 'המפה', en: 'Chart' },
  { path: '/hd/type', exact: false, he: 'סוג', en: 'Type' },
  { path: '/hd/strategy', exact: false, he: 'אסטרטגיה', en: 'Strategy' },
  { path: '/hd/authority', exact: false, he: 'סמכות', en: 'Authority' },
  { path: '/hd/profile', exact: false, he: 'פרופיל', en: 'Profile' },
  { path: '/hd/settings', exact: false, he: 'הגדרות', en: 'Settings' },
];

@Component({
  selector: 'app-hd-shell',
  imports: [ScreenComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './hd-shell.page.html',
})
export class HdShellPage implements OnInit {
  readonly lang = inject(LangService);
  readonly links = LINKS;
  private readonly charts = inject(ChartStateService);
  private readonly users = inject(UserStateService);

  ngOnInit(): void {
    if (!this.charts.ready()) void this.charts.restore();
    void this.users.restore();
  }

  t(he: string, en: string): string {
    return this.lang.lang() === 'he' ? he : en;
  }
}
