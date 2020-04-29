import { Injectable } from '@angular/core';

import { Job } from '../entities/job';
import { default as JOBS } from '../data/jobs.json';

@Injectable()
export class JobService {
  private jobs: Job[];

  constructor() {}

  getJobs(): Job[] {
    let jobs: Job[] = [];

    Object.keys(JSON.parse(JSON.stringify(JOBS))).forEach(jobId => {
      let job = new Job();
      job.constructFromJson(JOBS[jobId]);
      jobs.push(job);
    });

    this.jobs = jobs;
    return jobs;
  }

  getJob(id: string): Job {
    if (!this.jobs || this.jobs.length === 0) {
      this.getJobs();
    }

    return this.jobs.find(job => job.dataId === id);
  }
}
