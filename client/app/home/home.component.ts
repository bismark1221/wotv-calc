import { Component, HostListener } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  lang = 'en';
  version = 'GL';

  updated = {
    /*GL: [
      {
        "date": "30/11",
        "items": [
          {"type": "unit", "dataId": "UN_LW_P_BELS"},
          {"type": "equipment", "dataId": "AF_LW_BOK_008"}
        ]
      }
    ]*/
  };

  updatedFormatted = [];
  noLangChangeOnInit = true;

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
    private homeService: HomeService,
    private toolService: ToolService
  ) {
    this.navService.setTitle(null);

    this.getUpdate();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (!this.noLangChangeOnInit) {
        this.getUpdate();
        this.noLangChangeOnInit = false;
      }
    });
  }

  private async getUpdate() {
    this.lang = this.translateService.currentLang;
    this.version = this.navService.getVersion();

    this.updatedFormatted = await this.homeService.getHomeData();

    for (const line of this.updatedFormatted) {
      for (const item of line.items) {
        if (item.type !== 'equipment') {
          item.link = item.type + 's';
        } else {
          item.link = item.type;
        }
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
