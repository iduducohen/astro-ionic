import 'zone.js';
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, planetOutline, heartOutline, sparklesOutline, gitNetworkOutline, ellipsisVertical,
  sunnyOutline, infiniteOutline, timeOutline, peopleOutline, helpCircleOutline, calendarOutline, globeOutline,
  starOutline, pawOutline, calculatorOutline, textOutline, leafOutline, diamondOutline,
  bulbOutline, handLeftOutline, pencilOutline, shareOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  personCircleOutline, planetOutline, heartOutline, sparklesOutline, gitNetworkOutline, ellipsisVertical,
  sunnyOutline, infiniteOutline, timeOutline, peopleOutline, helpCircleOutline, calendarOutline, globeOutline,
  starOutline, pawOutline, calculatorOutline, textOutline, leafOutline, diamondOutline,
  bulbOutline, handLeftOutline, pencilOutline, shareOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'ios' }),
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
  ],
});
