import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { TitleService } from '../services/title.service';
import { NameService } from '../services/name.service';


@Component({
  selector: 'app-titles',
  templateUrl: './other.titles.component.html',
  styleUrls: ['./other.titles.component.css']
})
export class OtherTitlesComponent implements OnInit {
  titles = {
    player: [],
    guild: []
  }

  constructor(
    private titleService: TitleService,
    private translateService: TranslateService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatTitles();
    });
  }

  ngOnInit() {
    this.titles = this.titleService.getTitles()
    this.formatTitles()
  }

  private formatTitles() {
    let types = ['player', 'guild']
    types.forEach(type => {
      this.titles[type].forEach(title => {
        title.name = this.nameService.getName(title)
        title.translatedHowToGet = title.howToGet.fr && this.translateService.currentLang == "fr" ? title.howToGet.fr : title.howToGet.en
      });
    })
  }
}
