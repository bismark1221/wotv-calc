import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angulartics2 } from 'angulartics2';
import { Router, NavigationEnd } from '@angular/router';

import { NavService } from '../services/nav.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  displayLink: boolean = false;
  menuDisabled: boolean;
  inBuilder = false;
  showBuilderNav = false;

  constructor(
    private localStorageService: LocalStorageService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private navService: NavService,
    private router: Router
  ) {}

  ngOnInit() {
    this.menuDisabled = this.navService.menuDisabled;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let url = event.url.split("/")
        if (url.length >= 2 && url[1] == "builder") {
          this.inBuilder = true
        } else {
          this.inBuilder = false
        }
      }
    });
  }

  ngAfterViewInit() {
    this.navService.$menuDisabled.subscribe(menuDisabled => {
      this.menuDisabled = menuDisabled;
    });
  }

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
