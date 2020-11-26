import { Component, OnInit, Input } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NgbActiveModal  } from '@ng-bootstrap/ng-bootstrap';

import { GuildService } from '../../services/guild.service';

@Component({
  selector: 'app-modal-guild',
  templateUrl: './modal.guild.component.html',
  styleUrls: ['./modal.guild.component.css']
})
export class ModalGuildComponent implements OnInit {
  statues;
  statueNames;

  @Input() public guild;

  constructor(
    private guildService: GuildService,
    private modal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.statues = this.guildService.getStatues();
    this.statueNames = Object.keys(this.statues);
  }

  close() {
    this.modal.dismiss();
  }

  save() {
    this.modal.close(this.guild);
  }
}
