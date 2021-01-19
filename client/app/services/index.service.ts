import { Injectable } from '@angular/core';

import { default as GL_INDEX } from '../data/gl/index.json';
import { default as JP_INDEX } from '../data/jp/index.json';
import { NavService } from './nav.service';

@Injectable()
export class IndexService {
  constructor(
    private navService: NavService
  ) {}

  private getRaw() {
    if (this.navService.getVersion() === 'GL') {
      return GL_INDEX;
    } else {
      return JP_INDEX;
    }
  }

  getUnits() {
    const raw = JSON.parse(JSON.stringify(this.getRaw()));

    return raw.units;
  }
}
