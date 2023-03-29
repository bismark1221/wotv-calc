import { Component, OnInit, ViewChild, HostListener, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';

import { TranslateService } from '../../services/translate.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';

import { SharedSearchOptionsModalComponent } from '../searchOptionsModal/shared.searchOptionsModal.component';

@Component({
  selector: 'app-shared-list',
  templateUrl: './shared.list.component.html',
  styleUrls: ['./shared.list.component.css']
})
export class SharedListComponent implements OnInit {
  rawItems = [];
  items = [];
  itemType = '';
  searchText = '';
  sort = 'releaseDate';
  order = 'desc';

  filtersSections: any = {};
  filtersSectionsTypes = [];

  showMobileFilters = false;
  showMobileSortOrder = false;

  filtersCount = 0;

  @ViewChild('leftBlock') leftBlock: ElementRef;
  @ViewChild('SearchBar') ngselect;
  searchForm: UntypedFormGroup;

  seoData = {
    title: '',
    desc: ''
  };

  sortTable = [
    'rarity',
    'name',
    'releaseDate',
    'updatedDate'
  ];

  hideOptions = false;
  showAsList = false;
  listColumns = [];

  constructor(
    protected translateService: TranslateService,
    private navService: NavService,
    private simpleModalService: SimpleModalService,
    protected toolService: ToolService,
    protected sessionService: SessionService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.translateService.onLangChange.subscribe((event) => {
      this.translateItems();
    });
  }

  async ngOnInit() {
    this.navService.setSEO(this.seoData.title, this.seoData.desc);

    this.filtersSectionsTypes = Object.keys(this.filtersSections);
    this.filtersSectionsTypes.forEach(filtersSectionsType => {
      this.filtersSections[filtersSectionsType].collapsed = true;
    });

    await this.getItems();

    this.searchForm = new UntypedFormGroup({
      searchOptions: new UntypedFormControl()
    });
  }

  getOptions() {
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

    return options;
  }

  async getItems() {}

  filterItems() {}

  countFilters() {
    this.filtersCount = 0;

    this.filtersSectionsTypes.forEach(filtersSectionsType => {
      this.filtersSections[filtersSectionsType].filters.forEach(filter => {
        if (filter.type === 'list') {
          this.filtersCount += filter.values.length;
        } else if (filter.type === 'switch') {
          this.filtersCount += filter.value ? 1 : 0;
        }
      });
    });
  }

  protected translateItems() {
    this.items.forEach(item => {
      item.name = this.toolService.getName(item);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredItems() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.items.filter(item => {
        return item.name.toLowerCase().includes(text) || item.slug.toLowerCase().includes(text);
      });
    } else {
      return this.items;
    }
  }

  filterList(section, filterIndex, value) {
    if (this.filtersSections[section].filters[filterIndex].values.indexOf(value) === -1) {
      this.filtersSections[section].filters[filterIndex].values.push(value);
    } else {
      this.filtersSections[section].filters[filterIndex].values.splice(this.filtersSections[section].filters[filterIndex].values.indexOf(value), 1);
    }

    this.sessionService.set(this.itemType + 'sFilters', JSON.stringify(this.filtersSections));

    this.filterItems();
  }

  unselectAllType(section, filterIndex) {
    this.filtersSections[section].filters[filterIndex].values = [];
    this.filtersSections[section].filters[filterIndex].items.forEach(item => {
      this.filtersSections[section].filters[filterIndex].isChecked[item.id] = false;
    });

    this.sessionService.set(this.itemType + 'sFilters', JSON.stringify(this.filtersSections));

    this.filterItems();
  }

  filterChecked(testFilter = 'rarity', getOldFilters = true) {
    if (getOldFilters) {
      this.getOldFilters(testFilter);
    }

    this.filtersSectionsTypes.forEach(filterType => {
      this.filtersSections[filterType].filters.forEach(filter => {
        if (filter.type === 'list') {
          filter.items.forEach(item => {
            if (filter.values.indexOf(item.id) === -1) {
              filter.isChecked[item.id] = false;
            } else {
              filter.isChecked[item.id] = true;
            }
          });
        }
      });
    });
  }

  private getOldFilters(testFilter) {
    const sessionFilters = this.sessionService.get(this.itemType + 'sFilters');
    if (sessionFilters) {
      const oldFilters = JSON.parse(sessionFilters);
      if (oldFilters && oldFilters[testFilter] && oldFilters[testFilter].label) {
        for (const filtersSectionsType of Object.keys(this.filtersSections)) {
          if (oldFilters[filtersSectionsType]) {
            this.filtersSections[filtersSectionsType].collapsed = oldFilters[filtersSectionsType].collapsed;

            for (let i = 0; i <= oldFilters[filtersSectionsType].filters.length - 1; i++) {
              if (this.filtersSections[filtersSectionsType].filters[i].values) {
                this.filtersSections[filtersSectionsType].filters[i].values = oldFilters[filtersSectionsType].filters[i].values;
              } else if (typeof this.filtersSections[filtersSectionsType].filters[i].value == 'boolean') {
                this.filtersSections[filtersSectionsType].filters[i].value = oldFilters[filtersSectionsType].filters[i].value;
              }
            }
          }
        }
      }
    }
  }

  toogleCollapse(section) {
    this.filtersSections[section].collapsed = !this.filtersSections[section].collapsed;
    this.sessionService.set(this.itemType + 'sFilters', JSON.stringify(this.filtersSections));
  }

  async toggleSwitchFilter(section, filterIndex) {
    this.filtersSections[section].filters[filterIndex].value = !this.filtersSections[section].filters[filterIndex].value;

    this.filterItems();
    this.sessionService.set(this.itemType + 'sFilters', JSON.stringify(this.filtersSections));
  }

  onSearchBarClose() {
    this.ngselect.searchTerm = this.searchText;
    this.ngselect.searchInput.nativeElement.value = this.searchText;
    this.getFilteredItems();
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
      this.getItems();
    }
  }

  onSearchBarUpdateTerm($event) {
    if ($event.term[0] !== '!') {
      this.searchText = $event.term;
      this.getFilteredItems();
    }
  }

  openSearchOptionsModal() {
    this.simpleModalService.addModal(SharedSearchOptionsModalComponent);
  }

  toogleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  removeAllFilters() {
    for (const filtersSectionsType of Object.keys(this.filtersSections)) {
      for (const filter of this.filtersSections[filtersSectionsType].filters) {
        if (filter.type === 'list') {
          filter.values = [];
        } else if (filter.type === 'switch') {
          filter.value = false;
        }
      }
    }

    this.sessionService.set(this.itemType + 'sFilters', JSON.stringify(this.filtersSections));

    this.filterChecked(null, false);
    this.filterItems();
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll($event) {
    if (isPlatformBrowser(this.platformId)) {
      if ($event.srcElement.documentElement.scrollTop >= 60) {
        this.leftBlock.nativeElement.style.height = window.innerHeight + 'px';
        this.leftBlock.nativeElement.style.top = '0';
      } else {
        this.leftBlock.nativeElement.style.height = (window.innerHeight - (60 - $event.srcElement.documentElement.scrollTop)) + 'px';
        this.leftBlock.nativeElement.style.top = (60 - $event.srcElement.documentElement.scrollTop) + 'px';
      }
    }
  }

  formatVariable(id, value) {
    return value;
  }
}
