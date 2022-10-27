import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';
import { SkillService } from '../services/skill.service';

import { GL_BUFF_TYPE } from '../data/gl/buffType';
import { JP_BUFF_TYPE } from '../data/jp/buffType';

@Component({
  selector: 'app-search-options-modal',
  templateUrl: './searchOptionsModal.component.html',
  styleUrls: ['./searchOptionsModal.component.css']
})
export class SearchOptionsModalComponent extends SimpleModalComponent<null, null> {
  firstClickOutside = false;

  buffType = {
    GL: GL_BUFF_TYPE,
    JP: JP_BUFF_TYPE
  };

  formattedBuffTypes = [];

  version = 'GL';

  constructor(
    private navService: NavService,
    private toolService: ToolService,
    private skillService: SkillService
  ) {
    super();

    this.version = this.navService.getVersion();

    this.formatBuffType();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.close();
    }
  }

  formatBuffType() {
    this.toolService.sortTableByName(this.buffType[this.version].items);

    this.buffType[this.version].items.forEach(buffType => {
      const fakeEffect = {
        type: buffType,
        value: 1
      };

      this.formattedBuffTypes.push({
        type: buffType,
        formattedEffect: this.skillService.formatEffect({}, {}, fakeEffect, false, false, false, true)
      });
    });
  }
}
