import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units = [];
  searchText = '';
  sort = 'rarity';
  order = 'desc';
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
    exJob: false
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


  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private jobService: JobService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateUnits();
      this.translateJobs();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Units');
    await this.getJobs();
    this.costs = await this.unitService.getCosts();

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

    await this.getUnits();
  }

  async getUnits() {
    this.units = await this.unitService.getUnitsForListing(this.filters, this.sort, this.order);
    this.translateUnits();
  }

  async getJobs() {
    const jobs = await this.jobService.getUniqJobs();
    jobs.forEach(job => {
      if (job.statsModifiers && job.statsModifiers.length > 10) {
        this.jobs.push(job);
      }
    });

    this.translateJobs();
  }

  private translateUnits() {
    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit);
    });
  }

  private translateJobs() {
    this.jobs.forEach(job => {
      job.name = this.nameService.getName(job);
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

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    await this.getUnits();
  }

  async filterEquipment(type, value) {
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

    await this.getUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  async toggleMainJob() {
    this.filters.mainJob = !this.filters.mainJob;
    this.filters.subJob = false;

    await this.getUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  async toggleSubJob() {
    this.filters.mainJob = false;
    this.filters.subJob = !this.filters.subJob;

    await this.getUnits();
    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
  }

  async toggleExJob() {
    this.filters.exJob = !this.filters.exJob;

    await this.getUnits();
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

  async unselectAllJobs() {
    this.filters.job = [];

    sessionStorage.setItem('unitsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    await this.getUnits();
  }
}
