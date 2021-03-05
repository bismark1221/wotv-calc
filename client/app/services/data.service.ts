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

  private getLocalStorage(type, forcedVersion = null) {
    return this.navService.getVersion() === 'JP' || forcedVersion === 'JP' ? 'jp_data_' + type : 'gl_data_' + type;
  }

  public async loadData(type, forcedVersion = null) {
    await this.checkHashService.getLaunchedRequest();
    const storageName = this.getLocalStorage(type, forcedVersion);
    const cache = await caches.open('wotv-calc');
    const data = await cache.match('/' + storageName);

    if (data === null || data === undefined) {
      if (!this.launchedRequests[storageName]) {
        this.launchedRequests[storageName] = this.http.get('/assets/data/' + this.navService.getVersion().toLowerCase() + '/' + type + '.json?t=' + new Date().getTime())
          .map(async response => {
            await cache.put(storageName, new Response(JSON.stringify(response)));
            this.launchedRequests[storageName] = null;

            return response;
          })
          .toPromise();
      }

      return this.launchedRequests[storageName];
    } else {
      return of(JSON.parse(await data.text())).toPromise();
    }
  }
}
