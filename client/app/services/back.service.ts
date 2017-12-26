import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ChainService } from './chain.service';

@Injectable()
export class BackService {
  chainService: ChainService;

  private findBestChainsUrl = 'api/find-best';

  private requestsUrl = 'api/request';

  constructor(private http: Http) { }

  async saveRequest(units: any[], modified: boolean, moving: boolean) {
    let body = {
      modified: modified,
      moving: moving,
      units: this.formatUnitsForRequest(units)
    }

    try {
      const response = await this.http.post(this.requestsUrl, body).toPromise();
      return response.json();
    } catch (error) {
      return error.json();
    }
  }

  private formatUnitsForRequest(units) {
    return units;
  }

  async findBestFrames() {
    try {
      const response = await this.http.get(this.findBestChainsUrl).toPromise();
      return response.json();
    } catch (error) {
      return error.json();
    }
  }
}
