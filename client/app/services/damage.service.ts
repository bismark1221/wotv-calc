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
    maxChainCap: 4,
    dots: [],
    delayAttack: {},
    jump: {
      round: 0,
      damage: "physic",
      damageType: null,
      id: null,
      elements: null,
      imperils: null,
      ignore: null,
      type: null,
      jumpType: null,
      framesList: null
    }
  };

  monster = {
    def: {
      breakable: 0,
      unbreakable: 0,
      real: 0
    },
    spr: {
      breakable: 0,
      unbreakable: 0,
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
    damage: {},
    summary: []
  };

  bestBreaks = {
    def: 0,
    spr: 0
  };

  bestBuffs = {
    atk: 0,
    mag: 0
  };

  bestElementResistances = {};
  bestKillers = {};

  constructor(
    private unitService: UnitService,
    private chainService: ChainService
  ) {}

  calculateTotalDamage(unit, monster, rounds) {

    console.log("RECEIVE IN SERVICE")
    console.log(unit)
    console.log(rounds)

    this.result = {unit: {}, monster: {}, damage: [], summary: []};
    this.bestBreaks = {def: 0, spr: 0};
    this.bestBuffs = {atk: 0, mag: 0};
    this.bestElementResistances = {};
    this.bestKillers = {};

    unit = JSON.parse(JSON.stringify(unit));

    this.unit.atk.total = unit.stats.atk.total ? unit.stats.atk.total : unit.stats.atk.base + unit.stats.atk.potValue;
    this.unit.atk.base = unit.stats.atk.base + unit.stats.atk.potValue;

    this.unit.mag.total = unit.stats.mag.total ? unit.stats.mag.total : unit.stats.mag.base + unit.stats.mag.potValue;
    this.unit.mag.base = unit.stats.mag.base + unit.stats.mag.potValue;

    this.unit.buffs.passive = unit.buffs;
    this.unit.rarity = unit.rarity.value;
    this.unit.maxChainCap = unit.maxChainCap;

    this.monster.def.breakable = monster.stats.def.breakable;
    this.monster.def.unbreakable = monster.stats.def.unbreakable;
    this.monster.spr.breakable = monster.stats.spr.breakable;
    this.monster.spr.unbreakable = monster.stats.spr.unbreakable;
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
        abilities: [],
        total: 0
      };
      this.result.summary[roundIndex] = [];

      let abilitiesBeforeDualWield = JSON.parse(JSON.stringify(round.selectedAbilities));
      this.manageDualWield(round);

      round.selectedAbilities.forEach((abilityId, abilityIndex) => {
        this.result.summary[roundIndex][abilityIndex] = [];

        if (abilityId !== 0) {
          let ability = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)];
          let alreadyKiller = false;

          ability.effectOrder.forEach(effect => {
            console.log("TODO DAMAGE SERVICE -- " + effect)
            switch (effect) {
              case "damage":
                this.manageDamage(ability, round, abilityIndex, roundIndex, abilitiesBeforeDualWield);
                break;
              case "break":
                this.addBreaks(ability, abilityIndex, roundIndex);
                break;
              case "buff":
                this.addBuffs(ability, abilityIndex, roundIndex);
                break;
              case "imbue":
                this.addImbues(ability, abilityIndex, roundIndex);
                break;
              case "imperil":
                this.addImperils(ability, abilityIndex, roundIndex);
                break;
              case "boostModifier":
                this.addModifierBoosts(ability, abilityIndex, roundIndex);
                break;
              case "killer":
                if (!alreadyKiller) {
                  this.addKillers(ability, abilityIndex, roundIndex);
                  alreadyKiller = true;
                }
                break;
              case "jump":
                ;
                this.addJump(ability, abilityIndex, roundIndex);
                break;
              case "delayAttack":
                this.addDelayAttack(ability, abilityIndex, roundIndex);
                break;
              case "dot":

                break;
            }
          });
        } else {
          console.log("NONE STANDARD ABILITY")
          this.manageJump(round, roundIndex);
        }
      });

      this.finalizeRound();
    });
  }

  private manageDamage(ability, round, abilityIndex, roundIndex, abilitiesBeforeDualWield) {
    let chainMod = this.getChainMod(round, abilityIndex);
    let stats = {
      atk: this.getRealUnitStat("atk"),
      mag: this.getRealUnitStat("mag"),
      def: this.getRealMonsterStat("def"),
      spr: this.getRealMonsterStat("spr")
    };
    this.bestElementResistances = {};
    this.bestKillers = {};

    if (this.unit.dualWield && abilitiesBeforeDualWield.length === 1 && round.selectedAbilities.length === 2) {
      stats.atk = this.getRealUnitStat("atk", abilityIndex)
    }

    let jumpDamage = 1;
    let lbDamage = 1;

    let elementResistances = {
      physic: this.getElementResistances(ability, "physic"),
      magic: this.getElementResistances(ability, "magic")
    };
    let killers = {
      physic: this.getRealKiller("physic"),
      magic: this.getRealKiller("magic")
    };

    let totalDamage = 0;

    let modifier = this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, round.selectedAbilities[abilityIndex])].base;

    if (ability.damage === "physic") {
      totalDamage = stats.atk / (stats.def * ((100 - ability.ignore) / 100))
        * modifier * chainMod * this.unit.levelCorrection * ((this.unit.weapons[0].varianceMin + this.unit.weapons[0].varianceMax) / 2 / 100) * killers.physic * jumpDamage * elementResistances.physic;
    } else if (ability.damage === "magic") {
      totalDamage = stats.mag / (stats.spr * ((100 - ability.ignore) / 100))
        * modifier * chainMod * this.unit.levelCorrection * killers.magic * elementResistances.magic;
    } else {
      let atkDamage = stats.atk / (stats.def * ((100 - ability.ignore) / 100))
        * modifier * chainMod * this.unit.levelCorrection * ((this.unit.weapons[0].varianceMin + this.unit.weapons[0].varianceMax) / 2 / 100) * killers.physic * jumpDamage * elementResistances.physic;

      let magDamage = stats.mag / (stats.spr * ((100 - ability.ignore) / 100))
        * modifier * chainMod * this.unit.levelCorrection * killers.magic * elementResistances.magic;

      totalDamage = (atkDamage + magDamage) / 2;
    }

    console.log("##### RESULT DAMAGE #####")
    console.log(stats.atk)
    console.log(stats.def)
    console.log(ability.ignore)
    console.log("modifier : " + modifier)
    console.log("chainMod : " + chainMod)
    console.log(this.unit.levelCorrection)
    console.log(this.unit.weapons[0].varianceMin)
    console.log(this.unit.weapons[0].varianceMax)
    console.log(killers.physic)
    console.log(jumpDamage)
    console.log(elementResistances.physic)
    console.log(totalDamage)
    console.log("##### END DAMAGE #####")

    totalDamage = totalDamage > 0 ? totalDamage : 0;
    this.result.damage[roundIndex].abilities.push(totalDamage);
    this.result.damage[roundIndex].total += totalDamage;

    this.result.summary[roundIndex][abilityIndex].push({
      type: "damage",
      value: {
        type: ability.damage,
        value: totalDamage,
        bestBreaks: this.bestBreaks,
        bestBuffs: this.bestBuffs,
        damageElements: this.getDamageElements(ability, ability.damage === "hybrid" ? "physic" : "magic"),
        elementResistances: this.bestElementResistances,
        killers: this.bestKillers,
        lbDamage: null,
        jumpDamage: null
      }
    });
  }

  private manageJump(round, roundIndex) {
    console.log(this.unit.jump)
    this.unit.jump.round -= 1;
    if (this.unit.jump.round === 0) {
      this.unit.jump.damage = this.unit.jump.damageType;
      this.unit.jump.id = 0;
      this.unit.jump.elements = [];
      this.unit.jump.imperils = [];
      this.unit.jump.ignore = 0;
      this.unit.jump.jumpType = this.unit.jump.type;
      this.unit.jump.type = this.unit.jump.framesList.length >= 3 ? 'chain' : 'finish';
      this.removePreviousJumpFromAbitilies();
      this.unit.abilities.push(this.unit.jump);
      this.manageDamage(this.unit.jump, round, 0, roundIndex, [JSON.parse(JSON.stringify(this.unit.jump))]);
      console.log("LAND !!!!")
    } else {
      console.log("FLYING !!!!")
    }
  }

  private removePreviousJumpFromAbitilies() {
    let indexToRemove = null;
    this.unit.abilities.forEach((ability, index) => {
      if (ability.id === 0) {
        indexToRemove = index;
      }
    });
    this.unit.abilities.splice(indexToRemove, 1);
  }

  private manageDualWield(round) {
    if (this.unit.dualWield) {
      let firstAbilityId = round.selectedAbilities[0];
      let ability = JSON.parse(JSON.stringify(this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, firstAbilityId)]));

      if (round.selectedAbilities.length === 1 && ability && ability.dualable) {
        round.selectedAbilities.push(round.selectedAbilities[0]);
      }
    }
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

  private getRealUnitStat(type, dualWield = -1) {
    this.bestBuffs[type] = this.unit.buffs.passive[type];
    this.unit.buffs.abilities.forEach(buff => {
      if (buff.stat === type && buff.value > this.bestBuffs[type]) {
        this.bestBuffs[type] = buff.value
      }
    });

    let stat = Math.pow(this.unit[type].total + (this.unit[type].base * this.bestBuffs[type] / 100), 2);
    if (type === "atk" && dualWield > -1) {
      let stat = Math.pow((this.unit[type].total - this.unit.weapons[(dualWield === 0 ? 1 : 0)][type]) + (this.unit[type].base * this.bestBuffs[type] / 100), 2);
    }

    // console.log("UNIT STAT")
    // console.log(type + " : " + stat)

    return stat;
  }

  private getRealMonsterStat(type) {
    this.bestBreaks[type] = this.monster.breaks.passive[type];
    this.monster.breaks.abilities.forEach(monsterBreak => {
      if (monsterBreak.stat === type && monsterBreak.value > this.bestBreaks[type]) {
        this.bestBreaks[type] = monsterBreak.value
      }
    });

    // console.log("MONSTER STAT")
    // console.log(this.monster[type].unbreakable + this.monster[type].breakable * ((100 - this.bestBreaks[type]) / 100))

    return this.monster[type].unbreakable + this.monster[type].breakable * ((100 - this.bestBreaks[type]) / 100);
  }

  private getRealKiller(type) {
    let killer = 1;
    this.monster.races.forEach(race => {
      let raceKiller = 0;
      if (this.unit.killers.passive[race]) {
        raceKiller += this.unit.killers.passive[race][type] / this.monster.races.length;
      }

      let valueAbility = 0;
      this.unit.killers.abilities.forEach(abilityKiller => {
        if (abilityKiller.race === race && valueAbility < abilityKiller[type]) {
          valueAbility = abilityKiller[type];
        }
      });
      raceKiller += valueAbility / this.monster.races.length;

      if (!this.bestKillers[race]) {
        this.bestKillers[race] = raceKiller;
      }

      killer += raceKiller / 100;
    });

    // console.log("killers")
    // console.log(killer)

    return killer;
  }

  private getDamageElements(ability, type) {
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

    return unitElements;
  }

  private getElementResistances(ability, type) {
    let elementResistance = 1;
    let unitElements = this.getDamageElements(ability, type);

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

      if (!this.bestElementResistances[element]) {
        this.bestElementResistances[element] = resistance;
      }
    });

    return elementResistance;
  }

  private finalizeRound() {
    this.reduceTurns();

    // console.log("END ROUND ==>")
    // console.log(JSON.parse(JSON.stringify(this.unit)))
    // console.log("<===========>")
  }


  private addJump(ability, abilityIndex, roundIndex) {
    this.unit.jump = ability.jump;
    this.result.summary[roundIndex][abilityIndex].push({
      type: "jump"
    });
  };


  private addDelayAttack(ability, abilityIndex, roundIndex) {
    this.unit.delayAttack = ability.delayAttack;
    this.result.summary[roundIndex][abilityIndex].push({
      type: "delayAttack"
    });
  };


  private addBreaks(ability, abilityIndex, roundIndex) {
    ability.breaks.forEach(newBreak => {
      let alreadyBreak = false;
      this.monster.breaks.abilities.forEach(oldBreak => {
        if (newBreak.stat === oldBreak.stat && newBreak.value === oldBreak.value) {
          alreadyBreak = true;
          oldBreak.turn = newBreak.turn;
        }
      });

      if (!alreadyBreak) {
        this.monster.breaks.abilities.push(JSON.parse(JSON.stringify(newBreak)));
      }

      this.result.summary[roundIndex][abilityIndex].push({
        type: "break",
        value: {
          stat: newBreak.stat,
          value: newBreak.value
        }
      });
    });
  };


  private addBuffs(ability, abilityIndex, roundIndex) {
    ability.buffs.forEach(newBuff => {
      let alreadyBuff = false;
      this.unit.buffs.abilities.forEach(oldBuff => {
        if (newBuff.stat === oldBuff.stat && newBuff.value === oldBuff.value) {
          alreadyBuff = true;
          oldBuff.turn = newBuff.turn;
        }
      });

      if (!alreadyBuff) {
        this.unit.buffs.abilities.push(JSON.parse(JSON.stringify(newBuff)));
      }

      this.result.summary[roundIndex][abilityIndex].push({
        type: "buff",
        value: {
          stat: newBuff.stat,
          value: newBuff.value
        }
      });
    });
  }


  private addKillers(ability, abilityIndex, roundIndex) {
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

      this.result.summary[roundIndex][abilityIndex].push({
        type: "killer",
        value: {
          race: newKiller.race,
          type: newKiller.physic > 0 ? "physic" : "magic",
          value: newKiller.value
        }
      });
    });
  }


  private addModifierBoosts(ability, abilityIndex, roundIndex) {
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

      this.result.summary[roundIndex][abilityIndex].push({
        type: "modifierBoost",
        value: {
          abilityId: newBoost.id,
          value: newBoost.value
        }
      });
    });
  }


  private addImbues(ability, abilityIndex, roundIndex) {
    ability.imbues.forEach(newImbue => {
      let alreadyImbue = false;
      this.unit.imbues.abilities.forEach(oldImbue => {
        if (newImbue.element === oldImbue.element) {
          alreadyImbue = true;
          oldImbue.turn = newImbue.turn;
        }
      });

      if (!alreadyImbue) {
        this.unit.imbues.abilities.push(JSON.parse(JSON.stringify(newImbue)));
      }

      this.result.summary[roundIndex][abilityIndex].push({
        type: "imbue",
        value: {
          element: newImbue.element
        }
      });
    });
  }


  private addImperils(ability, abilityIndex, roundIndex) {
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

      this.result.summary[roundIndex][abilityIndex].push({
        type: "imperil",
        value: {
          element: newImperil.type,
          value: newImperil.value
        }
      });
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


  private getChainMod(round, abilityIndex, spark = false) {
    if (!round.chainMod) {
      this.chainService.units[0] = this.unit;
      this.chainService.units[0].framesGap = 0;
      this.chainService.units[0].selectedAbilities = [];
      let isChain = false;

      round.selectedAbilities.forEach((abilityId, indexRoundAbility) => {
        let ability = JSON.parse(JSON.stringify(this.unit.abilities[this.unitService.findPositionOfAbilityById(this.unit, abilityId)]));
        if (indexRoundAbility === abilityIndex) {
          ability.base = this.getRealModifier(ability);
        }
        this.chainService.units[0].selectedAbilities.push(ability);
        if (ability.type === "chain") {
          isChain = true;
        }
      });

      round.chainMod = [];

      console.log("@@@@&&&@&@&@&@&@&@&@&@")
      console.log(this.chainService.units[0].selectedAbilities)
      console.log("@@@@&&&@&@&@&@&@&@&@&@")

      if (!isChain) {
        if (this.chainService.units[0].selectedAbilities.length === 1 && this.chainService.units[0].selectedAbilities[0].jumpType && this.chainService.units[0].selectedAbilities.jumpType === "auto") {
          round.chainMod[0] = 1;
        } else {
          this.chainService.units[0].selectedAbilities.forEach((ability, index) => {
            round.chainMod[index] = 4;
          });
        }
      } else {
        this.chainService.units[1] = JSON.parse(JSON.stringify(this.chainService.units[0]));

        if (!spark) {
          this.chainService.units[1].framesGap = 1;
        }

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

          let damageHit = this.chainService.units[0].selectedAbilities[multiplier.ability].base * (multiplier.weight / 100) * multiplier.multi;
          unitMultiplier[multiplier.unit][multiplier.ability] += damageHit;
        });

        unitMultiplier.forEach((unitMulti, indexUnit) => {
          unitMulti.forEach((abilityMulti, indexAbility) => {
            let ability = this.chainService.units[0].selectedAbilities[indexAbility];
            round.chainMod[indexAbility] = abilityMulti / ability.base;
          });
        });

        console.log("== Get Chain Mod ==")
        console.log(multiplierList)
        console.log(unitMultiplier)
        console.log(round.chainMod)
      }
    }

    return round.chainMod[abilityIndex];
  }


}



/*

=IF(A25="Physique", (IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * 0.85 * F17 * F33 * (1 + G3) * (1 - A37),
 IF(A25="Magique", (B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * 0.85 * F17 * F33 * (1 - A37),
(((IF(F3="Oui",(B3 - A7 + C3 * C17) ^ 2, A33) / (C33 * ((100 - C25 * 100) / 100))) * B25 * E33 * IF(C5="Oui", D5, VLOOKUP(B5,R2:T22,2,false)) * F17 * F33 * (1 + G3) * (1 - A37)) + ((B33 / (D33 * ((100 - C25 * 100) / 100))) * B25 * E33 * F17 * F33 * (1 - A37))) / 2 * 0.85))
*/
