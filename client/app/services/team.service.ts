import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Unit } from '../entities/unit';
import { GuildService } from './guild.service'
import { MasterRanksService } from './mr.service'
import { NavService } from './nav.service'
import { NameService } from './name.service'
import { EquipmentService } from './equipment.service'
import { CardService } from './card.service'
import { EsperService } from './esper.service'
import { UnitService } from './unit.service'
import { AuthService } from './auth.service'
import { ToolService } from './tool.service'

@Injectable()
export class TeamService {
  private units: Unit[];

  savedTeams
  team

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private guildService: GuildService,
    private masterRanksService: MasterRanksService,
    private navService: NavService,
    private nameService: NameService,
    private equipmentService: EquipmentService,
    private cardService: CardService,
    private esperService: EsperService,
    private unitService: UnitService,
    private firestore: AngularFirestore,
    private toolService: ToolService,
    private authService: AuthService
  ) {
    this.team = {
      name: "",
      guild: this.guildService.getGuildForBuilder(),
      masterRanks: this.masterRanksService.getMasterRanksForBuilder(),
      units: [null, null, null, null, null]
    }
  }

  newTeam() {
    this.team = {
      name: "",
      guild: this.guildService.getGuildForBuilder(),
      masterRanks: this.masterRanksService.getMasterRanksForBuilder(),
      units: [null, null, null, null, null],
      cost: 0
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
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(team) {
    let user = this.authService.getUser()

    let data = {
      name: team.name,
      guild: this.guildService.getSavableData(team.guild.data, false),
      masterRanks: this.masterRanksService.getSavableData(team.masterRanks.data, false),
      units: [],
      user: user ? user.uid : null
    }

    team.units.forEach(unit => {
      if (unit) {
        data.units.push(this.unitService.getSavableData(unit))
      }
    })

    return data
  }

  saveTeam(team, method) {
    let savableData = this.getSavableData(team)

    if (method == "new" || method == "share") {
      if (method == "share") {
        delete savableData.user
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method == "new") {
          // @ts-ignore
          savableData.storeId = data.id
          let savedTeams = this.getSavedTeams()
          savedTeams[team.name] = savableData

          this.localStorageService.set(this.getLocalStorage(), savedTeams);
        }

        this.team.storeId = data.id

        return data.id
      })
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(team.storeId).set(savableData).then(data => {
        let savedTeams = this.getSavedTeams()
        Object.keys(savedTeams).forEach((teamName, teamIndex) => {
          if (savedTeams[teamName].storeId == team.storeId) {
            savedTeams[teamName] = savableData
            savedTeams[teamName].storeId = team.storeId
          }
        })

        this.localStorageService.set(this.getLocalStorage(), savedTeams);

        return team.storeId
      })
    }
  }

  deleteTeam(team) {
    this.firestore.collection(this.getLocalStorage()).doc(team.storeId).delete()

    let savedTeams = this.getSavedTeams()

    Object.keys(savedTeams).forEach((teamName, savedTeamIndex) => {
      if (savedTeams[teamName].storeId == team.storeId) {
        delete savedTeams[teamName]
      }
    })

    this.localStorageService.set(this.getLocalStorage(), savedTeams);
  }

  getStoredTeam(storeId) {
    let document = this.firestore.collection(this.getLocalStorage()).doc(storeId)

    return document.valueChanges()
  }

  getExportableLink() {
    if (!this.team.storeId || this.hasChangeBeenMade()) {
      return this.saveTeam(this.team, "share")
    }

    return new Promise((resolve, reject) => {
      resolve(this.team.storeId)
    })
  }

  hasChangeBeenMade() {
    let result = true
    if (this.team.storeId) {
      let newData = this.getSavableData(this.team)
      let oldData = null
      let savedTeams = this.getSavedTeams()

      Object.keys(savedTeams).forEach(teamName => {
        if (savedTeams[teamName].storeId == this.team.storeId) {
          oldData = savedTeams[teamName]
          delete oldData.storeId
        }
      })

      return !this.toolService.equal(oldData, newData)
    }

    return result
  }

  teamAlreadyExists(team) {
    let savedTeams = this.getSavedTeams()
    let teamFinded = false

    Object.keys(savedTeams).forEach(teamName => {
      if (savedTeams[teamName].name == team.name) {
        teamFinded = true
      }
    })

    return teamFinded
  }

  updateTeam(data) {
    if (this.team && data) {
      this.team.guild.data = data.guild
      if (data.masterRanks) {
        this.team.masterRanks.data = data.masterRanks
      }

      this.team.name = data.name
      this.team.storeId = data.storeId

      for (let i = 0; i <= 4; i++) {
        if (data.units[i]) {
          this.team.units[i] = this.unitService.selectUnitForBuilder(data.units[i].dataId, data.units[i])
          this.team.units[i].guild = this.team.guild
          this.team.units[i].masterRanks = this.team.masterRanks
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

        for (let j = 0; j <= 4; j++) {
          if (this.team.units[i] && this.team.units[j] && j != i) {
            this.addMasterAbility(i, j)
          }
        }
      }

      for (let i = 0; i <= 4; i++) {
        if (data.units[i]) {
          this.team.units[i].changeLevel(true)
        }
      }
    }

    this.updateTeamCost()
  }

  getAvailableUnits(pos) {
    let alreadyUsedUnitIds = []
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex != pos) {
        alreadyUsedUnitIds.push(unit.dataId)
      }
    })

    let units = this.unitService.getUnitsForJPBuilder()
    let availableUnits = []

    units.forEach(unit => {
      if (alreadyUsedUnitIds.indexOf(unit.dataId) == -1) {
        availableUnits.push(unit)
      }
    })

    return availableUnits
  }

  getAvailableCards(pos, filters) {
    let alreadyUsedCardIds = []
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex != pos && unit.card) {
        alreadyUsedCardIds.push(unit.card.dataId)
      }
    })

    let cards = this.cardService.getCardsForListing(filters)
    let availableCards = []

    cards.forEach(card => {
      if (alreadyUsedCardIds.indexOf(card.dataId) == -1) {
        availableCards.push(card)
      }
    })

    return availableCards
  }

  getAvailableEspers(pos, filters) {
    let alreadyUsedEsperIds = []
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex != pos && unit.esper) {
        alreadyUsedEsperIds.push(unit.esper.dataId)
      }
    })

    let espers = this.esperService.getEspersForListing(filters)
    let availableEspers = []

    espers.forEach(esper => {
      if (alreadyUsedEsperIds.indexOf(esper.dataId) == -1) {
        availableEspers.push(esper)
      }
    })

    return availableEspers
  }

  getAvailableEquipments(unitPos, equipmentPos) {
    return this.team.units[unitPos].getAvailableEquipments(equipmentPos, this.equipmentService)
  }

  selectUnit(pos, dataId, customData = null) {
    if (dataId) {
      this.team.units[pos] = this.unitService.selectUnitForBuilder(dataId, customData)
      this.team.units[pos].guild = this.team.guild
      this.team.units[pos].masterRanks = this.team.masterRanks

      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          if (i != pos) {
            this.team.units[pos].teamCards[i] = this.team.units[i].card
            this.team.units[i].teamCards[pos] = this.team.units[pos].card

            this.addMasterAbility(pos, i)
            this.addMasterAbility(i, pos)

            this.team.units[i].changeLevel()
          }
        }
      }

      this.team.units[pos].changeLevel(true)
    } else {
      this.team.units[pos] = null

      for (let i = 0; i <= 4; i++) {
        if (i != pos && this.team.units[i]) {
          this.team.units[i].teamCards[pos] = null
          this.team.units[i].teamMasterAbility[pos] = null
          this.team.units[i].changeLevel()
        }
      }
    }

    this.updateTeamCost()
  }

  addMasterAbility(unitPos, friendPos) {
    let masterSkill = this.team.units[friendPos].masterSkill[this.team.units[friendPos].masterSkill.length - 1]
    let effects = []

    masterSkill.effects.forEach(effect => {
      if (effect.target == "selfSide") {
        switch (effect.condition) {
          case "FIRE_ELEMENT":
            if (this.team.units[unitPos].element == "fire") {
              effects.push(effect)
            }
            break;
          case "ICE_ELEMENT":
            if (this.team.units[unitPos].element == "ice") {
              effects.push(effect)
            }
            break;
          case "WIND_ELEMENT":
            if (this.team.units[unitPos].element == "wind") {
              effects.push(effect)
            }
            break;
          case "EARTH_ELEMENT":
            if (this.team.units[unitPos].element == "earth") {
              effects.push(effect)
            }
            break;
          case "LIGHTNING_ELEMENT":
            if (this.team.units[unitPos].element == "lightning") {
              effects.push(effect)
            }
            break;
          case "WATER_ELEMENT":
            if (this.team.units[unitPos].element == "water") {
              effects.push(effect)
            }
            break;
          case "LIGHT_ELEMENT":
            if (this.team.units[unitPos].element == "light") {
              effects.push(effect)
            }
            break;
          case "DARK_ELEMENT":
            if (this.team.units[unitPos].element == "dark") {
              effects.push(effect)
            }
            break;
          default:
            console.log("Not manaaged condition in master skill : " + masterSkill.dataId)
            break;
        }
      }
    })

    this.team.units[unitPos].teamMasterAbility[friendPos] = effects
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
      this.team.units[pos].changeLevel(true)
      this.team.units[pos].updateMaxLevel(true)
    }
  }

  changeLevel(pos) {
    if (this.team.units[pos]) {
      this.team.units[pos].changeLevel(true)
    }
  }

  changeCardLevel(pos) {
    for (let i = 0; i <= 4; i++) {
      if (i == pos) {
        this.team.units[pos].changeLevel(true)
      } else {
        this.team.units[pos].changeLevel()
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

  getAvailableStatType(pos) {
    let availableStatType = this.team.units[pos].getAvailableStatType()
    let buffsImage = [
      "dark_atk",
      "dark_killer",
      "dark_res",
      "earth_atk",
      "earth_killer",
      "earth_res",
      "fire_atk",
      "fire_killer",
      "fire_res",
      "ice_atk",
      "ice_killer",
      "ice_res",
      "light_atk",
      "light_killer",
      "light_res",
      "lightning_atk",
      "lightning_killer",
      "lightning_res",
      "neutral_atk",
      "neutral_killer",
      "neutral_res",
      "water_atk",
      "water_killer",
      "water_res",
      "wind_atk",
      "wind_killer",
      "wind_res",

      "magic_atk",
      "magic_res",
      "missile_atk",
      "missile_res",
      "pierce_atk",
      "pierce_res",
      "slash_atk",
      "slash_res",
      "strike_atk",
      "strike_res",
    ]

    let formattedAvailableStatType = {
      images: [[]],
      text: []
    }

    availableStatType.forEach(statType => {
      if (buffsImage.indexOf(statType.toLowerCase()) != -1) {
        if (formattedAvailableStatType.images[formattedAvailableStatType.images.length - 1].length == 2) {
          formattedAvailableStatType.images.push([])
        }
        formattedAvailableStatType.images[formattedAvailableStatType.images.length - 1].push(statType)
      } else {
        formattedAvailableStatType.text.push(statType)
      }
    })

    return formattedAvailableStatType
  }

  updateTeamCost() {
    this.team.cost = 0
    this.team.units.forEach(unit => {
      if (unit) {
        this.team.cost += unit.calcCost.total
      }
    })
  }

  resetUnit(pos) {
    this.team.units[pos].resetUnit()
  }

  resetLevel(pos) {
    this.team.units[pos].resetLevel()
  }

  resetJob(pos) {
    this.team.units[pos].resetJob()
  }
}
