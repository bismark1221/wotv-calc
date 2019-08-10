import { Injectable } from '@angular/core';

import{ UnitService } from './unit.service';

@Injectable()
export class DamageService {
  unit = {
    atk: {
      base: 0,
      total: 0,
      real: 0
    },
    mag: {
      base: 0,
      total: 0,
      real: 0
    },
    buffs: {
      passive: {},
      abilities: []
    },
    levelCorrection: 1,
    abilities: [],
    passiveBoostModifiers: [],
    rarity: 7,
    dualWield: false,
    weapons: [],
    boostModifier: []
  };

  monster = {
    def: {
      base: 0,
      real: 0
    },
    spr: {
      base: 0,
      real: 0
    },
    breaks: {
      passive: {
        def: 0,
        spr: 0
      },
      abilities: []
    }
  };

  result = {
    unit: {},
    monster: {},
    damage: {}
  };

  constructor(private unitService: UnitService) {}

  calculateTotalDamage(unit, monster, rounds) {
    this.result = {};
    unit = JSON.parse(JSON.stringify(unit));

    this.unit.atk.total = unit.stats.atk.total ? unit.stats.atk.total : unit.stats.atk.base + unit.stats.atk.potValue;
    this.unit.atk.base = unit.stats.atk.base + unit.stats.atk.potValue;

    this.unit.mag.total = unit.stats.mag.total ? unit.stats.mag.total : unit.stats.mag.base + unit.stats.mag.potValue;
    this.unit.mag.base = unit.stats.mag.base + unit.stats.mag.potValue;

    this.unit.buffs.passive = unit.buffs;
    this.unit.rarity = unit.rarity.value;

    this.monster.def.base = monster.stats.def;
    this.monster.spr.base = monster.stats.spr;
    this.monster.breaks.passive.def = unit.breaks.def;
    this.monster.breaks.passive.spr = unit.breaks.spr;

    this.unit.dualWield = unit.damageWeapons[0].type === "noWeapon" || unit.damageWeapons[1].type === "noWeapon" ? false : true;
    this.unit.weapons = unit.damageWeapons;

    this.unit.abilities = unit.abilities;
    this.unit.passiveBoostModifiers = unit.passiveBoostModifiers ? unit.passiveBoostModifiers : [];


    // Maths !!!
    this.unit.levelCorrection = 1 + unit.level / 100;

    this.updatePassiveModifier();

    this.calculateDamage(rounds);

    this.result.unit = this.unit;
    this.result.monster = this.monster

    return this.result;
  }

  private updatePassiveModifier() {
    this.unit.passiveBoostModifiers.forEach(boost => {
      if (this.unit.rarity >= boost.rarity) {
        this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, boost.id)].base += boost.value;
      }
    })
  };

  private calculateDamage(rounds) {
    this.result.damage = [];

    rounds.forEach((round, roundIndex) => {
      this.result.damage[roundIndex] = {
        abilities: []
      };

      round.selectedAbilities.forEach(abilityId => {
        let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
        // console.log(ability)

        this.initializeAbility(ability);

        if (ability.damage === "physic") {
          // console.log("physic damage");




        } else if (ability.damage === "magic") {
          // console.log("magic damage");



        } else {
          // console.log("hybrid damage");

          let atk = 0;
          if (this.unit.dualWield) {
            // atk = Math.pow(this.unit.atk.total - this.unit.weapons[1].atk + (this.unit.atk.base * this.unit.buffs.atk / 100), 2);
          } else {
            atk = this.getRealUnitStat("atk");
          }

          ability.chainMod = 1;
          ability.elementResistances = 1;
          let killerPourcentage = 1;
          let jumpDamage = 1;

          let atkDamage = atk / (this.getRealMonsterStat("def") * ((100 - ability.ignore) / 100))
            * this.getRealModifier(ability) * this.unit.levelCorrection * (this.unit.weapons[0].varianceMin / 100) * ability.chainMod * killerPourcentage * jumpDamage * ability.elementResistances;

          let magDamage = this.getRealUnitStat("mag") / (this.getRealMonsterStat("spr") * ((100 - ability.ignore) / 100))
            * this.getRealModifier(ability) * this.unit.levelCorrection * ability.chainMod * killerPourcentage * ability.elementResistances;

          // console.log("atk : " + atk)
          // console.log("this.monster.def.real : " + this.monster.def.real)
          // console.log("ability.ignore : " + ability.ignore)
          // console.log("ability.base : " + ability.base)
          // console.log("this.unit.levelCorrection : " + this.unit.levelCorrection)
          // console.log("this.unit.weapons[0].varianceMin : " + this.unit.weapons[0].varianceMin)
          // console.log("ability.chainMod : " + ability.chainMod)
          // console.log("killerPourcentage : " + killerPourcentage)
          // console.log("jumpDamage : " + jumpDamage)
          // console.log("ability.elementResistances : " + ability.elementResistances)
          // console.log("RESULT ATK : " + atkDamage)
          // console.log("RESULT MAG : " + magDamage)

          this.result.damage[roundIndex].abilities.push((atkDamage + magDamage) / 2 * 0.85);
        }

        this.finalizeAbility(ability);
      });

      this.finalizeRound();
    });
  }

  private getRealModifier(ability) {
    let modifier = ability.base;
    this.unit.boostModifier.forEach(boost => {
      if (boost.id === ability.id) {
        modifier += boost.value;
      }
    });

    return modifier;
  }

  private getRealUnitStat(type) {
    let bestBuff = this.unit.buffs.passive[type];
    this.unit.buffs.abilities.forEach(buff => {
      if (buff.type === type && buff.value > bestBuff) {
        bestBuff = buff.value
      }
    });

    // console.log("UNIT STAT")
    // console.log(Math.pow(this.unit[type].total + (this.unit[type].base * bestBuff / 100), 2))

    return Math.pow(this.unit[type].total + (this.unit[type].base * bestBuff / 100), 2);
  }

  private getRealMonsterStat(type) {
    let bestBreak = this.monster.breaks.passive[type];
    this.monster.breaks.abilities.forEach(monsterBreak => {
      if (monsterBreak.type === type && monsterBreak.value > bestBreak) {
        bestBreak = monsterBreak.value
      }
    });

    // console.log("MONSTER STAT")
    // console.log(this.monster[type].base * ((100 - bestBreak) / 100))

    return this.monster[type].base * ((100 - bestBreak) / 100);
  }

  private initializeAbility(ability) {
    this.addBreaks(ability);
    this.addBuffs(ability);
    this.addModifierBoosts(ability);
  }

  private finalizeAbility(ability) {
  }

  private finalizeRound() {
    this.reduceTurns();

    console.log("END ROUND ==>")
    console.log(JSON.parse(JSON.stringify(this.unit)))
    console.log("<===========>")
  }


  private addBreaks(ability) {

  };


  private addBuffs(ability) {

  };


  private addModifierBoosts(ability) {
    ability.boostModifiers.forEach(newBoost => {
      let alreadyBoosted = false;
      this.unit.boostModifier.forEach(oldBoost => {
        if (newBoost.uniqueIdentifier === oldBoost.uniqueIdentifier && newBoost.id === oldBoost.id && newBoost.value === oldBoost.value) {
          alreadyBoosted = true;
          oldBoost.turn = newBoost.turn;
        }
      });

      if (!alreadyBoosted) {
        this.unit.boostModifier.push(JSON.parse(JSON.stringify(newBoost)));
      }
    });
  };

  private reduceTurns() {
    let boostToRemove = [];
    this.unit.boostModifier.forEach((boost, boostIndex) => {
      boost.turn -= 1;
      if (boost.turn === 0) {
        boostToRemove.unshift(boostIndex);
      }
    })

    boostToRemove.forEach(boostIndex => {
      this.unit.boostModifier.splice(boostIndex, 1);
    });
  }


}



/*

=IF(A25="Physique", (IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * 0.85 * F17 * F33 * (1 + G3) * (1 - A37),
 IF(A25="Magique", (B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * 0.85 * F17 * F33 * (1 - A37),
(((IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * F17 * F33 * (1 + G3) * (1 - A37)) + ((B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * F17 * F33 * (1 - A37))) / 2 * 0.85))
*/
