import { Injectable } from '@angular/core';

import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Injectable()
export class SkillService {
  calcTypeFormat = {
    "0": "",
    "fixe": "",
    "percent": "%",
    "unknow": "x"
  }

  constructor(private translateService: TranslateService) {}

  private getCalc(effect) {
    return this.calcTypeFormat[effect.calcType];
  }

  private getMaxValue(effect) {
    if (effect.minValue !== effect.maxValue) {
      return " => " + this.getPositiveValue(effect.maxValue) + this.getCalc(effect);
    }

    return "";
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

  private getTurns(effect) {
    if (effect.turn) {
      return " for " + effect.turn + " turn" + (effect.turn > 1 ? "s" : "")
    }

    return "";
  }

  private getChance(effect) {
    if (effect.rate) {
      return effect.rate + "% chance to inflict"
    } else {
      return "Inflict"
    }
  }

  formatEffect(unit, skill, effect) {
    let html = "";
    switch (effect.type) {
      case "HP" :
        if (skill.slot === 3) {
          html = "Increase HP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        } else {
          html = "Restore HP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        }
      break
      case "TP" :
        if (skill.slot === 3) {
          html = "Increase TP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        } else {
          html = "Restore TP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        }
      break
      case "AP" :
        if (skill.slot === 3) {
          html = "Increase AP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        } else {
          html = "Restore AP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        }
      break
      case "CT" :
        if (skill.slot === 3) {
          html = "Increase CT (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
        } else {
          html = "Restore CT (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
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
        html = this.getIncrease(effect) + " ATK (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "DEF" :
        html = this.getIncrease(effect) + " DEF (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "MAG" :
        html = this.getIncrease(effect) + " MAG (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "SPR" :
        html = this.getIncrease(effect) + " SPR (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "DEX" :
        html = this.getIncrease(effect) + " DEX (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "AGI" :
        html = this.getIncrease(effect) + " AGI (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "LCK" :
        html = this.getIncrease(effect) + " LUCK (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "MOVE" :
        html = this.getIncrease(effect) + " MOVE (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "JUMP" :
        html = this.getIncrease(effect) + " JUMP (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "FIRE_ATK" :
console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.names.en + " -- " + effect.minValue)
        html = this.getIncrease(effect) + " fire resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "ICE_ATK" :
        html = this.getIncrease(effect) + " ice resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "WIND_ATK" :
        html = this.getIncrease(effect) + " wind resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "EARTH_ATK" :
        html = this.getIncrease(effect) + " earth resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "LIGHTNING_ATK" :
        html = this.getIncrease(effect) + " lightning resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "WATER_ATK" :
        html = this.getIncrease(effect) + " water resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "LIGHT_ATK" :
        html = this.getIncrease(effect) + " light resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "DARK_ATK" :
        html = this.getIncrease(effect) + " dark resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "ALL_ELEMENTS_ATK" :
        html = this.getIncrease(effect) + " all elemental resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "SLASH_ATK" :
        html = this.getIncrease(effect) + " slash resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "STRIKE_ATK" :
        html = this.getIncrease(effect) + " strike resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "PIERCE_ATK" :
        html = this.getIncrease(effect) + " pierce resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "MISSILE_ATK" :
        html = this.getIncrease(effect) + " missile resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "MAGIC_ATK" :
        html = this.getIncrease(effect) + " magic resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "ALL_ATTACKS_ATK" :
        html = this.getIncrease(effect) + " all attacks resistance (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "REGEN" :
//console.log("REGEN")
      break
      case "AUTO_RESTORE" :
//console.log("AUTO_RESTORE")
      break
      case "POISON" :
        html = this.getChance(effect) + " poison (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "BLIND" :
        html = this.getChance(effect) + " blind (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "SLEEP" :
        html = this.getChance(effect) + " sleep (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "SILENCE" :
        html = this.getChance(effect) + " silence (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "PARALYZE" :
        html = this.getChance(effect) + " paralyze (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "CONFUSION" :
        html = this.getChance(effect) + " confusion (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "CHARM" :
        html = this.getChance(effect) + " charm (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "PETRIFY" :
        html = this.getChance(effect) + " petrify (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "TOAD" :
        html = this.getChance(effect) + " toad (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "HASTE" :
        html = this.getChance(effect) + " haste (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "SLOW" :
        html = this.getChance(effect) + " slow (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "STOP" :
        html = this.getChance(effect) + " stop (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "STUN" :
        html = this.getChance(effect) + " stun (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "IMMOBILIZE" :
        html = this.getChance(effect) + " immobilize (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "DISABLE" :
        html = this.getChance(effect) + " disable (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "BERSERK" :
        html = this.getChance(effect) + " berserk (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "DOOM" :
        html = this.getChance(effect) + " doom (" + this.getPositiveValue(effect.minValue) + this.getCalc(effect) + this.getMaxValue(effect) + ")" + this.getTurns(effect)
      break
      case "REVIVE" :
//console.log("REVIVE")
      break
      case "PROTECT" :
//console.log("PROTECT")
      break
      case "SHELL" :
//console.log("SHELL")
      break
      case "FLOAT" :
//console.log("FLOAT")
      break
      case "QUICKEN" :
//console.log("QUICKEN")
      break
      case "IGNORE_FATAL" :
//console.log("IGNORE_FATAL")
      break
      case "PHYSIC_EVADE" :
//console.log("PHYSIC_EVADE")
      break
      case "MAGIC_EVADE" :
//console.log("MAGIC_EVADE")
      break
      case "CRITIC_BEHIND_GUARENTED" :
//console.log("CRITIC_BEHIND_GUARENTED")
      break
      case "CRITIC_GUARENTED" :
//console.log("CRITIC_GUARENTED")
      break
      case "DARK_KILLER" :
//console.log("DARK_KILLER")
      break
      case "HUMAN_KILLER" :
//console.log("HUMAN_KILLER")
      break
      case "FENNES_KILLER" :
//console.log("FENNES_KILLER")
      break
      case "SLEEP_IMBUE" :
//console.log("SLEEP_IMBUE")
      break
      case "ALL_AILMENTS" :
//console.log("ALL_AILMENTS")
      break
      case "ALL_DEBUFFS" :
//console.log("ALL_DEBUFFS")
      break
      case "INITIAL_AP" :
//console.log("INITIAL_AP")
      break
      case "RANGE" :
//console.log("RANGE")
      break
      case "ACCURACY" :
//console.log("ACCURACY")
      break
      case "EVADE" :
//console.log("EVADE")
      break
      case "CRITIC_RATE" :
//console.log("CRITIC_RATE")
      break
      case "PROVOKE" :
//console.log("PROVOKE")
      break
      case "BRAVERY" :
//console.log("BRAVERY")
      break
      case "FAITH" :
//console.log("FAITH")
      break
      case "ACTIVAITON_TIME" :
//console.log("ACTIVAITON_TIME")
      break
      case "ACQUIRED_AP" :
//console.log("ACQUIRED_AP")
      break
      case "FAITH" :
//console.log("FAITH")
      break
      case "DEBUFF_RES" :
//console.log("DEBUFF_RES")
      break
      case "BUFFS_DURATION" :
//console.log("BUFFS_DURATION")
      break
      case "DEBUFFS_DURATION" :
//console.log("DEBUFFS_DURATION")
      break
      case "ATTACK_RES" :
//console.log("ATTACK_RES")
      break
      case "AOE_RES" :
//console.log("AOE_RES")
      break
    }

    return html;
  }
}
