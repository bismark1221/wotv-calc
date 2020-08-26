import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GuildService } from '../services/guild.service';

@Component({
  selector: 'app-builder-guild',
  templateUrl: './builder.guild.component.html',
  styleUrls: ['./builder.guild.component.css']
})
export class BuilderGuildComponent implements OnInit {
  @Input() public guild
  @Input() public fromUnitBuilder = false;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  statues
  statueNames

  constructor(
    private guildService: GuildService,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    if (!this.guild) {
      this.guild = this.guildService.getGuild()
    }

    this.statues = this.guildService.getStatues()
    this.statueNames = Object.keys(this.statues)
  }

  saveGuild() {
    this.guildService.saveGuild()
  }

  close() {
    this.modalService.dismissAll();
  }
}
