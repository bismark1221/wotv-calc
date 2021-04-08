import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DataService } from './data.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { ItemService } from './item.service';
import { UnitService } from './unit.service';

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
    private itemService: ItemService,
    private unitService: UnitService
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

  async getQuestBySlug(slug) {
    await this.getQuests();
    this.quest = this[this.navService.getVersion() + '_quests'].find(quest => quest.slug === slug);

    return this.quest;
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

  async getQuestsForListing(filters = null, sort = 'name', order = 'asc') {
    await this.getQuests();
    const quests = this.filterQuests(this[this.navService.getVersion() + '_quests'], filters);

    switch (sort) {
      case 'name' :
        this.toolService.sortByName(quests, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return quests;
  }

  filterQuests(quests, filters) {
    if (filters) {
      const filteredQuests = [];

      quests.forEach(quest => {
        if (filters.type.length === 0 || filters.type.indexOf(quest.type) !== -1) {
          filteredQuests.push(quest);
        }
      });

      return filteredQuests;
    } else {
      return quests;
    }
  }

  async formatMission(mission) {
    let html = '';
    let unit = null;

    switch (mission.type) {
      case 'COMPLETE_QUEST' :
        html = 'Complete the quest';
      break;
      case 'ANNIHILATE' :
        html = 'Annihilate the enemies';
      break;
      case 'KO_UNITS_BUT_CONTINUE' :
        html = 'No KO\'d units (Continues allowed)';
      break;
      case 'KO_UNITS' :
        html = 'No KO\'d units';
      break;
      case 'MAX_DEAD_UNIT' :
        html = 'No more than ' + mission.value + ' KO\'d unit' + (mission.value > 1 ? 's' : '');
      break;
      case 'SPECIFIC_UNIT_NOT_DEAD' :
        unit = await this.unitService.getUnit(mission.value);
        html = (unit ? unit.getName() : '???') + ' must survive the mission';  // @TODO
      break;
      case 'ELEMENT' :
        html = 'Party includes only ';
        mission.value.forEach((element, elementIndex) => {
          html += (elementIndex > 0 ? ' or ' : '') + element;
        });
        html += 'unit(s)';
      break;
      case 'SPECIFIC_UNIT_IN_PARTY' :
        unit = await this.unitService.getUnit(mission.value);
        html = 'Party includes ' + (unit ? unit.getName() : '???');
      break;
      case 'MAX_PARTY_UNIT' :
        html = 'Formation comprise of no more than ' + mission.value + ' unit' + (mission.value > 1 ? 's' : '');
      break;
      case 'MIN_SIM_DEAD_SPECIFIC_ENEMIES' :
        const valueSplit = mission.value.split(',');
        unit = await this.unitService.getUnit(valueSplit[0]);
        html = 'Defeat ' + valueSplit[1] + ' ' + (unit ? unit.getName() : '???') + ' or more simultaneously';  // @TODO
      break;
      case 'MIN_BREAK_OBJECT' :
        html = 'Break ' + mission.value + ' or more objets';
      break;
      case 'SPECIFIC_SKILL' :
        html = 'Use ' + mission.value;
      break;
      case 'MAX_SKILL' :
        html = 'Use no more than ' + mission.value + ' skills';
      break;
      case 'ACTIVATE' :
        unit = await this.unitService.getUnit(mission.value);
        html = 'Activate ' + (unit ? unit.getName() : '???'); // @TODO
      break;
      case 'ITEMS' :
        if (mission.value === 0) {
          html = 'Do not use item';
        } else {
          html = 'Use no more than ' + mission.value + ' items';
        }
      break;
      case 'NO_COMPANION' :
        html = 'Don\'t hire a companion';
      break;
      case 'GET_COMPANION' :
        html = 'Hire a companion';
      break;
      case 'MIN_SIM_DEAD_SPECIFIC_ENEMIES' :
        html = 'Defeat ' + mission.value + ' or more enemies simultaneously';
      break;
      case 'MAX_HEAL' :
        html = 'Recover no more than ' + mission.value + ' HP';
      break;
      case 'MAX_ATTACK' :
        html = 'Be attacked no more than ' + mission.value + ' time' + (mission.value > 1 ? 's' : '');
      break;
      case 'MAX_DAMAGE' :
        if (mission.value === 0) {
          html = 'Do not take damage';
        } else {
          html = 'Take no more than ' + mission.value + ' damage';
        }
      break;
      case 'MIN_DAMAGE_ONE_ATTACK' :
        html = 'Do ' + mission.value + ' or more damage in one attack';
      break;
      case 'MAX_CONTINUE' :
        if (mission.value === 0) {
          html = 'Do not continue';
        } else {
          html = 'Use no more than' + mission.value + 'continue';
        }
      break;
      case 'MIN_TREASURE' :
        html = 'Get ' + mission.value + ' or more treasure';
      break;
      case 'NAX_CRYSTAL' :
        if (mission.value === 0) {
          html = 'Do not get crystal';
        } else {
          html = 'Get no more than' + mission.value + 'crystal';
        }
      break;
      case 'MIN_CRYSTAL' :
        html = 'Get ' + mission.value + ' or more crystal';
      break;
      case 'MIN_CHAIN' :
        html = 'Make a chain of ' + mission.value + ' or more';
      break;
      case 'MIN_ELEMENT_CHAIN' :
        html = 'Make an element chain of ' + mission.value + ' or more';
      break;
      case 'NO_AUTO' :
        html = 'No auto battle';
      break;
      case 'ALL_MISSIONS' :
        html = 'Complete all missions simultaneously';
      break;
      default :
        console.log('Mission not managed ' + mission.type);
      break;
    }

    return html;
  }
}
