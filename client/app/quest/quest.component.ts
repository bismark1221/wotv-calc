import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { QuestService } from '../services/quest.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';


@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  quest = null;

  constructor(
    private questService: QuestService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      if (this.quest) {
        await this.formatQuest();
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.quest = await this.questService.getQuestBySlug(params.get('slug'));
      if (!this.quest) {
        this.router.navigate([this.navService.getRoute('/quest-not-found')]);
      } else {
        await this.formatQuest();

        this.navService.setTitle(this.quest.name);
      }
    });
  }

  private async formatQuest() {
    if (this.quest) {
      this.quest.getName(this.translateService);
      this.quest.formattedMissions = [];
      for (const mission of this.quest.missions) {
        this.quest.formattedMissions.push({
          mission: await this.questService.formatMission(mission),
          reward: null
        });
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
