import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Equipment } from '../entities/equipment';
import { default as GL_EQUIPMENTS } from '../data/gl/equipments.json';
import { default as JP_EQUIPMENTS } from '../data/jp/equipments.json';
import { SkillService } from './skill.service'
import { NavService } from './nav.service'
import { NameService } from './name.service'

@Injectable()
export class EquipmentService {
  private weaponTypes = [
    "DAGGER",
    "SWORD",
    "GREATSWORD",
    "KATANA",
    "ROD",
    "NINJABLADE",
    "BOW",
    "AXE",
    "SPEAR",
    "GUN",
    "MACE",
    "FIST"
  ]

  private armorTypes = [
    "SHIELD",
    "ARMOR",
    "HAT",
    "HELM",
    "CLOTH",
    "ACC"
  ]

  private formatType = {
    "DAGGER": "Dagger",
    "SWORD": "Sword",
    "GREATSWORD": "Great Sword",
    "KATANA": "Katana",
    "ROD": "Rod",
    "NINJABLADE": "Ninja Blade",
    "BOW": "Bow",
    "AXE": "Axe",
    "SPEAR": "Spear",
    "GUN": "Gun",
    "MACE": "Mace",
    "FIST": "Fist",
    "SHIELD": "Shield",
    "ARMOR": "Armor",
    "HAT": "Hat",
    "HELM": "Helm",
    "CLOTH": "Cloth",
    "ACC": "Accessory"
  }

  private equipmentsAcquisition = {
    "AF_LW_RNG_005": "RAID",
    "AF_LW_HLM_005": "RAID",
    "AF_LW_CLT_005": "RAID",
    "AF_LW_KAT_008": "RAID",
    "AF_FF14_HLM_001": "RAID",
    "AF_LW_ACC_002": "RAID",

    "AF_LW_BSW_011": "TOWER",
    "AF_FFT_SWO_002": "TOWER",
    "AF_LW_RNG_007": "TOWER",

    "AF_LW_SWO_016": "FREE",

    "AF_LW_ACC_001": "SUMMON_EVENT",

    "AF_SWO_FF14_TNCT": "COLLABORATION",
    "AF_FFT_SWO_001": "COLLABORATION",
    "AF_FF14_ARW_001": "COLLABORATION",
    "AF_FF1_ARM_002": "COLLABORATION",
    "AF_FF4_ARM_001": "COLLABORATION",
    "AF_FFT_ACC_001": "COLLABORATION",
    "AF_FF4_SPE_000": "COLLABORATION",
    "AF_FF4_BOW_000": "COLLABORATION",

    "AF_LW_CLT_004": "RECURRENT",
    "AF_LW_BSW_004": "RECURRENT",
    "AF_LW_AXE_003": "RECURRENT",
    "AF_LW_ARM_004": "RECURRENT",
    "AF_LW_HLM_004": "RECURRENT",
    "AF_LW_HAT_004": "RECURRENT",
    "AF_LW_SWO_003": "RECURRENT",
    "AF_LW_GUN_003": "RECURRENT",
    "AF_LW_ROD_005": "RECURRENT",
    "AF_LW_SPE_004": "RECURRENT",
    "AF_LW_BSW_003": "RECURRENT",
    "AF_LW_ARM_003": "RECURRENT",
    "AF_LW_BOW_003": "RECURRENT",
    "AF_LW_DAG_006": "RECURRENT",
    "AF_LW_FIS_003": "RECURRENT",
    "AF_LW_KAT_003": "RECURRENT",
    "AF_LW_MAC_003": "RECURRENT",
    "AF_LW_SWO_006": "RECURRENT",
    "AF_LW_NKN_003": "RECURRENT",
    "AF_LW_SPE_006": "RECURRENT",
    "AF_LW_SWO_023": "RECURRENT",
    "AF_LW_HAT_005": "RECURRENT",
    "AF_LW_MAC_009": "RECURRENT",
    "AF_LW_CLT_006": "RECURRENT",

    "AF_LW_SWO_000": "GENERAL_SHOP",
    "AF_LW_BSW_000": "GENERAL_SHOP",
    "AF_LW_KAT_000": "GENERAL_SHOP",
    "AF_LW_FIS_000": "GENERAL_SHOP",
    "AF_LW_SPE_000": "GENERAL_SHOP",
    "AF_LW_DAG_000": "GENERAL_SHOP",
    "AF_LW_NKN_000": "GENERAL_SHOP",
    "AF_LW_BOW_000": "GENERAL_SHOP",
    "AF_LW_GUN_000": "GENERAL_SHOP",
    "AF_LW_ROD_000": "GENERAL_SHOP",
    "AF_LW_ROD_001": "GENERAL_SHOP",
    "AF_LW_MAC_000": "GENERAL_SHOP",
    "AF_LW_AXE_000": "GENERAL_SHOP",
    "AF_LW_ARM_001": "GENERAL_SHOP",
    "AF_LW_HLM_001": "GENERAL_SHOP",
    "AF_LW_HAT_001": "GENERAL_SHOP",
    "AF_LW_CLT_001": "GENERAL_SHOP",
    "AF_LW_RNG_001": "GENERAL_SHOP",

    "AF_LW_SWO_007": "PACK"
  }

  private acquisitionTypesTranslation = {
    "GENERAL_SHOP": {
      "en": "General Shop",
      "fr": "Boutique ordinaire"
    },
    "RAID": {
      "en": "Raid",
      "fr": "Raid"
    },
    "TOWER": {
      "en": "Tower",
      "fr": "Tour"
    },
    "EVENT": {
      "en": "Event",
      "fr": "Évènement"
    },
    "SUMMON_EVENT": {
      "en": "Summon Event",
      "fr": "Évènement d'Invocation"
    },
    "COLLABORATION" : {
      "en": "Collaboration event",
      "fr": "Évènement de collaboration"
    },
    "RECURRENT": {
      "en": "Recurrent event",
      "fr": "Évènement récurrent"
    },
    "FREE": {
      "en": "Free",
      "fr": "Gratuit"
    },
    "PACK": {
      "en": "Billing pack",
      "fr": "Pack payant"
    }
  }

  private savedEquipments = {}

  private equipments: Equipment[];
  private equipment
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private skillService: SkillService,
    private navService: NavService,
    private nameService: NameService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  private getRaw() {
    if (this.navService.getVersion() == "GL") {
      return GL_EQUIPMENTS
    } else {
      return JP_EQUIPMENTS
    }
  }

  getEquipments(sortBy = null): Equipment[] {
    let equipments: Equipment[] = [];
    let rawEquipments = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawEquipments).forEach(equipmentId => {
      let equipment = new Equipment();
      equipment.constructFromJson(rawEquipments[equipmentId], this.translateService);

      if (this.equipmentsAcquisition[equipment.dataId]) {
        equipment.acquisition.type = this.acquisitionTypesTranslation[this.equipmentsAcquisition[equipment.dataId]]
      }

      equipments.push(equipment);
    });

    this.equipments = equipments;
    return equipments;
  }

  sortByName(equipments, order = "asc") {
    equipments.sort((a: any, b: any) => {
      let x = this.i(a.getName(this.translateService));
      let y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
        if (xD < yD) {
          return order == "asc" ? -1 : 1;
        } else if (xD > yD) {
          return order == "asc" ? 1 : -1;
        }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
        this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
        if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
          if (isNaN(this.oFxNcL)) {
            return order == "asc" ? 1 : -1;
          } else {
            return order == "asc" ? -1 : 1;
          }
        }

        if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
          var comp = this.oFxNcL.localeCompare(this.oFyNcL);
          return comp / Math.abs(comp);
        }

        if (this.oFxNcL < this.oFyNcL) {
          return order == "asc" ? -1 : 1;
        } else if (this.oFxNcL > this.oFyNcL) {
          return order == "asc" ? 1 : -1;
        }
      }
    });

    return equipments;
  }

  sortByRarity(equipments, order = "asc") {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    if (order == "desc") {
      rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    }

    equipments.sort((a: any, b: any) => {
      if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
        return -1
      } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
        return 1
      } else {
        let x = this.i(a.getName(this.translateService));
        let y = this.i(b.getName(this.translateService));

        const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
        const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

        const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
        const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

        if (yD) {
            if (xD < yD) { return -1; }
            else if (xD > yD) { return 1; }
        }

        for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
            this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
            this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
            if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
                return isNaN(this.oFxNcL) ? 1 : -1;
            }
            if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
                var comp = this.oFxNcL.localeCompare(this.oFyNcL);
                return comp / Math.abs(comp);
            }
            if (this.oFxNcL < this.oFyNcL) { return -1; }
            else if (this.oFxNcL > this.oFyNcL) { return 1; }
        }
      }
    })

    return equipments
  }

  getEquipmentsForListing(filters, sort = "rarity", order = "asc") {
    this.getEquipments();
    this.equipments = this.filterEquipments(this.equipments, filters);

    switch (sort) {
      case "rarity" :
        this.sortByRarity(this.equipments, order)
      break
      case "name" :
        this.sortByName(this.equipments, order)
      break
      default :
        console.log("not managed sort")
      break
    }

    return this.equipments;
  }

  filterEquipments(equipments, filters) {
    if (filters) {
      let filteredEquipments = []

      equipments.forEach(equipment => {
        if ((!filters.type || filters.type.length == 0 || filters.type.indexOf(equipment.type) != -1)
          && (!filters.rarity || filters.rarity.length == 0 || filters.rarity.indexOf(equipment.rarity) != -1)
          && (!filters.acquisition || filters.acquisition.length == 0 || filters.acquisition.indexOf(equipment.acquisition.type) != -1 || filters.acquisition.indexOf(equipment.acquisition.type[this.translateService.getDefaultLang()]) != -1)
          && (!filters.category || filters.category.length == 0 || filters.category.length == 3 || (filters.category.indexOf("acc") != -1 && equipment.type == "ACC") || (filters.category.indexOf("weapon") != -1 && this.isWeapon(equipment.type)) || (filters.category.indexOf("armor") != -1 && this.isArmor(equipment.type, true)))
        ) {
          filteredEquipments.push(equipment)
        }
      })

      return filteredEquipments
    } else {
      return equipments
    }
  }

  getEquipmentBySlug(slug: string): Equipment {
    this.getEquipments();

    return this.equipments.find(equipment => equipment.slug === slug);
  }

  getEquipment(id: string): Equipment {
    this.getEquipments();

    return this.equipments.find(equipment => equipment.dataId === id);
  }

  isWeapon(type) {
    return this.weaponTypes.indexOf(type) !== -1 ? true : false;
  }

  isArmor(type, excludeAcc = false) {
    return this.armorTypes.indexOf(type) !== -1 && (!excludeAcc || (excludeAcc && type !== "ACC")) ? true : false;
  }

  getFormatType(type) {
    return this.formatType[type];
  }

  getEquipmentsForUnitBuilder() {
    let equipments = this.getEquipmentsForListing(null, "rarity", "asc");

    let formattedEquipmentsForBuilder = []
    equipments.forEach(equipment => {
      formattedEquipmentsForBuilder.push(equipment)
    })

    return formattedEquipmentsForBuilder;
  }

  getEquipmentsForBuilder() {
    let equipments = this.getEquipmentsForListing(null, "rarity", "asc");

    let formattedEquipmentsForBuilder = []
    equipments.forEach(equipment => {
      formattedEquipmentsForBuilder.push({
        id: equipment.dataId,
        name: equipment.getName(this.translateService),
        rarity: equipment.rarity
      })
    })

    return formattedEquipmentsForBuilder;
  }

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_equipments" : "equipments"
  }

  getSavedEquipments() {
    this.savedEquipments = this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
    return this.savedEquipments;
  }

  getSavableData(equipment) {
    let data = {
      dataId: equipment.dataId,
      upgrade: equipment.upgrade,
      grow: equipment.grow,
      level: equipment.level,
      stats: {},
      skill: {}
    }

    Object.keys(equipment.stats).forEach(stat => {
      data.stats[stat] = equipment.stats[stat].selected
    })

    equipment.skill.forEach(skill => {
      data.skill[skill.dataId] = skill.level
    })

    return data
  }

  saveEquipment(equipment) {
    if (!this.savedEquipments) {
      this.getSavedEquipments()
    }

    this.savedEquipments[equipment.dataId] = this.getSavableData(equipment)

    this.localStorageService.set(this.getLocalStorage(), this.savedEquipments);
  }

  selectEquipmentForBuilder(equipmentId, customData = null) {
    this.equipment = this.getEquipment(equipmentId)

    if (this.equipment) {
      this.equipment.name = this.equipment.getName(this.translateService)
      this.equipment.upgrade = 0;
      this.equipment.level = 1;
      if (this.equipment.skills[0] && this.equipment.skills[0][0] && this.equipment.skills[0][0].type == "skill") {
        this.equipment.skills[0][0].level = 1
      }
      this.equipment.growIds = Object.keys(this.equipment.grows)
      this.equipment.grow = this.equipment.growIds[0]

      this.initiateSavedEquipment(customData)
      this.updateMaxStat()

      this.changeLevel()
      this.changeUpgrade()
      this.changeGrow()

      this.equipmentCategory()
    }

    return this.equipment
  }

  private initiateSavedEquipment(customData = null) {
    let equipment = customData
    if (!equipment) {
      let savedEquipments = this.getSavedEquipments()
      equipment = savedEquipments[this.equipment.dataId]
    }

    if (equipment) {
      this.equipment.upgrade = equipment.upgrade;
      this.equipment.grow = equipment.grow;

      if (!this.equipment.grows[this.equipment.grow]) {
        this.equipment.grow = this.equipment.growIds[0]
      }

      this.equipment.level = equipment.level;

      Object.keys(equipment.stats).forEach(stat => {
        if (this.equipment.stats[stat]) {
          this.equipment.stats[stat].selected = equipment.stats[stat];
        }
      })

      Object.keys(equipment.skill).forEach(skillId => {
        this.equipment.skills.forEach(skill => {
          skill.forEach(subSkill => {
            if (subSkill.dataId == skillId) {
              subSkill.level = equipment.skill[skillId]
            }
          })
        })
      })
    }
  }

  private updateMaxStat() {
    this.equipment.statsTypes = Object.keys(this.equipment.stats)

    this.equipment.passiveSkills = [];
    this.equipment.skills.forEach(equipmentLvl => {
      equipmentLvl.forEach(skill => {
        skill.name = this.nameService.getName(skill)
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.equipment, skill, effect);
        });

        if (skill.damage) {
          skill.damageHtml = this.skillService.formatDamage(this.equipment, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.equipment, skill, skill.counter);
        }

        this.skillService.formatRange(this.equipment, skill);

        if (skill.type == "skill") {
          this.equipment.activeSkill = skill
        } else {
          this.equipment.passiveSkills.push(skill)
        }
      })
    })

    Object.keys(this.equipment.grows).forEach(growId => {
      this.equipment.grows[growId].name = this.nameService.getName(this.equipment.grows[growId])
      this.equipment.grows[growId].stats = {};
      this.equipment.statsTypes.forEach(statType => {
        let maxValue = this.equipment.stats[statType].max
        let growMax = this.equipment.grows[growId].curve[statType] ? Math.floor(maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100)) : maxValue

        this.equipment.grows[growId].stats[statType] = []
        for (let i = this.equipment.stats[statType].min; i <= growMax; i++) {
          this.equipment.grows[growId].stats[statType].push(i)
        }
      })
    })

    this.equipment.maxLevel = this.equipment.grows[this.equipment.grow].curve.MAX_LV
    this.equipment.tableLevel = []
    for (let i = 1; i <= this.equipment.maxLevel; i++) {
      this.equipment.tableLevel.push(i)
    }
  }

  changeUpgrade(equipment = null) {
    if (equipment) {
      this.equipment = equipment
    }

    this.equipment.skill = this.equipment.skills[this.equipment.upgrade]

    if (this.equipment.skill && this.equipment.skill[0] && this.equipment.skill[0].type == "skill") {
      this.equipment.skill[0].tableLevel = [];
      for (let i = 1; i <= this.equipment.skill[0].maxLevel; i++) {
        this.equipment.skill[0].tableLevel.push(i)
      }
    }

    if (this.equipment.skill && this.equipment.skill[0] && this.equipment.skill[0].type !== "skill") {
      this.equipment.skill.forEach(skill => {
        skill.level = this.equipment.level
      })
    }

    this.changeSkillLevel();
  }

  changeGrow(equipment = null) {
    if (equipment) {
      this.equipment = equipment
    }

    this.equipment.tableStats = {}
    this.equipment.statsTypes.forEach(statType => {
      this.equipment.tableStats[statType] = this.equipment.grows[this.equipment.grow].stats[statType]

      if (!this.equipment.stats[statType].selected) {
        this.equipment.stats[statType].selected = this.equipment.tableStats[statType][0]
      } else if (this.equipment.stats[statType].selected > this.equipment.tableStats[statType][this.equipment.tableStats[statType].length - 1]) {
        this.equipment.stats[statType].selected = this.equipment.tableStats[statType][this.equipment.tableStats[statType].length - 1]
      }
    })
  }

  changeLevel(equipment = null) {
    if (equipment) {
      this.equipment = equipment
    }

    if (this.equipment.growIds.length == 1 && this.equipment.grows[this.equipment.growIds[0]].dataId == "ARTIFACT_50") {
      Object.keys(this.equipment.stats).forEach(statType => {
        let minValue = this.equipment.stats[statType].min
        let maxValue = this.equipment.grows[this.equipment.growIds[0]].stats[statType][this.equipment.grows[this.equipment.growIds[0]].stats[statType].length - 1]
        this.equipment.stats[statType].selected = Math.floor(minValue + ((maxValue - minValue) / (this.equipment.maxLevel - 1) * (this.equipment.level - 1)))
      })
    }

    if (this.equipment.skill) {
      this.changeSkillLevel()
    }
  }

  changeSkillLevel(equipment = null) {
    if (equipment) {
      this.equipment = equipment
    }

    this.equipment.passiveSkills = [];
    this.equipment.skill.forEach(skill => {
      if (skill.type !== "skill") {
        skill.level = this.equipment.level
      }

      if (skill.level >= (skill.upgrade[0] * 10 - 10)
        && (skill.level < skill.upgrade[skill.upgrade.length - 1] * 10 || (skill.level == this.equipment.maxLevel && skill.upgrade[skill.upgrade.length - 1] == 5))) {
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.equipment, skill, effect);
        });

        if (skill.damage) {
          skill.damageHtml = this.skillService.formatDamage(this.equipment, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.equipment, skill, skill.counter);
        }

        this.skillService.formatRange(this.equipment, skill);

        if (skill.type == "skill") {
          this.equipment.activeSkill = skill
        } else {
          this.equipment.passiveSkills.push(skill)
        }
      }
    });
  }

  private equipmentCategory() {
    let category = null
    if (this.isWeapon(this.equipment.type)) {
      category = "weapon"
    } else {
      if (this.equipment.type == "ACC") {
        category = "acc"
      } else {
        category = "armor"
      }
    }

    this.equipment.category = category
  }

  getAcquisitionTypes() {
    this.getEquipments()

    let types = ["Unknown", "tmr"]
    this.equipments.forEach(equipment => {
      if (equipment.acquisition.type != "Unknown" && equipment.acquisition.type != "tmr") {
        let acquisition = equipment.acquisition.type[this.translateService.getDefaultLang()]

        if (types.indexOf(acquisition) == -1) {
          types.push(acquisition)
        }
      }
    })

    return types;
  }
}
