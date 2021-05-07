import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { QuestService } from '../services/quest.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-quests',
  templateUrl: './quests.component.html',
  styleUrls: ['./quests.component.css']
})
export class QuestsComponent implements OnInit {
  quests = [];
  searchText = '';
  sort = 'name';
  order = 'asc';
  filters = {
    type: []
  };
  isFilterChecked = {
    type: []
  };
  isCollapsedType = false;
  questTypes = [
    'story',
    'event',
    'hard_quest_unit',
    'multi',
    'character_quest',
    'esper_quest',
    'arena',
    'raid',
    'rank_pvp',
    'free_pvp',
    'friend_pvp',
    'gvg',
    'tuto',
    'beginner',
    'guild_quest',
    'selection',
    'draft_pvp',
    'hard_quest_vc',
    'tower'
  ];

  constructor(
    private questService: QuestService,
    private translateService: TranslateService,
    private navService: NavService,
    private authService: AuthService,
    private router: Router,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateQuests();
    });
  }

  ngOnInit() {
    this.navService.setTitle('Quests');

    if (sessionStorage.getItem('questsFilters')) {
      this.filters = JSON.parse(sessionStorage.getItem('questsFilters'));
    }
    this.filterChecked();

    this.getQuests();
  }

  async getQuests() {
    this.quests = await this.questService.getQuestsForListing(this.filters, this.sort, this.order);
    this.translateQuests();
  }

  private translateQuests() {
    this.quests.forEach(quest => {
      quest.name = this.nameService.getName(quest);
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  getFilteredQuests() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.quests.filter(quest => {
        return quest.name.toLowerCase().includes(text) || quest.slug.toLowerCase().includes(text);
      });
    } else {
      return this.quests;
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    sessionStorage.setItem('questsFilters', JSON.stringify(this.filters));
    this.filterChecked();

    this.getQuests();
  }

  filterChecked() {
    this.questTypes.forEach(type => {
      if (this.filters.type.indexOf(type) === -1) {
        this.isFilterChecked.type[type] = false;
      } else {
        this.isFilterChecked.type[type] = true;
      }
    });
  }

  formatType(type) {
    return this.questService.formatType(type);
  }
}
