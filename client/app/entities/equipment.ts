import { TranslateService } from '@ngx-translate/core';

import { Skill } from './skill';
import { Buff } from './buff';

export class Equipment {
  statsTypes;
  stats;

  dataId?;
  rarity: "N";
  names: any = {
    en: 'New Equipment'
  };
  name = "New Equipment";

  skills;
  buffs;

  image = "ITEMcrst";
  type;
  countSkills;
  slug;
  acquisition;
  grows;
  equippableJobs;


  constructFromJson(equipment: Equipment, translateService: TranslateService): void {
    this.dataId = equipment.dataId;
    this.rarity = equipment.rarity;
    this.names = equipment.names;
    this.skills = equipment.skills;
    this.buffs = equipment.buffs;
    this.stats = equipment.stats;
    this.image = equipment.image;
    this.type = equipment.type;
    this.slug = equipment.slug;
    this.acquisition = equipment.acquisition;
    this.grows = equipment.grows
    this.equippableJobs = equipment.equippableJobs;
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
