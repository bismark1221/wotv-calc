import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

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
    private nameService: NameService
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

  private formatEquipment() {
    this.equipment.name = this.nameService.getName(this.equipment)
    this.equipment.statsTypes = Object.keys(this.equipment.stats)

    let i = 0;
    this.equipment.countSkills = [];

    this.equipment.skills.forEach(equipmentLvl => {
      this.equipment.countSkills.push(i);

      equipmentLvl.forEach(skill => {
        skill.name = this.nameService.getName(skill)
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.equipment, skill, effect);
        });

        if (skill.damage) {
          skill.damageHtml = this.skillService.formatDamage(this.equipment, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.equipment, skill, skill.counter);
        }

        this.skillService.formatRange(this.equipment, skill);
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

    this.equipment.growIds = []
    if (Object.keys(this.equipment.grows).length > 1) {
      this.equipment.growIds = Object.keys(this.equipment.grows)
      Object.keys(this.equipment.grows).forEach(growId => {
        this.equipment.grows[growId].name = this.nameService.getName(this.equipment.grows[growId])
        this.equipment.grows[growId].stats = {};
        this.equipment.statsTypes.forEach(statType => {
          let maxValue = this.equipment.stats[statType].max
          this.equipment.grows[growId].stats[statType] = Math.floor(maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100))
        })
      })
    }
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
