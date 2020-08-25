import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';


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
    private jobService: JobService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.card) {
        this.formatCard();
        console.log(this.card)
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.card = this.cardService.getCardBySlug(params.get('slug'))
      if (!this.card) {
        this.router.navigate([this.navService.getRoute('/card-not-found')]);
      } else {
        this.formatCard();
      }
    });
  }

  private formatCard() {
    if (this.card) {
      let lang = this.translateService.currentLang
      let skills = ["classic", "awake", "lvmax"];

      this.card.name = this.nameService.getName(this.card)

      skills.forEach(skillType => {
        if (this.card.partyBuffs[skillType]) {
          this.card.partyBuffs[skillType].effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(this.card, this.card.partyBuffs[skillType], effect);
          });
        }

        this.card.unitBuffs.forEach(buff => {
          if (buff[skillType]) {
            if (buff[skillType].type !== "buff") {
              buff[skillType].name = this.nameService.getName(buff[skillType])

              buff[skillType].effects.forEach(effect => {
                effect.formatHtml = this.skillService.formatEffect(this.unit, buff[skillType], effect);
              });

              buff[skillType].damageHtml = this.skillService.formatDamage(this.unit, buff[skillType], buff[skillType].damage);

              if (buff[skillType].counter) {
                buff[skillType].counterHtml = this.skillService.formatCounter(this.unit, buff[skillType], buff[skillType].counter);
              }

              this.skillService.formatRange(this.unit, buff[skillType]);
            } else {
              buff[skillType].effects.forEach(effect => {
                effect.formatHtml = this.skillService.formatEffect(this.card, buff[skillType], effect);
              });
            }
          }
        })
      })


      this.card.unitBuffs.forEach(buff => {
        if (buff.cond && buff.cond.type == 'job') {
          buff.cond.items.forEach((jobId, jobIndex) => {
            let job = this.jobService.getJob(jobId)
            buff.cond.items[jobIndex] = job ? job : buff.cond.items[jobIndex]
          })
        }
      })
    }
  }
}
