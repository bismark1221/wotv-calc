import { TranslateService } from '@ngx-translate/core';

export class Skill {
  id = 1;
  dataId?;
  names: any = {
    en: 'New ability'
  };
  name = 'New ability';

  type = 'chain';
  damage = 'physic';
  magicType?: string = null;

  castTime = 0;
  offset = 0;
  ignore = 0;
  base = 0;

  dualable = true;
  isLB = false;

  framesList?: any[] = [0];
  elements?: string[] = [];
  imperils?: any[] = [];
  boostModifiers?: any[] = [];
  boostLB?: any[] = [];
  hitDamage?: any[] = [];
  range?: any = {
    min: 0,
    max: 20
  };
  breaks ? = [];
  buffs ? = [];
  killers ? = [];
  imbues ? = [];
  effectOrder ? = [];
  lbDamage = 0;
  jumpDamage = 0;
  canDualSkill = true;
  jump?;
  delayAttack?;
  dot?;
  consecutive?;
  unlockBy?;
  cooldown?;
  effects?;
  damageHtml?;
  counter;
  counterHtml;
  basedHtml;
  based;
  level;
  increaseUnitLevel;

  constructFromJson(ability: Skill, translateService: TranslateService): void {

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
