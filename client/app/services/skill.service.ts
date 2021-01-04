import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import { NameService } from './name.service';

@Injectable()
export class SkillService {
  calcTypeFormat = {
    '0': '',
    'fixe': '',
    'percent': '%',
    'resistance': '%',
    'nullify': 'x',
    'dispel': 'x',
    'unknow': 'x',
    'decrease': 'x',
    undefined: 'x'
  };

  counterType = {
    'ALL': 'all',
    'PHYSIC': 'physical',
    'MAGIC': 'magical'
  };

  targets = {
    'self': 'caster',
    'target': 'target',
    'allyNotSelf': 'ally',
    'selfSide': 'all allies',
    'ennemySide': 'all ennemies',
    'all': 'everyone on map',
    'deadAlly': 'dead ally',
    'deadEnnemy': 'dead ennemy',
    'deadAll': 'everyone dead',
    'panel': 'panel'
  };

  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private nameService: NameService
  ) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l === 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortEffectBuffs(effects) {
    effects.sort((a: any, b: any) => {
      const x = this.i(a.html);
      const y = this.i(b.html);

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/, '').replace(/^\0/, '').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
          if (xD < yD) { return -1; } else if (xD > yD) { return 1; }
      }

      for (let cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
          this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
          this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
          if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
              return isNaN(this.oFxNcL) ? 1 : -1;
          }
          if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
              const comp = this.oFxNcL.localeCompare(this.oFyNcL);
              return comp / Math.abs(comp);
          }
          if (this.oFxNcL < this.oFyNcL) { return -1; } else if (this.oFxNcL > this.oFyNcL) { return 1; }
      }
    });

    return effects;
  }

  public sort(skills) {
    return skills.sort((a: any, b: any) => {
      if (a.jobLevel < b.jobLevel) {
        return -1;
      } else if (a.jobLevel > b.jobLevel) {
        return 1;
      } else {
        if (a.unlockStar < b.unlockStar) {
          return -1;
        } else if (a.unlockStar > b.unlockStar) {
          return 1;
        }
      }
    });
  }

  private getCalc(effect) {
    return this.calcTypeFormat[effect.calcType];
  }

  private getIncrease(effect) {
    let text = '';

    if (effect.calcType === 'decrease') {
      return 'Decrease';
    }

    if (effect.rate && effect.rate !== 200) {
      text = effect.rate + '% chance' + (effect.minValue < 0 || effect.value < 0 ? ' to decrease' : ' to increase');
    } else if (effect.minValue < 0 || effect.value < 0) {
      text = 'Decrease';
    } else {
      text = 'Increase';
    }

    return text;
  }

  private getPositiveValue(value, getPositiveValue) {
    if (value < 0 && getPositiveValue) {
      return -value;
    }

    return value;
  }

  private getDamageValue(skill, effect) {
    let value = '';
    if (typeof(effect.minValue) === 'number' || typeof(effect.value) === 'number') {
      let maxReduceValueFromMath = 0;
      if (skill.maths) {
        skill.maths.forEach(math => {
          if (math.type !== 'MODIFY_ABSORB' && math.value < maxReduceValueFromMath) {
            maxReduceValueFromMath = math.value;
          }
        });
      }

      const minValue = 100 + (typeof(effect.minValue) === 'number' ? effect.minValue : effect.value) + maxReduceValueFromMath;

      if (!skill.level) {
        value = ' (' + minValue + this.getDamageCalc(effect) + this.getDamageMaxValue(effect, maxReduceValueFromMath) + ')';
      } else {
        if (effect.minValue !== effect.maxValue) {
          const valueForLevel = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)));
          value = ' (' + (100 + valueForLevel) + this.getDamageCalc(effect) + ')';
        } else {
          value = ' (' + minValue + this.getDamageCalc(effect) + ')';
        }
      }
    }

    return value;
  }

  private getDamageMaxValue(effect, maxReduceValueFromMath) {
    if (effect.minValue !== effect.maxValue) {
      const maxValue = 100 + effect.maxValue + maxReduceValueFromMath;

      return ' => ' + maxValue + this.getDamageCalc(effect);
    }

    return '';
  }

  private getDamageCalc(effect) {
    if (effect.fixedDamage === true) {
      return '';
    } else {
      return '%';
    }
  }

  private getValue(skill, effect, getPositiveValue = true, explaination = '', forceCalc = null) {
    let value = '';
    if (typeof(effect.minValue) === 'number' || typeof(effect.value) === 'number') {
      let maxReduceValueFromMath = 0;
      if (skill.maths) {
        skill.maths.forEach(math => {
          if (math.type !== 'MODIFY_ABSORB' && math.value < maxReduceValueFromMath) {
            maxReduceValueFromMath = math.value;
          }
        });
      }

      let minValue = (typeof(effect.minValue) === 'number' ? effect.minValue : effect.value) + maxReduceValueFromMath;
      minValue = this.getPositiveValue(minValue, getPositiveValue);

      if (forceCalc) {
        effect.calcType = forceCalc;
      }
      const calc = this.getCalc(effect);

      if (!skill.level) {
        value = ' (' + minValue + calc + this.getMaxValue(effect, getPositiveValue, forceCalc, maxReduceValueFromMath) + explaination + ')';
      } else {
        if (effect.minValue !== effect.maxValue) {
          let valueForLevel = 0;
          const maxValue = this.getPositiveValue(effect.maxValue, getPositiveValue);

          if (skill.level >= skill.maxLevel) {
            valueForLevel = maxValue;
          } else {
            valueForLevel = Math.floor(minValue + ((maxValue - minValue) / (skill.maxLevel - 1) * (skill.level - 1)));
          }

          value = ' (' + valueForLevel + calc + explaination + ')';
        } else {
          value = ' (' + minValue + calc + explaination + ')';
        }
      }
    }

    return value;
  }

  private getMaxValue(effect, getPositiveValue, forceCalc, maxReduceValueFromMath) {
    if (effect.maxValue && effect.minValue !== effect.maxValue) {
      const maxValue = this.getPositiveValue(effect.maxValue + maxReduceValueFromMath, getPositiveValue);
      if (forceCalc) {
        effect.calcType = forceCalc;
      }

      return ' => ' + maxValue + this.getCalc(effect);
    }

    return '';
  }

  private getTurns(effect) {
    if (effect.type === 'STOP_ATK') {
      return ' for ' + effect.turn + '% of remaining actions';
    } else if (effect.turn) {
      return ' for ' + effect.turn + (effect.turnType === 'COUNT' ? ' time' : ' turn') + (effect.turn > 1 ? 's' : '');
    }

    return '';
  }

  private getChance(effect, inflict = true) {
    if (effect.rate) {
      return effect.rate + '% chance' + (inflict ? ' to inflict' : '');
    } else if (effect.calcType === 'nullify') {
      return 'Nullify';
    } else if (effect.calcType === 'dispel') {
      return 'Dispel';
    } else if (effect.calcType === 'resistance') {
      return this.getIncrease(effect);
    } else {
      return inflict ? 'Inflict' : 'Grant';
    }
  }

  private getResistanceOrNothing(effect) {
    if (effect.calcType === 'resistance') {
      return ' resistance';
    } else {
      return '';
    }
  }

  formatEquipmentEffect(unit, skill, effect) {
    let html = '';

    if (skill.upgrade.length !== 5) {
      if (skill.maxLevel < (skill.upgrade[0] * 10 - 10)) {
        html += '<b>Acquired at ' + skill.upgrade[0] + ' <i class=\'fas fa-star\'></i></b><br />';
        effect.minValue = effect.maxValue;
      } else {
        html += '<b>From ' + skill.upgrade[0] + ' to ' + skill.upgrade[skill.upgrade.length - 1] + ' <i class=\'fas fa-star\'></i></b><br />';
      }
    }

    html += this.formatEffect(unit, skill, effect, true, true);

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  formatEffect(unit, skill, effect, getTarget = true, fromEquipment = false) {
    let html = '';
    switch (effect.type) {
      case 'HP' :
        if (skill.slot === 3 || skill.type !== 'skill') {
          html = this.getIncrease(effect) + ' HP' + this.getValue(skill, effect) + this.getTurns(effect);
        } else {
          if (effect.increaseMax) {
            if (effect.minValue < 0) {
              html = 'Decrease max HP' + this.getValue(skill, effect) + this.getTurns(effect);
            } else {
              html = 'Increase max HP & restore HP raised' + this.getValue(skill, effect) + this.getTurns(effect);
            }
          } else {
            html = 'Restore HP' + this.getValue(skill, effect) + this.getTurns(effect);
          }
        }
      break;
      case 'TP' :
        if (skill.slot === 3 || skill.type !== 'skill') {
          html = this.getIncrease(effect) + ' TP' + this.getValue(skill, effect) + this.getTurns(effect);
        } else {
          html = 'Restore TP' + this.getValue(skill, effect) + this.getTurns(effect);
        }
      break;
      case 'AP' :
        if (skill.slot === 3 || skill.type !== 'skill') {
          html = this.getIncrease(effect) + ' AP' + this.getValue(skill, effect) + this.getTurns(effect);
        } else {
          html = 'Restore AP' + this.getValue(skill, effect) + this.getTurns(effect);
        }
      break;
      case 'CT' :
        if (skill.slot === 3 || skill.type !== 'skill') {
          html = this.getIncrease(effect) + ' CT' + this.getValue(skill, effect) + this.getTurns(effect);
        } else {
          html = (effect.rate ? effect.rate + '% chance to ' : '') +
          (effect.calcType === 'decrease' ? 'Decrease' : 'Restore') + ' CT' + this.getValue(skill, effect) + this.getTurns(effect);
        }
      break;
      case 'ATK' :
        html = this.getIncrease(effect) + ' ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEF' :
        html = this.getIncrease(effect) + ' DEF' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAG' :
        html = this.getIncrease(effect) + ' MAG' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SPR' :
        html = this.getIncrease(effect) + ' SPR' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEX' :
        html = this.getIncrease(effect) + ' DEX' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AGI' :
        html = this.getIncrease(effect) + ' AGI' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LUCK' :
        html = this.getIncrease(effect) + ' LUCK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MOVE' :
        html = this.getIncrease(effect) + ' MOVE' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'JUMP' :
        html = this.getIncrease(effect) + ' JUMP' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FIRE_RES' :
        html = this.getIncrease(effect) + ' fire resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ICE_RES' :
        html = this.getIncrease(effect) + ' ice resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WIND_RES' :
        html = this.getIncrease(effect) + ' wind resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EARTH_RES' :
        html = this.getIncrease(effect) + ' earth resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHTNING_RES' :
        html = this.getIncrease(effect) + ' lightning resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WATER_RES' :
        html = this.getIncrease(effect) + ' water resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHT_RES' :
        html = this.getIncrease(effect) + ' light resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DARK_RES' :
        html = this.getIncrease(effect) + ' dark resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_ELEMENTS_RES' :
        html = this.getIncrease(effect) + ' all elemental resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SLASH_RES' :
        html = this.getIncrease(effect) + ' slash resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STRIKE_RES' :
        html = this.getIncrease(effect) + ' strike resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PIERCE_RES' :
        html = this.getIncrease(effect) + ' pierce resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MISSILE_RES' :
        html = this.getIncrease(effect) + ' missile resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAGIC_RES' :
        html = this.getIncrease(effect) + ' magic resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_ATTACKS_RES' :
        html = this.getIncrease(effect) + ' all attacks resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FIRE_ATK' :
        html = this.getIncrease(effect) + ' fire ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ICE_ATK' :
        html = this.getIncrease(effect) + ' ice ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WIND_ATK' :
        html = this.getIncrease(effect) + ' wind ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EARTH_ATK' :
        html = this.getIncrease(effect) + ' earth ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHTNING_ATK' :
        html = this.getIncrease(effect) + ' lightning ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WATER_ATK' :
        html = this.getIncrease(effect) + ' water ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHT_ATK' :
        html = this.getIncrease(effect) + ' light ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DARK_ATK' :
        html = this.getIncrease(effect) + ' dark ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_ELEMENTS_ATK' :
        html = this.getIncrease(effect) + ' all elemental ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SLASH_ATK' :
        html = this.getIncrease(effect) + ' slash ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STRIKE_ATK' :
        html = this.getIncrease(effect) + ' strike ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PIERCE_ATK' :
        html = this.getIncrease(effect) + ' pierce ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MISSILE_ATK' :
        html = this.getIncrease(effect) + ' missile ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAGIC_ATK' :
        html = this.getIncrease(effect) + ' magic ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_ATTACKS_ATK' :
        html = this.getIncrease(effect) + ' all attacks ATK' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'HEAL_POWER' :
        html = this.getIncrease(effect) + ' healing power' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REGEN_ATK' :
        html = this.getChance(effect, false) + ' regen' + this.getValue(skill, effect, true, ' health restored by turn') + this.getTurns(effect);
      break;
      case 'AUTO_RESTORE_ATK' :
        html = this.getChance(effect, false) + ' auto-restore' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'POISON_ATK' :
        html = this.getChance(effect) + ' poison' + this.getValue(skill, effect, true, ' damage') + this.getTurns(effect);
      break;
      case 'BLIND_ATK' :
        html = this.getChance(effect) + ' blind' + this.getValue(skill, effect, true, ' reduced accuracy') + this.getTurns(effect);
      break;
      case 'SLEEP_ATK' :
        html = this.getChance(effect) + ' sleep' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SILENCE_ATK' :
        html = this.getChance(effect) + ' silence' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PARALYZE_ATK' :
        html = this.getChance(effect) + ' paralyze' + this.getValue(skill, effect, true, ' chance of paralysis') + this.getTurns(effect);
      break;
      case 'CONFUSION_ATK' :
        html = this.getChance(effect) + ' confusion' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CHARM_ATK' :
        html = this.getChance(effect) + ' charm' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PETRIFY_ATK' :
        html = this.getChance(effect) + ' petrify' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'GRADUAL_PETRIFY_ATK' :
        html = this.getChance(effect) + ' gradual petrify' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'TOAD_ATK' :
        html = this.getChance(effect) + ' toad' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'HASTE_ATK' :
        html = this.getChance(effect, false) + ' haste' + this.getValue(skill, effect, true, ' increased speed') + this.getTurns(effect);
      break;
      case 'SLOW_ATK' :
        html = this.getChance(effect) + ' slow' + this.getValue(skill, effect, true, ' reduced speed') + this.getTurns(effect);
      break;
      case 'STOP_ATK' :
        html = this.getChance(effect) + ' stop' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STUN_ATK' :
        html = this.getChance(effect) + ' stun' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'IMMOBILIZE_ATK' :
        html = this.getChance(effect) + ' immobilize' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DISABLE_ATK' :
        html = this.getChance(effect) + ' disable' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BERSERK_ATK' :
        html = this.getChance(effect) + ' berserk' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DOOM_ATK' :
        html = this.getChance(effect) + ' doom' + this.getValue(skill, effect, true, ' turns before death', 'fixe');
      break;
      case 'REVIVE_ATK' :
        html = this.getChance(effect, false) + ' to revive' + this.getValue(skill, effect, true, ' HP regained') + this.getTurns(effect);
      break;
      case 'RERAISE' :
        html = this.getChance(effect, false) + ' auto-revive' + this.getValue(skill, effect, true, ' HP regained') + this.getTurns(effect);
      break;
      case 'PROTECT_ATK' :
        html = this.getChance(effect, false) + ' protect' + this.getValue(skill, effect, true, ' reduced physical damage') + this.getTurns(effect);
      break;
      case 'SHELL_ATK' :
        html = this.getChance(effect, false) + ' shell' + this.getValue(skill, effect, true, ' reduced magical damage') + this.getTurns(effect);
      break;
      case 'FLOAT_ATK' :
        html = this.getChance(effect, false) + ' float' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'QUICKEN_ATK' :
        html = this.getChance(effect, false) + ' quicken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_AILMENTS_ATK' :
        html = this.getChance(effect, false) + ' Poison, Blind, Sleep, Silence, Paralysis, Confusion, Petrify, Gradual Petrify, Toad, Immobilize, Disable, Berserk and Stun' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_DEBUFFS_ATK' :
        html = 'Dispel all debuffs' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REGEN_RES' :
        html = this.getChance(effect, false) + ' regen resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AUTO_RESTORE_RES' :
        html = this.getChance(effect, false) + ' auto-restore resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'POISON_RES' :
        html = this.getChance(effect) + ' poison resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BLIND_RES' :
        html = this.getChance(effect) + ' blind resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SLEEP_RES' :
        html = this.getChance(effect) + ' sleep resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SILENCE_RES' :
        html = this.getChance(effect) + ' silence resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PARALYZE_RES' :
        html = this.getChance(effect) + ' paralyze resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CONFUSION_RES' :
        html = this.getChance(effect) + ' confusion resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CHARM_RES' :
        html = this.getChance(effect) + ' charm resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PETRIFY_RES' :
        html = this.getChance(effect) + ' petrify resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'GRADUAL_PETRIFY_RES' :
        html = this.getChance(effect) + ' gradual petrify resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'TOAD_RES' :
        html = this.getChance(effect) + ' toad resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'HASTE_RES' :
        html = this.getChance(effect, false) + ' haste resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SLOW_RES' :
        html = this.getChance(effect) + ' slow resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STOP_RES' :
        html = this.getChance(effect) + ' stop resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STUN_RES' :
        html = this.getChance(effect) + ' stun resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'IMMOBILIZE_RES' :
        html = this.getChance(effect) + ' immobilize resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DISABLE_RES' :
        html = this.getChance(effect) + ' disable resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BERSERK_RES' :
        html = this.getChance(effect) + ' berserk resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DOOM_RES' :
        html = this.getChance(effect) + ' doom resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REVIVE_RES' :
        html = this.getChance(effect, false) + ' to revive resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PROTECT_RES' :
        html = this.getChance(effect, false) + ' protect resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SHELL_RES' :
        html = this.getChance(effect, false) + ' shell resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FLOAT_RES' :
        html = this.getChance(effect, false) + ' float resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'QUICKEN_RES' :
        html = this.getChance(effect, false) + ' quicken resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_AILMENTS_RES' :
        html = this.getChance(effect, false) + ' Poison, Blind, Sleep, Silence, Paralysis, Confusion, Petrify, Gradual Petrify, Toad, Immobilize, Disable, Berserk and Stun resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ALL_DEBUFFS_RES' :
        html = this.getChance(effect, false) + ' all debuffs resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'IGNORE_FATAL' :
        html = this.getChance(effect, false) + ' to ignore fatal damage' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PHYSIC_EVADE' :
        html = this.getChance(effect, false) + ' to physical evasion' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAGIC_EVADE' :
        html = this.getChance(effect, false) + ' to magical evasion' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CRITIC_GUARENTED' :
        html = 'Guarented critical hit';
      break;
      case 'IMBUE' :
        console.log('@@@@@ ' + unit.names.en + ' -- skill : ' + skill.dataId + ' -- SHOULD NOT BE USED !!!');
      break;
      case 'INITIAL_AP' :
        html = this.getIncrease(effect) + ' Initial AP' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RANGE' :
        html = this.getIncrease(effect) + ' Range' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ACCURACY' :
        html = this.getIncrease(effect) + ' Accuracy' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EVADE' :
        html = this.getIncrease(effect) + ' Evasion Rate' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CRITIC_RATE' :
        html = this.getIncrease(effect) + ' Critical Rate' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PROVOKE' :
        html = this.getIncrease(effect) + ' chance of being targeted' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BRAVERY' :
        html = this.getIncrease(effect) + ' Bravery' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FAITH' :
        html = this.getIncrease(effect) + ' Faith' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BRAVERY_FIGHT' :
        html = this.getIncrease(effect) + ' Bravery' + this.getValue(skill, effect);
      break;
      case 'FAITH_FIGHT' :
        html = this.getIncrease(effect) + ' Faith' + this.getValue(skill, effect);
      break;
      case 'ACTIVATION_TIME' :
        html = this.getIncrease(effect) + ' Activation Time' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ACQUIRED_AP' :
        html = this.getIncrease(effect) + ' Acquired AP' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ACQUIRED_JP' :
        html = this.getIncrease(effect) + ' Acquired JP' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEBUFF_RES' :
        html = this.getIncrease(effect) + ' Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BUFFS_DURATION' :
        html = this.getIncrease(effect) + ' Buff Duration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEBUFFS_DURATION' :
        html = this.getIncrease(effect) + ' Debuff Duration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ATTACK_RES' :
        html = this.getIncrease(effect) + ' Attack Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AOE_RES' :
        html = this.getIncrease(effect) + ' Area Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CRITIC_DAMAGE' :
        html = this.getIncrease(effect) + ' Critical Damage' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAX_HP_DOWN_RES' :
        html = this.getIncrease(effect) + ' Max HP Down Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ATK_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' ATK Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEF_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' DEF Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAG_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' MAG Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SPR_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' SPR Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AGI_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' AGI Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_SLASH_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' Slash resistance Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_ALL_DEBUFF_RES' :
        html = this.getIncrease(effect) + ' All resistances Debuff Resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EVOCATION_GAUGE_BOOST' :
        html = this.getIncrease(effect) + ' Evocation Gauge Boost' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'HUMAN_KILLER' :
        html = 'Increase human killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FENNES_KILLER' :
        html = 'Increase fennes killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REAPER_KILLER' :
        html = 'Increase reaper killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BEAST_KILLER' :
        html = 'Increase beast killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEMON_KILLER' :
        html = 'Increase demon killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AQUATIC_KILLER' :
        html = 'Increase aquatic killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FAIRY_KILLER' :
        html = 'Increase fairy killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AVIAN_KILLER' :
        html = 'Increase avian killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MALES_KILLER' :
        html = 'Increase male killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DRAGON_KILLER' :
        html = 'Increase dragon killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'METAL_KILLER' :
        html = 'Increase metal killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MACHINA_KILLER' :
        html = 'Increase machina killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ESPER_KILLER' :
        html = 'Increase Nether Beast killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'INSECT_KILLER' :
        html = 'Increase insect killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STONE_KILLER' :
        html = 'Increase stone killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EARTH_KILLER' :
        html = 'Increase earth killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FIRE_KILLER' :
        html = 'Increase fire killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ICE_KILLER' :
        html = 'Increase ice killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHTNING_KILLER' :
        html = 'Increase lightning killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WIND_KILLER' :
        html = 'Increase wind killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WATER_KILLER' :
        html = 'Increase water killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHT_KILLER' :
        html = 'Increase light killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DARK_KILLER' :
        html = 'Increase dark killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PLANT_KILLER' :
        html = 'Increase plant killer' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FLOAT_KILLER' :
        html = 'Increase killer against unit with float' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'IGNORE_FLOAT' :
        html = 'Ignore float';
      break;
      case 'HUMAN_KILLER_RES' :
        html = 'Increase human killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FENNES_KILLER_RES' :
        html = 'Increase fennes killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REAPER_KILLER_RES' :
        html = 'Increase reaper killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BEAST_KILLER_RES' :
        html = 'Increase beast killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEMON_KILLER_RES' :
        html = 'Increase demon killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AQUATIC_KILLER_RES' :
        html = 'Increase aquatic killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FAIRY_KILLER_RES' :
        html = 'Increase fairy killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'INSECT_KILLER_RES' :
        html = 'Increase insect killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AVIAN_KILLER_RES' :
        html = 'Increase avian killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MALES_KILLER_RES' :
        html = 'Increase male killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DRAGON_KILLER_RES' :
        html = 'Increase dragon killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'METAL_KILLER_RES' :
        html = 'Increase metal killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MACHINA_KILLER_RES' :
        html = 'Increase machina killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ESPER_KILLER_RES' :
        html = 'Increase Nether Beast killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'STONE_KILLER_RES' :
        html = 'Increase stone killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EARTH_KILLER_RES' :
        html = 'Increase earth killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FIRE_KILLER_RES' :
        html = 'Increase fire killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ICE_KILLER_RES' :
        html = 'Increase ice killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHTNING_KILLER_RES' :
        html = 'Increase lightning killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WIND_KILLER_RES' :
        html = 'Increase wind killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'WATER_KILLER_RES' :
        html = 'Increase water killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'LIGHT_KILLER_RES' :
        html = 'Increase light killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DARK_KILLER_RES' :
        html = 'Increase dark killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'PLANT_KILLER_RES' :
        html = 'Increase plant killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'FLOAT_KILLER_RES' :
        html = 'Increase float killer resistance' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BARRIER_GENERAL' :
        html = 'Reduces the damage taken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BREAK_BARRIER_GENERAL' :
        html = 'Break general barrier' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REDUCE_DAMAGE_GENERAL' :
        html = 'Reduces the damage taken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BARRIER_PHYSIC' :
        html = 'Reduces the physic damage taken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BREAK_BARRIER_PHYSIC' :
        html = 'Break physic barrier' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REDUCE_DAMAGE_PHYSIC' :
        html = 'Reduces the physic damage taken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BARRIER_MAGIC' :
        html = 'Reduces the magic damage taken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BREAK_BARRIER_MAGIC' :
        html = 'Break magic barrier' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'REDUCE_DAMAGE_MAGIC' :
        html = 'Reduces the magic damage taken' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'CRITIC_EVADE' :
        html = 'Boost critical evasion' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'EVOCATION_MAGIC' :
        html = 'Boost Evocation damage' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'HP_COST' :
        html = 'Consumes own HP' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'BOOST_DAMAGE_AGAINST_METAL' :
        html = 'Boost damage against metal unit' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MOVE_UNIT' :
        html = 'Move unit to target panel';
      break;
      case 'SWITCH_POS' :
        html = 'Switch position with target';
      break;
      case 'STEAL' :
        html = 'Steal' + this.getValue(skill, effect);
      break;
      case 'TP_AUTO_RESTORE' :
        html = 'Auto restore TP' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'MAX_DAMAGE' :
        html = 'Increase max damage' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'DEFENSE_PENETRATION' :
        html = 'Increase defense penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'SPIRIT_PENETRATION' :
        html = 'Increase spirit penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_SLASH_ATK_PENETRATION' :
        html = 'Increase slash resistance penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_PIERCE_ATK_PENETRATION' :
        html = 'Increase pierce resistance penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_STRIKE_ATK_PENETRATION' :
        html = 'Increase strike resistance penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_MISSILE_ATK_PENETRATION' :
        html = 'Increase missile resistance penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'RES_MAGIC_ATK_PENETRATION' :
        html = 'Increase magic resistance penetration' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'AP_CONSUMPTION' :
        html = 'Decrease AP consumption' + this.getValue(skill, effect) + this.getTurns(effect);
      break;
      case 'ON_MAGIC_ATTACK' :
        html = 'On magic attacks only';
      break;
      case 'ON_PHYSIC_ATTACK' :
        html = 'On physic attacks only';
      break;
      case 'IMMUNE_CT_CHANGE' :
        html = 'Immune to CT change';
      break;
      case 'AVG_CT' :
        html = 'Average CT of all units within the range';
      break;
      case 'INCREASE_UNIT_LEVEL' :
        html = 'Increase max level of unit by ' + this.getValue(skill, effect);
      break;
      case 'NULLIFY' :
        html = 'Nullify ' + this.getValue(skill, effect);
        effect.ailments.forEach((ailment, index) => {
          if (index === effect.ailments.length - 1) {
            if (index !== 0) {
              html += ' and ';
            }
          } else {
            if (index !== 0) {
              html += ', ';
            }
          }

          html += this.upperCaseFirst(ailment.replace('_', ' '));
        });
        break;
      case 'DISPEL' :
        html = 'Dispel ' + this.getValue(skill, effect);
        effect.ailments.forEach((ailment, index) => {
          if (index === effect.ailments.length - 1) {
            if (index !== 0) {
              html += ' and ';
            }
          } else {
            if (index !== 0) {
              html += ', ';
            }
          }

          html += this.upperCaseFirst(ailment.replace('_', ' '));
        });
        break;
      case 'STOP_CHAIN_INCREASE_DAMAGE' :
        html = 'The chain break if the combo count is greater than 5 but increase modifier by ' + effect.value + '%';
        break;
      default:
        console.log('@@@@@ ' + unit.names.en + ' -- skill : ' + skill.dataId + ' -- NOT TRANSLATED : ' + effect.type);
      break;
    }

    if (effect.condition) {
      const conditions = {
        'BEHIND': ' when attacking from behind',
        'MALE': 'when attacking male units',
      };

      if (conditions[effect.condition]) {
        html = html + conditions[effect.condition];
      }
    }

    if (effect.side) {
      html = html + ' for 3 turns to all ';

      if (effect.elements) {
        html += effect.elements.join(' ,') + ' ';
      }

      html += (effect.side === 'TEAM' ? 'units' : 'ennemies');
    }

    if (skill.maths) {
      html = this.formatMaths(skill, html);
    }

    if (getTarget) {
      html = this.formatTarget(skill, effect, html, fromEquipment);
    }

    return html;
  }

  private upperCaseFirst(text) {
    if (text) {
      return text[0].toUpperCase() + text.slice(1).toLowerCase();
    }

    return '';
  }

  formatDamage(unit, skill, damage) {
    const formattedDamage = {
      type: {
        title: null,
        image: null
      },
      effType: null,
      pool: null,
      value: null,
      others : ''
    };


    if (skill.damage) {
      if (damage.type) {
        const elem = skill.elem ? skill.elem : (unit.element ? unit.element : 'neutral');
        const image = elem + '_' + damage.type.toLowerCase();

        formattedDamage.type.title = elem + ' ' + damage.type.toLowerCase();
        formattedDamage.type.image = image;
      }

      const pool = damage.pool && damage.pool !== 'HP' ? ' ' + damage.pool + ' ' : '';

      let hasModifyAbsorb = false;
      if (damage.effType && damage.effType === 'ABSORB') {
        if (skill.maths) {
          skill.maths.forEach(math => {
            if (math.type === 'MODIFY_ABSORB') {
              hasModifyAbsorb = true;
            }
          });
        }
      }

      formattedDamage.effType = this.upperCaseFirst((damage.effType && !hasModifyAbsorb ? this.upperCaseFirst(damage.effType.toLowerCase()) + ' ' : 'Damage'));
      formattedDamage.pool = pool === '' && damage.effType === 'ABSORB' && !hasModifyAbsorb ? ' HP ' : pool;
      formattedDamage.value = this.getDamageValue(skill, damage);
    }

    if (skill.hit) {
      formattedDamage.others += (formattedDamage.others !== '' ? '<br />' : '') + (skill.hit > 0 ? '+' : '') + skill.hit + '% hit chance';
    }

    if (skill.crt_hit) {
      formattedDamage.others += (formattedDamage.others !== '' ? '<br />' : '') + 'Critic chance ' + skill.crt_hit + '%';
    }

    if (skill.pierce) {
      formattedDamage.others += (formattedDamage.others !== '' ? '<br />' : '') + 'Piercing';
    }

    if (skill.ctbreak) {
      formattedDamage.others += (formattedDamage.others !== '' ? '<br />' : '') + 'Cancel Ability Activation';
    }

    if (skill.knockback) {
      formattedDamage.others += (formattedDamage.others !== '' ? '<br />' : '') + skill.knockback.rate + '% chance to Knockback target' + (skill.aoe ? 's' : '') + ' by ' + skill.knockback.value + ' square' + (skill.knockback.value > 1 ? 's' : '');
    }

    if (skill.increaseDamageOnDecreaseHp) {
      formattedDamage.others += (formattedDamage.others !== '' ? '<br />' : '') + 'Increase damage as HP decreases';
    }

    if (skill.maths) {
      formattedDamage.others = this.formatMaths(skill, formattedDamage.others);
    }

    return formattedDamage;
  }

  formatMaths(skill, html) {
    if (skill.maths) {
      skill.maths.forEach(math => {
        if (math.type !== 'UNIT_ACTIONS' && math.type !== 'MODIFY_ABSORB') {
          html += ' + Increase modifier by ';
        }

        switch (math.formula) {
          case 'CURVE' :
            if (math.type !== 'UNIT_ACTIONS') {
              html += Math.floor(this.getPositiveValue(math.value / math.condition, true)) + '% ';
            }
            break;
          case 'PERCENT' :
            break;
          default:
            html += math.value + '% ';
            break;
        }

        switch (math.type) {
          case 'DEAD_UNITS' :
            switch (math.formula) {
              case 'CURVE' :
                html += ' for each dead unit (max: ' + this.getPositiveValue(math.value, true) + '%)';
                break;
              case 'COUNT' :
                html += ' if there is ' + math.condition + ' dead unit';
                break;
              case 'RATIO' :
                html += ' if the dead units is a multiple of ' + math.condition;
                break;
              case 'PERCENT' :
                console.log('Not manage math formula right now...');
                break;
            }
            break;
          case 'UNIT_LEVEL' :
            switch (math.formula) {
              case 'CURVE' :
                html += ' for each unit level (max: ' + this.getPositiveValue(math.value, true) + '%)';
                break;
              case 'COUNT' :
                html += ' if the unit level is ' + math.condition;
                break;
              case 'RATIO' :
                html += ' if the unit level is a multiple of ' + math.condition;
                break;
              case 'PERCENT' :
                console.log('Not manage math formula right now...');
                break;
            }
            break;
          case 'HEIGHT' :
            switch (math.formula) {
              case 'CURVE' :
                html += ' for each height level of the target (max: ' + this.getPositiveValue(math.value, true) + '%)';
                break;
              case 'COUNT' :
                html += ' if target height is ' + math.condition;
                break;
              case 'RATIO' :
                html += ' if the target height is a multiple of ' + math.condition;
                break;
              case 'PERCENT' :
                console.log('Not manage math formula right now...');
                break;
            }
            break;
          case 'TARGET_LEVEL' :
            switch (math.formula) {
              case 'CURVE' :
                html += ' for each target level (max: ' + this.getPositiveValue(math.value, true) + '%)';
                break;
              case 'COUNT' :
                html += ' if the target level is ' + math.condition;
                break;
              case 'RATIO' :
                html += ' if the target level is a multiple of ' + math.condition;
                break;
              case 'PERCENT' :
                console.log('Not manage math formula right now...');
                break;
            }
            break;
          case 'COUNT_DAMAGE_RECEIVED' :
            switch (math.formula) {
              case 'CURVE' :
                html += ' for each time you received damage (max: ' + this.getPositiveValue(math.value, true) + '%)';
                break;
              case 'COUNT' :
                html += ' if the number of times you received damage is ' + math.condition;
                break;
              case 'RATIO' :
                html += ' if the number of time you received damage is a multiple of ' + math.condition;
                break;
              case 'PERCENT' :
                console.log('Not manage math formula right now...');
                break;
            }
            break;
          case 'UNIT_ACTIONS' :
            switch (math.formula) {
              case 'CURVE' :
                html += ' + Increase chance up to ' + math.value + '% (-' + Math.floor(this.getPositiveValue(math.value / math.condition, true)) + '% for each action done by the unit)';
                break;
              case 'COUNT' :
                console.log('Not manage math formula right now...');
                break;
              case 'RATIO' :
                console.log('Not manage math formula right now...');
                break;
              case 'PERCENT' :
                console.log('Not manage math formula right now...');
                break;
            }
            break;
          case 'MODIFY_ABSORB' :
            switch (math.formula) {
              case 'CURVE' :
                console.log('Not manage math formula right now...');
                break;
              case 'COUNT' :
                console.log('Not manage math formula right now...');
                break;
              case 'RATIO' :
                console.log('Not manage math formula right now...');
                break;
              case 'PERCENT' :
                html += ' + Absorb ' + this.getPositiveValue(100 + math.value, true) + '% of the damage done';
                break;
            }
            break;
          default :
            console.log('Not manage math type : ' + math.type);
            break;
        }
      });
    }

    return html;
  }

  formatTarget(skill, effect, html, fromEquipment = false) {
    const conditions = {
      'FIRE_ELEMENT': ' for fire ',
      'ICE_ELEMENT': ' for ice ',
      'WIND_ELEMENT': ' for wind ',
      'EARTH_ELEMENT': ' for earth ',
      'LIGHTNING_ELEMENT': ' for lightning ',
      'WATER_ELEMENT': ' for water ',
      'LIGHT_ELEMENT': ' for light ',
      'DARK_ELEMENT': ' for dark ',
    };

    if (!effect.target) {
      effect.target = '';
    }

    if (conditions[effect.condition]) {
      switch (effect.target) {
        case 'self' :
          console.log('Target self should not be used in target condition');
          return html;
          break;
        case 'target' :
          return html + conditions[effect.condition] + 'target' + (skill.aoe ? 's' : '');
          break;
        case 'allyNotSelf' :
          return html + conditions[effect.condition] + 'all' + (skill.aoe ? 'ies' : 'y') + ' not self';
          break;
        case 'selfSide' :
          return html + conditions[effect.condition] + 'all' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'ennemySide' :
          return html + conditions[effect.condition] + 'ennem' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'all' :
          return html + conditions[effect.condition] + 'target' + (skill.aoe ? 's' : '');
          break;
        case 'deadAlly' :
          return html + conditions[effect.condition] + 'dead all' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'deadEnnemy' :
          return html + conditions[effect.condition] + 'dead ennem' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'deadAll' :
          return html + conditions[effect.condition] + 'dead target' + (skill.aoe ? 's' : '');
          break;
        case 'panel' :
          console.log('Target panel should not be used in target condition');
          return html;
          break;
        case '' :
          return html;
          break;
        default :
          console.log('Not manage target in condition : ' + effect.target);
          console.log(skill);
          return html;
          break;
      }
    } else {
      switch (effect.target) {
        case 'self' :
          if (effect.rate && fromEquipment) {
            return html + ' on basic attack' + (effect.rate === 200 ? '' : ' for target');
          } else {
            return html + ' for self';
          }
          break;
        case 'target' :
          return html + ' for target' + (skill.aoe ? 's' : '');
          break;
        case 'allyNotSelf' :
          return html + ' for all' + (skill.aoe ? 'ies' : 'y') + ' not self';
          break;
        case 'selfSide' :
          return html + ' for all' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'ennemySide' :
          return html + ' for ennem' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'all' :
          return html + ' for target' + (skill.aoe ? 's' : '');
          break;
        case 'deadAlly' :
          return html + ' for dead all' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'deadEnnemy' :
          return html + ' for dead ennem' + (skill.aoe ? 'ies' : 'y');
          break;
        case 'deadAll' :
          return html + ' for dead target' + (skill.aoe ? 's' : '');
          break;
        case 'panel' :
          return html;
          break;
        case '' :
          return html;
          break;
        default :
          console.log('Not manage target : ' + effect.target);
          console.log(skill);
          return html;
          break;
      }
    }
  }

  formatCounter(unit, skill, counter) {
    return 'Chance to counter ' + this.counterType[counter.reactDamage] + ' damage ' + this.getValue(skill, counter);
  }

  formatUpgrade(unit, skill) {
    let html = '';

    if (unit.replacedSkills && unit.replacedSkills[skill.dataId]) {
      const replacedSkills = unit.replacedSkills[skill.dataId];
      html = 'Upgrade skill' + (replacedSkills.length > 1 ? 's' : '') + ' : ';

      replacedSkills.forEach((replacedSkill, skillIndex) => {
        if (this.isSkillExistForUnit(unit, replacedSkill.oldSkill)) {
          if (skillIndex !== 0) {
            html += ', ';
          }

          html += this.nameService.getName(replacedSkill.newSkill);
        }
      });
    }

    return html;
  }

  isSkillExistForUnit(unit, skillId) {
    let exist = false;

    Object.keys(unit.board.nodes).forEach(nodeId => {
      if (unit.board.nodes[nodeId].skill.dataId === skillId) {
        exist = true;
      }
    });

    return exist;
  }

  formatDiamond(skillTable, range) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle - range.l; i <= middle; i++) {
      let countCol = 0;

      for (let j = middle - countLine; j <= middle; j++) { // up-left
        if (!range.m || (countCol < range.l - range.m )) {
          skillTable[i][j] = 'R';
        }

        countCol++;
      }

      countCol = 0;
      for (let j = middle + 1; j <= middle + countLine; j++) { // up-right
        if (!range.m || (countCol >= ((countLine) - (range.l - range.m)))) {
          skillTable[i][j] = 'R';
        }

        countCol++;
      }

      if (countLine > 0) {
        countCol = 0;
        for (let j = middle - range.l + countLine; j <= middle; j++) { // down-left
          if (!range.m || (countCol < range.l - range.m )) {
            skillTable[middle + countLine][j] = 'R';
          }

          countCol++;
        }

        countCol = 0;
        for (let j = middle + 1; j <= middle + range.l - countLine; j++) { // down-right
          if (!range.m || (countCol >= ((range.l - countLine) - (range.l - range.m)))) {
            skillTable[middle + countLine][j] = 'R';
          }

          countCol++;
        }
      }

      countLine++;
    }

    return skillTable;
  }


  formatLine(skillTable, range, fullAOE = false) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle; i >= middle - range.l; i--) {
      if (i !== middle && (!range.m || countLine > range.m)) {
        skillTable[i][middle] = fullAOE ? 'AR' : 'R';
        skillTable[(middle + countLine)][middle] = 'R';
      } else {
        let start = fullAOE ? 1 : 0;
        if (range.m) {
          start = range.m + 1;
        }

        for (let j = start; j <= range.l; j++) {
          skillTable[middle][middle - j] = 'R';
          skillTable[middle][middle + j] = 'R';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  formatSquare(skillTable, range) {
    const middle = 8;
    let countLine = 0;
    for (let i = middle; i >= middle - range.l; i--) {
      for (let j = 1; j <= range.l; j++) {
        if (i !== middle) {
          if (i > middle - range.w || j < range.w) {
            if (j >= range.w) {
              skillTable[i][middle + j] = 'R';
              skillTable[i][middle - j] = 'R';
            } else {
              skillTable[i][middle + j] = 'AR';
              skillTable[i][middle - j] = 'AR';
            }

            skillTable[(middle + countLine)][middle + j] = 'R';
            skillTable[(middle + countLine)][middle - j] = 'R';
          }

          skillTable[i][middle] = 'AR';
          skillTable[(middle + countLine)][middle] = 'R';
        } else {
          skillTable[i][middle - j] = 'R';
          skillTable[i][middle + j] = 'R';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  formatL(skillTable, range) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle - 1; i >= middle - range.l; i--) {
      if (i + 1 === middle) {
        for (let j = 1; j <= range.l; j++) {
          if (j === 1) {
            skillTable[i][middle + j] = 'AR';
            skillTable[i][middle - j] = 'AR';
          } else {
            skillTable[i][middle + j] = 'R';
            skillTable[i][middle - j] = 'R';
          }

          skillTable[(middle + countLine + 1)][middle + j] = 'R';
          skillTable[(middle + countLine + 1)][middle - j] = 'R';
        }
      } else {
        skillTable[i][middle + 1] = 'AR';
        skillTable[i][middle - 1] = 'AR';

        skillTable[(middle + countLine + 1)][middle + 1] = 'R';
        skillTable[(middle + countLine + 1)][middle - 1] = 'R';
      }

      countLine++;
    }

    return skillTable;
  }

  formatV(skillTable, range) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle; i >= middle - range.l; i--) {

      if (i === middle) {
        for (let j = 1; j <= range.l; j++) {
          skillTable[i][middle + j] = 'R';
          skillTable[i][middle - j] = 'R';
        }
      } else {
        for (let j = 0; j <= range.l; j++) {
          if ((middle - j) !== i) {
            if (j <= countLine) {
              skillTable[i][middle + j] = 'AR';
              skillTable[i][middle - j] = 'AR';
            } else {
              skillTable[i][middle + j] = 'R';
              skillTable[i][middle - j] = 'R';
            }

            skillTable[(middle + countLine)][middle + j] = 'R';
            skillTable[(middle + countLine)][middle - j] = 'R';
          }
        }
      }

      countLine++;
    }

    return skillTable;
  }

  private aoeDiamond(skillTable, aoe, maxLine) {
    const middle = 8;
    let countLine = 0;

    for (let i = maxLine - aoe.l; i <= maxLine; i++) {
      for (let j = middle - countLine; j <= middle; j++) { // up-left
        skillTable[i][j] = skillTable[i][j] === 'N' ? 'A' : 'AR';
      }

      for (let j = middle + 1; j <= middle + countLine; j++) { // up-right
        skillTable[i][j] = skillTable[i][j] === 'N' ? 'A' : 'AR';
      }

      if (countLine > 0) {
        for (let j = middle - aoe.l + countLine; j <= middle; j++) { // down-left
          skillTable[maxLine + countLine][j] = skillTable[maxLine + countLine][j] === 'N' ? 'A' : 'AR';
        }

        for (let j = middle + 1; j <= middle + aoe.l - countLine; j++) { // down-right
          skillTable[maxLine + countLine][j] = skillTable[maxLine + countLine][j] === 'N' ? 'A' : 'AR';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  private aoeLine(skillTable, aoe, maxLine, onlyHorizontal = false) {
    const middle = 8;
    let countLine = 0;

    for (let i = maxLine - aoe.l; i <= maxLine; i++) {
      if (i !== maxLine) {
        if (!onlyHorizontal) {
          skillTable[i][middle] = skillTable[i][middle] === 'N' || skillTable[i][middle] === 'A' ? 'A' : 'AR';
          skillTable[(maxLine + countLine + 1)][middle] = skillTable[(maxLine + countLine + 1)][middle] === 'N' || skillTable[(maxLine + countLine + 1)][middle] === 'A' ? 'A' : 'AR';
        } else if (aoe.w === 2) {
          skillTable[i][middle] = skillTable[i][middle] === 'N' || skillTable[i][middle] === 'A' ? 'A' : 'AR';
          for (let j = 0; j <= aoe.l; j++) {
            skillTable[i][middle - j] = skillTable[i][middle - j] === 'N' || skillTable[i][middle - j] === 'A' ? 'A' : 'AR';
            skillTable[i][middle + j] = skillTable[i][middle + j] === 'N' || skillTable[i][middle + j] === 'A' ? 'A' : 'AR';
          }
        }
      } else {
        for (let j = 0; j <= aoe.l; j++) {
          skillTable[maxLine][middle - j] = skillTable[maxLine][middle - j] === 'N' || skillTable[maxLine][middle - j] === 'A' ? 'A' : 'AR';
          skillTable[maxLine][middle + j] = skillTable[maxLine][middle + j] === 'N' || skillTable[maxLine][middle + j] === 'A' ? 'A' : 'AR';
        }
      }

      countLine++;
    }

    return skillTable;
  }

  aoeSquare(skillTable, aoe, maxLine) {
    const middle = 8;
    let countLine = 0;

    for (let i = maxLine; i >= maxLine - aoe.l; i--) {
      for (let j = 0; j <= aoe.l; j++) {
        skillTable[i][middle - j] = skillTable[i][middle - j] === 'N' || skillTable[i][middle - j] === 'A' ? 'A' : 'AR';
        skillTable[i][middle + j] = skillTable[i][middle + j] === 'N' || skillTable[i][middle + j] === 'A' ? 'A' : 'AR';

        skillTable[(maxLine + countLine)][middle - j] = skillTable[i][middle - j] === 'N' || skillTable[i][middle - j] === 'A' ? 'A' : 'AR';
        skillTable[(maxLine + countLine)][middle + j] = skillTable[i][middle + j] === 'N' || skillTable[i][middle + j] === 'A' ? 'A' : 'AR';
      }

      countLine++;
    }

    return skillTable;
  }

  aoeX(skillTable, aoe, maxLine) {
    const middle = 8;
    let countLine = 0;

    for (let i = middle; i >= middle - aoe.l; i--) {

      if (i === middle) {
        skillTable[i][middle] = skillTable[i][middle] === 'N' ? 'A' : 'AR';
      } else {
        for (let j = 0; j <= aoe.l; j++) {
          if ((middle - j) === i) {
            if (j <= countLine) {
              skillTable[i][middle + j] = 'A';
              skillTable[i][middle - j] = 'A';
            } else {
              skillTable[i][middle + j] = 'A';
              skillTable[i][middle - j] = 'A';
            }

            skillTable[(maxLine + countLine)][middle + j] = 'A';
            skillTable[(maxLine + countLine)][middle - j] = 'A';
          }
        }
      }

      countLine++;
    }

    return skillTable;
  }


  formatRange(unit, skill) {
    if (skill.type !== 'passive') {
      let skillTable = [];
      for (let i = 0; i <= 16; i++) {
        skillTable.push([]);
        for (let j = 0; j <= 16; j++) {
          skillTable[i].push('N');
        }
      }

      if (skill.range && skill.range.l) {
        if (skill.range.s === 0) {
          skillTable = this.formatLine(skillTable, skill.range);
        } else if (skill.range.s === 1) {
          skillTable = this.formatDiamond(skillTable, skill.range);
        } else if (skill.range.s === 10) {
          if (!skill.range.w || (skill.range.w && skill.range.w === 1)) {
            skillTable = this.formatLine(skillTable, skill.range, true);
          } else {
            skillTable = this.formatSquare(skillTable, skill.range);
          }
        } else if (skill.range.s === 11) {
          skillTable = this.formatL(skillTable, skill.range);
        } else if (skill.range.s === 13) {
          skillTable = this.formatV(skillTable, skill.range);
        } else {
          console.log('Unknow range grid -- ' + skill.dataId);
        }
      }

      const middle = 8;
      const maxLine = (skill.range && skill.range.l) ? middle - skill.range.l : middle;
      if (skill.aoe && skill.aoe.l) {
        if (skill.aoe.s === 0) {
          skillTable = this.aoeLine(skillTable, skill.aoe, maxLine);
        } else if (skill.aoe.s === 1) {
          skillTable = this.aoeDiamond(skillTable, skill.aoe, maxLine);
        } else if (skill.aoe.s === 2) {
          skillTable = this.aoeSquare(skillTable, skill.aoe, maxLine);
        } else if (skill.aoe.s === 3) {
          skillTable = this.aoeLine(skillTable, skill.aoe, maxLine, true);
        } else if (skill.aoe.s === 5) {
          skillTable = this.aoeX(skillTable, skill.aoe, maxLine);
        } else {
          console.log('unknow aoe -- ' + skill.dataId);
        }
      }

      if (!skill.range || (skill.range.s !== 11 && skill.range.s !== 13)) {
        skillTable[maxLine][middle] = 'TAR';
      } else if (skill.range.s === 13) {
        skillTable[middle - 1][middle] = 'TAR';
      }

      if (maxLine !== middle) {
        skillTable[middle][middle] = 'U' + skillTable[middle][middle];
      }

      let html = '<table class=\'table-skill\'>';
      skillTable.forEach(line => {
        html += '<tr>';
        line.forEach(col => {
          html += '<td class=\'table-skill-' + col + '\'></td>';
        });
        html += '</tr>';
      });
      html += '</table>';
      html += '<div class=\'tableSkillHeight\'>Range Height: ' + (skill.range && skill.range.h ? skill.range.h : '0') + '</div>';
      if (skill.aoe && skill.aoe.l) {
        html += '<div class=\'tableSkillHeight\'>AOE Height: ' + skill.aoe.h + '</div>';
      }

      skill.skillTableHtml = html;
    }
  }
}
