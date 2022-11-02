import { TranslateService } from '@ngx-translate/core';

import { Skill } from './skill';

export class Equipment {
  statsTypes;
  stats;

  dataId?;
  rarity = 'N';
  names: any = {
    en: 'New Equipment'
  };
  name = 'New Equipment';

  descriptions: any = {
    en: 'New Equipment'
  };
  description = 'New Equipment';

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
  updatedDate;

  rawSkills;
  rawJobs;
  rawUnits;
  rawItems;
  rawMateriaGroups;

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
  formattedSkills;
  selectedStats;

  statsWithMateria;
  formattedSkillsWithMateria;

  materias = {
    I: null,
    F: null,
    W: null,
    H: null,
    O: null,
    S: null
  };
  materiaGroups = {
    left: null,
    right: null
  };
  formattedMateriaGroups = {
    left: null,
    right: null
  };

  constructFromJson(equipment: Equipment, translateService: TranslateService): void {
    this.dataId = equipment.dataId;
    this.rarity = equipment.rarity;
    this.names = equipment.names;
    this.descriptions = equipment.descriptions;
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
    this.updatedDate = equipment.updatedDate;

    this.name = this.getName(translateService);
  }

  getName(translateService: TranslateService): string {
    if (!this.names[translateService.currentLang]) {
      this.name = this.names[translateService.getDefaultLang()];
    } else {
      this.name = this.names[translateService.currentLang];
    }

    return this.name;
  }

  getDescription(translateService: TranslateService): string {
    if (!this.descriptions[translateService.currentLang]) {
      this.description = this.descriptions[translateService.getDefaultLang()];
    } else {
      this.description = this.descriptions[translateService.currentLang];
    }

    return this.description;
  }

  initSelectedStats(equipment) {
    this.selectedStats = {};
    for (const statType of Object.keys(this.stats[0])) {
      this.selectedStats[statType] = this.stats[0][statType].min;
    }
  }

  formatSkillsAndGrows(toolService, skillService, rangeService) {
    this.passiveSkills = [];
    this.formattedSkills.forEach(equipmentLvl => {
      equipmentLvl.forEach(skill => {
        skill.name = toolService.getName(skill);
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
      this.grows[growId].name = toolService.getName(this.grows[growId]);
    });
  }

  updateMaxStat() {
    this.statsTypes = Object.keys(this.stats[this.stats.length - 1]);

    Object.keys(this.grows).forEach(growId => {
      this.grows[growId].stats = {};
      this.statsTypes.forEach(statType => {
        const maxValue = this.stats[this.upgrade][statType].max;

        let growMax = this.grows[growId].curve[statType] ? maxValue + ((maxValue * this.grows[growId].curve[statType]) / 100) : maxValue;
        if (growMax < 0 && growMax > -1) {
          growMax = 0;
        } else {
          growMax = Math.floor(growMax);
        }

        this.grows[growId].stats[statType] = [];
        for (let i = this.stats[this.upgrade][statType].min; i <= growMax; i++) {
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

      if (maxDifferentZero || this.stats[this.upgrade][statType].min !== 0) {
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
    this.skill = this.formattedSkills[this.upgrade];

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
    this.updateMaxStat();
    this.changeGrow();
  }

  changeGrow() {
    this.tableStats = {};
    this.statsTypes.forEach(statType => {
      this.tableStats[statType] = this.grows[this.grow].stats[statType];

      if (!this.selectedStats[statType] && this.selectedStats[statType] !== 0) {
        this.selectedStats[statType] = this.tableStats[statType][0];
      } else if (this.selectedStats[statType] > this.tableStats[statType][this.tableStats[statType].length - 1]) {
        this.selectedStats[statType] = this.tableStats[statType][this.tableStats[statType].length - 1];
      }
    });

    this.calculateStatsWithMateria();
  }

  changeLevel(skillService, rangeService) {
    if (this.growIds.length === 1 && this.grows[this.growIds[0]].dataId === 'ARTIFACT_50') {
      this.statsTypes.forEach(statType => {
        const minValue = this.stats[this.upgrade][statType].min;
        const maxValue = this.grows[this.growIds[0]].stats[statType][this.grows[this.growIds[0]].stats[statType].length - 1];
        this.selectedStats[statType] = Math.floor(minValue + ((maxValue - minValue) / (this.maxLevel - 1) * (this.level - 1)));
      });
    }

    if (this.skill) {
      this.changeSkillLevel(skillService, rangeService);
    }

    this.calculateStatsWithMateria();
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

        if (skill.cond) {
          skill.cond.forEach(skillCond => {
            skillCond.formattedItems = [];
            skillCond.items.forEach((itemCond, itemCondIndex) => {
              if (skillCond.type === 'unit') {
                const unitCond = this.rawUnits.find(searchedUnit => searchedUnit.dataId === itemCond);
                skillCond.formattedItems.push(unitCond.image);
              }

              if (skillCond.type === 'mainjob') {
                const jobCond = this.rawJobs.find(searchedJob => searchedJob.dataId === itemCond);
                if (jobCond) {
                  skillCond.formattedItems.push(jobCond.image);
                }
              }
            });
          });
        }

        if (skill.type === 'skill') {
          this.activeSkill = skill;
        } else {
          this.passiveSkills.push(skill);
        }
      }
    });
  }

  changeMateria(skillService) {
    const materiaGroupTypes = {
      left: ['I', 'F', 'W'],
      right: ['H', 'O', 'S']
    };

    const countGroups = {
      left: {},
      right: {}
    };

    this.materiaGroups = {
      left: null,
      right: null
    };

    this.formattedMateriaGroups = {
      left: {},
      right: {}
    };

    Object.keys(materiaGroupTypes).forEach(group => {
      materiaGroupTypes[group].forEach(type => {
        if (this.materias[type]) {
          if (!countGroups[group][this.materias[type].group]) {
            countGroups[group][this.materias[type].group] = 1;
          } else {
            countGroups[group][this.materias[type].group]++;
          }
        }
      });
    });

    Object.keys(countGroups).forEach(group => {
      Object.keys(countGroups[group]).forEach(groupId => {
        if (countGroups[group][groupId] >= 2) {
          this.materiaGroups[group] = this.rawMateriaGroups.find(searchedMateriaGroup => searchedMateriaGroup.dataId === groupId).bonus[countGroups[group][groupId]];
          this.formattedMateriaGroups[group] = skillService.formatEffects(this, this.rawSkills.find(searchedSkill => searchedSkill.dataId === this.materiaGroups[group]), false);
        }
      });
    });

    this.calculateStatsWithMateria();
  }

  calculateStatsWithMateria() {
    if (this.selectedStats && this.passiveSkills) {
      this.statsWithMateria = JSON.parse(JSON.stringify(this.selectedStats));
      this.formattedSkillsWithMateria = JSON.parse(JSON.stringify(this.passiveSkills));

      const materiaGroupTypes = {
        left: ['I', 'F', 'W'],
        right: ['H', 'O', 'S']
      };
      Object.keys(materiaGroupTypes).forEach(group => {
        materiaGroupTypes[group].forEach(type => {
          if (this.materias[type]) {
            if (!this.statsWithMateria[this.materias[type].mainStat]) {
              this.statsWithMateria[this.materias[type].mainStat] = parseInt(this.materias[type].mainStatValue.value, 10);
            } else {
              this.statsWithMateria[this.materias[type].mainStat] += parseInt(this.materias[type].mainStatValue.value, 10);
            }

            this.materias[type].subStats.forEach(subStat => {
              if (!this.statsWithMateria[subStat.type]) {
                this.statsWithMateria[subStat.type] = parseInt(subStat.value, 10);
              } else {
                this.statsWithMateria[subStat.type] += parseInt(subStat.value, 10);
              }
            });

            this.materias[type].skills.forEach((skillId, skillIndex) => {
              const skill = JSON.parse(JSON.stringify(this.materias[type].rawSkills.find(searchedSkill => searchedSkill.dataId === skillId)));
              if (skill) {
                skill.level = parseInt(this.materias[type].skillsDetail[skillIndex].level, 10);
                this.formattedSkillsWithMateria.push(skill);
              }
            });
          }
        });
      });
    }
  }

  maxEquipment(skillService, rangeService) {
    this.level = this.maxLevel;
    if (this.skills.length > 1) {
      this.upgrade = this.skills.length - 1;
    }

    if (this.activeSkill && this.activeSkill.tableLevel) {
      this.activeSkill.level = this.activeSkill.tableLevel[this.activeSkill.tableLevel.length - 1];
    }

    this.changeUpgrade(skillService, rangeService);

    this.statsTypes.forEach(statType => {
      this.selectedStats[statType] = this.tableStats[statType][this.tableStats[statType].length - 1];
    });

    this.changeLevel(skillService, rangeService);
  }

  resetEquipment(skillService, rangeService) {
    this.level = 1;
    this.upgrade = 0;

    this.statsTypes.forEach(statType => {
      this.selectedStats[statType] = this.tableStats[statType][0];
    });

    if (this.activeSkill) {
      this.activeSkill.level = 1;
    }

    this.changeUpgrade(skillService, rangeService);
    this.changeLevel(skillService, rangeService);
  }
}
