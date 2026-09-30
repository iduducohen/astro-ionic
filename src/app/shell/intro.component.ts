import { Component, inject, input } from '@angular/core';
import { PAGE_INFO, type PageKey } from '../../core/page-info';
import { LangService } from '../lang.service';

@Component({
  selector: 'app-intro',
  template: `
    <header class="pintro">
      <h1 class="page-title">{{ heading() }}</h1>
      <p class="page-intro">{{ info().summary[lang.lang()] }}</p>
      <ul class="pintro-facts">
        @for (fact of info().facts; track fact.en) {
          <li>{{ fact[lang.lang()] }}</li>
        }
      </ul>
      <button type="button" class="pintro-more" (click)="open = !open">
        {{ lang.lang() === 'he' ? 'קרא עוד על הנושא' : 'Read more about this' }}
      </button>
      @if (open) {
        <div class="info-body">
          @for (section of info().more; track section.title.en) {
            <section>
              <h3>{{ section.title[lang.lang()] }}</h3>
              <p>{{ section.text[lang.lang()] }}</p>
            </section>
          }
        </div>
      }
    </header>
  `,
})
export class IntroComponent {
  readonly page = input.required<PageKey>();
  readonly heading = input.required<string>();
  readonly lang = inject(LangService);
  open = false;

  info() {
    return PAGE_INFO[this.page()];
  }
}
