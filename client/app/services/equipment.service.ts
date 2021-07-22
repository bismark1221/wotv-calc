import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { NavService } from './nav.service';
import { NameService } from './name.service';
import { ToolService } from './tool.service';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { JobService } from './job.service';

import { Equipment } from '../entities/equipment';

@Injectable()
export class EquipmentService {
  private weaponTypes = [
    'DAGGER',
    'SWORD',
    'GREATSWORD',
    'KATANA',
    'ROD',
    'NINJABLADE',
    'BOW',
    'AXE',
    'SPEAR',
    'GUN',
    'MACE',
    'FIST',
    'GLOVE',
    'BOOK'
  ];

  private armorTypes = [
    'SHIELD',
    'ARMOR',
    'HAT',
    'HELM',
    'CLOTH',
    'ACC'
  ];

  private formatType = {
    'DAGGER': 'Dagger',
    'SWORD': 'Sword',
    'GREATSWORD': 'Great Sword',
    'KATANA': 'Katana',
    'ROD': 'Rod',
    'NINJABLADE': 'Ninja Blade',
    'BOW': 'Bow',
    'AXE': 'Axe',
    'SPEAR': 'Spear',
    'GUN': 'Gun',
    'MACE': 'Mace',
    'FIST': 'Fist',
    'SHIELD': 'Shield',
    'ARMOR': 'Armor',
    'HAT': 'Hat',
    'HELM': 'Helm',
    'CLOTH': 'Cloth',
    'ACC': 'Accessory',
    'GLOVE': 'Glove',
    'BOOK': 'Book'
  };

  private equipmentsAcquisition = {
    'AF_LW_RNG_005': 'RAID',
    'AF_LW_HLM_005': 'RAID',
    'AF_LW_CLT_005': 'RAID',
    'AF_LW_KAT_008': 'RAID',
    'AF_FF14_HLM_001': 'RAID',
    'AF_LW_ACC_002': 'RAID',
    'AF_LW_CLK_001': 'RAID',
    'AF_LW_ARW_001': 'RAID',
    'AF_LW_CLT_015': 'RAID',
    'AF_LW_CLT_016': 'RAID',
    'AF_LW_ARM_028': 'RAID',
    'AF_LW_ACC_036': 'RAID',
    'AF_LW_HAT_017': 'RAID',
    'AF_LW_ARM_032': 'RAID',
    'AF_LW_CLT_019': 'RAID',
    'AF_LW_ARM_031': 'RAID',

    'AF_LW_BSW_011': 'TOWER',
    'AF_FFT_SWO_002': 'TOWER',
    'AF_LW_RNG_007': 'TOWER',
    'AF_LW_ARW_005': 'TOWER',
    'AF_LW_RNG_009': 'TOWER',

    'AF_LW_SWO_016': 'FREE',

    'AF_LW_ACC_042': 'BINGO',

    'AF_LW_ACC_001': 'BOX_EVENT',
    'AF_LW_RNG_006': 'BOX_EVENT',

    'AF_SWO_FF14_TNCT': 'COLLABORATION',
    'AF_FFT_SWO_001': 'COLLABORATION',
    'AF_FF14_ARW_001': 'COLLABORATION',
    'AF_FF1_ARM_002': 'COLLABORATION',
    'AF_FF4_ARM_001': 'COLLABORATION',
    'AF_FFT_ACC_001': 'COLLABORATION',
    'AF_FF4_SPE_000': 'COLLABORATION',
    'AF_FF4_BOW_000': 'COLLABORATION',
    'AF_FF10_SWO_001': 'COLLABORATION',
    'AF_FF10_ROD_000': 'COLLABORATION',
    'AF_FF10_ACCE_001': 'COLLABORATION',
    'AF_FF10_BSW_000': 'COLLABORATION',
    'AF_NIER_KAT_000': 'COLLABORATION',
    'AF_NIER_SPE_000': 'COLLABORATION',
    'AF_NIER_ACCE_000': 'COLLABORATION',
    'AF_FF1_SWO_000': 'COLLABORATION',
    'AF_LW_ACC_040': 'COLLABORATION',
    'AF_FF7_ROD_000': 'COLLABORATION',
    'AF_FF7_ACC_003': 'COLLABORATION',
    'AF_FF7_BSW_000': 'COLLABORATION',
    'AF_FF15_SWO_000': 'COLLABORATION',
    'AF_FF15_GUN_000': 'COLLABORATION',

    'AF_LW_CLT_004': 'RECURRENT',
    'AF_LW_BSW_004': 'RECURRENT',
    'AF_LW_AXE_003': 'RECURRENT',
    'AF_LW_ARM_004': 'RECURRENT',
    'AF_LW_HLM_004': 'RECURRENT',
    'AF_LW_HAT_004': 'RECURRENT',
    'AF_LW_SWO_003': 'RECURRENT',
    'AF_LW_GUN_003': 'RECURRENT',
    'AF_LW_ROD_005': 'RECURRENT',
    'AF_LW_SPE_004': 'RECURRENT',
    'AF_LW_BSW_003': 'RECURRENT',
    'AF_LW_ARM_003': 'RECURRENT',
    'AF_LW_BOW_003': 'RECURRENT',
    'AF_LW_DAG_006': 'RECURRENT',
    'AF_LW_FIS_003': 'RECURRENT',
    'AF_LW_KAT_003': 'RECURRENT',
    'AF_LW_MAC_003': 'RECURRENT',
    'AF_LW_SWO_006': 'RECURRENT',
    'AF_LW_NKN_003': 'RECURRENT',
    'AF_LW_SPE_006': 'RECURRENT',
    'AF_LW_SWO_023': 'RECURRENT',
    'AF_LW_HAT_005': 'RECURRENT',
    'AF_LW_MAC_009': 'RECURRENT',
    'AF_LW_CLT_006': 'RECURRENT',
    'AF_LW_BOW_004': 'RECURRENT',
    'AF_LW_FIS_004': 'RECURRENT',
    'AF_LW_ROD_019': 'RECURRENT',
    'AF_LW_GLO_003': 'RECURRENT',
    'AF_LW_SWO_005': 'RECURRENT',
    'AF_LW_BOW_012': 'RECURRENT',
    'AF_LW_SPE_003': 'RECURRENT',
    'AF_LW_BOK_003': 'RECURRENT',
    'AF_LW_ROD_006': 'RECURRENT',
    'AF_LW_ACC_039': 'RECURRENT',
    'AF_LW_SWO_029': 'RECURRENT',
    'AF_LW_ACC_038': 'RECURRENT',
    'AF_LW_CLT_018': 'RECURRENT',
    'AF_LW_GUN_011': 'RECURRENT',
    'AF_LW_KAT_011': 'RECURRENT',
    'AF_LW_ACC_048': 'RECURRENT',
    'AF_LW_AXE_004': 'RECURRENT',

    'AF_LW_SWO_000': 'GENERAL_SHOP',
    'AF_LW_BSW_000': 'GENERAL_SHOP',
    'AF_LW_KAT_000': 'GENERAL_SHOP',
    'AF_LW_FIS_000': 'GENERAL_SHOP',
    'AF_LW_SPE_000': 'GENERAL_SHOP',
    'AF_LW_DAG_000': 'GENERAL_SHOP',
    'AF_LW_NKN_000': 'GENERAL_SHOP',
    'AF_LW_BOW_000': 'GENERAL_SHOP',
    'AF_LW_GUN_000': 'GENERAL_SHOP',
    'AF_LW_ROD_000': 'GENERAL_SHOP',
    'AF_LW_ROD_001': 'GENERAL_SHOP',
    'AF_LW_MAC_000': 'GENERAL_SHOP',
    'AF_LW_AXE_000': 'GENERAL_SHOP',
    'AF_LW_ARM_001': 'GENERAL_SHOP',
    'AF_LW_HLM_001': 'GENERAL_SHOP',
    'AF_LW_HAT_001': 'GENERAL_SHOP',
    'AF_LW_CLT_001': 'GENERAL_SHOP',
    'AF_LW_RNG_001': 'GENERAL_SHOP',
    'AF_LW_GLO_000': 'GENERAL_SHOP',
    'AF_LW_GLO_001': 'GENERAL_SHOP',
    'AF_LW_GLO_002': 'GENERAL_SHOP',
    'AF_LW_BOK_000': 'GENERAL_SHOP',
    'AF_LW_BOK_001': 'GENERAL_SHOP',
    'AF_LW_BOK_002': 'GENERAL_SHOP',

    'AF_LW_SWO_007': 'PACK'
  };

  private acquisitionTypesTranslation = {
    'GENERAL_SHOP': {
      'en': 'General Shop',
      'fr': 'Boutique ordinaire'
    },
    'RAID': {
      'en': 'Raid',
      'fr': 'Raid'
    },
    'TOWER': {
      'en': 'Tower',
      'fr': 'Tour'
    },
    'EVENT': {
      'en': 'Event',
      'fr': 'Évènement'
    },
    'BOX_EVENT': {
      'en': 'Box event',
      'fr': 'Évènement de box'
    },
    'COLLABORATION' : {
      'en': 'Collaboration event',
      'fr': 'Évènement de collaboration'
    },
    'RECURRENT': {
      'en': 'Recurrent event',
      'fr': 'Évènement récurrent'
    },
    'FREE': {
      'en': 'Free',
      'fr': 'Gratuit'
    },
    'PACK': {
      'en': 'Billing pack',
      'fr': 'Pack payant'
    },
    'BINGO': {
      'en': 'Bingo',
      'fr': 'Bingo'
    }
  };

  private savedEquipments = {};

  private JP_equipments: Equipment[];
  private GL_equipments: Equipment[];
  equipment;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private apiService: ApiService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private nameService: NameService,
    private jobService: JobService,
    private firestore: AngularFirestore
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('equipments', param, extraQuery)));
  }

  async getEquipmentForListingWithAcquisitionTypes(filters = null, sort = 'rarity', order = 'desc') {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);

    const rawEquipments = [];
    const acquisitionTypes = ['Unknown', 'tmr'];
    const equipmentTypes = [];

    for (const apiEquipment of apiResult.equipments) {
      const rawEquipment = new Equipment();
      rawEquipment.constructFromJson(apiEquipment, this.translateService);
      if (this.equipmentsAcquisition[rawEquipment.dataId]) {
        rawEquipment.acquisition.type = this.acquisitionTypesTranslation[this.equipmentsAcquisition[rawEquipment.dataId]];
      }
      rawEquipments.push(rawEquipment);

      if (rawEquipment.acquisition.type !== 'Unknown' && rawEquipment.acquisition.type !== 'tmr') {
        const acquisition = rawEquipment.acquisition.type[this.translateService.getDefaultLang()];

        if (acquisitionTypes.indexOf(acquisition) === -1) {
          acquisitionTypes.push(acquisition);
        }
      }

      Object.keys(rawEquipment.grows).forEach(growId => {
        const grow = rawEquipment.grows[growId].names[this.translateService.getDefaultLang()];

        if (grow !== 'ARTIFACT_50' && grow !== 'ARTIFACT_TRUST' && equipmentTypes.indexOf(growId + '###' + grow) === -1) {
          equipmentTypes.push(growId + '###' + grow);
        }
      });
    }

    const jobs = [];
    for (const rawJob of apiResult.jobs) {
      if (rawJob.statsModifiers && rawJob.statsModifiers.length > 10) {
        rawJob.name = this.nameService.getName(rawJob);
        jobs.push(rawJob);
      }
    }

    const equipments = this.filterEquipments(rawEquipments, filters, sort, order);

    return {
      rawEquipments: rawEquipments,
      equipments: equipments,
      acquisitionTypes: acquisitionTypes,
      equipmentTypes: equipmentTypes,
      jobs: this.jobService.getUniqJobsByIds(jobs)
    };
  }

  private getRaw() {
    return this.dataService.loadData('equipments');
  }

  async getEquipments() {
    if (this[this.navService.getVersion() + '_equipments'] === null || this[this.navService.getVersion() + '_equipments'] === undefined) {
      const equipments: Equipment[] = [];
      const rawEquipments = JSON.parse(JSON.stringify(await this.getRaw()));

      Object.keys(rawEquipments).forEach(equipmentId => {
        const equipment = new Equipment();
        equipment.constructFromJson(rawEquipments[equipmentId], this.translateService);

        if (this.equipmentsAcquisition[equipment.dataId]) {
          equipment.acquisition.type = this.acquisitionTypesTranslation[this.equipmentsAcquisition[equipment.dataId]];
        }

        equipments.push(equipment);
      });

      this[this.navService.getVersion() + '_equipments'] = equipments;
    }

    return this[this.navService.getVersion() + '_equipments'];
  }

  async getEquipmentsForListing(filters = null, sort = 'rarity', order = 'desc') {
    await this.getEquipments();
    const equipments = this.filterEquipments(this[this.navService.getVersion() + '_equipments'], filters, sort, order);

    return equipments;
  }

  filterEquipments(equipments, filters, sort = 'rarity', order = 'desc') {
    if (filters) {
      const filteredEquipments = [];

      equipments.forEach(equipment => {
        if ((!filters.type || filters.type.length === 0 || filters.type.indexOf(equipment.type) !== -1)
          && (!filters.rarity || filters.rarity.length === 0 || filters.rarity.indexOf(equipment.rarity) !== -1)
          && (!filters.acquisition || filters.acquisition.length === 0 || filters.acquisition.indexOf(equipment.acquisition.type) !== -1 || filters.acquisition.indexOf(equipment.acquisition.type[this.translateService.getDefaultLang()]) !== -1)
          && (!filters.category || filters.category.length === 0 || filters.category.length === 3 || (filters.category.indexOf('acc') !== -1 && equipment.type === 'ACC') || (filters.category.indexOf('weapon') !== -1 && this.isWeapon(equipment.type)) || (filters.category.indexOf('armor') !== -1 && this.isArmor(equipment.type, true)))
        ) {
          let possbibleToAdd = true;

          if (filters.job && filters.job.length > 0) {
            possbibleToAdd = this.equipmentHasJob(equipment, filters);
          }

          if (filters.equipmentTypes && filters.equipmentTypes.length > 0) {
            possbibleToAdd = this.equipmentHasGrow(equipment, filters);
          }

          if (possbibleToAdd) {
            filteredEquipments.push(equipment);
          }
        }
      });

      return this.sortEquipments(filteredEquipments, sort, order);
    } else {
      return this.sortEquipments(equipments, sort, order);
    }
  }

  sortEquipments(equipments, sort = 'rarity', order = 'desc') {
    switch (sort) {
      case 'rarity' :
        return this.toolService.sortByRarity(equipments, order);
      break;
      case 'name' :
        return this.toolService.sortByName(equipments, order);
      break;
      case 'releaseDate' :
        return this.toolService.sortByReleaseDate(equipments, order);
      break;
      default :
        console.log('not managed sort');
        return equipments;
      break;
    }
  }

  private equipmentHasJob(equipment, filters) {
    let equipmentHasJob = false;

    equipment.equippableJobs.forEach(jobId => {
      const tableJob = jobId.split('_');
      if (filters.job.length === 0 || filters.job.indexOf(tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2] + (tableJob[3] && tableJob[3] === '01' ? '_01' : '')) !== -1) {
        equipmentHasJob = true;
      }
    });

    return equipmentHasJob;
  }

  private equipmentHasGrow(equipment, filters) {
    let equipmentHasGrow = false;

    Object.keys(equipment.grows).forEach(growId => {
      if (filters.equipmentTypes.length === 0 || filters.equipmentTypes.indexOf(growId + '###' + equipment.grows[growId].names[this.translateService.getDefaultLang()]) !== -1) {
        equipmentHasGrow = true;
      }
    });

    return equipmentHasGrow;
  }

  async getEquipmentBySlug(slug: string) {
    const apiResult = await this.getApi(slug, [{name: 'forDetail', value: 1}]);

    if (apiResult.equipment) {
      const equipment = new Equipment();
      equipment.constructFromJson(apiResult.equipment, this.translateService);

      if (this.equipmentsAcquisition[equipment.dataId]) {
        equipment.acquisition.type = this.acquisitionTypesTranslation[this.equipmentsAcquisition[equipment.dataId]];
      }

      equipment.rawSkills = apiResult.skills;
      equipment.rawJobs = apiResult.jobs;
      equipment.rawUnits = apiResult.units;
      equipment.rawItems = apiResult.items;

      for (const item of equipment.rawItems) {
        item.name = this.nameService.getName(item);
      }

      this.formatSkillsWithApi(equipment);

      return equipment;
    } else {
      return null;
    }
  }

  async formatSkillsWithApi(equipment) {
    equipment.formattedSkills = [];
    for (const equipmentLvl of equipment.skills) {
      const formattedSkills = [];
      for (const skillData of equipmentLvl) {
        const formattedSkill = equipment.rawSkills.find(searchedSkill => searchedSkill.dataId === skillData.dataId);
        formattedSkill.upgrade = skillData.upgrade;
        formattedSkill.grow = skillData.grow;
        formattedSkill.maxLevel = skillData.maxLevel;

        formattedSkills.push(formattedSkill);
      }

      equipment.formattedSkills.push(formattedSkills);
    }
  }

  async formatSkills(equipment) {
    equipment.formattedSkills = [];
    for (const equipmentLvl of equipment.skills) {
      const formattedSkills = [];
      for (const skillData of equipmentLvl) {
        const formattedSkill = await this.skillService.getSkill(skillData.dataId);
        formattedSkill.upgrade = skillData.upgrade;
        formattedSkill.grow = skillData.grow;
        formattedSkill.maxLevel = skillData.maxLevel;

        formattedSkills.push(formattedSkill);
      }

      equipment.formattedSkills.push(formattedSkills);
    }
  }

  async getEquipment(id: string) {
    await this.getEquipments();

    return this[this.navService.getVersion() + '_equipments'].find(equipment => equipment.dataId === id);
  }

  isWeapon(type) {
    return this.weaponTypes.indexOf(type) !== -1 ? true : false;
  }

  isArmor(type, excludeAcc = false) {
    return this.armorTypes.indexOf(type) !== -1 && (!excludeAcc || (excludeAcc && type !== 'ACC')) ? true : false;
  }

  getFormatType(type) {
    return this.formatType[type];
  }

  async getEquipmentsForUnitBuilder() {
    const equipments = await this.getEquipmentsForListing(null, 'rarity', 'desc');

    const formattedEquipmentsForBuilder = [];
    equipments.forEach(equipment => {
      formattedEquipmentsForBuilder.push(equipment);
    });

    return formattedEquipmentsForBuilder;
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_equipments' : 'equipments';
  }

  getSavedEquipments() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(equipment, onlyEquipment = true) {
    const data = {
      dataId: equipment.dataId,
      upgrade: equipment.upgrade,
      grow: equipment.grow,
      level: equipment.level,
      stats: {},
      skill: {}
    };

    Object.keys(equipment.stats).forEach(stat => {
      data.stats[stat] = equipment.stats[stat].selected ? equipment.stats[stat].selected : 0;
    });

    equipment.skill.forEach(skill => {
      data.skill[skill.dataId] = skill.level;
    });

    if (onlyEquipment) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;
      // @ts-ignore
      data.customName = equipment.customName ? equipment.customName : '';
    }

    return data;
  }

  async selectEquipmentForBuilder(equipmentId, customData = null) {
    this.equipment = new Equipment();
    this.equipment.constructFromJson(JSON.parse(JSON.stringify(await this.getEquipment(equipmentId))), this.translateService);
    this.equipment.name = this.equipment.getName(this.translateService);

    this.equipment.name = this.equipment.getName(this.translateService);
    this.equipment.upgrade = 0;
    this.equipment.level = 1;

    await this.formatSkills(this.equipment);

    if (this.equipment.formattedSkills[0] && this.equipment.formattedSkills[0][0] && this.equipment.formattedSkills[0][0].type === 'skill') {
      this.equipment.formattedSkills[0][0].level = 1;
    }
    this.equipment.growIds = Object.keys(this.equipment.grows);
    this.equipment.grow = this.equipment.growIds[0];

    this.initiateSavedEquipment(customData);
    this.equipment.updateMaxStat(this.nameService, this.skillService, this.rangeService);

    this.equipment.changeLevel(this.skillService, this.rangeService);
    this.equipment.changeUpgrade(this.skillService, this.rangeService);
    this.equipment.changeGrow();

    this.equipmentCategory();

    return this.equipment;
  }

  private initiateSavedEquipment(customData = null) {
    const equipment = customData;

    if (equipment) {
      this.equipment.upgrade = equipment.upgrade;
      this.equipment.grow = equipment.grow;
      this.equipment.storeId = equipment.storeId ? equipment.storeId : null;
      this.equipment.customName = equipment.customName ? equipment.customName : '';

      if (!this.equipment.grows[this.equipment.grow]) {
        this.equipment.grow = this.equipment.growIds[0];
      }

      this.equipment.level = equipment.level;

      Object.keys(equipment.stats).forEach(stat => {
        if (this.equipment.stats[stat]) {
          this.equipment.stats[stat].selected = equipment.stats[stat];
        }
      });

      Object.keys(equipment.skill).forEach(skillId => {
        this.equipment.formattedSkills.forEach(skill => {
          skill.forEach(subSkill => {
            if (subSkill.dataId === skillId) {
              subSkill.level = equipment.skill[skillId];
            }
          });
        });
      });
    }
  }

  equipmentAlreadyExists(equipment) {
    const savedEquipments = this.getSavedEquipments();
    let equipmentFinded = false;

    if (savedEquipments[equipment.dataId]) {
      savedEquipments[equipment.dataId].forEach(savedEquipment => {
        if (savedEquipment.customName === equipment.customName) {
          equipmentFinded = true;
        }
      });
    }

    return equipmentFinded;
  }

  saveEquipment(equipment, method) {
    const savableData = this.getSavableData(equipment);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        // @ts-ignore
        delete savableData.user;
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method === 'new') {
          // @ts-ignore
          savableData.storeId = data.id;
          const savedEquipments = this.getSavedEquipments();

          if (savedEquipments[equipment.dataId]) {
            savedEquipments[equipment.dataId].push(savableData);
          } else {
            savedEquipments[equipment.dataId] = [savableData];
          }

          this.localStorageService.set(this.getLocalStorage(), savedEquipments);
        }

        this.equipment.storeId = data.id;

        return data.id;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(equipment.storeId).set(savableData).then(data => {
        const savedEquipments = this.getSavedEquipments();
        savedEquipments[equipment.dataId].forEach((savedEquipment, equipmentIndex) => {
          if (savedEquipment.storeId === equipment.storeId) {
            savedEquipments[equipment.dataId][equipmentIndex] = savableData;
            savedEquipments[equipment.dataId][equipmentIndex].storeId = equipment.storeId;
          }
        });

        this.localStorageService.set(this.getLocalStorage(), savedEquipments);

        return equipment.storeId;
      });
    }
  }

  deleteEquipment(equipment) {
    this.firestore.collection(this.getLocalStorage()).doc(equipment.storeId).delete();

    const savedEquipments = this.getSavedEquipments();

    savedEquipments[equipment.dataId].forEach((savedEquipment, savedEquipmentIndex) => {
      if (savedEquipment.storeId === equipment.storeId) {
        savedEquipments[equipment.dataId].splice(savedEquipmentIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedEquipments);
  }

  getStoredEquipment(dataId) {
    const document = this.firestore.collection(this.getLocalStorage()).doc(dataId);

    return document.valueChanges();
  }

  getExportableLink() {
    if (!this.equipment.storeId || this.hasChangeBeenMade()) {
      return this.saveEquipment(this.equipment, 'share');
    }

    return new Promise((resolve, reject) => {
      resolve(this.equipment.storeId);
    });
  }

  hasChangeBeenMade() {
    if (this.equipment.storeId) {
      const newData = this.getSavableData(this.equipment);
      let oldData = null;

      if (this.getSavedEquipments()[this.equipment.dataId]) {
        this.getSavedEquipments()[this.equipment.dataId].forEach(savedEquipment => {
          if (savedEquipment.storeId === this.equipment.storeId) {
            oldData = savedEquipment;
            delete oldData.storeId;
          }
        });

        return !this.toolService.equal(oldData, newData);
      }
    }

    return true;
  }

  changeUpgrade(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.changeUpgrade(this.skillService, this.rangeService);
  }

  changeGrow(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.changeGrow();
  }

  changeLevel(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.changeLevel(this.skillService, this.rangeService);
  }

  changeSkillLevel(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.changeSkillLevel(this.skillService, this.rangeService);
  }

  maxEquipment(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.maxEquipment(this.skillService, this.rangeService);
  }

  resetEquipment(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.resetEquipment(this.skillService, this.rangeService);
  }

  private equipmentCategory() {
    let category = null;
    if (this.isWeapon(this.equipment.type)) {
      category = 'weapon';
    } else {
      if (this.equipment.type === 'ACC') {
        category = 'acc';
      } else {
        category = 'armor';
      }
    }

    this.equipment.category = category;
  }

  async getAcquisitionTypes() {
    await this.getEquipments();

    const acquisitionTypes = ['Unknown', 'tmr'];
    const equipmentTypes = [];

    this[this.navService.getVersion() + '_equipments'].forEach(equipment => {
      if (equipment.acquisition.type !== 'Unknown' && equipment.acquisition.type !== 'tmr') {
        const acquisition = equipment.acquisition.type[this.translateService.getDefaultLang()];

        if (acquisitionTypes.indexOf(acquisition) === -1) {
          acquisitionTypes.push(acquisition);
        }
      }

      Object.keys(equipment.grows).forEach(growId => {
        const grow = equipment.grows[growId].names[this.translateService.getDefaultLang()];

        if (grow !== 'ARTIFACT_50' && grow !== 'ARTIFACT_TRUST' && equipmentTypes.indexOf(growId + '###' + grow) === -1) {
          equipmentTypes.push(growId + '###' + grow);
        }
      });
    });

    return {
      acquisitionTypes: acquisitionTypes,
      equipmentTypes: equipmentTypes
    };
  }
}
