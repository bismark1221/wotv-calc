import { Skill } from './skill';
import { TranslateService } from '@ngx-translate/core';

export class Card {
  dataId?;
  rarity = "N";
  names: any = {
    en: 'New Vision Card'
  };
  name = "New Vision Card";

  stats = {
    "HP": {},
    "ATK": {},
    "MAG": {}
  }

  image = "ITEMcrst";

  unitBuffsClassic = new Skill();
  unitBuffsAwake = new Skill();
  unitBuffsMax = new Skill();
  partyBuffsClassic = new Skill();
  partyBuffsAwake = new Skill();
  partyBuffsMax = new Skill();
  slug;


  constructFromJson(card: Card, translateService: TranslateService): void {
    this.dataId = card.dataId;
    this.rarity = card.rarity;
    this.names = card.names;
    this.stats = card.stats;
    this.image = card.image;
    this.unitBuffsClassic = card.unitBuffsClassic;
    this.unitBuffsAwake = card.unitBuffsAwake;
    this.unitBuffsMax = card.unitBuffsMax;
    this.partyBuffsClassic = card.partyBuffsClassic;
    this.partyBuffsAwake = card.partyBuffsAwake;
    this.partyBuffsMax = card.partyBuffsMax;
    this.slug = card.slug;
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
