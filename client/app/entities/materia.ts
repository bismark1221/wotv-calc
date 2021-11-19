export class Materia {
  dataId?;
  rarity = 'N';
  image = '';
  maxSkill = 1;
  slots = [];
  types = [];

  // For builder
  tableLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  level = 1;

  constructFromJson(materia: Materia) {
    this.dataId = materia.dataId;
    this.rarity = materia.rarity;
    this.image = materia.image;
    this.maxSkill = materia.maxSkill;
    this.slots = materia.slots;
    this.types = materia.types;
  }
}
