import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-extra-legal',
  templateUrl: './extra.legal.component.html',
  styleUrls: ['./extra.legal.component.css']
})

export class ExtraLegalComponent {
  markdown = '';

  constructor(
    private translateService: TranslateService,
    private navService: NavService,
  ) {
    this.navService.setTitle('Legal');

    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
    });
  }

  private getTranslation() {
    this.translateService.get('legal.markdown').subscribe((res: string) => {
      this.markdown = res;
    });
  }
}
