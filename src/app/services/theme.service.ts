import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { themes } from '../entities/theme';

@Injectable()
export class ThemeService {
  active = null;

  private activeDataSubject = new BehaviorSubject<boolean>(this.active);
  $active = this.activeDataSubject.asObservable();

  constructor(
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  initTheme() {
    let theme = 'light';
    if (localStorage.getItem('wotv-calc.' + 'theme')) {
      theme = localStorage.getItem('wotv-calc.' + 'theme');
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
    localStorage.setItem('wotv-calc.' + 'theme', theme);

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
