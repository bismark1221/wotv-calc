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
      },
      {
        date: '16/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_THLA_01'},
          {type: 'unit', dataId: 'UN_FF1_P_WROL'},
          {type: 'equipment', dataId: 'AF_FF1_SWO_000'}
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
          {type: 'card', dataId: 'VC_LW_WHDG'}
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
