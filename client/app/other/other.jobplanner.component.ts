import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ToolService } from '../services/tool.service';
import { ItemService } from '../services/item.service';

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
  materials = [];
  materialsIds = [];

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  constructor(
    private router: Router,
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService,
    private jobService: JobService,
    private itemService: ItemService
  ) {
  }

  async ngOnInit() {
    this.navService.setTitle('Job Planner');

    await this.getUnits();
  }

  async getUnits() {
    this.units = await this.unitService.getUnitsForListing();
    this.translateUnits();
  }

  private translateUnits() {
    this.units.forEach(unit => {
      unit.name = this.nameService.getName(unit);
    });
  }

  async selectUnit(pos) {
    if (pos + 1 === this.tableUnits.length) {
      this.tableUnits.push(this.tableUnits.length);
    }

    if (this.selectedUnits[pos]) {
      const unit = await this.unitService.getUnit(this.selectedUnits[pos]);
      unit.jobsData = [];

      for (const jobId of unit.jobs) {
        const job = await this.jobService.getJob(jobId);
        job.name = job.getName(this.translateService);
        job.start = 1;
        job.goal = 1;
        job.maxLevel = 15;
        job.startTableLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        job.goalTableLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        unit.jobsData.push(job);
      }

      if (unit.exJobs.length > 0) {
        for (let jobIndex = 0; jobIndex <= unit.exJobs.length - 1; jobIndex++) {
          const exJobId = unit.exJobs[jobIndex];
          const exJob = await this.jobService.getJob(unit.exJobs[0]);
          unit.jobsData[jobIndex].maxLevel = 25;
          exJob.materials.forEach((materials, matIndex) => {
            unit.jobsData[jobIndex].materials.push(materials);
            unit.jobsData[jobIndex].startTableLevel.push(16 + matIndex);
            unit.jobsData[jobIndex].goalTableLevel.push(16 + matIndex);
          });
        }
      }

      this.jobbedUnits[pos] = unit;
    } else {
      delete this.jobbedUnits[pos];
      delete this.selectedUnits[pos];
    }

    await this.calculateMaterials();
  }

  async changeLevel(type, unitPos, jobPos) {
    const job = this.jobbedUnits[unitPos].jobsData[jobPos];

    job.start = parseInt(job.start, 10);
    job.goal = parseInt(job.goal, 10);

    if (type === 'start') {
      if (job.start > job.goal) {
        job.goal = job.start;
      }

      if (job.start > job.goalTableLevel[0]) {
        job.goalTableLevel.splice(0, job.start - job.goalTableLevel[0]);
      } else {
        for (let i = job.goalTableLevel[0] - 1; i >= job.start; i--) {
          job.goalTableLevel.unshift(i);
        }
      }
    }

    await this.calculateMaterials();
  }

  async calculateMaterials() {
    Object.keys(this.materials).forEach(itemId => {
      this.materials[itemId].count = 0;
    });

    for (const unit of this.jobbedUnits) {
      for (const job of unit.jobsData) {
        if (job.goal > job.start) {
          for (let i = job.start; i < job.goal; i ++) {
            for (const itemId of Object.keys(job.materials[i])) {
              if (!this.materials[itemId]) {
                this.materials[itemId] = await this.itemService.getItem(itemId);
                this.materials[itemId].count = job.materials[i][itemId];
                this.materials[itemId].image = itemId.toLowerCase();
                this.materials[itemId].activated = true;

                if (this.materials[itemId].image.substring(0, 8) === 'it_jb_mm' && this.materials[itemId].image.substring(0, 12) !== 'it_jb_mm_all') {
                  switch (this.materials[itemId].image.substring(this.materials[itemId].image.length - 2, this.materials[itemId].image.length)) {
                    case '_2':
                      this.materials[itemId].type = 'imgOrbBlue';
                      break;
                    case '_3':
                      this.materials[itemId].type = 'imgOrbViolet';
                      break;
                    case '_4':
                      this.materials[itemId].type = 'imgOrbYellow';
                      break;
                    case '_5':
                      this.materials[itemId].type = 'imgOrbPink';
                      break;
                    default:
                      this.materials[itemId].type = 'imgOrbGreen';
                      break;
                  }
                  this.materials[itemId].image = job.image;
                } else {
                  this.materials[itemId].type = 'classic';
                }
              } else {
                this.materials[itemId].count += job.materials[i][itemId];
              }
            }
          }
        }
      }
    }

    Object.keys(this.materials).forEach(itemId => {
      if (this.materials[itemId].count === 0) {
        delete this.materials[itemId];
      }
    });

    this.materialsIds = Object.keys(this.materials);
  }

  toogleMaterial(itemId) {
    this.materials[itemId].activated = !this.materials[itemId].activated;
  }

  export() {
    let url = this.navService.getRoute('/other/farm-calculator') + '/';
    const activatedMaterials = [];

    Object.keys(this.materials).forEach(itemId => {
      if (this.materials[itemId].activated) {
        activatedMaterials.push(itemId);
      }
    });

    url += activatedMaterials.join(',');

    this.router.navigate([url]);
  }
}
