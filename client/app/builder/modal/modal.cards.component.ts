import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { CardService } from '../../services/card.service';
import { TeamService } from '../../services/team.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';
import { SkillService } from '../../services/skill.service';
import { JobService } from '../../services/job.service';
import { UnitService } from '../../services/unit.service';

@Component({
  selector: 'app-modal-cards',
  templateUrl: './modal.cards.component.html',
  styleUrls: ['./modal.cards.component.css']
})
export class ModalCardsComponent extends SimpleModalComponent<null, any> implements OnInit {
  rawCards;
  cards = [];
  star;
  firstClickOutside = false;

  searchText = '';
  filters = {
    rarity: [],
    element: [],
    cost: []
  };
  savedCards = {};
  loadCardId = null;

  showOnlyOtherVersion = false;

  public modalStep = 'select';
  public cardType = 'main';
  public card;
  public teamUnitPos;

  constructor(
    private cardService: CardService,
    private teamService: TeamService,
    private translateService: TranslateService,
    private toolService: ToolService,
    private skillService: SkillService,
    private jobService: JobService,
    private unitService: UnitService
  ) {
    super();

    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.translateCards();
    });
  }

  async ngOnInit() {
    this.getCards();

    if (this.card) {
      this.card = await this.cardService.selectCardForBuilder(this.card.dataId, this.card);
      this.star = this.card.star;
      this.formatCardBuffs();
    }
  }

  async getCards() {
    if (!this.rawCards) {
      if (isNaN(this.teamUnitPos)) {
        this.rawCards = await this.unitService.getAvailableCards(this.cardType);
      } else {
        this.rawCards = await this.teamService.getAvailableCards(this.teamUnitPos, this.cardType);
      }
    }

    const filteredCards = this.cardService.filterCards(this.rawCards, this.filters, 'rarity', 'desc', true);

    this.cards = [];
    for (const card of filteredCards) {
      if ((this.showOnlyOtherVersion && card.fromOtherVersion)
        || (!this.showOnlyOtherVersion && !card.fromOtherVersion)
      ){
        this.cards.push(card);
      }
    }

    this.getFilteredCards();
    this.translateCards();

    this.savedCards = this.cardService.getSavedCards();
  }

  private translateCards() {
    this.cards.forEach(card => {
      card.name = this.toolService.getName(card);
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

  back() {
    this.firstClickOutside = false;
    this.modalStep = 'select';
  }

  async selectCard(cardId, customData = null, forceNewBuild = false) {
    if (!forceNewBuild && !customData && this.savedCards[cardId] && this.savedCards[cardId].length > 0) {
      this.loadCardId = cardId;

      this.firstClickOutside = false;
      this.modalStep = 'load';
    } else {
      this.card = await this.cardService.selectCardForBuilder(cardId, customData);
      this.star = this.card.star;
      this.formatCardBuffs();

      this.modalStep = 'custom';
    }
  }

  closeButton() {
    this.result = 'close';
    this.close();
  }

  save() {
    this.result = this.card;
    this.close();
  }

  removeCard() {
    this.result = null;
    this.close();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.result = 'close';
      this.close();
    }
  }

  async updateStar() {
    if (this.star === this.card.star) {
      this.star = undefined;
    }

    this.card.star = this.star;
    this.cardService.changeStar(this.card);
    this.formatCardBuffs();
  }

  async updateLevel() {
    this.cardService.changeLevel(this.card);
    this.formatCardBuffs();
  }

  async maxCard() {
    this.cardService.maxCard(this.card);
    this.star = this.card.star;
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
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
                  cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
                }
              } else if (cond.type === 'job') {
                cond.formattedItems = [];
                for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
                  const jobId = cond.items[jobIndex];
                  const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
                  cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
                }
              } else if (cond.type === 'unit') {
                cond.formattedItems = [];
                for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
                  const unitId = cond.items[unitIndex];
                  const unit = this.card.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId);
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
              const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
              cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
            }
          } else if (cond.type === 'job') {
            cond.formattedItems = [];
            for (let jobIndex = 0; jobIndex <= cond.items.length - 1; jobIndex++) {
              const jobId = cond.items[jobIndex];
              const job = this.card.rawJobs.find(searchedJob => searchedJob.dataId === jobId);
              cond.formattedItems[jobIndex] = job ? job : cond.items[jobIndex];
            }
          } else if (cond.type === 'unit') {
            cond.formattedItems = [];
            for (let unitIndex = 0; unitIndex <= cond.items.length - 1; unitIndex++) {
              const unitId = cond.items[unitIndex];
              const unit = this.card.rawUnits.find(searchedUnit => searchedUnit.dataId === unitId);
              cond.formattedItems[unitIndex] = unit ? unit : cond.items[unitIndex];
            }
          }
        }
      }
    }
  }

  toggleOtherVersion() {
    this.showOnlyOtherVersion = !this.showOnlyOtherVersion;

    this.getCards();
  }

  checkNan(value) {
    return isNaN(value);
  }
}
