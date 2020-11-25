import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services/card.service';
import { UnitService } from '../../services/unit.service';
import { EsperService } from '../../services/esper.service';
import { EquipmentService } from '../../services/equipment.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-modal-load',
  templateUrl: './modal.load.component.html',
  styleUrls: ['./modal.load.component.css']
})
export class ModalLoadComponent implements OnInit {
  @Input() public savedItems;
  @Input() public type;
  @Input() public allowNew = false;

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
    if (this.type == 'team') {
      const formattedItems = [];
      Object.keys(this.savedItems).forEach(itemName => {
        formattedItems.push(this.savedItems[itemName]);
      });

      this.savedItems = formattedItems;
    }
  }

  close() {
    this.modal.dismiss();
  }

  load(item) {
    if (item) {
      this.modal.close({type: 'load', item: item});
    } else {
      this.modal.close({type: 'new'});
    }
  }

  delete(item) {
    let dataId = null;

    switch (this.type) {
      case 'unit' :
        dataId = item.dataId;
        this.unitService.deleteUnit(item);
        this.savedItems = this.unitService.getSavedUnits()[dataId];
        break;
      case 'card' :
        dataId = item.dataId;
        this.cardService.deleteCard(item);
        this.savedItems = this.cardService.getSavedCards()[dataId];
        break;
      case 'esper' :
        dataId = item.dataId;
        this.esperService.deleteEsper(item);
        this.savedItems = this.esperService.getSavedEspers()[dataId];
        break;
      case 'equipment' :
        dataId = item.dataId;
        this.equipmentService.deleteEquipment(item);
        this.savedItems = this.equipmentService.getSavedEquipments()[dataId];
        break;
      case 'team' :
        this.teamService.deleteTeam(item);
        const savedTeams = this.teamService.getSavedTeams();
        this.savedItems = [];
        Object.keys(savedTeams).forEach(teamName => {
          this.savedItems.push(savedTeams[teamName]);
        });
        break;
      default :
        console.log('Trying to delete something not managed : ' + this.type);
        break;
    }

    if (this.savedItems.length == 0) {
      this.modal.close({type: 'fullDelete'});
    }
  }
}
