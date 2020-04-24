import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Equipment } from '../entities/equipment';
import { Skill } from '../entities/skill';
import { EquipmentService } from '../services/equipment.service';
import { NavService } from '../services/nav.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {
  private equipments: Equipment[];

  idSelected: string = "unselect";
  equipment = null;

  observableEquipments: Array<Select2OptionData> = [];

  select2Options: Select2.Options = {
    theme: 'bootstrap' 
  }

  labels = {
    equipments: 'Equipments'
  }

  constructor(
    private equipmentService: EquipmentService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private navService: NavService,
    private skillService: SkillService
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
      this.reloadList();
    });
  }

  ngOnInit(): void {
    this.idSelected = 'unselect';

    this.getEquipments();
  }

  private getTranslation() {
    this.translateService.get('chain.label.equipments').subscribe((res: string) => {
      this.labels.equipments = res;
    });
  }

  private getEquipments(): void {
    this.equipments = this.equipmentService.getEquipments();
    console.log(this.equipments)
    this.reloadList();
  }

  private sortEquipments() {
    this.equipmentService.sort(this.equipments, this.translateService);
  }

  private reloadList() {
    this.sortEquipments();

    this.observableEquipments = [
      {
        id: 'unselect',
        text: this.labels.equipments,
        children: []
      },
      {
        id: '0',
        text: this.labels.equipments,
        children: []
      },
    ];

    this.equipments.forEach(equipment => {
      this.observableEquipments[1].children.push({
        id: equipment.dataId.toString(),
        text: equipment.getName(this.translateService)
      });

      equipment.statsTypes = Object.keys(equipment.stats)

      let i = 0;
      equipment.countSkills = [];

      equipment.skills.forEach(equipmentLvl => {
        equipment.countSkills.push(i);

        equipmentLvl.forEach(skill => {
          skill.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(equipment, skill, effect);
          });

          if (skill.damage) {
            skill.damageHtml = this.skillService.formatDamage(equipment, skill, skill.damage);
          }

          if (skill.counter) {
            skill.counterHtml = this.skillService.formatCounter(equipment, skill, skill.counter);
          }

          this.skillService.formatRange(equipment, skill);
        });
        i++;
      });
    });

    delete this.observableEquipments[0].children;
  }

  selectEquipment(equipmentId: string) {
    this.idSelected = equipmentId;
    this.equipment = this.equipmentService.getEquipment(equipmentId);
    /*this.equipment.skills.forEach(skill => {
      skill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(equipment, skill, effect);
      });
    });*/
    console.log(this.equipment)
  }

  isWeapon(type) {
    return this.equipmentService.isWeapon(type)
  }

  getSkillsPerJob(job) {
    let skills = [];
    if (job === 0) {
      this.equipment.skills.forEach(skill => {
        if (skill.slot === 1) {
          skills.push(skill)
        }
      })
    } else {
      this.equipment.skills.forEach(skill => {
        if (skill.unlockJob === job && skill.slot !== 1) {
          skills.push(skill)
        }
      })
    }

    return skills;
  }
}
