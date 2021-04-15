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
import { OtherUnitService } from '../services/otherunit.service';
import { JobService } from '../services/job.service';


@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit {
  quest = null;
  enemies = [];

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
    private equipmentService: EquipmentService,
    private jobService: JobService,
    private otherUnitService: OtherUnitService
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
        this.quest.formattedMissions.push(await this.formatMission(mission));
      }

      this.quest.formattedEnemies = [];
      let i = 0;
      for (const enemy of this.quest.enemies) {
        this.quest.formattedEnemies.push(await this.formatEnemyOrAlly(enemy, i, 'enemies'));
        i++;
      }

      this.quest.formattedAllies = [];
      i = 0;
      for (const ally of this.quest.allies) {
        this.quest.formattedAllies.push(await this.formatEnemyOrAlly(ally, i, 'allies'));
        i++;
      }

      this.quest.formattedObjects = [];
      i = 0;
      for (const object of this.quest.objects) {
        this.quest.formattedObjects.push(await this.formatOtherItem(object));
        i++;
      }

      this.quest.formattedSwitchs = [];
      i = 0;
      for (const rawSwitch of this.quest.switchs) {
        this.quest.formattedSwitchs.push(await this.formatOtherItem(rawSwitch));
        i++;
      }

      this.quest.formattedChests = [];
      i = 0;
      for (const chest of this.quest.chests) {
        this.quest.formattedChests.push(await this.formatOtherItem(chest));
        i++;
      }
    }

    console.log(this.quest);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  async formatMission(mission) {
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

    return formattedMission;
  }

  async formatEnemyOrAlly(enemy, index, type) {
    const formattedEnemy = await this.otherUnitService.getUnit(enemy.dataId);
    formattedEnemy.name = this.nameService.getName(formattedEnemy);

    if (enemy.element) {
      formattedEnemy.element = enemy.element;
    }

    if (enemy.lv) {
      formattedEnemy.level = enemy.lv;
    } else {
      formattedEnemy.level = 0;
    }

    formattedEnemy.job = null;
    if (formattedEnemy.jobs && formattedEnemy.jobs[0]) {
      formattedEnemy.job = await this.jobService.getJob(formattedEnemy.jobs[0]);
      formattedEnemy.job.name = this.nameService.getName(formattedEnemy.job);
    }

    this.quest[type][index].skills.forEach(skill => {
      // Do something ^^ ==> Get skill from skill service
    });

    console.log(formattedEnemy);

    return formattedEnemy;
  }

  async formatOtherItem(item) {
    const formattedItem = await this.otherUnitService.getUnit(item.dataId);
    formattedItem.name = this.nameService.getName(formattedItem);

    console.log(formattedItem);

    return formattedItem;
  }
}
