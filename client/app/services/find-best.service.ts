import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import { ElementsService } from '../services/elements.service';

@Injectable()
export class FindBestService {
  private total: number;
  private multi: number;
  private nbHits: number;
  private best: any;
  private hits: any[] = [];
  private hitsDamage: any[] = [];
  private lastHitter: number;
  private nextHitter: number;
  private lastElements: string[];
  private combo: any[] = [];
  private nbCombo: number[] = [];
  private frames: number[];
  private elements: string[];
  private modifierElements: number[] = [];
  private chainUnitsHits: any[] = [];
  private chainersHits: any[] = [];
  private chainers: any[] = [];
  private finishers: any[] = [];
  private chainUnits: any[] = [];
  private hitters: any[] = [];
  private minFrames: number = 0;

  units: any[] = [];

  constructor(
    private elementsService: ElementsService
  ) {
    this.getPossibleElements();
  }

  private getPossibleElements(): void {
    this.elements = this.elementsService.getElements();
    this.elements.splice(0, 1);
  }

  findBestFrames() {
    this.best = {
      modifier: {frames: {}, max: 0, hits: []},
      combo: {frames: {}, max: -1, hits: []}
    };

    if (this.units.length > 0) {
      this.chainUnits = [];
      this.chainers = [];
      this.finishers = [];
      this.frames = [];
      this.chainUnitsHits = [];
      this.chainersHits = [];
      this.minFrames = 0;
      let chainerIndex = 0;
      let unitIndex = 0;

      this.units.forEach((unit, index) => {
        if (unit) {
          this.chainUnitsHits[unitIndex] = [];
          unit.index = index;
          unit.unitIndex = unitIndex;
          unit.minFrame = unit.ability.range.min;

          if (unit.ability.type === 'chain') {
            this.chainersHits.push([]);
            unit.maxFrame = unit.ability.range.max;
            unit.chainerIndex = chainerIndex;
            this.chainers.push(unit);
            chainerIndex++;

            for (let i = unit.minFrame; i <= unit.maxFrame; i++) {
              this.calculateUnitHits(unit, unitIndex, i, 'chainer');
            }
          } else {
            this.calculateUnitHits(unit, unitIndex, unit.ability.range.min);
            this.finishers.push(unit);
          }

          this.chainUnits.push(unit);
          unit.frames = this.chainUnitsHits[unitIndex][unit.ability.range.min];
          unitIndex++;
        }
      });

      this.findMinFrames();
      this.getElements();
      this.calculateDebuffModifier();
      this.calculateTotalDamage();
      this.calculateAllPossibleFrames('chainers', 0);

      if (this.finishers.length > 0) {
        let maxFrames = Math.max(this.best.modifier.hits[this.best.modifier.hits.length - 1], this.best.combo.hits[this.best.combo.hits.length - 1]) + 1;

        if (!maxFrames) {
          maxFrames = 20;
        }

        ['modifier', 'combo'].forEach(type => {
          this.chainUnits.forEach((unit, index) => {
            if (unit && unit.ability.type === 'finish' && type === 'modifier') {
              unit.maxFrame = unit.ability.range.max > maxFrames ? unit.ability.range.max : maxFrames;

              for (let i = unit.minFrame; i <= unit.maxFrame; i++) {
                this.calculateUnitHits(unit, index, i);
              }
            } else if (unit && unit.ability.type === 'chain') {
              let chainerFrame = this.best[type].frames[unit.index];
              this.frames[index] = chainerFrame;
              unit.frames = this.chainUnitsHits[index][chainerFrame];
              unit.minFrame = chainerFrame;
              unit.maxFrame = chainerFrame;
            }
          });
          this.calculateAllPossibleFrames('chainUnits', 0);
        });
      }
    }

    return this.best;
  }

  // Once Upon A Time
  private calculateUnitHits(unit: any, unitPosition: number, framesGap: number, type: string = 'unit') {
    this.chainUnitsHits[unitPosition][framesGap] = [];
    let countFrames = 0 + framesGap;
    let dualCountFrames = unit.ability.offset + unit.ability.castTime + framesGap;

    unit.ability.framesList.split('-').forEach((hit, index) => {
      countFrames += Number(hit);
      this.chainUnitsHits[unitPosition][framesGap].push({frame: countFrames, type: 'classic', damage: unit.ability.hitDamage[index]});
    });

    if (unit.dual && unit.ability.dualable) {
      unit.ability.framesList.split('-').forEach((hit, index) => {
        dualCountFrames += Number(hit);
        this.chainUnitsHits[unitPosition][framesGap].push({frame: dualCountFrames, type: 'dual', damage: unit.ability.hitDamage[index]});
      });
    }

    if (type === 'chainer') {
      this.chainersHits[unit.chainerIndex][framesGap] = this.chainUnitsHits[unitPosition][framesGap];
    }
  }

  private findMinFrames() {
    this.units.forEach(unit => {
      this.minFrames = unit && unit.minFrame < this.minFrames ? unit.minFrame : this.minFrames;
    });
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

  private calculateTotalDamage() {
    this.units.forEach(unit => {
      if (unit) {
        unit.totalDamage = 0;
        let realIgnore = unit.ability.ignore * 2 / 100 + 1;

        if (unit.elements.length > 0) {
          unit.elements.forEach(element => {
            unit.totalDamage += (1 / unit.elements.length) * unit.ability.base * realIgnore * this.modifierElements[element];
          })
        } else {
          unit.totalDamage = unit.ability.base * realIgnore;
        }
      }
    });
  }

  private calculateAllPossibleFrames(type: string, unitPosition: number) {
    if (unitPosition < this[type].length) {
      for (let i = this[type][unitPosition].minFrame; i <= this[type][unitPosition].maxFrame; i++) {
        this.frames[unitPosition] = i;
        this[type][unitPosition].frames = this[type + 'Hits'][unitPosition][i];
        this.calculateAllPossibleFrames(type, unitPosition + 1);
      }
    } else if (this.frames.findIndex(x => x === this.minFrames || x === 0) !== -1) {
      let modifier = this.calculateChain(type);
      if (modifier > this.best.modifier.max) {
        this.best.modifier.max = modifier;
        this[type].forEach((unit, index) => {
          this.best.modifier.frames[unit.index] = this.frames[index];
        });
        this.best.modifier.hits = this.hits;
      }

      let combo = Math.max.apply(null, this.combo);
      if (combo > this.best.combo.max) {
        this.best.combo.max = combo;
        this[type].forEach((unit, index) => {
          this.best.combo.frames[unit.index] = this.frames[index];
        });
        this.best.combo.hits = this.hits;
      }
    }
  }

  private calculateChain(type: string) {
    this.total = 0;

    this.initializeChain(type);

    while (this.getNextHitter() !== -1) {
      if (this.lastHitter === this.nextHitter) {
        this.addHit(type, this.nextHitter, false);
      } else {
        let previousFrame = this[type][this.lastHitter].frames[this.nbCombo[this.lastHitter] - 1].frame;
        let actualFrame = this[type][this.nextHitter].frames[this.nbCombo[this.nextHitter]].frame;
        this.addHit(type, this.nextHitter, (actualFrame - previousFrame <= 21));
      }
    }

    return Math.round(this.total);
  }

  private initializeChain(type: string) {
    this.nbHits = 0;
    this.multi = 1;
    this.hits = [];
    this.hitsDamage = [];
    this.lastElements = [];
    this.combo = [];
    this.nbCombo = [];

    this.sortFramesArray(type);

    this.calculateHitterOrder(type);

    this.addHit(type, this.getNextHitter(), false);
  }

  private sortFramesArray(type: string) {
    this[type].forEach(unit => {
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

  private calculateHitterOrder(type: string) {
    let minIndex = 0;
    let lastHitter = 0;
    let nbCombo = JSON.parse(JSON.stringify(this.nbCombo));
    nbCombo[-1] = 0;
    this.hitters = [];

    while (minIndex !== -1) {
      let minFrame = 10000;
      minIndex = -1;
      this[type].forEach((unit, index) => {
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

  private addHit(type: string, unitPosition: number, combo: boolean) {
    let unit = this[type][unitPosition];
    let hit = unit.frames[this.nbCombo[unitPosition]];

    this.hits[this.nbHits] = hit.frame;
    this.hitsDamage[this.nbHits] = hit.damage;

    this.calculateTotal(unit, combo);
    this.nbCombo[unitPosition]++;
    this.nbHits++;
    this.lastHitter = unitPosition;
  }

  private calculateTotal(unit: any, combo: boolean): void {
    if (combo) {
      let elementsModifier = this.calculateModifierByElements(unit);
      this.multi += 0.1 + elementsModifier;
      if (this.multi < 4 && this.hits[this.nbHits] === this.hits[this.nbHits - 1]) {
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
    this.total = this.total + ((unit.totalDamage * this.hitsDamage[this.nbHits] / 100) * this.multi);
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
}
