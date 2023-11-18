import { Component } from '@angular/core';

import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-extra-contact',
  templateUrl: './extra.contact.component.html',
  styleUrls: ['./extra.contact.component.css']
})
export class ExtraContactComponent {
  markdown = 'If you find bugs, have question or just want to leave me a message you can contact me via:\n\r - E-Mail : bismark@ffbe-chain.com\n\r - Reddit : [/u/bahamut1221]\n\r - Twitter : [@bismarktv]\n\r - Discord : [WOTV-CALC discord server]\n\r[/u/bahamut1221]: https://www.reddit.com/user/bahamut1221\n\r[@bismarktv]: https://twitter.com/bismarktv\n\r[WOTV-CALC discord server]: https://discord.gg/42PHBD85kN';

  constructor(
    private navService: NavService
  ) {
    this.navService.setSEO('Contact', 'If you need to contact me every method is indicated here.');
  }
}
