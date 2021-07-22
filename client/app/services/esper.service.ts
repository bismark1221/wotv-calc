
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { GridService } from './grid.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { AuthService } from './auth.service';
import { SkillService } from './skill.service';
import { NameService } from './name.service';
import { DataService } from './data.service';
import { ApiService } from './api.service';

import { Esper } from '../entities/esper';

@Injectable()
export class EsperService {
  private espers: Esper[];
  esper;

  private JP_limitedEspers = [
    'UN_FF01_S_WRMC',
    'UN_FF4_S_DMNW',
    'UN_LW_S_MOGL',
    'UN_FFT_S_CHCB_01',
    'UN_LW_S_KRKN',
    'UN_FF7_S_SCPN'
  ];

  private GL_limitedEspers = [
    'UN_FF01_S_WRMC',
    'UN_FF4_S_DMNW',
    'UN_LW_S_MOGL',
    'UN_FFT_S_CHCB_01',
    'UN_LW_S_KRKN',
    'UN_FF7_S_SCPN'
  ];

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private apiService: ApiService,
    private gridService: GridService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private skillService: SkillService,
    private nameService: NameService,
    private firestore: AngularFirestore
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('espers', param, extraQuery)));
  }

  async getEspersForListingWithCosts(filters = null, sort = 'rarity', order = 'desc') {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);

    const rawEspers = [];
    const costs = [];

    for (const apiEsper of apiResult) {
      const rawEsper = new Esper();
      rawEsper.constructFromJson(apiEsper, this.translateService);
      rawEspers.push(rawEsper);

      if (costs.indexOf(rawEsper.cost) === -1) {
        costs.push(rawEsper.cost);
      }
    }

    const espers = this.filterEspers(rawEspers, filters, sort, order);

    return {
      rawEspers: rawEspers,
      espers: espers,
      costs: costs.sort((a, b) => b - a)
    };
  }

  private getRaw() {
    return this.dataService.loadData('espers');
  }

  async getEspers() {
    if (this[this.navService.getVersion() + '_espers'] === null || this[this.navService.getVersion() + '_espers'] === undefined) {
      const espers: Esper[] = [];
      const rawEspers = JSON.parse(JSON.stringify(await this.getRaw()));

      Object.keys(rawEspers).forEach(esperId => {
        const esper = new Esper();
        esper.constructFromJson(rawEspers[esperId], this.translateService);
        espers.push(esper);
      });

      this[this.navService.getVersion() + '_espers'] = espers;
    }

    return this[this.navService.getVersion() + '_espers'];
  }

  async getEspersForListing(filters = null, sort = 'rarity', order = 'desc') {
    await this.getEspers();
    const espers = this.filterEspers(this[this.navService.getVersion() + '_espers'], filters);

    return espers;
  }

  async getCosts() {
    const espers = await this.getEspers();

    const costs = [];
    espers.forEach(esper => {
      if (costs.indexOf(esper.cost) === -1) {
        costs.push(esper.cost);
      }
    });

    return costs.sort((a, b) => b - a);
  }

  filterEspers(espers, filters, sort = 'rarity', order = 'desc') {
    if (filters) {
      const filteredEspers = [];

      espers.forEach(esper => {
        if ((filters.element.length === 0 || filters.element.indexOf(esper.element) !== -1)
          && (filters.rarity.length === 0 || filters.rarity.indexOf(esper.rarity) !== -1)
          && (filters.cost.length === 0 || filters.cost.indexOf(esper.cost) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(esper.dataId)) !== -1)
          && (!filters.threeStars || esper.SPs.length === 3)
        ) {
          filteredEspers.push(esper);
        }
      });

      return this.sortEspers(filteredEspers, sort, order);
    } else {
      return this.sortEspers(espers, sort, order);
    }
  }

  private sortEspers(espers, sort = 'rarity', order = 'desc') {
    switch (sort) {
      case 'rarity' :
        return this.toolService.sortByRarity(espers, order);
      break;
      case 'name' :
        return this.toolService.sortByName(espers, order);
      break;
      case 'releaseDate' :
        return this.toolService.sortByReleaseDate(espers, order);
      break;
      default :
        console.log('not managed sort');
        return espers;
      break;
    }
  }

  async getEspersForBuilder() {
    const espers = await this.getEspersForListing(null, 'rarity', 'desc');

    const formattedEspersForBuilder = [];
    espers.forEach(esper => {
      formattedEspersForBuilder.push({
        id: esper.dataId,
        name: esper.getName(this.translateService),
        rarity: esper.rarity
      });
    });

    return formattedEspersForBuilder;
  }

  async getEsper(id) {
    await this.getEspers();

    return this[this.navService.getVersion() + '_espers'].find(esper => esper.dataId === id);
  }

  async getEsperBySlug(slug) {
    const apiResult = await this.getApi(slug, [{name: 'forDetail', value: 1}]);

    if (apiResult.esper) {
      const esper = new Esper();
      esper.constructFromJson(apiResult.esper, this.translateService);

      esper.rawSkills = apiResult.skills;

      return esper;
    } else {
      return null;
    }
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_espers' : 'espers';
  }

  getSavedEspers() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(esper, onlyEsper = true) {
    const data = {
      dataId: esper.dataId,
      star: esper.star,
      level: esper.level,
      nodes: {},
      resonance: 10
    };

    Object.keys(esper.board.nodes).forEach(nodeId => {
      data.nodes[nodeId] = esper.board.nodes[nodeId].level ? esper.board.nodes[nodeId].level : 0;
    });

    if (onlyEsper) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;
      // @ts-ignore
      data.customName = esper.customName ? esper.customName : '';
    }

    return data;
  }

  async selectEsperForBuilder(esperId, customData = null) {
    this.esper = new Esper();
    this.esper.constructFromJson(JSON.parse(JSON.stringify(await this.getEsper(esperId))), this.translateService);

    this.esper.name = this.esper.getName(this.translateService);

    for (const nodeId of Object.keys(this.esper.board.nodes)) {
      const node = this.esper.board.nodes[nodeId];
      this.esper.board.nodes[nodeId].skill = await this.skillService.getSkill(node.dataId);
      if (this.esper.board.nodes[nodeId].skill) {
        this.esper.board.nodes[nodeId].skill.sp = node.sp;
        this.esper.board.nodes[nodeId].skill.unlockStar = node.unlockStar;
      }
    }

    this.esper.star = 1;
    this.esper.level = 1;
    this.esper.maxSPs = 0;
    this.esper.usedSPs = 0;
    this.esper.resonance = 10;
    this.esper.possibleBuffs = null;

    const existingEsper = this.initiateSavedEsper(customData);

    if (!existingEsper) {
      this.maxEsper();
    } else {
      this.esper.updateMaxLevel();
      this.esper.changeLevel();
    }

    this.esper.updateEsperBuffs();
    this.esper.grid = await this.gridService.generateEsperGrid(this.esper, 1000);

    return this.esper;
  }

  private initiateSavedEsper(customData = null) {
    const esper = customData;

    if (esper) {
      this.esper.star = esper.star ? esper.star : 1;
      this.esper.level = esper.level ? esper.level : 1;
      this.esper.resonance = esper.resonance ? esper.resonance : 10;
      this.esper.storeId = esper.storeId ? esper.storeId : null;
      this.esper.customName = esper.customName ? esper.customName : '';

      if (esper.nodes) {
        Object.keys(esper.nodes).forEach(nodeId => {
          if (esper.nodes[nodeId]) {
            this.esper.board.nodes[nodeId].level = esper.nodes[nodeId];
            this.esper.board.nodes[nodeId].activated = true;
          }
        });
      }

      return true;
    }

    return false;
  }

  esperAlreadyExists(esper) {
    const savedEspers = this.getSavedEspers();
    let esperFinded = false;

    if (savedEspers[esper.dataId]) {
      savedEspers[esper.dataId].forEach(savedEsper => {
        if (savedEsper.customName === esper.customName) {
          esperFinded = true;
        }
      });
    }

    return esperFinded;
  }

  saveEsper(esper, method) {
    const savableData = this.getSavableData(esper);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        // @ts-ignore
        delete savableData.user;
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method === 'new') {
          // @ts-ignore
          savableData.storeId = data.id;
          const savedEspers = this.getSavedEspers();

          if (savedEspers[esper.dataId]) {
            savedEspers[esper.dataId].push(savableData);
          } else {
            savedEspers[esper.dataId] = [savableData];
          }

          this.localStorageService.set(this.getLocalStorage(), savedEspers);
        }

        this.esper.storeId = data.id;

        return data.id;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(esper.storeId).set(savableData).then(data => {
        const savedEspers = this.getSavedEspers();
        savedEspers[esper.dataId].forEach((savedEsper, esperIndex) => {
          if (savedEsper.storeId === esper.storeId) {
            savedEspers[esper.dataId][esperIndex] = savableData;
            savedEspers[esper.dataId][esperIndex].storeId = esper.storeId;
          }
        });

        this.localStorageService.set(this.getLocalStorage(), savedEspers);

        return esper.storeId;
      });
    }
  }

  deleteEsper(esper) {
    this.firestore.collection(this.getLocalStorage()).doc(esper.storeId).delete();

    const savedEspers = this.getSavedEspers();

    savedEspers[esper.dataId].forEach((savedEsper, savedEsperIndex) => {
      if (savedEsper.storeId === esper.storeId) {
        savedEspers[esper.dataId].splice(savedEsperIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedEspers);
  }

  getStoredEsper(dataId) {
    const document = this.firestore.collection(this.getLocalStorage()).doc(dataId);

    return document.valueChanges();
  }

  getExportableLink() {
    if (!this.esper.storeId || this.hasChangeBeenMade()) {
      return this.saveEsper(this.esper, 'share');
    }

    return new Promise((resolve, reject) => {
      resolve(this.esper.storeId);
    });
  }

  hasChangeBeenMade() {
    if (this.esper.storeId) {
      const newData = this.getSavableData(this.esper);
      let oldData = null;
      if (this.getSavedEspers()[this.esper.dataId]) {
        this.getSavedEspers()[this.esper.dataId].forEach(savedEsper => {
          if (savedEsper.storeId === this.esper.storeId) {
            oldData = savedEsper;
            delete oldData.storeId;
          }
        });

        return !this.toolService.equal(oldData, newData);
      }
    }

    return true;
  }

  resetEsper(esper = null) {
    if (esper) {
      this.esper = esper;
    }

    this.esper.resetEsper();
  }

  changeStar(esper = null) {
    if (esper) {
      this.esper = esper;
    }

    this.esper.changeStar();
  }

  changeLevel(esper = null) {
    if (esper) {
      this.esper = esper;
    }

    this.esper.changeLevel();
  }

  rightClickNode(node, esper = null) {
    if (esper) {
      this.esper = esper;
    }

    this.esper.rightClickNode(node);
  }

  clickNode(node, esper = null) {
    if (esper) {
      this.esper = esper;
    }

    this.esper.clickNode(node);
  }

  canActivateNode(node, esper = null) {
    if (esper) {
      this.esper = esper;
    }

    return this.esper.canActivateNode(node);
  }

  maxEsper(esper = null) {
    if (esper) {
      this.esper = esper;
    }

    this.esper.maxEsper();
  }

  isLimited(id) {
    return this[this.navService.getVersion() + '_limitedEspers'].indexOf(id) !== -1;
  }
}
