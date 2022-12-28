import { Component } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';
import { UnitService } from '../../services/unit.service';
import { JobService } from '../../services/job.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-unit-list',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class UnitListComponent extends SharedListComponent {
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
    job: {
      label: 'Jobs',
      collapsed: true,
      filters : [
        {
          id: 'mainJob',
          label: 'Only main job ?',
          type: 'switch',
          value: false
        },
        {
          id: 'subJob',
          label: 'Only sub job ?',
          type: 'switch',
          value: false
        },
        {
          id: 'secondMasterAbility',
          label: '2nd master ability ?',
          type: 'switch',
          value: false
        },
        {
          id: 'dream',
          label: 'dream available ?',
          type: 'switch',
          value: false
        },
        {
          id: 'job',
          type: 'list',
          items: [],
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
    equipment: {
      label: 'Equipment',
      collapsed: true,
      filters : [
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
          isChecked: {},
          separator: true
        },
        {
          id: 'armor',
          type: 'list',
          items: [
            {
              id: 'ARMOR',
              label: 'Armor'
            },
            {
              id: 'CLOTH',
              label: 'Cloth'
            },
            {
              id: 'HAT',
              label: 'Hat'
            },
            {
              id: 'HELM',
              label: 'Helm'
            },
            {
              id: 'SHIELD',
              label: 'Shield'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    }
  };

  itemType = 'unit';
  linkType = 'units';
  assetType = 'unit';

  seoData = {
    title: 'Units',
    desc: 'Find all units from wotv in one place. Search them by name, skill and multiples filters.'
  };

  rawJobs = [];
  hasRouteParams = false;

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private jobService: JobService
  ) {
    super(
      translateService,
      navService,
      simpleModalService,
      toolService,
      sessionService
    );

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateJobs();
    });
  }

  async ngOnInit() {
    super.ngOnInit();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.hasRouteParams = true;
      const filterType = params.get('filterType');
      const itemIds = params.get('itemIds');

      if (filterType && itemIds) {
        if (filterType === 'mainJob') {
          this.filtersSections.job.filters[0].value = true;
        }

        if (filterType === 'mainJob' || filterType === 'job') {
          this.filtersSections.job.collapsed = false;
          for (const jobId of itemIds.split(',')) {
            this.filtersSections.job.filters[4].values.push(this.jobService.getGenericJobId(jobId));
          }
        }

        this.filterChecked('rarity', false);
        this.filterItems();
      }
    });
  }

  async getItems() {
    const options = this.getOptions();

    let result = null;

    if (Object.keys(options).length === 0) {
      result = await this.unitService.getUnitsForListingWithCost(this.filtersSections, this.sort, this.order);
    } else {
      result = await this.unitService.getUnitsForListingWithCost(this.filtersSections, this.sort, this.order, options);
    }

    this.items = result.units;
    this.rawItems = result.rawUnits;
    this.rawJobs = result.rawJobs;

    if (Object.keys(options).length === 0) {
      for (const job of result.jobs) {
        this.filtersSections.job.filters[4].items.push({
          id: job.dataId,
          names: job.names
        });
      }
      this.translateJobs();

      for (const cost of result.costs) {
        this.filtersSections.cost.filters[0].items.push({
          id: cost,
          label: cost
        });
      }

      this.filterChecked('rarity', !this.hasRouteParams);
    }

    this.filterItems();
  }

  filterItems() {
    this.items = this.unitService.filterUnitsWithApi(this.rawItems, this.filtersSections, this.rawJobs, this.sort, this.order, true);
    this.countFilters();
  }

  private translateJobs() {
    this.filtersSections.job.filters[4].items.forEach(job => {
      job.label = this.toolService.getName(job);
    });
  }
}
