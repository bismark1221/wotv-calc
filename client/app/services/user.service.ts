import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/firestore';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CardService } from './card.service';
import { EsperService } from './esper.service';
import { UnitService } from './unit.service';
import { EquipmentService } from './equipment.service';
import { GuildService } from './guild.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private equipmentStatMapping = {
    'hp': 'HP',
    'mp': 'TP',
    'ap': 'AP',
    'atk': 'ATK',
    'def': 'DEF',
    'mnd': 'SPR',
    'mag': 'MAG',
    'dex': 'DEX',
    'spd': 'AGI',
    'luk': 'LUCK',
    'iniap': 'INITIAL_AP',
    'hit' : 'ACCURACY',
    'crt' : 'CRITIC_RATE',
    'crta': 'CRITIC_AVOID',
    'avd' : 'EVADE'
  };

  private type = '';
  private savedItems = {};

  private loading = {
    haveDevice: true,
    uploadDevice: false,
    data: false,
    deleteDevice: false,
    saveData: {
      guild: 'wait',
      masterRank: 'wait',
      cards: {
        delete: -1,
        save: -1
      },
      espers: {
        delete: -1,
        save: -1
      },
      units: {
        delete: -1,
        save: -1
      },
      equipments: {
        delete:  -1,
        save: -1
      }
    }
  };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cardService: CardService,
    private esperService: EsperService,
    private unitService: UnitService,
    private equipmentService: EquipmentService,
    private guildService: GuildService,
    private localStorageService: LocalStorageService,
    private firestore: AngularFirestore
  ) {
  }

  getLoading() {
    return this.loading;
  }

  async userHaveDevice(loadingType) {
    const data = {
      userId: this.authService.getUser().uid
    };

    const apiResult = await this.apiService.postForLogin('userHaveDevice', data);
    this.loading[loadingType] = false;

    if (apiResult.result === true) {
      return true;
    } else {
      return false;
    }
  }

  async deleteLoginInfos() {
    const data = {
      userId: this.authService.getUser().uid
    };

    this.loading.deleteDevice = true;
    const apiResult = await this.apiService.postForLogin('deleteDevice', data);

    if (apiResult.result === true) {
      return true;
    } else {
      return false;
    }
  }

  async getDeviceInfos(type, token) {
    const data = {
      type: type,
      token: token,
      userId: this.authService.getUser().uid
    };

    this.loading.uploadDevice = true;
    const apiResult = await this.apiService.postForLogin('generateDeviceId', data);
    this.loading.uploadDevice = false;

    if (apiResult.result === 'success') {
      return true;
    } else {
      return false;
    }
  }

  async getLoginData() {
    const data = {
      userId: this.authService.getUser().uid
    };

    this.loading.data = true;
    const apiResult = JSON.parse(JSON.stringify(await this.apiService.postForLogin('dumpLogin', data)));

    if (apiResult) {
      const guild = {
        serpent: apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_SNAKE') ? this.guildService.getLevelFromExp('serpent', apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_SNAKE').experience) : 0,
        bull: apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_COW') ? this.guildService.getLevelFromExp('bull', apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_COW').experience) : 0,
        kirin: apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_GIRAFFE') ? this.guildService.getLevelFromExp('kirin', apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_GIRAFFE').experience) : 0,
        lion: apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_LION') ? this.guildService.getLevelFromExp('lion', apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_LION').experience) : 0,
        knight: apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_HUNT') ? this.guildService.getLevelFromExp('knight', apiResult.guild.find(searchedStatue => searchedStatue.id === 'GSI_HUNT').experience) : 0,
        user: this.authService.getUser().uid
      };

      const masterRanks = {
        dark: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_DARK') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_DARK').rank : 0,
        fire: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_FIRE') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_FIRE').rank : 0,
        ice: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_ICE') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_ICE').rank : 0,
        water: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_WATER') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_WATER').rank : 0,
        wind: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_WIND') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_WIND').rank : 0,
        earth: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_SOIL') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_SOIL').rank : 0,
        light: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_SHINE') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_SHINE').rank : 0,
        lightning: apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_THUNDER') ? apiResult.masterRanks.find(searchedMasterRank => searchedMasterRank.iname === 'MR_THUNDER').rank : 0,
        user: this.authService.getUser().uid
      };

      const cards = [];
      for (const dumpedCard of apiResult.visionCards) {
        const cardCustomData = {
          dataId: dumpedCard.iname,
          star: dumpedCard.awake,
          level: this.cardService.getLevelFromExp(dumpedCard.exp),
          customName: 'in-game',
          user: this.authService.getUser().uid
        };
        cards.push(cardCustomData);
      }

      const espers = [];
      for (const dumpedEsper of apiResult.netherbeasts) {
        const rawEsper = apiResult.rawEspers.find(searchedEsper => searchedEsper.dataId === dumpedEsper.iname);
        const nodes = {};

        for (const abilityboard of dumpedEsper.abilityboards) {
          nodes[abilityboard] = 1;
        }

        const esperCustomData = {
          dataId: dumpedEsper.iname,
          star: dumpedEsper.awake,
          level: this.esperService.getLevelFromExp(rawEsper ? rawEsper.rarity : 'UR', dumpedEsper.awake, dumpedEsper.exp),
          resonance: 1,
          nodes: nodes,
          customName: 'in-game',
          user: this.authService.getUser().uid
        };
        espers.push(esperCustomData);
      }

      const equipments = [];
      const equipmentIdsCounts = {};

      for (const dumpedEquipment of apiResult.artifacts) {
        let realDataId = dumpedEquipment.iname;
        if (dumpedEquipment.grow !== 'ARTIFACT_TRUST' && dumpedEquipment.grow !== 'ARTIFACT_50') {
          realDataId = realDataId.split('_').slice(0, -1).join('_');
        }

        const equipmentCustomData = {
          customName: 'in-game',
          dataId: realDataId,
          upgrade: dumpedEquipment.awake - (dumpedEquipment.grow !== 'ARTIFACT_TRUST' && dumpedEquipment.grow !== 'ARTIFACT_50' ? 0 : 1),
          grow: dumpedEquipment.grow,
          level: this.equipmentService.getLevelFromExp(dumpedEquipment.exp),
          stats: {},
          user: this.authService.getUser().uid
        };

        for (const statType of Object.keys(this.equipmentStatMapping)) {
          if (dumpedEquipment[statType]) {
            equipmentCustomData.stats[this.equipmentStatMapping[statType]] = dumpedEquipment[statType];
          }
        }

        equipments.push(equipmentCustomData);
      }

      const units = [];
      for (const dumpedUnit of apiResult.units) {
        const nodes = {};

        const unitCustomData = {
          dataId: dumpedUnit.iname,
          customName: 'in-game',
          level: this.unitService.getLevelFromExp(dumpedUnit.exp),
          card: null,
          esper: null,
          equipments: [null, null, null],
          guild: guild,
          masterRanks: masterRanks,
          star: dumpedUnit.awake,
          lb: dumpedUnit.rank,
          masterSkill: dumpedUnit.abilities.filter(searchedSkill => searchedSkill.ability_iname.includes('_MA_')).length - 1,
          jobs: [
            dumpedUnit.jobs[0].lv,
            dumpedUnit.jobs[1] ? dumpedUnit.jobs[1].lv : 1,
            dumpedUnit.jobs[2] ? dumpedUnit.jobs[2].lv : 1
          ],
          subjob: null,
          limitLv: null,
          activatedCounter: null,
          activatedSupport: [null, null],
          nodes: {},
          user: this.authService.getUser().uid
        };

        dumpedUnit.jobs.forEach((rawJob, jobIndex) => {
          if (rawJob.id === dumpedUnit.abilset.sub) {
            unitCustomData.subjob = jobIndex;
          }
        });

        const lbSkill = dumpedUnit.abilities.find(searchedSkill => searchedSkill.ability_iname.includes('_LB_'));
        if (lbSkill) {
          unitCustomData.limitLv = this.unitService.getLimitLevelFromExp(lbSkill.lv);
        }

        const rawUnit = apiResult.rawUnits.find(searchedUnit => searchedUnit.dataId === dumpedUnit.iname);
        for (const type of ['sup1', 'sup2', 'react']) {
          if (dumpedUnit.abilset[type]) {
            const rawSkill = dumpedUnit.abilities.find(searchedSkill => searchedSkill.id === dumpedUnit.abilset[type]);
            for (const nodeId of Object.keys(rawUnit.board.nodes)) {
              if (rawSkill.ability_iname === rawUnit.board.nodes[nodeId].dataId) {
                switch (type) {
                  case 'sup1':
                    unitCustomData.activatedSupport[0] = nodeId;
                  break;
                  case 'sup2':
                    unitCustomData.activatedSupport[1] = nodeId;
                  break;
                  case 'react':
                    unitCustomData.activatedCounter = nodeId;
                  break;
                }
                break;
              }
            }
          }
        }

        for (const nodeId of Object.keys(rawUnit.board.nodes)) {
          if (rawUnit.board.nodes[nodeId].type === 'skill') {
            const findedSkill = dumpedUnit.abilities.find(searchedSkill => searchedSkill.ability_iname === rawUnit.board.nodes[nodeId].dataId);
            unitCustomData.nodes[nodeId] = findedSkill ? findedSkill.lv : 0;
          } else {
            if (
              rawUnit.board.nodes[nodeId].jobLevel > 15 &&
              rawUnit.board.nodes[nodeId].dataId &&
              rawUnit.board.nodes[nodeId].dataId.split('_')[0] === 'SK'
            ) {
              const findedSkill = dumpedUnit.abilities.find(searchedSkill => searchedSkill.ability_iname === rawUnit.board.nodes[nodeId].dataId);
              unitCustomData.nodes[nodeId] = findedSkill ? findedSkill.lv : 0;
            } else {
              unitCustomData.nodes[nodeId] = dumpedUnit.abilityboards.indexOf(parseInt(nodeId, 10)) !== -1 ? 1 : 0;
            }
          }
        }

        units.push(unitCustomData);
      }

      this.loading.data = false;

      return {
        cards: cards,
        espers: espers,
        guild: guild,
        masterRanks: masterRanks,
        equipments: equipments,
        units: units
      };
    }

    this.loading.data = false;

    return null;
  }

  private getSavedItems(type) {
    return this.localStorageService.get(type);
  }

  async saveNewData(data, type) {
    this.type = type;
    this.savedItems = this.getSavedItems(this.type);
    this.loading.saveData[this.type].save = data.length;

    for (const item of data) {
      await this.firestore.collection(this.type).add(item).then((storedData: any) => {
        item.storeId = storedData.id;

        if (this.savedItems[item.dataId]) {
          this.savedItems[item.dataId].push(item);
        } else {
          this.savedItems[item.dataId] = [item];
        }
      });

      this.loading.saveData[this.type].save--;
    }

    this.localStorageService.set(this.type, this.savedItems);
  }

  async deleteAllSaved(type) {
    this.type = type;
    this.savedItems = this.getSavedItems(this.type);
    const itemPromise = new Promise((resolve, reject) => {
       this.firestore.collection(
        this.type,
        ref => ref.where('user', '==', this.authService.getUser().uid).where('customName', '==', 'in-game')
      )
      .snapshotChanges()
      .subscribe(data => {
        resolve(data);
      });
    });

    await itemPromise.then(async (data: any) => {
      if (data) {
        const itemStoreIds = [];
        this.loading.saveData[this.type].delete = data.length;

        for (const item of data) {
          itemStoreIds.push(item.payload.doc.id);
          await this.firestore.collection(this.type).doc(item.payload.doc.id).delete();
          this.loading.saveData[this.type].delete--;
        }

        if (itemStoreIds.length > 0) {
          for (const itemId of Object.keys(this.savedItems)) {
            let index = 0;
            for (const item of this.savedItems[itemId]) {
              if (itemStoreIds.indexOf(item.storeId) !== -1) {
                this.savedItems[itemId].splice(index, 1);
              }

              index++;
            }
          }
        }

        this.localStorageService.set(this.type, this.savedItems);
      }
    });
  }

  async deleteSavedGuildMR(type) {
    this.type = type;
    this.savedItems = this.getSavedItems(this.type);
    const itemPromise = new Promise((resolve, reject) => {
       this.firestore.collection(
        this.type,
        ref => ref.where('user', '==', this.authService.getUser().uid)
      )
      .snapshotChanges()
      .subscribe(data => {
        resolve(data);
      });
    });

    await itemPromise.then(async (data: any) => {
      if (data) {
        this.loading.saveData[this.type] = 'delete';
        for (const item of data) {
          await this.firestore.collection(this.type).doc(item.payload.doc.id).delete();
        }

        this.localStorageService.remove(this.type);
      }
    });
  }

  async saveNewGuildMR(data, type) {
    this.type = type;

    if (data) {
      this.loading.saveData[this.type] = 'save';
      await this.firestore.collection(this.type).add(data).then((storedData: any) => {
        data.storeId = storedData.id;

        this.savedItems = data;
      });
    }

    this.localStorageService.set(this.type, this.savedItems);
    this.loading.saveData[this.type] = 'finish';
  }
}
