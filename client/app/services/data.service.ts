import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';

import { NavService } from './nav.service';

/*import GL_UNITS from '../data/gl/units.json';
import JP_UNITS from '../data/jp/units.json';*/

@Injectable()
export class DataService {
  constructor(
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private http: HttpClient
  ) {}

  private getLocalStorage(type, forceVersion = null) {
    if (forceVersion === null) {
      return this.navService.getVersion() === 'JP' ? 'jp_data_' + type : 'gl_data' + type;
    } else {
      return forceVersion + '_data_' + type;
    }
  }

  public removeAll() {
    console.log('removeAll');

    const versions = ['JP', 'GL'];
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
}
