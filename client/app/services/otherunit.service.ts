import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Unit } from '../entities/unit';

import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { ToolService } from './tool.service';
import { ApiService } from './api.service';

@Injectable()
export class OtherUnitService {
  private JP_otherUnits: Unit[];
  private GL_otherUnits: Unit[];
  unit;

  private sre = /^\s+|\s+$/g;

  constructor(
    private translateService: TranslateService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private toolService: ToolService,
    private apiService: ApiService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('bestiary', param, extraQuery)));
  }

  async getUnitsForListing(filters = null, sort = 'name', order = 'asc') {
    let units: Unit[] = [];
    const rawUnits = await this.getApi(null, [{name: 'forListing', value: 1}]);

    Object.keys(rawUnits).forEach(unitId => {
      const unit = new Unit();
      unit.constructFromJson(rawUnits[unitId], this.translateService);
      units.push(unit);
    });

    units = this.filterUnits(units, filters);

    switch (sort) {
      case 'name' :
        this.toolService.sortByName(units, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return units;
  }

  private filterUnits(units, filters) {
    if (filters) {
      const filteredUnits = [];

      for (const unit of units) {
        if (unit.type === 'enemy') {
          let possbibleToAdd = true;

          possbibleToAdd = this.unitSlugAlreadyAdded(unit.slug, filteredUnits);

          if (possbibleToAdd && filters.species && filters.species.length > 0) {
            possbibleToAdd = this.unitHasSpecie(unit, filters.species);
          }

          if (possbibleToAdd) {
            filteredUnits.push(unit);
          }
        }
      }

      return filteredUnits;
    } else {
      return units;
    }
  }

  unitSlugAlreadyAdded(slug, units) {
    let unitNotExist = true;

    for (const unit of units) {
      if (unit.slug === slug) {
        unitNotExist = false;
        break;
      }
    }

    return unitNotExist;
  }

  private unitHasSpecie(unit, species) {
    let unitHasSpecie = false;

    const tableSpecies = unit.species.split(', ');
    for (const specie of tableSpecies) {
      if (species.indexOf(specie) !== -1) {
        unitHasSpecie = true;
        break;
      }
    }

    return unitHasSpecie;
  }

  getAvailableStatType() {
    return this.unit.getAvailableStatType();
  }

  getActiveSkills() {
    this.unit.getActiveSkills(true, this.toolService, this.skillService, this.rangeService);
  }

  async getSlugDetail(slug) {
    const result = await this.getApi(slug, [{name: 'forDetail', value: 1}]);

    const units: Unit[] = [];
    result.beasts.forEach(beast => {
      const unit = new Unit();
      unit.constructFromJson(beast, this.translateService);
      units.push(unit);
    });

    return this.formatQuests(result, units);
  }

  private formatQuests(result, units) {
    const formattedEnemies = [];
    const otherUnitIds = [];

    units.forEach(unit => {
      otherUnitIds.push(unit.dataId);
    });

    for (const quest of result.quests) {
      const addedEnemies = [];
      for (const rawEnemy of quest.enemies) {
        if (otherUnitIds.indexOf(rawEnemy.dataId) !== -1 && addedEnemies.indexOf(rawEnemy.dataId) === -1) {
          const formattedEnemy = this.formatEnemyOrAlly(rawEnemy, units, result.jobs, result.skills);
          formattedEnemy.questData = quest;
          formattedEnemy.questData.name = this.toolService.getName(formattedEnemy.questData);

          formattedEnemies.push(formattedEnemy);
          addedEnemies.push(rawEnemy.dataId);
        }
      }
    }

    this.sortByQuestName(formattedEnemies);

    return formattedEnemies;
  }

  formatEnemyOrAlly(enemy, rawEnemies, rawJobs, rawSkills) {
    let formattedEnemy = rawEnemies.find(searchedEnemy => searchedEnemy.dataId === enemy.dataId);
    formattedEnemy.name = this.toolService.getName(formattedEnemy);
    formattedEnemy.statsForJob = {};

    if (enemy.element) {
      formattedEnemy.element = enemy.element;
    }

    if (typeof(enemy.minLevel) === 'number') {
      formattedEnemy.level = enemy.minLevel > 0 ? enemy.minLevel : 1;
      formattedEnemy.hasMaxLevel = true;
    } else if (enemy.lv) {
      formattedEnemy.level = enemy.lv;
    } else {
      formattedEnemy.level = 1;
    }

    formattedEnemy.job = null;
    if (formattedEnemy.jobs && formattedEnemy.jobs[0]) {
      formattedEnemy.job = rawJobs.find(searchedJob => searchedJob.dataId === formattedEnemy.jobs[0]);
      formattedEnemy.job.name = this.toolService.getName(formattedEnemy.job);
    }

    formattedEnemy.calculateBaseStats(true);
    formattedEnemy.calculateTotalStats();

    if (typeof(enemy.minLevel) === 'number') {
      const statsToRange = [
        'HP',
        'TP',
        'AP',
        'ATK',
        'DEF',
        'SPR',
        'MAG',
        'DEX',
        'AGI',
        'LUCK'
      ];

      const minTotals = {};
      const minBases = {};
      statsToRange.forEach(stat => {
        minTotals[stat] = JSON.parse(JSON.stringify(formattedEnemy.stats[stat].total));
        minBases[stat] = JSON.parse(JSON.stringify(formattedEnemy.stats[stat].baseTotal));
      });

      formattedEnemy.level = enemy.maxLevel;
      formattedEnemy.calculateBaseStats(true);
      formattedEnemy.calculateTotalStats();

      statsToRange.forEach(stat => {
        formattedEnemy.stats[stat].minTotal = minTotals[stat];
        formattedEnemy.stats[stat].minBaseTotal = minBases[stat];
        formattedEnemy.stats[stat].maxTotal = JSON.parse(JSON.stringify(formattedEnemy.stats[stat].total));
        formattedEnemy.stats[stat].maxBaseTotal = JSON.parse(JSON.stringify(formattedEnemy.stats[stat].baseTotal));
      });
    }

    formattedEnemy = JSON.parse(JSON.stringify(formattedEnemy));

    this.updateStatsFromMap(formattedEnemy, enemy.status);

    formattedEnemy.skills = [];

    if (formattedEnemy.attack) {
      const formattedSkill = rawSkills.find(searchedSkill => searchedSkill.dataId === formattedEnemy.attack);
      if (formattedSkill) {
        formattedSkill.name = this.toolService.getName(formattedSkill);

        formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

        formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

        this.rangeService.formatRange(formattedEnemy, formattedSkill);

        formattedEnemy.skills.push(formattedSkill);
      }
    }

    for (const rawSkill of enemy.skills) {
      let formattedSkill = rawSkills.find(searchedSkill => searchedSkill.dataId === rawSkill.iname);
      if (formattedSkill) {
        formattedSkill = JSON.parse(JSON.stringify(formattedSkill));
        formattedSkill.level = rawSkill.rank;

        if (formattedSkill.type !== 'support') {
          formattedSkill.name = this.toolService.getName(formattedSkill);

          formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

          formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

          if (formattedSkill.counter) {
            formattedSkill.counterHtml = this.skillService.formatCounter(formattedEnemy, formattedSkill, formattedSkill.counter);
          }

          this.rangeService.formatRange(formattedEnemy, formattedSkill);

          formattedEnemy.skills.push(formattedSkill);
        } else {
          const splitDataId = formattedSkill.dataId.split('_');
          formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

          if (splitDataId[2] === 'JOB') {
            this.updateStatsForJob(formattedEnemy, formattedSkill);
          } else {
            this.updateStatsForSkill(formattedEnemy, formattedSkill);
          }
        }
      }
    }

    if (formattedEnemy.limit) {
      const formattedSkill = rawSkills.find(searchedSkill => searchedSkill.dataId === formattedEnemy.limit);
      if (formattedSkill) {
        formattedSkill.name = this.toolService.getName(formattedSkill);

        formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

        formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

        this.rangeService.formatRange(formattedEnemy, formattedSkill);

        formattedEnemy.skills.push(formattedSkill);
      }
    }

    this.applyStatsForJob(formattedEnemy);
    this.getAvailableStatTypes(formattedEnemy);

    return formattedEnemy;
  }

  updateStatsFromMap(enemy, stats) {
    if (stats) {
      stats.forEach(stat => {
        enemy.stats[stat.type] = {
          baseTotal: stat.value,
          total: stat.value
        };
      });
    }
  }

  updateStatsForJob(enemy, skill) {
    skill.effects.forEach(effect => {
      if (!enemy.statsForJob[effect.type]) {
        enemy.statsForJob[effect.type] = 0;
      }
      const value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)));

      if (value > enemy.statsForJob[effect.type]) {
        enemy.statsForJob[effect.type] = value;
      }
    });
  }

  updateStatsForSkill(enemy, skill) {
    skill.effects.forEach(effect => {
      let value = effect.minValue;
      if (skill.maxLevel > 1) {
        value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)));
      }

      if (effect.type !== 'NULLIFY') {
        this.updateStatsForUnit(enemy, effect.type, effect.calcType, value);
      } else {
        if (!enemy.stats['NULLIFY']) {
          enemy.stats['NULLIFY'] = {ailments: effect.ailments};
        } else {
          effect.ailments.forEach(ailment => {
            if (enemy.stats['NULLIFY'].ailments.indexOf(ailment) === -1) {
              enemy.stats['NULLIFY'].ailments.push(ailment);
            }
          });
        }
      }
    });
  }

  updateStatsForUnit(enemy, type, calcType, value) {
    if (!enemy.stats[type]) {
      enemy.stats[type] = {total: 0};
    }

    if (calcType === 'percent') {
      enemy.stats[type].total += Math.floor(enemy.stats[type].baseTotal * value / 100);
      if (enemy.hasMaxLevel) {
        enemy.stats[type].minTotal += Math.floor(enemy.stats[type].minBaseTotal * value / 100);
        enemy.stats[type].maxTotal += Math.floor(enemy.stats[type].maxBaseTotal * value / 100);
      }
    } else {
      enemy.stats[type].total += value;
      if (enemy.hasMaxLevel) {
        enemy.stats[type].minTotal += value;
        enemy.stats[type].maxTotal += value;
      }
    }
  }

  applyStatsForJob(enemy) {
    Object.keys(enemy.statsForJob).forEach(statType => {
      enemy.stats[statType].total += Math.floor(enemy.stats[statType].baseTotal * enemy.statsForJob[statType] / 100);
      if (enemy.hasMaxLevel) {
        enemy.stats[statType].minTotal += Math.floor(enemy.stats[statType].minBaseTotal * enemy.statsForJob[statType] / 100);
        enemy.stats[statType].maxTotal += Math.floor(enemy.stats[statType].maxBaseTotal * enemy.statsForJob[statType] / 100);
      }
    });
  }

  getAvailableStatTypes(formattedEnemy) {
    const ignoreStats = [
      'HP',
      'TP',
      'AP',
      'ATK',
      'DEF',
      'SPR',
      'MAG',
      'DEX',
      'AGI',
      'LUCK',
      'MOVE',
      'JUMP',
      'INCREASE_UNIT_LEVEL',
      'RANGE'
    ];

    const statsManaged = [
      'FIRE_RES',
      'ICE_RES',
      'EARTH_RES',
      'WIND_RES',
      'LIGHTNING_RES',
      'WATER_RES',
      'LIGHT_RES',
      'DARK_RES',
      'SLASH_RES',
      'PIERCE_RES',
      'STRIKE_RES',
      'MISSILE_RES',
      'MAGIC_RES',
      'POISON_RES',
      'FROSTBITE_RES',
      'BLIND_RES',
      'SLEEP_RES',
      'SILENCE_RES',
      'PARALYZE_RES',
      'CONFUSION_RES',
      'PETRIFY_RES',
      'TOAD_RES',
      'CHARM_RES',
      'SLOW_RES',
      'STOP_RES',
      'IMMOBILIZE_RES',
      'DISABLE_RES',
      'BERSERK_RES',
      'DOOM_RES',
      'STUN_RES'
    ];

    const hasStats = [];
    const otherStats = [];
    Object.keys(formattedEnemy.stats).forEach(stat => {
      if (statsManaged.indexOf(stat) !== -1) {
        hasStats.push(stat);
      } else if (ignoreStats.indexOf(stat) === -1) {
        if (stat !== 'NULLIFY') {
          otherStats.push({
            type: stat,
            value: formattedEnemy.stats[stat].total,
            calcType: 'fixe'
          });
        } else {
          otherStats.push({
            type: 'NULLIFY',
            ailments: formattedEnemy.stats[stat].ailments,
            calcType: 'fixe'
          });
        }
      }
    });

    hasStats.sort((a, b) => {
      if (statsManaged.indexOf(a) > statsManaged.indexOf(b)) {
        return 1;
      } else {
        return -1;
      }
    });

    formattedEnemy.hasStats = [];
    let i = -1;
    hasStats.forEach((stat, statIndex) => {
      if (statIndex % 8 === 0) {
        i++;
        formattedEnemy.hasStats[i] = [];
      }

      formattedEnemy.hasStats[i].push(stat);
    });

    formattedEnemy.otherStats = [];
    otherStats.forEach(otherStat => {
      formattedEnemy.otherStats.push(this.skillService.formatEffect(formattedEnemy, {type: 'buff'}, otherStat, false));
    });
  }

  private reduceString(s: any) {
    return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  sortByQuestName(enemies) {
    enemies.sort((a: any, b: any) => {
      const x = this.reduceString(a.questData.name && a.questData.name !== 'New Quest' ? a.questData.name : a.getName(this.translateService));
      const y = this.reduceString(b.questData.name && a.questData.name !== 'New Quest' ? b.questData.name : b.getName(this.translateService));

      if (a.type === 'story' && b.type === 'story') {
        const tableA = x.split(' ');
        const tableB = y.split(' ');

        const storySplitA = tableA[0].split(':');
        const storySplitB = tableB[0].split(':');

        if (parseInt(storySplitA[0], 10) > parseInt(storySplitB[0], 10)) {
          return 1;
        } else if (parseInt(storySplitB[0], 10) > parseInt(storySplitA[0], 10)) {
          return -1;
        } else {
          if (parseInt(storySplitA[1], 10) > parseInt(storySplitB[1], 10)) {
            return 1;
          } else if (parseInt(storySplitB[1], 10) > parseInt(storySplitA[1], 10)) {
            return -1;
          } else {
            if (parseInt(storySplitA[2], 10) > parseInt(storySplitB[2], 10)) {
              return 1;
            } else if (parseInt(storySplitB[2], 10) > parseInt(storySplitA[2], 10)) {
              return -1;
            } else {
              if (parseInt(storySplitA[3], 10) > parseInt(storySplitB[3], 10)) {
                return 1;
              } else if (parseInt(storySplitB[3], 10) > parseInt(storySplitA[3], 10)) {
                return -1;
              }
            }
          }
        }
      } else if (a.type === 'tower' && b.type === 'tower') {
        const tableA = x.split(' ');
        const tableB = y.split(' ');

        if (parseInt(tableA[tableA.length - 1].split('F')[0], 10) > parseInt(tableB[tableB.length - 1].split('F')[0], 10)) {
          return 1;
        } else if (parseInt(tableB[tableB.length - 1].split('F')[0], 10) > parseInt(tableA[tableA.length - 1].split('F')[0], 10)) {
          return -1;
        }
      } else {
        return x.localeCompare(y, 'ja');
      }
    });
  }
}
