import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../services/equipment.service';
import { ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';

import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';
import { ModalMateriaComponent } from './modal/modal.materia.component';

@Component({
  selector: 'app-builder-equipment',
  templateUrl: './builder.equipment.component.html',
  styleUrls: ['./builder.equipment.component.css']
})
export class BuilderEquipmentComponent implements OnInit, AfterViewInit {
  equipments = [];
  equipment;
  savedEquipments = {};
  loadingBuild = false;
  showSave = false;
  selectedEquipmentId = null;

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
    private modalService: NgbModal,
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

    this.navService.setTitle('Equipment Builder');
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
    this.equipments = await this.equipmentService.getEquipmentsForBuilder();
    this.savedEquipments = this.equipmentService.getSavedEquipments();
    this.translateEquipments();
  }

  private translateEquipments() {
    this.equipments.forEach(equipment => {
      equipment.name = this.toolService.getName(equipment);
    });
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
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'equipment';
    modalRef.componentInstance.savedItems = this.savedEquipments[equipmentId];
    modalRef.componentInstance.allowNew = true;

    modalRef.result.then(async result => {
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
    }, (reason) => {
    });
  }

  openSaveModal() {
    this.simpleModalService.addModal(ModalSaveComponent, { type: 'equipment', item: this.equipment })
      .subscribe((isSaved) => {
        if (isSaved) {
          this.savedEquipments = this.equipmentService.getSavedEquipments();
        }
      });
  }

  openLinkModal() {
    this.simpleModalService.addModal(ModalLinkComponent, { type: 'equipment', item: this.equipment });
  }

  openMateriaModal(type) {
    const modalRef = this.modalService.open(ModalMateriaComponent, { windowClass: 'builder-modal' });
    modalRef.componentInstance.equipment = this.equipment;
    modalRef.componentInstance.materiaType = type;

    if (this.equipment.materias[type]) {
      modalRef.componentInstance.materia = JSON.parse(JSON.stringify(this.equipment.materias[type]));
      modalRef.componentInstance.modalStep = 'custom';
    }

    modalRef.result.then((materia) => {
      this.equipment.materias[type] = materia;

      this.equipmentService.changeMateria(this.equipment);
    }, (reason) => {
    });
  }
}
