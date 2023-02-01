import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';

import { TranslateService } from '../../services/translate.service';
import { EsperService } from '../../services/esper.service';
import { ToolService } from '../../services/tool.service';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

import { BuilderModalLoadComponent } from '../modal/load/builder.modal.load.component';
import { BuilderModalSaveComponent } from '../modal/save/builder.modal.save.component';
import { SharedLinkModalComponent } from '../../shared/linkModal/shared.linkModal.component';

@Component({
  selector: 'app-builder-esper',
  templateUrl: './builder.esper.component.html',
  styleUrls: ['./builder.esper.component.css']
})
export class BuilderEsperComponent implements OnInit, AfterViewInit {
  espers = [];
  esper;
  star;
  savedEspers = {};
  loadingBuild = false;
  showSave = false;
  maxStar = 1;
  selectedEsperId = null;

  @ViewChild('selectBuilderEsper') esperSelector;

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

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private esperService: EsperService,
    private translateService: TranslateService,
    private simpleModalService: SimpleModalService,
    private toolService: ToolService,
    private authService: AuthService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event) => {
      this.translateEspers();
    });
  }

  async ngOnInit() {
    await this.getEspers();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        this.loadingBuild = true;

        const esper = await this.esperService.selectEsperForBuilder(null, false, data);

        if (esper) {
          this.selectedEsperId = esper.dataId;
          this.esper = esper;
          this.star = this.esper.star;
          this.maxStar = this.esper.SPs.length;
          this.loadingBuild = false;
        } else {
          const esperData = await this.esperService.getStoredEsper(data);
          if (esperData) {
            this.selectedEsperId = esperData.dataId;
            await this.selectEsper(esperData, true);
            this.esper.storeId = data;
          }
          this.loadingBuild = false;
        }
      } else {
        this.esperSelector.open();
      }
    });

    this.navService.setSEO('Esper Builder', 'Build your esper to see the result before using all your resources in-game. Save them to use them in the unit and team builders.');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedEspers = this.esperService.getSavedEspers();
      });
    });

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      });
    });
  }

  private async getEspers() {
    this.espers = await this.esperService.getEspersForBuilder();
    this.savedEspers = this.esperService.getSavedEspers();
    this.translateEspers();
  }

  private translateEspers() {
    this.espers.forEach(esper => {
      esper.name = this.toolService.getName(esper);
    });
  }

  async selectEsper(customData = null, fromModal = false) {
    if (this.selectedEsperId) {
      if (!fromModal && this.savedEspers[this.selectedEsperId] && this.savedEspers[this.selectedEsperId].length > 0) {
        this.openLoadModal(this.selectedEsperId);
        this.esperSelector.handleClearClick();
      } else {
        this.esper = await this.esperService.selectEsperForBuilder(this.selectedEsperId, customData);
        this.star = this.esper.star;
        this.maxStar = this.esper.SPs.length;
      }
    } else {
      this.esper = null;
      this.maxStar = 1;
    }
  }

  updateStar() {
    this.esper.star = this.star;
    this.esperService.changeStar(this.esper);
  }

  updateLevel(level) {
    this.esperService.changeLevel(this.esper);
  }

  rightClickNode(node) {
    this.esperService.rightClickNode(node, this.esper);
  }

  clickNode(node) {
    this.esperService.clickNode(node, this.esper);
  }

  canActivateNode(node) {
    return this.esperService.canActivateNode(node, this.esper);
  }

  maxEsper() {
    this.esperService.maxEsper(this.esper);
    this.star = this.esper.star;
  }

  resetEsper() {
    this.esperService.resetEsper(this.esper);
    this.star = this.esper.star;
  }

  openLoadModal(esperId) {
    this.simpleModalService.addModal(BuilderModalLoadComponent, { type: 'esper', savedItems: this.savedEspers[esperId], allowNew: true })
      .subscribe(async (result) => {
        if (result.type === 'new') {
          this.selectedEsperId = esperId;
          await this.selectEsper(null, true);
        }

        if (result.type === 'load' && result.item) {
          this.selectedEsperId = result.item.dataId;
          await this.selectEsper(result.item, true);
        }

        if (result.type === 'fullDelete') {
          this.savedEspers[esperId] = [];
        }
      });
  }

  openSaveModal() {
    this.simpleModalService.addModal(BuilderModalSaveComponent, { type: 'esper', item: this.esper })
      .subscribe((isSaved) => {
        if (isSaved) {
          this.savedEspers = this.esperService.getSavedEspers();
        }
      });
  }

  openLinkModal() {
    this.simpleModalService.addModal(SharedLinkModalComponent, { type: 'esper', item: this.esper });
  }
}
