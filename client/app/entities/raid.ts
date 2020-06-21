export class Raid {
  dataId?;
  names = {
    en: 'New Raid'
  };
  name = 'New Raid'
  bosses = [];
  slug = 'new-raid'

  constructFromJson(raid: Raid, translateService): void {
    this.dataId = raid.dataId;
    this.names = raid.names;
    this.bosses = raid.bosses;
    this.slug = raid.slug;
  }

  getName(translateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }
}
