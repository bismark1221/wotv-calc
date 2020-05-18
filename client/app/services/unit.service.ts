import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import GL_UNITS from '../data/gl/units.json';
import JP_UNITS from '../data/jp/units.json';
import { GridService } from './grid.service'
import { SkillService } from './skill.service'
import { JobService } from './job.service'
import { GuildService } from './guild.service'
import { NavService } from './nav.service'

@Injectable()
export class UnitService {
  private units: Unit[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;
  private savedVersion = null;

  savedUnits
  unit

  private statsType = [
    "HP",
    "TP",
    "AP",
    "ATK",
    "DEF",
    "SPR",
    "MAG",
    "DEX",
    "AGI",
    "LUCK",
    "MOVE",
    "JUMP"
  ]

  private statsAtkRes = [
    "FIRE",
    "ICE",
    "EARTH",
    "WIND",
    "LIGHTNING",
    "WATER",
    "LIGHT",
    "DARK",
    "SLASH",
    "PIERCE",
    "STRIKE",
    "MISSILE",
    "MAGIC"
  ]

  private statsOrder = [
    "FIRE_RES",
    "ICE_RES",
    "EARTH_RES",
    "WIND_RES",
    "LIGHTNING_RES",
    "WATER_RES",
    "LIGHT_RES",
    "DARK_RES",
    "SLASH_RES",
    "PIERCE_RES",
    "STRIKE_RES",
    "MISSILE_RES",
    "MAGIC_RES",
    "FIRE_ATK",
    "ICE_ATK",
    "EARTH_ATK",
    "WIND_ATK",
    "LIGHTNING_ATK",
    "WATER_ATK",
    "LIGHT_ATK",
    "DARK_ATK",
    "SLASH_ATK",
    "PIERCE_ATK",
    "STRIKE_ATK",
    "MISSILE_ATK",
    "MAGIC_ATK",
    "ACCURACY",
    "CRITIC_RATE",
    "CRITIC_AVOID",
    "EVADE",
    "POISON",
    "BLIND",
    "SLEEP",
    "SILENCE",
    "PARALYZE",
    "CONFUSION",
    "PETRIFY",
    "TOAD",
    "CHARM",
    "SLOW",
    "STOP",
    "IMMOBILIZE",
    "DISABLE",
    "BERSERK",
    "DOOM",
  ]

  private filteredStats = [
    "INITIAL_AP"
  ]

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private gridService: GridService,
    private skillService: SkillService,
    private jobService: JobService,
    private guildService: GuildService,
    private navService: NavService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortByName(units, translate: any) {
    units.sort((a: any, b: any) => {
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

    return units;
  }

  private getRaw() {
    this.savedVersion = JSON.parse(JSON.stringify(this.navService.getVersion()))
    if (this.savedVersion == "GL") {
      return GL_UNITS
    } else {
      return JP_UNITS
    }
  }

  getUnits(): Unit[] {
    let units: Unit[] = [];
    let rawUnits = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawUnits).forEach(unitId => {
      let unit = new Unit();
      unit.constructFromJson(rawUnits[unitId], this.translateService);
      units.push(unit);
    });

    this.units = units;
    return units;
  }

  getUnitsForListing() {
    let units = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };
    let rawUnits = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawUnits).forEach(unitId => {
      let unit = new Unit();
      unit.constructFromJson(rawUnits[unitId], this.translateService);
      units[unit.rarity].push(unit);
    });

    return units;
  }

  getUnitsForBuilder(translate) {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    let units = this.getUnitsForListing();

    Object.keys(units).forEach(rarity => {
      this.sortByName(units[rarity], translate)
    });

    let formattedUnitsForBuilder = []
    rarityOrder.forEach(rarity => {
      units[rarity].forEach(unit => {
        formattedUnitsForBuilder.push({
          id: unit.dataId,
          name: unit.getName(this.translateService),
          rarity: unit.rarity
        })
      })
    })

    return formattedUnitsForBuilder;
  }

  getUnit(id: string): Unit {
    this.getUnits();

    return this.units.find(unit => unit.dataId === id);
  }

  getUnitBySlug(slug: string): Unit {
    this.getUnits();

    return this.units.find(unit => unit.slug === slug);
  }

  getSavedUnits() {
    this.savedUnits = this.localStorageService.get('units') ? this.localStorageService.get('units') : {};
    return this.savedUnits;
  }

  saveUnit(unit) {
    if (!this.savedUnits) {
      this.getSavedUnits()
    }

    this.savedUnits[unit.dataId] = {
      star: unit.star,
      lb: unit.lb ? unit.lb : 0,
      level: unit.level,
      jobs: [
        unit.jobsData[0].level,
        unit.jobsData[1].level,
        unit.jobsData[2].level
      ],
      nodes: {},
      masterSkill: unit.masterSkill.activated,
      activatedSupport: [
        unit.activatedSupport[0],
        unit.activatedSupport[1]
      ],
      esper: null,
      card: null,
      equipments: [null, null, null]
    }

    if (unit.esper) {
      this.savedUnits[unit.dataId].esper = {
        dataId: unit.esper.dataId,
        resonance: unit.esper.resonance
      }
    }

    if (unit.card) {
      this.savedUnits[unit.dataId].card = unit.card.dataId
    }

    for (let i = 0; i <= 2; i++) {
      if (unit.equipments && unit.equipments[i]) {
        this.savedUnits[unit.dataId].equipments[i] = unit.equipments[i].dataId
      }
    }

    Object.keys(unit.board.nodes).forEach(nodeId => {
      this.savedUnits[unit.dataId].nodes[nodeId] = unit.board.nodes[nodeId].level
    })

    this.localStorageService.set('units', this.savedUnits);
  }

  selectUnitForBuilder(unitId) {
    this.unit = new Unit()
    this.unit.constructFromJson(JSON.parse(JSON.stringify(this.getUnit(unitId))), this.translateService)
    this.unit.name = this.unit.getName(this.translateService)

    this.unit.jobsData = []
    this.unit.jobs.forEach((jobId, jobIndex) => {
      let job = this.jobService.getJob(jobId)
      job.name = job.getName(this.translateService)
      job.level = 1;
      this.unit.jobsData.push(job)
    })

    this.unit.star = 1;
    this.unit.lb = 0;
    this.unit.level = 1;
    this.unit.activatedSupport = [
      "0",
      "0"
    ]
    this.unit.masterSkill.activated = false;
    this.unit.masterSkill.name = this.unit.masterSkill.names[this.translateService.currentLang]

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.unlockStar === null) {
        this.unit.board.nodes[nodeId].activated = true
        this.unit.board.nodes[nodeId].level = 1
      }
    })

    this.initiateSavedUnit()

    this.updateMaxLevel();
    this.updateMaxJobLevel();
    this.changeLevel();

    this.unit.grid = this.gridService.generateUnitGrid(this.unit)

    return this.unit
  }

  private initiateSavedUnit() {
    let savedUnits = this.getSavedUnits()
    let unit = savedUnits[this.unit.dataId]

    if (unit) {
      this.unit.star = unit.star;
      this.unit.lb = unit.lb;
      this.unit.level = unit.level;

      this.unit.jobs.forEach((jobId, jobIndex) => {
        this.unit.jobsData[jobIndex].level = unit.jobs[jobIndex]
      })

      Object.keys(unit.nodes).forEach(nodeId => {
        if (unit.nodes[nodeId]) {
          this.unit.board.nodes[nodeId].level = unit.nodes[nodeId]
          this.unit.board.nodes[nodeId].activated = true
        }
      })

      this.unit.masterSkill.activated = unit.masterSkill
      this.unit.activatedSupport = [
        unit.activatedSupport[0],
        unit.activatedSupport[1]
      ]

      this.unit.savedEsper = unit.esper
      this.unit.savedCard = unit.card
      this.unit.savedEquipments = unit.equipments
    }
  }

  changeStar() {
    this.updateMaxLevel();
    this.disableNotAvailableNodes()
  }

  changeLB() {
    this.updateMaxLevel();
    this.updateMaxJobLevel();
  }

  private updateMaxLevel() {
    let levelPerStar = {
      1: 0,
      2: 5,
      3: 10,
      4: 15,
      5: 20,
      6: 34
    }

    let levelPerLB = {
      0: 0,
      1: 5,
      2: 10,
      3: 15,
      4: 25,
      5: 35
    }

    this.unit.maxLevel = 30 + levelPerStar[this.unit.star] + levelPerLB[this.unit.lb ? this.unit.lb : 0];

    if (this.unit.level > this.unit.maxLevel) {
      this.unit.level = this.unit.maxLevel
      this.changeLevel()
    }

    this.unit.tableLevels = [];
    for (let i = 1; i <= this.unit.maxLevel; i++) {
      this.unit.tableLevels.push(i);
    }

    this.updateMaxJobLevel()
  }

  private updateMaxJobLevel() {
    let levelPerLB = {
      0: 0,
      1: 3,
      2: 3,
      3: 6,
      4: 6,
      5: 9
    }

    let starToUnlock = [
      1,
      2,
      4
    ]

    this.unit.maxJobLevel = 6 + levelPerLB[this.unit.lb ? this.unit.lb : 0];

    let updated = false;
    this.unit.jobsData.forEach((job, jobIndex) => {
      job.unlocked = this.unit.star >= starToUnlock[jobIndex]

      if (job.unlocked) {
        if (job.level > this.unit.maxJobLevel) {
          job.level = this.unit.maxJobLevel
          updated = true
        }
      } else {
        job.level = 1;
        updated = true
      }
    })

    if (updated) {
      this.changeLevel()
    }

    this.unit.tableJobLevels = [];
    for (let i = 1; i <= this.unit.maxJobLevel; i++) {
      this.unit.tableJobLevels.push(i);
    }

    this.disableNotAvailableNodes()
  }

  changeLevel() {
    if (this.unit) {
      Object.keys(this.unit.stats).forEach(stat => {
        if (typeof(this.unit.stats[stat].min) == "number") {
          this.unit.stats[stat] = {
            min: this.unit.stats[stat].min,
            max: this.unit.stats[stat].max
          }
        } else {
          delete this.unit.stats[stat]
        }
      })

      Object.keys(this.unit.stats).forEach(stat => {
        let min = this.unit.stats[stat].min
        let max = this.unit.stats[stat].max

        this.unit.stats[stat].base = Math.floor(min + ((max - min) / (99 - 1) * (this.unit.level - 1)))
        this.unit.stats[stat].baseTotal = this.unit.stats[stat].base
      })

      this.unit.jobsData.forEach((job, jobIndex) => {
        let subJob = jobIndex !== 0
        Object.keys(job.statsModifiers[job.level - 1]).forEach(statType => {
          if (!this.unit.stats[statType]) {
            this.unit.stats[statType] = {
              base: 0
            }
          }
          let stat = this.unit.stats[statType].base * (job.statsModifiers[job.level - 1][statType] / 10000) * (subJob ? 0.5 : 1)

          this.unit.stats[statType].baseTotal += stat
        });
      })

      Object.keys(this.unit.stats).forEach(stat => {
        if (!this.unit.stats[stat].baseTotal) {
          this.unit.stats[stat].base = this.unit.stats[stat].min
          this.unit.stats[stat].baseTotal = this.unit.stats[stat].min
        } else {
          this.unit.stats[stat].baseTotal = Math.floor(this.unit.stats[stat].baseTotal)
        }
      })

      this.calculateTotalStats()
      this.getAvailableStatType();
    }
  }

  private calculateGuildStats() {
    let guild = this.guildService.getGuild()
    let statsPerStatue = this.guildService.getStats()

    Object.keys(statsPerStatue).forEach(statType => {
      this.unit.stats[statType].guild = Math.floor(this.unit.stats[statType].baseTotal * guild[statsPerStatue[statType]] / 100)
    });
  }

  private updateStat(type, value, statType, calc = "fixe") {
    if (!this.unit.stats[type]) {
      this.unit.stats[type] = {}
      this.unit.stats[type].base = 0;
      this.unit.stats[type].baseTotal = 0;
    }

    if (!this.unit.stats[type][statType]) {
      this.unit.stats[type][statType] = 0
    }

    if (calc == "percent") {
      this.unit.stats[type][statType] += this.unit.stats[type].baseTotal * value / 100
    } else {
      this.unit.stats[type][statType] += value
    }
  }

  private calculateBoardStats() {
    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let node = this.unit.board.nodes[nodeId]
      if (node.type == "buff" && node.level) {
        node.skill.effects.forEach(effect => {
          if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
            this.updateStat(effect.type, effect.minValue, "board", effect.calcType === "percent" ? "percent" : "fixe")
          } else {
            console.log("not manage effect in board percent/fixe")
            console.log(node)
          }
        })
      }
    })
  }

  private calculateSupportStats() {
    this.unit.activatedSupport.forEach(supportNode => {
      if (supportNode != "0") {
        this.unit.board.nodes[supportNode].skill.effects.forEach(effect => {
          let value = effect.minValue + ((effect.maxValue - effect.minValue) / (20 - 1) * (this.unit.board.nodes[supportNode].level - 1))
          if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
            this.updateStat(effect.type, value, "support", effect.calcType === "percent" ? "percent" : "fixe")
          } else {
            console.log("not manage effect in support percent/fixe")
            console.log(supportNode)
          }
        })
      }
    })
  }

  private calculateMasterSkillStats() {
    if (this.unit.masterSkill.activated) {
      this.unit.masterSkill.effects.forEach(effect => {
        if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
          this.updateStat(effect.type, effect.minValue, "masterSkill", effect.calcType === "percent" ? "percent" : "fixe")
        } else {
          console.log("not manage effect in masterSkill percent/fixe")
          console.log(this.unit.masterSkill)
        }
      })
    }
  }

  private calculateEsperStats() {
    this.statsType.forEach(statType => {
      if (this.unit.esper.stats[statType].base) {
        this.unit.stats[statType].esper = Math.ceil(this.unit.esper.stats[statType].base * parseInt(this.unit.esper.resonance) / 10)
      }
    })

    Object.keys(this.unit.esper.buffs).forEach(statType => {
      if (typeof(this.unit.esper.buffs[statType].total) == "number") {
        if (!this.unit.stats[statType]) {
          this.unit.stats[statType] = {
            baseTotal: 0
          }
        }

        if (typeof(this.unit.esper.buffs[statType].percent) == "number"
          && this.unit.esper.buffs[statType].percent != 0
        ) {
          if (this.statsType.indexOf(statType) !== -1) {
            this.unit.stats[statType].esper = Math.floor((this.unit.stats[statType].esper ? this.unit.stats[statType].esper : 0) + (this.unit.stats[statType].baseTotal * this.unit.esper.buffs[statType].percent / 100))
          } else {
            this.unit.stats[statType].esper = this.unit.esper.buffs[statType].percent
          }
        } else {
          this.unit.stats[statType].esper = this.unit.esper.buffs[statType].total
        }
      }
    })
  }

  private calculateCardStats() {
    ["HP", "ATK", "MAG"].forEach(statType => {
      this.unit.stats[statType].card = this.unit.card.stats[statType].total
    })

    Object.keys(this.unit.card.buffs.self).forEach(statType => {
      let value = this.unit.card.buffs.self[statType].value

      if (this.statsType.indexOf(statType) !== -1) {
        if (this.unit.card.buffs.self[statType].calcType === "percent") {
          value = Math.floor(this.unit.stats[statType].baseTotal * value / 100)
        }

        if (this.unit.stats[statType].card) {
          value += this.unit.stats[statType].card
        }
      }

      if (!this.unit.stats[statType]) {
        this.unit.stats[statType] = {
          baseTotal: 0
        }
      }
      this.unit.stats[statType].card = value
    })

    Object.keys(this.unit.card.buffs.party).forEach(statType => {
      let value = this.unit.card.buffs.party[statType].value

      if (this.statsType.indexOf(statType) !== -1) {
        if (this.unit.card.buffs.party[statType].calcType === "percent") {
          value = Math.floor(this.unit.stats[statType].baseTotal * value / 100)
        }

        if (this.unit.stats[statType].cardParty) {
          value += this.unit.stats[statType].cardParty
        }
      }

      if (!this.unit.stats[statType]) {
        this.unit.stats[statType] = {
          baseTotal: 0
        }
      }
      this.unit.stats[statType].cardParty = value
    })
  }

  private calculateEquipmentsStats() {
    let statsType = [];

    for (let i = 0; i <= 2; i++) {
      if (this.unit.equipments[i]) {
        Object.keys(this.unit.equipments[i].stats).forEach(statType => {
          if (!this.unit.stats[statType]) {
            this.unit.stats[statType] = {
              baseTotal: 0
            }
          }
          let value = parseInt(this.unit.equipments[i].stats[statType].selected)
          this.unit.stats[statType]['equipment' + i] = value

          if (!this.unit.stats[statType].equipment) {
            this.unit.stats[statType].equipment = {
              positive: 0,
              negative: -100000000
            }
          }

          if (value > 0 && value > this.unit.stats[statType].equipment.positive) {
            this.unit.stats[statType].equipment.positive = value
          } else if (value <= 0 && value > this.unit.stats[statType].equipment.negative) {
            this.unit.stats[statType].equipment.negative = value
          }

          statsType.push(statType)
        })

        this.unit.equipments[i].skill.forEach(skill => {
          if (skill.type !== "skill") {
            skill.level = this.unit.equipments[i].level
            skill.maxLevel = this.unit.equipments[i].maxLevel
          }

          skill.effects.forEach(effect => {
            if (!this.unit.stats[effect.type]) {
              this.unit.stats[effect.type] = {
                baseTotal: 0
              }
            }

            let value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)))
            this.unit.stats[effect.type]['equipment' + i] = value

            if (!this.unit.stats[effect.type].equipment) {
              this.unit.stats[effect.type].equipment = {
                positive: 0,
                negative: -100000000
              }
            }

            if (value > 0 && value > this.unit.stats[effect.type].equipment.positive) {
              this.unit.stats[effect.type].equipment.positive = value
            } else if (value <= 0 && value > this.unit.stats[effect.type].equipment.negative) {
              this.unit.stats[effect.type].equipment.negative = value
            }

            statsType.push(effect.type)
          })
        })
      }
    }

    statsType.forEach(statType => {
      let negativeValue = this.unit.stats[statType].equipment.negative !== -100000000 ? this.unit.stats[statType].equipment.negative : 0
      this.unit.stats[statType].totalEquipment = this.unit.stats[statType].equipment.positive + negativeValue
    })
  }


  private calculateTotalStats() {
    this.calculateGuildStats()
    this.calculateBoardStats()
    this.calculateSupportStats()
    this.calculateMasterSkillStats()

    if (this.unit.esper) {
      this.calculateEsperStats()
    }

    if (this.unit.card) {
      this.calculateCardStats()
    }

    if (this.unit.equipments && this.unit.equipments[0]) {
      this.calculateEquipmentsStats()
    }

    Object.keys(this.unit.stats).forEach(stat => {
      this.unit.stats[stat].total = this.unit.stats[stat].baseTotal;

      if (this.unit.stats[stat].board) {
        this.unit.stats[stat].board = Math.floor(this.unit.stats[stat].board)
        this.unit.stats[stat].total += this.unit.stats[stat].board
      }

      if (this.unit.stats[stat].support) {
        this.unit.stats[stat].support = Math.floor(this.unit.stats[stat].support)
        this.unit.stats[stat].total += this.unit.stats[stat].support
      }

      if (this.unit.stats[stat].masterSkill) {
        this.unit.stats[stat].masterSkill = Math.floor(this.unit.stats[stat].masterSkill)
        this.unit.stats[stat].total += this.unit.stats[stat].masterSkill
      }

      if (this.unit.stats[stat].esper) {
        this.unit.stats[stat].total += this.unit.stats[stat].esper
      }

      if (this.unit.stats[stat].card) {
        this.unit.stats[stat].total += this.unit.stats[stat].card
      }

      if (this.unit.stats[stat].cardParty) {
        this.unit.stats[stat].total += this.unit.stats[stat].cardParty
      }

      if (this.unit.stats[stat].totalEquipment) {
        this.unit.stats[stat].total += this.unit.stats[stat].totalEquipment
      }

      this.unit.stats[stat].total += this.unit.stats[stat].guild ? this.unit.stats[stat].guild : 0
    })
  }

  rightClickNode(node) {
    if (node !== 0) {
      this.hideNode(node)
      this.changeLevel()
    }
  }

  clickNode(node) {
    if (node !== 0) {
      if (!this.unit.board.nodes[node].activated || this.unit.grid.nodesForGrid[node].subType == "skill") {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
      this.changeLevel()
    }
  }

  showNode(node) {
    if (node !== 0 && this.canActivateNode(node)) {
      if (!this.unit.board.nodes[node].activated) {
        this.unit.board.nodes[node].activated = true;
        let parentNode = this.unit.board.nodes[node].parent
        if (!this.unit.board.nodes[parentNode].activated) {
          this.showNode(parentNode)
        }
      }

      this.updateSkill(node, true)
    }
  }

  hideNode(node, fullHide = false) {
    if (node !== 0) {
      let level = this.updateSkill(node, false, fullHide)
      if (level === 0) {
        this.unit.board.nodes[node].activated = false;
        this.unit.board.nodes[node].children.forEach(childNode => {
          this.hideNode(childNode, true)
        })
      }
    }
  }

  private updateSkill(nodeId, increase, fullHide = false) {
    let node = this.unit.board.nodes[nodeId]

    if (this.unit.grid.nodesForGrid[nodeId].subType == "buff") {
      node.level = increase ? 1 : 0;
    } else {
      if (increase) {
        node.level = typeof(node.level) == "number" ? (node.level == node.skill.maxLevel ? node.skill.maxLevel : node.level + 1) : 1
      } else {
        node.level = typeof(node.level) == "number" ? (node.level == 0 || fullHide ? 0 : node.level - 1) : 0
      }
    }

    return node.level
  }

  canActivateNode(node) {
    let nodeData = this.unit.board.nodes[node]

    if (node !== 0) {
      if (nodeData && nodeData.type == "buff") {
        return this.canActivateNode(nodeData.parent) && this.unit.star >= nodeData.skill.unlockStar && this.unit.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel
      } else {
        return !nodeData || !nodeData.skill.unlockStar || (this.canActivateNode(nodeData.parent) && this.unit.star >= nodeData.skill.unlockStar && this.unit.jobsData[(nodeData.skill.unlockJob - 1)].level >= nodeData.skill.jobLevel)
      }
    } else {
      return true
    }
  }

  getAvailableSupportNodes(pos) {
    let nodes = []

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let node = this.unit.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "support" && this.unit.activatedSupport[(pos == 0 ? 1 : 0)] !== nodeId) {
        nodes.push({
          nodeId: nodeId.toString(),
          name: node.skill.names[this.translateService.currentLang]
        })
      }
    })

    return nodes
  }

  getAvailableStatType() {
    let findedStats = []
    Object.keys(this.unit.stats).forEach(statType => {
      if (this.statsAtkRes.indexOf(statType) === -1 && this.statsType.indexOf(statType) === -1) {
        findedStats.push(statType)
      }
    })

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let skill = this.unit.board.nodes[nodeId].skill
      this.unit.board.nodes[nodeId].skill.effects.forEach(effect => {
        if (findedStats.indexOf(effect.type) === -1) {
          if (skill.type === "buff" || skill.type === "support") {
            if (this.statsType.indexOf(effect.type) === -1) {
              if (!this.unit.stats[effect.type]) {
                this.unit.stats[effect.type] = {}
              }

              findedStats.push(effect.type)
            }
          }
        }
      })
    })

    this.unit.availableStats = [[]];
    let addedStats = []
    let i = 0;

    this.statsOrder.forEach(statType => {
      if (findedStats.indexOf(statType) !== -1) {
        if (this.unit.availableStats[i].length == 8) {
          this.unit.availableStats.push([])
          i++;
        }

        this.unit.availableStats[i].push(statType)
        addedStats.push(statType)
      }
    })

    Object.keys(this.unit.stats).forEach(statType => {
      if (addedStats.indexOf(statType) === -1
        && this.statsAtkRes.indexOf(statType) === -1
        && this.statsType.indexOf(statType) === -1
        && this.filteredStats.indexOf(statType) === -1
      ) {
        if (this.unit.availableStats[i].length == 8) {
          this.unit.availableStats.push([])
          i++;
        }

        this.unit.availableStats[i].push(statType)
      }
    })
  }

  maxUnit() {
    this.unit.star = 6;
    this.unit.lb = 5;
    this.unit.level = 99;

    this.unit.jobsData.forEach(job => {
      job.level = 15
    })

    this.maxNodes()
    this.changeStar()
    this.changeLevel()
  }

  maxLevelAndJobs() {
    this.unit.level = this.unit.maxLevel;

    this.unit.jobsData.forEach(job => {
      job.level = this.unit.maxJobLevel
    })

    this.maxNodes()
    this.changeLevel()
  }

  maxNodes() {
    Object.keys(this.unit.board.nodes).forEach(node => {
      if (this.canActivateNode(node)) {
        this.showNode(node)
        if (this.unit.board.nodes[node].skill && this.unit.board.nodes[node].skill.maxLevel) {
          this.unit.board.nodes[node].level = this.unit.board.nodes[node].skill.maxLevel
        }
      }
    })
  }

  disableNotAvailableNodes() {
    Object.keys(this.unit.board.nodes).forEach(node => {
      if (this.unit.board.nodes[node].activated && !this.canActivateNode(node)) {
        this.hideNode(node, true)
      }
    })
  }
}
