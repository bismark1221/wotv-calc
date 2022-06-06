import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { JobService } from '../services/job.service';

import { SearchOptionsModalComponent } from '../searchOptionsModal/searchOptionsModal.component';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  rawUnits = [];
  units: any = [];
  searchText = '';
  sort = 'rarity';
  order = 'desc';
  rawJobs = [];
  jobs = [];

  filters = {
    rarity: [],
    element: [],
    job: [],
    limited: [],
    equipment: {
      weapon: 'ALL',
      armor: []
    },
    cost: [],
    mainJob: false,
    subJob: false,
    exJob: false,
    secondMasterAbility: false
  };

  isFilterChecked = {
    rarity: [],
    element: [],
    job: [],
    limited: [],
    cost: [],
    armor: []
  };

  collapsed = {
    rarity: true,
    element: true,
    limited: true,
    job: true,
    cost: true,
    equipment: true
  };

  rarities = [
    'UR',
    'MR',
    'SR',
    'R',
    'N'
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

  armors = [
    'ARMOR',
    'CLOTH',
    'HAT',
    'HELM',
    'SHIELD'
  ];

  costs = [];

  filtersCount = 0;

  @ViewChild('SearchBar') ngselect;
  searchForm: FormGroup;

  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private modalService: NgbModal,
    private toolService: ToolService,
    private jobService: JobService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateUnits();
      this.translateJobs();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Units');

    await this.getUnits();

    this.searchForm = new FormGroup({
      searchOptions: new FormControl()
    });
  }

  async getUnits() {
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
      result = await this.unitService.getUnitsForListingWithCost(this.filters, this.sort, this.order);
    } else {
      result = await this.unitService.getUnitsForListingWithCost(this.filters, this.sort, this.order, options);
    }

    this.units = result.units;
    this.rawUnits = result.rawUnits;

    if (Object.keys(options).length === 0) {
      this.rawJobs = result.rawJobs;
      this.jobs = result.jobs;
      this.costs = result.costs;

      if (sessionStorage.getItem('unitsFilters')) {
        this.filters = JSON.parse(sessionStorage.getItem('unitsFilters'));

        if (!this.filters.cost) {
          this.filters.cost = [];
        }
      }

      if (sessionStorage.getItem('unitsCollapsed')) {
        this.collapsed = JSON.parse(sessionStorage.getItem('unitsCollapsed'));

        if (this.collapsed.cost === undefined) {
          this.collapsed.cost = true;
        }
      }

      this.filterChecked();
    }

    this.filterUnits();
  }

  filterUnits() {
    this.units = this.unitService.filterUnitsWithApi(this.rawUnits, this.filters, this.sort, this.order, this.rawJobs);
    this.countFilters();
  }

  countFilters() {
    this.filtersCount = this.filters.rarity.length
      + this.filters.element.length
      + this.filters.job.length
      + this.filters.limited.length
      + (this.filters.equipment.weapon !== 'ALL' ? 1 : 0)
      + this.filters.equipment.armor.length
      + this.filters.cost.length
      + (this.filters.mainJob ? 1 : 0)
      + (this.filters.subJob ? 1 : 0)
      + (this.filters.exJob ? 1 : 0)
      + (this.filters.secondMasterAbility ? 1 : 0);
  }

  private translateUnits() {
    this.units.forEach(unit => {
      unit.name = this.toolService.getName(unit);
    });
  }

  private translateJobs() {
    this.jobs.forEach(job => {
      job.name = this.toolService.getName(job);
    });

    this.toolService.sortByName(this.jobs);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredUnits() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.units.filter(unit => {
        return unit.name.toLowerCase().includes(text) || unit.slug.toLowerCase().includes(text);
      });
    } else {
      return this.units;
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    this.filterUnits();
  }

  filterEquipment(type, value) {
    if (type === 'armor') {
      if (this.filters.equipment.armor.indexOf(value) === -1) {
        this.filters.equipment.armor.push(value);
      } else {
        this.filters.equipment.armor.splice(this.filters.equipment.armor.indexOf(value), 1);
      }
    } else {
      this.filters.equipment.weapon = value;
    }
    this.filterChecked();

    this.filterUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  toggleMainJob() {
    this.filters.mainJob = !this.filters.mainJob;
    this.filters.subJob = false;

    this.filterUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  toggleSubJob() {
    this.filters.mainJob = false;
    this.filters.subJob = !this.filters.subJob;

    this.filterUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  toggleExJob() {
    this.filters.exJob = !this.filters.exJob;

    this.filterUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  toggleSecondMasterAbility() {
    this.filters.secondMasterAbility = !this.filters.secondMasterAbility;

    this.filterUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
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

    this.armors.forEach(armor => {
      if (this.filters.equipment.armor.indexOf(armor) === -1) {
        this.isFilterChecked.armor[armor] = false;
      } else {
        this.isFilterChecked.armor[armor] = true;
      }
    });

    this.jobs.forEach(job => {
      if (this.filters.job.indexOf(job.dataId) === -1) {
        this.isFilterChecked.job[job.dataId] = false;
      } else {
        this.isFilterChecked.job[job.dataId] = true;
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
    sessionStorage.setItem('unitsCollapsed', JSON.stringify(this.collapsed));
  }

  unselectAllJobs() {
    this.filters.job = [];

    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    this.filterUnits();
  }

  onSearchBarClose() {
    this.ngselect.searchTerm = this.searchText;
    this.ngselect.searchInput.nativeElement.value = this.searchText;
    this.getFilteredUnits();
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
      this.getUnits();
    }
  }

  onSearchBarUpdateTerm($event) {
    if ($event.term[0] !== '!') {
      this.searchText = $event.term;
      this.getFilteredUnits();
    }
  }

  openSearchOptionsModal() {
    this.modalService.open(SearchOptionsModalComponent, { windowClass: 'options-modal' });
  }
}
