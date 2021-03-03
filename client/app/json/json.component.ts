import { Component, OnInit } from '@angular/core';

import { JsonService } from '../services/json.service';
import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  GLunits = {};
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

  JPunits = {};
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

  JPRomaji = {};

  constructor(
    private jsonService: JsonService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      // @ts-ignore
      this.JPRomaji = response.translate.jpRomaji;


      // @ts-ignore
      this.GLunits = response.gl.units;

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
      this.JPunits = response.jp.units;

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
    });
  }

  async generateIndex() {
    for (const version of ['GL', 'JP']) {
      this[version + 'Index'] = {
        units: []
      };
      const units = this.unitService.getUnits(version);

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
      }
    }
  }
}
