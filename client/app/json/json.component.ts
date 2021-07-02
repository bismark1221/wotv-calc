import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  GLIndex = {};
  JPIndex = {};

  JPRomaji = {};

  loadingIndexGL = 0;
  loadingIndexJP = 0;

  loadingData = false;

  constructor(
    private unitService: UnitService,
    private clipboardService: ClipboardService,
  ) {}

  ngOnInit(): void {}

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
        'dataId': buildedUnit.dataId
      });

      this['loadingIndex' + version]--;
    }
  }

  copyData(type) {
    this.clipboardService.copyFromContent(JSON.stringify(this[type], null, 2).replace('/ /g', '&nbsp;'));
  }
}
