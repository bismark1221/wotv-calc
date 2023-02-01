import { Injectable } from '@angular/core';

import { Job } from '../entities/job';

import { TranslateService } from './translate.service';
import { NavService } from './nav.service';
import { ApiService } from './api.service';
import { ToolService } from './tool.service';

@Injectable()
export class JobService {
  private JP_jobs: Job[];
  private GL_jobs: Job[];

  private JP_uniqJobs;
  private GL_uniqJobs;

  constructor(
    private apiService: ApiService,
    private navService: NavService,
    private translateService: TranslateService,
    private toolService: ToolService
  ) {}

  private async getApi(param = null, extraQuery = []) {
    return JSON.parse(JSON.stringify(await this.apiService.get('jobs', param, extraQuery)));
  }

  async getJobsForJobPlanner(jobsIds) {
    const result = await this.getApi(null, [{name: 'forJobPlanner', value: 1}, {name: 'jobIds', value: jobsIds.join(',')}]);
    const jobs = [];

    result.jobs.forEach(rawJob => {
      const job = new Job();
      job.constructFromJson(rawJob, this.translateService);
      jobs.push(job);
    });

    return {
      jobs: jobs,
      items: result.items
    };
  }

  getGenericJobId(jobId) {
    const tableJob = jobId.split('_');
    let genericDataId = tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2];

    if (tableJob[3]) {
      if (['FIRE', 'ICE', 'WIND', 'SOIL', 'THUN', 'WATER', 'WATR', 'SHIN', 'SHINE', 'DARK'].indexOf(tableJob[3]) === -1) {
        genericDataId += '_' + tableJob[3];
      }
    }

    return genericDataId;
  }

  getUniqJobsByIds(jobsToFilter) {
    const uniqJobs = [];

    for (const rawJob of jobsToFilter) {
      const job = new Job();
      job.constructFromJson(rawJob, this.translateService);
      job.dataId = this.getGenericJobId(job.dataId);

      if (!uniqJobs.find(searchedJob => searchedJob.dataId === job.dataId)) {
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

        uniqJobs.push(job);
      }
    }

    return this.toolService.sortByName(uniqJobs);
  }
}
