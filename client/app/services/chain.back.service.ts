import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { ChainService } from './chain.service';

@Injectable()
export class ChainBackService {
  chainService: ChainService;

  private findBestChainsUrl = 'api/find-best-chains';

  constructor(private http: Http) { }

  async findBestFrames() {

    const response = await this.http.post(this.findBestChainsUrl, this.chainService.units).toPromise();
    return response.json();
  }
}
