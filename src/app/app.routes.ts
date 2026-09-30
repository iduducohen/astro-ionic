import { Routes } from '@angular/router';
import { TabsPage } from './shell/tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: 'me', loadComponent: () => import('./pages/profile.page').then((m) => m.ProfilePage) },
      { path: 'charts', loadComponent: () => import('./pages/charts.page').then((m) => m.ChartsPage) },
      { path: 'charts/:tool', loadComponent: () => import('./pages/tool.page').then((m) => m.ToolPage) },
      { path: 'pair', loadComponent: () => import('./pages/compat.page').then((m) => m.CompatPage) },
      { path: 'tarot', loadComponent: () => import('./pages/tarot.page').then((m) => m.TarotPage) },
      { path: 'kabbalah', loadComponent: () => import('./pages/kabbalah.page').then((m) => m.KabbalahPage) },
      { path: 'psychology', loadComponent: () => import('./pages/psychology.page').then((m) => m.PsychologyPage) },
      { path: 'zohar', loadComponent: () => import('./pages/zohar.page').then((m) => m.ZoharPage) },
      { path: 'graphology', loadComponent: () => import('./pages/graphology.page').then((m) => m.GraphologyPage) },
      // עיצוב אנושי: מעטפת פנימית, בלי להחליף את ניווט האתר
      { path: 'hd', loadChildren: () => import('./hd/hd.routes').then((m) => m.HD_ROUTES) },
      { path: 'more', loadComponent: () => import('./pages/more.page').then((m) => m.MorePage) },
      { path: '', redirectTo: 'me', pathMatch: 'full' },
    ],
  },
];
