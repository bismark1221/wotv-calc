import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { Angulartics2 } from 'angulartics2';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {


  constructor(
    private authService: AuthService,
    private modal: NgbActiveModal
  ) {

  }

  ngOnInit() {
  }

  login(provider) {
    this.authService.login(provider).then(user => {
      this.modal.close(user)
    })
  }
}
