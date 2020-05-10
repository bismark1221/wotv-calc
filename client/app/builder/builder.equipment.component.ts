import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-builder-equipment',
  templateUrl: './builder.equipment.component.html',
  styleUrls: ['./builder.equipment.component.css']
})
export class BuilderEquipmentComponent implements OnInit {
  selectedId
  equipments
  equipment

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getEquipments();
    });
  }

  ngOnInit(): void {
    this.getEquipments();
  }

  private getEquipments() {
    this.equipments = this.equipmentService.getEquipmentsForBuilder(this.translateService);
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
}
