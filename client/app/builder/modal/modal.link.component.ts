import { Component, AfterViewInit, Input } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

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
export class ModalLinkComponent implements AfterViewInit {
  exportableLink = '';
  saveStep = 'loading';

  @Input() public type;
  @Input() public item;

  constructor(
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private materiaService: MateriaService,
    private clipboardService: ClipboardService,
    private navService: NavService,
    private modal: NgbActiveModal
  ) {
  }

  ngAfterViewInit() {
    switch (this.type) {
      case 'unit' :
        this.unitService.getExportableLink().then(link => {
          this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/unit') + '/' + link;
          this.saveStep = 'link';
        });
        break;
      case 'card' :
        this.cardService.getExportableLink().then(link => {
          this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/card') + '/' + link;
          this.saveStep = 'link';
        });
        break;
      case 'esper' :
        this.esperService.getExportableLink().then(link => {
          this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/esper') + '/' + link;
          this.saveStep = 'link';
        });
        break;
      case 'equipment' :
        this.equipmentService.getExportableLink().then(link => {
          this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/equipment') + '/' + link;
          this.saveStep = 'link';
        });
        break;
      case 'team' :
        this.teamService.getExportableLink().then(link => {
          this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/team') + '/' + link;
          this.saveStep = 'link';
        });
        break;
      case 'materia' :
        this.materiaService.getExportableLink(this.item).then(link => {
          this.exportableLink = 'https://wotv-calc.com' + this.navService.getRoute('/builder/materia') + '/' + link;
          this.saveStep = 'link';
        });
        break;
      default :
        console.log('Trying to link something not managed : ' + this.type);
        break;
    }
  }

  close() {
    this.modal.dismiss();
  }

  copyLink() {
    this.clipboardService.copyFromContent(this.exportableLink);
  }
}
