import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { GridService } from '../services/grid.service';
import { EsperService } from '../services/esper.service';
import { CardService } from '../services/card.service';
import { EquipmentService } from '../services/equipment.service';

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

  equipements
  selectedEquipments = [null, null, null]
  selectedEquipmentsIds = [null, null, null]

  constructor(
    private unitService: UnitService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private guildService: GuildService,
    private esperService: EsperService,
    private cardService: CardService,
    private equipmentService: EquipmentService,
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

      this.addEsperToUnit()
      this.addCardToUnit()
      for (let i = 0; i <= 2; i++) {
        this.addEquipmentToUnit(i)
      }
    } else {
      this.unit = null
    }

    console.log(this.unit)
  }

  selectEsper() {
    if (this.selectedEsperId) {
      this.esper = this.esperService.selectEsperForBuilder(this.selectedEsperId)
      this.esper.resonance = 1
    } else {
      this.esper = null
    }

    this.addEsperToUnit()

    console.log(this.esper)
  }

  selectCard() {
    if (this.selectedCardId) {
      this.card = this.cardService.selectCardForBuilder(this.selectedCardId)
    } else {
      this.card = null
    }

    this.addCardToUnit()

    console.log(this.card)
  }

  selectEquipment(pos) {
    if (this.selectedEquipmentsIds[pos]) {
      this.selectedEquipments[pos] = this.equipmentService.selectEquipmentForBuilder(this.selectedEquipmentsIds[pos])
    } else {
      for (let i = pos; i <= 2; i++) {
        this.selectedEquipments[i] = null
      }
    }

    this.addEquipmentToUnit(pos)

    console.log(this.selectedEquipments[pos])
  }

  changeStar() {
    this.unitService.changeStar()
  }

  changeLB() {
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
}
