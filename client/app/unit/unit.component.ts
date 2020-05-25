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
      }
    });
  }

  private formatUnit() {
    let lang = this.translateService.currentLang
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

        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
        });

        skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.unit, skill, skill.counter);
        }

        this.skillService.formatRange(this.unit, skill);
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

        masterSkill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.unit, masterSkill, effect);
        });
      })
    }

    if (this.unit.limit) {
      this.unit.limit.name = this.nameService.getName(this.unit.limit)

      this.unit.limit.basedHtml = this.unit.limit.based ? "<img class='atkBasedImg' src='assets/atkBased/" + this.unit.limit.based.toLowerCase() + ".png' />" : "";

      this.unit.limit.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.limit, effect);
      });

      this.unit.limit.damageHtml = this.skillService.formatDamage(this.unit, this.unit.limit, this.unit.limit.damage);

      this.skillService.formatRange(this.unit, this.unit.limit);
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

    this.grid = this.gridService.generateUnitGrid(this.unit)
  }

  private calcJobStat(job, subJob) {
    let stats = {};

    Object.keys(job.statsModifiers[14]).forEach(stat => {
      stats[stat] = Math.floor(this.unit.stats[stat].max * (job.statsModifiers[14][stat] / 10000) * (subJob ? 0.5 : 1))

      if (!subJob) {
        this.unit.totalJobsStats[stat] = stats[stat]
      } else {
        this.unit.totalJobsStats[stat] += stats[stat]
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
}
