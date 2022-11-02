export class Item {
  dataId?;
  names = {
    en: 'New Item'
  };
  name = 'New Item';
  type = '';
  image;
  count;
  icon;
  class;

  constructFromJson(item: Item, translateService): void {
    this.dataId = item.dataId;
    this.names = item.names;
    this.type = item.type;
    this.icon = item.icon;
    this.image = item.image;
    this.class = item.class;

    this.name = this.getName(translateService);
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
