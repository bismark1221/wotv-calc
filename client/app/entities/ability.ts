import { TranslateService } from '@ngx-translate/core';

export class Ability {
  names: any = {
    en: 'New ability'
  };
  name: string = 'New ability';
  base: number = 0;

  framesList?: string = '0';
  castTime?: number = 40;
  offset?: number = 16;
  ignore?: number = 0;
  firstHit?: number = 0;
  dualable?: boolean = true;
  elements?: string[] = [];
  debuff?: any = {};
  type?: string = 'chain';
  damage?: string = 'physic';
  chain?: boolean = true;
  range?: any = {
    min: 0,
    max: 20
  }

  constructAbilityFromJson(ability: Ability, translateService: TranslateService): void {
    this.names = ability.names;
    this.getName(translateService);
    this.base = ability.base;

    this.framesList = ability.framesList ? ability.framesList : this.framesList;
    this.firstHit = ability.firstHit || ability.firstHit === 0 ? ability.firstHit : this.firstHit;
    this.castTime = ability.castTime || ability.castTime === 0 ? ability.castTime : this.castTime;
    this.offset = ability.offset || ability.offset === 0 ? ability.offset : this.offset;

    this.ignore = ability.ignore ? ability.ignore : this.ignore;
    this.dualable = typeof ability.dualable == 'boolean' ? ability.dualable : this.dualable;
    this.elements = ability.elements ? ability.elements : this.elements;
    this.debuff = ability.debuff ? ability.debuff : this.debuff;

    this.type = ability.type ? ability.type : this.type;
    this.damage = ability.damage ? ability.damage : this.damage;
    this.chain = typeof ability.chain == 'boolean' ? ability.chain : this.chain;

    if (ability.range) {
      this.range.min = ability.range.min ? ability.range.min : this.range.min;
      this.range.max = ability.range.max ? ability.range.max : this.range.max;
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
