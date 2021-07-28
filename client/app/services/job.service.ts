import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Job } from '../entities/job';

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
    return JSON.parse(JSON.stringify(await this.apiService.loadData('jobs', param, extraQuery)));
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

  getUniqJobsByIds(jobsToFilter) {
    const uniqJobs = [];

    for (const rawJob of jobsToFilter) {
      const job = new Job();
      job.constructFromJson(rawJob, this.translateService);

      const tableJob = job.dataId.split('_');
      const genericDataId = tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2] + (tableJob[3] && tableJob[3] === '01' ? '_01' : '');
      job.dataId = genericDataId;

      if (!uniqJobs.find(searchedJob => searchedJob.dataId === genericDataId)) {
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
