import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { MasterRanksService } from '../../services/mr.service';

@Component({
  selector: 'app-modal-mr',
  templateUrl: './modal.mr.component.html',
  styleUrls: ['./modal.mr.component.css']
})
export class ModalMasterRanksComponent implements OnInit {
  ranks = {};

  @Input() public masterRanks;

  constructor(
    private masterRanksService: MasterRanksService,
    private modal: NgbActiveModal
  ) {}

  async ngOnInit() {
    if (!this.masterRanks) {
      this.masterRanks = this.masterRanksService.getMasterRanks();
    }

    this.ranks = await this.masterRanksService.getRanks();
  }

  close() {
    this.modal.dismiss();
  }

  save() {
    this.modal.close(this.masterRanks);
  }
}
