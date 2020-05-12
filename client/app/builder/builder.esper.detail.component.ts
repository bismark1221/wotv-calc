import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { EsperService } from '../services/esper.service';

@Component({
  selector: 'app-builder-esper-detail',
  templateUrl: './builder.esper.detail.component.html',
  styleUrls: ['./builder.esper.detail.component.css']
})
export class BuilderEsperDetailComponent implements OnInit {
  @Input() public esper;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {

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
}
