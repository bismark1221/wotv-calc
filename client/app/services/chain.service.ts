import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { ElementsService } from '../services/elements.service';

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
  private frames: number[];
  private elements: string[];
  private modifierElements: number[] = [];
  private result: any = {
    modifier: 0,
    combo: '0'
  };

  units: any[] = [];

  private dataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.dataSubject.asObservable();

  constructor(
    private elementsService: ElementsService
  ) {
    this.getPossibleElements();
  }

  private getPossibleElements(): void {
    this.elementsService.getElements().then(elements => {
      this.elements = elements
      this.elements.splice(0, 1);
    });
  }

  getChain() {
    this.frames = [];

    this.units.forEach(unit => {
      if (unit.ability.type === 'LB') {
        unit.ability.dualable = false;
      }

      unit.frames = this.calculateUnitHits(unit);
    });

    this.getElements();
    this.calculateDebuffModifier();
    this.calculateHitDamage();

    this.result.modifier = this.calculateChain();
    this.result.combo = this.combo.join(" + ");

    this.dataSubject.next(this.hits);
  }

  // Once Upon A Time
  private calculateUnitHits(unit: any) {
    let unitHits = [];
    let countFrames = 0 + unit.framesGap;
    let dualCountFrames = unit.ability.offset + unit.ability.castTime + unit.framesGap;

    if (!unit.ability.linearFrames) {
      unit.ability.framesList.split('-').forEach(hit => {
        countFrames += Number(hit);
        unitHits.push({frame: countFrames, type: 'classic'});
      });

      if (unit.dual && unit.ability.dualable) {
        unit.ability.framesList.split('-').forEach(hit => {
          dualCountFrames += Number(hit);
          unitHits.push({frame: dualCountFrames, type: 'dual'});
        });
      }
    } else {
      unitHits.push({frame: countFrames, type: 'classic'});
      for (let i = 1; i < unit.ability.hits; i++) {
        countFrames += unit.ability.frames;
        unitHits.push({frame: countFrames, type: 'classic'});
      }

      if (unit.dual && unit.ability.dualable) {
        unitHits.push({frame: dualCountFrames, type: 'dual'});
        for (let i = 1; i < unit.ability.hits; i++) {
          dualCountFrames += unit.ability.frames;
          unitHits.push({frame: dualCountFrames, type: 'dual'});
        }
      }
    }

    return unitHits;
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

        if (unit.dual && unit.ability.dualable) {
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

        if (unit.dual && unit.ability.dualable) {
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

  private calculateDebuffModifier() {
    this.modifierElements = [];
    this.elements.forEach(element => {
      let modifier = 1;

      this.units.forEach(unit => {
        if (unit.ability.debuff[element] && unit.ability.debuff[element] / 100 + 1 > modifier) {
          modifier = unit.ability.debuff[element] / 100 + 1;
        }
      });

      this.modifierElements[element] = modifier;
    });
  }

  private calculateHitDamage() {
    this.units.forEach(unit => {
      unit.totalDamage = 0;
      let realIgnore = unit.ability.ignore * 2 / 100 + 1;
      let base = unit.ability.base

      if (unit.ability.type === 'hybrid') {
        base /= 2;
      }

      if (unit.elements.length > 0) {
        unit.elements.forEach(element => {
          unit.totalDamage += (1 / unit.elements.length) * base * realIgnore * this.modifierElements[element];
        })
      } else {
        unit.totalDamage = base * realIgnore;
      }

      unit.hitDamage = unit.totalDamage / (unit.frames.length / (unit.dual && unit.ability.dualable ? 2 : 1));
    });
  }

  // Dark Side
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

  private initializeChain() {
    this.nbHits = 0;
    this.multi = 1;
    this.hits = [];
    this.lastElements = [];
    this.combo = [];
    this.nbCombo = [];

    this.sortFramesArray();
    this.addHit(this.getNextHitter(), false);
  }

  private sortFramesArray() {
    this.units.forEach(unit => {
      this.nbCombo.push(0);
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

  private calculateTotal(unit: any, combo: boolean): void {
    if (combo) {
      let elementsModifier = this.calculateModifierByElements(unit);
      this.multi += 0.1 + elementsModifier;
      if (this.multi < 4 && this.hits[this.nbHits].hit === this.hits[this.nbHits - 1].hit) {
        this.multi += 0.3;
      }

      if (this.multi > 4) {
        this.multi = 4;
      }

      this.combo[this.combo.length - 1]++;
    } else {
      this.multi = 1;
      this.combo.push(0);
    }

    this.lastElements = unit.elements;
    this.hits[this.nbHits].combo = this.combo[this.combo.length - 1];
    this.total = this.total + (unit.hitDamage * this.multi);
  }

  private calculateModifierByElements(unit: any): number {
    let matchingElements = 0;

    unit.elements.forEach(element => {
      if(this.lastElements.findIndex(x => x === element) !== -1) {
        matchingElements++;
      }
    })

    return matchingElements * 0.2;
  }

  calculateFramesDiffForFirstHits() {
    let diff = [];
    this.units.forEach((unit, index) => {
      diff.push({
        position: index,
        firstHit: unit.ability.firstHit + unit.ability.offset + unit.framesGap
      });
    });

    diff.sort((a: any, b: any) => {
      if (a.firstHit < b.firstHit) {
        return -1;
      } else if (a.firstHit > b.firstHit) {
        return 1;
      } else {
        if (a.position < b.position) {
          return -1;
        } else {
          return 1;
        }
      }
    });

    return diff;
  }

  getResult(): number {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }
}
