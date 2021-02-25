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
        date: '25/02',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_CRIS'},
          {type: 'esper', dataId: 'UN_LW_S_MRLT'},
          {type: 'card', dataId: 'VC_LW_MRLT'},
          {type: 'unit', dataId: 'UN_LW_P_GABL'},
          {type: 'unit', dataId: 'UN_LW_P_ELSR'}
        ]
      },
      {
        date: '17/02',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VKTR_01'},
          {type: 'unit', dataId: 'UN_LW_P_VNLA_01'},
          {type: 'equipment', dataId: 'AF_LW_BOW_012'},
        ]
      },
      {
        date: '10/02',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_TYPN'},
          {type: 'card', dataId: 'VC_LW_TYPN'},
          {type: 'card', dataId: 'VC_LW_APPLE'},
          {type: 'equipment', dataId: 'AF_LW_CLK_001'}
        ]
      }
    ],
    JP: [
      {
        date: '22/02',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_CMLO'},
          {type: 'esper', dataId: 'UN_LW_S_ICDG'},
          {type: 'card', dataId: 'VC_LW_ICDG'},
          {type: 'equipment', dataId: 'AF_LW_ACC_039'},

          {type: 'unit', dataId: 'UN_LW_P_SZRT'},
          {type: 'unit', dataId: 'UN_LW_P_DRND'},
          {type: 'esper', dataId: 'UN_LW_S_MABR'},
        ]
      },
      {
        date: '15/02',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_THLA_01'},
          {type: 'unit', dataId: 'UN_FF1_P_WROL'},
          {type: 'esper', dataId: 'UN_FF01_S_WRMC'},
          {type: 'equipment', dataId: 'AF_FF1_SWO_000'},
        ]
      },
      {
        date: '08/02',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_CBCL'},
          {type: 'card', dataId: 'VC_LW_CBCL'},
          {type: 'equipment', dataId: 'AF_LW_ACC_036'},

          {type: 'unit', dataId: 'UN_LW_P_MACR'},
          {type: 'unit', dataId: 'UN_LW_P_RAMD'},
          {type: 'unit', dataId: 'UN_LW_P_MICE'},
          {type: 'esper', dataId: 'UN_LW_S_DABL'},
          {type: 'esper', dataId: 'UN_LW_S_BOMB'}
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
          rarity: dataItem.rarity
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
