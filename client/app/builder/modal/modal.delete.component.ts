import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services/card.service';
import { UnitService } from '../../services/unit.service';
import { EsperService } from '../../services/esper.service';
import { EquipmentService } from '../../services/equipment.service';
import { TeamService } from '../../services/team.service';
import { MateriaService } from '../../services/materia.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal.delete.component.html',
  styleUrls: ['./modal.delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  deleteStep = 'confirm';

  @Input() public item;
  @Input() public type;

  constructor(
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private materiaService: MateriaService,
    private modal: NgbActiveModal
  ) {
  }

  ngOnInit() {}

  close() {
    this.modal.dismiss();
  }

  private async deleteItem() {
    switch (this.type) {
      case 'unit' :
        this.unitService.deleteUnit(this.item);
        break;
      case 'card' :
        await this.cardService.deleteCard(this.item);
        break;
      case 'esper' :
        this.esperService.deleteEsper(this.item);
        break;
      case 'equipment' :
        this.equipmentService.deleteEquipment(this.item);
        break;
      case 'materia' :
        this.materiaService.deleteMateria(this.item);
        break;
      case 'team' :
        this.teamService.deleteTeam(this.item);
        break;
      default :
        console.log('Trying to delete something not managed : ' + this.type);
        break;
    }

    this.modal.close();
  }

  confirmDelete() {
    this.deleteStep = 'loading';
    this.deleteItem();
  }

  closeDelete() {
    this.modal.dismiss();
  }
}
