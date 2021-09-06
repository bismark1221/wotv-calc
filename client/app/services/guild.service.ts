import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { AngularFirestore } from '@angular/fire/firestore';

import { Guild } from '../entities/guild';
import { NavService } from './nav.service';
import { AuthService } from './auth.service';

@Injectable()
export class GuildService {
  private guild: Guild;

  private statues = {
    serpent: [
      [{type: 'HP', value: 1, calcType: 'percent'}],
      [{type: 'HP', value: 2, calcType: 'percent'}],
      [{type: 'HP', value: 3, calcType: 'percent'}],
      [{type: 'HP', value: 4, calcType: 'percent'}],
      [{type: 'HP', value: 5, calcType: 'percent'}, {type: 'SPR', value: 2, calcType: 'fixe'}],
      [{type: 'HP', value: 6, calcType: 'percent'}, {type: 'SPR', value: 2, calcType: 'fixe'}],
      [{type: 'HP', value: 7, calcType: 'percent'}, {type: 'SPR', value: 2, calcType: 'fixe'}],
      [{type: 'HP', value: 8, calcType: 'percent'}, {type: 'SPR', value: 2, calcType: 'fixe'}],
      [{type: 'HP', value: 9, calcType: 'percent'}, {type: 'SPR', value: 2, calcType: 'fixe'}],
      [{type: 'HP', value: 10, calcType: 'percent'}, {type: 'SPR', value: 5, calcType: 'fixe'}]
    ],
    bull: [
      [{type: 'TP', value: 1, calcType: 'percent'}],
      [{type: 'TP', value: 2, calcType: 'percent'}],
      [{type: 'TP', value: 3, calcType: 'percent'}],
      [{type: 'TP', value: 4, calcType: 'percent'}],
      [{type: 'TP', value: 5, calcType: 'percent'}, {type: 'DEF', value: 2, calcType: 'fixe'}],
      [{type: 'TP', value: 6, calcType: 'percent'}, {type: 'DEF', value: 2, calcType: 'fixe'}, {type: 'LUCK', value: 2, calcType: 'percent'}],
      [{type: 'TP', value: 7, calcType: 'percent'}, {type: 'DEF', value: 2, calcType: 'fixe'}, {type: 'LUCK', value: 4, calcType: 'percent'}],
      [{type: 'TP', value: 8, calcType: 'percent'}, {type: 'DEF', value: 2, calcType: 'fixe'}, {type: 'LUCK', value: 6, calcType: 'percent'}],
      [{type: 'TP', value: 9, calcType: 'percent'}, {type: 'DEF', value: 2, calcType: 'fixe'}, {type: 'LUCK', value: 8, calcType: 'percent'}],
      [{type: 'TP', value: 10, calcType: 'percent'}, {type: 'DEF', value: 5, calcType: 'fixe'}, {type: 'LUCK', value: 10, calcType: 'percent'}]
    ],
    kirin: [
      [{type: 'MAG', value: 1, calcType: 'percent'}],
      [{type: 'MAG', value: 2, calcType: 'percent'}],
      [{type: 'MAG', value: 3, calcType: 'percent'}],
      [{type: 'MAG', value: 4, calcType: 'percent'}],
      [{type: 'MAG', value: 5, calcType: 'percent'}, {type: 'CRITIC_RATE', value: 5, calcType: 'fixe'}],
      [{type: 'MAG', value: 6, calcType: 'percent'}, {type: 'CRITIC_RATE', value: 5, calcType: 'fixe'}],
      [{type: 'MAG', value: 7, calcType: 'percent'}, {type: 'CRITIC_RATE', value: 5, calcType: 'fixe'}],
      [{type: 'MAG', value: 8, calcType: 'percent'}, {type: 'CRITIC_RATE', value: 5, calcType: 'fixe'}],
      [{type: 'MAG', value: 9, calcType: 'percent'}, {type: 'CRITIC_RATE', value: 5, calcType: 'fixe'}],
      [{type: 'MAG', value: 10, calcType: 'percent'}, {type: 'CRITIC_RATE', value: 10, calcType: 'fixe'}]
    ],
    lion: [
      [{type: 'ATK', value: 1, calcType: 'percent'}],
      [{type: 'ATK', value: 2, calcType: 'percent'}],
      [{type: 'ATK', value: 3, calcType: 'percent'}],
      [{type: 'ATK', value: 4, calcType: 'percent'}],
      [{type: 'ATK', value: 5, calcType: 'percent'}, {type: 'AGI', value: 1, calcType: 'percent'}],
      [{type: 'ATK', value: 6, calcType: 'percent'}, {type: 'AGI', value: 1, calcType: 'percent'}, {type: 'DEX', value: 2, calcType: 'percent'}],
      [{type: 'ATK', value: 7, calcType: 'percent'}, {type: 'AGI', value: 1, calcType: 'percent'}, {type: 'DEX', value: 4, calcType: 'percent'}],
      [{type: 'ATK', value: 8, calcType: 'percent'}, {type: 'AGI', value: 1, calcType: 'percent'}, {type: 'DEX', value: 6, calcType: 'percent'}],
      [{type: 'ATK', value: 9, calcType: 'percent'}, {type: 'AGI', value: 1, calcType: 'percent'}, {type: 'DEX', value: 8, calcType: 'percent'}],
      [{type: 'ATK', value: 10, calcType: 'percent'}, {type: 'AGI', value: 2, calcType: 'percent'}, {type: 'DEX', value: 10, calcType: 'percent'}]
    ],
    knight: [
      [{type: 'HP', value: 1, calcType: 'percent'}],
      [{type: 'HP', value: 2, calcType: 'percent'}, {type: 'ACCURACY', value: 5, calcType: 'fixe'}, {type: 'EVADE', value: 5, calcType: 'fixe'}],
      [{type: 'HP', value: 3, calcType: 'percent'}, {type: 'ACCURACY', value: 6, calcType: 'fixe'}, {type: 'EVADE', value: 5, calcType: 'fixe'}],
      [{type: 'HP', value: 4, calcType: 'percent'}, {type: 'ACCURACY', value: 6, calcType: 'fixe'}, {type: 'EVADE', value: 6, calcType: 'fixe'}],
      [{type: 'HP', value: 5, calcType: 'percent'}, {type: 'ACCURACY', value: 7, calcType: 'fixe'}, {type: 'EVADE', value: 6, calcType: 'fixe'}],
      [{type: 'HP', value: 6, calcType: 'percent'}, {type: 'ACCURACY', value: 7, calcType: 'fixe'}, {type: 'EVADE', value: 7, calcType: 'fixe'}],
      [{type: 'HP', value: 7, calcType: 'percent'}, {type: 'ACCURACY', value: 8, calcType: 'fixe'}, {type: 'EVADE', value: 7, calcType: 'fixe'}],
      [{type: 'HP', value: 8, calcType: 'percent'}, {type: 'ACCURACY', value: 8, calcType: 'fixe'}, {type: 'EVADE', value: 8, calcType: 'fixe'}],
      [{type: 'HP', value: 9, calcType: 'percent'}, {type: 'ACCURACY', value: 9, calcType: 'fixe'}, {type: 'EVADE', value: 9, calcType: 'fixe'}],
      [{type: 'HP', value: 10, calcType: 'percent'}, {type: 'ACCURACY', value: 10, calcType: 'fixe'}, {type: 'EVADE', value: 5, calcType: 'fixe'}]
    ]
  };

  private lvTbl = {
    bull: [0, 2000, 33249, 130901, 375030, 883633, 1791856, 3210962, 5181955, 7645714],
    kirin: [0, 2000, 33249, 130901, 375030, 883633, 1791856, 3210962, 5181955, 7645714],
    knight: [0, 800, 22498, 95304, 488258, 1017206, 1816446, 4838212, 8691986, 12577518],
    lion: [0, 2000, 33249, 130901, 375030, 883633, 1791856, 3210962, 5181955, 7645714],
    serpent: [0, 50, 31299, 128951, 373080, 881683, 1789906, 3209012, 5180005, 7643764]
  };

  constructor(
    private localStorageService: LocalStorageService,
    private navService: NavService,
    private authService: AuthService,
    private firestore: AngularFirestore
  ) {}

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_guild' : 'guild';
  }

  getGuild() {
    if (this.localStorageService.get(this.getLocalStorage())) {
      this.guild = JSON.parse(JSON.stringify(this.localStorageService.get(this.getLocalStorage())));
      Object.keys(this.statues).forEach(statue => {
        if (!this.guild[statue]) {
          this.guild[statue] = 0;
        }
      });
    } else {
      this.guild = new Guild();
    }

    return this.guild;
  }

  getGuildForBuilder(forceEmptyGuild = false) {
    if (!forceEmptyGuild && this.localStorageService.get(this.getLocalStorage())) {
      this.guild = JSON.parse(JSON.stringify(this.localStorageService.get(this.getLocalStorage())));
      Object.keys(this.statues).forEach(statue => {
        if (!this.guild[statue]) {
          this.guild[statue] = 0;
        }
      });
    } else {
      this.guild = new Guild();
    }

    return {
      data: this.guild,
      statues: this.statues
    };
  }

  getSavableData(guild, onlyGuild = true) {
    const data = {};

    Object.keys(this.statues).forEach(statue => {
      let value = guild[statue];

      if (!value) {
        value = 0;
      }

      data[statue] = value;
    });

    if (onlyGuild) {
      const user = this.authService.getUser();
      // @ts-ignore
      data.user = user ? user.uid : null;
    }

    return data;
  }

  guildAlreadyExists(guild) {
    const localStoredGuild = this.localStorageService.get(this.getLocalStorage());
    // @ts-ignore
    if (localStoredGuild && localStoredGuild.storeId) {
      return true;
    } else {
      return false;
    }
  }

  saveGuild(guild) {
    const savableData = this.getSavableData(guild);

    if (this.guildAlreadyExists(guild)) {
      return this.firestore.collection(this.getLocalStorage()).doc(guild.storeId).set(savableData).then(data => {
        // @ts-ignore
        savableData.storeId = guild.storeId;

        this.localStorageService.set(this.getLocalStorage(), savableData);

        return guild.storeId;
      });
    } else {
      return this.firestore.collection(this.getLocalStorage()).add(savableData).then(data => {
        // @ts-ignore
        savableData.storeId = data.id;

        this.localStorageService.set(this.getLocalStorage(), savableData);
        this.guild.storeId = data.id;

        return data.id;
      });
    }
  }

  getStatues() {
    return this.statues;
  }

  getLevelFromExp(statue, exp) {
    let level = 0;
    let minusOne = false;

    for (level = 0; level <= this.lvTbl[statue].length - 1; level++) {
      if (this.lvTbl[statue][level] > exp) {
        minusOne = true;
        break;
      } if (this.lvTbl[statue][level] === exp) {
        break;
      }
    }

    return level + (minusOne ? 0 : 1);
  }
}
