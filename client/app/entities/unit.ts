import { Skill } from './skill';
import { Buff } from './buff';
import { Equipment } from './equipment';
import { TranslateService } from '@ngx-translate/core';

export class Unit {
  dataId?;
  rarity: "N";
  names: any = {
    en: 'New Unit'
  };
  name = "New Unit";
  jobs: any = [
    {
      en: 'Job 1'
    },
    {
      en: 'Job 2'
    },
    {
      en: 'Job 3'
    }
  ];

  skills: Skill[] = [new Skill()];
  buffs: Buff[] = [new Buff()];
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

  limit = new Skill();
  tmr = new Equipment();
  masterSkill = new Skill();
  totalBuffs = {
    HP: 0,
    TP: 0,
    INITIAL_AP: 0,
    ATK: 0,
    DEF: 0,
    MAG: 0,
    SPR: 0,
    DEX: 0,
    AGI: 0,
    LUCK: 0,
    CRITIC_RATE: 0,
  };
  remainingBuffs = [];
  slug;
  board;


  constructFromJson(unit: Unit, translateService: TranslateService): void {
    this.dataId = unit.dataId;
    this.rarity = unit.rarity;
    this.names = unit.names;
    this.jobs = unit.jobs;
    this.skills = unit.skills;
    this.buffs = unit.buffs;
    this.stats = unit.stats;
    this.element = unit.element;
    this.image = unit.image;
    this.limit = unit.limit;
    this.tmr = unit.tmr;
    this.masterSkill = unit.masterSkill;
    this.slug = unit.slug;
    this.board = unit.board;
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
