import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DataService } from './data.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { ItemService } from './item.service';
import { UnitService } from './unit.service';
import { OtherUnitService } from './otherunit.service';

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
    private unitService: UnitService,
    private otherUnitService: OtherUnitService
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

  private reduceString(s: any) {
    return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  sortByName(quests, order = 'asc') {
    quests.sort((a: any, b: any) => {
      const x = this.reduceString(a.name && a.name !== 'New Quest' ? a.name : a.getName(this.translateService));
      const y = this.reduceString(b.name && a.name !== 'New Quest' ? b.name : b.getName(this.translateService));

      if (a.type === 'story' && b.type === 'story') {
        const tableA = x.split(' ');
        const tableB = y.split(' ');

        const storySplitA = tableA[0].split(':');
        const storySplitB = tableB[0].split(':');

        if (parseInt(storySplitA[0], 10) > parseInt(storySplitB[0], 10)) {
          return order === 'asc' ? 1 : -1;
        } else if (parseInt(storySplitB[0], 10) > parseInt(storySplitA[0], 10)) {
          return order === 'asc' ? -1 : 1;
        } else {
          if (parseInt(storySplitA[1], 10) > parseInt(storySplitB[1], 10)) {
            return order === 'asc' ? 1 : -1;
          } else if (parseInt(storySplitB[1], 10) > parseInt(storySplitA[1], 10)) {
            return order === 'asc' ? -1 : 1;
          } else {
            if (parseInt(storySplitA[2], 10) > parseInt(storySplitB[2], 10)) {
              return order === 'asc' ? 1 : -1;
            } else if (parseInt(storySplitB[2], 10) > parseInt(storySplitA[2], 10)) {
              return order === 'asc' ? -1 : 1;
            } else {
              if (parseInt(storySplitA[3], 10) > parseInt(storySplitB[3], 10)) {
                return order === 'asc' ? 1 : -1;
              } else if (parseInt(storySplitB[3], 10) > parseInt(storySplitA[3], 10)) {
                return order === 'asc' ? -1 : 1;
              }
            }
          }
        }
      } else if (a.type === 'tower' && b.type === 'tower') {
        const tableA = x.split(' ');
        const tableB = y.split(' ');

        if (parseInt(tableA[tableA.length - 1].split('F')[0], 10) > parseInt(tableB[tableB.length - 1].split('F')[0], 10)) {
          return order === 'asc' ? 1 : -1;
        } else if (parseInt(tableB[tableB.length - 1].split('F')[0], 10) > parseInt(tableA[tableA.length - 1].split('F')[0], 10)) {
          return order === 'asc' ? -1 : 1;
        }
      } else {
        if (order === 'asc') {
          return x.localeCompare(y, 'ja');
        } else {
          return y.localeCompare(x, 'ja');
        }
      }
    });

    return quests;
  }

  async getQuestsForListing(filters = null, sort = 'name', order = 'asc') {
    await this.getQuests();
    const quests = this.filterQuests(this[this.navService.getVersion() + '_quests'], filters);

    switch (sort) {
      case 'name' :
        this.sortByName(quests, order);
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

  formatType(type) {
    switch (type) {
      case 'story' :
        return 'Story';
      break;
      case 'event' :
        return 'Event';
      break;
      case 'hard_quest_unit' :
        return 'Hard Quest (Unit)';
      break;
      case 'multi' :
        return 'Multi';
      break;
      case 'character_quest' :
        return 'Character Quest';
      break;
      case 'esper_quest' :
        return 'Beast\'s Den';
      break;
      case 'arena' :
        return 'Arena';
      break;
      case 'raid' :
        return 'Raid';
      break;
      case 'rank_pvp' :
        return 'Rank PVP';
      break;
      case 'free_pvp' :
        return 'Free PVP';
      break;
      case 'friend_pvp' :
        return 'Friend PVP';
      break;
      case 'gvg' :
        return 'GVG';
      break;
      case 'tuto' :
        return 'Tutoriel';
      break;
      case 'beginner' :
        return 'Beginner';
      break;
      case 'guild_quest' :
        return 'Guild Quest';
      break;
      case 'selection' :
        return 'Selection Quest';
      break;
      case 'draft_pvp' :
        return 'Draft PVP';
      break;
      case 'hard_quest_vc' :
        return 'Hard Quest (Card)';
      break;
      case 'tower' :
        return 'Tower';
      break;
      default :
        return 'Untranslated type...';
      break;
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
        if (!unit) {
          unit = await this.otherUnitService.getUnit(mission.value);
        }
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
        if (!unit) {
          unit = await this.otherUnitService.getUnit(mission.value);
        }
        html = 'Party includes ' + (unit ? unit.getName() : '???');
      break;
      case 'MAX_PARTY_UNIT' :
        html = 'Formation comprise of no more than ' + mission.value + ' unit' + (mission.value > 1 ? 's' : '');
      break;
      case 'MIN_SIM_DEAD_SPECIFIC_ENEMIES' :
        const valueSplit = mission.value.split(',');
        unit = await this.otherUnitService.getUnit(valueSplit[0]);
        html = 'Defeat ' + valueSplit[1] + ' ' + (unit ? unit.getName() : '???') + ' or more simultaneously';  // @TODO
      break;
      case 'MIN_BREAK_OBJECT' :
        html = 'Break ' + mission.value + ' or more objets';
      break;
      case 'SPECIFIC_SKILL' :
        // @TODO get skill name ^^
        html = 'Use some skill (but sorry I did not link that part...)'; // + mission.value;
      break;
      case 'MAX_SKILL' :
        html = 'Use no more than ' + mission.value + ' skills';
      break;
      case 'ACTIVATE' :
        unit = await this.otherUnitService.getUnit(mission.value);
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
      case 'MIN_SIM_DEAD_ENEMIES' :
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
      case 'TOWER_FIRST_COMPLETE' :
        html = 'Complete the quest (1st run)';
      break;
      case 'TOWER_OTHER_COMPLETE' :
        html = 'Complete the quest (other run)';
      break;
      default :
        console.log('Mission not managed ' + mission.type);
      break;
    }

    return html;
  }
}
