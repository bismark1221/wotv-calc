import { Injectable } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class SkillService {
  calcTypeFormat = {
    "0": "",
    "fixe": "",
    "percent": "%",
    "resistance": "x",
    "nullify": "x",
    "dispel": "x",
    "unknow": "x"
  }

  constructor(private translateService: TranslateService) {}

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

  private getValue(effect) {
    let value = "";
    if (typeof(effect.minValue) === "number") {
      value = " (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")"
    }

    return value;
  }

  private getMaxValue(effect) {
    if (effect.minValue !== effect.maxValue) {
      return " => " + this.getPositiveValue(effect.maxValue) + this.getCalc(effect);
    }

    return "";
  }

  private getTurns(effect) {
    if (effect.turn) {
      return " for " + effect.turn + " turn" + (effect.turn > 1 ? "s" : "")
    }

    return "";
  }

  private getChance(effect, inflict = true) {
    if (effect.rate) {
      return effect.rate + "% chance" + (inflict ? "to inflict" : "")
    } else if (effect.calcType === "nullify") {
      return "Nullify"
    } else if (effect.calcType === "dispel") {
      return "Dispel"
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

  formatEffect(unit, skill, effect) {
    let html = "";
    switch (effect.type) {
      case "HP" :
        if (skill.slot === 3) {
          html = "Increase HP" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore HP" + this.getValue(effect) + this.getTurns(effect)
        }
      break
      case "TP" :
        if (skill.slot === 3) {
          html = "Increase TP" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore TP" + this.getValue(effect) + this.getTurns(effect)
        }
      break
      case "AP" :
        if (skill.slot === 3) {
          html = "Increase AP" + this.getValue(effect) + this.getTurns(effect)
        } else {
          html = "Restore AP" + this.getValue(effect) + this.getTurns(effect)
        }
      break
      case "CT" :
        if (skill.slot === 3) {
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
      case "LCK" :
        html = this.getIncrease(effect) + " LUCK" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MOVE" :
        html = this.getIncrease(effect) + " MOVE" + this.getValue(effect) + this.getTurns(effect)
      break
      case "JUMP" :
        html = this.getIncrease(effect) + " JUMP" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FIRE_ATK" :
        html = this.getIncrease(effect) + " fire " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ICE_ATK" :
        html = this.getIncrease(effect) + " ice " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "WIND_ATK" :
        html = this.getIncrease(effect) + " wind " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "EARTH_ATK" :
        html = this.getIncrease(effect) + " earth " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "LIGHTNING_ATK" :
        html = this.getIncrease(effect) + " lightning " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "WATER_ATK" :
        html = this.getIncrease(effect) + " water " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "LIGHT_ATK" :
        html = this.getIncrease(effect) + " light " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DARK_ATK" :
        html = this.getIncrease(effect) + " dark " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ALL_ELEMENTS_ATK" :
        html = this.getIncrease(effect) + " all elemental " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLASH_ATK" :
        html = this.getIncrease(effect) + " slash " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "STRIKE_ATK" :
        html = this.getIncrease(effect) + " strike " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "PIERCE_ATK" :
        html = this.getIncrease(effect) + " pierce " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MISSILE_ATK" :
        html = this.getIncrease(effect) + " missile " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "MAGIC_ATK" :
        html = this.getIncrease(effect) + " magic " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "ALL_ATTACKS_ATK" :
        html = this.getIncrease(effect) + " all attacks " + this.getResistanceOrATK(effect) + "" + this.getValue(effect) + this.getTurns(effect)
      break
      case "REGEN" :
        html = this.getChance(effect) + " regen" + this.getValue(effect) + this.getTurns(effect)
      break
      case "AUTO_RESTORE" :
//console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.names.en + " -- " + effect.minValue)
//        html = this.getChance(effect) + " auto-restore" + this.getValue(effect) + this.getTurns(effect)
      break
      case "POISON" :
        html = this.getChance(effect) + " poison" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BLIND" :
        html = this.getChance(effect) + " blind" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLEEP" :
        html = this.getChance(effect) + " sleep" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SILENCE" :
        html = this.getChance(effect) + " silence" + this.getValue(effect) + this.getTurns(effect)
      break
      case "PARALYZE" :
        html = this.getChance(effect) + " paralyze" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CONFUSION" :
        html = this.getChance(effect) + " confusion" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CHARM" :
        html = this.getChance(effect) + " charm" + this.getValue(effect) + this.getTurns(effect)
      break
      case "PETRIFY" :
        html = this.getChance(effect) + " petrify" + this.getValue(effect) + this.getTurns(effect)
      break
      case "TOAD" :
        html = this.getChance(effect) + " toad" + this.getValue(effect) + this.getTurns(effect)
      break
      case "HASTE" :
        html = this.getChance(effect) + " haste" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLOW" :
        html = this.getChance(effect) + " slow" + this.getValue(effect) + this.getTurns(effect)
      break
      case "STOP" :
        html = this.getChance(effect) + " stop" + this.getValue(effect) + this.getTurns(effect)
      break
      case "STUN" :
        html = this.getChance(effect) + " stun" + this.getValue(effect) + this.getTurns(effect)
      break
      case "IMMOBILIZE" :
        html = this.getChance(effect) + " immobilize" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DISABLE" :
        html = this.getChance(effect) + " disable" + this.getValue(effect) + this.getTurns(effect)
      break
      case "BERSERK" :
        html = this.getChance(effect) + " berserk" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DOOM" :
        html = this.getChance(effect) + " doom" + this.getValue(effect) + this.getTurns(effect)
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
        html = this.getChance(effect, false) + " to physical evasion" + this.getValue(effect) + this.getTurns(effect)
      break
      case "CRITIC_BEHIND_GUARENTED" :
        html = "Guarented critical hit from behind"
      break
      case "CRITIC_GUARENTED" :
        html = "Guarented critical hit"
      break
      case "DARK_KILLER" :
        html = "Increase dark killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "HUMAN_KILLER" :
        html = "Increase human killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "FENNES_KILLER" :
        //html = "Increase fennes killer" + this.getValue(effect) + this.getTurns(effect)
      break
      case "SLEEP_IMBUE" :
        //html = "SLEEP_IMBUE" + this.getValue(effect) + this.getTurns(effect)
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
      case "FAITH" :
//console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.names.en + " -- " + effect.minValue)
  //      html = this.getIncrease(effect) + " Faith" + this.getValue(effect) + this.getTurns(effect)
      break
      case "DEBUFF_RES" :
        html = this.getIncrease(effect) + " Debuff Res" + this.getValue(effect) + this.getTurns(effect)
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
//console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.names.en + " -- " + effect.minValue)
        //html = this.getIncrease(effect) + " AOE Resistance" + this.getValue(effect) + this.getTurns(effect)
      break
    }

    return html;
  }
}
