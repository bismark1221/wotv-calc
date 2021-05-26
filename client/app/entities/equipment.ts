import { TranslateService } from '@ngx-translate/core';

import { Skill } from './skill';
import { Buff } from './buff';

export class Equipment {
  statsTypes;
  stats;

  dataId?;
  rarity = 'N';
  names: any = {
    en: 'New Equipment'
  };
  name = 'New Equipment';

  skills;
  buffs;

  image = 'ITEMcrst';
  type;
  countSkills;
  slug;
  acquisition;
  grows;
  equippableJobs;
  equippableUnits;
  materials;
  releaseDate;

  // for builder
  passiveSkills;
  skill;
  level;
  maxLevel;
  growIds;
  tableStats;
  grow;
  upgrade;
  tableLevel;
  activeSkill;

  constructFromJson(equipment: Equipment, translateService: TranslateService): void {
    this.dataId = equipment.dataId;
    this.rarity = equipment.rarity;
    this.names = equipment.names;
    this.skills = equipment.skills;
    this.buffs = equipment.buffs;
    this.stats = equipment.stats;
    this.image = equipment.image;
    this.type = equipment.type;
    this.slug = equipment.slug;
    this.acquisition = equipment.acquisition;
    this.grows = equipment.grows;
    this.equippableJobs = equipment.equippableJobs;
    this.equippableUnits = equipment.equippableUnits;
    this.materials = equipment.materials;
    this.releaseDate = equipment.releaseDate;
  }

  getName(translateService: TranslateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  updateMaxStat(nameService, skillService, rangeService) {
    this.statsTypes = Object.keys(this.stats);

    this.passiveSkills = [];
    this.skills.forEach(equipmentLvl => {
      equipmentLvl.forEach(skill => {
        skill.name = nameService.getName(skill);
        skill.effectsHtml = skillService.formatEffects(this, skill);

        if (skill.damage) {
          skill.damageHtml = skillService.formatDamage(this, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = skillService.formatCounter(this, skill, skill.counter);
        }

        rangeService.formatRange(this, skill);

        if (skill.type === 'skill') {
          this.activeSkill = skill;
        } else {
          this.passiveSkills.push(skill);
        }
      });
    });

    Object.keys(this.grows).forEach(growId => {
      this.grows[growId].name = nameService.getName(this.grows[growId]);
      this.grows[growId].stats = {};
      this.statsTypes.forEach(statType => {
        const maxValue = this.stats[statType].max;

        let growMax = this.grows[growId].curve[statType] ? maxValue + ((maxValue * this.grows[growId].curve[statType]) / 100) : maxValue;
        if (growMax < 0 && growMax > -1) {
          growMax = 0;
        } else {
          growMax = Math.floor(growMax);
        }

        this.grows[growId].stats[statType] = [];
        for (let i = this.stats[statType].min; i <= growMax; i++) {
          this.grows[growId].stats[statType].push(i);
        }
      });
    });

    const usableStatsTypes = [];
    this.statsTypes.forEach(statType => {
      let maxDifferentZero = false;
      Object.keys(this.grows).forEach(growId => {
        if (this.grows[growId].stats[statType][this.grows[growId].stats[statType].length - 1] !== 0) {
          maxDifferentZero = true;
        }
      });

      if (maxDifferentZero || this.stats[statType].min !== 0) {
        usableStatsTypes.push(statType);
      }
    });
    this.statsTypes = usableStatsTypes;

    this.maxLevel = this.grows[this.grow].curve.MAX_LV;
    this.tableLevel = [];
    for (let i = 1; i <= this.maxLevel; i++) {
      this.tableLevel.push(i);
    }
  }

  changeUpgrade(skillService, rangeService) {
    this.skill = this.skills[this.upgrade];

    if (this.skill && this.skill[0] && this.skill[0].type === 'skill') {
      this.skill[0].tableLevel = [];
      for (let i = 1; i <= this.skill[0].maxLevel; i++) {
        this.skill[0].tableLevel.push(i);
      }
    }

    if (this.skill && this.skill[0] && this.skill[0].type !== 'skill') {
      this.skill.forEach(skill => {
        skill.level = this.level;
      });
    }

    this.changeSkillLevel(skillService, rangeService);
  }

  changeGrow() {
    this.tableStats = {};
    this.statsTypes.forEach(statType => {
      this.tableStats[statType] = this.grows[this.grow].stats[statType];

      if (!this.stats[statType].selected) {
        this.stats[statType].selected = this.tableStats[statType][0];
      } else if (this.stats[statType].selected > this.tableStats[statType][this.tableStats[statType].length - 1]) {
        this.stats[statType].selected = this.tableStats[statType][this.tableStats[statType].length - 1];
      }
    });
  }

  changeLevel(skillService, rangeService) {
    if (this.growIds.length === 1 && this.grows[this.growIds[0]].dataId === 'ARTIFACT_50') {
      this.statsTypes.forEach(statType => {
        const minValue = this.stats[statType].min;
        const maxValue = this.grows[this.growIds[0]].stats[statType][this.grows[this.growIds[0]].stats[statType].length - 1];
        this.stats[statType].selected = Math.floor(minValue + ((maxValue - minValue) / (this.maxLevel - 1) * (this.level - 1)));
      });
    }

    if (this.skill) {
      this.changeSkillLevel(skillService, rangeService);
    }
  }

  changeSkillLevel(skillService, rangeService) {
    this.passiveSkills = [];
    this.skill.forEach(skill => {
      if (skill.type !== 'skill') {
        skill.level = this.level;
      }

      skill.level = parseInt(skill.level, 10);

      if (skill.level >= (skill.upgrade[0] * 10 - 10)
        && (skill.level < skill.upgrade[skill.upgrade.length - 1] * 10 || (skill.level === this.maxLevel && skill.upgrade[skill.upgrade.length - 1] === 5))) {
        skill.effectsHtml = skillService.formatEffects(this, skill);

        if (skill.damage) {
          skill.damageHtml = skillService.formatDamage(this, skill, skill.damage);
        }

        if (skill.counter) {
          skill.counterHtml = skillService.formatCounter(this, skill, skill.counter);
        }

        rangeService.formatRange(this, skill);

        if (skill.type === 'skill') {
          this.activeSkill = skill;
        } else {
          this.passiveSkills.push(skill);
        }
      }
    });
  }

  maxEquipment(skillService, rangeService) {
    this.level = this.maxLevel;
    if (this.skills.length > 1) {
      this.upgrade = 5;
    }

    this.statsTypes.forEach(statType => {
      this.stats[statType].selected = this.tableStats[statType][this.tableStats[statType].length - 1];
    });

    if (this.activeSkill && this.activeSkill.tableLevel) {
      this.activeSkill.level = this.activeSkill.tableLevel[this.activeSkill.tableLevel.length - 1];
    }

    this.changeUpgrade(skillService, rangeService);
    this.changeLevel(skillService, rangeService);
  }

  resetEquipment(skillService, rangeService) {
    this.level = 1;
    this.upgrade = 0;

    this.statsTypes.forEach(statType => {
      this.stats[statType].selected = this.tableStats[statType][0];
    });

    if (this.activeSkill) {
      this.activeSkill.level = 1;
    }

    this.changeUpgrade(skillService, rangeService);
    this.changeLevel(skillService, rangeService);
  }
}
