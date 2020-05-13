import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder.card.component.html',
  styleUrls: ['./builder.card.component.css']
})
export class BuilderCardComponent implements OnInit {
  selectedId
  cards
  card

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private skillService: SkillService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getCards();
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards() {
    this.cards = this.cardService.getCardsForBuilder(this.translateService);
    this.cards = [...this.cards];
  }

  selectCard() {
    this.card = this.cardService.selectCardForBuilder(this.selectedId)
  }

  changeStar() {
    this.cardService.changeStar()
  }

  changeLevels() {
    this.cardService.changeLevel()
  }

  save() {
    this.cardService.saveCard(this.card)
  }

  maxCard() {
    this.cardService.maxCard()
  }

  maxLevel() {
    this.cardService.maxLevel()
  }
}
