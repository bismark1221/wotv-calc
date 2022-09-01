import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { ToolService } from '../../services/tool.service';
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
export class ModalLoadComponent extends SimpleModalComponent<null, any> implements OnInit {
  public savedItems;
  public type;
  public allowNew = false;

  constructor(
    private toolService: ToolService,
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private translateService: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    if (this.type === 'team') {
      const formattedItems = [];
      Object.keys(this.savedItems).forEach(itemName => {
        formattedItems.push(this.savedItems[itemName]);
      });

      this.savedItems = this.toolService.sortByName(formattedItems);
    }
  }

  load(item) {
    if (item) {
      this.result = {type: 'load', item: item};
    } else {
      this.result = {type: 'new'};
    }

    this.close();
  }

  async delete(item) {
    let dataId = null;

    switch (this.type) {
      case 'unit' :
        dataId = item.dataId;
        await this.unitService.deleteUnit(item);
        this.savedItems = this.unitService.getSavedUnits()[dataId];
        break;
      case 'card' :
        dataId = item.dataId;
        await this.cardService.deleteCard(item);
        this.savedItems = this.cardService.getSavedCards()[dataId];
        break;
      case 'esper' :
        dataId = item.dataId;
        await this.esperService.deleteEsper(item);
        this.savedItems = this.esperService.getSavedEspers()[dataId];
        break;
      case 'equipment' :
        dataId = item.dataId;
        await this.equipmentService.deleteEquipment(item);
        this.savedItems = this.equipmentService.getSavedEquipments()[dataId];
        break;
      case 'team' :
        await this.teamService.deleteTeam(item);
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

    if (this.savedItems.length === 0) {
      this.result = {type: 'fullDelete'};
      this.close();
    }
  }
}
