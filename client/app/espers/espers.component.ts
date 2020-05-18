import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-espers',
  templateUrl: './espers.component.html',
  styleUrls: ['./espers.component.css']
})
export class EspersComponent implements OnInit {
  private espers;
  private formattedEspers = {};

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  ngOnInit(): void {
    this.getEspers();
  }

  private getEspers(): void {
    let lang = this.translateService.currentLang
    this.espers = this.esperService.getEspersForListing();

    Object.keys(this.espers).forEach(rarity => {
      this.esperService.sortByName(this.espers[rarity], this.translateService)

      this.formattedEspers[rarity] = [];
      let tableIndex = -1;
      this.espers[rarity].forEach((esper, index) => {
        if (index % 4 === 0) {
          tableIndex++;
          this.formattedEspers[rarity][tableIndex] = [];
        }

        esper.name = esper.names[lang]
        this.formattedEspers[rarity][tableIndex].push(esper)
      });
    });
  }

  private translateEspers() {
    let lang = this.translateService.currentLang

    Object.keys(this.formattedEspers).forEach(rarity => {
      this.formattedEspers[rarity].forEach(line => {
        line.forEach(esper => {
          esper.name = esper.names[lang]
        });
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
