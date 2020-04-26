import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service'
import { EsperService } from '../services/esper.service'
import { CardService } from '../services/card.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  markdown = '';
  thanks = '';

  updated = [
    [
      {type: "unit", dataId: "UN_FFT_P_ORND"},
      {type: "unit", dataId: "UN_FFT_P_RAMZ"},
      {type: "unit", dataId: "UN_FFT_P_GFGR"},
      {type: "card", dataId: "VC_FFT_MV1"}
    ],
    [
      {type: "unit", dataId: "UN_LW_P_YERM"},
      {type: "esper", dataId: "UN_LW_S_IFRT"}
    ]
  ];

  updatedFormatted = [];

  constructor(
    private translateService: TranslateService,
    private unitService: UnitService,
    private esperService: EsperService,
    private cardService: CardService
  ) {
    this.getTranslation();
    this.getUpdate();
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

    this.updated.forEach((update, updateIndex) => {
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
          dataId: item.dataId,
          name: dataItem.names.en,
          image: dataItem.image,
          element: dataItem.element,
          rarity: item.type == "esper" ? this.esperService.findRarity(dataItem) : dataItem.rarity
        });
      });
    });
  }
}
