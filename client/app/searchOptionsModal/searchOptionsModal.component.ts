import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';

import { NavService } from '../services/nav.service';
import { ToolService } from '../services/tool.service';

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

  version = 'GL';

  constructor(
    private navService: NavService,
    private toolService: ToolService,
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
    ['GL', 'JP'].forEach(version => {
      this.toolService.sortTableByName(this.buffType[version].items);
    });
  }
}
