import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { RaidService } from '../services/raid.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-raids',
  templateUrl: './raids.component.html',
  styleUrls: ['./raids.component.css']
})
export class RaidsComponent implements OnInit {
  private raids;
  formattedRaids = [];

  constructor(
    private raidService: RaidService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateRaids();
    });
  }

  ngOnInit(): void {
    this.getRaids();
  }

  private getRaids(): void {
    let lang = this.translateService.currentLang
    this.raids = this.raidService.getRaids();

    this.formattedRaids = [];
    let tableIndex = -1;
    this.raids.forEach((raid, index) => {
      if (index % 4 === 0) {
        tableIndex++;
        this.formattedRaids[tableIndex] = [];
      }

      raid.name = this.nameService.getName(raid)
      this.formattedRaids[tableIndex].push(raid)
    });
  }

  private translateRaids() {
    let lang = this.translateService.currentLang

    this.formattedRaids.forEach(line => {
      line.forEach(raid => {
        raid.name = this.nameService.getName(raid)
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
