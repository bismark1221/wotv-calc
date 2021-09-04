import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  token;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {}

  getLoginInfos(type) {
    this.userService.getDeviceInfos(type, this.token);
  }
}
