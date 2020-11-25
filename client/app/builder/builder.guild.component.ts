import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GuildService } from '../services/guild.service';
import { AuthService } from '../services/auth.service';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-builder-guild',
  templateUrl: './builder.guild.component.html',
  styleUrls: ['./builder.guild.component.css']
})
export class BuilderGuildComponent implements OnInit {
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

    this.navService.setTitle('Guild Builder');
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

  saveGuild() {
    this.guildService.saveGuild(this.guild);
  }
}
