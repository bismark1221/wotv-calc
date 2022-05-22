import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { v5 as uuidv5 } from 'uuid';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  token;
  dumpResult;
  haveDevice;

  loading;

  user;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private inventoryService: InventoryService
  ) {}

  async ngOnInit() {
    this.loading = this.userService.getLoading();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$user.subscribe(async user => {
        if (user) {
          this.user = user;
          await this.userHaveDevice('haveDevice');
        }

        this.haveDevice = true;
      });
    });
  }

  async userHaveDevice(loadingType) {
    this.haveDevice = await this.userService.userHaveDevice(loadingType);
  }

  async getLoginInfos(type) {
    this.haveDevice = await this.userService.getDeviceInfos(type, this.token);
  }

  async deleteLoginInfos() {
    this.haveDevice = await this.userService.deleteLoginInfos();
    await this.userHaveDevice('deleteDevice');
  }

  async getLoginData() {
    // await this.userService.addFromInGameEveryWhere();

    this.dumpResult = await this.userService.getLoginData();

    if (this.dumpResult) {
      await this.userService.deleteSavedGuildMR('guild');
      await this.userService.saveNewGuildMR(this.dumpResult.guild, 'guild');

      await this.userService.deleteSavedGuildMR('masterRank');
      await this.userService.saveNewGuildMR(this.dumpResult.masterRanks, 'masterRank');

      for (const type of ['materia', 'cards', 'espers', 'equipments', 'units', 'teams']) {
        await this.userService.deleteAllSaved(type);
        await this.userService.saveNewData(this.dumpResult[type], type);
      }

      await this.updateInventory();
    }
  }

  async updateInventory() {
    if (this.user) {
      const uuid = uuidv5(this.user.uid, uuidv5.URL);

      const dataToSave = {
        units: {},
        cards: {},
        espers: {},
        equipments: [],
        user: this.user.uid,
        uuid: uuid
      };

      for (const type of ['cards', 'espers', 'units']) {
        for (const item of this.dumpResult[type]) {
          dataToSave[type][item.dataId] = item.level;
        }
      }

      this.dumpResult.equipments.forEach(equipment => {
        dataToSave.equipments.push({
          dataId: equipment.dataId,
          upgrade: equipment.upgrade,
          grow: equipment.grow,
          level: equipment.level
        });
      });

      await this.inventoryService.saveInventory(dataToSave);
    }
  }
}
