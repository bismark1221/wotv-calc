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
        date: '16/12',
        items: [
          {type: 'card', dataId: 'VC_LW_LUCA'},
          {type: 'card', dataId: 'VC_LW_FIGHT'},
          {type: 'equipment', dataId: 'AF_LW_ACC_002'}
        ]
      },
      {
        date: '09/12',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_RAMD_01'},
          {type: 'unit', dataId: 'UN_LW_P_MACR_01'},
          {type: 'card', dataId: 'VC_LW_XMAS'},
          {type: 'card', dataId: 'VC_LW_MOGL'},
          {type: 'esper', dataId: 'UN_LW_S_MOGL'},
          {type: 'card', dataId: 'VC_LW_HALL'},
        ]
      },
      {
        date: '14/10',
        items: [
          {type: 'unit', dataId: 'UN_FF4_P_ROSA'},
          {type: 'unit', dataId: 'UN_FF4_P_KAIN'},
          {type: 'card', dataId: 'VC_FF4_DMNW'},
          {type: 'esper', dataId: 'UN_FF4_S_DMNW'},
          {type: 'equipment', dataId: 'AF_FF4_SPE_000'},
          {type: 'equipment', dataId: 'AF_FF4_BOW_000'}
        ]
      }
    ],
    JP: [
      {
        date: '16/12',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VKTR_01'},
          {type: 'card', dataId: 'VC_LW_XMAS'},
          {type: 'equipment', dataId: 'AF_LW_BOW_012'},
          {type: 'esper', dataId: 'UN_LW_S_MOGL'}
        ]
      },
      {
        date: '09/12',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_OMEG'},
          {type: 'card', dataId: 'VC_LW_OMEG'},
          {type: 'card', dataId: 'VC_LW_ROBB'},
          {type: 'equipment', dataId: 'AF_LW_CLT_016'},

          {type: 'unit', dataId: 'UN_LW_P_MDNA'},
          {type: 'unit', dataId: 'UN_LW_P_OOOO'},
          {type: 'unit', dataId: 'UN_LW_P_PHBE'},
          {type: 'esper', dataId: 'UN_LW_S_GLEM'},
        ]
      },
      {
        date: '30/11',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VNLA_01'},
          {type: 'unit', dataId: 'UN_LW_P_RAMD_01'},
          {type: 'unit', dataId: 'UN_LW_P_MACR_01'},
          {type: 'equipment', dataId: 'AF_FF10_ACCE_001'}
        ]
      }
    ]
  };

  updatedFormatted = [];

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
      this.getTranslation();
      this.getUpdate();
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

  private getUpdate() {
    this.lang = this.translateService.currentLang;
    this.version = this.navService.getVersion();

    this.updated[this.version].forEach((update, updateIndex) => {
      this.updatedFormatted[updateIndex] = {
        date: update.date,
        items: []
      };
      const tableIndex = -1;

      update.items.forEach((item, itemIndex) => {
        const dataItem = this[item.type + 'Service']['get' + item.type[0].toUpperCase() + item.type.slice(1)](item.dataId);
        this.updatedFormatted[updateIndex].items.push({
          type: item.type,
          slug: dataItem.slug,
          name: this.nameService.getName(dataItem),
          image: dataItem.image,
          element: dataItem.element,
          rarity: item.type === 'esper' ? this.esperService.findRarity(dataItem) : dataItem.rarity
        });

        if (item.type === 'unit') {
          this.updatedFormatted[updateIndex].items[itemIndex].jobs = [];
          dataItem.jobs.forEach(jobId => {
            const job = this.jobService.getJob(jobId);
            this.updatedFormatted[updateIndex].items[itemIndex].jobs.push(job);
          });
        }
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
