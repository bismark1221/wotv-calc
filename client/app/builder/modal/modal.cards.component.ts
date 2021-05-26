import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../../services/card.service';
import { TeamService } from '../../services/team.service';
import { NavService } from '../../services/nav.service';
import { NameService } from '../../services/name.service';
import { SkillService } from '../../services/skill.service';
import { JobService } from '../../services/job.service';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-modal-cards',
  templateUrl: './modal.cards.component.html',
  styleUrls: ['./modal.cards.component.css']
})
export class ModalCardsComponent implements OnInit {
  cards = [];

  searchText = '';
  filters = {
    rarity: [],
    element: [],
    cost: []
  };
  savedCards = {};
  loadCardId = null;

  @Input() public modalStep = 'select';
  @Input() public card;
  @Input() public teamUnitPos;

  constructor(
    private cardService: CardService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private nameService: NameService,
    private skillService: SkillService,
    private jobService: JobService,
    private unitService: UnitService,
    private modal: NgbActiveModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  async ngOnInit() {
    this.getCards();

    if (this.card) {
      this.card = await this.cardService.selectCardForBuilder(this.card.dataId, this.card);
      await this.formatCardBuffs();
    }
  }

  async getCards() {
    if (isNaN(this.teamUnitPos)) {
      this.cards = await this.cardService.getCardsForListing(this.filters);
    } else {
      this.cards = await this.teamService.getAvailableCards(this.teamUnitPos, this.filters);
    }

    this.getFilteredCards();
    this.translateCards();

    this.savedCards = this.cardService.getSavedCards();
  }

  private translateCards() {
    this.cards.forEach(card => {
      card.name = this.nameService.getName(card);
    });
  }

  getFilteredCards() {
    if (this.searchText !== '') {
      const text = this.searchText.toLowerCase();
      return this.cards.filter(card => {
        return card.name.toLowerCase().includes(text) || card.slug.toLowerCase().includes(text);
      });
    } else {
      return this.cards;
    }
  }

  filterList(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      this.filters[type].push(value);
    } else {
      this.filters[type].splice(this.filters[type].indexOf(value), 1);
    }

    this.getCards();
  }

  isFilterSelected(type, value) {
    if (this.filters[type].indexOf(value) === -1) {
      return false;
    } else {
      return true;
    }
  }

  close() {
    this.modal.dismiss();
  }

  back() {
    this.modalStep = 'select';
  }

  async selectCard(cardId, customData = null, forceNewBuild = false) {
    if (!forceNewBuild && !customData && this.savedCards[cardId] && this.savedCards[cardId].length > 0) {
      this.loadCardId = cardId;

      this.modalStep = 'load';
    } else {
      this.card = await this.cardService.selectCardForBuilder(cardId, customData);
      await this.formatCardBuffs();

      this.modalStep = 'custom';
    }
  }

  save() {
    this.modal.close(this.card);
  }

  removeCard() {
    this.modal.close(null);
  }

  async changeStar(value) {
    if (value === this.card.star) {
      value = undefined;
    }

    this.card.star = value;
    this.cardService.changeStar(this.card);
    await this.formatCardBuffs();
  }

  async updateLevel() {
    this.cardService.changeLevel(this.card);
    await this.formatCardBuffs();
  }

  async maxCard() {
    this.cardService.maxCard(this.card);
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
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  const job = await this.jobService.getJob(jobId);
                  cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
                }
              } else if (cond.type === 'job') {
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  const job = await this.jobService.getJob(jobId);
                  cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
                }
              } else if (cond.type === 'unit') {
                cond.formattedItems = [];
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  const unit = await this.unitService.getUnit(unitId);
                  cond.formattedItems[unitIndex] = unit ? unit : cond.items[unitIndex];
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
          if (cond.type === 'mainJob') {
            cond.formattedItems = [];
            for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
              const jobId = cond.items[jobIndex];
              const job = await this.jobService.getJob(jobId);
              cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
            }
          } else if (cond.type === 'job') {
            cond.formattedItems = [];
            for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
              const jobId = cond.items[jobIndex];
              const job = await this.jobService.getJob(jobId);
              cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
            }
          } else if (cond.type === 'unit') {
            cond.formattedItems = [];
            for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
              const unitId = cond.items[unitIndex];
              const unit = await this.unitService.getUnit(unitId);
              cond.formattedItems[unitIndex] = unit ? unit : cond.items[unitIndex];
            }
          }
        }
      }
    }
  }
}
