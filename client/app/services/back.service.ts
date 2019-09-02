import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ChainService } from './chain.service';

@Injectable()
export class BackService {
  chainService: ChainService;

  private findBestChainsUrl = 'api/find-best';

  private requestsUrl = 'api/request';

  constructor(private http: HttpClient) { }

  async saveRequest(units: any[], modified: boolean) {
    let body = {
      modified: modified,
      moving: false,
      units: this.formatUnitsForRequest(units)
    }

    try {
      // const response = await this.http.post(this.requestsUrl, body).toPromise();
      // return response.json();
    } catch (error) {
      return error.json();
    }
  }

  private formatUnitsForRequest(units) {
    let formattedUnits = [];

    units.forEach(unit => {
      if (!unit || unit.id === 'unselect') {
        formattedUnits.push(null);
      } else {
        let formattedUnit = {
          id: unit.id,
          dual: unit.dual,
          weapons: unit.weapons,
          ability: {
            id: unit.ability.id,
            base: unit.ability.base,
            castTime: unit.ability.castTime,
            damage: unit.ability.damage,
            imperils: unit.ability.imperils,
            dualable: unit.ability.dualable,
            elements: unit.ability.elements,
            framesList: unit.ability.framesList,
            hitDamage: unit.ability.hitDamage,
            ignore: unit.ability.ignore,
            offset: unit.ability.offset,
            range: unit.ability.range,
            type: unit.ability.type
          }
        }

        formattedUnits.push(formattedUnit);
      }
    });

    return formattedUnits;
  }

  async getRequest(id: string) {
    try {
      // const response = await this.http.get(this.requestsUrl + '/' + id).toPromise();
      // return response.json();
    } catch (error) {
      return error.json();
    }
  }

  async findBestFrames() {
    try {
      // const response = await this.http.get(this.findBestChainsUrl).toPromise();
      // return response.json();
    } catch (error) {
      return error.json();
    }
  }
}
