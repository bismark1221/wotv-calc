import { Injectable, NgZone } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  constructor(
    private apiService: ApiService
  ) {
  }

  async getInventory(user) {
    const apiResult = await this.apiService.get('inventory', user.uid);

    return apiResult;
  }

  async getInventoryFromId(inventoryId) {
    const apiResult = await this.apiService.get('inventory', inventoryId, [{name: 'fromShareId', value: 1}]);

    return apiResult;
  }

  saveInventory(data) {
    this.apiService.post('inventory', data);
  }
}
