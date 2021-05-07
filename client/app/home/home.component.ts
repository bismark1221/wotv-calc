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
        date: '05/05',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_MONT_01'},
          {type: 'card', dataId: 'VC_LW_MONT2'},
          {type: 'equipment', dataId: 'AF_LW_SWO_005'}
        ]
      },
      {
        date: '28/04',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_SIMR'},
          {type: 'esper', dataId: 'UN_LW_S_TSLP'}
        ]
      },
      {
        date: '21/04',
        items: [
          {type: 'unit', dataId: 'UN_NIER_P_N2TB'},
          {type: 'unit', dataId: 'UN_NIER_P_N9TS'},
          {type: 'card', dataId: 'VC_NIER_MV1'},
          {type: 'equipment', dataId: 'AF_NIER_KAT_000'},
          {type: 'equipment', dataId: 'AF_NIER_SPE_000'},
          {type: 'equipment', dataId: 'AF_NIER_ACCE_000'}
        ]
      }
    ],
    JP: [
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
      },
      {
        date: '01/05',
        items: [
          {type: 'unit', dataId: 'UN_FF7_P_AERT'},
          {type: 'unit', dataId: 'UN_FF7_P_BART'},
          {type: 'card', dataId: 'VC_FF7_SCPN'},
          {type: 'esper', dataId: 'UN_FF7_S_SCPN'},
          {type: 'equipment', dataId: 'AF_FF7_ROD_000'}
        ]
      },
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
