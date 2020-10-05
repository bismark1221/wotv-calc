import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { EsperService } from '../services/esper.service';
import { NameService } from '../services/name.service';
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
export class BuilderEsperComponent implements OnInit {
  espers
  filteredEspers
  esper
  searchText = ""
  savedEspers = {}
  loadingBuild = false
  showSave = false
  showList = true

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

  rarityTranslate = {
    UR: "Ultra Rare",
    MR: "Mega Rare",
    SR: "Super Rare",
    R: "Rare",
    N: "Normal"
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private esperService: EsperService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private nameService: NameService,
    private authService: AuthService,
    private navService: NavService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateEspers();
    });
  }

  ngOnInit() {
    this.getEspers();

    this.activatedRoute.paramMap.subscribe((params: Params) => {
      let data = params.get('data')
      if (data) {
        this.loadingBuild = true
        this.esperService.getStoredEsper(data).subscribe(esperData => {
          if (esperData) {
            // @ts-ignore
            this.selectEsper(esperData.dataId, esperData)
          }
          this.loadingBuild = false
        })
      }
    });

    this.navService.setTitle("Esper Builder");
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedEspers = this.esperService.getSavedEspers()
      });
    })

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true
        } else {
          this.showSave = false
        }
      });
    })
  }

  private getEspers() {
    this.espers = this.formatEspers(this.esperService.getEspersForListing())
    this.updateFilteredEspers()
    this.translateEspers();

    this.savedEspers = this.esperService.getSavedEspers()
  }

  private translateEspers() {
    Object.keys(this.espers).forEach(rarity => {
      this.espers[rarity].forEach(esper => {
        esper.name = this.nameService.getName(esper)
      })
    });
  }

  private formatEspers(espers) {
    let formattedEspers = { UR: [], MR: [], SR: [], R: [], N: [] }

    espers.forEach(esper => {
      formattedEspers[esper.rarity].push(esper)
    })

    return formattedEspers
  }

  updateFilteredEspers() {
    let text = this.searchText.toLowerCase();
    this.filteredEspers = { UR: [], MR: [], SR: [], R: [], N: [] }

    Object.keys(this.espers).forEach(rarity => {
      this.filteredEspers[rarity] = this.espers[rarity].filter(esper => {
        return esper.name.toLowerCase().includes(text);
      })
    })
  }

  focusSearch() {
    if (!this.showList) {
      this.updateFilteredEspers()
      this.showList = true
    }
  }

  blurSearch() {
    if (this.esper) {
      this.searchText = this.esper.name
      this.showList = false
    }
  }

  selectEsper(dataId, customData = null) {
    if (dataId) {
      this.esper = this.esperService.selectEsperForBuilder(dataId, customData)
      this.searchText = this.esper.name
      this.showList = false
    } else {
      this.esper = null
      this.searchText = ""
      this.updateFilteredEspers()
      this.showList = true
    }
  }

  toogleList() {
    this.showList = !this.showList
  }

  changeStar(value) {
    this.esper.star = value
    this.esperService.changeStar(this.esper)
  }

  selectLevel(level) {
    this.esper.level = level
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

  resetEsper() {
    this.esperService.resetEsper(this.esper)
  }

  openLoadModal(esperId) {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'esper'
    modalRef.componentInstance.savedItems = this.savedEspers[esperId]

    modalRef.result.then(result => {
      if (result.type == 'load' && result.item) {
        this.selectEsper(result.item.dataId, result.item)
      }

      if (result.type == 'fullDelete') {
        this.savedEspers[esperId] = []
      }
    }, (reason) => {
    });
  }

  openSaveModal() {
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'esper'
    modalRef.componentInstance.item = this.esper

    modalRef.result.then(result => {
      this.savedEspers = this.esperService.getSavedEspers()
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'esper'
    modalRef.componentInstance.item = this.esper
  }
}
