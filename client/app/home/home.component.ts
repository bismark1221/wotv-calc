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
        date: "22/07",
        items: [
          {type: "esper", dataId: "UN_LW_S_THDG"},
          {type: "card", dataId: "VC_LW_THDG"},
          {type: "card", dataId: "VC_LW_ADLD"},
          {type: "card", dataId: "VC_LW_WHITEDAY1"},
          {type: "card", dataId: "VC_LW_VNLA2"}
        ]
      },
      {
        date: "17/07",
        items: [
          {type: "unit", dataId: "UN_LW_P_VNLA"},
          {type: "unit", dataId: "UN_LW_P_DRIO"},
          {type: "unit", dataId: "UN_LW_P_TREL"}
        ]
      },
      {
        date: "01/07",
        items: [
          {type: "unit", dataId: "UN_LW_P_RAIN"},
          {type: "unit", dataId: "UN_LW_P_FRVA"}
        ]
      }
    ],
    JP: [
      {
        date: "22/07",
        items: [
          {type: "unit", dataId: "UN_FF4_P_CECL"},
          {type: "unit", dataId: "UN_LW_P_LATH"},
          {type: "unit", dataId: "UN_LW_P_TITU"},
          {type: "card", dataId: "VC_LW_GRSR2"},
          {type: "esper", dataId: "UN_LW_S_CHCB1"},
          {type: "card", dataId: "VC_LW_CHCB"},
        ]
      },
      {
        date: "08/07",
        items: [
          {type: "card", dataId: "VC_LW_GUREN"},
          {type: "card", dataId: "VC_LW_AGON"},
          {type: "esper", dataId: "UN_LW_S_AGON"},
          {type: "equipment", dataId: "AF_FF14_HLM_001"}
        ]
      },
      {
        date: "02/07",
        items: [
          {type: "unit", dataId: "UN_LW_P_SCAL"},
          {type: "unit", dataId: "UN_LW_P_MRAL"},
          {type: "unit", dataId: "UN_LW_P_LILS_01"},
          {type: "unit", dataId: "UN_LW_P_HWLT"},
          {type: "unit", dataId: "UN_LW_P_CHEL"},
          {type: "esper", dataId: "UN_LW_S_BLMN"},
          {type: "card", dataId: "VC_LW_VKTR"},
          {type: "card", dataId: "VC_FF14_MV3"},
          {type: "card", dataId: "VC_LW_BLMN"}
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
