import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Job } from '../entities/job';
import { default as GL_JOBS } from '../data/gl/jobs.json';
import { default as JP_JOBS } from '../data/jp/jobs.json';
import { NavService } from './nav.service';
import { ToolService } from './tool.service';

@Injectable()
export class JobService {
  private jobs: Job[];

  private glExcluJobs = [
    'JB_LW_DEAN',
  ];

  constructor(
    private navService: NavService,
    private translateService: TranslateService,
    private toolService: ToolService
  ) {}

  private getRaw() {
    if (this.navService.getVersion() === 'GL') {
      return GL_JOBS;
    } else {
      return JP_JOBS;
    }
  }

  getJobs() {
    const jobs = [];
    const rawJobs = JSON.parse(JSON.stringify(this.getRaw()));

    Object.keys(rawJobs).forEach(jobId => {
      const job = new Job();
      job.constructFromJson(rawJobs[jobId]);
      jobs.push(job);
    });

    this.jobs = jobs;
    return jobs;
  }

  getUniqJobs(): Job[] {
    const jobs: Job[] = [];
    const rawJobs = JSON.parse(JSON.stringify(this.getRaw()));
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

  getJob(id: string): Job {
    this.getJobs();

    return this.jobs.find(job => job.dataId === id);
  }

  getGLExclusiveJobIds() {
    return this.glExcluJobs;
  }
}
