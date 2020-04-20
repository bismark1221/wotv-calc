import { Component, OnInit } from '@angular/core';

import { JsonService } from '../services/json.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.css']
})
export class JsonComponent implements OnInit {
  units = [];
  unitIds = [];

  isCollapsed = [];

  constructor(private jsonService: JsonService) {}

  ngOnInit(): void {
    this.jsonService.getJsons().then(response => {
      this.units = response;
      this.unitIds = Object.keys(this.units)

      for (let i = 0; i < this.unitIds.length; i++) {
        this.isCollapsed[i] = true;
      }
    });
  }
}
