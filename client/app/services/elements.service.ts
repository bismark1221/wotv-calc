import { Injectable } from '@angular/core';
import { ELEMENTS } from '../data/elements';

@Injectable()
export class ElementsService {
  getElements(): string[] {
    return JSON.parse(JSON.stringify(ELEMENTS));
  }
}
