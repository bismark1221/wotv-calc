import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units;
  searchText = "";

  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateUnits();
    });
  }

  ngOnInit(): void {
    this.getUnits();
  }

  private getUnits(): void {
    this.units = this.unitService.getUnitsForListing("rarity", null);
  }

  private translateUnits() {
    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit)
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  getFilteredUnits() {
    if (this.searchText !== "") {
      let text = this.searchText.toLowerCase();
      return this.units.filter(unit => {
        return unit.name.toLowerCase().includes(text);
      });
    } else {
      return this.units
    }
  }
}
