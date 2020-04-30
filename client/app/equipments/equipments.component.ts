import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EquipmentService } from '../services/equipment.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  private equipments;
  private formattedEquipments = {};

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  ngOnInit(): void {
    this.getEquipments();
  }

  private getEquipments(): void {
    let lang = this.translateService.currentLang

    this.equipments = this.equipmentService.getEquipmentsForListing();

    Object.keys(this.equipments).forEach(rarity => {
      this.equipmentService.sortByName(this.equipments[rarity], this.translateService)

      this.formattedEquipments[rarity] = [];
      let tableIndex = -1;
      this.equipments[rarity].forEach((equipment, index) => {
        if (index % 4 === 0) {
          tableIndex++;
          this.formattedEquipments[rarity][tableIndex] = [];
        }

        equipment.name = equipment.names[lang]
        this.formattedEquipments[rarity][tableIndex].push(equipment)
      });
    });
  }

  private translateEquipments() {
    let lang = this.translateService.currentLang

    Object.keys(this.formattedEquipments).forEach(rarity => {
      this.formattedEquipments[rarity].forEach(line => {
        line.forEach(equipment => {
          equipment.name = equipment.names[lang]
        });
      });
    });
  }
}
