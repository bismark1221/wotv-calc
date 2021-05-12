import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ToolService {

  private sre = /^\s+|\s+$/g;

  constructor(
    private translateService: TranslateService
  ) {}

  private reduceString(s: any) {
    return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  sortByName(items, order = 'asc') {
    items.sort((a: any, b: any) => {
      const x = this.reduceString(a.name && a.name !== 'New Unit' && a.name !== 'New Job' && a.name !== 'New Vision Card' && a.name !== 'New Esper' && a.name !== 'New Equipment' ? a.name : a.getName(this.translateService));
      const y = this.reduceString(b.name && b.name !== 'New Unit' && a.name !== 'New Job' && a.name !== 'New Vision Card' && a.name !== 'New Esper' && a.name !== 'New Equipment' ? b.name : b.getName(this.translateService));

      if (order === 'asc') {
        return x.localeCompare(y, 'ja');
      } else {
        return y.localeCompare(x, 'ja');
      }
    });

    return items;
  }

  sortByRarity(items, order = 'asc') {
    let rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    if (order === 'desc') {
      rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    }

    items.sort((a: any, b: any) => {
      if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
        return -1;
      } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
        return 1;
      } else {
        const x = this.reduceString(a.getName(this.translateService));
        const y = this.reduceString(b.getName(this.translateService));

        return x.localeCompare(y, 'ja');
      }
    });

    return items;
  }

  sortByReleaseDate(items, order = 'asc') {
    const rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];

    items.sort((a: any, b: any) => {
      const splittedDateA = a.releaseDate.split('/');
      const splittedDateB = b.releaseDate.split('/');

      const x = new Date(splittedDateA[2], splittedDateA[1] - 1, splittedDateA[0]);
      const y = new Date(splittedDateB[2], splittedDateB[1] - 1, splittedDateB[0]);

      if (x > y) {
        return (order === 'asc' ? 1 : -1);
      } else if (y > x) {
        return (order === 'asc' ? -1 : 1);
      } else {
        if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
          return -1;
        } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
          return 1;
        } else {
          const nameA = this.reduceString(a.getName(this.translateService));
          const nameB = this.reduceString(b.getName(this.translateService));

          return nameA.localeCompare(nameB, 'ja');
        }
      }
    });

    return items;
  }

  equal(a, b) {
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      let length, i, keys;
      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) { return false; }
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
