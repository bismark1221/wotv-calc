import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { MasterRanksService } from '../../services/mr.service';

@Component({
  selector: 'app-modal-mr',
  templateUrl: './modal.mr.component.html',
  styleUrls: ['./modal.mr.component.css']
})
export class ModalMasterRanksComponent extends SimpleModalComponent<null, any> implements OnInit {
  ranks = {};

  @Input() public masterRanks;

  constructor(
    private masterRanksService: MasterRanksService
  ) {
    super();
  }

  async ngOnInit() {
    if (!this.masterRanks) {
      this.masterRanks = this.masterRanksService.getMasterRanks();
    }

    this.ranks = await this.masterRanksService.getMRs();
  }

  closeButton() {
    this.result = 'close';
    this.close();
  }

  save() {
    this.result = this.masterRanks;
    this.close();
  }
}
