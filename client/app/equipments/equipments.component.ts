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

  isFilterChecked = {
    rarity: [],
    type: [],
    acquisition: []
  };
  collapsed = {
    rarity: false,
    type: false,
    acquisition: false
  };

  rarities = [
    'UR',
    'MR',
    'SR',
    'R',
    'N'
  ];
  weapons = [
    'AXE',
    'BOOK',
    'BOW',
    'DAGGER',
    'FIST',
    'GLOVE',
    'GREATSWORD',
    'GUN',
    'KATANA',
    'MACE',
    'NINJABLADE',
    'ROD',
    'SPEAR',
    'SWORD'
  ];
  armors = [
    'ARMOR',
    'CLOTH',
    'HAT',
    'HELM',
    'SHIELD'
  ];

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

    if (sessionStorage.getItem('equipmentFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('equipmentFilters'));
    }
    if (sessionStorage.getItem('equipmentCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('equipmentCollapsed'));
    }

    this.filterChecked();

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

    sessionStorage.setItem('equipmentFilters', JSON.stringify(this.filters));

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

  async unselectAllType() {
    this.filters.acquisition = [];

    sessionStorage.setItem('equipmentFilters', JSON.stringify(this.filters));
    this.filterChecked();

    await this.getEquipments();
  }

  filterChecked() {
    this.rarities.forEach(rarity => {
      if (this.filters.rarity.indexOf(rarity) === -1) {
        this.isFilterChecked.rarity[rarity] = false;
      } else {
        this.isFilterChecked.rarity[rarity] = true;
      }
    });

    this.weapons.forEach(weapon => {
      if (this.filters.type.indexOf(weapon) === -1) {
        this.isFilterChecked.type[weapon] = false;
      } else {
        this.isFilterChecked.type[weapon] = true;
      }
    });

    this.armors.forEach(armor => {
      if (this.filters.type.indexOf(armor) === -1) {
        this.isFilterChecked.type[armor] = false;
      } else {
        this.isFilterChecked.type[armor] = true;
      }
    });

    if (this.filters.type.indexOf('ACC') === -1) {
      this.isFilterChecked.type['ACC'] = false;
    } else {
      this.isFilterChecked.type['ACC'] = true;
    }

    this.acquisitionTypes.forEach(acquisition => {
      if (this.filters.acquisition.indexOf(acquisition) === -1) {
        this.isFilterChecked.acquisition[acquisition] = false;
      } else {
        this.isFilterChecked.acquisition[acquisition] = true;
      }
    });
  }

  toogleCollapse(section) {
    this.collapsed[section] = !this.collapsed[section];
    sessionStorage.setItem('equipmentCollapsed', JSON.stringify(this.collapsed));
  }
}
