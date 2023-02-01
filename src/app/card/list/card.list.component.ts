import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';

import { TranslateService } from '../../services/translate.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';
import { CardService } from '../../services/card.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-card-list',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class CardListComponent extends SharedListComponent {
  filtersSections = {
    rarity: {
      label: 'Rarity',
      collapsed: true,
      filters : [
        {
          id: 'rarity',
          type: 'list',
          items: [
            {
              id: 'UR',
              label: 'UR'
            },
            {
              id: 'MR',
              label: 'MR'
            },
            {
              id: 'SR',
              label: 'SR'
            },
            {
              id: 'R',
              label: 'R'
            },
            {
              id: 'N',
              label: 'N'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    },
    element: {
      label: 'Party effects',
      collapsed: true,
      filters : [
        {
          id: 'element',
          type: 'list',
          items: [
            {
              id: 'fire',
              label: 'Fire'
            },
            {
              id: 'ice',
              label: 'Ice'
            },
            {
              id: 'wind',
              label: 'Wind'
            },
            {
              id: 'earth',
              label: 'Earth'
            },
            {
              id: 'lightning',
              label: 'Lightning'
            },
            {
              id: 'water',
              label: 'Water'
            },
            {
              id: 'light',
              label: 'Light'
            },
            {
              id: 'dark',
              label: 'Dark'
            }
          ],
          values: [],
          isChecked: {},
          separator: true
        },
        {
          id: 'weapon',
          type: 'list',
          items: [
            {
              id: 'AXE',
              label: 'Axe'
            },
            {
              id: 'BOOK',
              label: 'Book'
            },
            {
              id: 'BOOMERANG',
              label: 'Boomerang'
            },
            {
              id: 'BOW',
              label: 'Bow'
            },
            {
              id: 'DAGGER',
              label: 'Dagger'
            },
            {
              id: 'FIST',
              label: 'Fist'
            },
            {
              id: 'GLOVE',
              label: 'Glove'
            },
            {
              id: 'GREATSWORD',
              label: 'Great Sword'
            },
            {
              id: 'GUN',
              label: 'Gun'
            },
            {
              id: 'KATANA',
              label: 'Katana'
            },
            {
              id: 'MACE',
              label: 'Mace'
            },
            {
              id: 'NINJABLADE',
              label: 'Ninja Blade'
            },
            {
              id: 'SHURIKEN',
              label: 'Shuriken'
            },
            {
              id: 'SPEAR',
              label: 'Spear'
            },
            {
              id: 'ROD',
              label: 'Staff'
            },
            {
              id: 'SWORD',
              label: 'Sword'
            }
          ],
          values: [],
          isChecked: {},
          separator: true
        },
        {
          id: 'weaponsGroup',
          type: 'list',
          items: [
            {
              id: 'SWORDA',
              label: 'Sword (Red Mage, etc)'
            },
            {
              id: 'SWORDB',
              label: 'Sword (Warrior, etc)'
            },
            {
              id: 'SWORDC',
              label: 'Sword (Knight, etc)'
            },
            {
              id: 'STAFFA',
              label: 'Staff (Black Mage, etc)'
            },
            {
              id: 'STAFFB',
              label: 'Staff (Devout, etc)'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    },
    cost: {
      label: 'Cost',
      collapsed: true,
      filters : [
        {
          id: 'cost',
          type: 'list',
          items: [],
          values: [],
          isChecked: {}
        }
      ]
    },
    limited: {
      label: 'Limited',
      collapsed: true,
      filters : [
        {
          id: 'limited',
          type: 'list',
          items: [
            {
              id: true,
              label: 'Yes'
            },
            {
              id: false,
              label: 'No'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    },
    onlyActiveSkill: {
      label: 'Skill',
      collapsed: true,
      filters : [
        {
          id: 'onlyActiveSkill',
          label: 'Only active skill ?',
          type: 'switch',
          value: false
        }
      ]
    }
  };

  itemType = 'card';
  linkType = 'cards';
  assetType = 'card';

  seoData = {
    title: 'Cards',
    desc: 'Find all cards from wotv in one place. Search them by name, skill and multiples filters.'
  };

  rawJobs = [];

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    @Inject(PLATFORM_ID) platformId: object,
    private cardService: CardService
  ) {
    super(
      translateService,
      navService,
      simpleModalService,
      toolService,
      sessionService,
      platformId
    );
  }

  async getItems() {
    const options = super.getOptions();

    let result = null;

    if (Object.keys(options).length === 0) {
      result = await this.cardService.getCardsForListingWithCosts(this.filtersSections, this.sort, this.order);
    } else {
      result = await this.cardService.getCardsForListingWithCosts(this.filtersSections, this.sort, this.order, options);
    }

    super.items = result.cards;
    super.rawItems = result.rawCards;
    this.rawJobs = result.rawJobs;

    if (Object.keys(options).length === 0) {
      for (const cost of result.costs) {
        this.filtersSections.cost.filters[0].items.push({
          id: cost,
          label: cost
        });
      }

      super.filterChecked();
    }

    this.filterItems();
  }

  filterItems() {
    super.items = this.cardService.filterCardsWithApi(this.rawItems, this.filtersSections, this.rawJobs, this.sort, this.order, true);
    super.countFilters();
  }
}
