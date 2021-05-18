import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { HttpClient } from '@angular/common/http';

import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Unit } from '../entities/unit';

import { GridService } from './grid.service';
import { SkillService } from './skill.service';
import { RangeService } from './range.service';
import { JobService } from './job.service';
import { GuildService } from './guild.service';
import { MasterRanksService } from './mr.service';
import { NavService } from './nav.service';
import { NameService } from './name.service';
import { EquipmentService } from './equipment.service';
import { CardService } from './card.service';
import { EsperService } from './esper.service';
import { AuthService } from './auth.service';
import { ToolService } from './tool.service';
import { DataService } from './data.service';

@Injectable()
export class OtherUnitService {
  private JP_otherUnits: Unit[];
  private GL_otherUnits: Unit[];
  unit;

  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private gridService: GridService,
    private skillService: SkillService,
    private rangeService: RangeService,
    private jobService: JobService,
    private guildService: GuildService,
    private masterRanksService: MasterRanksService,
    private navService: NavService,
    private nameService: NameService,
    private equipmentService: EquipmentService,
    private cardService: CardService,
    private esperService: EsperService,
    private http: HttpClient,
    private firestore: AngularFirestore,
    private authService: AuthService,
    private toolService: ToolService,
    private dataService: DataService
  ) {}

  private getRaw(forcedVersion = null) {
    return this.dataService.loadData('otherUnits', forcedVersion);
  }

  async getUnits(forcedVersion = null) {
    if (this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_otherUnits'] === null
      || this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_otherUnits'] === undefined
    ) {
      const units: Unit[] = [];
      const rawUnits = JSON.parse(JSON.stringify(await this.getRaw(forcedVersion)));

      Object.keys(rawUnits).forEach(unitId => {
        const unit = new Unit();
        unit.constructFromJson(rawUnits[unitId], this.translateService);
        units.push(unit);
      });

      this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_otherUnits'] = units;
    }

    return this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_otherUnits'];
  }

  async getUnitsForListing(filters = null, sort = 'name', order = 'asc') {
    await this.getUnits();
    const units = await this.filterUnits(this[this.navService.getVersion() + '_otherUnits'], filters);

    switch (sort) {
      case 'name' :
        this.toolService.sortByName(units, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return units;
  }

  private async filterUnits(units, filters) {
    if (filters) {
      const filteredUnits = [];

      for (const unit of units) {
        // if ((filters.species.length === 0 || filters.species.indexOf(unit.element) !== -1)
        // ) {
          filteredUnits.push(unit);
        // }
      }

      return filteredUnits;
    } else {
      return units;
    }
  }

  async getUnit(id, forcedVersion = null) {
    await this.getUnits(forcedVersion);

    return this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_otherUnits'].find(unit => unit.dataId === id);
  }

  async getUnitBySlug(slug) {
    await this.getUnits();

    return this[this.navService.getVersion() + '_otherUnits'].find(unit => unit.slug === slug);
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_otherUnits' : 'units';
  }

  getAvailableStatType() {
    return this.unit.getAvailableStatType();
  }

  getActiveSkills() {
    this.unit.getActiveSkills(true, this.nameService, this.skillService, this.rangeService);
  }
}
