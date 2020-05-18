import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NameService {

  constructor(
    private translateService: TranslateService
  ) {}

  getName(item) {
    if (!item.names[this.translateService.currentLang]) {
      return item.names[this.translateService.getDefaultLang()];
    } else {
      return item.names[this.translateService.currentLang];
    }
  }
}
