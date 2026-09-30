import { Injectable, computed, effect, signal } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { STRINGS, detectLang, dirOf, mirrorLang, urlLang, type Lang, type Strings } from '../core';

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>(detectLang());
  readonly text = computed(() => STRINGS[this.lang()]);

  constructor() {
    effect(() => {
      const lang = this.lang();
      document.documentElement.lang = lang;
      document.documentElement.dir = dirOf(lang);
      document.dir = dirOf(lang);
    });
    if (!urlLang()) {
      Preferences.get({ key: 'astro:lang' }).then(({ value }) => {
        if (value === 'he' || value === 'en') {
          mirrorLang(value);
          this.lang.set(value);
        }
      }).catch(() => undefined);
    }
  }

  get S(): Strings {
    return this.text();
  }

  toggle(): void {
    const next: Lang = this.lang() === 'he' ? 'en' : 'he';
    mirrorLang(next);
    Preferences.set({ key: 'astro:lang', value: next }).catch(() => undefined);
    if (urlLang()) {
      const u = new URL(window.location.href);
      u.searchParams.set('lang', next);
      history.replaceState(null, '', `${u.pathname}${u.search}${u.hash}`);
    }
    this.lang.set(next);
  }
}
