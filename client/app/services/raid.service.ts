import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Raid } from '../entities/raid';

import { NavService } from './nav.service';
import { DataService } from './data.service';
import { ToolService } from './tool.service';

@Injectable()
export class RaidService {
  private JP_raids: Raid[];
  private GL_raids: Raid[];
  private savedVersion = null;

  raid;

  constructor(
    private translateService: TranslateService,
    private dataService: DataService,
    private toolService: ToolService,
    private navService: NavService
  ) {}

  private getRaw() {
    return this.dataService.loadData('raids');
  }

  async getRaids() {
    if (this[this.navService.getVersion() + '_raids'] === null || this[this.navService.getVersion() + '_raids'] === undefined) {
      const raids: Raid[] = [];
      const rawRaids = JSON.parse(JSON.stringify(await this.getRaw()));

      Object.keys(rawRaids).forEach(raidId => {
        const raid = new Raid();
        raid.constructFromJson(rawRaids[raidId], this.translateService);
        raids.push(raid);
      });

      this[this.navService.getVersion() + '_raids'] = raids;
    }

    return this[this.navService.getVersion() + '_raids'];
  }

  async getRaid(id: string) {
    await this.getRaids();

    return this[this.navService.getVersion() + '_raids'].find(raid => raid.dataId === id);
  }

  async getRaidBySlug(slug: string) {
    await this.getRaids();

    return this[this.navService.getVersion() + '_raids'].find(raid => raid.slug === slug);
  }

  async getRaidsForListing(filters, sort, order = 'asc') {
    await this.getRaids();
    const raids = this.filterRaids(this[this.navService.getVersion() + '_raids'], filters);

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

  filterRaids(raids, filters) {
    if (filters) {
      const filteredRaids = [];

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
