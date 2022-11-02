import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';

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

  private lvTbl = [0, 324, 1740, 4137, 7486, 11797, 17098, 23426, 30825, 39341, 49022, 59918, 72080, 85561, 100416, 116700, 134471, 153787, 174708, 197296, 221615, 247730, 275707, 305615, 337525, 371509, 407642, 446000, 486662, 529709, 575225, 623295, 674008, 727455, 783729, 842927, 905148, 970495, 1039074, 1110994, 1186367, 1265309, 1347940, 1434384, 1524768, 1619225, 1717891, 1820907, 1928419, 2040578, 2157540, 2279467, 2406527, 2538894, 2676748, 2820275, 2969669, 3125131, 3286869, 3455100, 3630049, 3811950, 4001046, 4197590, 4401846, 4614088, 4834602, 5063686, 5301650, 5548818, 5805529, 6072136, 6349008, 6636531, 6935109, 7245165, 7567142, 7901504, 8248738, 8609354, 8983888, 9372904, 9776994, 10196780, 10632918, 11086099, 11557051, 12046542, 12555384, 13084434, 13634598, 14206835, 14802161, 15421653, 16066453, 16737775, 17436908, 18165224, 18924184, 19715346];

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private apiService: ApiService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('cards', param, extraQuery)));
  }

  private async getApiPost(data = null) {
    return JSON.parse(JSON.stringify(await this.apiService.post('cards', data)));
  }

  private async getApiUser(type, extra = null) {
    switch (type) {
      case 'get':
        extra.push({name: 'type', value: 'cards'});
        return JSON.parse(JSON.stringify(await this.apiService.get('userData', null, extra)));
      break;
      case 'post':
        return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'cards', data: extra})));
      break;
      case 'delete':
        return JSON.parse(JSON.stringify(await this.apiService.delete('userData', {type: 'cards', storeId: extra})));
      break;
      default:
      break;
    }

    return null;
  }

  async getCardsForListingWithCosts(filters = null, sort = 'rarity', order = 'desc', options = null) {
    let apiResult = null;

    if (!options) {
      apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);
    } else {
      apiResult = await this.getApiPost(options);
    }

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

  async getCardsForListing(filters = null, sort = 'rarity', order = 'desc', withFromOtherVersion = false) {
    const apiResult = await this.getApi(null, [{name: 'forListing', value: 1}]);

    const rawCards = [];

    for (const apiCard of apiResult.cards) {
      const rawCard = new Card();
      rawCard.constructFromJson(apiCard, this.translateService);
      rawCards.push(rawCard);
    }

    const cards = this.filterCards(rawCards, filters, sort, order, withFromOtherVersion);

    return cards;
  }

  async getCardsForBuilder() {
    const cards = await this.getApi(null, [{name: 'forBuilder', value: 1}]);

    if (cards && cards.length > 0) {
      return this.sortCards(cards);
    }

    return [];
  }

  filterCards(cards, filters, sort = 'rarity', order = 'desc', withFromOtherVersion = false) {
    const filteredCards = [];

    if (filters) {
      for (const card of cards) {
        if ((filters.rarity.length === 0 || filters.rarity.indexOf(card.rarity) !== -1)
          && (filters.cost.length === 0 || filters.cost.indexOf(card.cost) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(card.dataId)) !== -1)
          && (withFromOtherVersion || !card.fromOtherVersion)
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
      for (const card of cards) {
        if (withFromOtherVersion || !card.fromOtherVersion) {
          filteredCards.push(card);
        }
      }

      return this.sortCards(filteredCards, sort, order);
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
      case 'updatedDate' :
        return this.toolService.sortByUpdatedDate(cards, order);
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

      if (card.storeId) {
        // @ts-ignore
        data.storeId = card.storeId;
      }
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

  async saveCard(card, method) {
    const savableData = this.getSavableData(card);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        // @ts-ignore
        delete savableData.user;
      }

      const data = await this.getApiUser('post', savableData);

      if (method === 'new') {
        // @ts-ignore
        savableData.storeId = data.storeId;
        const savedCards = this.getSavedCards();

        if (savedCards[card.dataId]) {
          savedCards[card.dataId].push(savableData);
        } else {
          savedCards[card.dataId] = [savableData];
        }

        this.localStorageService.set(this.getLocalStorage(), savedCards);
      }

      this.card.storeId = data.storeId;

      return data.storeId;
    } else {
      const data = await this.getApiUser('post', savableData);
      const savedCards = this.getSavedCards();
      savedCards[card.dataId].forEach((savedCard, cardIndex) => {
        if (savedCard.storeId === card.storeId) {
          savedCards[card.dataId][cardIndex] = savableData;
          savedCards[card.dataId][cardIndex].storeId = card.storeId;
        }
      });

      this.localStorageService.set(this.getLocalStorage(), savedCards);

      return card.storeId;
    }
  }

  async deleteCard(card) {
    await this.getApiUser('delete', card.storeId);

    const savedCards = this.getSavedCards();

    savedCards[card.dataId].forEach((savedCard, savedCardIndex) => {
      if (savedCard.storeId === card.storeId) {
        savedCards[card.dataId].splice(savedCardIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedCards);
  }

  async getStoredCard(storeId) {
    return await this.getApiUser('get', [{name: 'storeId', value: storeId}]);
  }

  async getExportableLink() {
    if (!this.card.storeId || this.hasChangeBeenMade()) {
      return await this.saveCard(this.card, 'share');
    }

    return this.card.storeId;
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
    return this.toolService.isLimited(id);
    return this[this.navService.getVersion() + '_limitedCards'].indexOf(id) !== -1;
  }

  getLevelFromExp(exp) {
    let level = 0;
    let minusOne = false;

    for (level = 0; level <= this.lvTbl.length - 1; level++) {
      if (this.lvTbl[level] > exp) {
        minusOne = true;
        break;
      } if (this.lvTbl[level] === exp) {
        break;
      }
    }

    return level + (minusOne ? 0 : 1);
  }
}
