import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  private units;
  private formattedUnits = {};

  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateUnits();
    });
  }

  ngOnInit(): void {
    this.getUnits();
  }

  private getUnits(): void {
    let lang = this.translateService.currentLang
    this.units = this.unitService.getUnitsForListing();

    Object.keys(this.units).forEach(rarity => {
      this.unitService.sortByName(this.units[rarity], this.translateService)

      this.formattedUnits[rarity] = [];
      let tableIndex = -1;
      this.units[rarity].forEach((unit, index) => {
        if (index % 4 === 0) {
          tableIndex++;
          this.formattedUnits[rarity][tableIndex] = [];
        }

        unit.name = unit.names[lang]
        this.formattedUnits[rarity][tableIndex].push(unit)
      });
    });
  }

  private translateUnits() {
    let lang = this.translateService.currentLang

    Object.keys(this.formattedUnits).forEach(rarity => {
      this.formattedUnits[rarity].forEach(line => {
        line.forEach(unit => {
          unit.name = unit.names[lang]
        });
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
