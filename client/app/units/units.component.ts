import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import { Skill } from '../entities/skill';
import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  private units: Unit[];

  idSelected: string = "unselect";
  unit = null;

  observableUnits: Array<Select2OptionData> = [];

  select2Options: Select2.Options = {
    theme: 'bootstrap' 
  }

  labels = {
    units: 'Units'
  }

  constructor(
    private unitService: UnitService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private equipmentService: EquipmentService,
    private navService: NavService,
    private skillService: SkillService
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.reloadList();
    });
  }

  ngOnInit(): void {
    this.idSelected = 'unselect';

    this.getUnits();
  }

  private getTranslation() {
    this.translateService.get('chain.label.units').subscribe((res: string) => {
      this.labels.units = res;
    });
  }

  private getUnits(): void {
    this.units = this.unitService.getUnits();
    console.log(this.units)
    this.reloadList();
  }

  private sortUnits() {
    this.unitService.sort(this.units, this.translateService);
  }

  private reloadList() {
    this.sortUnits();

    this.observableUnits = [
      {
        id: 'unselect',
        text: this.labels.units,
        children: []
      },
      {
        id: '0',
        text: this.labels.units,
        children: []
      },
    ];

    this.units.forEach(unit => {
      this.observableUnits[1].children.push({
        id: unit.dataId.toString(),
        text: unit.getName(this.translateService)
      });


      unit.skills.forEach(skill => {
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(unit, skill, effect);
        });
      });


    });

    delete this.observableUnits[0].children;
  }

  selectUnit(unitId: string) {
    this.idSelected = unitId;
    this.unit = this.unitService.getUnit(unitId);
    /*this.unit.skills.forEach(skill => {
      skill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(unit, skill, effect);
      });
    });*/
    console.log(this.unit)
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
}
