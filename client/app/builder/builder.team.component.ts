import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { MasterRanksService } from '../services/mr.service';
import { GridService } from '../services/grid.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { EquipmentService } from '../services/equipment.service';
import { TeamService } from '../services/team.service';
import { ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';
import { SimulatorService } from '../services/simulator.service';

import { BuilderGuildComponent } from './builder.guild.component';

import { ModalEquipmentsComponent } from './modal/modal.equipments.component';
import { ModalEspersComponent } from './modal/modal.espers.component';
import { ModalCardsComponent } from './modal/modal.cards.component';
import { ModalGuildComponent } from './modal/modal.guild.component';
import { ModalMasterRanksComponent } from './modal/modal.mr.component';
import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';

@Component({
  selector: 'app-builder-team',
  templateUrl: './builder.team.component.html',
  styleUrls: ['./builder.team.component.css']
})
export class BuilderTeamComponent implements OnInit, AfterViewInit {
  availableUnits = [null, null, null, null, null];
  selectedUnits = [null, null, null, null, null];
  star = [];
  lb = [];

  // eslint-disable-next-line @typescript-eslint/ban-types
  savedUnits: {};

  team = {
    name: '',
    guild: {
      statues: {},
      data: {}
    },
    masterRanks: {
      data: {}
    },
    units: [null, null, null, null, null],
    cost: 0,
    atk: 0,
    mag: 0
  };
  statueNames;
  exportableLink = '';
  confirmModal = null;
  savedTeams = null;
  showSave = false;
  version = 'GL';

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  unitsForSim = [];
  selectedUnitForSim = 0;
  damageSim = null;
  species = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private translateService: TranslateService,
    private guildService: GuildService,
    private masterRanksService: MasterRanksService,
    private esperService: EsperService,
    private cardService: CardService,
    private equipmentService: EquipmentService,
    private toolService: ToolService,
    private simpleModalService: SimpleModalService,
    private clipboardService: ClipboardService,
    private teamService: TeamService,
    private authService: AuthService,
    private navService: NavService,
    private simulatorService: SimulatorService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      for (let i = 0; i <= 4; i++) {
        this.translateUnits(i);
      }
    });

    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    this.team = await this.teamService.newTeam();
    for (let i = 0; i <= 4; i++) {
      await this.getAvailableUnits(i);
    }

    this.statueNames = Object.keys(this.team.guild.statues);

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        const teamData = await this.teamService.getStoredTeam(data);
        if (teamData) {
          await this.teamService.updateTeam(teamData);
          // @ts-ignore
          this.team.storeId = data;

          for (let unitIndex = 0; unitIndex <= this.team.units.length - 1; unitIndex++) {
            const unit = this.team.units[unitIndex];
            if (unit) {
              this.selectedUnits[unitIndex] = unit.dataId;
              this.star[unitIndex] = unit.star;
              this.lb[unitIndex] = unit.lb;
              await this.getAvailableUnits(unitIndex);

              Object.keys(unit.board.nodes).forEach(nodeId => {
                if (unit.board.nodes[nodeId].skill.type !== 'buff') {
                  unit.board.nodes[nodeId].skill.name = this.toolService.getName(unit.board.nodes[nodeId].skill);
                }
              });
            }
          }

          this.getUnitsForSim();
          this.newDamageSim();
          this.updateActiveSkillsForSim();
        }
      }
    });

    this.navService.setTitle('Team Builder');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedUnits = this.unitService.getSavedUnits();
        this.savedTeams = this.teamService.getSavedTeams();
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

  async getAvailableUnits(pos) {
    this.availableUnits[pos] = await this.teamService.getAvailableUnits(pos);
    this.translateUnits(pos);
  }

  private translateUnits(pos) {
    if (this.availableUnits[pos]) {
      this.availableUnits[pos].forEach(unit => {
        unit.name = this.toolService.getName(unit);
      });
    }
  }

  async selectUnit(pos, forceSelect = false, customData = null) {
    const dataId = this.selectedUnits[pos];

    if (!forceSelect && this.savedUnits[dataId] && this.savedUnits[dataId].length > 0) {
      this.openLoadModalUnits(pos, dataId);
    } else {
      await this.teamService.selectUnit(pos, dataId, customData);

      if (this.team.units[pos]) {
        this.star[pos] = this.team.units[pos].star;
        this.lb[pos] = this.team.units[pos].lb;
        Object.keys(this.team.units[pos].board.nodes).forEach(nodeId => {
          if (this.team.units[pos].board.nodes[nodeId].skill.type !== 'buff') {
            this.team.units[pos].board.nodes[nodeId].skill.name = this.toolService.getName(this.team.units[pos].board.nodes[nodeId].skill);
          }
        });

        if (this.team.units[pos].replacedSkills) {
          Object.keys(this.team.units[pos].replacedSkills).forEach(upgradeId => {
            this.team.units[pos].replacedSkills[upgradeId].forEach(upgrade => {
              if (upgrade.newSkill) {
                upgrade.newSkill.name = this.toolService.getName(upgrade.newSkill);
              }

              if (upgrade.oldSkillData) {
                upgrade.oldSkillData.name = this.toolService.getName(upgrade.oldSkillData);
              }
            });
          });
        }
      }

      for (let i = 0; i <= this.team.units.length - 1; i++) {
        if (i !== pos) {
          await this.getAvailableUnits(i);
        }
      }

      this.getUnitsForSim();
      this.updateActiveSkillsForSim();
    }
  }

  openLoadModalUnits(pos, unitId) {
    this.simpleModalService.addModal(ModalLoadComponent, { type: 'unit', savedItems: this.savedUnits[unitId], allowNew: true })
      .subscribe(async (result) => {
        if (result) {
          if (result.type === 'new') {
            await this.selectUnit(pos, true);
          }

          if (result.type === 'load' && result.item) {
            await this.selectUnit(pos, true, result.item);
          }

          if (result.type === 'fullDelete') {
            this.savedUnits[unitId] = [];
          }
        } else {
          if (this.team.units[pos]) {
            this.selectedUnits[pos] = this.team.units[pos].dataId;
          } else {
            this.selectedUnits[pos] = null;
          }

          this.getUnitsForSim();
        }
      });
  }

  updateStar(pos) {
    this.teamService.changeStar(pos, this.star[pos]);
    this.updateActiveSkillsForSim();
  }

  updateLB(pos) {
    if (this.lb[pos] === this.team.units[pos].lb) {
      this.lb[pos] = undefined;
    }

    this.teamService.changeLB(pos, this.lb[pos]);
    this.updateSelectedEquipments(pos);
    this.changeLevel(pos);

    this.updateActiveSkillsForSim();
  }

  updateSelectedEquipments(pos) {
    const unit = this.team.units[pos];

    if (unit.lb < 4) {
      if (unit.equipments[2]) {
        unit.equipments[2] = null;
      }

      if (unit.equipments[1] && unit.equipments[1].acquisition && unit.equipments[1].acquisition.type === 'tmr') {
        unit.equipments[1] = null;
      }

      if (unit.equipments[0] && unit.equipments[0].acquisition && unit.equipments[0].acquisition.type === 'tmr') {
        unit.equipments[0] = null;
      }
    }

    if (unit.lb < 2 && unit.equipments[1]) {
      unit.equipments[1] = null;
    }
  }

  changeLevel(pos) {
    this.teamService.changeLevel(pos);

    this.calculateDamageSim(pos);
  }

  updateJobLevel(pos) {
    this.teamService.changeJobLevel(pos);
    this.updateActiveSkillsForSim();
  }

  maxUnit(pos) {
    this.teamService.maxUnit(pos);
    this.updateActiveSkillsForSim();
    this.star[pos] = this.team.units[pos].star;
    this.lb[pos] = this.team.units[pos].lb;
  }

  maxLevelAndJobs(pos) {
    this.teamService.maxLevelAndJobs(pos);
    this.updateActiveSkillsForSim();
  }

  showGuildDetail() {
    this.simpleModalService.addModal(ModalGuildComponent, { guild : JSON.parse(JSON.stringify(this.team.guild.data)) })
      .subscribe(async (guild) => {
        if (guild !== 'close') {
          this.team.guild.data = guild;
          for (let i = 0; i <= 4; i++) {
            if (this.team.units[i]) {
              this.teamService.changeLevel(i);
              this.calculateDamageSim();
            }
          }
        }
      });
  }

  showMasterRanksDetail() {
    this.simpleModalService.addModal(ModalMasterRanksComponent, { masterRanks : JSON.parse(JSON.stringify(this.team.masterRanks.data)) })
      .subscribe(async (masterRanks) => {
        if (masterRanks !== 'close') {
          this.team.masterRanks.data = masterRanks;
          for (let i = 0; i <= 4; i++) {
            if (this.team.units[i]) {
              this.teamService.changeLevel(i);
              this.calculateDamageSim();
            }
          }
        }
      });
  }

  openEquipmentsModal(unitPos, equipmentPos) {
    let equipment = null;
    let modalStep = 'select';
    const unit = this.team.units[unitPos];

    if (this.team.units[unitPos].equipments[equipmentPos]) {
      equipment = JSON.parse(JSON.stringify(this.team.units[unitPos].equipments[equipmentPos]));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalEquipmentsComponent, { equipment: equipment, modalStep: modalStep, unit: unit, equipmentPos: equipmentPos })
      .subscribe(async (loadEquipment) => {
        if (loadEquipment !== 'close') {
          this.team.units[unitPos].equipments[equipmentPos] = loadEquipment;
          this.teamService.changeLevel(unitPos);
          this.calculateDamageSim(unitPos);
        }
      });
  }

  openEspersModal(pos) {
    let esper = null;
    let modalStep = 'select';
    const teamUnitPos = pos;

    if (this.team.units[pos].esper) {
      esper = JSON.parse(JSON.stringify(this.team.units[pos].esper));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalEspersComponent, { esper: esper, modalStep: modalStep, teamUnitPos: teamUnitPos })
      .subscribe(async (loadEsper) => {
        if (loadEsper !== 'close') {
          this.team.units[pos].esper = loadEsper;
          this.teamService.changeLevel(pos);
          this.calculateDamageSim(pos);
          this.teamService.updateTeamCost();
        }
      });
  }

  openCardsModal(pos, subCard = false) {
    let cardType = 'main';
    let card = null;
    let modalStep = 'select';
    const teamUnitPos = pos;

    if (subCard) {
      cardType = 'sub';
    }

    if (!subCard && this.team.units[pos].card) {
      card = JSON.parse(JSON.stringify(this.team.units[pos].card));
      modalStep = 'custom';
    }

    if (subCard && this.team.units[pos].subCard) {
      card = JSON.parse(JSON.stringify(this.team.units[pos].subCard));
      modalStep = 'custom';
    }

    this.simpleModalService.addModal(ModalCardsComponent, { cardType: cardType, card: card, modalStep: modalStep, teamUnitPos: teamUnitPos })
      .subscribe(async (loadCard) => {
        if (loadCard !== 'close') {
          if (!subCard) {
            this.team.units[pos].card = loadCard;
          } else {
            this.team.units[pos].subCard = loadCard;
          }

          this.teamService.changeLevel(pos);

          this.team.units.forEach((unit, unitIndex) => {
            if (unit && unitIndex !== pos) {
              this.team.units[unitIndex].teamCards[pos] = this.team.units[pos].card;
              this.team.units[unitIndex].teamSubCards[pos] = this.team.units[pos].subCard;
              this.team.units[unitIndex].changeLevel();
            }
          });

          this.updateActiveSkillsForSim();
          this.calculateDamageSim();

          this.teamService.updateTeamCost();
        }
      });
  }

  openLoadModal() {
    this.simpleModalService.addModal(ModalLoadComponent, { type: 'team', savedItems: this.savedTeams })
      .subscribe(async (result) => {
        if (result.type === 'load' && result.item) {
          await this.loadTeam(result.item);
        }

        if (result.type === 'fullDelete') {
          this.savedTeams = [];
        }
      });
  }

  async loadTeam(teamData) {
    await this.teamService.updateTeam(teamData);
    await this.updateAllAvailable();
    this.updateAllSelected();

    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        this.star[unitIndex] = unit.star;
        this.lb[unitIndex] = unit.lb;
        Object.keys(unit.board.nodes).forEach(nodeId => {
          if (unit.board.nodes[nodeId].skill.type !== 'buff') {
            unit.board.nodes[nodeId].skill.name = this.toolService.getName(unit.board.nodes[nodeId].skill);
          }
        });
      }
    });

    this.getUnitsForSim();
    this.newDamageSim();
    this.updateActiveSkillsForSim();
  }

  async updateAllAvailable() {
    for (let i = 0; i <= this.team.units.length - 1; i++) {
      await this.getAvailableUnits(i);
    }
  }

  updateAllSelected() {
    this.selectedUnits = [null, null, null, null, null];

    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        this.selectedUnits[unitIndex] = unit.dataId;
      }
    });
  }

  openSaveModal() {
    let atLeasOneUnit = false;
    this.team.units.forEach(unit => {
      if (unit) {
        atLeasOneUnit = true;
      }
    });

    if (atLeasOneUnit) {
      this.simpleModalService.addModal(ModalSaveComponent, { type: 'team', item: this.team })
        .subscribe((isSaved) => {
          if (isSaved) {
            this.savedTeams = this.teamService.getSavedTeams();
          }
        });
    }
  }

  openLinkModal() {
    this.simpleModalService.addModal(ModalLinkComponent, { type: 'team', item: this.team });
  }

  getAvailableStatType(pos) {
    return this.teamService.getAvailableStatType(pos);
  }

  updateLevel(pos) {
    this.changeLevel(pos);
    this.calculateDamageSim(pos);
  }

  selectSubJob(pos, jobNum) {
    this.team.units[pos].subjob = jobNum;
    this.updateActiveSkillsForSim();
  }

  updateSupportSkill(pos) {
    this.changeLevel(pos);
    this.calculateDamageSim(pos);
  }

  updateEsperResonance(pos) {
    this.changeLevel(pos);
    this.calculateDamageSim(pos);
  }

  resetUnit(pos) {
    this.teamService.resetUnit(pos);
    this.updateActiveSkillsForSim();
    this.star[pos] = this.team.units[pos].star;
    this.lb[pos] = this.team.units[pos].lb;
  }

  resetLevel(pos) {
    this.teamService.resetLevel(pos);
    this.calculateDamageSim(pos);
  }

  resetJob(pos) {
    this.teamService.resetJob(pos);
    this.updateActiveSkillsForSim();
    this.calculateDamageSim(pos);
  }

  async newTeam() {
    this.team = await this.teamService.newTeam();
    this.updateAllSelected();
    await this.updateAllAvailable();
    this.newDamageSim();
    this.getUnitsForSim();
  }

  getUnitsForSim() {
    this.unitsForSim = [];
    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        this.unitsForSim.push({
          index: unitIndex,
          name: unit.name
        });
      } else if (unitIndex === this.selectedUnitForSim) {
        this.selectedUnitForSim = null;
      }
    });

    if (this.selectedUnitForSim === null) {
      this.team.units.forEach((unit, unitIndex) => {
        if (unit && this.selectedUnitForSim === null) {
          this.selectedUnitForSim = unitIndex;
          this.changeSimUnit();
        }
      });
    }
  }

  changeSimUnit() {
    if (this.team.units[this.selectedUnitForSim] && this.team.units[this.selectedUnitForSim].skillsForSim) {
      this.damageSim.unit.selectedSkill = this.team.units[this.selectedUnitForSim].skillsForSim[0];
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

  calculateDamageSim(unitPos = null) {
    if (unitPos === null || this.selectedUnitForSim === unitPos) {
      this.simulatorService.calculateDamageSim(this.team.units[this.selectedUnitForSim], this.damageSim);
    }
  }

  updateActiveSkillsForSim() {
    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        const skills = [
          unit.formattedAttack
        ];

        this.teamService.getActiveSkills(unitIndex);

        unit.activeSkills.forEach(skill => {
          if (skill.damage) {
            skills.push(skill);
          }
        });

        unit.skillsForSim = skills;

        if (unit.formattedLimit && unit.formattedLimit.damage) {
          unit.skillsForSim.push(unit.formattedLimit);
        }

        if (unit.card) {
          unit.card.skills.forEach(skill => {
            if (skill.damage) {
              unit.skillsForSim.push(skill);
            }
          });
        }

        if (unit.subCard) {
          unit.subCard.skills.forEach(skill => {
            if (skill.damage) {
              unit.skillsForSim.push(skill);
            }
          });
        }
      }
    });

    if (this.damageSim && this.damageSim.unit.selectedSkill && this.team.units[this.selectedUnitForSim]) {
      let oldSelectedSkillFound = false;
      this.team.units[this.selectedUnitForSim].skillsForSim.forEach(skill => {
        if (skill.dataId === this.damageSim.unit.selectedSkill.dataId) {
          oldSelectedSkillFound = true;
        }
      });

      if (!oldSelectedSkillFound) {
        this.damageSim.unit.selectedSkill = null;
      }
    }

    if (this.damageSim === null) {
      this.newDamageSim();
    }


    let atLeasOneUnit = false;
    this.team.units.forEach(unit => {
      if (unit) {
        atLeasOneUnit = true;
      }
    });

    if (atLeasOneUnit) {
      if (this.damageSim && this.damageSim.unit.selectedSkill === null) {
        this.damageSim.unit.selectedSkill = this.team.units[this.selectedUnitForSim].skillsForSim[0];
        this.calculateDamageSim();
      }
    }
  }
}
