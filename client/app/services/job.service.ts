import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Job } from '../entities/job';

import { NavService } from './nav.service';
import { DataService } from './data.service';
import { ApiService } from './api.service';
import { ToolService } from './tool.service';

@Injectable()
export class JobService {
  private JP_jobs: Job[];
  private GL_jobs: Job[];

  private JP_uniqJobs;
  private GL_uniqJobs;

  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private navService: NavService,
    private translateService: TranslateService,
    private toolService: ToolService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.loadData('jobs', param, extraQuery)));
  }

  private getRaw(forcedVersion = null) {
    return this.dataService.loadData('jobs', forcedVersion);
  }

  async getJobsForJobPlanner(jobsIds) {
    const result = await this.getApi(null, [{name: 'forJobPlanner', value: 1}, {name: 'jobIds', value: jobsIds.join(',')}]);
    const jobs = [];

    result.jobs.forEach(rawJob => {
      const job = new Job();
      job.constructFromJson(rawJob);
      jobs.push(job);
    });

    return {
      jobs: jobs,
      items: result.items
    };
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
        const genericDataId = tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2] + (tableJob[3] && tableJob[3] === '01' ? '_01' : '');
        job.dataId = genericDataId;

        if (uniqJobs.indexOf(genericDataId) === -1) {
          if (job.dataId === 'JB_LW_WAR') {
            job.names = {
              en: 'Warrior',
              fr: 'Guerrier',
              de: 'Krieger',
              es: 'Guerrero',
              ko: '전사',
              zh: '戰士'
            };
          }

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

    const rawJob = this[(forcedVersion ? forcedVersion : this.navService.getVersion()) + '_jobs'].find(findJob => findJob.dataId === id);
    const job = new Job();

    job.constructFromJson(JSON.parse(JSON.stringify(rawJob)));

    return job;
  }
}
