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

  chainers: Unit[] = [];
  finisher: Unit;
  framesGap: number = 1;

  private dataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.dataSubject.asObservable();

  private calculateTotal(unit: Unit, combo: boolean): void {
    if (combo) {
      this.multi = this.multi + 0.1 + 1 * 0.2 + (this.framesGap === 0 && this.multi % 2 != 0 ? 0.3 : 0);
      this.multi > 4 ? this.multi = 4 : true;
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
  }

  getResult(): string {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }

  calculateChain(): void {
    let hit1 = this.chainers[0].abilities[0].hits;
    let hit2 = this.chainers[1] ? this.chainers[1].abilities[0].hits : 0;

    let frames1 = this.chainers[0].abilities[0].frames;
    let frames2 = this.chainers[1] ? this.chainers[1].abilities[0].frames : 0;

    this.chainers[0].hitDamage = this.chainers[0].abilities[0].base / this.chainers[0].abilities[0].hits;
    if (this.chainers[1]) {
      this.chainers[1].hitDamage = this.chainers[1].abilities[0].base / this.chainers[1].abilities[0].hits;
    }


    let nbCombo1 = 0;
    let nbCombo2 = 0;

    this.nbHits = 0;
    this.total = 0;
    this.multi = 1;
    this.hits = [];

    for (let i = 0; i < Math.max(hit1, hit2); i++) {
      if ((i === 0) || (nbCombo1 * frames1 < (nbCombo2 - 1) * frames2 + this.framesGap) || (hit2 === 0) || (nbCombo2 >= hit2)) {
        nbCombo2 = (nbCombo2 >= hit2 || nbCombo2 === 0 ? nbCombo2 : nbCombo2 - 1);
        this.multi = 1;
        this.addHit(0, frames1, nbCombo1, false)
      } else {
        this.addHit(1, frames2, nbCombo2, true)
        nbCombo2++;
        this.addHit(0, frames1, nbCombo1, true)
      }

      nbCombo1++;
    }

    if (nbCombo2 < hit2) {
      this.addHit(1, frames2, nbCombo2, true)
    }

    this.result = Math.round(this.total).toString();
    this.dataSubject.next(this.hits);
    console.log(this.hits);
  }
}
