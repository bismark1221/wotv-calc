import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { RaidService } from '../services/raid.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-raids',
  templateUrl: './raids.component.html',
  styleUrls: ['./raids.component.css']
})
export class RaidsComponent implements OnInit {
  raids;
  searchText = "";
  sort = "name"
  order = "asc"
  filters = {
    element: []
  }
  isCollapsedElement = false;

  constructor(
    private raidService: RaidService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateRaids();
    });
  }

  ngOnInit(): void {
    this.getRaids();
  }

  getRaids(): void {
    this.raids = this.raidService.getRaidsForListing(this.filters, this.sort, this.order);
    this.translateRaids();
  }

  private translateRaids() {
    this.raids.forEach(raid => {
      raid.name = this.nameService.getName(raid)
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  getFilteredRaids() {
    if (this.searchText !== "") {
      let text = this.searchText.toLowerCase();
      return this.raids.filter(raid => {
        return raid.name.toLowerCase().includes(text);
      });
    } else {
      return this.raids
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      this.filters[type].push(value)
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1)
    }

    this.getRaids()
  }

  changeSort(sort) {
    this.sort = sort
    this.getRaids()
  }

  changeOrder(order) {
    this.order = order
    this.getRaids()
  }
}
