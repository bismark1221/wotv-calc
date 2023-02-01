import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '../../services/translate.service';
import { CardService } from '../../services/card.service';
import { SkillService } from '../../services/skill.service';
import { RangeService } from '../../services/range.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { JobService } from '../../services/job.service';
import { UnitService } from '../../services/unit.service';


@Component({
  selector: 'app-card-detail',
  templateUrl: './card.detail.component.html',
  styleUrls: ['./card.detail.component.css']
})
export class CardDetailComponent implements OnInit {
  card = null;
  jobs = [];
  showBuffDetail = false;

  windowSize = 1230;

  constructor(
    private cardService: CardService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private jobService: JobService,
    private unitService: UnitService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.translateService.onLangChange.subscribe((event) => {
      if (this.card) {
        this.formatCard();
      }
    });
  }

  @HostListener('window:resize', []) onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowSize = window.innerWidth;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.card = await this.cardService.getCardBySlug(params.get('slug'));
      if (!this.card) {
        this.router.navigate([this.navService.getRoute('/card-not-found')]);
      } else {
        this.formatCard();

        this.navService.setSEO(this.card.names.en, this.card.descriptions.en);
      }
    });

    this.onWindowResize();
  }

  private async formatCard() {
    if (this.card) {
      const skills = ['classic', 'awake', 'lvmax'];
      const buffTypes = ['unitBuffs', 'partyBuffs'];

      this.card.name = this.toolService.getName(this.card);
      this.card.description = this.toolService.getDescription(this.card);

      this.card.limited = this.cardService.isLimited(this.card.dataId);

      for (const buffType of buffTypes) {
        this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)] = [];
        for (const buffIds of this.card[buffType]) {
          const buffs = {};
          for (const skillType of skills) {
            if (buffIds[skillType]) {
              const buff = this.card.rawSkills.find(searchedSkill => searchedSkill.dataId === buffIds[skillType]);

              if (buff) {
                if (buff.type !== 'buff' && buff.type !== 'support' && buff.type !== 'party') {
                  buff.name = this.toolService.getName(buff);

                  buff.effectsHtml = this.skillService.formatEffects(this.card, buff);

                  buff.damageHtml = this.skillService.formatDamage(this.card, buff, buff.damage);

                  if (buff.counter) {
                    buff.counterHtml = this.skillService.formatCounter(this.card, buff, buff.counter);
                  }

                  this.rangeService.formatRange(this.card, buff);
                } else {
                  buff.effects.forEach(effect => {
                    effect.formatHtml = this.skillService.formatEffect(this.card, buff, effect, false);
                  });
                }

                buffs[skillType] = buff;
              }
            }
          }
          this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)].push(buffs);
        }
      }

      for (const buffType of buffTypes) {
        let i = 0;
        for (const buff of this.card[buffType]) {
          if (buff.cond) {
            for (const cond of buff.cond) {
              if (cond.type === 'mainJob') {
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  cond.formattedItems.push(this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId));
                }
              } else if (cond.type === 'job') {
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  cond.formattedItems.push(this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId));
                }
              } else if (cond.type === 'unit') {
                cond.formattedItems = [];
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  cond.formattedItems.push(this.card.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId));
                }
              }
            }
            this.card['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)][i].cond = buff.cond;
          }
          i++;
        }
      }


      this.card.star = 4;
      this.card.level = this.card.getLevelPerStar(this.card.rarity, this.card.star);
      this.card.changeLevel(this.toolService, this.skillService, this.rangeService);

      for (const buffType of ['self', 'party']) {
        this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)] = {
          no_cond: []
        };

        for (const effectType of Object.keys(this.card.buffs[buffType])) {
          for (const effect of this.card.buffs[buffType][effectType]) {
            const formattedEffect = {
              type: effectType,
              value: effect.value,
              calcType: effect.calcType,
              condition: effect.condition,
              buffOnCondition: effect.buffOnCondition
            };

            const formattedBuff = {
              effect: this.skillService.formatEffect(this.card, {}, formattedEffect),
              cond: effect.cond
            };

            if (effect.cond.length === 0) {
              this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)].no_cond.push(formattedBuff);
            } else {
              let condIds = '';
              for (const cond of effect.cond) {
                condIds += cond.type + '_' + cond.items.join('_');
              }

              if (!this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)][condIds]) {
                this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)][condIds] = [];
              }

              this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)][condIds].push(formattedBuff);
            }
          }
        }
      }

      for (const buff of this.card.formattedUnitBuffs) {
        if (buff.classic && buff.classic.type === 'skill') {
          let condIds = 'no_cond';
          if (buff.cond.length > 0) {
            condIds = '';
            for (const cond of buff.cond) {
              condIds += cond.type + '_' + cond.items.join('_');
            }
          }

          if (!this.card.buffs.formattedSelf[condIds]) {
            this.card.buffs.formattedSelf[condIds] = [];
          }

          this.card.buffs.formattedSelf[condIds].push({
            cond: buff.cond,
            skill: buff.classic
          });
        }
      }

      for (const buffType of ['self', 'party']) {
        if (this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)].no_cond.length === 0) {
          delete this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)].no_cond;
        }

        this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length) + 'Keys'] = Object.keys(this.card.buffs['formatted' + buffType[0].toUpperCase() + buffType.slice(1, buffType.length)]);
      }
    }
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  toogleShowBuffDetail() {
    this.showBuffDetail = !this.showBuffDetail;
  }

  goToUnitList(cond) {
    this.router.navigate([this.navService.getRoute('/units'), { filterType : cond.type, itemIds : cond.items }]);
  }
}
