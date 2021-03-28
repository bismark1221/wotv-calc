import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DataService } from './data.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { ItemService } from './item.service';

import { Quest } from '../entities/quest';

@Injectable()
export class QuestService {
  private JP_quests: Quest[];
  private GL_quests: Quest[];
  quest;

  constructor(
    private translateService: TranslateService,
    private dataService: DataService,
    private navService: NavService,
    private toolService: ToolService,
    private itemService: ItemService
  ) {}

  private getRaw() {
    return this.dataService.loadData('quests');
  }

  async getQuests() {
    if (this[this.navService.getVersion() + '_quests'] === null || this[this.navService.getVersion() + '_quests'] === undefined) {
      const quests: Quest[] = [];
      const rawQuests = JSON.parse(JSON.stringify(await this.getRaw()));

      Object.keys(rawQuests).forEach(questId => {
        const quest = new Quest();
        quest.constructFromJson(rawQuests[questId], this.translateService);
        quests.push(quest);
      });

      this[this.navService.getVersion() + '_quests'] = quests;
    }

    return this[this.navService.getVersion() + '_quests'];
  }

  async getQuest(id) {
    await this.getQuests();

    return this[this.navService.getVersion() + '_quests'].find(quest => quest.dataId === id);
  }

  async getQuestsForFarmCalc(searchedItems) {
    if (searchedItems.length === 0) {
      return [];
    }

    await this.getQuests();
    const filteredQuests = [];

    const itemIds = [];
    searchedItems.forEach(item => {
      itemIds.push(item.dataId);
    });

    for (const quest of this[this.navService.getVersion() + '_quests']) {
      if (itemIds.some(itemId => Object.keys(quest.items).includes(itemId))) {
        quest.getName(this.translateService);

        await this.formatItems(quest, itemIds);

        filteredQuests.push(quest);
      }
    }

    return filteredQuests;
  }

  private async formatItems(quest, searchedItemIds) {
    quest.formattedItems = [];
    quest.findedItems = [];

    for (const itemId of Object.keys(quest.items)) {
      if (itemId !== '') {
        const formattedItem = await this.itemService.formatItemToShow(await this.itemService.getItem(itemId));
        quest.formattedItems.push(formattedItem);

        if (searchedItemIds.indexOf(itemId) !== -1) {
          quest.findedItems.push(formattedItem);
        }
      }
    }
  }
}
