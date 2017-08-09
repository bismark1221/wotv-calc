import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Unit } from '../entities/unit';
import { UNITS } from '../data/units';

@Injectable()
export class UnitService {
  getUnits(): Promise<Unit[]> {
    return Promise.resolve(UNITS);
  }

  getUnit(id: number): Promise<Unit> {
    return this.getUnits().then(units => units.find(unit => unit.id === id));
  }

  calculateFrames(unit: Unit) {
    var hits: any[] = [] ;
    var totalFrames = unit.abilities[0].hits * unit.abilities[0].frames + unit.abilities[0].hits;
    var pourcentage = 100 * unit.abilities[0].frames / totalFrames;

    for (var i = 0; i < unit.abilities[0].hits * 2; i++) {
      hits[i] = {
        size: 1,
        type: 'hit'
      }

      i++;
      hits[i] = {
        size: pourcentage,
        type: 'frame'
      }
    }

    return hits;
  }
}
