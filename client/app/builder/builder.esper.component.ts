import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EsperService } from '../services/esper.service';

@Component({
  selector: 'app-builder-esper',
  templateUrl: './builder.esper.component.html',
  styleUrls: ['./builder.esper.component.css']
})
export class BuilderEsperComponent implements OnInit {
  @Input() public esper;
  @Input() public fromUnitBuilder = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  selectedId
  espers

  buffsImage = [
    "dark_atk",
    "dark_killer",
    "dark_res",
    "earth_atk",
    "earth_killer",
    "earth_res",
    "fire_atk",
    "fire_killer",
    "fire_res",
    "ice_atk",
    "ice_killer",
    "ice_res",
    "light_atk",
    "light_killer",
    "light_res",
    "lightning_atk",
    "lightning_killer",
    "lightning_res",
    "neutral_atk",
    "neutral_killer",
    "neutral_res",
    "water_atk",
    "water_killer",
    "water_res",
    "wind_atk",
    "wind_killer",
    "wind_res",

    "magic_atk",
    "magic_res",
    "missile_atk",
    "missile_res",
    "pierce_atk",
    "pierce_res",
    "slash_atk",
    "slash_res",
    "strike_atk",
    "strike_res",
  ]

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private modalService: NgbModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getEspers();
    });
  }

  ngOnInit(): void {
    this.getEspers();
  }

  private getEspers() {
    this.espers = this.esperService.getEspersForBuilder();
    this.espers = [...this.espers];
  }

  selectEsper() {
    if (this.selectedId) {
      this.esper = this.esperService.selectEsperForBuilder(this.selectedId)
    } else {
      this.esper = null
    }
  }

  changeStar(value) {
    this.esper.star = value
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

  close() {
    this.modalService.dismissAll();
  }
}
