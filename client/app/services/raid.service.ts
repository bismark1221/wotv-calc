import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Raid } from '../entities/raid';
import GL_RAIDS from '../data/gl/raids.json';
import JP_RAIDS from '../data/jp/raids.json';
import { NavService } from './nav.service';

@Injectable()
export class RaidService {
  private raids: Raid[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;
  private savedVersion = null;

  raid;

  constructor(
    private translateService: TranslateService,
    private navService: NavService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l === 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  sortByName(raids, order = 'asc') {
    raids.sort((a: any, b: any) => {
      const x = this.i(a.getName(this.translateService));
      const y = this.i(b.getName(this.translateService));

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
        if (xD < yD) {
          return order === 'asc' ? -1 : 1;
        } else if (xD > yD) {
          return order === 'asc' ? 1 : -1;
        }
      }

      for (let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
        this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
        this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
        if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
          if (isNaN(this.oFxNcL)) {
            return order === 'asc' ? 1 : -1;
          } else {
            return order === 'asc' ? -1 : 1;
          }
        }

        if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
          const comp = this.oFxNcL.localeCompare(this.oFyNcL);
          return comp / Math.abs(comp);
        }

        if (this.oFxNcL < this.oFyNcL) {
          return order === 'asc' ? -1 : 1;
        } else if (this.oFxNcL > this.oFyNcL) {
          return order === 'asc' ? 1 : -1;
        }
      }
    });

    return raids;
  }

  private getRaw() {
    this.savedVersion = JSON.parse(JSON.stringify(this.navService.getVersion()));
    if (this.savedVersion === 'GL') {
      return GL_RAIDS;
    } else {
      return JP_RAIDS;
    }
  }

  getRaids(): Raid[] {
    const raids: Raid[] = [];
    const rawRaids = JSON.parse(JSON.stringify(this.getRaw()));

    Object.keys(rawRaids).forEach(raidId => {
      const raid = new Raid();
      raid.constructFromJson(rawRaids[raidId], this.translateService);
      raids.push(raid);
    });

    this.raids = raids;
    return raids;
  }

  getRaid(id: string): Raid {
    this.getRaids();

    return this.raids.find(raid => raid.dataId === id);
  }

  getRaidBySlug(slug: string): Raid {
    this.getRaids();

    return this.raids.find(raid => raid.slug === slug);
  }

  getRaidsForListing(filters, sort, order = 'asc') {
    this.getRaids();
    this.raids = this.filterRaids(this.raids, filters);

    switch (sort) {
      case 'name' :
        this.sortByName(this.raids, order);
      break;
      default :
        console.log('not managed sort');
      break;
    }

    return this.raids;
  }

  filterRaids(raids, filters) {
    if (filters) {
      const filteredRaids = [];

      raids.forEach(raid => {
        if (filters.element.length === 0 || filters.element.indexOf(raid.bosses[0].element) !== -1) {
          filteredRaids.push(raid);
        }
      });

      return filteredRaids;
    } else {
      return raids;
    }
  }
}
