import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

import { Unit } from '../entities/unit';
import { Job } from '../entities/job';

import { TranslateService } from './translate.service';
import { GridService } from './grid.service';
import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { JobService } from './job.service';
import { GuildService } from './guild.service';
import { MasterRanksService } from './mr.service';
import { NavService } from './nav.service';
import { EquipmentService } from './equipment.service';
import { CardService } from './card.service';
import { EsperService } from './esper.service';
import { AuthService } from './auth.service';
import { ToolService } from './tool.service';
import { ApiService } from './api.service';

import { GL_JOB_GROUP } from '../data/gl/jobGroup';
import { JP_JOB_GROUP } from '../data/jp/jobGroup';

@Injectable()
export class UnitService {
  private JP_units: Unit[];
  private GL_units: Unit[];
  unit;

  private lvTbl = [0, 256, 1841, 5060, 10168, 17371, 26830, 38661, 52940, 69706, 88964, 110688, 134825, 161299, 190014, 220858, 253705, 288418, 324853, 362860, 402286, 442978, 484782, 527547, 571125, 615372, 660149, 705322, 750764, 796354, 850011, 911367, 980075, 1055809, 1138261, 1227141, 1322175, 1423105, 1529686, 1641686, 1758885, 1881074, 2008055, 2139639, 2275646, 2415905, 2560252, 2708530, 2860589, 3016285, 3175480, 3338041, 3503840, 3672754, 3844664, 4019456, 4197018, 4377243, 4560026, 4745266, 4943725, 5155044, 5378891, 5614957, 5862956, 6122623, 6393712, 6675996, 6969265, 7273325, 7587997, 7913115, 8248527, 8594093, 8949685, 9315185, 9690486, 10075489, 10470105, 10874253, 11278159, 11682129, 12086445, 12491365, 12897126, 13303945, 13712021, 14121536, 14532657, 14945535, 15360309, 15777105, 16196037, 16617209, 17040715, 17466640, 17895061, 18326047, 18759660, 19195955, 19660007, 20155469, 20682486, 21241240, 21831948, 22454862, 23110270, 23798495, 24519896, 25274868, 26080514, 26938454, 27850414, 28818234, 29843872, 30929412, 32077072, 33289209, 34568330, 35917100, 35917101];
  private limitLvTbl = [0, 670, 2385, 5345, 9734, 15728, 23500, 33223, 45073, 59232, 75890, 95247, 117515, 142919, 171699, 204111, 240431, 280954, 325998, 375907];

  jobGroups = {
    GL: GL_JOB_GROUP,
    JP: JP_JOB_GROUP
  };

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private gridService: GridService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private jobService: JobService,
    private guildService: GuildService,
    private masterRanksService: MasterRanksService,
    private navService: NavService,
    private equipmentService: EquipmentService,
    private cardService: CardService,
    private esperService: EsperService,
    private http: HttpClient,
    private authService: AuthService,
    private toolService: ToolService,
    private apiService: ApiService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('units', param, extraQuery)));
  }

  private async getApiPost(data = null) {
    return JSON.parse(JSON.stringify(await this.apiService.post('units', data)));
  }

  private async getApiUser(type, extra = null) {
    switch (type) {
      case 'get':
        extra.push({name: 'type', value: 'units'});
        return JSON.parse(JSON.stringify(await this.apiService.get('userData', null, extra)));
      break;
      case 'post':
        return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'units', data: extra})));
      break;
      case 'delete':
        return JSON.parse(JSON.stringify(await this.apiService.delete('userData', {type: 'units', storeId: extra})));
      break;
      default:
      break;
    }

    return null;
  }

  async getUnitsForListingWithCost(filters = null, sort = 'rarity', order = 'desc', options = null) {
    let apiResult = null;

    if (!options) {
      apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);
    } else {
      apiResult = await this.getApiPost(options);
    }

    const rawUnits = [];
    const costs = [];

    for (const apiUnit of apiResult.units) {
      const rawUnit = new Unit();
      rawUnit.constructFromJson(apiUnit, this.translateService);
      rawUnits.push(rawUnit);

      if (costs.indexOf(rawUnit.cost) === -1) {
        costs.push(rawUnit.cost);
      }
    }

    const jobs = [];
    for (const rawJob of apiResult.jobs) {
      if (rawJob.statsModifiers && rawJob.statsModifiers.length > 10) {
        rawJob.name = this.toolService.getName(rawJob);
        jobs.push(rawJob);
      }
    }

    return {
      rawUnits: rawUnits,
      rawJobs: jobs,
      units: this.filterUnitsWithApi(rawUnits, filters, jobs, sort, order, true),
      jobs: this.jobService.getUniqJobsByIds(jobs),
      costs: costs.sort((a, b) => b - a)
    };
  }

  filterUnitsWithApi(units, rawFilters, jobs, sort, order, fromList) {
    const filteredUnits = [];
    let filters: any = {};

    if (filters) {
      if (fromList) {
        Object.keys(rawFilters).forEach(filterSection => {
          rawFilters[filterSection].filters.forEach(filter => {
            if (filter.type === 'list') {
              filters[filter.id] = filter.values;
            } else if (filter.type === 'switch') {
              filters[filter.id] = filter.value;
            }
          });
        });
      } else {
        filters = rawFilters;
      }

      for (const unit of units) {
        if ((filters.element.length === 0 || filters.element.indexOf(unit.element) !== -1)
          && (filters.rarity.length === 0 || filters.rarity.indexOf(unit.rarity) !== -1)
          && (filters.cost.length === 0 || filters.cost.indexOf(unit.cost) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(unit.dataId)) !== -1)
          && (!filters.exJob || unit.exJobs.length > 0)
          && (!filters.dream || (unit.dream && unit.dream.skills))
          && (!filters.secondMasterAbility || (unit.masterSkill && unit.masterSkill.length > 1))
          && (!unit.fromOtherVersion)
        ) {
          let possbibleToAdd = true;

          if (filters.job && filters.job.length > 0) {
            possbibleToAdd = this.unitHasJob(unit, filters);
          }

          if (possbibleToAdd && ((filters.weapon && filters.weapon.length > 0) || (filters.weaponsGroup && filters.weaponsGroup.length > 0) || (filters.armor && filters.armor.length > 0))) {
            possbibleToAdd = this.unitCanEquipWithApi(unit, filters, jobs);
          }

          if (possbibleToAdd) {
            filteredUnits.push(unit);
          }
        }
      }

      return this.sortUnits(filteredUnits, sort, order);
    } else {
      for (const unit of units) {
        if (!unit.fromOtherVersion) {
          filteredUnits.push(unit);
        }
      }

      return this.sortUnits(filteredUnits, sort, order);
    }
  }

  private unitCanEquipWithApi(unit, filters, jobs) {
    let unitCanEquip = true;
    const job = jobs.find(searchedJob => searchedJob.dataId === unit.jobs[0]);
    const hasWeaponFilter = filters.weapon && filters.weapon.length > 0;
    const hasWeaponGroupFilter = filters.weaponsGroup && filters.weaponsGroup.length > 0;
    const hasArmorFilter = filters.armor && filters.armor.length > 0;

    if (hasWeaponFilter) {
      let weaponFound = false;
      let i = 0;

      while (!weaponFound && i <= filters.weapon.length - 1) {
        if (job.equipments.weapons.indexOf(filters.weapon[i]) !== -1) {
          weaponFound = true;
        }

        i++;
      }

      if (!weaponFound) {
        unitCanEquip = false;
      }
    }

    if ((!unitCanEquip || (unitCanEquip && !hasWeaponFilter))
      && hasWeaponGroupFilter
    ) {
      unitCanEquip = true;
      let weaponGroupFound = false;
      let i = 0;
      const version = this.navService.getVersion();
      const jobGroups = this.jobGroups[version];

      while (!weaponGroupFound && i <= filters.weaponsGroup.length - 1) {
        if (jobGroups[filters.weaponsGroup[i]]) {
          let j = 0;
          while(!weaponGroupFound && j <= jobGroups[filters.weaponsGroup[i]].length - 1) {
            if (this.unitHasJob(unit, {job: [jobGroups[filters.weaponsGroup[i]][j]], subjob: false, mainJob: true})) {
              weaponGroupFound = true;
            }

            j++;
          }
        }

        i++;
      }

      if (!weaponGroupFound) {
        unitCanEquip = false;
      }
    }

    if ((!unitCanEquip || (unitCanEquip && !hasWeaponFilter && !hasWeaponGroupFilter))
      && hasArmorFilter
    ) {
      unitCanEquip = true;
      let armorFound = false;
      let i = 0;

      while (!armorFound && i <= filters.armor.length - 1) {
        if (job.equipments.armors.indexOf(filters.armor[i]) !== -1) {
          armorFound = true;
        }

        i++;
      }

      if (!armorFound) {
        unitCanEquip = false;
      }
    }

    return unitCanEquip;
  }

  async getUnitBySlugWithApi(slug) {
    const apiResult = await this.getApi(slug, [{name: 'forDetail', value: 1}]);

    if (apiResult.unit) {
      const unit = new Unit();
      unit.constructFromJson(apiResult.unit, this.translateService);

      unit.rawJobs = apiResult.jobs;
      unit.rawSkills = apiResult.skills;
      unit.index = apiResult.index;
      unit.tmr = apiResult.tmr;

      this.formatSkillsWithApi(unit);

      return unit;
    }

    return null;
  }

  formatSkillsWithApi(unit) {
    unit.formattedUnlockedSkills = [];
    if (unit.unlockedSkills) {
      for (const skillId of unit.unlockedSkills) {
        if (skillId) {
          unit.formattedUnlockedSkills.push(unit.rawSkills.find(searchedSkill => searchedSkill.dataId === skillId));
        }
      }
    }

    for (const nodeId of Object.keys(unit.board.nodes)) {
      const node = unit.board.nodes[nodeId];
      if (node.dataId) {
        unit.board.nodes[nodeId].skill = unit.rawSkills.find(searchedSkill => searchedSkill.dataId === node.dataId);
      }

      if (unit.board.nodes[nodeId].skill) {
        if (unit.board.nodes[nodeId].skill.type === 'buff' || unit.board.nodes[nodeId].skill.type === 'ex_buff') {
          unit.board.nodes[nodeId].skill = JSON.parse(JSON.stringify(unit.board.nodes[nodeId].skill));
        }

        unit.board.nodes[nodeId].skill.unlockStar = node.unlockStar;
        unit.board.nodes[nodeId].skill.unlockJob = node.unlockJob;
        unit.board.nodes[nodeId].skill.jobLevel = node.jobLevel;
        unit.board.nodes[nodeId].skill.jp = node.jp;
        unit.board.nodes[nodeId].skill.mainSkill = node.mainSkill;
      }
    }

    if (unit.replacedSkills) {
      for (const replace of Object.keys(unit.replacedSkills)) {
        for (const upgrade of unit.replacedSkills[replace]) {
          if (typeof upgrade.newSkill === 'string') {
            upgrade.newSkill = unit.rawSkills.find(searchedSkill => searchedSkill.dataId === upgrade.newSkill);
            const oldSkill = this.getSkillByIdFromBoard(unit, upgrade.oldSkill);
            if (oldSkill) {
              upgrade.newSkill.mainSkill = oldSkill.mainSkill;
            }
          }
        }
      }
    }
  }

  async getUnitsForBuilder() {
    const units = await this.getApi(null, [{name: 'forBuilder', value: 1}]);

    if (units && units.length > 0) {
      return this.sortUnits(units);
    }

    return [];
  }

  async getUnitsForJobPlanner() {
    const units = await this.getApi(null, [{name: 'forJobPlanner', value: 1}]);

    const filteredUnits = [];
    for (const unit of units) {
      if (!unit.fromOtherVersion) {
        filteredUnits.push(unit);
      }
    }

    return filteredUnits;
  }

  sortUnits(units, sort = 'rarity', order = 'desc') {
    switch (sort) {
      case 'rarity' :
        return this.toolService.sortByRarity(units, order);
      break;
      case 'name' :
        return this.toolService.sortByName(units, order);
      break;
      case 'releaseDate' :
        return this.toolService.sortByReleaseDate(units, order);
      break;
      case 'updatedDate' :
        return this.toolService.sortByUpdatedDate(units, order);
      break;
      default :
        console.log('not managed sort');
        return units;
      break;
    }
  }

  unitHasJob(unit, filters) {
    let unitHasJob = false;

    for (let i = (filters.subJob ? 1 : 0); i <= (filters.mainJob ? 0 : unit.jobs.length - 1); i++) {
      if (filters.job.length === 0 || filters.job.indexOf(this.jobService.getGenericJobId(unit.jobs[i])) !== -1) {
        unitHasJob = true;
        break;
      }
    }

    return unitHasJob;
  }

  getSkillByIdFromBoard(unit, skillId) {
    for (const nodeId of Object.keys(unit.board.nodes)) {
      const node = unit.board.nodes[nodeId];
      if (node.skill && node.dataId === skillId) {
        return node.skill;
      }
    }

    return null;
  }

  isLimited(id) {
    return this.toolService.isLimited(id);
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_units' : 'units';
  }

  getSavedUnits() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(unit) {
    const user = this.authService.getUser();

    const data = {
      dataId: unit.dataId,
      star: unit.star,
      lb: unit.lb ? unit.lb : 0,
      level: unit.level,
      jobs: [
        unit.jobsData[0].level,
        unit.jobsData[1] ? unit.jobsData[1].level : 0,
        unit.jobsData[2] ? unit.jobsData[2].level : 0
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
      subCard: null,
      equipments: [null, null, null],
      dream: null,
      guild: this.guildService.getSavableData(unit.guild.data, false),
      masterRanks: this.masterRanksService.getSavableData(unit.masterRanks.data, false),
      limitLv: unit.limit && unit.formattedLimit ? unit.formattedLimit.level : 0,
      user: user ? user.uid : null,
      customName: unit.customName ? unit.customName : '',
      storeId: unit.storeId
    };

    if (unit.esper) {
      const savedEsper = this.esperService.getSavableData(unit.esper, false);
      savedEsper.resonance = unit.esper.resonance;
      data.esper = savedEsper;
    } else {
      data.esper = null;
    }

    if (unit.card) {
      data.card = this.cardService.getSavableData(unit.card, false);
    } else {
      data.card = null;
    }

    if (unit.subCard) {
      data.subCard = this.cardService.getSavableData(unit.subCard, false);
    } else {
      data.subCard = null;
    }

    if (!data.storeId) {
      delete data.storeId;
    }

    if (unit.level > 120 && unit.dream && unit.dream.selectedStats) {
      data.dream = {};
      Object.keys(unit.dream.selectedStats).forEach(statType => {
        data.dream[statType] = unit.dream.selectedStats[statType];
      });
    }

    for (let i = 0; i <= 2; i++) {
      if (unit.equipments && unit.equipments[i]) {
        data.equipments[i] = this.equipmentService.getSavableData(unit.equipments[i], false);
      } else {
        data.equipments[i] = null;
      }
    }

    Object.keys(unit.board.nodes).forEach(nodeId => {
      data.nodes[nodeId] = unit.board.nodes[nodeId].level ? unit.board.nodes[nodeId].level : 0;
    });

    return data;
  }

  async selectUnitForBuilder(unitId, customData = null, forceEmptyGuild = false, slug = null) {
    let apiResult = null;
    if (slug === null) {
      apiResult = await this.getApi(unitId, [{name: 'forBuilder', value: 1}, {name: 'byId', value: 1}]);
    } else {
      apiResult = await this.getApi(slug, [{name: 'forBuilder', value: 1}, {name: 'bySlug', value: 1}]);
    }

    if (apiResult.unit) {
      this.unit = new Unit();
      this.unit.constructFromJson(apiResult.unit, this.translateService);

      this.unit.rawJobs = [];
      for (const rawJob of apiResult.jobs) {
        const job = new Job();
        job.constructFromJson(rawJob, this.translateService);
        this.unit.rawJobs.push(job);
      }

      this.unit.rawSkills = apiResult.skills;

      this.formatSkillsWithApi(this.unit);

      this.unit.formatUpgrades();

      this.unit.jobsData = [];
      for (const jobId of this.unit.jobs) {
        const job = this.unit.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
        job.name = job.getName(this.translateService);
        job.level = 1;
        this.unit.jobsData.push(job);
      }
      this.unit.subjob = 0;

      this.unit.exJobsData = [];
      for (const jobId of this.unit.exJobs) {
        const job = this.unit.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
        this.unit.exJobsData.push(job);
      }

      this.unit.star = 1;
      this.unit.lb = 0;
      this.unit.level = 1;
      this.unit.activatedSupport = [
        '0',
        '0'
      ];
      this.unit.activatedCounter = '0';

      this.unit.formattedMasterSkill = [];
      this.unit.masterSkillLevel = [-1];
      this.unit.masterSkillActivated = -1;
      let i = 0;
      for (const masterSkillId of this.unit.masterSkill) {
        const masterSkill = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === masterSkillId);
        if (masterSkill) {
          this.unit.formattedMasterSkill.push(masterSkill);
          this.unit.masterSkillLevel.push(i);
          i++;
        }
      }

      this.unit.equipments = [];

      Object.keys(this.unit.board.nodes).forEach(nodeId => {
        if (this.unit.board.nodes[nodeId].skill.unlockStar === null) {
          this.unit.board.nodes[nodeId].activated = true;
          this.unit.board.nodes[nodeId].level = 1;
        }
      });

      if (this.unit.attack) {
        this.unit.formattedAttack = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === this.unit.attack);
      }

      if (this.unit.limit) {
        this.unit.formattedLimit = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === this.unit.limit);
        if (this.unit.formattedLimit) {
          this.unit.formattedLimit.level = 1;
        }
      }

      this.unit.guild = this.guildService.getGuildForBuilder(forceEmptyGuild);
      this.unit.masterRanks = await this.masterRanksService.getMasterRanksForBuilder(forceEmptyGuild);

      if (this.unit.dream && this.unit.dream.stats) {
        this.unit.dream.statsType = Object.keys(this.unit.dream.stats);
        this.unit.dream.selectedStats = {};

        this.unit.dream.statsType.forEach(type => {
          this.unit.dream.selectedStats[type] = 0;
        });
      }

      const existingUnit = await this.initiateSavedUnit(customData);

      this.unit.grid = this.gridService.generateUnitGrid(this.unit, 1000, this.unit.exJobs && this.unit.exJobs.length > 0);

      this.unit.version = this.navService.getVersion();

      this.unit.updateMaxLevel();
      this.unit.updateMaxJobLevel();

      if (!existingUnit) {
        this.unit.maxUnit(false);
        this.unit.activateMasterSkill();
      }

      this.unit.changeLevel(customData || existingUnit ? false : true);

      return this.unit;
    }

    return null;
  }

  private async initiateSavedUnit(customData = null) {
    const unit = customData;

    if (unit) {
      this.unit.star = unit.star;
      this.unit.lb = unit.lb;
      this.unit.level = parseInt(unit.level, 10);
      this.unit.customName = unit.customName;
      this.unit.storeId = unit.storeId;

      this.unit.jobs.forEach((jobId, jobIndex) => {
        this.unit.jobsData[jobIndex].level = unit.jobs[jobIndex];
      });

      Object.keys(unit.nodes).forEach(nodeId => {
        if (unit.nodes[nodeId]) {
          this.unit.board.nodes[nodeId].level = unit.nodes[nodeId];
          this.unit.board.nodes[nodeId].activated = true;

          if (this.unit.replacedSkills && this.unit.replacedSkills[this.unit.board.nodes[nodeId].dataId]) {
            this.unit.replacedSkills[this.unit.board.nodes[nodeId].dataId].forEach(upgrade => {
              const newSkill = JSON.parse(JSON.stringify(upgrade.newSkill));

              Object.keys(unit.nodes).forEach(oldNodeId => {
                if (this.unit.board.nodes[oldNodeId].dataId === upgrade.oldSkill) {
                  const oldSkill = this.unit.board.nodes[oldNodeId].skill;
                  newSkill.level = this.unit.board.nodes[oldNodeId].level;
                  this.unit.board.nodes[oldNodeId].skill = newSkill;
                }
              });
            });
          }
        }
      });

      if (unit.masterSkill === true) {
        this.unit.masterSkillActivated = 0;
      } else if (typeof(unit.masterSkill) === 'number') {
        this.unit.masterSkillActivated = unit.masterSkill;
      }

      if (unit.subjob) {
        this.unit.subjob = unit.subjob;
      }

      if (unit.limitLv && this.unit.formattedLimit) {
        this.unit.formattedLimit.level = unit.limitLv;
      }

      if (unit.activatedSupport[0] || unit.activatedSupport[1]) {
        this.unit.activatedSupport = [
          unit.activatedSupport[0],
          unit.activatedSupport[1]
        ];
      }

      if (unit.activatedCounter) {
        this.unit.activatedCounter = unit.activatedCounter;
      }

      if (unit.esper) {
        this.unit.esper = await this.esperService.selectEsperForBuilder(unit.esper.dataId, unit.esper);
      } else {
        this.unit.esper = null;
      }

      if (unit.card) {
        this.unit.card = await this.cardService.selectCardForBuilder(unit.card.dataId, unit.card);
      } else {
        this.unit.card = null;
      }

      if (unit.subCard) {
        this.unit.subCard = await this.cardService.selectCardForBuilder(unit.subCard.dataId, unit.subCard);
      } else {
        this.unit.subCard = null;
      }

      this.unit.equipments = [];
      for (let i = 0; i <= 2; i++) {
        if (unit.equipments && unit.equipments[i]) {
          this.unit.equipments[i] = await this.equipmentService.selectEquipmentForBuilder(unit.equipments[i].dataId, unit.equipments[i]);
        } else {
          this.unit.equipments[i] = null;
        }
      }

      if (unit.guild) {
        this.unit.savedGuild = unit.guild;
      }

      if (unit.masterRanks) {
        this.unit.savedMasterRanks = unit.masterRanks;
      }

      if (unit.dream && this.unit.level > 120 && this.unit.dream && this.unit.dream.stats) {
        this.unit.dream.statsType.forEach(type => {
          this.unit.dream.selectedStats[type] = parseInt(unit.dream[type], 10);
        });
      }

      return true;
    }

    return false;
  }

  unitAlreadyExists(unit) {
    const savedUnits = this.getSavedUnits();
    let unitFinded = false;

    if (savedUnits[unit.dataId]) {
      savedUnits[unit.dataId].forEach((savedUnit, savedUnitIndex) => {
        if (savedUnit.customName === unit.customName) {
          unitFinded = true;
        }
      });
    }

    return unitFinded;
  }

  async saveUnit(unit, method) {
    const savableData = this.getSavableData(unit);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        delete savableData.user;
      }

      const data = await this.getApiUser('post', savableData);

      if (method === 'new') {
        // @ts-ignore
        savableData.storeId = data.storeId;
        const savedUnits = this.getSavedUnits();

        if (savedUnits[unit.dataId]) {
          savedUnits[unit.dataId].push(savableData);
        } else {
          savedUnits[unit.dataId] = [savableData];
        }

        this.localStorageService.set(this.getLocalStorage(), savedUnits);
      }
      this.unit.storeId = data.storeId;

      return data.storeId;
    } else {
      const data = await this.getApiUser('post', savableData);

      const savedUnits = this.getSavedUnits();
      savedUnits[unit.dataId].forEach((savedUnit, unitIndex) => {
        if (savedUnit.storeId === unit.storeId) {
          savedUnits[unit.dataId][unitIndex] = savableData;
          savedUnits[unit.dataId][unitIndex].storeId = unit.storeId;
        }
      });

      this.localStorageService.set(this.getLocalStorage(), savedUnits);

      return unit.storeId;
    }
  }

  async deleteUnit(unit) {
    await this.getApiUser('delete', unit.storeId);

    const savedUnits = this.getSavedUnits();

    savedUnits[unit.dataId].forEach((savedUnit, savedUnitIndex) => {
      if (savedUnit.storeId === unit.storeId) {
        savedUnits[unit.dataId].splice(savedUnitIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedUnits);
  }

  async getStoredUnit(storeId) {
    return await this.getApiUser('get', [{name: 'storeId', value: storeId}]);
  }

  async getExportableLink() {
    if (!this.unit.storeId || this.hasChangeBeenMade()) {
      return await this.saveUnit(this.unit, 'share');
    }

    return this.unit.storeId;
  }

  hasChangeBeenMade() {
    if (this.unit.storeId) {
      const newData = this.getSavableData(this.unit);
      let oldData = null;
      if (this.getSavedUnits()[this.unit.dataId]) {
        this.getSavedUnits()[this.unit.dataId].forEach(savedUnit => {
          if (savedUnit.storeId === this.unit.storeId) {
            oldData = savedUnit;
            delete oldData.storeId;
          }
        });

        return !this.toolService.equal(oldData, newData);
      }
    }

    return true;
  }

  changeStar() {
    this.unit.updateMaxLevel();
    this.unit.disableNotAvailableNodes();
  }

  getAvailableSupportNodes() {
    this.unit.getAvailableSupportNodes();
  }

  changeLB() {
    this.unit.updateMaxLevel();
    this.unit.updateMaxJobLevel();
  }

  changeLevel(updateUnitStats = true) {
    this.unit.updateDreamSkill();

    if (updateUnitStats) {
      this.unit.calculateBaseStats();
    }

    this.unit.calculateTotalStats();
    this.getActiveSkills();
  }

  changeJobLevel() {
    this.unit.disableNotAvailableNodes();
    this.unit.updateMaxLevel(true);
    this.changeLevel();
  }

  rightClickNode(node) {
    this.unit.rightClickNode(node);
  }

  clickNode(node) {
    this.unit.clickNode(node);
  }

  canActivateNode(node) {
    return this.unit.canActivateNode(node);
  }

  getAvailableStatType() {
    return this.unit.getAvailableStatType();
  }

  maxUnit() {
    this.unit.maxUnit(true);
  }

  maxLevelAndJobs() {
    this.unit.maxLevelAndJobs();
  }

  getActiveSkills() {
    this.unit.getActiveSkills(true, this.toolService, this.skillService, this.rangeService);
  }

  resetUnit() {
    this.unit.resetUnit();
  }

  resetLevel() {
    this.unit.resetLevel();
  }

  resetJob() {
    this.unit.resetJob();
  }

  updateMasterSkill() {
    this.unit.manageUpgradeFromMasterSkill(this.toolService, this.skillService, this.rangeService);
    this.changeLevel();
  }

  getLevelFromExp(exp) {
    let level = 0;
    let minusOne = false;

    for (level = 0; level <= this.lvTbl.length - 1; level++) {
      if (this.lvTbl[level] > exp) {
        minusOne = true;
        break;
      } if (this.lvTbl[level] === exp) {
        break;
      }
    }

    return level + (minusOne ? 0 : 1);
  }

  getLimitLevelFromExp(exp) {
    let level = 0;
    let minusOne = false;

    for (level = 0; level <= this.limitLvTbl.length - 1; level++) {
      if (this.limitLvTbl[level] > exp) {
        minusOne = true;
        break;
      } if (this.limitLvTbl[level] === exp) {
        break;
      }
    }

    return level + (minusOne ? 0 : 1);
  }

  async getAvailableCards(type) {
    let alreadyUsedCardId = null;
    if (type === 'main' && this.unit.subCard) {
      alreadyUsedCardId = this.unit.subCard.dataId;
    } else if (type === 'sub' && this.unit.card) {
      alreadyUsedCardId = this.unit.card.dataId;
    }

    const result = await this.cardService.getCardsForListing(null, 'rarity', 'desc', true);
    const cards = result.cards;
    const availableCards = [];

    cards.forEach(card => {
      if (alreadyUsedCardId !== card.dataId) {
        availableCards.push(card);
      }
    });

    return {
      cards: availableCards,
      rawJobs : result.rawJobs
    };
  }

  maxDreamStats() {
    this.unit.maxDreamStats();
    this.unit.changeLevel();
  }

  resetDreamStats() {
    this.unit.resetDreamStats();
    this.unit.changeLevel();
  }
}
