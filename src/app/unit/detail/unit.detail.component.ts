import { Component, OnInit, HostListener, PLATFORM_ID, Inject, ViewChild, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '../../services/translate.service';
import { UnitService } from '../../services/unit.service';
import { EquipmentService } from '../../services/equipment.service';
import { SkillService } from '../../services/skill.service';
import { RangeService } from '../../services/range.service';
import { JobService } from '../../services/job.service';
import { GridService } from '../../services/grid.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { IndexService } from '../../services/index.service';

import { GL_JOB_GROUP } from '../../data/gl/jobGroup';
import { JP_JOB_GROUP } from '../../data/jp/jobGroup';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit.detail.component.html',
  styleUrls: ['./unit.detail.component.css']
})
export class UnitDetailComponent implements OnInit {
  unit = null;
  jobs = [];
  exJobs = [];
  grid = null;
  activeTab;
  possibleSkillTypes = ['support', 'counter'];
  indexUnit = [];
  indexDreamUnit = [];
  version = 'GL';

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

  jobGroups = {
    GL: GL_JOB_GROUP,
    JP: JP_JOB_GROUP
  };

  weaponsGroups = {
    SWORDA: 'Sword (Red Mage, etc)',
    SWORDB: 'Sword (Warrior, etc)',
    SWORDC: 'Sword (Knight, etc)',
    STAFFA: 'Staff (Black Mage, etc)',
    STAFFB: 'Staff (Devout, etc)'
  };

  windowSize = 1230;
  tmrStatsTypesByRow = [['image', 'name', 'type']];
  @ViewChild('unitGridContainer') unitGridContainer: ElementRef;

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
    private toolService: ToolService,
    private indexService: IndexService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.version = this.navService.getVersion();
  }

  @HostListener('window:resize', []) onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowSize = window.innerWidth;

      this.getTmrStatsTypesByRow();

      if (this.windowSize >= 930) {
        if (this.unitGridContainer) {
          this.unitGridContainer.nativeElement.style.width = '800px';
        }
      } else {
        if (this.unitGridContainer) {
          this.unitGridContainer.nativeElement.style.width = (this.windowSize - 40) + 'px';
        }
      }
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.unit = await this.unitService.getUnitBySlugWithApi(params.get('slug'));

      if (!this.unit) {
        this.router.navigate([this.navService.getRoute('/unit-not-found')]);
      } else {
        if (this.unit.exJobs && this.unit.exJobs.length > 0) {
          this.possibleSkillTypes = ['support', 'counter', 'ex_buff'];
        }

        this.formatUnit();
        await this.getIndexUnit();

        this.navService.setSEO(this.unit.names.en, this.unit.descriptions.en);
      }
    });

    this.translateService.onLangChange.subscribe(async (event) => {
      this.formatUnit();
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

    this.onWindowResize();
  }

  private formatUnit() {
    if (this.unit) {
      this.jobs = [];
      this.unit.name = this.toolService.getName(this.unit);
      this.unit.description = this.toolService.getDescription(this.unit);
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

      for (let skill of this.unit.formattedUnlockedSkills) {
        skill.name = this.toolService.getName(skill);
        skill.upgradeHtml = this.skillService.formatUpgrade(this.unit, skill);

        skill.effectsHtml = this.skillService.formatEffects(this.unit, skill);

        skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.unit, skill, skill.counter);
        }

        this.rangeService.formatRange(this.unit, skill);

        skill.upgrades = [];
        skill = this.addUpgrade(skill);
      }

      Object.keys(this.unit.board.nodes).forEach(nodeId => {
        let skill = this.unit.board.nodes[nodeId].skill;
        if (skill.type !== 'buff' && !(this.unit.board.nodes[nodeId].type === 'buff' && skill.type === 'ex_buff')) {
          skill.name = this.toolService.getName(skill);
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

          if (effect) {
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
          let masterSkill = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === masterSkillId);
          if (masterSkill) {
            masterSkill.name = this.toolService.getName(masterSkill);
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
        this.unit.formattedLimit = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === this.unit.limit);
        if (this.unit.formattedLimit) {
          this.unit.formattedLimit.name = this.toolService.getName(this.unit.formattedLimit);
          this.unit.formattedLimit.upgradeHtml = this.skillService.formatUpgrade(this.unit, this.unit.formattedLimit);

          this.unit.formattedLimit.basedHtml = this.unit.formattedLimit.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + this.unit.formattedLimit.based.toLowerCase() + '.webp\' />' : '';

          this.unit.formattedLimit.effectsHtml = this.skillService.formatEffects(this.unit, this.unit.formattedLimit);

          this.unit.formattedLimit.damageHtml = this.skillService.formatDamage(this.unit, this.unit.formattedLimit, this.unit.formattedLimit.damage);

          this.rangeService.formatRange(this.unit, this.unit.formattedLimit);

          this.unit.formattedLimit.upgrades = [];
          this.unit.formattedLimit = this.addUpgrade(this.unit.formattedLimit);
        }
      }

      if (this.unit.attack) {
        this.unit.formattedAttack = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === this.unit.attack);
        if (this.unit.formattedAttack) {
          this.unit.formattedAttack.upgradeHtml = this.skillService.formatUpgrade(this.unit, this.unit.formattedAttack);
          this.unit.formattedAttack.basedHtml = this.unit.formattedAttack.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + this.unit.formattedAttack.based.toLowerCase() + '.webp\' />' : '';

          this.unit.formattedAttack.effectsHtml = this.skillService.formatEffects(this.unit, this.unit.formattedAttack);

          this.unit.formattedAttack.damageHtml = this.skillService.formatDamage(this.unit, this.unit.formattedAttack, this.unit.formattedAttack.damage);

          this.rangeService.formatRange(this.unit, this.unit.formattedAttack);
          this.unit.formattedAttack.upgrades = [];
          this.unit.formattedAttack = this.addUpgrade(this.unit.formattedAttack);
        }
      }

      if (this.unit.tmr) {
        this.unit.tmr.name = this.toolService.getName(this.unit.tmr);
        this.unit.tmr.statsTypes = Object.keys(this.unit.tmr.stats[0]);
        this.getTmrStatsTypesByRow();

        this.unit.tmr.formattedSkills = [];
        for (const skillData of this.unit.tmr.skills[0]) {
          const skill = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === skillData.dataId);

          skill.name = this.toolService.getName(skill);
          skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);
          this.rangeService.formatRange(this.unit, skill);
          skill.effectsHtml = this.skillService.formatEffects(this.unit, skill);
          this.unit.tmr.formattedSkills.push(skill);
        }
      }

      this.unit.jobsStats = [];
      this.unit.totalJobsStats = {};

      this.unit.EXJobsStats = [];
      this.unit.totalEXJobsStats = {};

      let i = 0;
      for (const jobId of this.unit.jobs) {
        const job = this.unit.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
        this.calcJobStat(job, (i > 0 ? true : false));
        job.name = this.toolService.getName(job);

        if (i === 0 && (job.equipments.weapons.indexOf('SWORD') !== -1 || job.equipments.weapons.indexOf('ROD') !== -1)) {
          let jobGroupCount = 0;
          let weaponGroupFound = null;
          const jobGroupIds = Object.keys(this.jobGroups[this.version]);

          while (weaponGroupFound === null && jobGroupCount <= jobGroupIds.length - 1) {
            let jobInGroupCount = 0;
            const jobGroup = this.jobGroups[this.version][jobGroupIds[jobGroupCount]];
            while(weaponGroupFound === null && jobInGroupCount <= jobGroup.length - 1) {
              if (this.unitService.unitHasJob(this.unit, {job: [jobGroup[jobInGroupCount]], subjob: false, mainJob: true})) {
                weaponGroupFound = jobGroupIds[jobGroupCount];
              }

              jobInGroupCount++;
            }

            jobGroupCount++;
          }

          if (weaponGroupFound) {
            job.equipments.weaponGroup = this.weaponsGroups[weaponGroupFound];
          }
        }

        this.jobs.push(job);
        i++;
      }

      if (this.unit.exJobs) {
        for (const jobId of this.unit.exJobs) {
          const job = this.unit.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
          this.calcEXJobStat(job, false);
          job.name = this.toolService.getName(job);
          this.exJobs.push(job);
          i++;
        }
      }

      Object.keys(this.unit.totalJobsStats).forEach(stat => {
        this.unit.totalJobsStats[stat] = Math.floor(this.unit.totalJobsStats[stat]);
        if (this.unit.jobsStats.length === 3 && this.unit.totalJobsStats[stat] !== (this.unit.jobsStats[0][stat] + this.unit.jobsStats[1][stat] + this.unit.jobsStats[2][stat])) {
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

      if (this.unit.dream && this.unit.dream.skills) {
        for (const dreamSkillId of this.unit.dream.skills) {
          let dreamSkill = this.unit.rawSkills.find(searchedSkill => searchedSkill.dataId === dreamSkillId);
          if (dreamSkill) {
            dreamSkill.upgradeHtml = this.skillService.formatUpgrade(this.unit, dreamSkill);
            dreamSkill.basedHtml = dreamSkill.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + dreamSkill.based.toLowerCase() + '.webp\' />' : '';

            dreamSkill.effectsHtml = this.skillService.formatEffects(this.unit, dreamSkill);

            dreamSkill.damageHtml = this.skillService.formatDamage(this.unit, dreamSkill, dreamSkill.damage);

            this.rangeService.formatRange(this.unit, dreamSkill);
            dreamSkill.upgrades = [];
            dreamSkill = this.addUpgrade(dreamSkill);

            this.unit.formattedDreamSkill.push(dreamSkill);
          }
        }
      }

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
            newSkill.name = this.toolService.getName(newSkill);

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
        name = this.toolService.getName(this.unit.board.nodes[nodeId].skill);
      }
    });

    if (name === '' && this.unit.masterSkill.length > 0) {
      this.unit.formattedMasterSkill.forEach(masterSkill => {
        if (masterSkill.dataId === upgradeSkillId) {
          name = this.toolService.getName(masterSkill);
        }
      });
    }

    if (name === '' && this.unit.limit && this.unit.formattedLimit) {
      if (this.unit.limit === upgradeSkillId) {
        name = this.toolService.getName(this.unit.formattedLimit);
      }
    }

    if (name === '' && this.unit.replacedSkills) {
      Object.keys(this.unit.replacedSkills).forEach(otherUpgradeSkillId => {
        this.unit.replacedSkills[otherUpgradeSkillId].forEach(upgrade => {
          if (upgrade.newSkill.dataId === upgradeSkillId) {
            name = this.toolService.getName(upgrade.newSkill);
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
        if (this.unit.stats[stat]) {
          const maxStat = this.unit.stats[stat].ex ? this.unit.stats[stat].ex : this.unit.stats[stat].max;
          stats[stat] = Math.floor(maxStat * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1));

          if (!subJob) {
            this.unit.totalJobsStats[stat] = maxStat * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1);
          } else {
            this.unit.totalJobsStats[stat] += maxStat * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1);
          }
        }
      });
    }

    this.unit.jobsStats.push(stats);
  }

  private calcEXJobStat(job, subJob) {
    const stats = {};

    if (job) {
      const jobStatsModifier = job.statsModifiers[9];

      Object.keys(jobStatsModifier).forEach(stat => {
        if (this.unit.stats[stat]) {
          const existingStat = this.unit.jobsStats[0][stat];
          stats[stat] = Math.floor(this.unit.stats[stat].ex * (jobStatsModifier[stat] / 10000) * (subJob ? 0.5 : 1)) - existingStat;
          if (stats[stat] < 0) {
            stats[stat] = 0;
          }

          if (!subJob) {
            const newStat = (this.unit.stats[stat].ex * (jobStatsModifier[stat] / 10000) * (subJob ? 0.5 : 1)) - existingStat;
            this.unit.totalEXJobsStats[stat] = this.unit.totalJobsStats[stat] + (newStat < 0 ? 0 : newStat);
          } else {
            this.unit.totalEXJobsStats[stat] += this.unit.stats[stat].ex * (jobStatsModifier[stat] / 10000) * (subJob ? 0.5 : 1);
          }
        }
      });
    }

    this.unit.EXJobsStats.push(stats);
  }

  private getTmrStatsTypesByRow() {
    if (this.unit && this.unit.tmr) {
      this.tmrStatsTypesByRow = [['image', 'name', 'type']];

      this.unit.tmr.statsTypes.forEach(statType => {
        if (this.windowSize < 830 && this.tmrStatsTypesByRow[this.tmrStatsTypesByRow.length - 1].length === 3) {
          this.tmrStatsTypesByRow.push([]);
        }

        this.tmrStatsTypesByRow[this.tmrStatsTypesByRow.length - 1].push(statType);
      });
    }
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

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  async getIndexUnit() {
    const buildedUnit = await this.unitService.selectUnitForBuilder(this.unit.dataId, null, true);

    buildedUnit.masterSkillActivated = -1;
    this.unitService.updateMasterSkill();

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

    const stats = {};
    Object.keys(buildedUnit.stats).forEach(statType => {
      stats[statType] = buildedUnit.stats[statType].total;
    });

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


    if (this.unit.dream && this.unit.dream.stats) {
      const dreamStats = {};
      Object.keys(buildedUnit.stats).forEach(statType => {
        dreamStats[statType] = buildedUnit.stats[statType].total + (this.unit.dream.stats[statType] ? this.unit.dream.stats[statType] : 0);
      });

      this.indexDreamUnit = [[]];
      indexStatsType.forEach(stat => {
        if (this.indexDreamUnit[this.indexDreamUnit.length - 1].length === 8) {
          this.indexDreamUnit.push([]);
        }

        if (dreamStats[stat]) {
          this.indexDreamUnit[this.indexDreamUnit.length - 1].push({
            type: stat,
            value: dreamStats[stat]
          });
        }
      });

      this.indexImageStatsType.forEach(stat => {
        if (this.indexDreamUnit[this.indexDreamUnit.length - 1].length === 8) {
          this.indexDreamUnit.push([]);
        }

        if (dreamStats[stat]) {
          this.indexDreamUnit[this.indexDreamUnit.length - 1].push({
            type: stat,
            value: dreamStats[stat]
          });
        }
      });
    }
  }
}
