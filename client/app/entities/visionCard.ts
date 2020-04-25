import { Skill } from './skill';
import { TranslateService } from '@ngx-translate/core';

export class VisionCard {
  dataId?;
  rarity: "N";
  names: any = {
    en: 'New VisionCard'
  };
  name = "New VisionCard";

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


  constructFromJson(visionCard: VisionCard, translateService: TranslateService): void {
    this.dataId = visionCard.dataId;
    this.rarity = visionCard.rarity;
    this.names = visionCard.names;
    this.stats = visionCard.stats;
    this.image = visionCard.image;
    this.unitBuffsClassic = visionCard.unitBuffsClassic;
    this.unitBuffsAwake = visionCard.unitBuffsAwake;
    this.unitBuffsMax = visionCard.unitBuffsMax;
    this.partyBuffsClassic = visionCard.partyBuffsClassic;
    this.partyBuffsAwake = visionCard.partyBuffsAwake;
    this.partyBuffsMax = visionCard.partyBuffsMax;
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
