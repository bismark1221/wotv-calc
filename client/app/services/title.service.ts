import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class TitleService {
  savedVersion;

  constructor(
    private apiService: ApiService
  ) {}

  private async getApi() {
    return {
      player: JSON.parse(JSON.stringify(await this.apiService.get('playerTitles'))),
      guild: JSON.parse(JSON.stringify(await this.apiService.get('guildTitles')))
    };
  }

  async getTitles() {
    const titles = {
      player: [],
      guild: []
    };
    const rawTitles = await this.getApi();

    const types = ['player', 'guild'];
    types.forEach(type => {
      Object.keys(rawTitles[type]).forEach(titleId => {
        titles[type].push(rawTitles[type][titleId]);
      });
    });

    return titles;
  }
}
