import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services/card.service';
import { UnitService } from '../../services/unit.service';
import { EsperService } from '../../services/esper.service';
import { EquipmentService } from '../../services/equipment.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-modal-save',
  templateUrl: './modal.save.component.html',
  styleUrls: ['./modal.save.component.css']
})
export class ModalSaveComponent implements OnInit {
  saveStep = "save"

  @Input() public item
  @Input() public type

  constructor(
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private modal: NgbActiveModal
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.modal.dismiss()
  }

  save() {
    if (this.isAlreadyExists()) {
      this.saveStep = "confirm"
    } else {
      this.saveStep = "loading"
      this.saveItem("new")
    }
  }

  private isAlreadyExists() {
    let alreadyExists = false

    switch(this.type) {
      case 'unit' :
        alreadyExists = this.unitService.unitAlreadyExists(this.item)
        break
      case 'card' :
        alreadyExists = this.cardService.cardAlreadyExists(this.item)
        break
      case 'esper' :
        alreadyExists = this.esperService.esperAlreadyExists(this.item)
        break
      case 'equipment' :
        alreadyExists = this.equipmentService.equipmentAlreadyExists(this.item)
        break
      case 'team' :
        alreadyExists = this.teamService.teamAlreadyExists(this.item)
        break
      default :
        console.log("Trying to save something not managed : " + this.type)
        break
    }

    return alreadyExists
  }

  private saveItem(method) {
    let savePromise = null

    switch(this.type) {
      case 'unit' :
        savePromise = this.unitService.saveUnit(this.item, method)
        break
      case 'card' :
        savePromise = this.cardService.saveCard(this.item, method)
        break
      case 'esper' :
        savePromise = this.esperService.saveEsper(this.item, method)
        break
      case 'equipment' :
        savePromise = this.equipmentService.saveEquipment(this.item, method)
        break
      case 'team' :
        savePromise = this.teamService.saveTeam(this.item)//, method)
        console.log("Trying to save something not managed : " + this.type)
        break
      default :
        console.log("Trying to save something not managed : " + this.type)
        break
    }

    if (savePromise) {
      savePromise.then(result => {
        this.modal.dismiss()
      })
    } else {
      this.modal.dismiss()
    }
  }

  confirmSave() {
    this.saveStep = "loading"
    this.saveItem("overwrite")
  }

  closeSave() {
    if (this.saveStep == 'confirm') {
      this.saveStep = "save"
    } else {
      this.modal.dismiss()
    }
  }
}
