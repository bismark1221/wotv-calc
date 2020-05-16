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

  private getValue(skill, effect, getPositiveValue = true) {
    let value = "";
    if (typeof(effect.minValue) === "number" || typeof(effect.value) === "number") {
      let minValue = typeof(effect.minValue) === "number" ? effect.minValue : effect.value;
      minValue = getPositiveValue ? this.getPositiveValue(minValue) : minValue;

      if (!skill.level) {
        value = " (" + minValue + this.getCalc(effect) + this.getMaxValue(effect, getPositiveValue) + ")"
      } else {
        if (effect.minValue !== effect.maxValue) {
          let maxValue = getPositiveValue ? this.getPositiveValue(effect.maxValue) : effect.maxValue;
          let valueForLevel = Math.floor(minValue + ((maxValue - minValue) / (skill.maxLevel - 1) * (skill.level - 1)))
          value = " (" + valueForLevel + this.getCalc(effect) + ")"
        } else {
          value = " (" + minValue + this.getCalc(effect) + ")"
        }
      }
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

  private getResistanceOrNothing(effect) {
    if (effect.calcType === "resistance") {
      return " resistance"
    } else {
      return ""
    }
  }

  formatEffect(unit, skill, effect) {
    let html = "";
    switch (effect.type) {
      case "HP" :
        if (skill.slot === 3 || skill.type !== "skill") {
          html = "Increase HP" + this.getValue(skill, effect) + this.getTurns(effect)
        } else {
          html = "Restore HP" + this.getValue(skill, effect) + this.getTurns(effect)
        }
      break
      case "TP" :
        if (skill.slot === 3 || skill.type !== "skill") {
          html = "Increase TP" + this.getValue(skill, effect) + this.getTurns(effect)
        } else {
          html = "Restore TP" + this.getValue(skill, effect) + this.getTurns(effect)
        }
      break
      case "AP" :
        if (skill.slot === 3 || skill.type !== "skill") {
          html = "Increase AP" + this.getValue(skill, effect) + this.getTurns(effect)
        } else {
          html = "Restore AP" + this.getValue(skill, effect) + this.getTurns(effect)
        }
      break
      case "CT" :
        if (skill.slot === 3 || skill.type !== "skill") {
          html = "Increase CT" + this.getValue(skill, effect) + this.getTurns(effect)
        } else {
          html = "Restore CT" + this.getValue(skill, effect) + this.getTurns(effect)
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
        html = this.getIncrease(effect) + " ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DEF" :
        html = this.getIncrease(effect) + " DEF" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MAG" :
        html = this.getIncrease(effect) + " MAG" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SPR" :
        html = this.getIncrease(effect) + " SPR" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DEX" :
        html = this.getIncrease(effect) + " DEX" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "AGI" :
        html = this.getIncrease(effect) + " AGI" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LUCK" :
        html = this.getIncrease(effect) + " LUCK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MOVE" :
        html = this.getIncrease(effect) + " MOVE" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "JUMP" :
        html = this.getIncrease(effect) + " JUMP" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FIRE_RES" :
        html = this.getIncrease(effect) + " fire resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ICE_RES" :
        html = this.getIncrease(effect) + " ice resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "WIND_RES" :
        html = this.getIncrease(effect) + " wind resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "EARTH_RES" :
        html = this.getIncrease(effect) + " earth resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LIGHTNING_RES" :
        html = this.getIncrease(effect) + " lightning resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "WATER_RES" :
        html = this.getIncrease(effect) + " water resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LIGHT_RES" :
        html = this.getIncrease(effect) + " light resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DARK_RES" :
        html = this.getIncrease(effect) + " dark resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_ELEMENTS_RES" :
        html = this.getIncrease(effect) + " all elemental resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SLASH_RES" :
        html = this.getIncrease(effect) + " slash resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STRIKE_RES" :
        html = this.getIncrease(effect) + " strike resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PIERCE_RES" :
        html = this.getIncrease(effect) + " pierce resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MISSILE_RES" :
        html = this.getIncrease(effect) + " missile resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MAGIC_RES" :
        html = this.getIncrease(effect) + " magic resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_ATTACKS_RES" :
        html = this.getIncrease(effect) + " all attacks resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FIRE_ATK" :
        html = this.getIncrease(effect) + " fire ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ICE_ATK" :
        html = this.getIncrease(effect) + " ice ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "WIND_ATK" :
        html = this.getIncrease(effect) + " wind ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "EARTH_ATK" :
        html = this.getIncrease(effect) + " earth ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LIGHTNING_ATK" :
        html = this.getIncrease(effect) + " lightning ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "WATER_ATK" :
        html = this.getIncrease(effect) + " water ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LIGHT_ATK" :
        html = this.getIncrease(effect) + " light ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DARK_ATK" :
        html = this.getIncrease(effect) + " dark ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_ELEMENTS_ATK" :
        html = this.getIncrease(effect) + " all elemental ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SLASH_ATK" :
        html = this.getIncrease(effect) + " slash ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STRIKE_ATK" :
        html = this.getIncrease(effect) + " strike ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PIERCE_ATK" :
        html = this.getIncrease(effect) + " pierce ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MISSILE_ATK" :
        html = this.getIncrease(effect) + " missile ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MAGIC_ATK" :
        html = this.getIncrease(effect) + " magic ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_ATTACKS_ATK" :
        html = this.getIncrease(effect) + " all attacks ATK" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "REGEN_ATK" :
        html = this.getChance(effect, false) + " regen" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "AUTO_RESTORE_ATK" :
        html = this.getChance(effect, false) + " auto-restore" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "POISON_ATK" :
        html = this.getChance(effect) + " poison" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BLIND_ATK" :
        html = this.getChance(effect) + " blind" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SLEEP_ATK" :
        html = this.getChance(effect) + " sleep" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SILENCE_ATK" :
        html = this.getChance(effect) + " silence" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PARALYZE_ATK" :
        html = this.getChance(effect) + " paralyze" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CONFUSION_ATK" :
        html = this.getChance(effect) + " confusion" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CHARM_ATK" :
        html = this.getChance(effect) + " charm" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PETRIFY_ATK" :
        html = this.getChance(effect) + " petrify" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "TOAD_ATK" :
        html = this.getChance(effect) + " toad" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "HASTE_ATK" :
        html = this.getChance(effect, false) + " haste" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SLOW_ATK" :
        html = this.getChance(effect) + " slow" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STOP_ATK" :
        html = this.getChance(effect) + " stop" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STUN_ATK" :
        html = this.getChance(effect) + " stun" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "IMMOBILIZE_ATK" :
        html = this.getChance(effect) + " immobilize" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DISABLE_ATK" :
        html = this.getChance(effect) + " disable" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BERSERK_ATK" :
        html = this.getChance(effect) + " berserk" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DOOM_ATK" :
        html = this.getChance(effect) + " doom" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "REVIVE_ATK" :
        html = this.getChance(effect, false) + " to revive" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PROTECT_ATK" :
        html = this.getChance(effect, false) + " protect" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SHELL_ATK" :
        html = this.getChance(effect, false) + " shell" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FLOAT_ATK" :
        html = this.getChance(effect, false) + " float" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "QUICKEN_ATK" :
        html = this.getChance(effect, false) + " quicken" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_AILMENTS_ATK" :
        html = this.getChance(effect, false) + " all status ailments" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_DEBUFFS_ATK" :
        html = this.getChance(effect, false) + " all debuffs" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "REGEN_RES" :
        html = this.getChance(effect, false) + " regen resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "AUTO_RESTORE_RES" :
        html = this.getChance(effect, false) + " auto-restore resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "POISON_RES" :
        html = this.getChance(effect) + " poison resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BLIND_RES" :
        html = this.getChance(effect) + " blind resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SLEEP_RES" :
        html = this.getChance(effect) + " sleep resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SILENCE_RES" :
        html = this.getChance(effect) + " silence resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PARALYZE_RES" :
        html = this.getChance(effect) + " paralyze resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CONFUSION_RES" :
        html = this.getChance(effect) + " confusion resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CHARM_RES" :
        html = this.getChance(effect) + " charm resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PETRIFY_RES" :
        html = this.getChance(effect) + " petrify resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "TOAD_RES" :
        html = this.getChance(effect) + " toad resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "HASTE_RES" :
        html = this.getChance(effect, false) + " haste resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SLOW_RES" :
        html = this.getChance(effect) + " slow resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STOP_RES" :
        html = this.getChance(effect) + " stop resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STUN_RES" :
        html = this.getChance(effect) + " stun resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "IMMOBILIZE_RES" :
        html = this.getChance(effect) + " immobilize resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DISABLE_RES" :
        html = this.getChance(effect) + " disable resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BERSERK_RES" :
        html = this.getChance(effect) + " berserk resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DOOM_RES" :
        html = this.getChance(effect) + " doom resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "REVIVE_RES" :
        html = this.getChance(effect, false) + " to revive resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PROTECT_RES" :
        html = this.getChance(effect, false) + " protect resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "SHELL_RES" :
        html = this.getChance(effect, false) + " shell resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FLOAT_RES" :
        html = this.getChance(effect, false) + " float resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "QUICKEN_RES" :
        html = this.getChance(effect, false) + " quicken resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_AILMENTS_RES" :
        html = this.getChance(effect, false) + " all status ailments resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ALL_DEBUFFS_RES" :
        html = this.getChance(effect, false) + " all debuffs resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "IGNORE_FATAL" :
        html = this.getChance(effect, false) + " to ignore fatal damage" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PHYSIC_EVADE" :
        html = this.getChance(effect, false) + " to physical evasion" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MAGIC_EVADE" :
        html = this.getChance(effect, false) + " to magical evasion" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CRITIC_BEHIND_GUARENTED" :
        html = "Guarented critical hit from behind"
      break
      case "CRITIC_GUARENTED" :
        html = "Guarented critical hit"
      break
      case "HUMAN_KILLER" :
        html = "Increase human killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FENNES_KILLER" :
        html = "Increase fennes killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "IMBUE" :
        console.log("@@@@@ " + unit.names.en + " -- skill : " + skill.dataId + " -- SHOULD NOT BE USED !!!")
      break
      case "INITIAL_AP" :
        html = this.getIncrease(effect) + " Initial AP" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "RANGE" :
        html = this.getIncrease(effect) + " Range" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ACCURACY" :
        html = this.getIncrease(effect) + " Accuracy" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "EVADE" :
        html = this.getIncrease(effect) + " Evasion Rate" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CRITIC_RATE" :
        html = this.getIncrease(effect) + " Critical Rate" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "PROVOKE" :
        html = this.getIncrease(effect) + " chance of being targeted" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BRAVERY" :
        html = this.getIncrease(effect) + " Bravery" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FAITH" :
        html = this.getIncrease(effect) + " Faith" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ACTIVAITON_TIME" :
        html = this.getIncrease(effect) + " Activation Time" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ACQUIRED_AP" :
        html = this.getIncrease(effect) + " Acquired AP" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ACQUIRED_JP" :
        html = this.getIncrease(effect) + " Acquired JP" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DEBUFF_RES" :
        html = this.getIncrease(effect) + " Debuff Resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BUFFS_DURATION" :
        html = this.getIncrease(effect) + " Buff Duration" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DEBUFFS_DURATION" :
        html = this.getIncrease(effect) + " Debuff Duration" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ATTACK_RES" :
        html = this.getIncrease(effect) + " Attack Resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "AOE_RES" :
        html = this.getIncrease(effect) + " Area Resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CRITIC_DAMAGE" :
        html = this.getIncrease(effect) + " Critical Damage" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ATK_DEBUFF_RES" :
        html = this.getIncrease(effect) + " ATK Debuff Resistance" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "EVOCATION_GAUGE_BOOST" :
        html = this.getIncrease(effect) + " Evocation Gauge Boost" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "REAPER_KILLER" :
        html = "Increase reaper killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BEAST_KILLER" :
        html = "Increase beast killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DEMON_KILLER" :
        html = "Increase demon killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "AQUATIC_KILLER" :
        html = "Increase aquatic killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ELEMENTAL_KILLER" :
        html = "Increase elemental killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "AVIAN_KILLER" :
        html = "Increase avian killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DRAGON_KILLER" :
        html = "Increase dragon killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "METAL_KILLER" :
        html = "Increase metal killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MACHINA_KILLER" :
        html = "Increase machina killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "STONE_KILLER" :
        html = "Increase stone killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "EARTH_KILLER" :
        html = "Increase earth killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "FIRE_KILLER" :
        html = "Increase fire killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "ICE_KILLER" :
        html = "Increase ice killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LIGHTNING_KILLER" :
        html = "Increase ligthning killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "WIND_KILLER" :
        html = "Increase wind killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "WATER_KILLER" :
        html = "Increase water killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "LIGHT_KILLER" :
        html = "Increase light killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "DARK_KILLER" :
        html = "Increase dark killer" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BARRIER" :
        html = "Forms a barrier that reduces damage" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "REDUCE_DAMAGE" :
        html = "Reduces the damage taken" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "CRITIC_EVADE" :
        html = "Boost critical evasion" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "EVOCATION_MAGIC" :
        html = "Boost Evocation damage" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "HP_COST" :
        html = "Consumes own HP" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "BOOST_DAMAGE_AGAINST_METAL" :
        html = "Boost damage against metal unit" + this.getValue(skill, effect) + this.getTurns(effect)
      break
      case "MOVE_UNIT" :
        html = "Move unit to target panel"
      break
      case "SWITCH_POS" :
        html = "Switch position with target"
      break
      case "STEAL" :
        html = "Steal" + this.getValue(skill, effect)
      break
      case "NULLIFY" :
        html = "Nullify " + this.getValue(skill, effect)
        effect.ailments.forEach((ailment, index) => {
          if (index == effect.ailments.length - 1) {
            if (index !== 0) {
              html += " and "
            }
          } else {
            if (index !== 0) {
              html += ", "
            }
          }

          html += this.upperCaseFirst(ailment.replace("_", " "))
        })
      break
      case "DISPEL" :
        html = "Dispel " + this.getValue(skill, effect)
        effect.ailments.forEach((ailment, index) => {
          if (index == effect.ailments.length - 1) {
            if (index !== 0) {
              html += " and "
            }
          } else {
            if (index !== 0) {
              html += ", "
            }
          }

          html += this.upperCaseFirst(ailment.replace("_", " "))
        })
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
      return text[0].toUpperCase() + text.slice(1).toLowerCase();
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
      + this.getValue(skill, damage, false));
    }

    if (skill.hit) {
      html += (skill.damage ? "<br />" : "") + "+" + skill.hit + "% Accuracy"
    }

    if (skill.pierce) {
      html += (skill.damage ? "<br />" : "") + "Piercing"
    }

    if (skill.ctbreak) {
      html += (skill.damage ? "<br />" : "") + "Cancel Ability Activation"
    }

    return html
  }

  formatCounter(unit, skill, counter) {
    return "Chance to counter " + this.counterType[counter.reactDamage] + " damage " + this.getValue(skill, counter)
  }

  formatAccuracy(unit, skill, hit) {
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
