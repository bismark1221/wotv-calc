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
  version = 'GL'

  updated = {
    GL: [
      {
        date: "14/10",
        items: [
          {type: "unit", dataId: "UN_FF4_P_ROSA"},
          {type: "unit", dataId: "UN_FF4_P_KAIN"},
          {type: "card", dataId: "VC_FF4_DMNW"},
          {type: "esper", dataId: "UN_FF4_S_DMNW"},
          {type: "equipment", dataId: "AF_FF4_SPE_000"},
          {type: "equipment", dataId: "AF_FF4_BOW_000"}
        ]
      },
      {
        date: "18/11",
        items: [
          {type: "unit", dataId: "UN_FF4_P_CECL"},
          {type: "card", dataId: "VC_LW_CHCB"},
          {type: "esper", dataId: "UN_LW_S_CHCB1"},
          {type: "equipment", dataId: "AF_FF4_ARM_001"},
        ]
      },
      {
        date: "11/11",
        items: [
          {type: "esper", dataId: "UN_LW_S_AGON"},
          {type: "card", dataId: "VC_LW_AGON"},
          {type: "card", dataId: "VC_LW_GUREN"},
          {type: "equipment", dataId: "AF_LW_HAT_005"},
        ]
      }
    ],
    JP: [
      {
        date: "13/11",
        items: [
          {type: "unit", dataId: "UN_FF10_P_TIDU"},
          {type: "unit", dataId: "UN_FF10_P_YUNA"},

          {type: "unit", dataId: "UN_LW_P_STRN"},
          {type: "unit", dataId: "UN_LW_P_ELDE"},
          {type: "unit", dataId: "UN_LW_P_ROBB"},
          {type: "unit", dataId: "UN_LW_P_ORDR"},
          {type: "unit", dataId: "UN_LW_P_MONT"},
          {type: "unit", dataId: "UN_LW_P_BYLO"},
          {type: "unit", dataId: "UN_LW_P_RART"},

          {type: "esper", dataId: "UN_LW_S_BAHM"},
          {type: "esper", dataId: "UN_LW_S_IFRT"},
          {type: "esper", dataId: "UN_LW_S_BHMT"},
          {type: "esper", dataId: "UN_LW_S_CACT"},
          {type: "card", dataId: "VC_LW_BAHM"},
          {type: "equipment", dataId: "AF_FF10_SWO_001"},
          {type: "equipment", dataId: "AF_FF10_ROD_000"},
        ]
      },
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
    this.version = this.navService.getVersion()

    this.updated[this.version].forEach((update, updateIndex) => {
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
