import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})

export class LegalComponent {
  markdown = '';
  private translateService;

  constructor(translate: TranslateService) {
    this.translateService = translate;
    translate.get('legal.markdown').subscribe((res: string) => {
      this.markdown = res;
    });
  }
}
