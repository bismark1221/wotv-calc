export class Materia {
  dataId?;
  rarity = 'N';
  image = '';
  maxSkill = 20;
  slots = [];
  types = [];

  // For builder
  tableLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  level = 1;
  subStats = [];
  skills;
  skillsDetail;
  slot;
  storeId;

  constructFromJson(materia: Materia) {
    this.dataId = materia.dataId;
    this.rarity = materia.rarity;
    this.image = materia.image;
    this.maxSkill = materia.maxSkill;
    this.slots = materia.slots;
    this.types = materia.types;
  }

  updateLevel() {
    this.subStats.forEach(subStat => {
      subStat.minValue = Math.floor(subStat.min[0] + ((subStat.max[0] - subStat.min[0]) / (20 - 1) * (this.level - 1)));
      subStat.maxValue = Math.floor(subStat.min[1] + ((subStat.max[1] - subStat.min[1]) / (20 - 1) * (this.level - 1)));

      if (!subStat.value || subStat.value > subStat.maxValue) {
        subStat.value = subStat.maxValue;
      } else if (subStat.value < subStat.minValue) {
        subStat.value = subStat.minValue;
      }

      subStat.tableLevels = [];
      for (let i = subStat.minValue; i <= subStat.maxValue; i++) {
        subStat.tableLevels.push(i);
      }
    });
  }

  updateSkill(skillPos, rawSkills, skillService) {
    if (this.skills[skillPos]) {
      if (!this.skillsDetail[skillPos]) {
        this.skillsDetail[skillPos] = {
          level: 1,
          formattedEffect: ''
        };
      }

      const rawSkill = JSON.parse(JSON.stringify(rawSkills.find(searchedSkill => searchedSkill.dataId === this.skills[skillPos])));
      rawSkill.level = this.skillsDetail[skillPos].level;

      this.skillsDetail[skillPos].formattedEffect = skillService.formatEffects(this, rawSkill, false);
      this.skillsDetail[skillPos].shortEffect = skillService.formatEffects(this, rawSkill, false, false, true);
    } else {
      this.skillsDetail[skillPos] = {
        level: 1,
        formattedEffect: '',
        shortEffect: ''
      };
    }
  }

  resetMateria(rawSkills, skillService) {
    this.level = 1;
    this.updateLevel();

    this.subStats.forEach(subStat => {
      subStat.value = subStat.minValue;
    });

    for (let i = this.skills.length - 1; i > 0; i --) {
      this.skills.splice(i, 1);
      this.updateSkill(i, rawSkills, skillService);
    }

    this.skillsDetail.forEach(skillDetail => {
      skillDetail.level = 1;
    });
    this.updateSkill(0, rawSkills, skillService);
  }

  maxMateria(rawSkills, skillService) {
    this.level = 20;
    this.updateLevel();

    this.subStats.forEach(subStat => {
      subStat.value = subStat.maxValue;
    });

    this.skillsDetail.forEach((skillDetail, skillDetailIndex) => {
      skillDetail.level = 20;
      this.updateSkill(skillDetailIndex, rawSkills, skillService);
    });
  }
}
