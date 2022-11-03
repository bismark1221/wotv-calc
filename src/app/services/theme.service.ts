import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs';

import { themes } from '../entities/theme';

@Injectable()
export class ThemeService {
  active = null;

  private activeDataSubject = new BehaviorSubject<boolean>(this.active);
  $active = this.activeDataSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  initTheme() {
    let theme = 'light';
    if (this.localStorageService.get('theme')) {
      theme = this.localStorageService.get('theme');
    }
    this.setActiveTheme(theme);

    return theme;
  }

  toogleTheme() {
    let theme = 'light';
    if (this.active === 'light') {
      theme = 'dark';
    }
    this.setActiveTheme(theme);

    return theme;
  }

  setActiveTheme(theme) {
    this.active = theme;
    this.activeDataSubject.next(this.active);
    this.localStorageService.set('theme', theme);

    if (isPlatformBrowser(this.platformId)) {
      Object.keys(themes[theme].properties).forEach(property => {
        document.documentElement.style.setProperty(
          property,
          themes[theme].properties[property]
        );
      });
    }

    this.active = theme;
  }

  getTheme() {
    return this.active;
  }
}
