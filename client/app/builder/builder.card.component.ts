import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalService } from 'ngx-simple-modal';
import { ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { ToolService } from '../services/tool.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';
import { SkillService } from '../services/skill.service';
import { JobService } from '../services/job.service';
import { UnitService } from '../services/unit.service';

import { ModalLoadComponent } from './modal/modal.load.component';
import { ModalSaveComponent } from './modal/modal.save.component';
import { ModalLinkComponent } from './modal/modal.link.component';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder.card.component.html',
  styleUrls: ['./builder.card.component.css']
})
export class BuilderCardComponent implements OnInit, AfterViewInit {
  cards = [];
  rawCards = [];
  card;
  savedCards = {};
  loadingBuild = false;
  showSave = false;
  selectedCardId = null;

  showOnlyOtherVersion = false;

  @ViewChild('selectBuilderCard') cardSelector;

  rarityTranslate = {
    UR: 'Ultra Rare',
    MR: 'Mega Rare',
    SR: 'Super Rare',
    R: 'Rare',
    N: 'Normal'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private simpleModalService: SimpleModalService,
    private toolService: ToolService,
    private authService: AuthService,
    private navService: NavService,
    private skillService: SkillService,
    private jobService: JobService,
    private unitService: UnitService
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  async ngOnInit() {
    await this.getCards();

    this.activatedRoute.paramMap.subscribe(async (params: Params) => {
      const data = params.get('data');
      if (data) {
        this.loadingBuild = true;

        const card = await this.cardService.selectCardForBuilder(null, false, data);

        if (card) {
          this.selectedCardId = card.dataId;
          this.card = card;
          this.formatCardBuffs();
          this.loadingBuild = false;
        } else {
          const cardData = await this.cardService.getStoredCard(data);
          if (cardData) {
            this.selectedCardId = cardData.dataId;
            await this.selectCard(cardData, true);
            this.card.storeId = data;
          }
          this.loadingBuild = false;
        }
      } else {
        this.cardSelector.open();
      }
    });

    this.navService.setTitle('Card Builder');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.savedCards = this.cardService.getSavedCards();
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

  private async getCards() {
    this.rawCards = await this.cardService.getCardsForBuilder();
    this.translateCards();
    this.filterCards();
    this.savedCards = this.cardService.getSavedCards();
  }

  private translateCards() {
    this.rawCards.forEach(card => {
      card.name = this.toolService.getName(card);
    });
  }

  private filterCards() {
    this.cards = [];
    for (const card of this.rawCards) {
      if ((this.showOnlyOtherVersion && card.fromOtherVersion)
        || (!this.showOnlyOtherVersion && !card.fromOtherVersion)
      ){
        this.cards.push(card);
      }
    }
  }

  async selectCard(customData = null, fromModal = false) {
    if (this.selectedCardId) {
      if (!fromModal && this.savedCards[this.selectedCardId] && this.savedCards[this.selectedCardId].length > 0) {
        this.openLoadModal(this.selectedCardId);
        this.cardSelector.handleClearClick();
      } else {
        this.card = await this.cardService.selectCardForBuilder(this.selectedCardId, customData);
        this.formatCardBuffs();
      }
    } else {
      this.card = null;
    }
  }

  async changeStar(value) {
    if (value === this.card.star) {
      value = undefined;
    }

    this.card.star = value;
    this.cardService.changeStar(this.card);
    this.formatCardBuffs();
  }

  async updateLevel(level) {
    this.cardService.changeLevel(this.card);
    this.formatCardBuffs();
  }

  async maxCard() {
    this.cardService.maxCard(this.card);
    this.formatCardBuffs();
  }

  async resetCard() {
    this.cardService.resetCard(this.card);
    this.formatCardBuffs();
  }

  private formatCardBuffs() {
    this.card.formattedBuffs = {
      self: [],
      party: []
    };

    const buffTypes = ['self', 'party'];

    for (const buffType of buffTypes) {
      for (const statType of Object.keys(this.card.buffs[buffType])) {
        for (const buff of this.card.buffs[buffType][statType]) {
          const formattedEffect = {
            type: statType,
            value: buff.value,
            calcType: buff.calcType
          };

          const formattedBuff = {
            effect: this.skillService.formatEffect(this.card, {}, formattedEffect),
            cond: buff.cond
          };

          if (formattedBuff.cond) {
            for (const cond of formattedBuff.cond) {
              if (cond.type === 'mainJob') {
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  if (jobId && !jobId.dataId) {
                    const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
                    cond.items[jobIndex] = job ? job : cond.items[jobIndex];
                  }
                }
              } else if (cond.type === 'job') {
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  if (jobId && !jobId.dataId) {
                    const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
                    cond.items[jobIndex] = job ? job : cond.items[jobIndex];
                  }
                }
              } else if (cond.type === 'unit') {
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  if (unitId && !unitId.dataId) {
                    const unit = this.card.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId);
                    cond.items[unitIndex] = unit ? unit : cond.items[unitIndex];
                  }
                }
              }
            }
          }

          this.card.formattedBuffs[buffType].push(formattedBuff);
        }
      }
    }

    for (const skill of this.card.skills) {
      if (skill.cond) {
        for (const cond of skill.cond) {
          if (cond.type === 'job') {
            for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
              const jobId = cond.items[jobIndex];
              if (jobId && !jobId.dataId) {
                const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
                cond.items[jobIndex] = job ? job : cond.items[jobIndex];
              }
            }
          } else if (cond.type === 'mainJob') {
            for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
              const jobId = cond.items[jobIndex];
              if (jobId && !jobId.dataId) {
                const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
                cond.items[jobIndex] = job ? job : cond.items[jobIndex];
              }
            }
          } else if (cond.type === 'unit') {
            for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
              const unitId = cond.items[unitIndex];
              if (unitId && !unitId.dataId) {
                const unit = this.card.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId);
                cond.items[unitIndex] = unit ? unit : cond.items[unitIndex];
              }
            }
          }
        }
      }
    }
  }

  openLoadModal(cardId) {
    const modalRef = this.modalService.open(ModalLoadComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'card';
    modalRef.componentInstance.savedItems = this.savedCards[cardId];
    modalRef.componentInstance.allowNew = true;

    modalRef.result.then(async result => {
      if (result.type === 'new') {
        this.selectedCardId = cardId;
        await this.selectCard(null, true);
      }

      if (result.type === 'load' && result.item) {
        this.selectedCardId = result.item.dataId;
        await this.selectCard(result.item, true);
      }

      if (result.type === 'fullDelete') {
        this.savedCards[cardId] = [];
      }
    }, (reason) => {
    });
  }

  openSaveModal() {
    this.simpleModalService.addModal(ModalSaveComponent, { type: 'card', item: this.card })
      .subscribe((isSaved) => {
        if (isSaved) {
          this.savedCards = this.cardService.getSavedCards();
        }
      });
  }

  openLinkModal() {
    this.simpleModalService.addModal(ModalLinkComponent, { type: 'card', item: this.card });
  }

  toggleOtherVersion() {
    this.showOnlyOtherVersion = !this.showOnlyOtherVersion;

    this.filterCards();
  }
}
