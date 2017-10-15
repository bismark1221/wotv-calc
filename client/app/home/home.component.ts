import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  markdown = '';

  constructor(translate: TranslateService) {
    translate.get('home.markdown').subscribe((res: string) => {
      this.markdown = res;
    });
  }
}
