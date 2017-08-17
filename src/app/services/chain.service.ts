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
  private lastElements: string[];

  chainers: any[] = [];
  finisher: Unit;
  framesGap: number = 1;

  private dataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.dataSubject.asObservable();

  private getElements(unit: any): string[] {
    let elements = [];

    if (unit.ability.type === 'physic') {
      unit.weapons.forEach(weapon => {
        if (weapon !== '' && elements.findIndex(x => x === weapon) === -1) {
          elements.push(weapon);
        }
      });
    }

    unit.ability.elements.forEach(element => {
      if (element !== '' && elements.findIndex(x => x === element) === -1) {
        elements.push(element);
      }
    });

    return elements;
  }

  private calculateModifierByElements(unit: any): number {
    let matchingElements = 0;
    let elements = this.getElements(unit);

    elements.forEach(element => {
      if(this.lastElements.findIndex(x => x === element) !== -1) {
        matchingElements++;
      }
    })

    this.lastElements = elements;

    return matchingElements * 0.2;
  }
  private calculateTotal(unit: any, combo: boolean): void {
    let elementsModifier = this.calculateModifierByElements(unit); // Need to be always here

    if (combo) {
      this.multi += 0.1 + elementsModifier + (this.framesGap === 0 && this.nbHits % 2 != 0 ? 0.3 : 0);
      this.multi > 4 ? this.multi = 4 : true;
    } else {
      this.multi = 1;
    }

    this.total = this.total + (unit.hitDamage * this.multi)
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

  private getDebuffModifier(element: string): number {
    let modifier = 1;

    this.chainers.forEach(unit => {
      if (unit.ability.debuff[element] && unit.ability.debuff[element] > modifier) {
        modifier = unit.ability.debuff[element];
      }
    });

    return modifier;
  }

  private calculateHitDamage() {
    this.chainers.forEach(unit => {
      unit.totalDamage = 0;
      let elements = this.getElements(unit);

      if (elements.length > 0) {
        elements.forEach(element => {
          unit.totalDamage = unit.totalDamage + (1/elements.length) * unit.ability.base * unit.ability.ignore * this.getDebuffModifier(element);
        })
      } else {
        unit.totalDamage = unit.ability.base * unit.ability.ignore;
      }

      unit.hitDamage = unit.totalDamage / unit.ability.hits;
    });
  }

  getResult(): string {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }

  private sortFramesArray() {
    this.chainers.forEach(unit => {
      unit.frames.sort((a: any, b: any) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
    });
  }

  private calculateHitsAndFrames() {
    this.chainers.forEach(unit => {
      unit.frames = [];
      let countFrames = unit.ability.firstHit + unit.ability.offset;
      let dualCountFrames = unit.ability.firstHit + (unit.ability.offset * 2) + unit.ability.castTime;

      if (unit.ability.frames !== '') {
        unit.ability.frames.split('-').forEach(hit => {
          countFrames += Number(hit);
          unit.frames.push(countFrames);
        });

        if (unit.dual) {
          unit.ability.frames.split('-').forEach(hit => {
            dualCountFrames += Number(hit);
            unit.frames.push(dualCountFrames);
          });
        }
      } else {
        unit.frames.push(countFrames);
        for (let i = 1; i < unit.ability.hits; i++) {
          countFrames += unit.ability.linearFrames;
          unit.frames.push(countFrames);
        }

        if (unit.dual) {
          unit.frames.push(dualCountFrames);
          for (let i = 1; i < unit.ability.hits; i++) {
            dualCountFrames += unit.ability.linearFrames;
            unit.frames.push(dualCountFrames);
          }
        }
      }
    });

    this.sortFramesArray();
  }

  calculateChain(): void {
    if (this.chainers.length > 0) {
      this.calculateHitsAndFrames();

      let nbCombo1 = 1;
      let nbCombo2 = 0;
      let frames1 = 1;
      let frames2 = 1;
      let hit1 = 1;
      let hit2 = 1;

      this.nbHits = 0;
      this.total = 0;
      this.multi = 1;
      this.hits = [];
      this.lastElements = [];

      this.calculateHitDamage();

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
    } else {
      this.hits = [];
    }

    this.dataSubject.next(this.hits);
  }
}
