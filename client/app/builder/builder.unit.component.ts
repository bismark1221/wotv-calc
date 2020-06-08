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

@Component({
  selector: 'app-builder-unit',
  templateUrl: './builder.unit.component.html',
  styleUrls: ['./builder.unit.component.css']
})
export class BuilderUnitComponent implements OnInit {
  units
  unit = null
  selectedUnitId = null

  guild

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
    {type: "equipment0", translate: "Equipment 1"},
    {type: "equipment1", translate: "Equipment 2"},
    {type: "equipment2", translate: "Equipment 3"},
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
    {type: "equipment0", translate: "Equipment 1"},
    {type: "equipment1", translate: "Equipment 2"},
    {type: "equipment2", translate: "Equipment 3"},
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
    });
  }

  ngOnInit(): void {
    this.getUnits();
    this.getGuild();
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

  private getGuild() {
    this.guild = this.guildService.getGuild()
  }

  private getUnits() {
    this.units = this.unitService.getUnitsForBuilder(this.translateService);
    this.units = [...this.units];
  }

  private getCards() {
    this.cards = this.cardService.getCardsForBuilder(this.translateService);
    this.cards = [...this.cards];
  }

  private getEspers() {
    this.espers = this.esperService.getEspersForBuilder(this.translateService);
    this.espers = [...this.espers];
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
    if (this.unit.savedEsper && this.unit.savedEsper.level) {
      this.selectedEsperId = this.unit.savedEsper.dataId
      this.selectEsper(this.unit.savedEsper)
    } else {
      this.selectedEsperId = null
      this.selectEsper()
    }
  }

  private loadCard() {
    if (this.unit.savedCard && this.unit.savedCard.level) {
      this.selectedCardId = this.unit.savedCard.dataId
      this.selectCard(this.unit.savedCard)
    } else {
      this.selectedCardId = null
      this.selectCard()
    }
  }

  private loadEquipments() {
    for (let i = 0; i <= 2; i++) {
      if (this.unit.savedEquipments && this.unit.savedEquipments[i] && this.unit.savedEquipments[i].level) {
        this.selectedEquipmentsIds[i] = this.unit.savedEquipments[i].dataId
        this.selectEquipment(i, this.unit.savedEquipments[i])
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

  selectUnit(customData = null) {
    if (this.selectedUnitId) {
      this.unit = this.unitService.selectUnitForBuilder(this.selectedUnitId, customData)

      this.loadEsper()
      this.loadCard()
      this.loadEquipments()
    } else {
      this.unit = null
    }
  }

  getExportableLink() {
    let link = "https://wotv-calc.com" + this.navService.getRoute("/builder/unit") + "/" + btoa(JSON.stringify(this.unitService.getSavableData(this.unit)))
    return link
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
  }

  changeLB(value) {
    if (value == this.unit.lb) {
      value = undefined
    }
    this.unit.lb = value
    this.unitService.changeLB()

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
  }

  changeLevel() {
    this.unitService.changeLevel()
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

  getAvailableEquipments(pos) {
    this.equipments[pos] = this.unitService.getAvailableEquipments(pos);
    this.equipments[pos] = [...this.equipments[pos]];
  }

  save() {
    this.unitService.saveUnit(this.unit)
  }

  showHideDetail(type) {
    this["show" + type + "Detail"] = !this["show" + type + "Detail"]
  }

  maxUnit() {
    this.unitService.maxUnit()
  }

  maxLevelAndJobs() {
    this.unitService.maxLevelAndJobs()
  }

  maxNodes() {
    this.unitService.maxNodes()
  }

  showEsperDetail() {
    const modalRef = this.modalService.open(BuilderEsperComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.esper = this.unit.esper;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      //this.navService.updateMenu(false);
      this.unitService.changeLevel()
    }, (reason) => {
      //this.navService.updateMenu(false);
      this.unitService.changeLevel()
    });
  }

  showCardDetail() {
    const modalRef = this.modalService.open(BuilderCardComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.card = this.unit.card;
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      //this.navService.updateMenu(false);
      this.unitService.changeLevel()
    }, (reason) => {
      //this.navService.updateMenu(false);
      this.unitService.changeLevel()
    });
  }

  showEquipmentDetail(position) {
    const modalRef = this.modalService.open(BuilderEquipmentComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.equipment = this.unit.equipments[position];
    modalRef.componentInstance.fromUnitBuilder = true;

    modalRef.result.then((result) => {
      //this.navService.updateMenu(false);
      this.unitService.changeLevel()
    }, (reason) => {
      //this.navService.updateMenu(false);
      this.unitService.changeLevel()
    });
  }

  openModal(content) {
    const modalRef = this.modalService.open(content, {windowClass: 'link-modal'});
    modalRef.result.then((result) => {}, (reason) => {})
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  copyLink() {
    this.clipboardService.copyFromContent(this.getExportableLink())
  }

  changeSubJob() {
    this.unitService.getActiveSkills()
  }
}
