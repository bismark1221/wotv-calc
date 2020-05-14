import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { GridService } from '../services/grid.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { EquipmentService } from '../services/equipment.service';

import { BuilderEsperDetailComponent } from './builder.esper.detail.component';

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
  guildStatsType

  espers
  esper = null
  selectedEsperId = null

  cards
  card = null
  selectedCardId = null

  equipments
  selectedEquipments = [null, null, null]
  selectedEquipmentsIds = [null, null, null]

  showStatsDetail = false
  showBuffsDetail = false
  viewCardDetail = false

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
    private unitService: UnitService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private guildService: GuildService,
    private esperService: EsperService,
    private cardService: CardService,
    private equipmentService: EquipmentService,
    private modalService: NgbModal,
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getUnits();
    });
  }

  ngOnInit(): void {
    this.getUnits();
    this.getGuild();
    this.getEspers();
    this.getEquipments();
    this.getCards();
  }

  private getGuild() {
    this.guild = this.guildService.getGuild()
    this.guildStatsType = Object.keys(this.guildService.getStats())
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

  private getEquipments() {
    this.equipments = this.equipmentService.getEquipmentsForBuilder(this.translateService);
    this.equipments = [...this.equipments];
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

  selectUnit() {
    if (this.selectedUnitId) {
      this.unit = this.unitService.selectUnitForBuilder(this.selectedUnitId)

      if (this.unit.savedEsper) {
        this.selectedEsperId = this.unit.savedEsper.dataId
        this.selectEsper(this.unit.savedEsper.resonance)
      } else {
        this.selectedEsperId = null
      }

      if (this.unit.savedCard) {
        this.selectedCardId = this.unit.savedCard
        this.selectCard()
      } else {
        this.selectedCardId = null
      }

      for (let i = 0; i <= 2; i++) {
        if (this.unit.savedEquipments && this.unit.savedEquipments[i]) {
          this.selectedEquipmentsIds[i] = this.unit.savedEquipments[i]
          this.selectEquipment(i)
        } else {
          this.selectedEquipmentsIds[i] = null
        }
      }
    } else {
      this.unit = null
    }
  }

  selectEsper(resonance = 1) {
    if (this.selectedEsperId) {
      this.esper = this.esperService.selectEsperForBuilder(this.selectedEsperId)
      this.esper.resonance = resonance
    } else {
      this.esper = null
    }

    this.addEsperToUnit()
  }

  selectCard() {
    if (this.selectedCardId) {
      this.card = this.cardService.selectCardForBuilder(this.selectedCardId)
    } else {
      this.card = null
    }

    this.addCardToUnit()
  }

  selectEquipment(pos, noParent = false) {
    if (this.selectedEquipmentsIds[pos]) {
      this.selectedEquipments[pos] = this.equipmentService.selectEquipmentForBuilder(this.selectedEquipmentsIds[pos])
    } else {
      for (let i = pos; i <= 2; i++) {
        this.selectedEquipments[i] = null
        if (!noParent) {
          this.selectEquipment(i, true)
        }
      }
    }

    this.addEquipmentToUnit(pos)
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
  }

  changeLevel() {
    this.unitService.changeLevel()
  }

  rightClickNode(node) {
    this.unitService.rightClickNode(node)
  }

  clickNode(node) {
    this.unitService.clickNode(node)
  }

  canActivateNode(node) {
    return this.unitService.canActivateNode(node)
  }

  getAvailableSupportNodes(pos) {
    return this.unitService.getAvailableSupportNodes(pos)
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
    //viewCardDetail
    const modalRef = this.modalService.open(BuilderEsperDetailComponent, { windowClass: 'options-modal' });

    modalRef.componentInstance.esper = this.unit.esper;

    modalRef.result.then((result) => {
      //this.navService.updateMenu(false);
    }, (reason) => {
      //this.navService.updateMenu(false);
    });
  }
}
