import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Item } from '../entities/item';
import GL_ITEMS from '../data/gl/items.json';
import JP_ITEMS from '../data/jp/items.json';
import { NavService } from './nav.service';

@Injectable()
export class ItemService {
  private items: Item[];

  savedVersion;
  item;

  constructor(
    private translateService: TranslateService,
    private navService: NavService
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
    if (!this.items || this.items.length === 0) {
      const items: Item[] = [];
      const rawItems = JSON.parse(JSON.stringify(this.getRaw()));

      Object.keys(rawItems).forEach(itemId => {
        const item = new Item();
        item.constructFromJson(rawItems[itemId]);
        items.push(item);
      });

      this.items = items;
    }
  }

  getItem(id: string): Item {
    this.getItems();

    const item = this.items.find(itemData => itemData.dataId === id);

    if (item) {
      item.getName(this.translateService);
    }

    return item;
  }
}
