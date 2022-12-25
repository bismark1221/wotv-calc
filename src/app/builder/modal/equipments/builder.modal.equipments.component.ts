import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalComponent, SimpleModalService } from 'ngx-simple-modal';

import { EquipmentService } from '../../../services/equipment.service';
import { NavService } from '../../../services/nav.service';
import { ToolService } from '../../../services/tool.service';

import { BuilderModalMateriaComponent } from '../materia/builder.modal.materia.component';

@Component({
  selector: 'app-builder-modal-equipments',
  templateUrl: './builder.modal.equipments.component.html',
  styleUrls: ['./builder.modal.equipments.component.css']
})
export class BuilderModalEquipmentsComponent extends SimpleModalComponent<null, any> implements OnInit {
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
  savedEquipments = {};
  loadEquipmentId = null;
  collapsedAcquisition = true;
  firstClickOutside = false;
  showOnlyOtherVersion = false;

  upgradeTable = [];

  public unit;
  public equipmentPos;
  public modalStep = 'select';
  public equipment;

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private toolService: ToolService,
    private navService: NavService,
    private simpleModalService: SimpleModalService
  ) {
    super();

    this.version = this.navService.getVersion();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  async ngOnInit() {
    await this.getEquipments(true);

    if (this.equipment) {
      this.equipment = await this.equipmentService.selectEquipmentForBuilder(this.equipment.dataId, this.equipmentService.getSavableData(this.equipment));

      if (this.equipment.skills.length > 1) {
        this.upgradeTable = [];
        for (let i = 0; i <= this.equipment.skills.length - 1; i++) {
          this.upgradeTable.push(i);
        }
      }
    }
  }

  async getEquipments(getAcquisitionTypes = false) {
    const result = await this.unit.getAvailableEquipments(this.equipmentPos, this.equipmentService, this.rawData);

    this.rawData.equipments = result.rawEquipments;

    const filteredEquipments = this.equipmentService.filterEquipments(result.equipments, this.filters, 'rarity', 'desc', false);

    this.equipments = [];
    for (const equipment of filteredEquipments) {
      if ((this.showOnlyOtherVersion && equipment.fromOtherVersion)
        || (!this.showOnlyOtherVersion && !equipment.fromOtherVersion)
      ){
        this.equipments.push(equipment);
      }
    }

    this.translateEquipments();
    this.getFilteredEquipments();

    if (getAcquisitionTypes) {
      this.rawData.acquisitionTypes = result.acquisitionTypes;
      this.savedEquipments = this.equipmentService.getSavedEquipments();
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

  back() {
    this.firstClickOutside = false;
    this.modalStep = 'select';
  }

  async selectEquipment(equipmentId, customData = null, forceNewBuild = false) {
    if (!forceNewBuild && !customData && this.savedEquipments[equipmentId] && this.savedEquipments[equipmentId].length > 0) {
      this.loadEquipmentId = equipmentId;

      this.firstClickOutside = false;
      this.modalStep = 'load';
    } else {
      this.equipment = await this.equipmentService.selectEquipmentForBuilder(equipmentId, customData);

      if (this.equipment.skills.length > 1) {
        this.upgradeTable = [];
        for (let i = 0; i <= this.equipment.skills.length - 1; i++) {
          this.upgradeTable.push(i);
        }
      }

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

  closeButton() {
    this.result = 'close';
    this.close();
  }

  save() {
    this.result = this.equipment;
    this.close();
  }

  removeEquipment() {
    this.result = null;
    this.close();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      //this.result = 'close';
      //this.close();
    }
  }

  toggleOtherVersion() {
    this.showOnlyOtherVersion = !this.showOnlyOtherVersion;

    this.getEquipments();
  }

  openMateriaModal(type) {
    let materia = null;
    let modalStep = 'select';
    const equipment = this.equipment;
    const materiaType = type;

    this.firstClickOutside = false;

    if (this.equipment.materias[type]) {
      materia = JSON.parse(JSON.stringify(this.equipment.materias[type]));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(BuilderModalMateriaComponent, { materia: materia, modalStep: modalStep, equipment: equipment, materiaType: materiaType })
      .subscribe(async (loadMateria) => {
        if (loadMateria !== 'close' && loadMateria !== undefined) {
          this.firstClickOutside = false;
          this.equipment.materias[type] = loadMateria;

          this.equipmentService.changeMateria(this.equipment);
        }
      });
  }
}
