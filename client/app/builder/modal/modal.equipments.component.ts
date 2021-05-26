import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { EquipmentService } from '../../services/equipment.service';
import { NavService } from '../../services/nav.service';
import { NameService } from '../../services/name.service';

@Component({
  selector: 'app-modal-equipments',
  templateUrl: './modal.equipments.component.html',
  styleUrls: ['./modal.equipments.component.css']
})
export class ModalEquipmentsComponent implements OnInit {
  equipments;
  acquisitionTypes;

  searchText = '';
  filters = {
    rarity: [],
    category: [],
    acquisition: []
  };
  isAcquisitionChecked = [];
  savedEquipments = {};
  loadEquipmentId = null;
  collapsedAcquisition = true;

  @Input() public unit;
  @Input() public equipmentPos;
  @Input() public modalStep = 'select';
  @Input() public equipment;

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private nameService: NameService,
    private modal: NgbActiveModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  async ngOnInit() {
    await this.getEquipments();
    await this.getAcquisitionTypes();

    if (this.equipment) {
      this.equipment = await this.equipmentService.selectEquipmentForBuilder(this.equipment.dataId, this.equipmentService.getSavableData(this.equipment));
    }
  }

  async getEquipments() {
    this.equipments = await this.unit.getAvailableEquipments(this.equipmentPos, this.equipmentService);
    this.equipments = this.equipmentService.filterEquipments(this.equipments, this.filters);
    this.getFilteredEquipments();
    this.translateEquipments();

    this.savedEquipments = this.equipmentService.getSavedEquipments();
  }

  private translateEquipments() {
    this.equipments.forEach(equipment => {
      equipment.name = this.nameService.getName(equipment);
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

  async getAcquisitionTypes() {
    const types = await this.equipmentService.getAcquisitionTypes();
    this.acquisitionTypes = types.acquisitionTypes;
    let unknownIndex = 0;

    this.acquisitionTypes.forEach((type, typeIndex) => {
      if (type !== 'Unknown') {
        this.filters.acquisition.push(type);
        this.isAcquisitionChecked[type] = true;
      } else {
        unknownIndex = typeIndex;
      }
    });

    this.acquisitionTypes.splice(unknownIndex, 1);
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
    if (!forceNewBuild && !customData && this.savedEquipments[equipmentId] && this.savedEquipments[equipmentId].length > 0) {
      this.loadEquipmentId = equipmentId;

      this.modalStep = 'load';
    } else {
      this.equipment = await this.equipmentService.selectEquipmentForBuilder(equipmentId, customData);

      this.modalStep = 'custom';
    }
  }

  updateUpgrade() {
    this.equipmentService.changeUpgrade(this.equipment);
  }

  updateGrow() {
    this.equipmentService.changeGrow(this.equipment);
  }

  changeLevel() {
    this.equipmentService.changeLevel(this.equipment);
  }

  changeSkillLevel() {
    this.equipmentService.changeSkillLevel(this.equipment);
  }

  maxEquipment() {
    this.equipmentService.maxEquipment(this.equipment);
  }

  resetEquipment() {
    this.equipmentService.resetEquipment(this.equipment);
  }

  save() {
    this.modal.close(this.equipment);
  }

  removeEquipment() {
    this.modal.close(null);
  }
}
