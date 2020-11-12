import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit {
  units = [];
  sort = "name"
  order = "asc"
  jobs = [];
  statsType = ['HP','TP','AP','ATK','DEF','MAG','SPR','AGI','DEX','LUCK','EVADE','ACCURACY']
  loading = false

  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService
  ) {
  }

  ngOnInit() {
    this.navService.setTitle("Index");

    this.loading = true;

    this.getUnits();
    this.loading = false;
  }

  getUnits() {
    let units = this.unitService.getUnits()
    units.forEach(unit => {
      this.units.push(this.unitService.selectUnitForBuilder(unit.dataId, null, true))
    })

    this.sortTable()
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  changeSort(sort) {
    if (sort == this.sort) {
      this.order = this.order == "asc" ? "desc" : "asc"
    } else {
      if (sort == "name") {
        this.order = "asc"
      } else {
        this.order = "desc"
      }
    }

    this.sort = sort
    this.sortTable()
  }

  sortTable() {
    this.toolService.sortByName(this.units, this.sort == "name" ? this.order : "asc")

    if (this.sort != "name") {
      this.units.sort((a, b) => {
        if (!a.stats[this.sort] && !b.stats[this.sort]) {
          return 0
        }

        if (!a.stats[this.sort]) {
          return this.order == "asc" ? -1 : 1;
        }

        if (!b.stats[this.sort]) {
          return this.order == "asc" ? 1 : -1;
        }

        if (a.stats[this.sort].total > b.stats[this.sort].total) {
          return this.order == "asc" ? 1 : -1;
        } else if (a.stats[this.sort].total < b.stats[this.sort].total) {
          return this.order == "asc" ? -1 : 1;
        }

        return 0
      })
    }
  }
}
