import { TranslateService } from '../services/translate.service';

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

  constructFromJson(job: Job, translateService: TranslateService): void {
    this.dataId = job.dataId;
    this.names = job.names;
    this.statsModifiers = job.statsModifiers;
    this.image = job.image;
    this.subRate = job.subRate;
    this.equipments = job.equipments;
    this.materials = job.materials;

    this.name = this.getName(translateService);
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
