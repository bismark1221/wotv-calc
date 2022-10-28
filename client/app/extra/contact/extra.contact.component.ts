import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-extra-contact',
  templateUrl: './extra.contact.component.html',
  styleUrls: ['./extra.contact.component.css']
})
export class ExtraContactComponent {
  markdown = '';
  lang = 'en';

  constructor(
    private translateService: TranslateService,
    private navService: NavService
  ) {
    this.getTranslation();

    this.lang = this.translateService.currentLang;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
      this.getTranslation();
    });

    this.navService.setTitle('Contact');
  }

  private getTranslation() {
    this.translateService.get('contact.content').subscribe((res: string) => {
      this.markdown = res;
    });
  }
}
