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
  private JP_cards: Card[];
  private GL_cards: Card[];
  card;

  private GL_limitedCards = [
    'VC_FF01_DMAC',
    'VC_FF4_DMNW',
    'VC_FF14_MV1',
    'VC_FF14_MV2',
    'VC_FF14_MV3',
    'VC_FFT_MV1',
    'VC_FFT_MV2',
    'VC_FFT_MV3',
    'VC_FFCC_MV1',
    'VC_FFCC_MV2',
    'VC_NIER_MV1',
    'VC_FF10_MV1',
    'VC_FF10_MV2',
    'VC_LW_XMAS',
    'VC_LW_HALL',
    'VC_LW_DEAN',
    'VC_LW_ART',
    'VC_MBFF_MV1',
    'VC_MBFF_MV2',
    'VC_LW_NEWYEAR',
    'VC_LW_OOOO',
    'VC_LW_MOGL',
    'VC_LW_KRKN',
    'VC_FF7_MV1',
    'VC_FF7_SCPN',
    'AF_FF7_ROD_000',
    'AF_FF7_ACC_003'
  ];

  private JP_limitedCards = [
    'VC_FF01_DMAC',
    'VC_FF4_DMNW',
    'VC_FF14_MV1',
    'VC_FF14_MV2',
    'VC_FF14_MV3',
    'VC_FFT_MV1',
    'VC_FFT_MV2',
    'VC_FFT_MV3',
    'VC_FFCC_MV1',
    'VC_FFCC_MV2',
    'VC_NIER_MV1',
    'VC_FF10_MV1',
    'VC_FF10_MV2',
    'VC_LW_HOLYNIGHT',
    'VC_LW_XMAS',
    'VC_LW_HALL',
    'VC_LW_VALE1',
    'VC_LW_VALE2',
    'VC_LW_ART',
    'VC_MBFF_MV1',
    'VC_MBFF_MV2',
    'VC_LW_NEWYEAR',
    'VC_LW_OOOO',
    'VC_LW_WHITEDAY1',
    'VC_LW_APPLE',
    'VC_LW_MOGL',
    'VC_LW_KRKN',
    'VC_FF7_MV1',
    'VC_FF7_SCPN',
    'AF_FF7_ROD_000',
    'AF_FF7_ACC_003'
  ];

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
    if (this[this.navService.getVersion() + '_cards'] === null || this[this.navService.getVersion() + '_cards'] === undefined) {
      const cards: Card[] = [];
      const rawCards = await this.getRaw();

      Object.keys(rawCards).forEach(cardId => {
        const card = new Card();
        card.constructFromJson(rawCards[cardId], this.translateService);
        cards.push(card);
      });

      this[this.navService.getVersion() + '_cards'] = cards;
    }

    return this[this.navService.getVersion() + '_cards'];
  }

  async getCardsForListing(filters = null, sort = 'rarity', order = 'asc') {
    await this.getCards();
    const cards = this.filterCards(this[this.navService.getVersion() + '_cards'], filters);

    switch (sort) {
      case 'rarity' :
        this.toolService.sortByRarity(cards, order);
      break;
      case 'name' :
        this.toolService.sortByName(cards, order);
      break;
      case 'releaseDate' :
        this.toolService.sortByReleaseDate(cards, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return cards;
  }

  async getCosts() {
    const cards = await this.getCards();

    const costs = [];
    cards.forEach(card => {
      if (costs.indexOf(card.cost) === -1) {
        costs.push(card.cost);
      }
    });

    return costs.sort((a, b) => b - a);
  }

  filterCards(cards, filters) {
    if (filters) {
      const filteredCards = [];

      cards.forEach(card => {
        if ((filters.rarity.length === 0 || filters.rarity.indexOf(card.rarity) !== -1)
          && (filters.cost.length === 0 || filters.cost.indexOf(card.cost) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(card.dataId)) !== -1)
        ) {
          let needToAddCard = false;
          if ((!filters.element || filters.element.length === 0) && !filters.onlyActiveSkill) {
            needToAddCard = true;
          } else {
            if (filters.element && filters.element.length > 0) {
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

            if (filters.onlyActiveSkill && (!filters.element || filters.element.length === 0 || needToAddCard)) {
              needToAddCard = false;
              card.unitBuffs.forEach(buff => {
                if (buff.classic && buff.classic.type === 'skill') {
                  needToAddCard = true;
                }
              });
            }
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

    return this[this.navService.getVersion() + '_cards'].find(card => card.dataId === id);
  }

  async getCardBySlug(slug) {
    await this.getCards();
    this.card = this[this.navService.getVersion() + '_cards'].find(card => card.slug === slug);

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

  isLimited(id) {
    return this[this.navService.getVersion() + '_limitedCards'].indexOf(id) !== -1;
  }
}
