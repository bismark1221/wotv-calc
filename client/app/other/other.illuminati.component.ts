import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { AuthService } from '../services/auth.service';
import { ReviewService } from '../services/review.service';


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

  editMode = true;

  constructor(
    private unitService: UnitService,
    private authService: AuthService,
    private reviewService: ReviewService,
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

  async getUnits() {
    this.units = await this.unitService.getUnitsForListing();
  }

  checkIfIlluminati() {
    this.authService.getIlluminty().then(async result => {
      if (result) {
        const tableUrl = this.router.url.split('/');
        const possibleSlug = tableUrl[tableUrl.length - 1];

        await this.getUnits();
        this.units.forEach(unit => {
          this.reviews.units[unit.dataId] = {
            summary: {pros: '', cons: ''},
            pve: {pros: '', cons: ''},
            arena: {pros: '', cons: ''},
            gvg: {pros: '', cons: ''},
            manual: {pros: '', cons: ''},
            comments: {pros: '', cons: ''},
            bigReview: '',
            unitId: unit.dataId
          };
        });

        this.getReviews();
      }

      // @ts-ignore
      this.isIlluminati = result;
    });
  }

  getReviews() {
    this.reviewService.getStoredReviews('unit').subscribe(reviews => {
      reviews.forEach(review => {
        // @ts-ignore
        this.reviews.units[review.unitId] = review;
      });
    });
  }

  saveReview(unitId) {
    this.reviewService.saveReview(this.reviews.units[unitId], 'unit').then(storeId => {
      if (storeId) {
        this.reviews.units[unitId].storeId = storeId;
      }
    });
  }

  selectUnit(unitId) {
    this.units.forEach(unit => {
      if (unit.dataId === unitId) {
        this.selectedUnitId = unit.dataId;
        this.selectedName = unit.names.en;
      }
    });
  }

  backToList() {
    this.selectedUnitId = null;
    this.selectedName = '';
  }

  switchMode() {
    this.editMode = !this.editMode;
  }
}
