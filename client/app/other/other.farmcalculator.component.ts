import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { QuestService } from '../services/quest.service';
import { ToolService } from '../services/tool.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-other-farmcalculator',
  templateUrl: './other.farmcalculator.component.html',
  styleUrls: ['./other.farmcalculator.component.css']
})
export class OtherFarmCalculatorComponent implements OnInit {
  quests = [];
  items = [];
  selectedItems = [];

  constructor(
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

    this.getItems();
  }

  getItems() {
    this.items = this.itemService.getItems();
    this.translateItems();
  }

  private translateItems() {
    this.items.forEach(item => {
      item.name = this.nameService.getName(item);
    });
  }

  selectItem() {
  }
}
