import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Chain } from '../entities/chain';

@Injectable()
export class ChainService {
  calculateChain(chain: Chain): Promise<Chain> {
    var hit1 = chain.unit1.abilities[0].hits;
    var hit2 = chain.unit2.abilities[0].hits;

    var frames1 = chain.unit1.abilities[0].frames;
    var frames2 = chain.unit2.abilities[0].frames;

    var chainHits: any[] = [];
    var nbHit = 0;
    var nbMulti = 0;
    var nbCombo1 = 1;
    var nbCombo2 = 1;

    for (var i = 0; i < Math.max(hit1, hit2); i++) {
      if (nbCombo1 * frames1 < (nbCombo2 - 1) * frames2 || nbCombo2 >= hit2 + nbMulti) {
        nbCombo2 = (nbCombo2 >= hit2 + nbMulti ? nbCombo2 : nbCombo2 - 1);
        nbMulti++;
      } else {
        chainHits[nbHit] = {
          unit: chain.unit2,
          hit: (nbCombo2 - 1) * frames2
        }
        nbHit++;
      }

      chainHits[nbHit] = {
        unit: chain.unit1,
        hit: nbCombo1 * frames1
      }
      nbHit++;

      nbCombo1++;
      nbCombo2++;
    }

    chain.unit1.hitDamage = (1 / 1 * chain.unit1.abilities[0].base * 1 * 1) / chain.unit1.abilities[0].hits;
    chain.unit2.hitDamage = (1 / 1 * chain.unit2.abilities[0].base * 1 * 1) / chain.unit2.abilities[0].hits;
    var total = chain.unit1.hitDamage;
    var multi = 1;
    var spark = false;

    chainHits.forEach(item => {
      multi = multi + 0.1 + 1 * 0.2 + (spark && multi % 2 != 0 ? 0.3 : 0);
      multi > 4 ? multi = 4 : true;
      total = total + (item.unit.hitDamage * multi)
    });

    chain.result = Math.round(total).toString();
    chain.hits = chainHits;

    return Promise.resolve(chain);
  }
}


/*
Total damage for a unit
1 / nb_elem x base x ignore_def x debuff_elem  + repeat for each elem




  var total = damage;
  var multi = 1;
  var combo = 1;

  while (combo <= hit) {
    multi = multi + 0.1 + elem * 0.2 + (spark && combo % 2 != 0 ? 0.3 : 0);
    multi > 4 ? multi = 4 : true;
    total = total + (damage * multi)
    combo = combo + 1
  }

  return total;







  */
