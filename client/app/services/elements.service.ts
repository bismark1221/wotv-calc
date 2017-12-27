import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { ELEMENTS } from '../data/elements';

@Injectable()
export class ElementsService {
  getElements(): string[] {
    return JSON.parse(JSON.stringify(ELEMENTS));
  }
}
