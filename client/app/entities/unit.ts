import { Ability } from './ability';
import { TranslateService } from '@ngx-translate/core';

export class Unit {
  id: number;
  type: string = 'chain';
  abilities: Ability[] = [new Ability()];
  hitDamage?: number;
  dual?: boolean = true;
  weapons: string[] = ['', ''];
  names: any = {
    en: 'New Unit'
  };
  name: string = 'New Unit';
  multiCasts: any[] = [];
  multipleBlack: number = 1;
  multipleWhite: number = 1;
  multipleGreen: number = 1;

  constructUnitFromJson(unit: Unit, translateService: TranslateService): void {
    this.id = unit.id;
    this.names = unit.names;
    this.getName(translateService);
    this.type = unit.type ? unit.type : this.type;
    this.dual = typeof unit.dual == 'boolean' ? unit.dual : this.dual;

    unit.weapons = unit.weapons ? unit.weapons : this.weapons;
    this.weapons[0] = unit.weapons[0] ? unit.weapons[0] : '';
    this.weapons[1] = unit.weapons[1] ? unit.weapons[1] : '';

    this.abilities = [];
    unit.abilities.forEach(dataAbility => {
      let ability = new Ability();
      ability.constructAbilityFromJson(dataAbility, translateService);
      this.abilities.push(ability);
    });

    this.multiCasts = unit.multiCasts ? unit.multiCasts : this.multiCasts;
    this.multipleBlack = unit.multipleBlack ? unit.multipleBlack : this.multipleBlack;
    this.multipleWhite = unit.multipleWhite ? unit.multipleWhite : this.multipleWhite;
    this.multipleGreen = unit.multipleGreen ? unit.multipleGreen : this.multipleGreen;
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
