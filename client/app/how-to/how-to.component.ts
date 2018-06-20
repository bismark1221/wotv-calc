import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Lightbox } from 'angular2-lightbox';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})

export class HowToComponent {
  lang = 'en';

  constructor(
    private translateService: TranslateService,
    private lightboxService: Lightbox
  ) {
    this.lang = this.translateService.currentLang;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
    });
  }

  open(href: string): void {
    let albums = [
      {
       src: href,
       caption: '',
       thumb: ''
      }
    ];
    this.lightboxService.open(albums, 0);
  }
}
