import { Component, OnInit } from '@angular/core';

import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private navService: NavService
  ) { }

  ngOnInit() {
  }

  getRoute(route) {
    return this.navService.getRoute(route)
  }
}
