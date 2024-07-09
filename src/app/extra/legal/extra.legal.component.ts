import { Component } from '@angular/core';

import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-extra-legal',
  templateUrl: './extra.legal.component.html',
  styleUrls: ['./extra.legal.component.css']
})

export class ExtraLegalComponent {
  markdown = '### Informations about the app\n\rThe app wotv-calc.com is here to help you to optimized your experience in WOTV.\n\rIt\'s developed voluntarily by Bismark (bismark@ffbe-chain.com)\n\r\n\r### Visual content\n\rAlmost all visual host on wotv-calc.com belong to Square Enix Co., Ltd.\n\r\n\r### Copyright\n\rYou can use all or parts of this app without asking us, you just need to mention the reference to wotv-calc.\n\r\n\r### Personnal data\n\rWe don\'t save any information about you on our infrastructure.\n\rBut we use Google Analytics as third party tools to follow the usage of our app, but it\'s doesn\'t save real personna data.\n\rYou can find more here : [How Google Analytics tracking work ?]\n\rFor the login part we use firebase linked to either Google or Facebook to store a wotv-calc account. Same thing here, we don\'t save password or login info, a new random ID is generated for each account. Everything is managed by firebase, if you want to delete all your informations contact me to delete them.\n\r\n\r[How Google Analytics tracking work ?]: https://developers.google.com/analytics/resources/concepts/gaConceptsTrackingOverview';

  constructor(
    private navService: NavService
  ) {
    this.navService.setSEO('Legal', 'Every legal stuff because we need some.');
  }
}
