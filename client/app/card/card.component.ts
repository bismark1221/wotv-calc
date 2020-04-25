import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { VisionCard } from '../entities/visionCard';
import { Skill } from '../entities/skill';
import { VisionCardService } from '../services/visionCard.service';
import { NavService } from '../services/nav.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  visionCard = null;

  constructor(
    private visionCardService: VisionCardService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
    private navService: NavService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.visionCard = this.visionCardService.getVisionCard(params.get('cardId'))
      if (!this.visionCard) {
        this.router.navigate(['/vision-card-not-found']);
      } else {
        this.formatVisionCard();
      }
    });
  }

  private formatVisionCard() {
    let skills = ["unitBuffsClassic", "unitBuffsAwake", "unitBuffsMax", "partyBuffsClassic", "partyBuffsAwake", "partyBuffsMax"];

    skills.forEach(skillType => {
      this.visionCard[skillType].forEach(skill => {
        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.visionCard, skill, effect);
        });
      });
    });
  }
}
