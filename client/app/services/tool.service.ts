import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { NavService } from './nav.service';

@Injectable()
export class ToolService {

  private sre = /^\s+|\s+$/g;

  constructor(
    private translateService: TranslateService,
    private navService: NavService
  ) {}

  private reduceString(s: any) {
    return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  sortByName(items, order = 'asc') {
    items.sort((a: any, b: any) => {
      const x = this.reduceString(a.name && a.name !== 'New Unit' && a.name !== 'New Job' && a.name !== 'New Vision Card' && a.name !== 'New Esper' && a.name !== 'New Equipment' ? a.name : this.getName(a));
      const y = this.reduceString(b.name && b.name !== 'New Unit' && a.name !== 'New Job' && a.name !== 'New Vision Card' && a.name !== 'New Esper' && a.name !== 'New Equipment' ? b.name : this.getName(b));

      if (order === 'asc') {
        return x.localeCompare(y, 'ja');
      } else {
        return y.localeCompare(x, 'ja');
      }
    });

    return items;
  }

  getName(item) {
    if (item && item.names) {
      if (!item.names[this.translateService.currentLang]) {
        return item.names[this.translateService.getDefaultLang()].replace('<br>', ' ');
      } else {
        return item.names[this.translateService.currentLang].replace('<br>', ' ');
      }
    } else {
      return '-';
    }
  }

  sortByRarity(items, order = 'desc') {
    let rarityOrder = ['N', 'R', 'SR', 'MR', 'UR'];
    if (order === 'desc') {
      rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];
    }

    items.sort((a: any, b: any) => {
      if (rarityOrder.indexOf(a.rarity) < rarityOrder.indexOf(b.rarity)) {
        return -1;
      } else if (rarityOrder.indexOf(a.rarity) > rarityOrder.indexOf(b.rarity)) {
        return 1;
      } else {
        const x = this.reduceString(this.getName(a));
        const y = this.reduceString(this.getName(b));

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
          const nameA = this.reduceString(this.getName(a));
          const nameB = this.reduceString(this.getName(b));

          return nameA.localeCompare(nameB, 'ja');
        }
      }
    });

    return items;
  }

  sortByLastRelease(items, order = 'asc') {
    const rarityOrder = ['UR', 'MR', 'SR', 'R', 'N'];

    items.sort((a: any, b: any) => {
      const splittedDateA = a.lastRelease ? a.lastRelease.start.split('/') : order === 'asc' ? '01/01/3000'.split('/') : '01/01/1970'.split('/');
      const splittedDateB = b.lastRelease ? b.lastRelease.start.split('/') : order === 'asc' ? '01/01/3000'.split('/') : '01/01/1970'.split('/');

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
          const nameA = this.reduceString(this.getName(a));
          const nameB = this.reduceString(this.getName(b));

          return nameA.localeCompare(nameB, 'ja');
        }
      }
    });

    return items;
  }

  equal(a, b) {
    if (a && b && typeof a === 'object' && typeof b === 'object') {
      let length;
      let i;

      if (Array.isArray(a)) {
        length = a.length;
        if (length !== b.length) {
          return false;
        }

        for (i = length; i-- !== 0;) {
          if (!this.equal(a[i], b[i])) {
            return false;
          }
        }
        return true;
      }

      const keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length) {
        return false;
      }

      for (i = length; i-- !== 0;) {
        if (!Object.prototype.hasOwnProperty.call(b, keys[i])) {
          return false;
        }
      }

      for (i = length; i-- !== 0;) {
        const key = keys[i];

        if (!this.equal(a[key], b[key])) {
          return false;
        }
      }

      return true;
    }

    // true if both equals or NaN, false otherwise
    return a === b || (a !== a && b !== b);
  }

  isLimited(dataId) {
    if (dataId.split('_')[1] !== 'LW') {
      return true;
    }

    if (dataId.split('_')[0] === 'UN' && dataId.split('_')[dataId.split('_').length - 1] === '01') {
      const notSoLimited = [
        'UN_LW_P_STRN_01',
        'UN_LW_P_MONT_01',
        'UN_LW_P_HLNA_01',
        'UN_LW_P_THLA_01',
        'UN_LW_P_GRSR_01',
        'UN_LW_S_LAMA_01',
        'UN_LW_S_ARMN_01'
      ];

      if (notSoLimited.indexOf(dataId) === -1) {
        return true;
      }
    }

    const versionSpecificLimited = {
      GL: [
        'UN_LW_P_FRVA',
        'UN_LW_P_DEAN',
        'VC_LW_XMAS',
        'VC_LW_HALL',
        'VC_LW_DEAN',
        'VC_LW_ART',
        'VC_LW_MOGL',
        'VC_LW_GREEN',
        'VC_LW_KRKN',
        'UN_LW_S_MOGL',
        'UN_LW_S_KRKN',
        'UN_LW_P_SLEN',
        'VC_LW_USER1',
        'VC_LW_SLEN',
        'UN_LW_P_IBRA',
        'VC_LW_XMAS2'
      ],
      JP: [
        'UN_LW_P_FRVA',
        'UN_LW_P_THLA_01',
        'VC_LW_HOLYNIGHT',
        'VC_LW_XMAS',
        'VC_LW_HALL',
        'VC_LW_VALE1',
        'VC_LW_VALE2',
        'VC_LW_ART',
        'VC_LW_NEWYEAR',
        'VC_LW_WHITEDAY1',
        'VC_LW_APPLE',
        'VC_LW_MOGL',
        'VC_LW_KRKN',
        'UN_LW_S_MOGL',
        'UN_LW_S_KRKN',
        'UN_LW_P_SLEN',
        'UN_LW_P_IBRA',
        'VC_LW_XMAS2'
      ]
    };

    if (versionSpecificLimited[this.navService.getVersion()].indexOf(dataId) !== -1) {
      return true;
    }

    return false;
  }
}
