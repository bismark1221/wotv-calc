import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CardService } from '../services/card.service';
import { SkillService } from '../services/skill.service';

@Component({
  selector: 'app-builder-card',
  templateUrl: './builder.card.component.html',
  styleUrls: ['./builder.card.component.css']
})
export class BuilderCardComponent implements OnInit {
  @Input() public card;
  @Input() public fromUnitBuilder = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  selectedId
  cards

  constructor(
    private cardService: CardService,
    private translateService: TranslateService,
    private skillService: SkillService,
    private modalService: NgbModal
  ) {
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getCards();
    });
  }

  ngOnInit(): void {
    this.getCards();
  }

  private getCards() {
    this.cards = this.cardService.getCardsForBuilder(this.translateService);
    this.cards = [...this.cards];
  }

  selectCard() {
    if (this.selectedId) {
      this.card = this.cardService.selectCardForBuilder(this.selectedId)
    } else {
      this.card = null
    }
  }

  changeStar(value) {
    if (value == this.card.star) {
      value = undefined
    }

    this.card.star = value
    this.cardService.changeStar()
  }

  changeLevels() {
    this.cardService.changeLevel()
  }

  save() {
    this.cardService.saveCard(this.card)
  }

  maxCard() {
    this.cardService.maxCard()
  }

  maxLevel() {
    this.cardService.maxLevel()
  }

  close() {
    this.modalService.dismissAll();
  }
}
