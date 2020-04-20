import { Injectable } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { Unit } from '../entities/unit';
import { Skill } from '../entities/skill';
import { default as UNITS } from '../data/units.json';

@Injectable()
export class UnitService {
  private units: Unit[];
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

  public sort(units: Unit[], translate: any): Unit[] {
    units.sort((a: any, b: any) => {
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

    return units;
  }

  getUnits(): Unit[] {
    let units: Unit[] = [];

    Object.keys(JSON.parse(JSON.stringify(UNITS))).forEach(unitId => {
      let unit = new Unit();
      unit.constructFromJson(UNITS[unitId], this.translateService);
      units.push(unit);
    });

    this.units = units;
    return units;
  }

  getUnit(id: string): Unit {
    if (!this.units || this.units.length === 0) {
      this.getUnits();
    }

    return this.units.find(unit => unit.dataId === id);
  }
}
