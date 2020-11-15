import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MasterRanksService } from '../services/mr.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-builder-mr',
  templateUrl: './builder.mr.component.html',
  styleUrls: ['./builder.mr.component.css']
})
export class BuilderMasterRanksComponent implements OnInit {
  masterRanks
  ranks
  showSave = false

  constructor(
    private masterRanksService: MasterRanksService,
    private authService: AuthService,
    private navService: NavService
  ) {
  }

  ngOnInit() {
    this.masterRanks = this.masterRanksService.getMasterRanks()
    this.ranks = this.masterRanksService.getRanks()

    this.navService.setTitle("Master Ranks Builder");
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.masterRanks = this.masterRanksService.getMasterRanks()
      });
    })

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user && this.navService.getVersion() == 'JP') {
          this.showSave = true
        } else {
          this.showSave = false
        }
      });
    })
  }

  saveMasterRanks() {
    this.masterRanksService.saveMasterRanks(this.masterRanks)
  }
}
