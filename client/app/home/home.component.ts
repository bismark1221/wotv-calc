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
  markdown = '';
  thanks = '';
  lang = 'en';
  version = 'GL';

  updated = {
    GL: [
      {
        date: '30/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_ZZAN_01'},
          {type: 'card', dataId: 'VC_LW_MONT'}
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
    ]
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

    this.getTranslation();
    this.getUpdate();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (!this.noLangChangeOnInit) {
        this.getTranslation();
        this.getUpdate();
        this.noLangChangeOnInit = false;
      }
    });
  }

  private getTranslation() {
    this.translateService.get('home.markdown').subscribe((res: string) => {
      this.markdown = res;
    });

    this.translateService.get('home.thanks').subscribe((res: string) => {
      this.thanks = res;
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
