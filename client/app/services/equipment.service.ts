import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Equipment } from '../entities/equipment';
import { default as EQUIPMENTS } from '../data/equipments.json';

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

  private formatType = {
    "DAGGER": "Dagger",
    "SWORD": "Sword",
    "GREATSWORD": "Great Sword",
    "KATANA": "Katana",
    "ROD": "Rod",
    "NINJABLADE": "Ninja Blade",
    "BOW": "Bow",
    "AXE": "Axe",
    "SPEAR": "Spear",
    "GUN": "Gun",
    "MACE": "Mace",
    "FIST": "Fist",
    "SHIELD": "Shield",
    "ARMOR": "Armor",
    "HAT": "Hat",
    "HELM": "Helm",
    "CLOTH": "Cloth",
    "ACC": "Accessory"
  }

  private equipments: Equipment[];
  private re = /(^([+\-]?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?(?=\D|\s|$))|^0x[\da-fA-F]+$|\d+)/g;
  private sre = /^\s+|\s+$/g;
  private snre = /\s+/g;
  private dre = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/;
  private hre = /^0x[0-9a-f]+$/i;
  private ore = /^0/;
  private oFxNcL: any;
  private oFyNcL: any;

  constructor(private translateService: TranslateService) {}

  private i(s: any) {
      return (('' + s).toLowerCase() || '' + s).replace(this.sre, '');
  }

  private normChunk(s: any, l: any) {
      return (!s.match(this.ore) || l == 1) && parseFloat(s) || s.replace(this.snre, ' ').replace(this.sre, '') || 0;
  }

  public sortByName(equipments: Equipment[], translate: any): Equipment[] {
    equipments.sort((a: any, b: any) => {
      let x = this.i(a.name);
      let y = this.i(b.name);

      if (translate) {
        x = this.i(a.getName(translate));
        y = this.i(b.getName(translate));
      }

      const xN = x.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');
      const yN = y.replace(this.re, '\0$1\0').replace(/\0$/,'').replace(/^\0/,'').split('\0');

      const xD = parseInt((<any>x).match(this.hre), 16) || (xN.length !== 1 && Date.parse(x));
      const yD = parseInt((<any>y).match(this.hre), 16) || xD && y.match(this.dre) && Date.parse(y) || null;

      if (yD) {
          if (xD < yD) { return -1; }
          else if (xD > yD) { return 1; }
      }

      for(var cLoc = 0, xNl = xN.length, yNl = yN.length, numS = Math.max(xNl, yNl); cLoc < numS; cLoc++) {
          this.oFxNcL = this.normChunk(xN[cLoc] || '', xNl);
          this.oFyNcL = this.normChunk(yN[cLoc] || '', yNl);
          if (isNaN(this.oFxNcL) !== isNaN(this.oFyNcL)) {
              return isNaN(this.oFxNcL) ? 1 : -1;
          }
          if (/[^\x00-\x80]/.test(this.oFxNcL + this.oFyNcL) && this.oFxNcL.localeCompare) {
              var comp = this.oFxNcL.localeCompare(this.oFyNcL);
              return comp / Math.abs(comp);
          }
          if (this.oFxNcL < this.oFyNcL) { return -1; }
          else if (this.oFxNcL > this.oFyNcL) { return 1; }
      }
    });

    return equipments;
  }

  getEquipments(): Equipment[] {
    let equipments: Equipment[] = [];

    Object.keys(JSON.parse(JSON.stringify(EQUIPMENTS))).forEach(equipmentId => {
      let equipment = new Equipment();
      equipment.constructFromJson(EQUIPMENTS[equipmentId], this.translateService);
      equipments.push(equipment);
    });

    this.equipments = equipments;
    return equipments;
  }

  getEquipmentsForListing() {
    let equipments = {
      N: [],
      R: [],
      SR: [],
      MR: [],
      UR: []
    };

    Object.keys(JSON.parse(JSON.stringify(EQUIPMENTS))).forEach(equipmentId => {
      let equipment = new Equipment();
      equipment.constructFromJson(EQUIPMENTS[equipmentId], this.translateService);
      equipments[equipment.rarity].push(equipment);
    });

    return equipments;
  }

  getEquipmentBySlug(slug: string): Equipment {
    if (!this.equipments || this.equipments.length === 0) {
      this.getEquipments();
    }

    return this.equipments.find(equipment => equipment.slug === slug);
  }

  getEquipment(id: string): Equipment {
    if (!this.equipments || this.equipments.length === 0) {
      this.getEquipments();
    }

    return this.equipments.find(equipment => equipment.dataId === id);
  }

  isWeapon(type) {
    return this.weaponTypes.indexOf(type) !== -1 ? true : false;
  }

  getFormatType(type) {
    return this.formatType[type];
  }
}
