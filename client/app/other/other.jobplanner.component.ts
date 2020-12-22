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
      const unit = this.unitService.getUnit(this.selectedUnits[pos]);
      unit.jobsData = [];
      unit.jobs.forEach(jobId => {
        const job = this.jobService.getJob(jobId);
        job.name = job.getName(this.translateService);
        job.start = 1;
        job.goal = 1;
        job.maxLevel = 15;
        job.tableLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        unit.jobsData.push(job);
      });

      if (unit.exJobs.length > 0) {
        unit.exJobs.forEach((exJobId, jobIndex) => {
          const exJob = this.jobService.getJob(unit.exJobs[0]);
          unit.jobsData[jobIndex].maxLevel = 25;
          exJob.materials.forEach((materials, matIndex) => {
            unit.jobsData[jobIndex].materials.push(materials);
            unit.jobsData[jobIndex].tableLevel.push(16 + matIndex);
          });
        });
      }

      this.jobbedUnits[pos] = unit;

      console.log(unit);



    } else {
      delete this.jobbedUnits[pos];
      delete this.selectedUnits[pos];
    }
  }

  changeLevel(type, pos) {
    console.log(type);
    console.log(pos);
  }
}
