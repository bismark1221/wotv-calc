import { Ability } from './ability';

export class Unit {
  id: number;
  name: string;
  type: string;
  abilities: Ability[] = [];
  hitDamage?: number;

  constructUnitFromJson(unit: Unit): void {
    this.id = unit.id;
    this.name = unit.name;
    this.type = unit.type;
    unit.abilities.forEach(element => {
      let ability = new Ability();
      ability.constructAbilityFromJson(element);
      this.abilities.push(ability);
    });
  }
}
