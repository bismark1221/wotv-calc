import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RaidService } from '../services/raid.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { UnitService } from '../services/unit.service';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-raid',
  templateUrl: './raid.component.html',
  styleUrls: ['./raid.component.css']
})
export class RaidComponent implements OnInit {
  raid = null;
  specialBismark = false;
  activeTab;

  constructor(
    private raidService: RaidService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private unitService: UnitService,
    private cardService: CardService,
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatRaid();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.raid = await this.raidService.getRaidBySlug(params.get('slug'));
      if (!this.raid) {
        this.router.navigate([this.navService.getRoute('/raid-not-found')]);
      } else {
        this.formatRaid();

        this.navService.setTitle(this.raid.bosses[0].name);
      }
    });

    this.activatedRoute.fragment.subscribe((fragment: string) => {
      switch (fragment) {
        case 'boss':
          this.activeTab = 1;
          break;
        case 'skills':
          this.activeTab = 2;
          break;
        default:
          break;
      }
    });
  }

  private async formatRaid() {
    if (this.raid) {
      for (const boss of this.raid.bosses) {
        boss.name = this.toolService.getName(boss);

        boss.totalBuffs = {
          HP: 0,
          TP: 0,
          INITIAL_AP: 0,
          ATK: 0,
          DEF: 0,
          MAG: 0,
          SPR: 0,
          DEX: 0,
          AGI: 0,
          LUCK: 0,
          CRITIC_RATE: 0,
        };
        boss.remainingBuffs = [];
        boss.formattedSkills = [];

        for (const skillData of boss.skills) {
          const skill = skillData.skill;

          if (skill) {
            skill.name = this.toolService.getName(skill);

            skill.effectsHtml = this.skillService.formatEffects(boss, skill);

            skill.damageHtml = this.skillService.formatDamage(boss, skill, skill.damage);

            if (skill.counter) {
              skill.counterHtml = this.skillService.formatCounter(boss, skill, skill.counter);
            }

            this.rangeService.formatRange(boss, skill);

            boss.formattedSkills.push(skill);
          }
        }

        if (boss.attack) {
          boss.formattedAttack = boss.attackSkill;
          if (boss.formattedAttack) {
            boss.formattedAttack.basedHtml = boss.formattedAttack.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + boss.formattedAttack.based.toLowerCase() + '.png\' />' : '';

            boss.formattedAttack.effectsHtml = this.skillService.formatEffects(boss, boss.formattedAttack);

            boss.formattedAttack.damageHtml = this.skillService.formatDamage(boss, boss.formattedAttack, boss.formattedAttack.damage);

            this.rangeService.formatRange(boss, boss.formattedAttack);
          }
        }
      }
    }
  }

  clickSpecialBismark() {
    this.specialBismark = !this.specialBismark;
  }
}
