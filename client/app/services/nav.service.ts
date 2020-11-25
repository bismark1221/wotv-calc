import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Title } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NavService {
  menuDisabled = false;
  version = null;

  private menuDataSubject = new BehaviorSubject<boolean>(this.menuDisabled);
  $menuDisabled = this.menuDataSubject.asObservable();

  constructor(
    private localStorageService: LocalStorageService,
    private titleService: Title
  ) {}

  updateMenu(status: boolean) {
    this.menuDisabled = status;
    this.menuDataSubject.next(this.menuDisabled);
  }

  getVersion() {
    if (!this.version) {
      this.version = this.localStorageService.get('version') ? this.localStorageService.get('version') : 'GL';
      this.localStorageService.set('version', this.version);
    }

    return this.version;
  }

  setVersion(version) {
    this.version = version;
    this.localStorageService.set('version', this.version);
  }

  getRoute(route) {
    let formattedRoute = route;
    if (this.version == 'JP') {
      route = route.split('/');
      route.splice(1, 0, 'JP');
      formattedRoute = route.join('/');
    }

    return formattedRoute;
  }

  setTitle(title) {
    if (title) {
      this.titleService.setTitle(title + ' - WOTV-CALC');
    } else {
      this.titleService.setTitle('WOTV-CALC');
    }
  }
}
