import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../../services/equipment.service';
import { SkillService } from '../../services/skill.service';
import { RangeService } from '../../services/range.service';
import { UnitService } from '../../services/unit.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { JobService } from '../../services/job.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment.detail.component.html',
  styleUrls: ['./equipment.detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
  equipment = null;
  specialBismark = false;
  activeTab;

  showPassivesDetail = false;
  windowSize = 1230;

  statsTypesByRow = [[]];

  constructor(
    private equipmentService: EquipmentService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private unitService: UnitService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private toolService: ToolService,
    private jobService: JobService,
    private itemService: ItemService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  @HostListener('window:resize', []) onWindowResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.windowSize = window.innerWidth;

      this.getStatsTypesByRow();
    }
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.equipment = await this.equipmentService.getEquipmentBySlug(params.get('slug'));
      if (!this.equipment) {
        this.router.navigate([this.navService.getRoute('/equipment-not-found')]);
      } else {
        this.formatEquipment();

        this.navService.setSEO(this.equipment.names.en, this.equipment.descriptions.en);
      }
    });

    this.activatedRoute.fragment.subscribe((fragment: string) => {
      switch (fragment) {
        case 'equipment':
          this.activeTab = 1;
          break;
        case 'craft':
          this.activeTab = 2;
          break;
        default:
          break;
      }
    });

    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      this.formatEquipment();
    });

    this.onWindowResize();
  }

  private getStatsTypesByRow() {
    if (this.equipment) {
      this.statsTypesByRow = [[]];
      if (!this.equipment.acquisition || this.equipment.acquisition.type !== 'tmr') {
        this.statsTypesByRow[0].push('');
      }

      this.equipment.statsTypes.forEach(statType => {
        if (this.windowSize < 830 && this.statsTypesByRow[this.statsTypesByRow.length - 1].length === 4) {
          if (this.statsTypesByRow[0][0] === '') {
            this.statsTypesByRow.push(['']);
          } else {
            this.statsTypesByRow.push([]);
          }
        }

        this.statsTypesByRow[this.statsTypesByRow.length - 1].push(statType);
      });
    }
  }

  private sortSkills(skills) {
    skills.sort((a: any, b: any) => {
      if (a.damage) {
        return -1;
      } else {
        if (a.effects.length > 1) {
          return -1;
        } else if (b.effects.length > 1) {
          return 1;
        } else {
          if (a.effects[0].type > b.effects[0].type) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    });
  }

  private formatEquipment() {
    if (this.equipment) {
      this.equipment.name = this.toolService.getName(this.equipment);
      this.equipment.description = this.toolService.getDescription(this.equipment);
      this.equipment.statsTypes = [];
      if (this.equipment.stats) {
        this.equipment.statsTypes = Object.keys(this.equipment.stats[this.equipment.stats.length - 1]);
      }

      let i = 0;
      this.equipment.countSkills = [];
      this.equipment.effectTypes = [];
      this.equipment.passiveSkills = [];

      for (const equipmentLvl of this.equipment.formattedSkills) {
        this.equipment.countSkills.push(i);

        this.sortSkills(equipmentLvl);

        for (const skill of equipmentLvl) {
         skill.name = this.toolService.getName(skill);

          skill.effectsHtml = this.skillService.formatEquipmentEffects(this.equipment, skill);
          skill.maxedEffectsHtml = this.skillService.formatEffects(this.equipment, skill);

          if (skill.damage) {
            skill.damageHtml = this.skillService.formatDamage(this.equipment, skill, skill.damage);
          }

          if (skill.counter) {
            skill.counterHtml = this.skillService.formatCounter(this.equipment, skill, skill.counter);
          }

          this.rangeService.formatRange(this.equipment, skill);

          if (skill.type === 'skill') {
            this.equipment.activeSkill = skill;
          }

          if (skill.type !== 'skill') {
            if (skill.effects[0]) {
              if (this.equipment.effectTypes.indexOf(skill.effects[0].type) === -1) {
                this.equipment.effectTypes.push(skill.effects[0].type);
              }
              skill.mainEffect = skill.effects[0].type;
            }

            if (skill.cond) {
              skill.cond.forEach(skillCond => {
                skillCond.items.forEach((itemCond, itemCondIndex) => {
                  if (skillCond.type === 'unit') {
                    const unitCond = this.equipment.rawUnits.find(searchedUnit => searchedUnit.dataId === itemCond);
                    skillCond.items[itemCondIndex] = {
                      image: unitCond.image,
                      name: this.toolService.getName(unitCond)
                    };
                  }

                  if (skillCond.type === 'mainjob') {
                    const jobCond = this.equipment.rawJobs.find(searchedJob => searchedJob.dataId === itemCond);
                    if (jobCond) {
                      skillCond.items[itemCondIndex] = {
                        image: jobCond.image,
                        name: this.toolService.getName(jobCond)
                      };
                    }
                  }
                });
              });
            }

            this.equipment.passiveSkills.push(skill);
          }
        }
        i++;
      }

      if (this.equipment.acquisition.type === 'tmr') {
        const unit = this.equipment.rawUnits.find(searchedUnit => searchedUnit.dataId === this.equipment.acquisition.unitId);
        if (unit) {
          this.equipment.acquisition.unit = {
            name: this.toolService.getName(unit),
            slug: unit.slug
          };
        } else {
          this.equipment.acquisition.unit = {
            name: 'Unknown',
            slug: 'Unknown'
          };
        }
      } else {
        let acquis = 'Unknown';
        if (this.equipment.acquisition.type !== 'Unknown') {
          if (!this.equipment.acquisition.type[this.translateService.currentLang]) {
            acquis = this.equipment.acquisition.type[this.translateService.getDefaultLang()];
          } else {
            acquis = this.equipment.acquisition.type[this.translateService.currentLang];
          }
        }
        this.equipment.acquisition.name = acquis;
      }

      this.equipment.growIds = Object.keys(this.equipment.grows);
      this.equipment.growIds.forEach(growId => {
        this.equipment.grows[growId].name = this.toolService.getName(this.equipment.grows[growId]);
        this.equipment.grows[growId].stats = {};

        this.equipment.statsTypes.forEach(statType => {
          const maxValue = this.equipment.stats[0][statType].max;
          if (typeof(this.equipment.grows[growId].curve[statType]) === 'number') {
            const value = maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100);
            if (value < 0 && value > -1) {
              this.equipment.grows[growId].stats[statType] = 0;
            } else {
              this.equipment.grows[growId].stats[statType] = Math.floor(value);
            }
          } else {
            this.equipment.grows[growId].stats[statType] = maxValue;
          }
        });

        if (JSON.stringify(this.equipment.stats[0]) !== JSON.stringify(this.equipment.stats[this.equipment.stats.length - 1])) {
          this.equipment.grows[growId].extraStats = {};

          this.equipment.statsTypes.forEach(statType => {
            const maxValue = this.equipment.stats[this.equipment.stats.length - 1][statType].max;
            if (typeof(this.equipment.grows[growId].curve[statType]) === 'number') {
              const value = maxValue + ((maxValue * this.equipment.grows[growId].curve[statType]) / 100);
              if (value < 0 && value > -1) {
                this.equipment.grows[growId].extraStats[statType] = 0;
              } else {
                this.equipment.grows[growId].extraStats[statType] = Math.floor(value);
              }
            } else {
              this.equipment.grows[growId].extraStats[statType] = maxValue;
            }
          });

        }

      });

      const usableStatsTypes = [];
      this.equipment.statsTypes.forEach(statType => {
        let maxDifferentZero = false;
        this.equipment.growIds.forEach(growId => {
          if (this.equipment.grows[growId].stats[statType] !== 0) {
            maxDifferentZero = true;
          }
        });

        if (maxDifferentZero || this.equipment.stats[0][statType].min !== 0) {
          usableStatsTypes.push(statType);
        }
      });
      this.equipment.statsTypes = usableStatsTypes;
      this.getStatsTypesByRow();

      this.equipment.jobs = [];
      for (const jobId of this.equipment.equippableJobs) {
        const job = this.equipment.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
        if (job) {
          job.name = this.toolService.getName(job);
          this.equipment.jobs.push(job);
        }
      }

      this.equipment.units = [];
      for (const unitId of this.equipment.equippableUnits) {
        const unit = this.equipment.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId);
        if (unit) {
          unit.name = this.toolService.getName(unit);
          this.equipment.units.push(unit);
        }
      }

      this.equipment.formattedMaterials = [];
      if (this.equipment.materials.length > 0) {
        for (let index = 0; index <= this.equipment.materials.length - 1; index++) {
          const items = this.equipment.materials[index];
          this.equipment.formattedMaterials.push([]);

          for (const itemId of Object.keys(items)) {
            let item = this.equipment.rawItems.find(searchedItem => searchedItem.dataId === itemId);

            if (item) {
              item = JSON.parse(JSON.stringify(item));

              item.image = item.dataId.toLowerCase();
              item.count = items[itemId];
              this.equipment.formattedMaterials[index].push(item);
            } else {
              this.equipment.formattedMaterials[index].push({
                image: itemId.toLowerCase(),
                count: items[itemId],
                name: itemId
              });
            }
          }
        }
      }
    }
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  clickSpecialBismark() {
    this.specialBismark = !this.specialBismark;
  }

  tooglePassiveDetail() {
    this.showPassivesDetail = !this.showPassivesDetail;
  }
}
