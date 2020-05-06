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
    this.equipment.upgrade = 0;
    this.equipment.level = 1;


    this.initiateSavedEquipment()

    this.updateMaxStat();
    this.changeLevels()

    console.log(this.equipment)
  }

  private initiateSavedEquipment() {
    let savedEquipments = this.equipmentService.getSavedEquipments()
    let equipment = savedEquipments[this.equipment.dataId]

    if (equipment) {
      this.equipment.upgrade = equipment.upgrade;
      this.equipment.stats = equipment.stats;
    }
  }

  private updateMaxStat() {
    let lang = this.translateService.currentLang
    this.equipment.statsTypes = Object.keys(this.equipment.stats)
    this.equipment.growIds = Object.keys(this.equipment.grows)
    this.equipment.countSkills = [];

    this.equipment.skills.forEach(equipmentLvl => {
      this.equipment.countSkills.push(i);

      equipmentLvl.forEach(skill => {
        skill.name = skill.names[lang]
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.equipment, skill, effect);
        });

        if (skill.damage) {
          skill.damageHtml = this.skillService.formatDamage(this.equipment, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.equipment, skill, skill.counter);
        }

        this.skillService.formatRange(this.equipment, skill);
      });
      i++;
    });

    Object.keys(this.equipment.grows).forEach(growId => {
      this.equipment.grows[growId].name = this.equipment.grows[growId].names[lang]
      this.equipment.grows[growId].stats = {};
      this.equipment.statsTypes.forEach(statType => {
        let maxValue = this.equipment.stats[statType].max
        this.equipment.grows[growId].stats[statType] = Math.floor(maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100))
      })
    })
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
