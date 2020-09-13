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

  searchText = "";
  filters = {
    rarity: [],
    category: []
  }
  savedEquipments = {}
  loadEquipmentId = null

  @Input() public unit;
  @Input() public equipmentPos;
  @Input() public modalStep = "select";
  @Input() public equipment

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

  ngOnInit() {
    this.getEquipments();
  }

  getEquipments() {
    this.equipments = this.unit.getAvailableEquipments(this.equipmentPos, this.equipmentService)
    this.equipments = this.equipmentService.filterEquipments(this.equipments, this.filters)
    this.getFilteredEquipments()
    this.translateEquipments()

    this.savedEquipments = this.equipmentService.getSavedEquipments()
  }

  private translateEquipments() {
    this.equipments.forEach(equipment => {
      equipment.name = this.nameService.getName(equipment)
    });
  }

  getFilteredEquipments() {
    if (this.searchText !== "") {
      let text = this.searchText.toLowerCase();
      return this.equipments.filter(equipment => {
        return equipment.name.toLowerCase().includes(text);
      });
    } else {
      return this.equipments
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      this.filters[type].push(value)
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1)
    }

    this.getEquipments()
  }

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      return false
    } else {
      return true
    }
  }

  close() {
    this.modal.dismiss();
  }

  back() {
    this.modalStep = "select"
  }

  selectEquipment(equipmentId, customData = null, forceNewBuild = false) {
    if (!forceNewBuild && !customData && this.savedEquipments[equipmentId] && this.savedEquipments[equipmentId].length > 0) {
      this.loadEquipmentId = equipmentId

      this.modalStep = "load"
    } else {
      this.equipment = this.equipmentService.selectEquipmentForBuilder(equipmentId, customData)

      this.modalStep = "custom"
    }
  }

  selectUpgrade(upgrade) {
    this.equipment.upgrade = upgrade
    this.equipmentService.changeUpgrade(this.equipment)
  }

  selectGrow(grow) {
    this.equipment.grow = grow
    this.equipmentService.changeGrow(this.equipment)
  }

  changeLevel() {
    this.equipmentService.changeLevel(this.equipment)
  }

  changeSkillLevel() {
    this.equipmentService.changeSkillLevel(this.equipment)
  }

  save() {
    this.modal.close(this.equipment)
  }
}
