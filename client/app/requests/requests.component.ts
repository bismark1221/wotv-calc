import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';

import { BackService } from '../services/back.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requests: any[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private backService: BackService,
  ) { }

  private getRequests(): void {
    this.requests = this.localStorageService.get<any[]>('requests') ? this.localStorageService.get<any[]>('requests') : [];
    this.sortRequests();
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

  private localSaveRequests() {
    this.sortRequests();
    this.localStorageService.set('requests', this.requests);
  }

  ngOnInit() {
    this.getRequests();
    this.findBest();
  }

  async findBest() {
    //this.backService.chainService = this.chainService;
    let result = await this.backService.findBestFrames();
    console.log(result)
  }
}
