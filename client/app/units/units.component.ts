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
  units;
  searchText = '';
  sort = 'rarity';
  order = 'asc';
  jobs = [];
  filters = {
    rarity: [],
    element: [],
    job: [],
    limited: [],
    mainJob: true,
    exJob: false
  };
  isCollapsedRarity = false;
  isCollapsedElement = false;
  isCollapsedLimited = false;
  isCollapsedJob = false;

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

  ngOnInit() {
    this.navService.setTitle('Units');

    this.getUnits();
    this.getJobs();
  }

  getUnits() {
    this.units = this.unitService.getUnitsForListing(this.filters, this.sort, this.order);
    this.translateUnits();
  }

  getJobs() {
    this.jobs = this.jobService.getUniqJobs();
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

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    this.getUnits();
  }

  toggleMainJob() {
    this.filters.mainJob = !this.filters.mainJob;
    this.getUnits();
  }

  toggleExJob() {
    this.filters.exJob = !this.filters.exJob;
    this.getUnits();
  }
}
