import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { NavService } from './nav.service';
import { DataService } from './data.service';
import { JobService } from './job.service';
import { EquipmentService } from './equipment.service';
import { ApiService } from './api.service';

import { Item } from '../entities/item';

@Injectable()
export class ItemService {
  private JP_items: Item[];
  private GL_items: Item[];

  savedVersion;
  item;

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
    private dataService: DataService,
    private jobService: JobService,
    private equipmentService: EquipmentService,
    private apiService: ApiService
  ) {}

  private getRaw() {
    return this.dataService.loadData('items');
  }

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('items', param, extraQuery)));
  }

  async getItems() {
    if (this[this.navService.getVersion() + '_items'] === null || this[this.navService.getVersion() + '_items'] === undefined) {
      const items: Item[] = [];
      const rawItems = JSON.parse(JSON.stringify(await this.getRaw()));

      Object.keys(rawItems).forEach(itemId => {
        const item = new Item();
        item.constructFromJson(rawItems[itemId]);
        items.push(item);
      });

      this[this.navService.getVersion() + '_items'] = items;
    }

    return this[this.navService.getVersion() + '_items'];
  }

  async getItem(id: string, formatToShow = false) {
    await this.getItems();

    const item = this[this.navService.getVersion() + '_items'].find(itemData => itemData.dataId === id);

    if (item) {
      item.getName(this.translateService);

      if (formatToShow) {
        await this.formatItemToShow(item);
      }
    }

    return item;
  }

  async getItemsByIds(itemIds) {
    const rawItems = await this.getApi(null, [{name: 'itemIds', value: itemIds.join(',')}]);

    const items = [];
    for (const rawItem of rawItems) {
      const item = new Item();
      item.constructFromJson(rawItem);
      item.getName(this.translateService);

      items.push(item);
    }

    return items;
  }

  async getItemForFarm(searchTerm) {
    const rawItems = await this.getApi(null, [{name: 'search', value: searchTerm}, {name: 'lang', value: this.translateService.currentLang}]);

    const items = [];
    for (const rawItem of rawItems) {
      const item = new Item();
      item.constructFromJson(rawItem);
      item.getName(this.translateService);

      items.push(item);
    }

    return items;
  }

  async formatItemToShow(item) {
    if (item) {
      item.image = item.dataId.toLowerCase();

      if (item.type === 'job_awake_orb'
        && item.icon !== 'IT_JB_MM_COMMON'
        && item.icon.substring(0, item.icon.length - 2) !== 'IT_JB_MM_COMMON'
      ) {
        switch (item.image.substring(item.image.length - 2, item.image.length)) {
          case '_2':
            item.class = 'imgOrbBlue';
            break;
          case '_3':
            item.class = 'imgOrbViolet';
            break;
          case '_4':
            item.class = 'imgOrbYellow';
            break;
          case '_5':
            item.class = 'imgOrbPink';
            break;
          default:
            item.class = 'imgOrbGreen';
            break;
        }

        const job = await this.jobService.getJob(item.icon);
        item.image = job.image;
      } else if (item.type === 'recipe') {
        const equipment = await this.equipmentService.getEquipment(item.icon);
        item.image = equipment.image;
      } else if (item.type === 'medal' && item.icon) {
        const oldItem = await this.getItem(item.icon);
        if (oldItem) {
          item.image = oldItem.dataId.toLowerCase();
        } else {
          item.image = item.icon.toLowerCase();
        }
      } else if ((item.type === 'tickets' || item.type === 'usable_item' || item.type === 'vc_shard' || item.type === 'stamp') && item.icon) {
        item.image = item.icon.toLowerCase();
      }
    }

    return item;
  }
}
