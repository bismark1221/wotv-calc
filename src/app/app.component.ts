import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { TranslateService } from './services/translate.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    translateService: TranslateService,
    private angulartics: Angulartics2,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    angulartics2GoogleAnalytics.startTracking();

    translateService.addLangs(['en', 'fr', 'de', 'es', 'ko', 'zh']);

    let lang = this.localStorageService.get<any[]>('lang') ? this.localStorageService.get<any[]>('lang').toString() : translateService.getDefaultLang();
    if (translateService.getLangs().indexOf(lang) === -1) {
      lang = translateService.getDefaultLang();
    }

    translateService.use(lang);
    this.angulartics.eventTrack.next({ action: lang, properties: { category: 'lang' }});
  }

  onActivate(event) {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll(0, 0);
    }
  }
}
