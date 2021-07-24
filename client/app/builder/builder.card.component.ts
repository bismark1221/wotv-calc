import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Params } from '@angular/router';

import { CardService } from '../services/card.service';
import { NameService } from '../services/name.service';
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
  filteredCards = {};
  card;
  searchText = '';
  savedCards = {};
  loadingBuild = false;
  showSave = false;
  showList = true;
  selectedCardId = null;

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
    private nameService: NameService,
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

        const card = await this.cardService.getCardBySlug(data);
        if (card) {
          await this.selectCard(card.dataId);
        } else {
          this.cardService.getStoredCard(data).subscribe(async cardData => {
            if (cardData) {
              // @ts-ignore
              await this.selectCard(cardData.dataId, cardData);
              this.card.storeId = data;
            }
          });
        }

        this.loadingBuild = false;
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
    this.cards = await this.cardService.getCardsForBuilder();
    this.translateCards();

    this.savedCards = this.cardService.getSavedCards();
  }

  private translateCards() {
    this.cards.forEach(card => {
      card.name = this.nameService.getName(card);
    });
  }

  async selectCard(customData = null, fromModal = false) {
    if (this.selectedCardId) {
      if (!fromModal && this.savedCards[this.selectedCardId] && this.savedCards[this.selectedCardId].length > 0) {
        this.openLoadModal(this.selectedCardId);
        this.cardSelector.handleClearClick()
      } else {
        this.card = await this.cardService.selectCardForBuilder(this.selectedCardId, customData);
        this.searchText = this.card.name;
        this.showList = false;
        await this.formatCardBuffs();
      }
    } else {
      this.card = null;
      this.searchText = '';
      this.showList = true;
    }
  }

  toogleList() {
    this.showList = !this.showList;
  }

  async changeStar(value) {
    if (value === this.card.star) {
      value = undefined;
    }

    this.card.star = value;
    this.cardService.changeStar(this.card);
    await this.formatCardBuffs();
  }

  async updateLevel(level) {
    this.cardService.changeLevel(this.card);
    await this.formatCardBuffs();
  }

  async maxCard() {
    this.cardService.maxCard(this.card);
    await this.formatCardBuffs();
  }

  async resetCard() {
    this.cardService.resetCard(this.card);
    await this.formatCardBuffs();
  }

  private async formatCardBuffs() {
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
                    const job = await this.jobService.getJob(jobId);
                    cond.items[jobIndex] = job ? job : cond.items[jobIndex];
                  }
                }
              } else if (cond.type === 'job') {
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  if (jobId && !jobId.dataId) {
                    const job = await this.jobService.getJob(jobId);
                    cond.items[jobIndex] = job ? job : cond.items[jobIndex];
                  }
                }
              } else if (cond.type === 'unit') {
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  if (unitId && !unitId.dataId) {
                    const unit = await this.unitService.getUnit(unitId);
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
                const job = await this.jobService.getJob(jobId);
                cond.items[jobIndex] = job ? job : cond.items[jobIndex];
              }
            }
          } else if (cond.type === 'mainJob') {
            for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
              const jobId = cond.items[jobIndex];
              if (jobId && !jobId.dataId) {
                const job = await this.jobService.getJob(jobId);
                cond.items[jobIndex] = job ? job : cond.items[jobIndex];
              }
            }
          } else if (cond.type === 'unit') {
            for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
              const unitId = cond.items[unitIndex];
              if (unitId && !unitId.dataId) {
                const unit = await this.unitService.getUnit(unitId);
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

    modalRef.result.then(async result => {
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
    const modalRef = this.modalService.open(ModalSaveComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'card';
    modalRef.componentInstance.item = this.card;

    modalRef.result.then(result => {
      this.savedCards = this.cardService.getSavedCards();
    }, (reason) => {
    });
  }

  openLinkModal() {
    const modalRef = this.modalService.open(ModalLinkComponent, { windowClass: 'builder-modal' });

    modalRef.componentInstance.type = 'card';
    modalRef.componentInstance.item = this.card;
  }
}
