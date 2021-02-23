import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NavService } from './nav.service';
import { ToolService } from './tool.service';

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
    private toolService: ToolService
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

  getQuestsForListing(filters = null, sort = 'rarity', order = 'asc') {
    this.getQuests();
    this.quests = this.filterQuests(this.quests, filters);

    switch (sort) {
      case 'rarity' :
        this.toolService.sortByRarity(this.quests, order);
      break;
      case 'name' :
        this.toolService.sortByName(this.quests, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return this.quests;
  }

  filterQuests(quests, filters) {
    if (filters) {
      const filteredQuests = [];

      quests.forEach(quest => {
        /*if (filters.rarity.length === 0 || filters.rarity.indexOf(quest.rarity) !== -1) {
          let needToAddQuest = false;
          if (!filters.element || filters.element.length === 0) {
            needToAddQuest = true;
          } else {
            quest.partyBuffs.forEach(buff => {
              if (buff.cond && buff.cond.length > 0 && buff.cond[0].type === 'elem') {
                filters.element.forEach(elem => {
                  if (buff.cond[0].items.indexOf(elem) !== -1) {
                    needToAddQuest = true;
                  }
                });
              }
            });
          }

          if (needToAddQuest) {*/
            filteredQuests.push(quest);
          /*}
        }*/
      });

      return filteredQuests;
    } else {
      return quests;
    }
  }

  getQuest(id) {
    this.getQuests();

    return this.quests.find(quest => quest.dataId === id);
  }
}
