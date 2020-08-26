import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';

import { SkillService } from './skill.service'
import { NavService } from './nav.service'
import { NameService } from './name.service'
import { Card } from '../entities/card';
import { default as GL_CARDS } from '../data/gl/cards.json';
import { default as JP_CARDS } from '../data/jp/cards.json';

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

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private skillService: SkillService,
    private navService: NavService,
    private nameService: NameService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  private getRaw() {
    if (this.navService.getVersion() == "GL") {
      return GL_CARDS
    } else {
      return JP_CARDS
    }
  }

  getCards(): Card[] {
    let cards: Card[] = [];
    let rawCards = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawCards).forEach(cardId => {
      let card = new Card();
      card.constructFromJson(rawCards[cardId], this.translateService);
      cards.push(card);
    });

    this.cards = cards;
    return cards;
  }

  sortByName(cards, order = "asc") {
    cards.sort((a: any, b: any) => {
      let x = this.i(a.getName(this.translateService));
      let y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
        if (xD < yD) {
          return order == "asc" ? -1 : 1;
        } else if (xD > yD) {
          return order == "asc" ? 1 : -1;
        }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
        this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
        if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
          if (isNaN(this.oFxNcL)) {
            return order == "asc" ? 1 : -1;
          } else {
            return order == "asc" ? -1 : 1;
          }
        }

        if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
          var comp = this.oFxNcL.localeCompare(this.oFyNcL);
          return comp / Math.abs(comp);
        }

        if (this.oFxNcL < this.oFyNcL) {
          return order == "asc" ? -1 : 1;
        } else if (this.oFxNcL > this.oFyNcL) {
          return order == "asc" ? 1 : -1;
        }
      }
    });

    return cards;
  }

  sortByRarity(cards, order = "asc") {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    if (order == "desc") {
      rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    }

    cards.sort((a: any, b: any) => {
      if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
        return -1
      } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
        return 1
      } else {
        let x = this.i(a.getName(this.translateService));
        let y = this.i(b.getName(this.translateService));

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
      }
    })

    return cards
  }

  getCardsForListing(filters, sort = "rarity", order = "asc") {
    this.getCards();
    this.cards = this.filterCards(this.cards, filters);

    switch (sort) {
      case "rarity" :
        this.sortByRarity(this.cards, order)
      break
      case "name" :
        this.sortByName(this.cards, order)
      break
      default :
        console.log("not managed sort")
      break
    }

    return this.cards;
  }

  filterCards(cards, filters) {
    if (filters) {
      let filteredCards = []

      cards.forEach(card => {
        if (filters.rarity.length == 0 || filters.rarity.indexOf(card.rarity) != -1) {
          filteredCards.push(card)
        }
      })

      return filteredCards
    } else {
      return cards
    }
  }

  getCard(id: string): Card {
    this.getCards();

    return this.cards.find(card => card.dataId === id);
  }

  getCardBySlug(slug: string): Card {
    this.getCards();
    this.card = this.cards.find(card => card.slug === slug)
    this.card.statsType = this.getAvailableStats()

    return this.card;
  }


  getCardsForBuilder() {
    let cards = this.getCardsForListing(null, "rarity", "asc");

    let formattedCardsForBuilder = []
    cards.forEach(card => {
      formattedCardsForBuilder.push({
        id: card.dataId,
        name: card.getName(this.translateService),
        rarity: card.rarity
      })
    })

    return formattedCardsForBuilder;
  }

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_cards" : "cards"
  }

  getSavedCards() {
    this.savedCards = this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
    return this.savedCards;
  }

  getSavableData(card) {
    return {
      dataId: card.dataId,
      star: card.star,
      level: card.level
    }
  }

  saveCard(card) {
    if (!this.savedCards) {
      this.getSavedCards()
    }

    this.savedCards[card.dataId] = this.getSavableData(card)

    this.localStorageService.set(this.getLocalStorage(), this.savedCards);
  }

  selectCardForBuilder(cardId, customData = null) {
    this.card = this.getCard(cardId)

    if (this.card) {
      this.card.name = this.card.getName(this.translateService)
      this.card.star = 0;
      this.card.level = 1;
      this.card.statsType = this.getAvailableStats()

      this.initiateSavedCard(customData)

      this.updateMaxLevel();
      this.changeLevel()
    }

    return this.card
  }

  private initiateSavedCard(customData = null) {
    let card = customData
    if (!card) {
      let savedCards = this.getSavedCards()
      card = savedCards[this.card.dataId]
    }

    if (card) {
      this.card.star = card.star;
      this.card.level = card.level;
    }
  }

  changeStar(card = null) {
    if (card) {
      this.card = card
    }

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

  changeLevel(card = null) {
    if (card) {
      this.card = card
    }

    let maxLevel = this.levelPerStar[this.card.rarity][4]

    this.card.statsType.forEach(stat => {
      let min = this.card.stats[stat].min
      let max = this.card.stats[stat].max

      this.card.stats[stat].total = Math.floor(min + ((max - min) / (maxLevel - 1) * (this.card.level - 1)))
    })

    let buffs = {
      self: {},
      party: {}
    }

    this.card.skills = []

    this.card.unitBuffs.forEach(buff => {
      if (buff.classic.type == 'support') {
        buff.classic.effects.forEach(effect => {
          buffs.self[effect.type] = {}
          buffs.self[effect.type].value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (maxLevel - 1) * (this.card.level - 1)))
          buffs.self[effect.type].calcType = effect.calcType
        })

        if (buff.awake && this.card.star > 0) {
          buff.awake.effects.forEach(effect => {
            buffs.self[effect.type].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.card.star - 1)))
          })
        }

        if (buff.lvmax && this.card.level == maxLevel) {
          buff.lvmax.effects.forEach(effect => {
            buffs.self[effect.type].value += effect.minValue
          })
        }
      } else {
        let skill = buff.classic
        skill.level = this.card.level
        skill.name = this.nameService.getName(skill)

        skill.effects.forEach(effect => {
          effect.formatHtml = this.skillService.formatEffect(this.card, skill, effect);
        });

        skill.damageHtml = this.skillService.formatDamage(this.card, skill, skill.damage);

        if (skill.counter) {
          skill.counterHtml = this.skillService.formatCounter(this.card, skill, skill.counter);
        }

        this.skillService.formatRange(this.card, skill);
        this.card.skills.push(skill)
      }
    })

    this.card.partyBuffs.classic.effects.forEach(effect => {
      buffs.party[effect.type] = {}
      buffs.party[effect.type].value = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (maxLevel - 1) * (this.card.level - 1)))
      buffs.party[effect.type].calcType = effect.calcType
    })

    if (this.card.partyBuffs.awake && this.card.star > 0) {
      this.card.partyBuffs.awake.effects.forEach(effect => {
        buffs.party[effect.type].value += Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (4 - 1) * (this.card.star - 1)))
      })
    }

    if (this.card.partyBuffs.lvmax && this.card.level == maxLevel) {
      this.card.partyBuffs.lvmax.effects.forEach(effect => {
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

  maxCard(card = null) {
    if (card) {
      this.card = card
    }

    this.card.star = 4;
    this.card.level = this.levelPerStar[this.card.rarity][this.card.star];

    this.changeStar()
    this.changeLevel()
  }

  maxLevel(card = null) {
    if (card) {
      this.card = card
    }

    this.card.level = this.card.maxLevel;

    this.changeLevel()
  }

  getAvailableStats() {
    let availableStats = []

    Object.keys(this.card.stats).forEach(stat => {
      if (typeof(this.card.stats[stat].min) == "number") {
        availableStats.push(stat)
      }
    })

    return availableStats
  }
}
