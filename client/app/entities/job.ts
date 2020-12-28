import { TranslateService } from '@ngx-translate/core';

export class Job {
  dataId?;
  names: any = {
    en: 'New Job'
  };
  name = 'New Job';

  statsModifiers = [];
  image;
  subRate;
  equipments;
  level;
  materials;
  start;
  goal;
  maxLevel;
  startTableLevel;
  goalTableLevel;

  constructFromJson(job: Job): void {
    this.dataId = job.dataId;
    this.names = job.names;
    this.statsModifiers = job.statsModifiers;
    this.image = job.image;
    this.subRate = job.subRate;
    this.equipments = job.equipments;
    this.materials = job.materials;
  }

  getName(translateService: TranslateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }
}
