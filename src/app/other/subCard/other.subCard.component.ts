import { Component, OnInit } from '@angular/core';

import { NavService } from '../../services/nav.service';

import { GL_SUB_CARD_BUFF_RATIO } from '../../data/gl/subCardBuffRatio';
import { JP_SUB_CARD_BUFF_RATIO } from '../../data/jp/subCardBuffRatio';

@Component({
  selector: 'app-other-subcard',
  templateUrl: './other.subCard.component.html',
  styleUrls: ['./other.subCard.component.css']
})
export class OtherSubCardComponent implements OnInit {

  subCardBuffRatio = {
    GL: GL_SUB_CARD_BUFF_RATIO,
    JP: JP_SUB_CARD_BUFF_RATIO
  };

  version = 'GL';

  buffTypes = [];

  constructor(
    private navService: NavService
  ) {
    this.version = this.navService.getVersion();
    this.buffTypes = Object.keys(this.subCardBuffRatio[this.version]);
  }

  async ngOnInit() {
    this.navService.setSEO('Sub Cards Ratio', 'This page is made to show ratio of every effect in card when used as sub card.');
  }
}
