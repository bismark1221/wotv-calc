import { TranslateService } from '@ngx-translate/core';

export class Skill {
  dataId?;
  names: any = {
    en: 'New Unit'
  };
  name = 'New Unit';
  effects = [];
  type;
  target;
  cost;
  count;
  maxLevel;
  range = {};
  based;
  damage = {};
  element;
  elem;
  aoe;
  counter;
  crt_hit;
  hit;
  maths;
  combo;
  knockback;
  ctbreak;
  time;
  pierce;
  increaseDamageOnDecreaseHp;
  reflectable;
  takeUnitElem;
  curve;
  rangeBuff;
  heightRangeBuff;
  line;
  possibleTarget;

  // For builder
  level;

  constructFromJson(skill: Skill, translateService: TranslateService): void {
    this.dataId = skill.dataId;
    this.names = skill.names;
    this.name = skill.name;
    this.effects = skill.effects;
    this.type = skill.type;
    this.target = skill.target;
    this.cost = skill.cost;
    this.count = skill.count;
    this.maxLevel = skill.maxLevel;
    this.range = skill.range;
    this.based = skill.based;
    this.damage = skill.damage;
    this.element = skill.element;
    this.elem = skill.elem;
    this.aoe = skill.aoe;
    this.counter = skill.counter;
    this.crt_hit = skill.crt_hit;
    this.hit = skill.hit;
    this.maths = skill.maths;
    this.combo = skill.combo;
    this.knockback = skill.knockback;
    this.ctbreak = skill.ctbreak;
    this.time = skill.time;
    this.pierce = skill.pierce;
    this.increaseDamageOnDecreaseHp = skill.increaseDamageOnDecreaseHp;
    this.reflectable = skill.reflectable;
    this.takeUnitElem = skill.takeUnitElem;
    this.curve = skill.curve;
    this.rangeBuff = skill.rangeBuff;
    this.heightRangeBuff = skill.heightRangeBuff;
    this.line = skill.line;
    this.possibleTarget = skill.possibleTarget;

    // @TODO Remove when finish work on skills
    Object.keys(skill).forEach(key => {
      if (Object.keys(this).indexOf(key) === -1) {
        console.log('NOT MANAGED KEY IN SKILL : ' + key);
      }
    });
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
