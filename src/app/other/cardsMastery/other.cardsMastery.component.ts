import { Component, OnInit } from '@angular/core';

import { SharedResizeDetectorComponent } from '../../shared/resizeDetector.component';

import { CardsMasteryService } from '../../services/cardsMastery.service';
import { SkillService } from '../../services/skill.service';
import { NavService } from '../../services/nav.service';
import { ToolService } from '../../services/tool.service';

@Component({
  selector: 'app-other-cardsMastery',
  templateUrl: './other.cardsMastery.component.html',
  styleUrls: ['./other.cardsMastery.component.css']
})
export class OtherCardsMasteryComponent extends SharedResizeDetectorComponent implements OnInit {
  cardsMastery = [];

  version = 'GL';

  constructor(
    private cardsMasteryService: CardsMasteryService,
    private skillService: SkillService,
    private toolService: ToolService,
    private navService: NavService
  ) {
    super(toolService);

    this.version = this.navService.getVersion();
  }

  async ngOnInit() {
    this.navService.setSEO('Card Mastery', 'List infos about card mastery');

    await this.getCardsMastery();
  }

  async getCardsMastery() {
    const result = await this.cardsMasteryService.getCardsMastery();

    for (const cardMastery of result.cardsMasteries) {
      this.manageCardMastery(cardMastery, result.cards, result.skills);
    }

    console.log(result)
  }

  manageCardMastery(cardMastery, cards, skills) {
    let formattedCardMastery = {
      card: null,
      cond: [],
      effects: []
    }

    const card = cards.find(searchedCard => searchedCard.masteryId === cardMastery.dataId);
    formattedCardMastery.card = {
      image: card.image,
      name: this.toolService.getName(card),
      rarity: card.rarity,
      slug: card.slug
    }

    formattedCardMastery.cond = cardMastery.cond;

    for (const buffId of cardMastery.buffs) {
      const skill = skills.find(searchedSkill => searchedSkill.dataId === buffId);
      for (const effect of skill.effects) {
        formattedCardMastery.effects.push(this.skillService.formatEffect(cardMastery, skill, effect, false, false, true));
      }
    }

    this.cardsMastery.push(formattedCardMastery);
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
