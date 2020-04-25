import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';

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
    private translateService: TranslateService
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
  }
}
