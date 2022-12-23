import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { MasterRanksService } from '../../services/mr.service';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-builder-mr',
  templateUrl: './builder.mr.component.html',
  styleUrls: ['./builder.mr.component.css']
})
export class BuilderMasterRanksComponent implements OnInit, AfterViewInit {
  masterRanks;
  ranks;
  formattedRanks;
  showSave = false;
  version = 'GL';

  levelsTable = [];

  constructor(
    private masterRanksService: MasterRanksService,
    private authService: AuthService,
    private navService: NavService
  ) {
  }

  async ngOnInit() {
    this.masterRanks = this.masterRanksService.getMasterRanks();
    this.ranks = await this.masterRanksService.getMRs();

    this.levelsTable = [];
    this.ranks.fire.ranks.forEach((rank, rankIndex) => {
      this.levelsTable.push(rankIndex + 1);
    });

    this.version = this.navService.getVersion();

    this.navService.setSEO('Master Ranks Builder', 'Build your master ranks to see the result before using all your resources in-game. Save them to use them in the unit and team builders.');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.masterRanks = this.masterRanksService.getMasterRanks();
      });
    });

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      });
    });
  }

  async saveMasterRanks() {
    await this.masterRanksService.saveMasterRanks(this.masterRanks);
  }
}
