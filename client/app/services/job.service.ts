import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Job } from '../entities/job';

import { NavService } from './nav.service';
import { DataService } from './data.service';
import { ToolService } from './tool.service';

@Injectable()
export class JobService {
  private JP_jobs: Job[];
  private GL_jobs: Job[];

  private JP_uniqJobs;
  private GL_uniqJobs;

  private glExcluJobs = [
  ];

  constructor(
    private dataService: DataService,
    private navService: NavService,
    private translateService: TranslateService,
    private toolService: ToolService
  ) {}

  private getRaw(forcedVersion = null) {
    return this.dataService.loadData('jobs', forcedVersion);
  }

  async getJobs(forcedVersion = null) {
    if (this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_jobs'] === null
      || this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_jobs'] === undefined
    ) {
      const jobs = [];
      const rawJobs = JSON.parse(JSON.stringify(await this.getRaw(forcedVersion)));

      Object.keys(rawJobs).forEach(jobId => {
        const job = new Job();
        job.constructFromJson(rawJobs[jobId]);
        jobs.push(job);
      });

      this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_jobs'] = jobs;
    }

    return this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_jobs'];
  }

  async getUniqJobs() {
    if (this[this.navService.getVersion() + '_uniqJobs'] === null || this[this.navService.getVersion() + '_uniqJobs'] === undefined) {
      const jobs: Job[] = [];
      const rawJobs = JSON.parse(JSON.stringify(await this.getRaw()));
      const uniqJobs = [];

      Object.keys(rawJobs).forEach(jobId => {
        const job = new Job();
        job.constructFromJson(rawJobs[jobId]);

        const tableJob = job.dataId.split('_');
        const genericDataId = tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2];
        job.dataId = genericDataId;

        if (uniqJobs.indexOf(genericDataId) === -1) {
          jobs.push(job);
          uniqJobs.push(genericDataId);
        }
      });

      this[this.navService.getVersion() + '_uniqJobs'] = this.toolService.sortByName(jobs);
    }

    return this[this.navService.getVersion() + '_uniqJobs'];
  }

  async getJob(id, forcedVersion = null) {
    await this.getJobs(forcedVersion);

    return this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_jobs'].find(job => job.dataId === id);
  }

  getGLExclusiveJobIds() {
    return this.glExcluJobs;
  }
}
