import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { ItemService } from './item.service';

import { Quest } from '../entities/quest';

import { default as GL_QUESTS } from '../data/gl/quests.json';
import { default as JP_QUESTS } from '../data/jp/quests.json';

@Injectable()
export class QuestService {
  private quests: Quest[];
  quest;

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private itemService: ItemService
  ) {}

  private getRaw() {
    if (this.navService.getVersion() === 'GL') {
      return GL_QUESTS;
    } else {
      return JP_QUESTS;
    }
  }

  getQuests() {
    const quests: Quest[] = [];
    const rawQuests = JSON.parse(JSON.stringify(this.getRaw()));

    Object.keys(rawQuests).forEach(questId => {
      const quest = new Quest();
      quest.constructFromJson(rawQuests[questId], this.translateService);
      quests.push(quest);
    });

    this.quests = quests;
    return quests;
  }

  getQuestsForFarmCalc(searchedItems) {
    if (searchedItems.length === 0) {
      return [];
    }

    this.getQuests();
    const filteredQuests = [];

    const itemIds = [];
    searchedItems.forEach(item => {
      itemIds.push(item.dataId);
    });

    this.quests.forEach(quest => {
      if (itemIds.some(itemId => Object.keys(quest.items).includes(itemId))) {
        quest.getName(this.translateService);

        this.formatItems(quest, itemIds);

        filteredQuests.push(quest);
      }
    });

    return filteredQuests;
  }

  formatItems(quest, searchedItemIds) {
    quest.formattedItems = [];
    quest.findedItems = [];

    Object.keys(quest.items).forEach(itemId => {

      if (itemId !== '') {
        const formattedItem = this.itemService.formatItemToShow(this.itemService.getItem(itemId));
        quest.formattedItems.push(formattedItem);

        if (searchedItemIds.indexOf(itemId) !== -1) {
          quest.findedItems.push(formattedItem);
        }
      }
    });
  }

  getQuest(id) {
    this.getQuests();

    return this.quests.find(quest => quest.dataId === id);
  }
}
