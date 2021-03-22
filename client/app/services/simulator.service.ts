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

  private species = [
    'human',
    'netherBeast',
    'beast',
    'demon',
    'dragon',
    'plant',
    'bird',
    'insect',
    'aquatic',
    'machine',
    'fairy',
    'undead',
    'stone',
    'metal'
  ];

  constructor(
  ) {}

  getSpecies() {
    return this.species;
  }

  calculateDamageSim(unit, dataSimulator) {
    console.log(unit);
    console.log(dataSimulator);

    if (dataSimulator && dataSimulator.unit && dataSimulator.unit.selectedSkill) {
      this.InitiateRealStats(unit, dataSimulator);
      this.getSkillEffects(unit, dataSimulator);
      this.checkOnPhysicOrMagic(unit, dataSimulator);
      this.applyBuffsAndBreaks(unit, dataSimulator);
      this.calculateDamage(unit, dataSimulator);
    }
  }

  InitiateRealStats(unit, dataSimulator) {
    dataSimulator.realStats = {
      unit: {},
      target: {}
    };

    Object.keys(unit.stats).forEach(statType => {
      dataSimulator.realStats.unit[statType] = unit.stats[statType].total;
    });

    dataSimulator.realStats.unit.faith = dataSimulator.unit.faith;
    dataSimulator.realStats.unit.brave = dataSimulator.unit.brave;

    Object.keys(dataSimulator.target).forEach(statType => {
      if (statType !== 'race' && statType !== 'element' && statType !== 'breaks') {
        dataSimulator.realStats.target[statType] = dataSimulator.target[statType];
      }
    });
  }

  updateRealStat(dataSimulator, type, statType, value) {
    if (!dataSimulator.realStats[type][statType]) {
      dataSimulator.realStats[type][statType] = 0;
    }

    if (type === 'unit') {
      dataSimulator.realStats[type][statType] += value;
    } else {
      dataSimulator.realStats[type][statType] -= value;
    }

    if ((statType === 'faith' || statType === 'brave') && dataSimulator.realStats[type][statType] > 100) {
      dataSimulator.realStats[type][statType] = 100;
    }
  }

  getSkillEffects(unit, dataSimulator) {
    const unitEffectTypes = [
      'atk',
      'mag',
      'dex',
      'agi',
      'luck',
      'raceKiller',
      'elementKiller',
      'elementAtk',
      'damageType',
      'criticDamage',
      'defense_penetration',
      'spirit_penetration',
      'typeResPene',
      'brave',
      'faith'
    ];
    const targetEffectTypes = [
      'def',
      'spr',
      'elementRes',
      'damageTypeRes',
      'attack_res',
      'aoe_res',
      'faith'
    ];

    dataSimulator.skillEffects = {
      unit: {},
      target: {},
      conditions: {}
    };

    unitEffectTypes.forEach(effectType => {
      dataSimulator.skillEffects.unit[effectType] = {
        value: 0,
        overwriteBuff: false
      };
    });

    targetEffectTypes.forEach(effectType => {
      dataSimulator.skillEffects.target[effectType] = {
        value: 0,
        overwriteBreak: false
      };
    });

    dataSimulator.unit.selectedSkill.effects.forEach(effect => {
      if (effect.timing === 'QUEST_START' || effect.timing === 'SKILL_BEFORE') {
        switch (effect.target) {
          case 'self' :
            this.applyEffectToUnit(unit, dataSimulator, effect);
            break;
          case 'target' :
            this.applyEffectToTarget(unit, dataSimulator, effect);
            break;
          case 'selfSide' :
            this.applyEffectToUnit(unit, dataSimulator, effect);
            break;
          case 'ennemySide' :
            this.applyEffectToTarget(unit, dataSimulator, effect);
            break;
          case 'all' :
            this.applyEffectToTarget(unit, dataSimulator, effect);
            break;
          default :
            if (effect.target === '') { // Killer have no target
              this.applyEffectToUnit(unit, dataSimulator, effect);
            }
            break;
        }
      }
    });

    console.log('Skill effects');
    console.log(dataSimulator.skillEffects);

    console.log('Real stats');
    console.log(dataSimulator.realStats);
  }

  applyEffectToUnit(unit, dataSimulator, effect) {
    console.log('applyEffectToUnit');
    console.log(effect);

    const effectType = effect.type;
    const elementSkill = dataSimulator.unit.selectedSkill.elem && dataSimulator.unit.selectedSkill.elem[0] ? dataSimulator.unit.selectedSkill.elem[0] : unit.element;
    const damageType = dataSimulator.unit.selectedSkill.damage.type;
    const targetElement = dataSimulator.target.element;
    const targetRace = dataSimulator.target.race;

    // @TODO check if condition

    if (effectType === 'ATK'
      || effectType === 'MAG'
      || effectType === 'DEX'
      || effectType === 'LUCK'
      || effectType === 'AGI'
    ) {
      let value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (effect.calcType === 'percent') {
        value = this.calculateBuffValue(unit, effectType, value);
      }

      if (value > this.calculateBuffValue(unit, effectType, dataSimulator.unit.buffs[effectType.toLowerCase()])) {
        dataSimulator.skillEffects.unit[effectType.toLowerCase()].value = value;
        dataSimulator.skillEffects.unit[effectType.toLowerCase()].overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    } else if (effectType === 'DEFENSE_PENETRATION' || effectType === 'SPIRIT_PENETRATION' ) {
      const value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (value > dataSimulator.unit.buffs[effectType.toLowerCase()]) {
        dataSimulator.skillEffects.unit[effectType.toLowerCase()].value = value;
        dataSimulator.skillEffects.unit[effectType.toLowerCase()].overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    } else if (effectType === 'FAITH' || effectType === 'FAITH_FIGHT') {
      let value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (effect.calcType === 'percent') {
        value = dataSimulator.unit.faith * value / 100;
      }

      this.updateRealStat(dataSimulator, 'unit', 'faith', value);
    } else if (effectType === 'BRAVERY' || effectType === 'BRAVERY_FIGHT') {
      let value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (effect.calcType === 'percent') {
        value = dataSimulator.unit.brave * value / 100;
      }

      this.updateRealStat(dataSimulator, 'unit', 'brave', value);
    } else if (effectType === 'RES_' + damageType.toUpperCase() + '_ATK_PENETRATION') {
      const value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (value > dataSimulator.unit.buffs.typeResPene) {
        dataSimulator.skillEffects.unit.typeResPene.value = value;
        dataSimulator.skillEffects.unit.typeResPene.overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    } else if (effectType === targetElement.toUpperCase() + '_KILLER') {
      const value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (value > dataSimulator.unit.buffs.elementKiller) {
        dataSimulator.skillEffects.unit.elementKiller.value = value;
        dataSimulator.skillEffects.unit.elementKiller.overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    } else if (effectType === targetRace.toUpperCase() + '_KILLER') {
      const value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (value > dataSimulator.unit.buffs.raceKiller) {
        dataSimulator.skillEffects.unit.raceKiller.value = value;
        dataSimulator.skillEffects.unit.raceKiller.overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    } else if (effectType === elementSkill.toUpperCase() + '_ATK') {
      const value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (value > dataSimulator.unit.buffs.elementAtk) {
        dataSimulator.skillEffects.unit.elementAtk.value = value;
        dataSimulator.skillEffects.unit.elementAtk.overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    } else if (effectType === damageType.toUpperCase() + '_ATK') {
      const value = this.getEffectValue(dataSimulator.unit.selectedSkill, effect);

      if (value > dataSimulator.unit.buffs.damageType) {
        dataSimulator.skillEffects.unit.damageType.value = value;
        dataSimulator.skillEffects.unit.damageType.overwriteBuff = true;
        this.updateRealStat(dataSimulator, 'unit', effectType, value);
      }
    }
  }

  applyEffectToTarget(unit, dataSimulator, effect) {
    console.log('applyEffectToTarget');
    console.log(effect);

    const effectType = effect.type;
    const elementSkill = dataSimulator.unit.selectedSkill.elem && dataSimulator.unit.selectedSkill.elem[0] ? dataSimulator.unit.selectedSkill.elem[0] : unit.element;
    const damageType = dataSimulator.unit.selectedSkill.damage.type;

    // @TODO check if condition

    if (effectType === 'DEF'
      || effectType === 'SPR'
      || effectType === 'ATTACK_RES'
      || effectType === 'AOE_RES'
    ) {
      const value = this.getPositiveValue(this.getEffectValue(dataSimulator.unit.selectedSkill, effect));

      if (value > this.getPositiveValue(dataSimulator.target.breaks[effectType.toLowerCase()])) {
        dataSimulator.skillEffects.target[effectType.toLowerCase()].value = value;
        dataSimulator.skillEffects.target[effectType.toLowerCase()].overwriteBreak = true;
        this.updateRealStat(dataSimulator, 'target', effectType.toLowerCase(), value);
      }
    } else if (effectType === 'FAITH' || effectType === 'FAITH_FIGHT') {
      const value = this.getPositiveValue(this.getEffectValue(dataSimulator.unit.selectedSkill, effect));

      if (value > this.getPositiveValue(dataSimulator.target.breaks.faith)) {
        dataSimulator.skillEffects.target.faith.value = value;
        dataSimulator.skillEffects.target.faith.overwriteBreak = true;
        this.updateRealStat(dataSimulator, 'target', 'faith', value);
      }
    } else if (effectType === elementSkill.toUpperCase() + '_RES') {
      const value = this.getPositiveValue(this.getEffectValue(dataSimulator.unit.selectedSkill, effect));

      if (value > this.getPositiveValue(dataSimulator.target.breaks.elementRes)) {
        dataSimulator.skillEffects.target.elementRes.value = value;
        dataSimulator.skillEffects.target.elementRes.overwriteBreak = true;
        this.updateRealStat(dataSimulator, 'target', 'elementRes', value);
      }
    } else if (effectType === damageType.toUpperCase() + '_RES') {
      const value = this.getPositiveValue(this.getEffectValue(dataSimulator.unit.selectedSkill, effect));

      if (value > this.getPositiveValue(dataSimulator.target.breaks.damageTypeRes)) {
        dataSimulator.skillEffects.target.damageTypeRes.value = value;
        dataSimulator.skillEffects.target.damageTypeRes.overwriteBreak = true;
        this.updateRealStat(dataSimulator, 'target', 'damageTypeRes', value);
      }
    }
  }

  private getPositiveValue(value) {
    if (value < 0) {
      return -value;
    }

    return value;
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

  private checkOnPhysicOrMagic(unit, dataSimulator) {
    unit.equipments.forEach((equipment, equipmentIndex) => {
      if (equipment) {
        equipment.passiveSkills.forEach(skill => {
          skill.effects.forEach(effect => {
            // buffOnCondition
            if ((effect.buffOnCondition === 'ON_MAGIC_ATTACK' && dataSimulator.unit.selectedSkill.based === 'physic')
              || (effect.buffOnCondition === 'ON_PHYSIC_ATTACK' && dataSimulator.unit.selectedSkill.based === 'magic')
            ) {
              this.updateRealStat(dataSimulator, 'unit', effect.type, -(unit.stats[effect.type]['equipment' + equipmentIndex + '_buff']));
            } else if ((effect.buffOnCondition === 'ON_MAGIC_ATTACK' || effect.buffOnCondition === 'ON_PHYSIC_ATTACK')
              && dataSimulator.unit.selectedSkill.based === 'hybrid'
            ) {

            }
          });
        });
      }
    });

    if (unit.card) {
      Object.keys(unit.card.buffs.self).forEach(buffType => {
        unit.card.buffs.self[buffType].forEach(effect => {
          if (!effect.cond || this.checkCondition(unit, effect.cond)) {
            if ((effect.buffOnCondition === 'ON_MAGIC_ATTACK' && dataSimulator.unit.selectedSkill.based === 'physic')
              || (effect.buffOnCondition === 'ON_PHYSIC_ATTACK' && dataSimulator.unit.selectedSkill.based === 'magic')
            ) {
              this.updateRealStat(dataSimulator, 'unit', buffType, -(effect.value));
            } else if ((effect.buffOnCondition === 'ON_MAGIC_ATTACK' || effect.buffOnCondition === 'ON_PHYSIC_ATTACK')
              && dataSimulator.unit.selectedSkill.based === 'hybrid'
            ) {

            }
          }
        });
      });

      Object.keys(unit.card.buffs.party).forEach(buffType => {
        unit.card.buffs.party[buffType].forEach(effect => {
          if (!effect.cond || this.checkCondition(unit, effect.cond)) {
            if ((effect.buffOnCondition === 'ON_MAGIC_ATTACK' && dataSimulator.unit.selectedSkill.based === 'physic')
              || (effect.buffOnCondition === 'ON_PHYSIC_ATTACK' && dataSimulator.unit.selectedSkill.based === 'magic')
            ) {
              this.updateRealStat(dataSimulator, 'unit', buffType, -(effect.value));
            } else if ((effect.buffOnCondition === 'ON_MAGIC_ATTACK' || effect.buffOnCondition === 'ON_PHYSIC_ATTACK')
              && dataSimulator.unit.selectedSkill.based === 'hybrid'
            ) {

            }
          }
        });
      });
    }

    // @TODO Manage party cards
  }

  private checkCondition(unit, conditions) {
    let conditionChecked = true;

    conditions.forEach(condition => {
      switch (condition.type) {
        case 'unit':
          if (condition.items.indexOf(unit.dataId) === -1) {
            conditionChecked = false;
          }
          break;
        case 'job':
          const jobs = [];
          condition.items.forEach(job => {
            const tempJob = job.split('_');
            jobs.push(tempJob[0] + '_' + tempJob[1] + '_' + tempJob[2]);
          });

          const tableJob = unit.jobs[0].split('_');
          if (jobs.indexOf(tableJob[0] + '_' + tableJob[1] + '_' + tableJob[2]) === -1) {
            conditionChecked = false;
          }
          break;
        case 'elem':
          if (condition.items.indexOf(unit.element) === -1) {
            conditionChecked = false;
          }
          break;
        default:
          console.log('Card condition not manage : ' + condition.type);
          break;
      }
    });

    return conditionChecked;
  }

  applyBuffsAndBreaks(unit, dataSimulator) {
    const elementSkill = dataSimulator.unit.selectedSkill.elem && dataSimulator.unit.selectedSkill.elem[0] ? dataSimulator.unit.selectedSkill.elem[0] : unit.element;
    const damageType = dataSimulator.unit.selectedSkill.damage.type;
    const targetElement = dataSimulator.target.element;
    const targetRace = dataSimulator.target.race;

    Object.keys(dataSimulator.unit.buffs).forEach(buffType => {
      if (dataSimulator.unit.buffs[buffType] > 0 && !dataSimulator.skillEffects.unit[buffType].overwriteBuff) {
         if (buffType === 'atk'
          || buffType === 'mag'
          || buffType === 'dex'
          || buffType === 'luck'
          || buffType === 'agi'
        ) {
          this.updateRealStat(dataSimulator, 'unit', buffType.toUpperCase(), this.calculateBuffValue(unit, buffType.toUpperCase(), dataSimulator.unit.buffs[buffType]));
        } else if (buffType === 'defense_penetration' || buffType === 'spirit_penetration') {
          this.updateRealStat(dataSimulator, 'unit', buffType.toUpperCase(), dataSimulator.unit.buffs[buffType]);
        } else if (buffType === 'damageType') {
          this.updateRealStat(dataSimulator, 'unit', damageType.toUpperCase() + '_ATK', dataSimulator.unit.buffs[buffType]);
        } else if (buffType === 'elementAtk') {
          this.updateRealStat(dataSimulator, 'unit', elementSkill.toUpperCase() + '_ATK', dataSimulator.unit.buffs[buffType]);
        } else if (buffType === 'elementKiller') {
          this.updateRealStat(dataSimulator, 'unit', targetElement.toUpperCase() + '_KILLER', dataSimulator.unit.buffs[buffType]);
        } else if (buffType === 'raceKiller') {
          this.updateRealStat(dataSimulator, 'unit', targetRace.toUpperCase() + '_KILLER', dataSimulator.unit.buffs[buffType]);
        } else if (buffType === 'typeResPene') {
          this.updateRealStat(dataSimulator, 'unit', 'RES_' + damageType.toUpperCase() + '_ATK_PENETRATION', dataSimulator.unit.buffs[buffType]);
        }
      }
    });

    Object.keys(dataSimulator.target.breaks).forEach(breakType => {
      if (dataSimulator.target.breaks[breakType] > 0 && !dataSimulator.skillEffects.target[breakType].overwriteBreak) {
        this.updateRealStat(dataSimulator, 'target', breakType, dataSimulator.target.breaks[breakType]);
      }
    });
  }

  calculateDamage(unit, dataSimulator) {
    const atk = dataSimulator.realStats.unit.ATK;
    const mag = dataSimulator.realStats.unit.MAG;
    const agi = dataSimulator.realStats.unit.AGI;
    const dex = dataSimulator.realStats.unit.DEX;
    const luck = dataSimulator.realStats.unit.LUCK;

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
      damage += mainStat;
    }

    console.log('SKILL BONUS');
    console.log(Math.round(damage));
    return Math.round(damage);
  }

  getMultiplier(unit, dataSimulator) {
    let multiplier = this.getDamageValue(dataSimulator.unit.selectedSkill);

    console.log('skill modifier');
    console.log(multiplier);

    const elementSkill = dataSimulator.unit.selectedSkill.elem && dataSimulator.unit.selectedSkill.elem[0] ? dataSimulator.unit.selectedSkill.elem[0] : unit.element;
    const damageType = dataSimulator.unit.selectedSkill.damage.type;
    const targetElement = dataSimulator.target.element;
    const targetRace = dataSimulator.target.race;

    Object.keys(dataSimulator.realStats.unit).forEach(statType => {
      if (statType === elementSkill.toUpperCase() + '_ATK'
        || statType === damageType.toUpperCase() + '_ATK'
        || statType === targetElement.toUpperCase() + '_KILLER'
        || statType === targetRace.toUpperCase() + '_KILLER'
      ) {
        console.log('multiplier -- ' + statType);
        console.log(dataSimulator.realStats.unit[statType]);
        multiplier += dataSimulator.realStats.unit[statType];
      }
    });

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

    Object.keys(dataSimulator.realStats.unit).forEach(statType => {
      if (statType === (type === 'def' ? 'DEFENSE_PENETRATION' : 'SPIRIT_PENETRATION')) {
        ignoreDefensive = dataSimulator.realStats.unit[statType];
      }
    });

    return 1 - ((defensiveValue / 100) * (1 - (ignoreDefensive / 100)));
  }

  getResistanceMultiplier(unit, dataSimulator) {
    let ignoreDefensive = 0;
    const damageType = dataSimulator.unit.selectedSkill.damage.type;

    Object.keys(dataSimulator.realStats.unit).forEach(statType => {
      if (statType === 'RES_' + damageType.toUpperCase() + '_ATK_PENETRATION') {
        ignoreDefensive = dataSimulator.realStats.unit[statType];
      }
    });

    return (1 - dataSimulator.target.elementRes / 100) * (1 - ((dataSimulator.target.damageTypeRes / 100) * (1 - (ignoreDefensive / 100))));
  }

  calculateBuffValue(unit, buffType, value) {
    return Math.floor(unit.stats[buffType].baseTotal * value / 100);
  }
}
