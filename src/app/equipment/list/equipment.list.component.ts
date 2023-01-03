import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';
import { EquipmentService } from '../../services/equipment.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-equipment-list',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class EquipmentListComponent extends SharedListComponent {
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
    type: {
      label: 'Types',
      collapsed: true,
      filters : [
        {
          id: 'type',
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
          id: 'type',
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
          isChecked: {},
          separator: true
        },
        {
          id: 'type',
          type: 'list',
          items: [
            {
              id: 'ACC',
              label: 'Accessory'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    },
    acquisition: {
      label: 'Acquisition',
      collapsed: true,
      filters : [
        {
          id: 'acquisition',
          type: 'list',
          items: [],
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
          id: 'job',
          type: 'list',
          items: [],
          values: [],
          isChecked: {}
        }
      ]
    },
    equipmentTypes: {
      label: 'Equipment Types',
      collapsed: true,
      filters : [
        {
          id: 'equipmentTypes',
          type: 'list',
          items: [],
          values: [],
          isChecked: {}
        }
      ]
    },
    equipmentStats: {
      label: 'Stats',
      collapsed: true,
      filters : [
        {
          id: 'equipmentStats',
          type: 'list',
          items: [],
          values: [],
          isChecked: {}
        }
      ]
    },
    extra: {
      label: 'Has Extra Star ?',
      collapsed: true,
      filters : [
        {
          id: 'extra',
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
    }
  };

  itemType = 'equipment';
  linkType = 'equipment';
  assetType = 'equipment';

  seoData = {
    title: 'Equipment',
    desc: 'Find all equipment from wotv in one place. Search them by name, skill and multiples filters.'
  };

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    @Inject(PLATFORM_ID) platformId: object,
    private equipmentService: EquipmentService
  ) {
    super(
      translateService,
      navService,
      simpleModalService,
      toolService,
      sessionService,
      platformId
    );

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateJobs();
    });
  }

  async getItems() {
    const options = super.getOptions();

    let result = null;

    if (Object.keys(options).length === 0) {
      result = await this.equipmentService.getEquipmentForListingWithAcquisitionTypes(this.filtersSections, this.sort, this.order);
    } else {
      result = await this.equipmentService.getEquipmentForListingWithAcquisitionTypes(this.filtersSections, this.sort, this.order, options);
    }

    super.items = result.equipments;
    super.rawItems = result.rawEquipments;

    if (Object.keys(options).length === 0) {
      for (const acquisitionType of result.acquisitionTypes) {
        this.filtersSections.acquisition.filters[0].items.push({
          id: acquisitionType,
          label: acquisitionType
        });

        if (acquisitionType !== 'Unknown') {
          this.filtersSections.acquisition.filters[0].values.push(acquisitionType);
        }
      }

      for (const equipmentType of result.equipmentTypes) {
        this.filtersSections.equipmentTypes.filters[0].items.push({
          id: equipmentType,
          label: equipmentType.split('###')[1]
        });
      }

      for (const job of result.jobs) {
        this.filtersSections.job.filters[0].items.push({
          id: job.dataId,
          names: job.names
        });
      }
      this.translateJobs();

      for (const equipment of this.items) {
        if (equipment.stats) {
          for (const statType of Object.keys(equipment.stats[equipment.stats.length - 1])) {
            const statFilter = this.filtersSections.equipmentStats.filters[0].items.find(searchedStat => searchedStat.id === statType);
            if (!statFilter) {
              const label = statType.replace('_', ' ');
              this.filtersSections.equipmentStats.filters[0].items.push({
                id: statType,
                label: label[0].toUpperCase() + label.slice(1, label.length).toLowerCase()
              });
            }
          }
        }
      }
      this.toolService.sortByName(this.filtersSections.equipmentStats.filters[0].items, 'asc', 'label');

      super.filterChecked();
    }

    this.filterItems();
  }

  filterItems() {
    super.items = this.equipmentService.filterEquipments(this.rawItems, this.filtersSections, this.sort, this.order, true);
    super.countFilters();
  }

  private translateJobs() {
    this.filtersSections.job.filters[0].items.forEach(job => {
      job.label = this.toolService.getName(job);
    });
  }
}
