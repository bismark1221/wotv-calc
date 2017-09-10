import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { ELEMENTS } from '../data/elements';

@Injectable()
export class ElementsService {
  getElements(): Promise<string[]> {
    return Promise.resolve(JSON.parse(JSON.stringify(ELEMENTS)));
  }
}
