import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { NavService } from './nav.service';
import { JobService } from './job.service';
import { EquipmentService } from './equipment.service';

import { Item } from '../entities/item';
import GL_ITEMS from '../data/gl/items.json';
import JP_ITEMS from '../data/jp/items.json';

@Injectable()
export class ItemService {
  private items: Item[];

  savedVersion;
  item;

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
    private jobService: JobService,
    private equipmentService: EquipmentService
  ) {}

  private getRaw() {
    this.savedVersion = JSON.parse(JSON.stringify(this.navService.getVersion()));
    if (this.savedVersion === 'GL') {
      return GL_ITEMS;
    } else {
      return JP_ITEMS;
    }
  }

  getItems() {
    if (!this.items || this.items.length === 0 || this.savedVersion !== this.navService.getVersion()) {
      const items: Item[] = [];
      const rawItems = JSON.parse(JSON.stringify(this.getRaw()));

      Object.keys(rawItems).forEach(itemId => {
        const item = new Item();
        item.constructFromJson(rawItems[itemId]);
        items.push(item);
      });

      this.items = items;
    }

    return this.items;
  }

  getItem(id: string): Item {
    this.getItems();

    const item = this.items.find(itemData => itemData.dataId === id);

    if (item) {
      item.getName(this.translateService);
    }

    return item;
  }

  getItemForFarm(searchTerm) {
    this.getItems();

    let items = [];

    this.items.forEach(item => {
      item.getName(this.translateService);
    });

    if (searchTerm) {
      items = this.items.filter(x => x.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1);
    }

    items.forEach(item => {
      this.formatItemToShow(item);
    });

    return of(items);
  }

  formatItemToShow(item) {
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

      const job = this.jobService.getJob(item.icon);
      item.image = job.image;
    } else if (item.type === 'recipe') {
      const equipment = this.equipmentService.getEquipment(item.icon);
      item.image = equipment.image;
    } else if (item.type === 'medal' && item.icon) {
      const oldItem = this.getItem(item.icon);
      if (oldItem) {
        item.image = oldItem.dataId.toLowerCase();
      } else {
        item.image = item.icon.toLowerCase();
      }
    } else if ((item.type === 'tickets' || item.type === 'usable_item' || item.type === 'vc_shard' || item.type === 'stamp') && item.icon) {
      item.image = item.icon.toLowerCase();
    }

    return item;
  }
}
