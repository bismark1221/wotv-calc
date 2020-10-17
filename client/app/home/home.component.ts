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
        date: "14/10",
        items: [
          {type: "esper", dataId: "UN_LW_S_TITN"},
          {type: "card", dataId: "VC_LW_TITN"},
          {type: "card", dataId: "VC_LW_KING"},
          {type: "equipment", dataId: "AF_LW_KAT_008"}
        ]
      },
      {
        date: "07/10",
        items: [
          {type: "unit", dataId: "UN_LW_P_LSWL"},
          {type: "unit", dataId: "UN_LW_P_GRSR"},
          {type: "unit", dataId: "UN_LW_P_RRIR"},
        ]
      },
      {
        date: "30/09",
        items: [
          {type: "esper", dataId: "UN_LW_S_FNRR"},
          {type: "card", dataId: "VC_LW_FNRR"},
          {type: "card", dataId: "VC_LW_ORDR"},
        ]
      }
    ],
    JP: [
      {
        date: "17/10",
        items: [
          {type: "unit", dataId: "UN_LW_P_RIRY_01"},
          {type: "unit", dataId: "UN_LW_P_CRIS"}
        ]
      },
      {
        date: "09/10",
        items: [
          {type: "card", dataId: "VC_LW_TYPN"},
          {type: "esper", dataId: "UN_LW_S_TYPN"},
          {type: "card", dataId: "VC_LW_APPLE"},
          {type: "equipment", dataId: "AF_LW_ARW_001"}
        ]
      },
      {
        date: "31/08",
        items: [
          {type: "unit", dataId: "UN_LW_P_RYER_01"},
          {type: "unit", dataId: "UN_LW_P_RARD"},
          {type: "unit", dataId: "UN_LW_P_ELSI"},
          {type: "equipment", dataId: "AF_LW_FIS_004"}
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
