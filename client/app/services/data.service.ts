import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { of } from 'rxjs';
import 'rxjs/add/operator/map';

import { NavService } from './nav.service';

@Injectable()
export class DataService {
  private launchedRequests = {};

  constructor(
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private http: HttpClient
  ) {}

  private getLocalStorage(type, forceVersion = null) {
    if (forceVersion === null) {
      return this.navService.getVersion() === 'JP' ? 'jp_data_' + type : 'gl_data_' + type;
    } else {
      return forceVersion + '_data_' + type;
    }
  }

  public removeAll() {
    const versions = ['jp', 'gl'];
    const dataTypes = [
      'cards',
      'equipements',
      'espers',
      'guildTitles',
      'index',
      'items',
      'jobs',
      'masterRanks',
      'playerTitles',
      'quests',
      'raids',
      'units'
    ];

    versions.forEach(version => {
      dataTypes.forEach(dataType => {
        this.localStorageService.remove(this.getLocalStorage(dataType, version));
      });
    });
  }

  public loadData(type) {
    const data = this.localStorageService.get(this.getLocalStorage(type));

    if (data === null) {
      if (!this.launchedRequests[this.getLocalStorage(type)]) {
        this.launchedRequests[this.getLocalStorage(type)] = this.http.get('/assets/data/' + this.navService.getVersion().toLowerCase() + '/' + type + '.json')
          .map(response => {
            this.localStorageService.set(this.getLocalStorage(type), response);
            return response;
          });
      }

      return this.launchedRequests[this.getLocalStorage(type)];
    } else {
      return of(data);
    }
  }
}
