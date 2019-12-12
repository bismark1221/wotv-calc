import { Ability } from './ability';
import { TranslateService } from '@ngx-translate/core';

export class Unit {
  id: number;
  dataId?;
  type: string = 'chain';
  abilities: Ability[] = [new Ability()];
  dual?: boolean = true;
  weapons: string[] = ['', ''];
  names: any = {
    en: 'New Unit'
  };
  name: string = 'New Unit';
  multiCasts: any[] = [{
    count: 1,
    abilities: []
  }];
  multipleBlack: number = 1;
  multipleWhite: number = 1;
  multipleGreen: number = 1;
  maxChainCap: number = 4;
  level: number = 120;
  rarity: any = {
    min: 5,
    max: 7,
    value: 7
  };
  stats: any = {};
  dataStats: any = {
    7: {
      atk: {
        base: 0,
        pot: 0,
      },
      mag: {
        base: 0,
        pot: 0,
      }
    }
  };
  damageWeapons: any = [
    {
      elements: [],
      type: 'noWeapon',
      varianceMin: 100,
      varianceMax: 100,
      atk: 0
    },
    {
      elements: [],
      type: 'noWeapon',
      varianceMin: 100,
      varianceMax: 100,
      atk: 0
    }
  ];
  killers: any = [];
  buffs: any = {
    atk: 0 ,
    mag: 0
  };
  breaks: any = {
    def: 0 ,
    spr: 0
  };
  passiveBoostModifiers = [];
  passiveLBDamage = [];
  passiveKillers = [];

  constructFromJson(unit: Unit, translateService: TranslateService, damage: boolean = false): void {
    this.id = unit.id ? unit.id : unit.dataId;
    this.names = unit.names;
    this.getName(translateService);
    this.type = unit.type ? unit.type : this.type;
    this.dual = typeof unit.dual == 'boolean' ? unit.dual : this.dual;

    unit.weapons = unit.weapons ? unit.weapons : this.weapons;
    this.weapons[0] = unit.weapons[0] ? unit.weapons[0] : '';
    this.weapons[1] = unit.weapons[1] ? unit.weapons[1] : '';

    this.abilities = [];
    unit.abilities.forEach(dataAbility => {
      if (damage || (dataAbility.hasOwnProperty('base') && dataAbility.base >= 0)) {
        let ability = new Ability();
        ability.constructFromJson(dataAbility, translateService);
        this.abilities.push(ability);
      }
    });

    this.multiCasts = unit.multiCasts ? unit.multiCasts : this.multiCasts;
    this.multipleBlack = unit.multipleBlack ? unit.multipleBlack : this.multipleBlack;
    this.multipleWhite = unit.multipleWhite ? unit.multipleWhite : this.multipleWhite;
    this.multipleGreen = unit.multipleGreen ? unit.multipleGreen : this.multipleGreen;
    this.maxChainCap = unit.maxChainCap ? unit.maxChainCap : this.maxChainCap;

    if (damage) {
      this.level = unit.level ? unit.level : this.level;
      this.damageWeapons = unit.damageWeapons ? unit.damageWeapons : this.damageWeapons;
      this.stats = unit.stats ? unit.stats : this.stats;
      this.dataStats = unit.dataStats ? unit.dataStats : this.dataStats;
      this.killers = unit.killers ? unit.killers : this.killers;
      this.buffs = unit.buffs ? unit.buffs : this.buffs;
      this.breaks = unit.breaks ? unit.breaks : this.breaks;
      this.rarity = unit.rarity ? unit.rarity : this.rarity;
      this.rarity.value = unit.rarity && unit.rarity.value ? unit.rarity.value : this.rarity.max;
      this.passiveBoostModifiers = unit.passiveBoostModifiers ? unit.passiveBoostModifiers : this.passiveBoostModifiers;
      this.passiveKillers = unit.passiveKillers ? unit.passiveKillers : this.passiveKillers;
      this.passiveLBDamage = unit.passiveLBDamage ? unit.passiveLBDamage : this.passiveLBDamage;
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
