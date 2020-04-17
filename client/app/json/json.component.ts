import { Component, OnInit } from '@angular/core';

import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  units = [];

  isCollapsed = [];
  isCollapsedRaw = true;

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      this.units = response;
      for (let i = 0; i < this.units.length; i++) {
        this.isCollapsed[i] = true;
      }
    });
  }
}
