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
    private skillService: SkillService,
    private rangeService: RangeService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private nameService: NameService,
    private firestore: AngularFirestore
  ) {}

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

  async getEquipmentsForListing(filters = null, sort = 'rarity', order = 'asc') {
    await this.getEquipments();
    const equipments = this.filterEquipments(this[this.navService.getVersion() + '_equipments'], filters);

    switch (sort) {
      case 'rarity' :
        this.toolService.sortByRarity(equipments, order);
      break;
      case 'name' :
        this.toolService.sortByName(equipments, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return equipments;
  }

  filterEquipments(equipments, filters) {
    if (filters) {
      const filteredEquipments = [];

      equipments.forEach(equipment => {
        if ((!filters.type || filters.type.length === 0 || filters.type.indexOf(equipment.type) !== -1)
          && (!filters.rarity || filters.rarity.length === 0 || filters.rarity.indexOf(equipment.rarity) !== -1)
          && (!filters.acquisition || filters.acquisition.length === 0 || filters.acquisition.indexOf(equipment.acquisition.type) !== -1 || filters.acquisition.indexOf(equipment.acquisition.type[this.translateService.getDefaultLang()]) !== -1)
          && (!filters.category || filters.category.length === 0 || filters.category.length === 3 || (filters.category.indexOf('acc') !== -1 && equipment.type === 'ACC') || (filters.category.indexOf('weapon') !== -1 && this.isWeapon(equipment.type)) || (filters.category.indexOf('armor') !== -1 && this.isArmor(equipment.type, true)))
        ) {
          filteredEquipments.push(equipment);
        }
      });

      return filteredEquipments;
    } else {
      return equipments;
    }
  }

  async getEquipmentBySlug(slug: string) {
    await this.getEquipments();

    return this[this.navService.getVersion() + '_equipments'].find(equipment => equipment.slug === slug);
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
    const equipments = await this.getEquipmentsForListing(null, 'rarity', 'asc');

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
    if (this.equipment.skills[0] && this.equipment.skills[0][0] && this.equipment.skills[0][0].type === 'skill') {
      this.equipment.skills[0][0].level = 1;
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
        this.equipment.skills.forEach(skill => {
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

    const types = ['Unknown', 'tmr'];
    this[this.navService.getVersion() + '_equipments'].forEach(equipment => {
      if (equipment.acquisition.type !== 'Unknown' && equipment.acquisition.type !== 'tmr') {
        const acquisition = equipment.acquisition.type[this.translateService.getDefaultLang()];

        if (types.indexOf(acquisition) === -1) {
          types.push(acquisition);
        }
      }
    });

    return types;
  }
}
