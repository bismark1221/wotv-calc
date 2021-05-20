import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { OtherUnitService } from '../services/otherunit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-other-bestiary',
  templateUrl: './other.bestiary.component.html',
  styleUrls: ['./other.bestiary.component.css']
})
export class OtherBestiaryComponent implements OnInit {
  units = [];
  searchText = '';
  sort = 'name';
  order = 'asc';
  jobs = [];
  filters = {
    species: []
  };
  isFilterChecked = {
    species: []
  };
  collapsed = {
    species: false
  };

  species = [
    'human',
    'netherBeast',
    'beast',
    'demon',
    'dragon',
    'plant',
    'bird',
    'insect',
    'aquatic',
    'machine',
    'fairy',
    'undead',
    'stone',
    'metal',
    'arcana'
  ];

  constructor(
    private otherUnitService: OtherUnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private jobService: JobService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateUnits();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Units');

    if (sessionStorage.getItem('otherUnitsFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('otherUnitsFilters'));
    }
    if (sessionStorage.getItem('otherUnitsCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('otherUnitsCollapsed'));
    }
    this.filterChecked();

    await this.getUnits();
  }

  async getUnits() {
    this.units = await this.otherUnitService.getUnitsForListing(this.filters, this.sort, this.order);

    for (const unit of this.units) {
      unit.formattedJobs = [];
      if (unit.jobs) {
        for (const jobId of unit.jobs) {
          const job = await this.jobService.getJob(jobId);
          unit.formattedJobs.push(job);
        }
      }
    }

    this.translateUnits();
  }

  private translateUnits() {
    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit);
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

    sessionStorage.setItem('otherUnitsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    await this.getUnits();
  }

  filterChecked() {
    this.species.forEach(specie => {
      if (this.filters.species.indexOf(specie) === -1) {
        this.isFilterChecked.species[specie] = false;
      } else {
        this.isFilterChecked.species[specie] = true;
      }
    });
  }

  toogleCollapse(section) {
    this.collapsed[section] = !this.collapsed[section];
    sessionStorage.setItem('otherUnitsCollapsed', JSON.stringify(this.collapsed));
  }
}
