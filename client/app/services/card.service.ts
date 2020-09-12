import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { SkillService } from './skill.service'
import { NavService } from './nav.service'
import { NameService } from './name.service'
import { ToolService } from './tool.service'
import { AuthService } from './auth.service'

import { Card } from '../entities/card';

import { default as GL_CARDS } from '../data/gl/cards.json';
import { default as JP_CARDS } from '../data/jp/cards.json';

@Injectable()
export class CardService {
  private cards: Card[];
  card

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private skillService: SkillService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  private getRaw() {
    if (this.navService.getVersion() == "GL") {
      return GL_CARDS
    } else {
      return JP_CARDS
    }
  }

  getCards() {
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

  getCardsForListing(filters = null, sort = "rarity", order = "asc") {
    this.getCards();
    this.cards = this.filterCards(this.cards, filters);

    switch (sort) {
      case "rarity" :
        this.toolService.sortByRarity(this.cards, order)
      break
      case "name" :
        this.toolService.sortByName(this.cards, order)
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

  getCard(id) {
    this.getCards();

    return this.cards.find(card => card.dataId === id);
  }

  getCardBySlug(slug) {
    this.getCards();
    this.card = this.cards.find(card => card.slug === slug)
    this.card.statsType = this.getAvailableStats()

    return this.card;
  }

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_cards" : "cards"
  }

  getSavedCards() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(card, onlyCard = true) {
    let data = {
      dataId: card.dataId,
      star: card.star,
      level: card.level
    }

    if (onlyCard) {
      let user = this.authService.getUser()
      // @ts-ignore
      data.user = user ? user.uid : null
      // @ts-ignore
      data.customName = card.customName ? card.customName : ''
    }

    return data
  }

  selectCardForBuilder(cardId, customData = null) {
    this.card = new Card()
    this.card.constructFromJson(JSON.parse(JSON.stringify(this.getCard(cardId))), this.translateService)
    this.card.name = this.card.getName(this.translateService)

    this.card.star = 0;
    this.card.level = 1;
    this.card.statsType = this.card.getAvailableStats()

    let existingCard = this.initiateSavedCard(customData)

    if (!existingCard) {
      this.maxCard()
    } else {
      this.card.updateMaxLevel();
      this.card.changeLevel(this.nameService, this.skillService)
    }

    return this.card
  }

  private initiateSavedCard(customData = null) {
    let card = customData

    if (card) {
      this.card.star = card.star
      this.card.level = card.level
      this.card.storeId = card.storeId
      this.card.customName = card.customName

      return true
    }

    return false
  }

  cardAlreadyExists(card) {
    let savedCards = this.getSavedCards()
    let cardFinded = false

    if (savedCards[card.dataId]) {
      savedCards[card.dataId].forEach(savedCard => {
        if (savedCard.customName == card.customName) {
          cardFinded = true
        }
      })
    }

    return cardFinded
  }

  saveCard(card, method) {
    let savableData = this.getSavableData(card)

    if (method == "new" || method == "share") {
      if (method == "share") {
        // @ts-ignore
        delete savableData.user
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        // @ts-ignore
        savableData.storeId = data.id
        let savedCards = this.getSavedCards()

        if (savedCards[card.dataId]) {
          savedCards[card.dataId].push(savableData)
        } else {
          savedCards[card.dataId] = [savableData]
        }

        this.localStorageService.set(this.getLocalStorage(), savedCards);
        this.card.storeId = data.id

        return data.id
      })
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(card.storeId).set(savableData).then(data => {
        let savedCards = this.getSavedCards()
        savedCards[card.dataId].forEach((savedCard, cardIndex) => {
          if (savedCard.storeId == card.storeId) {
            savedCards[card.dataId][cardIndex] = savableData
            savedCards[card.dataId][cardIndex].storeId = card.storeId
          }
        })

        this.localStorageService.set(this.getLocalStorage(), savedCards);

        return card.storeId
      })
    }
  }

  deleteCard(card) {
    this.firestore.collection(this.getLocalStorage()).doc(card.storeId).delete()

    let savedCards = this.getSavedCards()

    savedCards[card.dataId].forEach((savedCard, savedCardIndex) => {
      if (savedCard.storeId == card.storeId) {
        savedCards[card.dataId].splice(savedCardIndex, 1)
      }
    })

    this.localStorageService.set(this.getLocalStorage(), savedCards);
  }

  getStoredCard(dataId) {
    let document = this.firestore.collection(this.getLocalStorage()).doc(dataId)

    return document.valueChanges()
  }

  getExportableLink() {
    if (!this.card.storeId || this.hasChangeBeenMade()) {
      return this.saveCard(this.card, "share")
    }

    return new Promise((resolve, reject) => {
      resolve(this.card.storeId)
    })
  }

  hasChangeBeenMade() {
    let result = true
    if (this.card.storeId) {
      let newData = this.getSavableData(this.card)
      let oldData = null
      this.getSavedCards()[this.card.dataId].forEach(savedCard => {
        if (savedCard.storeId == this.card.storeId) {
          oldData = savedCard
          delete oldData.storeId
        }
      })

      return !this.toolService.equal(oldData, newData)
    }

    return result
  }

  resetCard(card = null) {
    if (card) {
      this.card = card
    }

    this.card.resetCard(this.nameService, this.skillService)
  }

  changeStar(card = null) {
    if (card) {
      this.card = card
    }

    this.card.updateMaxLevel();
    this.card.changeLevel(this.nameService, this.skillService)
  }

  changeLevel(card = null) {
    if (card) {
      this.card = card
    }

    this.card.changeLevel(this.nameService, this.skillService)
  }

  maxCard(card = null) {
    if (card) {
      this.card = card
    }

    this.card.maxCard(this.nameService, this.skillService)
  }

  getAvailableStats() {
    return this.card.getAvailableStats()
  }
}
