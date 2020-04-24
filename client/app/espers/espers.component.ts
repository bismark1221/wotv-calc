import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Esper } from '../entities/esper';
import { Skill } from '../entities/skill';
import { EsperService } from '../services/esper.service';
import { NavService } from '../services/nav.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-espers',
  templateUrl: './espers.component.html',
  styleUrls: ['./espers.component.css']
})
export class EspersComponent implements OnInit {
  private espers: Esper[];

  idSelected: string = "unselect";
  esper = null;

  observableEspers: Array<Select2OptionData> = [];

  select2Options: Select2.Options = {
    theme: 'bootstrap' 
  }

  labels = {
    espers: 'Espers'
  }

  constructor(
    private esperService: EsperService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private equipmentService: EquipmentService,
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

    this.getEspers();
  }

  private getTranslation() {
    this.translateService.get('chain.label.espers').subscribe((res: string) => {
      this.labels.espers = res;
    });
  }

  private getEspers(): void {
    this.espers = this.esperService.getEspers();
    console.log(this.espers)
    this.reloadList();
  }

  private sortEspers() {
    this.esperService.sort(this.espers, this.translateService);
  }

  private reloadList() {
    this.sortEspers();

    this.observableEspers = [
      {
        id: 'unselect',
        text: this.labels.espers,
        children: []
      },
      {
        id: '0',
        text: this.labels.espers,
        children: []
      },
    ];

    this.espers.forEach(esper => {
      this.observableEspers[1].children.push({
        id: esper.dataId.toString(),
        text: esper.getName(this.translateService)
      });


      esper.skills.forEach(skill => {
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(esper, skill, effect);
        });

        if (skill.damage) {
          skill.damageHtml = this.skillService.formatDamage(esper, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(esper, skill, skill.counter);
        }

        this.skillService.formatRange(esper, skill);
      });
      esper.effectBuffs = [];

      esper.buffs.forEach(buff => {
        let effect = buff.effects[0]
        esper.effectBuffs.push(this.skillService.formatEffect(esper, buff, effect, false))
      });
    });

    delete this.observableEspers[0].children;
  }

  selectEsper(esperId: string) {
    this.idSelected = esperId;
    this.esper = this.esperService.getEsper(esperId);
    /*this.esper.skills.forEach(skill => {
      skill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(esper, skill, effect);
      });
    });*/
    console.log(this.esper)
  }
}
