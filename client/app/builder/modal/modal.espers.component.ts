import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { EsperService } from '../../services/esper.service';
import { NavService } from '../../services/nav.service';
import { NameService } from '../../services/name.service';

@Component({
  selector: 'app-modal-espers',
  templateUrl: './modal.espers.component.html',
  styleUrls: ['./modal.espers.component.css']
})
export class ModalEspersComponent implements OnInit {
  espers;

  searchText = "";
  filters = {
    rarity: [],
    element: []
  }

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

  @Input() public modalStep = "select";
  @Input() public esper

  constructor(
    private esperService: EsperService,
    private translateService: TranslateService,
    private nameService: NameService,
    private modal: NgbActiveModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  ngOnInit() {
    this.getEspers();

    console.log(this.esper)
    if (this.esper) {
      this.changeLevel()
    }
  }

  getEspers() {
    this.espers = this.esperService.getEspersForListing(this.filters);
    this.getFilteredEspers()
    this.translateEspers()
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.nameService.getName(esper)
    });
  }

  getFilteredEspers() {
    if (this.searchText !== "") {
      let text = this.searchText.toLowerCase();
      return this.espers.filter(esper => {
        return esper.name.toLowerCase().includes(text);
      });
    } else {
      return this.espers
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      this.filters[type].push(value)
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1)
    }

    this.getEspers()
  }

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) == -1) {
      return false
    } else {
      return true
    }
  }

  close() {
    this.modal.dismiss();
  }

  back() {
    this.modalStep = "select"
  }

  selectEsper(esper) {
    this.esper = this.esper = this.esperService.selectEsperForBuilder(esper.dataId, null)

    this.modalStep = "custom"
  }

  save() {
    this.modal.close(this.esper)
  }

  changeStar(value) {
    this.esper.star = value
    this.esperService.changeStar(this.esper)
  }

  changeLevel() {
    this.esperService.changeLevel(this.esper)
  }

  rightClickNode(node) {
    this.esperService.rightClickNode(node, this.esper)
  }

  clickNode(node) {
    this.esperService.clickNode(node, this.esper)
  }

  canActivateNode(node) {
    return this.esperService.canActivateNode(node, this.esper)
  }

  maxEsper() {
    this.esperService.maxEsper(this.esper)
  }
}
