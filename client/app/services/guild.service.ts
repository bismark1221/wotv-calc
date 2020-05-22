import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

import { Guild } from '../entities/guild';
import { NavService } from './nav.service';

@Injectable()
export class GuildService {
  private guild: Guild;

  private statues = ["serpent", "bull", "kirin", "lion"]

  private statsPerStatue = {
    "HP": "serpent",
    "TP": "bull",
    "MAG": "kirin",
    "ATK": "lion",
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
      this.guild = this.localStorageService.get(this.getLocalStorage())
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

  getStats() {
    return this.statsPerStatue
  }
}
