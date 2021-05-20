import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { OtherUnitService } from '../services/otherunit.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { QuestService } from '../services/quest.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-other-unit',
  templateUrl: './other.unit.component.html',
  styleUrls: ['./other.unit.component.css']
})
export class OtherUnitComponent implements OnInit {
  otherUnits = [];
  formattedEnemies = [];
  masterInfos = {
    name: '',
    image: '',
    species: ''
  };
  private sre = /^\s+|\s+$/g;

  constructor(
    private otherUnitService: OtherUnitService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private questService: QuestService,
    private jobService: JobService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getMasterInfos();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.otherUnits = await this.otherUnitService.getUnitsBySlug(params.get('slug'));

      console.log(this.otherUnits);

      if (this.otherUnits.length > 0) {
        this.getMasterInfos();

        console.log(this.masterInfos);

        await this.getQuestInfos();

        console.log(this.formattedEnemies);
      } else {
        this.router.navigate([this.navService.getRoute('/unit-not-found')]);
      }
    });
  }

  getMasterInfos() {
    if (this.otherUnits.length > 0) {
      this.masterInfos.name = this.nameService.getName(this.otherUnits[0]);
      this.navService.setTitle(this.masterInfos.name);
      this.masterInfos.image = this.otherUnits[0].image;
      this.masterInfos.species = this.otherUnits[0].species;
    }
  }

  async getQuestInfos() {
    const quests = [];
    for (const unitData of this.otherUnits) {
      for (const quest of await this.questService.getQuestForOtherUnits(unitData.dataId)) {
        quests.push(quest);
      }
    }

    console.log(quests);

    for (const quest of quests) {
      const formattedEnemy = await this.formatEnemyOrAlly(quest.enemyData);
      formattedEnemy.questData = quest.questData;
      formattedEnemy.questData.name = this.nameService.getName(formattedEnemy.questData);
      this.formattedEnemies.push(formattedEnemy);
    }

    this.sortByQuestName(this.formattedEnemies);
  }

  async formatEnemyOrAlly(enemy) {
    let formattedEnemy = await this.otherUnitService.getUnit(enemy.dataId);
    formattedEnemy.name = this.nameService.getName(formattedEnemy);
    formattedEnemy.statsForJob = {};

    if (enemy.element) {
      formattedEnemy.element = enemy.element;
    }

    if (enemy.minLevel) {
      formattedEnemy.level = enemy.minLevel;
      formattedEnemy.hasMaxLevel = true;
    } else if (enemy.lv) {
      formattedEnemy.level = enemy.lv;
    } else {
      formattedEnemy.level = 1;
    }

    formattedEnemy.job = null;
    if (formattedEnemy.jobs && formattedEnemy.jobs[0]) {
      formattedEnemy.job = await this.jobService.getJob(formattedEnemy.jobs[0]);
      formattedEnemy.job.name = this.nameService.getName(formattedEnemy.job);
    }

    formattedEnemy.calculateBaseStats(true);
    formattedEnemy.calculateTotalStats();

    if (enemy.minLevel) {
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

    formattedEnemy.skills = [];

    if (formattedEnemy.attack) {
      const formattedSkill = JSON.parse(JSON.stringify(formattedEnemy.attack));
      formattedSkill.name = this.nameService.getName(formattedSkill);

      formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

      formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

      this.rangeService.formatRange(formattedEnemy, formattedSkill);

      formattedEnemy.skills.push(formattedSkill);
    }

    for (const rawSkill of enemy.skills) {
      let formattedSkill = await this.skillService.getSkill(rawSkill.iname);
      if (formattedSkill) {
        formattedSkill = JSON.parse(JSON.stringify(formattedSkill));
        formattedSkill.level = rawSkill.rank;

        if (formattedSkill.type !== 'support') {
          formattedSkill.name = this.nameService.getName(formattedSkill);

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
      const formattedSkill = JSON.parse(JSON.stringify(formattedEnemy.limit));
      formattedSkill.name = this.nameService.getName(formattedSkill);

      formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

      formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

      this.rangeService.formatRange(formattedEnemy, formattedSkill);

      formattedEnemy.skills.push(formattedSkill);
    }

    this.applyStatsForJob(formattedEnemy);
    this.getAvailableStatTypes(formattedEnemy);

    return formattedEnemy;
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
      'DOOM_RES'
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

    hasStats.sort(function(a, b) {
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
