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

  public sortByName(equipments: Equipment[], translate: any): Equipment[] {
    equipments.sort((a: any, b: any) => {
      let x = this.i(a.name);
      let y = this.i(b.name);

      if (translate) {
        x = this.i(a.getName(translate));
        y = this.i(b.getName(translate));
      }

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
    });

    return equipments;
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
      equipments.push(equipment);
    });

    this.equipments = equipments;
    return equipments;
  }

  getEquipmentsForListing() {
    let equipments = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };
    let rawEquipments = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawEquipments).forEach(equipmentId => {
      let equipment = new Equipment();
      equipment.constructFromJson(rawEquipments[equipmentId], this.translateService);
      equipments[equipment.rarity].push(equipment);
    });

    return equipments;
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

  isArmor(type) {
    return this.armorTypes.indexOf(type) !== -1 ? true : false;
  }

  getFormatType(type) {
    return this.formatType[type];
  }

  getEquipmentsForUnitBuilder() {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    let equipments = this.getEquipmentsForListing();

    Object.keys(equipments).forEach(rarity => {
      this.sortByName(equipments[rarity], this.translateService)
    });

    let formattedEquipmentsForBuilder = []
    rarityOrder.forEach(rarity => {
      equipments[rarity].forEach(equipment => {
        formattedEquipmentsForBuilder.push(equipment)
      })
    })

    return formattedEquipmentsForBuilder;
  }

  getEquipmentsForBuilder() {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    let equipments = this.getEquipmentsForListing();

    Object.keys(equipments).forEach(rarity => {
      this.sortByName(equipments[rarity], this.translateService)
    });

    let formattedEquipmentsForBuilder = []
    rarityOrder.forEach(rarity => {
      equipments[rarity].forEach(equipment => {
        formattedEquipmentsForBuilder.push({
          id: equipment.dataId,
          name: equipment.getName(this.translateService),
          rarity: equipment.rarity
        })
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
      this.equipment.level = equipment.level;

      Object.keys(equipment.stats).forEach(stat => {
        this.equipment.stats[stat].selected = equipment.stats[stat];
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
    let lang = this.translateService.currentLang
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

        if (maxValue != growMax) {
          this.equipment.stats[statType].max = growMax
        }

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

    if (this.equipment.growIds.length == 1) {
      Object.keys(this.equipment.stats).forEach(statType => {
        let minValue = this.equipment.stats[statType].min
        let maxValue = this.equipment.stats[statType].max
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
}
