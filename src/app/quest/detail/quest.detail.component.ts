import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { QuestService } from '../../services/quest.service';
import { RangeService } from '../../services/range.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';


@Component({
  selector: 'app-quest-detail',
  templateUrl: './quest.detail.component.html',
  styleUrls: ['./quest.detail.component.css']
})
export class QuestDetailComponent implements OnInit {
  quest = null;
  enemies = [];
  isCollapsed = {
    enemy: {},
    chest: {},
    ally: {},
    object: {}
  }
  isCollapsedRandomMap = {};
  statImage = {
    BRAVERY: '',
    FAITH: '',

    FIRE_RES : 'assets/elements/fire.webp',
    ICE_RES : 'assets/elements/ice.webp',
    EARTH_RES : 'assets/elements/earth.webp',
    WIND_RES : 'assets/elements/wind.webp',
    LIGHTNING_RES : 'assets/elements/lightning.webp',
    WATER_RES : 'assets/elements/water.webp',
    LIGHT_RES : 'assets/elements/light.webp',
    DARK_RES : 'assets/elements/dark.webp',

    SLASH_RES : 'assets/damage/neutral_slash.webp',
    PIERCE_RES : 'assets/damage/neutral_pierce.webp',
    STRIKE_RES : 'assets/damage/neutral_strike.webp',
    MISSILE_RES : 'assets/damage/neutral_missile.webp',
    MAGIC_RES : 'assets/damage/neutral_magic.webp',

    POISON_RES : 'assets/status-ailments/POISON.webp',
    FROSTBITE_RES : 'assets/status-ailments/FROSTBITE.webp',
    BLIND_RES : 'assets/status-ailments/BLIND.webp',
    SLEEP_RES : 'assets/status-ailments/SLEEP.webp',
    SILENCE_RES : 'assets/status-ailments/SILENCE.webp',
    PARALYZE_RES : 'assets/status-ailments/PARALYZE.webp',
    CONFUSION_RES : 'assets/status-ailments/CONFUSION.webp',
    PETRIFY_RES : 'assets/status-ailments/PETRIFY.webp',
    TOAD_RES : 'assets/status-ailments/TOAD.webp',
    CHARM_RES : 'assets/status-ailments/CHARM.webp',
    SLOW_RES : 'assets/status-ailments/SLOW.webp',
    STOP_RES : 'assets/status-ailments/STOP.webp',
    IMMOBILIZE_RES : 'assets/status-ailments/IMMOBILIZE.webp',
    DISABLE_RES : 'assets/status-ailments/DISABLE.webp',
    BERSERK_RES : 'assets/status-ailments/BERSERK.webp',
    DOOM_RES : 'assets/status-ailments/DOOM.webp',
    STUN_RES : 'assets/status-ailments/STUN.webp'
  };

  windowSize = 1350;

  constructor(
    private questService: QuestService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private skillService: SkillService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      if (this.quest) {
        await this.formatQuest();
      }
    });
  }

  @HostListener('window:resize', []) onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowSize = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.quest = await this.questService.getQuestBySlug(params.get('slug'));
      if (!this.quest) {
        this.router.navigate([this.navService.getRoute('/quest-not-found')]);
      } else {
        await this.formatQuest();

        this.navService.setSEO(this.quest.names.en, this.quest.names.en + ' is a quest in wotv. Find in which enemies you will fight, their position on the grid, the drops, ...');
      }
    });

    this.onWindowResize();
  }

  private async formatQuest() {
    if (this.quest) {
      this.quest.getName(this.translateService);
      this.quest.formattedMissions = [];
      for (const mission of this.quest.missions) {
        this.quest.formattedMissions.push(await this.formatMission(mission));
      }

      this.quest.formattedEnemies = [];
      let i = 0;
      for (const enemy of this.quest.enemies) {
        this.quest.formattedEnemies.push(await this.formatEnemyOrAlly(enemy, i, 'enemies', this.quest));
        this.isCollapsed.enemy[i] = true;

        if (this.quest.formattedEnemies[i].size > 0) {
          this.changeEnemySizeInGrid(i, this.quest.formattedEnemies[i].size, this.quest.grid);
        }

        i++;
      }

      this.quest.formattedAllies = [];
      i = 0;
      for (const ally of this.quest.allies) {
        this.quest.formattedAllies.push(await this.formatEnemyOrAlly(ally, i, 'allies', this.quest));
        this.isCollapsed.ally[i] = true;
        i++;
      }

      this.quest.formattedObjects = [];
      i = 0;
      for (const object of this.quest.objects) {
        this.quest.formattedObjects.push(await this.formatEnemyOrAlly(object, i, 'objects', this.quest));
        this.isCollapsed.object[i] = true;
        i++;
      }

      this.quest.formattedSwitchs = [];
      i = 0;
      for (const rawSwitch of this.quest.switchs) {
        this.quest.formattedSwitchs.push(await this.formatOtherItem(rawSwitch, this.quest));
        i++;
      }

      this.quest.formattedChests = [];
      i = 0;
      for (const chest of this.quest.chests) {
        this.quest.formattedChests.push(await this.formatOtherItem(chest, this.quest));
        this.isCollapsed.chest[i] = true;
        i++;
      }

      const formattedWinCond = [];
      if (this.quest.winCond) {
        for (const winCond of this.quest.winCond) {
          formattedWinCond.push(await this.questService.formatWinLooseCondition(winCond, this.quest));
        }
      }
      this.quest.formattedWinCond = formattedWinCond.join(' or ');

      const formattedLooseCond = [];
      if (this.quest.looseCond) {
        for (const looseCond of this.quest.looseCond) {
          formattedLooseCond.push(await this.questService.formatWinLooseCondition(looseCond, this.quest));
        }
      }
      this.quest.formattedLooseCond = formattedLooseCond.join(' or ');

      this.quest.formattedBuffs = [];
      this.quest.buffs.forEach(effect => {
        this.quest.formattedBuffs.push(this.skillService.formatEffect(this.quest, {type: 'buff'}, effect, false));

        if (effect.condition) {
          const conditions = {
            FIRE_ELEMENT: ' for fire units',
            ICE_ELEMENT: ' for ice units',
            WIND_ELEMENT: ' for wind units',
            EARTH_ELEMENT: ' for earth units',
            LIGHTNING_ELEMENT: ' for lightning units',
            WATER_ELEMENT: ' for water units',
            LIGHT_ELEMENT: ' for light units',
            DARK_ELEMENT: ' for dark units',
          };

          if (conditions[effect.condition]) {
            this.quest.formattedBuffs[this.quest.formattedBuffs.length - 1] += conditions[effect.condition];
          }
        }
      });

      this.quest.dropLists = {};
      for (const rawDrop of this.quest.drops) {
        const formattedDropList = [];

        if (rawDrop.items) {
          for (const itemId of Object.keys(rawDrop.items)) {
            if (itemId !== '') {
              const formattedItem = this.quest.rawItems.find(searchedItem => searchedItem.dataId === itemId);
              if (formattedItem) {
                formattedItem.name = this.toolService.getName(formattedItem);
                for (const itemDropNum of Object.keys(rawDrop.items[itemId])) {
                  formattedItem.drop = {
                    num: itemDropNum,
                    value: rawDrop.items[itemId][itemDropNum]
                  };
                  formattedDropList.push(JSON.parse(JSON.stringify(formattedItem)));
                }
              }
            }
          }
        }

        this.quest.dropLists[rawDrop.dataId] = formattedDropList;
      }


      this.quest.formattedRandomMaps = [];
      let randomMapIndex = 0;
      for (const randomMap of this.quest.randomMaps) {
        this.isCollapsedRandomMap[randomMapIndex] = true;
        randomMapIndex++;
        const formattedRandomMap = {
          grid: randomMap.grid,
          formattedEnemies: [],
          isCollapsed: {
            enemy: {},
            chest: {},
            ally: {},
            object: {}
          },
          formattedAllies: [],
          formattedObjects: [],
          formattedSwitchs: [],
          formattedChests: [],
          formattedWinCond: '',
          formattedLooseCond: '',
          dropLists: {},
          enemies: randomMap.enemies,
          allies: randomMap.allies,
          objects: randomMap.objects,
          switchs: randomMap.switchs,
          chests: randomMap.chests,
          winCond: randomMap.winCond,
          looseCond: randomMap.looseCond,
          drops: randomMap.drops,
          rawBestiary: this.quest.rawBestiary,
          rawEquipments: this.quest.rawEquipments,
          rawItems: this.quest.rawItems,
          rawJobs: this.quest.rawJobs,
          rawSkills: this.quest.rawSkills
        };

        randomMap.rawBestiary = this.quest.rawBestiary;
        randomMap.rawEquipments = this.quest.rawEquipments;
        randomMap.rawItems = this.quest.rawItems;
        randomMap.rawJobs = this.quest.rawJobs;
        randomMap.rawSkills = this.quest.rawSkills;

        i = 0;
        for (const enemy of randomMap.enemies) {
          formattedRandomMap.formattedEnemies.push(await this.formatEnemyOrAlly(enemy, i, 'enemies', randomMap));
          formattedRandomMap.isCollapsed.enemy[i] = true;

          if (formattedRandomMap.formattedEnemies[i].size > 0) {
            this.changeEnemySizeInGrid(i, formattedRandomMap.formattedEnemies[i].size, formattedRandomMap.grid);
          }

          i++;
        }

        i = 0;
        for (const ally of randomMap.allies) {
          formattedRandomMap.formattedAllies.push(await this.formatEnemyOrAlly(ally, i, 'allies', randomMap));
          formattedRandomMap.isCollapsed.ally[i] = true;
          i++;
        }

        i = 0;
        for (const object of randomMap.objects) {
          formattedRandomMap.formattedObjects.push(await this.formatEnemyOrAlly(object, i, 'objects', randomMap));
          formattedRandomMap.isCollapsed.object[i] = true;
          i++;
        }

        i = 0;
        for (const rawSwitch of randomMap.switchs) {
          formattedRandomMap.formattedSwitchs.push(await this.formatOtherItem(rawSwitch, randomMap));
          i++;
        }

        i = 0;
        for (const chest of randomMap.chests) {
          formattedRandomMap.formattedChests.push(await this.formatOtherItem(chest, randomMap));
          formattedRandomMap.isCollapsed.chest[i] = true;
          i++;
        }

        const randomMapFormattedWinCond = [];
        if (randomMap.winCond) {
          for (const winCond of randomMap.winCond) {
            randomMapFormattedWinCond.push(await this.questService.formatWinLooseCondition(winCond, formattedRandomMap));
          }
        }
        formattedRandomMap.formattedWinCond = randomMapFormattedWinCond.join(' or ');

        const randomMapFormattedLooseCond = [];
        if (randomMap.looseCond) {
          for (const looseCond of randomMap.looseCond) {
            randomMapFormattedLooseCond.push(await this.questService.formatWinLooseCondition(looseCond, formattedRandomMap));
          }
        }
        formattedRandomMap.formattedLooseCond = randomMapFormattedLooseCond.join(' or ');

        for (const rawDrop of randomMap.drops) {
          const formattedDropList = [];

          if (rawDrop.items) {
            for (const itemId of Object.keys(rawDrop.items)) {
              if (itemId !== '') {
                const formattedItem = this.quest.rawItems.find(searchedItem => searchedItem.dataId === itemId);
                if (formattedItem) {
                  formattedItem.name = this.toolService.getName(formattedItem);
                  for (const itemDropNum of Object.keys(rawDrop.items[itemId])) {
                    formattedItem.drop = {
                      num: itemDropNum,
                      value: rawDrop.items[itemId][itemDropNum]
                    };
                    formattedDropList.push(JSON.parse(JSON.stringify(formattedItem)));
                  }
                }
              }
            }
          }

          formattedRandomMap.dropLists[rawDrop.dataId] = formattedDropList;
        }

        this.quest.formattedRandomMaps.push(formattedRandomMap);
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  async formatMission(mission) {
    const formattedMission = {
      mission: await this.questService.formatMission(mission),
      rewards: []
    };

    for (const reward of mission.rewards) {
      const formattedReward = {
        type: reward.type,
        reward: null,
        value: reward.value
      };

      if (reward.type === 'item') {
        formattedReward.reward = this.quest.rawItems.find(searchedItem => searchedItem.dataId === reward.rewardId);
        formattedReward.reward.name = this.toolService.getName(formattedReward.reward);
      } else if (reward.type === 'equipment') {
        formattedReward.reward = this.quest.rawEquipments.find(searchedItem => searchedItem.dataId === reward.rewardId);
        if (formattedReward.reward === undefined) {
          formattedReward.reward = this.quest.rawEquipments.find(searchedItem => searchedItem.dataId === reward.rewardId.slice(0, -2));
          formattedReward.reward.name = this.toolService.getName(formattedReward.reward) + ' +' + reward.rewardId[reward.rewardId.length - 1];
        } else {
          formattedReward.reward.name = this.toolService.getName(formattedReward.reward);
        }
      } else if (reward.type === 'visiores') {
        formattedReward.reward = {
          image: 'visiores',
          name: 'Visiores'
        };
      }

      formattedMission.rewards.push(formattedReward);
    }

    return formattedMission;
  }

  async formatEnemyOrAlly(enemy, index, type, quest) {
    let formattedEnemy = quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === enemy.dataId);
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
      formattedEnemy.job = quest.rawJobs.find(searchedJob => searchedJob.dataId === formattedEnemy.jobs[0]);
      formattedEnemy.job.name = this.toolService.getName(formattedEnemy.job);
    }

    if (formattedEnemy.stats) {
      formattedEnemy.stats['BRAVERY'] = {
        min: 50 + enemy.brave,
        max: 50 + enemy.brave
      };

      formattedEnemy.stats['FAITH'] = {
        min: 50 + enemy.faith,
        max: 50 + enemy.faith
      };
    }

    formattedEnemy.calculateBaseStats(true);
    if (formattedEnemy.stats && formattedEnemy.stats.HP) {
      formattedEnemy.calculateTotalStats();
    }

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


    formattedEnemy.skills = [];

    if (formattedEnemy.attack) {
      const formattedSkill = quest.rawSkills.find(searchedSkill => searchedSkill.dataId === formattedEnemy.attack);
      if (formattedSkill) {
        formattedSkill.name = this.toolService.getName(formattedSkill);

        formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

        formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

        this.rangeService.formatRange(formattedEnemy, formattedSkill);

        formattedEnemy.skills.push(formattedSkill);
      }
    }

    for (const rawSkill of quest[type][index].skills) {
      let formattedSkill = quest.rawSkills.find(searchedSkill => searchedSkill.dataId === rawSkill.iname);
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
      const formattedSkill = quest.rawSkills.find(searchedSkill => searchedSkill.dataId === formattedEnemy.limit);
      if (formattedSkill) {
        formattedSkill.name = this.toolService.getName(formattedSkill);

        formattedSkill.effectsHtml = this.skillService.formatEffects(formattedEnemy, formattedSkill);

        formattedSkill.damageHtml = this.skillService.formatDamage(formattedEnemy, formattedSkill, formattedSkill.damage);

        this.rangeService.formatRange(formattedEnemy, formattedSkill);

        formattedEnemy.skills.push(formattedSkill);
      }
    }

    this.applyStatsForJob(formattedEnemy);
    this.updateStatsFromMap(formattedEnemy, enemy.status);

    this.getAvailableStatTypes(formattedEnemy);

    // @TODO Managed INITIAL_AP !!! RANGE !!!

    if (quest[type][index].entryCond && quest[type][index].entryCond.length > 0) {
      const formattedEntryCond = [];
      for (const entryCond of quest[type][index].entryCond) {
        formattedEntryCond.push(await this.questService.formatEntryCondition(entryCond, quest));
      }

      formattedEnemy.formattedEntryCond = formattedEntryCond;
    }

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
    const overwritedStatTypes = [];
    if (enemy.status) {
      enemy.status.forEach(statType => {
        overwritedStatTypes.push(statType.type);
      });
    }

    Object.keys(enemy.statsForJob).forEach(statType => {
      if (overwritedStatTypes.indexOf(statType) === -1) {
        enemy.stats[statType].total += Math.floor(enemy.stats[statType].baseTotal * enemy.statsForJob[statType] / 100);
        if (enemy.hasMaxLevel) {
          enemy.stats[statType].minTotal += Math.floor(enemy.stats[statType].minBaseTotal * enemy.statsForJob[statType] / 100);
          enemy.stats[statType].maxTotal += Math.floor(enemy.stats[statType].maxBaseTotal * enemy.statsForJob[statType] / 100);
        }
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
      'BRAVERY',
      'FAITH',
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

  async formatOtherItem(item, quest) {
    const formattedItem = quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === item.dataId);
    formattedItem.name = this.toolService.getName(formattedItem);

    return formattedItem;
  }

  formatType(type) {
    return this.questService.formatType(type);
  }

  private changeEnemySizeInGrid(enemyNumber, size, grid) {
    let x = 0;
    let y = 0;
    let enemyFounded = false;

    grid.forEach((line, lineIndex) => {
      line.forEach((node, nodeIndex) => {
        if (node.enemy === enemyNumber) {
          x = lineIndex;
          y = nodeIndex;
          enemyFounded = true;
        }
      });
    });

    const nodeClasses = {
      1: [
        'bigEnemyTopLeft',
        'bigEnemyTopRight',
        'bigEnemyBottomLeft',
        'bigEnemyBottomRight'
      ],
      2: [
        'bigEnemyTopLeft',
        'bigEnemyTopMiddle',
        'bigEnemyTopRight',
        'bigEnemyMiddleLeft',
        'bigEnemyMiddleMiddle',
        'bigEnemyMiddleRight',
        'bigEnemyBottomLeft',
        'bigEnemyBottomMiddle',
        'bigEnemyBottomRight'
      ]
    };

    if (enemyFounded) {
      let countNode = 0;
      for (let i = x; i <= x + (size !== 13 ? size : 0); i++) {
        for (let j = y; j <= y + size; j++) {
          this.checkIfTileExist(i, j, grid);
          grid[i][j].enemy = enemyNumber;

          if (nodeClasses[size]) {
            grid[i][j].class = nodeClasses[size][countNode];
          }
          countNode++;
        }
      }
    }
  }

  private checkIfTileExist(x, y, grid) {
    if (!grid[x]) {
      grid[x] = [];
      for (let i = 0; i <= grid[0].length - 1; i++) {
        grid[x][i] = {
          h: 0,
          t: 'TILE_NOT_IN_GRID'
        };
      }
    }

    if (!grid[0][y]) {
      grid.forEach(line => {
        for (let i = 0; i <= y; i++) {
          if (!line[i]) {
            line[i] = {
              h: 0,
              t: 'TILE_NOT_IN_GRID'
            };
          }
        }
      });
    }
  }
}
