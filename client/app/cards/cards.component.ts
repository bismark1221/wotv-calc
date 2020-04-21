import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'angular-2-local-storage';
import { Select2OptionData } from '../select2/select2.interface';
import { Angulartics2 } from 'angulartics2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { VisionCard } from '../entities/visionCard';
import { Skill } from '../entities/skill';
import { VisionCardService } from '../services/visionCard.service';
import { NavService } from '../services/nav.service';
import { SkillService } from '../services/skill.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private visionCards: VisionCard[];

  idSelected: string = "unselect";
  visionCard = null;

  observableVisionCards: Array<Select2OptionData> = [];

  select2Options: Select2.Options = {
    theme: 'bootstrap'
  }

  labels = {
    visionCards: 'VisionCards'
  }

  constructor(
    private visionCardService: VisionCardService,
    private angulartics: Angulartics2,
    private translateService: TranslateService,
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

    this.getVisionCards();
  }

  private getTranslation() {
    this.translateService.get('chain.label.visionCards').subscribe((res: string) => {
      this.labels.visionCards = res;
    });
  }

  private getVisionCards(): void {
    this.visionCards = this.visionCardService.getVisionCards();
    console.log(this.visionCards)
    this.reloadList();
  }

  private sortVisionCards() {
    this.visionCardService.sort(this.visionCards, this.translateService);
  }

  private reloadList() {
    this.sortVisionCards();

    this.observableVisionCards = [
      {
        id: 'unselect',
        text: this.labels.visionCards,
        children: []
      },
      {
        id: '0',
        text: this.labels.visionCards,
        children: []
      },
    ];

    this.visionCards.forEach(visionCard => {
      this.observableVisionCards[1].children.push({
        id: visionCard.dataId.toString(),
        text: visionCard.getName(this.translateService)
      });

      let skills = ["unitBuffsClassic", "unitBuffsAwake", "unitBuffsMax", "partyBuffsClassic", "partyBuffsAwake", "partyBuffsMax"];

      skills.forEach(skillType => {
        visionCard[skillType].forEach(skill => {
          skill.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(visionCard, skill, effect);
          });
        });
      });
    });

    delete this.observableVisionCards[0].children;
  }

  selectVisionCard(visionCardId: string) {
    this.idSelected = visionCardId;
    this.visionCard = this.visionCardService.getVisionCard(visionCardId);

    console.log(this.visionCard)
  }
}
