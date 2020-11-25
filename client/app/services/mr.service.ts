import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/firestore';


import { default as GL_MRS } from '../data/gl/masterRanks.json';
import { default as JP_MRS } from '../data/jp/masterRanks.json';
import { NavService } from './nav.service';
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

  private dataMasterRanks;


  constructor(
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  private getRaw() {
    if (this.navService.getVersion() === 'GL') {
      return GL_MRS;
    } else {
      return JP_MRS;
    }
  }

  getMRs() {
    const rawMRs = JSON.parse(JSON.stringify(this.getRaw()));

    this.dataMasterRanks = rawMRs;
    return this.dataMasterRanks;
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

  getMasterRanksForBuilder(forceEmptyMasterRanks = false) {
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
      ranks: this.getMRs()
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

  getRanks() {
    this.getMRs();

    return this.dataMasterRanks;
  }
}
