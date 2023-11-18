import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs';

import { PwaService } from './pwa.service';

@Injectable()
export class NavService {
  menuDisabled = false;
  version = null;

  private menuDataSubject = new BehaviorSubject<boolean>(this.menuDisabled);
  $menuDisabled = this.menuDataSubject.asObservable();

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private pwaService: PwaService
  ) {}

  updateMenu(status: boolean) {
    this.menuDisabled = status;
    this.menuDataSubject.next(this.menuDisabled);
  }

  getVersion() {
    if (!this.version) {
      this.version = localStorage.getItem('wotv-calc.' + 'version') ? localStorage.getItem('wotv-calc.' + 'version') : 'GL';
      localStorage.setItem('wotv-calc.' + 'version', this.version);
    }

    return this.version;
  }

  setVersion(version) {
    this.version = version;
    localStorage.setItem('wotv-calc.' + 'version', this.version);
  }

  getRoute(route) {
    let formattedRoute = route;
    if (this.version === 'JP') {
      route = route.split('/');
      route.splice(1, 0, 'JP');
      formattedRoute = route.join('/');
    }

    return formattedRoute;
  }

  setSEO(title, description) {
    if (title) {
      this.titleService.setTitle(title + ' - WOTV-CALC');
    } else {
      this.titleService.setTitle('WOTV-CALC');
    }

    if (description) {
      this.metaService.updateTag({ name: 'description', content: description });
    }
  }
}
