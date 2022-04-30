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
    : GL
New Unit : UN_PRS5_P_JOKR
New Unit : UN_PRS5_P_QUEN
New Unit : UN_PRS5_P_VOLT
New Equipment : AF_PRS5_SWO_000
New Equipment : AF_PRS5_FIS_000
New Equipment : AF_PRS5_DAG_000
New Equipment : AF_LW_ROD_013


      {
        "date": "27/05",
        "items": [
          {"type": "unit", "dataId": "UN_PRS5_P_JOKR"},
          {"type": "unit", "dataId": "UN_PRS5_P_QUEN"},
          {"type": "unit", "dataId": "UN_PRS5_P_VOLT"},
          {"type": "equipment", "dataId": "AF_PRS5_SWO_000"},
          {"type": "equipment", "dataId": "AF_PRS5_FIS_000"},
          {"type": "equipment", "dataId": "AF_PRS5_DAG_000"},
          {"type": "equipment", "dataId": "AF_LW_ROD_013"},
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
