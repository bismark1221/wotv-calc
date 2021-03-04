import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Job } from '../entities/job';

import { NavService } from './nav.service';
import { DataService } from './data.service';
import { ToolService } from './tool.service';

@Injectable()
export class JobService {
  private jobs: Job[];

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
    const jobs = [];
    const rawJobs = JSON.parse(JSON.stringify(await this.getRaw(forcedVersion)));

    Object.keys(rawJobs).forEach(jobId => {
      const job = new Job();
      job.constructFromJson(rawJobs[jobId]);
      jobs.push(job);
    });

    this.jobs = jobs;
    return jobs;
  }

  async getUniqJobs() {
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

    this.jobs = this.toolService.sortByName(jobs);
    return jobs;
  }

  async getJob(id, forcedVersion = null) {
    await this.getJobs(forcedVersion);

    return this.jobs.find(job => job.dataId === id);
  }

  getGLExclusiveJobIds() {
    return this.glExcluJobs;
  }
}
