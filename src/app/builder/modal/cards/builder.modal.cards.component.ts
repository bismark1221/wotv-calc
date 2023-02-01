import { Component, OnInit, Input } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { TranslateService } from '../../../services/translate.service';
import { CardService } from '../../../services/card.service';
import { TeamService } from '../../../services/team.service';
import { NavService } from '../../../services/nav.service';
import { ToolService } from '../../../services/tool.service';
import { SkillService } from '../../../services/skill.service';
import { JobService } from '../../../services/job.service';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-builder-modal-cards',
  templateUrl: './builder.modal.cards.component.html',
  styleUrls: ['./builder.modal.cards.component.css']
})
export class BuilderModalCardsComponent extends SimpleModalComponent<null, any> implements OnInit {
  rawCards;
  cards = [];
  rawJobs = [];
  star;
  firstClickOutside = false;

  searchText = '';
  filters = {
    rarity: [],
    element: [],
    cost: [],
    weapon: [],
    weaponsGroup: []
  };
  isWeaponChecked = [];
  isWeaponsGroupChecked = [];

  savedCards = {};
  loadCardId = null;

  showOnlyOtherVersion = false;

  collapsedWeaponType = true;

  weapons = [
    {
      id: 'AXE',
      label: 'AXE'
    },
    {
      id: 'BOOK',
      label: 'BOOK'
    },
    {
      id: 'BOOMERANG',
      label: 'BOOMERANG'
    },
    {
      id: 'BOW',
      label: 'BOW'
    },
    {
      id: 'DAGGER',
      label: 'DAGGER'
    },
    {
      id: 'FIST',
      label: 'FIST'
    },
    {
      id: 'GLOVE',
      label: 'GLOVE'
    },
    {
      id: 'GREATSWORD',
      label: 'GREAT SWORD'
    },
    {
      id: 'GUN',
      label: 'GUN'
    },
    {
      id: 'KATANA',
      label: 'KATANA'
    },
    {
      id: 'MACE',
      label: 'MACE'
    },
    {
      id: 'NINJABLADE',
      label: 'NINJA BLADE'
    },
    {
      id: 'SHURIKEN',
      label: 'SHURIKEN'
    },
    {
      id: 'SPEAR',
      label: 'SPEAR'
    },
    {
      id: 'ROD',
      label: 'STAFF'
    },
    {
      id: 'SWORD',
      label: 'SWORD'
    }
  ];

  weaponsGroups = [
    {
      id: 'SWORDA',
      label: 'Sword (Red Mage, etc)'
    },
    {
      id: 'SWORDB',
      label: 'Sword (Warrior, etc)'
    },
    {
      id: 'SWORDC',
      label: 'Sword (Knight, etc)'
    },
    {
      id: 'STAFFA',
      label: 'Staff (Black Mage, etc)'
    },
    {
      id: 'STAFFB',
      label: 'Staff (Devout, etc)'
    }
  ];

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

    this.translateService.onLangChange.subscribe((event) => {
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
        const apiResult = await this.unitService.getAvailableCards(this.cardType);
        this.rawCards = apiResult.cards;
        this.rawJobs = apiResult.rawJobs;
      } else {
        const apiResult = await this.teamService.getAvailableCards(this.teamUnitPos, this.cardType);
        this.rawCards = apiResult.cards;
        this.rawJobs = apiResult.rawJobs;
      }
    }

    const filteredCards = this.cardService.filterCardsWithApi(this.rawCards, this.filters, this.rawJobs, 'rarity', 'desc', false, true);

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

  toogleWeaponFilter() {
    this.firstClickOutside = false;
    this.collapsedWeaponType = !this.collapsedWeaponType;
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
    this.firstClickOutside = false;
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
            calcType: buff.calcType,
            condition: buff.condition,
            buffOnCondition: buff.buffOnCondition
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
