import { Component } from '@angular/core';
import { Angulartics2GoogleAnalytics } from 'angulartics2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(
    angulartics2GoogleAnalytics: Angulartics2GoogleAnalytics,
    translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
