import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService } from '@ngx-translate/core';

import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';
import { RaidService } from '../../services/raid.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-raid-list',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class RaidListComponent extends SharedListComponent {
  filtersSections = {
    element: {
      label: 'Elements',
      collapsed: false,
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
          isChecked: {}
        }
      ]
    }
  };

  itemType = 'raid';
  linkType = 'raids';
  assetType = 'otherUnit';

  seoData = {
    title: 'Raids',
    desc: 'Find all raids from wotv in one place. Can you beat them all ?'
  };

  sortTable = [
    'name'
  ];
  sort = 'name';
  order = 'asc';

  hideOptions = true;

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    @Inject(PLATFORM_ID) platformId: object,
    private raidService: RaidService
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
    super.rawItems = await this.raidService.getRaidsForListing(this.filtersSections, this.sort, this.order);
    super.items = this.rawItems;

    super.filterChecked('element');
    this.filterItems();
  }

  filterItems() {
    super.items = this.raidService.filterRaids(this.rawItems, this.filtersSections);
    super.countFilters();
  }
}
