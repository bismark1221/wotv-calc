import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { JobService } from './job.service';
import { MateriaService } from './materia.service';

import { Equipment } from '../entities/equipment';
import { Materia } from '../entities/materia';

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
    DAGGER: 'Dagger',
    SWORD: 'Sword',
    GREATSWORD: 'Great Sword',
    KATANA: 'Katana',
    ROD: 'Rod',
    NINJABLADE: 'Ninja Blade',
    BOW: 'Bow',
    AXE: 'Axe',
    SPEAR: 'Spear',
    GUN: 'Gun',
    MACE: 'Mace',
    FIST: 'Fist',
    SHIELD: 'Shield',
    ARMOR: 'Armor',
    HAT: 'Hat',
    HELM: 'Helm',
    CLOTH: 'Cloth',
    ACC: 'Accessory',
    GLOVE: 'Glove',
    BOOK: 'Book'
  };

  private equipmentsAcquisition = {
    AF_LW_RNG_005: 'RAID',
    AF_LW_HLM_005: 'RAID',
    AF_LW_CLT_005: 'RAID',
    AF_LW_KAT_008: 'RAID',
    AF_FF14_HLM_001: 'RAID',
    AF_LW_ACC_002: 'RAID',
    AF_LW_CLK_001: 'RAID',
    AF_LW_ARW_001: 'RAID',
    AF_LW_CLT_015: 'RAID',
    AF_LW_CLT_016: 'RAID',
    AF_LW_ARM_028: 'RAID',
    AF_LW_ACC_036: 'RAID',
    AF_LW_HAT_017: 'RAID',
    AF_LW_ARM_032: 'RAID',
    AF_LW_CLT_019: 'RAID',
    AF_LW_ARM_031: 'RAID',
    AF_LW_CLT_021: 'RAID',
    AF_LW_CLT_022: 'RAID',

    AF_LW_BSW_011: 'TOWER',
    AF_FFT_SWO_002: 'TOWER',
    AF_LW_RNG_007: 'TOWER',
    AF_LW_ARW_005: 'TOWER',
    AF_LW_RNG_009: 'TOWER',

    AF_LW_SWO_016: 'FREE',

    AF_LW_ACC_042: 'BINGO',

    AF_LW_ACC_001: 'BOX_EVENT',
    AF_LW_RNG_006: 'BOX_EVENT',
    AF_FF15_ACC_001: 'BOX_EVENT',

    AF_SWO_FF14_TNCT: 'COLLABORATION',
    AF_FFT_SWO_001: 'COLLABORATION',
    AF_FF14_ARW_001: 'COLLABORATION',
    AF_FF1_ARM_002: 'COLLABORATION',
    AF_FF4_ARM_001: 'COLLABORATION',
    AF_FFT_ACC_001: 'COLLABORATION',
    AF_FF4_SPE_000: 'COLLABORATION',
    AF_FF4_BOW_000: 'COLLABORATION',
    AF_FF10_SWO_001: 'COLLABORATION',
    AF_FF10_ROD_000: 'COLLABORATION',
    AF_FF10_ACCE_001: 'COLLABORATION',
    AF_FF10_BSW_000: 'COLLABORATION',
    AF_NIER_KAT_000: 'COLLABORATION',
    AF_NIER_SPE_000: 'COLLABORATION',
    AF_NIER_ACCE_000: 'COLLABORATION',
    AF_FF1_SWO_000: 'COLLABORATION',
    AF_LW_ACC_040: 'COLLABORATION',
    AF_FF7_ROD_000: 'COLLABORATION',
    AF_FF7_ACC_003: 'COLLABORATION',
    AF_FF7_BSW_000: 'COLLABORATION',
    AF_FF15_SWO_000: 'COLLABORATION',
    AF_FF15_GUN_000: 'COLLABORATION',

    AF_LW_CLT_004: 'RECURRENT',
    AF_LW_BSW_004: 'RECURRENT',
    AF_LW_AXE_003: 'RECURRENT',
    AF_LW_ARM_004: 'RECURRENT',
    AF_LW_HLM_004: 'RECURRENT',
    AF_LW_HAT_004: 'RECURRENT',
    AF_LW_SWO_003: 'RECURRENT',
    AF_LW_GUN_003: 'RECURRENT',
    AF_LW_ROD_005: 'RECURRENT',
    AF_LW_SPE_004: 'RECURRENT',
    AF_LW_BSW_003: 'RECURRENT',
    AF_LW_ARM_003: 'RECURRENT',
    AF_LW_BOW_003: 'RECURRENT',
    AF_LW_DAG_006: 'RECURRENT',
    AF_LW_FIS_003: 'RECURRENT',
    AF_LW_KAT_003: 'RECURRENT',
    AF_LW_MAC_003: 'RECURRENT',
    AF_LW_SWO_006: 'RECURRENT',
    AF_LW_NKN_003: 'RECURRENT',
    AF_LW_SPE_006: 'RECURRENT',
    AF_LW_SWO_023: 'RECURRENT',
    AF_LW_HAT_005: 'RECURRENT',
    AF_LW_MAC_009: 'RECURRENT',
    AF_LW_CLT_006: 'RECURRENT',
    AF_LW_BOW_004: 'RECURRENT',
    AF_LW_FIS_004: 'RECURRENT',
    AF_LW_ROD_019: 'RECURRENT',
    AF_LW_GLO_003: 'RECURRENT',
    AF_LW_SWO_005: 'RECURRENT',
    AF_LW_BOW_012: 'RECURRENT',
    AF_LW_SPE_003: 'RECURRENT',
    AF_LW_BOK_003: 'RECURRENT',
    AF_LW_ROD_006: 'RECURRENT',
    AF_LW_ACC_039: 'RECURRENT',
    AF_LW_SWO_029: 'RECURRENT',
    AF_LW_ACC_038: 'RECURRENT',
    AF_LW_CLT_018: 'RECURRENT',
    AF_LW_GUN_011: 'RECURRENT',
    AF_LW_KAT_011: 'RECURRENT',
    AF_LW_ACC_048: 'RECURRENT',
    AF_LW_AXE_004: 'RECURRENT',
    AF_FF15_SPE_000: 'RECURRENT',

    AF_LW_SWO_000: 'GENERAL_SHOP',
    AF_LW_BSW_000: 'GENERAL_SHOP',
    AF_LW_KAT_000: 'GENERAL_SHOP',
    AF_LW_FIS_000: 'GENERAL_SHOP',
    AF_LW_SPE_000: 'GENERAL_SHOP',
    AF_LW_DAG_000: 'GENERAL_SHOP',
    AF_LW_NKN_000: 'GENERAL_SHOP',
    AF_LW_BOW_000: 'GENERAL_SHOP',
    AF_LW_GUN_000: 'GENERAL_SHOP',
    AF_LW_ROD_000: 'GENERAL_SHOP',
    AF_LW_ROD_001: 'GENERAL_SHOP',
    AF_LW_MAC_000: 'GENERAL_SHOP',
    AF_LW_AXE_000: 'GENERAL_SHOP',
    AF_LW_ARM_001: 'GENERAL_SHOP',
    AF_LW_HLM_001: 'GENERAL_SHOP',
    AF_LW_HAT_001: 'GENERAL_SHOP',
    AF_LW_CLT_001: 'GENERAL_SHOP',
    AF_LW_RNG_001: 'GENERAL_SHOP',
    AF_LW_GLO_000: 'GENERAL_SHOP',
    AF_LW_GLO_001: 'GENERAL_SHOP',
    AF_LW_GLO_002: 'GENERAL_SHOP',
    AF_LW_BOK_000: 'GENERAL_SHOP',
    AF_LW_BOK_001: 'GENERAL_SHOP',
    AF_LW_BOK_002: 'GENERAL_SHOP',

    AF_LW_SWO_007: 'PACK'
  };

  private acquisitionTypesTranslation = {
    GENERAL_SHOP: {
      en: 'General Shop',
      fr: 'Boutique ordinaire'
    },
    RAID: {
      en: 'Raid',
      fr: 'Raid'
    },
    TOWER: {
      en: 'Tower',
      fr: 'Tour'
    },
    EVENT: {
      en: 'Event',
      fr: 'Évènement'
    },
    BOX_EVENT: {
      en: 'Box event',
      fr: 'Évènement de box'
    },
    COLLABORATION : {
      en: 'Collaboration event',
      fr: 'Évènement de collaboration'
    },
    RECURRENT: {
      en: 'Recurrent event',
      fr: 'Évènement récurrent'
    },
    FREE: {
      en: 'Free',
      fr: 'Gratuit'
    },
    PACK: {
      en: 'Billing pack',
      fr: 'Pack payant'
    },
    BINGO: {
      en: 'Bingo',
      fr: 'Bingo'
    }
  };

  lvTbl = [0, 70, 624, 1565, 2862, 4510, 6516, 8891, 11648, 14801, 18365, 22354, 26784, 31670, 37028, 42874, 49224, 56094, 63501, 71463, 79997, 89120, 98850, 109205, 120204, 131866, 144210, 157255, 171021, 185528, 200796, 216846, 233699, 251377, 269902, 289296, 309582, 330783, 352922, 376023, 400110, 425208, 451342, 478538, 506822, 536221, 566762, 598473, 631382, 665517, 700908, 737585, 775578, 814918, 855637, 897767, 941341, 986392, 1032954, 1081062, 1130752, 1182061, 1235026, 1289684, 1346074, 1404236, 1464210, 1526037, 1589759, 1655419, 1723061, 1792730, 1864472, 1938333, 2014362, 2092608, 2173121, 2255952, 2341153, 2428778, 2518882, 2611521, 2706753, 2804637, 2905234, 3008605, 3114814, 3223925, 3336005, 3451122, 3569346, 3690749, 3815404, 3943387, 4074775, 4209647, 4348085, 4490172, 4635995, 4785642];

  private savedEquipments = {};

  private JP_equipments: Equipment[];
  private GL_equipments: Equipment[];
  equipment;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private jobService: JobService,
    private materiaService: MateriaService,
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
      if (this.getAcquisition(rawEquipment)) {
        rawEquipment.acquisition.type = this.acquisitionTypesTranslation[this.getAcquisition(rawEquipment)];
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
        rawJob.name = this.toolService.getName(rawJob);
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

  getAcquisition(equipment) {
    if (this.equipmentsAcquisition[equipment.dataId]) {
      return this.equipmentsAcquisition[equipment.dataId];
    }

    const unknowEquipment = [
      'AF_LW_ARW_003',
      'AF_LW_SHI_002',
      'AF_LW_SHI_003',
      'AF_LW_SHI_004',
      'AF_LW_SHI_001',
      'AF_LW_SHI_005'
    ];

    if (unknowEquipment.indexOf(equipment.dataId) !== -1) {
      return null;
    }

    if (equipment.acquisition.type === 'Unknown'
      && equipment.dataId.split('_')[equipment.dataId.split('_').length - 1] !== '2'
      && equipment.dataId.split('_')[equipment.dataId.split('_').length - 1] !== 'INIT'
    ) {
      return 'RECURRENT';
    }

    return null;
  }

  async getEquipmentsForBuilder() {
    const rawEquipments = await this.getApi(null, [{name: 'forBuilder', value: 1}]);

    if (rawEquipments && rawEquipments.length > 0) {
      const equipments = [];

      for (const rawEquipment of rawEquipments) {
        if (this.getAcquisition(rawEquipment) || rawEquipment.acquisition.type !== 'Unknown') {
          equipments.push(rawEquipment);
        }
      }

      return this.sortEquipments(equipments);
    }

    return [];
  }


  async getEquipmentForInventory() {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);

    const rawEquipments = [];
    const acquisitionTypes = ['tmr'];

    for (const apiEquipment of apiResult.equipments) {
      const rawEquipment = new Equipment();
      rawEquipment.constructFromJson(apiEquipment, this.translateService);
      if (this.getAcquisition(rawEquipment) || rawEquipment.acquisition.type !== 'Unknown') {
        if (this.getAcquisition(rawEquipment)) {
          rawEquipment.acquisition.type = this.acquisitionTypesTranslation[this.getAcquisition(rawEquipment)];
        }

        rawEquipments.push(rawEquipment);

        if (rawEquipment.acquisition.type !== 'Unknown' && rawEquipment.acquisition.type !== 'tmr') {
          const acquisition = rawEquipment.acquisition.type[this.translateService.getDefaultLang()];

          if (acquisitionTypes.indexOf(acquisition) === -1) {
            acquisitionTypes.push(acquisition);
          }
        }
      }
    }

    return {
      rawEquipments: this.sortEquipments(rawEquipments),
      equipments: this.filterEquipments(rawEquipments, {}),
      acquisitionTypes: acquisitionTypes
    };
  }

  async getEquipmentsForUnitBuilder(rawData = null) {
    if (rawData && rawData.equipments && rawData.equipments.length > 0) {
      return rawData;
    }

    const equipments = await this.getApi(null, [{name: 'forModal', value: 1}]);

    const acquisitionTypes = ['Unknown', 'tmr'];

    for (const equipment of equipments) {
      if (this.getAcquisition(equipment)) {
        equipment.acquisition.type = this.acquisitionTypesTranslation[this.getAcquisition(equipment)];

        if (acquisitionTypes.indexOf(equipment.acquisition.type[this.translateService.getDefaultLang()]) === -1) {
          acquisitionTypes.push(equipment.acquisition.type[this.translateService.getDefaultLang()]);
        }
      }


      if (equipment.acquisition.type !== 'Unknown'
        && equipment.acquisition.type !== 'tmr'
        && acquisitionTypes.indexOf(equipment.acquisition.type[this.translateService.getDefaultLang()]) === -1
      ) {
        acquisitionTypes.push(equipment.acquisition.type[this.translateService.getDefaultLang()]);
      }
    }

    return {
      equipments: this.sortEquipments(equipments),
      acquisitionTypes: acquisitionTypes
    };
  }

  async getEquipmentsFromMaterialLookup() {
    const apiResult = await this.getApi(null, [{name: 'forMaterialLookup', value: 1}]);

    if (apiResult.equipments && apiResult.equipments.length > 0) {
      const rawItems = {};
      for (const item of apiResult.items) {
        if (item.type !== 'recipe' && item.dataId.slice(0, 9) !== 'IT_AF_AW_') {
          item.equipments = [];
          rawItems[item.dataId] = item;
        }
      }

      for (const equipment of apiResult.equipments) {
        if (equipment.materials && equipment.materials.length > 0 && Object.keys(equipment.materials[0]).length > 0) {
          for (const materialLevel of equipment.materials) {
            for (const itemId of Object.keys(materialLevel)) {
              if (rawItems[itemId] && !rawItems[itemId].equipments.find(searchedEquipment => searchedEquipment.dataId === equipment.dataId)) {
                rawItems[itemId].equipments.push(equipment);
              }
            }
          }
        }
      }

      const items = [];
      for (const itemId of Object.keys(rawItems)) {
        items.push(rawItems[itemId]);
      }

      return items;
    }

    return [];
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

      if (this.getAcquisition(equipment)) {
        equipment.acquisition.type = this.acquisitionTypesTranslation[this.getAcquisition(equipment)];
      }

      equipment.rawSkills = apiResult.skills;
      equipment.rawJobs = apiResult.jobs;
      equipment.rawUnits = apiResult.units;
      equipment.rawItems = apiResult.items;

      for (const item of equipment.rawItems) {
        item.name = this.toolService.getName(item);
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
        formattedSkill.cond = skillData.cond;

        formattedSkills.push(formattedSkill);
      }

      equipment.formattedSkills.push(formattedSkills);
    }
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
      skill: {},
      materias: {}
    };

    if (equipment.stats) {
      Object.keys(equipment.stats).forEach(stat => {
        data.stats[stat] = equipment.stats[stat].selected ? equipment.stats[stat].selected : 0;
      });
    }

    if (equipment.skill) {
      equipment.skill.forEach(skill => {
        data.skill[skill.dataId] = skill.level;
      });
    }

    if (equipment.materias) {
      Object.keys(equipment.materias).forEach(materiaType => {
        if (equipment.materias[materiaType]) {
          data.materias[materiaType] = this.materiaService.getSavableData(equipment.materias[materiaType], false);
        } else {
          data.materias[materiaType] = null;
        }
      });
    }

    if (onlyEquipment) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;
      // @ts-ignore
      data.customName = equipment.customName ? equipment.customName : '';
    }

    return data;
  }

  async selectEquipmentForBuilder(equipmentId, customData = null, slug = null) {
    let apiResult = null;
    if (slug === null) {
      apiResult = await this.getApi(equipmentId, [{name: 'forBuilder', value: 1}, {name: 'byId', value: 1}]);
    } else {
      apiResult = await this.getApi(slug, [{name: 'forBuilder', value: 1}, {name: 'bySlug', value: 1}]);
    }

    if (apiResult.equipment) {
      this.equipment = new Equipment();
      this.equipment.constructFromJson(apiResult.equipment, this.translateService);
      this.equipment.name = this.equipment.getName(this.translateService);

      this.equipment.rawSkills = apiResult.skills;
      this.equipment.rawUnits = apiResult.units;

      this.equipment.upgrade = 0;
      this.equipment.level = 1;

      this.formatSkillsWithApi(this.equipment);

      if (this.equipment.formattedSkills[0] && this.equipment.formattedSkills[0][0] && this.equipment.formattedSkills[0][0].type === 'skill') {
        this.equipment.formattedSkills[0][0].level = 1;
      }
      this.equipment.growIds = Object.keys(this.equipment.grows);
      this.equipment.grow = this.equipment.growIds[0];

      await this.initiateSavedEquipment(customData);

      const rawMateriaGroups = await this.materiaService.getMateriaGroups();
      this.equipment.rawMateriaGroups = rawMateriaGroups.materiaGroup;
      for (const skill of rawMateriaGroups.skills) {
        this.equipment.rawSkills.push(skill);
      }
      this.changeMateria();

      this.equipment.updateMaxStat(this.toolService, this.skillService, this.rangeService);

      this.equipment.changeLevel(this.skillService, this.rangeService);
      this.equipment.changeUpgrade(this.skillService, this.rangeService);
      this.equipment.changeGrow();

      this.equipmentCategory();

      return this.equipment;
    }

    return null;
  }

  private async initiateSavedEquipment(customData = null) {
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
          this.equipment.stats[stat].selected = equipment.stats[stat] + (this.equipment.customName === 'in-game' ? this.equipment.stats[stat].min : 0);
        }
      });

      if (equipment.skill) {
        Object.keys(equipment.skill).forEach(skillId => {
          this.equipment.formattedSkills.forEach(skill => {
            skill.forEach(subSkill => {
              if (subSkill.dataId === skillId) {
                subSkill.level = equipment.skill[skillId];
              }
            });
          });
        });
      } else {
        this.equipment.formattedSkills.forEach(skill => {
          skill.forEach(subSkill => {
            subSkill.level = this.equipment.level;
          });
        });
      }

      if (equipment.materias) {
        for (const materiaType of Object.keys(equipment.materias)) {
          if (equipment.materias[materiaType]) {
            this.equipment.materias[materiaType] = await this.materiaService.buildMateriaFromData(new Materia(), equipment.materias[materiaType]);
          }
        }
      }
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

  changeMateria(equipment = null) {
    if (equipment) {
      this.equipment = equipment;
    }

    this.equipment.changeMateria(this.skillService);
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

  getLevelFromExp(exp) {
    let level = 0;
    let minusOne = false;

    for (level = 0; level <= this.lvTbl.length - 1; level++) {
      if (this.lvTbl[level] > exp) {
        minusOne = true;
        break;
      } if (this.lvTbl[level] === exp) {
        break;
      }
    }

    return level + (minusOne ? 0 : 1);
  }
}
