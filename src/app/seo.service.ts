import { Injectable, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { applyDocumentSeo, pageForPath } from '../core/seo';
import { LangService } from './lang.service';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly router = inject(Router);
  private readonly lang = inject(LangService);

  constructor() {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => this.apply());
    effect(() => {
      this.lang.lang();
      this.apply();
    });
  }

  private apply(): void {
    const path = this.router.url.split('?')[0] || '/';
    applyDocumentSeo(pageForPath(path), this.lang.lang());
  }
}
