import { Injectable } from '@angular/core';

import { Item } from '../entities/item';

import { NavService } from './nav.service';
import { DataService } from './data.service';

@Injectable()
export class TitleService {
  savedVersion;

  constructor(
    private dataService: DataService,
    private navService: NavService
  ) {}

  private async getRaw() {
    return {
      player: await this.dataService.loadData('playerTitles'),
      guild: await this.dataService.loadData('guildTitles')
    };
  }

  async getTitles() {
    const titles = {
      player: [],
      guild: []
    };
    const rawTitles = JSON.parse(JSON.stringify(await this.getRaw()));

    const types = ['player', 'guild'];
    types.forEach(type => {
      Object.keys(rawTitles[type]).forEach(titleId => {
        titles[type].push(rawTitles[type][titleId]);
      });
    });

    return titles;
  }
}
