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


New Unit : UN_FF13_P_LTNG
New Unit : UN_FF13_P_HOPE
New Card : VC_FF13_MV1
New Card : VC_FF13_MV2
New Equipment : AF_FF13_SWO_000
New Equipment : AF_FF13_UNI_000



      {
        "date": "13/05",
        "items": [
          {"type": "unit", "dataId": "UN_FF13_P_LTNG"},
          {"type": "unit", "dataId": "UN_FF13_P_HOPE"},
          {"type": "card", "dataId": "VC_FF13_MV1"},
          {"type": "card", "dataId": "VC_FF13_MV2"},
          {"type": "equipment", "dataId": "AF_FF13_SWO_000"},
          {"type": "equipment", "dataId": "AF_FF13_UNI_000"}
        ]
      }

      {
        "date": "11/05",
        "items": [
          {"type": "card", "dataId": "VC_LW_NEWYEAR2"},
          {"type": "card", "dataId": "VC_LW_TREL"},
          {"type": "card", "dataId": "VC_PRS5_MV2"},
          {"type": "equipment", "dataId": "AF_PRS5_ACC_002"}
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
