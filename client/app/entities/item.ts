export class Item {
  dataId?;
  names = {
    en: 'New Item'
  };
  name = 'New Item'
  recipe = false
  //slug = 'new-item'
  image
  count

  constructFromJson(item: Item): void {
    this.dataId = item.dataId;
    this.names = item.names;
    this.recipe = item.recipe;
    //this.slug = raid.slug;
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
