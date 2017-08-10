import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Unit } from '../entities/unit';

@Injectable()
export class ChainService {
  private total: number;
  private multi: number;
  private result: string;
  private hits: any[] = [];

  chainers: Unit[] = [];
  finisher: Unit;
  spark: boolean = false;

  private dataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.dataSubject.asObservable();

  private calculateTotal(unit: Unit, combo: boolean): void {
    if (combo) {
      this.multi = this.multi + 0.1 + 1 * 0.2 + (this.spark && this.multi % 2 != 0 ? 0.3 : 0);
      this.multi > 4 ? this.multi = 4 : true;
    }
    this.total = this.total + (unit.hitDamage * this.multi)
  }

  private addHit(unit: Unit, frame: number, totalHit: number, unitHit: number, combo: boolean) {
    this.hits[totalHit] = {
      unit: unit,
      hit: (unitHit - 1) * frame
    };
    this.calculateTotal(unit, combo);
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

    let nbHit = 0;
    let nbMulti = 0;
    let nbCombo1 = 1;
    let nbCombo2 = 1;

    this.total = 0;
    this.multi = 1;
    this.hits = [];

    for (let i = 0; i < Math.max(hit1, hit2); i++) {
      if (nbCombo1 * frames1 < (nbCombo2 - 1) * frames2 || nbCombo2 >= hit2 + nbMulti) {
        nbCombo2 = (nbCombo2 >= hit2 + nbMulti ? nbCombo2 : nbCombo2 - 1);
        nbMulti++;
        this.multi = 1;
        this.addHit(this.chainers[0], frames1, nbHit, nbCombo1, false)
        nbHit++;
      } else {
        this.addHit(this.chainers[1], frames2, nbHit, nbCombo2, true)
        nbHit++;
        this.addHit(this.chainers[0], frames1, nbHit, nbCombo1, true)
        nbHit++;
      }

      nbCombo1++;
      nbCombo2++;
    }

    this.result = Math.round(this.total).toString();
    this.dataSubject.next(this.hits);
  }
}
