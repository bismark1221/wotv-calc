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

  loadingHaveDevice = true;
  loadingUploadDevice = false;
  loadingData = false;
  loadingDeleteDevice = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  async ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$user.subscribe(async user => {
        if (user) {
          await this.userHaveDevice();
        }
        this.loadingHaveDevice = false;
      });
    });
  }

  async userHaveDevice() {
    this.haveDevice = await this.userService.userHaveDevice();
  }

  async getLoginInfos(type) {
    this.loadingUploadDevice = true;
    this.haveDevice = await this.userService.getDeviceInfos(type, this.token);
    this.loadingUploadDevice = false;
  }

  async deleteLoginInfos() {
    this.loadingDeleteDevice = true;
    this.haveDevice = await this.userService.deleteLoginInfos();
    await this.userHaveDevice();
    this.loadingDeleteDevice = false;
  }

  async getLoginData() {
    this.loadingData = true;
    this.dumpResult = await this.userService.getLoginData();
    this.loadingData = false;

    console.log(this.dumpResult);
  }
}
