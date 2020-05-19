import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { themes } from "../entities/theme";

@Injectable()
export class ThemeService {
  private active = null;

  constructor(
    private localStorageService: LocalStorageService
  ) {}

  initTheme() {
    let theme = "light"
    if (this.localStorageService.get("theme")) {
      theme = this.localStorageService.get("theme")
    }
    this.setActiveTheme(theme)

    return theme
  }

  toogleTheme() {
    let theme = "light"
    if (this.active === "light") {
      theme = "dark"
    }
    this.setActiveTheme(theme)

    return theme
  }

  setActiveTheme(theme) {
    console.log(theme)
    this.active = theme;
    this.localStorageService.set("theme", theme);

    Object.keys(themes[theme].properties).forEach(property => {
      document.documentElement.style.setProperty(
        property,
        themes[theme].properties[property]
      );
    });
  }
}
