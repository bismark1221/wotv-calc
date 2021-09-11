import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  token;
  dumpResult;
  haveDevice;

  loading;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.loading = this.userService.getLoading();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$user.subscribe(async user => {
        if (user) {
          await this.userHaveDevice('haveDevice');
        }
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
    this.dumpResult = await this.userService.getLoginData();

    await this.userService.deleteSavedGuildMR('guild');
    await this.userService.saveNewGuildMR(this.dumpResult.guild, 'guild');

    await this.userService.deleteSavedGuildMR('masterRank');
    await this.userService.saveNewGuildMR(this.dumpResult.masterRanks, 'masterRank');

    for (const type of ['cards', 'espers', 'units', 'equipments']) {
      await this.userService.deleteAllSaved(type);
      await this.userService.saveNewData(this.dumpResult[type], type);
    }
  }
}
