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
        date: "03/06",
        items: [
          {type: "unit", dataId: "UN_LW_P_LUCA"},
          {type: "unit", dataId: "UN_LW_P_ADLD"},
          {type: "esper", dataId: "UN_LW_S_TSLP"},
          {type: "card", dataId: "VC_LW_TSLP"},
          {type: "card", dataId: "VC_LW_LILS"}
        ]
      },
      {
        date: "20/05",
        items: [
          {type: "unit", dataId: "UN_LW_P_MRND"},
          {type: "unit", dataId: "UN_LW_P_DRND"},
          {type: "esper", dataId: "UN_LW_S_LAMA_01"},
          {type: "card", dataId: "VC_LW_LAMA_01"},
          {type: "card", dataId: "VC_LW_GUARD"}
        ]
      },
      {
        date: "13/05",
        items: [
          {type: "esper", dataId: "UN_LW_S_ODIN"},
          {type: "card", dataId: "VC_LW_ODIN"},
          {type: "card", dataId: "VC_LW_NEWYEAR"}
        ]
      }
    ],
    JP: [
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
      },
      {
        date: "18/05",
        items: [
          {type: "unit", dataId: "UN_LW_P_STRN_01"}
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
