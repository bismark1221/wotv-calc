import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MarkdownService } from 'angular2-markdown';

@Component({
  selector: 'app-how-to',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.css']
})

export class HowToComponent {
  markdown = '';

  constructor(
    private translateService: TranslateService,
    private markdownService: MarkdownService
  ) {
    this.getTranslation();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getTranslation();
    });
  }

  private getTranslation() {
    this.translateService.get('how-to.markdown').subscribe((res: string) => {
      this.markdown = res;
    });
  }

  ngOnInit() {
    this.markdownService.renderer.image = (href: string, title: string, text: string) => {
      return '<img src="' + href + '" alt="' + text + '" title="' + title + '" class="img-thumbnail">';
    }
  }
}
