import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { QuestService } from '../services/quest.service';
import { ToolService } from '../services/tool.service';
import { ItemService } from '../services/item.service';

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
  version = 'GL';

  constructor(
    private activatedRoute: ActivatedRoute,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService,
    private itemService: ItemService,
    private questService: QuestService,
  ) {
  }

  ngOnInit() {
    this.navService.setTitle('Farm Calculator');
    this.version = this.navService.getVersion();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const data = params.get('data');
      if (data) {
        data.split(',').forEach(itemId => {
          const item = this.itemService.getItem(itemId, true);
          if (item) {
            this.selectedItems.push(item);
          }
        });

        this.getQuests();
      }
    });

    this.getItems();
  }

  getItems() {
    this.items = concat(
      of([]),
      this.itemInput.pipe(
        distinctUntilChanged(),
        tap(() => this.itemLoading = true),
        switchMap(term => this.itemService.getItemForFarm(term).pipe(
          catchError(() => of([])),
          tap(() => this.itemLoading = false)
        ))
      )
    );
  }

  changeSelectedItems() {
    this.getQuests();
  }

  removeItem(itemId) {
    const selectedItems = [];

    this.selectedItems.forEach(item => {
      if (item.dataId !== itemId) {
        selectedItems.push(item);
      }
    });

    this.selectedItems = selectedItems;

    this.getQuests();
  }

  getQuests() {
    this.questLoading = true;
    this.quests = this.questService.getQuestsForFarmCalc(this.selectedItems);

    this.isCollapsed = {};
    this.quests.forEach(quest => {
      this.isCollapsed[quest.dataId] = true;
    });
    this.questLoading = false;
  }
}
