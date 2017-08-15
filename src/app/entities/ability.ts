export class Ability {
  name: string = 'New ability';
  base: number = 0;

  frames?: number = 1;
  hits?: number = 1;
  ignore?: number = 1;
  dualable?: boolean = true;
  elements?: string[] = [];
  debuff?: any = {};
  type?: string = 'physic';

  constructAbilityFromJson(ability: Ability): void {
    this.name = ability.name;
    this.base = ability.base;

    this.frames = ability.frames ? ability.frames : this.frames;
    this.hits = ability.hits ? ability.hits : this.hits;
    this.ignore = ability.ignore ? ability.ignore : this.ignore;
    this.dualable = ability.dualable ? ability.dualable : this.dualable;
    this.elements = ability.elements ? ability.elements : this.elements;
    this.debuff = ability.debuff ? ability.debuff : this.debuff;
    this.type = ability.type ? ability.type : this.type;
  }
}
