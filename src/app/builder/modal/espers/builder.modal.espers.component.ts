import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { TranslateService } from '../../../services/translate.service';
import { EsperService } from '../../../services/esper.service';
import { TeamService } from '../../../services/team.service';
import { NavService } from '../../../services/nav.service';
import { ToolService } from '../../../services/tool.service';

import { Esper } from '../../../entities/esper';

@Component({
  selector: 'app-builder.modal-espers',
  templateUrl: './builder.modal.espers.component.html',
  styleUrls: ['./builder.modal.espers.component.css']
})
export class BuilderModalEspersComponent extends SimpleModalComponent<null, any> implements OnInit {
  rawEspers;
  espers = [];
  star;

  searchText = '';
  filters = {
    rarity: [],
    element: [],
    cost: []
  };
  savedEspers = {};
  loadEsperId = null;
  maxStar = 0;
  firstClickOutside = false;

  buffsImage = [
    'dark_atk',
    'dark_killer',
    'dark_res',
    'earth_atk',
    'earth_killer',
    'earth_res',
    'fire_atk',
    'fire_killer',
    'fire_res',
    'ice_atk',
    'ice_killer',
    'ice_res',
    'light_atk',
    'light_killer',
    'light_res',
    'lightning_atk',
    'lightning_killer',
    'lightning_res',
    'neutral_atk',
    'neutral_killer',
    'neutral_res',
    'water_atk',
    'water_killer',
    'water_res',
    'wind_atk',
    'wind_killer',
    'wind_res',

    'magic_atk',
    'magic_res',
    'missile_atk',
    'missile_res',
    'pierce_atk',
    'pierce_res',
    'slash_atk',
    'slash_res',
    'strike_atk',
    'strike_res',
  ];

  public modalStep = 'select';
  public esper;
  public teamUnitPos;

  constructor(
    private esperService: EsperService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private toolService: ToolService
  ) {
    super();

    this.translateService.onLangChange.subscribe((event) => {
      this.translateEspers();
    });
  }

  async ngOnInit() {
    await this.getEspers();

    if (this.esper) {
      this.esper.nodes = {};
      Object.keys(this.esper.board.nodes).forEach(nodeId => {
        this.esper.nodes[nodeId] = this.esper.board.nodes[nodeId].activated ? 1 : 0;
      });

      this.esper = await this.esperService.selectEsperForBuilder(this.esper.dataId, this.esper);
      this.star = this.esper.star;
      this.maxStar = this.esper.SPs.length;
    }
  }

  async getEspers() {
    if (!this.rawEspers) {
      if (isNaN(this.teamUnitPos)) {
        this.rawEspers = await this.esperService.getEspersForListing();
      } else {
        this.rawEspers = await this.teamService.getAvailableEspers(this.teamUnitPos);
      }
    }

    this.espers = this.esperService.filterEspers(this.rawEspers, this.filters, 'rarity', 'desc', false);

    this.getFilteredEspers();
    this.translateEspers();

    this.savedEspers = this.esperService.getSavedEspers();
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.toolService.getName(esper);
    });
  }

  getFilteredEspers() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.espers.filter(esper => {
        return esper.name.toLowerCase().includes(text) || esper.slug.toLowerCase().includes(text);
      });
    } else {
      return this.espers;
    }
  }

  async filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    await this.getEspers();
  }

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      return false;
    } else {
      return true;
    }
  }

  back() {
    this.firstClickOutside = false;
    this.modalStep = 'select';
  }

  async selectEsper(esperId, customData = null, forceNewBuild = false) {
    if (!forceNewBuild && !customData && this.savedEspers[esperId] && this.savedEspers[esperId].length > 0) {
      this.loadEsperId = esperId;

      this.firstClickOutside = false;
      this.modalStep = 'load';
    } else {
      this.esper = await this.esperService.selectEsperForBuilder(esperId, customData);
      this.star = this.esper.star;
      this.maxStar = this.esper.SPs.length;

      this.modalStep = 'custom';
    }
  }

  closeButton() {
    this.result = 'close';
    this.close();
  }

  save() {
    this.result = this.esper;
    this.close();
  }

  removeEsper() {
    this.result = null;
    this.close();
  }

  updateStar() {
    this.esper.star = this.star;
    this.esperService.changeStar(this.esper);
  }

  changeLevel() {
    this.esperService.changeLevel(this.esper);
  }

  updateLevel() {
    this.esperService.changeLevel(this.esper);
  }

  rightClickNode(node) {
    this.esperService.rightClickNode(node, this.esper);
  }

  clickNode(node) {
    this.esperService.clickNode(node, this.esper);
  }

  canActivateNode(node) {
    if (this.esper instanceof Esper) {
      return this.esperService.canActivateNode(node, this.esper);
    }
  }

  maxEsper() {
    this.esperService.maxEsper(this.esper);
    this.star = this.esper.star;
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.result = 'close';
      this.close();
    }
  }
}
