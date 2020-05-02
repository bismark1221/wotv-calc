import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UnitService } from '../services/unit.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { JobService } from '../services/job.service';
import { GridService } from '../services/grid.service';


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
    private gridService: GridService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatUnit();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.unit = this.unitService.getUnitBySlug(params.get('slug'))
      if (!this.unit) {
        this.router.navigate(['/unit-not-found']);
      } else {
        this.formatUnit();
      }
    });
  }

  private formatUnit() {
    let lang = this.translateService.currentLang
    this.unit.name = this.unit.names[lang]

    this.unit.skills.forEach(skill => {
      skill.name = skill.names[lang]

      skill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
      });

      skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);

      if (skill.counter) {
        skill.counterHtml = this.skillService.formatCounter(this.unit, skill, skill.counter);
      }

      this.skillService.formatRange(this.unit, skill);
    });
    this.skillService.sort(this.unit.skills);

    if (this.unit.masterSkill) {
      this.unit.masterSkill.name = this.unit.masterSkill.names[lang]

      this.unit.masterSkill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.masterSkill, effect);
      });
    }

    if (this.unit.limit) {
      this.unit.limit.name = this.unit.limit.names[lang]

      this.unit.limit.basedHtml = this.unit.limit.based ? "<img class='atkBasedImg' src='assets/atkBased/" + this.unit.limit.based.toLowerCase() + ".png' />" : "";

      this.unit.limit.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.limit, effect);
      });

      this.unit.limit.damageHtml = this.skillService.formatDamage(this.unit, this.unit.limit, this.unit.limit.damage);

      this.skillService.formatRange(this.unit, this.unit.limit);
    }

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
      LCK: 0,
      CRITIC_RATE: 0,
    };
    this.unit.remainingBuffs = [];

    this.unit.buffs.forEach(buff => {
      let effect = buff.effects[0]
      if (typeof(this.unit.totalBuffs[effect.type]) === "number" && effect.calcType === "fixe") {
        this.unit.totalBuffs[effect.type] += effect.value
      } else {
        this.unit.remainingBuffs.push(this.skillService.formatEffect(this.unit, buff, effect, false))
      }
    });

    if (this.unit.tmr) {
      this.unit.tmr.name = this.unit.tmr.names[lang]
      this.unit.tmr.statsTypes = Object.keys(this.unit.tmr.stats)

      this.unit.tmr.skills.forEach(skill => {
        skill.name = skill.names[lang]
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
      job.name = job.names[lang]
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
        if (skill.slot === 1) {
          skills.push(skill)
        }
      })
    } else {
      this.unit.skills.forEach(skill => {
        if (skill.unlockJob === job && skill.slot !== 1) {
          skills.push(skill)
        }
      })
    }

    return skills;
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type)
  }
}
