import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { MasterRanksService } from '../services/mr.service';
import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';
import { SimulatorService } from '../services/simulator.service';

import { ModalEquipmentsComponent } from './modal/modal.equipments.component';
import { ModalEspersComponent } from './modal/modal.espers.component';
import { ModalCardsComponent } from './modal/modal.cards.component';
import { ModalGuildComponent } from './modal/modal.guild.component';
import { ModalMasterRanksComponent } from './modal/modal.mr.component';
import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';

@Component({
  selector: 'app-builder-unit',
  templateUrl: './builder.unit.component.html',
  styleUrls: ['./builder.unit.component.css']
})
export class BuilderUnitComponent implements OnInit, AfterViewInit {
  units = [];
  rawUnits = [];
  unit = null;
  savedUnits = {};
  loadingBuild = false;
  version = 'GL';
  selectedUnitId = null;

  statueNames;

  showSave = false;
  showStatsDetail = false;
  showBuffsDetail = false;

  isCollapsedMainJob = true;
  isCollapsedSubJob = true;
  isCollapsedOther = true;
  isCollapsedDamageSim = true;

  showOnlyOtherVersion = false;

  @ViewChild('selectBuilderUnit') unitSelector;

  statsType = ['HP', 'TP', 'AP', 'ATK', 'DEF', 'MAG', 'SPR', 'AGI', 'DEX', 'LUCK', 'MOVE', 'JUMP'];
  statsFrom = [
    {type: 'baseTotal', translate: 'Base'},
    {type: 'guild', translate: 'Guild Statues'},
    {type: 'masterRanks', translate: 'Master Ranks'},
    {type: 'board', translate: 'Board'},
    {type: 'support', translate: 'Support'},
    {type: 'masterSkill', translate: 'Master Skill'},
    {type: 'esper', translate: 'Esper'},
    {type: 'card', translate: 'Card'},
    {type: 'cardParty', translate: 'Card Party'},
    {type: 'subCard', translate: 'Sub Card'},
    {type: 'subCardParty', translate: 'Sub Card Party'},
    {type: 'materia', translate: 'Materia'}
  ];

  buffsFrom = [
    {type: 'base', translate: 'Base'},
    {type: 'board', translate: 'Board'},
    {type: 'support', translate: 'Support'},
    {type: 'masterSkill', translate: 'Master Skill'},
    {type: 'esper', translate: 'Esper'},
    {type: 'card', translate: 'Card'},
    {type: 'cardParty', translate: 'Card Party'},
    {type: 'subCard', translate: 'Sub Card'},
    {type: 'subCardParty', translate: 'Sub Card Party'},
    {type: 'materia', translate: 'Materia'}
  ];

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  buffsImage = [
    'dark_atk',
    'dark_killer',
    'dark_res',
    'earth_atk',
    'earth_killer',
    'earth_res',
    'fire_atk',
    'fire_killer',
    'fire_res',
    'ice_atk',
    'ice_killer',
    'ice_res',
    'light_atk',
    'light_killer',
    'light_res',
    'lightning_atk',
    'lightning_killer',
    'lightning_res',
    'neutral_atk',
    'neutral_killer',
    'neutral_res',
    'water_atk',
    'water_killer',
    'water_res',
    'wind_atk',
    'wind_killer',
    'wind_res',

    'magic_atk',
    'magic_res',
    'missile_atk',
    'missile_res',
    'pierce_atk',
    'pierce_res',
    'slash_atk',
    'slash_res',
    'strike_atk',
    'strike_res',

    'poison_res',
    'frostbite_res',
    'blind_res',
    'sleep_res',
    'silence_res',
    'paralyze_res',
    'confusion_res',
    'petrify_res',
    'toad_res',
    'charm_res',
    'slow_res',
    'stop_res',
    'immobilize_res',
    'disable_res',
    'berserk_res',
    'doom_res',
    'stun_res'
  ];

  damageSim = null;
  species = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private translateService: TranslateService,
    private guildService: GuildService,
    private masterRanksService: MasterRanksService,
    private simpleModalService: SimpleModalService,
    private navService: NavService,
    private toolService: ToolService,
    private authService: AuthService,
    private simulatorService: SimulatorService
  ) {
    this.translateService.onLangChange.subscribe(async (event: LangChangeEvent) => {
      this.translateUnits();
    });

    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    await this.getUnits();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        this.loadingBuild = true;

        const unit = await this.unitService.selectUnitForBuilder(null, null, false, data);

        if (unit) {
          this.selectedUnitId = unit.dataId;
          this.unit = unit;
          this.formatUnit();
          this.loadingBuild = false;
        } else {
          const unitData = await this.unitService.getStoredUnit(data);
          if (unitData) {
            this.selectedUnitId = unitData.dataId;
            await this.selectUnit(unitData, true);
            this.unit.storeId = data;
          }
          this.loadingBuild = false;
        }
      } else {
        this.unitSelector.open();
      }
    });

    this.navService.setTitle('Unit Builder');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedUnits = this.unitService.getSavedUnits();
      });
    });

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      });
    });
  }

  private async getUnits() {
    this.rawUnits = await this.unitService.getUnitsForBuilder();
    this.translateUnits();

    this.filterUnits();

    this.savedUnits = this.unitService.getSavedUnits();
  }

  private translateUnits() {
    this.rawUnits.forEach(unit => {
      unit.name = this.toolService.getName(unit);
    });
  }

  private filterUnits() {
    this.units = [];
    for (const unit of this.rawUnits) {
      if ((this.showOnlyOtherVersion && unit.fromOtherVersion)
        || (!this.showOnlyOtherVersion && !unit.fromOtherVersion)
      ){
        this.units.push(unit);
      }
    }
  }

  private loadGuildAndMasterRanks() {
    this.unit.guild = this.guildService.getGuildForBuilder();

    if (this.unit.savedGuild) {
      this.unit.guild.data = this.unit.savedGuild;
    }

    if (this.unit.savedMasterRanks) {
      this.unit.masterRanks.data = this.unit.savedMasterRanks;
    }

    this.statueNames = Object.keys(this.unit.guild.statues);
    this.unitService.changeLevel();
  }

  async selectUnit(customData = null, fromModal = false) {
    if (this.selectedUnitId) {
      this.loadingBuild = true;

      if (!fromModal && this.savedUnits[this.selectedUnitId] && this.savedUnits[this.selectedUnitId].length > 0) {
        this.openLoadModal(this.selectedUnitId);
        this.unitSelector.handleClearClick();
      } else {
        this.unit = await this.unitService.selectUnitForBuilder(this.selectedUnitId, customData);
        this.formatUnit();
      }

      this.loadingBuild = false;
    } else {
      this.unit = null;
    }
  }

  private formatUnit() {
    this.loadGuildAndMasterRanks();
    this.unitService.getActiveSkills();

    Object.keys(this.unit.board.nodes).forEach(nodeId => {
      if (this.unit.board.nodes[nodeId].skill.type !== 'buff') {
        this.unit.board.nodes[nodeId].skill.name = this.toolService.getName(this.unit.board.nodes[nodeId].skill);
      }
    });

    this.newDamageSim();
    this.updateActiveSkillsForSim();
  }

  changeStar(value) {
    this.unit.star = value;
    this.unitService.changeStar();
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  changeLB(value) {
    if (value === this.unit.lb) {
      value = undefined;
    }
    this.unit.lb = value;

    this.unitService.changeLB();
    this.unitService.getActiveSkills();

    this.updateSelectedEquipments();
    this.changeLevel();
    this.updateActiveSkillsForSim();
  }

  updateSelectedEquipments() {
    if (this.unit.lb < 4) {
      if (this.unit.equipments[2]) {
        this.unit.equipments[2] = null;
      }

      if (this.unit.equipments[1] && this.unit.equipments[1].acquisition && this.unit.equipments[1].acquisition.type === 'tmr') {
        this.unit.equipments[1] = null;
      }

      if (this.unit.equipments[0] && this.unit.equipments[0].acquisition && this.unit.equipments[0].acquisition.type === 'tmr') {
        this.unit.equipments[0] = null;
      }
    }

    if (this.unit.lb < 2 && this.unit.equipments[1]) {
      this.unit.equipments[1] = null;
    }
  }

  changeLevel() {
    this.unitService.changeLevel();
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  updateJobLevel(jobNumber) {
    this.unitService.changeJobLevel();
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  rightClickNode(node) {
    this.unitService.rightClickNode(node);
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  clickNode(node) {
    this.unitService.clickNode(node);
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  canActivateNode(node) {
    return this.unitService.canActivateNode(node);
  }

  showHideDetail(type) {
    this['show' + type + 'Detail'] = !this['show' + type + 'Detail'];
  }

  maxUnit() {
    this.unitService.maxUnit();
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  maxLevelAndJobs() {
    this.unitService.maxLevelAndJobs();
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  showGuildDetail() {
    this.simpleModalService.addModal(ModalGuildComponent, { guild : JSON.parse(JSON.stringify(this.unit.guild.data)) })
      .subscribe(async (guild) => {
        if (guild !== 'close') {
          this.unit.guild.data = guild;
          this.unitService.changeLevel();
        }
      });
  }

  showMasterRanksDetail() {
    this.simpleModalService.addModal(ModalMasterRanksComponent, { masterRanks : JSON.parse(JSON.stringify(this.unit.masterRanks.data)) })
      .subscribe(async (masterRanks) => {
        if (masterRanks !== 'close') {
          this.unit.masterRanks.data = masterRanks;
          this.unitService.changeLevel();
        }
      });
  }

  openEquipmentsModal(pos) {
    let equipment = null;
    let modalStep = 'select';
    let unit = this.unit;
    let equipmentPos = pos;

    if (this.unit.equipments[pos]) {
      equipment = JSON.parse(JSON.stringify(this.unit.equipments[pos]));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalEquipmentsComponent, { equipment: equipment, modalStep: modalStep, unit: unit, equipmentPos: equipmentPos })
      .subscribe(async (equipment) => {
        if (equipment !== 'close') {
          this.unit.equipments[pos] = equipment;

          this.unitService.changeLevel();
        }
      });
  }

  openEspersModal() {
    let esper = null;
    let modalStep = 'select';

    if (this.unit.esper) {
      esper = JSON.parse(JSON.stringify(this.unit.esper));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalEspersComponent, { esper: esper, modalStep: modalStep })
      .subscribe(async (esper) => {
        if (esper !== 'close') {
          this.unit.esper = esper;

          this.unitService.changeLevel();
        }
      });
  }

  openCardsModal(subCard = false) {
    let cardType = 'main';
    let card = null;
    let modalStep = 'select';

    if (subCard) {
      cardType = 'sub';
    }

    if (!subCard && this.unit.card) {
      card = JSON.parse(JSON.stringify(this.unit.card));
      modalStep = 'custom';
    }

    if (subCard && this.unit.subCard) {
      card = JSON.parse(JSON.stringify(this.unit.subCard));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalCardsComponent, { cardType: cardType, card: card, modalStep: modalStep })
      .subscribe(async (card) => {
        if (card !== 'close') {
          if (!subCard) {
            this.unit.card = card;
          } else {
            this.unit.subCard = card;
          }

          this.unitService.changeLevel();
          this.updateActiveSkillsForSim();
        }
      });
  }

  openLoadModal(unitId) {
    this.simpleModalService.addModal(ModalLoadComponent, { type: 'unit', savedItems: this.savedUnits[unitId], allowNew: true })
      .subscribe(async (result) => {
        if (result.type === 'new') {
          this.selectedUnitId = unitId;
          await this.selectUnit(null, true);
        }

        if (result.type === 'load' && result.item) {
          this.selectedUnitId = result.item.dataId;
          await this.selectUnit(result.item, true);
        }

        if (result.type === 'fullDelete') {
          this.savedUnits[unitId] = [];
        }
      });
  }

  openSaveModal() {
    this.simpleModalService.addModal(ModalSaveComponent, { type: 'unit', item: this.unit })
      .subscribe((isSaved) => {
        if (isSaved) {
          this.savedUnits = this.unitService.getSavedUnits();
        }
      });
  }

  openLinkModal() {
    this.simpleModalService.addModal(ModalLinkComponent, { type: 'unit', item: this.unit });
  }

  getAvailableStatType() {
    const formattedAvailableStatType = [[]];

    if (this.unit) {
      const statTypes = this.unit.availableStatTypes;

      statTypes.forEach(type => {
        if (formattedAvailableStatType[formattedAvailableStatType.length - 1].length === 8) {
          formattedAvailableStatType.push([]);
        }

        formattedAvailableStatType[formattedAvailableStatType.length - 1].push(type);
      });
    }

    return formattedAvailableStatType;
  }

  updateLevel() {
    this.unitService.changeLevel();
  }

  updateMasterSkillLevel() {
    this.unitService.updateMasterSkill();
    this.updateActiveSkillsForSim();
  }

  updateLimitLevel(level) {
    this.unit.formattedLimit.level = level;
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  selectSubJob(jobNum) {
    this.unit.subjob = jobNum;
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  updateSupportSkill() {
    this.unitService.changeLevel();
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  updateCounterSkill() {
    this.unitService.getActiveSkills();
    this.updateActiveSkillsForSim();
  }

  updateEsperResonance() {
    this.unitService.changeLevel();
  }

  getSkillsPerJob(job) {
    const skills = [];
    if (job === 'main') {
      this.unit.activeSkills.forEach(skill => {
        if (skill.mainSkill) {
          skills.push(skill);
        }
      });
    } else {
      this.unit.activeSkills.forEach(skill => {
        if (!skill.mainSkill) {
          skills.push(skill);
        }
      });
    }

    return skills;
  }

  updateActiveSkillsForSim() {
    const skills = [
      this.unit.formattedAttack
    ];

    this.unit.activeSkills.forEach(skill => {
      if (skill.damage) {
        skills.push(skill);
      }
    });

    this.unit.skillsForSim = skills;

    if (this.unit.formattedLimit && this.unit.formattedLimit.damage) {
      this.unit.skillsForSim.push(this.unit.formattedLimit);
    }

    if (this.unit.card) {
      this.unit.card.skills.forEach(skill => {
        if (skill.damage) {
          this.unit.skillsForSim.push(skill);
        }
      });
    }

    if (this.unit.subCard) {
      this.unit.subCard.skills.forEach(skill => {
        if (skill.damage) {
          this.unit.skillsForSim.push(skill);
        }
      });
    }

    if (this.damageSim && this.damageSim.unit.selectedSkill) {
      let oldSelectedSkillFound = false;
      this.unit.skillsForSim.forEach(skill => {
        if (skill.dataId === this.damageSim.unit.selectedSkill.dataId) {
          oldSelectedSkillFound = true;
        }
      });

      if (!oldSelectedSkillFound) {
        this.damageSim.unit.selectedSkill = null;
      }
    }

    if (this.damageSim && this.damageSim.unit.selectedSkill === null) {
      this.damageSim.unit.selectedSkill = this.unit.skillsForSim[0];
      this.calculateDamageSim();
    }
  }

  newDamageSim() {
    this.damageSim = {
      unit: {
        selectedSkill: null,
        brave: 97,
        faith: 97,
        buffs: {
          atk: 0,
          mag: 0,
          dex: 0,
          agi: 0,
          luck: 0,
          raceKiller: 0,
          elementKiller: 0,
          elementAtk: 0,
          damageType: 0,
          critic_damage: 0,
          defense_penetration: 0,
          spirit_penetration: 0,
          typeResPene: 0
        },
        chain: {
          element: 0,
          type: 0
        }
      },
      target: {
        race: 'human',
        element: 'light',
        def: 0,
        spr: 0,
        elementRes: 0,
        damageTypeRes: 0,
        attack_res: 0,
        aoe_res: 0,
        faith: 0,
        breaks: {
          def: 0,
          spr: 0,
          elementRes: 0,
          damageTypeRes: 0,
          attack_res: 0,
          aoe_res: 0,
          faith: 0
        }
      },
      result: {
        normal: 0,
        critic: 0,
        conditions: []
      }
    };

    this.species = this.simulatorService.getSpecies();
  }

  calculateDamageSim() {
    this.simulatorService.calculateDamageSim(this.unit, this.damageSim);
  }

  resetUnit() {
    this.unitService.resetUnit();
  }

  resetLevel() {
    this.unitService.resetLevel();
  }

  resetJob() {
    this.unitService.resetJob();
  }

  toggleOtherVersion() {
    this.showOnlyOtherVersion = !this.showOnlyOtherVersion;

    this.filterUnits();
  }
}
