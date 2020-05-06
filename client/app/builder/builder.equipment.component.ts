import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-builder-equipment',
  templateUrl: './builder.equipment.component.html',
  styleUrls: ['./builder.equipment.component.css']
})
export class BuilderEquipmentComponent implements OnInit {
  equipments;
  equipment
  tableLevels
  stats

  statsType = ["HP", "ATK", "MAG"]

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private skillService: SkillService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
    });
  }

  ngOnInit(): void {
    this.getEquipments();
  }

  private getEquipments() {
    this.equipments = this.equipmentService.getEquipmentsForBuilder(this.translateService);
    this.translateEquipments();
  }

  private translateEquipments() {
    let lang = this.translateService.currentLang

    this.equipments.forEach(equipment => {
      equipment.name = equipment.names[lang]
    });

    this.equipments = [...this.equipments];
  }

  selectEquipment() {
    let lang = this.translateService.currentLang
    this.equipment.name = this.equipment.names[lang]
    this.equipment.star = 0;
    this.equipment.level = 1;

    this.initiateSavedEquipment()

    this.updateMaxLevel();
    this.changeLevels()

    console.log(this.equipment)
  }

  private initiateSavedEquipment() {
    let savedEquipments = this.equipmentService.getSavedEquipments()
    let equipment = savedEquipments[this.equipment.dataId]

    if (equipment) {
      this.equipment.star = equipment.star;
      this.equipment.level = equipment.level;
    }
  }

  private changeStar() {
    this.updateMaxLevel();
    this.changeLevels()
  }

  private updateMaxLevel() {
   /* this.equipment.maxLevel = this.levelPerStar[this.equipment.rarity][this.equipment.star];

    if (this.equipment.level > this.equipment.maxLevel) {
      this.equipment.level = this.equipment.maxLevel
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.equipment.maxLevel; i++) {
      this.tableLevels.push(i);
    }*/
  }

  private changeLevels() {
    /*this.stats = {}
    let maxLevel = this.levelPerStar[this.equipment.rarity][4]

    this.statsType.forEach(stat => {
      let min = this.equipment.stats[stat].min
      let max = this.equipment.stats[stat].max

      this.stats[stat] = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.equipment.level - 1)))
    })*/
  }


  consoleLog() {
    this.equipmentService.saveEquipment(this.equipment)
  }
}
