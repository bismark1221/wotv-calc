import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { UnitService } from '../services/unit.service';


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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.equipment = this.equipmentService.getEquipmentBySlug(params.get('slug'))
      if (!this.equipment) {
        this.router.navigate(['/equipment-not-found']);
      } else {
        this.formatEquipment();
      }
    });
  }

  private formatEquipment() {
    this.equipment.statsTypes = Object.keys(this.equipment.stats)

    let i = 0;
    this.equipment.countSkills = [];

    this.equipment.skills.forEach(equipmentLvl => {
      this.equipment.countSkills.push(i);

      equipmentLvl.forEach(skill => {
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

    if (this.equipment.acquisition && this.equipment.acquisition.type === "tmr") {
      let unit = this.getUnit(this.equipment.acquisition.unitId)
      this.equipment.acquisition.unit = {
        name: unit.names.en,
        slug: unit.slug
      }
    }
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type)
  }

  private getUnit(unitId) {
    return this.unitService.getUnit(unitId)
  }
}
