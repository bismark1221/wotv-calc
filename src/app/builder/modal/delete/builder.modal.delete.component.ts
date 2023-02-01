import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { TranslateService } from '../../../services/translate.service';
import { CardService } from '../../../services/card.service';
import { UnitService } from '../../../services/unit.service';
import { EsperService } from '../../../services/esper.service';
import { EquipmentService } from '../../../services/equipment.service';
import { TeamService } from '../../../services/team.service';
import { MateriaService } from '../../../services/materia.service';

@Component({
  selector: 'app-builder-modal-delete',
  templateUrl: './builder.modal.delete.component.html',
  styleUrls: ['./builder.modal.delete.component.css']
})
export class BuilderModalDeleteComponent extends SimpleModalComponent<null, boolean> implements OnInit {
  deleteStep = 'confirm';
  firstClickOutside = false;

  public item;
  public type;

  constructor(
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private materiaService: MateriaService
  ) {
    super();
  }

  ngOnInit() {}

  private async deleteItem() {
    switch (this.type) {
      case 'unit' :
        await this.unitService.deleteUnit(this.item);
        break;
      case 'card' :
        await this.cardService.deleteCard(this.item);
        break;
      case 'esper' :
        await this.esperService.deleteEsper(this.item);
        break;
      case 'equipment' :
        await this.equipmentService.deleteEquipment(this.item);
        break;
      case 'materia' :
        await this.materiaService.deleteMateria(this.item);
        break;
      case 'team' :
        await this.teamService.deleteTeam(this.item);
        break;
      default :
        console.log('Trying to delete something not managed : ' + this.type);
        break;
    }

    this.result = true;
    this.close();
  }

  confirmDelete() {
    this.deleteStep = 'loading';
    this.deleteItem();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.close();
    }
  }
}
