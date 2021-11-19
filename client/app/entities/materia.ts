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
}
