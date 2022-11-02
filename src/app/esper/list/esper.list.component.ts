import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../../services/esper.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';

import { SharedSearchOptionsModalComponent } from '../../shared/searchOptionsModal/shared.searchOptionsModal.component';

@Component({
  selector: 'app-esper-list',
  templateUrl: './esper.list.component.html',
  styleUrls: ['./esper.list.component.css']
})
export class EsperListComponent implements OnInit {
  rawEspers = [];
  espers = [];
  searchText = '';
  sort = 'releaseDate';
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

  filtersCount = 0;

  @ViewChild('SearchBar') ngselect;
  searchForm: UntypedFormGroup;

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private navService: NavService,
    private simpleModalService: SimpleModalService,
    private sessionService: SessionService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Espers');

    await this.getEspers();

    this.searchForm = new UntypedFormGroup({
      searchOptions: new UntypedFormControl()
    });
  }

  async getEspers() {
    const options = {};

    if (this.searchForm) {
      for (const option of this.searchForm.get('searchOptions').value) {
        const optionTable = option.label.substring(1).split('=');
        if (!options[optionTable[0]]) {
          options[optionTable[0]] = [];
        }
        options[optionTable[0]].push(optionTable[1]);
      }
    }

    let result = null;

    if (Object.keys(options).length === 0) {
      result = await this.esperService.getEspersForListingWithCosts(this.filters, this.sort, this.order);
    } else {
      result = await this.esperService.getEspersForListingWithCosts(this.filters, this.sort, this.order, options);
    }

    this.espers = result.espers;
    this.rawEspers = result.rawEspers;

    if (Object.keys(options).length === 0) {
      this.costs = result.costs;

      const espersFilters = this.sessionService.get('espersFilters');
      if (espersFilters) {
        this.filters = JSON.parse(espersFilters);

        if (!this.filters.cost) {
          this.filters.cost = [];
        }
      }

      const espersCollapsed = this.sessionService.get('espersCollapsed');
      if (espersCollapsed) {
        this.collapsed = JSON.parse(espersCollapsed);

        if (this.collapsed.cost === undefined) {
          this.collapsed.cost = true;
        }
      }

      this.filterChecked();
    }

    this.filterEspers();
  }

  filterEspers() {
    this.espers = this.esperService.filterEspers(this.rawEspers, this.filters, this.sort, this.order);
    this.countFilters();
  }

  countFilters() {
    this.filtersCount = this.filters.cost.length
      + this.filters.element.length
      + this.filters.limited.length
      + this.filters.rarity.length
      + (this.filters.threeStars ? 1 : 0);
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

    this.sessionService.set('espersFilters', JSON.stringify(this.filters));

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
    this.sessionService.set('espersCollapsed', JSON.stringify(this.collapsed));
  }

  onSearchBarClose() {
    this.ngselect.searchTerm = this.searchText;
    this.ngselect.searchInput.nativeElement.value = this.searchText;
    this.getFilteredEspers();
  }

  onSearchBarAdd($event) {
    const labelTable = $event.label.split('=');

    if ($event.label[0] !== '!' || labelTable.length !== 2 || labelTable[1] === '') {
      this.searchForm.get('searchOptions').value.pop();
      this.searchForm.get('searchOptions').patchValue(this.searchForm.get('searchOptions').value);

      if ($event.label[0] !== '!') {
        this.searchText = $event.label;
      }
    } else {
      this.getEspers();
    }
  }

  onSearchBarUpdateTerm($event) {
    if ($event.term[0] !== '!') {
      this.searchText = $event.term;
      this.getFilteredEspers();
    }
  }

  openSearchOptionsModal() {
    this.simpleModalService.addModal(SharedSearchOptionsModalComponent);
  }
}
