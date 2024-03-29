import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

import { GuildService } from '../../services/guild.service';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-builder-guild',
  templateUrl: './builder.guild.component.html',
  styleUrls: ['./builder.guild.component.css']
})
export class BuilderGuildComponent implements OnInit, AfterViewInit {
  guild;
  statues;
  statueNames;
  showSave = false;

  constructor(
    private guildService: GuildService,
    private authService: AuthService,
    private navService: NavService
  ) {
  }

  ngOnInit(): void {
    this.guild = this.guildService.getGuild();

    this.statues = this.guildService.getStatues();
    this.statueNames = Object.keys(this.statues);

    this.navService.setSEO('Guild Builder', 'Build your guild statues to see the result before making your team mates focus the wrong one. Save them to use them in the unit and team builders.');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.authService.$load.subscribe(load => {
        this.guild = this.guildService.getGuild();
      });
    });

    setTimeout(() => {
      this.authService.$user.subscribe(user => {
        if (user) {
          this.showSave = true;
        } else {
          this.showSave = false;
        }
      });
    });
  }

  async saveGuild() {
    await this.guildService.saveGuild(this.guild);
  }
}
