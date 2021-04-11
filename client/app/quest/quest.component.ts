import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { QuestService } from '../services/quest.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { ItemService } from '../services/item.service';
import { EquipmentService } from '../services/equipment.service';
import { AuthService } from '../services/auth.service';


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
    private authService: AuthService,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private itemService: ItemService,
    private equipmentService: EquipmentService
  ) {
    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      if (this.quest) {
        await this.formatQuest();
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.authService.$user.subscribe(async user => {
        if (user && await this.checkIfIlluminati()) {
          this.quest = await this.questService.getQuestBySlug(params.get('slug'));
          if (!this.quest) {
            this.router.navigate([this.navService.getRoute('/quest-not-found')]);
          } else {
            await this.formatQuest();

            this.navService.setTitle(this.quest.name);
          }
        } else if (user !== undefined) {
          this.router.navigate([this.navService.getRoute('/page-not-found')]);
        }
      });
    });
  }

  async checkIfIlluminati() {
    return await this.authService.getIlluminty().then(result => {
      return result;
    });
  }

  private async formatQuest() {
    if (this.quest) {
      this.quest.getName(this.translateService);
      this.quest.formattedMissions = [];
      for (const mission of this.quest.missions) {
        const formattedMission = {
          mission: await this.questService.formatMission(mission),
          rewards: []
        };

        for (const reward of mission.rewards) {
          const formattedReward = {
            type: reward.type,
            reward: null,
            value: reward.value
          };

          if (reward.type === 'item') {
            formattedReward.reward = await this.itemService.getItem(reward.rewardId, true);
          } else if (reward.type === 'equipment') {
            formattedReward.reward = await this.equipmentService.getEquipment(reward.rewardId);
            if (formattedReward.reward === undefined) {
              formattedReward.reward = await this.equipmentService.getEquipment(reward.rewardId.slice(0, -2));
              formattedReward.reward.name = this.nameService.getName(formattedReward.reward) + ' +' + reward.rewardId[reward.rewardId.length - 1];
            } else {
              formattedReward.reward.name = this.nameService.getName(formattedReward.reward);
            }
          } else if (reward.type === 'visiores') {
            formattedReward.reward = {
              image: 'visiores',
              name: 'Visiores'
            };
          }

          formattedMission.rewards.push(formattedReward);
        }

        this.quest.formattedMissions.push(formattedMission);
      }
    }

    console.log(this.quest);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
