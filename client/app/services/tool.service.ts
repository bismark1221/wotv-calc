import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToolService {

  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(
    private translateService: TranslateService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  sortByName(items, order = 'asc') {
    items.sort((a: any, b: any) => {
      const x = this.i(a.getName(this.translateService));
      const y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
        if (xD < yD) {
          return order == 'asc' ? -1 : 1;
        } else if (xD > yD) {
          return order == 'asc' ? 1 : -1;
        }
      }

      for (let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
        this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
        if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
          if (isNaN(this.oFxNcL)) {
            return order == 'asc' ? 1 : -1;
          } else {
            return order == 'asc' ? -1 : 1;
          }
        }

        if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
          const comp = this.oFxNcL.localeCompare(this.oFyNcL);
          return comp / Math.abs(comp);
        }

        if (this.oFxNcL < this.oFyNcL) {
          return order == 'asc' ? -1 : 1;
        } else if (this.oFxNcL > this.oFyNcL) {
          return order == 'asc' ? 1 : -1;
        }
      }
    });

    return items;
  }

  sortByRarity(items, order = 'asc') {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    if (order == 'desc') {
      rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    }

    items.sort((a: any, b: any) => {
      if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
        return -1;
      } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
        return 1;
      } else {
        const x = this.i(a.getName(this.translateService));
        const y = this.i(b.getName(this.translateService));

        const xN = x.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
        const yN = y.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');

        const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
        const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

        if (yD) {
            if (xD < yD) { return -1; } else if (xD > yD) { return 1; }
        }

        for (let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
            this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
            this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
            if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
                return isNaN(this.oFxNcL) ? 1 : -1;
            }
            if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
                const comp = this.oFxNcL.localeCompare(this.oFyNcL);
                return comp / Math.abs(comp);
            }
            if (this.oFxNcL < this.oFyNcL) { return -1; } else if (this.oFxNcL > this.oFyNcL) { return 1; }
        }
      }
    });

    return items;
  }

  equal(a, b) {
    if (a && b && typeof a == 'object' && typeof b == 'object') {
      let length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length != b.length) { return false; }
        for (i = length; i-- !== 0;) {
          if (!this.equal(a[i], b[i])) { return false; }
        }
        return true;
      }

      keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) { return false; }

      for (i = length; i-- !== 0;) {
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) { return false; }
      }

      for (i = length; i-- !== 0;) {
        const key = keys[i];

        if (!this.equal(a[key], b[key])) { return false; }
      }

      return true;
    }

    // true if both equals or NaN, false otherwise
    return a === b || (a !== a && b !== b);
  }
}
