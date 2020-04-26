import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';


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
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.card = this.cardService.getCard(params.get('cardId'))
      if (!this.card) {
        this.router.navigate(['/card-not-found']);
      } else {
        this.formatCard();
      }
    });
  }

  private formatCard() {
    let skills = ["unitBuffsClassic", "unitBuffsAwake", "unitBuffsMax", "partyBuffsClassic", "partyBuffsAwake", "partyBuffsMax"];

    skills.forEach(skillType => {
      this.card[skillType].forEach(skill => {
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.card, skill, effect);
        });
      });
    });
  }
}
