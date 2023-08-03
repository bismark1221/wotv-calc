import { Injectable } from '@angular/core';

import { Guild } from '../entities/guild';
import { NavService } from './nav.service';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';

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
      [{type: 'HP', value: 10, calcType: 'percent'}, {type: 'ACCURACY', value: 10, calcType: 'fixe'}, {type: 'EVADE', value: 10, calcType: 'fixe'}]
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
    private navService: NavService,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  private async getApiUser(extra = null) {
    return JSON.parse(JSON.stringify(await this.apiService.post('userData', {type: 'guild', data: extra})));
  }

  getLocalStorage() {
    return this.navService.getVersion() === 'JP' ? 'jp_guild' : 'guild';
  }

  getGuild() {
    if (localStorage.getItem('wotv-calc.' + this.getLocalStorage())) {
      this.guild = JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage()));
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
    if (!forceEmptyGuild && localStorage.getItem('wotv-calc.' + this.getLocalStorage())) {
      this.guild = JSON.parse(localStorage.getItem('wotv-calc.' + this.getLocalStorage()));
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

      if (guild.storeId) {
        // @ts-ignore
        data.storeId = guild.storeId;
      }
    }

    return data;
  }

  guildAlreadyExists(guild) {
    const localStoredGuild = localStorage.getItem('wotv-calc.' + this.getLocalStorage());
    // @ts-ignore
    if (localStoredGuild && JSON.parse(localStoredGuild).storeId) {
      return true;
    } else {
      return false;
    }
  }

  async saveGuild(guild) {
    const savableData = this.getSavableData(guild);

    if (this.guildAlreadyExists(guild)) {
      const data = await this.getApiUser(savableData);
      // @ts-ignore
      savableData.storeId = guild.storeId;

      localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savableData));

      return guild.storeId;
    } else {
      const data = await this.getApiUser(savableData);
      // @ts-ignore
      savableData.storeId = data.storeId;

      localStorage.setItem('wotv-calc.' + this.getLocalStorage(), JSON.stringify(savableData));
      this.guild.storeId = data.storeId;

      return data.storeId;
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
