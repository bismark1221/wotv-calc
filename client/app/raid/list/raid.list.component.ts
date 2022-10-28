import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { RaidService } from '../../services/raid.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-raid-list',
  templateUrl: './raid.list.component.html',
  styleUrls: ['./raid.list.component.css']
})
export class RaidListComponent implements OnInit {
  raids = [];
  searchText = '';
  sort = 'name';
  order = 'asc';
  filters = {
    element: []
  };

  isFilterChecked = {
    element: []
  };
  collapsed = {
    element: false
  };

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
    private raidService: RaidService,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateRaids();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Raids');

    if (sessionStorage.getItem('raidsFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('raidsFilters'));
    }
    if (sessionStorage.getItem('raidsCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('raidsCollapsed'));
    }
    this.filterChecked();

    await this.getRaids();
  }

  async getRaids() {
    this.raids = await this.raidService.getRaidsForListing(this.filters, this.sort, this.order);
    this.translateRaids();
  }

  private translateRaids() {
    this.raids.forEach(raid => {
      raid.name = this.toolService.getName(raid);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredRaids() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.raids.filter(raid => {
        return raid.name.toLowerCase().includes(text) || raid.slug.toLowerCase().includes(text);
      });
    } else {
      return this.raids;
    }
  }

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('raidsFilters', JSON.stringify(this.filters));

    await this.getRaids();
  }

  filterChecked() {
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
    sessionStorage.setItem('raidsCollapsed', JSON.stringify(this.collapsed));
  }
}
