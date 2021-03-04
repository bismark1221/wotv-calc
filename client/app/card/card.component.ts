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
      const lang = this.translateService.currentLang;
      const skills = ['classic', 'awake', 'lvmax'];
      const buffTypes = ['unitBuffs', 'partyBuffs'];

      this.card.name = this.nameService.getName(this.card);

      skills.forEach(skillType => {
        buffTypes.forEach(buffType => {
          this.card[buffType].forEach(buff => {
            if (buff[skillType]) {
              if (buff[skillType].type !== 'buff' && buff[skillType].type !== 'support') {
                buff[skillType].name = this.nameService.getName(buff[skillType]);

                buff[skillType].effects.forEach(effect => {
                  effect.formatHtml = this.skillService.formatEffect(this.card, buff[skillType], effect);
                });

                buff[skillType].damageHtml = this.skillService.formatDamage(this.card, buff[skillType], buff[skillType].damage);

                if (buff[skillType].counter) {
                  buff[skillType].counterHtml = this.skillService.formatCounter(this.card, buff[skillType], buff[skillType].counter);
                }

                this.rangeService.formatRange(this.card, buff[skillType]);
              } else {
                buff[skillType].effects.forEach(effect => {
                  effect.formatHtml = this.skillService.formatEffect(this.card, buff[skillType], effect, false);
                });
              }
            }
          });
        });
      });

      for (const buffType of buffTypes) {
        for (const buff of this.card[buffType]) {
          if (buff.cond) {
            for (const cond of buff.cond) {
              if (cond.type === 'job') {
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  const job = await this.jobService.getJob(jobId);
                  cond.items[jobIndex] = job ? job : cond.items[jobIndex];
                }
              } else if (cond.type === 'unit') {
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  const unit = await this.unitService.getUnit(unitId);
                  cond.items[unitIndex] = unit ? unit : cond.items[unitIndex];
                }
              }
            }
          }
        }
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
