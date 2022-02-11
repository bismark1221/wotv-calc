import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { CardService } from './card.service';
import { EsperService } from './esper.service';
import { UnitService } from './unit.service';
import { EquipmentService } from './equipment.service';
import { GuildService } from './guild.service';

@Injectable({
  providedIn: 'root'
})

export class InventoryService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private cardService: CardService,
    private esperService: EsperService,
    private unitService: UnitService,
    private equipmentService: EquipmentService,
    private guildService: GuildService,
    private localStorageService: LocalStorageService,
    private firestore: AngularFirestore
  ) {
  }

  async getInventory(user) {
    const apiResult = await this.apiService.loadData('inventory', user.uid);

    return apiResult;
  }

  async getInventoryFromId(inventoryId) {
    const apiResult = await this.apiService.loadData('inventory', inventoryId, [{name: 'fromShareId', value: 1}]);

    return apiResult;
  }

  saveInventory(data) {
    this.apiService.post('inventory', data);
  }
}
