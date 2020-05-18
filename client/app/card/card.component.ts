import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';
import { NavService } from '../services/nav.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  card = null;

  constructor(
    private cardService: CardService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.card) {
        this.formatCard();
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
    let lang = this.translateService.currentLang
    let skills = ["unitBuffsClassic", "unitBuffsAwake", "unitBuffsMax", "partyBuffsClassic", "partyBuffsAwake", "partyBuffsMax"];

    this.card.name = this.card.names[lang]
    skills.forEach(skillType => {
      if (this.card[skillType]) {
        this.card[skillType].effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.card, this.card[skillType], effect);
        });
      }
    });
  }
}
