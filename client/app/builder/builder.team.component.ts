import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { MasterRanksService } from '../services/mr.service';
import { GridService } from '../services/grid.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { EquipmentService } from '../services/equipment.service';
import { TeamService } from '../services/team.service'
import { NameService } from '../services/name.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';

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
export class BuilderTeamComponent implements OnInit {
  availableUnits = [null, null, null, null, null]
  selectedUnits = [null, null, null, null, null]
  savedUnits: {}

  team = null
  statueNames
  exportableLink = ""
  confirmModal = null
  savedTeams = null
  showSave = false
  version = 'GL'

  rarityTranslate = {
    UR: "Ultra Rare",
    MR: "Mega Rare",
    SR: "Super Rare",
    R: "Rare",
    N: "Normal"
  }

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
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      for (let i = 0; i <= 4; i++) {
        this.translateUnits(i)
      }
    })

    this.version = this.navService.getVersion()
  }

  ngOnInit() {
    for (let i = 0; i <= 4; i++) {
      this.getAvailableUnits(i)
    }

    this.team = this.teamService.newTeam();
    this.statueNames = Object.keys(this.team.guild.statues)

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let data = params.get('data')
      if (data) {
        this.teamService.getStoredTeam(data).subscribe(teamData => {
          this.teamService.updateTeam(teamData)
          this.team.units.forEach((unit, unitIndex) => {
            if (unit) {
              this.selectedUnits[unitIndex] = unit.dataId
              this.getAvailableUnits(unitIndex)

              Object.keys(unit.board.nodes).forEach(nodeId => {
                if (unit.board.nodes[nodeId].skill.type !== "buff") {
                  unit.board.nodes[nodeId].skill.name = this.nameService.getName(unit.board.nodes[nodeId].skill)
                }
              })
            }
          })
        })
      }
    });

    this.navService.setTitle("Team Builder");
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedUnits = this.unitService.getSavedUnits()
        this.savedTeams = this.teamService.getSavedTeams()
      });
    })

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true
        } else {
          this.showSave = false
        }
      });
    })
  }

  getAvailableUnits(pos) {
    this.availableUnits[pos] = this.teamService.getAvailableUnits(pos)
    this.translateUnits(pos)
  }

  private translateUnits(pos) {
    this.availableUnits[pos].forEach(unit => {
      unit.name = this.nameService.getName(unit)
    });
  }

  selectUnit(pos, forceSelect = false, customData = null) {
    let dataId = this.selectedUnits[pos]

    if (!forceSelect && this.savedUnits[dataId] && this.savedUnits[dataId].length > 0) {
      this.openLoadModalUnits(pos, dataId)
    } else {
      this.teamService.selectUnit(pos, dataId, customData)

      if (this.team.units[pos]) {
        Object.keys(this.team.units[pos].board.nodes).forEach(nodeId => {
          if (this.team.units[pos].board.nodes[nodeId].skill.type !== "buff") {
            this.team.units[pos].board.nodes[nodeId].skill.name = this.nameService.getName(this.team.units[pos].board.nodes[nodeId].skill)
          }
        })
      }

      this.team.units.forEach((unit, unitIndex) => {
        if (unitIndex !== pos) {
          this.getAvailableUnits(unitIndex)
        }
      })
    }
  }

  openLoadModalUnits(pos, unitId) {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'unit'
    modalRef.componentInstance.savedItems = this.savedUnits[unitId]
    modalRef.componentInstance.allowNew = true

    modalRef.result.then(result => {
      if (result.type == 'new') {
        this.selectUnit(pos, true)
      }

      if (result.type == 'load' && result.item) {
        this.selectUnit(pos, true, result.item)
      }

      if (result.type == 'fullDelete') {
        this.savedUnits[unitId] = []
      }
    }, (reason) => {
      if (this.team.units[pos]) {
        this.selectedUnits[pos] = this.team.units[pos].dataId
      } else {
        this.selectedUnits[pos] = null
      }
    });
  }

  changeStar(pos, value) {
    this.teamService.changeStar(pos, value)
  }

  changeLB(pos, value) {
    if (value == this.team.units[pos].lb) {
      value = undefined
    }

    this.teamService.changeLB(pos, value)
    this.updateSelectedEquipments(pos)
    this.changeLevel(pos)
  }

  updateSelectedEquipments(pos) {
    let unit = this.team.units[pos]

    if (unit.lb < 4) {
      if (unit.equipments[2]) {
        unit.equipments[2] = null;
      }

      if (unit.equipments[1] && unit.equipments[1].acquisition && unit.equipments[1].acquisition.type === "tmr") {
        unit.equipments[1] = null;
      }

      if (unit.equipments[0] && unit.equipments[0].acquisition && unit.equipments[0].acquisition.type === "tmr") {
        unit.equipments[0] = null;
      }
    }

    if (unit.lb < 2 && unit.equipments[1]) {
      unit.equipments[1] = null;
    }
  }

  changeLevel(pos) {
    this.teamService.changeLevel(pos)
  }

  selectJobLevel(pos, jobNumber, level) {
    this.team.units[pos].jobsData[jobNumber].level = level
    this.teamService.changeJobLevel(pos)
  }

  getAvailableSupportNodes(unitPos, supportPos) {
    return this.teamService.getAvailableSupportNodes(unitPos, supportPos)
  }

  getAvailableCounterNodes(pos) {
    return this.teamService.getAvailableCounterNodes(pos)
  }

  maxUnit(pos) {
    this.teamService.maxUnit(pos)
  }

  maxLevelAndJobs(pos) {
    this.teamService.maxLevelAndJobs(pos)
  }

  showGuildDetail() {
    const modalRef = this.modalService.open(ModalGuildComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.guild = JSON.parse(JSON.stringify(this.team.guild.data))

    modalRef.result.then((guild) => {
      this.team.guild.data = guild
      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          this.teamService.changeLevel(i)
        }
      }
    }, (reason) => {
    });
  }

  showMasterRanksDetail() {
    const modalRef = this.modalService.open(ModalMasterRanksComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.masterRanks = JSON.parse(JSON.stringify(this.team.masterRanks.data))

    modalRef.result.then((masterRanks) => {
      this.team.masterRanks.data = masterRanks
      for (let i = 0; i <= 4; i++) {
        if (this.team.units[i]) {
          this.teamService.changeLevel(i)
        }
      }
    }, (reason) => {
    });
  }

  openEquipmentsModal(unitPos, equipmentPos) {
    const modalRef = this.modalService.open(ModalEquipmentsComponent, { windowClass: 'builder-modal' });
    modalRef.componentInstance.unit = this.team.units[unitPos];
    modalRef.componentInstance.equipmentPos = equipmentPos

    if (this.team.units[unitPos].equipments[equipmentPos]) {
      modalRef.componentInstance.equipment = JSON.parse(JSON.stringify(this.team.units[unitPos].equipments[equipmentPos]))
      modalRef.componentInstance.modalStep = "custom"
    }

    modalRef.result.then((equipment) => {
      if (equipment) {
        this.team.units[unitPos].equipments[equipmentPos] = equipment
        this.teamService.changeLevel(unitPos)
      }
    }, (reason) => {
    });
  }

  openEspersModal(pos) {
    const modalRef = this.modalService.open(ModalEspersComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.teamUnitPos = pos
    if (this.team.units[pos].esper) {
      modalRef.componentInstance.esper = JSON.parse(JSON.stringify(this.team.units[pos].esper))
      modalRef.componentInstance.modalStep = "custom"
    }

    modalRef.result.then((esper) => {
      if (esper) {
        this.team.units[pos].esper = esper
        this.teamService.changeLevel(pos)
      }

      this.teamService.updateTeamCost()
    }, (reason) => {
    });
  }

  openCardsModal(pos) {
    const modalRef = this.modalService.open(ModalCardsComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.teamUnitPos = pos
    if (this.team.units[pos].card) {
      modalRef.componentInstance.card = JSON.parse(JSON.stringify(this.team.units[pos].card))
      modalRef.componentInstance.modalStep = "custom"
    }

    modalRef.result.then((card) => {
      if (card) {
        this.team.units[pos].card = card
        this.teamService.changeLevel(pos)

        this.team.units.forEach((unit, unitIndex) => {
          if (unit && unitIndex != pos) {
            this.team.units[unitIndex].teamCards[pos] = this.team.units[pos].card
            this.team.units[unitIndex].changeLevel()
          }
        })

        this.teamService.updateTeamCost()
      }
    }, (reason) => {
    });
  }

  openLoadModal() {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'team'
    modalRef.componentInstance.savedItems = this.savedTeams

    modalRef.result.then(result => {
      if (result.type == 'load' && result.item) {
        this.loadTeam(result.item)
      }

      if (result.type == 'fullDelete') {
        this.savedTeams = []
      }
    }, (reason) => {
    });
  }

  loadTeam(teamData) {
    this.teamService.updateTeam(teamData)
    this.updateAllAvailable()
    this.updateAllSelected()

    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        Object.keys(unit.board.nodes).forEach(nodeId => {
          if (unit.board.nodes[nodeId].skill.type !== "buff") {
            unit.board.nodes[nodeId].skill.name = this.nameService.getName(unit.board.nodes[nodeId].skill)
          }
        })
      }
    })
  }

  updateAllAvailable() {
    this.team.units.forEach((unit, unitIndex) => {
      this.getAvailableUnits(unitIndex)
    })
  }

  updateAllSelected() {
    this.selectedUnits = [null, null, null, null, null]

    this.team.units.forEach((unit, unitIndex) => {
      if (unit) {
        this.selectedUnits[unitIndex] = unit.dataId
      }
    })
  }

  openSaveModal() {
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'team'
    modalRef.componentInstance.item = this.team

    modalRef.result.then(result => {
      this.savedTeams = this.teamService.getSavedTeams()
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'team'
    modalRef.componentInstance.item = this.team
  }

  getAvailableStatType(pos) {
    return this.teamService.getAvailableStatType(pos)
  }

  selectLevel(pos, level) {
    this.team.units[pos].level = level
    this.changeLevel(pos)
  }

  // selectMasterSkillLevel(pos, level) {
  //   this.team.units[pos].masterSkillActivated = level
  //   this.changeLevel(pos)
  // }

  selectLimitLevel(pos, level) {
    this.team.units[pos].limit.level = level
  }

  selectSubJob(pos, jobNum) {
    this.team.units[pos].subjob = jobNum
  }

  selectSupportSkill(unitPos, supportPos, nodeId) {
    this.team.units[unitPos].activatedSupport[supportPos] = nodeId
    this.changeLevel(unitPos)
  }

  selectCounterSkill(pos, nodeId) {
    this.team.units[pos].activatedCounter = nodeId
  }

  selectEsperResonance(pos, level) {
    this.team.units[pos].esper.resonance = level
    this.changeLevel(pos)
  }

  resetUnit(pos) {
    this.teamService.resetUnit(pos)
  }

  resetLevel(pos) {
    this.teamService.resetLevel(pos)
  }

  resetJob(pos) {
    this.teamService.resetJob(pos)
  }

  newTeam() {
    this.team = this.teamService.newTeam();
    this.updateAllSelected()
    this.updateAllAvailable()
  }
}
