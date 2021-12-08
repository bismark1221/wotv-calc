import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/firestore';

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
    console.log(user);
    const apiResult = await this.apiService.loadData('inventory', user.uid);

    console.log(apiResult);

    return apiResult;
  }

  saveInventory(data) {
    this.apiService.postForLogin('inventory', data);
  }

  /*async userHaveDevice(loadingType) {
    const data = {
      userId: this.authService.getUser().uid
    };

    const apiResult = await this.apiService.postForLogin('userHaveDevice', data);
    this.loading[loadingType] = false;

    if (apiResult.result === true) {
      return true;
    } else {
      return false;
    }
  }*/
}
