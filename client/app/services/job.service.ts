import { Injectable } from '@angular/core';

import { Job } from '../entities/job';
import { default as GL_JOBS } from '../data/gl/jobs.json';
import { default as JP_JOBS } from '../data/jp/jobs.json';
import { NavService } from './nav.service'

@Injectable()
export class JobService {
  private jobs: Job[];

  constructor(
    private navService: NavService
  ) {}

  private getRaw() {
    if (this.navService.getVersion() == "GL") {
      return GL_JOBS
    } else {
      return JP_JOBS
    }
  }

  getJobs(): Job[] {
    let jobs: Job[] = [];
    let rawJobs = JSON.parse(JSON.stringify(this.getRaw()))

    Object.keys(rawJobs).forEach(jobId => {
      let job = new Job();
      job.constructFromJson(rawJobs[jobId]);
      jobs.push(job);
    });

    this.jobs = jobs;
    return jobs;
  }

  getJob(id: string): Job {
    this.getJobs();

    return this.jobs.find(job => job.dataId === id);
  }
}
