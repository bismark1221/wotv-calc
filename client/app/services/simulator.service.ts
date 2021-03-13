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
      switch (dataSimulator.unit.selectedSkill.based) {
        case 'physic' :
          this.calculatePhysicDamage(unit, dataSimulator);
          break;
        case 'magic' :
          this.calculateMagicDamage(unit, dataSimulator);
          break;
        case 'hybrid' :
          this.calculateHybridDamage(unit, dataSimulator);
          break;
      }
    }
  }

  calculatePhysicDamage(unit, dataSimulator) {
    const atk = unit.stats.ATK.total;
    const agi = unit.stats.AGI.total;
    const dex = unit.stats.DEX.total;
    const luck = unit.stats.LUCK.total;

    // @TODO Apply buffs

    const baseDamage = this.calculateSkillBonus(atk, dex, agi, luck, dataSimulator.unit.selectedSkill.damage.formula);

    let damage = Math.round(baseDamage * this.getMultiplier(unit, dataSimulator));
    console.log('damage before DEF, ...');
    console.log(damage);

    damage = Math.round(damage * this.getDefensiveMultiplier(unit, dataSimulator, 'def'));
    console.log('damage after DEF, ...');
    console.log(damage);

    damage = Math.round(damage * this.getResistanceMultiplier(unit, dataSimulator));
    console.log('damage after resistance, ...');
    console.log(damage);

    damage = Math.round(damage * (0.5 + (dataSimulator.unit.brave / 100)));
    console.log('damage after brave');
    console.log(damage);

    damage = Math.round(damage * (1 + (this.elementAdvantage[unit.element] === dataSimulator.target.element ? 0.25 : 0)));
    console.log('damage element advantage');
    console.log(damage);

    // @TODO effect of skill (breaks, ignore, ...)
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

  calculateMagicDamage(unit, dataSimulator) {

  }

  calculateHybridDamage(unit, dataSimulator) {

  }
}
