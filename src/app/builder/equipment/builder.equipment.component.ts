import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../../services/equipment.service';
import { ToolService } from '../../services/tool.service';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

import { BuilderModalLoadComponent } from '../modal/load/builder.modal.load.component';
import { BuilderModalSaveComponent } from '../modal/save/builder.modal.save.component';
import { BuilderModalMateriaComponent } from '../modal/materia/builder.modal.materia.component';

import { SharedLinkModalComponent } from '../../shared/linkModal/shared.linkModal.component';

@Component({
  selector: 'app-builder-equipment',
  templateUrl: './builder.equipment.component.html',
  styleUrls: ['./builder.equipment.component.css']
})
export class BuilderEquipmentComponent implements OnInit, AfterViewInit {
  equipments = [];
  rawEquipments = [];
  equipment;
  savedEquipments = {};
  loadingBuild = false;
  showSave = false;
  selectedEquipmentId = null;
  skillLevel = 1;

  showOnlyOtherVersion = false;

  version = 'GL';

  @ViewChild('selectBuilderEquipment') equipmentSelector;

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  upgradeTable = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private simpleModalService: SimpleModalService,
    private toolService: ToolService,
    private authService: AuthService,
    private navService: NavService
  ) {
    this.version = this.navService.getVersion();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  async ngOnInit() {
    await this.getEquipments();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        this.loadingBuild = true;

        const equipment = await this.equipmentService.selectEquipmentForBuilder(null, false, data);

        if (equipment) {
          this.selectedEquipmentId = equipment.dataId;
          this.equipment = equipment;

          if (this.equipment.skills.length > 1) {
            this.upgradeTable = [];
            for (let i = 0; i <= this.equipment.skills.length - 1; i++) {
              this.upgradeTable.push(i);
            }
          }

          this.loadingBuild = false;
        } else {
          const equipmentData = await this.equipmentService.getStoredEquipment(data);
          if (equipmentData) {
            this.selectedEquipmentId = equipmentData.dataId;
            await this.selectEquipment(equipmentData, true);
            this.equipment.storeId = data;
          }
          this.loadingBuild = false;
        }
      } else {
        this.equipmentSelector.open();
      }
    });

    this.navService.setSEO('Equipment Builder', 'Build your equipment to see the result before using all your resources in-game. Save them to use them in the unit and team builders.');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedEquipments = this.equipmentService.getSavedEquipments();
      });
    });

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      });
    });
  }

  private async getEquipments() {
    this.rawEquipments = await this.equipmentService.getEquipmentsForBuilder();
    this.savedEquipments = this.equipmentService.getSavedEquipments();
    this.translateEquipments();
    this.filterEquipments();
  }

  private translateEquipments() {
    this.rawEquipments.forEach(equipment => {
      equipment.name = this.toolService.getName(equipment);
    });
  }

  private filterEquipments() {
    this.equipments = [];
    for (const equipment of this.rawEquipments) {
      if ((this.showOnlyOtherVersion && equipment.fromOtherVersion)
        || (!this.showOnlyOtherVersion && !equipment.fromOtherVersion)
      ){
        this.equipments.push(equipment);
      }
    }
  }

  async selectEquipment(customData = null, fromModal = false) {
    if (this.selectedEquipmentId) {
      if (!fromModal && this.savedEquipments[this.selectedEquipmentId] && this.savedEquipments[this.selectedEquipmentId].length > 0) {
        this.openLoadModal(this.selectedEquipmentId);
        this.equipmentSelector.handleClearClick();
      } else {
        this.equipment = await this.equipmentService.selectEquipmentForBuilder(this.selectedEquipmentId, customData);

        if (this.equipment.skills.length > 1) {
          this.upgradeTable = [];
          for (let i = 0; i <= this.equipment.skills.length - 1; i++) {
            this.upgradeTable.push(i);
          }
        }
      }
    } else {
      this.equipment = null;
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

  openLoadModal(equipmentId) {
    this.simpleModalService.addModal(BuilderModalLoadComponent, { type: 'equipment', savedItems: this.savedEquipments[equipmentId], allowNew: true })
      .subscribe(async (result) => {
        if (result.type === 'new') {
          this.selectedEquipmentId = equipmentId;
          await this.selectEquipment(null, true);
        }

        if (result.type === 'load' && result.item) {
          this.selectedEquipmentId = result.item.dataId;
          await this.selectEquipment(result.item, true);
        }

        if (result.type === 'fullDelete') {
          this.savedEquipments[equipmentId] = [];
        }
      });
  }

  openSaveModal() {
    this.simpleModalService.addModal(BuilderModalSaveComponent, { type: 'equipment', item: this.equipment })
      .subscribe((isSaved) => {
        if (isSaved) {
          this.savedEquipments = this.equipmentService.getSavedEquipments();
        }
      });
  }

  openLinkModal() {
    this.simpleModalService.addModal(SharedLinkModalComponent, { type: 'equipment', item: this.equipment });
  }

  openMateriaModal(type) {
    let materia = null;
    let modalStep = 'select';
    const equipment = this.equipment;
    const materiaType = type;

    if (this.equipment.materias[type]) {
      materia = JSON.parse(JSON.stringify(this.equipment.materias[type]));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(BuilderModalMateriaComponent, { materia: materia, modalStep: modalStep, equipment: equipment, materiaType: materiaType })
      .subscribe(async (loadMateria) => {
        if (loadMateria !== 'close') {
          this.equipment.materias[type] = loadMateria;

          this.equipmentService.changeMateria(this.equipment);
        }
      });
  }

  toggleOtherVersion() {
    this.showOnlyOtherVersion = !this.showOnlyOtherVersion;

    this.filterEquipments();
  }
}
