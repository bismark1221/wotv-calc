import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { QuestService } from '../services/quest.service';
import { ItemService } from '../services/item.service';

import { Item } from '../entities/item';

@Component({
  selector: 'app-other-farmcalculator',
  templateUrl: './other.farmcalculator.component.html',
  styleUrls: ['./other.farmcalculator.component.css']
})
export class OtherFarmCalculatorComponent implements OnInit {
  quests = [];
  rawQuests = [];
  items: Observable<Item[]>;
  selectedItems = [];
  itemLoading = false;
  questLoading = false;
  itemInput = new Subject<string>();

  isCollapsed = {};

  itemClassInInput = 'in-ng-input';
  itemClassListQuest = 'in-quest-list';

  filters = {
    type: [
      'story',
      'event',
      'hard_quest_unit',
      'multi',
      'character_quest',
      'esper_quest',
      'raid',
      'tuto',
      'beginner',
      'guild_quest',
      'selection',
      'hard_quest_vc'
    ],
    showNotAvailableQuests: false
  };

  isFilterChecked = {
    type: []
  };

  questTypes = [
    'story',
    'event',
    'hard_quest_unit',
    'multi',
    'character_quest',
    'esper_quest',
    'raid',
    'tuto',
    'beginner',
    'guild_quest',
    'selection',
    'hard_quest_vc'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private itemService: ItemService,
    private questService: QuestService
  ) {
  }

  async ngOnInit() {
    this.navService.setTitle('Farm Calculator');

    if (sessionStorage.getItem('farmCalcQuestsFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('farmCalcQuestsFilters'));
    }

    this.filterChecked();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        this.selectedItems = await this.itemService.getItemsByIds(data.split(','));

        await this.getQuests();
      }
    });

    await this.getItems();
  }

  async getItems() {
    this.items = concat(
      of([]),
      this.itemInput.pipe(
        distinctUntilChanged(),
        tap(() => this.itemLoading = true),
        switchMap(async term => {
          const items = await this.itemService.getItemForFarm(term);
          this.itemLoading = false;
          return items;
        })
      )
    );
  }

  async changeSelectedItems() {
    await this.getQuests();
  }

  async removeItem(itemId) {
    const selectedItems = [];

    this.selectedItems.forEach(item => {
      if (item.dataId !== itemId) {
        selectedItems.push(item);
      }
    });

    this.selectedItems = selectedItems;

    await this.getQuests();
  }

  async getQuests() {
    this.questLoading = true;
    const apiResult = await this.questService.getQuestsForFarmCalc(this.selectedItems);
    this.rawQuests = apiResult.quests;

    this.isCollapsed = {};
    for (const quest of this.rawQuests) {
      this.isCollapsed[quest.dataId] = true;

      quest.dropLists = [];
      for (const rawDrop of quest.drops) {
        const formattedDropList = {
          enemies: [],
          items: [],
          isHost: false
        };

        let enemyFinded = false;
        for (const rawEnemy of quest.enemies) {
          if (rawEnemy.drop === rawDrop.dataId) {
            const EnemyData = apiResult.bestiary.find(enemy => enemy.dataId === rawEnemy.dataId);
            if (EnemyData) {
              formattedDropList.enemies.push(EnemyData);
            }
            enemyFinded = true;
          }
        }

        let chestFinded = false;
        for (const rawChest of quest.chests) {
          if (rawChest.drop === rawDrop.dataId) {
            const ChestData = apiResult.bestiary.find(chest => chest.dataId === rawChest.dataId);
            if (ChestData) {
              formattedDropList.enemies.push(ChestData);
            }
            chestFinded = true;
          }
        }

        if (enemyFinded || chestFinded || rawDrop.dataId === 'HOST') {
          for (const itemId of Object.keys(rawDrop.items)) {
            if (itemId !== '') {
              const formattedItem = apiResult.items.find(item => item.dataId === itemId);
              if (formattedItem) {
                formattedItem.name = this.toolService.getName(formattedItem);

                for (const itemDropNum of Object.keys(rawDrop.items[itemId])) {
                  formattedItem.drop = {
                    num: itemDropNum,
                    value: rawDrop.items[itemId][itemDropNum]
                  };
                  formattedDropList.items.push(JSON.parse(JSON.stringify(formattedItem)));
                }
              }
            }
          }

          if (rawDrop.dataId === 'HOST') {
            formattedDropList.isHost = true;
          }

          quest.dropLists.push(formattedDropList);
        }
      }
    }

    this.rawQuests.sort((a, b) => {
      if (a.findedItems.length > b.findedItems.length) {
        return -1;
      } else if (a.findedItems.length < b.findedItems.length) {
        return 1;
      } else {
        for (const item of this.selectedItems) {
          if (!a.dropRateItems[item.dataId] || !a.dropRateItems[item.dataId].drop) {
            return 1;
          } else if (!b.dropRateItems[item.dataId] || !b.dropRateItems[item.dataId].drop) {
            return -1;
          } else if (a.dropRateItems[item.dataId].drop.value > b.dropRateItems[item.dataId].drop.value) {
            return -1;
          } else if (a.dropRateItems[item.dataId].drop.value < b.dropRateItems[item.dataId].drop.value) {
            return 1;
          } else if (a.dropRateItems[item.dataId].drop.minNum > b.dropRateItems[item.dataId].drop.minNum) {
            return -1;
          } else if (a.dropRateItems[item.dataId].drop.minNum < b.dropRateItems[item.dataId].drop.minNum) {
            return 1;
          }
        }
      }
    });

    this.filterQuests();

    this.questLoading = false;
  }

  filterQuests() {
    this.quests = [];
    this.rawQuests.forEach(quest => {
      if (this.filters.type.indexOf(quest.type) !== -1) {
        if (this.filters.showNotAvailableQuests) {
          this.quests.push(quest);
        } else {
          if (!quest.lastRelease) {
            this.quests.push(quest);
          } else {
            const splittedStartDate = quest.lastRelease.start.split('/');
            const start = new Date(splittedStartDate[2], splittedStartDate[1] - 1, splittedStartDate[0]);
            const splittedEndDate = quest.lastRelease.end.split('/');
            const end = new Date(splittedEndDate[2], splittedEndDate[1] - 1, splittedEndDate[0]);
            const today = new Date();

            if (today >= start && today <= end) {
              this.quests.push(quest);
            }
          }
        }
      }
    });
  }

  toogleAvailableQuests() {
    this.filters.showNotAvailableQuests = !this.filters.showNotAvailableQuests;
    this.filterQuests();
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('farmCalcQuestsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    this.filterQuests();
  }

  filterChecked() {
    this.questTypes.forEach(type => {
      if (this.filters.type.indexOf(type) === -1) {
        this.isFilterChecked.type[type] = false;
      } else {
        this.isFilterChecked.type[type] = true;
      }
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  formatType(type) {
    return this.questService.formatType(type);
  }
}
