import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { EquipmentService } from '../services/equipment.service';
import { SkillService } from '../services/skill.service';
import { RangeService } from '../services/range.service';
import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {
  equipment = null;
  specialBismark = false;
  activeTab;

  constructor(
    private equipmentService: EquipmentService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private unitService: UnitService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private jobService: JobService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      this.equipment = await this.equipmentService.getEquipmentBySlug(params.get('slug'));
      if (!this.equipment) {
        this.router.navigate([this.navService.getRoute('/equipment-not-found')]);
      } else {
        await this.formatEquipment();

        this.navService.setTitle(this.equipment.name);
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
      await this.formatEquipment();
    });
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

  private async formatEquipment() {
    if (this.equipment) {
      this.equipment.name = this.nameService.getName(this.equipment);
      this.equipment.statsTypes = Object.keys(this.equipment.stats);

      let i = 0;
      this.equipment.countSkills = [];
      this.equipment.effectTypes = [];
      this.equipment.passiveSkills = [];

      for (const equipmentLvl of this.equipment.formattedSkills) {
        this.equipment.countSkills.push(i);

        this.sortSkills(equipmentLvl);

        for (const skill of equipmentLvl) {
         skill.name = this.nameService.getName(skill);

          skill.effectsHtml = this.skillService.formatEquipmentEffects(this.equipment, skill);

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

            this.equipment.passiveSkills.push(skill);
          }
        }
        i++;
      }

      if (this.equipment.acquisition.type === 'tmr') {
        const unit = await this.getUnit(this.equipment.acquisition.unitId);
        if (unit) {
          this.equipment.acquisition.unit = {
            name: this.nameService.getName(unit),
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
        this.equipment.grows[growId].name = this.nameService.getName(this.equipment.grows[growId]);
        this.equipment.grows[growId].stats = {};
        this.equipment.statsTypes.forEach(statType => {
          const maxValue = this.equipment.stats[statType].max;
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
      });

      const usableStatsTypes = [];
      this.equipment.statsTypes.forEach(statType => {
        let maxDifferentZero = false;
        this.equipment.growIds.forEach(growId => {
          if (this.equipment.grows[growId].stats[statType] !== 0) {
            maxDifferentZero = true;
          }
        });

        if (maxDifferentZero || this.equipment.stats[statType].min !== 0) {
          usableStatsTypes.push(statType);
        }
      });
      this.equipment.statsTypes = usableStatsTypes;

      this.equipment.jobs = [];
      for (const jobId of this.equipment.equippableJobs) {
        const job = await this.jobService.getJob(jobId);
        if (job) {
          job.name = this.nameService.getName(job);
          this.equipment.jobs.push(job);
        }
      }

      this.equipment.units = [];
      for (const unitId of this.equipment.equippableUnits) {
        const unit = await this.getUnit(unitId);
        if (unit) {
          unit.name = this.nameService.getName(unit);
          this.equipment.units.push(unit);
        }
      }

      this.equipment.formattedMaterials = [];
      if (this.equipment.materials.length > 0) {
        for (let index = 0; index <= this.equipment.materials.length - 1; index++) {
          const items = this.equipment.materials[index];
          this.equipment.formattedMaterials.push([]);

          for (const itemId of Object.keys(items)) {
            let item = await this.itemService.getItem(itemId);

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

  private async getUnit(unitId) {
    return await this.unitService.getUnit(unitId);
  }

  clickSpecialBismark() {
    this.specialBismark = !this.specialBismark;
  }
}
