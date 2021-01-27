import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-illuminati',
  templateUrl: './other.illuminati.component.html',
  styleUrls: ['./other.illuminati.component.css']
})
export class OtherIlluminatiComponent implements AfterViewInit {
  units;
  user;
  isIlluminati = false;
  reviews = {
    units: {},
    cards: {},
    espers: {}
  };

  selectedUnitId = null;
  selectedName = '';

  constructor(
    private unitService: UnitService,
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.getUser();
  }

  ngAfterViewInit() {
    this.authService.$user.subscribe(user => {
      this.user = user;

      if (this.user) {
        this.checkIfIlluminati();
      }
    });
  }

  getUnits() {
    this.units = this.unitService.getUnitsForListing();
  }

  checkIfIlluminati() {
    this.authService.getIlluminty().then(result => {
      if (result) {
        const tableUrl = this.router.url.split('/');
        const possibleSlug = tableUrl[tableUrl.length - 1];
        let findedUnit = null;

        this.getUnits();
        this.units.forEach(unit => {
          this.reviews.units[unit.dataId] = {
            summary: {pros: '', cons: ''},
            pve: {pros: '', cons: ''},
            arena: {pros: '', cons: ''},
            gvg: {pros: '', cons: ''},
            manual: {pros: '', cons: ''},
            comments: {pros: '', cons: ''},
            bigReview: ''
          };

          if (unit.slug === possibleSlug) {
            findedUnit = unit;
          }
        });

        if (findedUnit !== null) {
          this.selectedUnitId = findedUnit.dataId;
          this.selectedName = findedUnit.names.en;
        }
      }

      // @ts-ignore
      this.isIlluminati = result;
    });
  }
}
