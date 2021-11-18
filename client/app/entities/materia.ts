export class Materia {
  dataId?;
  rarity = 'N';
  image = '';
  maxSkill = 1;
  slots = [];
  types = [];

  constructFromJson(materia: Materia) {
    this.dataId = materia.dataId;
    this.rarity = materia.rarity;
    this.image = materia.image;
    this.maxSkill = materia.maxSkill;
    this.slots = materia.slots;
    this.types = materia.types;
  }
}
