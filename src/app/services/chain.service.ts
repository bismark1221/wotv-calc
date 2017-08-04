import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { Chain } from '../entities/chain';

@Injectable()
export class ChainService {
  calculateChain(chain: Chain): Promise<Chain> {

    var unit1Damage = 1 / 1 * chain.unit1.abilities[0].base * 1 * 1;
    var hitDamage = unit1Damage / chain.unit1.abilities[0].hits;

    // hits unit X nb_perso X ambi
    var hits = chain.unit1.abilities[0].hits * 2 * 2 - 1;
    var total = hitDamage;
    var multi = 1;
    var spark = false;

    for (var i = 1; i <= hits; i++) {
      multi = multi + 0.1 + 1 * 0.2 + (spark && multi % 2 != 0 ? 0.3 : 0);
      multi > 4 ? multi = 4 : true;
      total = total + (hitDamage * multi)
    }

    chain.result = Math.round(total).toString();

    var hit1 = chain.unit1.abilities[0].hits;
    var hit2 = chain.unit2.abilities[0].hits;

    var frames1 = chain.unit1.abilities[0].frames;
    var frames2 = chain.unit2.abilities[0].frames;

    for (var i = 1; i <= hit1; i++) {
      console.log(i * frames1)
    }
console.log('----------')
    for (var i = 1; i <= hit2; i++) {
      console.log(i * frames2)
    }

console.log('@@@@@@@@@@@@')

    var combo: any[] = [];
    var nbMulti = 0;
    var nbCombo1 = 1;
    var nbCombo2 = 1;
    var nbCombo = 1;

    for (var i = 0; i < Math.max(hit1, hit2); i++) {
      console.log("### " + (nbCombo1 * frames1) + " ###")
      //console.log("compare " + nbCombo1 + ":" + nbCombo1 * frames1 + '//' + nbCombo2 + ":" + (nbCombo2 - 1) * frames2)
      console.log('i : ' + i)
      console.log('nbCombo1 : ' + nbCombo1)
      console.log('nbCombo2 : ' + nbCombo2)
      console.log('nbCombo : ' + nbCombo)
      console.log('nbMulti : ' + nbMulti)
      //console.log("control loop " + nbCombo2 + ":" + (hit2 + nbMulti))
      if (nbCombo1 * frames1 < (nbCombo2 - 1) * frames2 || nbCombo2 >= hit2 + nbMulti) {
        combo[nbMulti] = {
          num: (nbCombo1 > 1 ? nbCombo1 - 1 : 1),
          combo: (nbCombo > 1 ? (nbCombo - 1) * 2 - 1 : 1)
        }

        if (nbCombo1 * frames1 < (nbCombo2 - 1) * frames2) {
          console.log((nbCombo1 > 1 ? nbCombo1 - 1 : 1) + " break for frame " + nbCombo1 * frames1 + " -- " + (nbCombo2 - 1) * frames2)
        }

        if (nbCombo2 >= hit2 + nbMulti) {
          console.log((nbCombo1 > 1 ? nbCombo1 - 1 : 1) + " break for no more 2")
        }

        nbCombo2 = (nbCombo2 >= hit2 + nbMulti ? nbCombo2 : nbCombo2 - 1);
        nbCombo = 1;
        nbMulti++;

      }
      console.log("#####")
      nbCombo1++;
      nbCombo2++;
      nbCombo++;
    }

    combo[nbMulti] = {
      num: (nbCombo1 > 1 ? nbCombo1 - 1 : 1),
      combo: (nbCombo > 1 ? (nbCombo - 1) * 2 - 1 : 1)
    }

    console.log(combo);

    return Promise.resolve(chain);
  }
}


/*
1--2--3--4--5--6--7--8--9-10-11-12
5 10 15 20 25 30 35 40 45 50 55 60
----------
7 14 21 28 35 42 49
######
5 10 15 20 25 30 35 40 45 50 55 60
----------
7 14 -- 21 28 35 -- 42 49 -- -- --
      1          2        3  4  5

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
