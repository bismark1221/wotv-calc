import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/compat/firestore';

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
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private navService: NavService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('masterRanks', param, extraQuery)));
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
    if (this.localStorageService.get(this.getLocalStorage()) && Object.keys(this.localStorageService.get(this.getLocalStorage())).length >= 8) {
      this.masterRanks = JSON.parse(JSON.stringify(this.localStorageService.get(this.getLocalStorage())));
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
    if (!forceEmptyMasterRanks && this.localStorageService.get(this.getLocalStorage()) && Object.keys(this.localStorageService.get(this.getLocalStorage())).length >= 8) {
      this.masterRanks = JSON.parse(JSON.stringify(this.localStorageService.get(this.getLocalStorage())));

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
    }

    return data;
  }

  masterRanksdAlreadyExists() {
    const localStoredMasterRanks = this.localStorageService.get(this.getLocalStorage());
    // @ts-ignore
    if (localStoredMasterRanks && localStoredMasterRanks.storeId) {
      return true;
    } else {
      return false;
    }
  }

  saveMasterRanks(masterRanks) {
    const savableData = this.getSavableData(masterRanks);

    if (this.masterRanksdAlreadyExists()) {
      return this.firestore.collection(this.getLocalStorage()).doc(masterRanks.storeId).set(savableData).then(data => {
        // @ts-ignore
        savableData.storeId = masterRanks.storeId;

        this.localStorageService.set(this.getLocalStorage(), savableData);

        return masterRanks.storeId;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        // @ts-ignore
        savableData.storeId = data.id;

        this.localStorageService.set(this.getLocalStorage(), savableData);
        this.masterRanks.storeId = data.id;

        return data.id;
      });
    }
  }
}
