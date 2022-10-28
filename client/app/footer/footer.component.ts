import { Component, OnInit, AfterViewInit } from '@angular/core';

import { NavService } from '../services/nav.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, AfterViewInit {
  theme = null;

  constructor(
    private navService: NavService,
    private themeService: ThemeService
  ) { }

  ngOnInit() {
    this.theme = this.themeService.active;
  }

  ngAfterViewInit() {
    this.themeService.$active.subscribe(active => {
      this.theme = active;
    });
  }

  getRoute(route) {
    return this.navService.getRoute(route);
  }
}
