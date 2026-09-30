import { ChangeDetectorRef, Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonIcon } from '@ionic/angular';
import { TOOL_INFO } from '../../core/tool-info';
import { LangService } from '../lang.service';
import { IntroComponent } from '../shell/intro.component';
import { ScreenComponent } from '../shell/screen.component';

export const TOOLS = ['natal', 'karmic', 'forecast', 'synastry', 'horary', 'election', 'mundane'] as const;
export type Tool = (typeof TOOLS)[number];

const ICONS: Record<Tool, string> = {
  natal: 'sunny-outline', karmic: 'infinite-outline', forecast: 'time-outline', synastry: 'people-outline',
  horary: 'help-circle-outline', election: 'calendar-outline', mundane: 'globe-outline',
};

@Component({
  selector: 'app-charts',
  imports: [ScreenComponent, IntroComponent, RouterLink, IonIcon],
  template: `
    <app-screen [title]="lang.text().tabCharts">
      <app-intro page="charts" [heading]="lang.lang() === 'he' ? 'מפות אסטרולוגיות' : 'Astrology charts'"></app-intro>
      <div class="tool-list" role="list">
        @for (k of tools; track k) {
          <div class="tool-row" role="listitem">
            <a class="tool-go" [routerLink]="'/charts/' + k" [queryParams]="query()">
              <span class="tool-icon" aria-hidden="true"><ion-icon [name]="icon(k)"></ion-icon></span>
              <span class="tool-copy">
                <span class="tool-name">{{ lang.text().tools[k] }}</span>
                <span class="tool-desc">{{ lang.text().toolDesc[k] }}</span>
              </span>
              <span class="tool-chev" aria-hidden="true">‹</span>
            </a>
            <button type="button" class="tool-info" (click)="openInfo(k)">
              {{ lang.lang() === 'he' ? 'מידע נוסף' : 'More info' }}
            </button>
          </div>
        }
      </div>

      <dialog class="map-dialog" #dlg (close)="info = null" (click)="backdrop($event)">
        @if (info; as id) {
          <div class="map-dialog-bar">
            <h2>{{ lang.text().tools[id] }}</h2>
            <button type="button" class="map-close" (click)="closeInfo()" [attr.aria-label]="lang.lang() === 'he' ? 'סגירה' : 'Close'">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
            </button>
          </div>
          <div class="map-info">
            <p>{{ more(id).what[lang.lang()] }}</p>
            <section>
              <h3>{{ lang.lang() === 'he' ? 'מתאים כש' : 'Good when' }}</h3>
              <p>{{ more(id).fits[lang.lang()] }}</p>
            </section>
            <section>
              <h3>{{ lang.lang() === 'he' ? 'מה צריך' : 'What you need' }}</h3>
              <ul>
                @for (item of more(id).needs; track item.en) { <li>{{ item[lang.lang()] }}</li> }
              </ul>
            </section>
            <section>
              <h3>{{ lang.lang() === 'he' ? 'מה מקבלים' : 'What you get' }}</h3>
              <ul>
                @for (item of more(id).get; track item.en) { <li>{{ item[lang.lang()] }}</li> }
              </ul>
            </section>
            <section>
              <h3>{{ lang.lang() === 'he' ? 'איך קוראים את זה' : 'How to read it' }}</h3>
              <p>{{ more(id).read[lang.lang()] }}</p>
            </section>
            <p class="tip">{{ more(id).tip[lang.lang()] }}</p>
            @for (part of more(id).deep; track part.title.en) {
              <section>
                <h3>{{ part.title[lang.lang()] }}</h3>
                <p>{{ part.text[lang.lang()] }}</p>
              </section>
            }
            <a class="map-open" [routerLink]="'/charts/' + id" [queryParams]="query()" (click)="closeInfo()">
              {{ lang.lang() === 'he' ? 'פתיחת המפה' : 'Open this chart' }}
            </a>
          </div>
        }
      </dialog>
    </app-screen>
  `,
})
export class ChartsPage {
  readonly lang = inject(LangService);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly dlg = viewChild<ElementRef<HTMLDialogElement>>('dlg');
  readonly tools = TOOLS;
  info: Tool | null = null;

  icon(tool: string): string { return ICONS[tool as Tool]; }
  more(tool: Tool) { return TOOL_INFO[tool]; }

  openInfo(tool: Tool): void {
    this.info = tool;
    this.cd.detectChanges();
    this.dlg()?.nativeElement.showModal();
  }

  closeInfo(): void {
    this.dlg()?.nativeElement.close();
  }

  backdrop(event: MouseEvent): void {
    if (event.target === this.dlg()?.nativeElement) this.closeInfo();
  }

  query(): { lang: string } | null {
    return this.lang.lang() === 'en' ? { lang: 'en' } : null;
  }
}
