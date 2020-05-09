import { Component, OnInit } from '@angular/core';

import { GuildService } from '../services/guild.service';

@Component({
  selector: 'app-builder-guild',
  templateUrl: './builder.guild.component.html',
  styleUrls: ['./builder.guild.component.css']
})
export class BuilderGuildComponent implements OnInit {
  guild

  constructor(
    private guildService: GuildService
  ) {
  }

  ngOnInit(): void {
    this.getGuild();
  }

  private getGuild() {
    this.guild = this.guildService.getGuild()
  }

  private saveGuild() {
    this.guildService.saveGuild()
  }
}
