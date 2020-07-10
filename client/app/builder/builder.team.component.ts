import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard'

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { GridService } from '../services/grid.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { EquipmentService } from '../services/equipment.service';
import { TeamService } from '../services/team.service'

import { BuilderEsperComponent } from './builder.esper.component';
import { BuilderCardComponent } from './builder.card.component';
import { BuilderEquipmentComponent } from './builder.equipment.component';
import { BuilderGuildComponent } from './builder.guild.component';

@Component({
  selector: 'app-builder-team',
  templateUrl: './builder.team.component.html',
  styleUrls: ['./builder.team.component.css']
})
export class BuilderTeamComponent implements OnInit {
  list = {
    units : [null, null, null, null, null],
    espers : [null, null, null, null, null],
    cards : [null, null, null, null, null],
    equipments : [
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  selected = {
    units: [null, null, null, null, null],
    espers: [null, null, null, null, null],
    cards: [null, null, null, null, null],
    equipments : [
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  }

  team = null
  statueNames
  exportableLink = ""

  constructor(
    private activatedRoute: ActivatedRoute,
    private unitService: UnitService,
    private translateService: TranslateService,
    private guildService: GuildService,
    private esperService: EsperService,
    private cardService: CardService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
    private clipboardService: ClipboardService,
    private teamService: TeamService
  ) {
    // this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.getUnits();
    //   this.getEspers();
    //   this.getCards();
    // });
  }

  ngOnInit(): void {
    for (let i = 0; i <= 4; i++) {
      this.getAvailableUnits(i)
    }

    this.team = this.teamService.newTeam();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let data = params.get('data')
      if (data) {
        data = JSON.parse(atob(params.get('data')))
        // this.loadTeam(data)
      }
    });
  }

  getAvailableUnits(pos) {
    this.list.units[pos] = this.teamService.getAvailableUnits(pos);
    this.list.units[pos] = [...this.list.units[pos]];
  }

  getAvailableEspers(pos) {
    this.list.espers[pos] = this.teamService.getAvailableEspers(pos);
    this.list.espers[pos] = [...this.list.espers[pos]];
  }

  getAvailableCards(pos) {
    this.list.cards[pos] = this.teamService.getAvailableCards(pos);
    this.list.cards[pos] = [...this.list.cards[pos]];
  }

  getAvailableEquipments(unitPos, equipmentPos = null) {
    if (equipmentPos === null) {
      for (let i = 0; i <= 2; i++) {
        this.list.equipments[unitPos][i] = this.teamService.getAvailableEquipments(unitPos, i);
      }
    } else {
      this.list.equipments[unitPos][equipmentPos] = this.teamService.getAvailableEquipments(unitPos, equipmentPos);
    }
  }

  selectUnit(pos, customData = null) {
    let removedUnit = !this.selected.units[pos] && this.team.units[pos] ? true : false
    this.teamService.selectUnit(pos, this.selected.units[pos])

    if (this.selected.units[pos]) {
      if (this.team.units[pos].esper) {
        this.selected.espers[pos] = this.team.units[pos].esper.dataId
      }

      if (this.team.units[pos].card) {
        this.selected.cards[pos] = this.team.units[pos].card.dataId
      }

      this.team.units[pos].equipments.forEach((equipment, equipmentIndex) => {
        if (equipment) {
          this.selected.equipments[pos][equipmentIndex] = equipment.dataId
        }
      })

      this.getAvailableEspers(pos)
      this.getAvailableCards(pos)
      this.getAvailableEquipments(pos)
    }

    for (let i = 0; i <= 4; i++) {
      if (i != pos) {
        this.getAvailableUnits(i)
        if (removedUnit) {
          this.getAvailableEspers(i)
          this.getAvailableCards(i)
        }
      }
    }
  }

  selectEsper(pos, customData = null) {
    this.teamService.selectEsper(pos, this.selected.espers[pos], customData)

    for (let i = 0; i <= 4; i++) {
      if (i != pos) {
        this.getAvailableEspers(i)
      }
    }
  }

  selectCard(pos, customData = null) {
    this.teamService.selectCard(pos, this.selected.cards[pos], customData)

    for (let i = 0; i <= 4; i++) {
      if (i != pos) {
        this.getAvailableCards(i)
      }
    }
  }

  selectEquipment(unitPos, equipmentPos, customData = null) {
    this.teamService.selectEquipment(unitPos, equipmentPos, this.selected.equipments[unitPos][equipmentPos], customData)
    this.getAvailableEquipments(unitPos)
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
  }

  updateSelectedEquipments(pos) {
    if (this.team.units[pos].lb < 4) {
      if (this.selected.equipments[pos][2]) {
        this.selected.equipments[pos][2] = null;
        this.selectEquipment(pos, 2)
      }

      if (this.selected.equipments[pos][1] && this.team.units[pos].equipments[1].acquisition && this.team.units[pos].equipments[1].acquisition.type === "tmr") {
        this.selected.equipments[pos][1] = null;
        this.selectEquipment(pos, 1)
      }

      if (this.selected.equipments[pos][0] && this.team.units[pos].equipments[0].acquisition && this.team.units[pos].equipments[0].acquisition.type === "tmr") {
        this.selected.equipments[pos][0] = null;
        this.selectEquipment(pos, 0)
      }
    }

    if (this.team.units[pos].lb < 2 && this.selected.equipments[pos][1]) {
      this.selected.equipments[pos][1] = null;
      this.selectEquipment(pos, 1)
    }

    this.getAvailableEquipments(pos)
  }

  changeJobLevel(pos) {
    this.teamService.changeJobLevel(pos)
  }

  changeLevel(pos) {
    this.teamService.changeLevel(pos)
  }

  maxUnit(pos) {
    this.teamService.maxUnit(pos)
  }

  maxLevelAndJobs(pos) {
    this.teamService.maxLevelAndJobs(pos)
  }

  changeSubJob() {

  }

  changeCounter() {

  }

  getAvailableSupportNodes(unitPos, supportPos) {
    return this.teamService.getAvailableSupportNodes(unitPos, supportPos)
  }

  getAvailableCounterNodes(pos) {
    return this.teamService.getAvailableCounterNodes(pos)
  }





  showEsperDetail(pos) {
    const modalRef = this.modalService.open(BuilderEsperComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.esper = this.team.units[pos].esper;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  showCardDetail(pos) {
    const modalRef = this.modalService.open(BuilderCardComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.card = this.team.units[pos].card;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  showEquipmentDetail(unitPos, equipmentPos) {
    const modalRef = this.modalService.open(BuilderEquipmentComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.equipment = this.team.units[unitPos].equipments[equipmentPos];
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  showGuildDetail() {
    const modalRef = this.modalService.open(BuilderGuildComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.guild = this.team.guild;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  console() {
    console.log(this.team)
    console.log(this.selected)
  }
}
