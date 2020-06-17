import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service'
import { EsperService } from '../services/esper.service'
import { CardService } from '../services/card.service'
import { NavService } from '../services/nav.service'
import { NameService } from '../services/name.service'
import { JobService } from '../services/job.service'

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
        date: "17/06",
        items: [
          {type: "unit", dataId: "UN_LW_P_VKTR"},
          {type: "unit", dataId: "UN_LW_P_THLA"},
          {type: "esper", dataId: "UN_LW_S_OCHU"},
          {type: "card", dataId: "VC_LW_OCHU"}
        ]
      },
      {
        date: "10/06",
        items: [
          {type: "card", dataId: "VC_LW_VALE1"},
          {type: "card", dataId: "VC_LW_VALE2"}
        ]
      },
      {
        date: "03/06",
        items: [
          {type: "unit", dataId: "UN_LW_P_LUCA"},
          {type: "unit", dataId: "UN_LW_P_ADLD"},
          {type: "esper", dataId: "UN_LW_S_TSLP"},
          {type: "card", dataId: "VC_LW_TSLP"},
          {type: "card", dataId: "VC_LW_LILS"}
        ]
      }
    ],
    JP: [
      {
        date: "10/06",
        items: [
          {type: "esper", dataId: "UN_LW_S_TITN"},
          {type: "card", dataId: "VC_LW_TITN"},
          {type: "card", dataId: "VC_LW_KING"}
        ]
      },
      {
        date: "31/05",
        items: [
          {type: "unit", dataId: "UN_LW_P_GRSR"},
          {type: "unit", dataId: "UN_LW_P_LSWL"},
          {type: "unit", dataId: "UN_LW_P_RRIR"}
        ]
      },
      {
        date: "22/05",
        items: [
          {type: "esper", dataId: "UN_LW_S_FNRR"},
          {type: "card", dataId: "VC_LW_FNRR"},
          {type: "card", dataId: "VC_LW_ORDR"}
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
