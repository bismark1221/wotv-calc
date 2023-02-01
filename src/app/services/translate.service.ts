import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class TranslateService {
  availableLangs = [];
  currentLang = 'en';
  defaultLang = 'en';

  onLangChange = new EventEmitter<string>();

  constructor(
    private localStorageService: LocalStorageService
  ) {
    this.currentLang = this.localStorageService.get('lang') ? this.localStorageService.get('lang') : this.defaultLang;
    this.localStorageService.set('lang', this.currentLang);
  }

  addLangs(langs) {
    this.availableLangs = langs;
  }

  getLangs() {
    return this.availableLangs;
  }

  getDefaultLang() {
    return this.defaultLang;
  }

  use(lang) {
    this.currentLang = this.availableLangs.indexOf(lang) === -1 ? this.defaultLang : lang;
    this.localStorageService.set('lang', this.currentLang);
    this.onLangChange.emit(this.currentLang);
  }
}
