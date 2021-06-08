import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UnitService } from '../services/unit.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { JobService } from '../services/job.service';
import { GridService } from '../services/grid.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  unit = null;
  jobs = [];
  exJobs = [];
  grid = null;
  specialBismark = false;
  activeTab;
  possibleSkillTypes = ['support', 'counter'];
  indexUnit = [];

  indexImageStatsType = [
    'SLASH_RES',
    'PIERCE_RES',
    'STRIKE_RES',
    'MISSILE_RES',
    'MAGIC_RES',
    'SLASH_ATK',
    'PIERCE_ATK',
    'STRIKE_ATK',
    'MISSILE_ATK',
    'MAGIC_ATK',
    'FIRE_RES',
    'ICE_RES',
    'EARTH_RES',
    'WIND_RES',
    'LIGHTNING_RES',
    'WATER_RES',
    'LIGHT_RES',
    'DARK_RES',
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

  constructor(
    private unitService: UnitService,
    private equipmentService: EquipmentService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private gridService: GridService,
    private navService: NavService,
    private nameService: NameService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.unit = await this.unitService.getUnitBySlug(params.get('slug'));

      if (!this.unit) {
        this.router.navigate([this.navService.getRoute('/unit-not-found')]);
      } else {
        if (this.unit.exJobs && this.unit.exJobs.length > 0) {
          this.possibleSkillTypes = ['support', 'counter', 'ex_buff'];
        }

        await this.formatUnit();
        this.getIndexUnit();

        this.navService.setTitle(this.unit.name);
      }
    });

    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      await this.formatUnit();
    });

    this.activatedRoute.fragment.subscribe((fragment: string) => {
      switch (fragment) {
        case 'character':
          this.activeTab = 1;
          break;
        case 'stats':
          this.activeTab = 2;
          break;
        case 'skills':
          this.activeTab = 3;
          break;
        case 'tree':
          this.activeTab = 4;
          break;
        default:
          break;
      }
    });
  }

  private async formatUnit() {
    if (this.unit) {
      const lang = this.translateService.currentLang;
      this.jobs = [];
      this.unit.name = this.nameService.getName(this.unit);
      this.unit.limited = this.unitService.isLimited(this.unit.dataId);

      this.unit.skills = [];

      this.unit.totalBuffs = {
        HP: 0,
        TP: 0,
        INITIAL_AP: 0,
        ATK: 0,
        DEF: 0,
        MAG: 0,
        SPR: 0,
        DEX: 0,
        AGI: 0,
        LUCK: 0,
        CRITIC_RATE: 0,
      };

      this.unit.exBuffs = {
        HP: 0,
        TP: 0,
        INITIAL_AP: 0,
        ATK: 0,
        DEF: 0,
        MAG: 0,
        SPR: 0,
        DEX: 0,
        AGI: 0,
        LUCK: 0,
        CRITIC_RATE: 0,
      };
      this.unit.remainingBuffs = [];
      this.unit.remainingExBuffs = [];

      let maxExLevel = 0;
      let exempleSkillMaxExLevel = null;

      Object.keys(this.unit.board.nodes).forEach(nodeId => {
        let skill = this.unit.board.nodes[nodeId].skill;
        if (skill.type !== 'buff' && !(this.unit.board.nodes[nodeId].type === 'buff' && skill.type === 'ex_buff')) {
          skill.name = this.nameService.getName(skill);
          skill.upgradeHtml = this.skillService.formatUpgrade(this.unit, skill);

          skill.effectsHtml = this.skillService.formatEffects(this.unit, skill);

          skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);

          if (skill.counter) {
            skill.counterHtml = this.skillService.formatCounter(this.unit, skill, skill.counter);
          }

          this.rangeService.formatRange(this.unit, skill);

          skill.upgrades = [];
          skill = this.addUpgrade(skill);

          this.unit.skills.push(skill);
        } else if (this.unit.board.nodes[nodeId].type !== 'skill') {
          const effect = skill.effects[0];

          if (typeof(this.unit.totalBuffs[effect.type]) === 'number' && effect.calcType === 'fixe') {
            if (skill.jobLevel <= 15) {
              this.unit.totalBuffs[effect.type] += effect.minValue;
            } else {
              this.unit.exBuffs[effect.type] += effect.maxValue;
            }
          } else {
            if (skill.jobLevel <= 15) {
              this.unit.remainingBuffs.push(this.skillService.formatEffect(this.unit, skill, effect));
            } else {
              if (effect && effect.type === 'INCREASE_UNIT_LEVEL') {
                maxExLevel += effect.value;
                exempleSkillMaxExLevel = JSON.parse(JSON.stringify(skill));
              } else {
                if (skill.maxLevel > 1) {
                  skill.level = skill.maxLevel;
                }
                this.unit.remainingExBuffs.push(this.skillService.formatEffect(this.unit, skill, effect));
              }
            }
          }
        }
      });

      if (maxExLevel > 0) {
        exempleSkillMaxExLevel.effects[0].value = maxExLevel;
        this.unit.remainingExBuffs.push(this.skillService.formatEffect(this.unit, exempleSkillMaxExLevel, exempleSkillMaxExLevel.effects[0]));
      }

      this.skillService.sort(this.unit.skills);

      this.unit.formattedMasterSkill = [];
      if (this.unit.masterSkill.length > 0) {
        for (const masterSkillId of this.unit.masterSkill) {
          let masterSkill = await this.skillService.getSkill(masterSkillId);
          if (masterSkill) {
            masterSkill.name = this.nameService.getName(masterSkill);
            masterSkill.upgradeHtml = this.skillService.formatUpgrade(this.unit, masterSkill);

            masterSkill.effects.forEach(effect => {
              effect.formatHtml = this.skillService.formatEffect(this.unit, masterSkill, effect);
            });

            masterSkill.upgrades = [];
            masterSkill = this.addUpgrade(masterSkill);

            this.unit.formattedMasterSkill.push(masterSkill);
          }
        }
      }

      if (this.unit.limit) {
        this.unit.formattedLimit = await this.skillService.getSkill(this.unit.limit);
        if (this.unit.formattedLimit) {
          this.unit.formattedLimit.name = this.nameService.getName(this.unit.formattedLimit);
          this.unit.formattedLimit.upgradeHtml = this.skillService.formatUpgrade(this.unit, this.unit.formattedLimit);

          this.unit.formattedLimit.basedHtml = this.unit.formattedLimit.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + this.unit.formattedLimit.based.toLowerCase() + '.png\' />' : '';

          this.unit.formattedLimit.effectsHtml = this.skillService.formatEffects(this.unit, this.unit.formattedLimit);

          this.unit.formattedLimit.damageHtml = this.skillService.formatDamage(this.unit, this.unit.formattedLimit, this.unit.formattedLimit.damage);

          this.rangeService.formatRange(this.unit, this.unit.formattedLimit);

          this.unit.formattedLimit.upgrades = [];
          this.unit.formattedLimit = this.addUpgrade(this.unit.formattedLimit);
        }
      }

      if (this.unit.attack) {
        this.unit.formattedAttack = await this.skillService.getSkill(this.unit.attack);
        if (this.unit.formattedAttack) {
          this.unit.formattedAttack.upgradeHtml = this.skillService.formatUpgrade(this.unit, this.unit.formattedAttack);
          this.unit.formattedAttack.basedHtml = this.unit.formattedAttack.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + this.unit.formattedAttack.based.toLowerCase() + '.png\' />' : '';

          this.unit.formattedAttack.effectsHtml = this.skillService.formatEffects(this.unit, this.unit.formattedAttack);

          this.unit.formattedAttack.damageHtml = this.skillService.formatDamage(this.unit, this.unit.formattedAttack, this.unit.formattedAttack.damage);

          this.rangeService.formatRange(this.unit, this.unit.formattedAttack);
          this.unit.formattedAttack.upgrades = [];
          this.unit.formattedAttack = this.addUpgrade(this.unit.formattedAttack);
        }
      }

      if (this.unit.tmr) {
        this.unit.formattedTmr = await this.equipmentService.getEquipment(this.unit.tmr);

        this.unit.formattedTmr.name = this.nameService.getName(this.unit.formattedTmr);
        this.unit.formattedTmr.statsTypes = Object.keys(this.unit.formattedTmr.stats);

        this.unit.formattedTmr.formattedSkills = [];
        for (const skillData of this.unit.formattedTmr.skills[0]) {
          const skill = await this.skillService.getSkill(skillData.dataId);
          skill.name = this.nameService.getName(skill);
          skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);
          this.rangeService.formatRange(this.unit, skill);
          skill.effectsHtml = this.skillService.formatEffects(this.unit, skill);
          this.unit.formattedTmr.formattedSkills.push(skill);
        }
      }

      this.unit.jobsStats = [];
      this.unit.totalJobsStats = {};

      this.unit.EXJobsStats = [];
      this.unit.totalEXJobsStats = {};

      let i = 0;
      for (const jobId of this.unit.jobs) {
        const job = await this.jobService.getJob(jobId);
        this.calcJobStat(job, (i > 0 ? true : false));
        job.name = this.nameService.getName(job);
        this.jobs.push(job);
        i++;
      }

      if (this.unit.exJobs) {
        for (const jobId of this.unit.exJobs) {
          const job = await this.jobService.getJob(jobId);
          this.calcEXJobStat(job, false);
          job.name = this.nameService.getName(job);
          this.exJobs.push(job);
          i++;
        }
      }

      Object.keys(this.unit.totalJobsStats).forEach(stat => {
        this.unit.totalJobsStats[stat] = Math.floor(this.unit.totalJobsStats[stat]);
        if (this.unit.totalJobsStats[stat] !== (this.unit.jobsStats[0][stat] + this.unit.jobsStats[1][stat] + this.unit.jobsStats[2][stat])) {
          this.unit.jobsStats[0][stat] += this.unit.totalJobsStats[stat] - (this.unit.jobsStats[0][stat] + this.unit.jobsStats[1][stat] + this.unit.jobsStats[2][stat]);
        }
      });

      Object.keys(this.unit.totalEXJobsStats).forEach(stat => {
        this.unit.totalEXJobsStats[stat] = Math.floor(this.unit.totalEXJobsStats[stat]);
        if (this.unit.totalEXJobsStats[stat] !== (this.unit.totalJobsStats[stat] + this.unit.EXJobsStats[0][stat])) {
          if (this.unit.EXJobsStats[0][stat] === 0) {
            this.unit.totalEXJobsStats[stat] = this.unit.totalJobsStats[stat];
          } else {
            this.unit.EXJobsStats[0][stat] = this.unit.totalEXJobsStats[stat] - this.unit.totalJobsStats[stat];
          }
        }
      });

      this.grid = this.gridService.generateUnitGrid(this.unit, 800, this.unit.exJobs && this.unit.exJobs.length > 0);
    }
  }

  private addUpgrade(skill) {
    if (this.unit.replacedSkills) {
      Object.keys(this.unit.replacedSkills).forEach(upgradeSkillId => {
        const activatedBy = this.findActivatedByName(upgradeSkillId);
        this.unit.replacedSkills[upgradeSkillId].forEach(upgrade => {
          if (upgrade.oldSkill === skill.dataId) {
            let newSkill = upgrade.newSkill;
            newSkill.name = this.nameService.getName(newSkill);

            newSkill.upgradeHtml = this.skillService.formatUpgrade(this.unit, newSkill);
            newSkill.effectsHtml = this.skillService.formatEffects(this.unit, newSkill);
            newSkill.damageHtml = this.skillService.formatDamage(this.unit, newSkill, newSkill.damage);

            if (newSkill.counter) {
              newSkill.counterHtml = this.skillService.formatCounter(this.unit, newSkill, newSkill.counter);
            }

            this.rangeService.formatRange(this.unit, newSkill);

            newSkill.upgrades = [];
            newSkill = this.addUpgrade(newSkill);

            newSkill.activatedBy = activatedBy;

            skill.upgrades.push(newSkill);
          }
        });
      });
    }

    return skill;
  }

  private findActivatedByName(upgradeSkillId) {
    let name = '';

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.dataId === upgradeSkillId) {
        name = this.nameService.getName(this.unit.board.nodes[nodeId].skill);
      }
    });

    if (name === '' && this.unit.masterSkill.length > 0) {
      this.unit.formattedMasterSkill.forEach(masterSkill => {
        if (masterSkill.dataId === upgradeSkillId) {
          name = this.nameService.getName(masterSkill);
        }
      });
    }

    if (name === '' && this.unit.limit && this.unit.formattedLimit) {
      if (this.unit.limit === upgradeSkillId) {
        name = this.nameService.getName(this.unit.formattedLimit);
      }
    }

    if (name === '' && this.unit.replacedSkills) {
      Object.keys(this.unit.replacedSkills).forEach(otherUpgradeSkillId => {
        this.unit.replacedSkills[otherUpgradeSkillId].forEach(upgrade => {
          if (upgrade.newSkill.dataId === upgradeSkillId) {
            name = this.nameService.getName(upgrade.newSkill);
          }
        });
      });
    }

    return name;
  }

  private calcJobStat(job, subJob) {
    const stats = {};

    if (job) {
      Object.keys(job.statsModifiers[14]).forEach(stat => {
        stats[stat] = Math.floor(this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1));

        if (!subJob) {
          this.unit.totalJobsStats[stat] = this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1);
        } else {
          this.unit.totalJobsStats[stat] += this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1);
        }
      });
    }

    this.unit.jobsStats.push(stats);
  }

  private calcEXJobStat(job, subJob) {
    const stats = {};

    if (job) {
      Object.keys(job.statsModifiers[9]).forEach(stat => {
        const existingStat = this.unit.jobsStats[0][stat];
        stats[stat] = Math.floor(this.unit.stats[stat].ex * (job.statsModifiers[9][stat] / 10000) * (subJob ? 0.5 : 1)) - existingStat;
        if (stats[stat] < 0) {
          stats[stat] = 0;
        }

        if (!subJob) {
          const newStat = (this.unit.stats[stat].ex * (job.statsModifiers[9][stat] / 10000) * (subJob ? 0.5 : 1)) - existingStat;
          this.unit.totalEXJobsStats[stat] = this.unit.totalJobsStats[stat] + (newStat < 0 ? 0 : newStat);
        } else {
          this.unit.totalEXJobsStats[stat] += this.unit.stats[stat].ex * (job.statsModifiers[9][stat] / 10000) * (subJob ? 0.5 : 1);
        }
      });
    }

    this.unit.EXJobsStats.push(stats);
  }

  getSkillsPerJob(job) {
    const skills = [];
    if (job === 0) {
      this.unit.skills.forEach(skill => {
        if (skill.mainSkill && skill.type === 'skill') {
          skills.push(skill);
        }
      });
    } else {
      this.unit.skills.forEach(skill => {
        if (skill.unlockJob === job && !skill.mainSkill && skill.type === 'skill') {
          skills.push(skill);
        }
      });
    }

    return skills;
  }

  getSkillsPerType(type) {
    const skills = [];
    this.unit.skills.forEach(skill => {
      if (skill.type === type) {
        skills.push(skill);
      }
    });

    return skills;
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type);
  }

  clickNode(this, node) {
    if (node !== 0) {
      if (!this.unit.board.nodes[node].activated) {
        this.showNode(node);
      } else {
        this.hideNode(node);
      }
    }
  }

  showNode(node) {
    if (node !== 0) {
      this.unit.board.nodes[node].activated = true;
      this.showNode(this.unit.board.nodes[node].parent);
    }
  }

  hideNode(node) {
    if (node !== 0) {
      this.unit.board.nodes[node].activated = false;
      this.unit.board.nodes[node].children.forEach(childNode => {
        this.hideNode(childNode);
      });
    }
  }

  clickSpecialBismark() {
    this.specialBismark = !this.specialBismark;
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  async getIndexUnit() {
    const buildedUnit = await this.unitService.selectUnitForBuilder(this.unit.dataId, null, true);

    const stats = {};
    Object.keys(buildedUnit.stats).forEach(statType => {
      stats[statType] = buildedUnit.stats[statType].total;
    });

    const indexStatsType = [
      'HP',
      'TP',
      'AP',
      'ATK',
      'DEF',
      'MAG',
      'SPR',
      'AGI',
      'DEX',
      'LUCK',
      'EVADE',
      'ACCURACY',
      'CRITIC_RATE'
    ];

    this.indexUnit = [[]];
    indexStatsType.forEach(stat => {
      if (this.indexUnit[this.indexUnit.length - 1].length === 8) {
        this.indexUnit.push([]);
      }

      if (stats[stat]) {
        this.indexUnit[this.indexUnit.length - 1].push({
          type: stat,
          value: stats[stat]
        });
      }
    });

    this.indexImageStatsType.forEach(stat => {
      if (this.indexUnit[this.indexUnit.length - 1].length === 8) {
        this.indexUnit.push([]);
      }

      if (stats[stat]) {
        this.indexUnit[this.indexUnit.length - 1].push({
          type: stat,
          value: stats[stat]
        });
      }
    });
  }
}
