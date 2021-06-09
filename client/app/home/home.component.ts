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
        date: '09/06',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_CBCL'},
          {type: 'card', dataId: 'VC_LW_CBCL'},
          {type: 'equipment', dataId: 'AF_LW_ACC_036'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_MACR'},
          {type: 'unit', dataId: 'UN_LW_P_RAMD'},
          {type: 'unit', dataId: 'UN_LW_P_MICE'},
          {type: 'esper', dataId: 'UN_LW_S_DABL'},
          {type: 'esper', dataId: 'UN_LW_S_BOMB'}
        ]
      },
      {
        date: '02/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_HLNA_01'},
          {type: 'card', dataId: 'VC_LW_ROSEFES'},
          {type: 'equipment', dataId: 'AF_LW_ROD_006'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VNLA'},
          {type: 'unit', dataId: 'UN_LW_P_SDLX'}
        ]
      },
      {
        date: '26/05',
        items: [
          {type: 'card', dataId: 'VC_LW_CMLO'},
          {type: 'card', dataId: 'VC_LW_CORL'},
          {type: 'esper', dataId: 'UN_LW_S_CORL'},
          {type: 'equipment', dataId: 'AF_LW_RNG_009'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_AYKA'},
          {type: 'unit', dataId: 'UN_LW_P_MURM'},
          {type: 'unit', dataId: 'UN_LW_P_FDRC'},
          {type: 'esper', dataId: 'UN_LW_S_RAMU'},
          {type: 'esper', dataId: 'UN_LW_S_IGNT'},
          {type: 'esper', dataId: 'UN_LW_S_ARMN_01'}
        ]
      }
    ],
    JP: [
      {
        date: '09/06',
        items: [
          {type: 'card', dataId: 'VC_LW_JEDN'},
          {type: 'card', dataId: 'VC_LW_IGEN'},
          {type: 'equipment', dataId: 'AF_LW_CLT_019'}
        ]
      },
      {
        date: '',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_VKTR'},
          {type: 'unit', dataId: 'UN_LW_P_RIRY'},
          {type: 'unit', dataId: 'UN_LW_P_SDLX'}
        ]
      },
      {
        date: '01/06',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_JEDN'},
          {type: 'equipment', dataId: 'AF_LW_GUN_011'}
        ]
      },
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
