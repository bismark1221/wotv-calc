import { TranslateService } from '@ngx-translate/core';

export class Ability {
  id: number = 1;
  dataId?;
  names: any = {
    en: 'New ability'
  };
  name: string = 'New ability';

  type?: string = 'chain';
  damage?: string = 'physic';
  magicType?: string = null;

  castTime?: number = 0;
  offset?: number = 0;
  ignore?: number = 0;
  base: number = 0;

  dualable?: boolean = true;

  framesList?: any[] = [0];
  elements?: string[] = [];
  debuffs?: any[] = [];
  hitDamage?: any[] = [];
  range?: any = {
    min: 0,
    max: 20
  }

  constructFromJson(ability: Ability, translateService: TranslateService): void {
    this.id = ability.id ? ability.id : ability.dataId;
    this.names = ability.names;
    this.getName(translateService);
    this.base = ability.base;

    this.framesList = ability.framesList ? ability.framesList : this.framesList;
    this.castTime = ability.castTime || ability.castTime === 0 ? ability.castTime : this.castTime;
    this.offset = ability.offset || ability.offset === 0 ? ability.offset : this.offset;

    this.ignore = ability.ignore ? ability.ignore : this.ignore;
    this.dualable = typeof ability.dualable == 'boolean' ? ability.dualable : this.dualable;
    this.elements = ability.elements ? ability.elements : this.elements;
    this.debuffs = ability.debuffs ? ability.debuffs : this.debuffs;

    if (ability.type) {
      this.type = ability.type;
    } else {
      this.type = this.framesList.length > 1 ? this.type : 'finish';
    }

    this.damage = ability.damage ? ability.damage : this.damage;
    this.magicType = typeof ability.magicType == 'string' ? ability.magicType : this.magicType;

    if (ability.range) {
      this.range.min = ability.range.min ? ability.range.min : this.range.min;
      this.range.max = ability.range.max ? ability.range.max : this.range.max;
    }

    if (ability.hitDamage) {
      this.hitDamage = ability.hitDamage;
    } else {
      this.framesList.forEach(hit => {
        this.hitDamage.push(100 / this.framesList.length);
      });
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
