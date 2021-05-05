import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { QuestService } from '../services/quest.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { ItemService } from '../services/item.service';
import { EquipmentService } from '../services/equipment.service';
import { AuthService } from '../services/auth.service';
import { OtherUnitService } from '../services/otherunit.service';
import { JobService } from '../services/job.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  quest = null;
  enemies = [];
  isCollapsedEnemy = {};
  statImage = {
    FIRE_RES : 'assets/elements/fire.png',
    ICE_RES : 'assets/elements/ice.png',
    EARTH_RES : 'assets/elements/earth.png',
    WIND_RES : 'assets/elements/wind.png',
    LIGHTNING_RES : 'assets/elements/lightning.png',
    WATER_RES : 'assets/elements/water.png',
    LIGHT_RES : 'assets/elements/light.png',
    DARK_RES : 'assets/elements/dark.png',

    SLASH_RES : 'assets/damage/neutral_slash.png',
    PIERCE_RES : 'assets/damage/neutral_pierce.png',
    STRIKE_RES : 'assets/damage/neutral_strike.png',
    MISSILE_RES : 'assets/damage/neutral_missile.png',
    MAGIC_RES : 'assets/damage/neutral_magic.png',

    POISON_RES : 'assets/status-ailments/POISON.png',
    BLIND_RES : 'assets/status-ailments/BLIND.png',
    SLEEP_RES : 'assets/status-ailments/SLEEP.png',
    SILENCE_RES : 'assets/status-ailments/SILENCE.png',
    PARALYZE_RES : 'assets/status-ailments/PARALYZE.png',
    CONFUSION_RES : 'assets/status-ailments/CONFUSION.png',
    PETRIFY_RES : 'assets/status-ailments/PETRIFY.png',
    TOAD_RES : 'assets/status-ailments/TOAD.png',
    CHARM_RES : 'assets/status-ailments/CHARM.png',
    SLOW_RES : 'assets/status-ailments/SLOW.png',
    STOP_RES : 'assets/status-ailments/STOP.png',
    IMMOBILIZE_RES : 'assets/status-ailments/IMMOBILIZE.png',
    DISABLE_RES : 'assets/status-ailments/DISABLE.png',
    BERSERK_RES : 'assets/status-ailments/BERSERK.png',
    DOOM_RES : 'assets/status-ailments/DOOM.png'
  };

  constructor(
    private questService: QuestService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private itemService: ItemService,
    private equipmentService: EquipmentService,
    private jobService: JobService,
    private otherUnitService: OtherUnitService,
    private skillService: SkillService
  ) {
    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      if (this.quest) {
        await this.formatQuest();
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.quest = await this.questService.getQuestBySlug(params.get('slug'));
      if (!this.quest) {
        this.router.navigate([this.navService.getRoute('/quest-not-found')]);
      } else {
        await this.formatQuest();

        // console.log(this.quest)

        this.navService.setTitle(this.quest.name);
      }
    });
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
        this.quest.formattedEnemies.push(await this.formatEnemyOrAlly(enemy, i, 'enemies'));

        if (this.quest.formattedEnemies[i].size > 0) {
          this.changeEnemySizeInGrid(i, this.quest.formattedEnemies[i].size);
        }

        i++;
      }

      this.quest.formattedAllies = [];
      i = 0;
      for (const ally of this.quest.allies) {
        this.quest.formattedAllies.push(await this.formatEnemyOrAlly(ally, i, 'allies'));
        i++;
      }

      this.quest.formattedObjects = [];
      i = 0;
      for (const object of this.quest.objects) {
        this.quest.formattedObjects.push(await this.formatOtherItem(object));
        i++;
      }

      this.quest.formattedSwitchs = [];
      i = 0;
      for (const rawSwitch of this.quest.switchs) {
        this.quest.formattedSwitchs.push(await this.formatOtherItem(rawSwitch));
        i++;
      }

      this.quest.formattedChests = [];
      i = 0;
      for (const chest of this.quest.chests) {
        this.quest.formattedChests.push(await this.formatOtherItem(chest));
        i++;
      }

      this.quest.formattedBuffs = [];
      this.quest.buffs.forEach(effect => {
        this.quest.formattedBuffs.push(this.skillService.formatEffect(this.quest, {type: 'buff'}, effect, false));

        if (effect.condition) {
          const conditions = {
            'FIRE_ELEMENT': ' for fire units',
            'ICE_ELEMENT': ' for ice units',
            'WIND_ELEMENT': ' for wind units',
            'EARTH_ELEMENT': ' for earth units',
            'LIGHTNING_ELEMENT': ' for lightning units',
            'WATER_ELEMENT': ' for water units',
            'LIGHT_ELEMENT': ' for light units',
            'DARK_ELEMENT': ' for dark units',
          };

          this.quest.formattedBuffs[this.quest.formattedBuffs.length - 1] += conditions[effect.condition];
        }
      });
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
        formattedReward.reward = await this.itemService.getItem(reward.rewardId, true);
      } else if (reward.type === 'equipment') {
        formattedReward.reward = await this.equipmentService.getEquipment(reward.rewardId);
        if (formattedReward.reward === undefined) {
          formattedReward.reward = await this.equipmentService.getEquipment(reward.rewardId.slice(0, -2));
          formattedReward.reward.name = this.nameService.getName(formattedReward.reward) + ' +' + reward.rewardId[reward.rewardId.length - 1];
        } else {
          formattedReward.reward.name = this.nameService.getName(formattedReward.reward);
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

  async formatEnemyOrAlly(enemy, index, type) {
    let formattedEnemy = await this.otherUnitService.getUnit(enemy.dataId);
    formattedEnemy.name = this.nameService.getName(formattedEnemy);
    formattedEnemy.statsForJob = {};

    if (enemy.element) {
      formattedEnemy.element = enemy.element;
    }

    if (enemy.lv) {
      formattedEnemy.level = enemy.lv;
    } else {
      formattedEnemy.level = 0;
    }

    formattedEnemy.job = null;
    if (formattedEnemy.jobs && formattedEnemy.jobs[0]) {
      formattedEnemy.job = await this.jobService.getJob(formattedEnemy.jobs[0]);
      formattedEnemy.job.name = this.nameService.getName(formattedEnemy.job);
    }

    formattedEnemy.calculateBaseStats(true);
    formattedEnemy.calculateTotalStats();

    formattedEnemy = JSON.parse(JSON.stringify(formattedEnemy));

    formattedEnemy.skills = [];
    for (const rawSkill of this.quest[type][index].skills) {
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

    this.applyStatsForJob(formattedEnemy);
    this.getAvailableStatTypes(formattedEnemy);

    // @TODO Managed INITIAL_AP !!! RANGE !!!

    this.isCollapsedEnemy[index] = true;


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

      this.updateStatsForUnit(enemy, effect.type, effect.calcType, value);
    });
  }

  updateStatsForUnit(enemy, type, calcType, value) {
    if (!enemy.stats[type]) {
      enemy.stats[type] = {total: 0};
    }

    if (calcType === 'percent') {
      enemy.stats[type].total += Math.floor(enemy.stats[type].baseTotal * value / 100);
    } else {
      enemy.stats[type].total += value;
    }
  }

  applyStatsForJob(enemy) {
    Object.keys(enemy.statsForJob).forEach(statType => {
      enemy.stats[statType].total += Math.floor(enemy.stats[statType].baseTotal * enemy.statsForJob[statType] / 100);
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
        otherStats.push({
          type: stat,
          value: formattedEnemy.stats[stat].total,
          calcType: 'fixe'
        });
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

  async formatOtherItem(item) {
    const formattedItem = await this.otherUnitService.getUnit(item.dataId);
    formattedItem.name = this.nameService.getName(formattedItem);

    return formattedItem;
  }

  formatType(type) {
    return this.questService.formatType(type);
  }

  private changeEnemySizeInGrid(enemyNumber, size) {
    let x = 0;
    let y = 0;
    let enemyFounded = false;

    this.quest.grid.forEach((line, lineIndex) => {
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
      for (let i = x; i <= x + size; i++) {
        for (let j = y; j <= y + size; j++) {
          this.checkIfTileExist(i, j);
          this.quest.grid[i][j].enemy = enemyNumber;
          this.quest.grid[i][j].class = nodeClasses[size][countNode];
          countNode++;
        }
      }
    }
  }

  private checkIfTileExist(x, y) {
    if (!this.quest.grid[x]) {
      this.quest.grid[x] = [];
      for (let i = 0; i <= this.quest.grid[0].length - 1; i++) {
        this.quest.grid[x][i] = {
          h: 0,
          t: 'TILE_NOT_IN_GRID'
        };
      }
    }

    if (!this.quest.grid[0][y]) {
      this.quest.grid.forEach(line => {
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
