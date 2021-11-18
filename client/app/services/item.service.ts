import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { NavService } from './nav.service';
import { JobService } from './job.service';
import { EquipmentService } from './equipment.service';
import { ApiService } from './api.service';

import { Item } from '../entities/item';

@Injectable()
export class ItemService {
  savedVersion;
  item;

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
    private jobService: JobService,
    private equipmentService: EquipmentService,
    private apiService: ApiService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('items', param, extraQuery)));
  }

  async getItemsByIds(itemIds) {
    const rawItems = await this.getApi(null, [{name: 'itemIds', value: itemIds.join(',')}]);

    const items = [];
    for (const rawItem of rawItems) {
      const item = new Item();
      item.constructFromJson(rawItem, this.translateService);

      items.push(item);
    }

    return items;
  }

  async getItemForFarm(searchTerm) {
    const rawItems = await this.getApi(null, [{name: 'search', value: searchTerm}, {name: 'lang', value: this.translateService.currentLang}]);

    const items = [];
    for (const rawItem of rawItems) {
      const item = new Item();
      item.constructFromJson(rawItem, this.translateService);

      items.push(item);
    }

    return items;
  }
}
