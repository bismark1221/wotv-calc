import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Unit } from '../entities/unit';

import { GridService } from './grid.service'
import { SkillService } from './skill.service'
import { JobService } from './job.service'
import { GuildService } from './guild.service'
import { NavService } from './nav.service'
import { NameService } from './name.service'
import { EquipmentService } from './equipment.service'
import { CardService } from './card.service'
import { EsperService } from './esper.service'
import { AuthService } from './auth.service'
import { ToolService } from './tool.service'

import GL_UNITS from '../data/gl/units.json';
import JP_UNITS from '../data/jp/units.json';

@Injectable()
export class UnitService {
  private units: Unit[];
  unit

  private glExUnits = [
    "UN_LW_P_FRVA"
  ]

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
    private http: HttpClient,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private toolService: ToolService
  ) {}

  private getRaw() {
    if (this.navService.getVersion() == "GL") {
      return GL_UNITS
    } else {
      return JP_UNITS
    }
  }

  getUnits() {
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

  getUnitsForJPBuilder() {
    this.getUnits()

    if (this.navService.getVersion() == "JP") {
      let rawUnits = JSON.parse(JSON.stringify(GL_UNITS))
      Object.keys(rawUnits).forEach(unitId => {
        if (this.glExUnits.indexOf(unitId) != -1) {
          let unit = new Unit();
          unit.constructFromJson(rawUnits[unitId], this.translateService);
          this.units.push(unit);
        }
      });
    }

    this.units = this.filterUnits(this.units, null);
    this.toolService.sortByRarity(this.units, "asc")

    return this.units;
  }

  getUnitsForListing(filters = null, sort = "rarity", order = "asc") {
    this.getUnits();
    this.units = this.filterUnits(this.units, filters);

    switch (sort) {
      case "rarity" :
        this.toolService.sortByRarity(this.units, order)
      break
      case "name" :
        this.toolService.sortByName(this.units, order)
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
            for (let i = 0; i <= (filters.mainJob ? 0 : 2); i++) {
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

  getUnit(id) {
    this.getUnits();

    if (this.navService.getVersion() == "JP") {
      let rawUnits = JSON.parse(JSON.stringify(GL_UNITS))
      Object.keys(rawUnits).forEach(unitId => {
        if (this.glExUnits.indexOf(unitId) != -1) {
          let unit = new Unit();
          unit.constructFromJson(rawUnits[unitId], this.translateService);
          this.units.push(unit);
        }
      });
    }

    return this.units.find(unit => unit.dataId === id);
  }

  getUnitBySlug(slug) {
    this.getUnits();

    return this.units.find(unit => unit.slug === slug);
  }

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_units" : "units"
  }

  getSavedUnits() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(unit) {
    let user = this.authService.getUser()

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
      guild: this.guildService.getSavableData(unit.guild.data, false),
      limitLv: unit.limit ? unit.limit.level : 0,
      user: user ? user.uid : null,
      customName: unit.customName ? unit.customName : ''
    }

    if (unit.esper) {
      let savedEsper = this.esperService.getSavableData(unit.esper, false)
      savedEsper.resonance = unit.esper.resonance
      data.esper = savedEsper
    } else {
      data.esper = null
    }

    if (unit.card) {
      data.card = this.cardService.getSavableData(unit.card, false)
    } else {
      data.card = null
    }

    for (let i = 0; i <= 2; i++) {
      if (unit.equipments && unit.equipments[i]) {
        data.equipments[i] = this.equipmentService.getSavableData(unit.equipments[i], false)
      } else {
        data.equipments[i] = null
      }
    }

    Object.keys(unit.board.nodes).forEach(nodeId => {
      data.nodes[nodeId] = unit.board.nodes[nodeId].level ? unit.board.nodes[nodeId].level : 0
    })

    return data
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

    this.unit.guild = this.guildService.getGuildForBuilder()

    let existingUnit = this.initiateSavedUnit(customData)

    this.unit.grid = this.gridService.generateUnitGrid(this.unit, 1000)

    this.unit.updateMaxLevel();
    this.unit.updateMaxJobLevel();

    if (!existingUnit) {
      this.unit.maxUnit()
      this.unit.activateMasterSkill();
    }

    this.unit.changeLevel(customData || existingUnit ? false : true);

    return this.unit
  }

  private initiateSavedUnit(customData = null) {
    let unit = customData

    if (unit) {
      this.unit.star = unit.star
      this.unit.lb = unit.lb
      this.unit.level = parseInt(unit.level)
      this.unit.customName = unit.customName
      this.unit.storeId = unit.storeId

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

      return true
    }

    return false
  }

  unitAlreadyExists(unit) {
    let savedUnits = this.getSavedUnits()
    let unitFinded = false

    if (savedUnits[unit.dataId]) {
      savedUnits[unit.dataId].forEach((savedUnit, savedUnitIndex) => {
        if (savedUnit.customName == unit.customName) {
          unitFinded = true
        }
      })
    }

    return unitFinded
  }

  saveUnit(unit, method) {
    let savableData = this.getSavableData(unit)

    if (method == "new" || method == "share") {
      if (method == "share") {
        delete savableData.user
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method == "new") {
          // @ts-ignore
          savableData.storeId = data.id
          let savedUnits = this.getSavedUnits()

          if (savedUnits[unit.dataId]) {
            savedUnits[unit.dataId].push(savableData)
          } else {
            savedUnits[unit.dataId] = [savableData]
          }

          this.localStorageService.set(this.getLocalStorage(), savedUnits);
        }
        this.unit.storeId = data.id

        return data.id
      })
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(unit.storeId).set(savableData).then(data => {
        let savedUnits = this.getSavedUnits()
        savedUnits[unit.dataId].forEach((savedUnit, unitIndex) => {
          if (savedUnit.storeId == unit.storeId) {
            savedUnits[unit.dataId][unitIndex] = savableData
            savedUnits[unit.dataId][unitIndex].storeId = unit.storeId
          }
        })

        this.localStorageService.set(this.getLocalStorage(), savedUnits);

        return unit.storeId
      })
    }
  }

  deleteUnit(unit) {
    this.firestore.collection(this.getLocalStorage()).doc(unit.storeId).delete()

    let savedUnits = this.getSavedUnits()

    savedUnits[unit.dataId].forEach((savedUnit, savedUnitIndex) => {
      if (savedUnit.storeId == unit.storeId) {
        savedUnits[unit.dataId].splice(savedUnitIndex, 1)
      }
    })

    this.localStorageService.set(this.getLocalStorage(), savedUnits);
  }

  getStoredUnit(dataId) {
    let document = this.firestore.collection(this.getLocalStorage()).doc(dataId)

    return document.valueChanges()
  }

  getExportableLink() {
    if (!this.unit.storeId || this.hasChangeBeenMade()) {
      return this.saveUnit(this.unit, "share")
    }

    return new Promise((resolve, reject) => {
      resolve(this.unit.storeId)
    })
  }

  hasChangeBeenMade() {
    let result = true
    if (this.unit.storeId) {
      let newData = this.getSavableData(this.unit)
      let oldData = null
      this.getSavedUnits()[this.unit.dataId].forEach(savedUnit => {
        if (savedUnit.storeId == this.unit.storeId) {
          oldData = savedUnit
          delete oldData.storeId
        }
      })

      return !this.toolService.equal(oldData, newData)
    }

    return result
  }

  changeStar() {
    this.unit.updateMaxLevel()
    this.unit.disableNotAvailableNodes()
  }

  changeLB() {
    this.unit.updateMaxLevel();
    this.unit.updateMaxJobLevel();
  }

  changeLevel(updateUnitStats = true) {
    if (updateUnitStats) {
      this.unit.calculateBaseStats()
    }

    this.unit.calculateTotalStats()
    this.unit.getAvailableStatType()
  }

  changeJobLevel() {
    this.unit.disableNotAvailableNodes()
    this.changeLevel()
  }

  rightClickNode(node) {
    this.unit.rightClickNode(node)
  }

  clickNode(node) {
    this.unit.clickNode(node)
  }

  canActivateNode(node) {
    return this.unit.canActivateNode(node)
  }

  getAvailableSupportNodes(pos) {
    return this.unit.getAvailableSupportNodes(pos, this.nameService)
  }

  getAvailableCounterNodes() {
    return this.unit.getAvailableCounterNodes(this.nameService)
  }

  getAvailableStatType() {
    return this.unit.getAvailableStatType()
  }

  maxUnit() {
    this.unit.maxUnit()
  }

  maxLevelAndJobs() {
    this.unit.maxLevelAndJobs()
  }

  getAvailableEquipments(pos) {
    return this.unit.getAvailableEquipments(pos, this.equipmentService)
  }

  getActiveSkills() {
    this.unit.getActiveSkills(true, this.nameService, this.skillService)
  }

  resetUnit() {
    this.unit.resetUnit()
  }

  resetLevel() {
    this.unit.resetLevel()
  }

  resetJob() {
    this.unit.resetJob()
  }
}
