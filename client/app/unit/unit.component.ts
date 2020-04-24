import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import { Skill } from '../entities/skill';
import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  unit = null;

  constructor(
    private unitService: UnitService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private equipmentService: EquipmentService,
    private navService: NavService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.unit = this.unitService.getUnit(params.get('unitId'))
      if (!this.unit) {
        this.router.navigate(['/unit-not-found']);
      } else {
        this.formatUnit();
      }
    });
  }

  private formatUnit() {
    this.unit.skills.forEach(skill => {
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
      this.unit.masterSkill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.masterSkill, effect);
      });
    }

    if (this.unit.limit) {
      this.unit.limit.basedHtml = this.unit.limit.based ? "<img class='atkBasedImg' src='assets/atkBased/" + this.unit.limit.based.toLowerCase() + ".png' />" : "";

      this.unit.limit.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.unit, this.unit.limit, effect);
      });

      this.unit.limit.damageHtml = this.skillService.formatDamage(this.unit, this.unit.limit, this.unit.limit.damage);

      this.skillService.formatRange(this.unit, this.unit.limit);
    }

    this.unit.buffs.forEach(buff => {
      let effect = buff.effects[0]
      if (typeof(this.unit.totalBuffs[effect.type]) === "number" && effect.calcType === "fixe") {
        this.unit.totalBuffs[effect.type] += effect.value
      } else {
        this.unit.remainingBuffs.push(this.skillService.formatEffect(this.unit, buff, effect, false))
      }
    });

    if (this.unit.tmr) {
      this.unit.tmr.statsTypes = Object.keys(this.unit.tmr.stats)

      this.unit.tmr.skills.forEach(skill => {
        skill.damageHtml = this.skillService.formatDamage(this.unit, skill, skill.damage);
        this.skillService.formatRange(this.unit, skill);
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.unit, skill, effect);
        });
      });
    }
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
