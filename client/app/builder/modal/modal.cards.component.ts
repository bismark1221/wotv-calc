import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services/card.service';
import { TeamService } from '../../services/team.service';
import { NavService } from '../../services/nav.service';
import { NameService } from '../../services/name.service';

@Component({
  selector: 'app-modal-cards',
  templateUrl: './modal.cards.component.html',
  styleUrls: ['./modal.cards.component.css']
})
export class ModalCardsComponent implements OnInit {
  cards;

  searchText = '';
  filters = {
    rarity: []
  };
  savedCards = {};
  loadCardId = null;

  @Input() public modalStep = 'select';
  @Input() public card;
  @Input() public teamUnitPos;

  constructor(
    private cardService: CardService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private nameService: NameService,
    private modal: NgbActiveModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  ngOnInit() {
    this.getCards();

    if (this.card) {
      this.card = this.cardService.selectCardForBuilder(this.card.dataId, this.card);
    }
  }

  getCards() {
    if (isNaN(this.teamUnitPos)) {
      this.cards = this.cardService.getCardsForListing(this.filters);
    } else {
      this.cards = this.teamService.getAvailableCards(this.teamUnitPos, this.filters);
    }

    this.getFilteredCards();
    this.translateCards();

    this.savedCards = this.cardService.getSavedCards();
  }

  private translateCards() {
    this.cards.forEach(card => {
      card.name = this.nameService.getName(card);
    });
  }

  getFilteredCards() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.cards.filter(card => {
        return card.name.toLowerCase().includes(text) || card.slug.toLowerCase().includes(text);
      });
    } else {
      return this.cards;
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    this.getCards();
  }

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      return false;
    } else {
      return true;
    }
  }

  close() {
    this.modal.dismiss();
  }

  back() {
    this.modalStep = 'select';
  }

  selectCard(cardId, customData = null, forceNewBuild = false) {
    if (!forceNewBuild && !customData && this.savedCards[cardId] && this.savedCards[cardId].length > 0) {
      this.loadCardId = cardId;

      this.modalStep = 'load';
    } else {
      this.card = this.cardService.selectCardForBuilder(cardId, customData);

      this.modalStep = 'custom';
    }
  }

  save() {
    this.modal.close(this.card);
  }

  changeStar(value) {
    if (value == this.card.star) {
      value = undefined;
    }

    this.card.star = value;
    this.cardService.changeStar(this.card);
  }

  changeLevel () {
    this.cardService.changeLevel(this.card);
  }

  selectLevel(level) {
    this.card.level = level;
    this.cardService.changeLevel(this.card);
  }

  maxCard() {
    this.cardService.maxCard(this.card);
  }
}
