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
        date: '19/05',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_RYEL'},
          {type: 'unit', dataId: 'UN_LW_P_SIRM'},
          {type: 'unit', dataId: 'UN_LW_P_RAIN'},
          {type: 'card', dataId: 'VC_LW_RAIN'},
          {type: 'equipment', dataId: 'AF_LW_BOK_000'},
          {type: 'equipment', dataId: 'AF_LW_BOK_001'},
          {type: 'equipment', dataId: 'AF_LW_BOK_002'},
          {type: 'equipment', dataId: 'AF_LW_BOK_003'},
          {type: 'equipment', dataId: 'AF_LW_FTW_001'},
          {type: 'equipment', dataId: 'AF_LW_ARM_005'},
          {type: 'equipment', dataId: 'AF_LW_ROD_007'}
        ]
      },
      {
        date: '21/05',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_PNIX'},
          {type: 'card', dataId: 'VC_LW_PNIX'},
          {type: 'card', dataId: 'VC_LW_LILS2'},
          {type: 'equipment', dataId: 'AF_LW_ARM_028'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_ODIN'},
          {type: 'unit', dataId: 'UN_LW_P_YERM'},
          {type: 'unit', dataId: 'UN_LW_P_NASR'},
          {type: 'unit', dataId: 'UN_LW_P_ETRE'}
        ]
      },
      {
        date: '05/05',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_MONT_01'},
          {type: 'card', dataId: 'VC_LW_MONT2'},
          {type: 'equipment', dataId: 'AF_LW_SWO_005'}
        ]
      }
    ],
    JP: [
      {
        date: '24/05',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VERN'},
          {type: 'card', dataId: 'VC_LW_RAIN'},
          {type: 'esper', dataId: 'UN_LW_S_TNBR'},
          {type: 'unit', dataId: 'UN_LW_P_STRN_01'},
          {type: 'unit', dataId: 'UN_LW_P_HLNA'},
          {type: 'unit', dataId: 'UN_LW_P_VADM'}
        ]
      },
      {
        date: '14/05',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_GRSR_01'}
        ]
      },
      {
        date: '07/05',
        items: [
          {type: 'card', dataId: 'VC_LW_LSWL'},
          {type: 'equipment', dataId: 'AF_FF7_ACC_003'},

          {type: 'unit', dataId: 'UN_LW_P_ENBT'},
          {type: 'unit', dataId: 'UN_LW_P_FINA'},
          {type: 'unit', dataId: 'UN_LW_P_SRJS'},
          {type: 'esper', dataId: 'UN_LW_S_SIRE'},
          {type: 'esper', dataId: 'UN_LW_S_OCHU'}

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
