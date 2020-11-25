import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';
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
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.card = this.cardService.getCardBySlug(params.get('slug'));
      if (!this.card) {
        this.router.navigate([this.navService.getRoute('/card-not-found')]);
      } else {
        this.formatCard();

        this.navService.setTitle(this.card.name);
      }
    });
  }

  private formatCard() {
    if (this.card) {
      const lang = this.translateService.currentLang;
      const skills = ['classic', 'awake', 'lvmax'];

      this.card.name = this.nameService.getName(this.card);

      skills.forEach(skillType => {
        const buffTypes = ['unitBuffs', 'partyBuffs'];
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

                this.skillService.formatRange(this.card, buff[skillType]);
              } else {
                buff[skillType].effects.forEach(effect => {
                  effect.formatHtml = this.skillService.formatEffect(this.card, buff[skillType], effect, false);
                });
              }
            }
          });
        });
      });

      const buffTypes = ['unitBuffs', 'partyBuffs'];
      buffTypes.forEach(buffType => {
        this.card[buffType].forEach(buff => {
          if (buff.cond) {
            buff.cond.forEach(cond => {
              if (cond.type == 'job') {
                cond.items.forEach((jobId, jobIndex) => {
                  const job = this.jobService.getJob(jobId);
                  cond.items[jobIndex] = job ? job : cond.items[jobIndex];
                });
              } else if (cond.type == 'unit') {
                cond.items.forEach((unitId, unitIndex) => {
                  const unit = this.unitService.getUnit(unitId);
                  cond.items[unitIndex] = unit ? unit : cond.items[unitIndex];
                });
              }
            });
          }
        });
      });
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
