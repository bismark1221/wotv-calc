import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';

import { NavService } from './nav.service';
import { CheckHashService } from './checkHash.service';

@Injectable()
export class DataService {
  private launchedRequests = {};

  constructor(
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private checkHashService: CheckHashService,
    private http: HttpClient
  ) {}

  private getLocalStorage(type, forceVersion = null) {
    return this.navService.getVersion() === 'JP' ? 'jp_data_' + type : 'gl_data_' + type;
  }

  public async loadData(type) {
    await this.checkHashService.getLaunchedRequest();
    const cache = await caches.open('wotv-calc');
    const data = await cache.match('/' + this.getLocalStorage(type));

    if (data === null || data === undefined) {
      if (!this.launchedRequests[this.getLocalStorage(type)]) {
        this.launchedRequests[this.getLocalStorage(type)] = this.http.get('/assets/data/' + this.navService.getVersion().toLowerCase() + '/' + type + '.json?t=' + new Date().getTime())
          .map(async response => {
            await cache.put(this.getLocalStorage(type), new Response(JSON.stringify(response)));
            this.launchedRequests[this.getLocalStorage(type)] = null;
            return response;
          })
          .toPromise();
      }

      return this.launchedRequests[this.getLocalStorage(type)];
    } else {
      return of(JSON.parse(await data.text())).toPromise();
    }
  }
}
