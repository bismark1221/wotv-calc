import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';


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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.equipment = this.equipmentService.getEquipment(params.get('equipmentId'))
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
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type)
  }
}
