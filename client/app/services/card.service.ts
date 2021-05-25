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

  private GL_releaseDates = {
    VC_LW_GLEM: '25/03/2020',
    VC_LW_IFRT: '25/03/2020',
    VC_LW_SIRE: '25/03/2020',
    VC_FF14_MV1: '25/03/2020',
    VC_FF14_MV2: '25/03/2020',
    VC_LW_SOKYU: '25/03/2020',
    VC_LW_TRAINING: '25/03/2020',
    VC_LW_MACR: '25/03/2020',
    VC_LW_MURG: '25/03/2020',
    VC_LW_GRSR: '25/03/2020',
    VC_LW_IGNT: '25/03/2020',
    VC_LW_BHMT: '25/03/2020',
    VC_LW_MABR: '25/03/2020',
    VC_LW_FAMILY: '25/03/2020',
    VC_LW_KTON: '25/03/2020',
    VC_LW_PROPOSE: '25/03/2020',
    VC_LW_SDLX: '25/03/2020',
    VC_LW_TEAPARTY: '25/03/2020',
    VC_LW_HUNT: '25/03/2020',
    VC_LW_CACT: '25/03/2020',
    VC_LW_ARMN_01: '25/03/2020',
    VC_LW_ZUUU: '25/03/2020',
    VC_LW_OGRE: '25/03/2020',
    VC_LW_BOMB: '25/03/2020',
    VC_LW_BYLO: '25/03/2020',
    VC_LW_RART: '25/03/2020',
    VC_LW_RYER: '25/03/2020',
    VC_LW_VNLA: '25/03/2020',
    VC_LW_RIRY: '25/03/2020',
    VC_LW_LEONIS: '25/03/2020',
    VC_LW_HOURN: '25/03/2020',
    VC_LW_FENICE: '25/03/2020',
    VC_LW_WEZETT: '25/03/2020',
    VC_LW_CRYSTAL: '25/03/2020',
    VC_LW_LEONIS2: '25/03/2020',
    VC_LW_HOURN2: '25/03/2020',
    VC_LW_FENICE2: '25/03/2020',
    VC_LW_WEZETT2: '25/03/2020',
    VC_LW_DYNVERK: '25/03/2020',
    VC_LW_TRSV_01: '25/03/2020',
    VC_LW_TRSV_02: '25/03/2020',
    VC_LW_MIRROR: '25/03/2020',
    VC_LW_SHIV: '01/04/2020',
    VC_LW_RAMU: '08/04/2020',
    VC_LW_HOLYNIGHT: '15/04/2020',
    VC_FFT_MV1: '22/04/2020',
    VC_LW_JOBCRYSTAL: '22/04/2020',
    VC_LW_ODIN: '13/05/2020',
    VC_LW_NEWYEAR: '13/05/2020',
    VC_LW_LAMA_01: '20/05/2020',
    VC_LW_GUARD: '20/05/2020',
    VC_LW_TSLP: '03/06/2020',
    VC_LW_LILS: '03/06/2020',
    VC_LW_VALE1: '10/06/2020',
    VC_LW_VALE2: '10/06/2020',
    VC_LW_OCHU: '17/06/2020',
    VC_MBFF_MV1: '24/06/2020',
    VC_MBFF_MV2: '24/06/2020',
    VC_LW_THDG: '22/07/2020',
    VC_LW_VNLA2: '22/07/2020',
    VC_LW_ADLD: '22/07/2020',
    VC_LW_WHITEDAY1: '22/07/2020',
    VC_FF01_DMAC: '23/07/2020',
    VC_LW_DABL: '12/08/2020',
    VC_LW_CBVPARTY1: '12/08/2020',
    VC_FFT_MV3: '26/08/2020',
    VC_FFT_MV2: '26/08/2020',
    VC_LW_ROBUST: '16/09/2020',
    VC_LW_MDFY: '16/09/2020',
    VC_FFCC_MV1: '16/09/2020',
    VC_FFCC_MV2: '16/09/2020',
    VC_LW_FNRR: '30/09/2020',
    VC_LW_ORDR: '30/09/2020',
    VC_LW_TITN: '14/10/2020',
    VC_LW_KING: '14/10/2020',
    VC_LW_HALL: '28/10/2020',
    VC_LW_VKTR: '28/10/2020',
    VC_LW_BLMN: '28/10/2020',
    VC_LW_AGON: '11/11/2020',
    VC_LW_GUREN: '11/11/2020',
    VC_LW_CHCB: '18/11/2020',
    VC_FF4_DMNW: '25/11/2020',
    VC_LW_MOGL: '09/12/2020',
    VC_LW_XMAS: '09/12/2020',
    VC_LW_LUCA: '16/12/2020',
    VC_LW_FIGHT: '16/12/2020',
    VC_LW_DEAN: '23/12/2020',
    VC_LW_SCAL: '30/12/2020',
    VC_LW_GRSR2: '30/12/2020',
    VC_LW_TNBR: '30/12/2020',
    VC_FF14_MV3: '06/01/2021',
    VC_LW_LVAT: '13/01/2021',
    VC_LW_ASSASIN: '13/01/2021',
    VC_LW_HLNA: '27/01/2021',
    VC_LW_GCAL: '27/01/2021',
    VC_LW_TYPN: '10/02/2021',
    VC_LW_APPLE: '10/02/2021',
    VC_LW_MRLT: '24/02/2021',
    VC_LW_GREEN: '10/03/2021',
    VC_LW_RAMD: '17/03/2021',
    VC_LW_OOOO: '17/03/2021',
    VC_LW_BAHM: '24/03/2021',
    VC_LW_ART: '24/03/2021',
    VC_FF10_MV1: '31/03/2021',
    VC_FF10_MV2: '31/03/2021',
    VC_LW_ZZAN: '07/04/2021',
    VC_LW_OMEG: '14/04/2021',
    VC_LW_ROBB: '14/04/2021',
    VC_NIER_MV1: '21/04/2021',
    VC_LW_MONT2: '05/05/2021',
    VC_LW_PNIX: '21/05/2021',
    VC_LW_LILS2: '21/05/2021',
    VC_LW_RAIN: '19/05/2021'
  };

  private JP_releaseDates = {
    VC_LW_GLEM: '14/11/2019',
    VC_LW_IFRT: '14/11/2019',
    VC_LW_SIRE: '14/11/2019',
    VC_FF14_MV1: '14/11/2019',
    VC_FF14_MV2: '14/11/2019',
    VC_LW_SOKYU: '14/11/2019',
    VC_LW_TRAINING: '14/11/2019',
    VC_LW_MACR: '14/11/2019',
    VC_LW_MURG: '14/11/2019',
    VC_LW_GRSR: '14/11/2019',
    VC_LW_IGNT: '14/11/2019',
    VC_LW_BHMT: '14/11/2019',
    VC_LW_MABR: '14/11/2019',
    VC_LW_FAMILY: '14/11/2019',
    VC_LW_KTON: '14/11/2019',
    VC_LW_PROPOSE: '14/11/2019',
    VC_LW_SDLX: '14/11/2019',
    VC_LW_TEAPARTY: '14/11/2019',
    VC_LW_HUNT: '14/11/2019',
    VC_LW_CACT: '14/11/2019',
    VC_LW_ARMN_01: '14/11/2019',
    VC_LW_ZUUU: '14/11/2019',
    VC_LW_OGRE: '14/11/2019',
    VC_LW_BOMB: '14/11/2019',
    VC_LW_BYLO: '14/11/2019',
    VC_LW_RART: '14/11/2019',
    VC_LW_RYER: '14/11/2019',
    VC_LW_VNLA: '14/11/2019',
    VC_LW_RIRY: '14/11/2019',
    VC_LW_LEONIS: '14/11/2019',
    VC_LW_HOURN: '14/11/2019',
    VC_LW_FENICE: '14/11/2019',
    VC_LW_WEZETT: '14/11/2019',
    VC_LW_CRYSTAL: '14/11/2019',
    VC_LW_LEONIS2: '14/11/2019',
    VC_LW_HOURN2: '14/11/2019',
    VC_LW_FENICE2: '14/11/2019',
    VC_LW_WEZETT2: '14/11/2019',
    VC_LW_DYNVERK: '14/11/2019',
    VC_LW_TRSV_01: '14/11/2019',
    VC_LW_TRSV_02: '14/11/2019',
    VC_LW_MIRROR: '14/11/2019',
    VC_LW_SHIV: '22/11/2019',
    VC_LW_RAMU: '01/12/2019',
    VC_LW_MOGL: '01/12/2019',
    VC_LW_HOLYNIGHT: '18/12/2019',
    VC_FFT_MV1: '27/12/2019',
    VC_LW_ODIN: '01/01/2020',
    VC_LW_NEWYEAR: '01/01/2020',
    VC_LW_LAMA_01: '15/01/2020',
    VC_LW_GUARD: '15/01/2020',
    VC_LW_TSLP: '02/01/2020',
    VC_LW_LILS: '02/01/2020',
    VC_LW_JOBCRYSTAL: '02/01/2020',
    VC_LW_VALE1: '07/02/2020',
    VC_LW_VALE2: '07/02/2020',
    VC_LW_OCHU: '14/02/2020',
    VC_LW_THDG: '09/03/2020',
    VC_LW_VNLA2: '09/03/2020',
    VC_LW_ADLD: '09/03/2020',
    VC_LW_WHITEDAY1: '09/03/2020',
    VC_MBFF_MV1: '17/03/2020',
    VC_MBFF_MV2: '17/03/2020',
    VC_FF01_DMAC: '25/03/2020',
    VC_LW_DABL: '08/04/2020',
    VC_LW_CBVPARTY1: '08/04/2020',
    VC_FFT_MV3: '22/04/2020',
    VC_FFT_MV2: '22/04/2020',
    VC_LW_ROBUST: '05/05/2020',
    VC_LW_MDFY: '05/05/2020',
    VC_LW_FNRR: '21/05/2020',
    VC_LW_ORDR: '21/05/2020',
    VC_LW_TITN: '10/06/2020',
    VC_LW_KING: '10/06/2020',
    VC_LW_VKTR: '24/06/2020',
    VC_LW_BLMN: '24/06/2020',
    VC_FF14_MV3: '01/07/2020',
    VC_LW_AGON: '08/07/2020',
    VC_LW_GUREN: '08/07/2020',
    VC_LW_GRSR2: '22/07/2020',
    VC_LW_CHCB: '22/07/2020',
    VC_FF4_DMNW: '01/08/2020',
    VC_LW_LUCA: '07/08/2020',
    VC_LW_FIGHT: '07/08/2020',
    VC_LW_SCAL: '25/08/2020',
    VC_FFCC_MV1: '25/08/2020',
    VC_LW_TNBR: '25/08/2020',
    VC_FFCC_MV2: '25/08/2020',
    VC_LW_LVAT: '09/09/2020',
    VC_LW_ASSASIN: '09/09/2020',
    VC_LW_HLNA: '23/09/2020',
    VC_LW_GCAL: '23/09/2020',
    VC_LW_TYPN: '09/10/2020',
    VC_LW_APPLE: '09/10/2020',
    VC_LW_HALL: '23/10/2020',
    VC_LW_MRLT: '23/10/2020',
    VC_LW_RAMD: '06/11/2020',
    VC_LW_OOOO: '06/11/2020',
    VC_LW_BAHM: '14/11/2020',
    VC_LW_ART: '14/11/2020',
    VC_FF10_MV1: '24/11/2020',
    VC_FF10_MV2: '24/11/2020',
    VC_LW_OMEG: '09/12/2020',
    VC_LW_ROBB: '09/12/2020',
    VC_LW_XMAS: '14/12/2020',
    VC_NIER_MV1: '23/12/2020',
    VC_LW_MONT2: '30/12/2020',
    VC_LW_PNIX: '08/01/2021',
    VC_LW_LILS2: '08/01/2021',
    VC_LW_CMLO: '22/01/2021',
    VC_LW_CORL: '22/01/2021',
    VC_LW_CBCL: '08/02/2021',
    VC_LW_ICDG: '22/02/2021',
    VC_LW_DEAN: '09/03/2021',
    VC_LW_KRKN: '09/03/2021',
    VC_LW_MORE: '24/03/2021',
    VC_LW_MONT: '07/04/2021',
    VC_LW_DMCM: '07/04/2021',
    VC_FF7_MV1: '21/04/2021',
    VC_FF7_SCPN: '01/05/2021',
    VC_LW_LSWL: '07/05/2021'
  };

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
        card.releaseDate = this[this.navService.getVersion() + '_releaseDates'][card.dataId];
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

  filterCards(cards, filters) {
    if (filters) {
      const filteredCards = [];

      cards.forEach(card => {
        if ((filters.rarity.length === 0 || filters.rarity.indexOf(card.rarity) !== -1)
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
