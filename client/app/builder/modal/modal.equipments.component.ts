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

  @Input() public unit;
  @Input() public equipmentPos;

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
    this.translateEquipments();
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

  selectEquipment(equipment) {
    this.modal.close(equipment.dataId)
  }
}
