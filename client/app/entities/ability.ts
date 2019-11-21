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
  isLB?: boolean = false;

  framesList?: any[] = [0];
  elements?: string[] = [];
  imperils?: any[] = [];
  boostModifiers?: any[] = [];
  boostLB?: any[] = [];
  hitDamage?: any[] = [];
  range?: any = {
    min: 0,
    max: 20
  }
  breaks? = [];
  buffs? = [];
  killers? = [];
  imbues? = [];
  effectOrder? = [];
  lbDamage?: number = 0;
  jumpDamage?: number = 0;
  canDualSkill?: boolean = true;
  jump?;
  delayAttack?;
  dot?;
  consecutive?;
  unlockBy?;
  cooldown?;

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
    this.isLB = typeof ability.isLB == 'boolean' ? ability.isLB : this.isLB;
    this.elements = ability.elements ? ability.elements : this.elements;
    this.imperils = ability.imperils ? ability.imperils : this.imperils;
    this.boostModifiers = ability.boostModifiers ? ability.boostModifiers : this.boostModifiers;
    this.boostLB = ability.boostLB ? ability.boostLB : this.boostLB;
    this.breaks = ability.breaks ? ability.breaks : this.breaks;
    this.buffs = ability.buffs ? ability.buffs : this.buffs;
    this.killers = ability.killers ? ability.killers : this.killers;
    this.lbDamage = ability.lbDamage ? ability.lbDamage : this.lbDamage;
    this.jumpDamage = ability.jumpDamage ? ability.jumpDamage : this.jumpDamage;
    this.canDualSkill = typeof ability.canDualSkill == 'boolean' ? ability.canDualSkill : this.canDualSkill;
    this.imbues = ability.imbues ? ability.imbues : this.imbues;
    this.effectOrder = ability.effectOrder ? ability.effectOrder : this.effectOrder;
    this.unlockBy = ability.unlockBy ? ability.unlockBy : this.unlockBy;
    this.cooldown = ability.cooldown ? ability.cooldown : this.cooldown;

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

    if (ability.jump) {
      this.jump = ability.jump;
    }

    if (ability.delayAttack) {
      this.delayAttack = ability.delayAttack;
    }

    if (ability.dot) {
      this.dot = ability.dot;
    }

    if (ability.consecutive) {
      this.consecutive = ability.consecutive;
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
