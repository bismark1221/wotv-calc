import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Angulartics2 } from 'angulartics2';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { NgxModalService } from 'ngx-modalview';

import { TranslateService } from '../services/translate.service';
import { NavService } from '../services/nav.service';
import { ThemeService } from '../services/theme.service';
import { AuthService } from '../services/auth.service';

import { LoginComponent } from '../auth/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit, AfterViewInit {
  displayMobileMenu = false;
  showMobileBuilderNav = false;
  showMobileOtherNav = false;
  menuDisabled: boolean;
  inBuilder = false;
  inOther = false;
  inUnit = false;
  inCard = false;
  inEsper = false;
  inEquipment = false;
  inRaid = false;
  inQuest = false;

  showBuilderNav = false;
  showListingNav = false;
  showOtherNav = false;
  showLangNav = false;
  showUserNav = false;

  actualRoute = null;
  version = null;
  theme = null;
  lang = null;
  user = null;

  constructor(
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private navService: NavService,
    private router: Router,
    private themeService: ThemeService,
    private simpleModalService: NgxModalService,
    private authService: AuthService
  ) {
    this.translateService.onLangChange.subscribe((event) => {
      this.lang = this.translateService.currentLang;
    });
  }

  ngOnInit() {
    this.theme = this.themeService.initTheme();
    this.menuDisabled = this.navService.menuDisabled;
    this.version = this.navService.getVersion();
    this.lang = this.translateService.currentLang;
    this.user = this.authService.getUser();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const url = event.url.split('/');
        if (url.length >= 2 && url[1] === 'JP') {
          this.navService.setVersion('JP');
          this.version = 'JP';
        } else {
          this.navService.setVersion('GL');
          this.version = 'GL';
        }
        this.actualRoute = url;
      }

      if (event instanceof NavigationEnd) {
        this.inOther = false;
        this.inBuilder = false;
        this.inUnit = false;
        this.inCard = false;
        this.inEsper = false;
        this.inEquipment = false;
        this.inRaid = false;
        this.inQuest = false;

        const url = event.url.split('/');

        if ((url.length >= 2 && url[1] === 'builder')
          || (url.length >= 3 && url[2] === 'builder')) {
          this.inBuilder = true;
        } else if ((url.length >= 2 && url[1] === 'other')
          || (url.length >= 3 && url[2] === 'other')) {
          this.inOther = true;
        } else if (url.length >= 2 && (url[1] === 'unit' || url[1] === 'units' || (url[1] === 'JP' && (url[2] === 'unit' || url[2] === 'units')))) {
          this.inUnit = true;
        } else if (url.length >= 2 && (url[1] === 'card' || url[1] === 'cards' || (url[1] === 'JP' && (url[2] === 'card' || url[2] === 'cards')))) {
          this.inCard = true;
        } else if (url.length >= 2 && (url[1] === 'esper' || url[1] === 'espers' || (url[1] === 'JP' && (url[2] === 'esper' || url[2] === 'espers')))) {
          this.inEsper = true;
        } else if (url.length >= 2 && (url[1] === 'equipment' || url[1] === 'equipments' || (url[1] === 'JP' && (url[2] === 'equipment' || url[2] === 'equipments')))) {
          this.inEquipment = true;
        } else if (url.length >= 2 && (url[1] === 'raid' || url[1] === 'raids' || (url[1] === 'JP' && (url[2] === 'raid' || url[2] === 'raids')))) {
          this.inRaid = true;
        } else if (url.length >= 2 && (url[1] === 'quest' || url[1] === 'quests' || (url[1] === 'JP' && (url[2] === 'quest' || url[2] === 'quests')))) {
          this.inQuest = true;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.navService.$menuDisabled.subscribe(menuDisabled => {
      this.menuDisabled = menuDisabled;
    });

    this.authService.$user.subscribe(user => {
      this.user = user;
    });
  }

  changeLang(lang: string) {
    if (this.translateService.getLangs().indexOf(lang) !== -1) {
      localStorage.setItem('wotv-calc.' + 'lang', lang);
      this.translateService.use(lang);

      this.angulartics.eventTrack.next({ action: lang, properties: { category: 'change_lang' }});
    }
  }

  changeVersion() {
    const version = this.version === 'GL' ? 'JP' : 'GL';

    if (version === 'GL' && this.actualRoute.length >= 2 && this.actualRoute[1] === 'JP') {
      this.actualRoute.splice(1, 1);

      const route = this.actualRoute.join('/').split('#');
      this.router.navigate([this.actualRoute.join('/') === '' ? '/' : route[0]], { preserveFragment: true });
    } else if (version === 'JP' && this.actualRoute.length >= 2 && this.actualRoute[1] !== 'JP') {
      this.actualRoute.splice(1, 0, 'JP');

      const route = this.actualRoute.join('/').split('#');
      this.router.navigate([route[0]], { preserveFragment: true });
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  toggleTheme() {
    this.theme = this.themeService.toogleTheme();
  }

  openLoginModal() {
    const modalRef = this.simpleModalService.addModal(LoginComponent);
  }

  logout() {
    this.authService.logout();
  }

  toggleMobileMenu(forceClose = false) {
    this.displayMobileMenu = forceClose ? false : !this.displayMobileMenu;

    if (forceClose) {
      this.showOtherNav = false;
      this.showUserNav = false;
      this.showLangNav = false;
      this.showBuilderNav = false;
      this.showListingNav = false;
    }
  }

  toggleOtherNav(status) {
    this.showOtherNav = status;
  }

  toggleUserNav(status) {
    this.showUserNav = status;
  }

  toggleLangNav(status) {
    this.showLangNav = status;
  }

  toggleBuilderNav(status) {
    this.showBuilderNav = status;
  }

  toggleListingNav(status) {
    this.showListingNav = status;
  }
}
