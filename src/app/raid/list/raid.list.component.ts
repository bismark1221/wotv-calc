import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { RaidService } from '../../services/raid.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';

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
    private sessionService: SessionService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateRaids();
    });
  }

  async ngOnInit() {
    this.navService.setSEO('Raids', 'Find all raids from wotv in one place. Can you beat them all ?');

    const raidsFilters = this.sessionService.get('raidsFilters');
    if (raidsFilters) {
      this.filters = JSON.parse(raidsFilters);
    }

    const raidsCollapsed = this.sessionService.get('raidsCollapsed');
    if (raidsCollapsed) {
      this.collapsed = JSON.parse(raidsCollapsed);
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

    this.sessionService.set('raidsFilters', JSON.stringify(this.filters));

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
    this.sessionService.set('raidsCollapsed', JSON.stringify(this.collapsed));
  }
}
