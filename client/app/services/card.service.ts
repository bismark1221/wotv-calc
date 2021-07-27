import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

import { Card } from '../entities/card';

@Injectable()
export class CardService {
  private JP_cards: Card[];
  private GL_cards: Card[];

  private listingSkills = [];

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
    'VC_LW_MOGL',
    'VC_FF7_MV1',
    'VC_FF7_SCPN',
    'VC_LW_GREEN',
    'VC_FF15_MV1'
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
    'VC_LW_WHITEDAY1',
    'VC_LW_APPLE',
    'VC_LW_MOGL',
    'VC_FF7_MV1',
    'VC_FF7_SCPN',
    'VC_FF15_MV1'
  ];

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('cards', param, extraQuery)));
  }

  async getCardsForListingWithCosts(filters = null, sort = 'rarity', order = 'desc') {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);
    this.listingSkills = apiResult.skills;

    const rawCards = [];
    const costs = [];

    for (const apiCard of apiResult.cards) {
      const rawCard = new Card();
      rawCard.constructFromJson(apiCard, this.translateService);
      rawCards.push(rawCard);

      if (costs.indexOf(rawCard.cost) === -1) {
        costs.push(rawCard.cost);
      }
    }

    const cards = this.filterCards(rawCards, filters, sort, order);

    return {
      rawCards: rawCards,
      cards: cards,
      costs: costs.sort((a, b) => b - a)
    };
  }

  async getCardsForListing(filters = null, sort = 'rarity', order = 'desc') {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);

    const rawCards = [];

    for (const apiCard of apiResult.cards) {
      const rawCard = new Card();
      rawCard.constructFromJson(apiCard, this.translateService);
      rawCards.push(rawCard);
    }

    const cards = this.filterCards(rawCards, filters, sort, order);

    return cards;
  }

  async getCardsForBuilder() {
    const cards = await this.getApi(null, [{name: 'forBuilder', value: 1}]);

    if (cards && cards.length > 0) {
      return this.sortCards(cards);
    }

    return [];
  }

  filterCards(cards, filters, sort = 'rarity', order = 'desc') {
    if (filters) {
      const filteredCards = [];

      for (const card of cards) {
        if ((filters.rarity.length === 0 || filters.rarity.indexOf(card.rarity) !== -1)
          && (filters.cost.length === 0 || filters.cost.indexOf(card.cost) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(card.dataId)) !== -1)
        ) {
          let needToAddCard = false;
          if ((!filters.element || filters.element.length === 0) && !filters.onlyActiveSkill) {
            needToAddCard = true;
          } else {
            if (filters.element && filters.element.length > 0) {
              for (const buff of card.partyBuffs) {
                if (buff && buff.cond && buff.cond.length > 0 && buff.cond[0].type === 'elem') {
                  filters.element.forEach(elem => {
                    if (buff.cond[0].items.indexOf(elem) !== -1) {
                      needToAddCard = true;
                    }
                  });
                }
              }
            }

            if (filters.onlyActiveSkill && (!filters.element || filters.element.length === 0 || needToAddCard)) {
              needToAddCard = false;
              for (const buffId of card.unitBuffs) {
                const buff = this.listingSkills.find(searchedSkill => searchedSkill.dataId === buffId.classic);
                if (buff && buff.type === 'skill') {
                  needToAddCard = true;
                }
              }
            }
          }

          if (needToAddCard) {
            filteredCards.push(card);
          }
        }
      }

      return this.sortCards(filteredCards, sort, order);
    } else {
      return this.sortCards(cards, sort, order);
    }
  }

  private sortCards(cards, sort = 'rarity', order = 'desc') {
    switch (sort) {
      case 'rarity' :
        return this.toolService.sortByRarity(cards, order);
      break;
      case 'name' :
        return this.toolService.sortByName(cards, order);
      break;
      case 'releaseDate' :
        return this.toolService.sortByReleaseDate(cards, order);
      break;
      default :
        console.log('not managed sort');
        return cards;
      break;
    }
  }

  async getCardBySlug(slug) {
    const apiResult = await this.getApi(slug, [{name: 'forDetail', value: 1}]);

    if (apiResult.card) {
      this.card = new Card();
      this.card.constructFromJson(apiResult.card, this.translateService);

      this.card.rawJobs = apiResult.jobs;
      this.card.rawSkills = apiResult.skills;
      this.card.rawUnits = apiResult.units;

      this.card.statsType = this.card.getAvailableStats();

      return this.card;
    } else {
      return null;
    }
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

  async selectCardForBuilder(cardId, customData = null, slug = null) {
    let apiResult = null;
    if (slug === null) {
      apiResult = await this.getApi(cardId, [{name: 'forBuilder', value: 1}, {name: 'byId', value: 1}]);
    } else {
      apiResult = await this.getApi(slug, [{name: 'forBuilder', value: 1}, {name: 'bySlug', value: 1}]);
    }

    if (apiResult.card) {
      this.card = new Card();
      this.card.constructFromJson(apiResult.card, this.translateService);

      this.card.rawJobs = apiResult.jobs;
      this.card.rawSkills = apiResult.skills;
      this.card.rawUnits = apiResult.units;

      this.card.star = 0;
      this.card.level = 1;
      this.card.statsType = this.card.getAvailableStats();

      const skills = ['classic', 'awake', 'lvmax'];
      const buffTypes = ['unitBuffs', 'partyBuffs'];

      for (const buffType of buffTypes) {
        this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)] = [];
        for (const buffIds of this.card[buffType]) {
          const buffs = {};
          for (const skillType of skills) {
            if (buffIds[skillType]) {
              const buff = this.card.rawSkills.find(searchedSkill => searchedSkill.dataId === buffIds[skillType]);
              if (buff) {
                buffs[skillType] = buff;
              }
            }
          }
          this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)].push(buffs);
        }
      }

      for (const buffType of buffTypes) {
        let i = 0;
        for (const buff of this.card[buffType]) {
          if (buff.cond) {
            this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)][i].cond = buff.cond;
          }
          i++;
        }
      }

      const existingCard = this.initiateSavedCard(customData);

      if (!existingCard) {
        this.maxCard();
      } else {
        this.card.updateMaxLevel();
        this.card.changeLevel(this.toolService, this.skillService, this.rangeService);
      }

      return this.card;
    }

    return null;
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

    this.card.resetCard(this.toolService, this.skillService, this.rangeService);
  }

  changeStar(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.updateMaxLevel();
    this.card.changeLevel(this.toolService, this.skillService, this.rangeService);
  }

  changeLevel(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.changeLevel(this.toolService, this.skillService, this.rangeService);
  }

  maxCard(card = null) {
    if (card) {
      this.card = card;
    }

    this.card.maxCard(this.toolService, this.skillService, this.rangeService);
  }

  getAvailableStats() {
    return this.card.getAvailableStats();
  }

  isLimited(id) {
    return this[this.navService.getVersion() + '_limitedCards'].indexOf(id) !== -1;
  }
}
