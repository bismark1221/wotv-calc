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
export class UnitService {
  private JP_units: Unit[];
  private GL_units: Unit[];
  unit;

  private glExcluUnits = [
    'UN_LW_P_FRVA'
  ];

  private GL_limitedUnits = [
    'UN_LW_P_FRVA',
    'UN_LW_P_DEAN',
    'UN_FF14_P_YSTL',
    'UN_FF14_P_TNCR',
    'UN_FF1_P_WROL',
    'UN_FFT_P_RAMZ',
    'UN_FFT_P_GFGR',
    'UN_FFT_P_ORND',
    'UN_FFT_P_AGRA',
    'UN_FFT_P_DELT',
    'UN_FFT_P_MSTD',
    'UN_FF4_P_CECL',
    'UN_FF4_P_ROSA',
    'UN_FF4_P_KAIN',
    'UN_FF10_P_TIDU',
    'UN_FF10_P_YUNA',
    'UN_FF10_P_ARON',
    'UN_LW_P_RYER_01',
    'UN_LW_P_RIRY_01',
    'UN_LW_P_VNLA_01',
    'UN_LW_P_RAMD_01',
    'UN_LW_P_MACR_01',
    'UN_LW_P_VKTR_01',
    'UN_NIER_P_N2TB',
    'UN_NIER_P_N9TS',
    'UN_LW_P_THLA_01',
    'UN_FF7_P_CLUD',
    'UN_FF7_P_TIFA',
    'UN_LW_P_KTON_01',
    'UN_LW_P_LILS_01',
    'UN_FF7_P_AERT',
    'UN_FF7_P_BART'
  ];

  private JP_limitedUnits = [
    'UN_LW_P_FRVA',
    'UN_FF14_P_YSTL',
    'UN_FF14_P_TNCR',
    'UN_FF1_P_WROL',
    'UN_FFT_P_RAMZ',
    'UN_FFT_P_GFGR',
    'UN_FFT_P_ORND',
    'UN_FFT_P_AGRA',
    'UN_FFT_P_DELT',
    'UN_FFT_P_MSTD',
    'UN_FF4_P_CECL',
    'UN_FF4_P_ROSA',
    'UN_FF4_P_KAIN',
    'UN_FF10_P_TIDU',
    'UN_FF10_P_YUNA',
    'UN_FF10_P_ARON',
    'UN_LW_P_RYER_01',
    'UN_LW_P_RIRY_01',
    'UN_LW_P_VNLA_01',
    'UN_LW_P_RAMD_01',
    'UN_LW_P_MACR_01',
    'UN_LW_P_VKTR_01',
    'UN_NIER_P_N2TB',
    'UN_NIER_P_N9TS',
    'UN_LW_P_THLA_01',
    'UN_FF7_P_CLUD',
    'UN_FF7_P_TIFA',
    'UN_LW_P_KTON_01',
    'UN_LW_P_LILS_01',
    'UN_FF7_P_AERT',
    'UN_FF7_P_BART'
  ];

  private GL_releaseDates = {
    UN_LW_P_MONT: '25/03/2020',
    UN_LW_P_STRN: '25/03/2020',
    UN_LW_P_ELDE: '25/03/2020',
    UN_LW_P_ROBB: '25/03/2020',
    UN_LW_P_ENBT: '25/03/2020',
    UN_LW_P_ZIZA: '25/03/2020',
    UN_LW_P_AILN: '25/03/2020',
    UN_LW_P_MDNA: '25/03/2020',
    UN_LW_P_AYKA: '25/03/2020',
    UN_LW_P_MACR: '25/03/2020',
    UN_LW_P_HLNA: '25/03/2020',
    UN_LW_P_LILS: '25/03/2020',
    UN_LW_P_RAMD: '25/03/2020',
    UN_LW_P_OOOO: '25/03/2020',
    UN_LW_P_LRNZ: '25/03/2020',
    UN_LW_P_RIRY: '25/03/2020',
    UN_LW_P_VSTR: '25/03/2020',
    UN_LW_P_CLEY: '25/03/2020',
    UN_LW_P_KADI: '25/03/2020',
    UN_LW_P_MRLK: '25/03/2020',
    UN_LW_P_MGRT: '25/03/2020',
    UN_LW_P_PRAY: '25/03/2020',
    UN_LW_P_SZRT: '25/03/2020',
    UN_LW_P_FINA: '25/03/2020',
    UN_LW_P_BYLO: '25/03/2020',
    UN_LW_P_RYER: '25/03/2020',
    UN_LW_P_SCIA: '25/03/2020',
    UN_LW_P_VRID: '25/03/2020',
    UN_LW_P_NAIA: '25/03/2020',
    UN_LW_P_SRJS: '25/03/2020',
    UN_LW_P_UNII: '25/03/2020',
    UN_LW_P_SEVR: '25/03/2020',
    UN_LW_P_VADM: '25/03/2020',
    UN_LW_P_MURM: '25/03/2020',
    UN_LW_P_PHBE: '25/03/2020',
    UN_LW_P_RART: '25/03/2020',
    UN_LW_P_MICE: '25/03/2020',
    UN_LW_P_MIIA: '25/03/2020',
    UN_LW_P_ZZAN: '25/03/2020',
    UN_LW_P_GLMS: '25/03/2020',
    UN_FF14_P_YSTL: '25/03/2020',
    UN_FF14_P_TNCR: '25/03/2020',
    UN_LW_P_FDRC: '01/04/2020',
    UN_LW_P_SDLX: '01/04/2020',
    UN_LW_P_YERM: '08/04/2020',
    UN_LW_P_NASR: '08/04/2020',
    UN_LW_P_ETRE: '15/04/2020',
    UN_FFT_P_RAMZ: '22/04/2020',
    UN_FFT_P_GFGR: '22/04/2020',
    UN_FFT_P_ORND: '22/04/2020',
    UN_LW_P_WHIS: '06/05/2020',
    UN_LW_P_KTON: '06/05/2020',
    UN_LW_P_MRND: '20/05/2020',
    UN_LW_P_DRND: '20/05/2020',
    UN_LW_P_LUCA: '03/06/2020',
    UN_LW_P_ADLD: '03/06/2020',
    UN_LW_P_VKTR: '17/06/2020',
    UN_LW_P_THLA: '17/06/2020',
    UN_LW_P_RAIN: '01/07/2020',
    UN_LW_P_FRVA: '01/07/2020',
    UN_LW_P_VNLA: '15/07/2020',
    UN_LW_P_DRIO: '15/07/2020',
    UN_LW_P_TREL: '15/07/2020',
    UN_FF1_P_WROL: '29/07/2020',
    UN_LW_P_QILF: '05/08/2020',
    UN_LW_P_SIMR: '05/08/2020',
    UN_LW_P_ORDR: '19/08/2020',
    UN_LW_P_LVES: '19/08/2020',
    UN_FFT_P_AGRA: '26/08/2020',
    UN_FFT_P_DELT: '26/08/2020',
    UN_FFT_P_MSTD: '26/08/2020',
    UN_LW_P_IRDL: '09/09/2020',
    UN_LW_P_STRN_01: '23/09/2020',
    UN_LW_P_LSWL: '07/10/2020',
    UN_LW_P_GRSR: '07/10/2020',
    UN_LW_P_RRIR: '07/10/2020',
    UN_LW_P_RYER_01: '21/10/2020',
    UN_LW_P_RIRY_01: '21/10/2020',
    UN_LW_P_HWLT: '04/11/2020',
    UN_LW_P_SCAL: '04/11/2020',
    UN_LW_P_MRAL: '04/11/2020',
    UN_LW_P_CHEL: '04/11/2020',
    UN_FF4_P_CECL: '18/11/2020',
    UN_FF4_P_ROSA: '25/11/2020',
    UN_FF4_P_KAIN: '25/11/2020',
    UN_LW_P_RAMD_01: '09/12/2020',
    UN_LW_P_MACR_01: '09/12/2020',
    UN_LW_P_LATH: '23/12/2020',
    UN_LW_P_TITU: '23/12/2020',
    UN_LW_P_DEAN: '23/12/2020',
    UN_LW_P_NIVL: '06/01/2021',
    UN_LW_P_RVAL: '06/01/2021',
    UN_LW_P_SAKR: '20/01/2021',
    UN_LW_P_ALIM: '20/01/2021',
    UN_LW_P_RARD: '03/02/2021',
    UN_LW_P_ELSI: '03/02/2021',
    UN_LW_P_VNLA_01: '17/02/2021',
    UN_LW_P_VKTR_01: '17/02/2021',
    UN_LW_P_CRIS: '24/02/2021',
    UN_LW_P_GABL: '03/03/2021',
    UN_LW_P_ELSR: '03/03/2021',
    UN_FF10_P_TIDU: '24/03/2021',
    UN_FF10_P_YUNA: '24/03/2021',
    UN_FF10_P_ARON: '31/03/2021',
    UN_NIER_P_N2TB: '21/04/2021',
    UN_NIER_P_N9TS: '21/04/2021',
    UN_LW_P_MONT_01: '05/05/2021',
    UN_LW_P_RYEL: '19/05/2021',
    UN_LW_P_SIRM: '19/05/2021'
  };

  private JP_releaseDates = {
    UN_LW_P_FRVA: 'XX/XX/XXXX',
    UN_LW_P_MONT: '14/11/2019',
    UN_LW_P_STRN: '14/11/2019',
    UN_LW_P_ELDE: '14/11/2019',
    UN_LW_P_ROBB: '14/11/2019',
    UN_LW_P_ENBT: '14/11/2019',
    UN_LW_P_ZIZA: '14/11/2019',
    UN_LW_P_AILN: '14/11/2019',
    UN_LW_P_MDNA: '14/11/2019',
    UN_LW_P_AYKA: '14/11/2019',
    UN_LW_P_MACR: '14/11/2019',
    UN_LW_P_HLNA: '14/11/2019',
    UN_LW_P_LILS: '14/11/2019',
    UN_LW_P_RAMD: '14/11/2019',
    UN_LW_P_OOOO: '14/11/2019',
    UN_LW_P_LRNZ: '14/11/2019',
    UN_LW_P_RIRY: '14/11/2019',
    UN_LW_P_VSTR: '14/11/2019',
    UN_LW_P_CLEY: '14/11/2019',
    UN_LW_P_KADI: '14/11/2019',
    UN_LW_P_MRLK: '14/11/2019',
    UN_LW_P_MGRT: '14/11/2019',
    UN_LW_P_PRAY: '14/11/2019',
    UN_LW_P_SZRT: '14/11/2019',
    UN_LW_P_FINA: '14/11/2019',
    UN_LW_P_BYLO: '14/11/2019',
    UN_LW_P_RYER: '14/11/2019',
    UN_LW_P_SCIA: '14/11/2019',
    UN_LW_P_VRID: '14/11/2019',
    UN_LW_P_NAIA: '14/11/2019',
    UN_LW_P_SRJS: '14/11/2019',
    UN_LW_P_UNII: '14/11/2019',
    UN_LW_P_SEVR: '14/11/2019',
    UN_LW_P_VADM: '14/11/2019',
    UN_LW_P_MURM: '14/11/2019',
    UN_LW_P_PHBE: '14/11/2019',
    UN_LW_P_RART: '14/11/2019',
    UN_LW_P_MICE: '14/11/2019',
    UN_LW_P_MIIA: '14/11/2019',
    UN_LW_P_ZZAN: '14/11/2019',
    UN_LW_P_GLMS: '14/11/2019',
    UN_FF14_P_YSTL: '14/11/2019',
    UN_FF14_P_TNCR: '14/11/2019',
    UN_LW_P_FDRC: '22/11/2019',
    UN_LW_P_SDLX: '22/11/2019',
    UN_LW_P_YERM: '01/12/2019',
    UN_LW_P_RAMD_01: '01/12/2019',
    UN_LW_P_NASR: '01/12/2019',
    UN_LW_P_MACR_01: '18/12/2019',
    UN_LW_P_ETRE: '01/12/2019',
    UN_FFT_P_RAMZ: '27/12/2019',
    UN_FFT_P_GFGR: '27/12/2019',
    UN_FFT_P_ORND: '27/12/2019',
    UN_LW_P_WHIS: '01/01/2020',
    UN_LW_P_KTON: '01/01/2020',
    UN_LW_P_MRND: '15/01/2020',
    UN_LW_P_DRND: '15/01/2020',
    UN_LW_P_LUCA: '01/02/2020',
    UN_LW_P_ADLD: '01/02/2020',
    UN_LW_P_VKTR: '14/02/2020',
    UN_LW_P_THLA: '14/02/2020',
    UN_LW_P_VNLA: '01/03/2020',
    UN_LW_P_DRIO: '01/03/2020',
    UN_LW_P_TREL: '01/03/2020',
    UN_LW_P_RAIN: '17/03/2020',
    UN_FF1_P_WROL: '25/03/2020',
    UN_LW_P_QILF: '01/04/2020',
    UN_LW_P_SIMR: '01/04/2020',
    UN_LW_P_ORDR: '15/04/2020',
    UN_LW_P_LVES: '15/04/2020',
    UN_FFT_P_AGRA: '22/04/2020',
    UN_FFT_P_DELT: '22/04/2020',
    UN_FFT_P_MSTD: '22/04/2020',
    UN_LW_P_IRDL: '01/05/2020',
    UN_LW_P_STRN_01: '14/05/2020',
    UN_LW_P_GRSR: '01/06/2020',
    UN_LW_P_RRIR: '01/06/2020',
    UN_LW_P_LSWL: '01/06/2020',
    UN_LW_P_SCAL: '17/06/2020',
    UN_LW_P_MRAL: '17/06/2020',
    UN_LW_P_LILS_01: '01/07/2020',
    UN_LW_P_HWLT: '01/07/2020',
    UN_LW_P_CHEL: '01/07/2020',
    UN_LW_P_LATH: '15/07/2020',
    UN_LW_P_TITU: '15/07/2020',
    UN_FF4_P_CECL: '22/07/2020',
    UN_FF4_P_ROSA: '01/08/2020',
    UN_FF4_P_KAIN: '01/08/2020',
    UN_LW_P_KTON_01: '18/08/2020',
    UN_LW_P_NIVL: '01/09/2020',
    UN_LW_P_RVAL: '01/09/2020',
    UN_LW_P_SAKR: '16/09/2020',
    UN_LW_P_ALIM: '16/09/2020',
    UN_LW_P_RYER_01: '01/10/2020',
    UN_LW_P_RARD: '01/10/2020',
    UN_LW_P_ELSI: '01/10/2020',
    UN_LW_P_RIRY_01: '17/10/2020',
    UN_LW_P_CRIS: '17/10/2020',
    UN_LW_P_GABL: '01/11/2020',
    UN_LW_P_ELSR: '01/11/2020',
    UN_FF10_P_TIDU: '14/11/2020',
    UN_FF10_P_YUNA: '14/11/2020',
    UN_FF10_P_ARON: '24/11/2020',
    UN_LW_P_VNLA_01: '01/12/2020',
    UN_LW_P_VKTR_01: '14/12/2020',
    UN_NIER_P_N2TB: '23/12/2020',
    UN_NIER_P_N9TS: '23/12/2020',
    UN_LW_P_MONT_01: '30/12/2020',
    UN_LW_P_RYEL: '15/01/2021',
    UN_LW_P_SIRM: '15/01/2021',
    UN_LW_P_HLNA_01: '01/02/2021',
    UN_LW_P_THLA_01: '15/02/2021',
    UN_LW_P_CMLO: '22/02/2021',
    UN_LW_P_DEAN: '01/03/2021',
    UN_LW_P_MORE: '17/03/2021',
    UN_LW_P_CWEL: '17/03/2021',
    UN_LW_P_MURG: '24/03/2021',
    UN_LW_P_CRLT: '31/03/2021',
    UN_LW_P_VLRC: '14/04/2021',
    UN_LW_P_LMRE: '14/04/2021',
    UN_LW_P_GRGS: '21/04/2021',
    UN_FF7_P_CLUD: '21/04/2021',
    UN_FF7_P_TIFA: '21/04/2021',
    UN_FF7_P_AERT: '01/05/2021',
    UN_FF7_P_BART: '01/05/2021',
    UN_LW_P_GRSR_01: '14/05/2021'
  };

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
    return this.dataService.loadData('units', forcedVersion);
  }

  async getUnits(forcedVersion = null) {
    if (this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_units'] === null
      || this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_units'] === undefined
    ) {
      const units: Unit[] = [];
      const rawUnits = JSON.parse(JSON.stringify(await this.getRaw(forcedVersion)));

      Object.keys(rawUnits).forEach(unitId => {
        const unit = new Unit();
        unit.constructFromJson(rawUnits[unitId], this.translateService);
        unit.releaseDate = this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_releaseDates'][unit.dataId];
        units.push(unit);
      });

      this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_units'] = units;
    }

    return this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_units'];
  }

  async getUnitsForJPBuilder() {
    await this.getUnits();

    const units = await this.filterUnits(this[this.navService.getVersion() + '_units'], null);
    this.toolService.sortByRarity(units, 'asc');

    return units;
  }

  async getUnitsForListing(filters = null, sort = 'rarity', order = 'asc') {
    await this.getUnits();
    const units = await this.filterUnits(this[this.navService.getVersion() + '_units'], filters);

    switch (sort) {
      case 'rarity' :
        this.toolService.sortByRarity(units, order);
      break;
      case 'name' :
        this.toolService.sortByName(units, order);
      break;
      case 'releaseDate' :
        this.toolService.sortByReleaseDate(units, order);
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
        if ((filters.element.length === 0 || filters.element.indexOf(unit.element) !== -1)
          && (filters.rarity.length === 0 || filters.rarity.indexOf(unit.rarity) !== -1)
          && (!filters.limited || filters.limited.length === 0 || filters.limited.indexOf(this.isLimited(unit.dataId)) !== -1)
          && (!filters.exJob || unit.exJobs.length > 0)
        ) {
          let possbibleToAdd = true;

          if (filters.job && filters.job.length > 0) {
            possbibleToAdd = this.unitHasJob(unit, filters);
          }

          if (possbibleToAdd && filters.equipment && (filters.equipment.weapon !== 'ALL' || (filters.equipment.armor && filters.equipment.armor.length > 0))) {
            possbibleToAdd = await this.unitCanEquip(unit, filters);
          }

          if (possbibleToAdd) {
            filteredUnits.push(unit);
          }
        }
      }

      return filteredUnits;
    } else {
      return units;
    }
  }

  private unitHasJob(unit, filters) {
    let unitHasJob = false;

    for (let i = (filters.subJob ? 1 : 0); i <= (filters.mainJob ? 0 : 2); i++) {
      const tableJob = unit.jobs[i].split('_');
      if (filters.job.length === 0 || filters.job.indexOf(tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2] + (tableJob[3] && tableJob[3] === '01' ? '_01' : '')) !== -1) {
        unitHasJob = true;
        break;
      }
    }

    return unitHasJob;
  }

  private async unitCanEquip(unit, filters) {
    let unitCanEquip = true;
    const job = await this.jobService.getJob(unit.jobs[0]);

    if (filters.equipment.weapon !== 'ALL' && job.equipments.weapons.indexOf(filters.equipment.weapon) === -1) {
      unitCanEquip = false;
    }

    if (filters.equipment.armor && filters.equipment.armor.length > 0) {
      let armorFound = false;
      let i = 0;

      while (!armorFound && i <= filters.equipment.armor.length - 1) {
        if (job.equipments.armors.indexOf(filters.equipment.armor[i]) !== -1) {
          armorFound = true;
        }

        i++;
      }

      if (!armorFound) {
        unitCanEquip = false;
      }
    }

    return unitCanEquip;
  }

  async getUnit(id, forcedVersion = null) {
    await this.getUnits(forcedVersion);

    return this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_units'].find(unit => unit.dataId === id);
  }

  async getUnitBySlug(slug) {
    await this.getUnits();

    return this[this.navService.getVersion() + '_units'].find(unit => unit.slug === slug);
  }

  getGLExclusiveUnitIds() {
    return this.glExcluUnits;
  }

  isLimited(id) {
    return this[this.navService.getVersion() + '_limitedUnits'].indexOf(id) !== -1;
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_units' : 'units';
  }

  getSavedUnits() {
    return this.localStorageService.get(this.getLocalStorage()) ? this.localStorageService.get(this.getLocalStorage()) : {};
  }

  getSavableData(unit) {
    const user = this.authService.getUser();

    const data = {
      dataId: unit.dataId,
      star: unit.star,
      lb: unit.lb ? unit.lb : 0,
      level: unit.level,
      jobs: [
        unit.jobsData[0].level,
        unit.jobsData[1].level,
        unit.jobsData[2].level
      ],
      nodes: {},
      masterSkill: unit.masterSkillActivated,
      activatedSupport: [
        unit.activatedSupport[0],
        unit.activatedSupport[1]
      ],
      activatedCounter: unit.activatedCounter,
      subjob: unit.subjob,
      esper: null,
      card: null,
      equipments: [null, null, null],
      guild: this.guildService.getSavableData(unit.guild.data, false),
      masterRanks: this.masterRanksService.getSavableData(unit.masterRanks.data, false),
      limitLv: unit.limit ? unit.limit.level : 0,
      user: user ? user.uid : null,
      customName: unit.customName ? unit.customName : ''
    };

    if (unit.esper) {
      const savedEsper = this.esperService.getSavableData(unit.esper, false);
      savedEsper.resonance = unit.esper.resonance;
      data.esper = savedEsper;
    } else {
      data.esper = null;
    }

    if (unit.card) {
      data.card = this.cardService.getSavableData(unit.card, false);
    } else {
      data.card = null;
    }

    for (let i = 0; i <= 2; i++) {
      if (unit.equipments && unit.equipments[i]) {
        data.equipments[i] = this.equipmentService.getSavableData(unit.equipments[i], false);
      } else {
        data.equipments[i] = null;
      }
    }

    Object.keys(unit.board.nodes).forEach(nodeId => {
      data.nodes[nodeId] = unit.board.nodes[nodeId].level ? unit.board.nodes[nodeId].level : 0;
    });

    return data;
  }

  async selectUnitForBuilder(unitId, customData = null, forceEmptyGuild = false, forcedVersion = null) {
    this.unit = new Unit();
    this.unit.constructFromJson(JSON.parse(JSON.stringify(await this.getUnit(unitId, forcedVersion))), this.translateService);
    this.unit.name = this.unit.getName(this.translateService);
    this.unit.formatUpgrades();

    this.unit.jobsData = [];
    for (const jobId of this.unit.jobs) {
      const job = await this.jobService.getJob(jobId, forcedVersion);

      job.name = job.getName(this.translateService);
      job.level = 1;
      this.unit.jobsData.push(job);
    }
    this.unit.subjob = 0;

    this.unit.exJobsData = [];
    for (const jobId of this.unit.exJobs) {
      const job = await this.jobService.getJob(jobId, forcedVersion);
      this.unit.exJobsData.push(job);
    }

    this.unit.star = 1;
    this.unit.lb = 0;
    this.unit.level = 1;
    this.unit.activatedSupport = [
      '0',
      '0'
    ];
    this.unit.activatedCounter = '0';

    this.unit.masterSkillLevel = [-1];
    let i = 0;
    this.unit.masterSkill.forEach(skill => {
      this.unit.masterSkillLevel.push(i);
      i++;
    });
    this.unit.masterSkillActivated = -1;
    this.unit.equipments = [];

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.unlockStar === null) {
        this.unit.board.nodes[nodeId].activated = true;
        this.unit.board.nodes[nodeId].level = 1;
      }
    });

    if (this.unit.limit) {
      this.unit.limit.level = 1;
    }

    this.unit.guild = this.guildService.getGuildForBuilder(forceEmptyGuild);
    this.unit.masterRanks = await this.masterRanksService.getMasterRanksForBuilder(forceEmptyGuild);

    const existingUnit = await this.initiateSavedUnit(customData);

    this.unit.grid = this.gridService.generateUnitGrid(this.unit, 1000, this.unit.exJobs && this.unit.exJobs.length > 0);

    this.unit.updateMaxLevel();
    this.unit.updateMaxJobLevel();

    if (!existingUnit) {
      this.unit.maxUnit();
      this.unit.activateMasterSkill();
    }

    this.unit.changeLevel(customData || existingUnit ? false : true);

    return this.unit;
  }

  private async initiateSavedUnit(customData = null) {
    const unit = customData;

    if (unit) {
      this.unit.star = unit.star;
      this.unit.lb = unit.lb;
      this.unit.level = parseInt(unit.level, 10);
      this.unit.customName = unit.customName;
      this.unit.storeId = unit.storeId;

      this.unit.jobs.forEach((jobId, jobIndex) => {
        this.unit.jobsData[jobIndex].level = unit.jobs[jobIndex];
      });

      Object.keys(unit.nodes).forEach(nodeId => {
        if (unit.nodes[nodeId]) {
          this.unit.board.nodes[nodeId].level = unit.nodes[nodeId];
          this.unit.board.nodes[nodeId].activated = true;

          if (this.unit.replacedSkills[this.unit.board.nodes[nodeId].dataId]) {
            this.unit.replacedSkills[this.unit.board.nodes[nodeId].dataId].forEach(upgrade => {
              const newSkill = JSON.parse(JSON.stringify(upgrade.newSkill));

              Object.keys(unit.nodes).forEach(oldNodeId => {
                if (this.unit.board.nodes[oldNodeId].dataId === upgrade.oldSkill) {
                  const oldSkill = this.unit.board.nodes[oldNodeId].skill;
                  newSkill.level = this.unit.board.nodes[oldNodeId].level;
                  this.unit.board.nodes[oldNodeId].skill = newSkill;
                }
              });
            });
          }
        }
      });

      if (unit.masterSkill === true) {
        this.unit.masterSkillActivated = 0;
      } else if (typeof(unit.masterSkill) === 'number') {
        this.unit.masterSkillActivated = unit.masterSkill;
      }

      if (unit.subjob) {
        this.unit.subjob = unit.subjob;
      }

      if (unit.limitLv) {
        this.unit.limit.level = unit.limitLv;
      }

      if (unit.activatedSupport[0] || unit.activatedSupport[1]) {
        this.unit.activatedSupport = [
          unit.activatedSupport[0],
          unit.activatedSupport[1]
        ];
      }

      if (unit.activatedCounter) {
        this.unit.activatedCounter = unit.activatedCounter;
      }

      if (unit.esper) {
        this.unit.esper = await this.esperService.selectEsperForBuilder(unit.esper.dataId, unit.esper);
      } else {
        this.unit.esper = null;
      }

      if (unit.card) {
        this.unit.card = await this.cardService.selectCardForBuilder(unit.card.dataId, unit.card);
      } else {
        this.unit.card = null;
      }

      this.unit.equipments = [];
      for (let i = 0; i <= 2; i++) {
        if (unit.equipments && unit.equipments[i]) {
          this.unit.equipments[i] = await this.equipmentService.selectEquipmentForBuilder(unit.equipments[i].dataId, unit.equipments[i]);
        } else {
          this.unit.equipments[i] = null;
        }
      }

      if (unit.guild) {
        this.unit.savedGuild = unit.guild;
      }

      if (unit.masterRanks) {
        this.unit.savedMasterRanks = unit.masterRanks;
      }

      return true;
    }

    return false;
  }

  unitAlreadyExists(unit) {
    const savedUnits = this.getSavedUnits();
    let unitFinded = false;

    if (savedUnits[unit.dataId]) {
      savedUnits[unit.dataId].forEach((savedUnit, savedUnitIndex) => {
        if (savedUnit.customName === unit.customName) {
          unitFinded = true;
        }
      });
    }

    return unitFinded;
  }

  saveUnit(unit, method) {
    const savableData = this.getSavableData(unit);

    if (method === 'new' || method === 'share') {
      if (method === 'share') {
        delete savableData.user;
      }

      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        if (method === 'new') {
          // @ts-ignore
          savableData.storeId = data.id;
          const savedUnits = this.getSavedUnits();

          if (savedUnits[unit.dataId]) {
            savedUnits[unit.dataId].push(savableData);
          } else {
            savedUnits[unit.dataId] = [savableData];
          }

          this.localStorageService.set(this.getLocalStorage(), savedUnits);
        }
        this.unit.storeId = data.id;

        return data.id;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).doc(unit.storeId).set(savableData).then(data => {
        const savedUnits = this.getSavedUnits();
        savedUnits[unit.dataId].forEach((savedUnit, unitIndex) => {
          if (savedUnit.storeId === unit.storeId) {
            savedUnits[unit.dataId][unitIndex] = savableData;
            savedUnits[unit.dataId][unitIndex].storeId = unit.storeId;
          }
        });

        this.localStorageService.set(this.getLocalStorage(), savedUnits);

        return unit.storeId;
      });
    }
  }

  deleteUnit(unit) {
    this.firestore.collection(this.getLocalStorage()).doc(unit.storeId).delete();

    const savedUnits = this.getSavedUnits();

    savedUnits[unit.dataId].forEach((savedUnit, savedUnitIndex) => {
      if (savedUnit.storeId === unit.storeId) {
        savedUnits[unit.dataId].splice(savedUnitIndex, 1);
      }
    });

    this.localStorageService.set(this.getLocalStorage(), savedUnits);
  }

  getStoredUnit(dataId) {
    const document = this.firestore.collection(this.getLocalStorage()).doc(dataId);

    return document.valueChanges();
  }

  getExportableLink() {
    if (!this.unit.storeId || this.hasChangeBeenMade()) {
      return this.saveUnit(this.unit, 'share');
    }

    return new Promise((resolve, reject) => {
      resolve(this.unit.storeId);
    });
  }

  hasChangeBeenMade() {
    if (this.unit.storeId) {
      const newData = this.getSavableData(this.unit);
      let oldData = null;
      if (this.getSavedUnits()[this.unit.dataId]) {
        this.getSavedUnits()[this.unit.dataId].forEach(savedUnit => {
          if (savedUnit.storeId === this.unit.storeId) {
            oldData = savedUnit;
            delete oldData.storeId;
          }
        });

        return !this.toolService.equal(oldData, newData);
      }
    }

    return true;
  }

  changeStar() {
    this.unit.updateMaxLevel();
    this.unit.disableNotAvailableNodes();
  }

  changeLB() {
    this.unit.updateMaxLevel();
    this.unit.updateMaxJobLevel();
  }

  changeLevel(updateUnitStats = true) {
    if (updateUnitStats) {
      this.unit.calculateBaseStats();
    }

    this.unit.calculateTotalStats();
  }

  changeJobLevel() {
    this.unit.disableNotAvailableNodes();
    this.unit.updateMaxLevel(true);
    this.changeLevel();
  }

  rightClickNode(node) {
    this.unit.rightClickNode(node);
  }

  clickNode(node) {
    this.unit.clickNode(node);
  }

  canActivateNode(node) {
    return this.unit.canActivateNode(node);
  }

  getAvailableStatType() {
    return this.unit.getAvailableStatType();
  }

  maxUnit() {
    this.unit.maxUnit();
  }

  maxLevelAndJobs() {
    this.unit.maxLevelAndJobs();
  }

  getActiveSkills() {
    this.unit.getActiveSkills(true, this.nameService, this.skillService, this.rangeService);
  }

  resetUnit() {
    this.unit.resetUnit();
  }

  resetLevel() {
    this.unit.resetLevel();
  }

  resetJob() {
    this.unit.resetJob();
  }
}
