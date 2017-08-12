import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Unit } from '../entities/unit';

@Injectable()
export class ChainService {
  private total: number;
  private multi: number;
  private nbHits: number;
  private result: string;
  private hits: any[] = [];
  private lastHiter: number;

  chainers: any[] = [];
  finisher: Unit;
  framesGap: number = 1;

  private dataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.dataSubject.asObservable();

  private calculateTotal(unit: any, combo: boolean): void {
    //@Todo check previous element
    if (combo) {
      this.multi = this.multi + 0.1 + unit.ability.elements.length * 0.2 + (this.framesGap === 0 && this.nbHits % 2 != 0 ? 0.3 : 0);
      this.multi > 4 ? this.multi = 4 : true;
    } else {
      this.multi = 1;
    }

    this.total = this.total + ( unit.hitDamage * this.multi)
  }

  private addHit(unit: number, frame: number, unitHit: number, combo: boolean) {
    this.hits[this.nbHits] = {
      unitName: (unit + 1) + '.' + this.chainers[unit].name,
      hit: unitHit * frame + (unit === 1 ? this.framesGap : 0)
    };
    this.calculateTotal(this.chainers[unit], combo);
    this.nbHits++;
    this.lastHiter = unit;
  }

  getResult(): string {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }

  calculateChain(): void {
    let hit1 = this.chainers[0].ability.hits;
    let hit2 = this.chainers[1] ? this.chainers[1].ability.hits : 0;

    let frames1 = this.chainers[0].ability.frames;
    let frames2 = this.chainers[1] ? this.chainers[1].ability.frames : 0;

    this.chainers[0].totalDamage = 0;
    if (this.chainers[0].ability.elements && this.chainers[0].ability.elements.length > 0) {
      this.chainers[0].ability.elements.forEach(element => {
        this.chainers[0].totalDamage = this.chainers[0].totalDamage + (1/this.chainers[0].ability.elements.length) * this.chainers[0].ability.base * this.chainers[0].ability.ignore * element.debuff;
      })
    } else {
      this.chainers[0].totalDamage = this.chainers[0].ability.base * this.chainers[0].ability.ignore;
    }
    this.chainers[0].hitDamage = this.chainers[0].totalDamage / this.chainers[0].ability.hits;

    if (this.chainers[1]) {
      this.chainers[1].totalDamage = 0;
      if (this.chainers[1].ability.elements && this.chainers[1].ability.elements.length > 0) {
        this.chainers[1].ability.elements.forEach(element => {
          this.chainers[1].totalDamage = this.chainers[1].totalDamage + (1/this.chainers[1].ability.elements.length) * this.chainers[1].ability.base * this.chainers[1].ability.ignore * element.debuff;
        })
      } else {
        this.chainers[1].totalDamage = this.chainers[1].ability.base * this.chainers[1].ability.ignore;
      }
      this.chainers[1].hitDamage = this.chainers[1].totalDamage / this.chainers[1].ability.hits;
    }

    let nbCombo1 = 1;
    let nbCombo2 = 0;

    this.nbHits = 0;
    this.total = 0;
    this.multi = 1;
    this.hits = [];

    this.addHit(0, frames1, 0, false);

    while (nbCombo1 < hit1 && nbCombo2 < hit2 && hit2 !== 0) {
      if (this.lastHiter == 0) {
        if (nbCombo2 * frames2 + this.framesGap <= nbCombo1 * frames1) {
          this.addHit(1, frames2, nbCombo2, true);
          nbCombo2++;
        } else {
          this.addHit(0, frames1, nbCombo1, false);
          nbCombo1++;
        }
      } else {
        if (nbCombo1 * frames1 <= nbCombo2 * frames2 + this.framesGap) {
          this.addHit(0, frames1, nbCombo1, true);
          nbCombo1++;
        } else {
          this.addHit(1, frames2, nbCombo2, false);
          nbCombo2++;
        }
      }
    }

    for (let i = 0; nbCombo1 < hit1; i++) {
      if (this.lastHiter == 1 && nbCombo1 * frames1 <= nbCombo2 * frames2 + this.framesGap) {
        this.addHit(0, frames1, nbCombo1, true);
      } else {
        this.addHit(0, frames1, nbCombo1, false);
      }
      nbCombo1++;
    }

    for (let i = 0; nbCombo2 < hit2; i++) {
      if (this.lastHiter == 0 && nbCombo2 * frames2 <= nbCombo1 * frames1 + this.framesGap) {
        this.addHit(1, frames2, nbCombo2, true);
      } else {
        this.addHit(1, frames2, nbCombo2, false);
      }
      nbCombo2++;
    }

    this.result = Math.round(this.total).toString();
    this.dataSubject.next(this.hits);
    console.log(this.hits);
  }
}
