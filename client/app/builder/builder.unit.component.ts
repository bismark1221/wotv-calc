import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { UnitService } from '../services/unit.service';
import { JobService } from '../services/job.service';
import { GuildService } from '../services/guild.service';
import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-builder-unit',
  templateUrl: './builder.unit.component.html',
  styleUrls: ['./builder.unit.component.css']
})
export class BuilderUnitComponent implements OnInit {
  units
  unit
  selectedId
  guild

  constructor(
    private unitService: UnitService,
    private localStorageService: LocalStorageService,
    private translateService: TranslateService,
    private guildService: GuildService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getUnits();
    });
  }

  ngOnInit(): void {
    this.getUnits();
    this.getGuild();
  }

  private getGuild() {
    this.guild = this.guildService.getGuild()
  }

  private getUnits() {
    this.units = this.unitService.getUnitsForBuilder(this.translateService);
    this.units = [...this.units];
  }

  selectUnit() {
    if (this.selectedId) {
      this.unit = this.unitService.selectUnitForBuilder(this.selectedId)
    } else {
      this.unit = null
    }

    console.log(this.unit)
  }

  changeStar() {
    this.unitService.changeStar()
  }

  changeLB() {
    this.unitService.changeLB()
  }

  changeLevel() {
    this.unitService.changeLevel()
  }

  rightClickNode(node) {
    this.unitService.rightClickNode(node)
  }

  clickNode(node) {
    this.unitService.clickNode(node)
  }

  canActivateNode(node) {
    return this.unitService.canActivateNode(node)
  }

  getAvailableSupportNodes(pos) {
    return this.unitService.getAvailableSupportNodes(pos)
  }

  save() {
    this.unitService.saveUnit(this.unit)
  }
}
