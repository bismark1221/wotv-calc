import { Skill } from './skill';

export class Quest {
  dataId?;
  names = {
    en: 'New Quest'
  };
  name = 'New Quest';

  items = {};
  exp = 0;
  nrg = 0;
  jp = 0;
  enemies = 0;
  gils = 0;
  chests = 0;


  constructFromJson(quest, translateService) {
    this.dataId = quest.dataId;
    this.items = quest.items;
    this.exp = quest.exp;
    this.nrg = quest.nrg;
    this.jp = quest.jp;
    this.enemies = quest.enemies;
    this.gils = quest.gils;
    this.chests = quest.chests;
  }

  getName(translateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }
}
