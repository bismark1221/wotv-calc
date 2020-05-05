import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { CardService } from '../services/card.service';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder.card.component.html',
  styleUrls: ['./builder.card.component.css']
})
export class BuilderCardComponent implements OnInit {
  cards;
  card
  tableLevels
  stats

  statsType = ["HP", "ATK", "MAG"]

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards() {
    this.cards = this.cardService.getCardsForBuilder(this.translateService);
    this.translateCards();
  }

  private translateCards() {
    let lang = this.translateService.currentLang

    this.cards.forEach(card => {
      card.name = card.names[lang]
    });

    this.cards = [...this.cards];
  }

  selectCard() {
    let lang = this.translateService.currentLang
    this.card.name = this.card.names[lang]
    this.card.star = 0;
    this.card.level = 1;

    this.initiateSavedCard()

    this.updateMaxLevel();

    console.log(this.card)
  }

  private initiateSavedCard() {
    let savedCards = this.cardService.getSavedCards()
    let card = savedCards[this.card.dataId]

    if (card) {
      this.card.star = card.star;
      this.card.level = card.level;
    }
  }

  private changeStar() {
    this.updateMaxLevel();
  }

  private updateMaxLevel() {
    let levelPerStar = {
      'UR' : {
        0: 40,
        1: 55,
        2: 70,
        3: 85,
        4: 99
      },
      'MR' : {
        0: 30,
        1: 40,
        2: 50,
        3: 60,
        4: 70
      },
      'SR' : {
        0: 20,
        1: 30,
        2: 40,
        3: 50,
        4: 60
      },
      'R' : {
        0: 20,
        1: 25,
        2: 30,
        3: 35,
        4: 40
      },
      'N' : {
        0: 10,
        1: 15,
        2: 20,
        3: 25,
        4: 30
      }
    }

    this.card.maxLevel = levelPerStar[this.card.rarity][this.card.star];

    if (this.card.level > this.card.maxLevel) {
      this.card.level = this.card.maxLevel
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.card.maxLevel; i++) {
      this.tableLevels.push(i);
    }

    this.changeLevels()
  }

  private changeLevels() {
    this.stats = {}

    this.statsType.forEach(stat => {
      let min = this.card.stats[stat].min
      let max = this.card.stats[stat].max

      this.stats[stat] = Math.floor(min + ((max - min) / (99 - 1) * (this.card.level - 1)))
    })
  }



  consoleLog() {
    this.cardService.saveCard(this.card)
  }
}
