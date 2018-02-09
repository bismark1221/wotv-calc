import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  loading = false;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private unitService: UnitService,
    private backService: BackService,
    private router: Router
  ) {
    this.lang = this.translateService.currentLang;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
      this.getRequests(false);
    });
  }

  private async getRequests(refresh: boolean) {
    let requests = this.requests;
    if (refresh) {
      requests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];

      await Promise.all(requests.map(async (request, index) => {
        if (request && request.status !== 'done' && request.id) {
          this.loading = true;
          let getRequest = await this.backService.getRequest(request.id);
          this.loading = false;

          if (getRequest.id) {
            requests[index] = getRequest;
          } else if (getRequest.code === 404) {
            requests.splice(index, 1);
          } else {
            requests[index].error = true;
          }
        } else if (!request || request.code === 404) {
          requests.splice(index, 1);
        } else if (request.code) {
          requests[index].error = true;
        }
      }));

      this.requests = requests;
      this.localSaveRequests();
    }

    this.getNames();
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
    this.requests.forEach(request => {
      request.units.forEach(unit => {
        if (unit) {
          let fullUnit = this.unitService.getUnit(unit.id);
          unit.name = fullUnit.names[this.lang];
          unit.ability.name = fullUnit.abilities[unit.ability.id - 1].names[this.lang];
        }
      });
    });
  }

  ngOnInit() {
    this.getRequests(true);
  }

  showResult(id: string, type: string) {
    this.router.navigate(['/chain',{request: id, type: type}]);
  }

  async findBest() {
    let result = await this.backService.findBestFrames();
  }
}
