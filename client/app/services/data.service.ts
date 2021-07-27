import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';
import { ToastrService } from 'ngx-toastr';

import { NavService } from './nav.service';
import { CheckHashService } from './checkHash.service';

@Injectable()
export class DataService {
  private launchedRequests = {};

  constructor(
    private navService: NavService,
    private checkHashService: CheckHashService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  private getStorageName(type) {
    return this.navService.getVersion() === 'JP' ? 'jp_data_' + type : 'gl_data_' + type;
  }

  public async loadData(type) {
    await this.checkHashService.getLaunchedRequest();
    const storageName = this.getStorageName(type);
    let cache = null;
    let data = null;
    let cacheAvailable = true;

    try {
      cache = await caches.open('wotv-calc');
      data = await cache.match('/' + storageName);
    } catch (error) {
      cacheAvailable = false;
    }

    if (data === null || data === undefined) {
      if (!this.launchedRequests[storageName]) {
        this.toastr.info('Downloading ' + storageName);

        this.launchedRequests[storageName] = this.http.get('/assets/data/' + this.navService.getVersion().toLowerCase() + '/' + type + '.json?t=' + new Date().getTime())
          .map(async response => {
            if (cacheAvailable) {
              await cache.put(storageName, new Response(JSON.stringify(response)));
            }

            this.launchedRequests[storageName] = null;
            this.toastr.success('Downloaded ' + storageName);

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
