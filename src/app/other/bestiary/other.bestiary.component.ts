import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService } from '@ngx-translate/core';


import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';
import { OtherUnitService } from '../../services/otherunit.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-other-bestiary',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class OtherBestiaryComponent extends SharedListComponent {

  filtersSections = {
    species: {
      label: 'Species',
      collapsed: false,
      filters : [
        {
          id: 'species',
          type: 'list',
          items: [
            {
              id: 'human',
              label: 'Human'
            },
            {
              id: 'netherBeast',
              label: 'NetherBeast'
            },
            {
              id: 'beast',
              label: 'Beast'
            },
            {
              id: 'demon',
              label: 'Demon'
            },
            {
              id: 'dragon',
              label: 'Dragon'
            },
            {
              id: 'plant',
              label: 'Plant'
            },
            {
              id: 'bird',
              label: 'Bird'
            },
            {
              id: 'insect',
              label: 'Insect'
            },
            {
              id: 'aquatic',
              label: 'Aquatic'
            },
            {
              id: 'machine',
              label: 'Machine'
            },
            {
              id: 'fairy',
              label: 'Fairy'
            },
            {
              id: 'undead',
              label: 'Undead'
            },
            {
              id: 'stone',
              label: 'Stone'
            },
            {
              id: 'metal',
              label: 'Metal'
            },
            {
              id: 'arcana',
              label: 'Arcana'
            },
            {
              id: 'slime',
              label: 'Slime'
            },
            {
              id: '???',
              label: '???'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    }
  };

  sortTable = [
    'name'
  ];
  sort = 'name';
  order = 'asc';

  hideOptions = true;

  itemType = 'otherUnit';
  linkType = 'other/unit';
  assetType = 'otherUnit';

  seoData = {
    title: 'Bestiary',
    desc: 'Find all enemies from wotv in one place. Can you beat them all ?'
  };

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    private otherUnitService: OtherUnitService
  ) {
    super(
      translateService,
      navService,
      simpleModalService,
      toolService,
      sessionService
    );
  }

  async getItems() {
    super.rawItems = await this.otherUnitService.getUnitsForListing(this.filtersSections, this.sort, this.order);
    super.items = this.rawItems;

    super.filterChecked('species');
    this.filterItems();
  }

  filterItems() {
    super.items = this.otherUnitService.filterUnits(this.rawItems, this.filtersSections);
    super.countFilters();
  }
}
