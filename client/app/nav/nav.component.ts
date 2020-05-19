import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angulartics2 } from 'angulartics2';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { NavService } from '../services/nav.service'
import { ThemeService } from '../services/theme.service'

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
  actualRoute = null;
  version = null;
  theme = null;

  constructor(
    private localStorageService: LocalStorageService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private navService: NavService,
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.theme = this.themeService.initTheme()
    this.menuDisabled = this.navService.menuDisabled;
    this.version = this.navService.getVersion()

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        let url = event.url.split("/")
        if (url.length >= 2 && url[1] == "JP") {
          this.navService.setVersion("JP")
          this.version = "JP"
        } else {
          this.navService.setVersion("GL")
          this.version = "GL"
        }
        this.actualRoute = url
      }

      if (event instanceof NavigationEnd) {
        let url = event.url.split("/")
        if ((url.length >= 2 && url[1] == "builder")
          || (url.length >= 3 && url[2] == "builder")) {
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

  changeVersion(version) {
    if (version == "GL" && this.actualRoute.length >= 2 && this.actualRoute[1] === "JP") {
      this.actualRoute.splice(1, 1)
      this.router.navigate([this.actualRoute.join("/") == "" ? "/" : this.actualRoute.join("/")])
    } else if (version == "JP" && this.actualRoute.length >= 2 && this.actualRoute[1] !== "JP") {
      this.actualRoute.splice(1, 0, "JP");
      this.router.navigate([this.actualRoute.join("/")])
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  toggleTheme() {
    this.theme = this.themeService.toogleTheme()
  }
}
