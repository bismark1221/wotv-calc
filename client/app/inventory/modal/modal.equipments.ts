import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EquipmentService } from '../../services/equipment.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';

import { ModalMateriaComponent } from '../../builder/modal/modal.materia.component';

@Component({
  selector: 'app-inventory-modal-equipments',
  templateUrl: './modal.equipments.html',
  styleUrls: ['./modal.equipments.css']
})
export class ModalInventoryEquipmentsComponent implements OnInit {
  rawData = {
    equipments: [],
    acquisitionTypes: []
  };
  equipments;
  acquisitionTypes;

  version = 'GL';

  searchText = '';
  filters = {
    rarity: [],
    category: [],
    acquisition: []
  };
  isAcquisitionChecked = [];
  collapsedAcquisition = true;

  @Input() public modalStep = 'select';
  @Input() public equipment;

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private toolService: ToolService,
    private navService: NavService,
    private modalService: NgbModal,
    private modal: NgbActiveModal
  ) {
    this.version = this.navService.getVersion();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  async ngOnInit() {
    await this.getEquipments(true);

    if (this.equipment) {
      this.equipment = await this.equipmentService.selectEquipmentForBuilder(this.equipment.dataId, this.equipmentService.getSavableData(this.equipment));
    }
  }

  async getEquipments(getAcquisitionTypes = false) {
    const result = await this.equipmentService.getEquipmentForInventory();

    this.rawData.equipments = result.rawEquipments;

    this.equipments = result.equipments;
    this.equipments = this.equipmentService.filterEquipments(this.equipments, this.filters);
    this.translateEquipments();
    this.getFilteredEquipments();

    if (getAcquisitionTypes) {
      this.rawData.acquisitionTypes = result.acquisitionTypes;
      this.getAcquisitionTypes(result.acquisitionTypes);
    }
  }

  private translateEquipments() {
    this.equipments.forEach(equipment => {
      equipment.name = this.toolService.getName(equipment);
    });
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

  async getAcquisitionTypes(acquisitionTypes) {
    this.acquisitionTypes = acquisitionTypes;

    this.acquisitionTypes.forEach(type => {
      this.filters.acquisition.push(type);
      this.isAcquisitionChecked[type] = true;
    });
  }

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    await this.getEquipments();
  }

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      return false;
    } else {
      return true;
    }
  }

  async unselectAllType() {
    this.filters.acquisition = [];
    this.acquisitionTypes.forEach(type => {
      this.isAcquisitionChecked[type] = false;
    });

    await this.getEquipments();
  }

  close() {
    this.modal.dismiss();
  }

  back() {
    this.modalStep = 'select';
  }

  async selectEquipment(equipmentId, customData = null, forceNewBuild = false) {
    this.equipment = await this.equipmentService.selectEquipmentForBuilder(equipmentId, customData);
    this.modalStep = 'custom';
  }

  save() {
    this.modal.close(this.equipment);
  }

  removeEquipment() {
    this.modal.close(null);
  }
}
