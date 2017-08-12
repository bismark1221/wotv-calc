import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Unit } from '../entities/unit';
import { Ability } from '../entities/ability';
import { UNITS } from '../data/units';

@Injectable()
export class UnitService {
  getUnits(): Promise<Unit[]> {
    return Promise.resolve(UNITS).then(unitsFromJson => {
      let units: Unit[] = [];
      unitsFromJson.forEach(element => {
        let unit = new Unit();
        unit.constructUnitFromJson(element);
        units.push(unit);
      });
      return units;
    });
  }

  getUnit(id: number): Promise<Unit> {
    return this.getUnits().then(units => units.find(unit => unit.id === id));
  }

  calculateFrames(unit: Unit) {
    var hits: any[] = [] ;

    for (var i = 0; i < unit.abilities[0].hits; i++) {
      hits[i] = {
        name: unit.name,
        size: 1,
        frame: unit.abilities[0].frames * i,
        type: 'hit'
      }
    }

    return hits;
  }
}
