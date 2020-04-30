import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';
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
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatEsper();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.esper = this.esperService.getEsperBySlug(params.get('slug'))
      if (!this.esper) {
        this.router.navigate(['/esper-not-found']);
      } else {
        this.formatEsper();
      }
    });
  }

  private formatEsper() {
    let lang = this.translateService.currentLang
    this.esper.name = this.esper.names[lang]

    this.esper.skills.forEach(skill => {
      skill.name = skill.names[lang]
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
      this.esper.effectBuffs.push({
        html: this.skillService.formatEffect(this.esper, buff, effect, false),
        sp: buff.sp
      })
    });
    this.skillService.sortEffectBuffs(this.esper.effectBuffs);

    this.esper.rarity = this.esperService.findRarity(this.esper);

    this.esper.maxSP = 0;
    this.esper.SPs.forEach(awake => {
      awake.forEach(sp => {
        this.esper.maxSP += sp;
      })
    })
  }
}
