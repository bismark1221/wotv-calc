import { Component, OnInit } from '@angular/core';

import { GuildService } from '../services/guild.service';

@Component({
  selector: 'app-builder-guild',
  templateUrl: './builder.guild.component.html',
  styleUrls: ['./builder.guild.component.css']
})
export class BuilderGuildComponent implements OnInit {
  guild
  statues
  statueNames

  constructor(
    private guildService: GuildService
  ) {
  }

  ngOnInit(): void {
    this.getGuild();
    this.statues = this.guildService.getStatues()
    this.statueNames = Object.keys(this.statues)
  }

  private getGuild() {
    this.guild = this.guildService.getGuild()
  }

  private saveGuild() {
    this.guildService.saveGuild()
  }
}
