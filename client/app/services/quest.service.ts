import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { DataService } from './data.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { UnitService } from './unit.service';
import { OtherUnitService } from './otherunit.service';
import { SkillService } from './skill.service';
import { ApiService } from './api.service';
import { NameService } from './name.service';

import { Quest } from '../entities/quest';
import { Unit } from '../entities/unit';
import { Skill } from '../entities/skill';
import { Equipment } from '../entities/equipment';
import { Job } from '../entities/job';
import { Item } from '../entities/item';

@Injectable()
export class QuestService {
  private JP_quests: Quest[];
  private GL_quests: Quest[];
  quest;

  private sre = /^\s+|\s+$/g;

  constructor(
    private translateService: TranslateService,
    private dataService: DataService,
    private navService: NavService,
    private toolService: ToolService,
    private unitService: UnitService,
    private otherUnitService: OtherUnitService,
    private skillService: SkillService,
    private apiService: ApiService,
    private nameService: NameService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('quests', param, extraQuery)));
  }

  async getQuestBySlug(slug) {
    this.quest = null;
    const result = await this.getApi(slug, [{name: 'forDetail', value: 1}]);

    if (result.quest) {
      this.quest = new Quest();
      this.quest.constructFromJson(result.quest, this.translateService);

      this.quest.rawBestiary = [];
      for (const rawBeast of result.bestiary) {
        const beast = new Unit();
        beast.constructFromJson(rawBeast, this.translateService);
        this.quest.rawBestiary.push(beast);
      }

      this.quest.rawItems = [];
      for (const rawItem of result.items) {
        const item = new Item();
        item.constructFromJson(rawItem);
        this.quest.rawItems.push(item);
      }

      this.quest.rawSkills = [];
      for (const rawSkill of result.skills) {
        const skill = new Skill();
        skill.constructFromJson(rawSkill, this.translateService);
        this.quest.rawSkills.push(skill);
      }

      this.quest.rawEquipments = [];
      for (const rawEquipment of result.equipments) {
        const equipment = new Equipment();
        equipment.constructFromJson(rawEquipment, this.translateService);
        this.quest.rawEquipments.push(equipment);
      }

      this.quest.rawJobs = [];
      for (const rawJob of result.jobs) {
        const job = new Job();
        job.constructFromJson(rawJob);
        this.quest.rawJobs.push(job);
      }
    }

    return this.quest;
  }

  async getQuestsForFarmCalc(searchedItems) {
    if (searchedItems.length === 0) {
      return [];
    }

    const itemIds = [];
    searchedItems.forEach(item => {
      itemIds.push(item.dataId);
    });

    const result = await this.getApi(null, [{name: 'forFarmCalc', value: 1}, {name: 'itemIds', value: itemIds.join(',')}]);

    const quests = [];
    for (const rawQuest of result.quests) {
      const quest = new Quest();
      quest.constructFromJson(rawQuest, this.translateService);
      await this.formatItems(quest, itemIds, result.items);

      quests.push(quest);
    }

    for (const rawEnemy of result.bestiary) {
      rawEnemy.name = this.nameService.getName(rawEnemy);
    }

    result.quests = quests;

    return result;
  }

  async getQuestsForListing(filters = null, sort = 'name', order = 'asc') {
    const quests: Quest[] = [];
    const rawQuests = await this.getApi(null, [{name: 'forListing', value: 1}]);

    Object.keys(rawQuests).forEach(questId => {
      const quest = new Quest();
      quest.constructFromJson(rawQuests[questId], this.translateService);
      quests.push(quest);
    });

    quests = this.filterQuests(quests, filters);

    switch (sort) {
      case 'name' :
        this.sortByName(quests, order);
      break;
      case 'lastRelease' :
        this.toolService.sortByLastRelease(quests, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return quests;
  }

  private async formatItems(quest, searchedItemIds, items) {
    quest.formattedItems = [];
    quest.findedItems = [];
    quest.dropRateItems = {};

    for (const rawItem of quest.items) {
      if (rawItem.dataId !== '') {
        const formattedItem = items.find(item => item.dataId === rawItem.dataId);
        quest.formattedItems.push(formattedItem);

        if (searchedItemIds.indexOf(rawItem.dataId) !== -1) {
          quest.findedItems.push(formattedItem);
        }
      }

      quest.dropRateItems[rawItem.dataId] = rawItem;
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

  async getQuestForOtherUnits(unitIds) {
    return await this.getApi(null, [{name: 'forBestiary', value: 1}, {name: 'beastIds', value: unitIds.join(',')}]);
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
        return 'Tutorial';
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
        unit = this.quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === mission.value);
        html = (unit ? unit.getName(this.translateService) : '???') + ' must survive the mission';
      break;
      case 'ELEMENT' :
        html = 'Party includes only ';
        mission.value.forEach((element, elementIndex) => {
          html += (elementIndex > 0 ? ' or ' : '') + element;
        });
        html += 'unit(s)';
      break;
      case 'SPECIFIC_UNIT_IN_PARTY' :
        unit = this.quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === mission.value);
        html = 'Party includes ' + (unit ? unit.getName(this.translateService) : '???');
      break;
      case 'MAX_PARTY_UNIT' :
        html = 'Formation comprise of no more than ' + mission.value + ' unit' + (mission.value > 1 ? 's' : '');
      break;
      case 'MIN_SIM_DEAD_SPECIFIC_ENEMIES' :
        const valueSplit = mission.value.split(',');
        unit = this.quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === valueSplit[0]);
        html = 'Defeat ' + valueSplit[1] + ' ' + (unit ? unit.getName(this.translateService) : '???') + ' or more simultaneously';
      break;
      case 'MIN_BREAK_OBJECT' :
        html = 'Break ' + mission.value + ' or more objets';
      break;
      case 'SPECIFIC_SKILL' :
        const skill = this.quest.rawSkills.find(searchedSkill => searchedSkill.dataId === mission.value);
        html = 'Use skill "' + (skill ? skill.getName(this.translateService) : '???') + '"';
      break;
      case 'MAX_SKILL' :
        html = 'Use no more than ' + mission.value + ' skills';
      break;
      case 'ACTIVATE' :
        unit = this.quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === mission.value);
        html = 'Activate ' + (unit ? unit.getName(this.translateService) : '???'); // @TODO
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

  async formatWinLooseCondition(condition, quest) {
    let html = '';
    let countCond = 0;

    for (const cond of condition) {
      if (countCond > 0) {
        html += ' and ';
      }

      switch (cond.type) {
        case 'ONEDEAD' :
          if (cond.condition.tag === '') {
            if (cond.condition.side === 1) {
              html += 'All enemies annihilated';
            } else {
              html += 'All allies annihilated';
            }
          } else {
            html += this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest) + ' defeated';
          }
        break;

        case 'ALLDEADEXPECTTAG' :
          if (cond.condition.side === 1) {
            html += 'All enemies annihilated expect ' + this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest);
          } else {
            html += 'All allies annihilated expect ' + this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest);
          }
        break;

        case 'ALLDEAD' :
          html += this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest) + ' defeated';
        break;

        case 'STATCOND' :
          html += this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest) + ' HP under ' + cond.condition.hp + '%';
        break;

        case 'TURNCOUNT' :
          html += this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest) + ' played more than ' + cond.condition.turn + ' turns';
        break;

        case 'POSITION' :
          if (cond.condition.side === 1) {
            html += 'An enemy manage to go to ';
          } else {
            html += 'An ally manage to go to ';
          }

          const positions = [];
          for (const pos of cond.condition.pos) {
            positions.push('(' + (pos.x + 1) + ', ' + (pos.y + 1) + ')');
          }
          html += positions.join(' or ');
        break;

        default :
          console.log('Condition not managed ' + cond.type);
        break;
      }

      countCond++;
    }

    return html;
  }

  async formatEntryCondition(condition, quest) {
    let html = '';
    let countCond = 0;
    let IDs = [];

    for (const cond of condition) {
      if (countCond > 0 && cond.type !== 'ALIVE') {
        html += ' and ';
      }

      switch (cond.type) {
        case 'ONEDEAD' :
          IDs = this.getIDsFromTag(cond.condition.tag, quest);
          html += (IDs.length > 1 ? 'At least 1 of ' : '') + (IDs.length > 0 ? IDs.join(', ') : '???') + ' is defeated';
        break;

        case 'ALLDEAD' :
          IDs = this.getIDsFromTag(cond.condition.tag, quest);
          html += (IDs.length > 0 ? IDs.join(', ') : '???') + (IDs.length > 1 ? ' are defeated' : ' is defeated');
        break;

        case 'ALIVE' :
          // Just used for turns so don't need to manage
        break;

        case 'STATCOND' :
          IDs = this.getIDsFromTag(cond.condition.tag, quest);
          html += (IDs.length > 0 ? IDs.join(', ') : '???') + ' HP under ' + cond.condition.hp + '%';
        break;

        case 'TURNCOUNT' :
          IDs = this.getIDsFromTag(cond.condition.tag, quest);
          html += (IDs.length > 0 ? IDs.join(', ') : '???') + ' played more than ' + cond.condition.turn + ' turns';
        break;

        case 'POSITION' :
          if (cond.condition.tag === '') {
            html += 'An enemy manage to go to ';
          } else {
            IDs = this.getIDsFromTag(cond.condition.tag, quest);
            html += (IDs.length > 0 ? IDs.join(', ') : '???') + ' manage to go to ';
          }

          const positions = [];
          for (const pos of cond.condition.pos) {
            positions.push('(' + (pos.x + 1) + ', ' + (pos.y + 1) + ')');
          }
          html += positions.join(' or ');
        break;

        case 'CAST' :
          html += this.getNameOfEnemy(this.getUnitIdFromTag(cond.condition.tag, quest), quest) + ' cast ';
          const skill = this.quest.rawSkills.find(searchedSkill => searchedSkill.dataId === cond.condition.skill);
          if (skill) {
            html += skill.getName(this.translateService);
          }
        break;

        case 'COUNTDEAD' :
          if (cond.condition.side === 1) {
            html += cond.condition.count + ' enemies defeated';
          } else {
            html += cond.condition.count + ' allies defeated';
          }
        break;

        default :
          console.log('Condition not managed ' + cond.type);
        break;
      }

      countCond++;
    }

    return html;
  }

  getNameOfEnemy(unitId, quest) {
    const unit = quest.rawBestiary.find(searchedBeast => searchedBeast.dataId === unitId);

    return unit ? unit.getName(this.translateService) : '???';
  }

  getUnitIdFromTag(tag, quest) {
    const tagTables = ['enemies', 'allies', 'objects', 'chests', 'switchs'];
    for (const tagTable of tagTables) {
      if (quest[tagTable]) {
        for (const enemy of quest[tagTable]) {
          if (enemy.tag === tag) {
            return enemy.dataId;
          }
        }
      }
    }

    return null;
  }

  getIDsFromTag(tag, quest) {
    const tagTables = ['enemies', 'allies', 'objects', 'chests', 'switchs'];
    const IDs = [];

    for (const tagTable of tagTables) {
      if (quest[tagTable]) {
        let i = 1;
        for (const enemy of quest[tagTable]) {
          if (enemy.tag === tag) {
            IDs.push(tagTable[0].toUpperCase() + i);
          }
          i++;
        }
      }
    }

    return IDs;
  }
}
