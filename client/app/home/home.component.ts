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
        date: '21/04',
        items: [
          {type: 'unit', dataId: 'UN_NIER_P_N2TB'},
          {type: 'unit', dataId: 'UN_NIER_P_N9TS'},
          {type: 'card', dataId: 'VC_NIER_MV1'},
          {type: 'equipment', dataId: 'AF_NIER_KAT_000'},
          {type: 'equipment', dataId: 'AF_NIER_SPE_000'},
          {type: 'equipment', dataId: 'AF_NIER_ACC_000'}
        ]
      },
      {
        date: '14/04',
        items: [
          {type: 'card', dataId: 'VC_LW_ROBB'},
          {type: 'card', dataId: 'VC_LW_OMEG'},
          {type: 'esper', dataId: 'UN_LW_S_OMEG'},
          {type: 'esper', dataId: 'UN_LW_S_GLEM'},
          {type: 'equipment', dataId: 'AF_LW_CLT_015'}
        ]
      },
      {
        date: '07/04',
        items: [
          {type: 'card', dataId: 'VC_LW_ZZAN'}
        ]
      }
    ],
    JP: [
      {
        date: '21/04',
        items: [
          {type: 'unit', dataId: 'UN_FF7_P_CLUD'},
          {type: 'unit', dataId: 'UN_FF7_P_TIFA'},
          {type: 'unit', dataId: 'UN_LW_P_GRGS'},
          {type: 'card', dataId: 'VC_FF7_MV1'},
          {type: 'equipment', dataId: 'AF_FF7_BSW_000'},
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_RAIN'},
          {type: 'unit', dataId: 'UN_LW_P_LSWL'},
          {type: 'esper', dataId: 'UN_LW_S_FNRR'},
          {type: 'esper', dataId: 'UN_LW_S_ZUUU'},
          {type: 'card', dataId: 'VC_LW_APPLE'}
        ]
      },
      {
        date: '14/04',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VLRC'},
          {type: 'unit', dataId: 'UN_LW_P_LMRE'},
          {type: 'equipment', dataId: 'AF_LW_CLT_018'},
          {type: 'unit', dataId: 'UN_LW_P_VNLA'},
          {type: 'unit', dataId: 'UN_LW_P_DRIO'},
          {type: 'unit', dataId: 'UN_LW_P_UNII'}
        ]
      },
      {
        date: '07/04',
        items: [
          {type: 'card', dataId: 'VC_LW_MONT'},
          {type: 'card', dataId: 'VC_LW_DMCM'},
          {type: 'esper', dataId: 'UN_LW_S_DMCM'},
          {type: 'equipment', dataId: 'AF_LW_ARM_032'},
          {type: 'esper', dataId: 'UN_LW_S_LAMA_01'}
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
