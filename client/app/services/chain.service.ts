import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { Unit } from '../entities/unit';

@Injectable()
export class ChainService {
  private total: number;
  private multi: number;
  private nbHits: number;
  private best: any;
  private hits: any[] = [];
  private lastHitter: number;
  private nextHitter: number;
  private lastElements: string[];
  private combo: any[] = [];
  private nbCombo: number[] = [];
  private spark: boolean = true;
  private result: any = {
    modifier: 0,
    combo: '0'
  }
  private test = 0;

  units: any[] = [];
  finisher: Unit;

  private dataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.dataSubject.asObservable();

  // Once Upon A Time
  private initializeChain() {
    this.nbHits = 0;
    this.multi = 1;
    this.hits = [];
    this.lastElements = [];
    this.combo = [];
    this.nbCombo = [];

    this.getElements();
    this.calculateHitsAndFrames();
    this.calculateHitDamage();
    this.insertFirstHit();
  }

  private getElements() {
    this.units.forEach(unit => {
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

      unit.elements = elements;
    });
  }

  private getDebuffModifier(element: string): number {
    let modifier = 1;

    this.units.forEach(unit => {
      if (unit.ability.debuff[element] && unit.ability.debuff[element] / 100 + 1 > modifier) {
        modifier = unit.ability.debuff[element] / 100 + 1;
      }
    });

    return modifier;
  }

  private calculateHitDamage() {
    this.units.forEach(unit => {
      unit.totalDamage = 0;
      let elements = unit.elements;
      let realIgnore = unit.ability.ignore * 2 / 100 + 1;
      let base = unit.ability.base

      if (unit.ability.type === 'hybrid') {
        base /= 2;
      }

      if (elements.length > 0) {
        elements.forEach(element => {
          unit.totalDamage = unit.totalDamage + (1/elements.length) * base * realIgnore * this.getDebuffModifier(element);
        })
      } else {
        unit.totalDamage = base * realIgnore;
      }

      unit.hitDamage = unit.totalDamage / (unit.frames.length / (unit.dual && unit.ability.type !== 'LB' && unit.ability.dualable ? 2 : 1));
    });
  }

  private sortFramesArray() {
    this.units.forEach(unit => {
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

  private calculateHitsAndFrames() {
    this.units.forEach(unit => {
      unit.frames = [];
      let countFrames = 0 + unit.framesGap;
      let dualCountFrames = unit.ability.offset + unit.ability.castTime + unit.framesGap;

      if (!unit.ability.linearFrames) {
        unit.ability.framesList.split('-').forEach(hit => {
          countFrames += Number(hit);
          unit.frames.push({frame: countFrames, type: 'classic'});
        });

        if (unit.dual && unit.ability.type !== 'LB' && unit.ability.dualable) {
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

        if (unit.dual && unit.ability.type !== 'LB' && unit.ability.dualable) {
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

  private insertFirstHit() {
    let minFramesGap = 0;
    let unitPosition = 0;
    this.units.forEach((unit, index) => {
      if (unit.framesGap < minFramesGap) {
        minFramesGap = unit.framesGap;
        unitPosition = index;
      }
      this.nbCombo.push(0);
    });

    this.addHit(unitPosition, false);
  }

  // Dark Side
  private calculateModifierByElements(unit: any): number {
    let matchingElements = 0;

    unit.elements.forEach(element => {
      if(this.lastElements.findIndex(x => x === element) !== -1) {
        matchingElements++;
      }
    })

    this.lastElements = unit.elements;

    return matchingElements * 0.2;
  }

  private calculateTotal(unit: any, combo: boolean): void {
    let elementsModifier = this.calculateModifierByElements(unit); // Need to be always here

    if (combo) {
      this.multi += 0.1 + elementsModifier;
      if (this.multi < 4) {
        if (this.spark && this.hits[this.nbHits].hit === this.hits[this.nbHits - 1].hit) {
          this.spark = false;
          this.multi += 0.3;
        } else {
          this.spark = true;
        }
      }

      if (this.multi > 4) {
        this.multi = 4;
      }

      this.combo[this.combo.length - 1]++;
    } else {
      this.multi = 1;
      this.combo.push(0);
    }

    if (this.units.length > 1) {
      this.hits[this.nbHits].combo = this.combo[this.combo.length - 1];
    }

    this.total = this.total + (unit.hitDamage * this.multi)
  }

  private addHit(unitPosition: number, combo: boolean) {
    let unit = this.units[unitPosition];
    let unitName = (unitPosition + 1) + '.' + unit.name;
    let hit = unit.frames[this.nbCombo[unitPosition]];
    let divided = false;

    let type = combo || this.nbHits === 0 || this.units.length === 1 ? 'chain' : 'break';
    type = 'unit1-' + type + (hit.type === 'classic' ? '1' : '2');

    for (let i = 1; i <= this.units.length; i++) {
      if (this.nbHits > (i - 1) && this.hits[this.nbHits - i].unitName === unitName && this.hits[this.nbHits - i].hit === hit.frame) {
        this.hits[this.nbHits - i].divided = true;
        hit.frame += 0.5;
        divided = true;
      }
    }

    this.hits[this.nbHits] = {
      unitName: unitName,
      hit: hit.frame,
      type: type,
      divided: divided
    };

    this.calculateTotal(unit, combo);
    this.nbCombo[unitPosition]++;
    this.nbHits++;
    this.lastHitter = unitPosition;
  }

  private getNextHitter(): number {
    let minFrame = 10000;
    let minPosition = -1;
    this.units.forEach((unit, index) => {
      let nbCombo = this.nbCombo[index];
      if (this.units[index].frames.length > nbCombo && unit.frames[nbCombo].frame < minFrame) {
        minFrame = unit.frames[nbCombo].frame;
        minPosition = index;
      }
    });

    this.nextHitter = minPosition;

    return minPosition;
  }

  private calculateChain() {
    this.total = 0;

    if (this.units.length > 0) {
      this.initializeChain();

      while (this.getNextHitter() !== -1) {
        if (this.lastHitter === this.nextHitter) {
          this.addHit(this.nextHitter, false);
        } else {
          let previousFrame = this.units[this.lastHitter].frames[this.nbCombo[this.lastHitter] - 1].frame;
          let actualFrame = this.units[this.nextHitter].frames[this.nbCombo[this.nextHitter]].frame;
          this.addHit(this.nextHitter, (actualFrame - previousFrame <= 21));
        }
      }
    } else {
      this.hits = [];
    }

    return Math.round(this.total);
  }

  getChain() {
    this.result.modifier = this.calculateChain();
    this.result.combo = this.combo.join(" + ");
    this.dataSubject.next(this.hits);
  }

  findBestFrames() {
    this.best = {
      modifier: {frames: [], max: 0},
      combo: {frames: [], max: 0}
    };

    this.calculateAllPossibleFrames(0);

    return this.best;
  }

  private calculateAllPossibleFrames(unitPosition: number) {
    if (unitPosition < this.units.length) {
      for (let i = -10; i <= 10; i++) {
        this.units[unitPosition].framesGap = i;
        this.calculateAllPossibleFrames(unitPosition + 1);
      }
    } else {
      this.test++;
      console.log(this.test);
      let modifier = this.calculateChain();
      if (modifier > this.best.modifier.max) {
        this.best.modifier.max = modifier;
        this.units.forEach((unit, index) => {
          this.best.modifier.frames[index] = unit.framesGap;
        });
      }

      if (Math.max.apply(null, this.combo) > this.best.combo.max) {
        this.best.combo.max = Math.max.apply(null, this.combo);
        this.units.forEach((unit, index) => {
          this.best.combo.frames[index] = unit.framesGap;
        });
      }
    }
  }

  getResult(): number {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }
}
