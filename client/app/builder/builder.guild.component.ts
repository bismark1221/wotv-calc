import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GuildService } from '../services/guild.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-builder-guild',
  templateUrl: './builder.guild.component.html',
  styleUrls: ['./builder.guild.component.css']
})
export class BuilderGuildComponent implements OnInit {
  guild
  statues
  statueNames
  showSave = false

  constructor(
    private guildService: GuildService,
    private authService: AuthService
  ) {
  }

  ngAfterViewInit() {
    this.authService.$load.subscribe(load => {
      this.guild = this.guildService.getGuild()
    });

    this.authService.$user.subscribe(user => {
      if (user) {
        this.showSave = true
      } else {
        this.showSave = false
      }
    });
  }

  ngOnInit(): void {
    this.guild = this.guildService.getGuild()
    console.log(this.guild)

    this.statues = this.guildService.getStatues()
    this.statueNames = Object.keys(this.statues)
  }

  saveGuild() {
    this.guildService.saveGuild(this.guild)
  }
}
