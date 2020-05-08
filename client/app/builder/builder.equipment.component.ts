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
  tableStats = {}

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
    if (this.equipment) {
      let lang = this.translateService.currentLang
      this.equipment.name = this.equipment.names[lang]
      this.equipment.upgrade = 0;
      this.equipment.level = 1;
      if (this.equipment.skills[0] && this.equipment.skills[0][0] && this.equipment.skills[0][0].type == "skill") {
        this.equipment.skills[0][0].level = 1
      }

      this.initiateSavedEquipment()
      this.updateMaxStat()

      this.changeUpgrade(true)
      this.changeGrow()

      console.log(this.equipment)
      console.log(this.tableStats)
    }
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

    this.equipment.skills.forEach(equipmentLvl => {
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
    });

    Object.keys(this.equipment.grows).forEach(growId => {
      this.equipment.grows[growId].name = this.equipment.grows[growId].names[lang]
      this.equipment.grows[growId].stats = {};
      this.equipment.statsTypes.forEach(statType => {
        let maxValue = this.equipment.stats[statType].max
        let growMax = this.equipment.grows[growId].curve[statType] ? Math.floor(maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100)) : maxValue

        this.equipment.grows[growId].stats[statType] = []
        for (let i = this.equipment.stats[statType].min; i <= growMax; i++) {
          this.equipment.grows[growId].stats[statType].push(i)
        }
      })
    })

    this.equipment.grow = this.equipment.growIds[0]
  }

  private changeUpgrade(init = false) {
    if (!this.equipment.skill) {
      this.equipment.skill = this.equipment.skills[0]
    } else {
      this.equipment.skill = this.equipment.skills[this.equipment.upgrade]
    }

    if (this.equipment.skill && this.equipment.skill[0] && this.equipment.skill[0].type == "skill") {
      this.equipment.skill[0].tableLevel = [];
      for (let i = 1; i <= this.equipment.skill[0].maxLevel; i++) {
        this.equipment.skill[0].tableLevel.push(i)
      }
    }
  }

  private changeGrow() {
    this.tableStats = {}
    this.equipment.statsTypes.forEach(statType => {
      this.tableStats[statType] = this.equipment.grows[this.equipment.grow].stats[statType]

      if (!this.equipment.stats[statType].selected) {
        this.equipment.stats[statType].selected = this.tableStats[statType][0]
      } else if (this.equipment.stats[statType].selected > this.tableStats[statType][this.tableStats[statType].length - 1]) {
        this.equipment.stats[statType].selected = this.tableStats[statType][this.tableStats[statType].length - 1]
      }
    })
  }

  private changeSkillLevel() {
    this.equipment.skill.forEach(skill => {
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
  }

  consoleLog() {
    this.equipmentService.saveEquipment(this.equipment)
  }
}
