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
  cards;
  card
  tableLevels
  stats

  statsType = ["HP", "ATK", "MAG"]
  private levelPerStar = {
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

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private skillService: SkillService
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
    this.changeLevels()

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
    this.changeLevels()
  }

  private updateMaxLevel() {
    this.card.maxLevel = this.levelPerStar[this.card.rarity][this.card.star];

    if (this.card.level > this.card.maxLevel) {
      this.card.level = this.card.maxLevel
    }

    this.tableLevels = [];
    for (let i = 1; i <= this.card.maxLevel; i++) {
      this.tableLevels.push(i);
    }
  }

  private changeLevels() {
    this.stats = {}
    let maxLevel = this.levelPerStar[this.card.rarity][4]

    this.statsType.forEach(stat => {
      let min = this.card.stats[stat].min
      let max = this.card.stats[stat].max

      this.stats[stat] = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.card.level - 1)))
    })

    let buffs = {
      self: {},
      party: {}
    }

    this.card.unitBuffsClassic.effects.forEach(effect => {
      buffs.self[effect.type] = {}
      buffs.self[effect.type].value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (maxLevel - 1) * (this.card.level - 1)))
      buffs.self[effect.type].calcType = effect.calcType
    })

    if (this.card.unitBuffsAwake && this.card.star > 0) {
      this.card.unitBuffsAwake.effects.forEach(effect => {
        buffs.self[effect.type].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.card.star - 1)))
      })
    }

    if (this.card.unitBuffsMax && this.card.level == maxLevel) {
      this.card.unitBuffsMax.effects.forEach(effect => {
        buffs.self[effect.type].value += effect.minValue
      })
    }


    this.card.partyBuffsClassic.effects.forEach(effect => {
      buffs.party[effect.type] = {}
      buffs.party[effect.type].value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (maxLevel - 1) * (this.card.level - 1)))
      buffs.party[effect.type].calcType = effect.calcType
    })

    if (this.card.partyBuffsAwake && this.card.star > 0) {
      this.card.partyBuffsAwake.effects.forEach(effect => {
        buffs.party[effect.type].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.card.star - 1)))
      })
    }

    if (this.card.partyBuffsMax && this.card.level == maxLevel) {
      this.card.partyBuffsMax.effects.forEach(effect => {
        buffs.party[effect.type].value += effect.minValue
      })
    }

    this.card.buff = {}
    let types = ['self', 'party']
    types.forEach(type => {
      this.card.buff[type] = [];
      Object.keys(buffs[type]).forEach(effect => {
        let formattedEffect = {
          type: effect,
          value: buffs[type][effect].value,
          calcType: buffs[type][effect].calcType
        }
        this.card.buff[type].push(this.skillService.formatEffect(this.card, {}, formattedEffect));
      })
    })
  }


  consoleLog() {
    this.cardService.saveCard(this.card)
  }
}
