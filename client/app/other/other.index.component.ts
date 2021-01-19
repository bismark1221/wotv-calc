import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { IndexService } from '../services/index.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-other-index',
  templateUrl: './other.index.component.html',
  styleUrls: ['./other.index.component.css']
})
export class OtherIndexComponent implements OnInit {
  units = [];
  sort = 'name';
  order = 'asc';
  statsType = ['HP', 'TP', 'AP', 'ATK', 'DEF', 'MAG', 'SPR', 'AGI', 'DEX', 'LUCK', 'EVADE', 'ACCURACY'];
  imageStatsType = ['SLASH_RES', 'PIERCE_RES', 'STRIKE_RES', 'MISSILE_RES', 'MAGIC_RES', 'SLASH_ATK', 'PIERCE_ATK', 'STRIKE_ATK', 'MISSILE_ATK', 'MAGIC_ATK'];

  constructor(
    private indexService: IndexService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService
  ) {
  }

  ngOnInit() {
    this.navService.setTitle('Index');

    this.getUnits();
  }

  getUnits() {
    this.units = this.indexService.getUnits();

    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit);
    });

    this.sortTable();
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  changeSort(sort) {
    if (sort === this.sort) {
      this.order = this.order === 'asc' ? 'desc' : 'asc';
    } else {
      if (sort === 'name') {
        this.order = 'asc';
      } else {
        this.order = 'desc';
      }
    }

    this.sort = sort;
    this.sortTable();
  }

  sortTable() {
    this.toolService.sortByName(this.units, this.sort === 'name' ? this.order : 'asc');

    if (this.sort !== 'name') {
      this.units.sort((a, b) => {
        if (!a.stats[this.sort] && !b.stats[this.sort]) {
          return 0;
        }

        if (!a.stats[this.sort]) {
          return this.order === 'asc' ? -1 : 1;
        }

        if (!b.stats[this.sort]) {
          return this.order === 'asc' ? 1 : -1;
        }

        if (a.stats[this.sort] > b.stats[this.sort]) {
          return this.order === 'asc' ? 1 : -1;
        } else if (a.stats[this.sort] < b.stats[this.sort]) {
          return this.order === 'asc' ? -1 : 1;
        }

        return 0;
      });
    }
  }
}
