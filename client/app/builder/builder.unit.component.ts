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
import { NameService } from '../services/name.service'

import { BuilderEsperComponent } from './builder.esper.component';
import { BuilderCardComponent } from './builder.card.component';
import { BuilderEquipmentComponent } from './builder.equipment.component';
import { BuilderGuildComponent } from './builder.guild.component';

import { ModalEquipmentsComponent } from './modal/modal.equipments.component';
import { ModalEspersComponent } from './modal/modal.espers.component';
import { ModalCardsComponent } from './modal/modal.cards.component';

@Component({
  selector: 'app-builder-unit',
  templateUrl: './builder.unit.component.html',
  styleUrls: ['./builder.unit.component.css']
})
export class BuilderUnitComponent implements OnInit {
  units
  filteredUnits
  unit = null
  selectedUnitId = null

  statueNames

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
  searchText = ""

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
    private clipboardService: ClipboardService,
    private nameService: NameService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getUnits();
    });
  }

  ngOnInit(): void {
    this.getUnits();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let data = params.get('data')
      if (data) {
        data = JSON.parse(atob(params.get('data')))

        this.selectUnit(data.dataId, data)
      }
    });
  }

  private getUnits() {
    this.units = this.formatUnits(this.unitService.getUnitsForListing())
    this.updateFilteredUnits()
    this.translateUnits();
  }

  private translateUnits() {
    Object.keys(this.units).forEach(rarity => {
      this.units[rarity].forEach(unit => {
        unit.name = this.nameService.getName(unit)
      })
    });
  }

  private formatUnits(units) {
    let formattedUnits = { UR: [], MR: [], SR: [], R: [], N: [] }

    units.forEach(unit => {
      formattedUnits[unit.rarity].push(unit)
    })

    return formattedUnits
  }

  updateFilteredUnits() {
    let text = this.searchText.toLowerCase();
    this.filteredUnits = { UR: [], MR: [], SR: [], R: [], N: [] }

    Object.keys(this.units).forEach(rarity => {
      this.filteredUnits[rarity] = this.units[rarity].filter(unit => {
        return unit.name.toLowerCase().includes(text);
      })
    })


  }

  private loadGuild() {
    this.unit.guild = this.guildService.getGuildForBuilder()

     if (this.unit.savedGuild) {
      this.unit.guild.data = this.unit.savedGuild
    }

    this.statueNames = Object.keys(this.unit.guild.data)
    this.unitService.changeLevel()
  }

  selectUnit(dataId, customData = null) {
    if (dataId) {
      this.unit = this.unitService.selectUnitForBuilder(dataId, customData)

      this.loadGuild()
      this.unitService.getActiveSkills()
    } else {
      this.unit = null
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
      if (this.unit.equipments[2]) {
        this.unit.equipments[2] = null;
      }

      if (this.unit.equipments[1] && this.unit.equipments[1].acquisition && this.unit.equipments[1].acquisition.type === "tmr") {
        this.unit.equipments[1] = null;
      }

      if (this.unit.equipments[0] && this.unit.equipments[0].acquisition && this.unit.equipments[0].acquisition.type === "tmr") {
        this.unit.equipments[0] = null;
      }
    }

    if (this.unit.lb < 2 && this.unit.equipments[1]) {
      this.unit.equipments[1] = null;
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
    this.unitService.getActiveSkills()
  }

  maxLevelAndJobs() {
    this.unitService.maxLevelAndJobs()
    this.unitService.getActiveSkills()
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

    if (this.unit.equipments[pos]) {
      modalRef.componentInstance.equipment = JSON.parse(JSON.stringify(this.unit.equipments[pos]))
      modalRef.componentInstance.modalStep = "custom"
    }

    modalRef.result.then((equipment) => {
      if (equipment) {
        this.unit.equipments[pos] = equipment

        this.unitService.changeLevel()
      }
    }, (reason) => {
    });
  }

  openEspersModal() {
    const modalRef = this.modalService.open(ModalEspersComponent, { windowClass: 'builder-modal' });

    if (this.unit.esper) {
      modalRef.componentInstance.esper = JSON.parse(JSON.stringify(this.unit.esper))
      modalRef.componentInstance.modalStep = "custom"
    }

    modalRef.result.then((esper) => {
      if (esper) {
        this.unit.esper = esper

        this.unitService.changeLevel()
      }
    }, (reason) => {
    });
  }

  openCardsModal() {
    const modalRef = this.modalService.open(ModalCardsComponent, { windowClass: 'builder-modal' });

    if (this.unit.card) {
      modalRef.componentInstance.card = JSON.parse(JSON.stringify(this.unit.card))
      modalRef.componentInstance.modalStep = "custom"
    }

    modalRef.result.then((card) => {
      if (card) {
        this.unit.card = card

        this.unitService.changeLevel()
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
