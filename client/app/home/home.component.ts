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
        date: '13/01',
        items: [
          {type: 'esper', dataId: 'UN_LW_S_LVAT'},
          {type: 'card', dataId: 'VC_LW_LVAT'},
          {type: 'card', dataId: 'VC_LW_ASSASIN'},
          {type: 'equipment', dataId: 'AF_FF14_HLM_001'}
        ]
      },
      {
        date: '06/01',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_NIVL'},
          {type: 'unit', dataId: 'UN_LW_P_RVAL'},
          {type: 'equipment', dataId: 'AF_LW_BOW_004'},

          {type: 'unit', dataId: 'UN_FF14_P_TNCR'},
          {type: 'unit', dataId: 'UN_FF14_P_YSTL'},
          {type: 'card', dataId: 'VC_FF14_MV3'},
          {type: 'equipment', dataId: 'AF_FF14_ARW_001'},
        ]
      },
      {
        date: '23/12',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_DEAN'},
          {type: 'unit', dataId: 'UN_LW_P_LATH'},
          {type: 'unit', dataId: 'UN_LW_P_TITU'},
          {type: 'card', dataId: 'VC_LW_DEAN'},
          {type: 'card', dataId: 'VC_LW_GRSR2'},
          {type: 'card', dataId: 'VC_LW_SCAL'},
          {type: 'card', dataId: 'VC_LW_TNBR'},
          {type: 'esper', dataId: 'UN_LW_S_TNBR'},
          {type: 'equipment', dataId: 'AF_LW_CLT_006'},
          {type: 'equipment', dataId: 'AF_LW_MAC_009'}
        ]
      }
    ],
    JP: [
      {
        date: '15/01',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_RYEL'},
          {type: 'unit', dataId: 'UN_LW_P_SIRM'},
          {type: 'equipment', dataId: 'AF_LW_BOK_000'},
          {type: 'equipment', dataId: 'AF_LW_BOK_001'},
          {type: 'equipment', dataId: 'AF_LW_BOK_002'},
          {type: 'equipment', dataId: 'AF_LW_BOK_003'}
        ]
      },
      {
        date: '09/01',
        items: [
          {type: 'unit', dataId: 'UN_LW_P_YERM'},
          {type: 'unit', dataId: 'UN_LW_P_NASR'},
          {type: 'unit', dataId: 'UN_LW_P_ETRE'},

          {type: 'esper', dataId: 'UN_LW_S_PNIX'},
          {type: 'card', dataId: 'VC_LW_PNIX'},
          {type: 'card', dataId: 'VC_LW_LILS2'},
          {type: 'equipment', dataId: 'AF_LW_ARM_028'}
        ]
      },
      {
        date: '23/12',
        items: [
          {type: 'unit', dataId: 'UN_NIER_P_N2TB'},
          {type: 'unit', dataId: 'UN_NIER_P_N9TS'},
          {type: 'card', dataId: 'VC_NIER_MV1'},
          {type: 'equipment', dataId: 'AF_NIER_KAT_000'},
          {type: 'equipment', dataId: 'AF_NIER_SPE_000'},
          {type: 'equipment', dataId: 'AF_NIER_ACCE_000'},

          {type: 'unit', dataId: 'UN_LW_P_MONT_01'},
          {type: 'card', dataId: 'VC_LW_MONT2'},
          {type: 'equipment', dataId: 'AF_LW_SWO_005'},

          {type: 'unit', dataId: 'UN_LW_P_GLMS'},
          {type: 'unit', dataId: 'UN_LW_P_SIMR'},
          {type: 'esper', dataId: 'UN_LW_S_ODIN'},
          {type: 'esper', dataId: 'UN_LW_S_TSLP'}
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
