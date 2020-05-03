import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Guild } from '../entities/guild';

@Injectable()
export class GuildService {
  private guild: Guild;

  private statues = ["serpent", "bull", "kirin", "lion"]

  private statsPerStatue = {
    "HP": "serpent",
    "TP": "bull",
    "ATK": "kirin",
    "MAG": "lion",
  }

  constructor(private localStorageService: LocalStorageService) {}

  getGuild() {
    if (this.localStorageService.get('guild')) {
      this.guild = this.localStorageService.get('guild')
    } else {
      this.guild = new Guild();
    }

    return this.guild
  }

  saveGuild() {
    this.localStorageService.set('guild', this.guild);
  }

  getStatues() {
    return this.statues
  }

  getStats() {
    return this.statsPerStatue
  }
}
