import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-espers',
  templateUrl: './espers.component.html',
  styleUrls: ['./espers.component.css']
})
export class EspersComponent implements OnInit {
  rawEspers = [];
  espers = [];
  searchText = '';
  sort = 'rarity';
  order = 'desc';
  filters = {
    rarity: [],
    limited: [],
    element: [],
    cost: [],
    threeStars: false
  };

  isFilterChecked = {
    rarity: [],
    element: [],
    cost: [],
    limited: []
  };
  collapsed = {
    rarity: true,
    element: true,
    limited: true,
    cost: true,
    upgrade: true
  };

  rarities = [
    'UR',
    'MR',
    'SR'
  ];

  elements = [
    'fire',
    'ice',
    'wind',
    'earth',
    'lightning',
    'water',
    'light',
    'dark',
    'neutral'
  ];

  costs = [];

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Espers');

    await this.getEspers();

    if (sessionStorage.getItem('espersFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('espersFilters'));

      if (!this.filters.cost) {
        this.filters.cost = [];
      }
    }

    if (sessionStorage.getItem('espersCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('espersCollapsed'));

      if (this.collapsed.cost === undefined) {
        this.collapsed.cost = true;
      }
    }

    this.filterChecked();
    this.filterEspers();
  }

  async getEspers() {
    const result = await this.esperService.getEspersForListingWithCosts(this.filters, this.sort, this.order);

    this.espers = result.espers;
    this.rawEspers = result.rawEspers;
    this.costs = result.costs;
  }

  filterEspers() {
    this.espers = this.esperService.filterEspers(this.rawEspers, this.filters, this.sort, this.order);
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.toolService.getName(esper);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredEspers() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.espers.filter(unit => {
        return unit.name.toLowerCase().includes(text) || unit.slug.toLowerCase().includes(text);
      });
    } else {
      return this.espers;
    }
  }

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('espersFilters', JSON.stringify(this.filters));

    this.filterEspers();
  }

  async toggleThreeStars() {
    this.filters.threeStars = !this.filters.threeStars;
    this.filterEspers();
  }

  filterChecked() {
    this.rarities.forEach(rarity => {
      if (this.filters.rarity.indexOf(rarity) === -1) {
        this.isFilterChecked.rarity[rarity] = false;
      } else {
        this.isFilterChecked.rarity[rarity] = true;
      }
    });

    ['true', 'false'].forEach(limited => {
      if (this.filters.limited.indexOf(limited === 'true' ? true : false) === -1) {
        this.isFilterChecked.limited[limited] = false;
      } else {
        this.isFilterChecked.limited[limited] = true;
      }
    });

    this.elements.forEach(element => {
      if (this.filters.element.indexOf(element) === -1) {
        this.isFilterChecked.element[element] = false;
      } else {
        this.isFilterChecked.element[element] = true;
      }
    });

    this.costs.forEach(cost => {
      if (this.filters.cost && this.filters.cost.indexOf(cost) === -1) {
        this.isFilterChecked.cost[cost] = false;
      } else {
        this.isFilterChecked.cost[cost] = true;
      }
    });
  }

  toogleCollapse(section) {
    this.collapsed[section] = !this.collapsed[section];
    sessionStorage.setItem('espersCollapsed', JSON.stringify(this.collapsed));
  }
}
