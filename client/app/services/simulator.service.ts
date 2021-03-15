import { Injectable } from '@angular/core';

@Injectable()
export class SimulatorService {

  private elementAdvantage = {
    fire: 'ice',
    ice: 'wind',
    wind: 'earth',
    earth: 'lightning',
    lightning: 'water',
    water: 'fire',
    light: 'dark',
    dark: 'light'
  };

  constructor(
  ) {}

  calculateDamageSim(unit, dataSimulator) {
    console.log(unit);
    console.log(dataSimulator);

    if (dataSimulator && dataSimulator.unit && dataSimulator.unit.selectedSkill) {
      this.getSkillEffects(dataSimulator);
      console.log('Simulator after skill effects');
      console.log(dataSimulator);
      this.calculateDamage(unit, dataSimulator);
    }
  }

  getSkillEffects(dataSimulator) {
    dataSimulator.skillEffects = {};

    dataSimulator.unit.selectedSkill.effects.forEach(effect => {
      // @TODO check if condition

      // @TODO check target
      switch (effect.target) {
        case 'self' :
          // @TODO manage fromImbue = only on basic attack
          this.applyEffectToUnit(dataSimulator, effect);
          break;
        case 'target' :
          this.applyEffectToTarget(dataSimulator, effect);
          break;
        case 'selfSide' :
          this.applyEffectToUnit(dataSimulator, effect);
          break;
        case 'ennemySide' :
          this.applyEffectToTarget(dataSimulator, effect);
          break;
        case 'all' :
          this.applyEffectToTarget(dataSimulator, effect);
          break;
        default :
          break;
      }
    });
  }

  applyEffectToUnit(dataSimulator, effect) {
    console.log('applyEffectToUnit');
    console.log(effect);
  }

  applyEffectToTarget(dataSimulator, effect) {
    console.log('applyEffectToTarget');
    console.log(effect);

    const effectType = effect.type;
    const unit = dataSimulator.unit;
    const elementSkill = unit.selectedSkill.elem ? unit.selectedSkill.elem : unit.element;
    const damageType = unit.selectedSkill.damage.type;

    if (effectType === 'DEF'
      || effectType === 'SPR'
      || effectType === 'FAITH'
      || effectType === 'ATTACK_RES'
      || effectType === 'AOE_RES'
      || effectType === elementSkill.toUpperCase() + '_RES'
      || effectType === damageType.toUpperCase() + '_RES'
    ) {
      const value = this.getEffectValue(unit.selectedSkill, effect);
      console.log(value);

      if (effect.calcType === 'fixe' || effect.calcType === 'resistance') {
        if (effectType === 'DEF'
          || effectType === 'SPR'
          || effectType === 'FAITH'
          || effectType === 'ATTACK_RES'
          || effectType === 'AOE_RES'
        ) {
          dataSimulator.target[effectType.toLowerCase()] += value;
        } else if (effectType === elementSkill.toUpperCase() + '_RES') {
          dataSimulator.target.elementRes += value;
        } else {
          dataSimulator.target.damageTypeRes += value;
        }
      } else { // Should be percent ^^

      }
    }
  }

  private getEffectValue(skill, effect) {
    let value = 0;
    if (typeof(effect.minValue) === 'number' || typeof(effect.value) === 'number') {
      let maxReduceValueFromMath = 0;
      if (skill.maths) {
        skill.maths.forEach(math => {
          if (math.type !== 'MODIFY_ABSORB' && math.dst !== 'DAMAGE' && math.formula === 'CURVE' && math.value < maxReduceValueFromMath) {
            maxReduceValueFromMath = math.value;
          }
        });
      }

      const minValue = (typeof(effect.minValue) === 'number' ? effect.minValue : effect.value) + maxReduceValueFromMath;

      if (effect.minValue !== effect.maxValue) {
        const maxValue = effect.maxValue;

        if (skill.level >= skill.maxLevel) {
          value = maxValue;
        } else {
          value = minValue + ((maxValue - minValue) / (skill.maxLevel - 1) * (skill.level - 1));
          if (value < 0) {
            value = -value;
            value = Math.floor(value);
            value = -value;
          } else {
            value = Math.floor(value);
          }
        }
      } else {
        value = minValue;
      }
    }

    return value;
  }

  calculateDamage(unit, dataSimulator) {
    const atk = unit.stats.ATK.total;
    const mag = unit.stats.MAG.total;
    const agi = unit.stats.AGI.total;
    const dex = unit.stats.DEX.total;
    const luck = unit.stats.LUCK.total;

    // @TODO Apply buffs

    let baseDamage = 0;
    if (dataSimulator.unit.selectedSkill.based === 'magic') {
      baseDamage = this.calculateSkillBonus(mag, dex, agi, luck, dataSimulator.unit.selectedSkill.damage.formula);
    } else if (dataSimulator.unit.selectedSkill.based === 'physic') {
      baseDamage = this.calculateSkillBonus(atk, dex, agi, luck, dataSimulator.unit.selectedSkill.damage.formula);
    } else if (dataSimulator.unit.selectedSkill.based === 'hybrid') {
      // @TODO manage kotetsu
    }

    let damage = Math.round(baseDamage * this.getMultiplier(unit, dataSimulator));
    console.log('damage before DEF, ...');
    console.log(damage);

    damage = Math.round(damage * this.getDefensiveMultiplier(unit, dataSimulator, 'def'));
    console.log('damage after DEF, ...');
    console.log(damage);

    damage = Math.round(damage * this.getResistanceMultiplier(unit, dataSimulator));
    console.log('damage after resistance, ...');
    console.log(damage);

    if (dataSimulator.unit.selectedSkill.based === 'magic') {
      damage = Math.round(damage * (0.5 + ((dataSimulator.unit.faith + dataSimulator.target.faith) / 100)));
    } else if (dataSimulator.unit.selectedSkill.based === 'physic') {
      damage = Math.round(damage * (0.5 + (dataSimulator.unit.brave / 100)));
    } else if (dataSimulator.unit.selectedSkill.based === 'hybrid') {
      // @TODO manage kotetsu
    }
    console.log('damage after brave');
    console.log(damage);

    damage = Math.round(damage * (1 + (this.elementAdvantage[unit.element] === dataSimulator.target.element ? 0.25 : 0)));
    console.log('damage element advantage');
    console.log(damage);

    dataSimulator.result = damage;

    // @TODO effect of skill (breaks, ignore, ...)

    // @TODO add maths possibilities
  }

  calculateSkillBonus(mainStat, dex, agi, luck, formula) {
    let damage = 0;

    if (formula.type === 1) {
      damage += mainStat * (100 + formula[1]) / 100;
    } else if (formula.type === 0) {
      damage += mainStat;

      damage += dex * (formula[1] ? formula[1] : 0) / 100;
      damage += agi * (formula[2] ? formula[2] : 0) / 100;
      damage += luck * (formula[3] ? formula[3] : 0) / 100;
    } else {
      console.log('FORMULA NOT MANAGED !!! -- ' + formula.type);
    }

    console.log('SKILL BONUS');
    console.log(Math.round(damage));
    return Math.round(damage);
  }

  getMultiplier(unit, dataSimulator) {
    let multiplier = this.getDamageValue(dataSimulator.unit.selectedSkill);

    console.log('skill modifier');
    console.log(multiplier);

    const elementSkill = dataSimulator.unit.selectedSkill.elem ? dataSimulator.unit.selectedSkill.elem : unit.element;
    const damageType = dataSimulator.unit.selectedSkill.damage.type;
    const targetElement = dataSimulator.target.element;
    const targetRace = dataSimulator.target.race;

    Object.keys(unit.stats).forEach(statType => {
      if (statType === elementSkill.toUpperCase() + '_ATK'
        || statType === damageType.toUpperCase() + '_ATK'
        || statType === targetElement.toUpperCase() + '_KILLER'
        || statType === targetRace.toUpperCase() + '_KILLER'
      ) {
        console.log('multiplier -- ' + statType);
        console.log(unit.stats[statType].total);
        multiplier += unit.stats[statType].total;
      }
    });

    // @TODO Apply buffs

    // @TODO Critical

    return multiplier / 100;
  }

  private getDamageValue(skill) {
    const effect = skill.damage;
    let value = 0;

    if (typeof(effect.minValue) === 'number' || typeof(effect.value) === 'number') {
      let maxReduceValueFromMath = 0;
      if (skill.maths) {
        skill.maths.forEach(math => {
          if (math.type !== 'MODIFY_ABSORB' && math.dst === 'DAMAGE' && math.formula === 'CURVE' && math.value < maxReduceValueFromMath) {
            maxReduceValueFromMath = math.value;
          }
        });
      }

      const minValue = 100 + (typeof(effect.minValue) === 'number' ? effect.minValue : effect.value) + maxReduceValueFromMath;

      if (effect.minValue !== effect.maxValue) {
        const valueForLevel = Math.floor(effect.minValue + ((effect.maxValue - effect.minValue) / (skill.maxLevel - 1) * (skill.level - 1)));
        value = 100 + valueForLevel;
      } else {
        value = minValue;
      }
    }

    return value;
  }

  getDefensiveMultiplier(unit, dataSimulator, type) {
    const defensiveValue = dataSimulator.target[type];
    let ignoreDefensive = 0;

    Object.keys(unit.stats).forEach(statType => {
      if (statType === (type === 'def' ? 'DEFENSE_PENETRATION' : 'SPIRIT_PENETRATION')) {
        ignoreDefensive = unit.stats[statType];
      }
    });

    return 1 - ((defensiveValue / 100) * (1 - (ignoreDefensive / 100)));
  }

  getResistanceMultiplier(unit, dataSimulator) {
    // @TODO Ignore resistance type
    return (1 - dataSimulator.target.elementRes / 100) * (1 - dataSimulator.target.damageTypeRes / 100);
  }
}
