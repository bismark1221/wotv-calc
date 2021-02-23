import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { UnitService } from '../services/unit.service';
import { NavService } from '../services/nav.service';
import { NameService } from '../services/name.service';
import { JobService } from '../services/job.service';
import { ToolService } from '../services/tool.service';
import { ItemService } from '../services/item.service';

@Component({
  selector: 'app-other-farmcalculator',
  templateUrl: './other.farmcalculator.component.html',
  styleUrls: ['./other.farmcalculator.component.css']
})
export class OtherFarmCalculatorComponent implements OnInit {
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
    private unitService: UnitService,
    private translateService: TranslateService,
    private navService: NavService,
    private nameService: NameService,
    private toolService: ToolService,
    private jobService: JobService,
    private itemService: ItemService
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
        job.startTableLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        job.goalTableLevel = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        unit.jobsData.push(job);
      });

      if (unit.exJobs.length > 0) {
        unit.exJobs.forEach((exJobId, jobIndex) => {
          const exJob = this.jobService.getJob(unit.exJobs[0]);
          unit.jobsData[jobIndex].maxLevel = 25;
          exJob.materials.forEach((materials, matIndex) => {
            unit.jobsData[jobIndex].materials.push(materials);
            unit.jobsData[jobIndex].startTableLevel.push(16 + matIndex);
            unit.jobsData[jobIndex].goalTableLevel.push(16 + matIndex);
          });
        });
      }

      this.jobbedUnits[pos] = unit;
    } else {
      delete this.jobbedUnits[pos];
      delete this.selectedUnits[pos];
    }

    this.calculateMaterials();
  }

  changeLevel(type, unitPos, jobPos) {
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

    this.calculateMaterials();
  }

  calculateMaterials() {
    Object.keys(this.materials).forEach(itemId => {
      this.materials[itemId].count = 0;
    });

    this.jobbedUnits.forEach(unit => {
      unit.jobsData.forEach(job => {
        if (job.goal > job.start) {
          for (let i = job.start; i < job.goal; i ++) {
            Object.keys(job.materials[i]).forEach(itemId => {
              if (!this.materials[itemId]) {
                this.materials[itemId] = this.itemService.getItem(itemId);
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
            });
          }
        }
      });
    });

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
    let url = 'https://wotvfarmcalculator.github.io/index.html?i=';
    const activatedMaterials = [];

    Object.keys(this.materials).forEach(itemId => {
      if (this.materials[itemId].activated) {
        activatedMaterials.push(itemId);
      }
    });

    url += activatedMaterials.join(',');

    window.open(url, '_blank');
  }
}
