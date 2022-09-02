import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { Router } from '@angular/router';

import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {

  constructor(
    private router: Router
  ) {}

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

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
