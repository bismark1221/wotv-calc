import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

import { UnitService } from '../services/unit.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  indexes = [];

  loadingIndex = 0;

  constructor(
    private unitService: UnitService,
    private clipboardService: ClipboardService,
  ) {}

  ngOnInit(): void {}

  async generateIndex() {
    const units = await this.unitService.getUnitsForBuilder();

    this.loadingIndex = units.length;
    this.indexes = [];

    for (const unit of units) {
      const buildedUnit = await this.unitService.selectUnitForBuilder(unit.dataId, null, true);

      const stats = {};
      Object.keys(buildedUnit.stats).forEach(statType => {
        stats[statType] = buildedUnit.stats[statType].total;
      });

      this.indexes.push({
        'names': buildedUnit.names,
        'stats': stats,
        'image': buildedUnit.image,
        'dataId': buildedUnit.dataId
      });

      this.loadingIndex--;
    }
  }

  copyData() {
    this.clipboardService.copyFromContent(JSON.stringify({'units': this.indexes}, null, 2).replace('/ /g', '&nbsp;'));
  }
}
