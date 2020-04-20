import { TranslateService } from '@ngx-translate/core';

export class Skill {
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
