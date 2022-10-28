import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { SimpleModalService } from 'ngx-simple-modal';
import { v5 as uuidv5 } from 'uuid';

import { InventoryService } from '../services/inventory.service';
import { AuthService } from '../services/auth.service';
import { ToolService } from '../services/tool.service';

import { ModalLinkComponent } from '../builder/modal/modal.link.component';
import { ModalInventoryEquipmentsComponent } from './modal/modal.inventory.equipments.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit, AfterViewInit {
  user;

  rawUnits = [];
  rawCards = [];
  rawEspers = [];
  rawEquipments = [];

  units = [];
  cards = [];
  espers = [];

  inventory = {
    units: {},
    espers: {},
    cards: {},
    equipments: [],
    uuid: null
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
  inventoryFromId = false;
  countUserUpdate = 0;

  constructor(
    private inventoryService: InventoryService,
    private toolService: ToolService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private simpleModalService: SimpleModalService
  ) {}

  async ngOnInit() {
    ['80', '99', '120'].forEach(max => {
      this.tableLevels[max] = [];
      for (let i = 0; i <= Number(max); i++) {
        this.tableLevels[max].push(i);
      }
    });

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      if (params.get('inventoryId')) {
        this.inventoryFromId = true;
        await this.getInventory(params.get('inventoryId'));
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$user.subscribe(async user => {
        if (user && !this.inventoryFromId) {
          this.user = user;
          await this.getInventory();
        } else if (!user && !this.inventoryFromId) {
          if (this.countUserUpdate > 0) {
            this.loading = false;

            this.user = null;

            this.rawUnits = [];
            this.rawCards = [];
            this.rawEspers = [];
            this.rawEquipments = [];

            this.units = [];
            this.cards = [];
            this.espers = [];

            this.inventory = {
              units: {},
              espers: {},
              cards: {},
              equipments: [],
              uuid: null
            };
          } else {
            this.countUserUpdate++;
          }
        }
      });
    });
  }

  async getInventory(userShareId = null) {
    let result = null;
    if (!userShareId) {
      result = await this.inventoryService.getInventory(this.user);
    } else {
      result = await this.inventoryService.getInventoryFromId(userShareId);
    }

    if (result.units) {
      const rawUnits = result.units;
      const filteredUnits = [];
      for (const unit of rawUnits) {
        if (!unit.fromOtherVersion) {
          filteredUnits.push(unit);
        }
      }
      this.rawUnits = filteredUnits;

      const rawCards = result.cards;
      const filteredCards = [];
      for (const card of rawCards) {
        if (!card.fromOtherVersion) {
          filteredCards.push(card);
        }
      }
      this.rawCards = filteredCards;

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
          equipments: [],
          uuid: null
        };
      } else {
        let equipments = [];

        if (result.inventory.equipments) {
          result.inventory.equipments.forEach(rawEquipment => {
            const findedEquipment = this.rawEquipments.find(searchedEquipment => searchedEquipment.dataId === rawEquipment.dataId);
            if (findedEquipment) {
              const newEquipment = JSON.parse(JSON.stringify(findedEquipment));

              newEquipment.grow = rawEquipment.grow;
              newEquipment.upgrade = rawEquipment.upgrade;
              newEquipment.level = rawEquipment.level;
              newEquipment.growIds = Object.keys(newEquipment.grows);
              newEquipment.name = this.toolService.getName(newEquipment);

              equipments.push(newEquipment);
            }
          });

          equipments = this.toolService.sortByRarity(equipments);

          equipments.forEach((equipment, equipmentIndex) => {
            equipment.equipmentIndex = equipmentIndex;
          });
        }

        this.inventory = {
          units: result.inventory.units ? result.inventory.units : {},
          espers: result.inventory.espers ? result.inventory.espers : {},
          cards: result.inventory.cards ? result.inventory.cards : {},
          equipments: equipments,
          uuid: result.inventory.uuid
        };
      }
    }

    this.loading = false;
  }

  translate() {
    ['units', 'cards', 'espers'].forEach(type => {
      this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)].forEach(item => {
        item.name = this.toolService.getName(item);
      });
      this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)] = this.toolService.sortByRarity(this['raw' + type.slice(0, 1).toUpperCase() + type.slice(1, type.length)]);
    });
  }

  ownItem(dataId, type) {
    if (!this.inventory[type][dataId]) {
      this.inventory[type][dataId] = 1;
      this.save();
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

  updateEquipment(equipment) {
    this.openEquipmentsModal(equipment);
  }

  openEquipmentsModal(loadedEquipment = null) {
    let equipment = null;
    let modalStep = 'select';

    if (loadedEquipment) {
      equipment = JSON.parse(JSON.stringify(loadedEquipment));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalInventoryEquipmentsComponent, { equipment: equipment, modalStep: modalStep })
      .subscribe(async (loadEquipment) => {
        if (loadEquipment !== 'close' && loadEquipment !== undefined) {
          if (loadedEquipment) {
            if (loadEquipment) {
              this.inventory.equipments[loadedEquipment.equipmentIndex] = loadEquipment;
            } else {
              this.inventory.equipments.splice(loadedEquipment.equipmentIndex, 1);
            }
          } else {
            this.inventory.equipments.push(loadEquipment);
          }

          this.inventory.equipments = this.toolService.sortByRarity(this.inventory.equipments);
          this.inventory.equipments.forEach((newEquipment, equipmentIndex) => {
            newEquipment.equipmentIndex = equipmentIndex;
          });

          this.save();

        }
      });
  }

  save() {
    if (this.user) {
      let uuid = '';
      if (this.inventory.uuid) {
        uuid = this.inventory.uuid;
      } else {
        uuid = uuidv5(this.user.uid, uuidv5.URL);
        this.inventory.uuid = uuid;
      }

      const dataToSave = {
        units: this.inventory.units,
        cards: this.inventory.cards,
        espers: this.inventory.espers,
        equipments: [],
        user: this.user.uid,
        uuid: uuid
      };

      this.inventory.equipments.forEach(equipment => {
        dataToSave.equipments.push({
          dataId: equipment.dataId,
          upgrade: equipment.upgrade,
          grow: equipment.grow,
          level: equipment.level
        });
      });

      this.inventoryService.saveInventory(dataToSave);
    }
  }

  openLinkModal() {
    let uuid = '';
    if (this.inventory.uuid) {
      uuid = this.inventory.uuid;
    } else {
      uuid = uuidv5(this.user.uid, uuidv5.URL);
      this.inventory.uuid = uuid;
    }

    this.simpleModalService.addModal(ModalLinkComponent, { type: 'inventory', item: uuid });
  }
}
