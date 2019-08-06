import { Injectable } from '@angular/core';

@Injectable()
export class RaceService {
  private races = [
    "aquatic",
    "beast",
    "bird",
    "bug",
    "demon",
    "dragon",
    "human",
    "machine",
    "plant",
    "undead",
    "stone",
    "spirit"
  ]

  getRaces() {
    return this.races;
  }
}
