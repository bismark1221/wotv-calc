import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-espers',
  templateUrl: './espers.component.html',
  styleUrls: ['./espers.component.css']
})
export class EspersComponent implements OnInit {
  espers;
  searchText = "";
  sort = "rarity"
  order = "asc"
  filters = {
    rarity: [],
    element: []
  }
  isCollapsedRarity = false;
  isCollapsedElement = false;

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  ngOnInit() {
    this.getEspers();
  }

  getEspers() {
    this.espers = this.esperService.getEspersForListing(this.filters, this.sort, this.order);
    this.translateEspers();
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.nameService.getName(esper)
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  getFilteredEspers() {
    if (this.searchText !== "") {
      let text = this.searchText.toLowerCase();
      return this.espers.filter(unit => {
        return unit.name.toLowerCase().includes(text);
      });
    } else {
      return this.espers
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      this.filters[type].push(value)
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1)
    }

    this.getEspers()
  }

  changeSort(sort) {
    this.sort = sort
    this.getEspers()
  }

  changeOrder(order) {
    this.order = order
    this.getEspers()
  }
}
