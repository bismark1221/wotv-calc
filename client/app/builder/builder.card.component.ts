import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { NameService } from '../services/name.service';
import { AuthService } from '../services/auth.service';

import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder.card.component.html',
  styleUrls: ['./builder.card.component.css']
})
export class BuilderCardComponent implements OnInit {
  cards
  filteredCards
  card
  searchText = ""
  savedCards = {}
  loadingBuild = false
  showSave = false

  rarityTranslate = {
    UR: "Ultra Rare",
    MR: "Mega Rare",
    SR: "Super Rare",
    R: "Rare",
    N: "Normal"
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private nameService: NameService,
    private authService: AuthService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  ngOnInit() {
    this.getCards();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let data = params.get('data')
      if (data) {
        this.loadingBuild = true
        this.cardService.getStoredCard(data).subscribe(cardData => {
          if (cardData) {
            // @ts-ignore
            this.selectCard(cardData.dataId, cardData)
          }
          this.loadingBuild = false
        })
      }
    });
  }

  ngAfterViewInit() {
    this.authService.$load.subscribe(load => {
      this.savedCards = this.cardService.getSavedCards()
    });

    this.authService.$user.subscribe(user => {
      if (user) {
        this.showSave = true
      } else {
        this.showSave = false
      }
    });
  }

  private getCards() {
    this.cards = this.formatCards(this.cardService.getCardsForListing())
    this.updateFilteredCards()
    this.translateCards();

    this.savedCards = this.cardService.getSavedCards()
  }

  private translateCards() {
    Object.keys(this.cards).forEach(rarity => {
      this.cards[rarity].forEach(card => {
        card.name = this.nameService.getName(card)
      })
    });
  }

  private formatCards(cards) {
    let formattedCards = { UR: [], MR: [], SR: [], R: [], N: [] }

    cards.forEach(card => {
      formattedCards[card.rarity].push(card)
    })

    return formattedCards
  }

  updateFilteredCards() {
    let text = this.searchText.toLowerCase();
    this.filteredCards = { UR: [], MR: [], SR: [], R: [], N: [] }

    Object.keys(this.cards).forEach(rarity => {
      this.filteredCards[rarity] = this.cards[rarity].filter(card => {
        return card.name.toLowerCase().includes(text);
      })
    })
  }

  selectCard(dataId, customData = null) {
    if (dataId) {
      this.card = this.cardService.selectCardForBuilder(dataId, customData)
      this.searchText = this.card.name
    } else {
      this.card = null
      this.searchText = ""
      this.updateFilteredCards()
    }
  }

  changeStar(value) {
    if (value == this.card.star) {
      value = undefined
    }

    this.card.star = value
    this.cardService.changeStar(this.card)
  }

  selectLevel(level) {
    this.card.level = level
    this.cardService.changeLevel(this.card)
  }

  maxCard() {
    this.cardService.maxCard(this.card)
  }

  resetCard() {
    this.cardService.resetCard(this.card)
  }

  openLoadModal(cardId) {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'card'
    modalRef.componentInstance.savedItems = this.savedCards[cardId]

    modalRef.result.then(result => {
      if (result.type == 'load' && result.item) {
        this.selectCard(result.item.dataId, result.item)
      }

      if (result.type == 'fullDelete') {
        this.savedCards[cardId] = []
      }
    }, (reason) => {
    });
  }

  openSaveModal() {
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'card'
    modalRef.componentInstance.item = this.card

    modalRef.result.then(result => {
      this.savedCards = this.cardService.getSavedCards()
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'card'
    modalRef.componentInstance.item = this.card
  }
}
