import { Injectable } from '@angular/core';

@Injectable()
export class EquipmentService {
  private weaponTypes = [
    "DAGGER",
    "SWORD",
    "GREATSWORD",
    "KATANA",
    "ROD",
    "NINJABLADE",
    "BOW",
    "AXE",
    "SPEAR",
    "GUN",
    "MACE",
    "FIST"
  ]

  private armorTypes = [
    "SHIELD",
    "ARMOR",
    "HAT",
    "HELM",
    "CLOTH",
    "ACC"
  ]

  isWeapon(type) {
    return this.weaponTypes.indexOf(type) !== -1 ? true : false;

  }
}
