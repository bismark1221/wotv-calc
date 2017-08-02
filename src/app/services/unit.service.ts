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
}
