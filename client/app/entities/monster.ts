import { TranslateService } from '@ngx-translate/core';

export class Monster {
  id: any = 'unselect';
  names: any = {
    en: 'My Monster'
  };
  name: string = 'My Monster';
  stats: any = {
    def: {
      breakable: 0,
      unbreakable: 0
    },
    spr: {
      breakable: 0,
      unbreakable: 0
    }
  };
  races: any = [];
  resistances: any = {
    'dark' : 0,
    'earth' : 0,
    'fire' : 0,
    'ice' : 0,
    'light' : 0,
    'lightning' : 0,
    'water' : 0,
    'wind' : 0
  };
  type: string = "unknow"

  constructFromJson(monster: Monster, translateService: TranslateService): void {
    this.id = monster.id;
    this.names = monster.names;
    this.getName(translateService);

    this.races = monster.races ? monster.races : this.races;
    this.type = monster.type ? monster.type : this.type;

    if (monster.stats) {
      if (!monster.stats.def.unbreakable) {
        monster.stats.def.unbreakable = 0;
      }
      if (!monster.stats.spr.unbreakable) {
        monster.stats.spr.unbreakable = 0;
      }
      this.stats = monster.stats;
    }

    if (monster.resistances) {
      Object.keys(this.resistances).forEach(element => {
        if (!monster.resistances[element]) {
          monster.resistances[element] = 0;
        }
      });
      this.resistances = monster.resistances;
    }
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
