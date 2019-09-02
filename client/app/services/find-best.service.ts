import { Injectable } from '@angular/core';


import { BehaviorSubject } from "rxjs";

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
          unit.abilitiesType = "finish";
          unit.minFrame = 0;
          unit.maxFrame = 20;

          unit.selectedAbilities.forEach(ability => {
            if (ability.type === "chain") {
              unit.abilitiesType = "chain";
            }

            unit.minFrame = ability.range.min < unit.minFrame ? ability.range.min : unit.minFrame;
            unit.maxFrame = ability.range.max > unit.maxFrame ? ability.range.max : unit.maxFrame;
          });

          if (unit.abilitiesType === 'chain') {
            this.chainersHits.push([]);
            unit.chainerIndex = chainerIndex;
            this.chainers.push(unit);
            chainerIndex++;

            for (let i = unit.minFrame; i <= unit.maxFrame; i++) {
              this.calculateUnitHits(unit, unitIndex, i, 'chainer');
            }
          } else {
            this.calculateUnitHits(unit, unitIndex, unit.minFrame);
            this.finishers.push(unit);
          }

          this.chainUnits.push(unit);
          unit.frames = this.chainUnitsHits[unitIndex][unit.minFrame];
          unitIndex++;
        }
      });

      this.findMinFrames();
      this.getElements();
      this.calculateImperilModifier();
      this.calculateTotalDamage();
      this.calculateAllPossibleFrames('chainers', 0);

      if (this.finishers.length > 0) {
        let maxFrames = Math.max(this.best.modifier.hits[this.best.modifier.hits.length - 1], this.best.combo.hits[this.best.combo.hits.length - 1]) + 1;

        if (!maxFrames) {
          maxFrames = 20;
        }

        ['modifier', 'combo'].forEach(type => {
          this.chainUnits.forEach((unit, index) => {
            if (unit && unit.abilitiesType === 'finish' && type === 'modifier') {
              unit.selectedAbilities.forEach(ability => {
                unit.maxFrame = maxFrames > ability.range.max ? maxFrames : ability.range.max;
              });

              for (let i = unit.minFrame; i <= unit.maxFrame; i++) {
                this.calculateUnitHits(unit, index, i);
              }
            } else if (unit && unit.abilitiesType === 'chain') {
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
    let countFrames = framesGap;
    let startFrames = framesGap;

    unit.multiAbilities = false;

    unit.selectedAbilities.forEach((ability, index) => {
      if (index > 0) {
        startFrames += ability.offset + ability.castTime;
        countFrames = startFrames;
      }

      ability.framesList.forEach((hit, i) => {
        if (i === 0) {
          if (index === 0) {
            hit = 0;
          } else {
            hit = hit - unit.selectedAbilities[0].framesList[0];
          }
        }
        countFrames += Number(hit);
        this.chainUnitsHits[unitPosition][framesGap].push({frame: countFrames, type: index, damage: ability.hitDamage[i], abilityIndex: index});
      });

      if (unit.dual && ability.dualable && unit.selectedAbilities.length === 1) {
        unit.multiAbilities = true;
        countFrames = startFrames + ability.offset + ability.castTime;
        ability.framesList.forEach((hit, i) => {
          if (i === 0) {
            hit = 0;
          }
          countFrames += Number(hit);
          this.chainUnitsHits[unitPosition][framesGap].push({frame: countFrames, type: index + 1, damage: ability.hitDamage[i], abilityIndex: index});
        });
      }
    });

    if (unit.selectedAbilities.length > 1) {
      unit.multiAbilities = true;
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

        unit.selectedAbilities.forEach(ability => {
          if (ability.damage === 'physic') {
            unit.weapons.forEach(weapon => {
              if (weapon !== '' && elements.findIndex(x => x === weapon) === -1) {
                elements.push(weapon);
              }
            });
          }

          ability.elements.forEach(element => {
            if (element !== '' && elements.findIndex(x => x === element) === -1) {
              elements.push(element);
            }
          });
        });

        unit.elements = elements;
      }
    });
  }

  private calculateImperilModifier() {
    this.modifierElements = [];
    this.elements.forEach(element => {
      let modifier = 1;

      this.units.forEach(unit => {
        if (unit) {
          unit.selectedAbilities.forEach(ability => {
            let imperil = this.getImperil(ability, element);
            if (unit && imperil && imperil / 100 + 1 > modifier) {
              modifier = imperil / 100 + 1;
            }
          });
        }
      });

      this.modifierElements[element] = modifier;
    });
  }

  private getImperil(ability: any, element: string) {
    let imperilValue = null;
    ability.imperils.forEach(imperil => {
      if (imperil.type == element) {
        imperilValue = imperil.value;
        return;
      }
    });

    return imperilValue;
  }

  private calculateTotalDamage() {
    this.units.forEach(unit => {
      if (unit) {
        unit.selectedAbilities.forEach(ability => {
          let totalDamage = 0;
          let realIgnore = ability.ignore * 2 / 100 + 1;
          let base = ability.damage === 'hybrid' ? ability.base / 2 : ability.base;

          if (unit.elements.length > 0) {
            unit.elements.forEach(element => {
              totalDamage += (1 / unit.elements.length) * base * realIgnore * this.modifierElements[element];
            })
          } else {
            totalDamage = base * realIgnore;
          }

          ability.totalDamage = totalDamage;
        });
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
        return;
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
          if (a.type == 0) {
            return -1;
          } else {
            return 1;
          }
        }
      });

      if (unit.multiAbilities) {
        let i = 0;
        unit.frames.forEach((frame, index) => {
          if (i !== 0 && unit.frames[i].frame === frame.frame) {
            frame.frame += 0.5;
          }
          i = index;
        });
      }
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

    this.calculateTotal(unit, combo, hit.abilityIndex);
    this.nbCombo[unitPosition]++;
    this.nbHits++;
    this.lastHitter = unitPosition;
  }

  private calculateTotal(unit: any, combo: boolean, abilityIndex: number): void {
    if (combo) {
      let elementsModifier = this.calculateModifierByElements(unit);
      this.multi += 0.1 + elementsModifier;
      if (this.multi < unit.maxChainCap && this.hits[this.nbHits] === this.hits[this.nbHits - 1]) {
        this.multi += 0.3;
      }

      if (this.multi > unit.maxChainCap) {
        this.multi = unit.maxChainCap;
      }

      this.combo[this.combo.length - 1]++;
    } else {
      this.multi = 1;
      this.combo.push(0);
    }

    this.lastElements = unit.elements;
    this.total = this.total + ((unit.selectedAbilities[abilityIndex].totalDamage * this.hitsDamage[this.nbHits] / 100) * this.multi);
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
