import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-espers',
  templateUrl: './espers.component.html',
  styleUrls: ['./espers.component.css']
})
export class EspersComponent implements OnInit {
  espers;
  searchText = '';
  sort = 'rarity';
  order = 'asc';
  filters = {
    rarity: [],
    element: [],
    threeStars: false
  };
  isCollapsedRarity = false;
  isCollapsedElement = false;
  isCollapsedUpgrade = false;

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Espers');

    await this.getEspers();
  }

  async getEspers() {
    this.espers = await this.esperService.getEspersForListing(this.filters, this.sort, this.order);
    this.translateEspers();
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.nameService.getName(esper);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredEspers() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.espers.filter(unit => {
        return unit.name.toLowerCase().includes(text) || unit.slug.toLowerCase().includes(text);
      });
    } else {
      return this.espers;
    }
  }

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    await this.getEspers();
  }

  async toggleThreeStars() {
    this.filters.threeStars = !this.filters.threeStars;
    await this.getEspers();
  }
}
