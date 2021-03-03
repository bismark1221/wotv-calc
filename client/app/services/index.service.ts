import { Injectable } from '@angular/core';

import { NavService } from './nav.service';
import { DataService } from './data.service';

@Injectable()
export class IndexService {
  constructor(
    private dataService: DataService,
    private navService: NavService
  ) {}

  private getRaw() {
    return this.dataService.loadData('index');
  }

  async getUnits() {
    const raw = JSON.parse(JSON.stringify(await this.getRaw()));

    return raw.units;
  }
}
