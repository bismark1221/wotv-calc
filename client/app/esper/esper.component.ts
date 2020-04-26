import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Esper } from '../entities/esper';
import { Skill } from '../entities/skill';
import { EsperService } from '../services/esper.service';
import { NavService } from '../services/nav.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-esper',
  templateUrl: './esper.component.html',
  styleUrls: ['./esper.component.css']
})
export class EsperComponent implements OnInit {
  esper = null;

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.esper = this.esperService.getEsper(params.get('esperId'))
      if (!this.esper) {
        this.router.navigate(['/esper-not-found']);
      } else {
        this.formatEsper();
      }
    });
  }

  private formatEsper() {
    this.esper.skills.forEach(skill => {
      skill.effects.forEach(effect => {
        effect.formatHtml = this.skillService.formatEffect(this.esper, skill, effect);
      });

      if (skill.damage) {
        skill.damageHtml = this.skillService.formatDamage(this.esper, skill, skill.damage);
      }

      if (skill.counter) {
        skill.counterHtml = this.skillService.formatCounter(this.esper, skill, skill.counter);
      }

      this.skillService.formatRange(this.esper, skill);
    });
    this.esper.effectBuffs = [];

    this.esper.buffs.forEach(buff => {
      let effect = buff.effects[0]
      this.esper.effectBuffs.push(this.skillService.formatEffect(this.esper, buff, effect, false))
    });
    this.skillService.sortEffectBuffs(this.esper.effectBuffs);

    this.esper.rarity = this.esperService.findRarity(this.esper);
  }
}
