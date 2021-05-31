import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { QuestService } from '../services/quest.service';
import { ItemService } from '../services/item.service';
import { OtherUnitService } from '../services/otherunit.service';

import { Item } from '../entities/item';

@Component({
  selector: 'app-other-farmcalculator',
  templateUrl: './other.farmcalculator.component.html',
  styleUrls: ['./other.farmcalculator.component.css']
})
export class OtherFarmCalculatorComponent implements OnInit {
  quests = [];
  items: Observable<Item[]>;
  selectedItems = [];
  itemLoading = false;
  questLoading = false;
  itemInput = new Subject<string>();

  isCollapsed = {};

  itemClassInInput = 'in-ng-input';
  itemClassListQuest = 'in-quest-list';
  version = 'GL';

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private itemService: ItemService,
    private questService: QuestService,
    private otherUnitService: OtherUnitService
  ) {
  }

  async ngOnInit() {
    this.navService.setTitle('Farm Calculator');
    this.version = this.navService.getVersion();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        for (const itemId of data.split(',')) {
          const item = await this.itemService.getItem(itemId, true);
          if (item) {
            this.selectedItems.push(item);
          }
        }

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
    this.quests = await this.questService.getQuestsForFarmCalc(this.selectedItems);

    this.isCollapsed = {};
    for (const quest of this.quests) {
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
            const EnemyData = await this.otherUnitService.getUnit(rawEnemy.dataId);
            EnemyData.name = this.nameService.getName(EnemyData);
            formattedDropList.enemies.push(EnemyData);
            enemyFinded = true;
          }
        }

        let chestFinded = false;
        for (const rawChest of quest.chests) {
          if (rawChest.drop === rawDrop.dataId) {
            const ChestData = await this.otherUnitService.getUnit(rawChest.dataId);
            ChestData.name = this.nameService.getName(ChestData);
            formattedDropList.enemies.push(ChestData);
            chestFinded = true;
          }
        }

        if (enemyFinded || chestFinded || rawDrop.dataId === 'HOST') {
          for (const itemId of Object.keys(rawDrop.items)) {
            if (itemId !== '') {
              const formattedItem = await this.itemService.formatItemToShow(await this.itemService.getItem(itemId));
              for (const itemDropNum of Object.keys(rawDrop.items[itemId])) {
                formattedItem.drop = {
                  num: itemDropNum,
                  value: rawDrop.items[itemId][itemDropNum]
                };
                formattedDropList.items.push(JSON.parse(JSON.stringify(formattedItem)));
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

    this.quests.sort((a, b) => {
      if (a.findedItems.length > b.findedItems.length) {
        return -1;
      } else if (a.findedItems.length < b.findedItems.length) {
        return 1;
      } else {
        for (const item of this.selectedItems) {
          if (!a.items[item.dataId]) {
            return 1;
          } else if (!b.items[item.dataId]) {
            return -1;
          } else if (a.items[item.dataId].drop.value > b.items[item.dataId].drop.value) {
            return -1;
          } else if (a.items[item.dataId].drop.value < b.items[item.dataId].drop.value) {
            return 1;
          } else if (a.items[item.dataId].drop.minNum > b.items[item.dataId].drop.minNum) {
            return -1;
          } else if (a.items[item.dataId].drop.minNum < b.items[item.dataId].drop.minNum) {
            return 1;
          }
        }
      }
    });

    this.questLoading = false;
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
