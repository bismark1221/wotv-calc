import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { MasterRanksService } from '../../../services/mr.service';

@Component({
  selector: 'app-builder-modal-mr',
  templateUrl: './builder.modal.mr.component.html',
  styleUrls: ['./builder.modal.mr.component.css']
})
export class BuilderModalMasterRanksComponent extends SimpleModalComponent<null, any> implements OnInit {
  ranks;
  firstClickOutside = false;

  levelsTable = [];

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

    this.levelsTable = [];
    this.ranks.fire.ranks.forEach((rank, rankIndex) => {
      this.levelsTable.push(rankIndex + 1);
    });
  }

  closeButton() {
    this.result = 'close';
    this.close();
  }

  save() {
    this.result = this.masterRanks;
    this.close();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.result = 'close';
      this.firstClickOutside = true;
    } else {
      this.close();
    }
  }
}
