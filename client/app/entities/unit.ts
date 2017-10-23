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

  constructUnitFromJson(unit: Unit, translateService: TranslateService): void {
    this.id = unit.id;
    this.names = unit.names;
    this.getName(translateService);
    this.type = unit.type;
    this.dual = typeof unit.dual == 'boolean' ? unit.dual : this.dual;
    unit.weapons = unit.weapons ? unit.weapons : this.weapons;
    this.weapons[0] = unit.weapons[0] ? unit.weapons[0] : '';
    this.weapons[1] = unit.weapons[1] ? unit.weapons[1] : '';
    this.abilities = [];
    unit.abilities.forEach(element => {
      let ability = new Ability();
      ability.constructAbilityFromJson(element, translateService);
      this.abilities.push(ability);
    });
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
