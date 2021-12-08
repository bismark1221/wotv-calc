import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { InventoryService } from '../services/inventory.service';
import { AuthService } from '../services/auth.service';
import { ToolService } from '../services/tool.service';

import { ModalInventoryEquipmentsComponent } from './modal/modal.equipments';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  user;

  rawUnits = [];
  rawCards = [];
  rawEspers = [];
  rawEquipments = [];

  units = [];
  cards = [];
  espers = [];
  equipments = [];

  inventory = {
    units: {},
    espers: {},
    cards: {},
    equipments: []
  };

  searchText = {
    units: '',
    cards: '',
    espers: '',
    equipments: ''
  };

  filterOwnedItems = {
    units: null,
    cards: null,
    espers: null,
    equipments: null
  };

  tableLevels = {};

  loading = true;

  constructor(
    private inventoryService: InventoryService,
    private toolService: ToolService,
    private authService: AuthService,
    private modalService: NgbModal
  ) {}

  async ngOnInit() {
    ['80', '99', '120'].forEach(max => {
      this.tableLevels[max] = [];
      for (let i = 0; i <= Number(max); i++) {
        this.tableLevels[max].push(i);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$user.subscribe(async user => {
        if (user) {
          this.user = user;
          await this.getInventory();
        }
      });
    });
  }

  async getInventory(userShareId = null) {
    this.loading = true;
    const result = await this.inventoryService.getInventory(this.user);

    if (result.units) {
      this.rawUnits = result.units;
      this.rawCards = result.cards;
      this.rawEspers = result.espers;
      this.rawEquipments = result.equipments;

      this.translate();
      this.filterItems('units');
      this.filterItems('cards');
      this.filterItems('espers');

      if (!result.inventory) {
        this.inventory = {
          units: {},
          espers: {},
          cards: {},
          equipments: []
        };
      } else {
        this.inventory = result.inventory;
      }
    }

    this.loading = false;
  }

  translate() {
    ['units', 'cards', 'espers', 'equipments'].forEach(type => {
      this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)].forEach(item => {
        item.name = this.toolService.getName(item);
      });
      this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)] = this.toolService.sortByRarity(this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)]);
    });
  }

  ownItem(dataId, type) {
    if (!this.inventory[type][dataId]) {
      this.inventory[type][dataId] = 1;
    }
  }

  isFilterSelected(type, value) {
    return this.filterOwnedItems[type] === value;
  }

  filterList(type, value) {
    if (this.filterOwnedItems[type] === value) {
      this.filterOwnedItems[type] = null;
    } else {
      this.filterOwnedItems[type] = value;
    }

    this.filterItems(type);
  }

  filterItems(type) {
    if (this.filterOwnedItems[type] === false || this.filterOwnedItems[type] === true)  {
      const items = [];
      this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)].forEach(item => {
        if ((this.inventory[type][item.dataId] && this.filterOwnedItems[type] === true)
          || (!this.inventory[type][item.dataId] && this.filterOwnedItems[type] === false)) {
          items.push(item);
        }
      });
      this[type] = items;
    } else {
      this[type] = this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)];
    }
  }

  getFilteredItems(type) {
    if (type === 'equipments') {
      if (this.searchText[type] !== '') {
        const text = this.searchText[type].toLowerCase();
        return this.inventory[type].filter(item => {
          return item.name.toLowerCase().includes(text) || item.slug.toLowerCase().includes(text);
        });
      } else {
        return this.inventory[type];
      }
    } else {
      if (this.searchText[type] !== '') {
        const text = this.searchText[type].toLowerCase();
        return this[type].filter(item => {
          return item.name.toLowerCase().includes(text) || item.slug.toLowerCase().includes(text);
        });
      } else {
        return this[type];
      }
    }
  }

  addEquipment() {
    this.openEquipmentsModal();
  }

  save() {
    const dataToSave = {
      units: this.inventory.units,
      cards: this.inventory.cards,
      espers: this.inventory.espers,
      equipments: []
    };

    console.log(dataToSave);

    this.inventoryService.saveInventory(dataToSave);
  }

  openEquipmentsModal(loadedEquipment = null) {
    const modalRef = this.modalService.open(ModalInventoryEquipmentsComponent, { windowClass: 'builder-modal' });

    if (loadedEquipment) {
      modalRef.componentInstance.equipment = JSON.parse(JSON.stringify(loadedEquipment));
      modalRef.componentInstance.modalStep = 'custom';
    }

    modalRef.result.then((equipment) => {
      if (loadedEquipment) {
        loadedEquipment = equipment;
      } else {
        this.inventory.equipments.push(equipment);
      }

      console.log(this.inventory.equipments);

    }, (reason) => {
    });
  }
}
