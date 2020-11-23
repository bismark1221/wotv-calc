import { Injectable } from '@angular/core';

import { Item } from '../entities/item';
import GL_PLAYER_TITLES from '../data/gl/playerTitles.json';
import GL_GUILD_TITLES from '../data/gl/guildTitles.json';
import JP_PLAYER_TITLES from '../data/jp/playerTitles.json';
import JP_GUILD_TITLES from '../data/jp/guildTitles.json';
import { NavService } from './nav.service'

@Injectable()
export class TitleService {
  savedVersion

  constructor(
    private navService: NavService
  ) {}

  private getRaw() {
    this.savedVersion = JSON.parse(JSON.stringify(this.navService.getVersion()))
    if (this.savedVersion == "GL") {
      return {
        player: GL_PLAYER_TITLES,
        guild: GL_GUILD_TITLES
      }
    } else {
      return {
        player: JP_PLAYER_TITLES,
        guild: JP_GUILD_TITLES
      }
    }
  }

  getTitles() {
    let titles = {
      player: [],
      guild: []
    };
    let rawTitles = JSON.parse(JSON.stringify(this.getRaw()))

    let types = ["player", "guild"]
    types.forEach(type => {
      Object.keys(rawTitles[type]).forEach(titleId => {
        titles[type].push(rawTitles[type][titleId])
      });
    })

    return titles;
  }
}
