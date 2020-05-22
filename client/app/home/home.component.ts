import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service'
import { EsperService } from '../services/esper.service'
import { CardService } from '../services/card.service'
import { NavService } from '../services/nav.service'
import { NameService } from '../services/name.service'

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
      [
        {type: "unit", dataId: "UN_LW_P_MRND"},
        {type: "unit", dataId: "UN_LW_P_DRND"},
        {type: "esper", dataId: "UN_LW_S_LAMA_01"},
        {type: "card", dataId: "VC_LW_LAMA_01"},
        {type: "card", dataId: "VC_LW_GUARD"}
      ],
      [
        {type: "esper", dataId: "UN_LW_S_ODIN"},
        {type: "card", dataId: "VC_LW_ODIN"},
        {type: "card", dataId: "VC_LW_NEWYEAR"}
      ],
      [
        {type: "unit", dataId: "UN_LW_P_WHIS"},
        {type: "unit", dataId: "UN_LW_P_KTON"}
      ]
    ],
    JP: [
      [
        {type: "esper", dataId: "UN_LW_S_FNRR"},
        {type: "card", dataId: "VC_LW_FNRR"},
        {type: "card", dataId: "VC_LW_ORDR"}
      ],
      [
        {type: "unit", dataId: "UN_LW_P_STRN_01"}
      ]
    ]
  };

  updatedFormatted = [];

  constructor(
    private translateService: TranslateService,
    private unitService: UnitService,
    private esperService: EsperService,
    private cardService: CardService,
    private navService: NavService,
    private nameService: NameService
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
      this.updatedFormatted[updateIndex] = []
      let tableIndex = -1;

      update.forEach((item, itemIndex) => {
        if (itemIndex % 4 === 0) {
          tableIndex++;
          this.updatedFormatted[updateIndex][tableIndex] = [];
        }

        let dataItem = this[item.type + "Service"]["get" + item.type[0].toUpperCase() + item.type.slice(1)](item.dataId);
        this.updatedFormatted[updateIndex][tableIndex].push({
          type: item.type,
          slug: dataItem.slug,
          name: this.nameService.getName(dataItem),
          image: dataItem.image,
          element: dataItem.element,
          rarity: item.type == "esper" ? this.esperService.findRarity(dataItem) : dataItem.rarity
        });
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
