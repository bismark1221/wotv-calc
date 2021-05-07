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
  espers = [];
  searchText = '';
  sort = 'rarity';
  order = 'asc';
  filters = {
    rarity: [],
    limited: [],
    element: [],
    threeStars: false
  };

  isFilterChecked = {
    rarity: [],
    element: [],
    limited: []
  };
  collapsed = {
    rarity: false,
    element: false,
    limited: false,
    upgrade: false
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
    'dark'
  ];

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

  async ngOnInit() {
    this.navService.setTitle('Espers');

    if (sessionStorage.getItem('espersFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('espersFilters'));
    }
    if (sessionStorage.getItem('espersCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('espersCollapsed'));
    }
    this.filterChecked();

    await this.getEspers();
  }

  async getEspers() {
    this.espers = await this.esperService.getEspersForListing(this.filters, this.sort, this.order);
    this.translateEspers();
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.nameService.getName(esper);
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

    await this.getEspers();
  }

  async toggleThreeStars() {
    this.filters.threeStars = !this.filters.threeStars;
    await this.getEspers();
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
  }

  toogleCollapse(section) {
    this.collapsed[section] = !this.collapsed[section];
    sessionStorage.setItem('espersCollapsed', JSON.stringify(this.collapsed));
  }
}
