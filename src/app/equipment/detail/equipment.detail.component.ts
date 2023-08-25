import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '../../services/translate.service';
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
      const equipment = await this.equipmentService.getEquipmentBySlug(params.get('slug'));

      if (!equipment) {
        this.router.navigate([this.navService.getRoute('/equipment-not-found')]);
      } else {
        this.formatEquipment(equipment);

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

    this.translateService.onLangChange.subscribe(async (event) => {
      this.formatEquipment(this.equipment);
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

  private formatEquipment(equipment) {
    if (equipment) {
      equipment.name = this.toolService.getName(equipment);
      equipment.description = this.toolService.getDescription(equipment);
      equipment.statsTypes = [];
      if (equipment.stats) {
        equipment.statsTypes = Object.keys(equipment.stats[equipment.stats.length - 1]);
      }

      let i = 0;
      equipment.countSkills = [];
      equipment.effectTypes = [];
      equipment.passiveSkills = [];

      for (const equipmentLvl of equipment.formattedSkills) {
        equipment.countSkills.push(i);

        this.sortSkills(equipmentLvl);

        for (const skill of equipmentLvl) {
         skill.name = this.toolService.getName(skill);

          skill.effectsHtml = this.skillService.formatEquipmentEffects(equipment, skill);
          skill.maxedEffectsHtml = this.skillService.formatEquipmentEffects(equipment, skill, true);

          if (skill.damage) {
            skill.damageHtml = this.skillService.formatDamage(equipment, skill, skill.damage);
          }

          if (skill.counter) {
            skill.counterHtml = this.skillService.formatCounter(equipment, skill, skill.counter);
          }

          this.rangeService.formatRange(equipment, skill);

          if (skill.type === 'skill') {
            equipment.activeSkill = skill;
          }

          if (skill.type !== 'skill') {
            if (skill.effects[0]) {
              if (equipment.effectTypes.indexOf(skill.effects[0].type) === -1) {
                equipment.effectTypes.push(skill.effects[0].type);
              }
              skill.mainEffect = skill.effects[0].type;
            }

            if (skill.cond) {
              skill.cond.forEach(skillCond => {
                skillCond.items.forEach((itemCond, itemCondIndex) => {
                  if (skillCond.type === 'unit' && typeof itemCond === 'string') {
                    const unitCond = equipment.rawUnits.find(searchedUnit => searchedUnit.dataId === itemCond);
                    skillCond.items[itemCondIndex] = {
                      image: unitCond.image,
                      name: this.toolService.getName(unitCond)
                    };
                  }

                  if (skillCond.type === 'mainjob') {
                    const jobCond = equipment.rawJobs.find(searchedJob => searchedJob.dataId === itemCond);
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

            equipment.passiveSkills.push(skill);
          }
        }
        i++;
      }

      if (equipment.acquisition.type === 'tmr') {
        const unit = equipment.rawUnits.find(searchedUnit => searchedUnit.dataId === equipment.acquisition.unitId);
        if (unit) {
          equipment.acquisition.unit = {
            name: this.toolService.getName(unit),
            slug: unit.slug
          };
        } else {
          equipment.acquisition.unit = {
            name: 'Unknown',
            slug: 'Unknown'
          };
        }
      } else {
        let acquis = 'Unknown';
        if (equipment.acquisition.type !== 'Unknown') {
          if (!equipment.acquisition.type[this.translateService.currentLang]) {
            acquis = equipment.acquisition.type[this.translateService.getDefaultLang()];
          } else {
            acquis = equipment.acquisition.type[this.translateService.currentLang];
          }
        }
        equipment.acquisition.name = acquis;
      }

      equipment.growIds = Object.keys(equipment.grows);
      equipment.growIds.forEach(growId => {
        equipment.grows[growId].name = this.toolService.getName(equipment.grows[growId]);
        equipment.grows[growId].stats = {};

        equipment.statsTypes.forEach(statType => {
          const maxValue = equipment.stats[0][statType].max;
          if (typeof(equipment.grows[growId].curve[statType]) === 'number') {
            const value = maxValue + ((maxValue * equipment.grows[growId].curve[statType]) / 100);
            if (value < 0 && value > -1) {
              equipment.grows[growId].stats[statType] = 0;
            } else {
              equipment.grows[growId].stats[statType] = Math.floor(value);
            }
          } else {
            equipment.grows[growId].stats[statType] = maxValue;
          }
        });

        if (JSON.stringify(equipment.stats[0]) !== JSON.stringify(equipment.stats[equipment.stats.length - 1])) {
          equipment.grows[growId].extraStats = {};

          equipment.statsTypes.forEach(statType => {
            const maxValue = equipment.stats[equipment.stats.length - 1][statType].max;
            if (typeof(equipment.grows[growId].curve[statType]) === 'number') {
              const value = maxValue + ((maxValue * equipment.grows[growId].curve[statType]) / 100);
              if (value < 0 && value > -1) {
                equipment.grows[growId].extraStats[statType] = 0;
              } else {
                equipment.grows[growId].extraStats[statType] = Math.floor(value);
              }
            } else {
              equipment.grows[growId].extraStats[statType] = maxValue;
            }
          });

        }

      });

      const usableStatsTypes = [];
      equipment.statsTypes.forEach(statType => {
        let maxDifferentZero = false;
        equipment.growIds.forEach(growId => {
          if (equipment.grows[growId].stats[statType] !== 0) {
            maxDifferentZero = true;
          }
        });

        if (maxDifferentZero || equipment.stats[0][statType].min !== 0) {
          usableStatsTypes.push(statType);
        }
      });
      equipment.statsTypes = usableStatsTypes;
      this.getStatsTypesByRow();

      equipment.jobs = [];
      for (const jobId of equipment.equippableJobs) {
        const job = equipment.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
        if (job) {
          job.name = this.toolService.getName(job);
          equipment.jobs.push(job);
        }
      }

      equipment.units = [];
      for (const unitId of equipment.equippableUnits) {
        const unit = equipment.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId);
        if (unit) {
          unit.name = this.toolService.getName(unit);
          equipment.units.push(unit);
        }
      }

      equipment.formattedMaterials = [];
      if (equipment.materials.length > 0) {
        for (let index = 0; index <= equipment.materials.length - 1; index++) {
          const items = equipment.materials[index];
          equipment.formattedMaterials.push([]);

          for (const itemId of Object.keys(items)) {
            let item = equipment.rawItems.find(searchedItem => searchedItem.dataId === itemId);

            if (item) {
              item = JSON.parse(JSON.stringify(item));

              item.image = item.dataId.toLowerCase();
              item.count = items[itemId];
              equipment.formattedMaterials[index].push(item);
            } else {
              equipment.formattedMaterials[index].push({
                image: itemId.toLowerCase(),
                count: items[itemId],
                name: itemId
              });
            }
          }
        }
      }

      this.equipment = equipment;
    }
  }

  getEquipementType(type) {
    return this.equipmentService.getFormatType(type);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }

  tooglePassiveDetail() {
    this.showPassivesDetail = !this.showPassivesDetail;
  }
}
