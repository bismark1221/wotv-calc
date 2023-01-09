import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { TranslateService } from '@ngx-translate/core';

import { QuestService } from '../../services/quest.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SessionService } from '../../services/session.service';

import { SharedListComponent } from '../../shared/list/shared.list.component';

@Component({
  selector: 'app-quest-list',
  templateUrl: '../../shared/list/shared.list.component.html',
  styleUrls: ['../../shared/list/shared.list.component.css']
})
export class QuestListComponent extends SharedListComponent {
  filtersSections = {
    type: {
      label: 'Type',
      collapsed: true,
      filters : [
        {
          id: 'type',
          type: 'list',
          items: [
            {
              id: 'story',
              label: 'Story'
            },
            {
              id: 'event',
              label: 'Event'
            },
            {
              id: 'hard_quest_unit',
              label: 'Hard Quest (Unit)'
            },
            {
              id: 'multi',
              label: 'Multi'
            },
            {
              id: 'character_quest',
              label: 'Character Quest'
            },
            {
              id: 'esper_quest',
              label: 'Beast\'s Den'
            },
            {
              id: 'arena',
              label: 'Arena'
            },
            {
              id: 'raid',
              label: 'Raid'
            },
            {
              id: 'rank_pvp',
              label: 'Rank PVP'
            },
            {
              id: 'free_pvp',
              label: 'Free PVP'
            },
            {
              id: 'friend_pvp',
              label: 'Friend PVP'
            },
            {
              id: 'gvg',
              label: 'GVG'
            },
            {
              id: 'tuto',
              label: 'Tutorial'
            },
            {
              id: 'beginner',
              label: 'Beginner'
            },
            {
              id: 'guild_quest',
              label: 'Guild Quest'
            },
            {
              id: 'selection',
              label: 'Selection Quest'
            },
            {
              id: 'draft_pvp',
              label: 'Draft PVP'
            },
            {
              id: 'hard_quest_vc',
              label: 'Hard Quest (Card)'
            },
            {
              id: 'tower',
              label: 'Tower'
            },
            {
              id: 'guild_raid',
              label: 'Guild raid'
            },
            {
              id: 'guild_base_battle',
              label: 'Guild base battle'
            }
          ],
          values: [],
          isChecked: {}
        }
      ]
    }
  };

  itemType = 'quest';
  linkType = 'quests';

  seoData = {
    title: 'Quests',
    desc: 'Find all quests from wotv in one place. Can you beat them all ?'
  };

  sortTable = [
    'lastRelease',
    'name'
  ];
  sort = 'lastRelease';
  order = 'desc';

  hideOptions = true;
  showAsList = true;
  listColumns = [
    {
      id: 'type',
      label: 'Type',
      colType: 'formatVariable',
      labelClass: 'typeTd'
    },
    {
      id: 'name',
      label: 'Name',
      valueClass: 'boldLeftAligneTd',
      colType: 'link'
    },
    {
      id: 'nrg',
      label: 'NRG',
      labelClass: 'nrgTd',
      colType: 'variable',
      showOnMobile: false
    },
    {
      id: 'exp',
      label: 'XP',
      labelClass: 'xpTd',
      colType: 'variable',
      showOnMobile: false
    }
  ];

  constructor(
    translateService: TranslateService,
    navService: NavService,
    simpleModalService: SimpleModalService,
    toolService: ToolService,
    sessionService: SessionService,
    @Inject(PLATFORM_ID) platformId: object,
    private questService: QuestService
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
    super.rawItems = await this.questService.getQuestsForListing(this.filtersSections, this.sort, this.order);
    super.items = this.rawItems;

    super.filterChecked('type');
    this.filterItems();
  }

  filterItems() {
    super.items = this.questService.filterQuests(this.rawItems, this.filtersSections, this.sort, this.order);
    super.countFilters();
  }

  formatVariable(id, value) {
    if (id === 'type') {
      return this.questService.formatType(value);
    } else {
      return value;
    }
  }
}
