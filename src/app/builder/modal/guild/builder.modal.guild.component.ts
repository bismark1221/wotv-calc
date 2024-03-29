import { Component, OnInit, Input } from '@angular/core';
import { NgxModalComponent } from 'ngx-modalview';

import { GuildService } from '../../../services/guild.service';

@Component({
  selector: 'app-builder-modal-guild',
  templateUrl: './builder.modal.guild.component.html',
  styleUrls: ['./builder.modal.guild.component.css']
})
export class BuilderModalGuildComponent extends NgxModalComponent<null, any> implements OnInit {
  statues;
  statueNames;
  firstClickOutside = false;

  @Input() public guild;

  constructor(
    private guildService: GuildService
  ) {
    super();
  }

  ngOnInit() {
    this.statues = this.guildService.getStatues();
    this.statueNames = Object.keys(this.statues);
  }

  closeButton() {
    this.result = 'close';
    this.close();
  }

  save() {
    this.result = this.guild;
    this.close();
  }

  closeClickOuside() {
    if (!this.firstClickOutside) {
      this.firstClickOutside = true;
    } else {
      this.result = 'close';
      this.close();
    }
  }
}
