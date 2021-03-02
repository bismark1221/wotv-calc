import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { RaidService } from '../services/raid.service';
import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { JobService } from '../services/job.service';
import { GridService } from '../services/grid.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
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
    private nameService: NameService,
    private unitService: UnitService,
    private cardService: CardService,
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.formatRaid();
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.raid = this.raidService.getRaidBySlug(params.get('slug'));
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
      this.raid.bosses.forEach(boss => {
        boss.name = this.nameService.getName(boss);

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

        boss.skillIds = Object.keys(boss.skills);

        boss.skillIds.forEach(skillId => {
          const skill = boss.skills[skillId];
          skill.name = this.nameService.getName(skill);

          skill.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(boss, skill, effect);
          });

          skill.damageHtml = this.skillService.formatDamage(boss, skill, skill.damage);

          if (skill.counter) {
            skill.counterHtml = this.skillService.formatCounter(boss, skill, skill.counter);
          }

          this.rangeService.formatRange(boss, skill);
        });

        if (boss.attack) {
          boss.attack.basedHtml = boss.attack.based ? '<img class=\'atkBasedImg\' src=\'assets/atkBased/' + boss.attack.based.toLowerCase() + '.png\' />' : '';

          boss.attack.effects.forEach(effect => {
            effect.formatHtml = this.skillService.formatEffect(boss, boss.attack, effect);
          });

          boss.attack.damageHtml = this.skillService.formatDamage(boss, boss.attack, boss.attack.damage);

          this.rangeService.formatRange(boss, boss.attack);
        }
      });

      this.raid.bonus.units.forEach(unit => {
        unit.unit = this.unitService.getUnit(unit.unitId);
      });

      for (const card of this.raid.bonus.cards) {
        card.card = await this.cardService.getCard(card.cardId);
      }
    }
  }

  clickSpecialBismark() {
    this.specialBismark = !this.specialBismark;
  }
}
