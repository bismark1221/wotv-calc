import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent extends SimpleModalComponent<null, null> {
  step = 'login';
  availableSync = [];
  firstClickOutside = false;

  constructor(
    private authService: AuthService
  ) {
    super();
  }

  login(provider) {
    this.authService.login(provider).then(result => {
      if (result && result.syncPossible) {
        this.step = 'sync';
        const availableSync = this.authService.getAvailableSync();
        let somethingToSync = false;

        Object.keys(availableSync).forEach(type => {
          if (availableSync[type] && Object.keys(availableSync[type]).length > 0) {
            this.availableSync.push({
              type: type,
              count: Object.keys(availableSync[type]).length
            });
            somethingToSync = true;
          }
        });

        if (!somethingToSync) {
          this.close();
        }
      } else {
        this.close();
      }
    });
  }

  async validateSync() {
    await this.authService.firstSync();
    this.close();
  }

  dontSync() {
    this.close();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.close();
    }
  }
}
