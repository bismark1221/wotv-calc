import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService } from '@ngx-translate/core';

import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';
import { EsperService } from '../../services/esper.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-esper-list',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class EsperListComponent extends SharedListComponent {
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
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    },
    element: {
      label: 'Elements',
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
            },
            {
              id: 'neutral',
              label: 'Neutral'
            }
          ],
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
    }
  };

  itemType = 'esper';
  linkType = 'espers';
  assetType = 'esper';

  seoData = {
    title: 'Espers',
    desc: 'Find all espers from wotv in one place. Search them by name, skill and multiples filters.'
  };

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    @Inject(PLATFORM_ID) platformId: object,
    private esperService: EsperService
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
      result = await this.esperService.getEspersForListingWithCosts(this.filtersSections, this.sort, this.order);
    } else {
      result = await this.esperService.getEspersForListingWithCosts(this.filtersSections, this.sort, this.order, options);
    }

    super.items = result.espers;
    super.rawItems = result.rawEspers;

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
    super.items = this.esperService.filterEspers(this.rawItems, this.filtersSections, this.sort, this.order, true);
    super.countFilters();
  }
}
