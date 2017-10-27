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
  private hitters: any[] = [];
  private chainers: any[] = [];
  private result: any = {
    modifier: 0,
    combo: '0'
  };

  units: any[] = [];

  private hitsDataSubject = new BehaviorSubject<any[]>(this.hits);
  $hits = this.hitsDataSubject.asObservable();

  private unitsDataSubject = new BehaviorSubject<any[]>(this.units);
  $units = this.unitsDataSubject.asObservable();

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
    this.chainers = [];

    this.units.forEach((unit, index) => {
      if (unit) {
        unit.frames = this.calculateUnitHits(unit);
        unit.index = index;
        this.chainers.push(unit);
      }
    });

    this.getElements();
    this.calculateDebuffModifier();
    this.calculateHitDamage();

    this.result.modifier = this.calculateChain();
    this.result.combo = this.combo.join(" + ");

    this.hitsDataSubject.next(this.hits);
    this.unitsDataSubject.next(this.units);
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
      if (unit) {
        let elements = [];

        if (unit.ability.damage === 'physic') {
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
      }
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
        if (unit && unit.ability.debuff[element] && unit.ability.debuff[element] / 100 + 1 > modifier) {
          modifier = unit.ability.debuff[element] / 100 + 1;
        }
      });

      this.modifierElements[element] = modifier;
    });
  }

  private calculateHitDamage() {
    this.units.forEach(unit => {
      if (unit) {
        unit.totalDamage = 0;
        let realIgnore = unit.ability.ignore * 2 / 100 + 1;
        let base = unit.ability.base

        if (unit.ability.damage === 'hybrid') {
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
      }
    });
  }

  // Dark Side
  private calculateChain() {
    this.total = 0;

    if (this.chainers.length > 0) {
      this.initializeChain();

      while (this.getNextHitter() !== -1) {
        if (this.lastHitter === this.nextHitter) {
          this.addHit(this.nextHitter, false);
        } else {
          let previousFrame = this.chainers[this.lastHitter].frames[this.nbCombo[this.lastHitter] - 1].frame;
          let actualFrame = this.chainers[this.nextHitter].frames[this.nbCombo[this.nextHitter]].frame;
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

    this.calculateHitterOrder();

    if (this.getNextHitter() !== -1) {
      this.addHit(this.nextHitter, false);
    }
  }

  private sortFramesArray() {
    this.chainers.forEach((unit, index) => {
      this.nbCombo[index] = 0;
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

  private calculateHitterOrder() {
    let minIndex = 0;
    let lastHitter = 0;
    let nbCombo = JSON.parse(JSON.stringify(this.nbCombo));
    nbCombo[-1] = 0;
    this.hitters = [];

    while (minIndex !== -1) {
      let minFrame = 10000;
      minIndex = -1;
      this.chainers.forEach((unit, index) => {
        if (unit.frames.length > nbCombo[index] &&
          (index === 0
            || unit.frames[nbCombo[index]].frame < minFrame
            || (unit.frames[nbCombo[index]].frame === minFrame && minIndex > index))
        ) {
          minFrame = unit.frames[nbCombo[index]].frame;
          minIndex = index;
        }
      });

      lastHitter = minIndex;
      nbCombo[minIndex]++;
      this.hitters.push(minIndex);
    }
  }

  private getNextHitter(): number {
    this.nextHitter = this.hitters[this.nbHits];

    return this.nextHitter;
  }

  private addHit(unitPosition: number, combo: boolean) {
    let unit = this.chainers[unitPosition];
    let unitName = (unit.index + 1) + '.' + unit.name;
    let hit = unit.frames[this.nbCombo[unitPosition]];
    let divided = false;

    let type = combo || this.nbHits === 0 || this.chainers.length === 1 ? unit.type : 'break';
    type = type + (hit.type === 'classic' ? '1' : '2');

    for (let i = 1; i <= this.chainers.length; i++) {
      if (this.nbHits > (i - 1) && this.hits[this.nbHits - i].unitName === unitName && this.hits[this.nbHits - i].hit === hit.frame) {
        this.hits[this.nbHits - i].divided = true;
        hit.frame += 0.5;
        divided = true;
      }
    }

    this.hits[this.nbHits] = {
      unitName: unitName,
      unitType: unit.ability.type,
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
      if (unit) {
        diff.push({
          position: index,
          firstHit: unit.ability.firstHit,
          framesGap: unit.framesGap
        });
      }
    });

    diff.sort((a: any, b: any) => {
      if (a.firstHit - a.framesGap > b.firstHit - b.framesGap) {
        return -1;
      } else if (a.firstHit - a.framesGap < b.firstHit - b.framesGap) {
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

  findHighestChainHit() {
    let maxHit = 0;
    this.hits.forEach(hit => {
      if (hit.unitType === 'chain' && hit.hit > maxHit) {
        maxHit = hit.hit + 1;
      }
    });

    return maxHit;
  }

  getResult(): number {
    return this.result;
  }

  getHits(): any[] {
    return this.hits;
  }
}
