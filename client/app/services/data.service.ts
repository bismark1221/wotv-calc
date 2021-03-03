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

    const data = this.localStorageService.get(this.getLocalStorage(type));

    if (data === null) {
      if (!this.launchedRequests[this.getLocalStorage(type)]) {
        this.launchedRequests[this.getLocalStorage(type)] = this.http.get('/assets/data/' + this.navService.getVersion().toLowerCase() + '/' + type + '.json?t=' + new Date().getTime())
          .map(response => {
            this.localStorageService.set(this.getLocalStorage(type), response);
            this.launchedRequests[this.getLocalStorage(type)] = null;
            return response;
          })
          .toPromise();
      }

      return this.launchedRequests[this.getLocalStorage(type)];
    } else {
      return of(data).toPromise();
    }
  }
}
