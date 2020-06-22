import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Guild } from '../entities/guild';
import { NavService } from './nav.service';

@Injectable()
export class GuildService {
  private guild: Guild;

  private statues = {
    serpent: [
      [{type: "HP", value: 1, calcType: "percent"}],
      [{type: "HP", value: 2, calcType: "percent"}],
      [{type: "HP", value: 3, calcType: "percent"}],
      [{type: "HP", value: 4, calcType: "percent"}],
      [{type: "HP", value: 5, calcType: "percent"}, {type: "SPR", value: 2, calcType: "fixe"}],
      [{type: "HP", value: 6, calcType: "percent"}, {type: "SPR", value: 2, calcType: "fixe"}],
      [{type: "HP", value: 7, calcType: "percent"}, {type: "SPR", value: 2, calcType: "fixe"}],
      [{type: "HP", value: 8, calcType: "percent"}, {type: "SPR", value: 2, calcType: "fixe"}],
      [{type: "HP", value: 9, calcType: "percent"}, {type: "SPR", value: 2, calcType: "fixe"}],
      [{type: "HP", value: 10, calcType: "percent"}, {type: "SPR", value: 5, calcType: "fixe"}]
    ],
    bull: [
      [{type: "TP", value: 1, calcType: "percent"}],
      [{type: "TP", value: 2, calcType: "percent"}],
      [{type: "TP", value: 3, calcType: "percent"}],
      [{type: "TP", value: 4, calcType: "percent"}],
      [{type: "TP", value: 5, calcType: "percent"}, {type: "DEF", value: 2, calcType: "fixe"}],
      [{type: "TP", value: 6, calcType: "percent"}, {type: "DEF", value: 2, calcType: "fixe"}, {type: "LUCK", value: 2, calcType: "percent"}],
      [{type: "TP", value: 7, calcType: "percent"}, {type: "DEF", value: 2, calcType: "fixe"}, {type: "LUCK", value: 4, calcType: "percent"}],
      [{type: "TP", value: 8, calcType: "percent"}, {type: "DEF", value: 2, calcType: "fixe"}, {type: "LUCK", value: 6, calcType: "percent"}],
      [{type: "TP", value: 9, calcType: "percent"}, {type: "DEF", value: 2, calcType: "fixe"}, {type: "LUCK", value: 8, calcType: "percent"}],
      [{type: "TP", value: 10, calcType: "percent"}, {type: "DEF", value: 5, calcType: "fixe"}, {type: "LUCK", value: 10, calcType: "percent"}]
    ],
    kirin: [
      [{type: "MAG", value: 1, calcType: "percent"}],
      [{type: "MAG", value: 2, calcType: "percent"}],
      [{type: "MAG", value: 3, calcType: "percent"}],
      [{type: "MAG", value: 4, calcType: "percent"}],
      [{type: "MAG", value: 5, calcType: "percent"}, {type: "CRITIC_RATE", value: 5, calcType: "fixe"}],
      [{type: "MAG", value: 6, calcType: "percent"}, {type: "CRITIC_RATE", value: 5, calcType: "fixe"}],
      [{type: "MAG", value: 7, calcType: "percent"}, {type: "CRITIC_RATE", value: 5, calcType: "fixe"}],
      [{type: "MAG", value: 8, calcType: "percent"}, {type: "CRITIC_RATE", value: 5, calcType: "fixe"}],
      [{type: "MAG", value: 9, calcType: "percent"}, {type: "CRITIC_RATE", value: 5, calcType: "fixe"}],
      [{type: "MAG", value: 10, calcType: "percent"}, {type: "CRITIC_RATE", value: 10, calcType: "fixe"}]
    ],
    lion: [
      [{type: "ATK", value: 1, calcType: "percent"}],
      [{type: "ATK", value: 2, calcType: "percent"}],
      [{type: "ATK", value: 3, calcType: "percent"}],
      [{type: "ATK", value: 4, calcType: "percent"}],
      [{type: "ATK", value: 5, calcType: "percent"}, {type: "AGI", value: 1, calcType: "percent"}],
      [{type: "ATK", value: 6, calcType: "percent"}, {type: "AGI", value: 1, calcType: "percent"}, {type: "DEX", value: 2, calcType: "percent"}],
      [{type: "ATK", value: 7, calcType: "percent"}, {type: "AGI", value: 1, calcType: "percent"}, {type: "DEX", value: 4, calcType: "percent"}],
      [{type: "ATK", value: 8, calcType: "percent"}, {type: "AGI", value: 1, calcType: "percent"}, {type: "DEX", value: 6, calcType: "percent"}],
      [{type: "ATK", value: 9, calcType: "percent"}, {type: "AGI", value: 1, calcType: "percent"}, {type: "DEX", value: 8, calcType: "percent"}],
      [{type: "ATK", value: 10, calcType: "percent"}, {type: "AGI", value: 2, calcType: "percent"}, {type: "DEX", value: 10, calcType: "percent"}]
    ]
  }

  constructor(
    private localStorageService: LocalStorageService,
    private navService: NavService
  ) {}

  getLocalStorage() {
    return this.navService.getVersion() == "JP" ? "jp_guild" : "guild"
  }

  getGuild() {
    if (this.localStorageService.get(this.getLocalStorage())) {
      this.guild = JSON.parse(JSON.stringify(this.localStorageService.get(this.getLocalStorage())))
    } else {
      this.guild = new Guild();
    }

    return this.guild
  }

  saveGuild() {
    this.localStorageService.set(this.getLocalStorage(), this.guild);
  }

  getStatues() {
    return this.statues
  }
}
