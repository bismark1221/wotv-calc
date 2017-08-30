import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Unit } from '../entities/unit';

@Injectable()
export class ChainService {
  private total: number;
  private multi: number;
  private nbHits: number;
  private result: number;
  private diffFirstHits: number;
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

  private getDebuffModifier(element: string): number {
    let modifier = 1;

    this.chainers.forEach(unit => {
      if (unit.ability.debuff[element] && unit.ability.debuff[element] / 100 + 1 > modifier) {
        modifier = unit.ability.debuff[element] / 100 + 1;
      }
    });

    return modifier;
  }

  private calculateHitDamage() {
    this.chainers.forEach(unit => {
      unit.totalDamage = 0;
      let elements = this.getElements(unit);
      let realIgnore = unit.ability.ignore * 2 / 100 + 1;

      if (elements.length > 0) {
        elements.forEach(element => {
          unit.totalDamage = unit.totalDamage + (1/elements.length) * unit.ability.base * realIgnore * this.getDebuffModifier(element);
        })
      } else {
        unit.totalDamage = unit.ability.base * realIgnore;
      }

      unit.hitDamage = unit.totalDamage / (unit.frames.length / (unit.dual ? 2 : 1));
    });
  }

  private sortFramesArray() {
    this.chainers.forEach(unit => {
      unit.frames.sort((a: any, b: any) => {
        if (a.frame < b.frame) {
          return -1;
        } else if (a.frame > b.frame) {
          return 1;
        } else {
          if (a.type === 'classic') {
            return -1;
          } else {
            return 1;
          }
        }
      });
    });
  }

  private addHit(unit: number, hit: any, combo: boolean) {
    let unitName = (unit + 1) + '.' + this.chainers[unit].name;
    let frame = hit.frame + (unit === 1 ? this.framesGap : 0);
    let size = 5;

    let type = combo || this.nbHits === 0 || this.chainers.length === 1 ? 'chain' : 'break';
    type = 'unit' + (unit + 1).toString() + '-' + type + (hit.type === 'classic' ? '1' : '2');

    for (let i = 1; i <= 2; i++) {
      if (this.nbHits > (i - 1) && this.hits[this.nbHits - i].unitName === unitName && this.hits[this.nbHits - i].hit === frame) {
        this.hits[this.nbHits - i].size = 5;
        frame += 0.5;
        size = 3;
      }
    }

    this.hits[this.nbHits] = {
      unitName: unitName,
      hit: frame,
      type: type,
      size: size
    };
    this.calculateTotal(this.chainers[unit], combo);
    this.nbHits++;
    this.lastHiter = unit;
  }

  private calculateFramesDiffForFirstHits() {
    if (this.chainers.length === 2) {
      let firstHitUnit1 = this.chainers[0].ability.firstHit + this.chainers[0].ability.offset;
      let firstHitUnit2 = this.chainers[1].ability.firstHit + this.chainers[1].ability.offset;
      this.diffFirstHits = firstHitUnit1 - firstHitUnit2 + this.framesGap;
    } else {
      this.diffFirstHits = 0;
    }
  }

  private calculateHitsAndFrames() {
    this.chainers.forEach(unit => {
      unit.frames = [];
      let countFrames = 0;
      let dualCountFrames = unit.ability.offset + unit.ability.castTime;

      if (!unit.ability.linearFrames) {
        unit.ability.framesList.split('-').forEach(hit => {
          countFrames += Number(hit);
          unit.frames.push({frame: countFrames, type: 'classic'});
        });

        if (unit.dual) {
          unit.ability.framesList.split('-').forEach(hit => {
            dualCountFrames += Number(hit);
            unit.frames.push({frame: dualCountFrames, type: 'dual'});
          });
        }
      } else {
        unit.frames.push({frame: countFrames, type: 'classic'});
        for (let i = 1; i < unit.ability.hits; i++) {
          countFrames += unit.ability.frames;
          unit.frames.push({frame: countFrames, type: 'classic'});
        }

        if (unit.dual) {
          unit.frames.push({frame: dualCountFrames, type: 'dual'});
          for (let i = 1; i < unit.ability.hits; i++) {
            dualCountFrames += unit.ability.frames;
            unit.frames.push({frame: dualCountFrames, type: 'dual'});
          }
        }
      }
    });

    this.sortFramesArray();
  }

  private initializeChain() {
    this.nbHits = 0;
    this.total = 0;
    this.multi = 1;
    this.hits = [];
    this.lastElements = [];

    this.calculateHitsAndFrames();
    this.calculateHitDamage();
    this.calculateFramesDiffForFirstHits();
  }

  calculateChain(): void {
    if (this.chainers.length > 0) {
      this.initializeChain();

      let nbCombo1 = 1;
      let nbCombo2 = 0;

      let hits1 = this.chainers[0].frames.length;
      let hits2 = this.chainers[1] ? this.chainers[1].frames.length : 0;

      this.addHit(0, this.chainers[0].frames[0], false);

      while (nbCombo1 < hits1 && nbCombo2 < hits2 && hits2 !== 0) {
        if (this.lastHiter == 0) {
          if (this.chainers[1].frames[nbCombo2].frame + this.framesGap <= this.chainers[0].frames[nbCombo1].frame) {
            this.addHit(1, this.chainers[1].frames[nbCombo2], true);
            nbCombo2++;
          } else {
            this.addHit(0, this.chainers[0].frames[nbCombo1], false);
            nbCombo1++;
          }
        } else {
          if (this.chainers[0].frames[nbCombo1].frame <= this.chainers[1].frames[nbCombo2].frame + this.framesGap) {
            this.addHit(0, this.chainers[0].frames[nbCombo1], true);
            nbCombo1++;
          } else {
            this.addHit(1, this.chainers[1].frames[nbCombo2], false);
            nbCombo2++;
          }
        }
      }

      for (let i = 0; nbCombo1 < hits1; i++) {
        if (this.lastHiter == 1 && this.chainers[0].frames[nbCombo1].frame <= this.chainers[1].frames[nbCombo2 - 1].frame + this.framesGap) {
          this.addHit(0, this.chainers[0].frames[nbCombo1], true);
        } else {
          this.addHit(0, this.chainers[0].frames[nbCombo1], false);
        }
        nbCombo1++;
      }

      for (let i = 0; nbCombo2 < hits2; i++) {
        if (this.lastHiter == 0 && this.chainers[1].frames[nbCombo2].frame <= this.chainers[0].frames[nbCombo1 - 1].frame + this.framesGap) {
          this.addHit(1, this.chainers[1].frames[nbCombo2], true);
        } else {
          this.addHit(1, this.chainers[1].frames[nbCombo2], false);
        }
        nbCombo2++;
      }

      this.result = Math.round(this.total);
    } else {
      this.hits = [];
    }

    this.dataSubject.next(this.hits);
  }

  getResult(): number {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }

  getDiffFirstHits(): number {
    return this.diffFirstHits;
  }
}
