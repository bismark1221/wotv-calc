import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';

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
import { UnitService } from './unit.service'

@Injectable()
export class TeamService {
  private units: Unit[];

  savedTeams
  team

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
    private unitService: UnitService,
    private http: HttpClient
  ) {}

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_teams" : "teams"
  }

  getSavedTeams() {
    this.savedTeams = this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
    return this.savedTeams;
  }

  getSavableData(team) {
    let data = {
      name: team.name,
      guild: team.guild,
      units: []
    }

    team.units.forEach(unit => {
      data.units.push(this.unitService.getSavableData(unit))
    })

    return data
  }

  saveTeam(team) {
    if (!this.savedTeams) {
      this.getSavedTeams()
    }

    this.savedTeams[team.name] = this.getSavableData(team)

    this.localStorageService.set(this.getLocalStorage(), this.savedTeams);
  }

  getExportableLink() {
    let builderLink = "https://wotv-calc.com" + this.navService.getRoute("/builder/team") + "/" + btoa(JSON.stringify(this.getSavableData(this.team)))
    let shortenUrl = "https://build.wotv-calc.com/yourls-api.php?signature=96c1bdf29a&action=shorturl&format=json&url=" + builderLink

    return this.http.get(shortenUrl);
  }

  getAvailableUnits(pos) {
    return this.unitService.getUnitsForBuilder()
  }

  // selectUnitForBuilder(unitId, customData = null) {
  //   this.unit = new Unit()
  //   this.unit.constructFromJson(JSON.parse(JSON.stringify(this.getUnit(unitId))), this.translateService)
  //   this.unit.name = this.unit.getName(this.translateService)

  //   this.unit.jobsData = []
  //   this.unit.jobs.forEach((jobId, jobIndex) => {
  //     let job = this.jobService.getJob(jobId)
  //     job.name = job.getName(this.translateService)
  //     job.level = 1;
  //     this.unit.jobsData.push(job)
  //   })
  //   this.unit.subjob = 0;

  //   this.unit.star = 1;
  //   this.unit.lb = 0;
  //   this.unit.level = 1;
  //   this.unit.activatedSupport = [
  //     "0",
  //     "0"
  //   ]
  //   this.unit.activatedCounter = "0"

  //   this.unit.masterSkillLevel = [-1]
  //   let i = 0;
  //   this.unit.masterSkill.forEach(skill => {
  //     this.unit.masterSkillLevel.push(i)
  //     i++
  //   })
  //   this.unit.masterSkillActivated = -1;

  //   Object.keys(this.unit.board.nodes).forEach(nodeId => {
  //     if (this.unit.board.nodes[nodeId].skill.unlockStar === null) {
  //       this.unit.board.nodes[nodeId].activated = true
  //       this.unit.board.nodes[nodeId].level = 1
  //     }
  //   })

  //   if (this.unit.limit) {
  //     this.unit.limit.level = 1
  //   }

  //   this.initiateSavedUnit(customData)
  //   this.unit.grid = this.gridService.generateUnitGrid(this.unit)

  //   this.updateMaxLevel();
  //   this.updateMaxJobLevel();
  //   this.changeLevel();
  //   this.getActiveSkills();

  //   return this.unit
  // }

  // private initiateSavedUnit(customData = null) {
  //   let unit = customData
  //   if (!unit) {
  //     let savedUnits = this.getSavedUnits()
  //     unit = savedUnits[this.unit.dataId]
  //   }

  //   if (unit) {
  //     this.unit.star = unit.star;
  //     this.unit.lb = unit.lb;
  //     this.unit.level = parseInt(unit.level);

  //     this.unit.jobs.forEach((jobId, jobIndex) => {
  //       this.unit.jobsData[jobIndex].level = unit.jobs[jobIndex]
  //     })

  //     Object.keys(unit.nodes).forEach(nodeId => {
  //       if (unit.nodes[nodeId]) {
  //         this.unit.board.nodes[nodeId].level = unit.nodes[nodeId]
  //         this.unit.board.nodes[nodeId].activated = true
  //       }
  //     })

  //     if (unit.masterSkill === true) {
  //       this.unit.masterSkillActivated = 0;
  //     } else if (typeof(unit.masterSkill) == "number") {
  //       this.unit.masterSkillActivated = unit.masterSkill
  //     }

  //     if (unit.subjob) {
  //       this.unit.subjob = unit.subjob
  //     }

  //     if (unit.limitLv) {
  //       this.unit.limit.level = unit.limitLv
  //     }

  //     if (unit.activatedSupport[0] || unit.activatedSupport[1]) {
  //       this.unit.activatedSupport = [
  //         unit.activatedSupport[0],
  //         unit.activatedSupport[1]
  //       ]
  //     }

  //     if (unit.activatedCounter) {
  //       this.unit.activatedCounter = unit.activatedCounter
  //     }

  //     this.unit.savedEsper = unit.esper
  //     this.unit.savedCard = unit.card
  //     this.unit.savedEquipments = unit.equipments

  //     if (unit.guild) {
  //       this.unit.savedGuild = unit.guild
  //     }
  //   }
  // }

  // getAvailableEquipments(pos) {
  //   let armorTypes = []
  //   this.unit.jobsData[0].equipments.armors.forEach(type => {
  //     if (type !== "ACC") {
  //       armorTypes.push(type)
  //     }
  //   })

  //   let weaponsTypes = []
  //   this.unit.jobsData[0].equipments.weapons.forEach(type => {
  //     weaponsTypes.push(type)
  //   })

  //   let hasArmor = false
  //   let hasWeapon = false
  //   let countAcc = 0
  //   let hasTmr = false;
  //   for (let i = 0; i <= 2; i++) {
  //     if (i !== pos && this.unit.equipments && this.unit.equipments[i]) {
  //       if (this.unit.equipments[i].type === "ACC") {
  //         countAcc++
  //       } else if (this.equipmentService.isArmor(this.unit.equipments[i].type)) {
  //         hasArmor = true
  //       } else {
  //         hasWeapon = true
  //       }

  //       if (this.unit.equipments[i].acquisition && this.unit.equipments[i].acquisition.type === "tmr") {
  //         hasTmr = true
  //       }
  //     }
  //   }

  //   let equipments = this.equipmentService.getEquipmentsForUnitBuilder()
  //   let availableEquipments = []
  //   let mainJob = this.unit.jobs[0].split("_")
  //   mainJob = mainJob[0] + "_" + mainJob[1] + "_" + mainJob[2]
  //   equipments.forEach(equipment => {
  //     if (((countAcc < 2 && equipment.type === "ACC")
  //       || (!hasArmor && armorTypes.indexOf(equipment.type) !== -1)
  //       || (!hasWeapon && weaponsTypes.indexOf(equipment.type) !== -1))
  //       && (
  //         (!hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr" || (equipment.acquisition.type === "tmr" && this.unit.lb >= 4))
  //         || (hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr"))))
  //     ) {
  //       let jobs = []
  //       equipment.equippableJobs.forEach(job => {
  //         let tableJob = job.split("_")
  //         jobs.push(tableJob[0] + "_" + tableJob[1] + "_" + tableJob[2])
  //       })

  //       if (jobs.indexOf(mainJob) != -1 || equipment.equippableUnits.indexOf(this.unit.dataId) != -1) {
  //         availableEquipments.push(equipment)
  //       }
  //     }
  //   })

  //   return availableEquipments
  // }
}
