import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { CardService } from '../services/card.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards;
  searchText = "";
  sort = "rarity"
  order = "asc"
  filters = {
    rarity: [],
    element: []
  }
  isCollapsedRarity = false;
  version = 'GL'

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });

    this.version = this.navService.getVersion()
  }

  ngOnInit() {
    this.navService.setTitle("Cards");

    this.getCards();
  }

  getCards() {
    this.cards = this.cardService.getCardsForListing(this.filters, this.sort, this.order);
    this.translateCards();
  }

  private translateCards() {
    this.cards.forEach(card => {
      card.name = this.nameService.getName(card)
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }

  getFilteredCards() {
    if (this.searchText !== "") {
      let text = this.searchText.toLowerCase();
      return this.cards.filter(card => {
        return card.name.toLowerCase().includes(text);
      });
    } else {
      return this.cards
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      this.filters[type].push(value)
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1)
    }

    this.getCards()
  }

  changeSort(sort) {
    this.sort = sort
    this.getCards()
  }

  changeOrder(order) {
    this.order = order
    this.getCards()
  }
}
