import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class IndexService {
  constructor(
    private apiService: ApiService
  ) {}

  async getUnits() {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('index')));
  }

  async getOneUnit(dataId) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('index', dataId)));
  }
}
