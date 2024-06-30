import { Injectable } from '@angular/core';

import { Unit } from '../entities/unit';

import { TranslateService } from './translate.service';
import { GuildService } from './guild.service';
import { MasterRanksService } from './mr.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { EquipmentService } from './equipment.service';
import { CardService } from './card.service';
import { EsperService } from './esper.service';
import { UnitService } from './unit.service';
import { AuthService } from './auth.service';
import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { ApiService } from './api.service';

@Injectable()
export class TeamService {
  private units: Unit[];

  savedTeams;
  team = null;

  constructor(
    private translateService: TranslateService,
    private guildService: GuildService,
    private masterRanksService: MasterRanksService,
    private navService: NavService,
    private equipmentService: EquipmentService,
    private cardService: CardService,
    private esperService: EsperService,
    private unitService: UnitService,
    private toolService: ToolService,
    private authService: AuthService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private apiService: ApiService
  ) {}

  private async getApiUser(type, extra = null) {
    switch (type) {
      case 'get':
        extra.push({name: 'type', value: 'teams'});
        return JSON.parse(JSON.stringify(await this.apiService.get('userData', null, extra)));
      break;
      case 'post':
        return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'teams', data: extra})));
      break;
      case 'delete':
        return JSON.parse(JSON.stringify(await this.apiService.delete('userData', {type: 'teams', storeId: extra})));
      break;
      default:
      break;
    }

    return null;
  }

  async newTeam() {
    this.team = {
      name: '',
      guild: this.guildService.getGuildForBuilder(),
      masterRanks: await this.masterRanksService.getMasterRanksForBuilder(),
      units: [null, null, null, null, null],
      cost: 0,
      atk: 0,
      mag: 0
    };

    return this.team;
  }

  getTeam() {
    return this.team;
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_teams' : 'teams';
  }

  getSavedTeams() {
    return localStorage.getItem('wotv-calc.' + this.getLocalStorage()) ? JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage())) : {};
  }

  getSavableData(team) {
    const user = this.authService.getUser();

    const data = {
      name: team.name,
      guild: this.guildService.getSavableData(team.guild.data, false),
      masterRanks: this.masterRanksService.getSavableData(team.masterRanks.data, false),
      units: [],
      user: user ? user.uid : null
    };

    team.units.forEach(unit => {
      if (unit) {
        data.units.push(this.unitService.getSavableData(unit));
      }
    });

    if (team.storeId) {
      // @ts-ignore
      data.storeId = team.storeId;
    }

    return data;
  }

  async saveTeam(team, method) {
    const savableData = this.getSavableData(team);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        delete savableData.user;
      }

      const data = await this.getApiUser('post', savableData);

      if (method === 'new') {
        // @ts-ignore
        savableData.storeId = data.storeId;
        const savedTeams = this.getSavedTeams();
        savedTeams[team.name] = savableData;

        localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savedTeams));
      }

      this.team.storeId = data.storeId;

      return data.storeId;
    } else {
      const data = await this.getApiUser('post', savableData);

      const savedTeams = this.getSavedTeams();
      Object.keys(savedTeams).forEach((teamName, teamIndex) => {
        if (savedTeams[teamName].storeId === team.storeId) {
          savedTeams[teamName] = savableData;
          savedTeams[teamName].storeId = team.storeId;
        }
      });

      localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savedTeams));

      return team.storeId;
    }
  }

  async deleteTeam(team) {
    await this.getApiUser('delete', team.storeId);

    const savedTeams = this.getSavedTeams();

    Object.keys(savedTeams).forEach((teamName, savedTeamIndex) => {
      if (savedTeams[teamName].storeId === team.storeId) {
        delete savedTeams[teamName];
      }
    });

    localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savedTeams));
  }

  async getStoredTeam(storeId) {
    return await this.getApiUser('get', [{name: 'storeId', value: storeId}]);
  }

  async getExportableLink() {
    if (!this.team.storeId || this.hasChangeBeenMade()) {
      return await this.saveTeam(this.team, 'share');
    }

    return this.team.storeId;
  }

  hasChangeBeenMade() {
    const result = true;
    if (this.team.storeId) {
      const newData = this.getSavableData(this.team);
      let oldData = null;
      const savedTeams = this.getSavedTeams();

      Object.keys(savedTeams).forEach(teamName => {
        if (savedTeams[teamName].storeId === this.team.storeId) {
          oldData = savedTeams[teamName];
          delete oldData.storeId;
        }
      });

      return !this.toolService.equal(oldData, newData);
    }

    return result;
  }

  teamAlreadyExists(team) {
    const savedTeams = this.getSavedTeams();
    let teamFinded = false;

    Object.keys(savedTeams).forEach(teamName => {
      if (savedTeams[teamName].name === team.name) {
        teamFinded = true;
      }
    });

    return teamFinded;
  }

  async updateTeam(data) {
    if (this.team && data) {
      this.team.guild.data = data.guild;
      if (data.masterRanks) {
        this.team.masterRanks.data = data.masterRanks;
      }

      this.team.name = data.name;
      this.team.storeId = data.storeId;

      for (let i = 0; i <= 4; i++) {
        if (data.units[i]) {
          this.team.units[i] = await this.unitService.selectUnitForBuilder(data.units[i].dataId, data.units[i]);
          this.team.units[i].guild = this.team.guild;
          this.team.units[i].masterRanks = this.team.masterRanks;
        } else {
          this.team.units[i] = null;
        }
      }

      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i] && this.team.units[i].card) {
          for (let j = 0; j <= 4; j++) {
            if (j !== i && this.team.units[j]) {
              this.team.units[j].teamCards[i] = this.team.units[i].card;
            }
          }
        }
        if (this.team.units[i] && this.team.units[i].subCard) {
          for (let j = 0; j <= 4; j++) {
            if (j !== i && this.team.units[j]) {
              this.team.units[j].teamSubCards[i] = this.team.units[i].subCard;
            }
          }
        }

        for (let j = 0; j <= 4; j++) {
          if (this.team.units[i] && this.team.units[j] && j !== i) {
            this.addMasterAbility(i, j);
          }
        }
      }

      for (let i = 0; i <= 4; i++) {
        if (data.units[i]) {
          this.team.units[i].changeLevel(true);
        }
      }
    }

    this.updateTeamCost();
  }

  async getAvailableUnits(pos) {
    const alreadyUsedUnitIds = [];
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex !== pos) {
        alreadyUsedUnitIds.push(unit.dataId);
      }
    });

    const units = await this.unitService.getUnitsForBuilder();
    const availableUnits = [];

    units.forEach(unit => {
      if (alreadyUsedUnitIds.indexOf(unit.dataId) === -1) {
        availableUnits.push(unit);
      }
    });

    return availableUnits;
  }

  async getAvailableCards(pos, type) {
    const alreadyUsedCardIds = [];
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex !== pos) {
        if (unit.card) {
          alreadyUsedCardIds.push(unit.card.dataId);
        }

        if (unit.subCard) {
          alreadyUsedCardIds.push(unit.subCard.dataId);
        }
      }
    });

    if (type === 'main' && this.team.units[pos].subCard) {
      alreadyUsedCardIds.push(this.team.units[pos].subCard.dataId);
    } else if (type === 'sub' && this.team.units[pos].card) {
      alreadyUsedCardIds.push(this.team.units[pos].card.dataId);
    }

    const result = await this.cardService.getCardsForListing(null, 'rarity', 'desc', true);
    const cards = result.cards;
    const availableCards = [];

    cards.forEach(card => {
      if (alreadyUsedCardIds.indexOf(card.dataId) === -1) {
        availableCards.push(card);
      }
    });

    return {
      cards: availableCards,
      rawJobs : result.rawJobs
    };
  }

  async getAvailableEspers(pos) {
    const alreadyUsedEsperIds = [];
    this.team.units.forEach((unit, unitIndex) => {
      if (unit && unitIndex !== pos && unit.esper) {
        alreadyUsedEsperIds.push(unit.esper.dataId);
      }
    });

    const espers = await this.esperService.getEspersForListing();
    const availableEspers = [];

    espers.forEach(esper => {
      if (alreadyUsedEsperIds.indexOf(esper.dataId) === -1) {
        availableEspers.push(esper);
      }
    });

    return availableEspers;
  }

  async selectUnit(pos, dataId, customData = null) {
    if (dataId) {
      this.team.units[pos] = await this.unitService.selectUnitForBuilder(dataId, customData);
      this.team.units[pos].guild = this.team.guild;
      this.team.units[pos].masterRanks = this.team.masterRanks;

      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          if (i !== pos) {
            this.team.units[pos].teamCards[i] = this.team.units[i].card;
            this.team.units[i].teamCards[pos] = this.team.units[pos].card;

            this.team.units[pos].teamSubCards[i] = this.team.units[i].subCard;
            this.team.units[i].teamSubCards[pos] = this.team.units[pos].subCard;

            this.addMasterAbility(pos, i);
            this.addMasterAbility(i, pos);

            this.team.units[i].changeLevel();
          }
        }
      }

      this.team.units[pos].changeLevel(true);
    } else {
      this.team.units[pos] = null;

      for (let i = 0; i <= 4; i++) {
        if (i !== pos && this.team.units[i]) {
          this.team.units[i].teamCards[pos] = null;
          this.team.units[i].teamSubCards[pos] = null;
          this.team.units[i].teamMasterAbility[pos] = null;
          this.team.units[i].changeLevel();
        }
      }
    }

    this.updateTeamCost();
  }

  addMasterAbility(unitPos, friendPos) {
    const masterSkill = this.team.units[friendPos].formattedMasterSkill[this.team.units[friendPos].masterSkill.length - 1];
    const effects = [];

    masterSkill.effects.forEach(effect => {
      if (effect.target === 'selfSide') {
        switch (effect.condition) {
          case 'FIRE_ELEMENT':
            if (this.team.units[unitPos].element === 'fire') {
              effects.push(effect);
            }
            break;
          case 'ICE_ELEMENT':
            if (this.team.units[unitPos].element === 'ice') {
              effects.push(effect);
            }
            break;
          case 'WIND_ELEMENT':
            if (this.team.units[unitPos].element === 'wind') {
              effects.push(effect);
            }
            break;
          case 'EARTH_ELEMENT':
            if (this.team.units[unitPos].element === 'earth') {
              effects.push(effect);
            }
            break;
          case 'LIGHTNING_ELEMENT':
            if (this.team.units[unitPos].element === 'lightning') {
              effects.push(effect);
            }
            break;
          case 'WATER_ELEMENT':
            if (this.team.units[unitPos].element === 'water') {
              effects.push(effect);
            }
            break;
          case 'LIGHT_ELEMENT':
            if (this.team.units[unitPos].element === 'light') {
              effects.push(effect);
            }
            break;
          case 'DARK_ELEMENT':
            if (this.team.units[unitPos].element === 'dark') {
              effects.push(effect);
            }
            break;
          default:
            console.log('Not managed condition in master skill : ' + masterSkill.dataId);
            break;
        }
      }
    });

    this.team.units[unitPos].teamMasterAbility[friendPos] = effects;
  }

  changeStar(pos, value) {
    if (this.team.units[pos]) {
      this.team.units[pos].updateStar(value, true);
      this.updateTeamCost();
    }
  }

  changeLB(pos, value) {
    if (this.team.units[pos]) {
      this.team.units[pos].updateLB(value, true);
      this.updateTeamCost();
    }
  }

  changeJobLevel(pos) {
    if (this.team.units[pos]) {
      this.team.units[pos].changeLevel(true);
      this.team.units[pos].updateMaxLevel(true);
      this.updateTeamCost();
    }
  }

  changeLevel(pos) {
    if (this.team.units[pos]) {
      this.team.units[pos].changeLevel(true);
      this.updateTeamCost();
    }
  }

  changeCardLevel(pos) {
    for (let i = 0; i <= 4; i++) {
      if (i === pos) {
        this.team.units[pos].changeLevel(true);
      } else {
        this.team.units[pos].changeLevel();
      }
    }

    this.updateTeamCost();
  }

  maxUnit(pos) {
    this.team.units[pos].maxUnit(true);
    this.updateTeamCost();
  }

  maxLevelAndJobs(pos) {
    this.team.units[pos].maxLevelAndJobs();
    this.updateTeamCost();
  }

  getAvailableStatType(pos) {
    const availableStatType = this.team.units[pos].getAvailableStatType();
    const buffsImage = [
      'dark_atk',
      'dark_killer',
      'dark_res',
      'earth_atk',
      'earth_killer',
      'earth_res',
      'fire_atk',
      'fire_killer',
      'fire_res',
      'ice_atk',
      'ice_killer',
      'ice_res',
      'light_atk',
      'light_killer',
      'light_res',
      'lightning_atk',
      'lightning_killer',
      'lightning_res',
      'neutral_atk',
      'neutral_killer',
      'neutral_res',
      'water_atk',
      'water_killer',
      'water_res',
      'wind_atk',
      'wind_killer',
      'wind_res',

      'magic_atk',
      'magic_res',
      'missile_atk',
      'missile_res',
      'pierce_atk',
      'pierce_res',
      'slash_atk',
      'slash_res',
      'strike_atk',
      'strike_res',

      'poison_res',
      'frostbite_res',
      'curse_res',
      'blind_res',
      'sleep_res',
      'silence_res',
      'paralyze_res',
      'confusion_res',
      'petrify_res',
      'toad_res',
      'charm_res',
      'slow_res',
      'stop_res',
      'immobilize_res',
      'disable_res',
      'berserk_res',
      'doom_res',
      'stun_res',
    ];

    const formattedAvailableStatType = {
      images: [[]],
      text: []
    };

    availableStatType.forEach(statType => {
      if (buffsImage.indexOf(statType.toLowerCase()) !== -1) {
        if (formattedAvailableStatType.images[formattedAvailableStatType.images.length - 1].length === 2) {
          formattedAvailableStatType.images.push([]);
        }
        formattedAvailableStatType.images[formattedAvailableStatType.images.length - 1].push(statType);
      } else {
        formattedAvailableStatType.text.push(statType);
      }
    });

    return formattedAvailableStatType;
  }

  updateTeamCost() {
    this.team.cost = 0;
    this.team.atk = 0;
    this.team.mag = 0;

    this.team.units.forEach(unit => {
      if (unit) {
        this.team.cost += unit.calcCost.total;
        this.team.atk += unit.stats.ATK.total;
        this.team.mag += unit.stats.MAG.total;
      }
    });
  }

  resetUnit(pos) {
    this.team.units[pos].resetUnit();
    this.updateTeamCost();
  }

  resetLevel(pos) {
    this.team.units[pos].resetLevel();
    this.updateTeamCost();
  }

  resetJob(pos) {
    this.team.units[pos].resetJob();
    this.updateTeamCost();
  }

  getActiveSkills(pos) {
    this.team.units[pos].getActiveSkills(true, this.toolService, this.skillService, this.rangeService);
  }

  maxDreamStats(pos) {
    this.team.units[pos].maxDreamStats();
    this.team.units[pos].changeLevel();
  }

  resetDreamStats(pos) {
    this.team.units[pos].resetDreamStats();
    this.team.units[pos].changeLevel();
  }
}
