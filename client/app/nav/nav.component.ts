import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angulartics2 } from 'angulartics2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  displayLink: boolean = false;

  constructor(
    private localStorageService: LocalStorageService,
    private angulartics: Angulartics2,
    private translateService: TranslateService
  ) {}

  menu(forceClose: boolean = false) {
    this.displayLink = forceClose ? false : !this.displayLink;
  }

  changeLang(lang: string) {
    if (this.translateService.getLangs().indexOf(lang) !== -1) {
      this.localStorageService.set('lang', lang);
      this.translateService.use(lang);

      this.angulartics.eventTrack.next({ action: lang, properties: { category: 'change_lang' }});
    }

    this.menu(true);
  }
}
