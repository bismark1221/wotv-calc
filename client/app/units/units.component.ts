import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-units',
  templateUrl: './units.component.html',
  styleUrls: ['./units.component.css']
})
export class UnitsComponent implements OnInit {
  units = [];
  searchText = '';
  sort = 'rarity';
  order = 'asc';
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
    mainJob: true,
    subJob: false,
    exJob: false
  };
  isCollapsedRarity = true;
  isCollapsedElement = true;
  isCollapsedLimited = true;
  isCollapsedJob = true;
  isCollapsedEquipment = true;

  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
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
    await this.getJobs();
  }

  async getUnits() {
    this.units = await this.unitService.getUnitsForListing(this.filters, this.sort, this.order);
    this.translateUnits();
  }

  async getJobs() {
    this.jobs = await this.jobService.getUniqJobs();
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

    await this.getUnits();
  }

  async toggleMainJob() {
    this.filters.mainJob = !this.filters.mainJob;
    this.filters.subJob = false;
    await this.getUnits();
  }

  async toggleSubJob() {
    this.filters.mainJob = false;
    this.filters.subJob = !this.filters.subJob;
    await this.getUnits();
  }

  async toggleExJob() {
    this.filters.exJob = !this.filters.exJob;
    await this.getUnits();
  }
}
