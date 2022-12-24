import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

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

  @ViewChild('SearchBar') ngselect;
  searchForm: UntypedFormGroup;

  seoData = {
    title: '',
    desc: ''
  };

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
    private simpleModalService: SimpleModalService,
    private toolService: ToolService,
    public sessionService: SessionService,
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
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

  private translateItems() {
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

  filterChecked() {
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
}
