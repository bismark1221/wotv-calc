import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { JsonService } from '../services/json.service';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  GLunits = {};
  GLOtherUnits = {};
  GLvisionCards = {};
  GLespers = {};
  GLequipments = {};
  GLjobs = {};
  GLRaids = {};
  GLItems = {};
  GLMasterRanks = {};
  GLPlayerTitles = {};
  GLGuildTitles = {};
  GLIndex = {};
  GLDropRates = {};
  GLSkills = {};

  JPunits = {};
  JPOtherUnits = {};
  JPvisionCards = {};
  JPespers = {};
  JPequipments = {};
  JPjobs = {};
  JPRaids = {};
  JPItems = {};
  JPMasterRanks = {};
  JPPlayerTitles = {};
  JPGuildTitles = {};
  JPIndex = {};
  JPDropRates = {};
  JPSkills = {};

  JPRomaji = {};

  loadingIndexGL = 0;
  loadingIndexJP = 0;

  loadingData = false;

  constructor(
    private jsonService: JsonService,
    private unitService: UnitService,
    private clipboardService: ClipboardService,
  ) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      // @ts-ignore
      this.JPRomaji = response.translate.jpRomaji;


      // @ts-ignore
      this.GLunits = response.gl.units;

      // @ts-ignore
      this.GLOtherUnits = response.gl.otherUnits;

      // @ts-ignore
      this.GLvisionCards = response.gl.visionCards;

      // @ts-ignore
      this.GLespers = response.gl.espers;

      // @ts-ignore
      this.GLequipments = response.gl.equipments;

      // @ts-ignore
      this.GLjobs = response.gl.jobs;

      // @ts-ignore
      this.GLRaids = response.gl.raids;

      // @ts-ignore
      this.GLItems = response.gl.items;

      // @ts-ignore
      this.GLMasterRanks = response.gl.masterRanks;

      // @ts-ignore
      this.GLPlayerTitles = response.gl.playerTitles;

      // @ts-ignore
      this.GLGuildTitles = response.gl.guildTitles;

      // @ts-ignore
      this.GLDropRates = response.gl.dropRates;

      // @ts-ignore
      this.GLSkills = response.gl.skills;


      // @ts-ignore
      this.JPunits = response.jp.units;

      // @ts-ignore
      this.JPOtherUnits = response.jp.otherUnits;

      // @ts-ignore
      this.JPvisionCards = response.jp.visionCards;

      // @ts-ignore
      this.JPespers = response.jp.espers;

      // @ts-ignore
      this.JPequipments = response.jp.equipments;

      // @ts-ignore
      this.JPjobs = response.jp.jobs;

      // @ts-ignore
      this.JPRaids = response.jp.raids;

      // @ts-ignore
      this.JPItems = response.jp.items;

      // @ts-ignore
      this.JPMasterRanks = response.jp.masterRanks;

      // @ts-ignore
      this.JPPlayerTitles = response.jp.playerTitles;

      // @ts-ignore
      this.JPGuildTitles = response.jp.guildTitles;

      // @ts-ignore
      this.JPDropRates = response.jp.dropRates;

      // @ts-ignore
      this.JPSkills = response.jp.skills;

      this.loadingData = true;
    });
  }

  async generateIndex(version) {
    this[version + 'Index'] = {
      units: []
    };
    const units = await this.unitService.getUnits(version);

    this['loadingIndex' + version] = units.length;

    for (const unit of units) {
      const buildedUnit = await this.unitService.selectUnitForBuilder(unit.dataId, null, true, version);

      const stats = {};
      Object.keys(buildedUnit.stats).forEach(statType => {
        stats[statType] = buildedUnit.stats[statType].total;
      });

      this[version + 'Index'].units.push({
        'names': buildedUnit.names,
        'stats': stats,
        'image': buildedUnit.image,
      });

      this['loadingIndex' + version]--;
    }
  }

  copyData(type) {
    this.clipboardService.copyFromContent(JSON.stringify(this[type], null, 2).replace('/ /g', '&nbsp;'));
  }
}
