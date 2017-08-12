export class Ability {
  name: string;
  base: number;

  frames?: number = 1;
  hits?: number = 1;
  ignore?: number = 0;
  dualable?: boolean = true;
  elements?: any[] = [];

  constructAbilityFromJson(ability: Ability): void {
    this.name = ability.name;
    this.base = ability.base;

    this.frames = ability.frames ? ability.frames : this.frames;
    this.hits = ability.hits ? ability.hits : this.hits;
    this.ignore = ability.ignore ? ability.ignore : this.ignore;
    this.dualable = ability.dualable ? ability.dualable : this.dualable;
    this.elements = ability.elements ? ability.elements : this.elements;
  }
}
