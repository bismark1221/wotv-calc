import { Injectable } from '@angular/core';

import{ UnitService } from './unit.service';
import{ ChainService } from './chain.service';

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
    killers: {
      passive: {},
      abilities: []
    },
    imperils: {
      passive: {},
      abilities: []
    },
    imbues: {
      passive: [],
      abilities: []
    },
    levelCorrection: 1,
    abilities: [],
    rarity: 7,
    dualWield: false,
    weapons: [],
    boostModifier: [],
    maxChainCap: 4
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
    },
    races: [],
    resistances: []
  };

  result = {
    unit: {},
    monster: {},
    damage: {}
  };

  constructor(
    private unitService: UnitService,
    private chainService: ChainService
  ) {}

  calculateTotalDamage(unit, monster, rounds) {
    this.result = {unit: {}, monster: {}, damage: {}};

    unit = JSON.parse(JSON.stringify(unit));

    this.unit.atk.total = unit.stats.atk.total ? unit.stats.atk.total : unit.stats.atk.base + unit.stats.atk.potValue;
    this.unit.atk.base = unit.stats.atk.base + unit.stats.atk.potValue;

    this.unit.mag.total = unit.stats.mag.total ? unit.stats.mag.total : unit.stats.mag.base + unit.stats.mag.potValue;
    this.unit.mag.base = unit.stats.mag.base + unit.stats.mag.potValue;

    this.unit.buffs.passive = unit.buffs;
    this.unit.rarity = unit.rarity.value;
    this.unit.maxChainCap = unit.maxChainCap;

    this.monster.def.base = monster.stats.def;
    this.monster.spr.base = monster.stats.spr;
    this.monster.breaks.passive.def = unit.breaks.def;
    this.monster.breaks.passive.spr = unit.breaks.spr;
    this.monster.races = monster.races;
    this.monster.resistances = monster.resistances;

    this.unit.dualWield = unit.damageWeapons[0].type === "noWeapon" || unit.damageWeapons[1].type === "noWeapon" ? false : true;
    this.unit.weapons = unit.damageWeapons;

    this.unit.abilities = unit.abilities;

    // Maths !!!
    this.unit.levelCorrection = 1 + unit.level / 100;

    this.updatePassiveKillers(unit);
    this.updatePassiveModifiers(unit);
    this.updatePassiveImbues(unit);
    this.updatePassiveImperils(unit);

    this.calculateDamage(rounds);

    this.result.unit = this.unit;
    this.result.monster = this.monster

    return this.result;
  }

  private updatePassiveImbues(unit) {
    for (let i =0; i <2; i++) {
      if (unit.damageWeapons[i].type !== "noWeapon") {
        unit.damageWeapons[i].elements.forEach(element => {
          if (this.unit.imbues.passive.indexOf(element, 0) === -1) {
            this.unit.imbues.passive.push(element);
          }
        });
      }
    }
  }

  private updatePassiveKillers(unit) {
    this.unit.killers.passive = {};
    unit.passiveKillers.forEach(killer => {
      if (this.unit.rarity >= killer.rarity) {
        if (!this.unit.killers.passive[killer.race]) {
          this.unit.killers.passive[killer.race] = {
            physic: killer.physic,
            magic: killer.magic
          }
        } else {
          this.unit.killers.passive[killer.race].physic += killer.physic;
          this.unit.killers.passive[killer.race].magic += killer.magic;
        }
      }
    })
  };

  private updatePassiveImperils(unit) {
    this.unit.imperils.passive = {};
    Object.keys(unit.imperils).forEach(element => {
      if (!this.unit.imperils.passive[element]) {
        this.unit.imperils.passive[element] = unit.imperils[element];
      }
    });
  };

  private updatePassiveModifiers(unit) {
    unit.passiveBoostModifiers.forEach(boost => {
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

      this.getChainMod(round);

      round.selectedAbilities.forEach((abilityId, abilityIndex) => {
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



          let jumpDamage = 1;
          let lbDamage = 1;



          let elementResistances = this.getElementResistances(ability, "physic");
          let modifier = this.getRealModifier(ability);

          let atkDamage = atk / (this.getRealMonsterStat("def") * ((100 - ability.ignore) / 100))
            * modifier * this.unit.levelCorrection * (this.unit.weapons[0].varianceMin / 100) * round.chainMod[abilityIndex] * this.getRealKiller("physic") * jumpDamage * elementResistances;

          let magDamage = this.getRealUnitStat("mag") / (this.getRealMonsterStat("spr") * ((100 - ability.ignore) / 100))
            * modifier * this.unit.levelCorrection * round.chainMod[abilityIndex] * this.getRealKiller("magic") * elementResistances;

          this.result.damage[roundIndex].abilities.push((atkDamage + magDamage) / 2);
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

  private getRealKiller(type) {
    let killer = 1;
    this.monster.races.forEach(race => {
      if (this.unit.killers.passive[race]) {
        killer += (this.unit.killers.passive[race][type] / 100) / this.monster.races.length;
      }

      let valueAbility = 0;
      this.unit.killers.abilities.forEach(abilityKiller => {
        if (abilityKiller.race === race && valueAbility < abilityKiller[type]) {
          valueAbility = abilityKiller[type];
        }
      });
      killer += (valueAbility / 100) / this.monster.races.length;
    });

    // console.log("killers")
    // console.log(killer)

    return killer;
  }

  private getElementResistances(ability, type) {
    let elementResistance = 1;

    let unitElements = ability.elements;

    if (type === "physic"){
      this.unit.imbues.passive.forEach(element => {
        if (unitElements.indexOf(element, 0) === -1) {
          unitElements.push(element);
        }
      });

      this.unit.imbues.abilities.forEach(element => {
        if (unitElements.indexOf(element.element, 0) === -1) {
          unitElements.push(element.element);
        }
      });
    }

    unitElements.forEach(element => {
      let resistance = this.monster.resistances[element] ? this.monster.resistances[element] : 0;
      let unitImperil = 0;

      if (this.unit.imperils.passive[element]) {
        unitImperil = this.unit.imperils.passive[element];
      }

      this.unit.imperils.abilities.forEach(imperil => {
        if (imperil.type === element && unitImperil < imperil.value) {
          unitImperil = imperil.value
        }
      });
      resistance -= unitImperil;

      elementResistance += (-resistance / unitElements.length) / 100;
    });

    return elementResistance;
  }


/// 50 - 100 = -50 ==> 50
/// 50 - 25 = 25 ==> -25

  private initializeAbility(ability) {
    this.addBreaks(ability);
    this.addBuffs(ability);
    this.addModifierBoosts(ability);
    this.addKillers(ability);
    this.addImbues(ability);
    this.addImperils(ability);
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
    ability.breaks.forEach(newBreak => {
      let alreadyBreak = false;
      this.monster.breaks.abilities.forEach(oldBreak => {
        if (newBreak.value === oldBreak.value) {
          alreadyBreak = true;
          oldBreak.turn = newBreak.turn;
        }
      });

      if (!alreadyBreak) {
        this.monster.breaks.abilities.push(JSON.parse(JSON.stringify(newBreak)));
      }
    });
  };


  private addBuffs(ability) {
    ability.buffs.forEach(newBuff => {
      let alreadyBuff = false;
      this.unit.buffs.abilities.forEach(oldBuff => {
        if (newBuff.value === oldBuff.value) {
          alreadyBuff = true;
          oldBuff.turn = newBuff.turn;
        }
      });

      if (!alreadyBuff) {
        this.unit.buffs.abilities.push(JSON.parse(JSON.stringify(newBuff)));
      }
    });
  }


  private addKillers(ability) {
    ability.killers.forEach(newKiller => {
      let alreadyKiller = false;
      this.unit.killers.abilities.forEach(oldKiller => {
        if (newKiller.race === newKiller.race && (newKiller.physic === oldKiller.physic || newKiller.magic === oldKiller.magic)) {
          alreadyKiller = true;
          oldKiller.turn = newKiller.turn;
        }
      });

      if (!alreadyKiller) {
        this.unit.killers.abilities.push(JSON.parse(JSON.stringify(newKiller)));
      }
    });
  }


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
  }


  private addImbues(ability) {
    ability.imbues.forEach(newImbue => {
      let alreadyImbue = false;
      this.unit.imbues.abilities.forEach(oldImbue => {
        if (newImbue.type === oldImbue.type) {
          alreadyImbue = true;
          oldImbue.turn = newImbue.turn;
        }
      });

      if (!alreadyImbue) {
        this.unit.imbues.abilities.push(JSON.parse(JSON.stringify(newImbue)));
      }
    });
  }


  private addImperils(ability) {
    ability.imperils.forEach(newImperil => {
      let alreadyImperil = false;
      this.unit.imperils.abilities.forEach(oldImperil => {
        if (newImperil.type === oldImperil.type && newImperil.value === oldImperil.value) {
          alreadyImperil = true;
          oldImperil.turn = newImperil.turn;
        }
      });

      if (!alreadyImperil) {
        this.unit.imperils.abilities.push(JSON.parse(JSON.stringify(newImperil)));
      }
    });
  }


  private reduceTurns() {
    let TypesToRemove = [["monster", "breaks"], ["unit", "buffs"], ["unit", "killers"]];
    TypesToRemove.forEach(type => {
      let elementToRemove = [];
      this[type[0]][type[1]].abilities.forEach((element, elementIndex) => {
        element.turn -= 1;
        if (element.turn === 0) {
          elementToRemove.unshift(elementIndex);
        }
      })

      elementToRemove.forEach(elementIndex => {
        this[type[0]][type[1]].abilities.splice(elementIndex, 1);
      });
    });

    let elementToRemove = [];
    this.unit.boostModifier.forEach((element, elementIndex) => {
      element.turn -= 1;
      if (element.turn === 0) {
        elementToRemove.unshift(elementIndex);
      }
    })

    elementToRemove.forEach(elementIndex => {
      this.unit.boostModifier.splice(elementIndex, 1);
    });
  }


  private getChainMod(round, spark = false) {
    this.chainService.units[0] = this.unit;
    this.chainService.units[0].selectedAbilities = [];
    round.selectedAbilities.forEach(abilityId => {
      this.chainService.units[0].selectedAbilities.push(this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)])
    });
    this.chainService.units[1] = JSON.parse(JSON.stringify(this.chainService.units[0]));
    this.chainService.getChain();

    let unitMultiplier = [];
    let multiplierList = this.chainService.getMultiplierList();

    multiplierList.forEach(multiplier => {
      if (!unitMultiplier[multiplier.unit]) {
        unitMultiplier[multiplier.unit] = [];
      }
      if (!unitMultiplier[multiplier.unit][multiplier.ability]) {
        unitMultiplier[multiplier.unit][multiplier.ability] = 0;
      }

      let damageHit = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, round.selectedAbilities[multiplier.ability])].base * (multiplier.weight / 100) * multiplier.multi;
      unitMultiplier[multiplier.unit][multiplier.ability] += damageHit;
    });

    round.chainMod = [];

    unitMultiplier.forEach((unitMulti, indexUnit) => {
      unitMulti.forEach((abilityMulti, indexAbility) => {
        let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, round.selectedAbilities[indexAbility])];
        round.chainMod[indexAbility] = 0;
        let dual = this.unit.dualWield && round.selectedAbilities.length === 1 && ability.dualable;
        round.chainMod[indexAbility] = (abilityMulti / ability.base) / (dual ? 2 : 1);
      });
    });

    // console.log("== Get Chain Mod ==")
    // console.log(round)
  }


}



/*

=IF(A25="Physique", (IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * 0.85 * F17 * F33 * (1 + G3) * (1 - A37),
 IF(A25="Magique", (B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * 0.85 * F17 * F33 * (1 - A37),
(((IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * F17 * F33 * (1 + G3) * (1 - A37)) + ((B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * F17 * F33 * (1 - A37))) / 2 * 0.85))
*/
