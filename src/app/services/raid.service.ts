import { Injectable } from '@angular/core';

import { Raid } from '../entities/raid';

import { TranslateService } from './translate.service';
import { NavService } from './nav.service';
import { ApiService } from './api.service';
import { ToolService } from './tool.service';

@Injectable()
export class RaidService {
  private JP_raids: Raid[];
  private GL_raids: Raid[];
  private savedVersion = null;

  raid;

  constructor(
    private translateService: TranslateService,
    private apiService: ApiService,
    private toolService: ToolService,
    private navService: NavService
  ) {}

  private async getRaw(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('raids', param, extraQuery)));
  }

  async getRaids() {
    if (this[this.navService.getVersion() + '_raids'] === null || this[this.navService.getVersion() + '_raids'] === undefined) {
      const raids: Raid[] = [];
      const rawRaids = await this.getRaw();

      Object.keys(rawRaids).forEach(raidId => {
        const raid = new Raid();
        raid.constructFromJson(rawRaids[raidId], this.translateService);
        raids.push(raid);
      });

      this[this.navService.getVersion() + '_raids'] = raids;
    }

    return this[this.navService.getVersion() + '_raids'];
  }

  async getRaidBySlug(slug: string) {
    let raid = null;
    const rawRaid = await this.getRaw(slug, [{name: 'withSkills', value: 1}]);

    if (rawRaid) {
      raid = new Raid();
      raid.constructFromJson(rawRaid, this.translateService);
    }

    return raid;
  }

  async getRaidsForListing(filters, sort, order = 'asc') {
    await this.getRaids();
    const raids = this.filterRaids(this[this.navService.getVersion() + '_raids'], filters);

    for (const raid of raids) {
      raid.element = raid.bosses[0].element;
      raid.image = raid.bosses[0].image;
      raid.name = this.toolService.getName(raid);
    }

    switch (sort) {
      case 'name' :
        this.toolService.sortByName(raids, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return raids;
  }

  filterRaids(raids, rawFilters) {
    if (rawFilters) {
      const filteredRaids = [];
      const filters: any = {};

      Object.keys(rawFilters).forEach(filterSection => {
        rawFilters[filterSection].filters.forEach(filter => {
          if (filter.type === 'list') {
            filters[filter.id] = filter.values;
          } else if (filter.type === 'switch') {
            filters[filter.id] = filter.value;
          }
        });
      });

      raids.forEach(raid => {
        if (filters.element.length === 0 || filters.element.indexOf(raid.bosses[0].element) !== -1) {
          filteredRaids.push(raid);
        }
      });

      return filteredRaids;
    } else {
      return raids;
    }
  }
}
