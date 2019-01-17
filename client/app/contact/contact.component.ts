import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  markdown = '';
  lang = 'en';

  constructor(
    private translateService: TranslateService
  ) {
    this.getTranslation();

    this.lang = this.translateService.currentLang;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
      this.getTranslation();
    });
  }

  private getTranslation() {
    this.translateService.get('contact.content').subscribe((res: string) => {
      this.markdown = res;
    });
  }
}
