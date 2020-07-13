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
  ) {
    this.team = {
      name: "",
      guild: this.guildService.getGuildForBuilder(),
      units: [null, null, null, null, null]
    }
  }

  newTeam() {
    this.team = {
      name: "",
      guild: this.guildService.getGuildForBuilder(),
      units: [null, null, null, null, null]
    }

    return this.team
  }

  getTeam() {
    return this.team
  }

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
      guild: team.guild.data,
      units: []
    }

    team.units.forEach(unit => {
      if (unit) {
        data.units.push(this.unitService.getSavableData(unit))
      }
    })

    return data
  }

  getSavedTeam(teamId) {
    if (!this.savedTeams) {
      this.getSavedTeams()
    }

    return this.savedTeams[teamId]
  }

  saveTeam(team) {
    if (!this.savedTeams) {
      this.getSavedTeams()
    }

    this.savedTeams[team.name] = this.getSavableData(team)

    this.localStorageService.set(this.getLocalStorage(), this.savedTeams);
  }

  teamAlreadyExists(team) {
    if (!this.savedTeams) {
      this.getSavedTeams()
    }

    if (this.savedTeams[team.name]) {
      return true
    }

    return false
  }

  getExportableLink() {
    let builderLink = "https://wotv-calc.com" + this.navService.getRoute("/builder/team") + "/" + btoa(JSON.stringify(this.getSavableData(this.team)))
    //let shortenUrl = "https://build.wotv-calc.com/yourls-api.php?signature=96c1bdf29a&action=shorturl&format=json&url=" + builderLink

    return builderLink
    //return this.http.get(shortenUrl);
  }

  loadTeam(teamId) {
    let team = this.getSavedTeam(teamId)

    this.team.guild.data = team.guild
    this.team.name = team.name

    for (let i = 0; i <= 4; i++) {
      if (team.units[i]) {
        this.team.units[i] = this.unitService.selectUnitForBuilder(team.units[i].dataId, team.units[i])
        this.team.units[i].guild = this.team.guild
      } else {
        this.team.units[i] = null
      }
    }

    for (let i = 0; i <= 4; i++) {
      if (this.team.units[i] && this.team.units[i].card) {
        for (let j = 0; j <= 4; j++) {
          if (j != i && this.team.units[j]) {
            this.team.units[j].teamCards[i] = this.team.units[i].card
          }
        }
      }
    }

    for (let i = 0; i <= 4; i++) {
      if (team.units[i]) {
        this.team.units[i].changeLevel(true, true)
      }
    }

    console.log(team)
    console.log(this.team)
  }

  getAvailableUnits(pos) {
    let alreadyUsedUnitIds = []
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex != pos) {
        alreadyUsedUnitIds.push(unit.dataId)
      }
    })

    let units = this.unitService.getUnitsForBuilder()
    let availableUnits = []

    units.forEach(unit => {
      if (alreadyUsedUnitIds.indexOf(unit.id) == -1) {
        availableUnits.push(unit)
      }
    })

    return availableUnits
  }

  getAvailableCards(pos) {
    let alreadyUsedCardIds = []
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex != pos && unit.card) {
        alreadyUsedCardIds.push(unit.card.dataId)
      }
    })

    let cards = this.cardService.getCardsForBuilder()
    let availableCards = []

    cards.forEach(card => {
      if (alreadyUsedCardIds.indexOf(card.id) == -1) {
        availableCards.push(card)
      }
    })

    return availableCards
  }

  getAvailableEspers(pos) {
    let alreadyUsedEsperIds = []
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex != pos && unit.esper) {
        alreadyUsedEsperIds.push(unit.esper.dataId)
      }
    })

    let cards = this.esperService.getEspersForBuilder()
    let availableEspers = []

    cards.forEach(esper => {
      if (alreadyUsedEsperIds.indexOf(esper.id) == -1) {
        availableEspers.push(esper)
      }
    })

    return availableEspers
  }

  getAvailableEquipments(unitPos, equipmentPos) {
    let armorTypes = []

    this.team.units[unitPos].jobsData[0].equipments.armors.forEach(type => {
      if (type !== "ACC") {
        armorTypes.push(type)
      }
    })

    let weaponsTypes = []
    this.team.units[unitPos].jobsData[0].equipments.weapons.forEach(type => {
      weaponsTypes.push(type)
    })

    let hasArmor = false
    let hasWeapon = false
    let countAcc = 0
    let hasTmr = false;
    for (let i = 0; i <= 2; i++) {
      if (i !== equipmentPos && this.team.units[unitPos].equipments && this.team.units[unitPos].equipments[i]) {
        if (this.team.units[unitPos].equipments[i].type === "ACC") {
          countAcc++
        } else if (this.equipmentService.isArmor(this.team.units[unitPos].equipments[i].type)) {
          hasArmor = true
        } else {
          hasWeapon = true
        }

        if (this.team.units[unitPos].equipments[i].acquisition && this.team.units[unitPos].equipments[i].acquisition.type === "tmr") {
          hasTmr = true
        }
      }
    }

    let equipments = this.equipmentService.getEquipmentsForUnitBuilder()
    let availableEquipments = []
    let mainJob = this.team.units[unitPos].jobs[0].split("_")
    mainJob = mainJob[0] + "_" + mainJob[1] + "_" + mainJob[2]
    equipments.forEach(equipment => {
      if (((countAcc < 2 && equipment.type === "ACC")
        || (!hasArmor && armorTypes.indexOf(equipment.type) !== -1)
        || (!hasWeapon && weaponsTypes.indexOf(equipment.type) !== -1))
        && (
          (!hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr" || (equipment.acquisition.type === "tmr" && this.team.units[unitPos].lb >= 4))
          || (hasTmr && (!equipment.acquisition || equipment.acquisition.type !== "tmr"))))
      ) {
        let jobs = []
        equipment.equippableJobs.forEach(job => {
          let tableJob = job.split("_")
          jobs.push(tableJob[0] + "_" + tableJob[1] + "_" + tableJob[2])
        })

        if (jobs.indexOf(mainJob) != -1 || equipment.equippableUnits.indexOf(this.team.units[unitPos].dataId) != -1) {
          availableEquipments.push(equipment)
        }
      }
    })

    return availableEquipments
  }

  selectUnit(pos, unitId) {
    if (unitId) {
      this.team.units[pos] = this.unitService.selectUnitForBuilder(unitId)
      this.team.units[pos].guild = this.team.guild

      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          if (i != pos) {
            this.team.units[pos].teamCards[i] = this.team.units[i].card
            this.team.units[i].teamCards[pos] = this.team.units[pos].card
            this.team.units[i].changeLevel(false)
          }
        }
      }

      this.team.units[pos].changeLevel(true, true)
    } else {
      this.team.units[pos] = null

      for (let i = 0; i <= 4; i++) {
        if (i != pos && this.team.units[i]) {
          this.team.units[i].teamCards[pos] = null
          this.team.units[i].changeLevel(false)
        }
      }
    }
  }

  selectEsper(pos, esperId, customData = null) {
    if (esperId) {
      this.team.units[pos].esper = this.esperService.selectEsperForBuilder(esperId, customData)
    } else {
      this.team.units[pos].esper = null
    }

    this.team.units[pos].changeLevel(false)
  }

  selectCard(pos, cardId, customData = null) {
    if (cardId) {
      this.team.units[pos].card = this.cardService.selectCardForBuilder(cardId, customData)
    } else {
      this.team.units[pos].card = null
    }

    for (let i = 0; i <= 4; i++) {
      if (this.team.units[i]) {
        if (i != pos) {
          this.team.units[i].teamCards[pos] = this.team.units[pos].card
        }
        this.team.units[i].changeLevel(false)
      }
    }
  }

  selectEquipment(unitPos, equipmentPos, equipmentId, customData = null) {
    if (equipmentId) {
      this.team.units[unitPos].equipments[equipmentPos] = this.equipmentService.selectEquipmentForBuilder(equipmentId, customData)
    } else {
      this.team.units[unitPos].equipments[equipmentPos] = null
    }

    this.team.units[unitPos].changeLevel(false)
  }

  changeStar(pos, value) {
    if (this.team.units[pos]) {
      this.team.units[pos].updateStar(value, true)
    }
  }

  changeLB(pos, value) {
    if (this.team.units[pos]) {
      this.team.units[pos].updateLB(value, true)
    }
  }

  changeJobLevel(pos) {
    if (this.team.units[pos]) {
      this.team.units[pos].changeLevel(true, true)
    }
  }

  changeLevel(pos) {
    if (this.team.units[pos]) {
      this.team.units[pos].changeLevel(true, true)
    }
  }

  changeCardLevel(pos) {
    for (let i = 0; i <= 4; i++) {
      if (i == pos) {
        this.team.units[pos].changeLevel(true, true)
      } else {
        this.team.units[pos].changeLevel(false)
      }
    }
  }

  maxUnit(pos) {
    this.team.units[pos].maxUnit()
  }

  maxLevelAndJobs(pos) {
    this.team.units[pos].maxLevelAndJobs()
  }

  getAvailableSupportNodes(unitPos, supportPos) {
    return this.team.units[unitPos].getAvailableSupportNodes(supportPos, this.nameService)
  }

  getAvailableCounterNodes(pos) {
    return this.team.units[pos].getAvailableCounterNodes(this.nameService)
  }
}
