import { Component, OnInit } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { UnitService } from '../services/unit.service';
import { BackService } from '../services/back.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  lang = 'en';
  requests: any[] = [];

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private unitService: UnitService,
    private backService: BackService,
  ) {
    this.lang = this.translateService.currentLang;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
      this.getRequests(false);
    });
  }

  private getRequests(refresh: boolean): void {
    if (refresh) {
      this.requests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];
    }

    this.updateRequests(refresh);

    console.log(this.requests)
  }

  private async updateRequests(refresh: boolean) {
    await Promise.all(this.requests.map(async (request, index) => {
      if (request.status !== 'done' && refresh) {
        this.requests[index] = await this.backService.getRequest(request.id);
      }
    }));

    this.getNames();
    this.localSaveRequests();
  }

  private localSaveRequests() {
    this.sortRequests();
    this.localStorageService.set('requests', this.requests);
  }

  private sortRequests() {
    this.requests.sort((a: any, b: any) => {
      if (a.createdAt < b.createdAt) {
        return -1;
      } else {
        return 1;
      }
    });
  }

  private getNames() {
    this.unitService.getUnits().then(units => {
      this.requests.forEach(request => {
        request.units.forEach(unit => {
          if (unit) {
            let fullUnit = this.unitService.getUnit(unit.id);
            unit.name = fullUnit.names[this.lang];
            unit.ability.name = fullUnit.abilities[unit.ability.id - 1].names[this.lang];
          }
        });
      });
    });
  }

  ngOnInit() {
    this.getRequests(true);
  }

  async findBest() {
    let result = await this.backService.findBestFrames();
    console.log(result)
  }
}
