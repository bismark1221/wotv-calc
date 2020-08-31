import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service'
import { EsperService } from '../services/esper.service'
import { CardService } from '../services/card.service'
import { NavService } from '../services/nav.service'
import { NameService } from '../services/name.service'
import { JobService } from '../services/job.service'
import { EquipmentService } from '../services/equipment.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  markdown = '';
  thanks = '';

  updated = {
    GL: [
      {
        date: "26/08",
        items: [
          {type: "unit", dataId: "UN_FFT_P_AGRA"},
          {type: "unit", dataId: "UN_FFT_P_DELT"},
          {type: "unit", dataId: "UN_FFT_P_MSTD"},
          {type: "card", dataId: "VC_FFT_MV3"},
          {type: "card", dataId: "VC_FFT_MV2"},
          {type: "esper", dataId: "UN_FFT_S_CHCB_01"}
        ]
      },
      {
        date: "19/08",
        items: [
          {type: "unit", dataId: "UN_LW_P_ORDR"},
          {type: "unit", dataId: "UN_LW_P_LVES"}
        ]
      },
      {
        date: "12/08",
        items: [
          {type: "esper", dataId: "UN_LW_S_DABL"},
          {type: "card", dataId: "VC_LW_DABL"},
          {type: "card", dataId: "VC_LW_CBVPARTY1"}
        ]
      }
    ],
    JP: [
      {
        date: "31/08",
        items: [
          {type: "unit", dataId: "UN_LW_P_NIVL"},
          {type: "unit", dataId: "UN_LW_P_RVAL"},
          {type: "equipment", dataId: "AF_LW_BOW_004"}
        ]
      },
      {
        date: "25/08",
        items: [
          {type: "card", dataId: "VC_LW_SCAL"},
          {type: "card", dataId: "VC_FFCC_MV1"},
          {type: "card", dataId: "VC_FFCC_MV2"},
          {type: "card", dataId: "VC_LW_TNBR"},
          {type: "esper", dataId: "UN_LW_S_TNBR"},
          {type: "equipment", dataId: "AF_LW_CLT_006"}
        ]
      },
      {
        date: "20/08",
        items: [
          {type: "unit", dataId: "UN_LW_P_KTON_01"},
          {type: "equipment", dataId: "AF_LW_MAC_009"}
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
    let lang = this.translateService.currentLang
    let version = this.navService.getVersion()

    this.updated[version].forEach((update, updateIndex) => {
      this.updatedFormatted[updateIndex] = {
        date: update.date,
        items: []
      }
      let tableIndex = -1;

      update.items.forEach((item, itemIndex) => {
        let dataItem = this[item.type + "Service"]["get" + item.type[0].toUpperCase() + item.type.slice(1)](item.dataId);
        this.updatedFormatted[updateIndex].items.push({
          type: item.type,
          slug: dataItem.slug,
          name: this.nameService.getName(dataItem),
          image: dataItem.image,
          element: dataItem.element,
          rarity: item.type == "esper" ? this.esperService.findRarity(dataItem) : dataItem.rarity
        });

        if (item.type == "unit") {
          this.updatedFormatted[updateIndex].items[itemIndex].jobs = []
          dataItem.jobs.forEach(jobId => {
            let job = this.jobService.getJob(jobId)
            this.updatedFormatted[updateIndex].items[itemIndex].jobs.push(job)
          })
        }
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
