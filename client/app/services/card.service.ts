import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';

import { SkillService } from './skill.service'
import { Card } from '../entities/card';
import { default as CARDS } from '../data/cards.json';

@Injectable()
export class CardService {
  private cards: Card[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;
  private savedCards = {};
  private card

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

  statsType = ["HP", "ATK", "MAG"]

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private skillService: SkillService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortByName(cards: Card[], translate: any): Card[] {
    cards.sort((a: any, b: any) => {
      let x = this.i(a.name);
      let y = this.i(b.name);

      x = this.i(a.getName(this.translateService));
      y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
          if (xD < yD) { return -1; }
          else if (xD > yD) { return 1; }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
          this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
          this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
          if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
              return isNaN(this.oFxNcL) ? 1 : -1;
          }
          if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
              var comp = this.oFxNcL.localeCompare(this.oFyNcL);
              return comp / Math.abs(comp);
          }
          if (this.oFxNcL < this.oFyNcL) { return -1; }
          else if (this.oFxNcL > this.oFyNcL) { return 1; }
      }
    });

    return cards;
  }

  getCards(): Card[] {
    let cards: Card[] = [];

    Object.keys(JSON.parse(JSON.stringify(CARDS))).forEach(cardId => {
      let card = new Card();
      card.constructFromJson(CARDS[cardId], this.translateService);
      cards.push(card);
    });

    this.cards = cards;
    return cards;
  }

  getCardsForListing() {
    let cards = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };

    Object.keys(JSON.parse(JSON.stringify(CARDS))).forEach(cardId => {
      let card = new Card();
      card.constructFromJson(CARDS[cardId], this.translateService);
      cards[card.rarity].push(card);
    });

    return cards;
  }

  getCard(id: string): Card {
    if (!this.cards || this.cards.length === 0) {
      this.getCards();
    }

    return this.cards.find(card => card.dataId === id);
  }

  getCardBySlug(slug: string): Card {
    if (!this.cards || this.cards.length === 0) {
      this.getCards();
    }

    return this.cards.find(card => card.slug === slug);
  }


  getCardsForBuilder(translate) {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    let cards = this.getCardsForListing();

    Object.keys(cards).forEach(rarity => {
      this.sortByName(cards[rarity], translate)
    });

    let formattedCardsForBuilder = []
    rarityOrder.forEach(rarity => {
      cards[rarity].forEach(card => {
        formattedCardsForBuilder.push({
          id: card.dataId,
          name: card.getName(this.translateService),
          rarity: card.rarity
        })
      })
    })

    return formattedCardsForBuilder;
  }

  getSavedCards() {
    this.savedCards = this.localStorageService.get('cards') ? this.localStorageService.get('cards') : {};
    return this.savedCards;
  }

  saveCard(card) {
    if (!this.savedCards) {
      this.getSavedCards()
    }

    this.savedCards[card.dataId] = {
      star: card.star,
      level: card.level
    }

    this.localStorageService.set('cards', this.savedCards);
  }

  selectCardForBuilder(cardId) {
    this.card = this.getCard(cardId)
    this.card.name = this.card.getName(this.translateService)
    this.card.star = 0;
    this.card.level = 1;
    this.card.statsType = this.statsType

    this.initiateSavedCard()

    this.updateMaxLevel();
    this.changeLevel()

    return this.card
  }

  private initiateSavedCard() {
    let savedCards = this.getSavedCards()
    let card = savedCards[this.card.dataId]

    if (card) {
      this.card.star = card.star;
      this.card.level = card.level;
    }
  }

  changeStar() {
    this.updateMaxLevel();
    this.changeLevel()
  }

  private updateMaxLevel() {
    let star = this.card.star ? this.card.star : 0
    this.card.maxLevel = this.levelPerStar[this.card.rarity][star];

    if (this.card.level > this.card.maxLevel) {
      this.card.level = this.card.maxLevel
    }

    this.card.tableLevels = [];
    for (let i = 1; i <= this.card.maxLevel; i++) {
      this.card.tableLevels.push(i);
    }
  }

  changeLevel() {
    let maxLevel = this.levelPerStar[this.card.rarity][4]

    this.statsType.forEach(stat => {
      let min = this.card.stats[stat].min
      let max = this.card.stats[stat].max

      this.card.stats[stat].total = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.card.level - 1)))
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
    this.card.buffs = buffs

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

  maxCard() {
    this.card.star = 4;
    this.card.level = this.levelPerStar[this.card.rarity][this.card.star];

    this.changeStar()
    this.changeLevel()
  }

  maxLevel() {
    this.card.level = this.card.maxLevel;

    this.changeLevel()
  }
}
