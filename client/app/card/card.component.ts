import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { UnitService } from '../services/unit.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card = null;
  jobs = [];

  constructor(
    private cardService: CardService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private jobService: JobService,
    private unitService: UnitService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.card) {
        this.formatCard();
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.card = await this.cardService.getCardBySlug(params.get('slug'));
      if (!this.card) {
        this.router.navigate([this.navService.getRoute('/card-not-found')]);
      } else {
        this.formatCard();

        this.navService.setTitle(this.card.name);
      }
    });
  }

  private async formatCard() {
    if (this.card) {
      const skills = ['classic', 'awake', 'lvmax'];
      const buffTypes = ['unitBuffs', 'partyBuffs'];

      this.card.name = this.nameService.getName(this.card);
      this.card.limited = this.cardService.isLimited(this.card.dataId);

      for (const buffType of buffTypes) {
        this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)] = [];
        for (const buffIds of this.card[buffType]) {
          const buffs = {};
          for (const skillType of skills) {
            if (buffIds[skillType]) {
              const buff = this.card.rawSkills.find(searchedSkill => searchedSkill.dataId === buffIds[skillType]);

              if (buff) {
                if (buff.type !== 'buff' && buff.type !== 'support' && buff.type !== 'party') {
                  buff.name = this.nameService.getName(buff);

                  buff.effectsHtml = this.skillService.formatEffects(this.card, buff);

                  buff.damageHtml = this.skillService.formatDamage(this.card, buff, buff.damage);

                  if (buff.counter) {
                    buff.counterHtml = this.skillService.formatCounter(this.card, buff, buff.counter);
                  }

                  this.rangeService.formatRange(this.card, buff);
                } else {
                  buff.effects.forEach(effect => {
                    effect.formatHtml = this.skillService.formatEffect(this.card, buff, effect, false);
                  });
                }

                buffs[skillType] = buff;
              }
            }
          }
          this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)].push(buffs);
        }
      }

      for (const buffType of buffTypes) {
        let i = 0;
        for (const buff of this.card[buffType]) {
          if (buff.cond) {
            for (const cond of buff.cond) {
              if (cond.type === 'mainJob') {
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  cond.formattedItems.push(this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId));
                }
              } else if (cond.type === 'job') {
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  cond.formattedItems.push(this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId));
                }
              } else if (cond.type === 'unit') {
                cond.formattedItems = [];
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  cond.formattedItems.push(this.card.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId));
                }
              }
            }
            this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)][i].cond = buff.cond;
          }
          i++;
        }
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
