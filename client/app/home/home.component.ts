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
  lang = 'en';

  updated = {
    GL: [
      {
        date: "11/11",
        items: [
          {type: "esper", dataId: "UN_LW_S_AGON"},
          {type: "card", dataId: "VC_LW_AGON"},
          {type: "card", dataId: "VC_LW_GUREN"},
          {type: "equipment", dataId: "AF_LW_HAT_005"},
        ]
      },
      {
        date: "14/10",
        items: [
          {type: "unit", dataId: "UN_LW_P_HWLT"},
          {type: "unit", dataId: "UN_LW_P_SCAL"},
          {type: "unit", dataId: "UN_LW_P_MRAL"},
          {type: "unit", dataId: "UN_LW_P_CHEL"},
          {type: "equipment", dataId: "AF_LW_SWO_023"}
        ]
      },
      {
        date: "28/10",
        items: [
          {type: "card", dataId: "VC_LW_VKTR"},
          {type: "card", dataId: "VC_LW_HALL"},
          {type: "card", dataId: "VC_LW_BLMN"},
          {type: "esper", dataId: "UN_LW_S_BLMN"},
          {type: "equipment", dataId: "AF_LW_RNG_007"},
        ]
      }
    ],
    JP: [
      {
        date: "31/10",
        items: [
          {type: "unit", dataId: "UN_LW_P_GABL"},
          {type: "unit", dataId: "UN_LW_P_ELSR"},
          {type: "card", dataId: "VC_LW_RAMD"},
          {type: "card", dataId: "VC_LW_OOOO"},
          {type: "equipment", dataId: "AF_LW_GLO_000"},
          {type: "equipment", dataId: "AF_LW_GLO_001"},
          {type: "equipment", dataId: "AF_LW_GLO_002"},
          {type: "equipment", dataId: "AF_LW_GLO_003"},
          {type: "equipment", dataId: "AF_LW_CLT_015"}
        ]
      },
      {
        date: "23/10",
        items: [
          {type: "card", dataId: "VC_LW_HALL"},
          {type: "card", dataId: "VC_LW_MRLT"},
          {type: "esper", dataId: "UN_LW_S_MRLT"}
        ]
      },
      {
        date: "17/10",
        items: [
          {type: "unit", dataId: "UN_LW_P_RIRY_01"},
          {type: "unit", dataId: "UN_LW_P_CRIS"}
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
    this.lang = this.translateService.currentLang
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
