import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-builder-equipment',
  templateUrl: './builder.equipment.component.html',
  styleUrls: ['./builder.equipment.component.css']
})
export class BuilderEquipmentComponent implements OnInit {
  @Input() public equipment;
  @Input() public fromUnitBuilder = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  selectedId
  equipments

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private modalService: NgbModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getEquipments();
    });
  }

  ngOnInit(): void {
    this.getEquipments();
  }

  private getEquipments() {
    this.equipments = this.equipmentService.getEquipmentsForBuilder();
    this.equipments = [...this.equipments];
  }

  selectEquipment() {
    if (this.selectedId) {
      this.equipment = this.equipmentService.selectEquipmentForBuilder(this.selectedId)
    } else {
      this.equipment = null;
    }
  }

  changeUpgrade() {
    this.equipmentService.changeUpgrade()
  }

  changeGrow() {
    this.equipmentService.changeGrow()
  }

  changeSkillLevel() {
    this.equipmentService.changeSkillLevel()
  }

  save() {
    this.equipmentService.saveEquipment(this.equipment)
  }

  close() {
    this.modalService.dismissAll();
  }
}
