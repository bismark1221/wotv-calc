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
  private units;
  private formattedUnit = {};

  constructor(
    private unitService: UnitService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private equipmentService: EquipmentService,
    private navService: NavService,
    private skillService: SkillService
  ) {}

  ngOnInit(): void {
    this.getUnits();
  }

  private getUnits(): void {
    this.units = this.unitService.getUnitsForListing();

    Object.keys(this.units).forEach(rarity => {
      this.unitService.sortByName(this.units[rarity], this.translateService)

      this.formattedUnit[rarity] = [];
      let tableIndex = -1;
      this.units[rarity].forEach((unit, index) => {
        if (index % 4 === 0) {
          tableIndex++;
          this.formattedUnit[rarity][tableIndex] = [];
        }

        this.formattedUnit[rarity][tableIndex].push(unit)
      });
    });

    console.log(this.units)
    console.log(this.formattedUnit)
  }
}
