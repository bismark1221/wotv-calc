export class Ability {
  name: string = 'New ability';
  base: number = 0;

  linearFrames?: number = 1;
  frames?: string = '';
  castTime?: number = 0;
  offset?: number = 16;
  hits?: number = 1;
  ignore?: number = 1;
  firstHit?: number = 0;
  dualable?: boolean = true;
  elements?: string[] = [];
  debuff?: any = {};
  type?: string = 'physic';

  constructAbilityFromJson(ability: Ability): void {
    this.name = ability.name;
    this.base = ability.base;

    this.linearFrames = ability.linearFrames ? ability.linearFrames : this.linearFrames;
    this.frames = ability.frames ? ability.frames : this.frames;
    this.hits = ability.hits ? ability.hits : this.hits;
    this.firstHit = ability.firstHit ? ability.firstHit : this.firstHit;
    this.castTime = ability.castTime ? ability.castTime : this.castTime;
    this.offset = ability.offset ? ability.offset : this.offset;

    this.ignore = ability.ignore ? ability.ignore : this.ignore;
    this.dualable = ability.dualable ? ability.dualable : this.dualable;
    this.elements = ability.elements ? ability.elements : this.elements;
    this.debuff = ability.debuff ? ability.debuff : this.debuff;

    this.type = ability.type ? ability.type : this.type;
  }
}
