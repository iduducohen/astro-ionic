import { Component } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { MobDockComponent } from './site-nav.component';

@Component({
  selector: 'app-tabs',
  imports: [IonTabs, MobDockComponent],
  template: `
    <ion-tabs>
      <app-mob-dock slot="bottom"></app-mob-dock>
    </ion-tabs>
  `,
})
export class TabsPage {}
