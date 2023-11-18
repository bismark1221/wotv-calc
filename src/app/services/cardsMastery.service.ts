import { Injectable } from '@angular/core';

import { NavService } from './nav.service';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable()
export class CardsMasteryService {
  constructor(
    private apiService: ApiService,
    private navService: NavService,
    private authService: AuthService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('cardsMastery', param, extraQuery)));
  }

  private async getApiUser(extra = null) {
    return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'cardsMastery', data: extra})));
  }

  async getCardsMastery() {
    return await this.getApi();
  }
}
