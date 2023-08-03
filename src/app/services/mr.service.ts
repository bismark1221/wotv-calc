import { Injectable } from '@angular/core';

import { NavService } from './nav.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class MasterRanksService {
  private masterRanks = {
    fire: 1,
    ice: 1,
    water: 1,
    wind: 1,
    light: 1,
    dark: 1,
    earth: 1,
    lightning: 1,
    storeId: null
  };

  private JP_dataMasterRanks;
  private GL_dataMasterRanks;

  constructor(
    private apiService: ApiService,
    private navService: NavService,
    private authService: AuthService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('masterRanks', param, extraQuery)));
  }

  private async getApiUser(extra = null) {
    return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'masterRank', data: extra})));
  }

  async getMRs() {
    if (this[this.navService.getVersion() + '_dataMasterRanks'] === null || this[this.navService.getVersion() + '_dataMasterRanks'] === undefined) {
      const rawMRs = await this.getApi();

      const formattedRanks = {};
      for (const rank of rawMRs) {
        formattedRanks[rank.condition] = rank;
      }

      this[this.navService.getVersion() + '_dataMasterRanks'] = formattedRanks;
    }

    return this[this.navService.getVersion() + '_dataMasterRanks'];
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_masterRank' : 'masterRank';
  }

  getMasterRanks() {
    if (localStorage.getItem('wotv-calc.' + this.getLocalStorage()) && Object.keys(JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage()))).length >= 8) {
      this.masterRanks = JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage()));
    } else {
      this.masterRanks = {
        fire: 1,
        ice: 1,
        water: 1,
        wind: 1,
        light: 1,
        dark: 1,
        earth: 1,
        lightning: 1,
        storeId: null
      };
    }

    return this.masterRanks;
  }

  async getMasterRanksForBuilder(forceEmptyMasterRanks = false) {
    if (!forceEmptyMasterRanks && localStorage.getItem('wotv-calc.' + this.getLocalStorage()) && Object.keys(JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage()))).length >= 8) {
      this.masterRanks = JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage()));

      const elements = ['fire', 'ice', 'water', 'wind', 'light', 'dark', 'earth', 'lightning'];
      elements.forEach(element => {
        if (!this.masterRanks[element] || isNaN(this.masterRanks[element]) || this.masterRanks[element] < 1 || this.masterRanks[element] > 40) {
          this.masterRanks[element] = 1;
        }
      });
    } else {
      this.masterRanks = {
        fire: 1,
        ice: 1,
        water: 1,
        wind: 1,
        light: 1,
        dark: 1,
        earth: 1,
        lightning: 1,
        storeId: null
      };
    }

    return {
      data: this.masterRanks,
      ranks: await this.getMRs()
    };
  }

  getSavableData(masterRanks, onlyMasterRanks = false) {
    const data = {
      fire: masterRanks['fire'],
      ice: masterRanks['ice'],
      water: masterRanks['water'],
      wind: masterRanks['wind'],
      light: masterRanks['light'],
      dark: masterRanks['dark'],
      earth: masterRanks['earth'],
      lightning: masterRanks['lightning'],
    };

    if (!onlyMasterRanks) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;

      if (masterRanks.storeId) {
        // @ts-ignore
        data.storeId = masterRanks.storeId;
      }
    }

    return data;
  }

  masterRanksdAlreadyExists() {
    const localStoredMasterRanks = localStorage.getItem('wotv-calc.' + this.getLocalStorage());
    // @ts-ignore
    if (localStoredMasterRanks && JSON.parse(localStoredMasterRanks).storeId) {
      return true;
    } else {
      return false;
    }
  }

  async saveMasterRanks(masterRanks) {
    const savableData = this.getSavableData(masterRanks);

    if (this.masterRanksdAlreadyExists()) {
      const data = await this.getApiUser(savableData);
      // @ts-ignore
      savableData.storeId = masterRanks.storeId;

      localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savableData));

      return masterRanks.storeId;
    } else {
      const data = await this.getApiUser(savableData);
      // @ts-ignore
      savableData.storeId = data.id;

      localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savableData));
      this.masterRanks.storeId = data.id;

      return data.id;
    }
  }
}
