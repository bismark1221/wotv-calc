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
        date: "23/09",
        items: [
          {type: "unit", dataId: "UN_LW_P_STRN_01"},
          {type: "equipment", dataId: "AF_LW_ACC_001"}
        ]
      },
      {
        date: "16/09",
        items: [
          {type: "card", dataId: "VC_FFCC_MV1"},
          {type: "card", dataId: "VC_LW_ROBUST"},
          {type: "card", dataId: "VC_FFCC_MV2"},
          {type: "card", dataId: "VC_LW_MDFY"},
          {type: "esper", dataId: "UN_LW_S_MDFY"},
          {type: "equipment", dataId: "AF_LW_HLM_005"},
          {type: "equipment", dataId: "AF_LW_BSW_003"}
        ]
      },
      {
        date: "09/09",
        items: [

          {type: "unit", dataId: "UN_LW_P_IRDL"},
          {type: "equipment", dataId: "AF_LW_SWO_006"}
        ]
      }
    ],
    JP: [
      {
        date: "23/09",
        items: [
          {type: "unit", dataId: "UN_LW_P_SAKR"},
          {type: "unit", dataId: "UN_LW_P_ALIM"},
          {type: "card", dataId: "VC_LW_HLNA"},
          {type: "card", dataId: "VC_LW_GCAL"},
          {type: "esper", dataId: "UN_LW_S_GCAL"},
          {type: "equipment", dataId: "AF_LW_ARW_005"},
          {type: "equipment", dataId: "AF_LW_ROD_019"}
        ]
      },
      {
        date: "09/09",
        items: [
          {type: "esper", dataId: "UN_LW_S_LVAT"},
          {type: "card", dataId: "VC_LW_LVAT"},
          {type: "card", dataId: "VC_LW_ASSASIN"},
          {type: "equipment", dataId: "AF_LW_CLK_001"}
        ]
      },
      {
        date: "31/08",
        items: [
          {type: "unit", dataId: "UN_LW_P_NIVL"},
          {type: "unit", dataId: "UN_LW_P_RVAL"},
          {type: "equipment", dataId: "AF_LW_BOW_004"}
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
