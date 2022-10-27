import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedTabComponent } from '../tab/shared.tab.component';

@Component({
  selector: 'app-shared-tabs',
  templateUrl: './shared.tabs.component.html',
  styleUrls: ['./shared.tabs.component.css']
})
export class SharedTabsComponent implements AfterContentInit {

  constructor(
    private router: Router
  ) {}

  @ContentChildren(SharedTabComponent) tabs: QueryList<SharedTabComponent>;

  ngAfterContentInit() {
    const activeTabs = this.tabs.filter((tab)=>tab.active);

    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab){
    if (tab.link) {
      this.router.navigate([tab.link]);
    }

    this.tabs.toArray().forEach(searchedTab => searchedTab.active = false);

    tab.active = true;
  }
}
