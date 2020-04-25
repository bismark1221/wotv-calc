import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { VisionCardService } from '../services/visionCard.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  private visionCards;
  private formattedVisionCards = {};

  constructor(
    private visionCardService: VisionCardService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getCards();
  }

  private getCards(): void {
    this.visionCards = this.visionCardService.getVisionCardsForListing();

    Object.keys(this.visionCards).forEach(rarity => {
      this.visionCardService.sortByName(this.visionCards[rarity], this.translateService)

      this.formattedVisionCards[rarity] = [];
      let tableIndex = -1;
      this.visionCards[rarity].forEach((card, index) => {
        if (index % 4 === 0) {
          tableIndex++;
          this.formattedVisionCards[rarity][tableIndex] = [];
        }

        this.formattedVisionCards[rarity][tableIndex].push(card)
      });
    });
  }
}
