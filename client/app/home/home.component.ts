import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { JobService } from '../services/job.service';
import { EquipmentService } from '../services/equipment.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  lang = 'en';
  version = 'GL';

  updated = {
    /*GL: [

      {
        "date": "24/11",
        "items": [
          {"type": "unit", "dataId": "UN_FF15_P_NCTS"},
          {"type": "unit", "dataId": "UN_FF15_P_PRMP"},
          {"type": "unit", "dataId": "UN_LW_P_MINU"},
          {"type": "card", "dataId": "VC_FF15_MV1"},
          {"type": "equipment", "dataId": "AF_FF15_SWO_000"},
          {"type": "equipment", "dataId": "AF_FF15_GUN_000"},
          {"type": "esper", "dataId": "UN_LW_S_TITN"}
        ]
      }


    ],
    JP: [
      {
        date: '07/07',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_EFKS'},
          {type: 'card', dataId: 'VC_LW_EFKS'},
          {type: 'esper', dataId: 'UN_LW_S_WHDG'},
          {type: 'card', dataId: 'VC_LW_WHDG'},
          {type: 'equipment', dataId: 'AF_LW_ARM_031'}
        ]
      }
    ]*/
  };

  updatedFormatted = [];
  noLangChangeOnInit = true;

  constructor(
    private translateService: TranslateService,
    private unitService: UnitService,
    private esperService: EsperService,
    private cardService: CardService,
    private navService: NavService,
    private toolService: ToolService,
    private jobService: JobService,
    private equipmentService: EquipmentService,
    private homeService: HomeService,
  ) {
    this.navService.setTitle(null);

    this.getUpdate();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (!this.noLangChangeOnInit) {
        this.getUpdate();
        this.noLangChangeOnInit = false;
      }
    });
  }
  private async getUpdate() {
    this.lang = this.translateService.currentLang;
    this.version = this.navService.getVersion();

    this.updatedFormatted = await this.homeService.getHomeData();
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
