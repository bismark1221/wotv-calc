export class Item {
  dataId?;
  names = {
    en: 'New Item'
  };
  name = 'New Item';
  recipe = false;
  image;
  count;
  icon;

  constructFromJson(item: Item): void {
    this.dataId = item.dataId;
    this.names = item.names;
    this.recipe = item.recipe;
    this.icon = item.icon;
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
