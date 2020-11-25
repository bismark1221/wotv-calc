import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Job } from '../entities/job';
import { default as GL_JOBS } from '../data/gl/jobs.json';
import { default as JP_JOBS } from '../data/jp/jobs.json';
import { NavService } from './nav.service';

@Injectable()
export class JobService {
  private jobs: Job[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(
    private navService: NavService,
    private translateService: TranslateService
  ) {}

  private getRaw() {
    if (this.navService.getVersion() == 'GL') {
      return GL_JOBS;
    } else {
      return JP_JOBS;
    }
  }

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  sortByName(jobs, order = 'asc') {
    jobs.sort((a: any, b: any) => {
      const x = this.i(a.getName(this.translateService));
      const y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
        if (xD < yD) {
          return order == 'asc' ? -1 : 1;
        } else if (xD > yD) {
          return order == 'asc' ? 1 : -1;
        }
      }

      for (let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
        this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
        if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
          if (isNaN(this.oFxNcL)) {
            return order == 'asc' ? 1 : -1;
          } else {
            return order == 'asc' ? -1 : 1;
          }
        }

        if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
          const comp = this.oFxNcL.localeCompare(this.oFyNcL);
          return comp / Math.abs(comp);
        }

        if (this.oFxNcL < this.oFyNcL) {
          return order == 'asc' ? -1 : 1;
        } else if (this.oFxNcL > this.oFyNcL) {
          return order == 'asc' ? 1 : -1;
        }
      }
    });

    return jobs;
  }

  getJobs(): Job[] {
    const jobs: Job[] = [];
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

      if (uniqJobs.indexOf(genericDataId) == -1) {
        jobs.push(job);
        uniqJobs.push(genericDataId);
      }
    });

    this.jobs = this.sortByName(jobs);
    return jobs;
  }

  getJob(id: string): Job {
    this.getJobs();

    return this.jobs.find(job => job.dataId === id);
  }
}
