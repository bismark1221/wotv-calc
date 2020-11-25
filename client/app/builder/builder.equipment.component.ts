import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../services/equipment.service';
import { NameService } from '../services/name.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';

import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';

@Component({
  selector: 'app-builder-equipment',
  templateUrl: './builder.equipment.component.html',
  styleUrls: ['./builder.equipment.component.css']
})
export class BuilderEquipmentComponent implements OnInit {
  equipment;
  filteredEquipments;
  equipments;
  searchText = '';
  savedEquipments = {};
  loadingBuild = false;
  showSave = false;
  showList = true;

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private nameService: NameService,
    private authService: AuthService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  ngOnInit() {
    this.getEquipments();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const data = params.get('data');
      if (data) {
        this.loadingBuild = true;

        const equipment = this.equipmentService.getEquipmentBySlug(data);
        if (equipment) {
          this.selectEquipment(equipment.dataId);
        } else {
          this.equipmentService.getStoredEquipment(data).subscribe(equipmentData => {
            if (equipmentData) {
              // @ts-ignore
              this.selectEquipment(equipmentData.dataId, equipmentData);
            }
          });
        }

        this.loadingBuild = false;
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

  private getEquipments() {
    this.equipments = this.formatEquipments(this.equipmentService.getEquipmentsForListing());
    this.updateFilteredEquipments();
    this.translateEquipments();

    this.savedEquipments = this.equipmentService.getSavedEquipments();
  }

  private translateEquipments() {
    Object.keys(this.equipments).forEach(rarity => {
      this.equipments[rarity].forEach(equipment => {
        equipment.name = this.nameService.getName(equipment);
      });
    });
  }

  private formatEquipments(equipments) {
    const formattedEquipments = { UR: [], MR: [], SR: [], R: [], N: [] };

    equipments.forEach(equipment => {
      formattedEquipments[equipment.rarity].push(equipment);
    });

    return formattedEquipments;
  }

  updateFilteredEquipments() {
    const text = this.searchText.toLowerCase();
    this.filteredEquipments = { UR: [], MR: [], SR: [], R: [], N: [] };

    Object.keys(this.equipments).forEach(rarity => {
      this.filteredEquipments[rarity] = this.equipments[rarity].filter(equipment => {
        return equipment.name.toLowerCase().includes(text);
      });
    });
  }

  focusSearch() {
    if (!this.showList) {
      this.updateFilteredEquipments();
      this.showList = true;
    }
  }

  blurSearch() {
    if (this.equipment) {
      this.searchText = this.equipment.name;
      this.showList = false;
    }
  }

  selectEquipment(dataId, customData = null) {
    if (dataId) {
      this.equipment = this.equipmentService.selectEquipmentForBuilder(dataId, customData);
      this.searchText = this.equipment.name;
      this.showList = false;
    } else {
      this.equipment = null;
      this.searchText = '';
      this.updateFilteredEquipments();
      this.showList = true;
    }
  }

  toogleList() {
    this.showList = !this.showList;
  }

  selectUpgrade(upgrade) {
    this.equipment.upgrade = upgrade;
    this.equipmentService.changeUpgrade(this.equipment);
  }

  selectGrow(grow) {
    this.equipment.grow = grow;
    this.equipmentService.changeGrow(this.equipment);
  }

  changeLevel() {
    this.equipmentService.changeLevel(this.equipment);
  }

  changeSkillLevel() {
    this.equipmentService.changeSkillLevel(this.equipment);
  }

  openLoadModal(equipmentId) {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'equipment';
    modalRef.componentInstance.savedItems = this.savedEquipments[equipmentId];

    modalRef.result.then(result => {
      if (result.type == 'load' && result.item) {
        this.selectEquipment(result.item.dataId, result.item);
      }

      if (result.type == 'fullDelete') {
        this.savedEquipments[equipmentId] = [];
      }
    }, (reason) => {
    });
  }

  openSaveModal() {
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'equipment';
    modalRef.componentInstance.item = this.equipment;

    modalRef.result.then(result => {
      this.savedEquipments = this.equipmentService.getSavedEquipments();
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'equipment';
    modalRef.componentInstance.item = this.equipment;
  }
}
