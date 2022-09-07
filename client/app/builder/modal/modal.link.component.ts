import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { ClipboardService } from 'ngx-clipboard';

import { CardService } from '../../services/card.service';
import { UnitService } from '../../services/unit.service';
import { EsperService } from '../../services/esper.service';
import { EquipmentService } from '../../services/equipment.service';
import { TeamService } from '../../services/team.service';
import { NavService } from '../../services/nav.service';
import { MateriaService } from '../../services/materia.service';

@Component({
  selector: 'app-modal-link',
  templateUrl: './modal.link.component.html',
  styleUrls: ['./modal.link.component.css']
})
export class ModalLinkComponent extends SimpleModalComponent<null, null> implements OnInit, AfterViewInit {
  exportableLink = '';
  saveStep = 'loading';
  firstClickOutside = false;

  public type;
  public item;

  constructor(
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private materiaService: MateriaService,
    private clipboardService: ClipboardService,
    private navService: NavService
  ) {
    super();
  }

  ngOnInit() {
    if (this.type === 'inventory') {
      this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/inventory') + '/' + this.item;
      this.saveStep = 'link';
    }
  }

  async ngAfterViewInit() {
    switch (this.type) {
      case 'unit' :
        this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/unit') + '/' + await this.unitService.getExportableLink();
        this.saveStep = 'link';
        break;
      case 'card' :
        this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/card') + '/' + await this.cardService.getExportableLink();
        this.saveStep = 'link';
        break;
      case 'esper' :
        this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/esper') + '/' + await this.esperService.getExportableLink();
        this.saveStep = 'link';
        break;
      case 'equipment' :
        this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/equipment') + '/' + await this.equipmentService.getExportableLink();
        this.saveStep = 'link';
        break;
      case 'team' :
        this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/team') + '/' + await this.teamService.getExportableLink();
        this.saveStep = 'link';
        break;
      case 'materia' :
        this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/materia') + '/' + await this.materiaService.getExportableLink(this.item);
        this.saveStep = 'link';
        break;
      case 'inventory' :
        break;
      default :
        console.log('Trying to link something not managed : ' + this.type);
        break;
    }
  }

  copyLink() {
    this.clipboardService.copyFromContent(this.exportableLink);
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.close();
    }
  }
}
