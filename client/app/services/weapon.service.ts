import { Injectable } from '@angular/core';

@Injectable()
export class WeaponService {
  private weaponTypes: any = {
    noWeapon: {
      varianceMin: 100,
      varianceMax: 100
    },
    dagger: {
      varianceMin: 95,
      varianceMax: 105
    },
    sword: {
      varianceMin: 90,
      varianceMax: 110
    },
    greatSword1H: {
      varianceMin: 85,
      varianceMax: 115
    },
    greatSword2H: {
      varianceMin: 100,
      varianceMax: 160
    },
    katana: {
      varianceMin: 90,
      varianceMax: 110
    },
    staff: {
      varianceMin: 95,
      varianceMax: 105
    },
    rod: {
      varianceMin: 95,
      varianceMax: 105
    },
    bow: {
      varianceMin: 125,
      varianceMax: 175
    },
    axe: {
      varianceMin: 70,
      varianceMax: 130
    },
    hammer: {
      varianceMin: 80,
      varianceMax: 120
    },
    spear1H: {
      varianceMin: 85,
      varianceMax: 115
    },
    spear2H: {
      varianceMin: 100,
      varianceMax: 160
    },
    instrument1H: {
      varianceMin: 90,
      varianceMax: 110
    },
    instrument2H: {
      varianceMin: 130,
      varianceMax: 170
    },
    whip: {
      varianceMin: 90,
      varianceMax: 110
    },
    throwingWeapons: {
      varianceMin: 90,
      varianceMax: 110
    },
    gun1H: {
      varianceMin: 95,
      varianceMax: 105
    },
    gun2H: {
      varianceMin: 135,
      varianceMax: 165
    },
    mace: {
      varianceMin: 95,
      varianceMax: 105
    },
    fist: {
      varianceMin: 100,
      varianceMax: 100
    }
  }

  getWeaponTypes() {
    return this.weaponTypes;
  }
}
