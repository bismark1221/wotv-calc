import { Skill } from './skill';
import { Buff } from './buff';
import { Equipment } from './equipment';
import { TranslateService } from '@ngx-translate/core';

export class Esper {
  dataId?;
  rarity: "N";
  names: any = {
    en: 'New Esper'
  };
  name = "New Esper";

  skills: Skill[] = [new Skill()];
  stats = {
    "HP": {},
    "TP": {},
    "AP": {},
    "ATK": {},
    "DEF": {},
    "SPR": {},
    "MAG": {},
    "DEX": {},
    "AGI": {},
    "LUCK": {},
    "INITIAL_AP": {},
    "ACCURACY": {},
    "CRITIC_RATE": {},
    "CRITIC_AVOID": {},
    "EVADE": {},
    "FIRE": {},
    "ICE": {},
    "EARTH": {},
    "WIND": {},
    "LIGHTNING": {},
    "WATER": {},
    "LIGHT": {},
    "DARK": {},
    "SLASH": {},
    "PIERCE": {},
    "STRIKE": {},
    "MISSILE": {},
    "MAGIC": {},
    "POISION": {},
    "BLIND": {},
    "SLEEP": {},
    "SILENCE": {},
    "PARALYZE": {},
    "CONFUSION": {},
    "PETRIFY": {},
    "TOAD": {},
    "CHARM": {},
    "SLOW": {},
    "STOP": {},
    "IMMOBILIZE": {},
    "DISABLE": {},
    "BERSERK": {},
    "DOOM": {},
    "MOVE": {},
    "JUMP": {}
  }

  element = "fire";
  image = "ITEMcrst";

  effectBuffs;
  slug;
  SPs;
  board;


  constructFromJson(esper: Esper, translateService: TranslateService): void {
    this.dataId = esper.dataId;
    this.rarity = esper.rarity;
    this.names = esper.names;
    this.skills = esper.skills;
    this.stats = esper.stats;
    this.element = esper.element;
    this.image = esper.image;
    this.slug = esper.slug;
    this.SPs = esper.SPs;
    this.board = esper.board;
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
