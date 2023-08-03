
import { Injectable } from '@angular/core';

import { TranslateService } from './translate.service';
import { GridService } from './grid.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { AuthService } from './auth.service';
import { SkillService } from './skill.service';
import { ApiService } from './api.service';

import { Esper } from '../entities/esper';

@Injectable()
export class EsperService {
  private espers: Esper[];
  esper;

  private lvTbl = {
    SR: [
      [0, 224, 500, 844, 1273, 1805, 2460, 3259, 4226, 5385, 6765, 8394, 10305, 12533, 15116, 18094, 21512, 25419, 29867, 34911, 40614, 47042, 54268, 62369, 71430, 81543, 92807, 105331, 119232, 134636, 151681, 170517, 191304, 214217, 239446, 267198, 297694, 331178, 367911, 408177, 452285, 500568, 553388, 611137, 674241, 743160, 818395, 900487, 990023, 1087639],
      [0, 784, 1633, 2558, 3569, 4677, 5893, 7230, 8702, 10322, 12105, 14067, 16226, 18599, 21205, 24065, 27199, 30631, 34385, 38486, 42962, 47842, 53157, 58939, 65223, 72046, 79447, 87467, 96151, 105547, 115703, 126673, 138513, 151281, 165042, 179864, 195817, 212978, 231427, 251251, 272539, 295389, 319903, 346190, 374366, 404553, 436882, 471491, 508528, 548148, 590519, 635815, 684225, 735947, 791192, 850184, 913162, 980378, 1052101, 1128617, 1210227, 1297254, 1390038, 1488944, 1594356, 1706683, 1826360, 1953848, 2089637, 2234249, 2388235, 2552183, 2726715, 2912495, 3110224, 3320650, 3544565, 3782812, 4036284, 4305932],
      [0, 28800, 58103, 87934, 118316, 149275, 180835, 213023, 245864, 279385, 313612, 348573, 384295, 420806, 458135, 496311, 535363, 575320, 616214, 658075, 700934, 744823, 789775, 835822, 882997, 931334, 980868, 1031634, 1083667, 1137004, 1191681, 1247736, 1305206, 1364129, 1424545, 1486493, 1550013, 1615147, 1681936, 1750421, 1820646, 1892654, 1966490, 2042198, 2119824, 2199415, 2281018, 2364680, 2450450, 2538378, 2628513, 2720907, 2815611, 2912678, 3012161, 3114114, 3218593, 3325654, 3435353, 3547749, 3662900, 3780866, 3901706, 4025483, 4152259, 4282097, 4415062, 4551220, 4690636, 4833379, 4979517, 5129120, 5282259, 5439006, 5599434, 5763618, 5931632, 6103553, 6279460, 6459431, 6643546, 6831887, 7024537, 7221581, 7423104, 7629192, 7839935, 8055421, 8275742, 8500990, 8731260, 8966646, 9207246, 9453159, 9704485, 9961325, 10223782, 10491961, 10765969]
    ],
    MR: [
      [0, 280, 625, 1055, 1591, 2255, 3073, 4071, 5279, 6727, 8451, 10487, 12875, 15659, 18887, 22609, 26881, 31764, 37323, 43628, 50756, 58791, 67823, 77949, 89275, 101916, 115996, 131651, 149027, 168282, 189588, 213132, 239115, 267756, 299292, 333981, 372101, 413955, 459871, 510203, 565337, 625690, 691714, 763900, 842779, 928927, 1022970, 1125584, 1237503, 1359523],
      [0, 980, 2041, 3197, 4460, 5844, 7364, 9035, 10874, 12898, 15126, 17578, 20276, 23242, 26499, 30073, 33990, 38279, 42971, 48097, 53692, 59792, 66435, 73662, 81517, 90045, 99296, 109321, 120176, 131920, 144615, 158327, 173126, 189086, 206287, 224814, 244755, 266206, 289267, 314046, 340656, 369218, 399860, 432718, 467937, 505670, 546081, 589342, 635638, 685163, 738126, 794746, 855258, 919910, 988966, 1062706, 1141428, 1225448, 1315101, 1410745, 1512757, 1621540, 1737520, 1861152, 1992916, 2133324, 2282920, 2442280, 2612016, 2792780, 2985262, 3190196, 3408361, 3640585, 3887746, 4150778, 4430671, 4728479, 5045319, 5382379],
      [0, 36000, 72629, 109917, 147895, 186594, 226045, 266280, 307332, 349233, 392017, 435718, 480370, 526009, 572670, 620390, 669205, 719152, 770269, 822595, 876169, 931031, 987221, 1044780, 1103749, 1164171, 1226089, 1289547, 1354589, 1421261, 1489608, 1559676, 1631513, 1705167, 1780687, 1858122, 1937522, 2018939, 2102425, 2188032, 2275813, 2365823, 2458118, 2552754, 2649787, 2749276, 2851280, 2955858, 3063071, 3172981, 3285650, 3401142, 3519522, 3640856, 3765210, 3892652, 4023251, 4157077, 4294201, 4434696, 4578635, 4726092, 4877143, 5031864, 5190334, 5352632, 5518839, 5689036, 5863307, 6041736, 6224409, 6411413, 6602837, 6798771, 6999307, 7204537, 7414555, 7629457, 7849341, 8074305, 8304449, 8539876, 8780689, 9026994, 9278898, 9536509, 9799937, 10069295, 10344696, 10626256, 10914093, 11208326, 11509077, 11816469, 12130626, 12451676, 12779748, 13114972, 13457483]
    ],
    UR: [
      [0, 350, 781, 1318, 1987, 2817, 3839, 5086, 6595, 8405, 10559, 13103, 16088, 19568, 23602, 28254, 33594, 39697, 46645, 54526, 63436, 73479, 84768, 97425, 111582, 127383, 144983, 164551, 186270, 210338, 236970, 266399, 298877, 334678, 374098, 417459, 465109, 517426, 574820, 637735, 706652, 782093, 864623, 954855, 1053453, 1161138, 1278691, 1406958, 1546856, 1699380],
      [0, 1224, 2550, 3994, 5572, 7301, 9200, 11288, 13586, 16116, 18901, 21966, 25338, 29045, 33116, 37583, 42479, 47840, 53704, 60111, 67104, 74728, 83031, 92064, 101882, 112542, 124105, 136636, 150204, 164883, 180751, 197890, 216388, 236338, 257839, 280997, 305923, 332736, 361562, 392535, 425797, 461499, 499801, 540873, 584896, 632062, 682575, 736651, 794520, 856426, 922629, 993404, 1069044, 1149859, 1236179, 1328354, 1426756, 1531780, 1643846, 1763400, 1890915, 2026893, 2171868, 2326407, 2491112, 2666622, 2853616, 3052815, 3264985, 3490939, 3731541, 3987708, 4260414, 4550693, 4859644, 5188433, 5538299, 5910558, 6306608, 6727933],
      [0, 45000, 90787, 137398, 184871, 233245, 282559, 332853, 384168, 436545, 490026, 544653, 600469, 657518, 715845, 775495, 836514, 898948, 962845, 1028253, 1095221, 1163799, 1234037, 1305986, 1379698, 1455226, 1532624, 1611947, 1693250, 1776590, 1862024, 1949610, 2039407, 2131475, 2225875, 2322669, 2421920, 2523692, 2628050, 2735059, 2844786, 2957299, 3072668, 3190963, 3312255, 3436617, 3564122, 3694845, 3828862, 3966250, 4107087, 4251453, 4399429, 4551097, 4706540, 4865843, 5029092, 5196375, 5367781, 5543400, 5723324, 5907646, 6096460, 6289862, 6487950, 6690823, 6898582, 7111329, 7329168, 7552205, 7780547, 8014303, 8253584, 8498502, 8749172, 9005710, 9268233, 9536861, 9811716, 10092921, 10380602, 10674886, 10975903, 11283785, 11598665, 11920679, 12249965, 12586663, 12930915, 13282866, 13642663, 14010455, 14386394, 14770634, 15163331, 15564644, 15974734, 16393765, 16821904]
    ]
  };


  constructor(
    private translateService: TranslateService,
    private apiService: ApiService,
    private gridService: GridService,
    private navService: NavService,
    private authService: AuthService,
    private skillService: SkillService,
    private toolService: ToolService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('espers', param, extraQuery)));
  }

  private async getApiPost(data = null) {
    return JSON.parse(JSON.stringify(await this.apiService.post('espers', data)));
  }

  private async getApiUser(type, extra = null) {
    switch (type) {
      case 'get':
        extra.push({name: 'type', value: 'espers'});
        return JSON.parse(JSON.stringify(await this.apiService.get('userData', null, extra)));
      break;
      case 'post':
        return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'espers', data: extra})));
      break;
      case 'delete':
        return JSON.parse(JSON.stringify(await this.apiService.delete('userData', {type: 'espers', storeId: extra})));
      break;
      default:
      break;
    }

    return null;
  }

  async getEspersForListingWithCosts(filters = null, sort = 'rarity', order = 'desc', options = null) {
    let apiResult = null;

    if (!options) {
      apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);
    } else {
      apiResult = await this.getApiPost(options);
    }

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

    const espers = this.filterEspers(rawEspers, filters, sort, order, true);

    return {
      rawEspers: rawEspers,
      espers: espers,
      costs: costs.sort((a, b) => b - a)
    };
  }

  async getEspersForListing(filters = null, sort = 'rarity', order = 'desc') {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);

    const rawEspers = [];

    for (const apiEsper of apiResult) {
      const rawEsper = new Esper();
      rawEsper.constructFromJson(apiEsper, this.translateService);
      rawEspers.push(rawEsper);
    }

    const espers = this.filterEspers(rawEspers, filters, sort, order, false);

    return espers;
  }

  async getEspersForBuilder() {
    const espers = await this.getApi(null, [{name: 'forBuilder', value: 1}]);

    if (espers && espers.length > 0) {
      return this.sortEspers(espers);
    }

    return [];
  }

  filterEspers(espers, rawFilters, sort, order, fromList) {
    let filters: any = {};

    if (rawFilters) {
      if (fromList) {
        Object.keys(rawFilters).forEach(filterSection => {
          rawFilters[filterSection].filters.forEach(filter => {
            if (filter.type === 'list') {
              filters[filter.id] = filter.values;
            } else if (filter.type === 'switch') {
              filters[filter.id] = filter.value;
            }
          });
        });
      } else {
        filters = rawFilters;
      }

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
      case 'updatedDate' :
        return this.toolService.sortByUpdatedDate(espers, order);
      break;
      default :
        console.log('not managed sort');
        return espers;
      break;
    }
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
    return localStorage.getItem('wotv-calc.' + this.getLocalStorage()) ? JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage())) : {};
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

      if (esper.storeId) {
        // @ts-ignore
        data.storeId = esper.storeId;
      }
    }

    return data;
  }

  async selectEsperForBuilder(esperId, customData = null, slug = null) {
    let apiResult = null;
    if (slug === null) {
      apiResult = await this.getApi(esperId, [{name: 'forBuilder', value: 1}, {name: 'byId', value: 1}]);
    } else {
      apiResult = await this.getApi(slug, [{name: 'forBuilder', value: 1}, {name: 'bySlug', value: 1}]);
    }

    if (apiResult.esper) {
      this.esper = new Esper();
      this.esper.constructFromJson(apiResult.esper, this.translateService);

      this.esper.rawSkills = apiResult.skills;

      for (const nodeId of Object.keys(this.esper.board.nodes)) {
        const node = this.esper.board.nodes[nodeId];
        this.esper.board.nodes[nodeId].skill = this.esper.rawSkills.find(searchedSkill => searchedSkill.dataId === node.dataId);
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
      this.esper.grid = this.gridService.generateEsperGrid(this.esper, 1000);

      return this.esper;
    }

    return null;
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

  async saveEsper(esper, method) {
    const savableData = this.getSavableData(esper);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        // @ts-ignore
        delete savableData.user;
      }

      const data = await this.getApiUser('post', savableData);

      if (method === 'new') {
        // @ts-ignore
        savableData.storeId = data.storeId;
        const savedEspers = this.getSavedEspers();

        if (savedEspers[esper.dataId]) {
          savedEspers[esper.dataId].push(savableData);
        } else {
          savedEspers[esper.dataId] = [savableData];
        }

        localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savedEspers));
      }
      this.esper.storeId = data.id;

      return data.storeId;
    } else {
      const data = await this.getApiUser('post', savableData);
      const savedEspers = this.getSavedEspers();
      savedEspers[esper.dataId].forEach((savedEsper, esperIndex) => {
        if (savedEsper.storeId === esper.storeId) {
          savedEspers[esper.dataId][esperIndex] = savableData;
          savedEspers[esper.dataId][esperIndex].storeId = esper.storeId;
        }
      });

      localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savedEspers));

      return esper.storeId;
    }
  }

  async deleteEsper(esper) {
    const data = await this.getApiUser('delete', esper.storeId);

    const savedEspers = this.getSavedEspers();

    savedEspers[esper.dataId].forEach((savedEsper, savedEsperIndex) => {
      if (savedEsper.storeId === esper.storeId) {
        savedEspers[esper.dataId].splice(savedEsperIndex, 1);
      }
    });

    localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savedEspers));
  }

  async getStoredEsper(storeId) {
    return await this.getApiUser('get', [{name: 'storeId', value: storeId}]);
  }

  async getExportableLink() {
    if (!this.esper.storeId || this.hasChangeBeenMade()) {
      return await this.saveEsper(this.esper, 'share');
    }

    return this.esper.storeId;
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

        delete oldData.resonance;
        delete newData.resonance;

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
    return this.toolService.isLimited(id);
  }

  getLevelFromExp(rarity, awake, exp) {
    let level = 0;
    let minusOne = false;

    for (level = 0; level <= this.lvTbl[rarity][awake - 1].length - 1; level++) {
      if (this.lvTbl[rarity][awake - 1][level] > exp) {
        minusOne = true;
        break;
      } if (this.lvTbl[rarity][awake - 1][level] === exp) {
        break;
      }
    }

    return level + (minusOne ? 0 : 1);
  }
}
