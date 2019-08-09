import { TranslateService } from '@ngx-translate/core';

export class Monster {
  id: any = 'unselect';
  names: any = {
    en: 'My Monster'
  };
  name: string = 'My Monster';
  stats: any = {
    def: 193,
    spr: 500
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

  constructFromJson(monster: Monster, translateService: TranslateService): void {
    this.id = monster.id;
    this.names = monster.names;
    this.getName(translateService);

    this.stats = monster.stats ? monster.stats : this.stats;
    this.races = monster.races ? monster.races : this.races;
    this.resistances = monster.resistances ? monster.resistances : this.resistances;
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
