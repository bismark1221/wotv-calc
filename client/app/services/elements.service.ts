import { Injectable } from '@angular/core';
import { ELEMENTS } from '../data/elements';
import { GAME_ORDER_ELEMENTS } from '../data/elements';

@Injectable()
export class ElementsService {
  getElements(): string[] {
    return JSON.parse(JSON.stringify(ELEMENTS));
  }

  getGameOrderElements(): string[] {
    return JSON.parse(JSON.stringify(GAME_ORDER_ELEMENTS));
  }
}
