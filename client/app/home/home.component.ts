import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { EquipmentService } from '../services/equipment.service';

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
        date: '01/04',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_BZAN'},
        ]
      },
      {
        date: '31/03',
        items: [
          {type: 'unit', dataId: 'UN_FF10_P_ARON'},
          {type: 'card', dataId: 'VC_FF10_MV1'},
          {type: 'card', dataId: 'VC_FF10_MV2'},
          {type: 'equipment', dataId: 'AF_FF10_ACCE_001'},

          {type: 'unit', dataId: 'UN_LW_P_ZIZA'},
          {type: 'unit', dataId: 'UN_LW_P_AILN'}
        ]
      },
      {
        date: '24/03',
        items: [
          {type: 'unit', dataId: 'UN_FF10_P_TIDU'},
          {type: 'unit', dataId: 'UN_FF10_P_YUNA'},
          {type: 'esper', dataId: 'UN_LW_S_BAHM'},
          {type: 'card', dataId: 'VC_LW_BAHM'},
          {type: 'card', dataId: 'VC_LW_ART'},
          {type: 'equipment', dataId: 'AF_FF10_SWO_001'},
          {type: 'equipment', dataId: 'AF_FF10_ROD_000'},

          {type: 'unit', dataId: 'UN_LW_P_MONT'},
          {type: 'unit', dataId: 'UN_LW_P_STRN'},
          {type: 'unit', dataId: 'UN_LW_P_ELDE'},
          {type: 'unit', dataId: 'UN_LW_P_ROBB'},
          {type: 'unit', dataId: 'UN_LW_P_BYLO'},
          {type: 'unit', dataId: 'UN_LW_P_RART'},
          {type: 'unit', dataId: 'UN_LW_P_ORDR'},
          {type: 'esper', dataId: 'UN_LW_S_IFRT'},
          {type: 'esper', dataId: 'UN_LW_S_BHMT'},
          {type: 'esper', dataId: 'UN_LW_S_CACT'}
        ]
      },
      {
        date: '17/03',
        items: [
          {type: 'card', dataId: 'VC_LW_RAMD'},
          {type: 'card', dataId: 'VC_LW_OOOO'}
        ]
      }
    ],
    JP: [
      {
        date: '31/03',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_CRLT'},
          {type: 'equipment', dataId: 'AF_LW_ACC_042'},
          {type: 'equipment', dataId: 'AF_LW_ACC_038'}
        ]
      },
      {
        date: '24/03',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_MURG'},
          {type: 'unit', dataId: 'VC_LW_MORE'},
          {type: 'equipment', dataId: 'AF_LW_RNG_006'},

          {type: 'unit', dataId: 'UN_LW_P_MRLK'},
          {type: 'unit', dataId: 'UN_LW_P_RYER'},
          {type: 'unit', dataId: 'UN_LW_P_KTON'},
          {type: 'esper', dataId: 'UN_LW_S_SHIV'},
          {type: 'esper', dataId: 'UN_LW_S_OGRE'}
        ]
      },
      {
        date: '24/03',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_MORE'},
          {type: 'unit', dataId: 'UN_LW_P_CWEL'},
          {type: 'unit', dataId: 'UN_LW_P_VSTR'},
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
    private equipmentService: EquipmentService
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

    for (let updateIndex = 0; updateIndex <= this.updated[this.version].length - 1; updateIndex++) {
      const update = this.updated[this.version][updateIndex];

      this.updatedFormatted[updateIndex] = {
        date: update.date,
        items: []
      };
      const tableIndex = -1;

      for (const item of update.items) {
        const dataItem = await this[item.type + 'Service']['get' + item.type[0].toUpperCase() + item.type.slice(1)](item.dataId);

        if (dataItem) {
          const formattedItem = {
            type: item.type,
            slug: dataItem.slug,
            name: this.nameService.getName(dataItem),
            image: dataItem.image,
            element: dataItem.element,
            rarity: dataItem.rarity,
            jobs: []
          };

          if (item.type === 'unit') {
            for (const jobId of dataItem.jobs) {
              const job = await this.jobService.getJob(jobId);
              formattedItem.jobs.push(job);
            }
          }

          this.updatedFormatted[updateIndex].items.push(formattedItem);
        }
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
