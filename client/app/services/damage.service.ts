import { Injectable } from '@angular/core';

import{ UnitService } from './unit.service';

@Injectable()
export class DamageService {
  unit = {
    atk: {},
    mag: {},
    buffs: {},
    levelCorrection: 1,
    abilities: []
  };
  monster = {
    def: {},
    spr: {},
    breaks: {}
  };

  constructor(private unitService: UnitService) {}

  calculateTotalDamage(unit, monster, rounds) {
    let result = {};

    this.unit.atk.total = unit.stats.atk.total ? unit.stats.atk.total : unit.stats.atk.base + unit.stats.atk.potValue;
    this.unit.atk.base = unit.stats.atk.base + unit.stats.atk.potValue;

    this.unit.mag.total = unit.stats.mag.total ? unit.stats.mag.total : unit.stats.mag.base + unit.stats.mag.potValue;
    this.unit.mag.base = unit.stats.mag.base + unit.stats.mag.potValue;

    this.unit.buffs = unit.buffs;

    this.monster.def.base = monster.stats.def;
    this.monster.spr.base = monster.stats.spr;
    this.monster.breaks.def = unit.breaks.def;
    this.monster.breaks.spr = unit.breaks.spr;

    this.unit.dualWield = unit.damageWeapons[0].type === "noWeapon" || unit.damageWeapons[1].type === "noWeapon" ? false : true;

    this.unit.abilities = unit.abilities;


    // Maths !!!
    this.monster.def.real = this.monster.def.base * ((100 - this.monster.breaks.def) / 100);
    this.monster.spr.real = this.monster.spr.base * ((100 - this.monster.breaks.spr) / 100);

    this.unit.atk.real = Math.pow(this.unit.atk.total + (this.unit.atk.base * this.unit.buffs.atk / 100), 2);
    this.unit.mag.real = Math.pow(this.unit.mag.total + (this.unit.mag.base * this.unit.buffs.mag / 100), 2);

    this.unit.levelCorrection = 1 + unit.level / 100;

    rounds.forEach(round => {
      round.selectedAbilities.forEach(abilityId => {
        let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
        console.log(ability)
        if (ability.damage === "physic") {
          console.log("physic damage");
        } else if (ability.damage === "magic") {
          console.log("magic damage");
        } else {
          console.log("hybrid damage")
        }
      });
    });


    result.unit = this.unit;
    result.monster = this.monster

    return result;
  }
}



/*

=IF(A25="Physique", (IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * 0.85 * F17 * F33 * (1 + G3) * (1 - A37),
 IF(A25="Magique", (B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * 0.85 * F17 * F33 * (1 - A37),
(((IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * F17 * F33 * (1 + G3) * (1 - A37)) + ((B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * F17 * F33 * (1 - A37))) / 2 * 0.85))
*/
