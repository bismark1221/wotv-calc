import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
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
        date: '07/07',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_MORE'},
          {type: 'unit', dataId: 'UN_LW_P_CWEL'},
          {type: 'equipment', dataId: 'AF_LW_SWO_029'}
        ]
      },
      {
        date: '30/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_ZZAN_01'},
          {type: 'card', dataId: 'VC_LW_MONT'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_KTON'},
          {type: 'unit', dataId: 'UN_LW_P_FRVA'},
          {type: 'unit', dataId: 'UN_LW_P_DEAN'}
        ]
      },
      {
        date: '23/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_CMLO'},
          {type: 'esper', dataId: 'UN_LW_S_ICDG'},
          {type: 'card', dataId: 'VC_LW_ICDG'},
          {type: 'equipment', dataId: 'AF_LW_ACC_039'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_SZRT'},
          {type: 'unit', dataId: 'UN_LW_P_DRND'},
          {type: 'esper', dataId: 'UN_LW_S_MABR'}
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
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_THLA'},
          {type: 'unit', dataId: 'UN_LW_P_ADLD'},
          {type: 'unit', dataId: 'UN_LW_P_NAIA'}
        ]
      },
      {
        date: '01/07',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_OBRN'},
          {type: 'equipment', dataId: 'AF_LW_SPE_003'}
        ]
      },
      {
        date: '23/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_LMIG'},
          {type: 'card', dataId: 'VC_LW_LUCA2'},
          {type: 'equipment', dataId: 'AF_LW_ACC_048'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_GRSR'},
          {type: 'unit', dataId: 'UN_LW_P_CRIS'},
          {type: 'unit', dataId: 'UN_LW_P_LVES'},
          {type: 'esper', dataId: 'UN_LW_S_LVAT'},
          {type: 'esper', dataId: 'UN_LW_S_TYPN'}
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
    private nameService: NameService,
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
