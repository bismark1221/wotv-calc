import { Injectable, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
  }

  async getDeviceInfos(type, token) {
    const data = {
      type: type,
      token: token,
      userId: this.authService.getUser().uid
    }

    console.log(await this.apiService.postForLogin('generateDeviceId', data));
  }

  async getLoginData() {
    const data = {
      userId: this.authService.getUser().uid
    }

    console.log(JSON.parse(JSON.stringify(await this.apiService.postForLogin('dumpLogin', data))));
  }
}
