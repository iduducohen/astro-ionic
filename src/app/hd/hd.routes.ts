import { Routes } from '@angular/router';

export const HD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./hd-shell.page').then((m) => m.HdShellPage),
    children: [
      { path: '', loadComponent: () => import('./hd-home.page').then((m) => m.HdHomePage) },
      { path: 'birth', loadComponent: () => import('./hd-birth.page').then((m) => m.HdBirthPage) },
      { path: 'chart', loadComponent: () => import('./hd-chart.page').then((m) => m.HdChartPage) },
      { path: 'type', data: { topic: 'type' }, loadComponent: () => import('./hd-topic.page').then((m) => m.HdTopicPage) },
      { path: 'strategy', data: { topic: 'strategy' }, loadComponent: () => import('./hd-topic.page').then((m) => m.HdTopicPage) },
      { path: 'authority', data: { topic: 'authority' }, loadComponent: () => import('./hd-topic.page').then((m) => m.HdTopicPage) },
      { path: 'profile', data: { topic: 'profile' }, loadComponent: () => import('./hd-topic.page').then((m) => m.HdTopicPage) },
      { path: 'settings', loadComponent: () => import('./hd-settings.page').then((m) => m.HdSettingsPage) },
    ],
  },
];
