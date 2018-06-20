import { Injectable } from '@angular/core';


import { BehaviorSubject } from "rxjs";

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
    this.elements = this.elementsService.getElements();
    this.elements.splice(0, 1);
  }

  getChain() {
    this.frames = [];
    this.chainers = [];

    this.units.forEach((unit, index) => {
      if (unit) {
        unit.framesGap = unit.framesGap ? unit.framesGap : 0;
        unit.index = index;
        unit.frames = this.calculateUnitHits(unit);
        unit.abilitiesType = this.getAbilitiesType(unit);
        this.chainers.push(unit);
      }
    });

    this.getElements();
    this.calculateDebuffModifier();
    this.calculateTotalDamage();

    this.result.modifier = this.calculateChain();
    this.result.combo = this.combo.join(" + ");

    this.hitsDataSubject.next(this.hits);
    this.unitsDataSubject.next(this.units);
  }

  // Once Upon A Time
  private calculateUnitHits(unit: any) {
    let unitHits = [];
    let countFrames = unit.framesGap;
    let startFrames = unit.framesGap;

    unit.selectedAbilities.forEach((ability, index) => {
      if (index > 0) {
        startFrames += ability.offset + ability.castTime;
        countFrames = startFrames;
      }

      ability.framesList.split('-').forEach((hit, i) => {
        countFrames += Number(hit);
        unitHits.push({frame: countFrames, type: index, damage: ability.hitDamage[i], abilityIndex: index});
      });

      if (unit.dual && ability.dualable && unit.selectedAbilities.length === 1) {
        countFrames = startFrames + ability.offset + ability.castTime;
        ability.framesList.split('-').forEach((hit, i) => {
          countFrames += Number(hit);
          unitHits.push({frame: countFrames, type: index + 1, damage: ability.hitDamage[i], abilityIndex: index});
        });
      }
    });

    return unitHits;
  }

  private getAbilitiesType(unit: any): string {
    let type = "finish";

    unit.selectedAbilities.forEach(ability => {
      if (ability.type === "chain") {
        type = "chain";
        return;
      }
    });

    return type;
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

  private calculateDebuffModifier() {
    this.modifierElements = [];
    this.elements.forEach(element => {
      let modifier = 1;

      this.units.forEach(unit => {
        if (unit) {
          unit.selectedAbilities.forEach(ability => {
            let debuff = this.getDebuff(ability, element);
            if (unit && debuff && debuff / 100 + 1 > modifier) {
              modifier = debuff / 100 + 1;
            }
          });
        }
      });

      this.modifierElements[element] = modifier;
    });
  }

  private getDebuff(ability: any, element: string) {
    let debuffValue = null;
    ability.debuffs.forEach(debuff => {
      if (debuff.type == element) {
        debuffValue = debuff.value;
        return;
      }
    });

    return debuffValue;
  }

  private calculateTotalDamage() {
    this.units.forEach(unit => {
      if (unit) {
        unit.selectedAbilities.forEach(ability => {
          let totalDamage = 0;
          let realIgnore = ability.ignore * 2 / 100 + 1;

          if (unit.elements.length > 0) {
            unit.elements.forEach(element => {
              totalDamage += (1 / unit.elements.length) * ability.base * realIgnore * this.modifierElements[element];
            })
          } else {
            totalDamage = ability.base * realIgnore;
          }

          ability.totalDamage = totalDamage;
        });
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
          if (a.type == 0) {
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

    let type = combo || this.nbHits === 0 || this.chainers.length === 1 ? unit.selectedAbilities[hit.abilityIndex].type : 'break';
    type = type + hit.type;

    for (let i = 1; i <= this.chainers.length; i++) {
      if (this.nbHits > (i - 1) && this.hits[this.nbHits - i].unitName === unitName && this.hits[this.nbHits - i].hit === hit.frame) {
        this.hits[this.nbHits - i].divided = true;
        hit.frame += 0.5;
        divided = true;
      }
    }

    this.hits[this.nbHits] = {
      unitName: unitName,
      unitType: unit.abilitiesType,
      hit: hit.frame,
      damage: hit.damage,
      type: type,
      divided: divided,
      ability: hit.abilityIndex
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
    let ability = this.hits[this.nbHits].ability;
    this.total = this.total + ((unit.selectedAbilities[ability].totalDamage * this.hits[this.nbHits].damage / 100) * this.multi);
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
          firstHit: unit.selectedAbilities[0].firstHit,
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
