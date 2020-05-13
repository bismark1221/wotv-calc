import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';

@Component({
  selector: 'app-builder-esper',
  templateUrl: './builder.esper.component.html',
  styleUrls: ['./builder.esper.component.css']
})
export class BuilderEsperComponent implements OnInit {
  selectedId
  espers
  esper

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getEspers();
    });
  }

  ngOnInit(): void {
    this.getEspers();
  }

  private getEspers() {
    this.espers = this.esperService.getEspersForBuilder(this.translateService);
    this.espers = [...this.espers];
  }

  selectEsper() {
    if (this.selectedId) {
      this.esper = this.esperService.selectEsperForBuilder(this.selectedId)
    } else {
      this.esper = null
    }
  }

  changeStar() {
    this.esperService.changeStar()
  }

  changeLevel() {
    this.esperService.changeLevel()
  }

  rightClickNode(node) {
    this.esperService.rightClickNode(node)
  }

  clickNode(node) {
    this.esperService.clickNode(node)
  }

  canActivateNode(node) {
    return this.esperService.canActivateNode(node)
  }

  save() {
    this.esperService.saveEsper(this.esper)
  }

  maxEsper() {
    this.esperService.maxEsper()
  }
}
