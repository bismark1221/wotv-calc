import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ToolService } from '../services/tool.service';

@Component({
  selector: 'app-other-jobplanner',
  templateUrl: './other.jobplanner.component.html',
  styleUrls: ['./other.jobplanner.component.css']
})
export class OtherJobPlannerComponent implements OnInit {
  units = [];
  selectedUnits = [];
  jobbedUnits = [];
  tableUnits = [0];

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  constructor(
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService,
    private jobService: JobService
  ) {
  }

  ngOnInit() {
    this.navService.setTitle('Job Planner');

    this.getUnits();
  }

  getUnits() {
    this.units = this.unitService.getUnitsForListing();
    this.translateUnits();
  }

  private translateUnits() {
    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit);
    });
  }

  selectUnit(pos) {
    if (pos + 1 === this.tableUnits.length) {
      this.tableUnits.push(this.tableUnits.length);
    }

    if (this.selectedUnits[pos]) {
      this.jobbedUnits[pos] = this.unitService.getUnit(this.selectedUnits[pos]);
      this.jobbedUnits[pos].jobsData = [];
      this.jobbedUnits[pos].jobs.forEach(jobId => {
        const job = this.jobService.getJob(jobId);
        job.name = job.getName(this.translateService);
        job.level = 1;
        this.jobbedUnits[pos].jobsData.push(job);
      });

      console.log(this.jobbedUnits[pos]);



    } else {
      delete this.jobbedUnits[pos];
      delete this.selectedUnits[pos];
    }
  }
}
