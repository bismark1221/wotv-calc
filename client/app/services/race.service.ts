import { Injectable } from '@angular/core';

@Injectable()
export class RaceService {
  private races = [
    "aquatic",
    "beast",
    "bird",
    "demon",
    "dragon",
    "human",
    "insect",
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
