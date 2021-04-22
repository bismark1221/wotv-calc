import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EquipmentService } from '../services/equipment.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  equipments = [];
  acquisitionTypes;
  searchText = '';
  sort = 'rarity';
  order = 'asc';
  filters = {
    rarity: [],
    type: [],
    acquisition: []
  };
  isCollapsedRarity = false;
  isCollapsedType = false;
  isCollapsedAcquisition = false;

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Equipment');

    await this.getAcquisitionTypes();
    await this.getEquipments();
  }

  async getEquipments() {
    this.equipments = await this.equipmentService.getEquipmentsForListing(this.filters, this.sort, this.order);
    this.translateEquipments();
  }

  private translateEquipments() {
    this.equipments.forEach(equipment => {
      equipment.name = this.nameService.getName(equipment);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredEquipments() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.equipments.filter(equipment => {
        return equipment.name.toLowerCase().includes(text) || equipment.slug.toLowerCase().includes(text);
      });
    } else {
      return this.equipments;
    }
  }

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    await this.getEquipments();
  }

  async getAcquisitionTypes() {
    this.acquisitionTypes = await this.equipmentService.getAcquisitionTypes();
    this.acquisitionTypes.forEach(type => {
      if (type !== 'Unknown') {
        this.filters.acquisition.push(type);
      }
    });
  }

  isAcquisitionChecked(type) {
    if (this.filters.acquisition.indexOf(type) !== -1) {
      return true;
    }

    return false;
  }

  async unselectAllType() {
    this.filters.acquisition = [];
    await this.getEquipments();
  }
}
