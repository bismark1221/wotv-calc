import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angulartics2 } from 'angulartics2';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NavService } from '../services/nav.service'
import { ThemeService } from '../services/theme.service'
import { AuthService } from '../services/auth.service'

import { LoginComponent } from '../auth/login.component'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent {
  displayLink: boolean = false;
  menuDisabled: boolean;
  inBuilder = false;
  inUnit = false;
  inCard = false;
  inEsper = false;
  inEquipment = false;
  inRaid = false;
  showBuilderNav = false;
  showVersionSelector = false;
  showLangSelector = false;
  actualRoute = null;
  version = null;
  theme = null;
  lang = null;
  user = null

  constructor(
    private localStorageService: LocalStorageService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private navService: NavService,
    private router: Router,
    private themeService: ThemeService,
    private modalService: NgbModal,
    private authService: AuthService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang
    });
  }

  ngOnInit() {
    this.theme = this.themeService.initTheme()
    this.menuDisabled = this.navService.menuDisabled;
    this.version = this.navService.getVersion();
    this.lang = this.translateService.currentLang

    this.user = this.authService.getUser()
    console.log("FOOOO")
    console.log(this.user)

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
        this.inBuilder = false
        this.inUnit = false;
        this.inCard = false;
        this.inEsper = false;
        this.inEquipment = false;
        this.inRaid = false;

        let url = event.url.split("/")

        if ((url.length >= 2 && url[1] == "builder")
          || (url.length >= 3 && url[2] == "builder")) {
          this.inBuilder = true
        } else if (url.length >= 2 && (url[1] == "unit" || url[1] == "units" || (url[1] == "JP" && (url[2] == "unit" || url[2] == "units")))) {
          this.inUnit = true;
        } else if (url.length >= 2 && (url[1] == "card" || url[1] == "cards" || (url[1] == "JP" && (url[2] == "card" || url[2] == "cards")))) {
          this.inCard = true;
        } else if (url.length >= 2 && (url[1] == "esper" || url[1] == "espers" || (url[1] == "JP" && (url[2] == "esper" || url[2] == "espers")))) {
          this.inEsper = true;
        } else if (url.length >= 2 && (url[1] == "equipment" || url[1] == "equipments" || (url[1] == "JP" && (url[2] == "equipment" || url[2] == "equipments")))) {
          this.inEquipment = true;
        } else if (url.length >= 2 && (url[1] == "raid" || url[1] == "raids" || (url[1] == "JP" && (url[2] == "raid" || url[2] == "raids")))) {
          this.inRaid = true;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.navService.$menuDisabled.subscribe(menuDisabled => {
      this.menuDisabled = menuDisabled;
    });
  }

  changeLang(lang: string) {
    if (this.translateService.getLangs().indexOf(lang) !== -1) {
      this.localStorageService.set('lang', lang);
      this.translateService.use(lang);

      this.angulartics.eventTrack.next({ action: lang, properties: { category: 'change_lang' }});
    }

    this.showLangSelector = false
  }

  changeVersion(version) {
    if (version == "GL" && this.actualRoute.length >= 2 && this.actualRoute[1] === "JP") {
      this.actualRoute.splice(1, 1)
      this.router.navigate([this.actualRoute.join("/") == "" ? "/" : this.actualRoute.join("/")])
    } else if (version == "JP" && this.actualRoute.length >= 2 && this.actualRoute[1] !== "JP") {
      this.actualRoute.splice(1, 0, "JP");
      this.router.navigate([this.actualRoute.join("/")])
    }

    this.showVersionSelector = false
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  toggleTheme() {
    this.theme = this.themeService.toogleTheme()
  }

  openLoginModal() {
    const modalRef = this.modalService.open(LoginComponent, { windowClass: 'builder-modal' });

    modalRef.result.then((user) => {
      console.log("MODAL RESULT :")
      console.log(user)
    }, (reason) => {
    });
  }

  logout() {
    this.authService.logout()
  }
}
