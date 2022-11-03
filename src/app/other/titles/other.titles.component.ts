
import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { TitleService } from '../../services/title.service';
import { ToolService } from '../../services/tool.service';
import { NavService } from '../../services/nav.service';


@Component({
  selector: 'app-titles',
  templateUrl: './other.titles.component.html',
  styleUrls: ['./other.titles.component.css']
})
export class OtherTitlesComponent implements OnInit {
  titles = {
    player: [],
    guild: []
  };

  constructor(
    private titleService: TitleService,
    private translateService: TranslateService,
    private toolService: ToolService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatTitles();
    });
  }

  async ngOnInit() {
    this.navService.setSEO('Titles', 'You want to farm some title ? This page show how you can get each title in-game.');

    this.titles = await this.titleService.getTitles();

    this.formatTitles();
  }

  private formatTitles() {
    const types = ['player', 'guild'];
    types.forEach(type => {
      this.titles[type].forEach(title => {
        title.name = this.toolService.getName(title);
        title.translatedHowToGet = title.howToGet.fr && this.translateService.currentLang === 'fr' ? title.howToGet.fr : title.howToGet.en;
      });
    });
  }
}
