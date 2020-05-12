import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Equipment } from '../entities/equipment';
import { default as EQUIPMENTS } from '../data/equipments.json';
import { SkillService } from './skill.service'

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
    private skillService: SkillService
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

  getEquipments(): Equipment[] {
    let equipments: Equipment[] = [];

    Object.keys(JSON.parse(JSON.stringify(EQUIPMENTS))).forEach(equipmentId => {
      let equipment = new Equipment();
      equipment.constructFromJson(EQUIPMENTS[equipmentId], this.translateService);
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

    Object.keys(JSON.parse(JSON.stringify(EQUIPMENTS))).forEach(equipmentId => {
      let equipment = new Equipment();
      equipment.constructFromJson(EQUIPMENTS[equipmentId], this.translateService);
      equipments[equipment.rarity].push(equipment);
    });

    return equipments;
  }

  getEquipmentBySlug(slug: string): Equipment {
    if (!this.equipments || this.equipments.length === 0) {
      this.getEquipments();
    }

    return this.equipments.find(equipment => equipment.slug === slug);
  }

  getEquipment(id: string): Equipment {
    if (!this.equipments || this.equipments.length === 0) {
      this.getEquipments();
    }

    return this.equipments.find(equipment => equipment.dataId === id);
  }

  isWeapon(type) {
    return this.weaponTypes.indexOf(type) !== -1 ? true : false;
  }

  getFormatType(type) {
    return this.formatType[type];
  }


  getEquipmentsForBuilder(translate) {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    let equipments = this.getEquipmentsForListing();

    Object.keys(equipments).forEach(rarity => {
      this.sortByName(equipments[rarity], translate)
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


  getSavedEquipments() {
    this.savedEquipments = this.localStorageService.get('equipments') ? this.localStorageService.get('equipments') : {};
    return this.savedEquipments;
  }

  saveEquipment(equipment) {
    if (!this.savedEquipments) {
      this.getSavedEquipments()
    }

    this.savedEquipments[equipment.dataId] = {
      upgrade: equipment.upgrade,
      grow: equipment.grow,
      level: equipment.level,
      stats: {},
      skill: {}
    }

    Object.keys(equipment.stats).forEach(stat => {
      this.savedEquipments[equipment.dataId].stats[stat] = equipment.stats[stat].selected
    })

    equipment.skill.forEach(skill => {
      this.savedEquipments[equipment.dataId].skill[skill.dataId] = skill.level
    })

    this.localStorageService.set('equipments', this.savedEquipments);
  }

  selectEquipmentForBuilder(equipmentId) {
    this.equipment = this.getEquipment(equipmentId)
    this.equipment.name = this.equipment.getName(this.translateService)
    this.equipment.upgrade = 0;
    this.equipment.level = 1;
    if (this.equipment.skills[0] && this.equipment.skills[0][0] && this.equipment.skills[0][0].type == "skill") {
      this.equipment.skills[0][0].level = 1
    }
    this.equipment.growIds = Object.keys(this.equipment.grows)
    this.equipment.grow = this.equipment.growIds[0]

    this.initiateSavedEquipment()
    this.updateMaxStat()

    this.changeUpgrade()
    this.changeGrow()

    return this.equipment
  }

  private initiateSavedEquipment() {
    let savedEquipments = this.getSavedEquipments()
    let equipment = savedEquipments[this.equipment.dataId]

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

    this.equipment.skills.forEach(equipmentLvl => {
      equipmentLvl.forEach(skill => {
        skill.name = skill.names[lang]
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
      });
    });

    Object.keys(this.equipment.grows).forEach(growId => {
      this.equipment.grows[growId].name = this.equipment.grows[growId].names[lang]
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

  changeUpgrade() {
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
        skill.maxLevel = this.equipment.maxLevel
      })
    }

    this.changeSkillLevel();
  }

  changeGrow() {
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

  changeSkillLevel() {
    if (this.equipment.skill && this.equipment.skill[0] && this.equipment.skill[0].type !== "skill") {
      this.equipment.skill.forEach(skill => {
        skill.level = this.equipment.level
        skill.maxLevel = this.equipment.maxLevel
      })
    }

    this.equipment.skill.forEach(skill => {
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
    });
  }
}
