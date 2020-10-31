import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UnitService } from '../services/unit.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
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
  grid = null;
  specialBismark = false;
  activeTab;

  constructor(
    private unitService: UnitService,
    private equipmentService: EquipmentService,
    private skillService: SkillService,
    private jobService: JobService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private gridService: GridService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatUnit();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.unit = this.unitService.getUnitBySlug(params.get('slug'))

      if (!this.unit) {
        this.router.navigate([this.navService.getRoute('/unit-not-found')]);
      } else {
        this.formatUnit();
        this.navService.setTitle(this.unit.name);
      }
    })

    this.activatedRoute.fragment.subscribe((fragment: string) => {
      switch (fragment) {
        case "character":
          this.activeTab = 1
          break;
        case "stats":
          this.activeTab = 2
          break;
        case "skills":
          this.activeTab = 3
          break;
        case "tree":
          this.activeTab = 4
          break;
        default:
          break;
      }
    })
  }

  private formatUnit() {
    if (this.unit) {
      let lang = this.translateService.currentLang
      this.jobs = []
      this.unit.name = this.nameService.getName(this.unit)

      this.unit.skills = []

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
      this.unit.remainingBuffs = [];

      Object.keys(this.unit.board.nodes).forEach(nodeId => {
        let skill = this.unit.board.nodes[nodeId].skill
        if (skill.type !== "buff") {
          skill.name = this.nameService.getName(skill)
          skill.upgradeHtml = this.skillService.formatUpgrade(this.unit, skill);

          skill.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
          });

          skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);

          if (skill.counter) {
            skill.counterHtml = this.skillService.formatCounter(this.unit, skill, skill.counter);
          }

          this.skillService.formatRange(this.unit, skill);

          skill.upgrades = []
          skill = this.addUpgrade(skill)

          this.unit.skills.push(skill)
        } else {
          let effect = skill.effects[0]
          if (typeof(this.unit.totalBuffs[effect.type]) === "number" && effect.calcType === "fixe") {
            this.unit.totalBuffs[effect.type] += effect.minValue
          } else {
            this.unit.remainingBuffs.push(this.skillService.formatEffect(this.unit, skill, effect))
          }
        }
      })
      this.skillService.sort(this.unit.skills);

      if (this.unit.masterSkill.length > 0) {
        this.unit.masterSkill.forEach(masterSkill => {
          masterSkill.name = this.nameService.getName(masterSkill)
          masterSkill.upgradeHtml = this.skillService.formatUpgrade(this.unit, masterSkill);

          masterSkill.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(this.unit, masterSkill, effect);
          });

          masterSkill.upgrades = []
          masterSkill = this.addUpgrade(masterSkill)
        })
      }

      if (this.unit.limit) {
        this.unit.limit.name = this.nameService.getName(this.unit.limit)
        this.unit.limit.upgradeHtml = this.skillService.formatUpgrade(this.unit, this.unit.limit);

        this.unit.limit.basedHtml = this.unit.limit.based ? "<img class='atkBasedImg' src='assets/atkBased/" + this.unit.limit.based.toLowerCase() + ".png' />" : "";

        this.unit.limit.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.limit, effect);
        });

        this.unit.limit.damageHtml = this.skillService.formatDamage(this.unit, this.unit.limit, this.unit.limit.damage);

        this.skillService.formatRange(this.unit, this.unit.limit);

        this.unit.limit.upgrades = []
        this.unit.limit = this.addUpgrade(this.unit.limit)
      }

      if (this.unit.attack) {
        this.unit.attack.basedHtml = this.unit.attack.based ? "<img class='atkBasedImg' src='assets/atkBased/" + this.unit.attack.based.toLowerCase() + ".png' />" : "";

        this.unit.attack.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.attack, effect);
        });

        this.unit.attack.damageHtml = this.skillService.formatDamage(this.unit, this.unit.attack, this.unit.attack.damage);

        this.skillService.formatRange(this.unit, this.unit.attack);
      }

      if (this.unit.tmr) {
        this.unit.tmr.name = this.nameService.getName(this.unit.tmr)
        this.unit.tmr.statsTypes = Object.keys(this.unit.tmr.stats)

        this.unit.tmr.skills.forEach(skill => {
          skill.name = this.nameService.getName(skill)
          skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);
          this.skillService.formatRange(this.unit, skill);
          skill.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
          });
        });
      }

      this.unit.jobsStats = [];
      this.unit.totalJobsStats = {};

      let i = 0
      this.unit.jobs.forEach(jobId => {
        let job = this.jobService.getJob(jobId)
        this.calcJobStat(job, (i > 0 ? true : false))
        job.name = this.nameService.getName(job)
        this.jobs.push(job)
        i++
      })

      Object.keys(this.unit.totalJobsStats).forEach(stat => {
        this.unit.totalJobsStats[stat] = Math.floor(this.unit.totalJobsStats[stat])
        if (this.unit.totalJobsStats[stat] != (this.unit.jobsStats[0][stat] + this.unit.jobsStats[1][stat] + this.unit.jobsStats[2][stat])) {
          this.unit.jobsStats[0][stat] += this.unit.totalJobsStats[stat] - (this.unit.jobsStats[0][stat] + this.unit.jobsStats[1][stat] + this.unit.jobsStats[2][stat])
        }

      })

      this.grid = this.gridService.generateUnitGrid(this.unit, 800)
    }
  }

  private addUpgrade(skill) {
    if (this.unit.replacedSkills) {
      Object.keys(this.unit.replacedSkills).forEach(upgradeSkillId => {
        let activatedBy = this.findActivatedByName(upgradeSkillId)
        this.unit.replacedSkills[upgradeSkillId].forEach(upgrade => {
          if (upgrade.oldSkill == skill.dataId) {
            let newSkill = upgrade.newSkill
            newSkill.name = this.nameService.getName(newSkill)

            newSkill.effects.forEach(effect => {
              effect.formatHtml = this.skillService.formatEffect(this.unit, newSkill, effect);
            });

            newSkill.damageHtml = this.skillService.formatDamage(this.unit, newSkill, newSkill.damage);

            if (newSkill.counter) {
              newSkill.counterHtml = this.skillService.formatCounter(this.unit, newSkill, newSkill.counter);
            }

            this.skillService.formatRange(this.unit, newSkill);
            newSkill = this.addUpgrade(newSkill)


            newSkill.activatedBy = activatedBy

            skill.upgrades.push(newSkill)
          }
        })
      })
    }

    return skill
  }

  private findActivatedByName(upgradeSkillId) {
    let name = ""

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.dataId == upgradeSkillId) {
        name = this.nameService.getName(this.unit.board.nodes[nodeId].skill)
      }
    })

    if (name == "" && this.unit.masterSkill.length > 0) {
      this.unit.masterSkill.forEach(masterSkill => {
        if (masterSkill.dataId == upgradeSkillId) {
          name = this.nameService.getName(masterSkill)
        }
      })
    }

    if (name == "" && this.unit.limit) {
      if (this.unit.limit.dataId == upgradeSkillId) {
        name = this.nameService.getName(this.unit.limit)
      }
    }

    return name
  }

  private calcJobStat(job, subJob) {
    let stats = {};

    Object.keys(job.statsModifiers[14]).forEach(stat => {
      stats[stat] = Math.floor(this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1))

      if (!subJob) {
        this.unit.totalJobsStats[stat] = this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1)
      } else {
        this.unit.totalJobsStats[stat] += this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1)
      }
    });

    this.unit.jobsStats.push(stats)
  }

  isWeapon(type) {
    return this.equipmentService.isWeapon(type)
  }

  getSkillsPerJob(job) {
    let skills = [];
    if (job === 0) {
      this.unit.skills.forEach(skill => {
        if (skill.mainSkill && skill.type == "skill") {
          skills.push(skill)
        }
      })
    } else {
      this.unit.skills.forEach(skill => {
        if (skill.unlockJob === job && !skill.mainSkill && skill.type == "skill") {
          skills.push(skill)
        }
      })
    }

    return skills;
  }

  getSkillsPerType(type) {
    let skills = [];
    this.unit.skills.forEach(skill => {
      if (skill.type == type) {
        skills.push(skill)
      }
    })

    return skills;
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type)
  }

  clickNode(this, node) {
    if (node !== 0) {
      if (!this.unit.board.nodes[node].activated) {
        this.showNode(node)
      } else {
        this.hideNode(node)
      }
    }
  }

  showNode(node) {
    if (node !== 0) {
      this.unit.board.nodes[node].activated = true;
      this.showNode(this.unit.board.nodes[node].parent)
    }
  }

  hideNode(node) {
    if (node !== 0) {
      this.unit.board.nodes[node].activated = false;
      this.unit.board.nodes[node].children.forEach(childNode => {
        this.hideNode(childNode)
      })
    }
  }

  clickSpecialBismark() {
    this.specialBismark = !this.specialBismark
  }
}
