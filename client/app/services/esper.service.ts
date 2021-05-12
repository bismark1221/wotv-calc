
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

import { Esper } from '../entities/esper';

@Injectable()
export class EsperService {
  private espers: Esper[];
  esper;

  private espersRarity = {
    N: [],
    R: [],
    SR: [
      'UN_LW_S_BOMB',
      'UN_LW_S_CACT',
      'UN_LW_S_ARMN_01',
      'UN_LW_S_OGRE',
      'UN_LW_S_ZUUU'
    ],
    MR: [
      'UN_LW_S_BHMT',
      'UN_LW_S_IGNT',
      'UN_LW_S_MABR',
      'UN_LW_S_MOGL',
      'UN_LW_S_OCHU',
      'UN_FFT_S_CHCB_01',
      'UN_LW_S_MDFY',
      'UN_LW_S_LAMA_01',
      'UN_LW_S_BLMN',
      'UN_LW_S_CHCB1',
      'UN_LW_S_TNBR',
      'UN_LW_S_GCAL',
      'UN_LW_S_MRLT',
      'UN_LW_S_CORL',
      'UN_LW_S_KRKN',
      'UN_LW_S_DMCM'
    ],
    UR: [
      'UN_LW_S_IFRT',
      'UN_LW_S_GLEM',
      'UN_LW_S_RAMU',
      'UN_LW_S_SHIV',
      'UN_LW_S_SIRE',
      'UN_LW_S_ODIN',
      'UN_LW_S_TSLP',
      'UN_LW_S_THDG',
      'UN_FF01_S_WRMC',
      'UN_LW_S_DABL',
      'UN_LW_S_FNRR',
      'UN_LW_S_TITN',
      'UN_LW_S_AGON',
      'UN_FF4_S_DMNW',
      'UN_LW_S_LVAT',
      'UN_LW_S_TYPN',
      'UN_LW_S_BAHM',
      'UN_LW_S_OMEG',
      'UN_LW_S_PNIX',
      'UN_LW_S_CBCL',
      'UN_LW_S_ICDG',
      'UN_FF7_S_SCPN'
    ]
  };

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

  private GL_releaseDates = {
    UN_LW_S_IFRT: '25/03/2020',
    UN_LW_S_GLEM: '25/03/2020',
    UN_LW_S_SIRE: '25/03/2020',
    UN_LW_S_BHMT: '25/03/2020',
    UN_LW_S_IGNT: '25/03/2020',
    UN_LW_S_MABR: '25/03/2020',
    UN_LW_S_BOMB: '25/03/2020',
    UN_LW_S_CACT: '25/03/2020',
    UN_LW_S_ARMN_01: '25/03/2020',
    UN_LW_S_OGRE: '25/03/2020',
    UN_LW_S_ZUUU: '25/03/2020',
    UN_LW_S_SHIV: '01/04/2019',
    UN_LW_S_RAMU: '08/04/2019',
    UN_LW_S_ODIN: '13/05/2020',
    UN_LW_S_LAMA_01: '20/05/2020',
    UN_LW_S_TSLP: '03/06/2020',
    UN_LW_S_OCHU: '17/06/2020',
    UN_LW_S_THDG: '22/07/2020',
    UN_FF01_S_WRMC: '29/07/2020',
    UN_LW_S_DABL: '12/08/2020',
    UN_FFT_S_CHCB_01: '26/08/2020',
    UN_LW_S_MDFY: '16/09/2020',
    UN_LW_S_FNRR: '30/09/2020',
    UN_LW_S_TITN: '14/10/2020',
    UN_LW_S_BLMN: '28/10/2020',
    UN_LW_S_AGON: '11/11/2020',
    UN_LW_S_CHCB1: '18/11/2020',
    UN_FF4_S_DMNW: '25/11/2020',
    UN_LW_S_MOGL: '09/12/2019',
    UN_LW_S_TNBR: '30/12/2020',
    UN_LW_S_LVAT: '13/01/2021',
    UN_LW_S_GCAL: '27/01/2021',
    UN_LW_S_TYPN: '10/02/2021',
    UN_LW_S_MRLT: '24/02/2021',
    UN_LW_S_BAHM: '24/03/2021',
    UN_LW_S_OMEG: '14/04/2021',
    UN_LW_S_PNIX: '21/05/2021'
  };

  private JP_releaseDates = {
    UN_LW_S_IFRT: '14/11/2019',
    UN_LW_S_GLEM: '14/11/2019',
    UN_LW_S_SIRE: '14/11/2019',
    UN_LW_S_BHMT: '14/11/2019',
    UN_LW_S_IGNT: '14/11/2019',
    UN_LW_S_MABR: '14/11/2019',
    UN_LW_S_BOMB: '14/11/2019',
    UN_LW_S_CACT: '14/11/2019',
    UN_LW_S_ARMN_01: '14/11/2019',
    UN_LW_S_OGRE: '14/11/2019',
    UN_LW_S_ZUUU: '14/11/2019',
    UN_LW_S_SHIV: '22/11/2019',
    UN_LW_S_RAMU: '01/12/2019',
    UN_LW_S_MOGL: '01/12/2019',
    UN_LW_S_ODIN: '01/01/2020',
    UN_LW_S_LAMA_01: '15/01/2020',
    UN_LW_S_TSLP: '02/01/2020',
    UN_LW_S_OCHU: '14/02/2020',
    UN_LW_S_THDG: '09/03/2020',
    UN_FF01_S_WRMC: '25/03/2020',
    UN_LW_S_DABL: '08/04/2020',
    UN_FFT_S_CHCB_01: '22/04/2020',
    UN_LW_S_MDFY: '05/05/2020',
    UN_LW_S_FNRR: '21/05/2020',
    UN_LW_S_TITN: '10/06/2020',
    UN_LW_S_BLMN: '24/06/2020',
    UN_LW_S_AGON: '08/07/2020',
    UN_LW_S_CHCB1: '22/07/2020',
    UN_FF4_S_DMNW: '01/08/2020',
    UN_LW_S_TNBR: '25/08/2020',
    UN_LW_S_LVAT: '09/09/2020',
    UN_LW_S_GCAL: '23/09/2020',
    UN_LW_S_TYPN: '09/10/2020',
    UN_LW_S_MRLT: '23/10/2020',
    UN_LW_S_BAHM: '14/11/2020',
    UN_LW_S_OMEG: '09/12/2020',
    UN_LW_S_PNIX: '08/01/2021',
    UN_LW_S_CORL: '22/01/2021',
    UN_LW_S_CBCL: '08/02/2021',
    UN_LW_S_ICDG: '22/02/2021',
    UN_LW_S_KRKN: '09/03/2021',
    UN_LW_S_DMCM: '07/04/2021',
    UN_FF7_S_SCPN: '01/05/2021'
  };

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private gridService: GridService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private skillService: SkillService,
    private nameService: NameService,
    private firestore: AngularFirestore
  ) {}

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
        esper.releaseDate = this[this.navService.getVersion() + '_releaseDates'][esper.dataId];
        espers.push(esper);
      });

      this[this.navService.getVersion() + '_espers'] = espers;
    }

    return this[this.navService.getVersion() + '_espers'];
  }

  async getEspersForListing(filters = null, sort = 'rarity', order = 'asc') {
    await this.getEspers();
    const espers = this.filterEspers(this[this.navService.getVersion() + '_espers'], filters);

    switch (sort) {
      case 'rarity' :
        this.toolService.sortByRarity(espers, order);
      break;
      case 'name' :
        this.toolService.sortByName(espers, order);
      break;
      case 'releaseDate' :
        this.toolService.sortByReleaseDate(espers, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return espers;
  }

  filterEspers(espers, filters) {
    if (filters) {
      const filteredEspers = [];

      espers.forEach(esper => {
        if ((filters.element.length === 0 || filters.element.indexOf(esper.element) !== -1)
          && (filters.rarity.length === 0 || filters.rarity.indexOf(esper.rarity) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(esper.dataId)) !== -1)
          && (!filters.threeStars || esper.SPs.length === 3)
        ) {
          filteredEspers.push(esper);
        }
      });

      return filteredEspers;
    } else {
      return espers;
    }
  }

  findRarity(esperId) {
    let rarity = 'N';
    Object.keys(this.espersRarity).forEach(rarityType => {
      if (this.espersRarity[rarityType].indexOf(esperId) !== -1) {
        rarity = rarityType;
      }
    });

    return rarity;
  }

  async getEspersForBuilder() {
    const espers = await this.getEspersForListing(null, 'rarity', 'asc');

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
    await this.getEspers();

    return this[this.navService.getVersion() + '_espers'].find(esper => esper.slug === slug);
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
    this.esper.grid = this.gridService.generateEsperGrid(this.esper, 1000);

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
