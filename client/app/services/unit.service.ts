import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import GL_UNITS from '../data/gl/units.json';
import JP_UNITS from '../data/jp/units.json';
import { GridService } from './grid.service'
import { SkillService } from './skill.service'
import { JobService } from './job.service'
import { GuildService } from './guild.service'
import { NavService } from './nav.service'
import { NameService } from './name.service'
import { EquipmentService } from './equipment.service'
import { CardService } from './card.service'
import { EsperService } from './esper.service'

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

  private elements = [
    "FIRE",
    "ICE",
    "EARTH",
    "WIND",
    "LIGHTNING",
    "WATER",
    "LIGHT",
    "DARK"
  ]

  private atks = [
    "SLASH",
    "PIERCE",
    "STRIKE",
    "MISSILE",
    "MAGIC"
  ]

  private ailments = [
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
    private navService: NavService,
    private nameService: NameService,
    private equipmentService: EquipmentService,
    private cardService: CardService,
    private esperService: EsperService,
    private http: HttpClient
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
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

  sortByName(units, order = "asc") {
    units.sort((a: any, b: any) => {
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

    return units;
  }

  sortByRarity(units, order = "asc") {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    if (order == "desc") {
      rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    }

    units.sort((a: any, b: any) => {
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

    return units
  }

  getUnitsForListing(filters, sort, order = "asc") {
    this.getUnits();
    this.units = this.filterUnits(this.units, filters);

    switch (sort) {
      case "rarity" :
        this.sortByRarity(this.units, order)
      break
      case "name" :
        this.sortByName(this.units, order)
      break
      default :
        console.log("not managed sort")
      break
    }

    return this.units;
  }

  filterUnits(units, filters) {
    if (filters) {
      let filteredUnits = []

      units.forEach(unit => {
        if ((filters.element.length == 0 || filters.element.indexOf(unit.element) != -1)
          && (filters.rarity.length == 0 || filters.rarity.indexOf(unit.rarity) != -1)
        ) {
          if (filters.job.length == 0) {
            filteredUnits.push(unit)
          } else {
            for (let i = 0; i <= 2; i++) {
              let tableJob = unit.jobs[i].split("_")
              if (filters.job.indexOf(tableJob[0] + "_" + tableJob[1] + "_" + tableJob[2]) != -1) {
                filteredUnits.push(unit)
                break;
              }
            }
          }
        }
      })

      return filteredUnits
    } else {
      return units
    }
  }

  getUnitsForBuilder() {
    let units = this.getUnitsForListing(null, "rarity", "asc");

    let formattedUnitsForBuilder = []
    units.forEach(unit => {
      formattedUnitsForBuilder.push({
        id: unit.dataId,
        name: unit.getName(this.translateService),
        rarity: unit.rarity
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

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_units" : "units"
  }

  getSavedUnits() {
    this.savedUnits = this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
    return this.savedUnits;
  }

  getSavableData(unit) {
    let data = {
      dataId: unit.dataId,
      star: unit.star,
      lb: unit.lb ? unit.lb : 0,
      level: unit.level,
      jobs: [
        unit.jobsData[0].level,
        unit.jobsData[1].level,
        unit.jobsData[2].level
      ],
      nodes: {},
      masterSkill: unit.masterSkillActivated,
      activatedSupport: [
        unit.activatedSupport[0],
        unit.activatedSupport[1]
      ],
      activatedCounter: unit.activatedCounter,
      subjob: unit.subjob,
      esper: null,
      card: null,
      equipments: [null, null, null],
      guild: {
        serpent: unit.guild && unit.guild.data ? unit.guild.data.serpent : 0,
        lion: unit.guild && unit.guild.data ? unit.guild.data.lion : 0,
        kirin: unit.guild && unit.guild.data ? unit.guild.data.kirin : 0,
        bull: unit.guild && unit.guild.data ? unit.guild.data.bull : 0
      },
      limitLv: unit.limit ? unit.limit.level : 0
    }

    if (unit.esper) {
      let savedEsper = this.esperService.getSavableData(unit.esper)
      savedEsper.resonance = unit.esper.resonance
      data.esper = savedEsper
    } else {
      data.esper = null
    }

    if (unit.card) {
      data.card = this.cardService.getSavableData(unit.card)
    } else {
      data.card = null
    }

    for (let i = 0; i <= 2; i++) {
      if (unit.equipments && unit.equipments[i]) {
        data.equipments[i] = this.equipmentService.getSavableData(unit.equipments[i])
      } else {
        data.equipments[i] = null
      }
    }

    Object.keys(unit.board.nodes).forEach(nodeId => {
      data.nodes[nodeId] = unit.board.nodes[nodeId].level ? unit.board.nodes[nodeId].level : 0
    })

    return data
  }

  saveUnit(unit) {
    if (!this.savedUnits) {
      this.getSavedUnits()
    }

    this.savedUnits[unit.dataId] = this.getSavableData(unit)

    this.localStorageService.set(this.getLocalStorage(), this.savedUnits);
  }

  selectUnitForBuilder(unitId, customData = null) {
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
    this.unit.subjob = 0;

    this.unit.star = 1;
    this.unit.lb = 0;
    this.unit.level = 1;
    this.unit.activatedSupport = [
      "0",
      "0"
    ]
    this.unit.activatedCounter = "0"

    this.unit.masterSkillLevel = [-1]
    let i = 0;
    this.unit.masterSkill.forEach(skill => {
      this.unit.masterSkillLevel.push(i)
      i++
    })
    this.unit.masterSkillActivated = -1;
    this.unit.equipments = []

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.unlockStar === null) {
        this.unit.board.nodes[nodeId].activated = true
        this.unit.board.nodes[nodeId].level = 1
      }
    })

    if (this.unit.limit) {
      this.unit.limit.level = 1
    }

    this.initiateSavedUnit(customData)

    this.unit.grid = this.gridService.generateUnitGrid(this.unit)

    this.updateMaxLevel();
    this.updateMaxJobLevel();
    this.changeLevel();
    this.getActiveSkills();

    return this.unit
  }

  private initiateSavedUnit(customData = null) {
    let unit = customData
    if (!unit) {
      let savedUnits = this.getSavedUnits()
      unit = savedUnits[this.unit.dataId]
    }

    if (unit) {
      this.unit.star = unit.star;
      this.unit.lb = unit.lb;
      this.unit.level = parseInt(unit.level);

      this.unit.jobs.forEach((jobId, jobIndex) => {
        this.unit.jobsData[jobIndex].level = unit.jobs[jobIndex]
      })

      Object.keys(unit.nodes).forEach(nodeId => {
        if (unit.nodes[nodeId]) {
          this.unit.board.nodes[nodeId].level = unit.nodes[nodeId]
          this.unit.board.nodes[nodeId].activated = true
        }
      })

      if (unit.masterSkill === true) {
        this.unit.masterSkillActivated = 0;
      } else if (typeof(unit.masterSkill) == "number") {
        this.unit.masterSkillActivated = unit.masterSkill
      }

      if (unit.subjob) {
        this.unit.subjob = unit.subjob
      }

      if (unit.limitLv) {
        this.unit.limit.level = unit.limitLv
      }

      if (unit.activatedSupport[0] || unit.activatedSupport[1]) {
        this.unit.activatedSupport = [
          unit.activatedSupport[0],
          unit.activatedSupport[1]
        ]
      }

      if (unit.activatedCounter) {
        this.unit.activatedCounter = unit.activatedCounter
      }

      if (unit.esper) {
        this.unit.esper = this.esperService.selectEsperForBuilder(unit.esper.dataId, unit.esper)
      } else {
        this.unit.esper = null
      }

      if (unit.card) {
        this.unit.card = this.cardService.selectCardForBuilder(unit.card.dataId, unit.card)
      } else {
        this.unit.card = null
      }

      this.unit.equipments = []
      for (let i = 0; i<= 2; i++) {
        if (unit.equipments && unit.equipments[i]) {
          this.unit.equipments[i] = this.equipmentService.selectEquipmentForBuilder(unit.equipments[i].dataId, unit.equipments[i])
        } else {
          this.unit.equipments[i] = null
        }
      }

      if (unit.guild) {
        this.unit.savedGuild = unit.guild
      }
    }
  }

  changeStar() {
    this.updateMaxLevel()
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
    this.disableNotAvailableNodes()

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
    let guild = this.unit.guild
    if (guild) {
      let statues = this.guildService.getStatues()

      Object.keys(guild).forEach(statue => {
        if (guild[statue] > 0) {
          statues[statue][guild[statue] - 1].forEach(stat => {
            let value = stat.value;
            if (stat.calcType == "percent") {
              value = Math.floor(this.unit.stats[stat.type].baseTotal * value / 100)
            }

            this.updateStat(stat.type, value, "guild", "fixe")
          })
        }
      });
    }
  }

  private updateStat(type, value, statType, calc = "fixe", reset = false) {
    switch (type) {
      case "ALL_ELEMENTS_RES" :
        this.elements.forEach(element => {
          this.updateStat(element + "_RES", value, statType, calc)
        })
      break

      case "ALL_ATTACKS_RES" :
        this.atks.forEach(atk => {
          this.updateStat(atk + "_RES", value, statType, calc)
        })
      break

      case "ALL_AILMENTS_RES" :
        this.ailments.forEach(ailment => {
          this.updateStat(ailment + "_RES", value, statType, calc)
        })
      break

      default:
        if (!this.unit.stats[type]) {
          this.unit.stats[type] = {}
          this.unit.stats[type].base = 0;
          this.unit.stats[type].baseTotal = 0;
        }

        if (!this.unit.stats[type][statType]) {
          this.unit.stats[type][statType] = 0
        }

        if (calc == "percent") {
          this.unit.stats[type][statType] = (reset ? 0 : this.unit.stats[type][statType]) + this.unit.stats[type].baseTotal * value / 100
        } else {
          this.unit.stats[type][statType] = (reset ? 0 : this.unit.stats[type][statType]) + value
        }
      break
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
    if (this.unit.masterSkillActivated >= 0) {
      let masterSkill = this.unit.masterSkill[this.unit.masterSkillActivated]
      masterSkill.effects.forEach(effect => {
        if (effect.calcType === "percent" || effect.calcType === "fixe" || effect.calcType === "resistance") {
          let calc = "fixe"
          if (effect.calcType === "percent" && !effect.type.includes("KILLER")) {
            calc = "percent"
          }

          this.updateStat(effect.type, effect.minValue, "masterSkill", calc)
        } else {
          console.log("not manage effect in masterSkill percent/fixe")
          console.log(masterSkill)
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
        this.updateStat(statType, 0, "esper", "fixe")
        let baseTotal = this.unit.stats[statType].baseTotal ? this.unit.stats[statType].baseTotal : 0
        let value = 0;

        if (typeof(this.unit.esper.buffs[statType].percent) == "number"
          && this.unit.esper.buffs[statType].percent != 0
        ) {
          if (this.statsType.indexOf(statType) !== -1) {
            value = Math.floor(baseTotal * this.unit.esper.buffs[statType].percent / 100)
          } else {
            value = this.unit.esper.buffs[statType].percent
          }
        } else {
          value = this.unit.esper.buffs[statType].total
        }

        this.updateStat(statType, value, "esper", "fixe")
      }
    })
  }

  private calculateCardStats() {
    this.unit.card.statsType.forEach(statType => {
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

      this.updateStat(statType, value, "card", "fixe")
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

      this.updateStat(statType, value, "cardParty", "fixe")
    })
  }

  private calculateEquipmentsStats() {
    let statsType = [];
    this.unit.imbue = null;

    for (let i = 0; i <= 2; i++) {
      if (this.unit.equipments[i]) {
        Object.keys(this.unit.equipments[i].stats).forEach(statType => {
          let value = parseInt(this.unit.equipments[i].stats[statType].selected)

          this.updateStat(statType, value, 'equipment' + i, "fixe", true)

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

        this.unit.equipments[i].passiveSkills.forEach(skill => {
          if (skill.type !== "skill") {
            skill.level = this.unit.equipments[i].level

            skill.effects.forEach(effect => {
              if (!effect.fromImbue) {
                let value = effect.minValue
                if (skill.level >= skill.maxLevel) {
                  value = effect.maxValue
                } else if (skill.maxLevel !== 1 || skill.level !== 1) {
                  value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)))
                }

                this.updateStat(effect.type, value, 'equipment' + i, "fixe")

                if (!this.unit.stats[effect.type]) {
                  this.unit.stats[effect.type] = {};
                }

                if (!this.unit.stats[effect.type].equipmentBuff) {
                  this.unit.stats[effect.type].equipmentBuff = {
                    positive: 0,
                    negative: -100000000
                  }
                }

                if (value > 0 && value > this.unit.stats[effect.type].equipmentBuff.positive) {
                  this.unit.stats[effect.type].equipmentBuff.positive = value
                } else if (value <= 0 && value > this.unit.stats[effect.type].equipmentBuff.negative) {
                  this.unit.stats[effect.type].equipmentBuff.negative = value
                }

                statsType.push(effect.type)
              } else {
                effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
                this.unit.imbue = effect
              }
            })
          }
        })
      }
    }

    statsType.forEach(statType => {
      if (this.unit.stats[statType].equipment) {
        let negativeValue = this.unit.stats[statType].equipment.negative !== -100000000 ? this.unit.stats[statType].equipment.negative : 0
        this.updateStat(statType, this.unit.stats[statType].equipment.positive + negativeValue, "totalEquipment", "fixe", true)
      }

      if (this.unit.stats[statType].equipmentBuff) {
        let negativeBuffValue = this.unit.stats[statType].equipmentBuff.negative !== -100000000 ? this.unit.stats[statType].equipmentBuff.negative : 0
        let total = 0
        if (this.unit.stats[statType].totalEquipment) {
          total = this.unit.stats[statType].totalEquipment
        }
        this.updateStat(statType, total + this.unit.stats[statType].equipmentBuff.positive + negativeBuffValue, "totalEquipment", "fixe", true)
      }
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

    if (this.unit.equipments) {
      this.calculateEquipmentsStats()
    }

    let statsToRemove = [];
    Object.keys(this.unit.stats).forEach(stat => {
      if (stat == "INITIAL_AP") {
        let initialAPModifier = 100 + this.unit.jobsData[0].statsModifiers[this.unit.jobsData[0].level - 1]["INITIAL_AP"]
        let initialAP = this.unit.stats["AP"].total * initialAPModifier / 100

        this.unit.stats["INITIAL_AP"].base = Math.floor(initialAP)
        this.unit.stats["INITIAL_AP"].baseTotal = Math.floor(initialAP)
      }
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

      if (!Number.isInteger(this.unit.stats[stat].total)) {
        statsToRemove.push(stat)
      }
    })

    statsToRemove.forEach(stat => {
      delete this.unit.stats[stat]
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
          name: this.nameService.getName(node.skill)
        })
      }
    })

    return nodes
  }

  getAvailableCounterNodes() {
    let nodes = []

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let node = this.unit.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "counter") {
        nodes.push({
          nodeId: nodeId.toString(),
          name: this.nameService.getName(node.skill)
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

    this.getActiveSkills();
  }

  disableNotAvailableNodes() {
    Object.keys(this.unit.board.nodes).forEach(node => {
      if (this.unit.board.nodes[node].activated && !this.canActivateNode(node)) {
        this.hideNode(node, true)
      }
    })

    this.getActiveSkills();
  }

  getAvailableEquipments(pos) {
    let armorTypes = []
    this.unit.jobsData[0].equipments.armors.forEach(type => {
      if (type !== "ACC") {
        armorTypes.push(type)
      }
    })

    let weaponsTypes = []
    this.unit.jobsData[0].equipments.weapons.forEach(type => {
      weaponsTypes.push(type)
    })

    let hasArmor = false
    let hasWeapon = false
    let countAcc = 0
    let hasTmr = false;
    for (let i = 0; i <= 2; i++) {
      if (i !== pos && this.unit.equipments && this.unit.equipments[i]) {
        if (this.unit.equipments[i].type === "ACC") {
          countAcc++
        } else if (this.equipmentService.isArmor(this.unit.equipments[i].type)) {
          hasArmor = true
        } else {
          hasWeapon = true
        }

        if (this.unit.equipments[i].acquisition && this.unit.equipments[i].acquisition.type === "tmr") {
          hasTmr = true
        }
      }
    }

    let equipments = this.equipmentService.getEquipmentsForUnitBuilder()
    let availableEquipments = []
    let mainJob = this.unit.jobs[0].split("_")
    mainJob = mainJob[0] + "_" + mainJob[1] + "_" + mainJob[2]
    equipments.forEach(equipment => {
      if (((countAcc < 2 && equipment.type === "ACC")
        || (!hasArmor && armorTypes.indexOf(equipment.type) !== -1)
        || (!hasWeapon && weaponsTypes.indexOf(equipment.type) !== -1))
        && (
          (!hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr" || (equipment.acquisition.type === "tmr" && this.unit.lb >= 4))
          || (hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr"))))
      ) {
        let jobs = []
        equipment.equippableJobs.forEach(job => {
          let tableJob = job.split("_")
          jobs.push(tableJob[0] + "_" + tableJob[1] + "_" + tableJob[2])
        })

        if (jobs.indexOf(mainJob) != -1 || equipment.equippableUnits.indexOf(this.unit.dataId) != -1) {
          availableEquipments.push(equipment)
        }
      }
    })

    return availableEquipments
  }

  getActiveSkills() {
    this.unit.activeSkills = []

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      let node = this.unit.board.nodes[nodeId]
      if (node.level && node.level >= 1 && node.skill.type == "skill" &&
        (node.skill.mainSkill || node.skill.unlockJob == this.unit.subjob + 1)
      ) {
        node.skill.level = node.level

        this.unit.activeSkills.push(this.formatActiveSkill(node.skill))
      }
    })

    if (this.unit.limit) {
      this.unit.limit = this.formatActiveSkill(this.unit.limit)
    }

    this.unit.activatedSupport.forEach(supportNode => {
      if (supportNode !== "0") {
        this.unit.board.nodes[supportNode].skill.level = this.unit.board.nodes[supportNode].level
        this.unit.board.nodes[supportNode].skill = this.formatActiveSkill(this.unit.board.nodes[supportNode].skill)
      }
    })

    if (this.unit.activatedCounter !== "0") {
      this.unit.board.nodes[this.unit.activatedCounter].skill.level = this.unit.board.nodes[this.unit.activatedCounter].level
      this.unit.board.nodes[this.unit.activatedCounter].skill = this.formatActiveSkill(this.unit.board.nodes[this.unit.activatedCounter].skill)
    }
  }

  private formatActiveSkill(skill) {
    skill.name = this.nameService.getName(skill)

    skill.effects.forEach(effect => {
      effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
    });

    skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);

    this.skillService.formatRange(this.unit, skill);

    return skill
  }

  getExportableLink() {
    let builderLink = "https://wotv-calc.com" + this.navService.getRoute("/builder/unit") + "/" + btoa(JSON.stringify(this.getSavableData(this.unit)))
    let shortenUrl = "https://build.wotv-calc.com/yourls-api.php?signature=96c1bdf29a&action=shorturl&format=json&url=" + builderLink

    return this.http.get(shortenUrl);
  }
}
