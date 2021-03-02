import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { NavService } from './nav.service';
import { NameService } from './name.service';
import { ToolService } from './tool.service';
import { AuthService } from './auth.service';
import { DataService } from './data.service';

import { Card } from '../entities/card';

@Injectable()
export class CardService {
  private cards: Card[];
  card;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private dataService: DataService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  private getRaw() {
    return this.dataService.loadData('cards');
  }

  async getCards() {
    const cards: Card[] = [];
    const rawCards = await this.getRaw().toPromise();

    Object.keys(rawCards).forEach(cardId => {
      const card = new Card();
      card.constructFromJson(rawCards[cardId], this.translateService);
      cards.push(card);
    });

    this.cards = cards;
    return cards;
  }

  async getCardsForListing(filters = null, sort = 'rarity', order = 'asc') {
    await this.getCards();
    this.cards = this.filterCards(this.cards, filters);

    switch (sort) {
      case 'rarity' :
        this.toolService.sortByRarity(this.cards, order);
      break;
      case 'name' :
        this.toolService.sortByName(this.cards, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return this.cards;
  }

  filterCards(cards, filters) {
    if (filters) {
      const filteredCards = [];

      cards.forEach(card => {
        if (filters.rarity.length === 0 || filters.rarity.indexOf(card.rarity) !== -1) {
          let needToAddCard = false;
          if (!filters.element || filters.element.length === 0) {
            needToAddCard = true;
          } else {
            card.partyBuffs.forEach(buff => {
              if (buff.cond && buff.cond.length > 0 && buff.cond[0].type === 'elem') {
                filters.element.forEach(elem => {
                  if (buff.cond[0].items.indexOf(elem) !== -1) {
                    needToAddCard = true;
                  }
                });
              }
            });
          }

          if (needToAddCard) {
            filteredCards.push(card);
          }
        }
      });

      return filteredCards;
    } else {
      return cards;
    }
  }

  async getCardsForBuilder() {
    const cards = await this.getCardsForListing(null, 'rarity', 'asc');

    const formattedCardsForBuilder = [];
    cards.forEach(card => {
      formattedCardsForBuilder.push({
        id: card.dataId,
        name: card.getName(this.translateService),
        rarity: card.rarity
      });
    });

    return formattedCardsForBuilder;
  }

  async getCard(id) {
    await this.getCards();

    return this.cards.find(card => card.dataId === id);
  }

  async getCardBySlug(slug) {
    await this.getCards();
    this.card = this.cards.find(card => card.slug === slug);

    if (this.card) {
      this.card.statsType = this.getAvailableStats();
    }

    return this.card;
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_cards' : 'cards';
  }

  getSavedCards() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(card, onlyCard = true) {
    const data = {
      dataId: card.dataId,
      star: card.star,
      level: card.level
    };

    if (onlyCard) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;
      // @ts-ignore
      data.customName = card.customName ? card.customName : '';
    }

    return data;
  }

  async selectCardForBuilder(cardId, customData = null) {
    this.card = new Card();
    this.card.constructFromJson(JSON.parse(JSON.stringify(await this.getCard(cardId))), this.translateService);
    this.card.name = this.card.getName(this.translateService);

    this.card.star = 0;
    this.card.level = 1;
    this.card.statsType = this.card.getAvailableStats();

    const existingCard = this.initiateSavedCard(customData);

    if (!existingCard) {
      this.maxCard();
    } else {
      this.card.updateMaxLevel();
      this.card.changeLevel(this.nameService, this.skillService, this.rangeService);
    }

    return this.card;
  }

  private initiateSavedCard(customData = null) {
    const card = customData;

    if (card) {
      this.card.star = card.star;
      this.card.level = card.level;
      this.card.storeId = card.storeId;
      this.card.customName = card.customName;

      return true;
    }

    return false;
  }

  cardAlreadyExists(card) {
    const savedCards = this.getSavedCards();
    let cardFinded = false;

    if (savedCards[card.dataId]) {
      savedCards[card.dataId].forEach(savedCard => {
        if (savedCard.customName === card.customName) {
          cardFinded = true;
        }
      });
    }

    return cardFinded;
  }

  saveCard(card, method) {
    const savableData = this.getSavableData(card);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        // @ts-ignore
        delete savableData.user;
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method === 'new') {
          // @ts-ignore
          savableData.storeId = data.id;
          const savedCards = this.getSavedCards();

          if (savedCards[card.dataId]) {
            savedCards[card.dataId].push(savableData);
          } else {
            savedCards[card.dataId] = [savableData];
          }

          this.localStorageService.set(this.getLocalStorage(), savedCards);
        }
        this.card.storeId = data.id;

        return data.id;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(card.storeId).set(savableData).then(data => {
        const savedCards = this.getSavedCards();
        savedCards[card.dataId].forEach((savedCard, cardIndex) => {
          if (savedCard.storeId === card.storeId) {
            savedCards[card.dataId][cardIndex] = savableData;
            savedCards[card.dataId][cardIndex].storeId = card.storeId;
          }
        });

        this.localStorageService.set(this.getLocalStorage(), savedCards);

        return card.storeId;
      });
    }
  }

  deleteCard(card) {
    this.firestore.collection(this.getLocalStorage()).doc(card.storeId).delete();

    const savedCards = this.getSavedCards();

    savedCards[card.dataId].forEach((savedCard, savedCardIndex) => {
      if (savedCard.storeId === card.storeId) {
        savedCards[card.dataId].splice(savedCardIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedCards);
  }

  getStoredCard(dataId) {
    const document = this.firestore.collection(this.getLocalStorage()).doc(dataId);

    return document.valueChanges();
  }

  getExportableLink() {
    if (!this.card.storeId || this.hasChangeBeenMade()) {
      return this.saveCard(this.card, 'share');
    }

    return new Promise((resolve, reject) => {
      resolve(this.card.storeId);
    });
  }

  hasChangeBeenMade() {
    if (this.card.storeId) {
      const newData = this.getSavableData(this.card);
      let oldData = null;

      if (this.getSavedCards()[this.card.dataId]) {
        this.getSavedCards()[this.card.dataId].forEach(savedCard => {
          if (savedCard.storeId === this.card.storeId) {
            oldData = savedCard;
            delete oldData.storeId;
          }
        });

        return !this.toolService.equal(oldData, newData);
      }
    }

    return true;
  }

  resetCard(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.resetCard(this.nameService, this.skillService, this.rangeService);
  }

  changeStar(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.updateMaxLevel();
    this.card.changeLevel(this.nameService, this.skillService, this.rangeService);
  }

  changeLevel(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.changeLevel(this.nameService, this.skillService, this.rangeService);
  }

  maxCard(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.maxCard(this.nameService, this.skillService, this.rangeService);
  }

  getAvailableStats() {
    return this.card.getAvailableStats();
  }
}
