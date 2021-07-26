import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { EsperService } from '../services/esper.service';
import { ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';

import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';

@Component({
  selector: 'app-builder-esper',
  templateUrl: './builder.esper.component.html',
  styleUrls: ['./builder.esper.component.css']
})
export class BuilderEsperComponent implements OnInit, AfterViewInit {
  espers = [];
  esper;
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
    private modalService: NgbModal,
    private toolService: ToolService,
    private authService: AuthService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
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
          this.maxStar = this.esper.SPs.length;
          this.loadingBuild = false;
        } else {
          this.esperService.getStoredEsper(data).subscribe(async (esperData: any) => {
            if (esperData) {
              this.selectedEsperId = esperData.dataId;
              await this.selectEsper(esperData, true);
              this.esper.storeId = data;
            }
            this.loadingBuild = false;
          });
        }
      } else {
        this.esperSelector.open();
      }
    });

    this.navService.setTitle('Esper Builder');
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
      this.maxStar = this.esper.SPs.length;
      }
    } else {
      this.esper = null;
      this.maxStar = 1;
    }
  }

  changeStar(value) {
    this.esper.star = value;
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
  }

  resetEsper() {
    this.esperService.resetEsper(this.esper);
  }

  openLoadModal(esperId) {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'esper';
    modalRef.componentInstance.savedItems = this.savedEspers[esperId];
    modalRef.componentInstance.allowNew = true;

    modalRef.result.then(async result => {
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
    }, (reason) => {
    });
  }

  openSaveModal() {
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'esper';
    modalRef.componentInstance.item = this.esper;

    modalRef.result.then(result => {
      this.savedEspers = this.esperService.getSavedEspers();
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'esper';
    modalRef.componentInstance.item = this.esper;
  }
}
