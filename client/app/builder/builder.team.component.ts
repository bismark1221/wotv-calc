import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
import { NameService } from '../services/name.service';
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
    private nameService: NameService,
    private modalService: NgbModal,
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

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      const data = params.get('data');
      if (data) {
        this.teamService.getStoredTeam(data).subscribe(async teamData => {
          await this.teamService.updateTeam(teamData);
          // @ts-ignore
          this.team.storeId = data;

          for (let unitIndex = 0; unitIndex <= this.team.units.length - 1; unitIndex++) {
            const unit = this.team.units[unitIndex];
            if (unit) {
              this.selectedUnits[unitIndex] = unit.dataId;
              await this.getAvailableUnits(unitIndex);

              Object.keys(unit.board.nodes).forEach(nodeId => {
                if (unit.board.nodes[nodeId].skill.type !== 'buff') {
                  unit.board.nodes[nodeId].skill.name = this.nameService.getName(unit.board.nodes[nodeId].skill);
                }
              });
            }
          }

          this.getUnitsForSim();
          this.newDamageSim();
          this.updateActiveSkillsForSim();
        });
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
        unit.name = this.nameService.getName(unit);
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
        Object.keys(this.team.units[pos].board.nodes).forEach(nodeId => {
          if (this.team.units[pos].board.nodes[nodeId].skill.type !== 'buff') {
            this.team.units[pos].board.nodes[nodeId].skill.name = this.nameService.getName(this.team.units[pos].board.nodes[nodeId].skill);
          }
        });

        if (this.team.units[pos].replacedSkills) {
          Object.keys(this.team.units[pos].replacedSkills).forEach(upgradeId => {
            this.team.units[pos].replacedSkills[upgradeId].forEach(upgrade => {
              if (upgrade.newSkill) {
                upgrade.newSkill.name = this.nameService.getName(upgrade.newSkill);
              }

              if (upgrade.oldSkillData) {
                upgrade.oldSkillData.name = this.nameService.getName(upgrade.oldSkillData);
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
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'unit';
    modalRef.componentInstance.savedItems = this.savedUnits[unitId];
    modalRef.componentInstance.allowNew = true;

    modalRef.result.then(async result => {
      if (result.type === 'new') {
        await this.selectUnit(pos, true);
      }

      if (result.type === 'load' && result.item) {
        await this.selectUnit(pos, true, result.item);
      }

      if (result.type === 'fullDelete') {
        this.savedUnits[unitId] = [];
      }
    }, (reason) => {
      if (this.team.units[pos]) {
        this.selectedUnits[pos] = this.team.units[pos].dataId;
      } else {
        this.selectedUnits[pos] = null;
      }

      this.getUnitsForSim();
    });
  }

  changeStar(pos, value) {
    this.teamService.changeStar(pos, value);
    this.updateActiveSkillsForSim();
  }

  changeLB(pos, value) {
    if (value === this.team.units[pos].lb) {
      value = undefined;
    }

    this.teamService.changeLB(pos, value);
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
  }

  maxLevelAndJobs(pos) {
    this.teamService.maxLevelAndJobs(pos);
    this.updateActiveSkillsForSim();
  }

  showGuildDetail() {
    const modalRef = this.modalService.open(ModalGuildComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.guild = JSON.parse(JSON.stringify(this.team.guild.data));

    modalRef.result.then((guild) => {
      this.team.guild.data = guild;
      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          this.teamService.changeLevel(i);
          this.calculateDamageSim();
        }
      }
    }, (reason) => {
    });
  }

  showMasterRanksDetail() {
    const modalRef = this.modalService.open(ModalMasterRanksComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.masterRanks = JSON.parse(JSON.stringify(this.team.masterRanks.data));

    modalRef.result.then((masterRanks) => {
      this.team.masterRanks.data = masterRanks;
      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          this.teamService.changeLevel(i);
          this.calculateDamageSim();
        }
      }
    }, (reason) => {
    });
  }

  openEquipmentsModal(unitPos, equipmentPos) {
    const modalRef = this.modalService.open(ModalEquipmentsComponent, { windowClass: 'builder-modal' });
    modalRef.componentInstance.unit = this.team.units[unitPos];
    modalRef.componentInstance.equipmentPos = equipmentPos;

    if (this.team.units[unitPos].equipments[equipmentPos]) {
      modalRef.componentInstance.equipment = JSON.parse(JSON.stringify(this.team.units[unitPos].equipments[equipmentPos]));
      modalRef.componentInstance.modalStep = 'custom';
    }

    modalRef.result.then((equipment) => {
      if (equipment) {
        this.team.units[unitPos].equipments[equipmentPos] = equipment;
        this.teamService.changeLevel(unitPos);
        this.calculateDamageSim(unitPos);
      }
    }, (reason) => {
    });
  }

  openEspersModal(pos) {
    const modalRef = this.modalService.open(ModalEspersComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.teamUnitPos = pos;
    if (this.team.units[pos].esper) {
      modalRef.componentInstance.esper = JSON.parse(JSON.stringify(this.team.units[pos].esper));
      modalRef.componentInstance.modalStep = 'custom';
    }

    modalRef.result.then((esper) => {
      if (esper) {
        this.team.units[pos].esper = esper;
        this.teamService.changeLevel(pos);
        this.calculateDamageSim(pos);
      }

      this.teamService.updateTeamCost();
    }, (reason) => {
    });
  }

  openCardsModal(pos) {
    const modalRef = this.modalService.open(ModalCardsComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.teamUnitPos = pos;
    if (this.team.units[pos].card) {
      modalRef.componentInstance.card = JSON.parse(JSON.stringify(this.team.units[pos].card));
      modalRef.componentInstance.modalStep = 'custom';
    }

    modalRef.result.then((card) => {
      if (card) {
        this.team.units[pos].card = card;
        this.teamService.changeLevel(pos);

        this.team.units.forEach((unit, unitIndex) => {
          if (unit && unitIndex !== pos) {
            this.team.units[unitIndex].teamCards[pos] = this.team.units[pos].card;
            this.team.units[unitIndex].changeLevel();
          }
        });

        this.updateActiveSkillsForSim();
        this.calculateDamageSim();

        this.teamService.updateTeamCost();
      }
    }, (reason) => {
    });
  }

  openLoadModal() {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'team';
    modalRef.componentInstance.savedItems = this.savedTeams;

    modalRef.result.then(async result => {
      if (result.type === 'load' && result.item) {
        await this.loadTeam(result.item);
      }

      if (result.type === 'fullDelete') {
        this.savedTeams = [];
      }
    }, (reason) => {
    });
  }

  async loadTeam(teamData) {
    await this.teamService.updateTeam(teamData);
    await this.updateAllAvailable();
    this.updateAllSelected();

    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        Object.keys(unit.board.nodes).forEach(nodeId => {
          if (unit.board.nodes[nodeId].skill.type !== 'buff') {
            unit.board.nodes[nodeId].skill.name = this.nameService.getName(unit.board.nodes[nodeId].skill);
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
      const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

      modalRef.componentInstance.type = 'team';
      modalRef.componentInstance.item = this.team;

      modalRef.result.then(result => {
        this.savedTeams = this.teamService.getSavedTeams();
      }, (reason) => {
      });
    }
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'team';
    modalRef.componentInstance.item = this.team;
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
          unit.attack
        ];

        this.teamService.getActiveSkills(unitIndex);

        unit.activeSkills.forEach(skill => {
          if (skill.damage) {
            skills.push(skill);
          }
        });

        unit.skillsForSim = skills;

        if (unit.limit) {
          unit.skillsForSim.push(unit.limit);
        }

        if (unit.card) {
          unit.card.skills.forEach(skill => {
            unit.skillsForSim.push(skill);
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
