import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';

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
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getEspers();
  }

  private getEspers(): void {
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

        this.formattedEspers[rarity][tableIndex].push(esper)
      });
    });
  }
}
