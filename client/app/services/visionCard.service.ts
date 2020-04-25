import { Injectable } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { VisionCard } from '../entities/visionCard';
import { default as VISION_CARDS } from '../data/visionCards.json';

@Injectable()
export class VisionCardService {
  private visionCards: VisionCard[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(private translateService: TranslateService) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortByName(visionCards: VisionCard[], translate: any): VisionCard[] {
    visionCards.sort((a: any, b: any) => {
      let x = this.i(a.name);
      let y = this.i(b.name);

      if (translate) {
        x = this.i(a.getName(translate));
        y = this.i(b.getName(translate));
      }

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
          if (xD < yD) { return -1; }
          else if (xD > yD) { return 1; }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
          this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
          this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
          if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
              return isNaN(this.oFxNcL) ? 1 : -1;
          }
          if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
              var comp = this.oFxNcL.localeCompare(this.oFyNcL);
              return comp / Math.abs(comp);
          }
          if (this.oFxNcL < this.oFyNcL) { return -1; }
          else if (this.oFxNcL > this.oFyNcL) { return 1; }
      }
    });

    return visionCards;
  }

  getVisionCards(): VisionCard[] {
    let visionCards: VisionCard[] = [];

    Object.keys(JSON.parse(JSON.stringify(VISION_CARDS))).forEach(visionCardId => {
      let visionCard = new VisionCard();
      visionCard.constructFromJson(VISION_CARDS[visionCardId], this.translateService);
      visionCards.push(visionCard);
    });

    this.visionCards = visionCards;
    return visionCards;
  }

  getVisionCardsForListing() {
    let visionCards = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };

    Object.keys(JSON.parse(JSON.stringify(VISION_CARDS))).forEach(visionCardId => {
      let visionCard = new VisionCard();
      visionCard.constructFromJson(VISION_CARDS[visionCardId], this.translateService);
      visionCards[visionCard.rarity].push(visionCard);
    });

    return visionCards;
  }

  getVisionCard(id: string): VisionCard {
    if (!this.visionCards || this.visionCards.length === 0) {
      this.getVisionCards();
    }

    return this.visionCards.find(visionCard => visionCard.dataId === id);
  }

  getVisionCardBySlug(slug: string): VisionCard {
    if (!this.visionCards || this.visionCards.length === 0) {
      this.getVisionCards();
    }

    return this.visionCards.find(visionCard => visionCard.slug === slug);
  }
}
