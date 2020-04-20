import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';


@Component({
  selector: 'app-espers',
  templateUrl: './espers.component.html',
  styleUrls: ['./espers.component.css']
})
export class EspersComponent implements OnInit {

  constructor(
  ) {}

  ngOnInit(): void {
  }
}
