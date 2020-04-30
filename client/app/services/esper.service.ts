import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Esper } from '../entities/esper';
import { default as ESPERS } from '../data/espers.json';

@Injectable()
export class EsperService {
  private espers: Esper[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  private espersRarity = {
    N: [],
    R: [],
    SR: [
      "UN_LW_S_BOMB",
      "UN_LW_S_CACT",
      "UN_LW_S_ARMN_01",
      "UN_LW_S_OGRE",
      "UN_LW_S_ZUUU"
    ],
    MR: [
      "UN_LW_S_BHMT",
      "UN_LW_S_IGNT",
      "UN_LW_S_MABR"
    ],
    UR: [
      "UN_LW_S_IFRT",
      "UN_LW_S_GLEM",
      "UN_LW_S_RAMU",
      "UN_LW_S_SHIV",
      "UN_LW_S_SIRE"
    ]
  }

  constructor(private translateService: TranslateService) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortByName(espers: Esper[], translate: any): Esper[] {
    espers.sort((a: any, b: any) => {
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

    return espers;
  }

  getEspers(): Esper[] {
    let espers: Esper[] = [];

    Object.keys(JSON.parse(JSON.stringify(ESPERS))).forEach(esperId => {
      let esper = new Esper();
      esper.constructFromJson(ESPERS[esperId], this.translateService);
      espers.push(esper);
    });

    this.espers = espers;
    return espers;
  }

  getEspersForListing() {
    let espers = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };

    Object.keys(JSON.parse(JSON.stringify(ESPERS))).forEach(esperId => {
      let esper = new Esper();
      esper.constructFromJson(ESPERS[esperId], this.translateService);
      espers[this.findRarity(esper)].push(esper);
    });

    return espers;
  }

  findRarity(esper) {
    let rarity = "N";
    Object.keys(this.espersRarity).forEach(rarityType => {
      if (this.espersRarity[rarityType].indexOf(esper.dataId) !== -1) {
        rarity = rarityType
      }
    })

    return rarity;
  }

  getEsperBySlug(slug: string): Esper {
    if (!this.espers || this.espers.length === 0) {
      this.getEspers();
    }

    return this.espers.find(esper => esper.slug === slug);
  }

  getEsper(id: string): Esper {
    if (!this.espers || this.espers.length === 0) {
      this.getEspers();
    }

    return this.espers.find(esper => esper.dataId === id);
  }
}
