import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipment = null;

  constructor(
    private equipmentService: EquipmentService,
    private skillService: SkillService,
    private unitService: UnitService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private jobService: JobService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatEquipment();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.equipment = this.equipmentService.getEquipmentBySlug(params.get('slug'))
      if (!this.equipment) {
        this.router.navigate([this.navService.getRoute('/equipment-not-found')]);
      } else {
        this.formatEquipment();
      }
    });
  }

  private sortSkills(skills) {
    skills.sort((a: any, b: any) => {
      if (a.damage) {
        return -1
      } else {
        if (a.effects.length > 1) {
          return -1
        } else if (b.effects.length > 1) {
          return 1
        } else {
          if (a.effects[0].type > b.effects[0].type) {
            return 1
          } else {
            return -1
          }
        }
      }
    })
  }

  private formatEquipment() {
    this.equipment.name = this.nameService.getName(this.equipment)
    this.equipment.statsTypes = Object.keys(this.equipment.stats)

    let i = 0;
    this.equipment.countSkills = [];
    this.equipment.effectTypes = [];
    this.equipment.passiveSkills = [];

    this.equipment.skills.forEach(equipmentLvl => {
      this.equipment.countSkills.push(i);

      this.sortSkills(equipmentLvl)

      equipmentLvl.forEach(skill => {
        skill.name = this.nameService.getName(skill)

        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEquipmentEffect(this.equipment, skill, effect);
        });

        if (skill.damage) {
          skill.damageHtml = this.skillService.formatDamage(this.equipment, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.equipment, skill, skill.counter);
        }

        this.skillService.formatRange(this.equipment, skill);

        if (skill.type == "skill") {
          this.equipment.activeSkill = skill
        }

        if (skill.type !== "skill") {
          if (skill.effects[0]) {
            if (this.equipment.effectTypes.indexOf(skill.effects[0].type) == -1) {
              this.equipment.effectTypes.push(skill.effects[0].type)
            }
            skill.mainEffect = skill.effects[0].type
          }

          this.equipment.passiveSkills.push(skill)
        }
      });
      i++;
    });

    if (this.equipment.acquisition.type === "tmr") {
      let unit = this.getUnit(this.equipment.acquisition.unitId)
      if (unit) {
        this.equipment.acquisition.unit = {
          name: this.nameService.getName(unit),
          slug: unit.slug
        }
      } else {
        this.equipment.acquisition.unit = {
          name: "Unknown",
          slug: "Unknown"
        }
      }
    } else {
      let acquis = "Unknown"
      if (this.equipment.acquisition.type !== "Unknown") {
        if (!this.equipment.acquisition.type[this.translateService.currentLang]) {
          acquis = this.equipment.acquisition.type[this.translateService.getDefaultLang()];
        } else {
          acquis = this.equipment.acquisition.type[this.translateService.currentLang];
        }
      }
      this.equipment.acquisition.name = acquis
    }

    this.equipment.growIds = Object.keys(this.equipment.grows)
    this.equipment.growIds.forEach(growId => {
      this.equipment.grows[growId].name = this.nameService.getName(this.equipment.grows[growId])
      this.equipment.grows[growId].stats = {};
      this.equipment.statsTypes.forEach(statType => {
        let maxValue = this.equipment.stats[statType].max
        if (typeof(this.equipment.grows[growId].curve[statType]) == "number") {
          this.equipment.grows[growId].stats[statType] = Math.floor(maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100))
        } else {
          this.equipment.grows[growId].stats[statType] = maxValue
        }
      })
    })

    this.equipment.jobs = []
    this.equipment.equippableJobs.forEach(jobId => {
      let job = this.jobService.getJob(jobId)
      job.name = this.nameService.getName(job)
      this.equipment.jobs.push(job)
    })
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type)
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  private getUnit(unitId) {
    return this.unitService.getUnit(unitId)
  }
}
