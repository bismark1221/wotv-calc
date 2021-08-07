import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { CardService } from '../services/card.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  rawCards = [];
  cards = [];
  searchText = '';
  sort = 'rarity';
  order = 'desc';
  filters = {
    rarity: [],
    limited: [],
    element: [],
    cost: [],
    onlyActiveSkill: false,
  };
  version = 'GL';

  isFilterChecked = {
    rarity: [],
    element: [],
    cost: [],
    limited: []
  };
  collapsed = {
    rarity: true,
    element: true,
    limited: true,
    cost: true,
    skill: true
  };

  rarities = [
    'UR',
    'MR',
    'SR',
    'R',
    'N'
  ];

  elements = [
    'fire',
    'ice',
    'wind',
    'earth',
    'lightning',
    'water',
    'light',
    'dark'
  ];

  costs = [];

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });

    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    this.navService.setTitle('Cards');

    await this.getCards();

    if (sessionStorage.getItem('cardsFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('cardsFilters'));

      if (!this.filters.cost) {
        this.filters.cost = [];
      }
    }

    if (sessionStorage.getItem('cardsCollapsed')) {
      this.collapsed = JSON.parse(sessionStorage.getItem('cardsCollapsed'));

      if (this.collapsed.cost === undefined) {
        this.collapsed.cost = true;
      }
    }

    this.filterChecked();
    this.filterCards();
  }

  async getCards() {
    const result = await this.cardService.getCardsForListingWithCosts(this.filters, this.sort, this.order);
    this.cards = result.cards;
    this.rawCards = result.rawCards;
    this.costs = result.costs;
  }

  filterCards() {
    this.cards = this.cardService.filterCards(this.rawCards, this.filters, this.sort, this.order);
  }

  private translateCards() {
    this.cards.forEach(card => {
      card.name = this.toolService.getName(card);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
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
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('cardsFilters', JSON.stringify(this.filters));

    this.filterCards();
  }

  filterChecked() {
    this.rarities.forEach(rarity => {
      if (this.filters.rarity.indexOf(rarity) === -1) {
        this.isFilterChecked.rarity[rarity] = false;
      } else {
        this.isFilterChecked.rarity[rarity] = true;
      }
    });

    ['true', 'false'].forEach(limited => {
      if (this.filters.limited.indexOf(limited === 'true' ? true : false) === -1) {
        this.isFilterChecked.limited[limited] = false;
      } else {
        this.isFilterChecked.limited[limited] = true;
      }
    });

    this.elements.forEach(element => {
      if (this.filters.element.indexOf(element) === -1) {
        this.isFilterChecked.element[element] = false;
      } else {
        this.isFilterChecked.element[element] = true;
      }
    });

    this.costs.forEach(cost => {
      if (this.filters.cost && this.filters.cost.indexOf(cost) === -1) {
        this.isFilterChecked.cost[cost] = false;
      } else {
        this.isFilterChecked.cost[cost] = true;
      }
    });
  }

  toogleCollapse(section) {
    this.collapsed[section] = !this.collapsed[section];
    sessionStorage.setItem('cardsCollapsed', JSON.stringify(this.collapsed));
  }

  async toggleOnlyActiveSkill() {
    this.filters.onlyActiveSkill = !this.filters.onlyActiveSkill;

    this.filterCards();
    sessionStorage.setItem('cardsFilters', JSON.stringify(this.filters));
  }
}
