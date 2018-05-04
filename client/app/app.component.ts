import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics, Angulartics2 } from 'angulartics2';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    translate: TranslateService,
    private angulartics: Angulartics2,
    private localStorageService: LocalStorageService
  ) {
    translate.addLangs(["en", "fr", "tw", "es", "de", "kr"]);
    translate.setDefaultLang('en');

    let lang = this.localStorageService.get<any[]>('lang') ? this.localStorageService.get<any[]>('lang').toString() : translate.getDefaultLang();
    if (translate.getLangs().indexOf(lang) === -1) {
      lang = translate.getDefaultLang();
    }

    translate.use(lang);
    this.angulartics.eventTrack.next({ action: lang, properties: { category: 'lang' }});
  }
}
