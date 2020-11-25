import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angulartics2 } from 'angulartics2';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  step = 'login';
  availableSync = [];

  constructor(
    private authService: AuthService,
    private modal: NgbActiveModal
  ) {

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
          this.modal.close();
        }
      } else {
        this.modal.close();
      }
    });
  }

  validateSync() {
    this.authService.firstSync().then(result => {
      this.modal.close();
    });
  }

  dontSync() {
    this.modal.close();
  }

  close() {
    this.modal.dismiss();
  }
}
