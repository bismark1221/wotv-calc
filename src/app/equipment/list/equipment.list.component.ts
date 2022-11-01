import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EquipmentService } from '../../services/equipment.service';
import { NavService } from '../../services/nav.service';
import { JobService } from '../../services/job.service';
import { ToolService } from '../../services/tool.service';

import { SharedSearchOptionsModalComponent } from '../../shared/searchOptionsModal/shared.searchOptionsModal.component';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment.list.component.html',
  styleUrls: ['./equipment.list.component.css']
})
export class EquipmentListComponent implements OnInit {
  rawEquipments = [];
  equipments = [];
  acquisitionTypes;
  equipmentTypes = [];
  equipmentStats = [];
  searchText = '';
  sort = 'releaseDate';
  order = 'desc';
  jobs = [];
  filters = {
    rarity: [],
    type: [],
    job: [],
    acquisition: [],
    equipmentTypes: [],
    equipmentStats: [],
    extra: []
  };

  isFilterChecked = {
    rarity: [],
    type: [],
    job: [],
    acquisition: [],
    equipmentTypes: [],
    equipmentStats: [],
    extra: []
  };

  collapsed = {
    rarity: true,
    type: true,
    job: true,
    acquisition: true,
    equipmentTypes: true,
    equipmentStats: false,
    extra: true
  };

  rarities = [
    'UR',
    'MR',
    'SR',
    'R',
    'N'
  ];

  weapons = [
    'AXE',
    'BOOK',
    'BOW',
    'DAGGER',
    'FIST',
    'GLOVE',
    'GREATSWORD',
    'GUN',
    'KATANA',
    'MACE',
    'NINJABLADE',
    'ROD',
    'SPEAR',
    'SWORD',
    'BOOMERANG'
  ];

  armors = [
    'ARMOR',
    'CLOTH',
    'HAT',
    'HELM',
    'SHIELD'
  ];

  filtersCount = 0;

  @ViewChild('SearchBar') ngselect;
  searchForm: UntypedFormGroup;

  constructor(
    private equipmentService: EquipmentService,
    private translateService: TranslateService,
    private navService: NavService,
    private jobService: JobService,
    private simpleModalService: SimpleModalService,
    private toolService: ToolService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEquipments();
      this.translateJobs();
    });
  }

  async ngOnInit() {
    this.navService.setTitle('Equipment');

    await this.getEquipments();

    this.searchForm = new UntypedFormGroup({
      searchOptions: new UntypedFormControl()
    });
  }

  async getEquipments() {
    const options = {};

    if (this.searchForm) {
      for (const option of this.searchForm.get('searchOptions').value) {
        const optionTable = option.label.substring(1).split('=');
        if (!options[optionTable[0]]) {
          options[optionTable[0]] = [];
        }
        options[optionTable[0]].push(optionTable[1]);
      }
    }

    let result = null;

    if (Object.keys(options).length === 0) {
      result = await this.equipmentService.getEquipmentForListingWithAcquisitionTypes(this.filters, this.sort, this.order);
    } else {
      result = await this.equipmentService.getEquipmentForListingWithAcquisitionTypes(this.filters, this.sort, this.order, options);
    }

    this.equipments = result.equipments;
    this.rawEquipments = result.rawEquipments;

    if (Object.keys(options).length === 0) {
      this.acquisitionTypes = result.acquisitionTypes;
      this.equipmentTypes = result.equipmentTypes;
      this.jobs = result.jobs;

      this.acquisitionTypes.forEach(type => {
        if (type !== 'Unknown') {
          this.filters.acquisition.push(type);
        }
      });

      this.equipmentStats = [];
      for (const equipment of this.equipments) {
        if (equipment.stats) {
          for (const statType of Object.keys(equipment.stats[equipment.stats.length - 1])) {
            if (this.equipmentStats.indexOf(statType) === -1) {
              this.equipmentStats.push(statType);
            }
          }
        }
      }
      this.equipmentStats.sort();

      if (sessionStorage.getItem('equipmentFilters')) {
        this.filters = JSON.parse(sessionStorage.getItem('equipmentFilters'));
      }
      if (sessionStorage.getItem('equipmentCollapsed')) {
        this.collapsed = JSON.parse(sessionStorage.getItem('equipmentCollapsed'));
      }

      this.filterEquipments();
    }

    this.filterChecked();
  }

  filterEquipments() {
    this.equipments = this.equipmentService.filterEquipments(this.rawEquipments, this.filters, this.sort, this.order);
    this.countFilters();
  }

  countFilters() {
    this.filtersCount = this.filters.rarity.length
      + this.filters.type.length
      + this.filters.job.length
      + this.filters.acquisition.length
      + this.filters.equipmentTypes.length
      + this.filters.equipmentStats.length
      + this.filters.extra.length;
  }

  private translateJobs() {
    this.jobs.forEach(job => {
      job.name = this.toolService.getName(job);
    });

    this.toolService.sortByName(this.jobs);
  }

  private translateEquipments() {
    this.equipments.forEach(equipment => {
      equipment.name = this.toolService.getName(equipment);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredEquipments() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.equipments.filter(equipment => {
        return equipment.name.toLowerCase().includes(text) || equipment.slug.toLowerCase().includes(text);
      });
    } else {
      return this.equipments;
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('equipmentFilters', JSON.stringify(this.filters));

    this.filterEquipments();
  }

  unselectAllType() {
    this.filters.acquisition = [];

    sessionStorage.setItem('equipmentFilters', JSON.stringify(this.filters));
    this.filterChecked();

    this.filterEquipments();
  }

  filterChecked() {
    this.rarities.forEach(rarity => {
      if (this.filters.rarity.indexOf(rarity) === -1) {
        this.isFilterChecked.rarity[rarity] = false;
      } else {
        this.isFilterChecked.rarity[rarity] = true;
      }
    });

    this.weapons.forEach(weapon => {
      if (this.filters.type.indexOf(weapon) === -1) {
        this.isFilterChecked.type[weapon] = false;
      } else {
        this.isFilterChecked.type[weapon] = true;
      }
    });

    this.armors.forEach(armor => {
      if (this.filters.type.indexOf(armor) === -1) {
        this.isFilterChecked.type[armor] = false;
      } else {
        this.isFilterChecked.type[armor] = true;
      }
    });

    if (this.filters.type.indexOf('ACC') === -1) {
      this.isFilterChecked.type['ACC'] = false;
    } else {
      this.isFilterChecked.type['ACC'] = true;
    }

    this.acquisitionTypes.forEach(acquisition => {
      if (this.filters.acquisition.indexOf(acquisition) === -1) {
        this.isFilterChecked.acquisition[acquisition] = false;
      } else {
        this.isFilterChecked.acquisition[acquisition] = true;
      }
    });

    this.equipmentStats.forEach(equipmentStat => {
      if (this.filters.equipmentStats.indexOf(equipmentStat) === -1) {
        this.isFilterChecked.equipmentStats[equipmentStat] = false;
      } else {
        this.isFilterChecked.equipmentStats[equipmentStat] = true;
      }
    });

    this.equipmentTypes.forEach(equipmentType => {
      if (this.filters.equipmentTypes.indexOf(equipmentType) === -1) {
        this.isFilterChecked.equipmentTypes[equipmentType] = false;
      } else {
        this.isFilterChecked.equipmentTypes[equipmentType] = true;
      }
    });

    this.jobs.forEach(job => {
      if (this.filters.job.indexOf(job.dataId) === -1) {
        this.isFilterChecked.job[job.dataId] = false;
      } else {
        this.isFilterChecked.job[job.dataId] = true;
      }
    });

    ['true', 'false'].forEach(extra => {
      if (this.filters.extra.indexOf(extra === 'true' ? true : false) === -1) {
        this.isFilterChecked.extra[extra] = false;
      } else {
        this.isFilterChecked.extra[extra] = true;
      }
    });
  }

  toogleCollapse(section) {
    this.collapsed[section] = !this.collapsed[section];
    sessionStorage.setItem('equipmentCollapsed', JSON.stringify(this.collapsed));
  }

  onSearchBarClose() {
    this.ngselect.searchTerm = this.searchText;
    this.ngselect.searchInput.nativeElement.value = this.searchText;
    this.getFilteredEquipments();
  }

  onSearchBarAdd($event) {
    const labelTable = $event.label.split('=');

    if ($event.label[0] !== '!' || labelTable.length !== 2 || labelTable[1] === '') {
      this.searchForm.get('searchOptions').value.pop();
      this.searchForm.get('searchOptions').patchValue(this.searchForm.get('searchOptions').value);

      if ($event.label[0] !== '!') {
        this.searchText = $event.label;
      }
    } else {
      this.getEquipments();
    }
  }

  onSearchBarUpdateTerm($event) {
    if ($event.term[0] !== '!') {
      this.searchText = $event.term;
      this.getFilteredEquipments();
    }
  }

  openSearchOptionsModal() {
    this.simpleModalService.addModal(SharedSearchOptionsModalComponent);
  }
}
