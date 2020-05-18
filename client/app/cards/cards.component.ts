import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { CardService } from '../services/card.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private cards;
  private formattedCards = {};

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards(): void {
    let lang = this.translateService.currentLang
    this.cards = this.cardService.getCardsForListing();

    Object.keys(this.cards).forEach(rarity => {
      this.cardService.sortByName(this.cards[rarity], this.translateService)

      this.formattedCards[rarity] = [];
      let tableIndex = -1;
      this.cards[rarity].forEach((card, index) => {
        if (index % 4 === 0) {
          tableIndex++;
          this.formattedCards[rarity][tableIndex] = [];
        }

        card.name = this.nameService.getName(card)
        this.formattedCards[rarity][tableIndex].push(card)
      });
    });
  }

  private translateCards() {
    let lang = this.translateService.currentLang

    Object.keys(this.formattedCards).forEach(rarity => {
      this.formattedCards[rarity].forEach(line => {
        line.forEach(card => {
          card.name = this.nameService.getName(card)
        });
      });
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
