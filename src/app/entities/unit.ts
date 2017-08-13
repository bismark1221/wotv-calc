import { Ability } from './ability';

export class Unit {
  id: number;
  name: string;
  type: string;
  abilities: Ability[] = [];
  hitDamage?: number;
  dual?: boolean = true;
  weapons: string[] = ['', ''];

  constructUnitFromJson(unit: Unit): void {
    this.id = unit.id;
    this.name = unit.name;
    this.type = unit.type;
    this.dual = typeof unit.dual == 'boolean' ? unit.dual : this.dual;
    unit.weapons = unit.weapons ? unit.weapons : this.weapons;
    this.weapons[0] = unit.weapons[0] ? unit.weapons[0] : '';
    this.weapons[1] = unit.weapons[1] ? unit.weapons[1] : '';
    unit.abilities.forEach(element => {
      let ability = new Ability();
      ability.constructAbilityFromJson(element);
      this.abilities.push(ability);
    });
  }
}
