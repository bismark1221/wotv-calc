import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { UnitService } from '../services/unit.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  lang = 'en';
  markdown = '';
  updated = [103, 102, 101, 104, 100];
  units = [];

  constructor(
    private translateService: TranslateService,
    private unitService: UnitService
  ) {
    this.getTranslation();
    this.getUnits();

    this.lang = this.translateService.currentLang;

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = this.translateService.currentLang;
      this.getTranslation();
      this.getUnits();
    });
  }

  private getTranslation() {
    this.translateService.get('home.markdown').subscribe((res: string) => {
      this.markdown = res;
    });
  }

  private getUnits() {
    this.units = [];
    this.updated.forEach(id => {
      let unit = this.unitService.getUnit(id);
      this.units.push(unit.getName(this.translateService));
    });
  }
}
