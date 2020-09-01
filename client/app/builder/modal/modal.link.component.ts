import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services/card.service';
import { UnitService } from '../../services/unit.service';
import { EsperService } from '../../services/esper.service';
import { EquipmentService } from '../../services/equipment.service';
import { TeamService } from '../../services/team.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-modal-link',
  templateUrl: './modal.link.component.html',
  styleUrls: ['./modal.link.component.css']
})
export class ModalLinkComponent implements OnInit {
  item
  exportableLink = ""
  saveStep = "loading"

  @Input() public type

  constructor(
    private cardService: CardService,
    private unitService: UnitService,
    private esperService: EsperService,
    private equipmentService: EquipmentService,
    private teamService: TeamService,
    private clipboardService: ClipboardService,
    private modal: NgbActiveModal
  ) {
  }

  ngOnInit() {
    switch(this.type) {
      case 'unit' :
        this.unitService.getExportableLink().subscribe((data: any) => {
          this.exportableLink = data.shorturl;
          this.saveStep = "link"
        })
        break
      case 'card' :
        /*this.cardService.getExportableLink().subscribe((data: any) => {
          this.exportableLink = data.shorturl;
          this.saveStep = "link"
        })*/
        break
      case 'esper' :
        /*this.esperService.getExportableLink().subscribe((data: any) => {
          this.exportableLink = data.shorturl;
          this.saveStep = "link"
        })*/
        break
      case 'equipment' :
        /*this.equipmentService.getExportableLink().subscribe((data: any) => {
          this.exportableLink = data.shorturl;
          this.saveStep = "link"
        })*/
        break
      case 'team' :
        this.teamService.getExportableLink().then(link => {
          this.exportableLink = link
          this.saveStep = "link"
        })
        break
      default :
        console.log("Trying to link something not managed : " + this.type)
        break
    }
  }

  close() {
    this.modal.dismiss()
  }

  copyLink() {
    this.clipboardService.copyFromContent(this.exportableLink)
  }
}
