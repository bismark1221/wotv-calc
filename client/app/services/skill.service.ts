import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class SkillService {
  calcTypeFormat = {
    "0": "",
    "fixe": "",
    "percent": "%",
    "resistance": "%",
    "nullify": "x",
    "dispel": "x",
    "unknow": "x",
    undefined: "x"
  }

  counterType = {
    "ALL": "all",
    "PHYSIC": "physical",
    "MAGIC": "magical"
  }

  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(private translateService: TranslateService) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortEffectBuffs(effects) {
    effects.sort((a: any, b: any) => {
      let x = this.i(a.html);
      let y = this.i(b.html);

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
          if (xD < yD) { return -1; }
          else if (xD > yD) { return 1; }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
          this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
          this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
          if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
              return isNaN(this.oFxNcL) ? 1 : -1;
          }
          if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
              var comp = this.oFxNcL.localeCompare(this.oFyNcL);
              return comp / Math.abs(comp);
          }
          if (this.oFxNcL < this.oFyNcL) { return -1; }
          else if (this.oFxNcL > this.oFyNcL) { return 1; }
      }
    });

    return effects;
  }

  public sort(skills) {
    return skills.sort((a: any, b: any) => {
      if (a.jobLevel < b.jobLevel) {
        return -1
      } else if (a.jobLevel > b.jobLevel) {
        return 1
      } else {
        if (a.unlockStar < b.unlockStar) {
          return -1
        } else if (a.unlockStar > b.unlockStar) {
          return 1
        }
      }
    });
  }

  private getCalc(effect) {
    return this.calcTypeFormat[effect.calcType];
  }

  private getIncrease(effect) {
    if (effect.minValue < 0) {
      return "Decrease"
    } else {
      return "Increase"
    }
  }

  private getPositiveValue(value) {
    if (value < 0) {
      return -value;
    }

    return value
  }

  private getValue(effect, getPositiveValue = true) {
    let value = "";
    if (typeof(effect.minValue) === "number" || typeof(effect.value) === "number") {
      let minValue = typeof(effect.minValue) === "number" ? effect.minValue : effect.value;
      minValue = getPositiveValue ? this.getPositiveValue(minValue) : minValue;

      value = " (" + minValue + this.getCalc(effect) + this.getMaxValue(effect, getPositiveValue) + ")"
    }

    return value;
  }

  private getMaxValue(effect, getPositiveValue = true) {
    if (effect.minValue !== effect.maxValue) {
      let maxValue = getPositiveValue ? this.getPositiveValue(effect.maxValue) : effect.maxValue;

      return " => " + maxValue + this.getCalc(effect);
    }

    return "";
  }

  private getTurns(effect) {
    if (effect.turn) {
      return " for " + effect.turn + (effect.turnType === "COUNT" ? " time" : " turn") + (effect.turn > 1 ? "s" : "")
    }

    return "";
  }

  private getChance(effect, inflict = true) {
    if (effect.rate) {
      return effect.rate + "% chance" + (inflict ? " to inflict" : "")
    } else if (effect.calcType === "nullify") {
      return "Nullify"
    } else if (effect.calcType === "dispel") {
      return "Dispel"
    } else if (effect.calcType === "resistance") {
      return "Increase"
    } else {
      return inflict ? "Inflict" : "Grant"
    }
  }

  private getResistanceOrATK(effect) {
    if (effect.calcType === "resistance") {
      return "resistance"
    } else {
      return "ATK"
    }
  }

  private getResistanceOrNothing(effect) {
    if (effect.calcType === "resistance") {
      return " resistance"
    } else {
      return ""
    }
  }

  formatEffect(unit, skill, effect, isSkill = true) {
    let html = "";
    switch (effect.type) {
      case "HP" :
        if (skill.slot === 3 || !isSkill) {
          html = "Increase HP" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore HP" + this.getValue(effect) + this.getTurns(effect)
        }
      break
      case "TP" :
        if (skill.slot === 3 || !isSkill) {
          html = "Increase TP" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore TP" + this.getValue(effect) + this.getTurns(effect)
        }
      break
      case "AP" :
        if (skill.slot === 3 || !isSkill) {
          html = "Increase AP" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore AP" + this.getValue(effect) + this.getTurns(effect)
        }
      break
      case "CT" :
        if (skill.slot === 3 || !isSkill) {
          html = "Increase CT" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore CT" + this.getValue(effect) + this.getTurns(effect)
        }

   /* {
      "iname": "BUFF_LW_YSTL_S_2_S", ==> chance of raising
      "rate": 50,
      "turn": 1,
      "timing": 2,
      "chktgt": 0,
      "chktiming": 1,
      "type1": 4,
      "calc1": 10,
      "val1": 100,
      "val11": 250
    },



      "iname": "BUFF_LW_THI_M_2_T", ==> Reduce
      "timing": 2,
      "chktgt": 0,
      "chktiming": 1,
      "type1": 4,
      "calc1": 22,
      "val1": 50,
      "val11": 50
    },*/

      break
      case "ATK" :
        html = this.getIncrease(effect) + " ATK" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DEF" :
        html = this.getIncrease(effect) + " DEF" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MAG" :
        html = this.getIncrease(effect) + " MAG" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SPR" :
        html = this.getIncrease(effect) + " SPR" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DEX" :
        html = this.getIncrease(effect) + " DEX" + this.getValue(effect) + this.getTurns(effect)
      break
      case "AGI" :
        html = this.getIncrease(effect) + " AGI" + this.getValue(effect) + this.getTurns(effect)
      break
      case "LUCK" :
        html = this.getIncrease(effect) + " LUCK" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MOVE" :
        html = this.getIncrease(effect) + " MOVE" + this.getValue(effect) + this.getTurns(effect)
      break
      case "JUMP" :
        html = this.getIncrease(effect) + " JUMP" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FIRE" :
        html = this.getIncrease(effect) + " fire " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "ICE" :
        html = this.getIncrease(effect) + " ice " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "WIND" :
        html = this.getIncrease(effect) + " wind " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "EARTH" :
        html = this.getIncrease(effect) + " earth " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "LIGHTNING" :
        html = this.getIncrease(effect) + " lightning " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "WATER" :
        html = this.getIncrease(effect) + " water " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "LIGHT" :
        html = this.getIncrease(effect) + " light " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "DARK" :
        html = this.getIncrease(effect) + " dark " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "ALL_ELEMENTS" :
        html = this.getIncrease(effect) + " all elemental " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLASH" :
        html = this.getIncrease(effect) + " slash " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "STRIKE" :
        html = this.getIncrease(effect) + " strike " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "PIERCE" :
        html = this.getIncrease(effect) + " pierce " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "MISSILE" :
        html = this.getIncrease(effect) + " missile " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "MAGIC" :
        html = this.getIncrease(effect) + " magic " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "ALL_ATTACKS" :
        html = this.getIncrease(effect) + " all attacks " + this.getResistanceOrATK(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "REGEN" :
        html = this.getChance(effect, false) + " regen" + this.getValue(effect) + this.getTurns(effect)
      break
      case "AUTO_RESTORE" :
        html = this.getChance(effect, false) + " auto-restore" + this.getValue(effect) + this.getTurns(effect)
      break
      case "POISON" :
        html = this.getChance(effect) + " poison" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "BLIND" :
        html = this.getChance(effect) + " blind" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLEEP" :
        html = this.getChance(effect) + " sleep" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "SILENCE" :
        html = this.getChance(effect) + " silence" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "PARALYZE" :
        html = this.getChance(effect) + " paralyze" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "CONFUSION" :
        html = this.getChance(effect) + " confusion" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "CHARM" :
        html = this.getChance(effect) + " charm" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "PETRIFY" :
        html = this.getChance(effect) + " petrify" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "TOAD" :
        html = this.getChance(effect) + " toad" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "HASTE" :
        html = this.getChance(effect, false) + " haste" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLOW" :
        html = this.getChance(effect) + " slow" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "STOP" :
        html = this.getChance(effect) + " stop" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "STUN" :
        html = this.getChance(effect) + " stun" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "IMMOBILIZE" :
        html = this.getChance(effect) + " immobilize" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "DISABLE" :
        html = this.getChance(effect) + " disable" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "BERSERK" :
        html = this.getChance(effect) + " berserk" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "DOOM" :
        html = this.getChance(effect) + " doom" + this.getResistanceOrNothing(effect) + this.getValue(effect) + this.getTurns(effect)
      break
      case "REVIVE" :
        html = this.getChance(effect, false) + " to revive" + this.getValue(effect) + this.getTurns(effect)
      break
      case "PROTECT" :
        html = this.getChance(effect, false) + " protect" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SHELL" :
        html = this.getChance(effect, false) + " shell" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FLOAT" :
        html = this.getChance(effect, false) + " float" + this.getValue(effect) + this.getTurns(effect)
      break
      case "QUICKEN" :
        html = this.getChance(effect, false) + " quicken" + this.getValue(effect) + this.getTurns(effect)
      break
      case "IGNORE_FATAL" :
        html = this.getChance(effect, false) + " to ignore fatal damage" + this.getValue(effect) + this.getTurns(effect)
      break
      case "PHYSIC_EVADE" :
        html = this.getChance(effect, false) + " to physical evasion" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MAGIC_EVADE" :
        html = this.getChance(effect, false) + " to magical evasion" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CRITIC_BEHIND_GUARENTED" :
        html = "Guarented critical hit from behind"
      break
      case "CRITIC_GUARENTED" :
        html = "Guarented critical hit"
      break
      case "HUMAN_KILLER" :
        html = "Increase human killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FENNES_KILLER" :
        html = "Increase fennes killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "IMBUE" :
        console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.dataId + " -- SHOULD NOT BE USED !!!")
      break
      case "ALL_AILMENTS" :
        html = this.getChance(effect, false) + " all status ailments" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ALL_DEBUFFS" :
        html = this.getChance(effect, false) + " all debuffs" + this.getValue(effect) + this.getTurns(effect)
      break
      case "INITIAL_AP" :
        html = this.getIncrease(effect) + " Initial AP" + this.getValue(effect) + this.getTurns(effect)
      break
      case "RANGE" :
        html = this.getIncrease(effect) + " Range" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ACCURACY" :
        html = this.getIncrease(effect) + " Accuracy" + this.getValue(effect) + this.getTurns(effect)
      break
      case "EVADE" :
        html = this.getIncrease(effect) + " Evasion Rate" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CRITIC_RATE" :
        html = this.getIncrease(effect) + " Critical Rate" + this.getValue(effect) + this.getTurns(effect)
      break
      case "PROVOKE" :
        html = this.getIncrease(effect) + " chance of being targeted" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BRAVERY" :
        html = this.getIncrease(effect) + " Bravery" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FAITH" :
        html = this.getIncrease(effect) + " Faith" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ACTIVAITON_TIME" :
        html = this.getIncrease(effect) + " Activation Time" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ACQUIRED_AP" :
        html = this.getIncrease(effect) + " Acquired AP" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ACQUIRED_JP" :
        html = this.getIncrease(effect) + " Acquired JP" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DEBUFF_RES" :
        html = this.getIncrease(effect) + " Debuff Resistance" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BUFFS_DURATION" :
        html = this.getIncrease(effect) + " Buff Duration" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DEBUFFS_DURATION" :
        html = this.getIncrease(effect) + " Debuff Duration" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ATTACK_RES" :
        html = this.getIncrease(effect) + " Attack Resistance" + this.getValue(effect) + this.getTurns(effect)
      break
      case "AOE_RES" :
        html = this.getIncrease(effect) + " Area Resistance" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CRITIC_DAMAGE" :
        html = this.getIncrease(effect) + " Critical Damage" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ATK_DEBUFF_RES" :
        html = this.getIncrease(effect) + " ATK Debuff Resistance" + this.getValue(effect) + this.getTurns(effect)
      break
      case "EVOCATION_GAUGE_BOOST" :
        html = this.getIncrease(effect) + " Evocation Gauge Boost" + this.getValue(effect) + this.getTurns(effect)
      break
      case "REAPER_KILLER" :
        html = "Increase reaper killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BEAST_KILLER" :
        html = "Increase beast killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DEMON_KILLER" :
        html = "Increase demon killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "AQUATIC_KILLER" :
        html = "Increase aquatic killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ELEMENTAL_KILLER" :
        html = "Increase elemental killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "AVIAN_KILLER" :
        html = "Increase avian killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DRAGON_KILLER" :
        html = "Increase dragon killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "METAL_KILLER" :
        html = "Increase metal killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MACHINA_KILLER" :
        html = "Increase machina killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "STONE_KILLER" :
        html = "Increase stone killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "EARTH_KILLER" :
        html = "Increase earth killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FIRE_KILLER" :
        html = "Increase fire killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ICE_KILLER" :
        html = "Increase ice killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "LIGHTNING_KILLER" :
        html = "Increase ligthning killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "WIND_KILLER" :
        html = "Increase wind killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "WATER_KILLER" :
        html = "Increase water killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "LIGHT_KILLER" :
        html = "Increase light killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DARK_KILLER" :
        html = "Increase dark killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BARRIER" :
        html = "Forms a barrier that reduces damage" + this.getValue(effect) + this.getTurns(effect)
      break
      case "REDUCE_DAMAGE" :
        html = "Reduces the damage taken" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CRITIC_EVADE" :
        html = "Boost critical evasion" + this.getValue(effect) + this.getTurns(effect)
      break
      case "EVOCATION_MAGIC" :
        html = "Boost Evocation damage" + this.getValue(effect) + this.getTurns(effect)
      break
      case "HP_COST" :
        html = "Consumes own HP" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BOOST_DAMAGE_AGAINST_METAL" :
        html = "Boost damage against metal unit" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MOVE_UNIT" :
        html = "Move unit to target panel"
      break
      case "SWITCH_POS" :
        html = "Switch position with target"
      break
      default:
        console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.dataId + " -- NOT TRANSLATED : " + effect.type)
      break
    }

    if (effect.side) {
      html = html + " for 3 turns " + (effect.side == "TEAM" ? "to all units" : "to all ennemies")
    }

    return html;
  }

  private upperCaseFirst(text) {
    if (text) {
      return text[0].toUpperCase() + text.slice(1);
    }

    return "";
  }

  formatDamage(unit, skill, damage) {
    let html = "";

    if (skill.damage) {
      if (damage.type) {
        let elem = skill.elem ? skill.elem : unit.element
        let image = elem + "_" + damage.type.toLowerCase();
        html = html + "<img title='" + elem + " " + damage.type.toLowerCase() + "' class='damageSkillImg' src='assets/damage/" + image + ".png' />&nbsp;"
      }

      let pool = damage.pool && damage.pool !== "HP" ? " " + damage.pool + " " : "";

      html = html + this.upperCaseFirst((damage.effType ? this.upperCaseFirst(damage.effType.toLowerCase()) + " " : "Damage")
      + (pool === "" && damage.effType === "ABSORB" ? " HP " : pool)
      + this.getValue(damage, false));
    }

    return html
  }

  formatCounter(unit, skill, counter) {
    return "Chance to counter " + this.counterType[counter.reactDamage] + " damage " + this.getValue(counter)
  }


  formatRange(unit, skill) {
    if (skill.type !== "passive") {
      let skillTable = [];
      for (let i = 0; i <= 16; i++) {
        skillTable.push([]);
        for (let j = 0; j <= 16; j++) {
          skillTable[i].push("N");
        }
      }
      let middle = 8;

      if (skill.range && skill.range.l) {
        if (skill.range.s !== 10) { // diamond
          let countLine = 0;
          for(let i = middle - skill.range.l; i <= middle; i++) {
            let countCol = 0;

            for(let j = middle - countLine; j <= middle; j++) { // up-left
              if ((skill.range.s !== 0 || i === middle || j === middle)
                && (!skill.range.m || (countCol < skill.range.l - skill.range.m ))
              ) {
                skillTable[i][j] = "R"
              }

              countCol++;
            }

            countCol = 0;
            for(let j = middle + 1; j <= middle + countLine; j++) { //up-right
              if ((skill.range.s !== 0 || i === middle || j === middle)
                && (!skill.range.m || (countCol >= ((countLine) - (skill.range.l - skill.range.m)) ))
              ) {
                skillTable[i][j] = "R"
              }

              countCol++;
            }

            if (countLine > 0) {
              countCol = 0;
              for(let j = middle - skill.range.l + countLine; j <= middle; j++) { // down-left
                if ((skill.range.s !== 0 || middle + countLine === middle || j === middle)
                  && (!skill.range.m || (countCol < skill.range.l - skill.range.m ))
                ) {
                  skillTable[middle + countLine][j] = "R"
                }

                countCol++;
              }

              countCol = 0;
              for(let j = middle + 1; j <= middle + skill.range.l - countLine; j++) { //down-right
                if ((skill.range.s !== 0 || middle + countLine === middle || j === middle)
                  && (!skill.range.m || (countCol >= ((skill.range.l - countLine) - (skill.range.l - skill.range.m)) ))
                ) {
                  skillTable[middle + countLine][j] = "R"
                }

                countCol++;
              }
            }

            countLine++
          }
        } else {
          if (!skill.range.w || (skill.range.w && skill.range.w === 1)) { // line full aoe
            let countLine = 0;
            for(let i = middle - skill.range.l; i <= middle; i++) {
              if (i !== middle) {
                skillTable[i][middle] = "AR"
                skillTable[(middle + countLine + 1)][middle] = "R"
              } else {
                for (let j = 1; j <= skill.range.l; j++) {
                  skillTable[middle][middle - j] = "R"
                  skillTable[middle][middle + j] = "R"
                }
              }

              countLine++;
            }
          } else { //square
            let countLine = 0;
            for(let i = middle - skill.range.l; i <= middle; i++) {
              for (let j = 1; j <= skill.range.l; j++) {
                if (i === (middle - skill.range.l)) {
                  skillTable[i][middle + j] = "AR"
                  skillTable[i][middle] = "AR"
                  skillTable[i][middle - j] = "AR"

                  skillTable[(middle + countLine + 1)][middle + j] = "R"
                  skillTable[(middle + countLine + 1)][middle] = "R"
                  skillTable[(middle + countLine + 1)][middle - j] = "R"
                } else if (i === middle) {
                  skillTable[i][middle - j] = "R"
                  skillTable[i][middle + j] = "R"
                }
              }

              countLine++;
            }
          }
        }
      }

      let maxLine = (skill.range && skill.range.l) ? middle - skill.range.l : middle;
      if (skill.aoe && skill.aoe.l) {
        let countLine = 0;
        for(let i = maxLine - skill.aoe.l; i <= maxLine; i++) {
          for(let j = middle - countLine; j <= middle; j++) { // up-left
            skillTable[i][j] = skillTable[i][j] === "N" ? "A" : "AR";
          }

          for(let j = middle + 1; j <= middle + countLine; j++) { //up-right
            skillTable[i][j] = skillTable[i][j] === "N" ? "A" : "AR";
          }

          if (countLine > 0) {
            for(let j = middle - skill.aoe.l + countLine; j <= middle; j++) { // down-left
              skillTable[maxLine + countLine][j] = skillTable[maxLine + countLine][j] === "N" ? "A" : "AR";
            }

            for(let j = middle + 1; j <= middle + skill.aoe.l - countLine; j++) { //down-right
              skillTable[maxLine + countLine][j] =skillTable[maxLine + countLine][j] === "N" ? "A" : "AR";
            }
          }

          countLine++
        }
      }

      skillTable[maxLine][middle] = "TAR";
      if (maxLine !== middle) {
        skillTable[middle][middle] = "U" + skillTable[middle][middle];
      }

      let html = "<table class='table-skill'>"
      skillTable.forEach(line => {
        html += "<tr>"
        line.forEach(col => {
          html += "<td class='table-skill-" + col + "'></td>"
        })
        html += "</tr>"
      })
      html += "</table>"
      html += "<div class='tableSkillHeight'>Range Height: " + (skill.range && skill.range.h ? skill.range.h : "0") + "</div>"
      if (skill.aoe && skill.aoe.l) {
        html+= "<div class='tableSkillHeight'>AOE Height: " + skill.aoe.h + "</div>"
      }

      skill.skillTableHtml = html;
    }
  }
}
