import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class TranslateService {
  availableLangs = [];
  currentLang = 'en';
  defaultLang = 'en';

  onLangChange = new EventEmitter<string>();

  constructor() {
    this.currentLang = localStorage.getItem('wotv-calc.' + 'lang') ? localStorage.getItem('wotv-calc.' + 'lang') : this.defaultLang;
    localStorage.setItem('wotv-calc.' + 'lang', this.currentLang);
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
    localStorage.setItem('wotv-calc.' + 'lang', this.currentLang);
    this.onLangChange.emit(this.currentLang);
  }
}
