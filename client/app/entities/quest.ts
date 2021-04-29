import { Skill } from './skill';

export class Quest {
  dataId?;
  names = {
    en: 'New Quest'
  };
  name = 'New Quest';
  slug = 'new-quest';
  type = 'story';

  items = {};
  exp = 0;
  nrg = 0;
  jp = 0;
  gils = 0;

  enemies = [];
  chests = [];
  allies = [];
  objects = [];
  switchs = [];

  buffs = [];

  missions = [];
  grid = [];


  constructFromJson(quest, translateService) {
    this.dataId = quest.dataId;
    this.names = quest.names;
    this.slug = quest.slug;
    this.type = quest.type;

    this.items = quest.items;
    this.exp = quest.exp;
    this.nrg = quest.nrg;
    this.jp = quest.jp;
    this.gils = quest.gils;

    this.enemies = quest.enemies;
    this.chests = quest.chests;
    this.allies = quest.allies;
    this.objects = quest.objects;
    this.switchs = quest.switchs;

    this.buffs = quest.buffs;

    this.missions = quest.missions;
    this.grid = quest.grid;
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
