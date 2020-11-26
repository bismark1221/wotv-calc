import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { BehaviorSubject } from 'rxjs';

import { themes } from '../entities/theme';

@Injectable()
export class ThemeService {
  active = null;

  private activeDataSubject = new BehaviorSubject<boolean>(this.active);
  $active = this.activeDataSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService
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

    Object.keys(themes[theme].properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        themes[theme].properties[property]
      );
    });

    this.active = theme;
  }

  getTheme() {
    return this.active;
  }
}
