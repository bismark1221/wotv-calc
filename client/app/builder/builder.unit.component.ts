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
import { NavService } from '../services/nav.service'

import { BuilderEsperComponent } from './builder.esper.component';
import { BuilderCardComponent } from './builder.card.component';
import { BuilderEquipmentComponent } from './builder.equipment.component';
import { BuilderGuildComponent } from './builder.guild.component';

import { ModalEquipmentsComponent } from './modal/modal.equipments.component';

@Component({
  selector: 'app-builder-unit',
  templateUrl: './builder.unit.component.html',
  styleUrls: ['./builder.unit.component.css']
})
export class BuilderUnitComponent implements OnInit {
  units
  unit = null
  selectedUnitId = null

  statueNames

  espers
  esper = null
  selectedEsperId = null

  cards
  card = null
  selectedCardId = null

  equipments = [[], [], []]
  selectedEquipments = [null, null, null]
  selectedEquipmentsIds = [null, null, null]

  showStatsDetail = false
  showBuffsDetail = false
  showActiveDetail = false

  statsType = ['HP','TP','AP','ATK','DEF','MAG','SPR','AGI','DEX','LUCK','MOVE','JUMP']
  statsFrom = [
    {type: "baseTotal", translate: "Base"},
    {type: "guild", translate: "Guild Statues"},
    {type: "board", translate: "Board"},
    {type: "support", translate: "Support"},
    {type: "masterSkill", translate: "Master Skill"},
    {type: "esper", translate: "Esper"},
    {type: "card", translate: "Card"},
    {type: "cardParty", translate: "Card Party"},
    {type: "equipment0_stat", translate: "Equipment 1 Stats"},
    {type: "equipment0_buff", translate: "Equipment 1 Buffs"},
    {type: "equipment1_stat", translate: "Equipment 2 Stats"},
    {type: "equipment1_buff", translate: "Equipment 2 Buffs"},
    {type: "equipment2_stat", translate: "Equipment 3 Stats"},
    {type: "equipment2_buff", translate: "Equipment 3 Buffs"},
    {type: "totalEquipment", translate: "Total Equipement"}
  ]

  BuffsFrom = [
    {type: "base", translate: "Base"},
    {type: "board", translate: "Board"},
    {type: "support", translate: "Support"},
    {type: "masterSkill", translate: "Master Skill"},
    {type: "esper", translate: "Esper"},
    {type: "card", translate: "Card"},
    {type: "cardParty", translate: "Card Party"},
    {type: "equipment0_stat", translate: "Equipment 1 Stats"},
    {type: "equipment0_buff", translate: "Equipment 1 Buffs"},
    {type: "equipment1_stat", translate: "Equipment 2 Stats"},
    {type: "equipment1_buff", translate: "Equipment 2 Buffs"},
    {type: "equipment2_stat", translate: "Equipment 3 Stats"},
    {type: "equipment2_buff", translate: "Equipment 3 Buffs"},
    {type: "totalEquipment", translate: "Total Equipement"}
  ]

  buffsImage = [
    "dark_atk",
    "dark_killer",
    "dark_res",
    "earth_atk",
    "earth_killer",
    "earth_res",
    "fire_atk",
    "fire_killer",
    "fire_res",
    "ice_atk",
    "ice_killer",
    "ice_res",
    "light_atk",
    "light_killer",
    "light_res",
    "lightning_atk",
    "lightning_killer",
    "lightning_res",
    "neutral_atk",
    "neutral_killer",
    "neutral_res",
    "water_atk",
    "water_killer",
    "water_res",
    "wind_atk",
    "wind_killer",
    "wind_res",

    "magic_atk",
    "magic_res",
    "missile_atk",
    "missile_res",
    "pierce_atk",
    "pierce_res",
    "slash_atk",
    "slash_res",
    "strike_atk",
    "strike_res",
  ]

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
    private navService: NavService,
    private clipboardService: ClipboardService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getUnits();
      this.getEspers();
      this.getCards();
    });
  }

  ngOnInit(): void {
    this.getUnits();
    this.getEspers();
    this.getCards();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let data = params.get('data')
      if (data) {
        data = JSON.parse(atob(params.get('data')))

        this.selectedUnitId = data.dataId
        this.selectUnit(data)
      }
    });
  }

  private getUnits() {
    this.units = this.unitService.getUnitsForBuilder();
    this.units = [...this.units];
  }

  private getCards() {
    this.cards = this.cardService.getCardsForBuilder();
    this.cards = [...this.cards];
  }

  private getEspers() {
    this.espers = this.esperService.getEspersForBuilder();
    this.espers = [...this.espers];
  }

  getAvailableEquipments(pos) {
    this.equipments[pos] = this.unitService.getAvailableEquipments(pos);
    this.equipments[pos] = [...this.equipments[pos]];
  }

  private addEsperToUnit() {
    if (this.unit) {
      this.unit.esper = null

      if (this.esper) {
        this.unit.esper = this.esper
      }

      this.unitService.changeLevel()
    }
  }

  private addCardToUnit() {
    if (this.unit) {
      this.unit.card = null

      if (this.card) {
        this.unit.card = this.card
      }

      this.unitService.changeLevel()
    }
  }

  private addEquipmentToUnit(pos) {
    if (this.unit) {
      if (!this.unit.equipments) {
        this.unit.equipments = [null, null, null]
      }
      this.unit.equipments[pos] = null

      if (this.selectedEquipments[pos]) {
        this.unit.equipments[pos] = this.selectedEquipments[pos]
      }

      this.unitService.changeLevel()
    }
  }

  private loadEsper() {
    if (this.unit.esper && this.unit.esper.level) {
      this.selectedEsperId = this.unit.esper.dataId
      this.esper = this.unit.esper
    } else {
      this.selectedEsperId = null
      this.selectEsper()
    }
  }

  private loadCard() {
    if (this.unit.card && this.unit.card.level) {
      this.selectedCardId = this.unit.card.dataId
      this.card = this.unit.card
    } else {
      this.selectedCardId = null
      this.selectCard()
    }
  }

  private loadEquipments() {
    for (let i = 0; i <= 2; i++) {
      if (this.unit.equipments && this.unit.equipments[i] && this.unit.equipments[i].level) {
        this.selectedEquipmentsIds[i] = this.unit.equipments[i].dataId
        this.selectedEquipments[i] = this.unit.equipments[i]
      } else {
        this.selectedEquipmentsIds[i] = null
        this.selectedEquipments[i] = null
        this.selectEquipment(i)
      }
    }

    for (let i = 0; i <= 2; i++) {
      this.getAvailableEquipments(i)
    }
  }

  private loadGuild() {
    this.unit.guild = this.guildService.getGuildForBuilder()

     if (this.unit.savedGuild) {
      this.unit.guild.data = this.unit.savedGuild
    }

    this.statueNames = Object.keys(this.unit.guild.data)
    this.unitService.changeLevel()
  }

  selectUnit(customData = null) {
    if (this.selectedUnitId) {
      this.unit = this.unitService.selectUnitForBuilder(this.selectedUnitId, customData)

      this.loadEsper()
      this.loadCard()
      this.loadEquipments()
      this.loadGuild()
      this.unitService.getActiveSkills()
    } else {
      this.unit = null
    }
  }

  selectEsper(customData = null) {
    if (this.selectedEsperId) {
      this.esper = this.esperService.selectEsperForBuilder(this.selectedEsperId, customData)
    } else {
      this.esper = null
    }

    this.addEsperToUnit()
  }

  selectCard(customData = null) {
    if (this.selectedCardId) {
      this.card = this.cardService.selectCardForBuilder(this.selectedCardId, customData)
    } else {
      this.card = null
    }

    this.addCardToUnit()
  }

  selectEquipment(pos, customData = null) {
    if (this.selectedEquipmentsIds[pos]) {
      this.selectedEquipments[pos] = this.equipmentService.selectEquipmentForBuilder(this.selectedEquipmentsIds[pos], customData)
    } else {
      this.selectedEquipments[pos] = null
    }

    this.addEquipmentToUnit(pos)

    for (let i = 0; i <= 2; i++) {
      this.getAvailableEquipments(i)
    }
  }

  changeStar(value) {
    this.unit.star = value
    this.unitService.changeStar()
    this.unitService.getActiveSkills()
  }

  changeLB(value) {
    if (value == this.unit.lb) {
      value = undefined
    }
    this.unit.lb = value
    this.unitService.changeLB()
    this.unitService.getActiveSkills()

    this.updateSelectedEquipments()
  }

  updateSelectedEquipments() {
    if (this.unit.lb < 4) {
      if (this.selectedEquipmentsIds[2]) {
        this.selectedEquipmentsIds[2] = null;
        this.selectEquipment(2)
      }

      if (this.selectedEquipmentsIds[1] && this.unit.equipments[1].acquisition && this.unit.equipments[1].acquisition.type === "tmr") {
        this.selectedEquipmentsIds[1] = null;
        this.selectEquipment(1)
      }

      if (this.selectedEquipmentsIds[0] && this.unit.equipments[0].acquisition && this.unit.equipments[0].acquisition.type === "tmr") {
        this.selectedEquipmentsIds[0] = null;
        this.selectEquipment(0)
      }
    }

    if (this.unit.lb < 2 && this.selectedEquipmentsIds[1]) {
      this.selectedEquipmentsIds[1] = null;
      this.selectEquipment(1)
    }

    for (let i = 0; i <= 2; i++) {
      this.getAvailableEquipments(i)
    }
  }

  changeLevel() {
    this.unitService.changeLevel()
    this.unitService.getActiveSkills()
  }

  changeJobLevel() {
    this.unitService.changeJobLevel()
    this.unitService.getActiveSkills()
  }

  rightClickNode(node) {
    this.unitService.rightClickNode(node)
    this.unitService.getActiveSkills()
  }

  clickNode(node) {
    this.unitService.clickNode(node)
    this.unitService.getActiveSkills()
  }

  canActivateNode(node) {
    return this.unitService.canActivateNode(node)
  }

  getAvailableSupportNodes(pos) {
    return this.unitService.getAvailableSupportNodes(pos)
  }

  getAvailableCounterNodes() {
    return this.unitService.getAvailableCounterNodes()
  }

  save() {
    this.unitService.saveUnit(this.unit)
  }

  showHideDetail(type) {
    this["show" + type + "Detail"] = !this["show" + type + "Detail"]
  }

  maxUnit() {
    this.unitService.maxUnit()
    this.updateSelectedEquipments()
    this.unitService.getActiveSkills()
  }

  maxLevelAndJobs() {
    this.unitService.maxLevelAndJobs()
    this.unitService.getActiveSkills()
  }

  showEsperDetail() {
    const modalRef = this.modalService.open(BuilderEsperComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.esper = this.unit.esper;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  showCardDetail() {
    const modalRef = this.modalService.open(BuilderCardComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.card = this.unit.card;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  showEquipmentDetail(position) {
    const modalRef = this.modalService.open(BuilderEquipmentComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.equipment = this.unit.equipments[position];
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  showGuildDetail() {
    const modalRef = this.modalService.open(BuilderGuildComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.guild = this.unit.guild.data;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      this.unitService.changeLevel()
    }, (reason) => {
      this.unitService.changeLevel()
    });
  }

  openEquipmentsModal(pos) {
    const modalRef = this.modalService.open(ModalEquipmentsComponent, { windowClass: 'builder-modal' });
    modalRef.componentInstance.unit = this.unit;
    modalRef.componentInstance.equipmentPos = pos

    modalRef.result.then((result) => {
      if (result) {
        this.selectedEquipmentsIds[pos] = result
        this.selectEquipment(pos)
      }
    }, (reason) => {
    });
  }

  openLinkModal(content) {
    this.unitService.getExportableLink().subscribe((data: any) => {
      this.exportableLink = data.shorturl;
    })

    const modalRef = this.modalService.open(content, {windowClass: 'link-modal'});
    modalRef.result.then((result) => {}, (reason) => {})
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  copyLink() {
    this.clipboardService.copyFromContent(this.exportableLink)
  }

  changeSubJob() {
    this.unitService.getActiveSkills()
  }

  changeLimit() {
    this.unitService.getActiveSkills()
  }

  changeCounter() {
    this.unitService.getActiveSkills()
  }

  getAvailableStatType() {
    let statTypes = this.unitService.getAvailableStatType()

    let formattedAvailableStatType = [[]]

    statTypes.forEach(type => {
      if (formattedAvailableStatType[formattedAvailableStatType.length - 1].length == 8) {
        formattedAvailableStatType.push([])
      }

      formattedAvailableStatType[formattedAvailableStatType.length - 1].push(type)
    })

    return formattedAvailableStatType
  }
}
